const starImages = [
    ['gold0_silver0.png', 'gold0_silver1.png', 'gold0_silver2.png', 'gold0_silver3.png', 'gold0_silver4.png', 'gold0_silver5.png', 'gold0_silver6.png'],
    ['gold1_silver0.png', 'gold1_silver1.png', 'gold1_silver2.png', 'gold1_silver3.png', 'gold1_silver4.png', 'gold1_silver5.png'],
    ['gold2_silver0.png', 'gold2_silver1.png', 'gold2_silver2.png', 'gold2_silver3.png', 'gold2_silver4.png'],
    ['gold3_silver0.png', 'gold3_silver1.png', 'gold3_silver2.png', 'gold3_silver3.png'],
    ['gold4_silver0.png', 'gold4_silver1.png', 'gold4_silver2.png'],
    ['gold5_silver0.png', 'gold5_silver1.png'],
    ['gold6_silver0.png']
];

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

function createStarElement(doc, starId, goldLevel, silverLevel, x, y, width, height, initialOpacity = 1) {
    const starElement = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
    starElement.setAttribute('id', `star-${starId.replace(/:/g, '-')}`);
    starElement.setAttribute('x', x);
    starElement.setAttribute('y', y);
    starElement.setAttribute('width', width);
    starElement.setAttribute('height', height);
    const image = starImages[goldLevel][silverLevel] || starImages[0][0];
    starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', image);
    starElement.onerror = () => {
        console.error(`Failed to load image for star-${starId}: ${image}`);
        starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[0][0]);
    };
    starElement.classList.add('star-chapter');
    starElement.style.opacity = initialOpacity;
    return starElement;
}

function updatePracticeLog(studentsData, currentStudent) {
    if (!studentsData.students[currentStudent]) {
        console.warn(`Student ${currentStudent} not found in studentsData`);
        return studentsData;
    }

    if (!studentsData.students[currentStudent].practiceLog) {
        studentsData.students[currentStudent].practiceLog = {
            dates: [],
            streak: 0,
            totalGoldStars: 0
        };
    }

    const practiceLog = studentsData.students[currentStudent].practiceLog;
    const today = new Date().toISOString().split('T')[0];
    
    // Always recalculate totalGoldStars to ensure it reflects the latest progress
    const progress = studentsData.students[currentStudent].progress || {};
    const totalGoldStars = Object.values(progress).reduce((sum, stars) => sum + (parseInt(stars) || 0), 0);
    practiceLog.totalGoldStars = totalGoldStars;
    console.log(`Recalculated totalGoldStars: ${totalGoldStars}`);

    if (!practiceLog.dates.includes(today)) {
        practiceLog.dates.push(today);
        
        practiceLog.dates.sort();
        let streak = 0;
        let currentDate = new Date(today);
        for (let i = practiceLog.dates.length - 1; i >= 0; i--) {
            const logDate = new Date(practiceLog.dates[i]);
            const diffDays = Math.round((currentDate - logDate) / (1000 * 60 * 60 * 24));
            console.log(`Comparing dates: ${currentDate.toISOString().split('T')[0]} - ${logDate.toISOString().split('T')[0]} = ${diffDays} days`);
            if (diffDays === 0) {
                streak++;
                currentDate = logDate;
            } else if (diffDays === 1) {
                streak++;
                currentDate = logDate;
            } else {
                break;
            }
        }
        practiceLog.streak = streak;
        console.log(`Updated streak to ${streak}`);
    } else {
        console.log(`Today (${today}) already in practiceLog.dates, streak unchanged: ${practiceLog.streak}`);
    }

    return studentsData;
}

function handleStarClick(event, star, exerciseKey, doc, parent, x, y, width, height) {
    const starElement = event.currentTarget;
    let studentsData;
    try {
        studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    } catch (e) {
        console.error(`Failed to parse starAcademyStudents in click handler: ${e}`);
        return;
    }
    if (!studentsData.currentStudent) {
        console.warn(`No current student set, ignoring click for ${exerciseKey}`);
        return;
    }
    const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
    const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
    const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
    console.log(`Star ${star} clicked, studentMode=${studentMode}`);

    let goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
    let silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey]) : 0;

    let newGoldLevel = goldLevel;
    let newSilverLevel = silverLevel;
    let isException = false;
    if (studentMode && goldLevel === 6) {
        console.log(`Student mode: Fade effect for goldLevel=6, no state change for ${exerciseKey}`);
        isException = true;
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
        starElement.style.transition = 'opacity 0.4s ease-in-out';
        starElement.style.opacity = '0';
        setTimeout(() => {
            starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[newGoldLevel][newSilverLevel]);
            starElement.onerror = () => {
                console.error(`Failed to load image for star-${star}: ${starImages[newGoldLevel][newSilverLevel]}`);
                starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[0][0]);
            };
            starElement.style.opacity = '1';
            starElement.style.transition = '';
        }, 400);
    } else {
        const overlayStarElement = createStarElement(doc, `${star}-overlay`, newGoldLevel, newSilverLevel, x, y, width, height, 0);
        overlayStarElement.style.transition = 'opacity 0.4s ease-in-out';
        parent.appendChild(overlayStarElement);
        setTimeout(() => {
            overlayStarElement.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            parent.removeChild(starElement);
            overlayStarElement.setAttribute('id', `star-${star.replace(/:/g, '-')}`);
            overlayStarElement.style.transition = '';
            overlayStarElement.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, doc, parent, x, y, width, height));
            console.log(`Reattached click handler for star-${star}`);
        }, 400);
    }

    if (!(studentMode && goldLevel === 6)) {
        try {
            studentsData = updatePracticeLog(studentsData, studentsData.currentStudent);
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
            console.log(`Successfully saved starAcademyStudents after star click for ${exerciseKey}`);
        } catch (e) {
            console.error(`Failed to save starAcademyStudents: ${e}`);
        }
    }

    if (typeof window.updateStarStates === 'function') {
        console.log(`Star clicked, calling updateStarStates for exercise ${exerciseKey}`);
        window.updateStarStates(studentsData, true);
    } else {
        console.error('updateStarStates not defined');
    }

    if (typeof window.updateStreakDisplay === 'function') {
        console.log('Calling updateStreakDisplay after star click');
        setTimeout(() => {
            window.updateStreakDisplay();
        }, 50); // Delay to ensure localStorage is updated
    } else {
        console.error('updateStreakDisplay not defined');
    }
}

function initializeChapter() {
    console.log('initializeChapter called');
    const chapterContainer = document.querySelector('.chapter-container');
    if (!chapterContainer) {
        console.error('Chapter container not found');
        return;
    }

    // Robust chapter number extraction
    let chapterNum = 1;
    const pathMatch = document.location.pathname.match(/chapter(\d+)/i); // Case-insensitive
    if (pathMatch) {
        chapterNum = parseInt(pathMatch[1]);
    } else {
        // Fallback to filename
        const filename = document.location.pathname.split('/').pop().toLowerCase();
        const fileMatch = filename.match(/chapter(\d+)/);
        if (fileMatch) {
            chapterNum = parseInt(fileMatch[1]);
        }
    }
    console.log(`Detected chapter number: ${chapterNum}`);

    const exercisesPerPart = 4;
    const parts = 4;

    preloadImages();

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        image.star-chapter { pointer-events: all; transition: opacity 0.4s ease-in-out; }
        image.non-clickable { pointer-events: auto; }
    `;
    const existingStyles = document.head.querySelectorAll('style[data-chapter-styles]');
    existingStyles.forEach(style => style.remove());
    styleElement.setAttribute('data-chapter-styles', 'true');
    document.head.appendChild(styleElement);

    const svg4x4 = document.getElementById('stars-4x4')?.querySelector('svg');
    const svg2x2x4 = document.getElementById('stars-2x2x4')?.querySelector('svg');
    if (!svg4x4 || !svg2x2x4) {
        console.error('SVG elements not found:', { svg4x4: !!svg4x4, svg2x2x4: !!svg2x2x4 });
        return;
    }

    // Force SVG reflow for Safari
    const starsSvg = document.getElementById('stars-4x4');
    if (starsSvg) {
        starsSvg.style.display = 'none';
        starsSvg.offsetHeight; // Trigger reflow
        starsSvg.style.display = 'block';
        console.log('Forced SVG reflow for #stars-4x4');
    }

    for (let part = 1; part <= parts; part++) {
        for (let exercise = 1; exercise <= exercisesPerPart; exercise++) {
            const exerciseCode = `${chapterNum}:${part}:${exercise}`;
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

            [svg4x4, svg2x2x4].forEach((svg, index) => {
                const starId = `${chapterNum}:${part}:${exercise}`;
                const starElement = svg.querySelector(`#star-${starId.replace(/:/g, '-')}`) || svg.querySelector(`#star-1-${part}-${exercise}`);
                const codeElement = svg.querySelector(`#code-${starId.replace(/:/g, '-')}`)?.querySelector('tspan') || svg.querySelector(`#code-1-${part}-${exercise} tspan`);
                if (!starElement || !codeElement) {
                    console.warn(`Star or code element not found in SVG ${index === 0 ? '4x4' : '2x2x4'} for ${starId}`);
                    return;
                }

                codeElement.textContent = exerciseCode;

                const x = starElement.getAttribute('x');
                const y = starElement.getAttribute('y');
                const width = starElement.getAttribute('width');
                const height = starElement.getAttribute('height');

                const parent = starElement.parentNode;
                const newStarElement = createStarElement(document, starId, goldLevel, silverLevel, x, y, width, height);
                if (studentMode && goldLevel === 6) {
                    newStarElement.classList.add('non-clickable');
                }
                parent.replaceChild(newStarElement, starElement);

                newStarElement.addEventListener('click', (e) => handleStarClick(e, exerciseCode, exerciseKey, document, parent, x, y, width, height));
                console.log(`Attached click handler for star-${starId} in SVG ${index === 0 ? '4x4' : '2x2x4'}`);

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
                            const newStarElementUpdate = createStarElement(document, starId, updatedGoldLevel, updatedSilverLevel, x, y, width, height);
                            if (updatedStudentMode && updatedGoldLevel === 6) {
                                newStarElementUpdate.classList.add('non-clickable');
                            }
                            parent.replaceChild(newStarElementUpdate, newStarElement);
                            newStarElementUpdate.addEventListener('click', (e) => handleStarClick(e, exerciseCode, exerciseKey, document, parent, x, y, width, height));
                            console.log(`Star ${starId} updated via storage event, goldLevel: ${updatedGoldLevel}, silverLevel: ${updatedSilverLevel}`);
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
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Initializing chapter');
    initializeChapter();
});

window.initializeChapter = initializeChapter;