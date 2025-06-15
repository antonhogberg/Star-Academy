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
        silverProgress: initializeSilverProgress(),
        practiceLog: { dates: [], streak: 0, totalGoldStars: 0 } // Initialize practiceLog for new students
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

    // NEW: Check for consent
    if (localStorage.getItem('consentGiven') !== 'true') {
        console.log('Consent not given, storing pendingName and showing consent popup');
        localStorage.setItem('pendingName', name);
        if (typeof initializeConsentPopup === 'function') {
            initializeConsentPopup();
        }
        return;
    }

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
        silverProgress: initializeSilverProgress(),
        practiceLog: { dates: [], streak: 0, totalGoldStars: 0 }
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

    if (typeof window.updateStreakDisplay === 'function') {
        console.log('Calling updateStreakDisplay after adding student');
        window.updateStreakDisplay();
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

    // Update streak display after switching student
    if (typeof window.updateStreakDisplay === 'function') {
        console.log('Calling updateStreakDisplay after switching student');
        window.updateStreakDisplay();
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

    // Update streak display after updating dropdown
    if (typeof window.updateStreakDisplay === 'function') {
        console.log('Calling updateStreakDisplay after updating dropdown');
        window.updateStreakDisplay();
    }
}

function initializeRemoveButton() {
    console.log('initializeRemoveButton called');

    // Prevent re-initialization
    if (window.removeButtonInitialized) {
        console.log('Remove button already initialized, skipping');
        return;
    }
    window.removeButtonInitialized = true;

    // Ensure window.studentsData is initialized
    window.studentsData = window.studentsData || JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };
    console.log('window.studentsData in initializeRemoveButton:', window.studentsData);

    // Initialize elements
    const removeButton = document.getElementById('removeStudentButton');
    const confirmRemovePopup = document.getElementById('confirmRemovePopup');
    const confirmRemoveMessage = document.getElementById('confirmRemoveMessage');
    let confirmRemoveButton = document.getElementById('confirmRemoveButton');
    const closeConfirmRemovePopup = document.getElementById('closeConfirmRemovePopup');
    let lang = localStorage.getItem('language') || 'sv';

    if (!removeButton || !confirmRemovePopup || !confirmRemoveMessage || !confirmRemoveButton || !closeConfirmRemovePopup) {
        console.error('One or more required elements not found for remove button');
        return;
    }

    // Store popup state
    let popupOpen = false;
    let currentPopupStudent = null;

    // Function to update the popup text
    const updatePopupText = () => {
        if (popupOpen && currentPopupStudent) {
            confirmRemoveMessage.textContent = `${translations[lang].confirmRemoveMessage}${currentPopupStudent}.`;
            confirmRemoveButton.textContent = `${translations[lang].confirmRemoveButton}${currentPopupStudent}`;
        }
    };

    // Disable button if no consent
    if (localStorage.getItem('consentGiven') !== 'true') {
        removeButton.disabled = true;
    }

    // Listen for language changes
    window.addEventListener('storage', (event) => {
        if (event.key === 'language') {
            lang = localStorage.getItem('language') || 'sv';
            updatePopupText();
        } else if (event.key === 'starAcademyStudents') {
            window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
                students: {},
                currentStudent: ''
            };
            updatePopupText();
        }
    });

    removeButton.addEventListener('click', () => {
        // Prevent action if no consent
        if (localStorage.getItem('consentGiven') !== 'true') {
            console.log('Cannot remove student: consent not given');
            return;
        }

        const selectedStudent = window.studentsData.currentStudent;
        if (!selectedStudent) {
            alert(lang === 'en' ? "No current student selected to remove." : "Ingen aktuell elev vald att radera.");
            return;
        }

        // Update popup state
        popupOpen = true;
        currentPopupStudent = selectedStudent;

        // Update the confirmation message with the selected student's name
        const baseMessage = translations[lang].confirmRemoveMessage;
        confirmRemoveMessage.textContent = `${baseMessage}${selectedStudent}.`;

        // Update the button text with the selected student's name
        const buttonBaseText = translations[lang].confirmRemoveButton;
        confirmRemoveButton.textContent = `${buttonBaseText}${selectedStudent}`;

        // Clone confirmRemoveButton to remove existing listeners
        const newConfirmButton = confirmRemoveButton.cloneNode(true);
        confirmRemoveButton.parentNode.replaceChild(newConfirmButton, confirmRemoveButton);
        confirmRemoveButton = newConfirmButton;

        // Show the confirmation popup
        confirmRemovePopup.style.display = 'flex';
        confirmRemovePopup.classList.add('show');

        // Handle the Confirm Remove button click
        confirmRemoveButton.addEventListener('click', () => {
            let data = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };

            console.log('Before deletion:', JSON.stringify(data.students));
            console.log('Deleting student:', selectedStudent);

            if (data.students[selectedStudent]) {
                delete data.students[selectedStudent];

                console.log('After deletion:', JSON.stringify(data.students));

                // Set currentStudent to the first remaining student
                const remainingStudents = Object.keys(data.students).sort((a, b) => a.localeCompare(b));
                data.currentStudent = remainingStudents.length > 0 ? remainingStudents[0] : '';

                // Save updated data
                localStorage.setItem('starAcademyStudents', JSON.stringify(data));
                window.studentsData = data;

                // Update dropdown and notes
                updateDropdown();
                if (typeof loadNotes === 'function') {
                    loadNotes(false);
                }

                // Reset popup state
                popupOpen = false;
                currentPopupStudent = null;

                // Hide the popup
                confirmRemovePopup.style.display = 'none';
                confirmRemovePopup.classList.remove('show');
            }
        });
    });

    // Handle closing the popup by clicking outside
    confirmRemovePopup.addEventListener('click', (e) => {
        if (!confirmRemovePopup.querySelector('.student-popup-content').contains(e.target)) {
            confirmRemovePopup.style.display = 'none';
            confirmRemovePopup.classList.remove('show');
            popupOpen = false;
            currentPopupStudent = null;

            // Clone confirmRemoveButton to remove existing listeners
            const newConfirmButton = confirmRemoveButton.cloneNode(true);
            confirmRemoveButton.parentNode.replaceChild(newConfirmButton, confirmRemoveButton);
            confirmRemoveButton = newConfirmButton;
        }
    });

    // Handle closing the popup with the X button
    closeConfirmRemovePopup.addEventListener('click', () => {
        confirmRemovePopup.style.display = 'none';
        confirmRemovePopup.classList.remove('show');
        popupOpen = false;
        currentPopupStudent = null;

        // Clone confirmRemoveButton to remove existing listeners
        const newConfirmButton = confirmRemoveButton.cloneNode(true);
        confirmRemoveButton.parentNode.replaceChild(newConfirmButton, confirmRemoveButton);
        confirmRemoveButton = newConfirmButton;
    });
}

// Export student data with conditional practiceLog handling
function exportStudentData(studentName) {
    console.log(`Exporting student data for ${studentName}`);
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const student = { ...studentsData.students[studentName] };
    
    // Determine the mode of the exporting user (currentStudent on this device)
    const exportingUserMode = studentsData.students[studentsData.currentStudent]?.studentMode || false;
    
    // Exclude practiceLog only if exporting from normal mode to student mode (N to S)
    if (!exportingUserMode && student.studentMode === true) {
        console.log(`Normal mode user exporting student mode user ${studentName}, excluding practiceLog`);
        delete student.practiceLog;
    } else {
        console.log(`Including practiceLog in export for ${studentName}`);
    }
    
    return JSON.stringify(student);
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

    initializeRemoveButton(); // New
});