const contentEl = document.getElementById('content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const topicsBtn = document.getElementById('topics-btn');
const topicsNav = document.getElementById('topics-nav');
const topicsCloseBtn = document.getElementById('topics-close-btn');
const topicsList = document.getElementById('topics-list');
const sidebarOverlay = document.getElementById('sidebar-overlay');

let currentTopicIndex = 0;
let currentStageIndex = 0;
let topics = [];
let quizData = null;
let currentChapter = document.body.dataset.chapter || 'ch5'; 

// Incrementing to v3.0 forces a reset of the validation logic
const APP_VERSION = 'v3.0'; 

// --- Data & State Management ---

function getStorageKey() {
    return `biology-${currentChapter}-progress`;
}

function saveProgress(quizPassed = false) {
    const storageKey = getStorageKey();
    let meta = JSON.parse(localStorage.getItem(storageKey + '-meta') || '{"quizzesPassed": 0}');
    
    if (quizPassed) meta.quizzesPassed++;
    meta.lastActivity = new Date().toISOString().split('T')[0];
    meta.totalTopics = topics.length;
    meta.totalStages = topics.reduce((sum, t) => sum + t.stages.length, 0);

    const progress = {
        version: APP_VERSION,
        topic: currentTopicIndex,
        stage: currentStageIndex
    };
    
    localStorage.setItem(storageKey, JSON.stringify(progress));
    localStorage.setItem(storageKey + '-meta', JSON.stringify(meta));
}

function purgeOldStorage() {
    // This helper clears old storage formats to prevent cross-version pollution
    const oldKeys = ['biology-progress'];
    oldKeys.forEach(key => localStorage.removeItem(key));
}

function loadAndValidateProgress() {
    try {
        const savedProgress = localStorage.getItem(getStorageKey());
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            
            // Validate: Only load if it matches current app structure
            if (progress.version === APP_VERSION && 
                topics[progress.topic] && 
                topics[progress.topic].stages[progress.stage]) {
                currentTopicIndex = progress.topic;
                currentStageIndex = progress.stage;
                console.log("Progress loaded successfully.");
                return;
            } else {
                console.warn("Saved progress is for an older version. Starting fresh for this session.");
            }
        }
    } catch (e) {
        console.error('Error reading progress:', e);
    }
    // Default session state to start, but DON'T overwrite localStorage yet
    currentTopicIndex = 0;
    currentStageIndex = 0;
}

function resetProgress() {
    // This is now only called manually or when the user explicitly resets
    currentTopicIndex = 0;
    currentStageIndex = 0;
    saveProgress();
}

async function fetchDataAndInitialize() {
    try {
        const topicsResponse = await fetch(`topics-${currentChapter}.json`);
        if (!topicsResponse.ok) throw new Error(`Failed to load topics for ${currentChapter}`);
        const topicsData = await topicsResponse.json();
        topics = topicsData.topics;

        const quizResponse = await fetch(`quiz-${currentChapter}.json`);
        if (!quizResponse.ok) throw new Error(`Failed to load quiz for ${currentChapter}`);
        quizData = await quizResponse.json();

        renderTopicsNav();
        
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('home') === 'true') {
            resetProgress();
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            loadAndValidateProgress();
        }
        
        renderStage();

    } catch (error) {
        console.error('Initialization error:', error);
        contentEl.innerHTML = `
            <div style="color:red; padding: 20px; border: 1px solid red; border-radius: 5px;">
                <h3>Failed to load content</h3>
                <p>${error.message}</p>
                <button onclick="localStorage.clear(); location.reload();">Clear All Data & Reset App</button>
            </div>
        `;
    }
}

// --- Rendering ---

function renderTopicsNav() {
    if (!topicsList) return;
    topicsList.innerHTML = '';
    topics.forEach((topic, index) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `${index + 1}. ${topic.title}`;
        link.dataset.topicIndex = index;
        topicsList.appendChild(link);
    });
}

function renderStage() {
    if (!topics || topics.length === 0) {
        contentEl.innerHTML = "<p>Loading content...</p>";
        return;
    }

    const topic = topics[currentTopicIndex];
    const stage = topic.stages[currentStageIndex];

    if (!stage) {
        console.error('Stage not found. Resetting.');
        resetProgress();
        return;
    }

    let html = '';
    if (stage.type === 'text') {
        html = renderTextStage(stage);
    } else if (stage.type === 'quiz') {
        html = renderQuizStage(stage);
    }

    contentEl.innerHTML = html;
    updateProgress();
    updateButtonStates();
    window.scrollTo(0, 0); // Scroll to top on stage change
}

function renderTextStage(stage) {
    let html = `<h2>${topics[currentTopicIndex].title}</h2>`;
    if (stage.heading) {
        html += `<h3>${stage.heading}</h3>`;
    }
    html += `<p>${stage.content.replace(/\n/g, '<br>')}</p>`;
    return html;
}

function renderQuizStage(stage) {
    const topic = topics[currentTopicIndex];
    const topicQuiz = quizData.topics.find(t => t.title === topic.title);

    if (!topicQuiz) {
        return `<h2>${topic.title}</h2><h3>${stage.heading}</h3><p>Quiz not available for this topic.</p>`;
    }

    let quizHtml = `<h2>${topic.title}</h2><h3>${stage.heading || 'Quick Quiz'}</h3>`;
    topicQuiz.questions.forEach((q, index) => {
        const shuffledOptions = [...q.options];
        shuffleArray(shuffledOptions);
        quizHtml += `
            <div class="quiz-question" id="question-${index}">
                <p><b>${index + 1}. ${q.question}</b></p>
                <div class="quiz-options">
                    ${shuffledOptions.map(opt => `
                        <label>
                            <input type="radio" name="question-${index}" value="${opt}">
                            ${opt}
                        </label>
                    `).join('')}
                </div>
                <p class="quiz-feedback" id="feedback-${index}"></p>
            </div>
        `;
    });
    quizHtml += '<button id="submit-quiz-btn">Check Answers</button>';
    return quizHtml;
}

// --- UI Updates & Event Handlers ---

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
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
        <button onclick="this.parentElement.classList.remove('show')">Awesome!</button>
    `;
    
    // Add overlay if missing
    let overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.classList.remove('hidden');
    
    modal.classList.add('show');
    
    // Auto hide after 5 seconds if not closed
    setTimeout(() => {
        modal.classList.remove('show');
        if (overlay) overlay.classList.add('hidden');
    }, 5000);
}

function handleQuizSubmit() {
    const topic = topics[currentTopicIndex];
    const topicQuiz = quizData.topics.find(t => t.title === topic.title);
    let score = 0;

    topicQuiz.questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        const feedbackEl = document.getElementById(`feedback-${index}`);
        const questionEl = document.getElementById(`question-${index}`);

        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
                feedbackEl.textContent = 'Correct!';
                feedbackEl.style.color = 'green';
                questionEl.style.borderLeft = '3px solid green';
            } else {
                feedbackEl.textContent = `Incorrect. The correct answer is: ${q.answer}`;
                feedbackEl.style.color = 'red';
                questionEl.style.borderLeft = '3px solid red';
            }
        }
    });

    document.getElementById('submit-quiz-btn').style.display = 'none';
    
    const percentage = (score / topicQuiz.questions.length) * 100;
    if (percentage >= 80) {
        showCelebration('Excellent!', `You scored ${score}/${topicQuiz.questions.length} (${percentage}%). Great job!`, '🌟');
        saveProgress(true); // Passed
    } else {
        alert(`You scored ${score} out of ${topicQuiz.questions.length}!`);
        saveProgress(false); // Finished but not 80%
    }
}

function updateProgress() {
    if (!progressBar) return;
    const totalStages = topics.reduce((total, topic) => total + topic.stages.length, 0);
    if (totalStages === 0) return;

    let completedStages = 0;
    for(let i = 0; i < currentTopicIndex; i++) {
        completedStages += topics[i].stages.length;
    }
    completedStages += currentStageIndex + 1;
    
    const progress = Math.max(1, (completedStages / totalStages) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

function updateButtonStates() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = (currentTopicIndex === 0 && currentStageIndex === 0);
    const isLastStage = currentStageIndex >= topics[currentTopicIndex].stages.length - 1;
    const isLastTopic = currentTopicIndex >= topics.length - 1;
    nextBtn.disabled = (isLastTopic && isLastStage);
}

function closeSidebar() {
    if (topicsNav) topicsNav.classList.remove('visible');
    if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
}

function nextStage() {
    if (currentStageIndex < topics[currentTopicIndex].stages.length - 1) {
        currentStageIndex++;
        showToast('Stage Complete! Keep going! 🚀');
    } else if (currentTopicIndex < topics.length - 1) {
        currentTopicIndex++;
        currentStageIndex = 0;
        showCelebration('Topic Complete!', `You've mastered "${topics[currentTopicIndex-1].title}"!`, '🏆');
    }
    renderStage();
    saveProgress();
}

function prevStage() {
    if (currentStageIndex > 0) {
        currentStageIndex--;
    } else if (currentTopicIndex > 0) {
        currentTopicIndex--;
        currentStageIndex = topics[currentTopicIndex].stages.length - 1;
    }
    renderStage();
    saveProgress();
}

function handleTopicLinkClick(event) {
    event.preventDefault();
    let target = event.target;
    if (target.tagName !== 'A') target = target.closest('a');
    if (target && target.tagName === 'A') {
        const topicIndex = parseInt(target.dataset.topicIndex, 10);
        if (!isNaN(topicIndex)) {
            currentTopicIndex = topicIndex;
            currentStageIndex = 0;
            renderStage();
            saveProgress();
            closeSidebar();
        }
    }
}

// --- Utility ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- Event Listeners ---
if (nextBtn) nextBtn.addEventListener('click', nextStage);
if (prevBtn) prevBtn.addEventListener('click', prevStage);

// Sidebar Toggle Logic
if (topicsBtn) {
    topicsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        topicsNav.classList.add('visible');
        sidebarOverlay.classList.remove('hidden');
    });
}

if (topicsCloseBtn) topicsCloseBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
if (topicsList) topicsList.addEventListener('click', handleTopicLinkClick);

contentEl.addEventListener('click', function(event) {
    if (event.target.id === 'submit-quiz-btn') {
        handleQuizSubmit();
    }
});

// Start
fetchDataAndInitialize();
