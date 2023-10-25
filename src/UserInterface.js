export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Lives: ${this.game.player.lives}`, 20, 30)
    context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)} `, 20, 60)
    context.fillText(`Kills: ${this.game.player.kills} `, 20, 90)

    let x = ''
    for (let i = 0; i < this.game.player.ammo; i++) {
      x += 'I'
    }
    context.fillText('Ammo: ' + x, 20, 120)

    if (!this.game.player.reloading) {
      context.fillText(`Press r to reload: ${this.game.player.reloadTimer} `, 20, 150)
    } else {
      context.fillText(`Reloading: ${((this.game.player.reloadInterval - this.game.player.reloadTimer) / 1000).toFixed(1)} `, 20, 150)
    }

    if (this.game.player.ammo === 0) {
      context.textAlign = 'center'

      context.globalAlpha = 1 // opacity, TODO make it shift between 0.5 and 1

      context.font = `50px ${this.fontFamily} `
      if (this.game.player.reloading) {
        context.fillText(
          'Reloading!',
          this.game.width / 2,
          100
        )
      } else {
        context.fillText(
          'Out of ammo! Reload!',
          this.game.width / 2,
          100
        )
      }
    }

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.fillStyle = 'white'
      context.globalAlpha = 1
      context.font = `50px ${this.fontFamily} `
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x} `, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y} `, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX} `,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY} `,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed} `,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys} `, this.game.width - 20, 150)
      context.fillText(
        `reloading: ${this.game.player.reloading} `,
        this.game.width - 20,
        175
      )
      if (this.game.player.shootTimer > this.game.player.shootInterval) {
        context.fillText(
          `Ready to shoot`,
          this.game.width - 20,
          200
        )
      }
    }

    context.restore()
  }
}
