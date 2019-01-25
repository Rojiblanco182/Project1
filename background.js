// function Background(game) {

//   this.game = game;

//   this.backgroundImg = new Image();
//   this.backgroundImg.src = "images/back2.png";

//   this.x = 0;
//   this.y = 0;

//   this.batmobile = new Image();
//   this.batmobile.src = "images/batmobile.png";
//   this.batmobileW = 250;
//   this.batmobileH = 125;
// }

// Background.prototype.draw = function () {
//   this.game.ctx.drawImage(this.backgroundImg, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
//   this.game.ctx.drawImage(this.batmobile, this.game.canvas.width - 250, this.game.canvas.height * 0.82, this.batmobileW, this.batmobileH);
// }


function Background(game, bgObject) {

  this.game = game;

  this.image = new Image();
  this.image.src = bgObject.img;

  this.x = bgObject.x;
  this.y = bgObject.y;

  this.w = bgObject.w;
  this.h = bgObject.h;
}

Background.prototype.draw = function () {
  this.game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
}