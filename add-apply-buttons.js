const fs = require('fs');

const addApplyButton = (htmlContent, serviceTitle, linkId) => {
    // Look for the end of the paragraph inside the specific service card
    const regex = new RegExp(`(<h3[^>]*>${serviceTitle}</h3>\\s*<p[^>]*>.*?)(</p>)`, 'g');
    
    const buttonHtml = `\\n                        <a href="service-details.html?id=${linkId}" class="btn btn-outline" style="align-self: flex-start; margin: 0; border-color: var(--secondary); color: var(--primary); font-weight: bold;">Apply Now</a>`;
    
    return htmlContent.replace(regex, `$1$2${buttonHtml}`);
};

const filesToUpdate = ['index.html', 'services.html'];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Only add if it doesn't already have the Apply button for Airport (to prevent duplication)
        if (!content.includes('service-details.html?id=airport-placement')) {
            content = addApplyButton(content, 'Airport Job Placement', 'airport-placement');
            content = addApplyButton(content, 'IT Job Placement', 'it-placement');
            content = addApplyButton(content, 'Hospital Job Placement', 'hospital-placement');
            
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file} with Apply buttons`);
        }
    }
});
