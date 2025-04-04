document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');

    if (!hamburger || !menu || !closeBtn) {
        console.error('Menu elements not found:', { hamburger: !!hamburger, menu: !!menu, closeBtn: !!closeBtn });
        return;
    }

    console.log('Menu.js initialized, setting initial state');
    menu.style.left = '-250px'; // Ensure menu starts closed

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        console.log('Hamburger clicked, isExpanded:', isExpanded);

        if (!isExpanded) {
            console.log('Opening menu');
            hamburger.setAttribute('aria-expanded', 'true');
            menu.classList.add('active');
            menu.animate([{ left: '-250px' }, { left: '0' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' });
        } else {
            console.log('Closing menu');
            hamburger.setAttribute('aria-expanded', 'false');
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
            };
        }
    });

    closeBtn.addEventListener('click', () => {
        console.log('Close button clicked');
        hamburger.setAttribute('aria-expanded', 'false');
        menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
            menu.classList.remove('active');
        };
    });
}); 