document.addEventListener('DOMContentLoaded', () => {
    const starImages = [
        'white-star.png',
        'one-star.png',
        'two-stars.png',
        'three-stars.png',
        'four-stars.png',
        'five-stars.png',
        'six-stars.png'
    ];
    const partsContainer = document.querySelector('.parts');
    const chapterNumMatch = document.location.pathname.match(/chapter(\d+)/);
    const chapterNum = chapterNumMatch ? parseInt(chapterNumMatch[1]) : 1;
    const exercisesPerPart = 4;
    const parts = 4;

    for (let part = 0; part < parts; part++) {
        const partDiv = document.createElement('div');
        partDiv.className = 'part';

        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercises';

        for (let i = 0; i < exercisesPerPart; i++) {
            const exerciseCode = `${chapterNum}:${part + 1}:${i + 1}`;
            const exerciseKey = `exercise${exerciseCode}`;
            const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
            const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
            let level = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;

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

            // Assume img is the star image element, starImages is an array of image URLs, 
// exerciseKey identifies the exercise, and localStorage holds the student data
            img.addEventListener('click', () => {
                // Initialize click queue if not present
                if (!img.dataset.clickQueue) {
                    img.dataset.clickQueue = '0';
                }
                // Add one more click to the queue
                img.dataset.clickQueue = parseInt(img.dataset.clickQueue) + 1;

                // Process the queue
                function processQueue() {
                    if (img.dataset.clickQueue > 0) {
                        // Decrease the queue count
                        img.dataset.clickQueue -= 1;

                        // Load current student data
                        const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
                        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
                        let level = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;

                        // Fade out the star
                        img.style.opacity = '0';
                        setTimeout(() => {
                            // Increment the level (loops back to 0 after 6)
                            level = (level + 1) % 7;
                            img.src = starImages[level]; // Update the star image
                            progress[exerciseKey] = level.toString();
                            studentsData.students[studentsData.currentStudent].progress = progress;
                            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
                            
                            // Fade back in
                            img.style.opacity = '1';

                            // Process the next click after animation
                            setTimeout(processQueue, 300);
                        }, 300); // Animation delay
                    }
                }

                // Start processing if this is the first click in the queue
                if (parseInt(img.dataset.clickQueue) === 1) {
                    processQueue();
                }
            });

            starContainer.appendChild(img);
            starContainer.appendChild(codeLabel);
            exerciseDiv.appendChild(starContainer);
        }

        partDiv.appendChild(exerciseDiv);
        partsContainer.appendChild(partDiv);
    }
});