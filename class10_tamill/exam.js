const TOTAL_QUESTIONS = 30;
const EXAM_SECONDS = 20 * 60;

const elements = {
  examTimer: document.getElementById('examTimer'),
  examMeta: document.getElementById('examMeta'),
  examQuestion: document.getElementById('examQuestion'),
  prevQuestion: document.getElementById('prevQuestion'),
  nextQuestion: document.getElementById('nextQuestion'),
  submitExam: document.getElementById('submitExam'),
  examSummary: document.getElementById('examSummary')
};

const state = {
  questions: [],
  currentIndex: 0,
  answers: {},
  timeLeft: EXAM_SECONDS,
  timerId: null
};

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const renderQuestion = () => {
  const question = state.questions[state.currentIndex];
  if (!question) return;

  elements.examMeta.textContent = `வினா ${state.currentIndex + 1} / ${TOTAL_QUESTIONS}`;
  elements.examQuestion.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <h2>${question.question}</h2>
    <div class="quiz-options"></div>
  `;

  const optionsWrap = wrapper.querySelector('.quiz-options');
  question.shuffledOptions.forEach((option) => {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    label.innerHTML = `
      <input type="radio" name="exam_${question.id}" value="${option}" />
      <span>${option}</span>
    `;
    if (state.answers[question.id] === option) {
      label.querySelector('input').checked = true;
    }
    label.querySelector('input').addEventListener('change', (event) => {
      state.answers[question.id] = event.target.value;
    });
    optionsWrap.appendChild(label);
  });

  elements.examQuestion.appendChild(wrapper);
  elements.prevQuestion.disabled = state.currentIndex === 0;
  elements.nextQuestion.disabled = state.currentIndex === TOTAL_QUESTIONS - 1;
};

const showSummary = () => {
  clearInterval(state.timerId);
  let score = 0;
  state.questions.forEach((question) => {
    if (state.answers[question.id] === question.answer) {
      score += 1;
    }
  });
  elements.examSummary.hidden = false;
  elements.examSummary.textContent = `மொத்த மதிப்பெண்: ${score} / ${TOTAL_QUESTIONS}`;
};

const startTimer = () => {
  elements.examTimer.textContent = formatTime(state.timeLeft);
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    elements.examTimer.textContent = formatTime(state.timeLeft);
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      elements.examTimer.textContent = '00:00';
      showSummary();
    }
  }, 1000);
};

const attachEvents = () => {
  elements.prevQuestion.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });

  elements.nextQuestion.addEventListener('click', () => {
    if (state.currentIndex < TOTAL_QUESTIONS - 1) {
      state.currentIndex += 1;
      renderQuestion();
    }
  });

  elements.submitExam.addEventListener('click', () => {
    showSummary();
  });
};

const loadExam = async () => {
  try {
    const res = await fetch('quizzes.json');
    const data = await res.json();
    const pool = data.topics.flatMap((topic) => topic.questions);
    const selected = shuffleArray(pool).slice(0, TOTAL_QUESTIONS);
    state.questions = selected.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options)
    }));
    renderQuestion();
    startTimer();
    attachEvents();
  } catch (err) {
    elements.examQuestion.innerHTML = '<p>தேர்வு வினாக்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.</p>';
  }
};

loadExam();
