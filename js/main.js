/* ===========================
   THE SHOW LIST - Main JS
   =========================== */

// ===========================
// Work content (categories & films)
// ===========================
const WORK = {
  "music-videos": {
    preview: "videos/work/music-videos/preview.mp4",
    films: [
      { title: "Tinka",           src: "videos/work/music-videos/tinka.mp4",     thumb: "videos/work/music-videos/tinka.jpg" },
      { title: "Mrityulok",       src: "videos/work/music-videos/mrityulok.mp4", thumb: "videos/work/music-videos/mrityulok.jpg" }
    ]
  },
  "ads-tvc": {
    preview: "videos/work/ads-tvc/preview.mp4",
    films: [
      { title: "Clipbrb TVC",     src: "videos/work/ads-tvc/clipbrb.mp4",        thumb: "videos/work/ads-tvc/clipbrb.jpg" }
    ]
  },
  "short-films": {
    preview: "videos/work/short-films/preview.mp4",
    films: [
      { title: "Bus Stand",       src: "videos/work/short-films/bus-stand.mp4",  thumb: "videos/work/short-films/bus-stand.jpg" },
      { title: "Soup",            src: "videos/work/short-films/soup.mp4",       thumb: "videos/work/short-films/soup.jpg" }
    ]
  },
  "concerts": {
    preview: "videos/work/concerts/preview.mp4",
    films: [
      { title: "Day 1 Show",      src: "videos/work/concerts/day1.mp4",          thumb: "videos/work/concerts/day1.jpg" },
      { title: "Day 2 Show",      src: "videos/work/concerts/day2.mp4",          thumb: "videos/work/concerts/day2.jpg" }
    ]
  },
  "brand-films": {
    preview: "videos/work/brand-films/preview.mp4",
    films: [
      { title: "PW — Final 2K",   src: "videos/work/brand-films/pw-final.mp4",   thumb: "videos/work/brand-films/pw-final.jpg" },
      { title: "ProRes CC",       src: "videos/work/brand-films/prores-cc.mp4",  thumb: "videos/work/brand-films/prores-cc.jpg" }
    ]
  },
  "corporate-films": {
    preview: "videos/work/corporate-films/preview.mp4",
    films: [
      { title: "MMT Post Event",  src: "videos/work/corporate-films/mmt.mp4",        thumb: "videos/work/corporate-films/mmt.jpg" },
      { title: "Thames",          src: "videos/work/corporate-films/thames.mp4",     thumb: "videos/work/corporate-films/thames.jpg" },
      { title: "Day 1 Highlight", src: "videos/work/corporate-films/day1-highlight.mp4", thumb: "videos/work/corporate-films/day1-highlight.jpg" }
    ]
  }
};

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
    '.section-header, .about__grid, .contact__grid, .work-card'
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
// Drop-in Text (Nothing-style letters)
// ===========================
function splitDrop(el) {
  if (!el || el.dataset.dropped) return;
  el.dataset.dropped = "1";

  const base = (parseFloat(el.dataset.drop) || 0) * 260 + 120;
  const stagger = 42;
  let idx = 0;

  const makeChar = (ch) => {
    const s = document.createElement("span");
    s.className = "drop-char";
    s.textContent = ch === " " ? "\u00a0" : ch;
    s.style.animationDelay = `${base + idx * stagger}ms`;
    idx++;
    return s;
  };

  // Split a text node into whole-word spans (no mid-word breaks)
  // separated by real space chars, preserving nested elements (e.g. <em>).
  const splitTextNode = (textNode) => {
    const text = textNode.textContent;
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach(part => {
      if (part === "") return;
      if (/^\s+$/.test(part)) {
        for (const ch of part) frag.appendChild(makeChar(" "));
      } else {
        const word = document.createElement("span");
        word.className = "drop-word";
        for (const ch of part) word.appendChild(makeChar(ch));
        frag.appendChild(word);
      }
    });
    textNode.replaceWith(frag);
  };

  const walk = (node) => {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === 3) {
        splitTextNode(child);
      } else if (child.nodeType === 1) {
        walk(child);
      }
    });
  };

  walk(el);
}

function initDropText() {
  const drops = document.querySelectorAll('.drop');
  const dropObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        splitDrop(entry.target);
        dropObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -30px 0px' });

  drops.forEach(el => dropObserver.observe(el));
}

// ===========================
// Work Cards - background previews
// ===========================
function initWorkCards() {
  const cards = document.querySelectorAll('.work-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('.work-card__video');
      if (!video) return;
      if (entry.isIntersecting) {
        if (!video.getAttribute('src')) {
          video.setAttribute('src', video.dataset.src);
        }
        entry.target.classList.add('in-view');
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -20px 0px' });

  cards.forEach(card => cardObserver.observe(card));
}

// ===========================
// Contact Form (FormSubmit AJAX -> tshowlist@gmail.com)
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const statusEl = document.getElementById('formStatus');

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/tshowlist@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New enquiry from ${name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      if (String(data.success) !== 'true') throw new Error(data.message || 'Failed');

      contactForm.reset();
      btn.innerHTML = 'Message Sent';
      if (statusEl) {
        statusEl.textContent = "Thanks! Your message has been sent. We'll be in touch shortly.";
        statusEl.classList.add('is-success');
      }

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 4000);
    } catch (err) {
      // Fallback: open the visitor's email app so the message isn't lost
      const subject = encodeURIComponent(`New enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href =
        `mailto:tshowlist@gmail.com?subject=${subject}&body=${body}`;

      btn.innerHTML = originalText;
      btn.disabled = false;
      if (statusEl) {
        statusEl.textContent = 'Opening your email app as a backup...';
        statusEl.classList.add('is-error');
      }
    }
  });
}

// ===========================
// Work Lightbox with Playlist
// ===========================
const lightbox = document.getElementById('projectLightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxPlaylist = document.getElementById('lightboxPlaylist');
const lightboxClose = document.getElementById('lightboxClose');

let currentWork = null;
let currentIndex = 0;

function openLightbox(category) {
  const item = WORK[category];
  if (!item) return;

  currentWork = item;
  currentIndex = 0;

  // Build playlist
  lightboxPlaylist.innerHTML = item.films.map((film, i) => `
    <div class="lightbox__thumb" data-i="${i}" role="button" tabindex="0" aria-label="Play ${film.title}">
      <img src="${film.thumb}" alt="${film.title}" loading="lazy">
      <span>${film.title}</span>
    </div>
  `).join('');

  lightboxPlaylist.querySelectorAll('.lightbox__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => selectFilm(Number(thumb.dataset.i)));
  });

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  selectFilm(0);
}

function selectFilm(index) {
  const film = currentWork.films[index];
  if (!film) return;
  currentIndex = index;

  lightboxVideo.src = film.src;
  lightboxTitle.textContent = film.title;
  lightboxVideo.play().catch(() => {});

  document.querySelectorAll('.lightbox__thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.load();
}

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.category));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
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
    if (lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
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
  initDropText();
  initWorkCards();
  updateActiveNav();
});