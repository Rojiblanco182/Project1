window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    Game.start("canvas");
  };
}

var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  // keys: {
  //   jump: 32,
  //   moveLeft: 37,
  //   moveRight: 39
  // },
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

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
      }

      this.score += 0.01;
      this.moveAll();
      this.drawAll();

      this.clearObstacles();
    }.bind(this), 1000 / this.fps);
  },

  reset: function () {
    this.background = new Background(this);
    this.player = new Player(this);
    this.framesCounter = 0;
    this.obstacles = [];
    this.score = 0;
  },

  clearObstacles: function () {
    this.obstacles = this.obstacles.filter(function (obstacle) {
      return obstacle.x >= 0;
    });
  },

  generateObstacle: function () {
    this.obstacles.push(new Obstacle(this));
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function () {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
  },

  moveAll: function () {
    //this.player.move();
    this.player.setListeners();
    this.obstacles.forEach(function (obstacle) { obstacle.move(); });
  }
}
