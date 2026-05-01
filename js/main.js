/**
 * Punkeye Pictures - Site behaviour
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initHeaderScroll();
  initAttributionParams();
  initAnalyticsEvents();
});

// Navigation - active state & mobile menu
function initNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (link.hasAttribute('aria-current')) {
      link.removeAttribute('aria-current');
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

    // Close menu when clicking outside (including nav links; exclude toggle so it can open/close)
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (menuToggle.contains(e.target)) return;
      updateMenuState(false);
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
  }, { threshold: 0.1, rootMargin: '0px 0px 0px 0px' });

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

function initAttributionParams() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'];
  const attribution = {};

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value;
  });

  if (Object.keys(attribution).length > 0) {
    localStorage.setItem('punkeye_attribution', JSON.stringify(attribution));
  }
}

function initAnalyticsEvents() {
  const hasUmami = window.umami && typeof window.umami.track === 'function';
  if (!hasUmami) return;

  const attribution = getAttribution();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    const href = (link.getAttribute('href') || '').trim();
    const label = (link.textContent || '').trim().toLowerCase();
    const page = window.location.pathname || '/';

    if (href.startsWith('mailto:')) {
      trackEvent('email_click', { page, href, label, ...attribution });
      return;
    }

    if (href.includes('booking.html') || label.includes('intro call')) {
      trackEvent('intro_call_click', { page, href, label, ...attribution });
      return;
    }

    if (href.includes('contact.html') || label.includes('get in touch')) {
      trackEvent('contact_click', { page, href, label, ...attribution });
      return;
    }

    if (isExternalLink(link)) {
      trackEvent('outbound_click', { page, href: link.href, label, ...attribution });
    }
  });

  initScrollDepthTracking(attribution);
}

function initScrollDepthTracking(attribution) {
  let tracked50 = false;
  let tracked90 = false;

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((scrollTop / docHeight) * 100);
    const page = window.location.pathname || '/';

    if (!tracked50 && percent >= 50) {
      tracked50 = true;
      trackEvent('scroll_50', { page, ...attribution });
    }

    if (!tracked90 && percent >= 90) {
      tracked90 = true;
      trackEvent('scroll_90', { page, ...attribution });
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

function getAttribution() {
  try {
    const raw = localStorage.getItem('punkeye_attribution');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function trackEvent(name, data) {
  try {
    window.umami.track(name, data);
  } catch {
    // no-op
  }
}

function isExternalLink(link) {
  const href = link.getAttribute('href') || '';
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  try {
    const resolved = new URL(link.href, window.location.origin);
    return resolved.origin !== window.location.origin;
  } catch {
    return false;
  }
}
