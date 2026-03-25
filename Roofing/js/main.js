document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter if this is the stat item
                if (entry.target.querySelector('.stat-number')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stats Counter Animation
    function animateCounter(el) {
        if (el.dataset.animated) return;
        el.dataset.animated = "true";
        
        const target = parseInt(el.dataset.target);
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString() + "+";
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // Form Submission Handling (Mock)
    const form = document.querySelector('.cta-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Generating...';
            
            setTimeout(() => {
                btn.style.background = '#00c853';
                btn.textContent = 'Proposal Ready! We\'ll contact you shortly.';
                form.reset();
            }, 1500);
        });
    }

    // Header Color Change on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 0';
        } else {
            header.style.padding = '1.25rem 0';
        }
    });
});
