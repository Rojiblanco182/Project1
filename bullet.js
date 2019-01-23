function Batarang(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;

  this.vx = 10;

  this.batarang = new Image();
  this.batarang.src = "images/batman-prueba.png";
  this.w = 20;
  this.h = 20;
}

Batarang.prototype.draw = function () {
  this.game.ctx.drawImage(this.batarang, this.x, this.y, this.w, this.h);
  this.move();
}

Batarang.prototype.move = function () {
  this.x += this.vx;
}