const starImages = [
    'white-star.png',  // 0
    'one-star.png',    // 1
    'two-stars.png',   // 2
    'three-stars.png', // 3
    'four-stars.png',  // 4
    'five-stars.png',  // 5
    'six-stars.png'    // 6
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

function initializeStarMap() {
    const svgObject = document.getElementById("starMapSvg");
    if (!svgObject) {
        console.error("SVG object not found");
        return;
    }

    const doc = svgObject.contentDocument;
    if (!doc) {
        console.error("SVG content document not ready");
        return;
    }

    const studentsData = JSON.parse(localStorage.getItem("starAcademyStudents")) || { students: {}, currentStudent: "" };
    const currentStudent = studentsData.currentStudent;
    const progress = studentsData.students[currentStudent]?.progress || {};

    const starImages = [
        "white-star.png",
        "one-star.png",
        "two-stars.png",
        "three-stars.png",
        "four-stars.png",
        "five-stars.png",
        "six-stars.png"
    ];

    for (let chapter = 1; chapter <= 2; chapter++) {
        for (let part = 1; part <= 1; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                const exerciseKey = `exercise${chapter}:${part}:${exercise}`;
                const level = parseInt(progress[exerciseKey]) || 0;
                const starId = `star-${chapter}-${part}-${exercise}`;
                const starElement = doc.getElementById(starId);

                if (!starElement) {
                    console.warn(`Star not found: ${starId}`);
                    continue;
                }

                const newStarElement = starElement.cloneNode(true);
                newStarElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);
                newStarElement.style.opacity = "1";

                newStarElement.addEventListener("click", () => {
                    const studentsData = JSON.parse(localStorage.getItem("starAcademyStudents")) || { students: {}, currentStudent: "" };
                    const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
                    let level = parseInt(progress[exerciseKey]) || 0;
                    level = (level + 1) % 7;
                    progress[exerciseKey] = level.toString();
                    studentsData.students[studentsData.currentStudent].progress = progress;
                    localStorage.setItem("starAcademyStudents", JSON.stringify(studentsData));

                    newStarElement.style.opacity = "0";
                    setTimeout(() => {
                        newStarElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", starImages[level]);
                        newStarElement.style.opacity = "1";
                    }, 300);
                });

                starElement.parentNode.replaceChild(newStarElement, starElement);
            }
        }
    }
}


function createStarElement(doc, starId, level, x, y, width, height) {
    const starElement = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
    starElement.setAttribute('id', `star-${starId.replace(/:/g, '-')}`);
    starElement.setAttribute('x', x);
    starElement.setAttribute('y', y);
    starElement.setAttribute('width', width);
    starElement.setAttribute('height', height);
    starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);
    starElement.onerror = () => {
        console.error(`Failed to load image for star-${starId}: ${starImages[level]}`);
        starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[0]);
    };
    starElement.style.cursor = 'pointer';
    return starElement;
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
        image { pointer-events: all; transition: opacity 0.3s ease-in-out; }
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
        const currentLevel = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
        console.log(`Star-${star}: currentLevel=${currentLevel}, image=${starImages[currentLevel]}`);

        // Store original attributes to recreate the element
        const x = starElement.getAttribute('x');
        const y = starElement.getAttribute('y');
        const width = starElement.getAttribute('width');
        const height = starElement.getAttribute('height');

        // Remove the existing star element and create a new one
        const parent = starElement.parentNode;
        const newStarElement = createStarElement(doc, star, currentLevel, x, y, width, height);
        parent.replaceChild(newStarElement, starElement);

        lineElements.forEach(lineElement => {
            const currentStyle = lineElement.getAttribute('style') || '';
            const newStyle = currentStyle.replace(/stroke\s*:\s*[^;]+;?/, '').trim();
            lineElement.setAttribute('style', newStyle);
            lineElement.style.stroke = currentLevel === 6 ? '#FFD700' : '#FFFFFF';
            if (currentLevel === 6) {
                lineElement.setAttribute('filter', 'url(#golden-glow)');
            } else {
                lineElement.removeAttribute('filter');
            }
        });

        newStarElement.addEventListener('click', () => {
            console.log(`Star ${star} clicked`);
            const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
            const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
            let level = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;

            // Sync display with localStorage value before incrementing
            newStarElement.style.opacity = '0';
            setTimeout(() => {
                newStarElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);
                newStarElement.style.opacity = '1';
            }, 300);

            // Increment the level
            level = (level + 1) % 7;
            progress[exerciseKey] = level.toString();
            studentsData.students[studentsData.currentStudent].progress = progress;
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));

            // Update the star image after incrementing
            newStarElement.style.opacity = '0';
            setTimeout(() => {
                newStarElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);
                newStarElement.onerror = () => {
                    console.error(`Failed to load image for star-${star}: ${starImages[level]}`);
                    newStarElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[0]);
                };
                newStarElement.style.opacity = '1';
            }, 300);

            lineElements.forEach(lineElement => {
                if (level === 6) {
                    lineElement.setAttribute('filter', 'url(#golden-glow)');
                    lineElement.style.stroke = '#FFD700';
                } else {
                    lineElement.removeAttribute('filter');
                    lineElement.style.stroke = '#FFFFFF';
                }
            });

            checkCompletion(studentsData);
        });

        // Remove existing storage listeners to prevent duplicates
        window.removeEventListener('storage', window.storageListener);
        window.storageListener = (event) => {
            if (event.key === 'starAcademyStudents') {
                const updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                const updatedLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;

                // Remove and recreate the star element to force re-render
                const newStarElementUpdate = createStarElement(doc, star, updatedLevel, x, y, width, height);
                parent.replaceChild(newStarElementUpdate, newStarElement);

                lineElements.forEach(lineElement => {
                    if (updatedLevel === 6) {
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