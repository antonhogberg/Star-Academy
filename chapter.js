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

    // Step 5: Add inline styles for star stacking
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .star { pointer-events: all; transition: opacity 0.4s ease-in-out; position: absolute; top: 0; left: 0; z-index: 1; width: 100%; height: 100%; }
        .star.no-transition { transition: none; }
        .star.non-clickable { pointer-events: auto; }
        .star.base { pointer-events: none; z-index: 0; }
        .star.active { pointer-events: all; z-index: 2; }
        .star.overlay { z-index: 3; }
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

            const baseImg = document.createElement('img');
            baseImg.src = starImages[goldLevel][silverLevel] || starImages[0][0];
            baseImg.alt = `Exercise ${exerciseCode} - ${goldLevel === 0 && silverLevel === 0 ? 'Outlined Star' : `${goldLevel} Golden Stars, ${silverLevel} Silver Stars`}`;
            baseImg.className = 'star base';
            baseImg.dataset.exercise = exerciseKey;
            baseImg.dataset.goldLevel = goldLevel;
            baseImg.dataset.silverLevel = silverLevel;

            const activeImg = document.createElement('img');
            activeImg.src = starImages[goldLevel][silverLevel] || starImages[0][0];
            activeImg.alt = `Exercise ${exerciseCode} - ${goldLevel === 0 && silverLevel === 0 ? 'Outlined Star' : `${goldLevel} Golden Stars, ${silverLevel} Silver Stars`}`;
            activeImg.className = 'star active';
            activeImg.dataset.exercise = exerciseKey;
            activeImg.dataset.goldLevel = goldLevel;
            activeImg.dataset.silverLevel = silverLevel;
            activeImg.dataset.queuedGoldLevel = goldLevel;
            activeImg.dataset.queuedSilverLevel = silverLevel;
            activeImg.dataset.isAnimating = 'false';

            const codeLabel = document.createElement('div');
            codeLabel.textContent = exerciseCode;
            codeLabel.className = 'exercise-code';

            // Click handler for mode-specific star clicking
            function handleStarClick(event) {
                const activeStar = event.currentTarget;
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

                let goldLevel = parseInt(activeStar.dataset.goldLevel, 10);
                let silverLevel = parseInt(activeStar.dataset.silverLevel, 10);
                let newGoldLevel = goldLevel;
                let newSilverLevel = silverLevel;
                let isException = false;

                if (studentMode && goldLevel === 6) {
                    // Exception 1: Gold level 6 in student mode (fade-out/fade-in)
                    console.log(`Student mode: Fade effect for goldLevel=6, no state change for ${exerciseKey}`);
                    isException = true;
                    activeStar.classList.add('non-clickable');
                } else if (studentMode) {
                    // Student mode: Increment silver stars, lock gold stars
                    const maxSilver = 6 - goldLevel;
                    newSilverLevel = (silverLevel + 1) % (maxSilver + 1);
                    // Exception 2: Transition to goldX_silver0 in student mode
                    if (newSilverLevel === 0 && silverLevel === maxSilver) {
                        isException = true;
                    }
                    silverProgress[exerciseKey] = newSilverLevel.toString();
                    studentsData.students[studentsData.currentStudent].silverProgress = silverProgress;
                    console.log(`Student mode: Updated silverLevel=${newSilverLevel} for ${exerciseKey}`);
                } else {
                    // Normal mode: Increment gold stars, reset silver stars
                    newGoldLevel = (goldLevel + 1) % 7;
                    newSilverLevel = 0;
                    // Exception 2: Transition from gold6_silver0 to gold0_silver0
                    if (goldLevel === 6 && newGoldLevel === 0) {
                        isException = true;
                    }
                    progress[exerciseKey] = newGoldLevel.toString();
                    silverProgress[exerciseKey] = '0';
                    studentsData.students[studentsData.currentStudent].progress = progress;
                    studentsData.students[studentsData.currentStudent].silverProgress = silverProgress;
                    console.log(`Normal mode: Updated goldLevel=${newGoldLevel}, silverLevel=0 for ${exerciseKey}`);
                }

                // Update queued state in memory
                activeStar.dataset.queuedGoldLevel = newGoldLevel;
                activeStar.dataset.queuedSilverLevel = newSilverLevel;

                // Save progress only if state changed
                if (!(studentMode && goldLevel === 6)) {
                    activeStar.dataset.goldLevel = newGoldLevel;
                    activeStar.dataset.silverLevel = newSilverLevel;
                    baseImg.dataset.goldLevel = newGoldLevel;
                    baseImg.dataset.silverLevel = newSilverLevel;
                    try {
                        localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
                    } catch (e) {
                        console.error(`Failed to save starAcademyStudents: ${e}`);
                    }
                }

                // Handle animation
                const applyAnimation = () => {
                    const isAnimating = activeStar.dataset.isAnimating === 'true';
                    let overlayImg = starContainer.querySelector('.star.overlay');

                    const queuedGoldLevel = parseInt(activeStar.dataset.queuedGoldLevel, 10);
                    const queuedSilverLevel = parseInt(activeStar.dataset.queuedSilverLevel, 10);

                    // Use the previous state for exception check
                    const isExceptionNow = (studentMode && goldLevel === 6) || 
                                          (studentMode && silverLevel === (6 - goldLevel) && queuedSilverLevel === 0) ||
                                          (!studentMode && goldLevel === 6 && queuedGoldLevel === 0);

                    if (isAnimating) {
                        // Animation in progress, update the existing overlay's queued state
                        if (overlayImg) {
                            overlayImg.dataset.queuedGoldLevel = queuedGoldLevel;
                            overlayImg.dataset.queuedSilverLevel = queuedSilverLevel;
                            overlayImg.dataset.isException = isExceptionNow ? 'true' : 'false';
                        }
                        return;
                    }

                    activeStar.dataset.isAnimating = 'true';

                    if (isExceptionNow) {
                        // Fade-out/fade-in for exceptions
                        activeStar.style.opacity = '0';
                        baseImg.style.opacity = '0';
                        setTimeout(() => {
                            activeStar.src = starImages[queuedGoldLevel][queuedSilverLevel];
                            activeStar.alt = `Exercise ${exerciseCode} - ${queuedGoldLevel === 0 && queuedSilverLevel === 0 ? 'Outlined Star' : `${queuedGoldLevel} Golden Stars, ${queuedSilverLevel} Silver Stars`}`;
                            baseImg.src = starImages[queuedGoldLevel][queuedSilverLevel];
                            baseImg.alt = `Exercise ${exerciseCode} - ${queuedGoldLevel === 0 && queuedSilverLevel === 0 ? 'Outlined Star' : `${queuedGoldLevel} Golden Stars, ${queuedSilverLevel} Silver Stars`}`;
                            activeStar.style.opacity = '1';
                            baseImg.style.opacity = '1';
                            activeStar.dataset.isAnimating = 'false';
                            activeStar.classList.remove('non-clickable');

                            // Check if another state change is queued
                            const nextGoldLevel = parseInt(activeStar.dataset.queuedGoldLevel, 10);
                            const nextSilverLevel = parseInt(activeStar.dataset.queuedSilverLevel, 10);
                            if (nextGoldLevel !== queuedGoldLevel || nextSilverLevel !== queuedSilverLevel) {
                                activeStar.dataset.goldLevel = nextGoldLevel;
                                activeStar.dataset.silverLevel = nextSilverLevel;
                                baseImg.dataset.goldLevel = nextGoldLevel;
                                baseImg.dataset.silverLevel = nextSilverLevel;
                                applyAnimation();
                            }
                        }, 400);
                    } else {
                        // Fade-in overlay for general case
                        baseImg.classList.add('no-transition'); // Prevent fade-out of base star
                        baseImg.src = starImages[queuedGoldLevel][queuedSilverLevel];
                        baseImg.alt = `Exercise ${exerciseCode} - ${queuedGoldLevel === 0 && queuedSilverLevel === 0 ? 'Outlined Star' : `${queuedGoldLevel} Golden Stars, ${queuedSilverLevel} Silver Stars`}`;
                        baseImg.style.opacity = '1'; // Ensure baseImg is fully visible

                        overlayImg = document.createElement('img');
                        overlayImg.src = starImages[queuedGoldLevel][queuedSilverLevel];
                        overlayImg.alt = `Exercise ${exerciseCode} - ${queuedGoldLevel === 0 && queuedSilverLevel === 0 ? 'Outlined Star' : `${queuedGoldLevel} Golden Stars, ${queuedSilverLevel} Silver Stars`}`;
                        overlayImg.className = 'star overlay';
                        overlayImg.dataset.exercise = exerciseKey;
                        overlayImg.dataset.goldLevel = queuedGoldLevel;
                        overlayImg.dataset.silverLevel = queuedSilverLevel;
                        overlayImg.dataset.queuedGoldLevel = queuedGoldLevel;
                        overlayImg.dataset.queuedSilverLevel = queuedSilverLevel;
                        overlayImg.dataset.isException = 'false';
                        overlayImg.style.opacity = '0';
                        starContainer.appendChild(overlayImg);
                        overlayImg.style.opacity = '1'; // Trigger the fade-in transition

                        setTimeout(() => {
                            const existingOverlay = starContainer.querySelector('.star.overlay');
                            if (existingOverlay && existingOverlay !== overlayImg) {
                                starContainer.removeChild(existingOverlay);
                            }
                            activeStar.src = starImages[queuedGoldLevel][queuedSilverLevel];
                            activeStar.alt = `Exercise ${exerciseCode} - ${queuedGoldLevel === 0 && queuedSilverLevel === 0 ? 'Outlined Star' : `${queuedGoldLevel} Golden Stars, ${queuedSilverLevel} Silver Stars`}`;
                            activeStar.dataset.isAnimating = 'false';

                            // Check if another state change is queued
                            const nextGoldLevel = parseInt(activeStar.dataset.queuedGoldLevel, 10);
                            const nextSilverLevel = parseInt(activeStar.dataset.queuedSilverLevel, 10);
                            if (nextGoldLevel !== queuedGoldLevel || nextSilverLevel !== queuedSilverLevel) {
                                activeStar.dataset.goldLevel = nextGoldLevel;
                                activeStar.dataset.silverLevel = nextSilverLevel;
                                baseImg.dataset.goldLevel = nextGoldLevel;
                                baseImg.dataset.silverLevel = nextSilverLevel;
                                applyAnimation();
                            }
                        }, 400);
                    }

                    // Trigger rank achievement check
                    if (typeof window.updateStarStates === 'function') {
                        console.log(`Star clicked on chapter ${chapterNum}, calling updateStarStates for exercise ${exerciseCode}`);
                        window.updateStarStates(studentsData, true);
                    } else {
                        console.error('updateStarStates not defined');
                    }
                };

                applyAnimation();
            }

            activeImg.addEventListener('click', handleStarClick);
            console.log(`Attached click handler for star-${exerciseCode} during initialization`);

            // Storage listener for updates
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
                        starContainer.innerHTML = ''; // Clear container
                        const newBaseImg = document.createElement('img');
                        newBaseImg.src = starImages[updatedGoldLevel][updatedSilverLevel];
                        newBaseImg.alt = `Exercise ${exerciseCode} - ${updatedGoldLevel === 0 && updatedSilverLevel === 0 ? 'Outlined Star' : `${updatedGoldLevel} Golden Stars, ${updatedSilverLevel} Silver Stars`}`;
                        newBaseImg.className = 'star base';
                        newBaseImg.dataset.exercise = exerciseKey;
                        newBaseImg.dataset.goldLevel = updatedGoldLevel;
                        newBaseImg.dataset.silverLevel = updatedSilverLevel;

                        const newActiveImg = document.createElement('img');
                        newActiveImg.src = starImages[updatedGoldLevel][updatedSilverLevel];
                        newActiveImg.alt = `Exercise ${exerciseCode} - ${updatedGoldLevel === 0 && updatedSilverLevel === 0 ? 'Outlined Star' : `${updatedGoldLevel} Golden Stars, ${updatedSilverLevel} Silver Stars`}`;
                        newActiveImg.className = 'star active';
                        newActiveImg.dataset.exercise = exerciseKey;
                        newActiveImg.dataset.goldLevel = updatedGoldLevel;
                        newActiveImg.dataset.silverLevel = updatedSilverLevel;
                        newActiveImg.dataset.queuedGoldLevel = updatedGoldLevel;
                        newActiveImg.dataset.queuedSilverLevel = updatedSilverLevel;
                        newActiveImg.dataset.isAnimating = 'false';
                        newActiveImg.addEventListener('click', handleStarClick);
                        starContainer.appendChild(newBaseImg);
                        starContainer.appendChild(newActiveImg);
                        starContainer.appendChild(codeLabel);
                        console.log(`Star ${exerciseCode} updated via storage event, goldLevel: ${updatedGoldLevel}, silverLevel: ${updatedSilverLevel}`);
                    }

                    // Update dropdown and userNameDisplay
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

            starContainer.appendChild(baseImg);
            starContainer.appendChild(activeImg);
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

// Expose initializeChapter globally
window.initializeChapter = initializeChapter;