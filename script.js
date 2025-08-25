document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Script initializing.');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionName) {
        console.log(`Attempting to show section: ${sectionName}`);
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log(`Section ${sectionName} activated.`);
        } else {
            console.log(`Section ${sectionName} not found.`);
        }

        // Update navigation active state
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked navigation item
        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
            console.log(`Navigation item for ${sectionName} activated.`);
        } else {
            console.log(`Navigation item for ${sectionName} not found.`);
        }

        // Scroll to top of content area
        document.querySelector('.content').scrollTop = 0;
    }

    // Function to handle initial section display based on URL hash
    function handleInitialSection() {
        const hash = window.location.hash.substring(1); // Remove '#'
        console.log(`handleInitialSection called. Detected hash: '${hash}'`);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            // Default to NEWS if no valid hash or section found
            console.log('No valid hash detected or section not found. Defaulting to ABOUT.');
            showSection('ABOUT');
        }
    }

    // Add click event listeners to navigation items
   /* navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
    
            // If link is same-page anchor (#something)
            if (href && href.startsWith('#')) {
                // Only prevent default and do SPA navigation IF we're on index.html
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ) {
                    e.preventDefault();
                    const sectionName = this.getAttribute('data-section');
                    console.log(`SPA nav on index.html. Section: ${sectionName}`);
                    history.pushState(null, '', `#${sectionName}`);
                    showSection(sectionName);
                }
                // else allow normal browser scroll behavior on other pages
            } else {
                // Allow normal navigation for links to other pages (like index.html#ABOUT)
                console.log(`External or other-page link: ${href}`);
            }
        });
    }); */
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const isHashLink = href && href.startsWith('#');
            const isIndexPage =
                window.location.pathname.endsWith('index.html') ||
                window.location.pathname === '/' ||
                window.location.pathname === '/index.html';
    
            if (isHashLink && isIndexPage) {
                // You're on index.html and clicked a section link like #ABOUT
                e.preventDefault();
                const sectionName = this.getAttribute('data-section');
                console.log(`SPA nav on index.html. Section: ${sectionName}`);
                history.pushState(null, '', `#${sectionName}`);
                showSection(sectionName);
            } else {
                // Link goes to another page (like index.html#ABOUT), allow normal navigation
                console.log(`Navigating to: ${href}`);
            }
        });
    });
    // Handle form submission (removed as Contact section is replaced by CV)
    /*
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const projectType = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            this.reset();
        });
    }
    */

    // Add smooth scrolling for better UX
    document.querySelector('.content').style.scrollBehavior = 'smooth';

    // Call initial section handler on DOMContentLoaded
    handleInitialSection();

    // Listen for hash changes (e.g., when user uses browser back/forward buttons)
    window.addEventListener('hashchange', handleInitialSection);

    // Add hover effects for work items
    const workItems = document.querySelectorAll('.work-item, .brand-item, .digital-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.2s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for work items (placeholder functionality)
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.work-title, .brand-title, .digital-title');
            if (title) {
                // If it's a direct link to another page, let it proceed
                if (title.tagName === 'A' && title.href.startsWith(window.location.origin)) {
                    // Internal link, let default behavior handle it
                    // No alert, just navigate
                } else if (title.tagName === 'A' && title.href.startsWith('http')) {
                    // External link, let default behavior handle it (target="_blank" handles new tab)
                } else {
                    alert(`Opening project: ${title.textContent}`);
                }
            }
        });
    });
});
