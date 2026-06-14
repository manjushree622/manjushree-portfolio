/**
 * Personal Portfolio Website Script File
 * Owner: Manjushree (Computer Science Student - AI & DS)
 * Description: Implements theme switching, page load mechanics, navbar transitions, typing animation,
 *              scroll-reveal animations, skill progress bars activation, and contact form validation.
 */

// Immediate theme check (runs before DOM completely ready to avoid color flash)
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. THEME SWITCHER LOGIC
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  
  const updateToggleIcon = (theme) => {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'bi bi-sun-fill';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
  };
  
  // Set initial icon state
  updateToggleIcon(savedTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateToggleIcon(newTheme);
    });
  }
  // 1. PRELOADER LOADING SCREEN
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Fade out effect
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }

  // ==========================================
  // 2. NAV BAR SCROLLED TRANSITION
  // ==========================================
  const mainNavbar = document.getElementById('mainNavbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      mainNavbar.classList.add('navbar-scrolled');
    } else {
      mainNavbar.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);
  // Initial check on load
  handleNavbarScroll();

  // ==========================================
  // 3. SMOOTH TYPING ANIMATION (HERO)
  // ==========================================
  const typingTarget = document.getElementById('typing-tagline');
  const taglines = [
    "Computer Science Student",
    "AI & Data Science Enthusiast",
    "Passionate Programmer",
    "Innovative Thinker"
  ];
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeEffect = () => {
    const currentTagline = taglines[taglineIndex];
    
    if (isDeleting) {
      // Deleting characters
      typingTarget.textContent = currentTagline.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      // Adding characters
      typingTarget.textContent = currentTagline.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // Checking word boundaries
    if (!isDeleting && charIndex === currentTagline.length) {
      // Word is fully typed - pause before deleting
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word is deleted - move to the next word
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      typingSpeed = 500; // Small delay before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  };

  // Start typing if target element exists
  if (typingTarget) {
    setTimeout(typeEffect, 1000);
  }

  // ==========================================
  // 4. INTERSECTION OBSERVER FOR SCROLL REVEAL
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once active, stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================
  // 5. ANIMATED SKILL PROGRESS BARS
  // ==========================================
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.getAttribute('data-width');
        progressBar.style.width = targetWidth;
        // Stop observing once animation triggered
        observer.unobserve(progressBar);
      }
    });
  }, {
    threshold: 0.5
  });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });

  // ==========================================
  // 6. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  const handleScrollTopButtonVisibility = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  };
  
  window.addEventListener('scroll', handleScrollTopButtonVisibility);

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 7. DOWNLOAD RESUME SIMULATION
  // ==========================================
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Resume download initiated! (Demo Resume Placeholder)');
    });
  }

  // ==========================================
  // 8. CONTACT FORM CLIENT-SIDE VALIDATION
  // ==========================================
  const contactForm = document.getElementById('portfolioContactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const subjectInput = document.getElementById('formSubject');
      const messageInput = document.getElementById('formMessage');
      
      // Name validation: cannot be blank and must be at least 2 chars
      if (nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      // Email validation: regex matches standard patterns
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      // Subject validation: at least 4 chars
      if (subjectInput.value.trim().length < 4) {
        subjectInput.classList.add('is-invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
      }

      // Message validation: at least 10 chars
      if (messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
      }

      // If valid, submit simulation
      if (isValid) {
        // Show success banner
        formSuccess.style.display = 'flex';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset the form fields
        contactForm.reset();
        
        // Hide success banner after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }
    });

    // Real-time input validation triggers (clearing errors on input change)
    const inputs = contactForm.querySelectorAll('.form-control-custom');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  // ==========================================
  // 9. CLOSE RESPONSIVE NAV ON ITEM CLICK
  // ==========================================
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
});
