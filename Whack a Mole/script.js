let score = 0;
let timeLeft = 30;
let gameActive = false;
let highScore = 0;
let moleTimer;
let countdownTimer;

const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const highScoreDisplay = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const holes = document.querySelectorAll('.hole');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');

startBtn.addEventListener('click', toggleGame);

holes.forEach(hole => {
    hole.addEventListener('click', whackMole);
});

function toggleGame() {
    if (gameActive) {
        endGame();
    } else {
        startGame();
    }
}

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    gameOverDiv.classList.add('hidden');
    
    startBtn.textContent = 'Stop Game';
    startBtn.classList.add('stop');
    
    countdownTimer = setInterval(updateTimer, 1000);
    moleTimer = setInterval(showRandomMole, 800);
}

function endGame() {
    gameActive = false;
    
    clearInterval(countdownTimer);
    clearInterval(moleTimer);
    
    holes.forEach(hole => hole.classList.remove('active'));
    
    startBtn.textContent = 'Start Game';
    startBtn.classList.remove('stop');
    
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
    }
    
    finalScoreDisplay.textContent = score;
    gameOverDiv.classList.remove('hidden');
}

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function showRandomMole() {
    if (!gameActive) return;
    
    holes.forEach(hole => hole.classList.remove('active'));
    
    const randomIndex = Math.floor(Math.random() * holes.length);
    holes[randomIndex].classList.add('active');
    
    setTimeout(() => {
        holes[randomIndex].classList.remove('active');
    }, 700);
}

function whackMole(e) {
    if (!gameActive) return;
    
    const hole = e.currentTarget;
    
    if (hole.classList.contains('active')) {
        score++;
        scoreDisplay.textContent = score;
        hole.classList.remove('active');
    }
}