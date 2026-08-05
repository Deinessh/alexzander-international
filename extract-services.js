const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\91936\\.gemini\\antigravity-ide\\brain\\49a9e039-62ab-4b14-8a25-82ea9d355d29\\.system_generated\\steps\\163\\content.md', 'utf8');

// Regex to extract each service block
const blockRegex = /<div class="rt-img-holder">.*?<a.*?href=['"](.*?)['"].*?<img.*?src=['"](.*?)['"].*?<\/div>\s*<div class='rt-detail'><h3.*?>(.*?)<\/h3><div class='tpg-excerpt'>(.*?)<\/div>/g;

let servicesHTML = '<div class="services-grid">\n';
let match;
while ((match = blockRegex.exec(content)) !== null) {
    const link = match[1];
    let imgSrc = match[2];
    const title = match[3].replace(/<.*?>/g, ''); // strip any inner tags
    const excerpt = match[4].replace(/<.*?>/g, '');

    servicesHTML += `
                <div class="service-card" style="padding: 0; text-align: left;">
                    <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;" onerror="this.src='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop'">
                    <div style="padding: 25px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">${title}</h3>
                        <p style="color: var(--text-muted);">${excerpt}</p>
                    </div>
                </div>`;
}
// Add the Global Visa Consultation which didn't have an image in the snippet
if (content.includes('Global Visa Consultation')) {
    servicesHTML += `
                <div class="service-card" style="padding: 0; text-align: left;">
                    <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" alt="Global Visa Consultation" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Global Visa Consultation</h3>
                        <p style="color: var(--text-muted);">At Orla Careers – Abroad Consultancy, our Global Visa Consultation service is designed to help you navigate...</p>
                    </div>
                </div>`;
}

servicesHTML += '\n            </div>';

fs.writeFileSync('extracted-services.html', servicesHTML);
console.log('Extracted services written to extracted-services.html');
