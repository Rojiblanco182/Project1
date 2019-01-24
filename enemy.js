function Enemy(game, obj) {
  this.game = game;

  this.enemy = new Image();
  this.enemy.src = obj.img;
  this.enemy.frames = obj.frames;
  this.enemy.frameIndex = 0;

  this.x0 = obj.x0;
  this.x = obj.x0;
  this.y = obj.y;
  this.objectWidth = obj.width;

  this.w = 75;
  this.h = 100;

  this.dw = 100;
  this.dh = 150;

  this.direction = 1;
}

Enemy.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.enemy,
    this.enemy.frameIndex * Math.floor(this.w / this.enemy.frames),
    0,
    Math.floor(this.w / this.enemy.frames),
    this.h,
    this.x,
    this.y,
    this.dw,
    this.dh
  );
  this.animateImg();
  this.move();
}

Enemy.prototype.move = function () {

  this.leftLimit = this.x0;
  this.rightLimit = this.x0 + (this.objectWidth - this.w);
  this.x -= this.direction;

  if (this.x < this.leftLimit || this.x > this.rightLimit) {
    this.direction *= -1;
  }
}

Enemy.prototype.animateImg = function () {

  if (this.game.framesCounter % 15 === 0) {

    this.enemy.frameIndex += 1;

    if (this.enemy.frameIndex > this.enemy.frames - 1) this.enemy.frameIndex = 0;
  }
}