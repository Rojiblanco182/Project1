function Obstacle(game, obj) {
  this.game = game;

  this.w = obj.width;
  this.h = obj.height;

  this.dx = 10;

  this.x = obj.posX;
  this.y = obj.posY;//100;
}

Obstacle.prototype.draw = function () {
  this.game.ctx.fillStyle = "green";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
  // this.game.ctx.fillRect(this.game.canvas.width / 2.3, this.game.canvas.height, 250, -350);
}

// Obstacle.prototype.draw = function () {
//   this.game.ctx.fillStyle = "red";
//   this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
// }

// Obstacle.prototype.move = function () {
//   this.x -= this.dx;
// }