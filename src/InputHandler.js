export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd' ||
          event.key === 'r' ||
          event.key === ' ') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      // if (event.key === ' ' && !this.game.paused) {
      //   this.game.player.shoot(this.mouseX, this.mouseY)
      // }

      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }

      if (event.key === 'Escape' && !this.game.gameOver) {
        this.game.paused = !this.game.paused
      }
    })

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    // window.addEventListener('mousedown', (event) => {
    //   this.game.player.shoot(this.mouseX, this.mouseY)
    // })

    window.addEventListener('mousedown', (event) => {
      if (
        (event.button === 0) && this.game.keys.indexOf(event.button) === -1
      ) {
        this.game.keys.push(event.button)
      }
    })

    window.addEventListener('mouseup', (event) => {
      if (this.game.keys.indexOf(event.button) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.button), 1)
      }
    })
  }
}
