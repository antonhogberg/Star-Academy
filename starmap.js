// Step 4: Updated starImages for normal and student modes (28 images)
const starImages = [
    // Gold 0: 0-6 silver stars
    ['gold0_silver0.png', 'gold0_silver1.png', 'gold0_silver2.png', 'gold0_silver3.png', 'gold0_silver4.png', 'gold0_silver5.png', 'gold0_silver6.png'],
    // Gold 1: 0-5 silver stars
    ['gold1_silver0.png', 'gold1_silver1.png', 'gold1_silver2.png', 'gold1_silver3.png', 'gold1_silver4.png', 'gold1_silver5.png'],
    // Gold 2: 0-4 silver stars
    ['gold2_silver0.png', 'gold2_silver1.png', 'gold2_silver2.png', 'gold2_silver3.png', 'gold2_silver4.png'],
    // Gold 3: 0-3 silver stars
    ['gold3_silver0.png', 'gold3_silver1.png', 'gold3_silver2.png', 'gold3_silver3.png'],
    // Gold 4: 0-2 silver stars
    ['gold4_silver0.png', 'gold4_silver1.png', 'gold4_silver2.png'],
    // Gold 5: 0-1 silver stars
    ['gold5_silver0.png', 'gold5_silver1.png'],
    // Gold 6: 0 silver stars
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

// Step 4: Preload images with Promise-based approach for performance
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
    // Log completion but don't block rendering
    Promise.all(preloadPromises).then(() => console.log('All images preloaded')).catch(err => console.error('Some images failed to preload', err));
}

function initializeStarMap() {
    console.log('initializeStarMap called');
    const svgElement = document.getElementById('starMap');
    if (!svgElement) {
        console.error('Star Map SVG element not found');
        return;
    }

    // Step 4: Start preloading images (async, non-blocking)
    preloadImages();

    // Since the SVG is inline, we can directly pass the document context
    initializeSvg(document);
}

// Step 4: Modified to accept gold and silver levels for image selection
function createStarElement(doc, starId, goldLevel, silverLevel, x, y, width, height, initialOpacity = 1) {
    const starElement = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
    starElement.setAttribute('id', `star-${starId.replace(/:/g, '-')}`);
    starElement.setAttribute('x', x);
    starElement.setAttribute('y', y);
    starElement.setAttribute('width', width);
    starElement.setAttribute('height', height);
    // Select image based on gold and silver levels
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

// Step 4: Click handler function to ensure reattachment
function handleStarClick(event, star, exerciseKey, lineElements, doc, parent, x, y, width, height) {
    const starElement = event.currentTarget;
    console.log(`Star ${star} clicked, studentMode=${studentsData.studentMode}`);
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
    const silverProgress = studentsData.students[studentsData.currentStudent]?.silverProgress || {};
    const studentMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
    let goldLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
    let silverLevel = silverProgress[exerciseKey] ? parseInt(silverProgress[exerciseKey]) : 0;

    // Calculate new levels
    let newGoldLevel = goldLevel;
    let newSilverLevel = silverLevel;
    let isException = false;
    if (studentMode && goldLevel === 6) {
        // Exception 1: Gold level 6 in student mode (fade-out/fade-in)
        console.log(`Student mode: Fade effect for goldLevel=6, no state change for ${exerciseKey}`);
        isException = true;
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

    if (isException) {
        // Fade-out/fade-in for exceptions
        starElement.style.opacity = '0';
        setTimeout(() => {
            starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[newGoldLevel][newSilverLevel]);
            starElement.onerror = () => {
                console.error(`Failed to load image for star-${star}: ${starImages[newGoldLevel][newSilverLevel]}`);
                starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[0][0]);
            };
            starElement.style.opacity = '1';
        }, 400); // Step 4: Update href after 400ms fade-out
    } else {
        // Fade-in overlay for general case
        const overlayStarElement = createStarElement(doc, `${star}-overlay`, newGoldLevel, newSilverLevel, x, y, width, height, 0);
        parent.appendChild(overlayStarElement);
        setTimeout(() => {
            overlayStarElement.style.opacity = '1';
        }, 10); // Small delay to ensure rendering
        setTimeout(() => {
            parent.removeChild(starElement);
            overlayStarElement.setAttribute('id', `star-${star.replace(/:/g, '-')}`);
            // Reattach click listener to new element
            overlayStarElement.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));
        }, 400); // Step 4: Remove old image and reattach listener after 400ms fade-in
    }

    // Update localStorage only if state changed
    if (!(studentMode && goldLevel === 6)) {
        localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
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
}

function initializeSvg(doc) {
    console.log('initializeSvg called');
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    if (!studentsData.currentStudent) {
        console.warn('No current student set; star map initialization aborted');
        return;
    }

    // Add styles directly to the SVG
    const styleElement = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.textContent = `
        image { pointer-events: all; transition: opacity 0.4s ease-in-out; } /* Step 4: 400ms fade */
        image.non-clickable { pointer-events: auto; } /* Step 4: Allow clicks for fade effect */
        path { transition: stroke 0.3s ease-in-out !important; }
    `;
    const starMapSvg = doc.getElementById('starMap');
    // Remove existing style elements to avoid duplicates
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

        // Store original attributes to recreate the element
        const x = starElement.getAttribute('x');
        const y = starElement.getAttribute('y');
        const width = starElement.getAttribute('width');
        const height = starElement.getAttribute('height');

        // Remove the existing star element and create a new one
        const parent = starElement.parentNode;
        const newStarElement = createStarElement(doc, star, goldLevel, silverLevel, x, y, width, height);
        // Step 4: Mark goldLevel 6 stars as non-clickable in student mode (for state changes)
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

        // Step 4: Attach click handler
        newStarElement.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));

        // Remove existing storage listeners to prevent duplicates
        window.removeEventListener('storage', window.storageListener);
        window.storageListener = (event) => {
            if (event.key === 'starAcademyStudents') {
                const updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                const updatedSilverProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.silverProgress || {};
                const updatedStudentMode = updatedStudentsData.students[updatedStudentsData.currentStudent]?.studentMode || false;
                const updatedGoldLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;
                const updatedSilverLevel = updatedSilverProgress[exerciseKey] ? parseInt(updatedSilverProgress[exerciseKey]) : 0;

                // Remove and recreate the star element to force re-render
                const newStarElementUpdate = createStarElement(doc, star, updatedGoldLevel, updatedSilverLevel, x, y, width, height);
                // Step 4: Mark goldLevel 6 stars as non-clickable in student mode
                if (updatedStudentMode && updatedGoldLevel === 6) {
                    newStarElementUpdate.classList.add('non-clickable');
                }
                parent.replaceChild(newStarElementUpdate, newStarElement);

                // Reattach click listener to updated element
                newStarElementUpdate.addEventListener('click', (e) => handleStarClick(e, star, exerciseKey, lineElements, doc, parent, x, y, width, height));

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

                // Update dropdown and userNameDisplay after storage change
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

// Expose initializeStarMap globally
window.initializeStarMap = initializeStarMap;