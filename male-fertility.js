// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');

  if (themeToggle) {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark' && themeIcon) {
      themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      }
    });
  }
}

// Accordion Menu Functions
function openAccordionMenu() {
  const menu = document.getElementById('accordionMenu');
  if (menu) {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAccordionMenu() {
  const menu = document.getElementById('accordionMenu');
  if (menu) {
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleAccordionPanel(targetId, toggleElement) {
  if (!targetId) return;
  
  const panel = document.getElementById(targetId);
  if (!panel) return;
  
  const isOpen = panel.classList.contains('active');
  
  // Close all panels
  const allPanels = document.querySelectorAll('.accordion-panel');
  const allToggles = document.querySelectorAll('.accordion-toggle');
  
  allPanels.forEach(p => p.classList.remove('active'));
  allToggles.forEach(t => t.classList.remove('active'));
  
  // Open the clicked panel if it wasn't already open
  if (!isOpen) {
    panel.classList.add('active');
    toggleElement.classList.add('active');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme toggle
  initThemeToggle();
  
  // Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        openAccordionMenu();
      } else {
        closeAccordionMenu();
      }
    });
  }

  // Accordion toggles
  const accordionToggles = document.querySelectorAll('.accordion-toggle');
  accordionToggles.forEach(toggle => {
    // Skip if it's a link (has href attribute)
    if (toggle.tagName === 'A') return;
    
    toggle.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      toggleAccordionPanel(targetId, this);
    });
  });

  // Regular accordion links (close menu when clicked)
  const accordionLinks = document.querySelectorAll('.accordion-link, .accordion-sublink');
  accordionLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeAccordionMenu();
      const menuToggle = document.getElementById('menuToggle');
      if (menuToggle) {
        menuToggle.classList.remove('active');
      }
    });
  });

  // Click outside to close
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('accordionMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (menu && menuToggle && 
        !menu.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        menu.classList.contains('active')) {
      closeAccordionMenu();
      menuToggle.classList.remove('active');
    }
  });

  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAccordionMenu();
      const menuToggle = document.getElementById('menuToggle');
      if (menuToggle) {
        menuToggle.classList.remove('active');
      }
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});