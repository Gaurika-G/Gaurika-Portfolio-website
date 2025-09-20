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

// Enhanced expandable card functionality
function setupExpandableCards() {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const card = e.currentTarget.closest('.card');
      const body = card.querySelector('.card-body');
      const isOpen = body.classList.contains('active');
      
      // Get the specific section's scroll container
      const section = card.closest('.cards-section, .certifications');
      const sectionScrollContainer = section ? section.querySelector('.scroll-content') : null;
      
      // Close all other cards in the same section first
      const allCardsInSection = section ? section.querySelectorAll('.card') : [];
      allCardsInSection.forEach(otherCard => {
        if (otherCard !== card) {
          const otherBody = otherCard.querySelector('.card-body');
          const otherBtn = otherCard.querySelector('.toggle-btn');
          if (otherBody && otherBody.classList.contains('active')) {
            otherBody.classList.remove('active');
            otherBody.style.maxHeight = '0';
            otherBody.style.padding = '0 2.5rem';
            otherBody.style.overflow = 'hidden';
          }
          if (otherBtn) {
            otherBtn.classList.remove('active');
          }
        }
      });
      
      // Toggle current card
      if (isOpen) {
        body.classList.remove('active');
        body.style.maxHeight = '0';
        body.style.padding = '0 2.5rem';
        body.style.overflow = 'hidden';
        e.currentTarget.classList.remove('active');
        
        // Resume auto-scroll for this section when closing
        if (sectionScrollContainer) {
          sectionScrollContainer.classList.remove('paused');
          sectionScrollContainer.style.animation = '';
        }
      } else {
        body.classList.add('active');
        body.style.maxHeight = '250px'; // Fixed height for better positioning
        body.style.padding = '0 2.5rem 2.5rem';
        body.style.overflow = 'hidden';
        e.currentTarget.classList.add('active');
        
        // Pause auto-scroll only for this specific section when opening
        if (sectionScrollContainer) {
          sectionScrollContainer.classList.add('paused');
          sectionScrollContainer.style.animation = 'none';
        }
        
        // Scroll the card into view if needed
        setTimeout(() => {
          card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }, 100);
      }
    });
  });

  // Allow clicking on the entire card to expand/collapse
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

// Enhanced manual scroll functionality
function setupManualScroll() {
  const scrollButtons = document.querySelectorAll('.scroll-btn');
  
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const direction = btn.classList.contains('scroll-left') ? 1 : -1;
      const sectionName = btn.getAttribute('data-section');
      const scrollContainer = document.querySelector(`#${sectionName} .scroll-content`);
      
      if (scrollContainer) {
        // Add loading state
        btn.classList.add('loading');
        
        // Pause auto-scroll temporarily
        scrollContainer.classList.add('paused');
        scrollContainer.style.animation = 'none';
        
        const scrollAmount = 400;
        const currentTransform = scrollContainer.style.transform || 'translateX(0px)';
        const currentX = parseInt(currentTransform.match(/-?\d+/) || [0])[0];
        const newX = currentX + (direction * scrollAmount);

        const containerWidth = scrollContainer.parentElement.offsetWidth;
        const contentWidth = scrollContainer.scrollWidth / 2; // Account for duplicated content
        const maxScroll = -(contentWidth - containerWidth);

        // Handle infinite scroll wrapping
        let boundedX = newX;
        if (newX < maxScroll) {
          boundedX = 0; // Reset to beginning for infinite scroll
        } else if (newX > 0) {
          boundedX = maxScroll; // Go to end
        }

        // Smooth transition
        scrollContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollContainer.style.transform = `translateX(${boundedX}px)`;
        
        // Resume auto-scroll after delay
        setTimeout(() => {
          scrollContainer.classList.remove('paused');
          scrollContainer.style.animation = '';
          scrollContainer.style.transition = '';
          btn.classList.remove('loading');
        }, 3000);
      }
    });
  });
}

// Enhanced auto-scroll setup for all sections
function setupAutoScroll(sectionId, duration = 30) {
  const scrollContainer = document.querySelector(`#${sectionId} .scroll-content`);
  if (!scrollContainer) return;

  // Only clone if not already cloned
  if (!scrollContainer.dataset.cloned) {
    const items = [...scrollContainer.children];
    items.forEach(item => {
      const clone = item.cloneNode(true);
      scrollContainer.appendChild(clone);
    });
    scrollContainer.dataset.cloned = 'true';
  }

  scrollContainer.style.display = "flex";
  scrollContainer.style.animation = `scroll-${sectionId} ${duration}s linear infinite`;
  scrollContainer.classList.add('auto-scrolling');
  
  // Ensure proper gap between cards
  scrollContainer.style.gap = "2rem";
}

// Inject smooth keyframes for all sections
function injectScrollKeyframes(sectionId) {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes scroll-${sectionId} {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);
}

// Pause auto-scroll on hover
function setupScrollPause() {
  const scrollSections = ['experience', 'projects', 'certifications'];
  
  scrollSections.forEach(sectionName => {
    const scrollContainer = document.querySelector(`#${sectionName} .scroll-content`);
    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', () => {
        scrollContainer.classList.add('paused');
      });
      
      scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.classList.remove('paused');
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1000);
  setupExpandableCards();
  setupManualScroll();
  setupScrollPause();

  // Setup auto-scroll for all sections
  const sections = ['experience', 'projects', 'certifications'];
  sections.forEach(section => {
    injectScrollKeyframes(section);
    setupAutoScroll(section, 30);
  });

  // Contact form handling with EmailJS simulation
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        // Get form data
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto URL
        const mailtoUrl = `mailto:g5gupta@uwaterloo.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        
        // Open default email client
        window.location.href = mailtoUrl;
        
        // Simulate some delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        formMessage.textContent = 'Your email client has been opened with the message. Please send the email to complete your request.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        
      } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'There was an error processing your request. Please try again or email directly at g5gupta@uwaterloo.ca.';
        formMessage.className = 'form-message error';
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
      
      formMessage.style.opacity = '1';
      
      // Hide message after 8 seconds
      setTimeout(() => {
        formMessage.style.opacity = '0';
      }, 8000);
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

  // Enhanced smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          
          const bars = hamburger.querySelectorAll('.bar');
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
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

});