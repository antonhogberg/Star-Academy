// Load student data from localStorage
window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
    students: {},
    currentStudent: localStorage.getItem('userName') || ''
};

// Initialize the first student if they exist in userName but not in studentsData
if (window.studentsData.currentStudent && !window.studentsData.students[window.studentsData.currentStudent]) {
    window.studentsData.students[window.studentsData.currentStudent] = {
        name: window.studentsData.currentStudent,
        progress: {},
        rank: "Explorer",
        notes: ""
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
    if (e) e.preventDefault(); // Prevent form-like submission
    console.log('addStudent called');
    const nameInput = document.getElementById('newStudentName');
    if (!nameInput) {
        console.error('newStudentName input not found');
        return;
    }
    const name = nameInput.value.trim();
    console.log('Name input value:', name); // Debug input value
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
        notes: ""
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
        alert(message); // Fallback
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

function switchStudent() {
    console.log('switchStudent called');
    const select = document.getElementById('globalStudentSelect') || document.getElementById('studentSelect');
    if (!select) {
        console.error('No student select element found');
        return;
    }
    const selectedValue = select.value;
    if (selectedValue) {
        // Reload window.studentsData to ensure it has the latest updates
        window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
            students: {},
            currentStudent: ''
        };
        window.studentsData.currentStudent = selectedValue;
        try {
            localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
            console.log('Current student updated:', selectedValue);
            if (typeof window.updateStarStates === 'function') {
                window.updateStarStates();
            }
            if (typeof loadNotes === 'function') {
                loadNotes(false);
            }
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            showStudentPopup(translations[localStorage.getItem('language') || 'sv'].addStudentNoName, 3000);
        }
    }
}

function updateDropdown() {
    console.log('updateDropdown called');
    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };
    console.log('window.studentsData:', window.studentsData);

    const selects = [document.getElementById('studentSelect'), document.getElementById('globalStudentSelect')].filter(Boolean);
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
            if (name === window.studentsData.currentStudent) {
                option.selected = true; // Explicitly set the selected attribute
            }
            select.appendChild(option);
        });

        // Ensure the dropdown value matches the currentStudent
        if (studentNames.length > 0) {
            const currentStudent = window.studentsData.currentStudent && studentNames.includes(window.studentsData.currentStudent)
                ? window.studentsData.currentStudent
                : studentNames[0];
            select.value = currentStudent;
            console.log('Dropdown value set to:', select.value);
            window.studentsData.currentStudent = currentStudent;
            try {
                localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
                console.log('Dropdown updated, currentStudent:', currentStudent);
            } catch (e) {
                console.error('Failed to save to localStorage:', e);
            }
        } else {
            console.log('No students available, dropdown cleared');
        }
    });
}

// Keep window.studentsData in sync with localStorage changes
window.addEventListener('storage', (event) => {
    if (event.key === 'starAcademyStudents') {
        console.log('Storage event in students.js: Updating window.studentsData');
        window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
            students: {},
            currentStudent: ''
        };
    }
});

// Bind addStudent to the Add button (for students.html)
const addButton = document.getElementById('addStudentButton');
if (addButton) {
    console.log('Binding addStudent to addStudentButton');
    addButton.addEventListener('click', (e) => addStudent(e));
} else {
    console.error('addStudentButton not found');
}

// Handle Enter key on input (for students.html)
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