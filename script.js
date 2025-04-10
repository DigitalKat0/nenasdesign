// Design Process Cards Data
const designProcessCards = [
  {
    title: "Empathize",
    items: ["Problem Statement", "User Research", "User Interviews"]
  },
  {
    title: "Define",
    items: ["User Personas", "User Needs", "User Painpoints"]
  },
  {
    title: "Ideate",
    items: ["Brainstorm", "Information Architecture", "Sketches"]
  },
  {
    title: "Prototype",
    items: ["Low Fidelity", "Visual Design", "Prototype"]
  }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Render design process cards
  renderDesignProcessCards();
  
  // Initialize tabs
  initializeTabs();
});

// Render design process cards
function renderDesignProcessCards() {
  const cardsContainer = document.getElementById('designProcessCards');
  
  designProcessCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    
    cardElement.innerHTML = `
      <h3>${card.title}</h3>
      <ul>
        ${card.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    
    cardsContainer.appendChild(cardElement);
  });
}

// Initialize tabs functionality
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add fade-in animation for images when they enter viewport
const images = document.querySelectorAll('img');
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

images.forEach(image => {
  image.style.opacity = '0';
  image.style.transform = 'translateY(20px)';
  image.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(image);
});