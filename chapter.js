// Step 5: Updated starImages for normal and student modes (28 images)
const starImages = [
    ['gold0_silver0.png', 'gold0_silver1.png', 'gold0_silver2.png', 'gold0_silver3.png', 'gold0_silver4.png', 'gold0_silver5.png', 'gold0_silver6.png'],
    ['gold1_silver0.png', 'gold1_silver1.png', 'gold1_silver2.png', 'gold1_silver3.png', 'gold1_silver4.png', 'gold1_silver5.png'],
    ['gold2_silver0.png', 'gold2_silver1.png', 'gold2_silver2.png', 'gold2_silver3.png', 'gold2_silver4.png'],
    ['gold3_silver0.png', 'gold3_silver1.png', 'gold3_silver2.png', 'gold3_silver3.png'],
    ['gold4_silver0.png', 'gold4_silver1.png', 'gold4_silver2.png'],
    ['gold5_silver0.png', 'gold5_silver1.png'],
    ['gold6_silver0.png']
];

// Step 5: Preload images for performance
function preloadImages() {
    console.log('Preloading star images for chapter');
    const preloadPromises = [];
    starImages.forEach((goldLevelImages, goldLevel) => {
        goldLevelImages.forEach((image, silverLevel) => {
            const img = new Image();
            preloadPromises.push(
                new Promise((resolve, reject) => {
                    img.src = image;
                    img.onload = () => {
                        console.log(`Loaded image: ${image}`);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to preload image: ${image}`);
                        reject();
                    };
                })
            );
        });
    });
    Promise.all(preloadPromises).then(() => console.log('All images preloaded')).catch(err => console.error('Some images failed to preload', err));
}

function initializeChapter() {
    console.log('initializeChapter called');
    const partsContainer = document.querySelector('.parts');
    if (!partsContainer) {
        console.error('Parts container not found');
        return;
    }

    const chapterNumMatch = document.location.pathname.match(/chapter(\d+)/);
    const chapterNum = chapterNumMatch ? parseInt(chapterNumMatch[1]) : 1;
    const exercisesPerPart = 4;
    const parts = 4;

    // Clear existing parts to re-render
    partsContainer.innerHTML = '';

    // Step 5: Preload images
    preloadImages();

    // Step 5: Add inline styles for star transition
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .star { pointer-events: all; transition: opacity 0.4s ease-in-out; width: 100%; }
        .star.non-clickable { pointer-events: auto; }
    `;
    document.head.appendChild(styleElement);

    for (let part = 0; part < parts; part++) {
        const partDiv = document.createElement('div');
        partDiv.className = 'part';

        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercises';

        for (let i = 0; i < exercisesPerPart; i++) {
            const exerciseCode = `${chapterNum}:${part + 1}:${i + 1}`;
            const exerciseKey = `exercise${exerciseCode}`;
            let studentsData;
            try {
                studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
            } catch (e) {
                console.error(`Failed to parse starAcademyStudents: ${e}`);
                studentsData = { students: {}, currentStudent: '' };
            }
            const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
            const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
            const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
            const goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
            const silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey]) : 0;

            const starContainer = document.createElement('div');
            starContainer.className = 'star-container';

            const starWrapper = document.createElement('div');
            starWrapper.className = 'star-wrapper';

            const img = document.createElement('img');
            img.src = starImages[goldLevel][silverLevel] || starImages[0][0];
            img.alt = `Exercise ${exerciseCode} - ${goldLevel === 0 && silverLevel === 0 ? 'Outlined Star' : `${goldLevel} Golden Stars, ${silverLevel} Silver Stars`}`;
            img.className = 'star';
            img.dataset.exercise = exerciseKey;

            const codeLabel = document.createElement('div');
            codeLabel.textContent = exerciseCode;
            codeLabel.className = 'exercise-code';

            function handleStarClick(event) {
                const starImg = event.currentTarget;
                const starWrapper = starImg.parentElement;
                const starContainer = starWrapper.parentElement;
                let studentsData;
                try {
                    studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
                } catch (e) {
                    console.error(`Failed to parse starAcademyStudents in click handler: ${e}`);
                    return;
                }
                if (!studentsData.currentStudent) {
                    console.warn(`No current student set, ignoring click for ${exerciseCode}`);
                    return;
                }
                const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
                const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
                const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
                console.log(`Star ${exerciseCode} clicked, studentMode=${studentMode}`);
                console.log(`Click handler executed for star-${exerciseCode}`);
                let goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
                let silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey]) : 0;

                let newGoldLevel = goldLevel;
                let newSilverLevel = silverLevel;
                let isException = false;
                if (studentMode && goldLevel === 6) {
                    console.log(`Student mode: Fade effect for goldLevel=6, no state change for ${exerciseKey}`);
                    isException = true;
                    starImg.classList.add('non-clickable');
                } else if (studentMode) {
                    const maxSilver = 6 - goldLevel;
                    newSilverLevel = (silverLevel + 1) % (maxSilver + 1);
                    if (newSilverLevel === 0 && silverLevel === maxSilver) {
                        isException = true;
                    }
                    silverProgress[exerciseKey] = newSilverLevel.toString();
                    studentsData.students[studentsData.currentStudent].silverProgress = silverProgress;
                    console.log(`Student mode: Updated silverLevel=${newSilverLevel} for ${exerciseKey}`);
                } else {
                    newGoldLevel = (goldLevel + 1) % 7;
                    newSilverLevel = 0;
                    if (goldLevel === 6 && newGoldLevel === 0) {
                        isException = true;
                    }
                    progress[exerciseKey] = newGoldLevel.toString();
                    silverProgress[exerciseKey] = '0';
                    studentsData.students[studentsData.currentStudent].progress = progress;
                    studentsData.students[studentsData.currentStudent].silverProgress = silverProgress;
                    console.log(`Normal mode: Updated goldLevel=${newGoldLevel}, silverLevel=0 for ${exerciseKey}`);
                }

                if (isException) {
                    starImg.style.opacity = '0';
                    setTimeout(() => {
                        starImg.src = starImages[newGoldLevel][newSilverLevel];
                        starImg.alt = `Exercise ${exerciseCode} - ${newGoldLevel === 0 && newSilverLevel === 0 ? 'Outlined Star' : `${newGoldLevel} Golden Stars, ${newSilverLevel} Silver Stars`}`;
                        starImg.style.opacity = '1';
                    }, 400);
                } else {
                    const overlayImg = document.createElement('img');
                    overlayImg.src = starImages[newGoldLevel][newSilverLevel];
                    overlayImg.alt = `Exercise ${exerciseCode} - ${newGoldLevel === 0 && newSilverLevel === 0 ? 'Outlined Star' : `${newGoldLevel} Golden Stars, ${newSilverLevel} Silver Stars`}`;
                    overlayImg.className = 'star';
                    overlayImg.dataset.exercise = exerciseKey;
                    overlayImg.style.opacity = '0';
                    starWrapper.appendChild(overlayImg);
                    setTimeout(() => {
                        overlayImg.style.opacity = '1';
                        starImg.style.opacity = '0';
                    }, 10);
                    setTimeout(() => {
                        starWrapper.removeChild(starImg);
                        overlayImg.addEventListener('click', handleStarClick);
                        console.log(`Reattached click handler for star-${exerciseCode}`);
                    }, 400);
                }

                if (!(studentMode && goldLevel === 6)) {
                    try {
                        localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
                    } catch (e) {
                        console.error(`Failed to save starAcademyStudents: ${e}`);
                    }
                }

                if (typeof window.updateStarStates === 'function') {
                    console.log(`Star clicked on chapter ${chapterNum}, calling updateStarStates for exercise ${exerciseCode}`);
                    window.updateStarStates(studentsData, true);
                } else {
                    console.error('updateStarStates not defined');
                }
            }

            img.addEventListener('click', handleStarClick);
            console.log(`Attached click handler for star-${exerciseCode} during initialization`);

            window.addEventListener('storage', (event) => {
                if (event.key === 'starAcademyStudents') {
                    let updatedStudentsData;
                    try {
                        updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                    } catch (e) {
                        console.error(`Failed to parse starAcademyStudents in storage listener: ${e}`);
                        return;
                    }
                    const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                    const updatedSilverProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.silverProgress || {};
                    const updatedStudentMode = updatedStudentsData.students[updatedStudentsData.currentStudent]?.studentMode || false;
                    const updatedGoldLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;
                    const updatedSilverLevel = updatedSilverProgress[exerciseKey] ? parseInt(updatedSilverProgress[exerciseKey]) : 0;

                    if (updatedGoldLevel !== goldLevel || updatedSilverLevel !== silverLevel) {
                        starContainer.innerHTML = '';
                        const newStarWrapper = document.createElement('div');
                        newStarWrapper.className = 'star-wrapper';
                        const newImg = document.createElement('img');
                        newImg.src = starImages[updatedGoldLevel][updatedSilverLevel];
                        newImg.alt = `Exercise ${exerciseCode} - ${updatedGoldLevel === 0 && updatedSilverLevel === 0 ? 'Outlined Star' : `${updatedGoldLevel} Golden Stars, ${updatedSilverLevel} Silver Stars`}`;
                        newImg.className = 'star';
                        newImg.dataset.exercise = exerciseKey;
                        newImg.addEventListener('click', handleStarClick);
                        newStarWrapper.appendChild(newImg);
                        starContainer.appendChild(newStarWrapper);
                        starContainer.appendChild(codeLabel);
                        console.log(`Star ${exerciseCode} updated via storage event, goldLevel: ${updatedGoldLevel}, silverLevel: ${updatedSilverLevel}`);
                    }

                    const globalSelect = document.getElementById('globalStudentSelect');
                    const userNameDisplay = document.getElementById('userNameDisplay');
                    if (globalSelect && typeof updateDropdown === 'function') {
                        console.log('Storage event: Updating dropdown');
                        updateDropdown();
                    }
                    if (userNameDisplay) {
                        console.log('Storage event: Updating userNameDisplay');
                        userNameDisplay.textContent = updatedStudentsData.currentStudent || '';
                    }
                }
            });

            starWrapper.appendChild(img);
            starContainer.appendChild(starWrapper);
            starContainer.appendChild(codeLabel);
            exerciseDiv.appendChild(starContainer);
        }

        partDiv.appendChild(exerciseDiv);
        partsContainer.appendChild(partDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Initializing chapter');
    initializeChapter();
});

window.initializeChapter = initializeChapter;