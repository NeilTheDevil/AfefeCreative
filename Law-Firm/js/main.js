document.addEventListener('DOMContentLoaded', () => {
    // Icons
    lucide.createIcons();

    // Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Sticky Header
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.padding = '16px 0';
            header.style.background = 'rgba(10, 17, 40, 0.95)';
            header.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '24px 0';
            header.style.background = 'rgba(10, 17, 40, 0.9)';
            header.style.boxShadow = 'none';
        }
    }, { passive: true });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
