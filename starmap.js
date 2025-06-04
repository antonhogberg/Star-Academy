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

function updateLineStyle(lineElement, isGold, star) {
    if (!lineElement) {
        console.error(`Line element not found for star ${star}`);
        return;
    }
    const currentStyle = lineElement.getAttribute('style') || '';
    const newStyle = currentStyle.replace(/stroke\s*:\s*[^;]+;?/, '').replace(/opacity\s*:\s*[^;]+;?/, '').trim();
    lineElement.setAttribute('style', newStyle);

    if (isGold) {
        if (lineElement.dataset.transitioning !== 'true') {
            lineElement.dataset.transitioning = 'true';
            lineElement.style.opacity = '0';
            lineElement.setAttribute('filter', 'url(#golden-glow)');
            lineElement.style.stroke = '#FFD700';
            setTimeout(() => {
                lineElement.style.opacity = '1';
                lineElement.dataset.transitioning = 'false';
                console.log(`Line fade-in completed for star ${star}`);
            }, 10);
        }
    } else {
        lineElement.style.opacity = '1';
        lineElement.removeAttribute('filter');
        lineElement.style.stroke = '#FFFFFF';
        lineElement.dataset.transitioning = 'false';
    }
}

function handleStarClick(event, star, exerciseKey, lineElements, doc, parent, x, y, width, height) {
    const starElement = event.currentTarget;
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    if (!studentsData.currentStudent) {
        console.warn('No current student, aborting star click');
        return;
    }
    const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
    const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
    const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
    console.log(`Star ${star} clicked, studentMode=${studentMode}`);

    let goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey], 10) : 0;
    let silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey], 10) : 0;

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
        starElement.style.opacity = '0';
        setTimeout(() => {
            starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[newGoldLevel][newSilverLevel]);
            starElement.onerror = () => {
                console.error(`Failed to load image for star-${star}: ${starImages[newGoldLevel][newSilverLevel]}`);
                starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[0][0]);
            };
            starElement.style.opacity = '1';
        }, 400);
    } else {
        const overlayStarElement = createStarElement(doc, `${star}-overlay`, newGoldLevel, newSilverLevel, x, y, width, height, 0);
        parent.appendChild(overlayStarElement);
        setTimeout(() => {
            overlayStarElement.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            parent.removeChild(starElement);
            overlayStarElement.setAttribute('id', `star-${star.replace(/:/g, '-')}`);
            overlayStarElement.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));
            console.log(`Reattached click handler for star-${star}`);
        }, 400);
    }

    if (!(studentMode && goldLevel === 6)) {
        try {
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    const prevStar = progressionPath.find(path => path.nextStar === star)?.star;
    const prevExerciseKey = prevStar ? `exercise${prevStar}` : null;
    const prevGoldLevel = prevExerciseKey && progress[prevExerciseKey] ? parseInt(progress[prevExerciseKey], 10) : 0;
    console.log(`Star ${star}: prevStar=${prevStar}, prevGoldLevel=${prevGoldLevel}`);

    lineElements.forEach(lineElement => updateLineStyle(lineElement, prevGoldLevel === 6, star));

    checkCompletion(studentsData);
    if (typeof window.updateStarStates === 'function') {
        console.log(`Calling updateStarStates for star ${star} with fromStarClick`);
        window.updateStarStates(studentsData, true);
    } else {
        console.error('updateStarStates not defined');
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
        image { pointer-events: all; transition: opacity 0.4s ease-in-out; }
        image.non-clickable { pointer-events: auto; }
        path { transition: stroke 0.3s ease-in-out, opacity 0.4s ease-in-out !important; }
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
        const goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey], 10) : 0;
        const silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey], 10) : 0;
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

        const prevStar = progressionPath.find(path => path.nextStar === star)?.star;
        const prevExerciseKey = prevStar ? `exercise${prevStar}` : null;
        const prevGoldLevel = prevExerciseKey && progress[prevExerciseKey] ? parseInt(progress[prevExerciseKey], 10) : 0;
        console.log(`Star ${star}: prevStar=${prevStar}, prevGoldLevel=${prevGoldLevel}`);

        lineElements.forEach(lineElement => updateLineStyle(lineElement, prevGoldLevel === 6, star));

        newStarElement.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));
        console.log(`Attached click handler for star-${star} during initialization`);

        window.removeEventListener('storage', window.storageListener);
        window.storageListener = (event) => {
            if (event.key === 'starAcademyStudents') {
                const updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                if (!updatedStudentsData.currentStudent) {
                    console.warn('No current student in storage update, skipping');
                    return;
                }
                const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                const updatedSilverProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.silverProgress || {};
                const updatedStudentMode = updatedStudentsData.students[updatedStudentsData.currentStudent]?.studentMode || false;
                const updatedGoldLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey], 10) : 0;
                const updatedSilverLevel = updatedSilverProgress[exerciseKey] ? parseInt(updatedSilverProgress[exerciseKey], 10) : 0;

                const newStarElementUpdate = createStarElement(doc, star, updatedGoldLevel, updatedSilverLevel, x, y, width, height);
                if (updatedStudentMode && updatedGoldLevel === 6) {
                    newStarElementUpdate.classList.add('non-clickable');
                }
                parent.replaceChild(newStarElementUpdate, newStarElement);

                newStarElementUpdate.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));
                console.log(`Reattached click handler for star-${star} in storage listener`);

                const updatedPrevGoldLevel = prevExerciseKey && updatedProgress[prevExerciseKey] ? parseInt(updatedProgress[prevExerciseKey], 10) : 0;
                lineElements.forEach(lineElement => updateLineStyle(lineElement, updatedPrevGoldLevel === 6, star));

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
    });

    checkCompletion(studentsData);
}

function checkCompletion(studentsData) {
    const allStarsAtSix = progressionPath.every(({ star }) => {
        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
        const exerciseKey = `exercise${star}`;
        return (progress[exerciseKey] ? parseInt(progress[exerciseKey], 10) : 0) === 6;
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

window.initializeStarMap = initializeStarMap;