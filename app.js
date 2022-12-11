const canvas = document.getElementById("canvas");
let width = 600;
canvas.width = width;
canvas.height = width;
const ctx = canvas.getContext("2d");
const drawBoard = () => {
  ctx.fillStyle = "#feca57";
  ctx.fillRect(0, 0, width, width);
};
let vX = 10;
let vY = 0;
let snake = [
  {
    x: 140,
    y: 80,
  },
  {
    x: 130,
    y: 80,
  },
  {
    x: 120,
    y: 80,
  },
  {
    x: 110,
    y: 80,
  },
  {
    x: 100,
    y: 80,
  },
];
const drawSnake = () => {
  snake.map((a, b) => {
    ctx.fillStyle = b === 0 ? "#a29bfe" : "#fff";
    ctx.fillRect(a.x, a.y, 10, 10);
  });
};
const moveSnake = () => {
  let head = { x: snake[0].x + vX, y: snake[0].y + vY };
  snake.unshift(head);
  snake.pop();
};
let score = 0;
const drawScore = () => {
  ctx.font = "20px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Score : " + score, 500, 20);
};
let apple = {
  x: 8,
  y: 28,
};
const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * 10, apple.y * 10, 10, 10);
};
const makeApple = () => {
  apple.x = Math.floor((Math.random() * width) / 10);
  apple.y = Math.floor((Math.random() * width) / 10);
};
const checkAppleEat = () => {
  if (snake[0].x === apple.x * 10 && snake[0].y === apple.y * 10) {
    snake.push(apple);
    makeApple();
    score++;
  }
};
const game = () => {
  drawBoard();
  drawScore();
  drawSnake();
  drawApple();
  moveSnake();
  checkAppleEat();
  checkDie();
};
const checkDie = () => {
  if (
    snake[0].x >= width ||
    snake[0].x < 0 ||
    snake[0].y >= width ||
    snake[0].y < 0
  ) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER !", 10, 20);
    clearInterval(gameInterval);
  }
};
let speed = 30;
let gameInterval = setInterval(game, 1000 / speed);
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 16:
      speed = 60;
      clearInterval(gameInterval);
      gameInterval = setInterval(game, 1000 / speed);
      break;
    case 87:
      vX = 0;
      vY = -10;
      break;
    case 68:
      vX = 10;
      vY = 0;
      break;
    case 65:
      vX = -10;
      vY = 0;
      break;
    case 83:
      vX = 0;
      vY = 10;
      break;
  }
});
