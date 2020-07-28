const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let isGameOver = false;

const ball = {
  x: 20,
  y: 20,
  dx: 1,
  dy: 3,
  radius: 20,
};

const paddle = {
  x: 0,
  y: canvas.width,
  width: 70,
  height: 10,
  speed: 20,
  isMoveLeft: false,
  isMoveRight: false,
};

function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  context.fillStyle = "tomato";
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddle.x, paddle.y - paddle.height, paddle.width, paddle.height);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}

(function movePaddle() {
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
  });
})();

function handleBallcollideBound() {
  if (ball.x < ball.radius || ball.x >= canvas.width - ball.radius) {
    ball.dx = -ball.dx;
  }

  if (ball.y < ball.radius) {
    ball.dy = -ball.dy;
  }
}

function updateBallPosition() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function handlePaddingPosition() {
  if (paddle.isMoveRight) {
    paddle.x += paddle.speed;
  } else if (paddle.isMoveLeft) {
    paddle.x -= paddle.speed;
  }

  if (paddle.x <= 0) {
    paddle.x = 0;
  } else if (paddle.x >= canvas.width - paddle.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function handleBallCollidePaddle() {
  if (
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width &&
    ball.y + ball.radius >= canvas.height - paddle.height
  ) {
    ball.dy = -ball.dy;
  }
}

function checkGameOver() {
  if (ball.y >= canvas.height - ball.radius) {
    isGameOver = true;
  }
}

function draw() {
  if (!isGameOver) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();

    handleBallcollideBound();
    updateBallPosition();
    handleBallCollidePaddle();

    handlePaddingPosition();

    checkGameOver();
    requestAnimationFrame(draw);
  } else {
    console.log("Game over");
  }
}

draw();
