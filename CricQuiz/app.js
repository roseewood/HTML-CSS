const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const questionContainerElement = document.querySelector('#question-container');
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-buttons');
let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener('click', start);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion()
});

function start() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    nextQuestion()

}

function nextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');

    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');

    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Who was the first batsman to score a double century in ODI cricket?',
        answers: [
            { text: 'Virender Sehwag', correct: false },
            { text: 'Sachin Tendulkar', correct: true },
            { text: 'Rohit Sharma', correct: false },
            { text: 'Chris Gayle', correct: false }
        ]
    },
    {
        question: 'Which bowler has taken the most wickets in Test cricket?',
        answers: [
            { text: 'Muttiah Muralitharan', correct: true },
            { text: 'Shane Warne', correct: false },
            { text: 'James Anderson', correct: false },
            { text: 'Anil Kumble', correct: false }
        ]
    },
    {
        question: 'Who was the captain of India when they won the 2007 T20 World Cup?',
        answers: [
            { text: 'Sourav Ganguly', correct: false },
            { text: 'MS Dhoni', correct: true },
            { text: 'Rahul Dravid', correct: false },
            { text: 'Virat Kohli', correct: false }
        ]
    },
    {
        question: 'Which player holds the record for the fastest century in ODI cricket?',
        answers: [
            { text: 'AB de Villiers', correct: true },
            { text: 'Corey Anderson', correct: false },
            { text: 'Shahid Afridi', correct: false },
            { text: 'Glenn Maxwell', correct: false }
        ]
    },
    {
        question: 'Who won the ICC Cricket World Cup in 2011?',
        answers: [
            { text: 'Australia', correct: false },
            { text: 'Sri Lanka', correct: false },
            { text: 'India', correct: true },
            { text: 'Pakistan', correct: false }
        ]
    },
    {
        question: 'Where was the first ever Day-Night Test match played?',
        answers: [
            { text: 'Adelaide Oval', correct: true },
            { text: 'Lords', correct: false },
            { text: 'Eden Gardens', correct: false },
            { text: 'MCG', correct: false }
        ]
    },
];
