document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu if open

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }
    });
});




// New Destinations Carousel Logic
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.dest-carousel-track');
    if (!track) return;
    
    const prevBtn = document.querySelector('.dest-prev-arrow');
    const nextBtn = document.querySelector('.dest-next-arrow');
    
    // Auto scroll left
    let autoScroll = setInterval(() => scrollNext(), 3000);
    
    function scrollNext() {
        if (!track) return;
        const slideWidth = track.querySelector('.dest-carousel-slide').clientWidth + 20; 
        
        // If at the end, jump to start
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    }
    
    function scrollPrev() {
        if (!track) return;
        const slideWidth = track.querySelector('.dest-carousel-slide').clientWidth + 20;
        track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    }
    
    // Reset timer on manual interaction
    function manualScroll(direction) {
        clearInterval(autoScroll);
        if (direction === 'next') scrollNext();
        if (direction === 'prev') scrollPrev();
        autoScroll = setInterval(() => scrollNext(), 3000);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => manualScroll('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => manualScroll('next'));
});


// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: stop observing once shown
            }
        });
    }, { threshold: 0.1 });

    // Select elements to animate on scroll
    document.querySelectorAll('section:not(.hero), .service-card, .footer-col, .values-list li').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Page Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
        }, 600); // 0.6s delay for smooth visual transition
    }
});
