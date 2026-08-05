const fs = require('fs');

const replacements = {
    "assets/images/oci-card.jpg": "assets/images/documents.jpg",
    "assets/images/oci-card-large.jpg": "assets/images/documents-large.jpg",
    "assets/images/new-passport.jpg": "assets/images/hero3.jpg",
    "assets/images/new-passport-large.jpg": "assets/images/hero3.jpg",
    "assets/images/indian-visa.jpg": "assets/images/visa-appointment-small.jpg",
    "assets/images/indian-visa-large.jpg": "assets/images/visa-application-large.jpg"
};

const files = ['index.html', 'services.html', 'service-details.js'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    for (const [oldName, newName] of Object.entries(replacements)) {
        content = content.replace(new RegExp(oldName, 'g'), newName);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
console.log('Broken local image references fixed.');
