const fs = require('fs');

// 1. Fix script.js - Remove old carousel logic
let scriptJs = fs.readFileSync('script.js', 'utf8');
// Use regex to remove the old Destinations Carousel Logic block
scriptJs = scriptJs.replace(/\/\/ Destinations Carousel Logic[\s\S]*?(?=\/\/ New Destinations Carousel Logic)/, '');
fs.writeFileSync('script.js', scriptJs, 'utf8');

// 2. Fix styles.css - Allow touch scrolling on carousel
let stylesCss = fs.readFileSync('styles.css', 'utf8');
stylesCss = stylesCss.replace(/overflow-x: hidden;/g, 'overflow-x: auto;');
fs.writeFileSync('styles.css', stylesCss, 'utf8');

// 3. Fix index.html - Remove white space above map, services, and why choose us
let indexHtml = fs.readFileSync('index.html', 'utf8');
// Adjust map margin-top (was 103px, change to 0 or match exact header height, let's try 80px or 75px. Actually the top bar + nav might be around 110px. Let's just make it flush by testing a smaller margin or removing it if there's no fixed header overlay issue). Wait, the user said "remove the white space above the map". This means there is currently a visible white gap. Let's change margin-top to 0 and add padding-top: 110px. Or just set margin-top: 80px;
indexHtml = indexHtml.replace(/<section id="home" style="margin-top: 103px;/, '<section id="home" style="margin-top: 90px;'); 

// Remove space above Quick About
indexHtml = indexHtml.replace(/<section id="about">/, '<section id="about" style="padding-top: 40px; padding-bottom: 40px;">');

// Remove space above Our Core Services
indexHtml = indexHtml.replace(/<section id="services" style="background-color: white;">/, '<section id="services" style="background-color: white; padding-top: 40px; padding-bottom: 40px;">');

// Remove space above Why Choose Us
indexHtml = indexHtml.replace(/<section id="why-choose-us" style="background-color: #f8fafc;">/, '<section id="why-choose-us" style="background-color: #f8fafc; padding-top: 40px; padding-bottom: 40px;">');

fs.writeFileSync('index.html', indexHtml, 'utf8');

// 4. Fix about.html - Remove extra <br> above mission and vision
let aboutHtml = fs.readFileSync('about.html', 'utf8');
aboutHtml = aboutHtml.replace(/<br>\s*<h3>Our Mission<\/h3>/g, '<h3>Our Mission</h3>');
aboutHtml = aboutHtml.replace(/<br>\s*<h3>Our Vision<\/h3>/g, '<h3>Our Vision</h3>');
aboutHtml = aboutHtml.replace(/<br>\s*<h3>Our Values<\/h3>/g, '<h3>Our Values</h3>');
fs.writeFileSync('about.html', aboutHtml, 'utf8');

console.log('Successfully fixed spacing and carousel logic');
