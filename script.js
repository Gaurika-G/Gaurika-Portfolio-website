// ============================================================
// TYPING EFFECT
// ============================================================
const typingText = document.getElementById('typing-text');
const words = ['Machine Learning Engineer', 'Full-stack Developer', 'Data Scientist', 'Software Engineer'];
let wordIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

function typeEffect() {
  const word = words[wordIndex];
  typingText.textContent = word.substring(0, charIndex);
  if (!isDeleting && charIndex < word.length) { charIndex++; typingSpeed = 100; }
  else if (isDeleting && charIndex > 0)       { charIndex--; typingSpeed = 50; }
  else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    typingSpeed = isDeleting ? 1600 : 500;
  }
  setTimeout(typeEffect, typingSpeed);
}

// ============================================================
// AUTO-SCROLL — CSS animation (compositor-friendly, no RAF)
// ============================================================
const scrollers = {};

function setupAutoScroll(sectionId) {
  const container = document.querySelector(`#${sectionId} .scroll-content`);
  if (!container || container.dataset.cloned) return;

  [...container.children].forEach(item => {
    const clone = item.cloneNode(true);
    clone.dataset.isClone = 'true';
    container.appendChild(clone);
  });
  container.dataset.cloned = 'true';

  container.addEventListener('mouseenter', () => { if (!container._cardOpen) container.classList.add('paused'); });
  container.addEventListener('mouseleave', () => { if (!container._cardOpen) container.classList.remove('paused'); });

  scrollers[sectionId] = {
    pause()  { container._cardOpen = true;  container.classList.add('paused'); },
    resume() { container._cardOpen = false; container.classList.remove('paused'); },
    nudge(dx) {
      const style = getComputedStyle(container);
      const matrix = new DOMMatrix(style.transform);
      let x = matrix.m41 + dx;
      const half = container.scrollWidth / 2;
      if (x > 0) x = -half + 20;
      if (x < -half) x = 0;
      container.classList.add('paused');
      container.style.transition = 'transform 0.25s ease';
      container.style.transform = `translateX(${x}px)`;
      setTimeout(() => {
        container.style.transition = '';
        const pct = Math.abs(x) / half;
        container.style.animationDelay = `-${pct * 32}s`;
        container.style.transform = '';
        if (!container._cardOpen) container.classList.remove('paused');
      }, 280);
    }
  };
}

// ============================================================
// CARD EXPAND / COLLAPSE — pure CSS class toggle
// ============================================================
function toggleCard(card) {
  if (!card) return;
  const body = card.querySelector('.card-body');
  const btn  = card.querySelector('.toggle-btn');
  if (!body) return;

  const isOpen = body.classList.contains('active');
  const section = card.closest('section') || card.closest('.certifications');
  const sectionId = section?.id;

  // Close every other open card
  document.querySelectorAll('.card-body.active').forEach(openBody => {
    const other = openBody.closest('.card');
    if (other === card) return;
    openBody.classList.remove('active');
    other.classList.remove('card-expanded');
    other.querySelector('.toggle-btn')?.classList.remove('active');
    const otherSec = other.closest('section') || other.closest('.certifications');
    if (otherSec?.id && scrollers[otherSec.id]) scrollers[otherSec.id].resume();
  });

  if (isOpen) {
    body.classList.remove('active');
    card.classList.remove('card-expanded');
    if (btn) btn.classList.remove('active');
    if (sectionId && scrollers[sectionId]) scrollers[sectionId].resume();
  } else {
    body.classList.add('active');
    card.classList.add('card-expanded');
    if (btn) btn.classList.add('active');
    if (sectionId && scrollers[sectionId]) scrollers[sectionId].pause();
  }
}

// Event delegation — works on original + cloned cards
function setupExpandableCards() {
  document.addEventListener('click', e => {
    if (e.target.tagName === 'A') return;
    const btn = e.target.closest('.toggle-btn');
    if (btn) { e.stopPropagation(); toggleCard(btn.closest('.card')); return; }
    const card = e.target.closest('.card');
    if (card) toggleCard(card);
  });
}

// ============================================================
// MANUAL SCROLL BUTTONS
// ============================================================
function setupManualScroll() {
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const s = scrollers[btn.dataset.section];
      if (s) s.nudge(btn.classList.contains('scroll-left') ? 500 : -500);
    });
  });
}

// ============================================================
// CONTACT FORM
// ============================================================
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const msg  = document.getElementById('formMessage');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;
    window.location.href = `mailto:g5gupta@uwaterloo.ca?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`)}`;
    await new Promise(r => setTimeout(r, 1400));
    msg.textContent = 'Email client opened — please send to complete your message.';
    msg.className = 'form-message success';
    msg.style.opacity = '1';
    form.reset();
    btn.innerHTML = orig; btn.disabled = false;
    setTimeout(() => { msg.style.opacity = '0'; }, 8000);
  });
}

// ============================================================
// MOBILE MENU
// ============================================================
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;
  const close = () => { hamburger.classList.remove('active'); navMenu.classList.remove('active'); };
  hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('active'); });
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
    });
  });
}

// ============================================================
// NAVBAR
// ============================================================
function setupNavbar() {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80), { passive: true });
}

// ============================================================
// SCROLL-IN ANIMATIONS
// ============================================================
function setupScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.skills-column, .about-info, .contact-info').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(el);
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 800);
  setupExpandableCards();
  setupManualScroll();
  setupContactForm();
  setupMobileMenu();
  setupSmoothScroll();
  setupNavbar();
  setupScrollAnimations();
  ['experience', 'projects', 'certifications'].forEach(id => setupAutoScroll(id));
});
