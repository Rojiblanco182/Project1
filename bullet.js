function Batarang(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;

  this.vx = 10;

  this.batarang = new Image();
  this.batarang.src = "images/batarang.png";
  this.batarang.frames = 2;
  this.batarang.frameIndex = 0;
  this.w = 125;
  this.h = 125;
}

Batarang.prototype.draw = function () {

  this.game.ctx.drawImage(
    this.batarang,
    this.batarang.frameIndex * Math.floor(this.w / this.batarang.frames),
    0,
    Math.floor(this.w / this.batarang.frames),
    this.h,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.move();
  this.animateImg();
}

Batarang.prototype.move = function () {
  this.x += this.vx;
}

Batarang.prototype.animateImg = function () {

  this.batarang.frameIndex += 1;

  if (this.batarang.frameIndex > 1) this.batarang.frameIndex = 0;
}