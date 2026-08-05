const servicesData = {
    "visa-appointment": {
        title: "Visa Appointment Arrangements",
        desc: "At Alexzander International, we provide complete support for scheduling and managing your visa appointment, ensuring a smooth and hassle-free process. Our experienced consultants help you avoid long waiting times, incorrect appointment procedures, and unnecessary rejections.",
        img: "assets/images/visa-appointment.jpg",
        includes: [
            { title: "Guidance on Appointment Types", desc: "Expert advice on selecting the correct type of appointment based on your visa category." },
            { title: "Appointment Scheduling Support", desc: "Assistance in booking visa interview appointments at the correct embassy or visa center." },
            { title: "Document Checklist", desc: "Providing a complete list of documents required specifically for your visa appointment." },
            { title: "Rescheduling Help", desc: "Support in rescheduling your visa appointment if needed due to unforeseen circumstances." }
        ]
    },
    "visa-application": {
        title: "Visa Application Submission",
        desc: "At Alexzander International, we provide end-to-end assistance for your visa application submission. Navigating the complex visa process can be overwhelming, but our expert team ensures that your application is accurate, complete, and submitted on time.",
        img: "assets/images/visa-application-large.jpg",
        includes: [
            { title: "Application Review", desc: "Thorough review of your completed application forms." },
            { title: "Submission Guidance", desc: "Step-by-step assistance with the physical or online submission process." },
            { title: "Error Checking", desc: "Meticulous verification to minimize the chances of rejection." }
        ]
    },
    "oci-card": {
        title: "OCI Card Services",
        desc: "At Alexzander International, we offer expert assistance for applying, renewing, or updating your Overseas Citizenship of India (OCI) cards.",
        img: "assets/images/oci_card_service.png",
        includes: [
            { title: "New OCI Registration", desc: "Assistance with first-time OCI card applications." },
            { title: "OCI Renewal", desc: "Help with renewing expired or old OCI cards." },
            { title: "Miscellaneous Services", desc: "Updating passport details or personal information on existing OCI." }
        ]
    },
    "new-passport": {
        title: "New Passport Services",
        desc: "At Alexzander International, we make the process of applying for a new passport smooth, transparent, and hassle-free.",
        img: "assets/images/new_passport.png",
        includes: [
            { title: "Application Filling", desc: "We fill out your passport application accurately." },
            { title: "Appointment Booking", desc: "We schedule your appointment at the passport office." },
            { title: "Document Verification", desc: "We ensure you carry the right documents to the office." }
        ]
    },
    "interview-guidance": {
        title: "Interview Guidance",
        desc: "At Alexzander International, we provide expert Interview Guidance to help you confidently face embassy officials.",
        img: "assets/images/interview-large.jpg",
        includes: [
            { title: "Mock Interviews", desc: "Practice sessions simulating real embassy interviews." },
            { title: "Common Questions", desc: "Preparation for the most frequently asked questions." },
            { title: "Confidence Building", desc: "Tips on body language and communication." }
        ]
    },
    "indian-visa": {
        title: "Indian Visa Registration — Renewal Services",
        desc: "At Alexzander International, we provide end-to-end support for Indian visa registration and renewal to make your stay legal and secure.",
        img: "assets/images/indian_visa.png",
        includes: [
            { title: "FRRO Registration", desc: "Assistance with mandatory foreigner registration." },
            { title: "Visa Extension", desc: "Help with extending your current Indian visa." },
            { title: "Status Conversion", desc: "Guidance on changing your visa status within India." }
        ]
    },
    "foreign-passport": {
        title: "Foreign Passport & PCC Services",
        desc: "At Alexzander International, we provide professional assistance for obtaining foreign passports and Police Clearance Certificates.",
        img: "assets/images/foreign-passport-large.jpg",
        includes: [
            { title: "PCC Application", desc: "Assistance in applying for a Police Clearance Certificate." },
            { title: "Foreign Passport Renewal", desc: "Help with renewing passports from other countries." }
        ]
    },
    "documents-prep": {
        title: "Documents Preparation Consultation",
        desc: "At Alexzander International, we provide expert support in preparing and organizing all essential documents for your applications.",
        img: "assets/images/documents-large.jpg",
        includes: [
            { title: "Document Structuring", desc: "Organizing your files in the exact order required by embassies." },
            { title: "Translation Services", desc: "Arranging for certified translations if required." },
            { title: "Notarization Assistance", desc: "Guiding you on getting your documents notarized properly." }
        ]
    },
    "global-visa": {
        title: "Global Visa Consultation",
        desc: "At Alexzander International, our Global Visa Consultation service is designed to help you navigate international immigration laws.",
        img: "assets/images/global-visa-large.jpg",
        includes: [
            { title: "Country Selection", desc: "Advice on the best countries based on your profile." },
            { title: "Visa Type Selection", desc: "Choosing between tourist, business, student, or work visas." },
            { title: "Eligibility Assessment", desc: "Checking if you meet the criteria for your desired visa." }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Parse URL Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    const service = servicesData[serviceId];

    if (service) {
        // 2. Populate Page Data
        document.getElementById('serviceTitle').textContent = service.title;
        document.getElementById('serviceDesc').textContent = service.desc;
        document.getElementById('serviceImage').src = service.img;
        
        const includesList = document.getElementById('serviceIncludesList');
        includesList.innerHTML = '';
        service.includes.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
            includesList.appendChild(li);
        });
        
        document.getElementById('serviceIncludesTitle').textContent = `Our ${service.title} Service Includes:`;
    } else {
        document.getElementById('serviceTitle').textContent = "Service Not Found";
        document.getElementById('serviceDesc').textContent = "Please select a valid service from our services page.";
        document.getElementById('serviceIncludesList').innerHTML = "";
        document.getElementById('serviceIncludesTitle').style.display = 'none';
        document.querySelector('.apply-form').style.display = 'none';
    }

    // 3. Handle WhatsApp Form Submission
    const waForm = document.getElementById('whatsappForm');
    if(waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('waName').value;
            const gender = document.getElementById('waGender').value;
            const phone = document.getElementById('waPhone').value;
            const email = document.getElementById('waEmail').value;
            const place = document.getElementById('waPlace').value;
            
            const serviceName = service ? service.title : "General Inquiry";
            
            let message = `*New Application for ${serviceName}*\n\n`;
            message += `*Name:* ${name}\n`;
            message += `*Gender:* ${gender}\n`;
            message += `*Phone:* ${phone}\n`;
            if(email) message += `*Email:* ${email}\n`;
            message += `*Place:* ${place}\n`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/918098600060?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});
