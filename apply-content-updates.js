const fs = require('fs');

// 1. Update the footer across all HTML files
const htmlFiles = ['index.html', 'about.html', 'services.html', 'contact.html', 'service-details.html'];

const oldFooterServicesRegex = /<h4>Our Services<\/h4>[\s\S]*?<ul>[\s\S]*?<\/ul>/;
const newFooterServicesHtml = `<h4>Our Services</h4>
                    <ul>
                        <li><a href="services.html">Overseas Job Placement</a></li>
                        <li><a href="services.html">Skilled & Unskilled Recruitment</a></li>
                        <li><a href="services.html">IT & Non-IT Job Placement</a></li>
                        <li><a href="services.html">Resume & Career Guidance</a></li>
                        <li><a href="services.html">Pre-Departure Orientation</a></li>
                        <li><a href="services.html">End-to-End Recruitment Support</a></li>
                    </ul>`;

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.match(oldFooterServicesRegex)) {
            content = content.replace(oldFooterServicesRegex, newFooterServicesHtml);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated footer in ${file}`);
        }
    }
});

// 2. Update about.html content
const aboutPath = 'about.html';
if (fs.existsSync(aboutPath)) {
    let aboutContent = fs.readFileSync(aboutPath, 'utf8');
    const oldAboutSectionRegex = /<div class="about-content" style="flex: 1;">[\s\S]*?<\/div>\s*<div class="about-img" style="flex: 1;">/;
    const newAboutSectionHtml = `<div class="about-content" style="flex: 1;">
                <div class="year-badge">Established in 1999</div>
                <h2>A Legacy of Trust & Excellence</h2>
                <p>Alexzandar International Pvt Ltd is a trusted recruitment and staffing consultancy established in 1999 and headquartered in Tambaram, Chennai, Tamil Nadu. With over two decades of experience in the recruitment industry, we are committed to connecting talented job seekers with reputable employers across various sectors.</p>
                <p>We specialize in both paid and unpaid placement services, offering customized recruitment solutions for freshers as well as experienced professionals. Our goal is to bridge the gap between employers seeking skilled talent and candidates looking for meaningful career opportunities.</p>
                <p>At Alexzandar International Pvt Ltd, we understand that every organization has unique hiring requirements. Our experienced recruitment team carefully screens and shortlists candidates to ensure the right fit for every position. We also guide job seekers throughout the recruitment process, from application and interview preparation to offer acceptance and onboarding support.</p>
                <br>
                <h3>Our Mission</h3>
                <p>To provide reliable, ethical, and professional recruitment solutions that help organizations build strong teams while enabling job seekers to achieve successful careers.</p>
                <br>
                <h3>Our Vision</h3>
                <p>To become one of India's most trusted manpower and recruitment consultancies by delivering exceptional staffing solutions, maintaining high professional standards, and creating long-term relationships with clients and candidates.</p>
                <br>
                <h3>Our Values</h3>
                <ul>
                    <li>Integrity</li>
                    <li>Professionalism</li>
                    <li>Transparency</li>
                    <li>Commitment</li>
                    <li>Customer Satisfaction</li>
                    <li>Excellence</li>
                </ul>
                <p style="margin-top: 20px;">At Alexzandar International Pvt Ltd, we believe that the right talent drives business success. Whether you are an employer looking for qualified professionals or a candidate searching for the right career opportunity, we are dedicated to providing dependable recruitment services that deliver results.</p>
            </div>
            <div class="about-img" style="flex: 1;">`;
            
    if (aboutContent.match(oldAboutSectionRegex)) {
        aboutContent = aboutContent.replace(oldAboutSectionRegex, newAboutSectionHtml);
        fs.writeFileSync(aboutPath, aboutContent, 'utf8');
        console.log(`Updated about.html content`);
    }
}

// 3. Update carousel in index.html with new images
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    const oldCarouselRegex = /<div class="dest-carousel-track">[\s\S]*?<\/div>\s*<button class="dest-carousel-arrow dest-next-arrow">/;
    const newCarouselHtml = `<div class="dest-carousel-track">
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest1.jpg" alt="Singapore"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest2.jpg" alt="Luxembourg"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest3.jpg" alt="Canada"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest4.jpg" alt="Maldives"></div>
                <div class="dest-carousel-slide"><img src="assets/images/destinations/dest5.jpg" alt="Malaysia"></div>
                <!-- New additions -->
                <div class="dest-carousel-slide"><img src="assets/images/australia.jpeg" alt="Australia"></div>
                <div class="dest-carousel-slide"><img src="assets/images/qatar.jpeg" alt="Qatar"></div>
                <div class="dest-carousel-slide"><img src="assets/images/south.jpeg" alt="South Korea"></div>
                <div class="dest-carousel-slide"><img src="assets/images/dubai.jpeg" alt="Dubai"></div>
            </div>
            <button class="dest-carousel-arrow dest-next-arrow">`;

    if (indexContent.match(oldCarouselRegex)) {
        indexContent = indexContent.replace(oldCarouselRegex, newCarouselHtml);
        fs.writeFileSync(indexPath, indexContent, 'utf8');
        console.log(`Updated carousel in index.html`);
    }
}
