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
            
            // REMOVED: localStorage.setItem('preferredLocation', selectedLocation);
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
        
        // Handle location-specific sections
        const locationSections = document.querySelectorAll('[data-location-visibility]');
        locationSections.forEach(section => {
            // Get the locations this section should be visible for
            const visibleLocations = section.getAttribute('data-location-visibility').split(',');
            
            // Show or hide the section based on whether the current location is in the list
            if (visibleLocations.includes(selectedLocation)) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // REMOVED: Check for saved location preference
    // Default to Palm Desert (no checking localStorage)
    updateLocationContent('palm-desert');

    // Rest of your code remains the same...
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
        const isClickInside = navContainer.contains(event.target) || hamburger.contains(event.target);

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

// The rest of your code remains unchanged...