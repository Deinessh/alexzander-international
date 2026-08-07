const fs = require('fs');

const htmlFiles = ['index.html', 'about.html', 'services.html', 'contact.html', 'service-details.html'];
const faviconTag = '\n    <link rel="icon" type="image/jpeg" href="logo.jpeg">\n</head>';

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Prevent duplicate favicon tags
        if (!content.includes('rel="icon"')) {
            // Replace the closing head tag with the favicon link and the closing tag
            content = content.replace('</head>', faviconTag);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Added favicon to ${file}`);
        } else {
            console.log(`Favicon already exists in ${file}`);
        }
    }
});
