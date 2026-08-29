/* ===========================
   THE SHOW LIST - Main JS
   =========================== */

// Crew Data
const crewData = {
  '1': {
    name: 'Arjun Mehta',
    role: 'Director & Founder',
    img: 'images/crew-1.jpg',
    bio: 'With over 12 years in the industry, Arjun brings a unique vision to every project. His work spans commercials, feature films, and documentaries, earning recognition at international film festivals.',
    credits: ['Beyond the Frame (2024)', 'Urban Stories (2023)', 'Nike - Just Dream (2023)', 'The Last Train Home (2022)']
  },
  '2': {
    name: 'Priya Sharma',
    role: 'Lead Cinematographer',
    img: 'images/crew-2.jpg',
    bio: 'Priya\'s eye for composition and lighting has defined our visual signature. Trained at FTII Pune, she brings technical precision and artistic sensitivity to every frame.',
    credits: ['Midnight Express (2024)', 'Golden Hour (2023)', 'Samsung - Galaxy (2023)', 'Monsoon Tales (2022)']
  },
  '3': {
    name: 'Rohit Kumar',
    role: 'Senior Editor',
    img: 'images/crew-3.jpg',
    bio: 'Rohit is the rhythm keeper of our stories. His editing style blends seamless transitions with powerful pacing, keeping audiences engaged from start to finish.',
    credits: ['Silent Voices (2024)', 'Apple - Think Different (2023)', 'City of Dreams (2022)', 'The Way Back (2021)']
  },
  '4': {
    name: 'Neha Patel',
    role: 'Color Grading Artist',
    img: 'images/crew-4.jpg',
    bio: 'Neha transforms raw footage into cinematic masterpieces. Her color grading techniques have become our signature look, recognized across the industry.',
    credits: ['All Major Projects (2022-2024)', 'Netflix - Original Grade (2023)', 'Spotify Campaign (2023)']
  },
  '5': {
    name: 'Vikram Singh',
    role: 'Producer',
    img: 'images/crew-5.jpg',
    bio: 'Vikram ensures every project runs smoothly from pre-production to delivery. His strategic approach to budgeting and scheduling has made him invaluable.',
    credits: ['Project Management (2020-2024)', '50+ Commercial Projects', 'Feature Film Productions']
  },
  '6': {
    name: 'Ananya Reddy',
    role: 'Production Designer',
    img: 'images/crew-6.jpg',
    bio: 'Ananya transforms spaces into stories. Her attention to detail in set design, props, and visual elements creates authentic worlds for our narratives.',
    credits: ['Beyond the Frame (2024)', 'Golden Hour (2023)', 'Brand Set Designs (2022-2024)']
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
    '.section-header, .project-card, .about__grid, .contact__grid, .showreel__video-wrap'
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
// Crew Cards Animation - One by One
// ===========================
function initCrewAnimation() {
  const crewGrid = document.querySelector('.crew__grid');
  const crewCards = document.querySelectorAll('.crew-card');
  
  if (!crewGrid) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate cards one by one with delay
        crewCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-in');
          }, index * 150); // 150ms delay between each card
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(crewGrid);
}

// ===========================
// Crew Modal
// ===========================
const crewModal = document.getElementById('crewModal');

document.querySelectorAll('.crew-card').forEach(card => {
  card.addEventListener('click', function() {
    const memberId = this.dataset.member;
    const data = crewData[memberId];
    
    if (data) {
      document.getElementById('modalImg').src = data.img;
      document.getElementById('modalImg').alt = data.name;
      document.getElementById('modalName').textContent = data.name;
      document.getElementById('modalRole').textContent = data.role;
      document.getElementById('modalBio').textContent = data.bio;
      
      const creditsList = document.getElementById('modalCredits');
      creditsList.innerHTML = data.credits.map(c => `<li>${c}</li>`).join('');
      
      crewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeCrewModal() {
  crewModal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelector('.crew-modal__close').addEventListener('click', closeCrewModal);
crewModal.addEventListener('click', (e) => {
  if (e.target === crewModal) closeCrewModal();
});

// ===========================
// Contact Form
// ===========================
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const btn = this.querySelector('button');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = 'Sending...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = 'Message Sent!';
    this.reset();
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2500);
  }, 1500);
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
    closeCrewModal();
    
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
  initCrewAnimation();
  updateActiveNav();
});
