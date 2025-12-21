(function() {
    const nav = document.querySelector('header nav');
    if (!nav) return;

    const urlParams = new URLSearchParams(window.location.search);
    let chapter = urlParams.get('chapter');
    
    // If we are on a chapter page, we know the chapter even without the param
    if (!chapter && document.body.dataset.chapter) {
        chapter = document.body.dataset.chapter;
    }
    
    // If we found a chapter, save it as the last visited context
    if (chapter) {
        localStorage.setItem('biology-last-chapter', chapter);
    } else {
        // Try to get the last visited chapter from local storage
        chapter = localStorage.getItem('biology-last-chapter');
    }
    
    // If still no chapter, try to get from old progress keys (fallback)
    if (!chapter) {
        // Find any 'biology-ch*-progress' key to get the most recent context
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('biology-ch') && key.endsWith('-progress')) {
                chapter = key.split('-')[1]; // e.g., 'ch5'
                break;
            }
        }
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    let navHtml = `<a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Dashboard</a>`;
    
    if (chapter) {
        const chapterNum = chapter.replace('ch', '');
        navHtml += `<a href="chapter-${chapterNum}.html?home=true" class="${currentPage.startsWith('chapter-') ? 'active' : ''}">Chapter Home</a>`;
    }
    
    navHtml += `<a href="progress.html${chapter ? '?chapter='+chapter : ''}" class="${currentPage === 'progress.html' ? 'active' : ''}">Track Progress</a>`;
    navHtml += `<a href="flashcards.html${chapter ? '?chapter='+chapter : ''}" class="${currentPage === 'flashcards.html' ? 'active' : ''}">Flashcards</a>`;
    
    if (chapter) {
        navHtml += `<a href="exam.html?chapter=${chapter}" class="${currentPage === 'exam.html' ? 'active' : ''}">Exam</a>`;
        navHtml += `<a href="download.html?chapter=${chapter}" class="${currentPage === 'download.html' ? 'active' : ''}">Downloads</a>`;
    } else {
        navHtml += `<a href="exam.html" class="${currentPage === 'exam.html' ? 'active' : ''}">Exam</a>`;
        navHtml += `<a href="download.html" class="${currentPage === 'download.html' ? 'active' : ''}">Downloads</a>`;
    }
    
    nav.innerHTML = navHtml;
})();
