window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
    students: {},
    currentStudent: localStorage.getItem('userName') || ''
};

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
        showStudentPopup(translations[lang].addStudentNoName, 3000);
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
    }
}

function showStudentPopup(message, duration) {
    const popup = document.getElementById('studentPopup');
    const popupMessage = document.getElementById('studentPopupMessage');
    const nameInput = document.getElementById('newStudentName');

    if (!popup || !popupMessage) {
        console.error('Student popup elements not found in DOM');
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

function switchStudent() {
    const select = document.getElementById('globalStudentSelect') || document.getElementById('studentSelect');
    if (select) {
        console.log('switchStudent called, new value:', select.value);
        window.studentsData.currentStudent = select.value;
        localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
        console.log('localStorage updated, currentStudent:', window.studentsData.currentStudent);
        if (typeof updateStarStates === 'function') {
            console.log('Calling updateStarStates');
            updateStarStates();
        } else {
            console.error('updateStarStates not defined');
        }
        if (typeof window.initializeStarMap === 'function' && window.location.pathname.toLowerCase().includes('starmap.html')) {
            console.log('Calling initializeStarMap');
            window.initializeStarMap();
        }
        if (window.location.pathname.toLowerCase().includes('chapter') && !window.isReloading) {
            console.log('Reloading chapter page');
            window.isReloading = true;
            location.reload();
        }
        if (typeof loadNotes === 'function') {
            console.log('Calling loadNotes');
            loadNotes(false);
        }
        // Force dropdown to reflect currentStudent
        select.value = window.studentsData.currentStudent;
    } else {
        console.error('Select element not found');
    }
}

function updateDropdown() {
    const selects = document.querySelectorAll('#globalStudentSelect, #studentSelect');
    selects.forEach(select => {
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
            window.studentsData.currentStudent = currentStudent;
            localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
            select.value = currentStudent;
            console.log('updateDropdown set select.value to:', currentStudent);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded, calling updateDropdown');
    updateDropdown();
    const lang = localStorage.getItem('language') || 'sv';
    const studentTitle = document.getElementById('chapterTitle');
    if (studentTitle) {
        studentTitle.textContent = lang === 'en' ? 'Manage Students' : 'Hantera elever';
    }
});