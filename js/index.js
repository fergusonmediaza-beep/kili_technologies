
        document.addEventListener('DOMContentLoaded', () => {
            // Hamburger toggle
            const hamburger = document.querySelector('.hamburger');
            const desktopNav = document.getElementById('desktopNav');
            const mobileNav = document.getElementById('mobileNav');
            
            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    // Toggle mobile nav
                    const isActive = mobileNav.style.display === 'flex';
                    mobileNav.style.display = isActive ? 'none' : 'flex';
                    hamburger.classList.toggle('active', !isActive);
                    // Hide desktop nav on mobile open
                    desktopNav.style.display = isActive ? 'flex' : 'none';
                });
            }

            // Mobile dropdown toggle
            const mobileDropdown = document.getElementById('mobileSolutions');
            const toggleBtn = mobileDropdown.querySelector('.mobile-dropdown-toggle');
            
            toggleBtn.addEventListener('click', () => {
                mobileDropdown.classList.toggle('active');
            });

            // Flip cards: tap → flip → auto-reset in 1500ms (mobile-friendly)
            document.querySelectorAll('.flip-card').forEach(card => {
                const inner = card.querySelector('.flip-card-inner');
                let timeout;

                const flip = () => {
                    // Clear previous timeout
                    if (timeout) clearTimeout(timeout);
                    // Add flipped state
                    card.classList.add('flipped-temp');
                    // Auto-remove after 1.5s
                    timeout = setTimeout(() => {
                        card.classList.remove('flipped-temp');
                    }, 1500);
                };

                // Trigger on click (works for mouse & touch)
                card.addEventListener('click', flip);
            });

            // ===== ACCORDION (Single-Open Mode) =====
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                const otherBtn = otherItem.querySelector('.accordion-header');
                const otherContent = otherItem.querySelector('.accordion-content');
                otherBtn.setAttribute('aria-expanded', 'false');
                otherContent.style.maxHeight = '0';
                otherContent.style.padding = '0 1.5rem';
            }
        });

        // Toggle current
        button.setAttribute('aria-expanded', (!isExpanded).toString());
        if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.padding = '0 1.5rem 1.2rem';
        } else {
            content.style.maxHeight = '0';
            content.style.padding = '0 1.5rem';
        }
    });
});

            // Social icons
            document.querySelectorAll('.social-icons img[data-href]').forEach(img => {
                img.style.cursor = 'pointer';
                const url = img.getAttribute('data-href')?.trim();
                if (url) {
                    img.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
                }
            });

            // Back to top
            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('show', window.scrollY > 400);
            });
            backToTop?.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

                        // ===== SYNCHRONIZED STAT COUNTERS + ARROWS =====
            const statCards = document.querySelectorAll('.stat-card');
            if (statCards.length > 0) {
                const duration = 2000; // 2 seconds
                const targets = Array.from(statCards).map(card => parseFloat(card.dataset.target));
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Fade in cards
                            statCards.forEach((card, i) => {
                                setTimeout(() => card.classList.add('visible'), i * 150);
                            });
                            // Fade in arrows
                            document.querySelectorAll('.arrow').forEach((arrow, i) => {
                                setTimeout(() => arrow.classList.add('visible'), (i + 1) * 150);
                            });
                            
                            // Start counting
                            setTimeout(() => {
                                statCards.forEach((card, i) => {
                                    const counterEl = card.querySelector('.stat-number');
                                    const target = targets[i];
                                    const suffix = card.dataset.suffix || '';
                                    counterEl.setAttribute('data-suffix', suffix);
                                    
                                    const totalFrames = 120; // 2s at 60fps
                                    let frame = 0;
                                    const step = () => {
                                        if (frame <= totalFrames) {
                                            const progress = frame / totalFrames;
                                            const current = progress * target;
                                            counterEl.textContent = 
                                                Number.isInteger(target) 
                                                    ? Math.floor(current)
                                                    : current.toFixed(target % 1 === 0 ? 0 : 2);
                                            frame++;
                                            requestAnimationFrame(step);
                                        }
                                    };
                                    requestAnimationFrame(step);
                                });
                                
                                // Settle all together
                                setTimeout(() => {
                                    statCards.forEach(card => card.classList.add('settled'));
                                    document.querySelector('.stats-section')?.classList.add('settled');
                                }, duration - 200);
                            }, 400);
                            
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });
                observer.observe(document.querySelector('.stats-section'));
            }
            
        });
    