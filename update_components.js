const fs = require('fs');
const glob = require('glob');

const files = glob.sync('components/**/*.{tsx,ts}', { cwd: process.cwd() });
for (const file of files) {
  let code = fs.readFileSync(file, 'utf-8');
  if (code.includes('border-gray-200') || code.includes('dark:border-white/')) {
    code = code.replace(/border-gray-200(\/[0-9]+)?(.*?dark:border-white\/([0-9]+))?/g, 'border-border');
    fs.writeFileSync(file, code);
  }
}
const appFiles = glob.sync('app/**/*.{tsx,ts}', { cwd: process.cwd() });
for (const file of appFiles) {
  let code = fs.readFileSync(file, 'utf-8');
  let original = code;
  
  // Replace dark:border-* and border-gray-* and border-zinc-* with just border-border in common combos
  code = code.replace(/border-(gray|zinc)-\d+(\/[0-9]+)?/g, 'border-border');
  code = code.replace(/dark:border-(white|black)\/[0-9]+/g, '');
  code = code.replace(/dark:border-white/g, '');
  code = code.replace(/dark:border-transparent/g, 'border-transparent');
  code = code.replace(/border-border\s+border-border/g, 'border-border');
  code = code.replace(/bg-(gray|zinc)-\d+ dark:bg-(zinc|neutral)-\d+(\/[0-9]+)?/g, 'bg-card');
  code = code.replace(/bg-white dark:bg-(zinc|neutral|#\w+)(\/[0-9]+)?/g, 'bg-card');
  code = code.replace(/(shadow-(sm|md|lg|xl|2xl))\s+dark:shadow-(none|inner)/g, '$1');
  
  if (code !== original) {
    fs.writeFileSync(file, code);
  }
}
console.log('App components updated.');
