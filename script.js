// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.section-title, .project-card, .goals-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Initial setup for animations
    const setupAnimations = function() {
      const elements = document.querySelectorAll('.section-title, .project-card, .goals-card');
      
      elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      
      // Trigger initial animation check
      animateOnScroll();
    };
    
    // Run setup after DOM is fully loaded
    setupAnimations();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Here you would normally send the form data to a server
        // For this static version, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
      });
    }
  });