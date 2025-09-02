// Select all slides and the dots container
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");
let currentSlide = 0;

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
themeIcon.textContent = currentTheme === "dark" ? "☀️" : "🌙";

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Accordion Menu Functionality
function openAccordionMenu() {
  const menu = document.getElementById("accordionMenu");
  menu.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeAccordionMenu() {
  const menu = document.getElementById("accordionMenu");
  menu.classList.remove("active");
  document.body.style.overflow = "";

  // Close all accordion panels
  const panels = document.querySelectorAll(".accordion-panel");
  const toggles = document.querySelectorAll(".accordion-toggle");

  panels.forEach((panel) => panel.classList.remove("active"));
  toggles.forEach((toggle) => toggle.classList.remove("active"));
}

function toggleAccordionPanel(targetId, toggleButton) {
  const panel = document.getElementById(targetId);
  const isActive = panel.classList.contains("active");

  // Close all other panels
  const allPanels = document.querySelectorAll(".accordion-panel");
  const allToggles = document.querySelectorAll(".accordion-toggle");

  allPanels.forEach((p) => {
    if (p !== panel) {
      p.classList.remove("active");
    }
  });

  allToggles.forEach((t) => {
    if (t !== toggleButton) {
      t.classList.remove("active");
    }
  });

  // Toggle current panel
  if (isActive) {
    panel.classList.remove("active");
    toggleButton.classList.remove("active");
  } else {
    panel.classList.add("active");
    toggleButton.classList.add("active");
  }
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target % 1 === 0 ? target : target + "%";
        clearInterval(timer);
      } else {
        counter.textContent =
          target % 1 === 0
            ? Math.floor(current)
            : Math.floor(current * 10) / 10;
      }
    }, 20);
  });
}

// Trigger animation when stats section is visible
function handleStatsAnimation() {
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(statsSection);
  }
}

// Animated Counter Function
function initCounters() {
  const counters = document.querySelectorAll("[data-target]");
  const options = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute("data-target"));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const duration = 2000; // 2 seconds
  const stepTime = duration / 100;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format the number based on target value
    if (target >= 1000) {
      element.textContent = Math.floor(current).toLocaleString();
    } else if (target % 1 !== 0) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counters
  initCounters();
  handleStatsAnimation();
  initializeChatbot();

  // Menu toggle
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      if (this.classList.contains("active")) {
        openAccordionMenu();
      } else {
        closeAccordionMenu();
      }
    });
  }

  // Accordion toggles
  const accordionToggles = document.querySelectorAll(".accordion-toggle");
  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      toggleAccordionPanel(targetId, this);
    });
  });

  // Regular accordion links (close menu when clicked)
  const accordionLinks = document.querySelectorAll(
    ".accordion-link, .accordion-sublink"
  );
  accordionLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeAccordionMenu();
      const menuToggle = document.getElementById("menuToggle");
      if (menuToggle) {
        menuToggle.classList.remove("active");
      }
    });
  });

  // Click outside to close
  document.addEventListener("click", function (e) {
    const menu = document.getElementById("accordionMenu");
    const menuToggle = document.getElementById("menuToggle");

    if (
      menu &&
      menuToggle &&
      !menu.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      menu.classList.contains("active")
    ) {
      closeAccordionMenu();
      menuToggle.classList.remove("active");
    }
  });

  // Escape key to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAccordionMenu();
      const menuToggle = document.getElementById("menuToggle");
      if (menuToggle) {
        menuToggle.classList.remove("active");
      }
    }
  });
});

// Modern Chatbot Functionality
function initializeChatbot() {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotInput = document.getElementById("chatbotInput");
  const sendButton = document.getElementById("sendButton");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const quickActions = document.querySelectorAll(".quick-action");

  let isOpen = false;

  // Toggle chatbot window
  function toggleChatbot() {
    isOpen = !isOpen;
    chatbotWindow.classList.toggle("open", isOpen);

    if (isOpen) {
      chatbotInput.focus();
    }
  }

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;

    messageDiv.innerHTML = `
            <div class="message-avatar">
                ${isUser ? "👤" : "🏥"}
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Send message
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, true);
    chatbotInput.value = "";

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! How can I help you today?",
        "I'd be happy to assist you. What would you like to know?",
        "Let me help you with that. Could you provide more details?",
        "I'm here to help! What specific information are you looking for?",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse);
    }, 1000);
  }

  // Handle quick actions
  function handleQuickAction(action) {
    const responses = {
      "Book Appointment":
        "I can help you book an appointment. Please call us at 19662 or visit our booking page.",
      "Our Treatments":
        "We offer a wide range of medical treatments including cardiology, neurology, orthopedics, and more.",
      FAQ: "Here are some frequently asked questions. What would you like to know about our services?",
      Location:
        "We are located in the heart of the city. You can find our exact address and directions on our contact page.",
    };

    addMessage(action, true);
    setTimeout(() => {
      addMessage(
        responses[action] ||
          "Thank you for your inquiry. How can I assist you further?"
      );
    }, 800);
  }

  // Event listeners
  if (chatbotToggle) chatbotToggle.addEventListener("click", toggleChatbot);
  if (chatbotClose) chatbotClose.addEventListener("click", toggleChatbot);

  if (sendButton) sendButton.addEventListener("click", sendMessage);

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  quickActions.forEach((button) => {
    button.addEventListener("click", function () {
      handleQuickAction(this.textContent.trim());
    });
  });

  // Close chatbot when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isOpen &&
      chatbotToggle &&
      chatbotWindow &&
      !chatbotToggle.contains(e.target) &&
      !chatbotWindow.contains(e.target)
    ) {
      toggleChatbot();
    }
  });
}

// Create navigation dots
slides.forEach((_, index) => {
  const dot = document.createElement("button");
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

// Function to go to a specific slide
function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  dotsContainer.children[currentSlide].classList.remove("active");

  currentSlide = index;

  slides[currentSlide].classList.add("active");
  dotsContainer.children[currentSlide].classList.add("active");
}

// Auto-slide every 5 seconds
setInterval(() => {
  const nextSlide = (currentSlide + 1) % slides.length;
  goToSlide(nextSlide);
}, 5000);

// Optional: Add swipe functionality for mobile (touch support)
let startX = 0;
let endX = 0;

document
  .querySelector(".slider-container")
  .addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

document
  .querySelector(".slider-container")
  .addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      // Swipe left
      const nextSlide = (currentSlide + 1) % slides.length;
      goToSlide(nextSlide);
    } else if (startX < endX - 50) {
      // Swipe right
      const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prevSlide);
    }
  });
