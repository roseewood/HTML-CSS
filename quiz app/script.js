const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
        ]
    },
    {
        question: "Which CSS property controls text size?",
        answers: [
            { text: "font-style", correct: false },
            { text: "text-size", correct: false },
            { text: "font-size", correct: true },
        ]
    },
    {
        question: "Which JS method selects an element by ID?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "querySelectorAll()", correct: false },
            { text: "getElementsByClassName()", correct: false },
        ]
    }
];

const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const scoreContainer = document.getElementById('score-container');
const progressEl = document.getElementById('progress');
const timerBar = document.getElementById('timer-bar');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    showQuestion();
    updateProgress();
}

function showQuestion() {
    resetState();
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if(answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
    });

    animateQuestion();
}

function resetState() {
    clearInterval(timer);
    timerBar.style.width = '100%';
    nextBtn.style.display = 'none';
    while(answerButtonsEl.firstChild) answerButtonsEl.removeChild(answerButtonsEl.firstChild);
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
    if(correct) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        if(button.dataset.correct === "true") button.classList.add('correct');
        button.disabled = true;
    });

    nextBtn.style.display = 'block';
    updateProgress();
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) showQuestion();
    else showScore();
});

restartBtn.addEventListener('click', startQuiz);

function showScore() {
    resetState();
    scoreContainer.style.display = 'block';
    scoreEl.innerText = `${score} / ${questions.length}`;
}

function updateProgress() {
    const progressPercent = ((currentQuestionIndex)/questions.length) * 100;
    progressEl.style.width = `${progressPercent}%`;
}

function startTimer() {
    timeLeft = 10;
    timerBar.style.width = '100%';
    timer = setInterval(() => {
        timeLeft -= 0.1;
        timerBar.style.width = `${(timeLeft/10)*100}%`;
        if(timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer({target:{dataset:{correct:"false"}}});
        }
    }, 100);
}

function animateQuestion() {
    questionEl.style.opacity = 0;
    questionEl.style.transform = 'translateY(20px)';
    setTimeout(() => {
        questionEl.style.transition = 'all 0.4s ease';
        questionEl.style.opacity = 1;
        questionEl.style.transform = 'translateY(0)';
    }, 50);
}

startQuiz();
