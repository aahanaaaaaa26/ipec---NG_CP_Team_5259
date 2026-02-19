//faq,categories
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    //categories
    const spans = menuToggle.querySelectorAll("span");
    if (navLinks.classList.contains("show")) {
      spans[0].style.transform = "rotate(45deg) translateY(10px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translateY(-10px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });


  const allNavLinks = navLinks.querySelectorAll(".nav-link");
  allNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      const spans = menuToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });
}


const currentPage = window.location.pathname.split("/").pop() || "home1.html";

// Highlight active link
document.querySelectorAll(".nav-link").forEach(link => {
  const linkHref = link.getAttribute("href");
  if (linkHref === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

/* ========================================
   SCROLL ANIMATIONS (INTERSECTION OBSERVER)
======================================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animation to various elements
const elementsToAnimate = document.querySelectorAll(`
  .category-card,
  .step-card,
  .item-card,
  .feature-item,
  .benefit-card,
  .stat-card,
  .detailed-step,
  .faq-item
`);

elementsToAnimate.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(40px)";
  element.style.transition = "all 0.6s ease";
  animateOnScroll.observe(element);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add shadow when scrolled
  if (scrollTop > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.05)";
  }

  lastScrollTop = scrollTop;
});

/* ========================================
   SEARCH BAR FUNCTIONALITY (DUMMY)
======================================== */
const searchButtons = document.querySelectorAll(".btn-search, .btn-primary");
searchButtons.forEach(button => {
  if (button.textContent.includes("Search")) {
    button.addEventListener("click", (e) => {
      // Get search input value (if exists)
      const searchInput = button.closest(".search-bar, .search-input-group")?.querySelector(".search-input");
      const searchValue = searchInput?.value || "";

      if (searchValue.trim()) {
        // Show alert with search value (dummy functionality)
        showNotification(`Searching for: ${searchValue}`, "info");
      } else {
        showNotification("Please enter a search term", "warning");
      }
    });
  }
});

/* ========================================
   FILTER FUNCTIONALITY (DUMMY)
======================================== */
const filterButton = document.querySelector(".filter-btn");
if (filterButton) {
  filterButton.addEventListener("click", () => {
    const categorySelect = document.querySelector('.filter-select');
    const selectedCategory = categorySelect?.value || "All Categories";

    // Animate items (dummy filter effect)
    const items = document.querySelectorAll(".item-card");
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.9)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, index * 100);
    });

    showNotification(`Filtering by: ${selectedCategory}`, "success");
  });
}

/* ========================================
   CARD HOVER EFFECTS
======================================== */
const cards = document.querySelectorAll(".category-card, .item-card, .benefit-card");
cards.forEach(card => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transition = "all 0.3s ease";
  });
});

/* ========================================
   FAQ 
======================================== */
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (question && answer) {
    question.addEventListener("click", () => {
      // Close other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = "0";
        }
      });

      // Toggle current FAQ
      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0";
      }
    });
  }
});

/* ========================================
   EXPLORE BUTTON FUNCTIONALITY
======================================== */
const exploreButtons = document.querySelectorAll('.item-card button');
exploreButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const card = button.closest(".item-card");
    const itemTitle = card?.querySelector(".item-title")?.textContent || "Item";

    // Add ripple effect
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      left: ${e.offsetX - 50}px;
      top: ${e.offsetY - 50}px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    showNotification(`Viewing details for: ${itemTitle}`, "info");
  });
});

/* ========================================
   CTA BUTTON FUNCTIONALITY
======================================== */
const ctaButtons = document.querySelectorAll(".btn-cta");
ctaButtons.forEach(button => {
  button.addEventListener("click", () => {
    showNotification("Redirecting to signup page...", "success");
    // Simulate page transition
    setTimeout(() => {
      button.textContent = "✓ Coming Soon!";
      button.style.background = "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)";
    }, 1000);
  });
});

/* ========================================
   NOTIFICATION SYSTEM
======================================== */
function showNotification(message, type = "info") {
  // Remove existing notification
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: white;
    color: #1a1a1a;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.4s ease;
    max-width: 350px;
    font-weight: 500;
    border-left: 4px solid;
  `;

  // Type-specific colors
  const colors = {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3"
  };
  notification.style.borderLeftColor = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease";
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// Add notification animations to CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/* ========================================
   FLOATING CARDS ANIMATION (HOME PAGE)
======================================== */
const floatingCards = document.querySelectorAll(".floating-card");
floatingCards.forEach((card, index) => {
  // Add random float animation delay
  card.style.animationDelay = `${index * 0.5}s`;

  // Add hover effect
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.05)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

/* ========================================
   STAT COUNTER ANIMATION
======================================== */
const statNumbers = document.querySelectorAll(".stat-number");
const observeStats = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const text = target.textContent;
      const hasPlus = text.includes("+");
      const number = parseInt(text.replace(/\D/g, ""));

      if (!isNaN(number)) {
        animateNumber(target, 0, number, 2000, hasPlus);
      }

      observeStats.unobserve(target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => observeStats.observe(stat));

function animateNumber(element, start, end, duration, hasPlus = false) {
  const startTime = performance.now();
  const prefix = element.textContent.includes("₹") ? "₹" : "";

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * easeOutCubic(progress));
    element.textContent = prefix + current.toLocaleString() + (hasPlus ? "+" : "");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ========================================
   FORM VALIDATION (IF FORMS ARE ADDED)
======================================== */
const forms = document.querySelectorAll("form");
forms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input[required], select[required]");
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#f44336";
        input.style.animation = "shake 0.5s";
      } else {
        input.style.borderColor = "#4caf50";
      }
    });

    if (isValid) {
      showNotification("Form submitted successfully!", "success");
      form.reset();
    } else {
      showNotification("Please fill in all required fields", "error");
    }
  });
});

// Add shake animation
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ========================================
   IMAGE LAZY LOADING
======================================== */
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll("img[loading='lazy']");
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[loading='lazy']").forEach(img => {
    imageObserver.observe(img);
  });
}

/* ========================================
   PARALLAX EFFECT ON SCROLL
======================================== */
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;

  // Parallax for hero illustration
  const heroIllustration = document.querySelector(".hero-illustration");
  if (heroIllustration) {
    heroIllustration.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  // Parallax for floating cards
  floatingCards.forEach((card, index) => {
    const speed = 0.1 + (index * 0.05);
    card.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* ========================================
   CATEGORY CARD CLICK NAVIGATION
======================================== */
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    const categoryName = card.querySelector(".category-title")?.textContent || "Category";
    showNotification(`Navigating to ${categoryName}...`, "info");

    // Animate card before navigation
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      window.location.href = "categories1html";
    }, 300);
  });
});

/* ========================================
   LOADING STATE FOR BUTTONS
======================================== */
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = "Loading...";
    button.disabled = true;
    button.style.opacity = "0.7";
    button.style.cursor = "not-allowed";
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  }
}

/* ========================================
   SCROLL TO TOP BUTTON
======================================== */
const scrollTopButton = document.createElement("button");
scrollTopButton.innerHTML = "↑";
scrollTopButton.className = "scroll-to-top";
scrollTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  z-index: 9999;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopButton.style.opacity = "1";
    scrollTopButton.style.visibility = "visible";
  } else {
    scrollTopButton.style.opacity = "0";
    scrollTopButton.style.visibility = "hidden";
  }
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

scrollTopButton.addEventListener("mouseenter", function () {
  this.style.transform = "translateY(-5px)";
  this.style.boxShadow = "0 6px 20px rgba(76, 175, 80, 0.4)";
});

scrollTopButton.addEventListener("mouseleave", function () {
  this.style.transform = "translateY(0)";
  this.style.boxShadow = "0 4px 12px rgba(76, 175, 80, 0.3)";
});

/* ========================================
   INITIALIZE ON PAGE LOAD
======================================== */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎓 CampusRent initialized successfully!");

  // Add entrance animation to hero section
  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.style.animation = "fadeInUp 0.8s ease";
  }

  // Trigger initial animations
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Set initial body opacity for smooth page load
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.3s ease";

/* ========================================
   LOGIN PAGE FUNCTIONALITY
======================================== */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Real-time email validation
  if (emailInput) {
    emailInput.addEventListener('input', function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const inputWrapper = this.closest('.input-with-icon');

      if (this.value && !emailRegex.test(this.value)) {
        inputWrapper.style.borderColor = '#f44336';
        this.setCustomValidity('Please enter a valid email address');
      } else {
        inputWrapper.style.borderColor = '#4caf50';
        this.setCustomValidity('');
      }
    });
  }

  // Password strength indicator
  if (passwordInput) {
    passwordInput.addEventListener('input', function () {
      const password = this.value;
      const inputWrapper = this.closest('.input-with-icon');

      if (password.length < 6) {
        inputWrapper.style.borderColor = '#ff9800';
      } else if (password.length >= 8) {
        inputWrapper.style.borderColor = '#4caf50';
      }
    });
  }

  // Login form submission
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Validate fields
    if (!email || !password) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.btn-auth-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Store user session (mock)
      const userData = {
        email: email,
        name: email.split('@')[0],
        college: 'IIT Delhi',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('campusrent_user', JSON.stringify(userData));

      showNotification('Login successful! Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    }, 1500);
  });

  // Social login buttons
  const socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const provider = this.classList.contains('btn-google') ? 'Google' :
        this.classList.contains('btn-facebook') ? 'Facebook' : 'Microsoft';

      // Add loading animation
      const originalHTML = this.innerHTML;
      this.innerHTML = '<span>Connecting...</span>';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.disabled = false;
        showNotification(`${provider} login is not configured yet`, 'info');
      }, 1500);
    });
  });

  // Forgot password link
  const forgotPasswordLink = document.querySelector('.forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function (e) {
      e.preventDefault();
      const email = prompt('Enter your email address:');
      if (email) {
        showNotification('Password reset link sent to ' + email, 'success');
      }
    });
  }
}
/* ========================================
   SIGNUP PAGE FUNCTIONALITY (FIXED)
======================================== */

const signupForm = document.getElementById('signupForm');
const signupEmailInput = document.getElementById('email');

const allowedDomains = [
  'iitde.ac.in',
  'iitb.ac.in',
  'iitm.ac.in',
  'iitkgp.ac.in',
  'bits-pilani.ac.in',
  'dtu.ac.in',
  'ac.in'
];

if (signupForm && signupEmailInput) {

  signupEmailInput.addEventListener('input', function () {
    const email = this.value.toLowerCase().trim();
    const wrapper = this.closest('.input-with-icon');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset state
    wrapper.style.borderColor = '';
    this.setCustomValidity('');

    if (!email) return;

    // Invalid email format
    if (!emailRegex.test(email)) {
      wrapper.style.borderColor = '#f44336';
      this.setCustomValidity('Invalid email format');
      return;
    }

    const domain = email.split('@')[1];
    const isCollegeEmail = allowedDomains.some(d =>
      domain === d || domain.endsWith('.' + d)
    );

    // Not a college email
    if (!isCollegeEmail) {
      wrapper.style.borderColor = '#ff9800';
      this.setCustomValidity('Use your official college email');
    } 
    // Valid college email
    else {
      wrapper.style.borderColor = '#4caf50';
      this.setCustomValidity('');
    }
  });

  signupEmailInput.addEventListener('blur', function () {
    if (this.validationMessage && typeof showNotification === 'function') {
      showNotification(this.validationMessage, 'warning');
    }
  });

}

  // Password strength checker
  if (passwordInput) {
    passwordInput.addEventListener('input', function () {
      const password = this.value;
      const inputWrapper = this.closest('.input-with-icon');

      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^a-zA-Z0-9]/.test(password)) strength++;

      if (password.length === 0) {
        inputWrapper.style.borderColor = '';
      } else if (strength === 0 || password.length < 6) {
        inputWrapper.style.borderColor = '#f44336';
      } else if (strength <= 2) {
        inputWrapper.style.borderColor = '#ff9800';
      } else {
        inputWrapper.style.borderColor = '#4caf50';
      }

      // Update confirm password validation if it has value
      if (confirmPasswordInput && confirmPasswordInput.value) {
        const confirmWrapper = confirmPasswordInput.closest('.input-with-icon');
        if (confirmPasswordInput.value !== password) {
          confirmWrapper.style.borderColor = '#f44336';
        } else {
          confirmWrapper.style.borderColor = '#4caf50';
        }
      }
    });
  }

  // Confirm password matching
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', function () {
      const inputWrapper = this.closest('.input-with-icon');

      if (this.value.length === 0) {
        inputWrapper.style.borderColor = '';
        this.setCustomValidity('');
      } else if (this.value !== passwordInput.value) {
        inputWrapper.style.borderColor = '#f44336';
        this.setCustomValidity('Passwords do not match');
      } else {
        inputWrapper.style.borderColor = '#4caf50';
        this.setCustomValidity('');
      }
    });
  }

  // College select validation
  if (collegeSelect) {
    collegeSelect.addEventListener('change', function () {
      const inputWrapper = this.closest('.input-with-icon');
      if (this.value) {
        inputWrapper.style.borderColor = '#4caf50';
      } else {
        inputWrapper.style.borderColor = '';
      }
    });
  }

  // Terms checkbox styling
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', function () {
      if (this.checked) {
        this.parentElement.style.color = '#4caf50';
      } else {
        this.parentElement.style.color = '';
      }
    });
  }

  // Signup form submission
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const college = collegeSelect.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;

    // Check all required fields
    if (!fullName || !email || !college || !password || !confirmPassword) {
      showNotification('Please fill in all fields', 'error');

      // Highlight empty fields
      [fullNameInput, emailInput, collegeSelect, passwordInput, confirmPasswordInput].forEach(input => {
        if (!input.value) {
          input.closest('.input-with-icon').style.borderColor = '#f44336';
          input.closest('.input-with-icon').style.animation = 'shake 0.5s';
        }
      });

      return;
    }

    // Validate name format
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      showNotification('Name should contain only letters and spaces', 'error');
      fullNameInput.focus();
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      confirmPasswordInput.focus();
      confirmPasswordInput.closest('.input-with-icon').style.borderColor = '#f44336';
      confirmPasswordInput.closest('.input-with-icon').style.animation = 'shake 0.5s';
      return;
    }

    // Check password strength
    if (password.length < 8) {
      showNotification('Password must be at least 8 characters long', 'error');
      passwordInput.focus();
      return;
    }

    // Check terms acceptance
    if (!termsAccepted) {
      showNotification('Please accept the Terms & Conditions', 'error');
      termsCheckbox.parentElement.style.animation = 'shake 0.5s';
      termsCheckbox.parentElement.style.color = '#f44336';
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.btn-auth-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate API call
    setTimeout(() => {
      const userData = {
        fullName: fullName,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' ') || '',
        email: email,
        college: college,
        registrationDate: new Date().toISOString()
      };

      localStorage.setItem('campusrent_user', JSON.stringify(userData));

      showNotification(`Welcome ${userData.firstName}! Account created successfully!`, 'success');

      // Reset form (optional)
      // this.reset();

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    }, 2000);
  });

  // Social signup buttons
  const socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const providerText = this.querySelector('span').textContent;
      const provider = providerText.replace('Sign up with ', '');

      // Add loading animation
      const originalHTML = this.innerHTML;
      this.innerHTML = '<span style="display: flex; align-items: center; gap: 0.5rem;"><span class="spinner"></span> Connecting...</span>';
      this.disabled = true;
      this.style.opacity = '0.7';

      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.disabled = false;
        this.style.opacity = '1';
        showNotification(`${provider} signup coming soon!`, 'info');
      }, 1500);
    });
  });

  // Terms links
  const termsLinks = document.querySelectorAll('.terms-link');
  termsLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const type = this.textContent;
      showNotification(`Opening ${type}...`, 'info');
    });
  });

  // Add shake animation style if not exists
  if (!document.querySelector('#shake-animation')) {
    const shakeStyle = document.createElement('style');
    shakeStyle.id = 'shake-animation';
    shakeStyle.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(shakeStyle);
  }


/* ========================================
   DASHBOARD PAGE FUNCTIONALITY
======================================== */
if (document.querySelector('.dashboard-page')) {
  // Check if user is logged in
  const userData = JSON.parse(localStorage.getItem('campusrent_user') || '{}');

  if (!userData.email && !window.location.href.includes('dashboard.html')) {
    // Redirect to login if not authenticated (optional)
    // window.location.href = 'login.html';
  }

  // Update user info in dashboard
  const userNameElements = document.querySelectorAll('.user-name, .profile-name');
  userNameElements.forEach(el => {
    if (userData.firstName) {
      el.textContent = userData.firstName;
    }
  });

  const userCollegeElements = document.querySelectorAll('.user-college, .profile-college');
  userCollegeElements.forEach(el => {
    if (userData.college) {
      el.textContent = `(${userData.college})`;
    }
  });

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all tabs
      tabButtons.forEach(b => b.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      const tabName = this.textContent.trim();
      showNotification(`Switched to ${tabName}`, 'info');

      // Simulate loading content
      const mainContent = document.querySelector('.rentals-list');
      if (mainContent) {
        mainContent.style.opacity = '0.5';
        setTimeout(() => {
          mainContent.style.opacity = '1';
        }, 300);
      }
    });
  });

  // Sidebar navigation
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
  sidebarNavItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all items
      sidebarNavItems.forEach(i => i.classList.remove('active'));

      // Add active class to clicked item
      this.classList.add('active');

      const navText = this.querySelector('span:last-child').textContent;
      showNotification(`Navigating to ${navText}`, 'info');
    });
  });

  // Rental action buttons
  const manageButtons = document.querySelectorAll('.btn-manage');
  manageButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const rentalCard = this.closest('.rental-card');
      const itemName = rentalCard.querySelector('.rental-title').textContent;

      showNotification(`Managing: ${itemName}`, 'info');

      // Simulate opening management modal
      setTimeout(() => {
        alert(`Management options for ${itemName}:\n\n✓ View Details\n✓ Contact Owner\n✓ View Rental Agreement\n✓ Payment History`);
      }, 500);
    });
  });

  // Extend buttons
  const extendButtons = document.querySelectorAll('.btn-action:not(.btn-manage):not(.btn-danger)');
  extendButtons.forEach(btn => {
    if (btn.textContent.includes('Extend')) {
      btn.addEventListener('click', function () {
        const rentalCard = this.closest('.rental-card');
        const itemName = rentalCard.querySelector('.rental-title').textContent;

        const days = prompt('How many additional days do you need?', '7');
        if (days && !isNaN(days) && days > 0) {
          showNotification(`Extension request for ${days} days submitted for ${itemName}`, 'success');
        }
      });
    }
  });

  // Return buttons
  const returnButtons = document.querySelectorAll('.btn-danger');
  returnButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const rentalCard = this.closest('.rental-card');
      const itemName = rentalCard.querySelector('.rental-title').textContent;

      if (confirm(`Are you sure you want to return "${itemName}"?\n\nPlease ensure:\n✓ Item is in good condition\n✓ All accessories included\n✓ Return location coordinated`)) {
        // Animate card removal
        rentalCard.style.transition = 'all 0.5s ease';
        rentalCard.style.opacity = '0';
        rentalCard.style.transform = 'translateX(-100%)';

        setTimeout(() => {
          rentalCard.remove();
          showNotification('Return request submitted! Please coordinate with the owner.', 'success');
        }, 500);
      }
    });
  });

  // Post item button
  const postItemBtn = document.querySelector('.btn-post-item');
  if (postItemBtn) {
    postItemBtn.addEventListener('click', function () {
      showNotification('Opening item listing form...', 'info');

      setTimeout(() => {
        alert('Item Listing Form\n\n📝 Fill in:\n• Item name & description\n• Category\n• Photos\n• Price per day/week/month\n• Availability\n• Condition\n\nThis feature will be available soon!');
      }, 500);
    });
  }

  // List new item button (sidebar)
  const listItemBtn = document.querySelector('.btn-list-item');
  if (listItemBtn) {
    listItemBtn.addEventListener('click', function () {
      showNotification('Redirecting to listing form...', 'info');
    });
  }

  // Need item urgently button
  const needItemBtn = document.querySelector('.btn-need-item');
  if (needItemBtn) {
    needItemBtn.addEventListener('click', function () {
      const itemName = prompt('What item do you need urgently?');
      if (itemName) {
        showNotification(`We'll notify you when "${itemName}" becomes available!`, 'success');
      }
    });
  }

  // Messages functionality
  const messageItems = document.querySelectorAll('.message-item');
  messageItems.forEach(item => {
    item.addEventListener('click', function () {
      const senderName = this.querySelector('.message-sender').textContent;

      // Highlight selected message
      messageItems.forEach(m => m.style.background = '#f5f5f5');
      this.style.background = '#e0e0e0';

      showNotification(`Opening chat with ${senderName}`, 'info');
    });
  });

  // Search messages
  const messageSearchInput = document.querySelector('.message-search-input');
  if (messageSearchInput) {
    messageSearchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      messageItems.forEach(item => {
        const senderName = item.querySelector('.message-sender').textContent.toLowerCase();
        const messageText = item.querySelector('.message-preview').textContent.toLowerCase();

        if (senderName.includes(searchTerm) || messageText.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Reminder buttons
  const learnMoreBtn = document.querySelector('.btn-learn-more');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function () {
      showNotification('Opening damage protection details...', 'info');
      setTimeout(() => {
        alert('Damage Protection\n\n🛡️ Benefits:\n• Coverage up to ₹50,000\n• No claim paperwork\n• Instant replacement\n• Peace of mind\n\nPrice: ₹99/month\n\nProtect your rentals today!');
      }, 500);
    });
  }

  const requestReturnBtn = document.querySelector('.btn-request-return');
  if (requestReturnBtn) {
    requestReturnBtn.addEventListener('click', function () {
      const date = prompt('When would you like to return? (e.g., May 5th)');
      if (date) {
        showNotification(`Return scheduled for ${date}`, 'success');
      }
    });
  }

  // User profile dropdown
  const userProfileNav = document.getElementById('userProfileNav');
  if (userProfileNav) {
    userProfileNav.addEventListener('click', function () {
      const dropdown = document.createElement('div');
      dropdown.className = 'user-dropdown-menu';
      dropdown.innerHTML = `
        <div class="dropdown-item" onclick="window.location.href='dashboard.html'">📊 Dashboard</div>
        <div class="dropdown-item" onclick="alert('Profile settings coming soon!')">⚙️ Settings</div>
        <div class="dropdown-item" onclick="alert('Help center coming soon!')">❓ Help</div>
        <div class="dropdown-item" onclick="logoutUser()">🚪 Logout</div>
      `;
      dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        margin-top: 8px;
        min-width: 200px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
      `;

      // Remove existing dropdown
      const existingDropdown = document.querySelector('.user-dropdown-menu');
      if (existingDropdown) existingDropdown.remove();

      this.style.position = 'relative';
      this.appendChild(dropdown);

      // Close on click outside
      setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
          if (!userProfileNav.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
          }
        });
      }, 100);
    });
  }

  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-card .stat-number');
  statNumbers.forEach(stat => {
    const text = stat.textContent;
    const hasRupee = text.includes('₹');
    const number = parseInt(text.replace(/\D/g, ''));

    if (!isNaN(number)) {
      let current = 0;
      const increment = number / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          stat.textContent = (hasRupee ? '₹' : '') + number;
          clearInterval(timer);
        } else {
          stat.textContent = (hasRupee ? '₹' : '') + Math.floor(current);
        }
      }, 50);
    }
  });
}

// Logout function
function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('campusrent_user');
    showNotification('Logged out successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'home1.html'
    }, 1000);
  }
}

/* ========================================
   FAQS PAGE FUNCTIONALITY
======================================== */
if (document.querySelector('.faqs-content-section')) {
  // FAQ Category filtering
  const categoryTabs = document.querySelectorAll('.faq-category-tab');
  const categoryBlocks = document.querySelectorAll('.faq-category-block');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      const category = this.getAttribute('data-category');

      // Show/hide category blocks
      if (category === 'all') {
        categoryBlocks.forEach(block => {
          block.style.display = 'block';
          block.style.animation = 'fadeInUp 0.5s ease';
        });
      } else {
        categoryBlocks.forEach(block => {
          if (block.getAttribute('data-category') === category) {
            block.style.display = 'block';
            block.style.animation = 'fadeInUp 0.5s ease';
          } else {
            block.style.display = 'none';
          }
        });
      }

      // Scroll to first visible block
      const firstVisible = Array.from(categoryBlocks).find(block => block.style.display !== 'none');
      if (firstVisible) {
        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all other FAQs in the same category
      const parentBlock = item.closest('.faq-category-block');
      parentBlock.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
          otherItem.querySelector('.faq-toggle').textContent = '+';
        }
      });

      // Toggle current FAQ
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        toggle.textContent = '+';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';

        // Scroll item into view
        setTimeout(() => {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // FAQ search functionality
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqSearchBtn = document.querySelector('.faq-search-btn');

  function searchFAQs() {
    const searchTerm = faqSearchInput.value.toLowerCase();
    let foundCount = 0;

    if (!searchTerm) {
      // Show all FAQs if search is empty
      faqItems.forEach(item => {
        item.style.display = 'block';
      });
      categoryBlocks.forEach(block => {
        block.style.display = 'block';
      });
      return;
    }

    // Hide all category blocks first
    categoryBlocks.forEach(block => {
      block.style.display = 'none';
    });

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
      const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
      const parentBlock = item.closest('.faq-category-block');

      if (question.includes(searchTerm) || answer.includes(searchTerm)) {
        item.style.display = 'block';
        parentBlock.style.display = 'block';
        foundCount++;

        // Highlight search term
        const questionEl = item.querySelector('.faq-question h3');
        const originalText = questionEl.textContent;
        const highlightedText = originalText.replace(
          new RegExp(searchTerm, 'gi'),
          match => `<mark style="background: #fff59d; padding: 2px 4px; border-radius: 2px;">${match}</mark>`
        );
        questionEl.innerHTML = highlightedText;
      } else {
        item.style.display = 'none';
        // Reset highlighting
        const questionEl = item.querySelector('.faq-question h3');
        questionEl.textContent = questionEl.textContent;
      }
    });

    if (foundCount === 0) {
      showNotification(`No results found for "${searchTerm}"`, 'info');
    } else {
      showNotification(`Found ${foundCount} result${foundCount > 1 ? 's' : ''}`, 'success');
    }
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', searchFAQs);
    faqSearchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchFAQs();
      }
    });
  }

  if (faqSearchBtn) {
    faqSearchBtn.addEventListener('click', searchFAQs);
  }

  // Contact support button
  const contactSupportBtn = document.querySelector('.btn-contact-support');
  if (contactSupportBtn) {
    contactSupportBtn.addEventListener('click', function () {
      showNotification('Opening support chat...', 'info');

      setTimeout(() => {
        const issue = prompt('Please describe your issue:');
        if (issue) {
          showNotification('Support ticket created! We\'ll get back to you within 24 hours.', 'success');
        }
      }, 500);
    });
  }

  // Quick links and popular questions
  const quickLinks = document.querySelectorAll('.faq-quick-links a, .faq-popular a');
  quickLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const linkText = this.textContent.toLowerCase();

      // Simulate search for the question
      faqSearchInput.value = linkText;
      searchFAQs();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Expand all / Collapse all functionality
  const expandAllBtn = document.createElement('button');
  expandAllBtn.textContent = 'Expand All';
  expandAllBtn.className = 'btn-expand-all';
  expandAllBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    z-index: 999;
    transition: all 0.3s ease;
  `;

  document.body.appendChild(expandAllBtn);

  let allExpanded = false;
  expandAllBtn.addEventListener('click', function () {
    allExpanded = !allExpanded;

    faqItems.forEach(item => {
      const answer = item.querySelector('.faq-answer');
      const toggle = item.querySelector('.faq-toggle');

      if (allExpanded) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        toggle.textContent = '+';
      }
    });

    this.textContent = allExpanded ? 'Collapse All' : 'Expand All';
    showNotification(allExpanded ? 'All FAQs expanded' : 'All FAQs collapsed', 'info');
  });

  expandAllBtn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
  });

  expandAllBtn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
  });
}

/* ========================================
   ENHANCED FORM VALIDATION
======================================== */
// Add validation styles
const validationStyle = document.createElement('style');
validationStyle.textContent = `
  .dropdown-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .dropdown-item:hover {
    background: #f5f5f5;
  }
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .form-input:invalid {
    border-color: #f44336 !important;
  }
  .form-input:valid {
    border-color: #4caf50 !important;
  }
  mark {
    background: #fff59d;
    padding: 2px 4px;
    border-radius: 2px;
  }
`;
document.head.appendChild(validationStyle);