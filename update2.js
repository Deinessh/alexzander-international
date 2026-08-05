const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'contact.html'];

const servicesHTML = `<div class="services-grid">
                <div class="service-card" style="padding: 0; text-align: left;">
                    <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" alt="Visa & Passport Services" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Visa & Passport Services</h3>
                        <p style="color: var(--text-muted);">Comprehensive assistance for all your visa applications and passport processing needs. Expert consultation for smooth processing.</p>
                    </div>
                </div>
                <div class="service-card" style="padding: 0; text-align: left;">
                    <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop" alt="Travel Services" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Travel Services</h3>
                        <p style="color: var(--text-muted);">From domestic/international flight tickets to custom tour packages, forex, and travel insurance, we make your journey seamless.</p>
                    </div>
                </div>
                <div class="service-card" style="padding: 0; text-align: left;">
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" alt="Educational Consultancy" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Educational Consultancy</h3>
                        <p style="color: var(--text-muted);">Expert guidance for students aiming to study abroad at top-tier global institutions, including admission and interview prep.</p>
                    </div>
                </div>
                <div class="service-card" style="padding: 0; text-align: left;">
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop" alt="Wellness & Miscellaneous Services" style="width: 100%; height: 200px; object-fit: cover; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                    <div style="padding: 25px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Wellness & Miscellaneous Services</h3>
                        <p style="color: var(--text-muted);">Holistic wellness retreats, career consultation, OCI card services, and additional miscellaneous support for our clients.</p>
                    </div>
                </div>
            </div>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update emails
    content = content.replace(/info@alexzander\.com/g, 'alexzandermanpower.in@gmail.com');
    
    // Update Logo Text
    content = content.replace(/<span>ALEXZANDER<\/span>/g, '<span>ALEXZANDER INTERNATIONAL</span>');
    
    // Update Services (replace the entire grid)
    if (content.includes('<div class="services-grid">')) {
        content = content.replace(/<div class="services-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, servicesHTML + '\n        </div>\n    </section>');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
