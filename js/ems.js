document.addEventListener('DOMContentLoaded', () => {
    // === HAMBURGER MENU ===
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mobileNav.style.display === 'flex';
            mobileNav.style.display = isActive ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        // Close when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
                hamburger.classList.remove('active');
            });
        });
    }

    // === MOBILE DROPDOWN ===
    const mobileDropdown = document.getElementById('mobileSolutions');
    if (mobileDropdown) {
        const toggleBtn = mobileDropdown.querySelector('.mobile-dropdown-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                mobileDropdown.classList.toggle('active');
            });
        }
    }

    // === ACCORDION (PAIN POINTS SECTION) ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(button => {
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('active');
            const content = button.nextElementSibling;

            // Close all accordions
            accordionHeaders.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.accordion-content').forEach(panel => {
                panel.style.maxHeight = null;
                panel.setAttribute('aria-hidden', 'true');
            });

            // Open clicked one only if it wasn't already open
            if (!isActive) {
                button.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.setAttribute('aria-hidden', 'false');
            }
        });
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