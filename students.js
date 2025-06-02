window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
    students: {},
    currentStudent: localStorage.getItem('userName') || ''
};

function initializeSilverProgress() {
    const silverProgress = {};
    for (let chapter = 1; chapter <= 7; chapter++) {
        for (let part = 1; part <= 4; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                const key = `exercise${chapter}:${part}:${exercise}`;
                silverProgress[key] = "0";
            }
        }
    }
    return silverProgress;
}

if (window.studentsData.currentStudent && !window.studentsData.students[window.studentsData.currentStudent]) {
    window.studentsData.students[window.studentsData.currentStudent] = {
        name: window.studentsData.currentStudent,
        progress: {},
        rank: "Explorer",
        notes: "",
        studentMode: false,
        silverProgress: initializeSilverProgress()
    };
    for (let chapter = 1; chapter <= 7; chapter++) {
        for (let part = 1; part <= 4; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                const key = `exercise${chapter}:${part}:${exercise}`;
                window.studentsData.students[window.studentsData.currentStudent].progress[key] = 
                    localStorage.getItem(key) || "0";
                localStorage.removeItem(key);
            }
        }
    }
    localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
}

function addStudent(e) {
    if (e) e.preventDefault();
    console.log('addStudent called');
    const nameInput = document.getElementById('newStudentName');
    if (!nameInput) {
        console.error('newStudentName input not found');
        return;
    }
    const name = nameInput.value.trim();
    console.log('Name input value:', name);
    const lang = localStorage.getItem('language') || 'sv';

    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };

    if (!name) {
        console.log('No name entered');
        showStudentPopup(translations[lang].addStudentNoName, 3000);
        return;
    }

    if (window.studentsData.students[name]) {
        console.log('Duplicate name:', name);
        showStudentPopup(translations[lang].addStudentDuplicate, 3000);
        return;
    }

    window.studentsData.students[name] = {
        name: name,
        progress: {},
        rank: "Explorer",
        notes: "",
        studentMode: false,
        silverProgress: initializeSilverProgress()
    };

    for (let chapter = 1; chapter <= 7; chapter++) {
        for (let part = 1; part <= 4; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                const key = `exercise${chapter}:${part}:${exercise}`;
                window.studentsData.students[name].progress[key] = "0";
            }
        }
    }

    window.studentsData.currentStudent = name;
    try {
        localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
        console.log('New student added:', name, 'currentStudent:', window.studentsData.currentStudent);
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        showStudentPopup('Failed to save student data', 3000);
        return;
    }

    updateDropdown();
    nameInput.value = '';

    const starSVG = '<svg class="popup-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    showStudentPopup(`${starSVG} ${translations[lang].addStudentSuccess} ${starSVG}`, 3000);

    if (typeof loadNotes === 'function') {
        console.log('Calling loadNotes');
        loadNotes(false);
    } else {
        console.log('loadNotes function not found');
    }
}

function showStudentPopup(message, duration) {
    console.log('showStudentPopup called:', message);
    const popup = document.getElementById('studentPopup');
    const popupMessage = document.getElementById('studentPopupMessage');
    const nameInput = document.getElementById('newStudentName');

    if (!popup || !popupMessage) {
        console.error('Student popup elements not found:', { popup: !!popup, popupMessage: !!popupMessage });
        alert(message);
        return;
    }

    if (nameInput) nameInput.blur();
    popupMessage.innerHTML = message;
    popup.style.display = 'flex';
    popup.style.opacity = '1';

    setTimeout(() => {
        popup.style.transition = 'opacity 1s ease';
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
            popup.style.opacity = '1';
            popup.style.transition = '';
        }, 1000);
    }, duration - 1000);
}

function switchStudent(selectedValue) {
    console.log('switchStudent called with value:', selectedValue);
    if (!selectedValue) {
        console.error('No selected value provided');
        return;
    }

    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };
    window.studentsData.currentStudent = selectedValue;
    try {
        localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
        console.log('Current student updated:', selectedValue);
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        const lang = localStorage.getItem('language') || 'sv';
        showStudentPopup(translations[lang].addStudentNoName, 3000);
        return;
    }

    updateDropdown();

    if (typeof window.updateStarStates === 'function') {
        window.updateStarStates();
    }
    if (typeof loadNotes === 'function') {
        loadNotes(false);
    }
    if (window.location.pathname.toLowerCase().includes('chapter') && typeof window.initializeChapter === 'function') {
        console.log('Re-initializing Chapter after student change');
        window.initializeChapter();
    }

    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) {
        userNameDisplay.textContent = selectedValue || '';
    }
}

function updateDropdown() {
    console.log('updateDropdown called');
    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };
    console.log('window.studentsData:', window.studentsData);

    const selects = [
        document.getElementById('studentSelect'),
        document.getElementById('globalStudentSelect'),
        document.getElementById('removeStudentSelect')
    ].filter(Boolean);
    if (selects.length === 0) {
        console.warn('No student select elements found');
        return;
    }

    selects.forEach(select => {
        select.innerHTML = '';
        const studentNames = Object.keys(window.studentsData.students || {}).sort((a, b) => a.localeCompare(b));
        console.log('Student names for dropdown:', studentNames);
        studentNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        if (studentNames.length > 0) {
            const currentStudent = window.studentsData.currentStudent && studentNames.includes(window.studentsData.currentStudent)
                ? window.studentsData.currentStudent
                : studentNames[0];
            select.value = currentStudent;
            console.log('Dropdown updated, currentStudent:', currentStudent);
        } else {
            console.log('No students available, dropdown cleared');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded in students.js');
    updateDropdown();
    const lang = localStorage.getItem('language') || 'sv';
    const studentTitle = document.getElementById('chapterTitle');
    if (studentTitle) {
        studentTitle.textContent = lang === 'en' ? 'Manage Students' : 'Hantera elever';
    }

    const addButton = document.getElementById('addStudentButton');
    if (addButton) {
        console.log('Binding addStudent to addStudentButton');
        addButton.addEventListener('click', (e) => addStudent(e));
    } else {
        console.error('addStudentButton not found');
    }

    const nameInput = document.getElementById('newStudentName');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('Enter key pressed on newStudentName');
                addStudent(e);
            }
        });
    } else {
        console.error('newStudentName input not found');
    }
});