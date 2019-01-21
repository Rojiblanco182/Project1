window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  }
}

var game = {
  background: drawBackground()
}

function drawBackground(){
  var addCanvasHTML = document.createElement("canvas");
  addCanvasHTML.setAttribute("id", "canvas");
  document.body.appendChild(addCanvasHTML);
}