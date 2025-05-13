let previousSixStarCount = parseInt(localStorage.getItem('sixStarCount')) || 0;

const translations = {
    en: {
        menuFrontPage: "Star Overview",
        menuChapter: "Chapter",
        menuStudents: "For Teachers",
        menuStarMap: "Star Map",
        menuChapters: "Chapters",
        menuFAQ: "FAQ",
        menuRemove: "Remove student",
        popupWelcome: "Welcome to North Star Piano Academy!",
        popupIntro: "You’ve just embarked on your piano journey as an Explorer! The Star Map is your guide—it’s there to show you which exercise to do next as you progress through the seven chapters, earning stars and advancing through ranks like Star Cadet, Star Officer, and beyond.",
        popupTeacherNote: "You can also focus on a specific chapter if Scales or Chords is what you want to excel at. Visit the chapter pages to start earning stars, check your progress on the Star Overview page, or manage students on the For Teachers page.",
        popupEnterName: "Let’s get started—add your name below to begin your adventure!",
        rankExplorer: "Explorer",
        rankStarCadet: "Star Cadet",
        rankStarOfficer: "Star Officer",
        rankStarCaptain: "Star Captain",
        rankStarCommander: "Star Commander",
        rankStarAdmiral: "Star Admiral",
        rankAchievementMessage: "Congratulations [userName]!",
        rankAchievementSubtitle: "You’ve achieved the rank of Star Cadet!",
        textboxExplorer: "You’re embarking on your piano adventure, learning notes, scales, chords, and arpeggios step by step. Complete 16 exercises to claim the Star Cadet rank!",
        textboxStarCadet: "You’ve displayed steadfast resolve, securing six stars over 16 exercises in the North Star Piano Academy. Complete Part 1 in all seven chapters to claim Star Officer!",
        textboxStarOfficer: "With thorough dedication, you’ve learned key names, scales, root chords, and several pieces. Stand proud as a Star Officer of the North Star Piano Academy—conquer Part 2 in every chapter for Star Captain!",
        textboxStarCaptain: "You’ve taken up sight-reading, play songs with chords, and perform classical works. Stand proud as a Star Captain of the North Star Piano Academy—complete Part 3 in every chapter for Star Commander!",
        textboxStarCommander: "With skill, you handle chords and arpeggios in all inversions, command scales across the piano, recognize note intervals, and boast a vast repertoire. Stand proud as a Star Commander of the North Star Piano Academy—conquer Part 4 in all chapters for Star Admiral!",
        textboxStarAdmiral: "Your relentless focus, dedication, and mastery have crowned you a piano virtuoso. Claim your place as Star Admiral of the North Star Piano Academy, master of all chapters!",
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
        studentsLabel: "Students",
        addNewStudent: "Add a new student",
        addStudentSuccess: "New Star Student created!",
        addStudentDuplicate: "Student name already exists! Please choose a different name.",
        addStudentNoName: "Please enter a name!",
        notesLabel: "Notes",
        notesPlaceholder: "Add notes about planned homework, progress, or other details here—they’re saved automatically.",
        saveNotesButton: "Save notes",
        congratsMessage: "🌟 Congratulations! You’ve completed the Star Map! 🌟",
        faqTitle: "Frequently Asked Questions",
        faqQ1: "How do I use the Star Map to earn stars?",
        faqA1: "Go to the Star Map in the menu and scroll left to see an explanation on how to use the Star Map.",
        faqQ2: "Can I add my students, and is there a limit to how many I can add?",
        faqA2: "Yes, you can add students in For Teachers: type the student’s name, press Add, and switch between students anytime in the menu—data is saved locally and automatically. There’s no limit to how many students you can add!",
        faqQ3: "Can I share a student’s progress with them, if they want to see the stars on their own iPad?",
        faqA3: "Yes, you can share a student’s progress! On the For Teachers page, select the student and generate a share link or QR code. The student can scan the QR code using their iPad’s camera app to import their progress, or you can send the import link via SMS, email, or AirDrop for them to open on their device. Once imported, they can view their stars and progress on their own iPad and even click new stars independently—your accounts won’t be linked. At the next lesson, you can export the student’s data again to their iPad, and your version will overwrite their version, ensuring their progress stays up to date with your records.",
        faqQ4: "Why can't I click the stars in Star Overview?",
        faqA4: "The stars on the Rank Badge in Star Overview are not clickable—they light up automatically as you earn stars on the Chapter pages and Star Map.",
        faqQ5: "How does the ranking system work in North Star Piano Academy?",
        faqA5: "The Rank Badge has a lower field with 16 small stars. For each exercise you complete (earning 6 stars), one of these small stars lights up. When the lower field is full, you achieve the Star Cadet rank, and the badge on the right updates from empty stars to golden stars. The Rank Badge also features four chevrons, each with large stars that light up when you complete all four exercises in a Part. The first chevron’s seven stars correspond to Part 1 across all seven chapters, the second chevron to Part 2, and so on. As you fill a chevron with stars, you advance in rank: you become a Star Officer after Part 1, Star Captain after Part 2, Star Commander after Part 3, and when you reach the highest rank after Part 4, you become a Star Admiral. The badge on the right gains a matching chevron for each Part you complete, showing your current rank!",
        faqQ6: "How much time should I spend practicing each day?",
        faqA6: "We recommend practicing 15–30 minutes per day in addition to the time you spend on pieces, depending on your level and age. Beginners can start with 15 minutes, while more advanced students can aim for 30 minutes. Try to practice daily to make steady progress, and focus on your active exercises to earn stars.",
        faqQ7: "Can I use North Star Piano Academy if I already know how to play the piano, and how advanced are the exercises?",
        faqA7: "Yes, even if you already know how to play the piano, you can use North Star Piano Academy! The exercises are divided into four parts with different levels: Part 1 is for beginners, Part 2 is for slightly more experienced students, Part 3 is for advanced students, and Part 4 features mostly very advanced exercises for experienced pianists. Start with exercises that match your level, or begin from the start to collect some easy stars. Earn stars to climb ranks and improve your skills, regardless of your level.",
        faqQ8: "How many ranks are there?",
        faqA8: "There are six ranks in North Star Piano Academy: Explorer, Star Cadet, Star Officer, Star Captain, Star Commander, and Star Admiral. You climb ranks by earning stars in exercises, and the highest rank, Star Admiral, is achieved by earning six stars in every exercise in every chapter.",
        faqQ9: "Do I need a piano to use North Star Piano Academy?",
        faqA9: "To use North Star Piano Academy, you need access to a piano or keyboard to practice the exercises in the North Star Piano Academy. A keyboard with at least 61 keys works well for beginners, but a piano is ideal for developing proper technique. You don’t need to own a piano—you can use one at a school or rent one if needed.",
        faqQ10: "What should I do if I have technical issues with the website?",
        faqA10: "If you have technical issues with the website, try refreshing the page or checking your internet connection. If the problem persists, contact us at northstarpianoacademy@gmail.com, and we’ll assist you. Also, make sure not to clear your browser’s cache, as it will remove your progress.",
        faqQ11: "Can I send suggestions or questions?",
        faqA11: "Yes, feel free to email: northstarpianoacademy@gmail.com",
        faqQ12: "Why did my progress disappear?",
        faqA12: "If you cleared your browser history, all star data was removed as it’s stored in the browser’s cache. If you imported a user with your name from another device via a link or QR code created on the For Teachers page, your user data was overwritten by the imported user.",
        exportTitle: "Export Student Data",
        exportInfo: "Tap the button below to share the current student to another device. The recipient just needs to open the link – the student will be added automatically!",
        creatingLink: "Generating link, please wait…",
        copyLinkSuccess: "Link copied to clipboard! Paste to share.",
        scanOrShare: "Scan the QR code or...",
        shareButtonExport: "Share via AirDrop / Message / QR-code",
        shareButtonQR: "Share student via AirDrop / Message",
        removeStudentTitle: "Remove student",
        removeStudentButton: "Remove student",
        confirmRemoveMessage: "Press the button below to remove ",
        confirmRemoveButton: "Remove ",
        removeCurrentStudent: "Remove current student: ",
        removeCurrentStudentNone: "Remove current student: None",
        starMapDescription: "Welcome to the Star Map! Click on each star to track your progress in North Star Piano Academy. Earn up to six stars per exercise by practicing in the Piano Academy. Scroll to explore all chapters and exercises.",
        starMapTitle: "Using the Star Map",
        starMapBullet1: "Start with Star 1:1:1: In North Star Piano Academy, navigate to the corresponding exercise. Star codes are formatted as Chapter:Part:Exercise (e.g., 1:1:1 is Chapter 1, Part 1, Exercise 1).",
        starMapBullet2: "Earn Stars: Follow the book’s instructions to complete the exercise and earn stars. Return to the Star Map, click Star 1:1:1 to claim your stars. If you over-click, keep clicking to reset.",
        starMapBullet3: "Progress Gradually: Practice an exercise, then move to the next star on the map.",
        starMapBullet4: "Daily Practice: Each day, revisit your active exercises, aiming for six stars in each.",
        starMapBullet5: "Manage Active Exercises: Work on 4–6 exercises daily, but focus on completing each (six stars) before adding more."
    },
    sv: {
        menuFrontPage: "Stjärnöversikt",
        menuChapter: "Kapitel",
        menuStudents: "För lärare",
        menuStarMap: "Stjärnkartan",
        menuChapters: "Kapitel",
        menuFAQ: "Vanliga frågor",
        menuRemove: "Radera elev",
        popupWelcome: "Välkommen till Nordstjärnans Pianoakademi!",
        popupIntro: "Du har nu påbörjat din pianoresa som en Upptäckare! Stjärnkartan är din guide – den visar dig vilken övning du ska göra härnäst medan du navigerar dig fram genom bokens sju kapitel, samlar stjärnor och klättrar i rang, från Stjärnkadett till Stjärnofficer och vidare.",
        popupTeacherNote: "Du kan också fokusera på ett specifikt kapitel om du vill bli extra bra på t.ex. skalor eller ackord. Besök kapitel-sidorna för att börja samla stjärnor, se dina framsteg på Stjärnöversikt-sidan, eller hantera elever på sidan För lärare.",
        popupEnterName: "Låt oss sätta igång – skriv in ditt namn nedan för att starta ditt äventyr!",
        rankExplorer: "Upptäckare",
        rankStarCadet: "Stjärnkadett",
        rankStarOfficer: "Stjärnofficer",
        rankStarCaptain: "Stjärnkapten",
        rankStarCommander: "Stjärnkommendör",
        rankStarAdmiral: "Stjärnamiral",
        rankAchievementMessage: "Grattis [userName]!",
        rankAchievementSubtitle: "Du har uppnått rangen Stjärnkadett!",
        textboxExplorer: "Ditt pianoäventyr har startat, och du upptäcker noter, skalor, ackord och arpeggion i din egen takt. Klarar du 16 övningar blir du Stjärnkadett!",
        textboxStarCadet: "Du har visat järnvilja och samlat sex stjärnor i 16 övningar i Nordstjärnans Pianoakademi. Klarar du del 1 i alla sju kapitel blir du Stjärnofficer!",
        textboxStarOfficer: "Med stort fokus och noggrannhet har du lärt dig tangentnamn, skalor, grundackord och flera stycken. Var stolt, för nu är du Stjärnofficer i Nordstjärnans Pianoakademi – klara av del 2 i alla kapitel och bli Stjärnkapten!",
        textboxStarCaptain: "Med stort fokus har du lärt dig notläsning och kan nu spela låtar med ackord och framföra klassiska verk. Var stolt, för nu är du Stjärnkapten i Nordstjärnans Pianoakademi – klara av del 3 i alla kapitel och bli Stjärnkommendör!",
        textboxStarCommander: "Du har fått bra grepp om ackord och arpeggion i alla omvändningar och kan spela skalor, känna igen intervall och framföra hela konserter på egen hand. Var stolt, för nu är du Stjärnkommendör i Nordstjärnans Pianoakademi – klara av del 4 i alla kapitel och bli Stjärnamiral!",
        textboxStarAdmiral: "Dina ansträngningar och ditt fokus har gjort dig till en pianovirtuos. Du är Stjärnamiral i Nordstjärnans Pianoakademi, härskare över alla kapitel.",
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
        studentsLabel: "Elever",
        addNewStudent: "Lägg till en ny elev",
        addStudentSuccess: "Ny stjärnelev skapad!",
        addStudentDuplicate: "Elevnamnet finns redan! Välj ett annat namn.",
        addStudentNoName: "Vänligen ange ett namn!",
        notesLabel: "Anteckningar",
        notesPlaceholder: "Skriv dina anteckningar om läxor m.m. här. (De sparas automatiskt)",
        saveNotesButton: "Spara anteckningar",
        congratsMessage: "🌟 Grattis! Du har slutfört Stjärnkartan! 🌟",
        faqTitle: "Vanliga frågor",
        faqQ1: "Hur använder jag Stjärnkartan?",
        faqA1: "Gå till Stjärnkartan i menyn och scrolla till vänster för att se en förklaring till hur du använder stjärnkartan.",
        faqQ2: "Kan jag lägga till mina elever och finns det en gräns för hur många jag kan lägga till?",
        faqA2: "Ja, du kan lägga till elever i För lärare: skriv elevens namn, tryck Lägg till, och skifta mellan elever när du vill i menyn—data sparas lokalt och automatiskt. Det finns ingen gräns för hur många elever du kan lägga till!",
        faqQ3: "Kan jag dela en elevs framsteg med dem, om de vill se sina stjärnor på sin egen iPad?",
        faqA3: "Ja, du kan dela en elevs framsteg! På För lärare-sidan, välj eleven och generera en delningslänk eller QR-kod. Eleven kan skanna QR-koden med sin iPads kameraapp för att importera sina framsteg, eller så kan du skicka importlänken via SMS, e-post eller AirDrop för att de ska kunna öppna den på sin enhet. När framstegen är importerade kan de se sina stjärnor och framsteg på sin egen iPad och även klicka på nya stjärnor själva—era konton är inte länkade. Vid nästa lektion kan du exportera elevens data igen till deras iPad, och din version kommer att skriva över elevens version, så att deras framsteg hålls uppdaterade med dina register.",
        faqQ4: "Varför kan jag inte klicka på stjärnorna på Stjärnöversikt-sidan?",
        faqA4: "Stjärnorna på rangmärket i Stjärnöversikt är inte klickbara – de tänds automatiskt när du samlar stjärnor på Kapitel-sidorna och i Stjärnkartan.",
        faqQ5: "Hur fungerar rangsystemet i Nordstjärnans Pianoakademi?",
        faqA5: "Rangmärket har ett nedre fält med 16 små stjärnor. För varje övning som du slutför (får 6 stjärnor på) – tänds en av dessa små stjärnor. När det nedre fältet är fullt uppnår du Stjärnkadett-rangen, och märket till höger uppdateras från tomma stjärnor till gyllene stjärnor. I rangmärket finns också fyra chevroner, där varje chevron har stora stjärnor som tänds när du slutför alla fyra övningar i en Del. Den första chevronens sju stjärnor motsvarar Del 1 i alla sju kapitel, den andra chevronen Del 2, och så vidare. När du fyller en chevron med stjärnor klättrar du i rang: du blir Stjärnofficer efter Del 1, Stjärnkapten efter Del 2, Stjärnkommendör efter Del 3 och når du den högsta rangen, efter Del 4, blir du Stjärnamiral. Märket till höger får en motsvarande chevron för varje Del du slutför, vilket visar din nuvarande rang!",
        faqQ6: "Hur mycket tid bör jag lägga på att öva varje dag?",
        faqA6: "Vi rekommenderar att du övar 15–30 minuter per dag utöver den tid du lägger på stycken, beroende på din nivå och ålder. Nybörjare kan börja med 15 minuter, medan mer avancerade elever kan sikta på 30 minuter. Försök att öva varje dag för att göra stadiga framsteg, och fokusera på dina aktiva övningar för att tjäna stjärnor.",
        faqQ7: "Kan jag använda Nordstjärnans Pianoakademi om jag redan kan spela piano, och hur avancerade är övningarna?",
        faqA7: "Ja, om du redan kan spela piano kan du ändå använda Nordstjärnans Pianoakademi! Övningarna är uppdelade i fyra delar med olika nivåer: Del 1 är för nybörjare, Del 2 är för något mer erfarna elever, Del 3 är för avancerade elever, och Del 4 är överlag väldigt avancerade övningar för erfarna pianister. Börja med övningar som matchar din nivå eller starta från början för att samla några lätta stjärnor. Samla stjärnor för att klättra i rang och förbättra dina färdigheter, oavsett din nivå!",
        faqQ8: "Hur många ranger finns det?",
        faqA8: "Det finns sex ranger i Nordstjärnans Pianoakademi: Upptäckare, Stjärnkadett, Stjärnofficer, Stjärnkapten, Stjärnkommendör och Stjärnamiral. Du klättrar i rang genom att tjäna stjärnor i övningar, och den högsta rangen, Stjärnamiral, uppnår du genom att få sex stjärnor på alla övningar i alla kapitel.",
        faqQ9: "Behöver jag ett piano för att använda Nordstjärnans Pianoakademi?",
        faqA9: "För att använda Nordstjärnans Pianoakademi behöver du tillgång till ett piano eller ett keyboard för att öva på övningarna i Nordstjärnans Pianoakademi. Ett keyboard med minst 61 tangenter fungerar bra för nybörjare, men ett piano är idealiskt för att utveckla rätt teknik. Du behöver inte äga ett piano—du kan använda ett på en skola eller hyra ett om det behövs.",
        faqQ10: "Vad gör jag om jag har tekniska problem med hemsidan?",
        faqA10: "Om du har tekniska problem med hemsidan, prova att ladda om sidan eller kontrollera din internetanslutning. Om problemet kvarstår, kontakta oss på nordstjarnanspianoakademi@gmail.com så hjälper vi dig. Se också till att inte rensa webbläsarens cache, eftersom det tar bort dina framsteg.",
        faqQ11: "Kan jag skicka förslag och frågor?",
        faqA11: "Ja, maila gärna: nordstjarnanspianoakademi@gmail.com",
        faqQ12: "Varför försvann mina framsteg?",
        faqA12: "Om du har rensat din historik i din webbläsare så försvann all data som visar stjärnor eftersom denna lagras i webbläsarens cacheminne. Om du har importerat en användare med ditt namn från en annan enhet via en länk eller QR-kod som skapats på För lärare-sidan så har din användare skrivits över av den importerade användaren.",
        exportTitle: "Exportera elevdata",
        exportInfo: "Genom att trycka på knappen nedan kan du dela den aktuella eleven till en annan enhet. Mottagaren behöver bara öppna länken – eleven läggs automatiskt till!",
        creatingLink: "Skapar länk, vänta…",
        copyLinkSuccess: "Länk kopierad till urklipp! Klistra in för att dela.",
        scanOrShare: "Skanna QR-koden eller...",
        shareButtonExport: "Dela via AirDrop / Meddelande / QR-kod",
        shareButtonQR: "Dela elev via AirDrop / Meddelande",
        removeStudentTitle: "Radera elev",
        removeStudentButton: "Radera elev",
        confirmRemoveMessage: "Tryck på knappen nedan för att radera ",
        confirmRemoveButton: "Radera ",
        removeCurrentStudent: "Radera aktuell elev: ",
        removeCurrentStudentNone: "Radera aktuell elev: Ingen",
        starMapDescription: "Välkommen till Stjärnkartan! Klicka på varje stjärna för att följa dina framsteg i Nordstjärnans Pianoakademi. Förtjäna upp till sex stjärnor per övning genom att öva i Pianoakademin. Scrolla för att utforska alla kapitel och övningar.",
        starMapTitle: "Såhär använder du Stjärnkartan",
        starMapBullet1: "Börja med Stjärna 1:1:1: Navigera till övning 1:1:1 i Nordstjärnans Pianoakademi. Stjärnkoder anges som Kapitel:Del:Övning (t.ex. 1:1:1 är Kapitel 1, Del 1, Övning 1).",
        starMapBullet2: "Förtjäna stjärnor: Följ bokens instruktioner för att slutföra övningen och få stjärnor. Återvänd till Stjärnkartan, klicka på Stjärna 1:1:1 för att få fram dina stjärnor. Klickar du för många, fortsätt klicka för att nollställa.",
        starMapBullet3: "Öva lagom: Öva på en övning en stund, gå sedan vidare till nästa stjärna på kartan.",
        starMapBullet4: "Daglig övning: Återkom till dina aktiva övningar varje dag och sikta på sex stjärnor i varje.",
        starMapBullet5: "Hur många aktiva övningar?: Jobba på flera övningar dagligen, t.ex. 4–6 st, men se till att slutföra en övning (sex stjärnor) innan du lägger till fler."
    }
};

const menuHtml = `
    <nav class="hamburger-nav">
        <div class="menu" id="main-menu">
            <div class="student-select-container">
                <select id="globalStudentSelect"></select>
            </div>
            <div class="menu-content">
                <a href="index.html" class="menu-link" data-translate="menuFrontPage"></a>
                <a href="starmap.html#svg-start" class="menu-link" data-translate="menuStarMap"></a>
                <div class="menu-item">
                    <span class="chapters-toggle" data-translate="menuChapters"></span>
                    <ul class="submenu">
                        <li><a href="chapter1.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                        <li><a href="chapter2.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                        <li><a href="chapter3.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                        <li><a href="chapter4.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                        <li><a href="chapter5.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                        <li><a href="chapter6.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                        <li><a href="chapter7.html" class="menu-link"><span data-translate="menuChapter"></span></a></li>
                    </ul>
                </div>
                <a href="students.html" class="menu-link" data-translate="menuStudents"></a>
                <a href="remove.html" class="menu-link" data-translate="menuRemove"></a>
                <a href="faq.html" class="menu-link" data-translate="menuFAQ"></a>
                <div class="language-switcher">
                    <span class="flag" onclick="switchLanguage('en')">🇬🇧</span>
                    <span class="flag" onclick="switchLanguage('sv')">🇸🇪</span>
                </div>
            </div>
        </div>
    </nav>
`;

function injectMenu() {
    console.log('injectMenu called');
    const placeholder = document.getElementById('menu-placeholder');
    if (!placeholder) {
        console.error('Menu placeholder not found');
        return;
    }

    placeholder.innerHTML = menuHtml;
    console.log('Menu HTML injected');

    const hamburger = document.getElementById('menuButton');
    const menu = document.querySelector('.menu');

    if (!hamburger || !menu) {
        console.error('Menu elements missing:', { hamburger: !!hamburger, menu: !!menu });
        return;
    }

    console.log('Menu initialized with left: -250px via CSS');

    // Remove existing listeners to prevent duplicates
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);

    newHamburger.addEventListener('click', () => {
        console.log('Hamburger clicked');
        const isExpanded = newHamburger.getAttribute('aria-expanded') === 'true';
        newHamburger.setAttribute('aria-expanded', !isExpanded);
        newHamburger.classList.toggle('active');
        if (!isExpanded) {
            menu.classList.add('active');
            menu.animate([{ left: '-250px' }, { left: '0' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' });
            console.log('Menu opened');
            // Refresh the dropdown when opening the menu
            if (typeof updateDropdown === 'function') {
                console.log('Calling updateDropdown when menu opens');
                updateDropdown();
            }
        } else {
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
                console.log('Menu closed');
            };
        }
    });

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', () => {
            console.log(`Menu link clicked: ${link.getAttribute('href')}`);
            newHamburger.setAttribute('aria-expanded', 'false');
            newHamburger.classList.remove('active');
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
                console.log('Menu closed after link click');
            };
        });
    });

    document.addEventListener('click', (e) => {
        if (!newHamburger.contains(e.target) && !menu.contains(e.target)) {
            console.log('Clicked outside menu');
            newHamburger.setAttribute('aria-expanded', 'false');
            newHamburger.classList.remove('active');
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
                console.log('Menu closed due to outside click');
            };
        }
    });

    const chaptersToggle = document.querySelector('.chapters-toggle');
    const submenu = document.querySelector('.submenu');
    if (chaptersToggle && submenu) {
        chaptersToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Chapters toggle clicked');
            const isSubmenuOpen = submenu.classList.contains('open');
            if (isSubmenuOpen) {
                submenu.classList.remove('open');
                console.log('Submenu closed');
            } else {
                submenu.style.display = 'block';
                submenu.offsetHeight; // Force reflow
                submenu.classList.add('open');
                console.log('Submenu opened');
            }
            chaptersToggle.parentElement.classList.toggle('active');
        });
    } else {
        console.warn('Chapters toggle or submenu not found:', { chaptersToggle: !!chaptersToggle, submenu: !!submenu });
    }

    const lang = localStorage.getItem('language') || 'sv';
    switchLanguage(lang);
    setActivePage();
}

function checkAndShowRankAchievementPopup(sixStarCount, previousSixStarCount, fromStarClick) {
    let studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const currentStudent = studentsData.currentStudent;

    if (!currentStudent || !studentsData.students[currentStudent]) {
        console.log('No current student or student data found:', { currentStudent, studentsData });
        return;
    }

    const language = localStorage.getItem('language') || 'sv';

    console.log('Checking rank achievement popup:', { sixStarCount, previousSixStarCount, fromStarClick });

    // Only show popup if triggered by a star click and transitioning to 16
    if (fromStarClick && sixStarCount === 16 && previousSixStarCount < 16) {
        const rankPopup = document.getElementById('rankAchievementPopup');
        const rankMessage = document.getElementById('rankAchievementMessage');
        const rankSubtitle = document.getElementById('rankAchievementSubtitle');
        const rankPopupDescription = document.getElementById('rankAchievementDescription');
        const rankImage = document.querySelector('#rankAchievementPopup .rank-badge-image');

        if (rankPopup && rankMessage && rankSubtitle && rankPopupDescription && rankImage) {
            console.log('Showing rank achievement popup for Star Cadet');
            rankMessage.textContent = translations[language].rankAchievementMessage.replace('[userName]', currentStudent);
            rankSubtitle.textContent = translations[language].rankAchievementSubtitle;
            rankPopupDescription.textContent = translations[language].textboxStarCadet;
            rankImage.src = 'rank0.png';

            setTimeout(() => {
                rankPopup.style.display = 'flex';
                document.body.classList.add('popup-open');
                const rect = rankPopup.getBoundingClientRect();
                console.log('Rank popup displayed:', {
                    display: rankPopup.style.display,
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left
                });
            }, 100);

            const closePopup = () => {
                console.log('Closing rank popup');
                rankPopup.style.display = 'none';
                document.body.classList.remove('popup-open');
            };

            const closeButton = document.getElementById('closeRankPopup');
            if (closeButton) {
                closeButton.removeEventListener('click', closePopup);
                closeButton.addEventListener('click', closePopup);
            }

            rankPopup.removeEventListener('click', window.rankPopupClickListener);
            window.rankPopupClickListener = (event) => {
                console.log('Click event on rankPopup, target:', event.target);
                if (event.target === rankPopup) {
                    closePopup();
                }
            };
            rankPopup.addEventListener('click', window.rankPopupClickListener);
        } else {
            console.log('Popup elements not found:', {
                rankPopup: !!rankPopup,
                rankMessage: !!rankMessage,
                rankSubtitle: !!rankSubtitle,
                rankPopupDescription: !!rankPopupDescription,
                rankImage: !!rankImage
            });
        }
    } else {
        console.log('Popup not triggered:', { sixStarCount, previousSixStarCount, fromStarClick });
    }
}

function updateStarStates(studentsDataParam, fromStarClick = false) {
    const studentsData = studentsDataParam || JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
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
        if (state === "6") sixStarCount++;
    });

    console.log('Updating star states:', { sixStarCount, previousSixStarCount, fromStarClick });

    checkAndShowRankAchievementPopup(sixStarCount, previousSixStarCount, fromStarClick);
    previousSixStarCount = sixStarCount;
    localStorage.setItem('sixStarCount', sixStarCount);

    for (let i = 1; i <= 16; i++) {
        const bottomStar = document.getElementById(`bottom_star${i}`);
        if (bottomStar) {
            console.log(`Found bottom_star${i}`);
            if (i <= sixStarCount) {
                bottomStar.setAttribute("fill", "#ffd700");
                bottomStar.setAttribute("stroke", "#000000");
                bottomStar.setAttribute("stroke-width", "1");
            } else {
                bottomStar.setAttribute("fill", "#000000");
                bottomStar.removeAttribute("stroke");
                bottomStar.removeAttribute("stroke-width");
            }
        } else {
            console.warn(`bottom_star${i} not found`);
        }
    }

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
            console.log(`Found ${chevronStar}`);
            const allSix = exercises.every(exercise => progress[exercise] === "6");
            if (allSix) {
                star.setAttribute("fill", "#ffd700");
                star.setAttribute("stroke", "#000000");
                star.setAttribute("stroke-width", "1");
            } else {
                star.setAttribute("fill", "#000000");
                star.removeAttribute("stroke");
                star.removeAttribute("stroke-width");
            }
        } else {
            console.warn(`${chevronStar} not found`);
        }
    }

    const rankImage = document.getElementById('rankImage');
    const rankTitle = document.getElementById('rankTitle');
    const rankDescription = document.getElementById('rankDescription');

    if (rankImage && rankTitle && rankDescription) {
        const lang = localStorage.getItem('language') || 'sv';
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
        } else if (chevron3Complete) {
            rankImage.src = 'rank3.png';
            newRank = translations[lang].rankStarCommander;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarCommander;
        } else if (chevron2Complete) {
            rankImage.src = 'rank2.png';
            newRank = translations[lang].rankStarCaptain;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarCaptain;
        } else if (chevron1Complete) {
            rankImage.src = 'rank1.png';
            newRank = translations[lang].rankStarOfficer;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarOfficer;
        } else if (sixStarCount >= 16) {
            rankImage.src = 'rank0.png';
            newRank = translations[lang].rankStarCadet;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxStarCadet;
        } else {
            rankImage.src = 'rank-start.png';
            newRank = translations[lang].rankExplorer;
            rankTitle.textContent = newRank;
            rankDescription.textContent = translations[lang].textboxExplorer;
        }

        if (studentsData.currentStudent) {
            studentsData.students[studentsData.currentStudent].rank = newRank;
            localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
        }
    }
}

function switchLanguage(lang) {
    const newLang = lang || (localStorage.getItem('language') === 'sv' ? 'en' : 'sv');
    localStorage.setItem('language', newLang);

    document.querySelectorAll('.menu-link').forEach(link => {
        const href = link.getAttribute('href')?.toLowerCase();
        if (href === 'index.html') {
            link.textContent = translations[newLang].menuFrontPage;
        } else if (href === 'students.html') {
            link.textContent = translations[newLang].menuStudents;
        } else if (href === 'starmap.html#svg-start') {
            link.textContent = translations[newLang].menuStarMap;
        } else if (href === 'faq.html') {
            link.textContent = translations[newLang].menuFAQ;
        } else if (href === 'remove.html') {
            link.textContent = translations[newLang].menuRemove;
        } else {
            const chapterNum = href?.match(/chapter(\d+)\.html/)?.[1];
            if (chapterNum) {
                const span = link.querySelector('span');
                if (span) span.textContent = `${translations[newLang].menuChapter} ${chapterNum}`;
                else link.textContent = `${translations[newLang].menuChapter} ${chapterNum}`;
            }
        }
    });

    const chaptersToggle = document.querySelector('.chapters-toggle');
    if (chaptersToggle) chaptersToggle.textContent = translations[newLang].menuChapters;

    const popupWelcome = document.getElementById('popupWelcome');
    const popupIntro = document.getElementById('popupIntro');
    const popupTeacherNote = document.getElementById('popupTeacherNote');
    const popupEnterName = document.getElementById('popupEnterName');
    const submitNameButton = document.getElementById('submitNameButton');
    if (popupWelcome) popupWelcome.textContent = translations[newLang].popupWelcome;
    if (popupIntro) popupIntro.textContent = translations[newLang].popupIntro;
    if (popupTeacherNote) popupTeacherNote.textContent = translations[newLang].popupTeacherNote;
    if (popupEnterName) popupEnterName.textContent = translations[newLang].popupEnterName;
    if (submitNameButton) submitNameButton.textContent = translations[newLang].addButton;

    const congratsMessage = document.getElementById('congratsMessage');
    if (congratsMessage) congratsMessage.textContent = translations[newLang].congratsMessage;

    const qrInstruction = document.getElementById('qrInstruction');
    if (qrInstruction) qrInstruction.textContent = translations[newLang].scanOrShare;

    const chapterNumber = document.querySelector('.chapter-number');
    const chapterName = document.querySelector('.chapter-name');
    if (chapterNumber && chapterName) {
        const chapterNum = window.location.pathname.match(/chapter(\d+)\.html/)?.[1];
        if (chapterNum) {
            chapterNumber.textContent = translations[newLang][`chapter${chapterNum}`];
            chapterName.textContent = translations[newLang][`chapterName${chapterNum}`];
        }
    }

    const rankTitle = document.getElementById('rankTitle');
    const rankDescription = document.getElementById('rankDescription');
    if (rankTitle && rankDescription) updateStarStates();

    const studentsPageTitle = document.getElementById('studentsPageTitle');
    const studentsLabel = document.getElementById('studentsLabel');
    const newStudentInput = document.getElementById('newStudentName');
    const addButton = document.getElementById('addStudentButton');
    const addStudentLabel = document.getElementById('addStudentLabel');
    const notesLabel = document.getElementById('notesLabel');
    const studentNotes = document.getElementById('studentNotes');
    const saveNotesButton = document.getElementById('saveNotesButton');
    if (studentsPageTitle && studentsLabel) {
        studentsPageTitle.textContent = translations[newLang].menuStudents;
        studentsLabel.textContent = translations[newLang].studentsLabel;
        newStudentInput.placeholder = translations[newLang].studentNamePlaceholder;
        addButton.textContent = translations[newLang].addButton;
        addStudentLabel.textContent = translations[newLang].addNewStudent;
        notesLabel.textContent = translations[newLang].notesLabel;
        studentNotes.placeholder = translations[newLang].notesPlaceholder;
        if (saveNotesButton) saveNotesButton.textContent = translations[newLang].saveNotesButton;
    }

    const faqTitle = document.querySelector('h1[data-translate="menuFAQ"]');
    const faqQuestions = document.querySelectorAll('.faq-question[data-translate]');
    const faqAnswers = document.querySelectorAll('.faq-answer[data-translate]');
    if (faqTitle) faqTitle.textContent = translations[newLang].menuFAQ;
    faqQuestions.forEach(question => {
        const key = question.getAttribute('data-translate');
        if (translations[newLang][key]) question.childNodes[0].textContent = translations[newLang][key];
    });
    faqAnswers.forEach(answer => {
        const key = answer.getAttribute('data-translate');
        if (translations[newLang][key]) answer.textContent = translations[newLang][key];
    });

    const titleContainerH1 = document.querySelector('.title-container h1[data-translate]');
    if (titleContainerH1) {
        const key = titleContainerH1.getAttribute('data-translate');
        if (translations[newLang][key]) titleContainerH1.textContent = translations[newLang][key];
    }

    // Remove page translations
    const removeStudentTitle = document.querySelector('h1[data-translate="removeStudentTitle"]');
    const confirmRemoveMessage = document.querySelector('p[data-translate="confirmRemoveMessage"]');
    if (removeStudentTitle) removeStudentTitle.textContent = translations[newLang].removeStudentTitle;
    if (confirmRemoveMessage) {
        const selectedStudent = window.studentsData.currentStudent || '';
        confirmRemoveMessage.textContent = `${translations[newLang].confirmRemoveMessage}${selectedStudent ? ` ${selectedStudent}.` : '.'}`;
    }

    // Update the removeStudentButton text dynamically
    const removeStudentButton = document.getElementById('removeStudentButton');
    if (removeStudentButton && window.studentsData) {
        if (window.studentsData.currentStudent) {
            removeStudentButton.textContent = `${translations[newLang].removeCurrentStudent}${window.studentsData.currentStudent}`;
        } else {
            removeStudentButton.textContent = translations[newLang].removeCurrentStudentNone;
        }
    }

    // Star Map description
    const starMapTitle = document.querySelector('h3[data-translate="starMapTitle"]');
    if (starMapTitle) starMapTitle.textContent = translations[newLang].starMapTitle;
    document.querySelectorAll('.star-map-steps p[data-translate]').forEach(p => {
        const key = p.getAttribute('data-translate');
        if (translations[newLang][key]) {
            const translatedText = translations[newLang][key];
            const match = translatedText.match(/^(.*?)(?=\s[A-Z])/);
            if (match) {
                const semiTitle = match[0];
                const restOfText = translatedText.substring(semiTitle.length).trim();
                p.innerHTML = `<span class="semi-title"><strong>${semiTitle}</strong></span> ${restOfText}`;
            } else {
                p.textContent = translatedText;
            }
        }
    });

    // Export section (students.html)
    const exportTitle = document.getElementById('exportTitle');
    const exportInfo = document.getElementById('exportInfo');
    const shareExportButton = document.getElementById('shareExportButton');
    const shareButtonInQR = document.getElementById('shareButtonInQR');
    const exportStatus = document.getElementById('exportStatus');
    if (exportTitle) exportTitle.textContent = translations[newLang].exportTitle;
    if (exportInfo) exportInfo.textContent = translations[newLang].exportInfo;
    if (shareExportButton) shareExportButton.textContent = translations[newLang].shareButtonExport;
    if (shareButtonInQR) shareButtonInQR.textContent = translations[newLang].shareButtonQR;
    if (exportStatus) exportStatus.textContent = translations[newLang].creatingLink;

    // Update rank achievement popup if visible
    const rankPopup = document.getElementById('rankAchievementPopup');
    const rankMessage = document.getElementById('rankAchievementMessage');
    const rankSubtitle = document.getElementById('rankAchievementSubtitle');
    const rankPopupDescription = document.getElementById('rankAchievementDescription');
    const currentStudent = window.studentsData?.currentStudent || '';
    if (rankPopup && rankMessage && rankSubtitle && rankPopupDescription && rankPopup.style.display === 'flex') {
        rankMessage.textContent = translations[newLang].rankAchievementMessage.replace('[userName]', currentStudent);
        rankSubtitle.textContent = translations[newLang].rankAchievementSubtitle;
        rankPopupDescription.textContent = translations[newLang].textboxStarCadet;
    }

    // Update user name display
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) {
        userNameDisplay.textContent = window.studentsData?.currentStudent || '';
    }
}

function setInitialLanguage() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    let lang = hash === 'swedish' ? 'sv' : hash === 'english' ? 'en' : null;
    if (!lang) lang = localStorage.getItem('language') || 'sv';
    switchLanguage(lang);
}

function setActivePage() {
    const currentPath = window.location.pathname.toLowerCase();
    const links = document.querySelectorAll('.menu-link');
    links.forEach(link => {
        const href = link.getAttribute('href')?.toLowerCase();
        if (href && (currentPath.endsWith(href.replace('#svg-start', '')) || (currentPath === '/' && href === 'index.html'))) {
            link.classList.add('active-page');
        }
    });
}

function handleUserNamePopup() {
    let studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };
    const userNameDisplay = document.getElementById('userNameDisplay');
    const namePopup = document.getElementById('namePopup');
    const nameInput = document.getElementById('nameInput');
    const menu = document.querySelector('.menu');

    if (namePopup && nameInput) {
        const updateMenuHeight = () => {
            if (menu) {
                menu.style.height = `${window.innerHeight}px`;
            }
        };

        window.addEventListener('resize', updateMenuHeight);
        window.addEventListener('orientationchange', updateMenuHeight);

        if (!studentsData.currentStudent) {
            console.log('Showing namePopup for new user');
            namePopup.style.display = 'flex';
            document.body.classList.add('popup-open');
            const rect = namePopup.getBoundingClientRect();
            console.log('Name popup displayed:', {
                display: namePopup.style.display,
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left
            });
            updateMenuHeight();
        } else if (userNameDisplay) {
            userNameDisplay.textContent = studentsData.currentStudent;
            console.log('Set userNameDisplay to:', studentsData.currentStudent);
        }

        window.saveName = function() {
            const name = nameInput.value.trim();
            if (name) {
                studentsData.students[name] = {
                    name: name,
                    progress: {},
                    rank: "Explorer"
                };
                for (let chapter = 1; chapter <= 7; chapter++) {
                    for (let part = 1; part <= 4; part++) {
                        for (let exercise = 1; exercise <= 4; exercise++) {
                            const key = `exercise${chapter}:${part}:${exercise}`;
                            studentsData.students[name].progress[key] = "0";
                        }
                    }
                }
                studentsData.currentStudent = name;
                localStorage.setItem('starAcademyStudents', JSON.stringify(studentsData));
                if (userNameDisplay) userNameDisplay.textContent = name;
                namePopup.style.display = 'none';
                document.body.classList.remove('popup-open');
                updateMenuHeight();

                const successPopup = document.createElement('div');
                successPopup.id = 'studentPopup';
                successPopup.className = 'student-popup';
                const starSVG = '<svg class="popup-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                successPopup.innerHTML = `
                    <div class="student-popup-content">
                        <p>${starSVG} ${translations[localStorage.getItem('language') || 'sv'].addStudentSuccess} ${starSVG}</p>
                    </div>
                `;
                document.body.appendChild(successPopup);
                successPopup.style.display = 'flex';
                successPopup.style.opacity = '1';
                document.body.classList.add('popup-open');
                updateMenuHeight();
                setTimeout(() => {
                    successPopup.style.transition = 'opacity 1s ease';
                    successPopup.style.opacity = '0';
                    setTimeout(() => {
                        successPopup.style.display = 'none';
                        document.body.classList.remove('popup-open');
                        document.body.removeChild(successPopup);
                        updateMenuHeight();
                    }, 1000);
                }, 2000);

                if (typeof updateDropdown === 'function') {
                    console.log('Calling updateDropdown after saving name');
                    updateDropdown();
                } else {
                    console.error('updateDropdown not defined');
                }

                updateStarStates();
                if (window.location.pathname.toLowerCase().includes('starmap.html') && typeof window.initializeStarMap === 'function') {
                    console.log('Calling initializeStarMap after saving name');
                    window.initializeStarMap();
                }
            } else {
                alert(translations[localStorage.getItem('language') || 'sv'].addStudentNoName);
            }
        };

        // Remove existing listeners to prevent duplicates
        const submitBtn = document.querySelector('button[onclick="saveName()"]');
        if (submitBtn) {
            submitBtn.removeEventListener('click', window.saveName);
            submitBtn.addEventListener('click', window.saveName);
            console.log('Submit button listener added');
        }
        if (nameInput) {
            nameInput.removeEventListener('keypress', handleEnterKey);
            nameInput.addEventListener('keypress', handleEnterKey);
            function handleEnterKey(e) {
                if (e.key === 'Enter') window.saveName();
            }
            console.log('Enter key listener added');
        }

        // Overlay click listener (non-closing per design)
        namePopup.removeEventListener('click', window.namePopupClickListener);
        window.namePopupClickListener = (event) => {
            console.log('Click event on namePopup, target:', event.target);
            if (event.target === namePopup) {
                console.log('Ignoring overlay click for namePopup to prevent accidental closure');
            }
        };
        namePopup.addEventListener('click', window.namePopupClickListener);
    } else {
        console.error('namePopup or nameInput not found:', { namePopup: !!namePopup, nameInput: !!nameInput });
    }
}

function waitForDOM() {
    return new Promise(resolve => {
        if (document.readyState === 'complete') resolve();
        else {
            window.addEventListener('load', () => setTimeout(resolve, 0));
            document.addEventListener('DOMContentLoaded', () => {
                if (document.readyState === 'complete') resolve();
            });
        }
    });
}

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            if (isActive) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    faqAnswer.style.maxHeight = '0';
                    faqItem.classList.remove('active');
                });
            } else {
                faqAnswer.style.display = 'block';
                const fullHeight = faqAnswer.scrollHeight + 20;
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = fullHeight + 'px';
                faqAnswer.addEventListener('transitionend', function resetHeight() {
                    faqAnswer.style.maxHeight = '200px';
                    faqAnswer.removeEventListener('transitionend', resetHeight);
                }, { once: true });
            }
        });
    });
}

function initializeRemovePage() {
    console.log('initializeRemovePage called');

    // Prevent re-initialization
    if (window.removePageInitialized) {
        console.log('remove.html already initialized, skipping');
        return;
    }
    window.removePageInitialized = true;

    // Ensure window.studentsData is initialized
    window.studentsData = window.studentsData || JSON.parse(localStorage.getItem('starAcademyStudents')) || {
        students: {},
        currentStudent: ''
    };
    console.log('window.studentsData on remove.html:', window.studentsData);

    // Initialize elements
    const removeButton = document.getElementById('removeStudentButton');
    const confirmRemovePopup = document.getElementById('confirmRemovePopup');
    const confirmRemoveMessage = document.getElementById('confirmRemoveMessage');
    let confirmRemoveButton = document.getElementById('confirmRemoveButton');
    const closeConfirmRemovePopup = document.getElementById('closeConfirmRemovePopup');
    let lang = localStorage.getItem('language') || 'sv';

    if (!removeButton || !confirmRemovePopup || !confirmRemoveMessage || !confirmRemoveButton || !closeConfirmRemovePopup) {
        console.error('One or more required elements not found on remove.html');
        return;
    }

    // Store popup state
    let popupOpen = false;
    let currentPopupStudent = null;

    // Function to update the button text
    const updateButtonText = () => {
        if (window.studentsData.currentStudent) {
            removeButton.textContent = `${translations[lang].removeCurrentStudent}${window.studentsData.currentStudent}`;
        } else {
            removeButton.textContent = translations[lang].removeCurrentStudentNone;
        }

        // Update popup text if the popup is open
        if (popupOpen && currentPopupStudent) {
            confirmRemoveMessage.textContent = `${translations[lang].confirmRemoveMessage}${currentPopupStudent}.`;
            confirmRemoveButton.textContent = `${translations[lang].confirmRemoveButton}${currentPopupStudent}`;
        }
    };

    // Initial button text update
    updateButtonText();

    // Fallback to update button text periodically
    let lastKnownUser = window.studentsData.currentStudent;
    const checkUserChange = setInterval(() => {
        if (window.studentsData.currentStudent !== lastKnownUser) {
            lastKnownUser = window.studentsData.currentStudent;
            updateButtonText();
        }
    }, 500);

    // Clean up interval when leaving the page
    window.addEventListener('unload', () => {
        clearInterval(checkUserChange);
    });

    // Listen for language changes
    window.addEventListener('storage', (event) => {
        if (event.key === 'language') {
            lang = localStorage.getItem('language') || 'sv';
            updateButtonText();
        } else if (event.key === 'starAcademyStudents') {
            window.studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || {
                students: {},
                currentStudent: ''
            };
            updateButtonText();
        }
    });

    if (removeButton) {
        removeButton.addEventListener('click', () => {
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

                    // Update the button text
                    updateButtonText();

                    // Reset popup state
                    popupOpen = false;
                    currentPopupStudent = null;

                    // Hide the popup
                    confirmRemovePopup.style.display = 'none';
                }
            });
        });
    }

    // Handle closing the popup by clicking outside
    confirmRemovePopup.addEventListener('click', (e) => {
        if (!confirmRemovePopup.querySelector('.student-popup-content').contains(e.target)) {
            confirmRemovePopup.style.display = 'none';
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
        popupOpen = false;
        currentPopupStudent = null;

        // Clone confirmRemoveButton to remove existing listeners
        const newConfirmButton = confirmRemoveButton.cloneNode(true);
        confirmRemoveButton.parentNode.replaceChild(newConfirmButton, confirmRemoveButton);
        confirmRemoveButton = newConfirmButton;
    });
}

// Define initializeAppContent globally
window.initializeAppContent = function() {
    console.log('initializeAppContent called');
    updateStarStates();
    const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay && studentsData.currentStudent) {
        userNameDisplay.textContent = studentsData.currentStudent;
    }
};

// Main initialization
waitForDOM().then(() => {
    console.log('waitForDOM resolved');
    // Initialize previousSixStarCount from localStorage
    previousSixStarCount = parseInt(localStorage.getItem('sixStarCount')) || 0;
    console.log('Initialized previousSixStarCount:', previousSixStarCount);

    injectMenu();
    handleUserNamePopup();
    setInitialLanguage();
    
    const globalSelect = document.getElementById('globalStudentSelect');
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (globalSelect) {
        console.log('globalStudentSelect found, updating dropdown and binding change event');
        if (typeof updateDropdown === 'function') {
            updateDropdown();
        } else {
            console.error('updateDropdown not defined');
        }

        globalSelect.addEventListener('change', (event) => {
            console.log('globalStudentSelect changed');
            const selectedValue = event.target.value;
        
            if (window.location.pathname.toLowerCase().includes('starmap.html')) {
                console.log('Reloading starmap.html with new user query parameter');
                const url = new URL(window.location);
                url.searchParams.set('newUser', selectedValue);
                window.location.href = url.toString();
            } else {
                switchStudent(selectedValue);
            }
        });
    } else {
        console.error('globalStudentSelect not found after injectMenu');
    }

    if (window.location.pathname.toLowerCase().includes('starmap.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const newUser = urlParams.get('newUser');
        if (newUser) {
            console.log(`Switching to user ${newUser} from query parameter`);
            switchStudent(newUser);
            const cleanUrl = window.location.pathname + (window.location.hash || '');
            window.history.replaceState({}, document.title, cleanUrl);
        }

        const starMapContainer = document.querySelector('.star-map-container');
        const infoOverlay = document.querySelector('.info-overlay');
        if (starMapContainer && infoOverlay) {
            localStorage.setItem('infoOverlayHidden', 'false');
            console.log('Reset infoOverlayHidden to false on page load');

            window.addEventListener('pageshow', (event) => {
                if (event.persisted) {
                    console.log('Page loaded from BFCache, forcing reload...');
                    window.location.reload();
                }
            });

            if (window.starMapScrollListener) {
                starMapContainer.removeEventListener('scroll', window.starMapScrollListener);
            }

            if (window.infoOverlayClickListener) {
                infoOverlay.removeEventListener('click', window.infoOverlayClickListener);
            }

            const isMobile = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
            const scrollTarget = isMobile ? 300 : 500;
            const threshold = 50;

            let isInitialScroll = true;

            setTimeout(() => {
                starMapContainer.scrollTo({
                    left: scrollTarget,
                    behavior: 'smooth'
                });
                console.log('Scrolled to description container end after delay');
                setTimeout(() => {
                    isInitialScroll = false;
                    console.log('Initial scroll complete, enabling scroll listener');
                }, 500);
            }, 100);

            window.starMapScrollListener = () => {
                if (isInitialScroll) {
                    console.log('Ignoring scroll event during initial scroll animation');
                    return;
                }

                if (localStorage.getItem('infoOverlayHidden') === 'true') {
                    return;
                }

                const scrollLeft = starMapContainer.scrollLeft;
                if (scrollLeft > scrollTarget + threshold) {
                    infoOverlay.classList.add('hidden');
                    localStorage.setItem('infoOverlayHidden', 'true');
                    console.log('Info-overlay hidden on right-scroll');
                } else if (scrollLeft < scrollTarget - threshold) {
                    infoOverlay.classList.add('hidden');
                    localStorage.setItem('infoOverlayHidden', 'true');
                    console.log('Info-overlay hidden on left-scroll');
                } else {
                    infoOverlay.classList.remove('hidden');
                    console.log('Info-overlay visible within threshold');
                }
            };

            starMapContainer.addEventListener('scroll', window.starMapScrollListener);

            window.infoOverlayClickListener = () => {
                starMapContainer.scrollTo({ left: 0, behavior: 'smooth' });
                console.log('Info-overlay clicked, scrolling to scrollLeft = 0');
                localStorage.setItem('infoOverlayHidden', 'true');
                infoOverlay.classList.add('hidden');
            };

            infoOverlay.addEventListener('click', window.infoOverlayClickListener);

            setTimeout(() => {
                console.log('Initial scrollLeft:', starMapContainer.scrollLeft);
                if (Math.abs(starMapContainer.scrollLeft - scrollTarget) < threshold && localStorage.getItem('infoOverlayHidden') === 'false') {
                    infoOverlay.classList.remove('hidden');
                    console.log('Initial check: Info-overlay shown');
                } else {
                    console.log('Initial check: Info-overlay hidden');
                }
            }, 600);
        }
    }

    if (!window.isImporting) {
        console.log('Running initializeAppContent from waitForDOM');
        window.initializeAppContent();
    }

    if (window.location.pathname.toLowerCase().includes('starmap.html') && typeof window.initializeStarMap === 'function') {
        console.log('Navigating to starmap.html');
        const starMapSvg = document.getElementById('starMap');
        if (starMapSvg) {
            console.log('Star Map SVG found (inline)');
            const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
            if (studentsData.currentStudent) {
                console.log('Initializing Star Map');
                setTimeout(() => {
                    window.initializeStarMap();
                    if (userNameDisplay) {
                        userNameDisplay.textContent = studentsData.currentStudent || '';
                    }
                }, 100);
            } else {
                console.log('No current student, skipping Star Map initialization');
            }
        } else {
            console.error('Star Map SVG not found');
        }

        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                console.log('Page loaded from BFCache, forcing reload...');
                window.location.reload();
            }
        });
    }

    if (window.location.pathname.toLowerCase().includes('chapter') && typeof window.initializeChapter === 'function') {
        console.log('Navigating to chapter page');
        const studentsData = JSON.parse(localStorage.getItem('starAcademyStudents')) || { students: {}, currentStudent: '' };
        if (studentsData.currentStudent) {
            console.log('Initializing Chapter');
            setTimeout(() => {
                window.initializeChapter();
                if (userNameDisplay) {
                    userNameDisplay.textContent = studentsData.currentStudent || '';
                }
            }, 100);
        } else {
            console.log('No current student, skipping Chapter initialization');
        }

        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                console.log('Page loaded from BFCache, forcing reload...');
                window.location.reload();
            }
        });
    }

    if (window.location.pathname.toLowerCase().includes('faq.html')) initializeFAQ();

    if (window.location.pathname.toLowerCase().includes('remove.html')) {
        window.removePageInitialized = false;
        setTimeout(() => {
            initializeRemovePage();
        }, 100);
    }

    const header = document.querySelector('.title-container');
    if (header) {
        let initialViewportHeight = window.innerHeight;
        let reRenderInterval = null;

        const forceHeaderRender = () => {
            header.style.opacity = '0.99';
            header.offsetHeight;
            header.style.opacity = '1';
        };

        const checkKeyboardState = () => {
            const currentViewportHeight = window.innerHeight;
            if (currentViewportHeight < initialViewportHeight * 0.9) {
                if (!reRenderInterval) {
                    reRenderInterval = setInterval(forceHeaderRender, 100);
                }
            } else {
                if (reRenderInterval) {
                    clearInterval(reRenderInterval);
                    reRenderInterval = null;
                    forceHeaderRender();
                }
            }
        };

        window.addEventListener('resize', checkKeyboardState);
        window.addEventListener('orientationchange', checkKeyboardState);
        setTimeout(forceHeaderRender, 100);
    }

    const setStarMapHeight = () => {
        const starMapContainer = document.querySelector('.star-map-container');
        const titleContainer = document.querySelector('.title-container');
        const body = document.querySelector('body');
        if (starMapContainer && titleContainer && body) {
            if (!window.initialTitleHeight) {
                window.initialTitleHeight = titleContainer.getBoundingClientRect().height;
            }
            const titleHeight = window.initialTitleHeight;
            const marginTop = 10;
            const borderWidth = parseFloat(getComputedStyle(starMapContainer).borderWidth) || 0;
            const bodyBorderWidth = parseFloat(getComputedStyle(body).borderWidth) || 0;
            const totalBorderHeight = borderWidth * 2;
            const totalBodyBorderHeight = bodyBorderWidth * 2;
            const viewportHeight = window.innerHeight;
            const topPosition = titleHeight + marginTop;
            const availableHeight = viewportHeight - topPosition - totalBorderHeight - totalBodyBorderHeight - 10;
            const maxHeight = Math.min(600, availableHeight);
            const isMobile = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
            const isIPad = window.matchMedia("(min-width: 768px) and (max-width: 1400px) and (orientation: landscape)").matches;
            if (isIPad) {
                const gap = 20;
                const adjustedTop = titleHeight + gap;
                const adjustedHeight = viewportHeight - adjustedTop - gap - totalBodyBorderHeight;
                starMapContainer.style.height = `${adjustedHeight}px`;
                starMapContainer.style.top = `${adjustedTop}px`;
                starMapContainer.style.bottom = `${gap + bodyBorderWidth}px`;
            } else if (isMobile) {
                starMapContainer.style.height = `${maxHeight}px`;
                starMapContainer.style.top = `${topPosition}px`;
                starMapContainer.style.bottom = 'auto';
            } else {
                starMapContainer.style.height = `${maxHeight}px`;
                starMapContainer.style.top = `${topPosition}px`;
                starMapContainer.style.bottom = 'auto';
            }
            starMapContainer.style.position = 'fixed';
            starMapContainer.style.transform = 'none';

            const starMapSvg = starMapContainer.querySelector('svg');
            if (starMapSvg) {
                if (isMobile) {
                    starMapSvg.style.height = '100%';
                    starMapSvg.style.width = 'auto';
                } else {
                    starMapSvg.style.height = `${starMapContainer.clientHeight - totalBorderHeight}px`;
                    starMapSvg.style.width = '2780px';
                }
            }

            console.log('Star Map Height:', starMapContainer.style.height, 'Viewport Height:', viewportHeight, 'px', 'Title Height:', titleHeight, 'px', 'Top Position:', topPosition, 'px', 'Body Border Width:', bodyBorderWidth, 'px', 'Is Mobile:', isMobile, 'Is iPad:', isIPad);
        }
    };

    setTimeout(() => {
        setStarMapHeight();
        window.addEventListener('resize', setStarMapHeight);
        window.addEventListener('orientationchange', setStarMapHeight);
    }, 200);
});