const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf-8');

// Wrap bare space-separated values with hsl()
code = code.replace(/--tblack:\s*([^;]+);/g, '--tblack: hsl($1);');
code = code.replace(/--twhite:\s*([^;]+);/g, '--twhite: hsl($1);');
code = code.replace(/--destructive-foreground:\s*([^;]+);/g, '--destructive-foreground: hsl($1);');
code = code.replace(/--accent-green:\s*([^;]+);/g, '--accent-green: hsl($1);');

// Remove hsl() wrapper from border-color, background, color where var() is used directly
code = code.replace(/border-color:\s*hsl\(var\(--border\)\);/g, 'border-color: var(--border);');
code = code.replace(/background-color:\s*hsl\(var\(--background\)\);/g, 'background-color: var(--background);');
code = code.replace(/color:\s*hsl\(var\(--foreground\)\);/g, 'color: var(--foreground);');

fs.writeFileSync('app/globals.css', code);
