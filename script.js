window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    Game.start("canvas");
  };
}

var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,

  start: function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fps = 60;

    this.reset();

    this.interval = setInterval(function () {
      this.clear();
      this.framesCounter++;
      // this.generateObstacle();

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 150 === 0) {
        this.generateEnemy();
      }

      //this.score += 0.01;
      this.moveAll();
      this.drawAll();

      //this.clearObstacles();
      this.enemyKilled();


    }.bind(this), 1000 / this.fps);
  },

  reset: function () {
    this.background = new Background(this);
    this.player = new Player(this);
    this.enemies = [];
    this.framesCounter = 0;
    this.obstacles = [];
    this.generateObstacle({ posX: 0, posY: this.canvas.height * 0.76, width: 200, height: 25 });
    this.generateObstacle({ posX: this.canvas.width / 2.5, posY: 350, width: 250, height: 350 });
  },

  enemyKilled: function () {
    this.enemies.forEach(function (enemy, i) {
      this.player.batarangs.forEach(function (batarang) {

        if (
          batarang.x <= enemy.x + enemy.w &&
          batarang.x + batarang.w >= enemy.x
        ) {
          this.enemies.splice(i, 1);
          this.player.batarangs.splice(i, 1);
        }
      }.bind(this))
    }.bind(this))
  },

  checkCollision: function () {
    // this.left = function () { return this.x };
    // this.right = function () { return (this.x + this.w) };
    // this.top = function () { return this.y };
    // this.bottom = function () { return (this.y + this.h) };

    // this.crashWith = function () {
    //   return !((this.bottom() < obstacle.top()) ||
    //     (this.left() > obstacle.right()) ||
    //     (this.right() < obstacle.left()) ||
    //     (this.top() > obstacle.bottom()))
    // }
    // return this.obstacles.some(function (obstacle) {
    //   return (
    //     ((this.player.x + this.player.w) >= obstacle.x &&
    //       (obstacle.x + obstacle.w) > this.player.x &&
    //       (this.player.y + this.player.h) > obstacle.y &&
    //       (obstacle.y + obstacle.h) > this.player.y)
    //   );
    // }.bind(this));
    var length = this.obstacles.length
    for (var i = 0; i < length; i++) {
      if (
        ((this.player.x + this.player.w) >= this.obstacles[i].x &&
          (this.obstacles[i].x + this.obstacles[i].w) > this.player.x &&
          (this.player.y + this.player.h) > this.obstacles[i].y &&
          (this.obstacles[i].y + this.obstacles[i].h) > this.player.y)
      ) {
        return this.obstacles[i];
      }
    }
  },

  // clearObstacles: function () {
  //   this.obstacles = this.obstacles.filter(function (obstacle) {
  //     return obstacle.x >= 0;
  //   });
  // },

  generateEnemy: function () {
    this.enemies.push(new Enemy(this));
  },

  generateObstacle: function (obj) {
    this.obstacles.push(new Obstacle(this, obj));
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function () {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach(function (enemy) { enemy.draw(); });
    this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
  },

  moveAll: function () {
    //this.player.move();
    this.enemies.forEach(function (enemy) { enemy.move(); });
    this.player.setListeners();
    //this.obstacles.forEach(function (obstacle) { obstacle.move(); });
  }
}
