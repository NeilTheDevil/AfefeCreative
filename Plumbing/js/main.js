// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('header');
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });


    // 2. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.main-nav a');

    function toggleMenu() {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        
        mainNav.classList.toggle('open');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    }

    if (menuBtn && mainNav && menuOverlay) {
        menuBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Counter Animation
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let hasAnimated = false;

    // Easing function for smooth counting
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    function animateValue(obj, start, end, duration, suffix = '') {
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Apply easing
            const currentValue = Math.floor(easeOutQuart(progress) * (end - start) + start);
            
            // Add comma formatting if over 999
            obj.innerHTML = currentValue.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                obj.innerHTML = end.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(animation);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '';
                animateValue(stat, 0, target, 2000, suffix);
            });
        }
    }, {
        threshold: 0.5
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 5. Exclusive FAQ Accordion
    const detailsElements = document.querySelectorAll('.faq-item');
    
    detailsElements.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            detailsElements.forEach(detail => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });

    // 6. Parallax effect for Hero Image
    const heroImg = document.querySelector('.hero-img');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking && heroImg) {
            window.requestAnimationFrame(() => {
                const scrollPos = window.scrollY;
                if (scrollPos < window.innerHeight) {
                    heroImg.style.transform = `scale(1.05) translateY(${scrollPos * 0.2}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});
