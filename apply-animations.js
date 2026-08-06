const fs = require('fs');

// 1. Update about.html to add class to the Values list
const aboutPath = 'about.html';
if (fs.existsSync(aboutPath)) {
    let aboutContent = fs.readFileSync(aboutPath, 'utf8');
    if (aboutContent.includes('<h3>Our Values</h3>\n                <ul>')) {
        aboutContent = aboutContent.replace(
            '<h3>Our Values</h3>\n                <ul>',
            '<h3>Our Values</h3>\n                <ul class="values-list">'
        );
        fs.writeFileSync(aboutPath, aboutContent, 'utf8');
        console.log('Updated about.html with values-list class');
    }
}

// 2. Inject CSS for animations and values list
const stylesPath = 'styles.css';
if (fs.existsSync(stylesPath)) {
    let styles = fs.readFileSync(stylesPath, 'utf8');
    
    const newCss = `
/* --- Load Animations --- */
body {
    animation: fadeInPage 0.8s ease-in-out;
}
@keyframes fadeInPage {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

/* Scroll Animations */
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* --- Values List Styling --- */
.values-list {
    list-style: none;
    padding-left: 0;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}
.values-list li {
    position: relative;
    padding: 15px 15px 15px 50px;
    background: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    font-weight: 500;
    color: var(--dark);
    transition: all 0.3s ease;
    border-left: 4px solid var(--secondary);
}
.values-list li:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    background: #ffffff;
}
.values-list li::before {
    content: '\\f00c'; /* FontAwesome check */
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary);
    font-size: 1.1rem;
}
`;
    
    if (!styles.includes('.values-list')) {
        styles += '\\n' + newCss + '\\n';
        fs.writeFileSync(stylesPath, styles, 'utf8');
        console.log('Injected CSS for animations and values list');
    }
}

// 3. Inject JS for scroll animations
const scriptPath = 'script.js';
if (fs.existsSync(scriptPath)) {
    let scriptJs = fs.readFileSync(scriptPath, 'utf8');
    
    const newJs = `
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
`;

    if (!scriptJs.includes('Scroll Animation Observer')) {
        scriptJs += '\\n' + newJs + '\\n';
        fs.writeFileSync(scriptPath, scriptJs, 'utf8');
        console.log('Injected JS for scroll animations');
    }
}
