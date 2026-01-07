 

        // Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Optional: animate hamburger → ×
    hamburger.classList.toggle('active');
});

        document.addEventListener('DOMContentLoaded', () => {
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
        });




    document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('backToTop');

    // Show button after scrolling down 400px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    // Smooth scroll to top when clicked
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
