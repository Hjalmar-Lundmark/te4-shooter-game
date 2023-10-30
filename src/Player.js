import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 48
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 360

    this.maxAmmo = 8
    this.ammo = 8
    this.weapon = 'shotgun' // shotgun, smg, rifle, sniper, ...
    this.autoFire = false
    this.shootTimer = 0
    this.shootInterval = 400
    this.gunImg = document.getElementById('shotgun')
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

    this.y += this.speedY * (deltaTime / 1000)
    this.x += this.speedX * (deltaTime / 1000)

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
    context.fillStyle = '#0ff'
    context.fillRect(this.x, this.y, this.width, this.height)
    const dx = this.game.input.mouseX - (this.x + this.width / 2)
    const dy = this.game.input.mouseY - (this.y + this.height / 2)
    const maxLength = 60
    const angle = Math.atan2(dy, dx)
    const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
    const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
    context.translate(this.x + this.width / 2, this.y + this.height / 2)
    context.rotate(angle)
    context.drawImage(
      this.gunImg,
      -80 / 2,
      -50 / 2,
      80,
      50
    )
    context.rotate(-angle)
    context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
    
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
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
    let shotgunProjSpeed = 400
    let shotgunProjDamage = 1
    let shotgunProjPierce = 1
    let shotgunProjTimeout = 1000
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        10,
        4,
        angle,
        shotgunProjSpeed,
        shotgunProjDamage,
        shotgunProjPierce,
        shotgunProjTimeout
      ),
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        10,
        4,
        angle + 0.1,
        shotgunProjSpeed,
        shotgunProjDamage,
        shotgunProjPierce,
        shotgunProjTimeout
      ),
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        10,
        4,
        angle - 0.1,
        shotgunProjSpeed,
        shotgunProjDamage,
        shotgunProjPierce,
        shotgunProjTimeout
      ),
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        10,
        4,
        angle + 0.05,
        shotgunProjSpeed,
        shotgunProjDamage,
        shotgunProjPierce,
        shotgunProjTimeout
      ),
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        10,
        4,
        angle - 0.05,
        shotgunProjSpeed,
        shotgunProjDamage,
        shotgunProjPierce,
        shotgunProjTimeout
      )
    )
  }

  smgProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        10,
        4,
        angle + (Math.random() - Math.random()) * 0.6,
        500,
        1,
        0,
        1200
      )
    )
  }

  rifleProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        15,
        6,
        angle,
        600,
        3,
        3,
        1800
      )
    )
  }

  sniperProj(angle) {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        40,
        10,
        angle,
        700,
        5,
        9,
        2000
      )
    )
  }
}