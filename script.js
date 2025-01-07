const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let speed = 3;
let isGameOver = false;
let distance = 0;

const stickman = {
  x: 50,
  y: 230,
  width: 30,
  height: 60,
  speed: speed,
  isJumping: false,
  isSliding: false,
  draw: function() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  jump: function() {
    if (!this.isJumping && !this.isSliding) {
      this.isJumping = true;
      this.y -= 100;
      setTimeout(() => {
        this.y += 100;
        this.isJumping = false;
      }, 300);
    }
  },
  slide: function() {
    if (!this.isJumping && !this.isSliding) {
      this.isSliding = true;
      this.height = 30; // Slide height
      setTimeout(() => {
        this.height = 60;
        this.isSliding = false;
      }, 300);
    }
  }
};

const crow = {
  x: canvas.width,
  y: 230,
  width: 40,
  height: 40,
  speed: 3,
  draw: function() {
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.fill();
  },
  move: function() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = canvas.width;
    }
  }
};

function drawGame() {
  if (isGameOver) {
    document.getElementById("gameOver").style.display = "block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stickman.draw();
  crow.draw();
  crow.move();

  distance++;
  if (distance % 100 === 0) {
    stickman.speed += 0.1; // Increase speed
  }

  // Check for collision with crow
  if (
    stickman.x < crow.x + crow.width &&
    stickman.x + stickman.width > crow.x &&
    stickman.y < crow.y + crow.height &&
    stickman.y + stickman.height > crow.y
  ) {
    isGameOver = true;
  }

  requestAnimationFrame(drawGame);
}

document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "ArrowUp") {
    stickman.jump();
  } else if (e.key === "ArrowDown") {
    stickman.slide();
  }
});

// Mobile controls
document.getElementById("jumpButton").addEventListener("click", () => {
  stickman.jump();
});

document.getElementById("slideButton").addEventListener("click", () => {
  stickman.slide();
});

function resetGame() {
  isGameOver = false;
  stickman.x = 50;
  stickman.y = 230;
  stickman.speed = speed;
  distance = 0;
  crow.x = canvas.width;
  document.getElementById("gameOver").style.display = "none";
  drawGame();
}

drawGame();
