
document.addEventListener('DOMContentLoaded', () => {
    initExam();
});

let allQuestions = [];
let examQuestions = [];
let userAnswers = {}; // Store answers { questionIndex: selectedValue }
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 20 * 60; // 20 minutes

// Elements
const startScreen = document.getElementById('start-screen');
const examContainer = document.getElementById('exam-container');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const currentQuestionContainer = document.getElementById('current-question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const resultScreen = document.getElementById('result-screen');
const finalScoreDisplay = document.getElementById('final-score');
const timeTakenDisplay = document.getElementById('time-taken');

async function initExam() {
    try {
        const response = await fetch('quizzes.json');
        const data = await response.json();
        
        Object.values(data.quizzes).forEach(topicQs => {
            allQuestions = allQuestions.concat(topicQs);
        });

        startBtn.addEventListener('click', startExam);
        
    } catch (error) {
        console.error("Error loading exam", error);
        startScreen.innerHTML = "<p>Error loading content. Please check console.</p>";
    }
}

function startExam() {
    startScreen.classList.add('hidden');
    examContainer.classList.remove('hidden');
    timerDisplay.classList.remove('hidden');

    const pool = [...allQuestions].sort(() => 0.5 - Math.random());
    examQuestions = pool.slice(0, 30);
    
    // Shuffle options once for each question so they don't reshuffle on navigation
    examQuestions.forEach(q => {
        if (!q.shuffledOptions) {
            q.shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
        }
    });

    currentQuestionIndex = 0;
    userAnswers = {};
    
    renderCurrentQuestion();
    updateNavigationControls();
    startTimer();
    
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    finishBtn.addEventListener('click', finishExam);
}

function renderCurrentQuestion() {
    const q = examQuestions[currentQuestionIndex];
    const total = examQuestions.length;
    
    // Save current selection if exists (already saved in change handler, but good to know)
    const savedAnswer = userAnswers[currentQuestionIndex];

    let optionsHtml = '';
    q.shuffledOptions.forEach(opt => {
        const isChecked = savedAnswer === opt ? 'checked' : '';
        optionsHtml += `
            <label>
                <input type="radio" name="q_current" value="${opt}" ${isChecked}>
                <span style="margin-left: 10px;">${opt}</span>
            </label>
        `;
    });
    
    currentQuestionContainer.innerHTML = `
        <div class="question-card">
            <div class="question-progress">வினா ${currentQuestionIndex + 1} / ${total}</div>
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
        </div>
    `;
    
    // Add event listener for selection
    const inputs = currentQuestionContainer.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            userAnswers[currentQuestionIndex] = e.target.value;
        });
    });
}

function navigate(direction) {
    currentQuestionIndex += direction;
    renderCurrentQuestion();
    updateNavigationControls();
}

function updateNavigationControls() {
    const total = examQuestions.length;
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === total - 1) {
        nextBtn.classList.add('hidden');
        finishBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        finishBtn.classList.add('hidden');
    }
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft < 60) {
        timerDisplay.style.backgroundColor = '#c0392b'; 
    }
}

function finishExam() {
    clearInterval(timerInterval);
    
    let score = 0;
    
    examQuestions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer && userAnswer === q.answer) {
            score++;
        }
    });
    
    const total = examQuestions.length;
    finalScoreDisplay.textContent = `${score} / ${total}`;
    
    const timeSpent = (20 * 60) - timeLeft;
    const minSpent = Math.floor(timeSpent / 60);
    const secSpent = timeSpent % 60;
    
    timeTakenDisplay.textContent = `எடுத்துக்கொண்ட நேரம்: ${minSpent} நிமி ${secSpent} விநாடி`;
    
    examContainer.classList.add('hidden');
    timerDisplay.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Confetti Logic
    if (score === total) {
        // Perfect Score - Massive Celebration
        shootConfetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => shootConfetti({ particleCount: 150, spread: 120, origin: { y: 0.7 } }), 500);
    } else if (score >= total * 0.8) {
        // Great Score - Celebration
        shootConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else if (score >= total * 0.5) {
        // Good Score - Success
        shootConfetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    }
}

function shootConfetti(opts) {
    if (typeof confetti === 'function') {
        confetti(opts || {});
    }
}
