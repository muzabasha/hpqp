import { STUDENT_PROJECTS } from '../data/projects.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function renderProjectsView(activeUnit = 'all') {
  const filtered = activeUnit === 'all'
    ? STUDENT_PROJECTS
    : STUDENT_PROJECTS.filter(p => String(p.unitId) === String(activeUnit));

  return `<div class="projects-container">
    <div class="hero">
      <div class="eyebrow">Experiential Learning · TRL 4 Proof of Concept</div>
      <h1>60 Open-Ended Student Projects</h1>
      <p class="lede">Demonstrate laboratory-validated proof of concept (TRL Level 4) across foundations, parallel models, GPU computing, and quantum circuits. Each project includes step-by-step instructions for students.</p>
      <div class="filter-bar">
        <span class="filter-label">Filter Unit:</span>
        <button class="button ${activeUnit === 'all' ? 'primary' : ''}" data-project-unit="all">All Units (60)</button>
        <button class="button ${activeUnit === '1' ? 'primary' : ''}" data-project-unit="1">Unit 1 (15)</button>
        <button class="button ${activeUnit === '2' ? 'primary' : ''}" data-project-unit="2">Unit 2 (15)</button>
        <button class="button ${activeUnit === '3' ? 'primary' : ''}" data-project-unit="3">Unit 3 (15)</button>
        <button class="button ${activeUnit === '4' ? 'primary' : ''}" data-project-unit="4">Unit 4 (15)</button>
      </div>
    </div>

    <div class="grid projects-grid">
      ${filtered.map(p => `
        <article class="card project-item-card">
          <div>
            <div class="card-meta">
              <span>UNIT 0${p.unitId} · ${esc(p.domain)}</span>
              <span class="trl-badge">${esc(p.trlLevel)}</span>
            </div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.problemStatement)}</p>
          </div>
          <details class="project-details">
            <summary class="button">View Complete Student Instructions & Roadmap ↗</summary>
            <div class="project-instructions-box">
              <h4>System Architecture & Prerequisites</h4>
              <p><strong>Architecture:</strong> ${esc(p.architecture)}</p>
              <ul>${p.prerequisites.map(pr => `<li>${esc(pr)}</li>`).join('')}</ul>

              <h4>Step-by-Step Student Instructions</h4>
              <div class="student-steps-list">
                ${p.stepByStepInstructions.map(s => `
                  <div class="step-card">
                    <strong>${esc(s.title)}</strong>
                    <p>${esc(s.description)}</p>
                  </div>
                `).join('')}
              </div>

              <h4>Expected Deliverables</h4>
              <ul>${p.expectedDeliverables.map(d => `<li>${esc(d)}</li>`).join('')}</ul>

              <h4>Assessment Rubric</h4>
              <div class="rubric-grid">
                ${p.rubric.map(r => `<div><strong>${esc(r.criteria)}</strong>: ${esc(r.weight)}</div>`).join('')}
              </div>
            </div>
          </details>
        </article>
      `).join('')}
    </div>
  </div>`;
}
