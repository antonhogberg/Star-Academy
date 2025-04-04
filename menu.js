document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');

    if (!hamburger || !menu || !closeBtn) {
        console.error('Menu elements not found:', { hamburger: !!hamburger, menu: !!menu, closeBtn: !!closeBtn });
        return;
    }

    menu.style.left = '-250px';

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);

        if (!isExpanded) {
            menu.classList.add('active');
            menu.animate([{ left: '-250px' }, { left: '0' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' });
        } else {
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
            };
        }
    });

    closeBtn.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
            menu.classList.remove('active');
        };
    });

    // Only close on .menu-link clicks that aren’t .dropdown-toggle
    document.querySelectorAll('.menu-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
            };
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
            hamburger.setAttribute('aria-expanded', 'false');
            menu.animate([{ left: '0' }, { left: '-250px' }], { duration: 300, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
                menu.classList.remove('active');
            };
        }
    });
});