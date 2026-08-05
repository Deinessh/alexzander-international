const fs = require('fs');

let content = fs.readFileSync('service-details.js', 'utf8');

const replacements = {
    'assets/images/documents-large.jpg': 'assets/images/oci_card_service.png',
    'assets/images/hero3.jpg': 'assets/images/new_passport.png',
    'assets/images/visa-application-large.jpg': 'assets/images/indian_visa.png'
};

// Replace OCI Card image
content = content.replace(
    /"oci-card": {[\s\S]*?img: "assets\/images\/documents-large.jpg"/,
    `"oci-card": {\n        title: "OCI Card Services",\n        desc: "At Alexzander International, we offer expert assistance for applying, renewing, or updating your Overseas Citizenship of India (OCI) cards.",\n        img: "assets/images/oci_card_service.png"`
);

// Replace New Passport image
content = content.replace(
    /"new-passport": {[\s\S]*?img: "assets\/images\/hero3.jpg"/,
    `"new-passport": {\n        title: "New Passport Services",\n        desc: "At Alexzander International, we make the process of applying for a new passport smooth, transparent, and hassle-free.",\n        img: "assets/images/new_passport.png"`
);

// Replace Indian Visa image
content = content.replace(
    /"indian-visa": {[\s\S]*?img: "assets\/images\/visa-application-large.jpg"/,
    `"indian-visa": {\n        title: "Indian Visa Registration — Renewal Services",\n        desc: "At Alexzander International, we provide end-to-end support for Indian visa registration and renewal to make your stay legal and secure.",\n        img: "assets/images/indian_visa.png"`
);

fs.writeFileSync('service-details.js', content, 'utf8');
console.log('Updated service-details.js');
