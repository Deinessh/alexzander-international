const fs = require('fs');

// 1. Update index.html hero image
let indexHtml = fs.readFileSync('index.html', 'utf8');
// The 3rd slide is the one with "Seamless Visa & Passport Services"
// It currently points to assets/images/hero3.jpg or something similar.
// Let's replace the URL specifically in that slide.
indexHtml = indexHtml.replace(
    /url\('assets\/images\/hero3\.jpg'\);\s*"\s*>\s*<div class="container">\s*<h1>Seamless Visa & Passport Services<\/h1>/g,
    `url('assets/images/hero_seamless_visa.png');">\n            <div class="container">\n                <h1>Seamless Visa & Passport Services</h1>`
);
fs.writeFileSync('index.html', indexHtml, 'utf8');

// 2. Update styles.css
let styles = fs.readFileSync('styles.css', 'utf8');

// Fix .btn-call-now gradient (from gold to blue theme)
styles = styles.replace(
    /background: linear-gradient\(to right, #b8860b, #f5d76e\);/g,
    'background: linear-gradient(to right, #0284c7, #38bdf8);'
);

// Fix .service-card .btn-outline hover state
// It currently has:
// .service-card:hover .btn-outline {
//      color: white !important;
//      border-color: white !important;
//  }
// We need to add a rule for .service-card:hover .btn-outline:hover
if (!styles.includes('.service-card:hover .btn-outline:hover')) {
    styles = styles.replace(
        /\.service-card:hover \.btn-outline \{\s*color: white !important;\s*border-color: white !important;\s*\}/,
        `.service-card:hover .btn-outline {\n    color: white !important;\n    border-color: white !important;\n}\n\n.service-card:hover .btn-outline:hover {\n    color: var(--primary) !important;\n    background: white !important;\n}`
    );
}

fs.writeFileSync('styles.css', styles, 'utf8');
console.log('Hero image and CSS styles updated successfully.');
