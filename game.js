const canvas = document.getElementById("game");

const context = canvas.getContext("2d");

context.beginPath();
context.rect(0, 0, 100, 100);
context.closePath();
context.strokeStyle = "red";
context.stroke();
context.beginPath();

context.moveTo(250, 200);
context.arc(200, 200, 50, 0, Math.PI * 2, false);
context.stroke();
context.closePath();

context.beginPath();
context.moveTo(350, 300);
context.arc(300, 300, 50, 0, Math.PI * 2, false);
context.fill();
context.stroke();
context.closePath();
