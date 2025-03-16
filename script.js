document.addEventListener('DOMContentLoaded', () => {
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

        // Update chapter stars (if on a chapter page)
        document.querySelectorAll('.star-container').forEach(container => {
            const star = container.querySelector('.star');
            const starKey = container.getAttribute('data-star-key');
            if (star && starKey) {
                let state = localStorage.getItem(starKey);
                if (!state) {
                    if (starKey.startsWith('exercise1')) {
                        const oldKey = starKey.replace('exercise1:', 'exercise');
                        state = localStorage.getItem(oldKey) || '1';
                    } else {
                        state = '1';
                    }
                }
                star.src = `images/star${state}.png`;
            }
        });

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
                rankName.textContent = 'Star Admiral';
                rankTitle.textContent = 'Star Admiral';
                rankDescription.textContent = 'Your relentless focus, dedication, and mastery have crowned you a piano virtuoso. Claim your place as Star Admiral of the Star Academy Piano School, master of all chapters!';
            } else if (chevron3Complete) { // All chevron3 stars (chapters 1–7, Part 3) full
                rankImage.src = 'rank3.png';
                rankName.textContent = 'Star Commander';
                rankTitle.textContent = 'Star Commander';
                rankDescription.textContent = 'With skill, you handle chords and arpeggios in all inversions, command scales across the piano, recognize note intervals, and boast a vast repertoire. Stand proud as a Star Commander of the Star Academy Piano School—conquer Part 4 in all chapters for Star Admiral!';
            } else if (chevron2Complete) { // All chevron2 stars (chapters 1–7, Part 2) full
                rankImage.src = 'rank2.png';
                rankName.textContent = 'Star Captain';
                rankTitle.textContent = 'Star Captain';
                rankDescription.textContent = 'You’ve taken up sight-reading, play songs with chords, and perform classical works. Stand proud as a Star Captain of the Star Academy Piano School—complete Part 3 in every chapter for Star Commander!';
            } else if (chevron1Complete) { // All chevron1 stars (chapters 1–7, Part 1) full
                rankImage.src = 'rank1.png';
                rankName.textContent = 'Star Officer';
                rankTitle.textContent = 'Star Officer';
                rankDescription.textContent = 'With thorough dedication, you’ve learned key names, scales, root chords, and several pieces. Stand proud as a Star Officer of the Star Academy Piano School—conquer Part 2 in every chapter for Star Captain!';
            } else if (sixStarCount >= 16) { // 16 or more stars golden, but chevron1 not complete
                rankImage.src = 'rank0.png';
                rankName.textContent = 'Star Cadet';
                rankTitle.textContent = 'Star Cadet';
                rankDescription.textContent = 'You’ve displayed steadfast resolve, securing six stars over 16 exercises in the Star Academy Piano School. Complete Part 1 in all seven chapters to claim Star Officer!';
            } else {
                rankImage.src = 'rank-start.png';
                rankName.textContent = 'Explorer';
                rankTitle.textContent = 'Explorer';
                rankDescription.textContent = 'You’re embarking on your piano adventure, learning notes, scales, chords, and arpeggios step by step. Complete 16 exercises to claim the Star Cadet rank!';
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
                rankName.textContent = 'Star Admiral';
                rankTitle.textContent = 'Star Admiral';
                rankDescription.textContent = 'Your relentless focus, dedication, and mastery have crowned you a piano virtuoso. Claim your place as Star Admiral of the Star Academy Piano School, master of all chapters!';
            }
        } else {
            console.log('rankImage, rankName, rankTitle, or rankDescription not found (expected on chapter pages)');
        }
    }

    // Example popup creation (adjust based on your actual implementation)
    function showPopup() {
        const popup = document.createElement('div');
        popup.className = 'popup';
        const content = document.createElement('div');
        content.className = 'popup-content';
        content.innerHTML = `
            <h2>Star Academy</h2>
            <p>Please write your name...</p>
            <input type="text" id="nameInput">
            <button onclick="this.parentElement.parentElement.remove()">Submit</button>
        `;
        popup.appendChild(content);
        document.body.appendChild(popup);
    }

    // Call showPopup when needed (e.g., on page load or button click)
    // Uncomment to test: document.addEventListener('DOMContentLoaded', showPopup);

    // Initial update for star states (only runs if elements exist)
    updateStarStates();

    // Storage event listeners for HTTP/S and fallback for file://
    window.addEventListener('storage', updateStarStates);
    window.onstorage = updateStarStates; // Fallback for older browsers or file://

    // Note: Scrolling issue on iPad landscape (40px scroll) reintroduced after mobile landscape fix.
    // To fix in the future: Revisit the media query for iPad landscape to ensure `overflow-y: hidden`
    // applies only to non-mobile devices, possibly by refining the `is-mobile` logic.
});