// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Responsive Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle the 'nav-active' class when the hamburger is clicked
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        // Animate the hamburger icon
        hamburger.classList.toggle('toggle');
    });


    // 2. Smooth Scrolling Logic
    // Select all links with a href starting with '#'
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default jump behavior
            e.preventDefault();

            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);

            if (targetElement) {
                // Smoothly scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close the mobile menu after clicking a link
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });
});