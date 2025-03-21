// Load student data from localStorage
let studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
    students: {},
    currentStudent: localStorage.getItem('userName') || ''
};

// Initialize the first student if they exist in userName but not in studentsData
if (studentsData.currentStudent && !studentsData.students[studentsData.currentStudent]) {
    studentsData.students[studentsData.currentStudent] = {
        name: studentsData.currentStudent,
        progress: {},
        rank: "Explorer" // Default rank
    };
    // Migrate existing progress from flat localStorage keys
    for (let chapter = 1; chapter <= 7; chapter++) {
        for (let part = 1; part <= 4; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                const key = `exercise${chapter}:${part}:${exercise}`;
                studentsData.students[studentsData.currentStudent].progress[key] = 
                    localStorage.getItem(key) || "0";
                localStorage.removeItem(key); // Clean up old keys
            }
        }
    }
    localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
}

function addStudent() {
    const name = document.getElementById('newStudentName').value.trim();
    if (name && !studentsData.students[name]) {
        studentsData.students[name] = {
            name: name,
            progress: {},
            rank: "Explorer"
        };
        // Initialize progress for all exercises
        for (let chapter = 1; chapter <= 7; chapter++) {
            for (let part = 1; part <= 4; part++) {
                for (let exercise = 1; exercise <= 4; exercise++) {
                    const key = `exercise${chapter}:${part}:${exercise}`;
                    studentsData.students[name].progress[key] = "0";
                }
            }
        }
        studentsData.currentStudent = name; // Set as current student
        updateDropdown();
        localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
        document.getElementById('newStudentName').value = '';
    } else if (studentsData.students[name]) {
        alert('Student name already exists!');
    } else {
        alert('Please enter a valid name!');
    }
}

function switchStudent() {
    const select = document.getElementById('studentSelect');
    studentsData.currentStudent = select.value;
    localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
    
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
        // Clear all existing options
        select.innerHTML = '';

        // Get student names and sort alphabetically
        const studentNames = Object.keys(studentsData.students || {}).sort((a, b) => a.localeCompare(b));

        // Add student options
        studentNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });

        // Select the current student, or the first student if none is set
        if (studentNames.length > 0) {
            const currentStudent = studentsData.currentStudent && studentNames.includes(studentsData.currentStudent)
                ? studentsData.currentStudent
                : studentNames[0];
            select.value = currentStudent;
            studentsData.currentStudent = currentStudent;
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
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