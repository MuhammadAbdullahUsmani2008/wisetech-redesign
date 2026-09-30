/**
 * Wise Technologies RYK — Artrium-Inspired Redesign
 * Animations, interactions, and dynamic behavior
 */

(function() {
  'use strict';

  // ==========================================
  // Header scroll behavior
  // ==========================================
  const header = document.getElementById('header');
  const scrollTop = document.getElementById('scroll-top');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (scrollY > 500) {
      scrollTop.classList.add('scroll-top--visible');
    } else {
      scrollTop.classList.remove('scroll-top--visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================
  // Mobile menu toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('mobile-nav--open');
      menuToggle.classList.toggle('header__toggle--active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('mobile-nav--open');
        menuToggle.classList.remove('header__toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // Search overlay
  // ==========================================
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function() {
      searchOverlay.classList.add('search-overlay--open');
      const input = searchOverlay.querySelector('.search-overlay__input');
      if (input) input.focus();
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function() {
      searchOverlay.classList.remove('search-overlay--open');
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('search-overlay--open');
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (searchOverlay) searchOverlay.classList.remove('search-overlay--open');
      if (mobileNav) {
        mobileNav.classList.remove('mobile-nav--open');
        if (menuToggle) {
          menuToggle.classList.remove('header__toggle--active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
      document.body.style.overflow = '';
    }
  });

  // ==========================================
  // Scroll to top
  // ==========================================
  if (scrollTop) {
    scrollTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // Animate on scroll (Intersection Observer)
  // ==========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function(el) {
      el.classList.add('animated');
    });
  }

  // ==========================================
  // Counter animation
  // ==========================================
  const counters = document.querySelectorAll('.counter__number');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach(function(counter) {
      counter.textContent = counter.getAttribute('data-target');
    });
  }

  // ==========================================
  // AI Assistant button toggle
  // ==========================================
  const aiAssistant = document.querySelector('.ai-assistant');
  if (aiAssistant) {
    aiAssistant.addEventListener('click', function() {
      // Placeholder for AI assistant toggle
      // In a real implementation, this would open an AI chat window
      aiAssistant.classList.toggle('ai-assistant--active');
    });
  }

  // ==========================================
  // Smooth scroll for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main-content') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // Active nav link on scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__menu a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('header__menu-link--active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('header__menu-link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();
