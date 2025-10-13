document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Script initializing.');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionName) {
        console.log(`Attempting to show section: ${sectionName}`);
        // If no sections are found, exit early
        if (!sections || sections.length === 0) {
            console.log('No sections found on this page.');
            return;
        }
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
            // Default to ABOUT if no valid hash or section found, or if it's the root path without a hash.
            console.log('No valid hash detected or section not found. Defaulting to ABOUT.');
            showSection('ABOUT');
        }
    }

    // Add click event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if the link is to index.html with a hash, or a pure hash link on index.html
            const isIndexHashLink = href && (href.startsWith('index.html#') || (href.startsWith('#') && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/')));

            if (isIndexHashLink) {
                e.preventDefault();
                // For links like 'index.html#ABOUT', navigate to it and let the loaded page's JS handle the hash
                if (href.startsWith('index.html#')) {
                    window.location.href = href;
                } else {
                    // For pure hash links on index.html (e.g., #ABOUT), handle with SPA logic
                    const sectionName = href.substring(1);
                    console.log(`SPA nav on index.html. Section: ${sectionName}`);
                    history.pushState(null, '', `#${sectionName}`);
                    showSection(sectionName);
                }
            } else {
                // Allow normal navigation for other links (e.g., project pages, external links)
                console.log(`Allowing default navigation for: ${href}`);
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

    // Add a fallback for window.onload to ensure hash is processed after all content is loaded
    window.onload = function() {
        handleInitialSection();
    };

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
