const starImages = [
    ['gold0_silver0.png', 'gold0_silver1.png', 'gold0_silver2.png', 'gold0_silver3.png', 'gold0_silver4.png', 'gold0_silver5.png', 'gold0_silver6.png'],
    ['gold1_silver0.png', 'gold1_silver1.png', 'gold1_silver2.png', 'gold1_silver3.png', 'gold1_silver4.png', 'gold1_silver5.png'],
    ['gold2_silver0.png', 'gold2_silver1.png', 'gold2_silver2.png', 'gold2_silver3.png', 'gold2_silver4.png'],
    ['gold3_silver0.png', 'gold3_silver1.png', 'gold3_silver2.png', 'gold3_silver3.png'],
    ['gold4_silver0.png', 'gold4_silver1.png', 'gold4_silver2.png'],
    ['gold5_silver0.png', 'gold5_silver1.png'],
    ['gold6_silver0.png']
];

const progressionPath = [
    { star: '1:1:1', nextStar: '2:1:1', lines: ['line1'] },
    { star: '2:1:1', nextStar: '3:1:1', lines: ['line2'] },
    { star: '3:1:1', nextStar: '7:1:1', lines: ['line3'] },
    { star: '7:1:1', nextStar: '1:2:1', lines: ['line4', 'line4-2'] },
    { star: '1:2:1', nextStar: '1:1:2', lines: ['line4-3'] },
    { star: '1:1:2', nextStar: '5:1:1', lines: ['line5'] },
    { star: '5:1:1', nextStar: '2:1:2', lines: ['line6'] },
    { star: '2:1:2', nextStar: '3:1:2', lines: ['line7'] },
    { star: '3:1:2', nextStar: '6:1:1', lines: ['line8'] },
    { star: '6:1:1', nextStar: '2:1:3', lines: ['line9'] },
    { star: '2:1:3', nextStar: '7:1:2', lines: ['line10'] },
    { star: '7:1:2', nextStar: '1:1:3', lines: ['line11'] },
    { star: '1:1:3', nextStar: '5:1:2', lines: ['line12'] },
    { star: '5:1:2', nextStar: '6:1:2', lines: ['line13'] },
    { star: '6:1:2', nextStar: '1:4:1', lines: ['line14', 'line14-2'] },
    { star: '1:4:1', nextStar: '1:1:4', lines: ['line14-3'] },
    { star: '1:1:4', nextStar: '3:1:3', lines: ['line15'] },
    { star: '3:1:3', nextStar: '3:1:4', lines: ['line16'] },
    { star: '3:1:4', nextStar: '7:1:3', lines: ['line17'] },
    { star: '7:1:3', nextStar: '5:1:3', lines: ['line18'] },
    { star: '5:1:3', nextStar: '6:1:3', lines: ['line19'] },
    { star: '6:1:3', nextStar: '4:1:1', lines: ['line20'] },
    { star: '4:1:1', nextStar: '7:1:4', lines: ['line21'] },
    { star: '7:1:4', nextStar: '4:1:2', lines: ['line22'] },
    { star: '4:1:2', nextStar: '5:1:4', lines: ['line23'] },
    { star: '5:1:4', nextStar: '4:1:3', lines: ['line24'] },
    { star: '4:1:3', nextStar: '6:1:4', lines: ['line25'] },
    { star: '6:1:4', nextStar: '4:1:4', lines: ['line26'] },
    { star: '4:1:4', nextStar: '2:1:4', lines: ['line27'] },
    { star: '2:1:4', nextStar: null, lines: [] }
];

function preloadImages() {
    console.log('Preloading star images');
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

function initializeStarMap() {
    console.log('initializeStarMap called');
    const svgElement = document.getElementById('starMap');
    if (!svgElement) {
        console.error('Star Map SVG element not found');
        return;
    }

    preloadImages();
    initializeSvg(document);
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
    starElement.style.cursor = 'pointer';
    starElement.style.opacity = initialOpacity;
    return starElement;
}

// Helper function to update practiceLog on star clicks (same as in chapter.js)
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

function handleStarClick(event, star, exerciseKey, lineElements, doc, parent, x, y, width, height) {
    const starElement = event.currentTarget;
    let studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const currentStudent = studentsData.currentStudent;
    if (!currentStudent || !studentsData.students[currentStudent]) {
        console.warn(`No current student set or student data missing, ignoring click for ${exerciseKey}`);
        return;
    }
    const progress = studentsData.students[currentStudent]?.progress || {};
    const silverProgress = studentsData.students[currentStudent]?.silverProgress || {};
    const studentMode = studentsData.students[currentStudent]?.studentMode || false;
    console.log(`Star ${star} clicked, studentMode=${studentMode}, currentStudent=${currentStudent}`);

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
        studentsData.students[currentStudent].silverProgress = silverProgress;
        console.log(`Student mode: Updated silverLevel=${newSilverLevel} for ${exerciseKey}`);
    } else {
        newGoldLevel = (goldLevel + 1) % 7;
        newSilverLevel = 0;
        if (goldLevel === 6 && newGoldLevel === 0) {
            isException = true;
        }
        progress[exerciseKey] = newGoldLevel.toString();
        silverProgress[exerciseKey] = '0';
        studentsData.students[currentStudent].progress = progress;
        studentsData.students[currentStudent].silverProgress = silverProgress;
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
        starElement.removeEventListener('click', starElement.clickHandler);
        setTimeout(() => {
            overlayStarElement.style.opacity = '1';
            setTimeout(() => {
                parent.removeChild(starElement);
                overlayStarElement.setAttribute('id', `star-${star.replace(/:/g, '-')}`);
                overlayStarElement.style.transition = '';
                const clickHandler = (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height);
                overlayStarElement.removeEventListener('click', overlayStarElement.clickHandler);
                overlayStarElement.addEventListener('click', clickHandler);
                overlayStarElement.clickHandler = clickHandler;
                console.log(`Reattached click handler for star-${star}`);
            }, 400);
        }, 10);
    }

    if (!(studentMode && goldLevel === 6)) {
        try {
            studentsData = updatePracticeLog(studentsData, currentStudent);
            console.log(`Before saving to localStorage: ${JSON.stringify(studentsData.students[currentStudent])}`);
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
            console.log(`Successfully saved starAcademyStudents after star click for ${exerciseKey}`);
            const savedData = JSON.parse(localStorage.getItem('starAcademyStudents'));
            console.log(`After saving, localStorage contains: ${JSON.stringify(savedData.students[currentStudent])}`);
        } catch (e) {
            console.error(`Failed to save starAcademyStudents in starmap.js: ${e.message}`);
            console.error(`Error stack: ${e.stack}`);
            console.error(`Attempted to save: ${JSON.stringify(studentsData)}`);
            return;
        }
    }

    lineElements.forEach(lineElement => {
        if (newGoldLevel === 6) {
            lineElement.setAttribute('filter', 'url(#golden-glow)');
            lineElement.style.stroke = '#FFD700';
        } else {
            lineElement.removeAttribute('filter');
            lineElement.style.stroke = '#FFFFFF';
        }
    });

    checkCompletion(studentsData);
    if (typeof window.updateStarStates === 'function') {
        console.log(`Calling updateStarStates for star ${star} with fromStarClick`);
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

function initializeSvg(doc) {
    console.log('initializeSvg called');
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    if (!studentsData.currentStudent) {
        console.warn('No current student set; star map initialization aborted');
        return;
    }

    const styleElement = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.textContent = `
        image { 
            pointer-events: all; 
            transition: opacity 0.4s ease-in-out; 
            -webkit-tap-highlight-color: transparent; 
            -webkit-user-select: none; 
            user-select: none; 
            touch-action: manipulation; 
            outline: none; 
        }
        image.non-clickable { 
            pointer-events: auto; 
        }
        path { 
            transition: stroke 0.3s ease-in-out !important; 
        }
    `;
    const starMapSvg = doc.getElementById('starMap');
    const existingStyles = starMapSvg.querySelectorAll('style');
    existingStyles.forEach(style => style.remove());
    starMapSvg.appendChild(styleElement);

    progressionPath.forEach(({ star, lines }) => {
        const starElement = doc.getElementById(`star-${star.replace(/:/g, '-')}`);
        const lineElements = lines.map(line => doc.getElementById(line)).filter(line => line);

        if (!starElement) {
            console.error(`Star-${star} not found in SVG`);
            return;
        }

        const exerciseKey = `exercise${star}`;
        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
        const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
        const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
        const goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
        const silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey]) : 0;
        console.log(`Star-${star}: goldLevel=${goldLevel}, silverLevel=${silverLevel}, studentMode=${studentMode}, image=${starImages[goldLevel][silverLevel]}`);

        const x = starElement.getAttribute('x');
        const y = starElement.getAttribute('y');
        const width = starElement.getAttribute('width');
        const height = starElement.getAttribute('height');

        const parent = starElement.parentNode;
        const newStarElement = createStarElement(doc, star, goldLevel, silverLevel, x, y, width, height);
        if (studentMode && goldLevel === 6) {
            newStarElement.classList.add('non-clickable');
        }
        parent.replaceChild(newStarElement, starElement);

        lineElements.forEach(lineElement => {
            const currentStyle = lineElement.getAttribute('style') || '';
            const newStyle = currentStyle.replace(/stroke\s*:\s*[^;]+;?/, '').trim();
            lineElement.setAttribute('style', newStyle);
            lineElement.style.stroke = goldLevel === 6 ? '#FFD700' : '#FFFFFF';
            if (goldLevel === 6) {
                lineElement.setAttribute('filter', 'url(#golden-glow)');
            } else {
                lineElement.removeAttribute('filter');
            }
        });

        newStarElement.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));
        console.log(`Attached click handler for star-${star} during initialization`);

        window.removeEventListener('storage', window.storageListener);
        window.storageListener = (event) => {
            if (event.key === 'starAcademyStudents') {
                const updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                const updatedSilverProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.silverProgress || {};
                const updatedStudentMode = updatedStudentsData.students[updatedStudentsData.currentStudent]?.studentMode || false;
                const updatedGoldLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;
                const updatedSilverLevel = updatedSilverProgress[exerciseKey] ? parseInt(updatedSilverProgress[exerciseKey]) : 0;

                const newStarElementUpdate = createStarElement(doc, star, updatedGoldLevel, updatedSilverLevel, x, y, width, height);
                if (updatedStudentMode && updatedGoldLevel === 6) {
                    newStarElementUpdate.classList.add('non-clickable');
                }
                parent.replaceChild(newStarElementUpdate, newStarElement);

                newStarElementUpdate.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));
                console.log(`Reattached click handler for star-${star} in storage listener`);

                lineElements.forEach(lineElement => {
                    if (updatedGoldLevel === 6) {
                        lineElement.setAttribute('filter', 'url(#golden-glow)');
                        lineElement.style.stroke = '#FFD700';
                    } else {
                        lineElement.removeAttribute('filter');
                        lineElement.style.stroke = '#FFFFFF';
                    }
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
                if (typeof window.updateStreakDisplay === 'function') {
                    console.log('Storage event: Updating streak display');
                    window.updateStreakDisplay();
                }
            }
        };
        window.addEventListener('storage', window.storageListener);
    });

    checkCompletion(studentsData);
}

function checkCompletion(studentsData) {
    const allStarsAtSix = progressionPath.every(({ star }) => {
        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
        const exerciseKey = `exercise${star}`;
        return (progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0) === 6;
    });
    if (allStarsAtSix) {
        const overlay = document.getElementById('congratulationsOverlay');
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 5000);
    }
}

window.initializeStarMap = initializeStarMap;