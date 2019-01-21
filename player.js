function Player(game) {
  this.game = game;
  this.x = this.game.canvas.width * 0.08;
  this.y0 = this.game.canvas.height * 0.08;
  this.y = this.y0;

  this.batman = new Image();
  this.batman.src = "images/batman-prueba.png";

  this.w = 75;
  this.h = 100;

  this.vy = 1;

  this.setListeners();
}

Player.prototype.draw = function () {
  this.game.ctx.drawImage(this.batman, this.x, this.y, this.w, this.h);
}


Player.prototype.setListeners = function () {
  document.onkeydown = function (event) {
    switch (event.keyCode) {
      case 32:
        var gravity = 0.4;

        if (this.y >= this.y0) {
          this.vy -= 10;
          this.y -= 25;
        }
        else {
          this.vy += gravity;
          this.y += this.vy;
        }
        break;

      case 37:
        this.x -= 25;
        break;

      case 39:
        this.x += 25;
        break;
    }
  }.bind(this);
}

function jump() {

  console.log(Player.y);
}

