// --- DOM Elements ---
const canvas = document.getElementById('drawingCanvas');
const clearButton = document.getElementById('clearButton');
const colorPicker = document.getElementById('colorPicker');

const fillDisplay = document.getElementById('fillDisplay').querySelector('span');
const ctx = canvas.getContext('2d');

// --- State Variables ---
let paint = false;
let coord = { x: 0, y: 0 };


ctx.strokeStyle = colorPicker.value;
ctx.fillStyle = colorPicker.value;
ctx.lineWidth = 5;
ctx.lineCap = 'round';


fillDisplay.style.color = colorPicker.value;
fillDisplay.textContent = colorPicker.value;


// --- Utility Functions ---
function getPosition(event) {
    // Check for touch data (e.touches) or fall back to mouse data (e.clientX)
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    // Calculate canvas coordinates
    coord.x = clientX - canvas.offsetLeft;
    coord.y = clientY - canvas.offsetTop;
}

// --- Painting Logic ---

function startPainting(event) {
    paint = true;
    getPosition(event);
    // Begin a new path immediately on mousedown/touchstart
    ctx.beginPath();
}

function stopPainting() {
    paint = false;
    // Clear the current path on mouseup/touchend to prevent unwanted lines
    ctx.beginPath();
}

function sketch(event) {
    if (!paint) return;

    ctx.moveTo(coord.x, coord.y);


    getPosition(event);

    ctx.lineTo(coord.x, coord.y);

    ctx.stroke();
}

// --- Event Listeners ---

window.addEventListener('load', () => {

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);


    canvas.addEventListener('touchstart', startPainting);
    canvas.addEventListener('touchend', stopPainting);
    canvas.addEventListener('touchmove', sketch);


    // important for touch devices

    canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchend', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
});


colorPicker.addEventListener('input', (event) => {
    ctx.strokeStyle = event.target.value;
    console.log(`Stroke Color updated: ${ctx.strokeStyle}`);
});


colorPicker.addEventListener('change', (event) => {
    const newFillColor = event.target.value;
    ctx.fillStyle = newFillColor;


    fillDisplay.style.color = newFillColor;
    fillDisplay.textContent = newFillColor;

    console.log(`Fill Color set to: ${ctx.fillStyle}`);
});


clearButton.addEventListener('click', () => {

    const currentStroke = ctx.strokeStyle;
    const currentFill = ctx.fillStyle;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = currentFill;
    ctx.strokeStyle = currentStroke;

    console.log('Canvas cleared.');
});