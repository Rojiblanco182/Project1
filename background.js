function Background(game) {

  this.game = game;

  this.backgroundImg = new Image();
  this.backgroundImg.src = "images/fondo.jpg";

  this.x = 0;
  this.y = 0;

  this.batmobile = new Image();
  this.batmobile.src = "images/batmobile.png";
  this.batmobileW = 250;
  this.batmobileH = 125;
}

Background.prototype.draw = function () {
  this.game.ctx.drawImage(this.backgroundImg, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  this.game.ctx.drawImage(this.batmobile, this.game.canvas.width - 250, this.game.canvas.height * 0.8, this.batmobileW, this.batmobileH);

  //Creación de puntos de apoyo para los personajes.
  // this.game.ctx.fillStyle = "green";
  // this.game.ctx.fillRect(this.x, this.game.canvas.height * 0.76, 250, 25);
  // this.game.ctx.fillRect(this.game.canvas.width / 2.3, this.game.canvas.height, 250, -350);

}