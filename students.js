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
        notes: "" // Initialize notes
    };
    // Migrate existing progress from flat localStorage keys
    for (let chapter = 1; chapter <= 7; chapter++) {
        for (let part = 1; part <= 4; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                const key = `exercise${chapter}:${part}:${exercise}`;
                window.studentsData.students[window.studentsData.currentStudent].progress[key] = 
                    localStorage.getItem(key) || "0";
                localStorage.removeItem(key); // Clean up old keys
            }
        }
    }
    localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
}

function addStudent() {
    const nameInput = document.getElementById('newStudentName');
    const name = nameInput.value.trim();
    const lang = localStorage.getItem('language') || 'sv';

    // Re-fetch the latest studentsData from localStorage to avoid overwriting
    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: localStorage.getItem('userName') || ''
    };

    if (!name) {
        showStudentPopup(translations[lang].addStudentNoName, 2500); // Updated duration for fade
        return;
    }

    if (window.studentsData.students[name]) {
        showStudentPopup(translations[lang].addStudentDuplicate, 2500);
        return;
    }

    // Add new student
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

    // Success message with stars
    const starSVG = '<svg class="popup-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    showStudentPopup(`${starSVG} ${translations[lang].addStudentSuccess} ${starSVG}`, 2500);

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

    if (nameInput) nameInput.blur(); // Dismiss keyboard
    popupMessage.innerHTML = message;
    popup.style.display = 'flex';
    popup.style.opacity = '1'; // Ensure full opacity on show

    setTimeout(() => {
        popup.style.transition = 'opacity 0.5s ease'; // Fade out over 0.5s
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
            popup.style.opacity = '1'; // Reset for next show
            popup.style.transition = ''; // Clear transition
        }, 500); // Match fade duration
    }, duration - 500); // Start fade 0.5s before end
}

function switchStudent() {
    const select = document.getElementById('studentSelect');
    window.studentsData.currentStudent = select.value;
    localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
    
    // Call loadNotes() without updating the dropdown (already up-to-date)
    if (typeof loadNotes === 'function') {
        loadNotes(false);
    } else {
        console.error('loadNotes function not found. Ensure it is defined in students.html.');
    }
}

function updateDropdown() {
    const select = document.getElementById('studentSelect');
    if (select) {
        select.innerHTML = '';
        const studentNames = Object.keys(window.studentsData.students || {}).sort((a, b) => a.localeCompare(b));
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
            localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDropdown();
    // Update page title based on language
    const lang = localStorage.getItem('language') || 'sv';
    const studentTitle = document.getElementById('studentTitle'); // Updated to match HTML
    if (studentTitle) {
        studentTitle.textContent = lang === 'en' ? 'Manage Students' : 'Hantera elever';
    }
});