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
// AUTO-SCROLL — RAF-driven, no CSS animation (arrows work!)
// ============================================================
const scrollers = {};

function setupAutoScroll(sectionId) {
  const container = document.querySelector(`#${sectionId} .scroll-content`);
  if (!container || container.dataset.cloned) return;

  // Clone items for seamless infinite loop
  [...container.children].forEach(item => {
    const clone = item.cloneNode(true);
    clone.dataset.isClone = 'true';
    container.appendChild(clone);
  });
  container.dataset.cloned = 'true';

  // Disable CSS animation — we drive it with JS instead
  container.style.animation = 'none';
  container.style.willChange = 'transform';

  let pos = 0;
  let paused = false;
  const SPEED = 0.55; // px per frame (~33px/s at 60fps)

  function half() { return container.scrollWidth / 2; }

  function tick() {
    if (!paused) {
      pos += SPEED;
      if (pos >= half()) pos -= half();
      container.style.transform = `translateX(-${pos}px)`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  container.addEventListener('mouseenter', () => { if (!container._cardOpen) paused = true; });
  container.addEventListener('mouseleave', () => { if (!container._cardOpen) paused = false; });

  scrollers[sectionId] = {
    pause()  { container._cardOpen = true;  paused = true; },
    resume() { container._cardOpen = false; paused = false; },
    nudge(dx) {
      // dx > 0 = left arrow (scroll back), dx < 0 = right arrow (scroll forward)
      paused = true;
      pos = Math.max(0, Math.min(pos - dx, half() - 1));
      container.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';
      container.style.transform = `translateX(-${pos}px)`;
      setTimeout(() => {
        container.style.transition = 'none';
        if (!container._cardOpen) paused = false;
      }, 370);
    }
  };
}

// ============================================================
// CARD EXPAND / COLLAPSE
// ============================================================
function toggleCard(card) {
  if (!card) return;
  const body = card.querySelector('.card-body');
  const btn  = card.querySelector('.toggle-btn');
  if (!body) return;

  const isOpen = body.classList.contains('active');
  const section = card.closest('section') || card.closest('.certifications');
  const sectionId = section?.id;

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
// SCROLL ARROW BUTTONS
// ============================================================
function setupManualScroll() {
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const s = scrollers[btn.dataset.section];
      if (s) s.nudge(btn.classList.contains('scroll-left') ? 420 : -420);
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
