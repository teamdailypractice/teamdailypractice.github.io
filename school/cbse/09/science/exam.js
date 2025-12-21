const modeSelection = document.getElementById('mode-selection');
const readContainer = document.getElementById('read-container');
const examContainer = document.getElementById('exam-container');
const readContentEl = document.getElementById('read-content');
const examContentEl = document.getElementById('exam-content');
const submitExamBtn = document.getElementById('submit-exam-btn');
const timerEl = document.getElementById('timer');

const chapterTitles = {
    'ch1': 'Matter in Our Surroundings',
    'ch2': 'Is Matter Around Us Pure?',
    'ch3': 'Atoms and Molecules',
    'ch4': 'Structure of the Atom',
    'ch5': 'The Fundamental Unit of Life',
    'ch6': 'Tissues',
    'ch7': 'Motion',
    'ch8': 'Force and Laws of Motion',
    'ch9': 'Gravitation',
    'ch10': 'Work and Energy',
    'ch11': 'Sound',
    'ch12': 'Improvement in Food Resources'
};

let allQuestions = [];
let examQuestions = [];
let timerInterval = null;
let timeLeft = 20 * 60; // 20 minutes in seconds

// Get chapter from URL or default to last visited
const urlParams = new URLSearchParams(window.location.search);
const currentChapter = urlParams.get('chapter') || localStorage.getItem('biology-last-chapter') || 'ch5';

// --- Initialization ---
async function init() {
    try {
        const response = await fetch(`quiz-${currentChapter}.json`);
        if (!response.ok) throw new Error('Failed to load quiz data');
        const quizData = await response.json();
        allQuestions = quizData.topics.reduce((acc, topic) => acc.concat(topic.questions), []);
        
        // Update header title
        const title = chapterTitles[currentChapter] || currentChapter.toUpperCase();
        document.querySelector('header h1').textContent = `Science Exam: ${title}`;
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        alert('Failed to load quiz data for this chapter.');
    }
}

// --- Event Listeners ---
document.getElementById('mode-read-btn').addEventListener('click', startReadMode);
document.getElementById('mode-exam-btn').addEventListener('click', startExamMode);
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', resetToModeSelection);
});
submitExamBtn.addEventListener('click', submitExam);

// --- Mode Logic ---

function resetToModeSelection() {
    clearInterval(timerInterval);
    modeSelection.classList.remove('hidden');
    readContainer.classList.add('hidden');
    examContainer.classList.add('hidden');
}

function startReadMode() {
    modeSelection.classList.add('hidden');
    readContainer.classList.remove('hidden');
    renderReadMode();
}

function startExamMode() {
    modeSelection.classList.add('hidden');
    examContainer.classList.remove('hidden');
    renderExamMode();
    startTimer();
}

// --- Render Logic ---

function renderReadMode() {
    if (allQuestions.length === 0) {
        readContentEl.innerHTML = '<p>No questions available.</p>';
        return;
    }

    let html = '';
    allQuestions.forEach((q, index) => {
        html += `
            <div class="read-question-box">
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <ul>
                    ${q.options.map(opt => {
                        const isCorrect = opt === q.answer;
                        return `<li class="${isCorrect ? 'read-answer-correct' : ''}">
                            ${isCorrect ? '✅' : '○'} ${opt}
                        </li>`;
                    }).join('')}
                </ul>
            </div>
        `;
    });
    readContentEl.innerHTML = html;
}

function renderExamMode() {
    if (allQuestions.length === 0) {
        examContentEl.innerHTML = '<p>No questions available.</p>';
        return;
    }

    // Shuffle and pick 50 questions
    shuffleArray(allQuestions);
    examQuestions = allQuestions.slice(0, 50);

    let html = '';
    examQuestions.forEach((q, index) => {
        // Shuffle options for the exam
        const shuffledOptions = [...q.options];
        shuffleArray(shuffledOptions);

        html += `
            <div class="quiz-question">
                <p>${index + 1}. ${q.question}</p>
                <form id="exam-form-${index}">
                    ${shuffledOptions.map(opt => `
                        <label>
                            <input type="radio" name="question-${index}" value="${opt}">
                            ${opt}
                        </label><br>
                    `).join('')}
                </form>
            </div>
        `;
    });
    examContentEl.innerHTML = html;
}

// --- Exam Utilities ---

function startTimer() {
    timeLeft = 20 * 60; // Reset to 20 minutes
    updateTimerDisplay();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Add warning color when low
    if (timeLeft < 60) {
        timerEl.style.color = 'red';
    } else {
        timerEl.style.color = '#333';
    }
}

function showCelebration(title, message, emoji = '🎉') {
    let modal = document.getElementById('celebration-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'celebration-modal';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <h2>${title}</h2>
        <span class="emoji">${emoji}</span>
        <p>${message}</p>
        <button onclick="document.getElementById('celebration-modal').classList.remove('show'); document.getElementById('sidebar-overlay').classList.add('hidden');">Awesome!</button>
    `;
    
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.classList.remove('hidden');
    
    modal.classList.add('show');
}

function submitExam() {
    clearInterval(timerInterval);
    let score = 0;
    
    examQuestions.forEach((q, index) => {
        const form = document.getElementById(`exam-form-${index}`);
        const selectedOption = form.querySelector(`input[name="question-${index}"]:checked`);
        const questionDiv = form.parentElement;

        // Visual feedback on the exam paper itself
        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
                questionDiv.style.borderLeft = '5px solid green';
            } else {
                questionDiv.style.borderLeft = '5px solid red';
            }
        } else {
            questionDiv.style.borderLeft = '5px solid orange';
        }
    });

    const percentage = (score / examQuestions.length) * 100;
    if (percentage >= 80) {
        showCelebration('Exam Passed!', `Incredible! You scored ${score}/${examQuestions.length} (${Math.round(percentage)}%). You are a Biology expert!`, '🎓');
    } else {
        alert(`Exam finished!\n\nYou scored ${score} out of ${examQuestions.length} (${Math.round(percentage)}%).`);
    }
    
    // Disable inputs after submission
    const inputs = document.querySelectorAll('#exam-content input');
    inputs.forEach(input => input.disabled = true);
    submitExamBtn.style.display = 'none';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start
init();