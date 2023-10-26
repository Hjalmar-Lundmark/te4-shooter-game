import Projectile from "./Projectile";

export default class Weapon {
  constructor(game) {
    this.game = game;
    this.Weapon = 'shotgun';
    this.maxAmmo = 8;
    this.ammo = 8;
    this.autoFire = false;
    this.shootTimer = 0;
    this.shootInterval = 400;
    this.gunImg = document.getElementById('gun');
    this.reloading = false;
    this.reloadTimer = 0;
    this.reloadInterval = 2000;
  }

  shotgunShoot(angle) {
    this.player.projectiles.push(
      new Projectile(
        this.game,
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        angle
      ),
      new Projectile(
        this.game,
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        angle + 0.1
      ),
      new Projectile(
        this.game,
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        angle - 0.1
      )
    )
  }

}