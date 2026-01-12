document.addEventListener('DOMContentLoaded', () => {
    // === HAMBURGER MENU (FIXED) ===
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mobileNav.style.display === 'flex';
            mobileNav.style.display = isActive ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking any nav link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
                hamburger.classList.remove('active');
            });
        });
    }

    // === MOBILE DROPDOWN TOGGLE ===
    const mobileDropdown = document.getElementById('mobileSolutions');
    if (mobileDropdown) {
        const toggleBtn = mobileDropdown.querySelector('.mobile-dropdown-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                mobileDropdown.classList.toggle('active');
            });
        }
    }

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

    // === CONTACT FORM: SAVE, RESTORE & MAILTO ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Restore saved data on page load
        const saved = localStorage.getItem('contactFormData');
        if (saved) {
            const data = JSON.parse(saved);
            ['fullName', 'email', 'phone', 'subject', 'message'].forEach(id => {
                const el = document.getElementById(id);
                if (el && data[id]) el.value = data[id];
            });
        }

        // Save form data on input
        contactForm.addEventListener('input', () => {
            const data = {
                fullName: document.getElementById('fullName')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            localStorage.setItem('contactFormData', JSON.stringify(data));
        });

        // Handle form submission via mailto
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const mailtoLink = `mailto:Info@kilitech.co.za?subject=${encodeURIComponent(subject)}&body=Name:%20${encodeURIComponent(name)}%0APhone:%20${encodeURIComponent(phone)}%0AEmail:%20${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

            window.location.href = mailtoLink;

            // Show success message
            const formContainer = contactForm.closest('.contact-form-column');
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem;">
                    <h3 style="font-size: 1.4rem; font-weight: 700; color: #1b3350; margin-bottom: 0.5rem;">Thank you!</h3>
                    <p style="font-size: 1.1rem; color: #5a6c7d; line-height: 1.5;">
                        We’ll get back to you within 24 hours.
                    </p>
                </div>
            `;

            localStorage.removeItem('contactFormData');
        });
    }

    // === LEAFLET MAP INITIALIZATION ===
    const mapContainer = document.getElementById('contactMap');
    if (mapContainer) {
        const map = L.map('contactMap', {
            zoomControl: true
        }).setView([-26.00292340850733, 28.011397509121306], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-26.00292340850733, 28.011397509121306])
            .addTo(map)
            .bindPopup('<b>Kili Technologies</b><br>Block B, Infinity Business Park, Cnr Winnie Mandela Dr & Pieter Wenning Rd, Fourways, 2193')
            .openPopup();
    }
});