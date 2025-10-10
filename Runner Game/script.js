// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Game variables
let gameRunning = false;
let gameLoop;
let score = 0;
let highScore = localStorage.getItem('runnerHighScore') || 0;
let gameSpeed = 6;
let obstacleFrequency = 0.02;

// Player
const player = {
    x: 50,
    y: 0,
    width: 40,
    height: 50,
    velocityY: 0,
    gravity: 0.6,
    jumpPower: -12,
    grounded: false,
    color: '#4CAF50'
};

// Obstacles
let obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 50;

// Ground level
const groundY = canvas.height - 80;

// DOM Elements
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const finalScoreElement = document.getElementById('finalScore');
const gameOverDiv = document.getElementById('gameOver');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Initialize
highScoreElement.textContent = highScore;

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

// Jump controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
    }
});

canvas.addEventListener('click', jump);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    jump();
});

function jump() {
    if (gameRunning && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;
    }
}

function startGame() {
    gameRunning = true;
    score = 0;
    gameSpeed = 6;
    obstacles = [];
    player.y = groundY - player.height;
    player.velocityY = 0;
    player.grounded = true;
    
    startBtn.style.display = 'none';
    gameOverDiv.classList.add('hidden');
    
    gameLoop = requestAnimationFrame(update);
}

function restartGame() {
    startGame();
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(gameLoop);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('runnerHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    finalScoreElement.textContent = score;
    gameOverDiv.classList.remove('hidden');
    startBtn.style.display = 'inline-block';
}

function update() {
    if (!gameRunning) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update player physics
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    
    // Ground collision
    if (player.y >= groundY - player.height) {
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }
    
    // Draw ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
    
    // Draw ground line
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.stroke();
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw player eyes
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x + 10, player.y + 10, 8, 8);
    ctx.fillRect(player.x + 25, player.y + 10, 8, 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x + 13, player.y + 13, 3, 3);
    ctx.fillRect(player.x + 28, player.y + 13, 3, 3);
    
    // Create obstacles
    if (Math.random() < obstacleFrequency) {
        obstacles.push({
            x: canvas.width,
            y: groundY - obstacleHeight,
            width: obstacleWidth,
            height: obstacleHeight
        });
    }
    
    // Update and draw obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= gameSpeed;
        
        // Draw obstacle
        ctx.fillStyle = '#FF5722';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Draw obstacle details
        ctx.fillStyle = '#D84315';
        ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 10);
        
        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            score += 10;
            scoreElement.textContent = score;
            
            // Increase difficulty
            if (score % 100 === 0) {
                gameSpeed += 0.5;
                obstacleFrequency = Math.min(obstacleFrequency + 0.002, 0.03);
            }
        }
        
        // Collision detection
        if (checkCollision(player, obstacle)) {
            endGame();
            return;
        }
    }
    
    // Draw clouds
    drawClouds();
    
    gameLoop = requestAnimationFrame(update);
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Clouds for background
let clouds = [
    { x: 100, y: 50, size: 40 },
    { x: 300, y: 80, size: 50 },
    { x: 600, y: 60, size: 45 }
];

function drawClouds() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    clouds.forEach(cloud => {
        // Move clouds
        cloud.x -= 0.5;
        if (cloud.x + cloud.size * 2 < 0) {
            cloud.x = canvas.width;
        }
        
        // Draw cloud
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.5, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Initial draw
ctx.fillStyle = '#8B4513';
ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
ctx.strokeStyle = '#654321';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(0, groundY);
ctx.lineTo(canvas.width, groundY);
ctx.stroke();

drawClouds();

ctx.fillStyle = player.color;
ctx.fillRect(player.x, groundY - player.height, player.width, player.height);
ctx.fillStyle = 'white';
ctx.fillRect(player.x + 10, groundY - player.height + 10, 8, 8);
ctx.fillRect(player.x + 25, groundY - player.height + 10, 8, 8);
ctx.fillStyle = 'black';
ctx.fillRect(player.x + 13, groundY - player.height + 13, 3, 3);
ctx.fillRect(player.x + 28, groundY - player.height + 13, 3, 3);
