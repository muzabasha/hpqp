import { DIAGRAM_REGISTRY } from '../src/components/interactiveDiagrams.js';
import fs from 'fs';

const appCode = fs.readFileSync('./src/app.js', 'utf8');

console.log('Auditing DIAGRAM_REGISTRY controls and app.js handlers...\n');

for (const [id, fn] of Object.entries(DIAGRAM_REGISTRY)) {
  const html = fn();
  const matches = html.match(/data-[a-z0-9-]+(=["'][^"']*["'])?/gi) || [];
  const uniqueAttrs = [...new Set(matches)];
  console.log(`\n=== Diagram: ${id} ===`);
  
  uniqueAttrs.forEach(attr => {
    const attrName = attr.split('=')[0];
    const isHandled = appCode.includes(attrName);
    console.log(`  ${attr.padEnd(45)} -> handled in app.js: ${isHandled ? '✅' : '❌ MISSING'}`);
  });
}
