document.addEventListener('DOMContentLoaded', () => {
    // === HAMBURGER MENU (MATCHES index.js EXACTLY) ===
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mobileNav.style.display === 'flex';
            mobileNav.style.display = isActive ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking any link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
                hamburger.classList.remove('active');
            });
        });
    }

    // === SOCIAL ICONS ===
    document.querySelectorAll('.social-icons img').forEach(img => {
        img.style.cursor = 'pointer';
        img.setAttribute('tabindex', '0');

        const handleClick = () => {
            const parent = img.closest('a');
            if (parent && parent.href) {
                window.open(parent.href, '_blank', 'noopener,noreferrer');
            }
        };

        img.addEventListener('click', handleClick);
        img.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        });

        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.15)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
    });

    // === BACK TO TOP BUTTON ===
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 400);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});