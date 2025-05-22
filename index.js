// index.js

// Odin Project style carousel functionality - without pausing on hover
function initializeCarousel() {
    // Exit if no carousel exists
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const numSlides = slides.length;
    
    if (numSlides === 0) return;
    
    // Set up track width and slide width dynamically
    track.style.width = `${numSlides * 100}%`; // track width = 100% * number of slides
    slides.forEach(slide => {
        slide.style.width = `${100 / numSlides}%`; // each slide width = 100% / number of slides
    });
    
    // Initialize position trackers
    let currentIndex = 0;
    
    // Get UI elements
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    const dots = Array.from(document.querySelectorAll('.dot'));
    
    // Function to move to a specific slide
    function goToSlide(index) {
        // Calculate position - negative percentage based on slide index
        const position = -(index * (100 / numSlides)) + '%';
        track.style.transform = `translateX(${position})`;
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Initialize first slide
    goToSlide(0);
    
    // Event listener for next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            // Go to next slide, or loop back to first
            const nextIndex = (currentIndex + 1) % numSlides;
            goToSlide(nextIndex);
        });
    }
    
    // Event listener for previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            // Go to previous slide, or loop to last
            const prevIndex = (currentIndex - 1 + numSlides) % numSlides;
            goToSlide(prevIndex);
        });
    }
    
    // Event listeners for dot indicators
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }
    
    // Auto-advance slides every 5 seconds - continuous, no pausing
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % numSlides;
        goToSlide(nextIndex);
    }, 5000);
    
    // Handle window resize to maintain correct positioning
    window.addEventListener('resize', () => {
        // Re-apply the current position after resize
        goToSlide(currentIndex);
    });
}

// Function to handle the mobile menu
function initializeMobileMenu() {
    // Select the DOM elements we need to work with
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const body = document.body;

    // NEW FUNCTION: Add this function to manage mobile nav visibility
    function adjustMobileNavVisibility() {
        const navHeader = document.querySelector('.nav-header');
        const screenWidth = window.innerWidth;
        
        // Only show the nav-header on mobile when menu is active
        if (screenWidth < 768) {
            if (navHeader) {
                if (navContainer.classList.contains('active')) {
                    navHeader.style.display = 'flex';
                } else {
                    navHeader.style.display = 'none';
                }
            }
        } else {
            // Hide mobile elements on desktop
            if (navHeader) {
                navHeader.style.display = 'none';
            }
            
            // Reset nav container styles on desktop
            if (navContainer) {
                navContainer.style.left = '';
                navContainer.style.height = '';
                navContainer.style.width = '';
                navContainer.style.paddingBottom = '';
            }
        }
    }

    // Check if we need to add the menu close button (for the Odin Project style)
    if (!document.querySelector('.menu-close') && navContainer) {
        // Create the menu header if it doesn't exist
        if (!document.querySelector('.nav-header')) {
            const navHeader = document.createElement('div');
            navHeader.className = 'nav-header';
            
            // Get location-specific title
            const locationTitle = body.classList.contains('location-loma-linda') ? 
                'WIRE WAGON' : 'LANE ORTHODONTICS';
            
            // Create the header content
            navHeader.innerHTML = `
                <div class="mobile-menu-logo">
                    <img src="images/logo-white.png" alt="Logo">
                    <span class="mobile-menu-title">${locationTitle}</span>
                </div>
                <button class="menu-close" aria-label="Close menu">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            
            // Insert at the beginning of nav container
            navContainer.insertBefore(navHeader, navContainer.firstChild);
            
            // Add icons to navigation links if they don't have them already
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                if (!link.querySelector('.nav-link-icon')) {
                    // Get the link text to determine which icon to use
                    const linkText = link.textContent.trim().toLowerCase();
                    let iconClass = 'fa-circle'; // Default icon
                    
                    // Map link text to appropriate icons
                    if (linkText.includes('home')) iconClass = 'fa-house';
                    else if (linkText.includes('about')) iconClass = 'fa-user-doctor';
                    else if (linkText.includes('services')) iconClass = 'fa-tooth';
                    else if (linkText.includes('insurance')) iconClass = 'fa-file-invoice-dollar';
                    else if (linkText.includes('location')) iconClass = 'fa-location-dot';
                    else if (linkText.includes('contact')) iconClass = 'fa-envelope';
                    
                    // Create the icon span
                    const iconSpan = document.createElement('span');
                    iconSpan.className = 'nav-link-icon';
                    iconSpan.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
                    
                    // Insert icon at beginning of link
                    link.insertBefore(iconSpan, link.firstChild);
                }
            });
            
            // Add the nav-divider if it doesn't exist
            if (!document.querySelector('.nav-divider') && document.querySelector('.nav-buttons')) {
                const navDivider = document.createElement('div');
                navDivider.className = 'nav-divider';
                navContainer.insertBefore(navDivider, document.querySelector('.nav-buttons-wrapper') || document.querySelector('.nav-buttons'));
            }
            
            // Wrap the nav buttons in a wrapper if needed
            const navButtons = document.querySelector('.nav-buttons');
            if (navButtons && !document.querySelector('.nav-buttons-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'nav-buttons-wrapper';
                navButtons.parentNode.insertBefore(wrapper, navButtons);
                wrapper.appendChild(navButtons);
            }
        }
    }

    // Add event listeners for mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle the active class on the hamburger icon
            hamburger.classList.toggle('active');
            // Toggle the active class on the nav container
            navContainer.classList.toggle('active');
            // Toggle the active class on the backdrop
            if (menuBackdrop) {
                menuBackdrop.classList.toggle('active');
            }
            // Toggle no-scroll class on body
            body.classList.toggle('no-scroll');
            // Update accessibility
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
            
            // NEW: Call the visibility function after toggling
            adjustMobileNavVisibility();
        });
    }

    // Add event listener for close button
    const menuClose = document.querySelector('.menu-close');
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            if (menuBackdrop) {
                menuBackdrop.classList.remove('active');
            }
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // NEW: Call the visibility function after closing
            adjustMobileNavVisibility();
        });
    }

    // Close menu when backdrop is clicked
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            menuBackdrop.classList.remove('active');
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // NEW: Call the visibility function after closing
            adjustMobileNavVisibility();
        });
    }
    
    // Add click event to all nav links to close menu
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            if (menuBackdrop) {
                menuBackdrop.classList.remove('active');
            }
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // NEW: Call the visibility function after closing
            adjustMobileNavVisibility();
        });
    });
    
    // Adjust for Rhinogram widget
    function adjustForRhinogram() {
        const rhinogramContainer = document.getElementById('rhinogram-container');
        if (rhinogramContainer) {
            // Try to find the Rhinogram widget
            const rhinogramWidget = rhinogramContainer.querySelector('.rhinogram-widget');
            if (rhinogramWidget && window.innerWidth <= 767) {
                // Get the height of the widget
                const widgetHeight = rhinogramWidget.offsetHeight || 80;
                // Apply padding to nav-buttons-wrapper or directly to nav-container
                const buttonsWrapper = document.querySelector('.nav-buttons-wrapper');
                if (buttonsWrapper) {
                    buttonsWrapper.style.paddingBottom = (widgetHeight + 30) + 'px';
                } else if (navContainer) {
                    navContainer.style.paddingBottom = (widgetHeight + 30) + 'px';
                }
            }
        }
    }
    
    // Run initial adjustment
    adjustForRhinogram();
    adjustMobileNavVisibility(); // NEW: Call on initial load
    
    // Re-adjust on window resize
    window.addEventListener('resize', function() {
        adjustForRhinogram();
        adjustMobileNavVisibility(); // NEW: Call on window resize
    });
    
    // Set up observer for Rhinogram widget
    const rhinogramContainer = document.getElementById('rhinogram-container');
    if (rhinogramContainer) {
        const observer = new MutationObserver(function() {
            adjustForRhinogram();
        });
        
        observer.observe(rhinogramContainer, { 
            childList: true,
            subtree: true,
            attributes: true
        });
    }
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select the DOM elements we need to work with
    const toggleOptions = document.querySelectorAll('.toggle-option');
    // Get all content elements that change based on location
    const locationContent = document.querySelectorAll('[data-location-content="true"]');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.treatment-tab');
    
    // Add logo click functionality to scroll to top
    const logo = document.querySelector('.logo-img');
    if (logo) {
        logo.style.cursor = 'pointer'; // Change cursor to pointer to indicate it's clickable
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Add smooth scrolling effect
            });
        });
    }

    // Add click event to toggle Buttons
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Get selected location
            const selectedLocation = this.getAttribute('data-location');
            console.log('Selected location:', selectedLocation);
            
            // Update active toggle button
            toggleOptions.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Update content visibility
            updateLocationContent(selectedLocation);
        });
    });

    // Function to update content based on location
    function updateLocationContent(selectedLocation) {
        // Add body class for location-specific styling
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
        
        // Update mobile menu with location-specific title
        const mobileMenuTitle = document.querySelector('.mobile-menu-title');
        if (mobileMenuTitle) {
            mobileMenuTitle.textContent = selectedLocation === 'loma-linda' ? 'WIRE WAGON' : 'LANE ORTHODONTICS';
        }
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
                <li><a href="#home"><span class="nav-link-icon"><i class="fa-solid fa-house"></i></span>Home</a></li>
                <li><a href="#about"><span class="nav-link-icon"><i class="fa-solid fa-info-circle"></i></span>About The Wire Wagon</a></li>
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
                const menuBackdrop = document.querySelector('.menu-backdrop');
                
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                if (menuBackdrop) {
                    menuBackdrop.classList.remove('active');
                }
                document.body.classList.remove('no-scroll');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Default to Palm Desert (no checking localStorage)
    updateLocationContent('palm-desert');

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
            if (typeof JFL_201747138890158 !== 'undefined') {
                JFL_201747138890158.open();
            }
        });
    });
    
    // 2. Payment Form (class: lightbox-202316251833144)
    const paymentButtons = document.querySelectorAll('.lightbox-202316251833144');
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof JFL_202316251833144 !== 'undefined') {
                JFL_202316251833144.open();
            }
        });
    });
    
    // 3. New Patient Form (class: lightbox-201746998764070)
    const newPatientButtons = document.querySelectorAll('.lightbox-201746998764070');
    newPatientButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof JFL_201746998764070 !== 'undefined') {
                JFL_201746998764070.open();
            }
        });
    });
    
    // Add support for circular buttons in the sandy-actions section
    const circularButtons = document.querySelectorAll('.circular-btn-image');
    if (circularButtons.length >= 3) {
        // First circular button - Appointment Request
        circularButtons[0].addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof JFL_201747138890158 !== 'undefined') {
                JFL_201747138890158.open();
            }
        });
        
        // Second circular button - Payment
        circularButtons[1].addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof JFL_202316251833144 !== 'undefined') {
                JFL_202316251833144.open();
            }
        });
        
        // Third circular button - New Patient Forms
        circularButtons[2].addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof JFL_201746998764070 !== 'undefined') {
                JFL_201746998764070.open();
            }
        });
    }

    // Initialize our components
    initializeCarousel();
    initializeMobileMenu(); // Initialize the new left-side mobile menu
});