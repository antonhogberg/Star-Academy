document.addEventListener('DOMContentLoaded', () => {
    const starImages = [
        'white-star.png',      // Level 0
        'one-star.png',        // Level 1
        'two-stars.png',       // Level 2
        'three-stars.png',     // Level 3
        'four-stars.png',      // Level 4
        'five-stars.png',      // Level 5
        'six-stars.png'        // Level 6
    ];

    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        const exerciseKey = star.dataset.exercise; // Use data-exercise instead of data-chapter
        let currentLevel = localStorage.getItem(exerciseKey) ? parseInt(localStorage.getItem(exerciseKey)) : 0;

        // Set initial star image
        star.src = starImages[currentLevel];

        star.addEventListener('click', () => {
            // Fade out
            star.style.opacity = '0';
            setTimeout(() => {
                // Increment level, max at 6
                currentLevel = (currentLevel + 1) % 7;
                star.src = starImages[currentLevel];
                localStorage.setItem(exerciseKey, currentLevel);
                // Fade in
                star.style.opacity = '1';
            }, 300); // Match transition duration in CSS
        });
    });
});