const fs = require('fs');

const serviceDetailsJsPath = 'service-details.js';

if (fs.existsSync(serviceDetailsJsPath)) {
    let content = fs.readFileSync(serviceDetailsJsPath, 'utf8');
    
    const newServicesData = `
    "airport-placement": {
        title: "Airport Job Placement",
        desc: "Kickstart your aviation career with premium placement services for ground staff, ticketing, and management roles across major global airports.",
        img: "assets/images/service-airport.jpg",
        includes: [
            { title: "Ground Staff Placement", desc: "Opportunities in baggage handling, customer service, and terminal operations." },
            { title: "Ticketing & Reservations", desc: "Roles in airline ticketing counters and booking management." },
            { title: "Airport Management", desc: "Positions in airport administration and facility management." }
        ]
    },
    "it-placement": {
        title: "IT Job Placement",
        desc: "Connecting top tech talent with leading global companies. We specialize in software development, cybersecurity, and IT support placements.",
        img: "assets/images/service-it.jpg",
        includes: [
            { title: "Software Development", desc: "Placements for frontend, backend, and full-stack engineers." },
            { title: "Cybersecurity Roles", desc: "Opportunities for security analysts and ethical hackers." },
            { title: "IT Support & Administration", desc: "Positions in system administration and technical support." }
        ]
    },
    "hospital-placement": {
        title: "Hospital Job Placement",
        desc: "Dedicated recruitment for healthcare professionals. We match nurses, doctors, and medical staff with reputed international hospitals.",
        img: "assets/images/service-hospital.jpg",
        includes: [
            { title: "Nursing Placements", desc: "Opportunities for registered nurses in various specialized departments." },
            { title: "Medical Staff", desc: "Placements for doctors, surgeons, and medical specialists." },
            { title: "Healthcare Administration", desc: "Roles in hospital management, reception, and patient care coordination." }
        ]
    },`;

    // Inject the new services right after the opening brace of servicesData
    if (!content.includes('airport-placement')) {
        content = content.replace(/const servicesData = {/, `const servicesData = {${newServicesData}`);
        fs.writeFileSync(serviceDetailsJsPath, content, 'utf8');
        console.log('Successfully updated service-details.js with new placement pages.');
    } else {
        console.log('Services already exist in service-details.js');
    }
} else {
    console.log('service-details.js not found.');
}
