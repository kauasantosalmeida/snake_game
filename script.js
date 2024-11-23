var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0; // Inicialmente parado
var velocityY = 0;

var snakeBody = [];
var foodX;
var foodY;

var score = 0; // Variável para armazenar o placar
var scoreDisplay; // Elemento HTML para exibir o placar

window.onload = function () {
    // Configuração do canvas
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // Seleciona o elemento do placar no HTML
    scoreDisplay = document.getElementById("scoreDisplay");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10); // Atualização a cada 100ms
};

function update() {
    // Preenche o canvas com fundo preto
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Desenha a comida (vermelha)
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Verifica se a cobra colidiu com a comida
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); // Adiciona novo segmento ao corpo
        score++; // Incrementa o placar
        scoreDisplay.textContent = "Score: " + score; // Atualiza o texto do placar no HTML
        placeFood();
    }

    // Move o corpo da cobra
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move a cabeça da cobra
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Verifica colisão com os limites do canvas
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver();
        }
    }

    // Desenha a cobra (cabeça + corpo)
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // Cabeça
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); // Corpo
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function gameOver() {
    alert("Game Over!\nYour Score: " + score);
    location.reload(); // Reinicia o jogo
}
