import fs from 'fs';
import path from 'path';

const cssContent = fs.readFileSync('./styles.css', 'utf8');

function findClassesInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const classMatches = content.matchAll(/class=["']([^"']+)["']/g);
  const classes = new Set();
  for (const m of classMatches) {
    m[1].split(/\s+/).forEach(c => {
      // ignore template expressions or empty
      if (c && !c.includes('${') && !c.includes('}')) {
        classes.add(c);
      }
    });
  }
  return classes;
}

const allFiles = [
  './index.html',
  './src/app.js',
  './src/components/topicLesson.js',
  './src/components/interactiveDiagrams.js',
  './src/components/interactiveMCQ.js',
  './src/components/labs.js',
  './src/components/criticalQuestionsView.js',
  './src/components/projectsView.js'
];

const missing = new Map();

for (const f of allFiles) {
  if (!fs.existsSync(f)) continue;
  const classes = findClassesInFile(f);
  for (const c of classes) {
    // Check if class selector exists in css
    const regex = new RegExp(`\\.${c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}(?=[^-_a-zA-Z0-9]|$)`);
    if (!regex.test(cssContent)) {
      if (!missing.has(c)) missing.set(c, []);
      missing.get(c).push(f);
    }
  }
}

console.log(`Total missing CSS classes: ${missing.size}\n`);
for (const [cls, files] of missing.entries()) {
  console.log(`.${cls} (found in ${files.map(f => path.basename(f)).join(', ')})`);
}
