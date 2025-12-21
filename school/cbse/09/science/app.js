const contentEl = document.getElementById('content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const topicsBtn = document.getElementById('topics-btn');
const topicsNav = document.getElementById('topics-nav');
const topicsCloseBtn = document.getElementById('topics-close-btn');
const topicsList = document.getElementById('topics-list');

let currentTopicIndex = 0;
let currentStageIndex = 0;
let topics = [];
let quizData = null;
let currentChapter = document.body.dataset.chapter || 'ch5'; // Default to ch5 if not set

const APP_VERSION = 'v2.2'; 

// --- Data & State Management ---

function getStorageKey() {
    return `biology-${currentChapter}-progress`;
}

function saveProgress() {
    const progress = {
        version: APP_VERSION,
        topic: currentTopicIndex,
        stage: currentStageIndex
    };
    localStorage.setItem(getStorageKey(), JSON.stringify(progress));
}

function loadAndValidateProgress() {
    try {
        const savedProgress = localStorage.getItem(getStorageKey());
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            
            if (progress.version === APP_VERSION && 
                topics[progress.topic] && 
                topics[progress.topic].stages[progress.stage]) {
                currentTopicIndex = progress.topic;
                currentStageIndex = progress.stage;
                return;
            }
        }
    } catch (e) {
        console.error('Error loading progress:', e);
    }
    resetProgress();
}

function resetProgress() {
    currentTopicIndex = 0;
    currentStageIndex = 0;
    saveProgress();
}

async function fetchDataAndInitialize() {
    try {
        // Dynamic fetch based on chapter ID
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
        contentEl.innerHTML = `<p style="color:red">Error: ${error.message}. Please try refreshing the page or checking the URL.</p>`;
    }
}

// --- Rendering ---

function renderTopicsNav() {
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

    let html = '';
    if (stage.type === 'text') {
        html = renderTextStage(stage);
    } else if (stage.type === 'quiz') {
        html = renderQuizStage(stage);
    }

    contentEl.innerHTML = html;
    updateProgress();
    updateButtonStates();
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
        } else {
            feedbackEl.textContent = 'You did not answer this question.';
            feedbackEl.style.color = 'orange';
            questionEl.style.borderLeft = '3px solid orange';
        }
    });

    document.getElementById('submit-quiz-btn').style.display = 'none';
    alert(`You scored ${score} out of ${topicQuiz.questions.length}!`);
}

function updateProgress() {
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
    prevBtn.disabled = (currentTopicIndex === 0 && currentStageIndex === 0);
    const isLastStage = currentStageIndex >= topics[currentTopicIndex].stages.length - 1;
    const isLastTopic = currentTopicIndex >= topics.length - 1;
    nextBtn.disabled = (isLastTopic && isLastStage);
}

function nextStage() {
    if (currentStageIndex < topics[currentTopicIndex].stages.length - 1) {
        currentStageIndex++;
    } else if (currentTopicIndex < topics.length - 1) {
        currentTopicIndex++;
        currentStageIndex = 0;
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
    if (event.target.tagName === 'A') {
        const topicIndex = parseInt(event.target.dataset.topicIndex, 10);
        if (!isNaN(topicIndex)) {
            currentTopicIndex = topicIndex;
            currentStageIndex = 0;
            renderStage();
            saveProgress();
            topicsNav.classList.remove('visible');
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
nextBtn.addEventListener('click', nextStage);
prevBtn.addEventListener('click', prevStage);

topicsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    topicsNav.classList.add('visible');
});

topicsCloseBtn.addEventListener('click', () => {
    topicsNav.classList.remove('visible');
});

topicsList.addEventListener('click', handleTopicLinkClick);

contentEl.addEventListener('click', function(event) {
    if (event.target.id === 'submit-quiz-btn') {
        handleQuizSubmit();
    }
});

// Start
fetchDataAndInitialize();
