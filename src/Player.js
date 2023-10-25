import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 64
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    this.maxAmmo = 8
    this.ammo = 8
    this.weapon = 'shotgun' // shotgun, smg, rifle, sniper, ...
    this.autoFire = false
    this.shootTimer = 0
    this.shootInterval = 400
    // this.ammoTimer = 0
    // this.ammoInterval = 5000
    this.reloading = false
    this.reloadTimer = 0
    this.reloadInterval = 2000

    this.lives = 10
    this.kills = 0
  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
      this.game.paused = true
    }

    this.shootTimer += deltaTime

    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') ||
      this.game.keys.includes('d')
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowDown') ||
      this.game.keys.includes('s')
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    // if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
    //   this.ammoTimer = 0
    //   this.ammo++
    // } else {
    //   this.ammoTimer += deltaTime
    // }

    if (this.game.keys.includes('r') && this.ammo < this.maxAmmo) {
      this.reloading = true
    }

    if (this.reloading) {
      if (this.reloadTimer > this.reloadInterval) {
        this.reloadTimer = 0
        this.ammo = this.maxAmmo
        this.reloading = false
      } else {
        this.reloadTimer += deltaTime
      }
    }

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  shoot(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    if (this.ammo > 0 && !this.reloading && this.shootTimer > this.shootInterval) {
      this.shootTimer = 0
      this.ammo--
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle
        ),
        new Projectile(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle + 0.1
        ),
        new Projectile(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle - 0.1
        )
      )
    }
  }
}
