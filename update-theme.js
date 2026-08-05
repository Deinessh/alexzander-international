const fs = require('fs');

// 1. Update styles.css
let styles = fs.readFileSync('styles.css', 'utf8');
styles = styles.replace(/--secondary: #ebd05b;/g, '--secondary: #0ea5e9;'); // Change yellow to sky blue
// Also change the gold button gradient if any exist in styles.css
styles = styles.replace(/#aa8420/g, '#0369a1');
styles = styles.replace(/#f1ec75/g, '#38bdf8');
styles = styles.replace(/#b9972c/g, '#0ea5e9');
styles = styles.replace(/rgba\(235, 208, 91/g, 'rgba(14, 165, 233'); // box-shadow colors
fs.writeFileSync('styles.css', styles, 'utf8');

// 2. Update service-details.html
let serviceDetailsHtml = fs.readFileSync('service-details.html', 'utf8');
serviceDetailsHtml = serviceDetailsHtml.replace(/background: linear-gradient\(135deg, #a67c00 0%, #f5d76e 100%\);/g, 'background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);');
serviceDetailsHtml = serviceDetailsHtml.replace(/background: #a67c00;/g, 'background: #0ea5e9;');
fs.writeFileSync('service-details.html', serviceDetailsHtml, 'utf8');

// 3. Update images in HTML files and JS
const imageReplacements = {
    // OCI Card Services (Old: photo-1523050854058-8df90110c9f1) -> New: Person holding documents/ID
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1": "https://images.unsplash.com/photo-1559589689-577aabd1ce4c",
    // Indian Visa Registration (Old: photo-1506869640319-fea1a2753689) -> New: India / Taj Mahal
    "https://images.unsplash.com/photo-1506869640319-fea1a2753689": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    // New Passport Services (Old: photo-1544367567-0f2fcb009e0b) -> New: Passport closeup
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b": "https://images.unsplash.com/photo-1596720426673-e4e14290f0cc"
};

['index.html', 'services.html', 'service-details.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    for (const [oldUrl, newUrl] of Object.entries(imageReplacements)) {
        content = content.replace(new RegExp(oldUrl, 'g'), newUrl);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
console.log('Theme and images updated successfully.');
