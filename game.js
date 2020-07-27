const canvas = document.getElementById("game");

const context = canvas.getContext("2d");

context.strokeStyle = "blue";

context.rect(0, 0, 100, 50);
context.stroke();
context.fillStyle = "tomato";

context.fill();
