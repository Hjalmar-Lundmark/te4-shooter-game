import Enemy from "./Enemy";

export default class Boss extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.width = 64;
    this.height = 64;
    this.x = x;
    this.y = y;
    this.speed = 60;
    this.lives = 30;
    this.damage = 5;
    this.type = "boss";
    this.img = document.getElementById("boss1");

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
      this.img = document.getElementById(`boss${this.frame}`)
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
}