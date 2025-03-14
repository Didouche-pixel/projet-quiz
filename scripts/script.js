// Données des questions
const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        answers: [
            { text: "Londres", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        answers: [
            { text: "Océan Atlantique", correct: false },
            { text: "Océan Indien", correct: false },
            { text: "Océan Arctique", correct: false },
            { text: "Océan Pacifique", correct: true }
        ]
    },
    {
        question: "Quel est le plus grand désert du monde ?",
        answers: [
            { text: "Désert du Sahara", correct: true },
            { text: "Désert de Gobi", correct: false },
            { text: "Désert d'Atacama", correct: false },
            { text: "Désert d'Arabie", correct: false }
        ]
    },
    {
        question: "Qui a peint La Joconde ?",
        answers: [
            { text: "Pablo Picasso", correct: false },
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "Quelle planète est connue comme la planète rouge ?",
        answers: [
            { text: "Vénus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturne", correct: false }
        ]
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;

// Éléments DOM
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreValue = document.getElementById('score-value');

// Event listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startQuiz);

// Fonctions
function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    
    startButton.style.display = 'none';
    nextButton.style.display = 'none';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    
    if (correct) {
        score++;
    }
    
    Array.from(answersContainer.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true;
    });
    
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'none';
        showResults();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreValue.innerText = score;
}