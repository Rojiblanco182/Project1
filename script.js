window.onload = function () {

  Game.start("canvas");

  document.getElementById("start-button").onclick = function () {
    Game.startGame = true;
    //Game.mainTrack.play();
  };
}

var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  clock: undefined,
  startGame: false,

  start: function (canvasId) {



    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fps = 60;
    this.countdown = 15;
    this.mainTrack = new Audio("music/main-track.mp3");
    this.creditsTrack = new Audio("music/End Credits.mp3");

    this.reset();


    this.interval = setInterval(function () {
      this.clear();

      if (!this.startGame) {

        //this.introBg = { img: "intro-back.png", x: 0, y: 0, w: this.canvas.width, h: this.canvas.height };
        this.introBg = new Background(this, { img: "images/intro-back.jpg", x: 0, y: 0, w: this.canvas.width, h: this.canvas.height });
        this.introBg.draw();
      }

      else {

        this.mainTrack.play();

        if (this.countdown == 0) this.gameOver();

        if (this.player.x >= this.canvas.width - 250 && this.player.y >= this.canvas.height * 0.8) this.gameCompleted();

        this.framesCounter++;

        if (this.framesCounter > 1000) this.framesCounter = 0


        if (this.framesCounter % this.fps === 0) this.countdown--;

        // if (this.framesCounter % 150 === 0) {
        //   this.generateEnemy({ img: "images/batman-prueba.png", x0: this.canvas.width / 2.7, y: (this.canvas.height * 0.65) - 100 });
        // }

        //this.score += 0.01;
        this.moveAll();
        this.drawAll();

        this.clearBullets();
        this.enemyKilled();
        this.checkBulletsCollision();
      }

    }.bind(this), 1000 / this.fps);
  },

  reset: function () {
    //this.background = new Background(this);
    this.backgrounds = [];
    this.player = new Player(this);
    this.enemies = [];
    this.countdown = 15;
    this.framesCounter = 0;
    this.clock = Clock;
    this.obstacles = [];
    this.generateBg({ img: "images/back2.png", x: 0, y: 0, w: this.canvas.width, h: this.canvas.height });
    this.generateBg({ img: "images/batmobile.png", x: this.canvas.width - 250, y: this.canvas.height * 0.82, w: 250, h: 125 });
    this.generateObstacle({ img: "images/smile.jpg", posX: 13, posY: this.canvas.height * 0.76, width: 150, height: 25 });
    this.generateObstacle({ img: "images/smile.jpg", posX: this.canvas.width / 2.7, posY: this.canvas.height * 0.65, width: 250, height: 350 });
    this.generateEnemy({ img: "images/joker.png", frames: 2, x0: this.canvas.width / 2, y: this.canvas.height * 0.8, width: 650 });
    this.generateEnemy({ img: "images/soldier.png", frames: 10, x0: this.canvas.width / 2.7, y: (this.canvas.height * 0.63) - 80, width: 250 });
    this.generateEnemy({ img: "images/soldier.png", frames: 10, x0: 200, y: this.canvas.height * 0.8, width: 400 });
  },

  gameOver: function () {
    this.mainTrack.stop();
    clearInterval(this.interval);
    //clearInterval(this.countdownInterval);
    this.creditsTrack.play();

    if (confirm("Game Over. Wanna play again?")) {
      this.reset();
      this.start();
    }
  },

  gameCompleted: function () {
    //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mainTrack.stop();
    clearInterval(this.interval);
    //clearInterval(this.countdownInterval);
    this.introBg = new Background(this, { img: "images/intro-back.jpg", x: 0, y: 0, w: this.canvas.width, h: this.canvas.height });
    this.introBg.draw();
    this.creditsTrack.play();
    if (confirm("Well done! Mission accomplished! Wanna play again?")) {
      this.reset();
      this.start();
    }
  },

  enemyKilled: function () {
    this.enemies.forEach(function (enemy, i) {
      this.player.batarangs.forEach(function (batarang, j) {

        if (
          batarang.x <= enemy.x + enemy.dw &&
          batarang.x + batarang.w >= enemy.x &&
          batarang.y >= enemy.y &&
          batarang.y <= enemy.dh + enemy.y
        ) {
          this.enemies.splice(i, 1);
          this.player.batarangs.splice(j, 1);
        }
      }.bind(this))
    }.bind(this))
  },

  checkBulletsCollision: function () {
    this.obstacles.forEach(function (obstacle) {
      this.player.batarangs.forEach(function (batarang, j) {

        if (
          batarang.x <= obstacle.x + obstacle.w &&
          batarang.x + batarang.w >= obstacle.x &&
          batarang.y >= obstacle.y &&
          batarang.y <= obstacle.h + obstacle.y
        ) {
          this.player.batarangs.splice(j, 1);
        }
      }.bind(this))
    }.bind(this))
  },

  checkCollision: function () {

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

  clearBullets: function () {
    this.player.batarangs = this.player.batarangs.filter(function (batarang) {
      return batarang.x >= 0 && batarang.x <= this.canvas.width;
    });
  },

  generateBg: function (obj) {
    this.backgrounds.push(new Background(this, obj));
  },

  generateEnemy: function (obj) {
    this.enemies.push(new Enemy(this, obj));
  },

  generateObstacle: function (obj) {
    this.obstacles.push(new Obstacle(this, obj));
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function () {
    //this.background.draw();
    this.backgrounds.forEach(function (background) { background.draw(); });
    this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
    this.drawClock();
    this.player.draw();
    this.enemies.forEach(function (enemy) { enemy.draw(); });
  },

  moveAll: function () {
    this.enemies.forEach(function (enemy) { enemy.move(); });
    this.player.setListeners();
    //this.obstacles.forEach(function (obstacle) { obstacle.move(); });
  },

  drawClock: function () {
    this.clock.update(this.countdown, this.ctx)
  }
}
