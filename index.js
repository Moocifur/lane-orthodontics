// index.js

// Wait for the Dom to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select the DOM elements we need to work with
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Toggle menu on hamburger icon is clicked
    hamburger.addEventListener('click', function() {
        // Toggle the 'active' class on the hamburger icon (transforms to X)
        hamburger.classList.toggle('active');
        // Toggle the 'active' class on the nav container (slides in / out)
        navContainer.classList.toggle('active');
        // Update aria-expanded for accessibility for readers
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded); //i need an explanation for this script
    });

    // Close menu when any navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove 'active' class from hamburger (changes X back to hamburger)
            hamburger.classList.remove('active');
            // Remove 'active' class from nav container (slides menu away)
            navContainer.classList.remove('active');
            // Update accessibility attribute
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking anywhere outside the menu
    document.addEventListener('click', function(event) {
        // Check if the click was inside the menu or the hamburger
        const isClickInside = navContainer.contains(event.target) || hamburger.contains(event.target); //i need an explanation for this script

        // If click was outside AND the menu is open, close it
        if (!isClickInside && navContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Smooth scrolling for navigation links
// Select all links and add click w/ function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Get value like "#about" or "#Services"
        const targetId = this.getAttribute('href');
        // Try to querySelect something on document
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // the height of the fixed header to offset scrolling
            const headerHeight = document.querySelector('.main-nav').offsetHeight;

            // Calculate the position to scroll to (with header offset)
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            // Scroll smoothy to the target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger-menu');
            const navContainer = document.querySelector('.nav-container');

            if (navContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');

                // for backdrop?
                const backdrop = document.querySelector('.menu-backdrop');
                if (backdrop) backdrop.classList.remove('active');

                // Re-wnable scrolling
                document.body.style.overflow = '';
            }
        }
    });
});

// add active clas to navigation item based on scroll position aka scroll spy
window.addEventListener('scroll', function() {
    // Get current scroll position
    const scrollPosition = window.scrollY;

    // Get all sections
    const sections = document.querySelectorAll('section[id]');

    // Loop through sections to find the one in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const headerHeight = document.querySelector('.main-nav').offsetHeight;

        // If the section is in view
        if (scrollPosition >= sectionTop - headerHeight - 50 &&
            scrollPosition < sectionTop + sectionHeight - headerHeight) {

                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const correspondingLink = this.document.querySelector(`.nav-links a[href="#${section.id}]`);
                if (corrospondingLink) {
                    correspondingLink.classList.add('active');
                }

            }
    })
})