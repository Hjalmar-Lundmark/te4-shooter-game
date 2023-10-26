export default class Projectile {
  constructor(game, x, y, width, height, angle, speed, dmg, pierce, timeout) {
    this.game = game
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.angle = angle
    this.markedForDeletion = false

    this.speed = speed
    this.damage = dmg
    this.pierce = pierce
    this.timeout = timeout
  }

  update(deltaTime) {
    const velocity = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    }

    this.x += velocity.x * (deltaTime / 1000)
    this.y += velocity.y * (deltaTime / 1000)

    if (this.x > this.game.width || this.x < 0 || this.y > this.game.height || this.y < 0) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.fillStyle = '#ff0'
    context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}
