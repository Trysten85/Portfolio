document.addEventListener('DOMContentLoaded', () => {
    // Select all nav links
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            const sectionId = event.target.getAttribute('data-section');

            if (window.location.pathname.includes('index.html')) {
                // Scroll to section if already on index.html
                scrollToSection(sectionId);
            } else {
                // Redirect to index.html and scroll
                window.location.href = `index.html#${sectionId}`;
            }
        });
    });

    // Handle scrolling when a hash is present in the URL
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.replace('#', '');
        scrollToSection(sectionId);
    }

    // Function to scroll to a section
    function scrollToSection(sectionId) {
        console.log('Scrolling to:', sectionId); // Debugging
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else {
            console.error(`Section with ID "${sectionId}" not found.`);
        }
    }
});
