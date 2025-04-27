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

function addStudent() {
    const nameInput = document.getElementById('newStudentName');
    const name = nameInput.value.trim();
    const lang = localStorage.getItem('language') || 'sv';

    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: localStorage.getItem('userName') || ''
    };

    if (!name) {
        showStudentPopup(translations[lang].addStudentNoName, 3000); // 2s + 1s fade
        return;
    }

    if (window.studentsData.students[name]) {
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
    updateDropdown();
    localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
    nameInput.value = '';

    const starSVG = '<svg class="popup-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    showStudentPopup(`${starSVG} ${translations[lang].addStudentSuccess} ${starSVG}`, 3000);

    if (typeof loadNotes === 'function') {
        loadNotes(false);
    } else {
        console.error('loadNotes function not found. Ensure it is defined in students.html.');
    }
}

function showStudentPopup(message, duration) {
    const popup = document.getElementById('studentPopup');
    const popupMessage = document.getElementById('studentPopupMessage');
    const nameInput = document.getElementById('newStudentName');

    if (!popup || !popupMessage) {
        console.error('Student popup elements not found in DOM');
        alert(message); // Fallback
        return;
    }

    if (nameInput) nameInput.blur();
    popupMessage.innerHTML = message;
    popup.style.display = 'flex';
    popup.style.opacity = '1';

    setTimeout(() => {
        popup.style.transition = 'opacity 1s ease'; // 1s fade
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
            popup.style.opacity = '1';
            popup.style.transition = '';
        }, 1000);
    }, duration - 1000); // Fade starts after 2s
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
            select.appendChild(option);
        });
        if (studentNames.length > 0) {
            const currentStudent = window.studentsData.currentStudent && studentNames.includes(window.studentsData.currentStudent)
                ? window.studentsData.currentStudent
                : studentNames[0];
            select.value = currentStudent;
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

document.addEventListener('DOMContentLoaded', () => {
    updateDropdown();
    const lang = localStorage.getItem('language') || 'sv';
    const studentTitle = document.getElementById('chapterTitle'); // Match your HTML ID
    if (studentTitle) {
        studentTitle.textContent = lang === 'en' ? 'Manage Students' : 'Hantera elever';
    }
});