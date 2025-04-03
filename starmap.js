// starmap.js
const starImages = [
    'white-star.png',
    'one-star.png',
    'two-stars.png',
    'three-stars.png',
    'four-stars.png',
    'five-stars.png',
    'six-stars.png'
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

document.addEventListener('DOMContentLoaded', () => {
    const objectElement = document.getElementById('starMap');
    objectElement.addEventListener('load', () => {
        let svgDoc = objectElement.contentDocument;
        const checkSvgDoc = setInterval(() => {
            svgDoc = objectElement.contentDocument;
            if (svgDoc) {
                clearInterval(checkSvgDoc);
                initializeSvg(svgDoc);
            } else {
                console.error('SVG document not loaded yet');
            }
        }, 100);
    });

    setTimeout(() => {
        if (!objectElement.contentDocument) {
            console.error('SVG load event did not fire or SVG failed to load.');
        }
    }, 10000);
});

function initializeSvg(svgDoc) {
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const namePopup = document.getElementById('namePopup');
    if (!studentsData.currentStudent) {
        namePopup.style.display = 'flex';
        return;
    }

    const styleElement = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.textContent = `
        image { pointer-events: all; transition: opacity 0.3s ease-in-out; }
        path { transition: stroke 0.3s ease-in-out !important; }
    `;
    svgDoc.querySelector('svg').appendChild(styleElement);

    progressionPath.forEach(({ star, lines }) => {
        const starElement = svgDoc.getElementById(`star-${star.replace(/:/g, '-')}`);
        const lineElements = lines.map(line => svgDoc.getElementById(line)).filter(line => line);

        if (!starElement) {
            console.error(`Star-${star} not found in SVG`);
            return;
        }

        const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
        const exerciseKey = `exercise${star}`;
        let level = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
        starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);

        lineElements.forEach(lineElement => {
            const currentStyle = lineElement.getAttribute('style') || '';
            const newStyle = currentStyle.replace(/stroke\s*:\s*[^;]+;?/, '').trim();
            lineElement.setAttribute('style', newStyle);
            lineElement.style.stroke = level === 6 ? '#FFD700' : '#FFFFFF';
            if (level === 6) {
                lineElement.setAttribute('filter', 'url(#golden-glow)');
            } else {
                lineElement.removeAttribute('filter');
            }
        });

        starElement.style.cursor = 'pointer';
        starElement.addEventListener('click', () => {
            const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
            const progress = studentsData.students[studentsData.currentStudent]?.progress || {};
            let level = progress[exerciseKey] ? parseInt(progress[exerciseKey]) : 0;
            level = (level + 1) % 7;
            progress[exerciseKey] = level.toString();
            studentsData.students[studentsData.currentStudent].progress = progress;
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));

            starElement.style.opacity = '0';
            setTimeout(() => {
                starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);
                starElement.style.opacity = '1';
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

        window.addEventListener('storage', (event) => {
            if (event.key === 'starAcademyStudents') {
                const updatedStudentsData = JSON.parse(event.newValue) || { students: {}, currentStudent: '' };
                const updatedProgress = updatedStudentsData.students[updatedStudentsData.currentStudent]?.progress || {};
                const updatedLevel = updatedProgress[exerciseKey] ? parseInt(updatedProgress[exerciseKey]) : 0;
                if (updatedLevel !== level) {
                    level = updatedLevel;
                    starElement.style.opacity = '0';
                    setTimeout(() => {
                        starElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', starImages[level]);
                        starElement.style.opacity = '1';
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

                    checkCompletion(updatedStudentsData);
                }
            }
        });
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