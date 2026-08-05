const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'services.html', 'contact.html'];

const newHeader = `    <!-- Header Navigation -->
    <header>
        <div class="top-bar">
            <div class="container">
                <div class="top-contact">
                    <div class="top-contact-item">
                        <div class="icon-circle"><i class="fas fa-phone-alt"></i></div>
                        +91 8098600060
                    </div>
                    <div class="top-contact-item">
                        <div class="icon-circle"><i class="fas fa-envelope"></i></div>
                        info@alexzander.com
                    </div>
                    <div class="top-contact-item">
                        <div class="icon-circle"><i class="fas fa-map-marker-alt"></i></div>
                        Chennai
                    </div>
                </div>
                <div class="top-social">
                    <a href="#"><i class="fab fa-youtube"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="container nav-container">
            <div class="logo-wrapper">
                <a href="index.html" class="logo">
                    <img src="logo.png" alt="Alexzander International Logo" onerror="this.src='https://via.placeholder.com/50x50?text=AI'">
                    <span>ALEXZANDER</span>
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="contact.html">Contact Us</a></li>
            </ul>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
            <button class="btn-call-now" onclick="window.location.href='tel:+918098600060'">Call Us Now</button>
        </div>
    </header>`;

const newFooter = `    <!-- Footer -->
    <footer id="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <a href="index.html" class="footer-logo">
                        <img src="logo.png" alt="Logo" onerror="this.src='https://via.placeholder.com/100x50?text=AI'">
                    </a>
                    <p>One-Stop Solution – Air tickets, Forex, tours, visas, and study abroad guidance under one roof.</p>
                    <a href="about.html" style="color: white; font-weight: 500;">Read More</a>
                    <div class="footer-social">
                        <a href="#"><i class="fab fa-youtube"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Our Services</a></li>
                        <li><a href="#">Blogs</a></li>
                        <li><a href="contact.html">Contact us</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Our Services</h4>
                    <ul>
                        <li><a href="services.html">Global Visa Consultation</a></li>
                        <li><a href="services.html">Visa Application Submission</a></li>
                        <li><a href="services.html">Visa Appointment Arrangements</a></li>
                        <li><a href="services.html">Interview Guidance</a></li>
                        <li><a href="services.html">New Passport Services</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Get in Touch</h4>
                    <div class="footer-contact-item">
                        <i class="fas fa-phone-alt"></i> +91 8098600060
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-envelope"></i> info@alexzander.com
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-map-marker-alt"></i> West Tambaram, Chennai
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 <span>Alexzander International</span>. All Rights Reserved
            </div>
        </div>
    </footer>

    <!-- Floating Action Buttons -->
    <div class="fab-container">
        <a href="tel:+918098600060" class="float-btn call-float">
            <i class="fas fa-phone-alt"></i>
        </a>
        <a href="https://wa.me/918098600060" class="float-btn whatsapp-float" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <script src="script.js"></script>
</body>
</html>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace header
    content = content.replace(/<!-- Header Navigation -->[\s\S]*?<\/header>/, newHeader);
    
    // Replace footer and whatsapp float
    content = content.replace(/<!-- Footer -->[\s\S]*?<\/html>/, newFooter);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
