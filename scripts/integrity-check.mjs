import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const app = readFileSync('src/app.js', 'utf8');
const router = readFileSync('src/core/router.js', 'utf8');
const allJs = app + router;

const checks = [];

checks.push(['HTML loads app.js', html.includes('src/app.js')]);
checks.push(['Faculty link exists', html.includes('faculty-link')]);
checks.push(['Theme toggle exists', html.includes('toggle-theme')]);
checks.push(['#app element exists', html.includes('id="app"')]);
checks.push(['Skip link exists', html.includes('skip-link')]);
checks.push(['Meta viewport', html.includes('viewport')]);
checks.push(['MathJax loaded', html.includes('mathjax')]);
checks.push(['Google Fonts', html.includes('fonts.googleapis')]);
checks.push(['No inline onclick', !html.includes('onclick=')]);
checks.push(['No var keyword in JS', !app.includes('var ') && !router.includes('var ')]);
checks.push(['Hash routing (router)', router.includes('hashchange')]);
checks.push(['Location hash (router)', router.includes('location.hash')]);
checks.push(['404 handler', app.includes('notFound')]);
checks.push(['Mark topic action', app.includes('mark-topic')]);
checks.push(['Mark lab action', app.includes('mark-lab')]);
checks.push(['Theme toggle action', app.includes('toggle-theme')]);
checks.push(['Unit routes', app.includes('unitId')]);
checks.push(['Topic routes', app.includes('topic/')]);
checks.push(['Lab route', app.includes('lab/speedup') || allJs.includes('/lab/')]);
checks.push(['Error page', app.includes('Page not found')]);
checks.push(['LocalStorage save', app.includes('localStorage')]);
checks.push(['MathJax typeset', html.includes('MathJax')]);

let failed = 0;
checks.forEach(([name, ok]) => {
  console.log(ok ? '  ✓ ' + name : '  ✗ ' + name);
  if (!ok) failed++;
});

if (failed) {
  console.error('\n✗ ' + failed + ' checks failed');
  process.exit(1);
}
console.log('\n✓ All ' + checks.length + ' integrity checks passed');
