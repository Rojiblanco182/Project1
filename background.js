function Background(game) {

  this.game = game;

  this.backgroundImg = new Image();
  this.backgroundImg.src = "images/fondo.jpg";

  this.x = 0;
  this.y = 0;

  this.dx = 10; //qué hace esto?

  this.game.ctx.drawImage(this.backgroundImg, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
}

Background.prototype.draw = function () {
  this.game.ctx.drawImage(this.backgroundImg, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
}