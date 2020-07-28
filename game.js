const canvas = document.getElementById("game");

const context = canvas.getContext("2d");

const colors = [
  "Khaki",
  "Indigo",
  "LawnGreen",
  "LightCoral",
  "Lavender",
  "LightPink",
  "tomato",
  "LightSeaGreen",
  "LightSalmon",
];
let color = "tomato";

let IS_GAME_OVER = false;
let IS_GAME_START = false;

const paddle = {
  width: 350,
  height: 10,
  x: canvas.width / 2 - 350 / 2,
  y: canvas.height - 10,
  speed: 20,
  isMoveLeft: false,
  isMoveRight: false,
};

const ball = {
  x: paddle.x + paddle.width / 2,
  y: paddle.y - 20,
  dx: 5,
  dy: 2,
  radius: 20,
};

const brickConfig = {
  offsetX: 25,
  offsetY: 25,
  margin: 25,
  width: 70,
  height: 15,
  totalRow: 3,
  totalCol: 5,
};

const bricklist = [];

// OFFSET * 2 + WIDTH * 5 + MARGIN * 4 = 500;
// MARGIN = OFFSET = 25 => WIDTH = 70 height = 15
// ROW = 3
// COL = 5
(function initBricks() {
  for (let i = 0; i < brickConfig.totalRow; i++) {
    for (let j = 0; j < brickConfig.totalCol; j++) {
      bricklist.push({
        x: brickConfig.offsetX + j * (brickConfig.width + brickConfig.margin),
        y: brickConfig.offsetY + i * (brickConfig.height + brickConfig.margin),
        isBreak: false,
      });
    }
  }
})();

function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.fillStyle = "red";
  context.fill();
  context.strokeStyle = "red";
  context.stroke();
  context.closePath();
}

function drawBricks() {
  bricklist.forEach((b) => {
    if (!b.isBreak) {
      context.beginPath();
      context.rect(b.x, b.y, brickConfig.width, brickConfig.height);
      context.fillStyle = "red";
      context.fill();
      context.closePath();
    }
  });
}

function changeColor() {
  let randomIdx = Math.trunc(Math.random() * colors.length);
  if (color === colors[randomIdx]) changeColor();
  else color = colors[randomIdx];
}

(function handlePaddleFlag() {
  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 39) {
      paddle.isMoveRight = false;
    } else if (e.keyCode === 37) {
      paddle.isMoveLeft = false;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 39) {
      paddle.isMoveRight = true;
    } else if (e.keyCode === 37) {
      paddle.isMoveLeft = true;
    }

    if (e.keyCode === 32) {
      IS_GAME_START = true;
    }
  });
})();

function handlePaddlePosition() {
  if (paddle.isMoveLeft) {
    paddle.x -= paddle.speed;
  } else if (paddle.isMoveRight) {
    paddle.x += paddle.speed;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  } else if (paddle.x > canvas.width - paddle.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function handleBallCollideBounds() {
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    changeColor();
    ball.dx = -ball.dx;
  }
  if (ball.y < ball.radius) {
    changeColor();
    ball.dy = -ball.dy;
  }
}

function handleBallColliPaddle() {
  if (
    ball.x + ball.radius >= paddle.x &&
    ball.x + ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= canvas.height - paddle.height
  ) {
    ball.dy = -ball.dy;
  }
}

function handleBallColliBrick() {
  bricklist.forEach((b) => {
    if (!b.isBreak) {
      if (
        ball.x >= b.x &&
        ball.x <= b.x + brickConfig.width &&
        ball.y + ball.radius >= b.y &&
        ball.y - ball.radius <= b.y + brickConfig.height
      ) {
        ball.dy = -ball.dy;
        b.isBreak = true;
      }
    }
  });
}

function updateBallPosition() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function checkGameOver() {
  if (ball.y > canvas.height - ball.radius) {
    IS_GAME_OVER = true;
  }
}

function handleGameOver() {
  IS_GAME_START = false;
  console.log("GAME OVER");
}

function printPosition() {
  const xElement = document.getElementById("x");
  const yElement = document.getElementById("y");
  xElement.innerHTML = `x : ${ball.x}`;
  yElement.innerHTML = `y : ${ball.y}`;
}

function draw() {
  if (!IS_GAME_OVER) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();

    if (IS_GAME_START) {
      handleBallCollideBounds();
      updateBallPosition();

      handlePaddlePosition();
      handleBallColliPaddle();
      handleBallColliBrick();
    }

    checkGameOver();
    printPosition();
    requestAnimationFrame(draw);
  } else {
    handleGameOver();
  }
}

draw();
