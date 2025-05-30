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

    // Step 5: Preload images
    preloadImages();

    // Initialize only the visible SVG
    const svg4x4Div = document.getElementById('stars-4x4');
    const svg2x2x4Div = document.getElementById('stars-2x2x4');

    const isSvg4x4Visible = window.getComputedStyle(svg4x4Div).display !== 'none';
    const isSvg2x2x4Visible = window.getComputedStyle(svg2x2x4Div).display !== 'none';

    console.log(`SVG Visibility - 4x4: ${isSvg4x4Visible}, 2x2x4: ${isSvg2x2x4Visible}`);

    if (isSvg4x4Visible) {
        const svg4x4Doc = svg4x4Div.querySelector('svg');
        initializeSvg(svg4x4Doc, chapterNum);
    } else if (isSvg2x2x4Visible) {
        const svg2x2x4Doc = svg2x2x4Div.querySelector('svg');
        initializeSvg(svg2x2x4Doc, chapterNum);
    } else {
        console.error('No SVG is visible');
    }
}

function initializeSvg(doc, chapterNum) {
    console.log('initializeSvg called');
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    if (!studentsData.currentStudent) {
        console.warn('No current student set; chapter initialization aborted');
        return;
    }

    // Add styles to SVG (matching starmap.js)
    const styleElement = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.textContent = `
        image { pointer-events: all; transition: opacity 0.4s ease-in-out; }
        image.non-clickable { pointer-events: auto; }
    `;
    const existingStyles = doc.querySelectorAll('style');
    existingStyles.forEach(style => style.remove());
    doc.appendChild(styleElement);

    // Update star IDs and exercise codes
    const stars = doc.querySelectorAll('image[id^="star-"]');
    const codes = doc.querySelectorAll('text[id^="code-"]');
    stars.forEach(star => {
        const oldId = star.getAttribute('id'); // e.g., star-X-1-1
        const [_, part, starNum] = oldId.split('-').slice(1); // ['X', '1', '1']
        const newId = `star-${chapterNum}-${part}-${starNum}`;
        star.setAttribute('id', newId);
        star.setAttribute('data-exercise', `exercise${chapterNum}:${part}:${starNum}`);
        console.log(`Updated star ID to ${newId}`);
    });
    codes.forEach(code => {
        const oldId = code.getAttribute('id'); // e.g., code-X-1-1
        const [_, part, starNum] = oldId.split('-').slice(1);
        const newId = `code-${chapterNum}-${part}-${starNum}`;
        code.setAttribute('id', newId);
        code.textContent = `${chapterNum}:${part}:${starNum}`;
        console.log(`Updated code ID to ${newId}, text to ${code.textContent}`);
    });

    // Initialize stars
    stars.forEach(star => {
        const exerciseKey = star.dataset.exercise;
        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
        const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
        const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
        const goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
        const silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey]) : 0;

        star.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[goldLevel][silverLevel]);
        star.setAttribute('alt', `Exercise ${exerciseKey.replace('exercise', '')} - ${goldLevel === 0 && silverLevel === 0 ? 'Outlined Star' : `${goldLevel} Golden Stars, ${silverLevel} Silver Stars`}`);
        if (studentMode && goldLevel === 6) {
            star.classList.add('non-clickable');
        }

        // Attach click handler
        const parent = star.parentNode;
        const x = star.getAttribute('x');
        const y = star.getAttribute('y');
        const width = star.getAttribute('width');
        const height = star.getAttribute('height');
        star.addEventListener('click', (e) => {
            console.log(`Click event triggered for star-${exerciseKey}`);
            handleStarClick(e, star, exerciseKey, doc, parent, x, y, width, height);
        });
        console.log(`Attached click handler for star-${exerciseKey}`);

        // Test clickability with a simple handler
        star.addEventListener('click', () => {
            console.log(`Test click handler: Star ${exerciseKey} clicked`);
        });
    });

    // Handle storage updates
    window.removeEventListener('storage', window.storageListener);
    window.storageListener = (event) => {
        if (event.key === 'starAcademyStudents') {
            let updatedStudentsData;
            try {
                updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
            } catch (e) {
                console.error(`Failed to parse starAcademyStudents in storage listener: ${e}`);
                return;
            }
            stars.forEach(star => {
                const exerciseKey = star.dataset.exercise;
                const parent = star.parentNode;
                const x = star.getAttribute('x');
                const y = star.getAttribute('y');
                const width = star.getAttribute('width');
                const height = star.getAttribute('height');
                const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                const updatedSilverProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.silverProgress || {};
                const updatedStudentMode = updatedStudentsData.students[updatedStudentsData.currentStudent]?.studentMode || false;
                const updatedGoldLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;
                const updatedSilverLevel = updatedSilverProgress[exerciseKey] ? parseInt(updatedSilverProgress[exerciseKey]) : 0;

                const newStarElement = createStarElement(doc, exerciseKey.replace('exercise', ''), updatedGoldLevel, updatedSilverLevel, x, y, width, height);
                if (updatedStudentMode && updatedGoldLevel === 6) {
                    newStarElement.classList.add('non-clickable');
                }
                parent.replaceChild(newStarElement, star);
                newStarElement.addEventListener('click', (e) => {
                    console.log(`Click event triggered for star-${exerciseKey} after storage update`);
                    handleStarClick(e, newStarElement, exerciseKey, doc, parent, x, y, width, height);
                });
                console.log(`Reattached click handler for star-${exerciseKey} in storage listener`);
            });

            checkCompletion(updatedStudentsData);

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
    };
    window.addEventListener('storage', window.storageListener);

    checkCompletion(studentsData);
}

function createStarElement(doc, starId, goldLevel, silverLevel, x, y, width, height, initialOpacity = 1) {
    const starElement = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
    starElement.setAttribute('id', `star-${starId.replace(/:/g, '-')}`);
    starElement.setAttribute('x', x);
    starElement.setAttribute('y', y);
    starElement.setAttribute('width', width);
    starElement.setAttribute('height', height);
    const image = starImages[goldLevel][silverLevel] || starImages[0][0];
    starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', image);
    starElement.setAttribute('alt', `Exercise ${starId} - ${goldLevel === 0 && silverLevel === 0 ? 'Outlined Star' : `${goldLevel} Golden Stars, ${silverLevel} Silver Stars`}`);
    starElement.style.opacity = initialOpacity;
    return starElement;
}

function handleStarClick(event, star, exerciseKey, doc, parent, x, y, width, height) {
    const starElement = event.currentTarget;
    const exerciseCode = exerciseKey.replace('exercise', '');
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
        starElement.classList.add('non-clickable');
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
        starElement.style.opacity = '0';
        setTimeout(() => {
            starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[newGoldLevel][newSilverLevel]);
            starElement.setAttribute('alt', `Exercise ${exerciseCode} - ${newGoldLevel === 0 && silverLevel === 0 ? 'Outlined Star' : `${newGoldLevel} Golden Stars, ${newSilverLevel} Silver Stars`}`);
            starElement.style.opacity = '1';
        }, 400);
    } else {
        const overlayStarElement = createStarElement(doc, exerciseCode, newGoldLevel, newSilverLevel, x, y, width, height, 0);
        parent.appendChild(overlayStarElement);
        setTimeout(() => {
            overlayStarElement.style.opacity = '1';
            starElement.style.opacity = '0';
        }, 10);
        setTimeout(() => {
            parent.removeChild(starElement);
            overlayStarElement.setAttribute('id', `star-${exerciseCode.replace(/:/g, '-')}`);
            overlayStarElement.addEventListener('click', (e) => {
                console.log(`Click event triggered for star-${exerciseKey} after fade`);
                handleStarClick(e, overlayStarElement, exerciseKey, doc, parent, x, y, width, height);
            });
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

    checkCompletion(studentsData);
}

function checkCompletion(studentsData) {
    const chapterNumMatch = document.location.pathname.match(/chapter(\d+)/);
    const chapterNum = chapterNumMatch ? parseInt(chapterNumMatch[1]) : 1;
    const exercises = [];
    for (let part = 1; part <= 4; part++) {
        for (let star = 1; star <= 4; star++) {
            exercises.push(`exercise${chapterNum}:${part}:${star}`);
        }
    }
    const allStarsAtSix = exercises.every(exercise => {
        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
        return (progress[exercise] ? parseInt(progress[exercise]) : 0) === 6;
    });
    if (allStarsAtSix) {
        const overlay = document.getElementById('congratulationsOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 5000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Initializing chapter');
    initializeChapter();
});

window.initializeChapter = initializeChapter;