const fs = require('fs');

// Update index.html to use scoped classes to avoid conflict with old code
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<section id="destinations-carousel">[\s\S]*?<\/section>/, `
    <!-- Destinations Carousel -->
    <section id="destinations-carousel">
        <div class="dest-carousel-container">
            <button class="dest-carousel-arrow dest-prev-arrow"><i class="fas fa-chevron-left"></i></button>
            <div class="dest-carousel-track">
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest1.jpg" alt="Singapore"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest2.jpg" alt="Luxembourg"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest3.jpg" alt="Canada"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest4.jpg" alt="Maldives"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest5.jpg" alt="Malaysia"></div>
            </div>
            <button class="dest-carousel-arrow dest-next-arrow"><i class="fas fa-chevron-right"></i></button>
        </div>
    </section>`);
fs.writeFileSync('index.html', indexHtml, 'utf8');

let styles = fs.readFileSync('styles.css', 'utf8');
const carouselCss = `
/* New Destinations Carousel */
#destinations-carousel {
    padding: 40px 0;
    background: #f8fafc;
    position: relative;
    overflow: hidden;
}

.dest-carousel-container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    padding: 0 50px;
}

.dest-carousel-track {
    display: flex;
    gap: 20px;
    overflow-x: hidden;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.dest-carousel-track::-webkit-scrollbar {
    display: none;
}

.dest-carousel-slide {
    flex: 0 0 calc(33.333% - 14px);
    min-width: calc(33.333% - 14px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.dest-carousel-slide:hover {
    transform: translateY(-5px);
}

.dest-carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.dest-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    color: #333;
    z-index: 10;
    transition: all 0.3s ease;
}

.dest-prev-arrow { left: 0; }
.dest-next-arrow { right: 0; }

.dest-carousel-arrow:hover,
.dest-carousel-arrow:active {
    color: var(--secondary); /* Turns blue */
    background: #fff;
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

@media (max-width: 991px) {
    .dest-carousel-slide {
        flex: 0 0 calc(50% - 10px);
        min-width: calc(50% - 10px);
    }
}
@media (max-width: 600px) {
    .dest-carousel-slide {
        flex: 0 0 100%;
        min-width: 100%;
    }
    .dest-carousel-container { padding: 0 40px; }
    .dest-prev-arrow { left: -5px; }
    .dest-next-arrow { right: -5px; }
}
`;
styles += '\n' + carouselCss + '\n';
fs.writeFileSync('styles.css', styles, 'utf8');

let scriptJs = fs.readFileSync('script.js', 'utf8');
const carouselJs = `
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
`;
scriptJs += '\n' + carouselJs + '\n';
fs.writeFileSync('script.js', scriptJs, 'utf8');

console.log('Successfully injected CSS, JS, and HTML with scoped classes.');
