/**
 * Punkeye Pictures - Site behaviour
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initHeaderScroll();
});

// Navigation - active state & mobile menu
function initNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  if (menuToggle && nav) {
    const updateMenuState = (isOpen) => {
      nav.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    menuToggle.addEventListener('click', () => updateMenuState(!nav.classList.contains('open')));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        updateMenuState(false);
        menuToggle.focus();
      }
    });
  }
}

// Scroll reveal animation (respect reduced motion)
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = prefersReducedMotion ? 0 : i * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// Header background on scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
