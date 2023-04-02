const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Paddle and ball properties
const paddleWidth = 10;
const paddleHeight = 60;
const ballSize = 6;

// Game objects
const leftPaddle = { x: 10, y: canvas.height / 2 - paddleHeight / 2, speed: 4, score: 0 };
const rightPaddle = { x: canvas.width - 10 - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, speed: 4, score: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 2, dy: 2, speed: 4 };

// Key states
const keys = { w: false, s: false, up: false, down: false };

// Helper functions
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = '24px Arial';
  context.fillText(text, x, y);
}

function movePaddle(paddle, direction) {
  const newY = paddle.y + (direction * paddle.speed);

  if (newY >= 0 && newY <= canvas.height - paddleHeight) {
    paddle.y = newY;
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = Math.random() * 4 - 2;
}

function update() {
  // Move the ball
  ball.x += ball.dx * ball.speed;
  ball.y += ball.dy * ball.speed;

  // Ball collision with top and bottom walls
  if (ball.y <= 0 || ball.y + ballSize >= canvas.height) {
    ball.dy = -ball.dy;
  }

  // Ball collision with left and right paddles
  if (
    (ball.x <= leftPaddle.x + paddleWidth && ball.y + ballSize >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight) ||
    (ball.x + ballSize >= rightPaddle.x && ball.y + ballSize >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight)
  ) {
    ball.dx = -ball.dx;
  }

  // Ball reset after scoring
  if (ball.x < 0) {
    rightPaddle.score++;
    resetBall();
  } else if (ball.x + ballSize > canvas.width) {
    leftPaddle.score++;
    resetBall();
  }

  // Move paddles based on user input
  if (keys.w) movePaddle(leftPaddle, -1);
  if (keys.s) movePaddle(leftPaddle, 1);
  if (keys.up) movePaddle(rightPaddle, -1);
  if (keys.down) movePaddle(rightPaddle, 1);
}
function draw() {
    // Clear the canvas
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw the paddles and ball
    drawRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, 'white');
    drawRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, 'white');
    drawCircle(ball.x, ball.y, ballSize, 'white');
  
    // Draw the score
    drawText(leftPaddle.score, canvas.width / 2 - 50, 30, 'white');
    drawText(rightPaddle.score, canvas.width / 2 + 30, 30, 'white');
  
    // Draw the dashed line
    for (let i = 0; i < canvas.height; i += 15) {
      drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
    }
  }
  
  // Keyboard input handlers
  window.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'ArrowUp') keys.up = true;
    if (e.key === 'ArrowDown') keys.down = true;
  });
  
  window.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'ArrowUp') keys.up = false;
    if (e.key === 'ArrowDown') keys.down = false;
  });
  
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
  