// chapter.js

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

            img.addEventListener('click', () => {
                // Immediately update the level in localStorage
                const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
                const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
                let level = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
                level = (level + 1) % 7; // Increment and cycle (0 to 6)
                progress[exerciseKey] = level.toString();
                studentsData.students[studentsData.currentStudent].progress = progress;
                localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));

                // Animate the change (allow overlapping animations)
                img.style.opacity = '0';
                setTimeout(() => {
                    img.src = starImages[level];
                    img.style.opacity = '1';
                }, 300);
            });

            // Listen for storage events to sync with other pages
            window.addEventListener('storage', (event) => {
                if (event.key === 'starAcademyStudents') {
                    const updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                    const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                    const updatedLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;
                    if (updatedLevel !== level) {
                        level = updatedLevel;
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.src = starImages[level];
                            img.style.opacity = '1';
                        }, 300);
                        console.log(`Star ${exerciseCode} updated via storage event, level: ${level}`);
                    }
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