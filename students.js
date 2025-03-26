// Load student data from localStorage
window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
    students: {},
    currentStudent: localStorage.getItem('userName') || ''
};

// Initialize the first student if they exist in userName but not in studentsData
if (window.studentsData.currentStudent && !window.studentsData.students[window.studentsData.currentStudent]) {
    console.log('Initializing first student:', window.studentsData.currentStudent);
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
    console.log('addStudent called');
    const name = document.getElementById('newStudentName').value.trim();
    console.log('Student name entered:', name);
    // Re-fetch the latest studentsData from localStorage to avoid overwriting
    window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: localStorage.getItem('userName') || ''
    };
    if (name && !window.studentsData.students[name]) {
        console.log('Adding new student:', name);
        window.studentsData.students[name] = {
            name: name,
            progress: {},
            rank: "Explorer",
            notes: "" // Initialize notes as empty
        };
        // Initialize progress for all exercises
        for (let chapter = 1; chapter <= 7; chapter++) {
            for (let part = 1; part <= 4; part++) {
                for (let exercise = 1; exercise <= 4; exercise++) {
                    const key = `exercise${chapter}:${part}:${exercise}`;
                    window.studentsData.students[name].progress[key] = "0";
                }
            }
        }
        window.studentsData.currentStudent = name; // Set as current student
        updateDropdown();
        localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
        document.getElementById('newStudentName').value = '';
        // Update the text area to show the new student's (empty) notes
        if (typeof loadNotes === 'function') {
            loadNotes(false);
        } else {
            console.error('loadNotes function not found. Ensure it is defined in students.html.');
        }
    } else if (window.studentsData.students[name]) {
        console.log('Student name already exists:', name);
        alert('Student name already exists!');
    } else {
        console.log('Invalid name entered');
        alert('Please enter a valid name!');
    }
}

function switchStudent() {
    console.log('switchStudent called');
    const select = document.getElementById('studentSelect');
    window.studentsData.currentStudent = select.value;
    console.log('Switching to student:', window.studentsData.currentStudent);
    localStorage.setItem('starAcademyStudents', JSON.stringify(window.studentsData));
    
    // Call loadNotes() without updating the dropdown (already up-to-date)
    if (typeof loadNotes === 'function') {
        loadNotes(false);
    } else {
        console.error('loadNotes function not found. Ensure it is defined in students.html.');
    }
}

function updateDropdown() {
    console.log('updateDropdown called');
    const select = document.getElementById('studentSelect');
    if (select) {
        select.innerHTML = '';
        const studentNames = Object.keys(window.studentsData.students || {}).sort((a, b) => a.localeCompare(b));
        console.log('Student names:', studentNames);
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
            console.log('Dropdown updated, current student:', currentStudent);
        } else {
            console.log('No students to display in dropdown');
        }
    } else {
        console.error('studentSelect element not found');
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