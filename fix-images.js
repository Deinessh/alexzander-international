const fs = require('fs');

const replacements = {
    // 1. Hero missing image (was 1544367567-0f2fcb009e0b) -> Replace with a reliable travel/map image
    "1544367567-0f2fcb009e0b": "1516738901171-8eb4fc13bd20",
    
    // 2. OCI Card Services missing image (was 1559589689-577aabd1ce4c) -> Replace with paperwork/office image
    "1559589689-577aabd1ce4c": "1507679622115-6c67d1ce5757",
    
    // 3. New Passport Services missing image (was 1596720426673-e4e14290f0cc) -> Replace with passport/travel image
    "1596720426673-e4e14290f0cc": "1528543606781-2f64f434ee49",
    
    // 4. Indian Visa Registration (was Taj Mahal 1524492412937-b28074a5d7da) -> Replace with visa stamp/registration related
    "1524492412937-b28074a5d7da": "1508253730651-e5d3dc8bbbc4" // Stamped passport image
};

const files = ['index.html', 'services.html', 'service-details.js'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    for (const [oldId, newId] of Object.entries(replacements)) {
        content = content.replace(new RegExp(oldId, 'g'), newId);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
console.log('Images fixed successfully.');
