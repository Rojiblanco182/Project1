function Enemy(game) {
  this.game = game;
  this.x0 = this.game.canvas.width - 100;
  this.x = this.x0;
  this.y = this.game.canvas.height * 0.8;

  this.enemy = new Image();
  this.enemy.src = "images/batman-prueba.png";

  this.w = 75;
  this.h = 100;

  this.vy = 1;
}

Enemy.prototype.draw = function () {
  this.game.ctx.drawImage(this.enemy, this.x, this.y, this.w, this.h);
  this.move();
}

Enemy.prototype.move = function () {

  // for (var xCounter = this.x0; xCounter >= this.x0 - 350; xCounter -= 2) {
  //   this.x -= 2;
  // }
  this.leftLimit = this.x0 - 350;
  this.rightLimit = this.x0;

  if (this.x >= this.leftLimit) {
    this.x -= 2;
  }

  if (this.x == this.leftLimit && this.x < this.rightLimit) {
    this.x += 2;
  }
}