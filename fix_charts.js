const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

css = css.replace(/--destructive: 0 0% 50%;/g, '--destructive: 0 84.2% 60.2%;');

// Replace chart-1 etc
css = css.replace(/--chart-1: 0 0% 50%;/, '--chart-1: 12 76% 61%;');
css = css.replace(/--chart-2: 0 0% 50%;/, '--chart-2: 173 58% 39%;');
css = css.replace(/--chart-3: 0 0% 50%;/, '--chart-3: 197 37% 24%;');
css = css.replace(/--chart-4: 0 0% 50%;/, '--chart-4: 43 74% 66%;');
css = css.replace(/--chart-5: 0 0% 50%;/, '--chart-5: 27 87% 67%;');

css = css.replace(/--chart-1: 0 0% 50%;/, '--chart-1: 220 70% 50%;');
css = css.replace(/--chart-2: 0 0% 50%;/, '--chart-2: 160 60% 45%;');
css = css.replace(/--chart-3: 0 0% 50%;/, '--chart-3: 30 80% 55%;');
css = css.replace(/--chart-4: 0 0% 50%;/, '--chart-4: 280 65% 60%;');
css = css.replace(/--chart-5: 0 0% 50%;/, '--chart-5: 340 75% 55%;');

fs.writeFileSync('app/globals.css', css);
