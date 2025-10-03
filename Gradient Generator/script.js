const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color1Text = document.getElementById('color1Text');
const color2Text = document.getElementById('color2Text');
const direction = document.getElementById('direction');
const gradientPreview = document.getElementById('gradientPreview');
const cssCode = document.getElementById('cssCode');
const copyBtn = document.getElementById('copyBtn');
const copyText = document.getElementById('copyText');
const randomBtn = document.getElementById('randomBtn');

function updateGradient() {
    const dir = direction.value;
    const c1 = color1.value;
    const c2 = color2.value;
    
    let gradientCSS;
    
    if (dir === 'circle') {
        gradientCSS = `radial-gradient(circle, ${c1}, ${c2})`;
    } else {
        gradientCSS = `linear-gradient(${dir}, ${c1}, ${c2})`;
    }
    
    gradientPreview.style.background = gradientCSS;
    cssCode.textContent = `background: ${gradientCSS};`;
    
    color1Text.value = c1;
    color2Text.value = c2;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomGradient() {
    color1.value = getRandomColor();
    color2.value = getRandomColor();
    
    const directions = [
        'to right', 'to left', 'to bottom', 'to top',
        'to bottom right', 'to bottom left', 'to top right', 'to top left',
        'circle'
    ];
    direction.value = directions[Math.floor(Math.random() * directions.length)];
    
    updateGradient();
    
    gradientPreview.style.transform = 'scale(0.95)';
    setTimeout(() => {
        gradientPreview.style.transform = 'scale(1)';
    }, 150);
}

async function copyToClipboard() {
    const code = cssCode.textContent;
    
    try {
        await navigator.clipboard.writeText(code);
        
        copyText.textContent = 'COPIED!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyText.textContent = 'COPY CSS';
            copyBtn.classList.remove('copied');
        }, 2000);
        
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            copyText.textContent = 'COPIED!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyText.textContent = 'COPY CSS';
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            copyText.textContent = 'FAILED';
            setTimeout(() => {
                copyText.textContent = 'COPY CSS';
            }, 2000);
        }
        
        document.body.removeChild(textArea);
    }
}

color1.addEventListener('input', updateGradient);
color2.addEventListener('input', updateGradient);
direction.addEventListener('change', updateGradient);
copyBtn.addEventListener('click', copyToClipboard);
randomBtn.addEventListener('click', generateRandomGradient);

updateGradient();
