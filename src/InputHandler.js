import { setup } from './setup.js'

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
          event.key === 'W' ||
          event.key === 'A' ||
          event.key === 'S' ||
          event.key === 'D' ||
          event.key === 'R' ||
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

    // single fire weapons?
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

    // could work for single fire weapons
    // window.addEventListener('keyup', (event) => {
    //   if (event.key === ' ' && !this.game.paused) {
    //     this.game.player.shoot(this.mouseX, this.mouseY)
    //   }
    // })


    // start buttons
    window.addEventListener('mousedown', (event) => {
      if (
        event.button === 0 &&
        this.game.start &&
        this.game.input.mouseX > this.game.width / 2 - 475 &&
        this.game.input.mouseX < this.game.width / 2 - 275 &&
        this.game.input.mouseY > this.game.height / 2 &&
        this.game.input.mouseY < this.game.height / 2 + 50
      ) {
        this.game.start = false
        this.game.paused = false
        // weapon: shotgun
      }
    })

    window.addEventListener('mousedown', (event) => {
      if (
        event.button === 0 &&
        this.game.start &&
        this.game.input.mouseX > this.game.width / 2 - 225 &&
        this.game.input.mouseX < this.game.width / 2 - 25 &&
        this.game.input.mouseY > this.game.height / 2 &&
        this.game.input.mouseY < this.game.height / 2 + 50
      ) {
        this.chooseSMG()
      }
    })

    window.addEventListener('mousedown', (event) => {
      if (
        event.button === 0 &&
        this.game.start &&
        this.game.input.mouseX > this.game.width / 2 + 25 &&
        this.game.input.mouseX < this.game.width / 2 + 225 &&
        this.game.input.mouseY > this.game.height / 2 &&
        this.game.input.mouseY < this.game.height / 2 + 50
      ) {
        this.chooseRifle()
      }
    })

    window.addEventListener('mousedown', (event) => {
      if (
        event.button === 0 &&
        this.game.start &&
        this.game.input.mouseX > this.game.width / 2 + 275 &&
        this.game.input.mouseX < this.game.width / 2 + 475 &&
        this.game.input.mouseY > this.game.height / 2 &&
        this.game.input.mouseY < this.game.height / 2 + 50
      ) {
        this.chooseSniper()
      }
    })

    window.addEventListener('keyup', (event) => {
      if (event.key === '1' && this.game.start) {
        this.game.start = false
        this.game.paused = false
        // weapon: shotgun
      } else if (event.key === '2' && this.game.start) {
        this.chooseSMG()
      } else if (event.key === '3' && this.game.start) {
        this.chooseRifle()
      } else if (event.key === '4' && this.game.start) {
        this.chooseSniper()
      }
    })

    window.addEventListener('keyup', (event) => {
      if (
        (event.key === 'f' || event.key === 'F') &&
        this.game.gameOver && !this.game.start && this.game.paused
      ) {
        this.game = '';
        setup(document.querySelector('#canvas1'))
        this.game.gameOver = false
      }
    })

  }

  chooseSMG() {
    this.game.start = false
    this.game.paused = false

    // weapon: smg
    this.game.player.weapon = 'smg'
    this.game.player.maxAmmo = 45
    this.game.player.ammo = 45
    this.game.player.shootInterval = 60
    this.game.player.reloadInterval = 1500
    this.game.player.autoFire = true
    this.game.player.gunImg = document.getElementById('smg')
  }

  chooseRifle() {
    this.game.start = false
    this.game.paused = false
    // weapon: rifle
    this.game.player.weapon = 'rifle'
    this.game.player.maxAmmo = 20
    this.game.player.ammo = 20
    this.game.player.shootInterval = 300
    this.game.player.reloadInterval = 2200
    this.game.player.autoFire = true
    this.game.player.gunImg = document.getElementById('rifle')
  }

  chooseSniper() {
    this.game.start = false
    this.game.paused = false
    // weapon: sniper
    this.game.player.weapon = 'sniper'
    this.game.player.maxAmmo = 6
    this.game.player.ammo = 6
    this.game.player.shootInterval = 1000
    this.game.player.reloadInterval = 2400
    this.game.player.autoFire = false
    this.game.player.gunImg = document.getElementById('sniper')
  }
}
