document.addEventListener('DOMContentLoaded', () => {
    const objectElement = document.getElementById('starMap');
    objectElement.addEventListener('load', () => {
        let svgDoc = objectElement.contentDocument;
        const checkSvgDoc = setInterval(() => {
            svgDoc = objectElement.contentDocument;
            if (svgDoc) {
                clearInterval(checkSvgDoc);
                initializeSvg(svgDoc);
            } else {
                console.error('SVG document not loaded yet');
            }
        }, 100);
    });

    setTimeout(() => {
        if (!objectElement.contentDocument) {
            console.error('SVG load event did not fire or SVG failed to load.');
        }
    }, 10000);

    function initializeSvg(svgDoc) {
        const stars = svgDoc.querySelectorAll('.star');
        const chevrons = svgDoc.querySelectorAll('.chevron');
        const bottomField = svgDoc.getElementById('bottom-field');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                const currentFill = star.getAttribute('fill');
                if (currentFill === '#000000') {
                    star.setAttribute('fill', '#ffd700');
                    star.setAttribute('stroke', '#000000');
                    star.setAttribute('stroke-width', '1');
                } else {
                    star.setAttribute('fill', '#000000');
                    star.removeAttribute('stroke');
                    star.removeAttribute('stroke-width');
                }
            });
        });

        chevrons.forEach(chevron => {
            chevron.addEventListener('click', () => {
                const currentFill = chevron.getAttribute('fill');
                if (currentFill === '#4a4a4a') {
                    chevron.setAttribute('fill', '#ffd700');
                } else {
                    chevron.setAttribute('fill', '#4a4a4a');
                }
            });
        });

        bottomField.addEventListener('click', () => {
            const currentFill = bottomField.getAttribute('fill');
            if (currentFill === '#4a4a4a') {
                bottomField.setAttribute('fill', '#ffd700');
            } else {
                bottomField.setAttribute('fill', '#4a4a4a');
            }
        });
    }
});