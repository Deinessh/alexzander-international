const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\91936\\.gemini\\antigravity-ide\\brain\\49a9e039-62ab-4b14-8a25-82ea9d355d29';
const assetsDir = 'C:\\Users\\91936\\.gemini\\antigravity-ide\\scratch\\alexzander-international\\assets\\images';

// Copy images based on educated guesses of size
const filesToCopy = {
    'media__1786075351029.jpg': 'service-airport.jpg',
    'media__1786075350995.jpg': 'service-hospital.jpg',
    'media__1786075350949.jpg': 'service-it.jpg'
};

for (const [src, dest] of Object.entries(filesToCopy)) {
    const srcPath = path.join(brainDir, src);
    const destPath = path.join(assetsDir, dest);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${src} to ${dest}`);
    } else {
        console.log(`Missing file: ${srcPath}`);
    }
}

const newServicesHtml = `
                <!-- New Services -->
                <div class="service-card animate-on-scroll" style="padding: 0; text-align: left; display: flex; flex-direction: column;">
                    <img src="assets/images/service-airport.jpg" alt="Airport Job Placement"
                        style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h3 style="margin-bottom: 15px; transition: color 0.3s;">Airport Job Placement</h3>
                        <p style="margin-bottom: 25px; flex-grow: 1; transition: color 0.3s;">Kickstart your aviation career with premium placement services for ground staff, ticketing, and management roles across major global airports.</p>
                    </div>
                </div>

                <div class="service-card animate-on-scroll" style="padding: 0; text-align: left; display: flex; flex-direction: column;">
                    <img src="assets/images/service-it.jpg" alt="IT Job Placement"
                        style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h3 style="margin-bottom: 15px; transition: color 0.3s;">IT Job Placement</h3>
                        <p style="margin-bottom: 25px; flex-grow: 1; transition: color 0.3s;">Connecting top tech talent with leading global companies. We specialize in software development, cybersecurity, and IT support placements.</p>
                    </div>
                </div>

                <div class="service-card animate-on-scroll" style="padding: 0; text-align: left; display: flex; flex-direction: column;">
                    <img src="assets/images/service-hospital.jpg" alt="Hospital Job Placement"
                        style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h3 style="margin-bottom: 15px; transition: color 0.3s;">Hospital Job Placement</h3>
                        <p style="margin-bottom: 25px; flex-grow: 1; transition: color 0.3s;">Dedicated recruitment for healthcare professionals. We match nurses, doctors, and medical staff with reputed international hospitals.</p>
                    </div>
                </div>
`;

// Insert into index.html
const indexHtmlFile = 'index.html';
if (fs.existsSync(indexHtmlFile)) {
    let html = fs.readFileSync(indexHtmlFile, 'utf8');
    if (!html.includes('Airport Job Placement')) {
        html = html.replace(/<div class="services-grid">/, `<div class="services-grid">\n${newServicesHtml}`);
        fs.writeFileSync(indexHtmlFile, html, 'utf8');
        console.log('Updated index.html');
    }
}

// Insert into services.html
const servicesHtmlFile = 'services.html';
if (fs.existsSync(servicesHtmlFile)) {
    let html = fs.readFileSync(servicesHtmlFile, 'utf8');
    if (!html.includes('Airport Job Placement')) {
        html = html.replace(/<div class="services-grid">/, `<div class="services-grid">\n${newServicesHtml}`);
        fs.writeFileSync(servicesHtmlFile, html, 'utf8');
        console.log('Updated services.html');
    }
}

console.log('Done.');
