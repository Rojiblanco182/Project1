function Player(game) {
  this.game = game;
  this.x = this.game.canvas.width * 0.08;
  this.y0 = this.game.canvas.height * 0.8;
  this.y = this.y0;

  this.batman = new Image();
  this.batman.src = "images/batman-prueba.png";

  this.w = 75;
  this.h = 100;

  this.vy = 1;

  this.keys = {
    left: false,
    right: false
  };

  this.setListeners();
}

Player.prototype.draw = function () {
  this.game.ctx.drawImage(this.batman, this.x, this.y, this.w, this.h);
  this.move();
}


Player.prototype.setListeners = function () {

  document.onkeydown = function (e) {

    if (e.keyCode == 38 && this.y == this.y0) this.y -= 600;
    if (e.keyCode == 37) this.keys.left = true;
    if (e.keyCode == 39) this.keys.right = true;


  }.bind(this);

  document.onkeyup = function (e) {
    if (e.keyCode == 37) this.keys.left = false;
    if (e.keyCode == 39) this.keys.right = false;
  }.bind(this);
}

Player.prototype.move = function () {


  var gravity = 0.4;

  if (this.y >= this.y0) {
    this.vy = 1;
    this.y = this.y0;
  }
  else {
    this.vy += gravity;
    this.y += this.vy;
  }

  if (this.keys.left) {
    this.x -= 10;
  }

  if (this.keys.right) {
    this.x += 10;
  }
}


