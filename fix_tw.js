const fs = require('fs');
let code = fs.readFileSync('tailwind.config.ts', 'utf-8');
code = code.replace(/var\(--([a-zA-Z0-9-]+)\)/g, (match, p1) => {
  if (['radius', 'font-lexend-deca'].includes(p1)) return match;
  return `hsl(var(--${p1}))`;
});
// clean up double wrapping
code = code.replace(/hsl\(hsl\((.*?)\)\)/g, 'hsl($1)');
fs.writeFileSync('tailwind.config.ts', code);
