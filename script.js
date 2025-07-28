// Typing Effect
const typingText = document.getElementById('typing-text');
const words = ['Machine Learning Engineer', 'Full-stack Developer', 'Data Scientist', 'Software Engineer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  typingText.textContent = currentChar;
  typingText.classList.add('typing-cursor');

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    typingSpeed = 100;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    typingSpeed = 50;
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    typingSpeed = isDeleting ? 1500 : 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Expandable card functionality
function setupExpandableCards() {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.currentTarget.closest('.card');
      const body = card.querySelector('.card-body');
      const isOpen = body.classList.contains('active');
      
      // Close all other cards in the same section
      const section = card.closest('.cards-section, .certifications');
      const allCards = section.querySelectorAll('.card');
      allCards.forEach(otherCard => {
        if (otherCard !== card) {
          const otherBody = otherCard.querySelector('.card-body');
          const otherBtn = otherCard.querySelector('.toggle-btn');
          if (otherBody) {
            otherBody.classList.remove('active');
            otherBody.style.display = 'none';
          }
          if (otherBtn) {
            otherBtn.classList.remove('active');
          }
        }
      });
      
      // Toggle current card
      if (isOpen) {
        body.classList.remove('active');
        body.style.display = 'none';
        e.currentTarget.classList.remove('active');
      } else {
        body.classList.add('active');
        body.style.display = 'block';
        e.currentTarget.classList.add('active');
      }
    });
  });

  // Also allow clicking on the entire card to expand/collapse
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on the toggle button or links
      if (e.target.closest('.toggle-btn') || e.target.tagName === 'A') {
        return;
      }
      
      const toggleBtn = card.querySelector('.toggle-btn');
      if (toggleBtn) {
        toggleBtn.click();
      }
    });
  });
}

// Auto-scroll functionality for sections
function setupAutoScroll() {
  const scrollSections = ['experience', 'projects', 'certifications'];
  
  scrollSections.forEach(sectionName => {
    const container = document.querySelector(`#${sectionName} .scroll-content, #${sectionName} .cert-grid`);
    if (!container) return;

    // Duplicate content for seamless infinite scroll
    const items = container.children;
    const itemsArray = Array.from(items);
    
    // Clone all items and append them for infinite scroll
    itemsArray.forEach(item => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });

    // Pause animation on hover
    container.addEventListener('mouseenter', () => {
      container.style.animationPlayState = 'paused';
    });

    container.addEventListener('mouseleave', () => {
      container.style.animationPlayState = 'running';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Start typing effect
  setTimeout(typeEffect, 1000);

  // Setup expandable cards
  setupExpandableCards();

  // Setup auto-scroll
  setupAutoScroll();

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        
      } catch (error) {
        formMessage.textContent = 'There was an error sending your message. Please try again later.';
        formMessage.className = 'form-message error';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      
      formMessage.style.opacity = '1';
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.opacity = '0';
      }, 5000);
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Animate hamburger bars
      const bars = hamburger.querySelectorAll('.bar');
      if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.skills-column, .about-info, .contact-info');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home');
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Add custom cursor effect
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div>';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  // Add loading animation on page load
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});