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
    this.gunImg = document.getElementById('gun')
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

    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a') && this.x > 0) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') ||
      this.game.keys.includes('d') &&
      this.x < this.game.width - this.width
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w') && this.y > 0) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowDown') ||
      this.game.keys.includes('s') &&
      this.y < this.game.height - this.height
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    //shoots
    if (this.game.keys.includes(' ') || this.game.keys.includes(0) && !this.game.paused) {
      this.shoot(this.game.input.mouseX, this.game.input.mouseY)
    }

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

      // No clue what these do
      // TODO: fix
      context.translate(this.game.width, this.game.height)
      context.rotate(angle)
      context.drawImage(
        this.gunImg,
        -this.x / 2,
        -this.y / 2,
        this.x,
        this.y
      )
      context.rotate(-angle)
      context.translate(-this.game.width, -this.game.height)
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

    if (this.ammo > 0 && !this.reloading && this.shootTimer > this.shootInterval && !this.game.paused) {
      this.shootTimer = 0
      this.ammo--
      if (this.weapon === 'shotgun') this.shotgunProj(angle)
      if (this.weapon === 'smg') this.smgProj(angle)
      if (this.weapon === 'rifle') this.rifleProj(angle)
      if (this.weapon === 'sniper') this.sniperProj(angle)
    }
  }

  shotgunProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle,
        400,
        1,
        1,
        1000
      ),
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle + 0.1,
        400,
        1,
        1,
        1000
      ),
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle - 0.1,
        400,
        1,
        1,
        1000
      )
    )
  }

  smgProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle + (Math.random() - Math.random()) * 0.6,
        500,
        1,
        0,
        1000
      )
    )
  }

  rifleProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle,
        600,
        3,
        3,
        1500
      )
    )
  }

  sniperProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle,
        800,
        5,
        7,
        2000
      )
    )
  }
}