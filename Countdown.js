var Clock = {
  update: function (countdown, ctx) {
    ctx.font = "60px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(countdown, 50, 50);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeText(countdown, 50, 50);
  }
}