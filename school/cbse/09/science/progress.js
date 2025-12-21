const progressList = document.getElementById('progress-list');
const totalPercentDisplay = document.getElementById('total-percent');

const chapters = [
    { id: 'ch1', title: 'Matter in Our Surroundings', subject: 'Chemistry' },
    { id: 'ch2', title: 'Is Matter Around Us Pure?', subject: 'Chemistry' },
    { id: 'ch3', title: 'Atoms and Molecules', subject: 'Chemistry' },
    { id: 'ch4', title: 'Structure of the Atom', subject: 'Chemistry' },
    { id: 'ch5', title: 'The Fundamental Unit of Life', subject: 'Biology' },
    { id: 'ch6', title: 'Tissues', subject: 'Biology' },
    { id: 'ch7', title: 'Motion', subject: 'Physics' },
    { id: 'ch8', title: 'Force and Laws of Motion', subject: 'Physics' },
    { id: 'ch9', title: 'Gravitation', subject: 'Physics' },
    { id: 'ch10', title: 'Work and Energy', subject: 'Physics' },
    { id: 'ch11', title: 'Sound', subject: 'Physics' },
    { id: 'ch12', title: 'Improvement in Food Resources', subject: 'Biology' }
];

function init() {
    let totalProgress = 0;
    let chaptersCounted = 0;

    progressList.innerHTML = '';

    chapters.forEach(chapter => {
        const progressKey = `biology-${chapter.id}-progress`;
        const metaKey = `${progressKey}-meta`;

        const progress = JSON.parse(localStorage.getItem(progressKey) || 'null');
        const meta = JSON.parse(localStorage.getItem(metaKey) || '{"quizzesPassed": 0}');

        if (progress || meta.lastActivity) {
            chaptersCounted++;
            
            // Calculate % completion
            // We assume 25 stages per chapter as a benchmark if totalStages is unknown
            const totalStages = meta.totalStages || 15; // default fallback
            let completedStages = 0;
            
            // Approximate completion based on topic index
            // Each topic has ~4-6 stages now.
            // A more accurate way is to store completion exactly.
            // For now, use the current position as the progress indicator.
            const currentTopic = progress ? progress.topic : 0;
            const currentStage = progress ? progress.stage : 0;
            
            // This is just an estimate since we don't store exactly how many stages per topic here
            // But we can use a simpler 0-100 based on the last reached point.
            // Or better: if meta.totalTopics exists, use that.
            
            let percent = 0;
            if (meta.totalTopics) {
                const topicProgress = (currentTopic / meta.totalTopics) * 100;
                const stageProgress = (currentStage / (meta.totalStages / meta.totalTopics)) * (100 / meta.totalTopics);
                percent = Math.round(Math.min(100, topicProgress + stageProgress));
            } else if (progress) {
                percent = 10; // Started
            }

            totalProgress += percent;

            const card = document.createElement('div');
            card.className = 'progress-card';
            card.innerHTML = `
                <div class="chapter-header">
                    <h3>${chapter.id.toUpperCase()}: ${chapter.title}</h3>
                    <span class="stat-label">${chapter.subject}</span>
                </div>
                <div class="stats-grid">
                    <div class="stat-box">
                        <span class="stat-value">${percent}%</span>
                        <span class="stat-label">Course Progress</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-value">${meta.quizzesPassed || 0}</span>
                        <span class="stat-label">Quizzes Mastered</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-value">${meta.lastActivity || 'N/A'}</span>
                        <span class="stat-label">Last Active</span>
                    </div>
                </div>
            `;
            progressList.appendChild(card);
        }
    });

    if (chaptersCounted === 0) {
        progressList.innerHTML = '<p style="text-align:center; padding: 2rem; color: #888;">No progress recorded yet. Start a lesson to see your tracking!</p>';
    } else {
        const overall = Math.round(totalProgress / chapters.length);
        totalPercentDisplay.textContent = `${overall}%`;
    }
}

init();
