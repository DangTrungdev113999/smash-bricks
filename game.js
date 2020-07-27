const canvas = document.getElementById("game");

const context = canvas.getContext("2d");

let x = 20,
  y = 20;

function drawBall() {
  context.beginPath();
  context.arc(x, x, 20, 0, Math.PI * 2, false);
  context.fillStyle = "tomato";
  context.fill();
  context.strokeStyle = "tomato";
  context.stroke();
  context.closePath();
}

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += 2;
  y += 2;
}, 100);
