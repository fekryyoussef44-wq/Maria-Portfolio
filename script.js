/* ========================================
   MARIA EMAD — PORTFOLIO JAVASCRIPT
   ======================================== */

'use strict';

// ─── CUSTOM CURSOR ───────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

// Smooth cursor lag
function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  cursorX += dx * 0.12;
  cursorY += dy * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ─── NAVBAR SCROLL ───────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── HAMBURGER MENU ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks.classList.toggle('open', menuOpen);
  // Animate hamburger spans
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ─── TYPING ANIMATION ────────────────────────
const typedEl = document.getElementById('typed');
const words = [
  'Graphic Designer',
  'Visual Artist',
  'Design Student'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
    typingSpeed = 50;
  } else {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === current.length) {
    typingSpeed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

setTimeout(type, 600);

// ─── SCROLL REVEAL ───────────────────────────
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── PORTFOLIO MODAL ─────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');
const modalClose = document.getElementById('modalClose');
const modalImgWrap = document.getElementById('modalImgWrap');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(item) {
  const title = item.getAttribute('data-title');
  const desc = item.getAttribute('data-desc');

  // Clone the port-img div for the modal
  const originalImg = item.querySelector('.port-img');
  const clonedImg = originalImg.cloneNode(true);

  // Reuse the design styles, resize for modal
  clonedImg.style.cssText = `
    width: 100%;
    height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `;

  modalImgWrap.innerHTML = '';
  modalImgWrap.appendChild(clonedImg);
  modalImgWrap.style.background = getComputedStyle(originalImg).background;

  modalTitle.textContent = title;
  modalDesc.textContent = desc;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Attach click to view buttons
document.querySelectorAll('.port-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = btn.closest('.portfolio-item');
    openModal(item);
  });
});

// Also click on the item itself
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => openModal(item));
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── SMOOTH SCROLL ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── PARALLAX HERO ORBS ──────────────────────
const heroOrbs = document.querySelectorAll('.hero-orb');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroOrbs.forEach((orb, i) => {
    const speed = 0.08 * (i + 1);
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ─── ACTIVE NAV LINK ON SCROLL ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--orange)';
    }
  });
}, { passive: true });

// ─── TILT EFFECT ON PORTFOLIO CARDS ──────────
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    item.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

// ─── INITIAL REVEAL FOR HERO ─────────────────
// Hero elements animate in on load
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal-up, .hero .reveal-right');
  heroReveals.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 100 + (i * 100));
  });
});