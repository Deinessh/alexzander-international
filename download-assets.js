const fs = require('fs');
const https = require('https');
const path = require('path');

const assetDir = path.join(__dirname, 'assets', 'images');

// Create directory if not exists
if (!fs.existsSync(assetDir)) {
    fs.mkdirSync(assetDir, { recursive: true });
}

const filesToUpdate = ['index.html', 'services.html', 'service-details.js'];

// List of standard fallback images in case a download fails
const imagesToDownload = [
    { url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=400&fit=crop", name: "visa-appointment.jpg" },
    { url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop", name: "hero1.jpg" },
    { url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop", name: "visa-application.jpg" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop", name: "hero2.jpg" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop", name: "global-visa-large.jpg" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop", name: "global-visa.jpg" },
    { url: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1600&h=900&fit=crop", name: "hero3.jpg" },
    { url: "https://images.unsplash.com/photo-1507679622115-6c67d1ce5757?w=600&h=400&fit=crop", name: "oci-card.jpg" },
    { url: "https://images.unsplash.com/photo-1507679622115-6c67d1ce5757?w=1200&h=400&fit=crop", name: "oci-card-large.jpg" },
    { url: "https://images.unsplash.com/photo-1528543606781-2f64f434ee49?w=600&h=400&fit=crop", name: "new-passport.jpg" },
    { url: "https://images.unsplash.com/photo-1528543606781-2f64f434ee49?w=1200&h=400&fit=crop", name: "new-passport-large.jpg" },
    { url: "https://images.unsplash.com/photo-1508253730651-e5d3dc8bbbc4?w=600&h=400&fit=crop", name: "indian-visa.jpg" },
    { url: "https://images.unsplash.com/photo-1508253730651-e5d3dc8bbbc4?w=1200&h=400&fit=crop", name: "indian-visa-large.jpg" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop", name: "interview.jpg" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop", name: "interview-large.jpg" },
    { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", name: "foreign-passport.jpg" },
    { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop", name: "foreign-passport-large.jpg" },
    { url: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=600&h=400&fit=crop", name: "documents.jpg" },
    { url: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=1200&h=400&fit=crop", name: "documents-large.jpg" },
    { url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop", name: "visa-appointment-small.jpg" },
    { url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=400&fit=crop", name: "visa-application-large.jpg" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop", name: "about-team.jpg" }
];

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const dest = path.join(assetDir, filename);
        if (fs.existsSync(dest)) {
            return resolve(); // skip if already downloaded
        }
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 302 || response.statusCode === 301) {
                // handle redirect
                downloadImage(response.headers.location, filename).then(resolve).catch(reject);
            } else {
                reject(new Error(`Failed to download ${url} - Status ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function processImages() {
    console.log("Starting downloads...");
    for (const img of imagesToDownload) {
        try {
            await downloadImage(img.url, img.name);
            console.log(`Downloaded ${img.name}`);
        } catch (e) {
            console.error(`Error downloading ${img.url}:`, e.message);
        }
    }
    
    console.log("Replacing URLs in files...");
    
    // Read and replace
    filesToUpdate.forEach(file => {
        if (!fs.existsSync(file)) return;
        let content = fs.readFileSync(file, 'utf8');
        
        imagesToDownload.forEach(img => {
            // Need to escape ? and & in regex
            const regexStr = img.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(regexStr, 'g');
            content = content.replace(regex, `assets/images/${img.name}`);
        });
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    });
    console.log("Done.");
}

processImages();
