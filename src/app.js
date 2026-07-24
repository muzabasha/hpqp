import { course } from './data/course.js';
import { allTopics, getTopic, getUnitTopics, getTotalTopics } from './data/topics/index.js';
import { renderLab } from './components/labs.js';
import { renderTopicLesson } from './components/topicLesson.js';
import { route, startRouter } from './core/router.js';

const storageKey = 'hpqc-progress';
const state = JSON.parse(localStorage.getItem(storageKey) || '{"completed":[],"theme":"light"}');
const save = () => { localStorage.setItem(storageKey, JSON.stringify(state)); updateProgress(); };
const esc = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
const toast = (msg) => { const el = document.querySelector('[data-toast]'); el.textContent = msg; el.classList.add('visible'); setTimeout(() => el.classList.remove('visible'), 2400); };
const totalLessons = 17;
const updateProgress = () => { const v = Math.round((state.completed.length / totalLessons) * 100); document.querySelector('[data-progress-label]').textContent = `${Math.min(v, 100)}%`; document.querySelector('[data-progress-bar]').style.width = `${Math.min(v, 100)}%`; };

function home(_, app) {
  app.innerHTML = `<section class="hero"><div class="eyebrow">${course.code} / ${course.semester} / ${course.category}</div><h1>Compute beyond<br><em>the obvious.</em></h1><p class="lede">A studio for understanding the machines behind modern science. Trace one idea from silicon and memory to clusters, accelerators, and quantum circuits.</p><div class="actions"><a class="button primary" href="#/unit/1/topic/1">Start Unit 01 →</a><a class="button" href="#/roadmap">View learning roadmap</a></div></section><div class="stats"><div class="stat"><strong>04</strong><span>units</span></div><div class="stat"><strong>17</strong><span>topics</span></div><div class="stat"><strong>06</strong><span>course outcomes</span></div><div class="stat"><strong>100</strong><span>total marks</span></div></div><div class="section-heading"><div><div class="eyebrow">The course atlas</div><h2>Choose your altitude</h2></div><p>From foundations to frontier systems.</p></div><div class="grid">${course.units.map((u) => { const count = getUnitTopics(u.id).length; const done = state.completed.filter((k) => k.startsWith(`topic-${u.id}-`)).length; return `<article class="card unit-card"><div><div class="card-meta"><span>UNIT ${String(u.id).padStart(2, '0')}</span><span>${done}/${count} topics</span></div><h3>${u.title}</h3><p>${u.description}</p></div><a href="#/unit/${u.id}">Enter unit ↗</a></article>`; }).join('')}</div>`;
}

function unit(_, app, unitId) {
  const unitData = course.units.find((u) => u.id === unitId) || course.units[0];
  const topics = getUnitTopics(unitId);
  const detail = { 1: 'Case studies, memory, laws, and clusters', 2: 'OpenMP, MPI, synchronization, and load balance', 3: 'CUDA, occupancy, profiling, and cloud HPC', 4: 'Qubits, algorithms, and a hybrid prototype' };
  app.innerHTML = `<div class="unit-header"><div><div class="eyebrow">Unit ${String(unitId).padStart(2, '0')} / Integrated learning path</div><h1>${unitData.title}</h1><p>${unitData.description}</p></div><div class="unit-meter"><strong>${state.completed.filter((k) => k.startsWith(`topic-${unitId}-`)).length} / ${topics.length}</strong><span>topics explored</span><div class="progress-track"><i style="width:${(state.completed.filter((k) => k.startsWith(`topic-${unitId}-`)).length / topics.length) * 100}%"></i></div></div></div>
  <div class="section-heading"><div><div class="eyebrow">Topic sequence</div><h2>Build the mental model</h2></div><p>Concept → model → experiment → reflection</p></div>
  <div class="topic-list">${topics.map((t, i) => { const key = `topic-${unitId}-${t.id}`; const done = state.completed.includes(key); return `<article class="topic-row${done ? ' completed' : ''}"><span class="topic-number">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.description).slice(0, 120)}…</p></div><a class="button" href="#/unit/${unitId}/topic/${t.id}">${done ? 'Review' : 'Explore'} →</a></article>`; }).join('')}</div>`;
}

function roadmap(_, app) {
  app.innerHTML = `<div class="hero"><div class="eyebrow">The learning roadmap</div><h1>From first principles<br>to <em>hybrid systems.</em></h1><p class="lede">A 14-week progression from architecture and measurement through programming models, accelerators, and quantum computation.</p></div><div class="topic-list">${['Week 0 · Bridge', 'Weeks 1–4 · Unit 1 / Foundations', 'Weeks 5–8 · Unit 2 / Parallel models', 'Weeks 9–11 · Unit 3 / GPU computing', 'Weeks 12–14 · Unit 4 / Quantum computing'].map((item, i) => { const unitId = i; const done = unitId > 0 ? state.completed.filter((k) => k.startsWith(`topic-${unitId}-`)).length : 0; const total = unitId > 0 ? getUnitTopics(unitId).length : 0; return `<article class="topic-row"><span class="topic-number">${String(i).padStart(2, '0')}</span><div><h3>${item}</h3><p>${['Architecture and math refresher', 'Case studies, memory, laws, and clusters', 'OpenMP, MPI, synchronization, and load balance', 'CUDA, occupancy, profiling, and cloud HPC', 'Qubits, algorithms, and a hybrid prototype'][i]}</p></div>${unitId > 0 ? `<span class="eyebrow">${done}/${total}</span>` : '<span class="eyebrow">bridge</span>'}</article>`; }).join('')}</div>`;
}

function syllabus(_, app) {
  app.innerHTML = `<div class="hero"><div class="eyebrow">Course specification</div><h1>${course.title}</h1><p class="lede">${course.code} · ${course.semester} · ${course.category} · 3-0-0-3</p></div><div class="grid"><article class="card"><div class="eyebrow">Prerequisites</div><h3>Before you begin</h3><p>${course.prerequisites.join(' · ')}</p></article><article class="card"><div class="eyebrow">Course outcomes</div><h3>By the end, you can...</h3><p>${course.outcomes.join(' ')}</p></article><article class="card"><div class="eyebrow">Evaluation</div><h3>100 marks</h3><p>IA-1: 20 · IA-2: 20 · Assignment 1: 5 · Assignment 2: 5 · SEE: 50</p></article></div>`;
}

function resources(_, app) {
  app.innerHTML = `<div class="hero"><div class="eyebrow">Further study</div><h1>Read the systems<br><em>behind the systems.</em></h1><p class="lede">Curated references from the course framework for going deeper after each experiment.</p></div><div class="resource-list"><a href="https://www.cs.purdue.edu/homes/ayg/" target="_blank" rel="noreferrer">Introduction to Parallel Computing · Grama et al. <span>↗</span></a><a href="https://books.google.com/books?id=aai-P4v9GJ8C" target="_blank" rel="noreferrer">Quantum Computation and Quantum Information · Nielsen & Chuang <span>↗</span></a><a href="https://developer.nvidia.com/" target="_blank" rel="noreferrer">CUDA and Nsight documentation · NVIDIA <span>↗</span></a><a href="https://learning.quantum.ibm.com/" target="_blank" rel="noreferrer">IBM Quantum Learning <span>↗</span></a><a href="https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science&q=parallel%20computing" target="_blank" rel="noreferrer">MIT OpenCourseWare · Parallel computing <span>↗</span></a></div>`;
}

function assessment(_, app) {
  app.innerHTML = `<div class="hero"><div class="eyebrow">Assessment studio</div><h1>Make your<br><em>thinking visible.</em></h1><p class="lede">Use the questions and labs as low-stakes rehearsal for the course outcomes. Your progress stays on this device.</p></div><div class="grid"><article class="card"><div class="eyebrow">Assignment 01</div><h3>Units 1 & 2 · Awareness</h3><p>Explain a performance model, then design a communication-aware parallel solution. 5 marks.</p></article><article class="card"><div class="eyebrow">Assignment 02</div><h3>Units 3 & 4 · Advanced</h3><p>Compare an optimized HPC approach with a hybrid quantum approach. 5 marks.</p></article><article class="card"><div class="eyebrow">Capstone</div><h3>Prototype + viva</h3><p>Design a real-world optimized HPC or hybrid classical-quantum prototype. CO6.</p></article></div>`;
}

function topicPage(_, app, unitId, topicId) {
  app.innerHTML = renderTopicLesson(unitId, topicId);
}

function labPage(_, app) {
  app.innerHTML = renderTopicLesson(1, 4);
}

function notFound(_, app) {
  app.innerHTML = `<div class="hero"><div class="eyebrow">404</div><h1>Page not found</h1><p class="lede">The page you are looking for does not exist. It may have been moved or the URL may be incorrect.</p><div class="actions"><a class="button primary" href="#/">Return home</a><a class="button" href="#/roadmap">View roadmap</a></div></div>`;
}

route(/^\/$/, home);
route(/^\/roadmap$/, roadmap);
route(/^\/syllabus$/, syllabus);
route(/^\/resources$/, resources);
route(/^\/assessment$/, assessment);
route(/^\/unit\/(\d+)\/topic\/(\d+)$/, (path, app) => {
  const m = path.match(/unit\/(\d+)\/topic\/(\d+)/);
  topicPage(path, app, Number(m[1]), Number(m[2]));
});
route(/^\/unit\/(\d+)$/, (path, app) => {
  unit(path, app, Number(path.match(/unit\/(\d+)/)[1]));
});
route(/^\/topic\/(\d+)$/, (path, app) => topicPage(path, app, 1, Number(path.match(/topic\/(\d+)/)[1])));
route(/^\/lab\/speedup$/, labPage);
route(/^.*$/, notFound);

document.addEventListener('click', (e) => {
  const action = e.target.closest('[data-action]');
  if (!action) return;
  if (action.dataset.action === 'toggle-theme') {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = state.theme;
    save();
  }
  if (action.dataset.action === 'mark-topic') {
    const key = `topic-${action.dataset.topic}`;
    if (!state.completed.includes(key)) state.completed.push(key);
    save();
    toast('Topic added to your progress.');
  }
  if (action.dataset.action === 'mark-lab') {
    const key = `lab-${action.dataset.lab}`;
    if (!state.completed.includes(key)) state.completed.push(key);
    save();
    toast('Lab progress saved on this device.');
  }
  if (action.dataset.action === 'reset-circuit') updateQuantum('reset');
});

document.addEventListener('click', (e) => {
  const gate = e.target.closest('[data-gate]');
  if (gate) updateQuantum(gate.dataset.gate);
});

document.addEventListener('input', (e) => {
  if (e.target.matches('[data-serial], [data-processors]')) {
    const serial = Number(document.querySelector('[data-serial]').value) / 100;
    const processors = Number(document.querySelector('[data-processors]').value);
    const speedup = 1 / (serial + ((1 - serial) / processors));
    document.querySelector('[data-serial-value]').textContent = `${Math.round(serial * 100)}%`;
    document.querySelector('[data-processors-value]').textContent = processors;
    document.querySelector('[data-speedup]').textContent = `${speedup.toFixed(2)}×`;
    document.querySelector('[data-efficiency]').textContent = `${(speedup / processors * 100).toFixed(1)}%`;
    document.querySelector('[data-ceiling]').textContent = `${(1 / serial).toFixed(0)}×`;
  }
  if (e.target.matches('[data-workers], [data-parallel-work]')) {
    const workers = Number(document.querySelector('[data-workers]').value);
    const work = Number(document.querySelector('[data-parallel-work]').value) / 100;
    const time = 1 - work + work / workers + workers * 0.004;
    document.querySelector('[data-workers-value]').textContent = workers;
    document.querySelector('[data-parallel-work-value]').textContent = `${Math.round(work * 100)}%`;
    document.querySelector('[data-parallel-time]').textContent = time.toFixed(2);
    document.querySelector('[data-parallel-speedup]').textContent = `${(1 / time).toFixed(2)}×`;
    document.querySelector('[data-parallel-efficiency]').textContent = `${(1 / time / workers * 100).toFixed(1)}%`;
  }
  if (e.target.matches('[data-coalescing], [data-occupancy]')) {
    const coalescing = Number(document.querySelector('[data-coalescing]').value);
    const occupancy = Number(document.querySelector('[data-occupancy]').value);
    const score = coalescing * occupancy / 100;
    document.querySelector('[data-coalescing-value]').textContent = `${coalescing}%`;
    document.querySelector('[data-occupancy-value]').textContent = `${occupancy}%`;
    document.querySelector('[data-gpu-score]').textContent = score.toFixed(1);
    document.querySelector('[data-gpu-bar]').style.height = `${score}%`;
    document.querySelector('[data-gpu-gain]').textContent = `+${(score - 45.5).toFixed(1)}%`;
    document.querySelector('[data-gpu-bottleneck]').textContent = coalescing < occupancy ? 'memory' : 'latency';
  }
  if (e.target.matches('[data-model-input], [data-model-sensitivity]')) {
    const input = Number(document.querySelector('[data-model-input]').value);
    const sensitivity = Number(document.querySelector('[data-model-sensitivity]').value);
    const baseline = Math.max(8, input * .72);
    const tuned = Math.min(100, input * (1 + sensitivity / 180));
    document.querySelector('[data-model-input-value]').textContent = input;
    document.querySelector('[data-model-sensitivity-value]').textContent = `${sensitivity}%`;
    document.querySelector('[data-model-bar="input"]').style.height = `${input}%`;
    document.querySelector('[data-model-bar="baseline"]').style.height = `${baseline}%`;
    document.querySelector('[data-model-bar="tuned"]').style.height = `${tuned}%`;
    const fb = document.querySelector('[data-model-feedback]');
    if (fb) fb.textContent = `Synthetic output ${tuned.toFixed(1)}; baseline ${baseline.toFixed(1)}; sensitivity ${sensitivity}%.`;
  }
});

function updateQuantum(gate) {
  const label = document.querySelector('[data-state-label]');
  const probability = document.querySelector('[data-state-probability]');
  const measurement = document.querySelector('[data-measurement]');
  const feedback = document.querySelector('[data-quantum-feedback]');
  const wireA = document.querySelector('[data-wire-a]');
  const wireB = document.querySelector('[data-wire-b]');
  if (!label) return;
  if (gate === 'h') { label.textContent = '|00⟩ + |10⟩'; probability.textContent = '50 / 50'; feedback.textContent = 'H creates a local superposition: the first qubit now has two possible outcomes.'; wireA.classList.add('active'); }
  if (gate === 'x') { label.textContent = '|10⟩'; probability.textContent = '100%'; feedback.textContent = 'X flips the selected qubit. It is a deterministic bit flip, not a superposition.'; wireA.classList.add('active'); }
  if (gate === 'cnot') { label.textContent = '|00⟩ + |11⟩'; probability.textContent = '50 / 50'; feedback.textContent = 'CNOT correlates the two qubits, producing a simplified Bell-state view.'; wireA.classList.add('active'); wireB.classList.add('active'); }
  if (gate === 'measure') { measurement.textContent = Math.random() > .5 ? '|00⟩' : '|11⟩'; feedback.textContent = 'Measurement collapses the state to one observed outcome. Repeat to estimate the distribution.'; }
  if (gate === 'reset') { label.textContent = '|00⟩'; probability.textContent = '100%'; measurement.textContent = 'ready'; feedback.textContent = 'Start with H to create superposition, then use CNOT to correlate the qubits.'; wireA.classList.remove('active'); wireB.classList.remove('active'); }
}

document.documentElement.dataset.theme = state.theme;
startRouter();
updateProgress();
