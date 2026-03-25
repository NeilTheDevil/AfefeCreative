document.addEventListener('DOMContentLoaded', () => {
    // Icons
    lucide.createIcons();

    // Intersection Observer for Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stats Counter
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                
                if (isNaN(target)) return;

                let current = 0;
                const duration = 1500;
                const frameRate = 30;
                const totalFrames = duration / frameRate;
                const increment = target / totalFrames;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.innerText = target.toLocaleString() + suffix;
                        clearInterval(timer);
                    } else {
                        el.innerText = Math.floor(current).toLocaleString() + suffix;
                    }
                }, frameRate);
                
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

    // Sticky Header Logic
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    }, { passive: true });
});
