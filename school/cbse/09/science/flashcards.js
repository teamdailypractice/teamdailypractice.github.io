let allFlashcards = [];
let filteredCards = [];
let currentCardIndex = 0;

const cardElement = document.getElementById('flashcard');
const termText = document.getElementById('term-text');
const definitionText = document.getElementById('definition-text');
const indexDisplay = document.getElementById('card-index');
const prevBtn = document.getElementById('prev-card-btn');
const nextBtn = document.getElementById('next-card-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

async function init() {
    try {
        const response = await fetch('flashcards.json');
        const data = await response.json();
        
        // Flatten the subjects into a single array for the "All" view
        for (const subject in data.subjects) {
            data.subjects[subject].forEach(card => {
                allFlashcards.push({ ...card, subject });
            });
        }
        
        filteredCards = [...allFlashcards];
        shuffleArray(filteredCards);
        renderCard();
    } catch (e) {
        console.error('Error loading flashcards:', e);
    }
}

function renderCard() {
    if (filteredCards.length === 0) {
        termText.textContent = "No cards found";
        definitionText.textContent = "";
        indexDisplay.textContent = "0 / 0";
        return;
    }

    const card = filteredCards[currentCardIndex];
    
    // Reset flip before changing text
    cardElement.classList.remove('flipped');
    
    setTimeout(() => {
        termText.textContent = card.term;
        definitionText.textContent = card.definition;
        indexDisplay.textContent = `${currentCardIndex + 1} / ${filteredCards.length}`;
    }, 150);
}

function flipCard() {
    cardElement.classList.toggle('flipped');
}

function nextCard() {
    if (currentCardIndex < filteredCards.length - 1) {
        currentCardIndex++;
        renderCard();
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderCard();
    }
}

function filterBySubject(subject) {
    if (subject === 'All') {
        filteredCards = [...allFlashcards];
    } else {
        filteredCards = allFlashcards.filter(c => c.subject === subject);
    }
    
    shuffleArray(filteredCards);
    currentCardIndex = 0;
    renderCard();

    // Update UI buttons
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subject === subject);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Event Listeners
document.getElementById('card-trigger').addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterBySubject(btn.dataset.subject));
});

// Keyboard Nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === ' ' || e.key === 'Enter') flipCard();
});

init();
