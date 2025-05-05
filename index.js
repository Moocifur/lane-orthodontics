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
    
    // Add logo click functionality to scroll to top - FIXED
    const logo = document.querySelector('.logo-img');
    if (logo) {
        logo.style.cursor = 'pointer'; // Change cursor to pointer to indicate it's clickable
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Add smooth scrolling effect
            });
        });
        
        // For debugging purposes, add a console log to confirm the event listener is attached
        console.log('Logo click handler attached');
    } else {
        console.log('Logo element not found');
    }

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

        updateNavigation(selectedLocation);
    }

    function updateNavigation(selectedLocation) {
        // Get all navigation links
        const navContainer = document.querySelector('.nav-container');
        const navItemsList = document.querySelector('.nav-links');
        
        // Store the original Palm Desert navigation if we haven't yet
        if (!window.palmDesertNavHTML && selectedLocation === 'palm-desert') {
            window.palmDesertNavHTML = navItemsList.innerHTML;
        }
        
        if (selectedLocation === 'loma-linda') {
            // Make sure the mobile menu is properly styled
            navContainer.classList.add('loma-linda-nav');
            
            // Custom links for Loma Linda
            navItemsList.innerHTML = `
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About The Wire Wagon</a></li>
            `;
        } else {
            // Reset to Palm Desert navigation
            navContainer.classList.remove('loma-linda-nav');
            
            // Restore the original Palm Desert navigation
            if (window.palmDesertNavHTML) {
                navItemsList.innerHTML = window.palmDesertNavHTML;
            }
        }
        
        // Re-attach event listeners to navigation links
        const updatedNavLinks = document.querySelectorAll('.nav-links a');
        updatedNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                const hamburger = document.querySelector('.hamburger-menu');
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Default to Palm Desert (no checking localStorage)
    updateLocationContent('palm-desert');

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

    // Lightbox functionality for JotForm forms
    // 1. Appointment Request Form (class: lightbox-201747138890158)
    const appointmentButtons = document.querySelectorAll('.lightbox-201747138890158');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            JFL_201747138890158.open();
        });
    });
    
    // 2. Payment Form (class: lightbox-202316251833144)
    const paymentButtons = document.querySelectorAll('.lightbox-202316251833144');
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            JFL_202316251833144.open();
        });
    });
    
    // 3. New Patient Form (class: lightbox-201746998764070)
    const newPatientButtons = document.querySelectorAll('.lightbox-201746998764070');
    newPatientButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            JFL_201746998764070.open();
        });
    });
    
    // Add support for circular buttons in the sandy-actions section
    const circularButtons = document.querySelectorAll('.circular-btn-image');
    if (circularButtons.length >= 3) {
        // First circular button - Appointment Request
        circularButtons[0].addEventListener('click', function(e) {
            e.preventDefault();
            JFL_201747138890158.open();
        });
        
        // Second circular button - Payment
        circularButtons[1].addEventListener('click', function(e) {
            e.preventDefault();
            JFL_202316251833144.open();
        });
        
        // Third circular button - New Patient Forms
        circularButtons[2].addEventListener('click', function(e) {
            e.preventDefault();
            JFL_201746998764070.open();
        });
    }

    // Fixed logo click functionality
document.addEventListener('click', function(event) {
    // Check if the clicked element is the logo or a child of the logo
    if (event.target.closest('.logo-img')) {
        console.log('Logo clicked');
        // Scroll to the top of the page with smooth behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Alternative approach - directly attach the event listener
const logoImg = document.querySelector('.logo-img');
if (logoImg) {
    console.log('Logo element found, attaching event listener');
    logoImg.style.cursor = 'pointer';
    
    logoImg.addEventListener('click', function() {
        console.log('Logo click detected');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} else {
    console.error('Logo element not found - check your HTML structure');
}

// Try adding this at the end of your DOMContentLoaded function
document.querySelector('.logo-img').onclick = function(e) {
    e.stopPropagation(); // Stop event bubbling
    console.log('Logo clicked via direct onclick property');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return false; // Prevent default
  };
});

