// Language translations
const translations = {
    en: {
        menuFrontPage: "Front Page",
        menuChapter: "Chapter",
        popupWelcome: "Welcome to Star Academy!",
        popupEnterName: "Please enter your name:",
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
        chapterName2: "Scales and Notes",
        chapterName3: "Chords Introduction",
        chapterName4: "Arpeggios and Techniques",
        chapterName5: "Sight-Reading Basics",
        chapterName6: "Classical Repertoire",
        chapterName7: "Mastery and Performance"
    },
    sv: {
        menuFrontPage: "Framsida",
        menuChapter: "Kapitel",
        popupWelcome: "Välkommen till Stjärnakademien!",
        popupEnterName: "Skriv ditt namn här:",
        rankExplorer: "Upptäckare",
        rankStarCadet: "Stjärnkadett",
        rankStarOfficer: "Stjärnofficer",
        rankStarCaptain: "Stjärnkapten",
        rankStarCommander: "Stjärnkommendör",
        rankStarAdmiral: "Stjärnamiral",
        textboxExplorer: "Du påbörjar ditt pianoäventyr och lär dig noter, skalor, ackord och arpeggion steg för steg. Slutför 16 övningar för att få rangen Stjärnkadett!",
        textboxStarCadet: "Du har visat stadig beslutsamhet och säkrat sex stjärnor över 16 övningar i Stjärnakademiens pianoskola. Slutför del 1 i alla sju kapitel för att bli Stjärnofficer!",
        textboxStarOfficer: "Med grundlig hängivenhet har du lärt dig tangentnamn, skalor, grundackord och flera stycken. Stå stolt som en Stjärnofficer vid Stjärnakademiens pianoskola—erövra del 2 i varje kapitel för att bli Stjärnkapten!",
        textboxStarCaptain: "Du har börjat med sight-reading, spelar låtar med ackord och framför klassiska verk. Stå stolt som en Stjärnkapten vid Stjärnakademiens pianoskola—slutför del 3 i varje kapitel för att bli Stjärnkommendör!",
        textboxStarCommander: "Med skicklighet hanterar du ackord och arpeggion i alla inversioner, behärskar skalor över hela pianot, känner igen notintervall och har en omfattande repertoar. Stå stolt som en Stjärnkommendör vid Stjärnakademiens pianoskola—erövra del 4 i alla kapitel för att bli Stjärnamiral!",
        textboxStarAdmiral: "Din obevekliga fokus, hängivenhet och mästerskap har krönt dig till en pianovirtuos. Ta din plats som Stjärnamiral vid Stjärnakademiens pianoskola, mästare över alla kapitel!",
        chapter1: "Kapitel 1",
        chapter2: "Kapitel 2",
        chapter3: "Kapitel 3",
        chapter4: "Kapitel 4",
        chapter5: "Kapitel 5",
        chapter6: "Kapitel 6",
        chapter7: "Kapitel 7",
        chapterName1: "Pianogrunderna",
        chapterName2: "Skalor och Noter",
        chapterName3: "Ackordinlärning",
        chapterName4: "Arpeggion och Tekniker",
        chapterName5: "Sight-Reading Grunderna",
        chapterName6: "Klassisk Repertoar",
        chapterName7: "Mästerskap och Uppträdande"
    }
};

// Function to switch language
function switchLanguage(lang) {
    // Store the selected language in localStorage
    localStorage.setItem('language', lang);
    console.log(`Switching language to: ${lang}`);

    // Update menu links
    document.querySelectorAll('.menu-link').forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        if (href === 'index.html') {
            link.textContent = translations[lang].menuFrontPage;
        } else {
            const chapterNum = href.match(/chapter(\d+)\.html/)?.[1];
            if (chapterNum) {
                link.textContent = `${translations[lang].menuChapter} ${chapterNum}`;
            }
        }
    });

    // Update popup text (if present)
    const popupWelcome = document.querySelector('#namePopup h2');
    const popupEnterName = document.querySelector('#namePopup p');
    if (popupWelcome) popupWelcome.textContent = translations[lang].popupWelcome;
    if (popupEnterName) popupEnterName.textContent = translations[lang].popupEnterName;

    // Update chapter title (if present)
    const chapterNumber = document.querySelector('.chapter-number');
    const chapterName = document.querySelector('.chapter-name');
    if (chapterNumber && chapterName) {
        const chapterNum = window.location.pathname.match(/chapter(\d+)\.html/)?.[1];
        if (chapterNum) {
            chapterNumber.textContent = translations[lang][`chapter${chapterNum}`];
            chapterName.textContent = translations[lang][`chapterName${chapterNum}`];
        }
    }

    // Update rank badge and textbox (if present)
    const rankName = document.getElementById('rankName');
    const rankTitle = document.getElementById('rankTitle');
    const rankDescription = document.getElementById('rankDescription');
    if (rankName && rankTitle && rankDescription) {
        console.log('Found rank elements, updating with updateStarStates()');
        updateStarStates(); // Re-run updateStarStates to apply the new language
    } else {
        console.log('Rank elements not found:', {
            rankName: !!rankName,
            rankTitle: !!rankTitle,
            rankDescription: !!rankDescription
        });
    }
}

// Function to set initial language on page load
function setInitialLanguage() {
    // Check URL fragment for language (e.g., #english or #swedish)
    const hash = window.location.hash.replace('#', '').toLowerCase();
    let lang = hash === 'swedish' ? 'sv' : hash === 'english' ? 'en' : null;

    // If no language in URL, check localStorage, default to Swedish for Swedish testers
    if (!lang) {
        lang = localStorage.getItem('language') || 'sv'; // Default to Swedish
    }

    // Apply the language
    switchLanguage(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setInitialLanguage();

    // Add .active-page to the current page's link with improved path matching
    console.log('Running active page detection script');
    const currentPath = window.location.pathname.toLowerCase(); // e.g., "/TEST/chapter1.html" or "/chapter1.html"
    const links = document.querySelectorAll('.menu-link');
    console.log(`Found ${links.length} menu links`);
    links.forEach(link => {
        const href = link.getAttribute('href')?.toLowerCase(); // e.g., "chapter1.html"
        if (href) {
            // Check if the current path ends with the href (handles directories)
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

    function updateStarStates() {
        console.log('Storage check initiated, checking localStorage');
        console.log('All localStorage keys:', Object.keys(localStorage));
        
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
            const state = localStorage.getItem(exerciseKey) || 
                        (exerciseKey.startsWith('exercise1') ? localStorage.getItem(exerciseKey.replace('exercise1:', 'exercise')) : null);
            console.log(`Checking ${exerciseKey} state:`, state);
            if (state === "6") sixStarCount++;
        });

        console.log('Six-star count:', sixStarCount);

        // Update bottom stars (only if elements exist, e.g., on index.html)
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

        // Update chevrons (only if elements exist)
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
                    const state = localStorage.getItem(exercise) || 
                                (exercise.startsWith('exercise1') ? localStorage.getItem(exercise.replace('exercise1:', 'exercise')) : null);
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

        // Update rank badge and text box (only if elements exist)
        const rankImage = document.getElementById('rankImage');
        const rankName = document.getElementById('rankName');
        const rankTitle = document.getElementById('rankTitle');
        const rankDescription = document.getElementById('rankDescription');

        if (rankImage && rankName && rankTitle && rankDescription) {
            const lang = localStorage.getItem('language') || 'sv'; // Use current language
            console.log(`Updating rank elements with language: ${lang}`);

            const chevron1Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
                chevronMappings[`chevron1_star${chapter}`].every(exercise => localStorage.getItem(exercise) === "6")
            );
            const chevron2Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
                chevronMappings[`chevron2_star${chapter}`].every(exercise => localStorage.getItem(exercise) === "6")
            );
            const chevron3Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
                chevronMappings[`chevron3_star${chapter}`].every(exercise => localStorage.getItem(exercise) === "6")
            );
            const chevron4Complete = [1, 2, 3, 4, 5, 6, 7].every(chapter => 
                chevronMappings[`chevron4_star${chapter}`].every(exercise => localStorage.getItem(exercise) === "6")
            );
            
            if (chevron4Complete) { // All chevron4 stars (chapters 1–7, Part 4) full
                rankImage.src = 'rank4.png';
                rankName.textContent = translations[lang].rankStarAdmiral;
                rankTitle.textContent = translations[lang].rankStarAdmiral;
                rankDescription.textContent = translations[lang].textboxStarAdmiral;
                console.log(`Set rank to Star Admiral (${translations[lang].rankStarAdmiral})`);
            } else if (chevron3Complete) { // All chevron3 stars (chapters 1–7, Part 3) full
                rankImage.src = 'rank3.png';
                rankName.textContent = translations[lang].rankStarCommander;
                rankTitle.textContent = translations[lang].rankStarCommander;
                rankDescription.textContent = translations[lang].textboxStarCommander;
                console.log(`Set rank to Star Commander (${translations[lang].rankStarCommander})`);
            } else if (chevron2Complete) { // All chevron2 stars (chapters 1–7, Part 2) full
                rankImage.src = 'rank2.png';
                rankName.textContent = translations[lang].rankStarCaptain;
                rankTitle.textContent = translations[lang].rankStarCaptain;
                rankDescription.textContent = translations[lang].textboxStarCaptain;
                console.log(`Set rank to Star Captain (${translations[lang].rankStarCaptain})`);
            } else if (chevron1Complete) { // All chevron1 stars (chapters 1–7, Part 1) full
                rankImage.src = 'rank1.png';
                rankName.textContent = translations[lang].rankStarOfficer;
                rankTitle.textContent = translations[lang].rankStarOfficer;
                rankDescription.textContent = translations[lang].textboxStarOfficer;
                console.log(`Set rank to Star Officer (${translations[lang].rankStarOfficer})`);
            } else if (sixStarCount >= 16) { // 16 or more stars golden, but chevron1 not complete
                rankImage.src = 'rank0.png';
                rankName.textContent = translations[lang].rankStarCadet;
                rankTitle.textContent = translations[lang].rankStarCadet;
                rankDescription.textContent = translations[lang].textboxStarCadet;
                console.log(`Set rank to Star Cadet (${translations[lang].rankStarCadet})`);
            } else {
                rankImage.src = 'rank-start.png';
                rankName.textContent = translations[lang].rankExplorer;
                rankTitle.textContent = translations[lang].rankExplorer;
                rankDescription.textContent = translations[lang].textboxExplorer;
                console.log(`Set rank to Explorer (${translations[lang].rankExplorer})`);
            }
            
            // Keep the all-chapters logic for top rank
            const allChaptersComplete = [1, 2, 3, 4, 5, 6, 7].every(chapter => {
                const chapterExercises = Array.from({ length: 16 }, (_, i) =>
                    `exercise${chapter}:${Math.ceil((i + 1) / 4)}:${(i % 4) + 1}`
                );
                return chapterExercises.every(exercise => {
                    const state = localStorage.getItem(exercise) || 
                                (exercise.startsWith('exercise1') ? localStorage.getItem(exercise.replace('exercise1:', 'exercise')) : null);
                    console.log(`Checking rank badge ${exercise} state:`, state);
                    return state === "6";
                });
            });
            if (allChaptersComplete) {
                rankImage.src = 'rank4.png';
                rankName.textContent = translations[lang].rankStarAdmiral;
                rankTitle.textContent = translations[lang].rankStarAdmiral;
                rankDescription.textContent = translations[lang].textboxStarAdmiral;
                console.log(`Set rank to Star Admiral (all chapters complete) (${translations[lang].rankStarAdmiral})`);
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

    // Initial update for star states (only runs if elements exist)
    updateStarStates();

    // Storage event listeners for HTTP/S and fallback for file://
    window.addEventListener('storage', updateStarStates);
    window.onstorage = updateStarStates; // Fallback for older browsers or file://
});