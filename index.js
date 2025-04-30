// index.js

// Wait for the Dom to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select the DOM elements we need to work with
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    // Get all content elements that change based on location
    const locationContent = document.querySelectorAll('[data-location-content="true"]');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.treatment-tab');


    // Add click event to toggle Buttons --
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            //Get selected location
            const selectedLocation = this.getAttribute('data-location');
            console.log('Selected location:', selectedLocation);
            
            //Update active toggle button
            toggleOptions.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Update content visibility
            updateLocationContent(selectedLocation);

            // Store user's location preference
            localStorage.setItem('preferredLocation', selectedLocation);
        });
    });

    //Function to update content based on location
    function updateLocationContent(selectedLocation) {
        //Add body class for location-specific styling
        document.body.classList.remove('location-palm-desert', 'location-loma-linda');
        document.body.classList.add('location-' + selectedLocation);

        // Update visible content
        locationContent.forEach(container => {    
            // Get all location-specific elements within this container
            const locationElements = container.querySelectorAll('[data-location]');

            locationElements.forEach(element => {
                if (element.getAttribute('data-location') === selectedLocation) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }

    // Check for saved location preference
    const savedLocation = localStorage.getItem('preferredLocation');
    if (savedLocation) {
        // Find the saved location toggle and click it
        const savedToggle = document.querySelector(`.toggle-option[data-location="${savedLocation}"]`);
        if (savedToggle) {
            savedToggle.click();
        }
    } else {
        // Default to Palm Desert if no saved preference
        updateLocationContent('palm-desert');
    }

    // Toggle menu on hamburger icon is clicked --
    hamburger.addEventListener('click', function() {
        // Toggle the 'active' class on the hamburger icon (transforms to X)
        hamburger.classList.toggle('active');
        // Toggle the 'active' class on the nav container (slides in / out)
        navContainer.classList.toggle('active');
        // Update aria-expanded for accessibility for readers
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
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

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the tab to activate
            const tabToActivate = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            document.querySelector(`.treatment-tab[data-tab="${tabToActivate}"]`).classList.add('active');
        });
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
                const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
    })
})