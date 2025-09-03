// IVF Basics Page JavaScript

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const accordionThemeToggle = document.getElementById("accordionThemeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const body = document.body;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", currentTheme);
  
  // Update theme icons
  const updateThemeIcons = (theme) => {
    const icons = document.querySelectorAll(".theme-icon");
    icons.forEach(icon => {
      if (icon) {
        icon.textContent = theme === "dark" ? "☀️" : "🌙";
      }
    });
  };
  
  updateThemeIcons(currentTheme);

  // Theme toggle event listeners
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcons(newTheme);
    });
  }
  
  if (accordionThemeToggle) {
    accordionThemeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcons(newTheme);
    });
  }
}

// Accordion Menu Functionality
function initAccordionMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const accordionMenu = document.getElementById("accordionMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  
  function openMenu() {
    if (accordionMenu) {
      accordionMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
  
  function closeMenu() {
    if (accordionMenu) {
      accordionMenu.classList.remove("active");
      document.body.style.overflow = "";
      
      // Close all accordion panels
      const panels = document.querySelectorAll(".accordion-panel");
      const toggles = document.querySelectorAll(".accordion-toggle");
      
      panels.forEach((panel) => panel.classList.remove("active"));
      toggles.forEach((toggle) => toggle.classList.remove("active"));
    }
  }
  
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (accordionMenu && accordionMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  
  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }
  
  // Accordion toggle functionality
  const accordionToggles = document.querySelectorAll(".accordion-toggle");
  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const panel = document.getElementById(targetId);
      
      if (panel) {
        const isActive = panel.classList.contains("active");
        
        // Close all other panels
        const allPanels = document.querySelectorAll(".accordion-panel");
        const allToggles = document.querySelectorAll(".accordion-toggle");
        
        allPanels.forEach((p) => p.classList.remove("active"));
        allToggles.forEach((t) => t.classList.remove("active"));
        
        // Toggle current panel
        if (!isActive) {
          panel.classList.add("active");
          toggle.classList.add("active");
        }
      }
    });
  });
  
  // Close menu when clicking on links
  const accordionLinks = document.querySelectorAll(".accordion-link, .accordion-sublink");
  accordionLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}



// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initAccordionMenu();
});