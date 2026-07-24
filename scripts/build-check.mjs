import { existsSync, readFileSync } from 'node:fs';
const required = ['index.html', 'styles.css', 'src/app.js', 'src/core/router.js', 'src/data/course.js', 'src/data/units.js', 'src/components/labs.js'];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) throw new Error(`Missing required files: ${missing.join(', ')}`);
const html = readFileSync('index.html', 'utf8');
if (!html.includes('src/app.js') || !html.includes('faculty-link')) throw new Error('Shell integrity check failed');
console.log(`HPQC build check passed: ${required.length} core files present.`);