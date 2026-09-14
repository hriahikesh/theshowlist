/* ===========================
   THE SHOW LIST - Main JS
   =========================== */

// ===========================
// Header Scroll
// ===========================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.pageYOffset > 80);
});

// ===========================
// Mobile Menu
// ===========================
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileNav.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav__link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===========================
// Active Nav on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__link');

function updateActiveNav() {
  const scrollPos = window.pageYOffset + 200;
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// Scroll Reveal Animations
// ===========================
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-header, .about__grid, .contact__grid, .showreel__video-wrap'
  );
  
  elements.forEach(el => el.classList.add('reveal'));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  elements.forEach(el => observer.observe(el));
}

// ===========================
// WhatsApp Contact Form
// ===========================
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  
  // Your WhatsApp number (replace with your actual number)
  const whatsappNumber = '919934401081';
  
  // Create WhatsApp message
  const whatsappMessage = `Hi, I'm ${name}.\n\nPhone: ${phone}\n\nMessage: ${message}`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  
  // Open WhatsApp
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  
  // Reset form
  this.reset();
  
  // Show thank you message
  const btn = this.querySelector('button');
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Opening WhatsApp...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 2000);
});

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// Keyboard Controls
// ===========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileNav.classList.contains('active')) {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ===========================
// Parallax on Hero
// ===========================
window.addEventListener('scroll', () => {
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo && window.pageYOffset < window.innerHeight) {
    heroVideo.style.transform = `scale(1.1) translateY(${window.pageYOffset * 0.15}px)`;
  }
});

// ===========================
// Init
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  updateActiveNav();
});
