import aurl from './assets/sounds/roblox-death-sound-effect.mp3'

export default class Sound {
  constructor(game) {
    this.game = game
    const a = new Audio()
    a.src = aurl
    this.takingDmg = a
  }

  playDamageSound() {
    this.takingDmg.currentTime = 0
    this.takingDmg.play()
  }
}