/* ============================================
   LUMINANCE DENTAL STUDIO — Main JavaScript
   Vanilla JS, no dependencies
   ============================================ */

(function () {
  'use strict';

  // -----------------------------------------------
  // Sticky Header — transparent → glassmorphism
  // -----------------------------------------------
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // -----------------------------------------------
  // Mobile Menu
  // -----------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  function toggleMobileMenu() {
    const isActive = mobileMenu.classList.contains('active');
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isActive);
    document.body.style.overflow = isActive ? '' : 'hidden';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  mobileMenuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // -----------------------------------------------
  // Smooth Scroll for Anchor Links
  // -----------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // -----------------------------------------------
  // Scroll Reveal Animations (IntersectionObserver)
  // -----------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // -----------------------------------------------
  // Counter Animation on Stats
  // -----------------------------------------------
  const statNumbers = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const startTime = performance.now();

    function formatNumber(num) {
      if (num >= 1000) {
        return num.toLocaleString();
      }
      return num.toString();
    }

    function tick(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  // -----------------------------------------------
  // Floating Offer Badge — show after scroll
  // -----------------------------------------------
  const floatingBadge = document.getElementById('floatingBadge');
  const badgeClose = document.getElementById('badgeClose');
  let badgeDismissed = false;

  if (floatingBadge) {
    function checkBadgeVisibility() {
      if (badgeDismissed) return;
      if (window.scrollY > 800) {
        floatingBadge.classList.add('visible');
      }
    }

    window.addEventListener('scroll', checkBadgeVisibility, { passive: true });

    if (badgeClose) {
      badgeClose.addEventListener('click', function () {
        floatingBadge.classList.remove('visible');
        badgeDismissed = true;
      });
    }

    // Also dismiss when clicking the CTA link inside the badge
    var badgeCTA = floatingBadge.querySelector('.btn');
    if (badgeCTA) {
      badgeCTA.addEventListener('click', function () {
        floatingBadge.classList.remove('visible');
        badgeDismissed = true;
      });
    }
  }

  // -----------------------------------------------
  // Form Enhancement
  // -----------------------------------------------
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      // Netlify / Formspree handles submission
      // Add visual feedback
      var submitBtn = bookingForm.querySelector('.form-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;
      }
    });
  }

  // -----------------------------------------------
  // Active Nav Link on Scroll
  // -----------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
