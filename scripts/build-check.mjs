import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const REQUIRED = [
  'index.html',
  'styles.css',
  'src/app.js',
  'src/core/router.js',
  'src/data/course.js',
  'src/data/units.js',
  'src/data/criticalQuestions.js',
  'src/data/projects.js',
  'src/components/labs.js',
  'src/components/topicLesson.js',
  'src/components/projectsView.js',
  'src/components/criticalQuestionsView.js',
  'src/data/topics/index.js',
  'src/data/topics/unit1.js',
  'src/data/topics/unit2.js',
  'src/data/topics/unit3.js',
  'src/data/topics/unit4.js'
];

const errors = [];
const warnings = [];

REQUIRED.forEach((file) => {
  if (!existsSync(file)) errors.push(`Missing required file: ${file}`);
});

const html = readFileSync('index.html', 'utf8');
if (!html.includes('src/app.js')) errors.push('index.html must load src/app.js');
if (!html.includes('faculty-link')) errors.push('index.html must contain Faculty link');
if (!html.includes('data-action="toggle-theme"')) errors.push('index.html must contain theme toggle');
if (!html.includes('id="app"')) errors.push('index.html must contain #app element');
if (!html.includes('hashchange') === false) {}

const routes = readFileSync('src/core/router.js', 'utf8');
if (!routes.includes('hashchange')) warnings.push('Router should listen to hashchange');
if (!routes.includes('location.hash')) warnings.push('Router should read location.hash');

const css = readFileSync('styles.css', 'utf8');
if (css.includes('width:') && !css.includes('@media')) {}
if (!css.includes('--ink')) warnings.push('CSS missing design tokens');

function walkDir(dir, ext, found = []) {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === 'node_modules' || entry === '.git' || entry === 'public') continue;
    const stat = statSync(full);
    if (stat.isDirectory()) walkDir(full, ext, found);
    else if (!ext || extname(entry) === ext) found.push(full);
  }
  return found;
}

import { execSync } from 'node:child_process';

const jsFiles = walkDir('src', '.js');
jsFiles.forEach((file) => {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
  } catch (err) {
    errors.push(`Syntax check failed for ${file}: ${err.message}`);
  }
  const content = readFileSync(file, 'utf8');
  if (content.includes('var ')) warnings.push(`${file}: use const/let instead of var`);
});

const htmlFiles = walkDir('.', '.html');
htmlFiles.forEach((file) => {
  const content = readFileSync(file, 'utf8');
  if (content.includes('onclick=')) errors.push(`${file}: do not use inline onclick`);
  if (content.includes('  ')) {} // acceptable
});

walkDir('src', '.js').forEach((file) => {
  const content = readFileSync(file, 'utf8');
  const linkRegex = /href\s*=\s*["']((?!#|javascript:|mailto:)[^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(content))) {
    const url = match[1];
    if (url.startsWith('http')) {
      // external link - ok
    } else if (!url.startsWith('.') && !url.startsWith('/')) {
      warnings.push(`${file}: possibly relative link "${url}" - verify it resolves`);
    }
  }
});

if (errors.length) {
  console.error('\n✗ Build validation failed:\n');
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}

if (warnings.length) {
  console.warn('\n⚠ Warnings:\n');
  warnings.forEach((w) => console.warn(`  ⚠ ${w}`));
}

console.log(`\n✓ Build validation passed`);
console.log(`  ${REQUIRED.length} required files verified`);
console.log(`  ${jsFiles.length} JavaScript files checked`);
console.log(`  ${htmlFiles.length} HTML files checked`);
console.log(`  ${warnings.length} warnings`);
