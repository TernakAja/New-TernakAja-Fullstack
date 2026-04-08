const fs = require('fs');

let css = fs.readFileSync('app/globals.css', 'utf-8');

// Swap oklch values to hsl values.
// Standard Light
css = css.replace(/--background: oklch\(1 0 0\);/g, '--background: 0 0% 98%;'); // #fafafa
css = css.replace(/--foreground: oklch\(0.145 0 0\);/g, '--foreground: 0 0% 9%;');

css = css.replace(/--card: oklch\(1 0 0\);/g, '--card: 0 0% 100%;');
css = css.replace(/--card-foreground: oklch\(0.145 0 0\);/g, '--card-foreground: 0 0% 9%;');

css = css.replace(/--popover: oklch\(1 0 0\);/g, '--popover: 0 0% 100%;');
css = css.replace(/--popover-foreground: oklch\(0.145 0 0\);/g, '--popover-foreground: 0 0% 9%;');

css = css.replace(/--primary: oklch\(0.508 0.118 165.612\);/g, '--primary: 145 47% 24%;');
css = css.replace(/--primary-foreground: oklch\(0.979 0.021 166.113\);/g, '--primary-foreground: 50 100% 74%;');

css = css.replace(/--secondary: oklch\(0.967 0.001 286.375\);/g, '--secondary: 50 100% 74%;');
css = css.replace(/--secondary-foreground: oklch\(0.21 0.006 285.885\);/g, '--secondary-foreground: 145 37% 33%;');

css = css.replace(/--muted: oklch\(0.97 0 0\);/g, '--muted: 0 0% 96.1%;'); // zinc-100
css = css.replace(/--muted-foreground: oklch\(0.556 0 0\);/g, '--muted-foreground: 0 0% 45.1%;');

css = css.replace(/--accent: oklch\(0.97 0 0\);/g, '--accent: 0 0% 96.1%;');
css = css.replace(/--accent-foreground: oklch\(0.205 0 0\);/g, '--accent-foreground: 0 0% 9%;');

css = css.replace(/--border: oklch\(0.922 0 0\);/g, '--border: 0 0% 89.8%;'); // zinc-200
css = css.replace(/--input: oklch\(0.922 0 0\);/g, '--input: 0 0% 89.8%;'); 
css = css.replace(/--ring: oklch\(0.708 0 0\);/g, '--ring: 145 47% 24%;');

// Dark Mode
css = css.replace(/--background: oklch\(0.145 0 0\);/g, '--background: 0 0% 3.9%;');
css = css.replace(/--foreground: oklch\(0.985 0 0\);/g, '--foreground: 0 0% 98%;');

css = css.replace(/--card: oklch\(0.205 0 0\);/g, '--card: 0 0% 9%;');
css = css.replace(/--card-foreground: oklch\(0.985 0 0\);/g, '--card-foreground: 0 0% 98%;');

css = css.replace(/--popover: oklch\(0.205 0 0\);/g, '--popover: 0 0% 9%;');
css = css.replace(/--popover-foreground: oklch\(0.985 0 0\);/g, '--popover-foreground: 0 0% 98%;');

css = css.replace(/--primary: oklch\(0.432 0.095 166.913\);/g, '--primary: 142 60% 46%;');
css = css.replace(/--primary-foreground: oklch\(0.979 0.021 166.113\);/g, '--primary-foreground: 50 100% 74%;');

css = css.replace(/--secondary: oklch\(0.274 0.006 286.033\);/g, '--secondary: 240 3.7% 15.9%;');
css = css.replace(/--secondary-foreground: oklch\(0.985 0 0\);/g, '--secondary-foreground: 0 0% 98%;');

css = css.replace(/--muted: oklch\(0.269 0 0\);/g, '--muted: 0 0% 14.9%;');
css = css.replace(/--muted-foreground: oklch\(0.708 0 0\);/g, '--muted-foreground: 0 0% 63.9%;');

css = css.replace(/--accent: oklch\(0.269 0 0\);/g, '--accent: 0 0% 14.9%;');
css = css.replace(/--accent-foreground: oklch\(0.985 0 0\);/g, '--accent-foreground: 0 0% 98%;');

css = css.replace(/--border: oklch\(1 0 0 \/ 10%\);/g, '--border: 0 0% 14.9%;');
css = css.replace(/--input: oklch\(1 0 0 \/ 15%\);/g, '--input: 0 0% 14.9%;');
css = css.replace(/--ring: oklch\(0.556 0 0\);/g, '--ring: 142 60% 46%;');

// Sidebar
css = css.replace(/--sidebar: oklch\(0.985 0 0\);/g, '--sidebar: 0 0% 98%;');
css = css.replace(/--sidebar-foreground: oklch\(0.145 0 0\);/g, '--sidebar-foreground: 0 0% 9%;');
css = css.replace(/--sidebar-border: oklch\(0.922 0 0\);/g, '--sidebar-border: 0 0% 89.8%;');
css = css.replace(/--sidebar-ring: oklch\(0.708 0 0\);/g, '--sidebar-ring: 145 47% 24%;');
css = css.replace(/--sidebar-primary: oklch\(0.596 0.145 163.225\);/g, '--sidebar-primary: 0 0% 9%;');
css = css.replace(/--sidebar-primary-foreground: oklch\(0.979 0.021 166.113\);/g, '--sidebar-primary-foreground: 0 0% 98%;');
css = css.replace(/--sidebar-accent: oklch\(0.97 0 0\);/g, '--sidebar-accent: 0 0% 96.1%;');
css = css.replace(/--sidebar-accent-foreground: oklch\(0.205 0 0\);/g, '--sidebar-accent-foreground: 0 0% 9%;');


// Dark Sidebar
css = css.replace(/--sidebar: oklch\(0.205 0 0\);/g, '--sidebar: 0 0% 9%;');
css = css.replace(/--sidebar-foreground: oklch\(0.985 0 0\);/g, '--sidebar-foreground: 0 0% 98%;');
css = css.replace(/--sidebar-border: oklch\(1 0 0 \/ 10%\);/g, '--sidebar-border: 0 0% 14.9%;');
css = css.replace(/--sidebar-ring: oklch\(0.556 0 0\);/g, '--sidebar-ring: 142 60% 46%;');
css = css.replace(/--sidebar-primary: oklch\(0.696 0.17 162.48\);/g, '--sidebar-primary: 142 60% 46%;');
css = css.replace(/--sidebar-primary-foreground: oklch\(0.262 0.051 172.552\);/g, '--sidebar-primary-foreground: 0 0% 98%;');
css = css.replace(/--sidebar-accent: oklch\(0.269 0 0\);/g, '--sidebar-accent: 0 0% 14.9%;');
css = css.replace(/--sidebar-accent-foreground: oklch\(0.985 0 0\);/g, '--sidebar-accent-foreground: 0 0% 98%;');

// Destructive (Dark)
css = css.replace(/--destructive: oklch\(0.704 0.191 22.216\);/g, '--destructive: 0 62.8% 30.6%;');

// Charts
css = css.replace(/oklch\([0-9\.]+ [0-9\.]+ [0-9\.]+\);/g, '0 0% 50%;');

// Remove hsl() wrapping from tblack, twhite, etc since we are switching tailwind.config string back to hsl()!
css = css.replace(/--tblack:\s*hsl\((.*?)\);/g, '--tblack: $1;');
css = css.replace(/--twhite:\s*hsl\((.*?)\);/g, '--twhite: $1;');
css = css.replace(/--destructive-foreground:\s*hsl\((.*?)\);/g, '--destructive-foreground: $1;');
css = css.replace(/--accent-green:\s*hsl\((.*?)\);/g, '--accent-green: $1;');

// In base layer, use hsl(var(--xx))
css = css.replace(/border-color:\s*var\(--border\);/g, 'border-color: hsl(var(--border));');
css = css.replace(/background-color:\s*var\(--background\);/g, 'background-color: hsl(var(--background));');
css = css.replace(/color:\s*var\(--foreground\);/g, 'color: hsl(var(--foreground));');


fs.writeFileSync('app/globals.css', css);

let tw = fs.readFileSync('tailwind.config.ts', 'utf-8');
tw = tw.replace(/var\(--(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring|sidebar|chart|tblack|twhite)\)/g, 'hsl(var(--$1))');
fs.writeFileSync('tailwind.config.ts', tw);

