function Background(game) {

  this.game = game;

  this.backgroundImg = new Image();
  //this.backgroundImg.src = "images/fondo.jpg";
  this.backgroundImg.src = "images/back2.png";

  this.x = 0;
  this.y = 0;

  this.batmobile = new Image();
  this.batmobile.src = "images/batmobile.png";
  this.batmobileW = 250;
  this.batmobileH = 125;
}

Background.prototype.draw = function () {
  this.game.ctx.drawImage(this.backgroundImg, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  this.game.ctx.drawImage(this.batmobile, this.game.canvas.width - 250, this.game.canvas.height * 0.82, this.batmobileW, this.batmobileH);
}