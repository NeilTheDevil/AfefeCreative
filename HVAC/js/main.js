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
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stats Counter
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.innerText = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        el.innerText = Math.floor(current).toLocaleString();
                    }
                }, 30);
                statsObserver.unobserve(el);
            }
        });
    });

    document.querySelectorAll('.stat-val').forEach(el => statsObserver.observe(el));

    // Simple sticky header logic
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '8px 0';
        } else {
            header.style.padding = '16px 0';
        }
    });
});
