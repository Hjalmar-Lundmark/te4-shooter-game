import Enemy from './Enemy.js'

export default class Pumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 120
    this.lives = Math.floor(Math.random() * 3) + 1
    this.img = document.getElementById('ghost1')
  }

  update(deltaTime, player) {
    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX * (deltaTime / 1000) // move the enemy towards the player on the x axis
    this.y += speedY * (deltaTime / 1000) // move the enemy towards the player on the y axis
    if (this.frameTimer > this.frameInterval) {
      if (this.frame >= 4) {
        this.frame = 1
      } else {
        this.frame += 1
      }
      this.img = document.getElementById(`ghost${this.frame}`)
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
}
