const fs = require('fs');

const services = [
    {
        id: "visa-appointment",
        title: "Visa Appointment Arrangements",
        desc: "At Alexzander International, we provide complete support for scheduling and managing your visa appointments, ensuring a smooth process.",
        img: "assets/images/visa-appointment-small.jpg"
    },
    {
        id: "visa-application",
        title: "Visa Application Submission",
        desc: "At Alexzander International, we provide end-to-end assistance for your visa application submission, minimizing errors and delays.",
        img: "assets/images/visa-application.jpg"
    },
    {
        id: "oci-card",
        title: "OCI Card Services",
        desc: "At Alexzander International, we offer expert assistance for applying, renewing, or updating your Overseas Citizenship of India cards.",
        img: "assets/images/oci_card_service.png"
    },
    {
        id: "new-passport",
        title: "New Passport Services",
        desc: "At Alexzander International, we make the process of applying for a new passport smooth, transparent, and hassle-free.",
        img: "assets/images/new_passport.png"
    },
    {
        id: "interview-guidance",
        title: "Interview Guidance",
        desc: "At Alexzander International, we provide expert Interview Guidance to help you confidently face embassy officials.",
        img: "assets/images/interview.jpg"
    },
    {
        id: "indian-visa",
        title: "Indian Visa Registration — Renewal Services",
        desc: "At Alexzander International, we provide end-to-end support for Indian visa registration and renewal to make your stay legal and secure.",
        img: "assets/images/indian_visa.png"
    },
    {
        id: "foreign-passport",
        title: "Foreign Passport & PCC Services",
        desc: "At Alexzander International, we provide professional assistance for obtaining foreign passports and Police Clearance Certificates.",
        img: "assets/images/foreign-passport.jpg"
    },
    {
        id: "documents-prep",
        title: "Documents Preparation Consultation",
        desc: "At Alexzander International, we provide expert support in preparing and organizing all essential documents for your applications.",
        img: "assets/images/documents.jpg"
    },
    {
        id: "global-visa",
        title: "Global Visa Consultation",
        desc: "At Alexzander International, our Global Visa Consultation service is designed to help you navigate international immigration laws.",
        img: "assets/images/global-visa.jpg"
    }
];

let servicesHTML = '<div class="services-grid">\n';

services.forEach(s => {
    servicesHTML += `
                <div class="service-card" style="padding: 0; text-align: left; display: flex; flex-direction: column;">
                    <img src="${s.img}" alt="${s.title}" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h3 style="margin-bottom: 15px; transition: color 0.3s;">${s.title}</h3>
                        <p style="margin-bottom: 25px; flex-grow: 1; transition: color 0.3s;">${s.desc}</p>
                        <a href="service-details.html?id=${s.id}" class="btn btn-outline" style="align-self: flex-start; margin: 0; border-color: var(--secondary); color: var(--primary); font-weight: bold;">Apply Now</a>
                    </div>
                </div>`;
});

servicesHTML += '            </div>';

const files = ['index.html', 'services.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<div class="services-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, servicesHTML + '\n        </div>\n    </section>');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated services in ' + file);
});
