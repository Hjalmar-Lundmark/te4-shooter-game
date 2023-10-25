import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Candy from './Candy.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.paused = false
    this.started = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.points = 0
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 500

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (!this.paused) {
      if (!this.gameOver) {
        this.gameTime += deltaTime
      }

      // calculates points
      this.points = ((this.player.kills * 9 + this.gameTime / 1000) / 2.38 + 22 - this.player.maxAmmo).toFixed(0)

      if (this.enemyTimer > this.enemyInterval) {
        let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
        let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
        if (x === 0) {
          y = Math.random() * this.height // if on left edge, randomize y position
        } else if (x === this.width) {
          y = Math.random() * this.height // if on right edge, randomize y position
        } else if (y === 0) {
          x = Math.random() * this.width // if on top edge, randomize x position
        } else {
          x = Math.random() * this.width // if on bottom edge, randomize x position
        }
        if (Math.random() < 0.04) {
          this.enemies.push(new Candy(this, Math.random() * this.width, y))
        } else if (false) {
          // spawn a boss
        } else {
          this.enemies.push(new Pumpkin(this, x, y))
        }
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.player.update(deltaTime)

      this.enemies.forEach((enemy) => {
        enemy.update(this.player)
        if (this.checkCollision(this.player, enemy)) {
          this.player.lives -= enemy.damage
          enemy.markedForDeletion = true
          this.player.kills++
          if (enemy.type === 'candy') {
            this.player.lives++
          }
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.lives > 1) {
              enemy.lives -= projectile.damage
            } else {
              enemy.markedForDeletion = true
              this.player.kills++
            }
            if (projectile.pierce > 0) {
              projectile.pierce--
            } else {
              projectile.markedForDeletion = true
            }
          }
        })
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    }
  }

  draw(context) {
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.ui.draw(context)
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
