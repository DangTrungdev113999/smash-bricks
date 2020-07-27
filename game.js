const canvas = document.getElementById("game");

const context = canvas.getContext("2d");

context.moveTo(0, 0);
context.lineTo(100, 0);
context.lineTo(100, 50);
context.lineTo(0, 50);
context.lineTo(0, 0);
context.stroke();

context.moveTo(100, 100);
context.lineTo(200, 100);
context.lineTo(200, 200);
context.lineTo(100, 200);
context.lineTo(100, 100);
context.stroke();
