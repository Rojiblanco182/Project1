function Obstacle(game) {
  this.game = game;

  this.w = 15;
  this.h = this.w * 3;

  this.dx = 10;

  this.x = this.game.canvas.width / 2;
  this.y = 100;
}

Obstacle.prototype.draw = function () {
  this.game.ctx.fillStyle = "red";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
}

Obstacle.prototype.move = function () {
  this.x -= this.dx;
}