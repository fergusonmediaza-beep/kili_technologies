document.addEventListener('DOMContentLoaded', () => {
    // Hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mobileNav.style.display === 'flex';
            mobileNav.style.display = isActive ? 'none' : 'flex';
            hamburger.classList.toggle('active'); 
        });
    }
    
    // Mobile dropdown toggle
    const mobileDropdown = document.getElementById('mobileSolutions');
    if (mobileDropdown) {
        const toggleBtn = mobileDropdown.querySelector('.mobile-dropdown-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                mobileDropdown.classList.toggle('active');
            });
        }
    }

    // === BIO MODAL FUNCTIONALITY ===
    const bioModal = document.getElementById('bioModal');
    const closeModal = document.getElementById('closeModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalBio = document.getElementById('modalBio');
    const modalLinkedIn = document.getElementById('modalLinkedIn');

    // Function to open modal
    const openModal = (card) => {
        // Get data from card
        const name = card.getAttribute('data-name');
        const role = card.getAttribute('data-role');
        const bio = card.getAttribute('data-bio');
        const linkedin = card.getAttribute('data-linkedin');
        const photo = card.getAttribute('data-photo');

        // Populate modal
        modalName.textContent = name;
        modalRole.textContent = role;
        modalBio.textContent = bio;
        modalLinkedIn.href = linkedin;
        modalPhoto.src = photo;
        modalPhoto.alt = name;

        // Show modal
        bioModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Open modal when clicking "View Bio" button
    const viewBioButtons = document.querySelectorAll('.view-bio-btn');
    viewBioButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.leader-card');
            openModal(card);
        });
    });

    // Close modal when clicking close button
    closeModal.addEventListener('click', () => {
        bioModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside the modal content
    bioModal.addEventListener('click', (e) => {
        if (e.target === bioModal) {
            bioModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bioModal.classList.contains('active')) {
            bioModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

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