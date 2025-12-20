
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

let contentData = [];
let quizData = {};
let currentTopicIndex = 0;
let currentStageIndex = 0;
let progressData = JSON.parse(localStorage.getItem('tamilGrammarProgress')) || {};

// DOM Elements
const topicNav = document.getElementById('topic-nav');
const stageContent = document.getElementById('stage-content');
const topicTitle = document.getElementById('current-topic-title');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const quizSection = document.getElementById('quiz-section');
const quizContainer = document.getElementById('quiz-container');
const checkQuizBtn = document.getElementById('check-quiz-btn');
const quizResult = document.getElementById('quiz-result');
const celebrationModal = document.getElementById('celebration-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

async function initApp() {
    try {
        const [contentRes, quizRes] = await Promise.all([
            fetch('content.json'),
            fetch('quizzes.json')
        ]);
        
        contentData = await contentRes.json();
        const quizJson = await quizRes.json();
        quizData = quizJson.quizzes;

        renderSidebar();
        
        // Restore last session or default
        const lastTopic = localStorage.getItem('lastTopicIndex');
        if (lastTopic !== null) {
            currentTopicIndex = parseInt(lastTopic);
        }
        
        loadTopic(currentTopicIndex, false);
        
        setupEventListeners();
        
    } catch (error) {
        console.error("Failed to load data", error);
        stageContent.innerHTML = "<p>Error loading content. Please ensure content.json and quizzes.json are present.</p>";
    }
}

function setupEventListeners() {
    prevBtn.addEventListener('click', () => navigateStage(-1));
    nextBtn.addEventListener('click', () => navigateStage(1));
    
    closeModalBtn.addEventListener('click', () => {
        celebrationModal.classList.add('hidden');
    });

    checkQuizBtn.addEventListener('click', evaluateQuiz);
}

function renderSidebar() {
    topicNav.innerHTML = '';
    const ul = document.createElement('ul');
    
    contentData.forEach((topic, index) => {
        const li = document.createElement('li');
        li.className = `topic-item ${index === currentTopicIndex ? 'active' : ''}`;
        
        // Calculate progress %
        const savedStage = getSavedStage(topic.title);
        const totalStages = topic.stages.length;
        const percent = Math.round(((savedStage + 1) / totalStages) * 100);
        
        li.innerHTML = `
            <span>${topic.title}</span>
            <span class="topic-status">${percent}%</span>
        `;
        
        li.addEventListener('click', () => {
            currentTopicIndex = index;
            localStorage.setItem('lastTopicIndex', currentTopicIndex);
            loadTopic(index);
            renderSidebar(); // Re-render to update active class
        });
        
        ul.appendChild(li);
    });
    
    topicNav.appendChild(ul);
}

function getSavedStage(topicTitle) {
    return progressData[topicTitle] || 0;
}

function saveProgress(topicTitle, stageIndex) {
    // Only update if we progressed further
    const currentMax = progressData[topicTitle] || 0;
    if (stageIndex > currentMax) {
        progressData[topicTitle] = stageIndex;
        localStorage.setItem('tamilGrammarProgress', JSON.stringify(progressData));
        renderSidebar(); // Update percentages
    }
}

function loadTopic(index, resetToSaved = true) {
    const topic = contentData[index];
    topicTitle.textContent = topic.title;
    
    if (resetToSaved) {
        currentStageIndex = getSavedStage(topic.title);
        if (currentStageIndex >= topic.stages.length) {
            currentStageIndex = 0; 
        }
    }
    
    loadStage(currentStageIndex);
    
    // Hide quiz initially when switching topics
    quizSection.classList.add('hidden');
}

function loadStage(index) {
    const topic = contentData[currentTopicIndex];
    const totalStages = topic.stages.length;
    
    // Boundary checks
    if (index < 0) index = 0;
    if (index >= totalStages) index = totalStages - 1;
    
    currentStageIndex = index;
    
    // Render Content
    stageContent.innerHTML = topic.stages[index];
    stageContent.scrollTop = 0; // Scroll to top
    
    // Update UI
    progressText.textContent = `${index + 1}/${totalStages}`;
    const percent = ((index + 1) / totalStages) * 100;
    progressBar.style.width = `${percent}%`;
    
    prevBtn.disabled = index === 0;
    
    // Update Next Button Text
    if (index === totalStages - 1) {
        nextBtn.textContent = "பயிற்சி வினாக்கள் (Quiz)";
    } else {
        nextBtn.textContent = "அடுத்தது (Next)";
    }
}

function navigateStage(direction) {
    const topic = contentData[currentTopicIndex];
    const totalStages = topic.stages.length;
    
    const newIndex = currentStageIndex + direction;
    
    if (newIndex >= totalStages) {
        showQuiz();
        saveProgress(topic.title, currentStageIndex); 
        // Celebration: Finished all reading!
        shootConfetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        return;
    }
    
    if (newIndex < 0) return;
    
    if (direction > 0) {
        saveProgress(topic.title, newIndex);
    }
    
    loadStage(newIndex);
}

function showCelebration() {
    celebrationModal.classList.remove('hidden');
    // Celebration Animation
    shootConfetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4a90e2', '#27ae60', '#f1c40f', '#e74c3c']
    });
}

function shootConfetti(opts) {
    if (typeof confetti === 'function') {
        confetti(opts || {});
    }
}

/* Quiz Logic */

function showQuiz() {
    const topic = contentData[currentTopicIndex];
    const questions = quizData[topic.title];
    
    if (!questions || questions.length === 0) {
        alert("இந்த தலைப்பிற்கு வினாக்கள் இல்லை.");
        return;
    }
    
    quizSection.classList.remove('hidden');
    quizSection.scrollIntoView({ behavior: 'smooth' });
    
    const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    quizContainer.innerHTML = '';
    
    shuffledQuestions.forEach((q, qIndex) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-item';
        
        const options = [...q.options];
        const correctAnswer = q.answer; 
        
        const shuffledOptions = options.sort(() => 0.5 - Math.random());
        
        let optionsHtml = '';
        shuffledOptions.forEach((opt, oIndex) => {
            optionsHtml += `
                <label>
                    <input type="radio" name="q${qIndex}" value="${opt}">
                    ${opt}
                </label>
            `;
        });
        
        qDiv.innerHTML = `
            <div class="quiz-question">${qIndex + 1}. ${q.question}</div>
            <div class="quiz-options" data-correct="${correctAnswer}">
                ${optionsHtml}
            </div>
            <div class="feedback" id="feedback-q${qIndex}"></div>
        `;
        
        quizContainer.appendChild(qDiv);
    });
    
    quizResult.textContent = '';
    checkQuizBtn.disabled = false;
}

function evaluateQuiz() {
    const items = quizContainer.querySelectorAll('.quiz-item');
    let score = 0;
    
    items.forEach((item, index) => {
        const optionsDiv = item.querySelector('.quiz-options');
        const correctAnswer = optionsDiv.dataset.correct;
        const selected = optionsDiv.querySelector(`input[name="q${index}"]:checked`);
        const feedback = item.querySelector(`#feedback-q${index}`);
        
        if (selected) {
            if (selected.value === correctAnswer) {
                score++;
                feedback.textContent = "சரியான விடை! ✅";
                feedback.style.color = "green";
            } else {
                feedback.textContent = `தவறு. சரியான விடை: ${correctAnswer} ❌`;
                feedback.style.color = "red";
            }
        } else {
            feedback.textContent = "விடை அளிக்கவில்லை.";
            feedback.style.color = "orange";
        }
    });
    
    const total = items.length;
    quizResult.textContent = `உங்கள் மதிப்பெண்: ${score} / ${total}`;
    
    if (score === total) {
        showCelebration(); // Big Celebration
    } else if (score > total / 2) {
        // Success Animation (Smaller)
        shootConfetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    }
    
    checkQuizBtn.disabled = true;
}
