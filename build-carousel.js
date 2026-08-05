const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\91936\\.gemini\\antigravity-ide\\brain\\49a9e039-62ab-4b14-8a25-82ea9d355d29';
const destDir = 'C:\\Users\\91936\\.gemini\\antigravity-ide\\scratch\\alexzander-international\\assets\\images\\destinations';

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// The recent 5 images
const files = [
    'media__1785946878452.jpg',
    'media__1785946878462.jpg',
    'media__1785946878477.jpg',
    'media__1785946878493.jpg',
    'media__1785946878494.jpg'
];

files.forEach((file, index) => {
    const srcPath = path.join(brainDir, file);
    const destPath = path.join(destDir, `dest${index + 1}.jpg`);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to dest${index + 1}.jpg`);
    } else {
        console.log(`File not found: ${srcPath}`);
    }
});

// Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

const carouselHtml = `
    <!-- Destinations Carousel -->
    <section id="destinations-carousel">
        <div class="carousel-container">
            <button class="carousel-arrow prev-arrow"><i class="fas fa-chevron-left"></i></button>
            <div class="carousel-track">
                <div class="carousel-slide"><img src="assets/images/destinations/dest1.jpg" alt="Destination 1"></div>
                <div class="carousel-slide"><img src="assets/images/destinations/dest2.jpg" alt="Destination 2"></div>
                <div class="carousel-slide"><img src="assets/images/destinations/dest3.jpg" alt="Destination 3"></div>
                <div class="carousel-slide"><img src="assets/images/destinations/dest4.jpg" alt="Destination 4"></div>
                <div class="carousel-slide"><img src="assets/images/destinations/dest5.jpg" alt="Destination 5"></div>
                <!-- Clones for infinite scrolling -->
                <div class="carousel-slide"><img src="assets/images/destinations/dest1.jpg" alt="Destination 1"></div>
                <div class="carousel-slide"><img src="assets/images/destinations/dest2.jpg" alt="Destination 2"></div>
                <div class="carousel-slide"><img src="assets/images/destinations/dest3.jpg" alt="Destination 3"></div>
            </div>
            <button class="carousel-arrow next-arrow"><i class="fas fa-chevron-right"></i></button>
        </div>
    </section>
`;

if (!indexHtml.includes('id="destinations-carousel"')) {
    indexHtml = indexHtml.replace(
        /(<\/section>\s*)(<!-- Quick About Section -->)/,
        `$1${carouselHtml}\n    $2`
    );
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('Added carousel HTML to index.html');
}

// Update styles.css
let styles = fs.readFileSync('styles.css', 'utf8');
const carouselCss = `
/* Destinations Carousel */
#destinations-carousel {
    padding: 40px 0;
    background: #f8fafc;
    position: relative;
    overflow: hidden;
}

.carousel-container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    padding: 0 50px; /* space for arrows */
}

.carousel-track {
    display: flex;
    gap: 20px;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

/* Hide scrollbar for clean look */
.carousel-track::-webkit-scrollbar {
    display: none;
}
.carousel-track {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.carousel-slide {
    flex: 0 0 calc(33.333% - 14px); /* 3x1 layout with gaps */
    min-width: calc(33.333% - 14px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.carousel-slide:hover {
    transform: translateY(-5px);
}

.carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.carousel-arrow {
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

.prev-arrow { left: 0; }
.next-arrow { right: 0; }

.carousel-arrow:hover,
.carousel-arrow:active {
    color: var(--secondary); /* Turns blue */
    background: #fff;
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

@media (max-width: 991px) {
    .carousel-slide {
        flex: 0 0 calc(50% - 10px);
        min-width: calc(50% - 10px);
    }
}
@media (max-width: 600px) {
    .carousel-slide {
        flex: 0 0 100%;
        min-width: 100%;
    }
    .carousel-container { padding: 0 40px; }
    .prev-arrow { left: -5px; }
    .next-arrow { right: -5px; }
}
`;
if (!styles.includes('/* Destinations Carousel */')) {
    styles += `\n${carouselCss}\n`;
    fs.writeFileSync('styles.css', styles, 'utf8');
    console.log('Added carousel CSS to styles.css');
}

// Update script.js
let scriptJs = fs.readFileSync('script.js', 'utf8');
const carouselJs = `
// Destinations Carousel Logic
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    // Auto scroll left
    let autoScroll = setInterval(() => scrollNext(), 3000);
    
    function scrollNext() {
        const slideWidth = track.querySelector('.carousel-slide').clientWidth + 20; // 20 is gap
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
        checkInfinite();
    }
    
    function scrollPrev() {
        const slideWidth = track.querySelector('.carousel-slide').clientWidth + 20;
        track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    }
    
    // Reset timer on manual interaction
    function manualScroll(direction) {
        clearInterval(autoScroll);
        if (direction === 'next') scrollNext();
        if (direction === 'prev') scrollPrev();
        autoScroll = setInterval(() => scrollNext(), 3000);
    }
    
    prevBtn.addEventListener('click', () => manualScroll('prev'));
    nextBtn.addEventListener('click', () => manualScroll('next'));
    
    // Simple infinite loop effect (when reached end, jump to start)
    function checkInfinite() {
        setTimeout(() => {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'instant' });
            }
        }, 400); // wait for smooth scroll to finish
    }
});
`;

if (!scriptJs.includes('// Destinations Carousel Logic')) {
    scriptJs += `\n${carouselJs}\n`;
    fs.writeFileSync('script.js', scriptJs, 'utf8');
    console.log('Added carousel JS to script.js');
}

console.log('Done!');
