document.addEventListener('DOMContentLoaded', () => {
    const starImages = [
        'white-star.png', // Level 0: Outlined star
        'one-star.png',   // Level 1: 1 golden star
        'two-stars.png',  // Level 2: 2 golden stars
        'three-stars.png', // Level 3: 3 golden stars
        'four-stars.png',  // Level 4: 4 golden stars
        'five-stars.png',  // Level 5: 5 golden stars
        'six-stars.png'   // Level 6: 6 golden stars
    ];
    const partsContainer = document.querySelector('.parts');
    const chapterNum = parseInt(document.location.pathname.match(/chapter(\d+)/)[1]) || 1; // Default to 1 if not found
    const exercisesPerPart = 4;
    const parts = 4;

    for (let part = 0; part < parts; part++) {
        const partDiv = document.createElement('div');
        partDiv.className = 'part';

        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercises';

        for (let i = 0; i < exercisesPerPart; i++) {
            const exerciseCode = `${chapterNum}:${part + 1}:${i + 1}`;
            const exerciseKey = `exercise${exerciseCode}`; // Use structured key, e.g., "exercise1:1:1"
            let level = localStorage.getItem(exerciseKey) ? parseInt(localStorage.getItem(exerciseKey)) : 0;

            const starContainer = document.createElement('div');
            starContainer.className = 'star-container';

            const img = document.createElement('img');
            img.src = starImages[level];
            img.alt = `Exercise ${exerciseCode} - ${level === 0 ? 'Outlined Star' : `${level} Golden Stars`}`;
            img.className = 'star';
            img.dataset.exercise = exerciseKey;

            const codeLabel = document.createElement('div');
            codeLabel.textContent = exerciseCode;
            codeLabel.className = 'exercise-code';

            img.addEventListener('click', () => {
                img.style.opacity = '0';
                setTimeout(() => {
                    level = (level + 1) % 7; // Cycle through 0–6
                    img.src = starImages[level];
                    localStorage.setItem(exerciseKey, level.toString());
                    img.style.opacity = '1';
                }, 300);
            });

            starContainer.appendChild(img);
            starContainer.appendChild(codeLabel);
            exerciseDiv.appendChild(starContainer);
        }

        partDiv.appendChild(exerciseDiv);
        partsContainer.appendChild(partDiv);
    }
});