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

  this.dw = 75;
  this.dh = 100;

  this.direction = 1; //880 x 52
}

Enemy.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.enemy,
    this.enemy.frameIndex * Math.floor(this.enemy.width / this.enemy.frames),
    0,
    Math.floor(this.enemy.width / this.enemy.frames),
    this.enemy.height,
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
  this.rightLimit = this.x0 + (this.objectWidth - this.dw);
  this.x -= this.direction;

  if (this.x < this.leftLimit || this.x > this.rightLimit) {
    this.direction *= -1;
  }
}

Enemy.prototype.animateImg = function () {

  if (this.game.framesCounter % 20 === 0) {

    this.enemy.frameIndex += 1;

    if (this.enemy.frameIndex > this.enemy.frames - 1) this.enemy.frameIndex = 0;
  }
}