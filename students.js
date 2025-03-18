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
    window.location.href = 'index.html'; // Redirect to Star Overview to see updated progress
}

function updateDropdown() {
    const select = document.getElementById('studentSelect');
    if (select) {
        // Clear existing options except the default
        Array.from(select.options).forEach(option => {
            if (option.value !== '') select.remove(option);
        });

        // Get student names and sort alphabetically
        const studentNames = Object.keys(studentsData.students || {}).sort((a, b) => a.localeCompare(b));

        // Add sorted student options
        studentNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (name === studentsData.currentStudent) option.selected = true;
            select.appendChild(option);
        });
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