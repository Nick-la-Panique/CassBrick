document.addEventListener("DOMContentLoaded", function() {

// Sélectionner le canvas et obtenir son contexte 2D
const canvas = document.getElementById("gameCassBrick");
const ctx = canvas.getContext("2d");

// Définir les paramètres du jeu
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;

// Créer les briques
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Définir la raquette
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Définir la balle
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2;
let ballDY = -2;

// Gérer les contrôles de la raquette
let rightPressed = false;
let leftPressed = false;

// Fonction pour détecter les touches enfoncées
function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = true;
  }
}

// Fonction pour détecter les touches relâchées
function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// Ajouter des écouteurs d'événements pour les touches
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Variables pour la position de la souris
let mouseX = 0;

// Fonction de mise à jour de la position de la souris
function mouseMoveHandler(event) {
  const relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    mouseX = relativeX - paddleWidth / 2;
  }
}

// Ajouter un écouteur d'événement pour le mouvement de la souris
document.addEventListener("mousemove", mouseMoveHandler, false);

// Fonction de détection de collision entre la balle et les briques
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          ballX > brick.x &&
          ballX < brick.x + brickWidth &&
          ballY > brick.y &&
          ballY < brick.y + brickHeight
        ) {
          ballDY = -ballDY;
          brick.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("Tu as gagné !");
            document.location.reload();
          }
        }
      }
    }
  }
}

// Fonction de dessin du score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

// Fonction de dessin de la balle
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  // Fonction de dessin de la raquette
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  // Fonction de dessin des briques
  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  
  // Fonction de mise à jour des positions des éléments du jeu
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
  
    // Déplacer la balle
    ballX += ballDX;
    ballY += ballDY;
  
    // Rebondir la balle sur les bords
    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
      ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
      ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - ballRadius) {
      // Vérifier si la balle touche la raquette
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
      } else {
        // La balle est sortie du bas du canvas, fin du jeu
        alert("Game Over");
        document.location.reload();
      }
    }
  
    // Déplacer la raquette
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  
    requestAnimationFrame(update);
  }
  // Fonction de mise à jour des positions des éléments du jeu
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
  
    // Déplacer la balle
    ballX += ballDX;
    ballY += ballDY;
  
    // Rebondir la balle sur les bords
    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
      ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
      ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - ballRadius) {
      // Vérifier si la balle touche la raquette
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
      } else {
        // La balle est sortie du bas du canvas, fin du jeu
        alert("Game Over");
        document.location.reload();
      }
    }
  
    // Déplacer la raquette avec les touches fléchées
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  
    // Déplacer la raquette avec la souris
    paddleX = mouseX;
  
    requestAnimationFrame(update);
  }
  // Lancer le jeu
  update();
  
});