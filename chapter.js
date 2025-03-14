document.addEventListener('DOMContentLoaded', () => {
    const partsContainer = document.querySelector('.parts');
    if (!partsContainer) return;

    // Get the current chapter from the URL (e.g., "chapter1.html" -> chapter 1)
    const currentPath = window.location.pathname.toLowerCase();
    const chapterMatch = currentPath.match(/chapter(\d+)\.html/);
    const chapter = chapterMatch ? parseInt(chapterMatch[1]) : 1;

    // Define exercises for the current chapter
    const exercises = [];
    for (let part = 1; part <= 4; part++) {
        for (let exercise = 1; exercise <= 4; exercise++) {
            exercises.push({
                chapter: chapter,
                part: part,
                exercise: exercise,
                key: `exercise${chapter}:${part}:${exercise}`
            });
        }
    }

    // Group exercises by part
    const parts = [];
    for (let part = 1; part <= 4; part++) {
        parts.push(exercises.filter(ex => ex.part === part));
    }

    // Create parts and exercises dynamically
    parts.forEach((partExercises, partIndex) => {
        const partDiv = document.createElement('div');
        partDiv.className = 'part';

        const exercisesDiv = document.createElement('div');
        exercisesDiv.className = 'exercises';

        partExercises.forEach(ex => {
            const starContainer = document.createElement('div');
            starContainer.className = 'star-container';
            starContainer.setAttribute('data-star-key', ex.key); // e.g., "exercise1:1:1"

            const starImg = document.createElement('img');
            starImg.className = 'star';

            // Get the state from localStorage (default to 1 if not set)
            let state = localStorage.getItem(ex.key);
            if (!state) {
                // For chapter 1, check the old key format (e.g., "exercise1:1:1" -> "exercise1:1:1")
                if (ex.chapter === 1) {
                    const oldKey = ex.key.replace('exercise1:', 'exercise');
                    state = localStorage.getItem(oldKey) || '1';
                } else {
                    state = '1';
                }
            }

            starImg.src = `images/star${state}.png`;
            starImg.alt = `Star for exercise ${ex.chapter}:${ex.part}:${ex.exercise}`;

            const codeSpan = document.createElement('span');
            codeSpan.className = 'exercise-code';
            codeSpan.textContent = `${ex.chapter}:${ex.part}:${ex.exercise}`;

            starContainer.appendChild(starImg);
            starContainer.appendChild(codeSpan);
            exercisesDiv.appendChild(starContainer);
        });

        partDiv.appendChild(exercisesDiv);
        partsContainer.appendChild(partDiv);
    });
});