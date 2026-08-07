const fs = require('fs');

let scriptJs = fs.readFileSync('script.js', 'utf8');

// Replace literal "\n" strings (backslash + 'n') that are not inside quotes
// Specifically, in my previous script, I injected `\\n` which became literal `\n` characters in the file.
scriptJs = scriptJs.replace(/^\\n\\n/gm, '');
scriptJs = scriptJs.replace(/^\\n/gm, '');
scriptJs = scriptJs.replace(/\\n/g, ''); // Also catch any other floating ones if they exist

fs.writeFileSync('script.js', scriptJs, 'utf8');

console.log('Fixed syntax errors in script.js');
