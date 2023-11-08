import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Candy from './Candy.js'
import Boss from './Boss.js'
import Sound from './Sound.js'
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
    this.paused = true
    this.start = true
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.hitTimer = 0
    this.pickupTimer = 0
    this.points = 0
    this.highscore = parseInt(localStorage.getItem('highscore')) || 0
    this.firstBoss = false

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 500

    this.player = new Player(this)
    this.sound = new Sound(this)
  }

  update(deltaTime) {
    if (!this.paused) {
      if (!this.gameOver) {
        this.gameTime += deltaTime
      }

      if (this.hitTimer > 0) {
        this.hitTimer--
      }
      if (this.pickupTimer > 0) {
        this.pickupTimer--
      }

      // calculates points
      this.points = ((this.player.kills * 11 + this.gameTime / 950) / 2.38).toFixed(0)

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
        } else if ((this.gameTime > 40000 && Math.random() < 0.02) || (this.gameTime > 30000 && !this.firstBoss)) {
          this.enemies.push(new Boss(this, x, y))
          this.firstBoss = true
        } else {
          this.enemies.push(new Pumpkin(this, x, y))
        }
        this.enemyTimer = 0
        this.enemyInterval -= 0.4 // maybe lower this a little
      } else {
        this.enemyTimer += deltaTime
      }
      this.player.update(deltaTime)

      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime, this.player)
        if (this.checkCollision(this.player, enemy)) {
          if (enemy.type !== 'candy') {
            this.player.lives -= enemy.damage
            this.sound.playDamageSound()
            this.player.kills++
            this.hitTimer = 50
          } else if (enemy.type === 'candy') {
            this.player.lives++
            this.pickupTimer = 50
          }
          enemy.markedForDeletion = true
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.lives > projectile.damage) {
              enemy.lives -= projectile.damage
            } else if (!enemy.markedForDeletion) {
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
