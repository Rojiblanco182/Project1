function Player(game) {
  this.game = game;
  this.x = this.game.canvas.width * 0.08;
  this.y0 = this.game.canvas.height * 0.8;
  this.y = this.y0;

  this.batman = new Image();
  this.batman.src = "images/walking-batman.png";
  this.batman.frames = 4;
  this.batman.frameIndex = 0;

  this.w = 75;
  this.h = 100;

  this.vy = 1;

  this.keys = {
    left: false,
    right: false
  };

  this.batarangs = [];

  this.setListeners();
}

Player.prototype.draw = function () {
  //this.game.ctx.drawImage(this.batman, this.x, this.y, this.w, this.h);
  this.game.ctx.drawImage(
    this.batman,
    this.batman.frameIndex * Math.floor(this.batman.width / this.batman.frames),
    0,
    Math.floor(this.batman.width / this.batman.frames),
    this.batman.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.move();

  this.batarangs = this.batarangs.filter(function (batarang) {
    // if (batarang.x > 0 || batarang.x < this.game.canvas.width) {
    //   return batarang.x;
    return batarang.x > 0 || batarang.x < this.game.canvas.width;
    //}
  }.bind(this));

  this.batarangs.forEach(function (batarang) {
    batarang.draw();
    batarang.move();
  });
}


Player.prototype.setListeners = function () {

  document.onkeydown = function (e) {

    if (e.keyCode == 83) this.shoot(); //'S'
    if (e.keyCode == 38 && this.y == this.y0) { this.y -= 5; this.vy -= 18 };
    if (e.keyCode == 37) this.keys.left = true;
    if (e.keyCode == 39) this.keys.right = true;


  }.bind(this);

  document.onkeyup = function (e) {
    if (e.keyCode == 37) this.keys.left = false;
    if (e.keyCode == 39) this.keys.right = false;
  }.bind(this);
}

Player.prototype.shoot = function () {
  var batarang = new Batarang(this.game, this.x + this.w, this.y + this.h / 2);

  this.batarangs.push(batarang);
}

Player.prototype.move = function () {

  var gravity = 0.4;

  var obstacle = this.game.checkCollision();

  if (obstacle) {
    if (this.vy > 1 && (this.x + 10 + this.w > obstacle.x && this.x - 10 < obstacle.x + obstacle.w)) {


      this.y = obstacle.y - this.h;
      this.vy = 1;
      this.y0 = obstacle.y - this.h;

    }
    else if (this.x + 10 + this.w > obstacle.x && this.x + 10 < obstacle.x + obstacle.w) {
      this.x -= 1;
    } else if (this.x - 10 < obstacle.x + obstacle.w) {
      this.x += 1;
    }
    else {
      this.vy = +1;
      this.y += this.vy;
    }
  }

  else {

    this.y0 = this.game.canvas.height * 0.8;

    if (this.y >= this.y0) {
      this.vy = 1;
      this.y = this.y0;
    }
    else {
      this.vy += gravity;
      this.y += this.vy;
    }

    if (this.keys.left) {
      this.animateImg();
      this.x -= 10;
    }

    if (this.keys.right) {
      this.animateImg();
      this.x += 10;
    }
  }
}

Player.prototype.animateImg = function () {

  this.batman.frameIndex += 1;

  if (this.batman.frameIndex > 3) this.batman.frameIndex = 0;
}