const fs = require('fs');
let code = fs.readFileSync('tailwind.config.ts', 'utf-8');
code = code.replace(/hsl\(var\((.*?)\)\)/g, 'var($1)');
fs.writeFileSync('tailwind.config.ts', code);
