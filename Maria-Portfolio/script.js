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
document.querySelectorAll('a, button, .portfolio-item, .skill-card, .testi-card, .social-link').forEach(el => {
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
  'Brand Strategist',
  'Social Media Artist',
  'Visual Storyteller',
  'Creative Director'
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


// ─── SKILL BARS ──────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const fill = bar.querySelector('.skill-bar-fill');
      const targetWidth = bar.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = targetWidth + '%';
      }, 200);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));


// ─── PORTFOLIO FILTER ────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active btn
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach((item, i) => {
      const category = item.getAttribute('data-category');
      const show = filter === 'all' || category === filter;

      if (show) {
        item.classList.remove('hidden');
        item.style.animation = 'none';
        item.offsetHeight; // reflow
        item.style.animation = `fadeScaleIn 0.4s ease ${i * 0.05}s both`;
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Inject keyframe if not already in stylesheet
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeScaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(styleSheet);


// ─── PORTFOLIO MODAL ─────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');
const modalClose = document.getElementById('modalClose');
const modalImgWrap = document.getElementById('modalImgWrap');
const modalCat = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(item) {
  const category = item.getAttribute('data-category');
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

  // Scale up the design elements
  const designEl = clonedImg.querySelector('[class^="port-design"]');
  if (designEl) {
    designEl.style.transform = 'scale(1.2)';
  }

  modalImgWrap.innerHTML = '';
  modalImgWrap.appendChild(clonedImg);
  modalImgWrap.style.background = getComputedStyle(originalImg).background;

  // Capitalize category
  modalCat.textContent = category.charAt(0).toUpperCase() + category.slice(1);
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
portfolioItems.forEach(item => {
  item.addEventListener('click', () => openModal(item));
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


// ─── CONTACT FORM ────────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-primary');
  const originalContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent! 🎉</span> <i class="fa-solid fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1500);
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


// ─── STAT COUNTER ANIMATION ──────────────────
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent;
      const hasPlus = raw.includes('+');
      const target = parseInt(raw.replace(/\D/g, ''));

      let current = 0;
      const increment = Math.ceil(target / 50);
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + (hasPlus ? '+' : '');
      }, 30);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));


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
portfolioItems.forEach(item => {
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


// ─── HERO BADGE GLOW PULSE ───────────────────
// Already done via CSS animation, JS polish here
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
  setInterval(() => {
    heroBadge.style.boxShadow = '0 0 20px rgba(255,107,53,0.3)';
    setTimeout(() => { heroBadge.style.boxShadow = ''; }, 600);
  }, 2000);
}


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
