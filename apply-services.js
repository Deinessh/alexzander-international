const fs = require('fs');

let extractedHTML = fs.readFileSync('extracted-services.html', 'utf8');

// Fix encoding issues
extractedHTML = extractedHTML.replace(/\?"/g, '—');
extractedHTML = extractedHTML.replace(/&#038;/g, '&');

const files = ['index.html', 'services.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the entire services-grid
    content = content.replace(/<div class="services-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, extractedHTML + '\n        </div>\n    </section>');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
