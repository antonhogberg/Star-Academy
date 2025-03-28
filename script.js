// Language translations
const translations = {
    en: {
        menuFrontPage: "Star Overview",
        menuChapter: "Chapter",
        menuStudents: "Manage Students",
        menuInfo: "How to Use",
        popupWelcome: "Welcome to Star Academy!",
        popupIntro: "Here you can earn the stars you deserve in the Star Academy Piano School. Reach the sixth star in the exercises to advance your rank—check your progress by going to Star Overview in the menu.", // Add this
        popupTeacherNote: "Are you a teacher who wants to add your students as different users? Go to Manage Students in the menu to add and switch between students there. Note! All data is stored locally in your device’s cache, so you can only access it from this device—if you clear the cache, everything will be lost.", // Add this
        popupEnterName: "Enter your name in the field below and press Enter to create your user.", // Update this
        rankExplorer: "Explorer",
        rankStarCadet: "Star Cadet",
        rankStarOfficer: "Star Officer",
        rankStarCaptain: "Star Captain",
        rankStarCommander: "Star Commander",
        rankStarAdmiral: "Star Admiral",
        textboxExplorer: "You’re embarking on your piano adventure, learning notes, scales, chords, and arpeggios step by step. Complete 16 exercises to claim the Star Cadet rank!",
        textboxStarCadet: "You’ve displayed steadfast resolve, securing six stars over 16 exercises in the Star Academy Piano School. Complete Part 1 in all seven chapters to claim Star Officer!",
        textboxStarOfficer: "With thorough dedication, you’ve learned key names, scales, root chords, and several pieces. Stand proud as a Star Officer of the Star Academy Piano School—conquer Part 2 in every chapter for Star Captain!",
        textboxStarCaptain: "You’ve taken up sight-reading, play songs with chords, and perform classical works. Stand proud as a Star Captain of the Star Academy Piano School—complete Part 3 in every chapter for Star Commander!",
        textboxStarCommander: "With skill, you handle chords and arpeggios in all inversions, command scales across the piano, recognize note intervals, and boast a vast repertoire. Stand proud as a Star Commander of the Star Academy Piano School—conquer Part 4 in all chapters for Star Admiral!",
        textboxStarAdmiral: "Your relentless focus, dedication, and mastery have crowned you a piano virtuoso. Claim your place as Star Admiral of the Star Academy Piano School, master of all chapters!",
        chapter1: "Chapter 1",
        chapter2: "Chapter 2",
        chapter3: "Chapter 3",
        chapter4: "Chapter 4",
        chapter5: "Chapter 5",
        chapter6: "Chapter 6",
        chapter7: "Chapter 7",
        chapterName1: "Piano Basics",
        chapterName2: "Piano Technique",
        chapterName3: "Major Scales",
        chapterName4: "Minor Scales",
        chapterName5: "Chords",
        chapterName6: "Arpeggios",
        chapterName7: "Repertoire",
        addButton: "Add",
        studentNamePlaceholder: "Enter student name",
        studentsLabel: "Students:",
        addNewStudent: "Add new student",
        notesLabel: "Notes:",
        notesPlaceholder: "Add notes about planned homework, progress, or other details here.",
        saveNotesButton: "Save notes",
        infoTitle: "How to Use Star Academy",
        gettingStartedTitle: "Getting Started",
        gettingStartedText: "When you first visit Star Academy, you’ll be asked to enter your name. This creates your profile, where your progress will be saved. You’ll start as an Explorer, ready to begin your piano journey!",
        understandingProgressTitle: "Understanding Your Progress",
        understandingProgressText: "The homepage shows your progress with stars and chevrons. The 16 bottom stars track your first steps—complete 16 exercises to become a Star Cadet! The chevrons above represent the four parts across seven chapters. Fill each chevron’s stars by completing exercises to advance your rank, from Explorer to Star Admiral.",
        navigatingSiteTitle: "Navigating the Site",
        navigatingSiteText: "Use the menu (☰) in the top-left corner to access the homepage, chapters, student management, and this info page. Each chapter has four parts with four exercises each. Complete exercises to earn stars and progress through the ranks!",
        managingUsersTitle: "Managing Users",
        managingUsersText: "If you’re a teacher or have multiple users, visit the 'Manage Students' page to add students, switch between them, and add notes about their progress. Each student’s progress is saved separately."
    },
    sv: {
        menuFrontPage: "Stjärnöversikt",
        menuChapter: "Kapitel",
        menuStudents: "Hantera elever",
        menuInfo: "Så här använder du",
        popupWelcome: "Välkommen till Stjärnakademien!",
        popupIntro: "Här klickar du fram de stjärnor du förtjänat i Stjärnakademiens Pianoskola. Nå den sjätte stjärnan i uppgifterna för att stiga i rang - se hur du ligger till genom att gå till Stjärnöversikt i menyn.", // Add this
        popupTeacherNote: "Är du en lärare som vill lägga till dina elever som olika användare? Gå till Hantera elever i menyn och lägg till och växla mellan elever där. Obs! Alla uppgifter lagras lokalt i din enhets cacheminne så du kan bara komma åt dem via denna enheten - och rensar du cacheminnet så försvinner allt.", // Add this
        popupEnterName: "Skriv ditt namn i fältet nedan och tryck Enter för att skapa din användare.", // Update this
        rankExplorer: "Utforskare",
        rankStarCadet: "Stjärnkadett",
        rankStarOfficer: "Stjärnofficer",
        rankStarCaptain: "Stjärnkapten",
        rankStarCommander: "Stjärnkommendör",
        rankStarAdmiral: "Stjärnamiral",
        textboxExplorer: "Ditt pianoäventyr har startat, och du upptäcker noter, skalor, ackord och arpeggion i din egen takt. Klarar du 16 övningar blir du Stjärnkadett!",
        textboxStarCadet: "Du har visat järnvilja och samlat sex stjärnor i 16 övningar i Stjärnakademins pianoskola. Klarar du del 1 i alla sju kapitel blir du Stjärnofficer!",
        textboxStarOfficer: "Med stort fokus och noggrannhet har du lärt dig tangentnamn, skalor, grundackord och flera stycken. Var stolt, för nu är du Stjärnofficer i Stjärnakademins pianoskola – klara av del 2 i alla kapitel och bli Stjärnkapten!",
        textboxStarCaptain: "Med stort fokus har du lärt dig notläsning och kan nu spela låtar med ackord och framföra klassiska verk. Var stolt, för nu är du Stjärnkapten i Stjärnakademins pianoskola – klara av del 3 i alla kapitel och bli Stjärnkommendör!",
        textboxStarCommander: "Du har fått bra grepp om ackord och arpeggion i alla omvändningar och kan spela skalor, känna igen intervall och framföra hela konserter på egen hand. Var stolt, för nu är du Stjärnkommendör i Stjärnakademins pianoskola – klara av del 4 i alla kapitel och bli Stjärnamiral!",
        textboxStarAdmiral: "Dina ansträngningar och ditt fokus har gjort dig till en pianovirtuos. Du är Stjärnamiral i Stjärnakademins pianoskola, härskare över alla kapitel.",
        chapter1: "Kapitel 1",
        chapter2: "Kapitel 2",
        chapter3: "Kapitel 3",
        chapter4: "Kapitel 4",
        chapter5: "Kapitel 5",
        chapter6: "Kapitel 6",
        chapter7: "Kapitel 7",
        chapterName1: "Notläsning",
        chapterName2: "Övning",
        chapterName3: "Durskalor",
        chapterName4: "Mollskalor",
        chapterName5: "Ackord",
        chapterName6: "Arpeggion",
        chapterName7: "Repertoar",
        addButton: "Lägg till",
        studentNamePlaceholder: "Skriv elevens namn",
        studentsLabel: "Elever:",
        addNewStudent: "Lägg till ny elev",
        notesLabel: "Anteckningar:",
        notesPlaceholder: "Skriv dina anteckningar om läxor m.m. här.",
        saveNotesButton: "Spara anteckningar",
        infoTitle: "Så här använder du Stjärnakademien",
        gettingStartedTitle: "Kom igång",
        gettingStartedText: "När du först besöker Stjärnakademien blir du ombedd att ange ditt namn. Detta skapar din profil där dina framsteg sparas. Du börjar som en Utforskare, redo att påbörja din pianoresa!",
        understandingProgressTitle: "Förstå dina framsteg",
        understandingProgressText: "Hemsidan visar dina framsteg med stjärnor och chevroner. De 16 stjärnorna längst ner följer dina första steg – klara 16 övningar för att bli Stjärnkadett! Chevronerna ovan representerar de fyra delarna i sju kapitel. Fyll varje chevrons stjärnor genom att slutföra övningar för att avancera din rang, från Utforskare till Stjärnamiral.",
        navigatingSiteTitle: "Navigera på webbplatsen",
        navigatingSiteText: "Använd menyn (☰) i det övre vänstra hörnet för att komma åt hemsidan, kapitlen, elevhantering och denna infosida. Varje kapitel har fyra delar med fyra övningar vardera. Slutför övningar för att tjäna stjärnor och avancera genom rankerna!",
        managingUsersTitle: "Hantera användare",
        managingUsersText: "Om du är lärare eller har flera användare, besök sidan 'Hantera elever' för att lägga till elever, växla mellan dem och lägga till anteckningar om deras framsteg. Varje elevs framsteg sparas separat."
    }
};

function updateStarStates() {
    console.log('Storage check initiated, checking localStorage');
    console.log('All localStorage keys:', Object.keys(localStorage));

    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const progress = studentsData.students[studentsData.currentStudent]?.progress || {};

    const allExercises = [];
    for (let chapter = 1; chapter <= 7; chapter++) {
        for (let part = 1; part <= 4; part++) {
            for (let exercise = 1; exercise <= 4; exercise++) {
                allExercises.push(`exercise${chapter}:${part}:${exercise}`);
            }
        }
    }

    let sixStarCount = 0;
    allExercises.forEach(exerciseKey => {
        const state = progress[exerciseKey] || "0";
        console.log(`Checking ${exerciseKey} state:`, state);
        if (state === "6") sixStarCount++;
    });

    console.log('Six-star count:', sixStarCount);

    // Update bottom stars (on index.html)
    for (let i = 1; i <= 16; i++) {
        const bottomStar = document.getElementById(`bottom_star${i}`);
        if (bottomStar) {
            if (i <= sixStarCount) {
                bottomStar.setAttribute("fill", "#ffd700");
                bottomStar.setAttribute("stroke", "#000000");
                bottomStar.setAttribute("stroke-width", "1");
                console.log(`bottom_star${i} turned gold`);
            } else {
                bottomStar.setAttribute("fill", "#000000");
                bottomStar.removeAttribute("stroke");
                bottomStar.removeAttribute("stroke-width");
                console.log(`bottom_star${i} turned black`);
            }
        } else {
            console.log(`bottom_star${i} not found in DOM (expected on chapter pages)`);
        }
    }

    // Update chevrons (if present)
    const chevronMappings = {
        'chevron1_star1': ['exercise1:1:1', 'exercise1:1:2', 'exercise1:1:3', 'exercise1:1:4'],
        'chevron1_star2': ['exercise2:1:1', 'exercise2:1:2', 'exercise2:1:3', 'exercise2:1:4'],
        'chevron1_star3': ['exercise3:1:1', 'exercise3:1:2', 'exercise3:1:3', 'exercise3:1:4'],
        'chevron1_star4': ['exercise4:1:1', 'exercise4:1:2', 'exercise4:1:3', 'exercise4:1:4'],
        'chevron1_star5': ['exercise5:1:1', 'exercise5:1:2', 'exercise5:1:3', 'exercise5:1:4'],
        'chevron1_star6': ['exercise6:1:1', 'exercise6:1:2', 'exercise6:1:3', 'exercise6:1:4'],
        'chevron1_star7': ['exercise7:1:1', 'exercise7:1:2', 'exercise7:1:3', 'exercise7:1:4'],
        'chevron2_star1': ['exercise1:2:1', 'exercise1:2:2', 'exercise1:2:3', 'exercise1:2:4'],
        'chevron2_star2': ['exercise2:2:1', 'exercise2:2:2', 'exercise2:2:3', 'exercise2:2:4'],
        'chevron2_star3': ['exercise3:2:1', 'exercise3:2:2', 'exercise3:2:3', 'exercise3:2:4'],
        'chevron2_star4': ['exercise4:2:1', 'exercise4:2:2', 'exercise4:2:3', 'exercise4:2:4'],
        'chevron2_star5': ['exercise5:2:1', 'exercise5:2:2', 'exercise5:2:3', 'exercise5:2:4'],
        'chevron2_star6': ['exercise6:2:1', 'exercise6:2:2', 'exercise6:2:3', 'exercise6:2:4'],
        'chevron2_star7': ['exercise7:2:1', 'exercise7:2:2', 'exercise7:2:3', 'exercise7:2:4'],
        'chevron3_star1': ['exercise1:3:1', 'exercise1:3:2', 'exercise1:3:3', 'exercise1:3:4'],
        'chevron3_star2': ['exercise2:3:1', 'exercise2:3:2', 'exercise2:3:3', 'exercise2:3:4'],
        'chevron3_star3': ['exercise3:3:1', 'exercise3:3:2', 'exercise3:3:3', 'exercise3:3:4'],
        'chevron3_star4': ['exercise4:3:1', 'exercise4:3:2', 'exercise4:3:3', 'exercise4:3:4'],
        'chevron3_star5': ['exercise5:3:1', 'exercise5:3:2', 'exercise5:3:3', 'exercise5:3:4'],
        'chevron3_star6': ['exercise6:3:1', 'exercise6:3:2', 'exercise6:3:3', 'exercise6:3:4'],
        'chevron3_star7': ['exercise7:3:1', 'exercise7:3:2', 'exercise7:3:3', 'exercise7:3:4'],
        'chevron4_star1': ['exercise1:4:1', 'exercise1:4:2', 'exercise1:4:3', 'exercise1:4:4'],
        'chevron4_star2': ['exercise2:4:1', 'exercise2:4:2', 'exercise2:4:3', 'exercise2:4:4'],
        'chevron4_star3': ['exercise3:4:1', 'exercise3:4:2', 'exercise3:4:3', 'exercise3:4:4'],
        'chevron4_star4': ['exercise4:4:1', 'exercise4:4:2', 'exercise4:4:3', 'exercise4:4:4'],
        'chevron4_star5': ['exercise5:4:1', 'exercise5:4:2', 'exercise5:4:3', 'exercise5:4:4'],
        'chevron4_star6': ['exercise6:4:1', 'exercise6:4:2', 'exercise6:4:3', 'exercise6:4:4'],
        'chevron4_star7': ['exercise7:4:1', 'exercise7:4:2', 'exercise7:4:3', 'exercise7:4:4']
    };

    for (const [chevronStar, exercises] of Object.entries(chevronMappings)) {
        const star = document.getElementById(chevronStar);
        if (star) {
            const allSix = exercises.every(exercise => {
                const state = progress[exercise] || "0";
                console.log(`Checking ${exercise} for chevron ${chevronStar}:`, state);
                return state === "6";
            });
            if (allSix) {
                star.setAttribute("fill", "#ffd700");
                star.setAttribute("stroke", "#000000");
                star.setAttribute("stroke-width", "1");
                console.log(`${chevronStar} turned gold`);
            } else {
                star.setAttribute("fill", "#000000");
                star.removeAttribute("stroke");
                star.removeAttribute("stroke-width");
                console.log(`${chevronStar} turned black`);
            }
        } else {
            console.log(`${chevronStar} not found in DOM (expected on chapter pages)`);
        }
    }

    // Update rank badge and text box (if present)
    const rankImage = document.getElementById('rankImage');
    const rankName = document.getElementById('rankName');
    const rankTitle = document.getElementById('rankTitle');
    const rankDescription = document.getElementById('rankDescription');

    if (rankImage && rankName && rankTitle && rankDescription) {
        const lang = localStorage.getItem('language') || 'sv';
        console.log(`Updating rank elements with language: ${lang}`);

        const chevron1Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
            chevronMappings[`chevron1_star${chapter}`].every(exercise => progress[exercise] === "6")
        );
        const chevron2Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
            chevronMappings[`chevron2_star${chapter}`].every(exercise => progress[exercise] === "6")
        );
        const chevron3Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
            chevronMappings[`chevron3_star${chapter}`].every(exercise => progress[exercise] === "6")
        );
        const chevron4Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
            chevronMappings[`chevron4_star${chapter}`].every(exercise => progress[exercise] === "6")
        );

        let newRank;
        if (chevron4Complete) {
            rankImage.src = 'rank4.png';
            newRank = translations[lang].rankStarAdmiral;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarAdmiral;
            console.log(`Set rank to Star Admiral (${newRank})`);
        } else if (chevron3Complete) {
            rankImage.src = 'rank3.png';
            newRank = translations[lang].rankStarCommander;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarCommander;
            console.log(`Set rank to Star Commander (${newRank})`);
        } else if (chevron2Complete) {
            rankImage.src = 'rank2.png';
            newRank = translations[lang].rankStarCaptain;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarCaptain;
            console.log(`Set rank to Star Captain (${newRank})`);
        } else if (chevron1Complete) {
            rankImage.src = 'rank1.png';
            newRank = translations[lang].rankStarOfficer;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarOfficer;
            console.log(`Set rank to Star Officer (${newRank})`);
        } else if (sixStarCount >= 16) {
            rankImage.src = 'rank0.png';
            newRank = translations[lang].rankStarCadet;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarCadet;
            console.log(`Set rank to Star Cadet (${newRank})`);
        } else {
            rankImage.src = 'rank-start.png';
            newRank = translations[lang].rankExplorer;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxExplorer;
            console.log(`Set rank to Explorer (${newRank})`);
        }

        rankName.textContent = newRank;
        studentsData.students[studentsData.currentStudent].rank = newRank;
        localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));

        // Keep the all-chapters logic for top rank
        const allChaptersComplete = [1, 2, 3, 4, 5, 6, 7].every(chapter => {
            const chapterExercises = Array.from({ length: 16 }, (_, i) =>
                `exercise${chapter}:${Math.ceil((i + 1) / 4)}:${(i % 4) + 1}`
            );
            return chapterExercises.every(exercise => {
                const state = progress[exercise] || "0";
                console.log(`Checking rank badge ${exercise} state:`, state);
                return state === "6";
            });
        });
        if (allChaptersComplete) {
            rankImage.src = 'rank4.png';
            newRank = translations[lang].rankStarAdmiral;
            rankName.textContent = newRank;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarAdmiral;
            studentsData.students[studentsData.currentStudent].rank = newRank;
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
            console.log(`Set rank to Star Admiral (all chapters complete) (${newRank})`);
        }
    } else {
        console.log('Rank elements not found:', {
            rankImage: !!rankImage,
            rankName: !!rankName,
            rankTitle: !!rankTitle,
            rankDescription: !!rankDescription
        });
    }
}

// Update switchLanguage to set the new popup text
function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    console.log(`Switching language to: ${lang}`);

    // Update menu links
    document.querySelectorAll('.menu-link').forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        if (href === 'index.html') {
            link.textContent = translations[lang].menuFrontPage;
        } else if (href === 'students.html') {
            link.textContent = translations[lang].menuStudents;
        } else if (href === 'info.html') {
            link.textContent = translations[lang].menuInfo;
        } else {
            const chapterNum = href.match(/chapter(\d+)\.html/)?.[1];
            if (chapterNum) {
                link.textContent = `${translations[lang].menuChapter} ${chapterNum}`;
            }
        }
    });

    // Update popup text (if present)
    const popupWelcome = document.querySelector('#popupWelcome');
    const popupIntro = document.querySelector('#popupIntro');
    const popupTeacherNote = document.querySelector('#popupTeacherNote');
    const popupEnterName = document.querySelector('#popupEnterName');
    const submitNameButton = document.getElementById('submitNameButton');
    
    if (popupWelcome) popupWelcome.textContent = translations[lang].popupWelcome;
    if (popupIntro) popupIntro.textContent = translations[lang].popupIntro;
    if (popupTeacherNote) popupTeacherNote.textContent = translations[lang].popupTeacherNote;
    if (popupEnterName) popupEnterName.textContent = translations[lang].popupEnterName;
    if (submitNameButton) submitNameButton.textContent = translations[lang].addButton;
    

    // Update chapter title (if present)
    const chapterNumber = document.querySelector('.chapter-number');
    const chapterName = document.querySelector('.chapter-name');
    if (chapterNumber && chapterName) {
        const chapterNum = window.location.pathname.match(/chapter(\d+)\.html/)?.[1];
        if (chapterNum) {
            chapterNumber.textContent = translations[lang][`chapter${chapterNum}`];
            chapterName.textContent = translations[lang][`chapterName${chapterNum}`];
        } else {
            console.warn('No chapter number found in URL:', window.location.pathname);
        }
    }

    // Update rank badge and textbox (if present)
    const rankName = document.getElementById('rankName');
    const rankTitle = document.getElementById('rankTitle');
    const rankDescription = document.getElementById('rankDescription');
    if (rankName && rankTitle && rankDescription) {
        console.log('Found rank elements, updating with updateStarStates()');
        updateStarStates();
    }

    // Update students.html specific elements
    const chapterTitle = document.getElementById('chapterTitle');
    const studentsLabel = document.getElementById('studentsLabel');
    const newStudentInput = document.getElementById('newStudentName');
    const addButton = document.getElementById('addStudentButton');
    const addStudentLabel = document.getElementById('addStudentLabel');
    const notesLabel = document.getElementById('notesLabel');
    const studentNotes = document.getElementById('studentNotes');
    const saveNotesButton = document.getElementById('saveNotesButton');
    if (chapterTitle && studentsLabel) {
        chapterTitle.textContent = translations[lang].menuStudents;
        studentsLabel.textContent = translations[lang].studentsLabel;
        newStudentInput.placeholder = translations[lang].studentNamePlaceholder;
        addButton.textContent = translations[lang].addButton;
        addStudentLabel.textContent = translations[lang].addNewStudent;
        notesLabel.textContent = translations[lang].notesLabel;
        studentNotes.placeholder = translations[lang].notesPlaceholder;
        if (saveNotesButton) {
            saveNotesButton.textContent = translations[lang].saveNotesButton;
        }
        console.log(`Updated students.html title, label, placeholder, button to ${lang}`);
    }

    // Update info.html specific elements
    const infoTitle = document.getElementById('infoTitle');
    const gettingStartedTitle = document.getElementById('gettingStartedTitle');
    const gettingStartedText = document.getElementById('gettingStartedText');
    const understandingProgressTitle = document.getElementById('understandingProgressTitle');
    const understandingProgressText = document.getElementById('understandingProgressText');
    const navigatingSiteTitle = document.getElementById('navigatingSiteTitle');
    const navigatingSiteText = document.getElementById('navigatingSiteText');
    const managingUsersTitle = document.getElementById('managingUsersTitle');
    const managingUsersText = document.getElementById('managingUsersText');
    if (infoTitle) {
        infoTitle.textContent = translations[lang].infoTitle;
        gettingStartedTitle.textContent = translations[lang].gettingStartedTitle;
        gettingStartedText.textContent = translations[lang].gettingStartedText;
        understandingProgressTitle.textContent = translations[lang].understandingProgressTitle;
        understandingProgressText.textContent = translations[lang].understandingProgressText;
        navigatingSiteTitle.textContent = translations[lang].navigatingSiteTitle;
        navigatingSiteText.textContent = translations[lang].navigatingSiteText;
        managingUsersTitle.textContent = translations[lang].managingUsersTitle;
        managingUsersText.textContent = translations[lang].managingUsersText;
        console.log(`Updated info.html content to ${lang}`);
    }
}

// Function to set initial language on page load
function setInitialLanguage() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    let lang = hash === 'swedish' ? 'sv' : hash === 'english' ? 'en' : null;
    if (!lang) {
        lang = localStorage.getItem('language') || 'sv';
    }
    switchLanguage(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    setInitialLanguage();
    updateStarStates();

    console.log('Running active page detection script');
    const currentPath = window.location.pathname.toLowerCase();
    const links = document.querySelectorAll('.menu-link');
    console.log(`Found ${links.length} menu links`);
    links.forEach(link => {
        const href = link.getAttribute('href')?.toLowerCase();
        if (href) {
            if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
                link.classList.add('active-page');
                console.log(`Added .active-page to link: ${href} (matches ${currentPath})`);
            } else {
                console.log(`No match: currentPath=${currentPath}, href=${href}`);
            }
        } else {
            console.error('Link missing href attribute:', link);
        }
    });
});