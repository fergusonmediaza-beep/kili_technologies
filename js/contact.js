

        document.addEventListener('DOMContentLoaded', () => {
            // Hamburger toggle
            const hamburger = document.querySelector('.hamburger');
            const desktopNav = document.getElementById('desktopNav');
            const mobileNav = document.getElementById('mobileNav');
            
            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    const isActive = mobileNav.style.display === 'flex';
                    mobileNav.style.display = isActive ? 'none' : 'flex';
                    hamburger.classList.toggle('active', !isActive);
                    desktopNav.style.display = isActive ? 'flex' : 'none';
                });
            }

            // Mobile dropdown toggle
            const mobileDropdown = document.getElementById('mobileSolutions');
            const toggleBtn = mobileDropdown.querySelector('.mobile-dropdown-toggle');
            
            toggleBtn.addEventListener('click', () => {
                mobileDropdown.classList.toggle('active');
            });

            // Back to top
            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('show', window.scrollY > 400);
            });
            backToTop?.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Form submission → mailto
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const name = encodeURIComponent(document.getElementById('fullName').value);
                    const email = encodeURIComponent(document.getElementById('email').value);
                    const subject = encodeURIComponent(document.getElementById('subject').value);
                    const message = encodeURIComponent(document.getElementById('message').value);

                    const mailtoLink = `mailto:info@kilitechnologies.com?subject=${subject}&body=Name:%20${name}%0AEmail:%20${email}%0A%0AMessage:%0A${message}`;

                    window.location.href = mailtoLink;

                    setTimeout(() => {
                        alert('Thank you! Your message will be sent via your email app.');
                        contactForm.reset();
                    }, 500);
                });
            }
        });
    