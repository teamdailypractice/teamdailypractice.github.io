const STORAGE_KEY = 'tamilGrammarProgress_v1';
const QUIZ_HISTORY_KEY = 'tamilGrammarQuizHistory_v1';

const elements = {
  topicList: document.getElementById('topicList'),
  topicTitle: document.getElementById('topicTitle'),
  stageTitle: document.getElementById('stageTitle'),
  stageMeta: document.getElementById('stageMeta'),
  stageContent: document.getElementById('stageContent'),
  stageChips: document.getElementById('stageChips'),
  stageProgressBar: document.getElementById('stageProgressBar'),
  overallProgressBar: document.getElementById('overallProgressBar'),
  overallProgressText: document.getElementById('overallProgressText'),
  completedCount: document.getElementById('completedCount'),
  completedProgressBar: document.getElementById('completedProgressBar'),
  prevStage: document.getElementById('prevStage'),
  nextStage: document.getElementById('nextStage'),
  markComplete: document.getElementById('markComplete'),
  refreshQuiz: document.getElementById('refreshQuiz'),
  checkQuiz: document.getElementById('checkQuiz'),
  quizContainer: document.getElementById('quizContainer'),
  quizResult: document.getElementById('quizResult'),
  toast: document.getElementById('toast'),
  rewardBadge: document.getElementById('rewardBadge'),
  confettiLayer: document.getElementById('confettiLayer')
};

const state = {
  topics: [],
  quizzes: {},
  currentTopicIndex: 0,
  currentStageIndex: 0,
  progress: {},
  quizSelections: {},
  activeQuizTopicId: null
};

const paletteSets = {
  success: ['#2b7a6d', '#f2b544', '#c4572a'],
  reward: ['#f2b544', '#f08a4b', '#f7d7a3'],
  completion: ['#2b7a6d', '#3e9b8f', '#b7e3d8'],
  celebration: ['#c4572a', '#f2b544', '#f9c87b']
};

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (err) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const showToast = (message) => {
  elements.toast.textContent = message;
  elements.toast.classList.add('show');
  setTimeout(() => elements.toast.classList.remove('show'), 2200);
};

const showRewardBadge = (message) => {
  elements.rewardBadge.textContent = message;
  elements.rewardBadge.classList.add('show');
  setTimeout(() => elements.rewardBadge.classList.remove('show'), 2500);
};

const launchConfetti = (type, count = 30) => {
  const palette = paletteSets[type] || paletteSets.celebration;
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = palette[Math.floor(Math.random() * palette.length)];
    piece.style.animationDuration = `${0.9 + Math.random() * 0.8}s`;
    piece.style.transform = `translateY(-20px) rotate(${Math.random() * 360}deg)`;
    elements.confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 1600);
  }
};

const setButtonPulse = (btn) => {
  btn.classList.add('is-pulsing');
  setTimeout(() => btn.classList.remove('is-pulsing'), 300);
};

const initProgress = (topics) => {
  const stored = readStorage(STORAGE_KEY, { topics: {} });
  const progress = {};
  topics.forEach((topic) => {
    const entry = stored.topics?.[topic.id] || { completed: [], lastStage: 0 };
    const cleanedCompleted = (entry.completed || []).filter((n) => n >= 0 && n < 25);
    progress[topic.id] = {
      completed: [...new Set(cleanedCompleted)],
      lastStage: Math.min(Math.max(entry.lastStage || 0, 0), 24)
    };
  });
  return progress;
};

const saveProgress = () => {
  writeStorage(STORAGE_KEY, { topics: state.progress });
};

const getOverallStats = () => {
  const totalStages = state.topics.length * 25;
  const completedStages = state.topics.reduce((sum, topic) => {
    return sum + (state.progress[topic.id]?.completed.length || 0);
  }, 0);
  return { totalStages, completedStages };
};

const updateOverallProgress = () => {
  const { totalStages, completedStages } = getOverallStats();
  const percent = totalStages ? Math.round((completedStages / totalStages) * 100) : 0;
  elements.overallProgressBar.style.width = `${percent}%`;
  elements.overallProgressText.textContent = `${percent}%`;
  elements.completedCount.textContent = `${completedStages} / ${totalStages}`;
  elements.completedProgressBar.style.width = `${percent}%`;
};

const renderTopicList = () => {
  elements.topicList.innerHTML = '';
  state.topics.forEach((topic, idx) => {
    const completed = state.progress[topic.id]?.completed.length || 0;
    const percent = Math.round((completed / 25) * 100);
    const item = document.createElement('div');
    item.className = `topic-item${idx === state.currentTopicIndex ? ' active' : ''}`;
    item.innerHTML = `
      <div class="topic-title-text">${topic.title}</div>
      <div class="progress-track slim">
        <div class="progress-bar" style="width: ${percent}%"></div>
      </div>
      <div class="topic-progress">
        <span>${completed} / 25</span>
        <span>${percent}%</span>
      </div>
    `;
    item.addEventListener('click', () => {
      state.currentTopicIndex = idx;
      state.currentStageIndex = state.progress[topic.id]?.lastStage || 0;
      renderAll();
    });
    elements.topicList.appendChild(item);
  });
};

const renderStageChips = (topicId) => {
  const completedSet = new Set(state.progress[topicId]?.completed || []);
  elements.stageChips.innerHTML = '';
  for (let i = 0; i < 25; i += 1) {
    const chip = document.createElement('div');
    chip.className = 'stage-chip';
    if (completedSet.has(i)) {
      chip.classList.add('completed');
    }
    if (i === state.currentStageIndex) {
      chip.classList.add('active');
    }
    chip.textContent = i + 1;
    chip.addEventListener('click', () => {
      state.currentStageIndex = i;
      state.progress[topicId].lastStage = i;
      saveProgress();
      renderStage();
    });
    elements.stageChips.appendChild(chip);
  }
};

const renderStage = () => {
  const topic = state.topics[state.currentTopicIndex];
  if (!topic) return;
  const stageIndex = state.currentStageIndex;
  elements.topicTitle.textContent = topic.title;
  elements.stageTitle.textContent = `கட்டம் ${stageIndex + 1}`;
  elements.stageMeta.textContent = `25 இல் ${stageIndex + 1}`;
  elements.stageContent.innerHTML = topic.stages[stageIndex] || '<p>உள்ளடக்கம் கிடைக்கவில்லை.</p>';

  const completed = state.progress[topic.id]?.completed.length || 0;
  const percent = Math.round((completed / 25) * 100);
  elements.stageProgressBar.style.width = `${percent}%`;
  renderStageChips(topic.id);

  elements.prevStage.disabled = stageIndex === 0;
  elements.nextStage.disabled = stageIndex === 24;
  if (state.activeQuizTopicId !== topic.id) {
    state.activeQuizTopicId = topic.id;
    renderQuiz(false);
  }
};

const renderAll = () => {
  renderTopicList();
  renderStage();
  updateOverallProgress();
};

const markStageComplete = () => {
  const topic = state.topics[state.currentTopicIndex];
  const topicProgress = state.progress[topic.id];
  const stageIndex = state.currentStageIndex;
  const beforeCount = topicProgress.completed.length;
  if (!topicProgress.completed.includes(stageIndex)) {
    topicProgress.completed.push(stageIndex);
  }
  topicProgress.lastStage = stageIndex;
  saveProgress();
  renderTopicList();
  renderStage();
  updateOverallProgress();

  const afterCount = topicProgress.completed.length;
  if (afterCount > beforeCount) {
    launchConfetti('success', 20);
    showToast('கட்டம் முடிந்தது!');
  }

  if (afterCount === 25) {
    launchConfetti('completion', 60);
    showRewardBadge('இயல் நிறைவு!');
    showToast('முழு இயலும் முடிந்தது!');
  } else if (afterCount % 5 === 0 && afterCount > 0) {
    launchConfetti('reward', 36);
    showRewardBadge('முக்கிய படிக்கட்டு!');
  }

  if (stageIndex < 24) {
    state.currentStageIndex += 1;
    topicProgress.lastStage = state.currentStageIndex;
    saveProgress();
    renderStage();
  }
};

const arraysEqual = (a, b) => {
  if (!a || !b || a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, i) => val === sortedB[i]);
};

const selectQuizQuestions = (topicId) => {
  const pool = state.quizzes[topicId] || [];
  if (pool.length <= 5) return pool;
  const history = readStorage(QUIZ_HISTORY_KEY, {});
  const previous = history[topicId] || [];
  let selection = [];
  let attempts = 0;
  while (attempts < 6) {
    selection = shuffleArray(pool).slice(0, 5);
    const ids = selection.map((q) => q.id);
    if (!arraysEqual(ids, previous)) {
      history[topicId] = ids;
      writeStorage(QUIZ_HISTORY_KEY, history);
      return selection;
    }
    attempts += 1;
  }
  history[topicId] = selection.map((q) => q.id);
  writeStorage(QUIZ_HISTORY_KEY, history);
  return selection;
};

const renderQuiz = (forceNew) => {
  const topic = state.topics[state.currentTopicIndex];
  if (!topic) return;
  let questions = state.quizSelections[topic.id];
  if (!questions || forceNew) {
    questions = selectQuizQuestions(topic.id);
    state.quizSelections[topic.id] = questions;
  }
  elements.quizContainer.innerHTML = '';
  elements.quizResult.textContent = '';

  questions.forEach((question, index) => {
    const item = document.createElement('div');
    item.className = 'quiz-item';
    const shuffledOptions = shuffleArray(question.options);
    item.innerHTML = `
      <h4>Q${index + 1}. ${question.question}</h4>
      <div class="quiz-options"></div>
    `;
    const optionsWrap = item.querySelector('.quiz-options');
    shuffledOptions.forEach((option) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';
      label.innerHTML = `
        <input type="radio" name="${question.id}" value="${option}" />
        <span>${option}</span>
      `;
      optionsWrap.appendChild(label);
    });
    elements.quizContainer.appendChild(item);
  });
};

const checkQuizAnswers = () => {
  const topic = state.topics[state.currentTopicIndex];
  const questions = state.quizSelections[topic.id] || [];
  let correctCount = 0;

  questions.forEach((question) => {
    const options = elements.quizContainer.querySelectorAll(`input[name="${question.id}"]`);
    options.forEach((input) => {
      const label = input.closest('.quiz-option');
      label.classList.remove('correct', 'wrong');
      if (input.checked) {
        if (input.value === question.answer) {
          label.classList.add('correct');
          correctCount += 1;
        } else {
          label.classList.add('wrong');
        }
      }
    });
  });

  elements.quizResult.textContent = `மதிப்பெண்: ${correctCount} / ${questions.length}`;
  launchConfetti('celebration', 18);
  showToast('பயிற்சி முடிந்தது!');
};

const attachEvents = () => {
  elements.prevStage.addEventListener('click', () => {
    if (state.currentStageIndex > 0) {
      state.currentStageIndex -= 1;
      const topic = state.topics[state.currentTopicIndex];
      state.progress[topic.id].lastStage = state.currentStageIndex;
      saveProgress();
      renderStage();
    }
  });

  elements.nextStage.addEventListener('click', () => {
    if (state.currentStageIndex < 24) {
      state.currentStageIndex += 1;
      const topic = state.topics[state.currentTopicIndex];
      state.progress[topic.id].lastStage = state.currentStageIndex;
      saveProgress();
      renderStage();
    }
  });

  elements.markComplete.addEventListener('click', () => {
    setButtonPulse(elements.markComplete);
    markStageComplete();
  });

  elements.refreshQuiz.addEventListener('click', () => {
    setButtonPulse(elements.refreshQuiz);
    renderQuiz(true);
  });

  elements.checkQuiz.addEventListener('click', () => {
    setButtonPulse(elements.checkQuiz);
    checkQuizAnswers();
  });
};

const loadData = async () => {
  try {
    const [contentRes, quizRes] = await Promise.all([
      fetch('content.json'),
      fetch('quizzes.json')
    ]);
    const contentData = await contentRes.json();
    const quizData = await quizRes.json();
    state.topics = contentData.topics || [];
    state.quizzes = (quizData.topics || []).reduce((acc, topic) => {
      acc[topic.id] = topic.questions;
      return acc;
    }, {});
    state.progress = initProgress(state.topics);
    renderAll();
    attachEvents();
  } catch (err) {
    elements.stageContent.innerHTML = '<p>தரவை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.</p>';
  }
};

loadData();
