import { LAB_CATALOG, renderLab } from '../src/components/labs.js';
import fs from 'fs';

const appCode = fs.readFileSync('./src/app.js', 'utf8');

console.log('Auditing all 17 Virtual Labs and their input/click handlers in app.js:\n');

for (const lab of LAB_CATALOG) {
  const html = renderLab(lab.id, false); // embedded in topic lesson
  const dataAttrs = [...new Set(html.match(/data-[a-z0-9-]+/gi) || [])];
  
  console.log(`=== Lab [${lab.unit}-${lab.topic}]: ${lab.id} (${lab.title}) ===`);
  const inputs = [...new Set(html.match(/<input[^>]+data-[a-z0-9-]+|<select[^>]+data-[a-z0-9-]+|<button[^>]+data-[a-z0-9-]+/gi) || [])];
  
  inputs.forEach(el => {
    const attrMatch = el.match(/data-([a-z0-9-]+)/i);
    if (!attrMatch) return;
    const attr = attrMatch[0];
    const isHandled = appCode.includes(attr);
    console.log(`  Control: ${attr.padEnd(30)} -> Handled: ${isHandled ? '✅' : '❌ NOT FOUND'}`);
  });
}
