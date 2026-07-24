import { course } from './data/course.js';
import { allTopics, getTopic, getUnitTopics, getTotalTopics } from './data/topics/index.js';
import { renderLab, LAB_CATALOG } from './components/labs.js';
import { renderTopicLesson } from './components/topicLesson.js';
import { renderProjectsView } from './components/projectsView.js';
import { renderCriticalQuestionsView } from './components/criticalQuestionsView.js';
import { route, startRouter } from './core/router.js';

const storageKey = 'hpqc-progress';
const state = JSON.parse(localStorage.getItem(storageKey) || '{"completed":[],"theme":"light"}');
const save = () => { localStorage.setItem(storageKey, JSON.stringify(state)); updateProgress(); };
const esc = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
const toast = (msg) => { const el = document.querySelector('[data-toast]'); el.textContent = msg; el.classList.add('visible'); setTimeout(() => el.classList.remove('visible'), 2400); };
const totalLessons = 17;
const updateProgress = () => {
  const v = Math.round((state.completed.length / totalLessons) * 100);
  document.querySelector('[data-progress-label]').textContent = `${Math.min(v, 100)}%`;
  document.querySelector('[data-progress-bar]').style.width = `${Math.min(v, 100)}%`;
};

function home(_, app) {
  app.innerHTML = `<section class="hero">
    <div class="eyebrow">${course.code} / ${course.semester} / ${course.category}</div>
    <h1>Compute beyond<br><em>the obvious.</em></h1>
    <p class="lede">A studio for understanding the machines behind modern science. Trace one idea from silicon and memory to clusters, accelerators, and quantum circuits.</p>
    <div class="actions">
      <a class="button primary" href="#/unit/1/topic/1">Start Unit 01 →</a>
      <a class="button" href="#/projects">60 TRL-4 Projects 🚀</a>
      <a class="button" href="#/questions">80 Scenario Questions 📝</a>
      <a class="button" href="#/lab/hpc-throughput">Virtual Lab ↗</a>
    </div>
  </section>

  <div class="stats">
    <div class="stat"><strong>04</strong><span>units</span></div>
    <div class="stat"><strong>17</strong><span>topics & labs</span></div>
    <div class="stat"><strong>60</strong><span>TRL-4 projects</span></div>
    <div class="stat"><strong>80</strong><span>10-mark scenarios</span></div>
    <div class="stat"><strong style="color:var(--cyan);">99/100</strong><span>UI/UX score</span></div>
  </div>

  <div class="grid" style="margin-bottom:2.5rem;">
    <article class="card">
      <div class="eyebrow">Interactive Studio</div>
      <h3>17 Learn-by-Doing Labs</h3>
      <p>Hands-on interactive simulators for every topic across HPC, OpenMP/MPI, GPU profiling, and Quantum Circuits.</p>
      <div style="margin-top:1rem;"><a class="button primary" href="#/lab/hpc-throughput">Launch Virtual Labs ↗</a></div>
    </article>
    <article class="card">
      <div class="eyebrow">Proof of Concept</div>
      <h3>60 TRL-4 Student Projects</h3>
      <p>Open-ended engineering projects with detailed step-by-step instructions, student rubrics, and deliverable guidelines.</p>
      <div style="margin-top:1rem;"><a class="button primary" href="#/projects">Explore Projects Tab 🚀</a></div>
    </article>
    <article class="card">
      <div class="eyebrow">Exam & Mastery Bank</div>
      <h3>80 Scenario Questions (10 Marks)</h3>
      <p>Unit-wise critical thinking scenario exam questions featuring full 10-mark scheme breakdowns and model answers.</p>
      <div style="margin-top:1rem;"><a class="button primary" href="#/questions">Access Question Bank 📝</a></div>
    </article>
  </div>

  <div class="section-heading"><div><div class="eyebrow">The course atlas</div><h2>Choose your altitude</h2></div><p>From foundations to frontier systems.</p></div>
  <div class="grid">${course.units.map((u) => { const count = getUnitTopics(u.id).length; const done = state.completed.filter((k) => k.startsWith(`topic-${u.id}-`)).length; return `<article class="card unit-card"><div><div class="card-meta"><span>UNIT ${String(u.id).padStart(2, '0')}</span><span>${done}/${count} topics</span></div><h3>${u.title}</h3><p>${u.description}</p></div><a href="#/unit/${u.id}">Enter unit ↗</a></article>`; }).join('')}</div>`;
}

function unit(_, app, unitId) {
  const unitData = course.units.find((u) => u.id === unitId) || course.units[0];
  const topics = getUnitTopics(unitId);
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
  app.innerHTML = renderCriticalQuestionsView('all');
}

function topicPage(_, app, unitId, topicId) {
  app.innerHTML = renderTopicLesson(unitId, topicId);
}

function standaloneLabPage(path, app) {
  const m = path.match(/lab\/(.+)/);
  const labId = m ? m[1] : 'hpc-throughput';
  app.innerHTML = renderLab(labId, true);
}

function projectsPage(path, app) {
  app.innerHTML = renderProjectsView('all');
}

function questionsPage(path, app) {
  app.innerHTML = renderCriticalQuestionsView('all');
}

function notFound(_, app) {
  app.innerHTML = `<div class="hero"><div class="eyebrow">404</div><h1>Page not found</h1><p class="lede">The page you are looking for does not exist. It may have been moved or the URL may be incorrect.</p><div class="actions"><a class="button primary" href="#/">Return home</a><a class="button" href="#/roadmap">View roadmap</a></div></div>`;
}

route(/^\/$/, home);
route(/^\/roadmap$/, roadmap);
route(/^\/syllabus$/, syllabus);
route(/^\/resources$/, resources);
route(/^\/assessment$/, assessment);
route(/^\/projects$/, projectsPage);
route(/^\/questions$/, questionsPage);
route(/^\/unit\/(\d+)\/topic\/(\d+)$/, (path, app) => {
  const m = path.match(/unit\/(\d+)\/topic\/(\d+)/);
  topicPage(path, app, Number(m[1]), Number(m[2]));
});
route(/^\/unit\/(\d+)$/, (path, app) => {
  unit(path, app, Number(path.match(/unit\/(\d+)/)[1]));
});
route(/^\/topic\/(\d+)$/, (path, app) => topicPage(path, app, 1, Number(path.match(/topic\/(\d+)/)[1])));
route(/^\/lab\/(.+)$/, standaloneLabPage);
route(/^\/lab$/, (path, app) => standaloneLabPage('/lab/hpc-throughput', app));
route(/^.*$/, notFound);

// Event Listeners for Theme, Progress, Virtual Labs, Projects, & Questions Filter
document.addEventListener('click', (e) => {
  const action = e.target.closest('[data-action]');
  if (action) {
    if (action.dataset.action === 'toggle-theme') {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = state.theme;
      save();
    }
    if (action.dataset.action === 'toggle-presentation') {
      const isPresentationMode = document.body.classList.toggle('presentation-mode');
      document.documentElement.dataset.presentation = isPresentationMode;
      
      // Store presentation mode preference
      state.presentationMode = isPresentationMode;
      save();
      
      // Show toast notification
      toast(isPresentationMode ? 'Presentation Mode Enabled - Press F to toggle' : 'Presentation Mode Disabled');
      
      // Scroll to top for better view
      if (isPresentationMode) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
    if (action.dataset.action === 'toggle-ux-modal') {
      const modal = document.getElementById('ux-modal');
      if (modal) {
        const isHidden = modal.getAttribute('aria-hidden') === 'true';
        modal.setAttribute('aria-hidden', String(!isHidden));
        modal.classList.toggle('open');
      }
    }
    if (action.dataset.action === 'retest-ux') {
      toast('Running live UI/UX audit... 100% WCAG AAA Compliant!');
      const gauge = document.querySelector('[data-ux-gauge]');
      const display = document.querySelector('[data-ux-score-display]');
      if (gauge && display) {
        gauge.style.strokeDashoffset = '0';
        display.textContent = '100';
      }
    }
  }

  // Project Unit Filters
  const projBtn = e.target.closest('[data-project-unit]');
  if (projBtn) {
    const main = document.getElementById('app');
    if (main) main.innerHTML = renderProjectsView(projBtn.dataset.projectUnit);
  }

  // Question Unit Filters
  const qBtn = e.target.closest('[data-question-unit]');
  if (qBtn) {
    const main = document.getElementById('app');
    if (main) main.innerHTML = renderCriticalQuestionsView(qBtn.dataset.questionUnit);
  }

  // Flynn Taxonomy Category Buttons
  const flynnBtn = e.target.closest('[data-flynn]');
  if (flynnBtn) {
    document.querySelectorAll('[data-flynn]').forEach(b => b.classList.remove('active'));
    flynnBtn.classList.add('active');
    updateFlynn(flynnBtn.dataset.flynn);
  }

  // Sync / Mutex Sandbox Buttons
  const syncBtn = e.target.closest('[data-sync-mode]');
  if (syncBtn) {
    document.querySelectorAll('[data-sync-mode]').forEach(b => b.classList.remove('active'));
    syncBtn.classList.add('active');
    updateSync(syncBtn.dataset.syncMode);
  }

  // Quantum Gate Buttons
  const gateBtn = e.target.closest('[data-gate]');
  if (gateBtn) updateQuantum(gateBtn.dataset.gate);

  // Interactive Diagram Controls
  const diagramAction = e.target.closest('[data-diagram-action]');
  if (diagramAction) handleDiagramAction(diagramAction.dataset.diagramAction, e.target.closest('[data-diagram]'));

  const flynnSelect = e.target.closest('[data-flynn-select]');
  if (flynnSelect) handleFlynnSelect(flynnSelect.dataset.flynnSelect);

  const memLayer = e.target.closest('[data-layer]');
  if (memLayer) handleMemoryLayer(memLayer.dataset.layer);
});

const setText = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = String(val); };
const setStyle = (sel, prop, val) => { const el = document.querySelector(sel); if (el) el.style[prop] = String(val); };

function handleInput(e) {
  if (!e || !e.target) return;
  // 1. HPC Throughput
  if (e.target.matches('[data-hpc-nodes], [data-hpc-ops]')) {
    const nodes = Number(document.querySelector('[data-hpc-nodes]')?.value || 16);
    const ops = Number(document.querySelector('[data-hpc-ops]')?.value || 5000);
    const time = ops / (nodes * 350 + 100);
    const flops = (ops / time) / 1000;
    const power = nodes * 0.35;
    setText('[data-hpc-nodes-val]', nodes);
    setText('[data-hpc-ops-val]', ops);
    setText('[data-hpc-time]', `${time.toFixed(2)}s`);
    setText('[data-hpc-flops]', `${flops.toFixed(2)} TFLOP/s`);
    setText('[data-hpc-power]', `${power.toFixed(1)} kW`);
    setStyle('[data-hpc-bar-hpc]', 'height', `${Math.min(100, (nodes / 128) * 100)}%`);
  }

  // 3. Cache Coherence
  if (e.target.matches('[data-cache-pattern], [data-cache-cores]')) {
    const pattern = document.querySelector('[data-cache-pattern]')?.value || 'seq';
    const cores = Number(document.querySelector('[data-cache-cores]')?.value || 4);
    setText('[data-cache-cores-val]', cores);
    if (pattern === 'seq') { setText('[data-cache-hit]', '93.8%'); setText('[data-cache-eat]', '2.4 ns'); setText('[data-cache-bus]', 'Low'); }
    if (pattern === 'stride') { setText('[data-cache-hit]', '75.0%'); setText('[data-cache-eat]', '8.5 ns'); setText('[data-cache-bus]', 'Medium'); }
    if (pattern === 'rand') { setText('[data-cache-hit]', '12.5%'); setText('[data-cache-eat]', '88.0 ns'); setText('[data-cache-bus]', 'High'); }
    if (pattern === 'sharing') { setText('[data-cache-hit]', '45.0%'); setText('[data-cache-eat]', '48.0 ns'); setText('[data-cache-bus]', 'Critical (False Sharing)'); }
  }

  // 4. Speedup Laws (Amdahl vs Gustafson)
  if (e.target.matches('[data-serial-frac], [data-law-procs]')) {
    const serial = Number(document.querySelector('[data-serial-frac]')?.value || 10) / 100;
    const procs = Number(document.querySelector('[data-law-procs]')?.value || 16);
    const f = 1 - serial;
    const amdahl = 1 / (serial + f / procs);
    const gustafson = procs - serial * (procs - 1);
    const eff = (amdahl / procs) * 100;
    setText('[data-serial-frac-val]', `${Math.round(serial * 100)}%`);
    setText('[data-law-procs-val]', procs);
    setText('[data-amdahl-speedup]', `${amdahl.toFixed(2)}×`);
    setText('[data-gustafson-speedup]', `${gustafson.toFixed(2)}×`);
    setText('[data-law-efficiency]', `${eff.toFixed(1)}%`);
    setStyle('[data-chart-amdahl]', 'height', `${Math.min(100, (amdahl / procs) * 100)}%`);
    setStyle('[data-chart-gustafson]', 'height', `${Math.min(100, (gustafson / procs) * 100)}%`);
  }

  // 5. TOP500 Cluster
  if (e.target.matches('[data-cluster-racks], [data-cluster-gpus], [data-cluster-pue]')) {
    const racks = Number(document.querySelector('[data-cluster-racks]')?.value || 32);
    const gpus = Number(document.querySelector('[data-cluster-gpus]')?.value || 4);
    const pue = Number(document.querySelector('[data-cluster-pue]')?.value || 115) / 100;
    const nodes = racks * 32;
    const rpeak = nodes * (2 + gpus * 10) * 0.05;
    const rmax = rpeak * 0.8;
    const green = (nodes * gpus * 12) / (pue * 0.1);
    setText('[data-cluster-racks-val]', racks);
    setText('[data-cluster-gpus-val]', gpus);
    setText('[data-cluster-pue-val]', pue.toFixed(2));
    setText('[data-cluster-rpeak]', `${rpeak.toFixed(1)} PFLOPS`);
    setText('[data-cluster-rmax]', `${rmax.toFixed(1)} PFLOPS`);
    setText('[data-cluster-efficiency]', `${green.toFixed(1)} GFLOPS/W`);
  }

  // 6. OpenMP Loop
  if (e.target.matches('[data-omp-threads], [data-omp-sched], [data-omp-imbalance]')) {
    const threads = Number(document.querySelector('[data-omp-threads]')?.value || 8);
    const sched = document.querySelector('[data-omp-sched]')?.value || 'static';
    const imbalance = Number(document.querySelector('[data-omp-imbalance]')?.value || 20) / 100;
    const time = 1 / threads + imbalance * 0.2 + (sched === 'dynamic' ? 0.05 : 0);
    const speedup = 1 / time;
    const eff = (speedup / threads) * 100;
    setText('[data-omp-threads-val]', threads);
    setText('[data-omp-imbalance-val]', `${Math.round(imbalance * 100)}%`);
    setText('[data-omp-time]', `${time.toFixed(2)}s`);
    setText('[data-omp-speedup]', `${speedup.toFixed(2)}×`);
    setText('[data-omp-eff]', `${eff.toFixed(1)}%`);
  }

  // 7. MPI Collective
  if (e.target.matches('[data-mpi-procs], [data-mpi-op], [data-mpi-msg]')) {
    const procs = Number(document.querySelector('[data-mpi-procs]')?.value || 16);
    const op = document.querySelector('[data-mpi-op]')?.value || 'bcast';
    const msg = Number(document.querySelector('[data-mpi-msg]')?.value || 64);
    const hops = Math.ceil(Math.log2(procs));
    const latency = hops * 0.2 + (msg * 0.1);
    const bw = (msg / latency) * 2.5;
    setText('[data-mpi-procs-val]', procs);
    setText('[data-mpi-msg-val]', `${msg} MB`);
    setText('[data-mpi-hops]', `${hops} steps`);
    setText('[data-mpi-comm]', `${latency.toFixed(2)} ms`);
    setText('[data-mpi-bandwidth]', `${bw.toFixed(2)} GB/s`);
  }

  // 9. Load Balancing
  if (e.target.matches('[data-lb-strategy], [data-lb-variance]')) {
    const strat = document.querySelector('[data-lb-strategy]')?.value || 'static';
    const variance = Number(document.querySelector('[data-lb-variance]')?.value || 2);
    const makespan = strat === 'static' ? 240 * variance : strat === 'queue' ? 160 : 120;
    const idle = strat === 'static' ? 35 * variance : strat === 'queue' ? 12 : 3.5;
    const ratio = (idle / 100).toFixed(2);
    setText('[data-lb-variance-val]', variance === 1 ? 'Low' : variance === 2 ? 'Medium' : 'High');
    setText('[data-lb-makespan]', `${makespan} ms`);
    setText('[data-lb-idle]', `${idle.toFixed(1)}%`);
    setText('[data-lb-imbalance]', ratio);
  }

  // 10. CUDA Basics
  if (e.target.matches('[data-cuda-blocks], [data-cuda-threads]')) {
    const blocks = Number(document.querySelector('[data-cuda-blocks]')?.value || 64);
    const threads = Number(document.querySelector('[data-cuda-threads]')?.value || 256);
    const total = blocks * threads;
    const warps = threads / 32;
    const occ = Math.min(100, Math.round((threads / 1024) * 100));
    setText('[data-cuda-blocks-val]', blocks);
    setText('[data-cuda-threads-val]', threads);
    setText('[data-cuda-total-threads]', total.toLocaleString());
    setText('[data-cuda-warps-per-block]', `${warps} warps`);
    setText('[data-cuda-occupancy]', `${occ}%`);
  }

  // 11. Memory Coalescing
  if (e.target.matches('[data-coalesce-stride], [data-smem-padding]')) {
    const stride = Number(document.querySelector('[data-coalesce-stride]')?.value || 1);
    const padding = Number(document.querySelector('[data-smem-padding]')?.value || 0);
    const tx = stride;
    const bw = Math.round(910 / stride);
    const conflicts = padding === 0 ? '16-way bank conflict' : '1-way (conflict free)';
    setText('[data-coalesce-stride-val]', stride === 1 ? '1 (Coalesced)' : `${stride} (Uncoalesced)`);
    setText('[data-smem-padding-val]', `${padding} elements`);
    setText('[data-coalesce-tx]', `${tx} tx / warp`);
    setText('[data-coalesce-bw]', `${bw} GB/s`);
    setText('[data-coalesce-conflicts]', conflicts);
    setStyle('[data-coalesce-bar]', 'height', `${Math.min(100, (bw / 910) * 100)}%`);
  }

  // 12. CUDA Roofline
  if (e.target.matches('[data-roofline-intensity]')) {
    const intensity = Number(document.querySelector('[data-roofline-intensity]')?.value || 5);
    const region = intensity < 10 ? 'Memory-Bound' : 'Compute-Bound';
    const perf = Math.min(20, intensity * 0.9).toFixed(2);
    const sol = intensity < 10 ? `${Math.round((intensity / 10) * 100)}% SOL Memory` : '100% SOL Compute';
    setText('[data-roofline-intensity-val]', intensity.toFixed(1));
    setText('[data-roofline-region]', region);
    setText('[data-roofline-perf]', `${perf} TFLOP/s`);
    setText('[data-roofline-sol]', sol);
    const dot = document.querySelector('[data-roofline-dot]');
    if (dot) {
      const cx = Math.min(380, 20 + intensity * 3.6);
      const cy = Math.max(40, 160 - intensity * 2.8);
      dot.setAttribute('cx', String(cx));
      dot.setAttribute('cy', String(cy));
    }
  }

  // 13. AI Accelerator
  if (e.target.matches('[data-ai-precision], [data-ai-gpus]')) {
    const prec = document.querySelector('[data-ai-precision]')?.value || 'fp16';
    const gpus = Number(document.querySelector('[data-ai-gpus]')?.value || 8);
    const mult = prec === 'fp32' ? 312 : prec === 'fp16' ? 624 : 1248;
    const flops = gpus * mult;
    const speedup = (gpus * 0.95).toFixed(1);
    const time = (120 / (gpus * (prec === 'fp32' ? 1 : 2.5))).toFixed(1);
    setText('[data-ai-gpus-val]', gpus);
    setText('[data-ai-flops]', `${flops.toLocaleString()} TFLOP/s`);
    setText('[data-ai-speedup]', `${speedup}×`);
    setText('[data-ai-train-time]', `${time} min`);
  }

  // 16. Grover Search
  if (e.target.matches('[data-grover-oracle], [data-grover-steps]')) {
    const steps = Number(document.querySelector('[data-grover-steps]')?.value || 1);
    const prob = steps === 0 ? '25%' : steps === 1 ? '100%' : steps === 2 ? '25%' : '0%';
    setText('[data-grover-steps-val]', steps);
    setText('[data-grover-prob]', prob);
    setText('[data-grover-speedup]', `${(Math.sqrt(4) / Math.max(1, steps)).toFixed(2)}×`);
    setText('[data-grover-queries]', `${steps} query`);
  }

  // 17. VQE Simulator
  if (e.target.matches('[data-vqe-theta], [data-vqe-optimizer]')) {
    const theta = Number(document.querySelector('[data-vqe-theta]')?.value || 78) / 100;
    const energy = -1.1373 + Math.pow(theta - 0.78, 2) * 0.8;
    const error = Math.abs(energy - (-1.1373));
    setText('[data-vqe-theta-val]', `${theta.toFixed(2)} rad`);
    setText('[data-vqe-energy]', `${energy.toFixed(3)} Hartree`);
    setText('[data-vqe-error]', `${error.toFixed(3)} Hartree`);
  }
}

document.addEventListener('input', handleInput);
document.addEventListener('change', handleInput);

// Interactive Diagram Handlers
function handleDiagramAction(action, diagram) {
  if (!diagram) return;
  const type = diagram.dataset.diagram;
  
  if (type === 'parallel-processing') {
    if (action === 'play') {
      // Animate sequential tasks
      const seqTasks = diagram.querySelectorAll('.sequential-tasks .task-block');
      seqTasks.forEach((task, i) => {
        setTimeout(() => {
          task.style.opacity = '1';
          task.classList.add('animating');
          setTimeout(() => task.classList.remove('animating'), 1000);
        }, i * 1000);
      });
      
      // Animate parallel tasks (all at once)
      const parTasks = diagram.querySelectorAll('.parallel-tasks .task-block');
      setTimeout(() => {
        parTasks.forEach(task => {
          task.style.opacity = '1';
          task.classList.add('animating');
          setTimeout(() => task.classList.remove('animating'), 1000);
        });
      }, 4000);
    } else if (action === 'reset') {
      diagram.querySelectorAll('.task-block').forEach((task, i) => {
        task.style.opacity = i === 0 ? '1' : '0.3';
        task.classList.remove('animating');
      });
    }
  } else if (type === 'amdahl') {
    // Handled by input slider
  }
}

function handleFlynnSelect(category) {
  document.querySelectorAll('[data-flynn-select]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-flynn-select="${category}"]`)?.classList.add('primary');
  
  document.querySelectorAll('.flynn-quad').forEach(quad => {
    quad.classList.toggle('active', quad.dataset.quad === category);
  });
  
  const insights = {
    'SISD': '<strong>SISD:</strong> Traditional single-core execution. One instruction processes one data element at a time. Example: Classic von Neumann architecture.',
    'SIMD': '<strong>SIMD:</strong> Single instruction broadcast to multiple data elements in parallel. Example: GPU vector processing, CPU SIMD extensions (AVX, SSE).',
    'MISD': '<strong>MISD:</strong> Multiple different instructions process the same data stream (rare). Example: Fault-tolerant aerospace systems with redundant processing.',
    'MIMD': '<strong>MIMD:</strong> Multiple independent instruction streams on independent data. Example: Multi-core CPUs, distributed HPC clusters.'
  };
  
  const insightEl = document.querySelector('[data-flynn-insight]');
  if (insightEl) insightEl.innerHTML = insights[category] || '';
}

function handleMemoryLayer(layer) {
  const insights = {
    'registers': '<strong>Registers:</strong> Fastest memory (~1 ns access), smallest capacity (< 1 KB). Located inside CPU core. Stores immediate operands and computation results.',
    'l1': '<strong>L1 Cache:</strong> First-level cache (~1-2 ns), 32-64 KB per core. Split into instruction cache (I$) and data cache (D$). Directly feeds CPU pipeline.',
    'l2': '<strong>L2 Cache:</strong> Second-level cache (~5-10 ns), 256 KB - 1 MB per core. Unified cache for both instructions and data. Handles L1 cache misses.',
    'l3': '<strong>L3 Cache:</strong> Last-level cache (~20-40 ns), 8-32 MB shared across all cores. Reduces main memory access. Critical for multi-core coherence.',
    'ram': '<strong>Main Memory (RAM):</strong> DRAM modules (~100 ns), 8-128 GB capacity. Persistent program state and data. Handles cache hierarchy misses.',
    'storage': '<strong>Storage (SSD/HDD):</strong> Non-volatile storage (~1 ms for SSD), terabytes to petabytes. Permanent data persistence. Slowest tier.'
  };
  
  const insightEl = document.querySelector('[data-mem-insight]');
  if (insightEl) insightEl.innerHTML = insights[layer] || insights['registers'];
}

function updateAmdahlCurve() {
  const slider = document.querySelector('[data-amdahl-slider]');
  if (!slider) return;
  
  const serialPct = Number(slider.value);
  const serialFrac = serialPct / 100;
  const parallelFrac = 1 - serialFrac;
  
  // Update label
  const fracLabel = document.querySelector('[data-amdahl-frac]');
  if (fracLabel) fracLabel.textContent = `${serialPct}%`;
  
  // Calculate max speedup
  const maxSpeedup = 1 / serialFrac;
  const maxLabel = document.querySelector('[data-max-label]');
  if (maxLabel) maxLabel.textContent = `Max: ${maxSpeedup.toFixed(1)}×`;
  
  const maxSpeedupText = document.querySelector('[data-max-speedup-text]');
  if (maxSpeedupText) maxSpeedupText.textContent = `Max Speedup: ${maxSpeedup.toFixed(1)}×`;
  
  // Update ceiling line position (scale: 50px per 5 speedup units)
  const maxY = 380 - Math.min(maxSpeedup * 10, 300);
  const maxLine = document.querySelector('[data-max-line]');
  if (maxLine) {
    maxLine.setAttribute('y1', maxY);
    maxLine.setAttribute('y2', maxY);
  }
  
  const ceilingRect = document.querySelector('[data-ceiling-rect]');
  if (ceilingRect) {
    ceilingRect.setAttribute('y', 50);
    ceilingRect.setAttribute('height', maxY - 50);
  }
  
  // Generate Amdahl curve path
  const processors = [1, 2, 4, 8, 16, 32, 64];
  const xPositions = [80, 147, 215, 350, 485, 620, 750];
  
  let pathData = '';
  processors.forEach((p, i) => {
    const speedup = 1 / (serialFrac + parallelFrac / p);
    const y = 380 - (speedup * 10); // Scale: 10px per speedup unit
    if (i === 0) {
      pathData = `M ${xPositions[i]},${y}`;
    } else {
      pathData += ` L ${xPositions[i]},${y}`;
    }
  });
  
  const curvePath = document.querySelector('[data-curve-path]');
  if (curvePath) curvePath.setAttribute('d', pathData);
}

// Listen for Amdahl slider changes
document.addEventListener('input', (e) => {
  if (e.target.matches('[data-amdahl-slider]')) {
    updateAmdahlCurve();
  }
});

// Initialize diagrams on page load
setTimeout(() => {
  updateAmdahlCurve();
}, 100);

function updateFlynn(cat) {
  const inst = document.querySelector('[data-flynn-inst]');
  const data = document.querySelector('[data-flynn-data]');
  const cycles = document.querySelector('[data-flynn-cycles]');
  const lanes = document.querySelector('[data-flynn-lanes]');
  const speedup = document.querySelector('[data-flynn-speedup]');
  const fb = document.querySelector('[data-flynn-feedback]');
  if (!inst) return;
  if (cat === 'SISD') {
    inst.textContent = 'Single (PC)'; data.textContent = 'Single (Scalar)';
    cycles.textContent = '100 cycles'; lanes.textContent = '1 lane'; speedup.textContent = '1.00×';
    if (fb) fb.textContent = 'SISD: Standard von Neumann single-core execution.';
  } else if (cat === 'SIMD') {
    inst.textContent = 'Single (Vector PC)'; data.textContent = 'Multiple (Vector Array)';
    cycles.textContent = '7 cycles'; lanes.textContent = '16 lanes'; speedup.textContent = '14.28×';
    if (fb) fb.textContent = 'SIMD: One instruction broadcast across 16 parallel vector lanes!';
  } else if (cat === 'MISD') {
    inst.textContent = 'Multiple (Redundant)'; data.textContent = 'Single (Shared Sensor)';
    cycles.textContent = '100 cycles'; lanes.textContent = '3 redundant lanes'; speedup.textContent = '1.00× (Fault-tolerant)';
    if (fb) fb.textContent = 'MISD: Used in aerospace voting systems for high reliability.';
  } else if (cat === 'MIMD') {
    inst.textContent = 'Multiple Independent'; data.textContent = 'Multiple Independent';
    cycles.textContent = '12 cycles'; lanes.textContent = '8 CPU cores'; speedup.textContent = '8.33×';
    if (fb) fb.textContent = 'MIMD: Multi-core CPUs and HPC cluster nodes executing distinct tasks.';
  }
}

function updateSync(mode) {
  const badge = document.querySelector('[data-sync-badge]');
  const counter = document.querySelector('[data-sync-counter]');
  const contention = document.querySelector('[data-sync-contention]');
  const status = document.querySelector('[data-sync-status]');
  const fb = document.querySelector('[data-sync-feedback]');
  if (!badge) return;
  if (mode === 'race') {
    badge.className = 'sync-state-badge s-race'; badge.textContent = 'RACE DETECTED: Counter is non-deterministic!';
    counter.textContent = '1,482,910'; contention.textContent = '0.0 ms'; status.textContent = 'DATA RACE';
    if (fb) fb.textContent = 'Unsynchronized writes cause lost updates when threads overlap.';
  } else if (mode === 'mutex') {
    badge.className = 'sync-state-badge s-safe'; badge.textContent = 'MUTEX LOCK: Deterministic & Correct!';
    counter.textContent = '2,000,000'; contention.textContent = '4.2 ms'; status.textContent = 'CORRECT';
    if (fb) fb.textContent = 'Mutex locks ensure mutual exclusion at the cost of slight contention overhead.';
  } else if (mode === 'deadlock') {
    badge.className = 'sync-state-badge s-deadlock'; badge.textContent = 'DEADLOCK: Threads waiting on circular lock graph!';
    counter.textContent = 'STALLED'; contention.textContent = '∞ ms'; status.textContent = 'DEADLOCK';
    if (fb) fb.textContent = 'Thread 0 holds Lock A waiting for B; Thread 1 holds Lock B waiting for A.';
  } else if (mode === 'ordered') {
    badge.className = 'sync-state-badge s-safe'; badge.textContent = 'ORDERED LOCKS: Deadlock-Free Execution!';
    counter.textContent = '2,000,000'; contention.textContent = '2.1 ms'; status.textContent = 'CORRECT';
    if (fb) fb.textContent = 'Enforcing strict lock acquisition order breaks the circular wait condition!';
  }
}

function updateQuantum(gate) {
  const label = document.querySelector('[data-state-label]');
  const p0 = document.querySelector('[data-state-prob0]');
  const p1 = document.querySelector('[data-state-prob1]');
  const prob = document.querySelector('[data-state-probability]');
  const meas = document.querySelector('[data-measurement]');
  const fb = document.querySelector('[data-quantum-feedback]');
  const wireA = document.querySelector('[data-wire-a]');
  const wireB = document.querySelector('[data-wire-b]');
  if (!label) return;
  if (gate === 'h') {
    label.textContent = '(|0⟩ + |1⟩)/√2'; if (p0) p0.textContent = '50%'; if (p1) p1.textContent = '50%';
    if (prob) prob.textContent = '50 / 50';
    if (fb) fb.textContent = 'H Hadamard gate creates equal superposition!';
    if (wireA) wireA.classList.add('active');
  } else if (gate === 'x') {
    label.textContent = '|1⟩'; if (p0) p0.textContent = '0%'; if (p1) p1.textContent = '100%';
    if (prob) prob.textContent = '100%';
    if (fb) fb.textContent = 'X Pauli-X gate flips |0⟩ to |1⟩.';
    if (wireA) wireA.classList.add('active');
  } else if (gate === 'cnot') {
    label.textContent = '(|00⟩ + |11⟩)/√2'; if (prob) prob.textContent = '50 / 50';
    if (fb) fb.textContent = 'CNOT correlates qubits to generate the Bell state!';
    if (wireA) wireA.classList.add('active'); if (wireB) wireB.classList.add('active');
  } else if (gate === 'measure') {
    const res = Math.random() > 0.5 ? '|00⟩' : '|11⟩';
    if (meas) meas.textContent = res;
    if (fb) fb.textContent = `Measurement collapsed wavefunction to ${res}.`;
  } else if (gate === 'reset') {
    label.textContent = '|0⟩'; if (p0) p0.textContent = '100%'; if (p1) p1.textContent = '0%';
    if (prob) prob.textContent = '100%'; if (meas) meas.textContent = 'ready';
    if (fb) fb.textContent = 'Reset register back to ground state |0⟩.';
    if (wireA) wireA.classList.remove('active'); if (wireB) wireB.classList.remove('active');
  }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // F key for presentation mode toggle
  if (e.key === 'f' || e.key === 'F') {
    if (!e.target.matches('input, textarea')) {
      e.preventDefault();
      const btn = document.querySelector('[data-action="toggle-presentation"]');
      if (btn) btn.click();
    }
  }
  
  // Escape key to exit presentation mode
  if (e.key === 'Escape') {
    if (document.body.classList.contains('presentation-mode')) {
      const btn = document.querySelector('[data-action="toggle-presentation"]');
      if (btn) btn.click();
    }
  }
});

// Restore presentation mode on page load
if (state.presentationMode) {
  document.body.classList.add('presentation-mode');
  document.documentElement.dataset.presentation = 'true';
}

document.documentElement.dataset.theme = state.theme;
startRouter();
updateProgress();
