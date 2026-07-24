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
});

document.addEventListener('input', (e) => {
  // 1. HPC Throughput
  if (e.target.matches('[data-hpc-nodes], [data-hpc-ops]')) {
    const nodes = Number(document.querySelector('[data-hpc-nodes]').value);
    const ops = Number(document.querySelector('[data-hpc-ops]').value);
    const time = ops / (nodes * 350 + 100);
    const flops = (ops / time) / 1000;
    const power = nodes * 0.35;
    document.querySelector('[data-hpc-nodes-val]').textContent = nodes;
    document.querySelector('[data-hpc-ops-val]').textContent = ops;
    document.querySelector('[data-hpc-time]').textContent = `${time.toFixed(2)}s`;
    document.querySelector('[data-hpc-flops]').textContent = `${flops.toFixed(2)} TFLOP/s`;
    document.querySelector('[data-hpc-power]').textContent = `${power.toFixed(1)} kW`;
    if (document.querySelector('[data-hpc-bar-hpc]')) {
      document.querySelector('[data-hpc-bar-hpc]').style.height = `${Math.min(100, (nodes / 128) * 100)}%`;
    }
  }

  // 3. Cache Coherence
  if (e.target.matches('[data-cache-pattern], [data-cache-cores]')) {
    const pattern = document.querySelector('[data-cache-pattern]').value;
    const cores = Number(document.querySelector('[data-cache-cores]').value);
    document.querySelector('[data-cache-cores-val]').textContent = cores;
    const hitEl = document.querySelector('[data-cache-hit]');
    const eatEl = document.querySelector('[data-cache-eat]');
    const busEl = document.querySelector('[data-cache-bus]');
    if (pattern === 'seq') { hitEl.textContent = '93.8%'; eatEl.textContent = '2.4 ns'; busEl.textContent = 'Low'; }
    if (pattern === 'stride') { hitEl.textContent = '75.0%'; eatEl.textContent = '8.5 ns'; busEl.textContent = 'Medium'; }
    if (pattern === 'rand') { hitEl.textContent = '12.5%'; eatEl.textContent = '88.0 ns'; busEl.textContent = 'High'; }
    if (pattern === 'sharing') { hitEl.textContent = '45.0%'; eatEl.textContent = '48.0 ns'; busEl.textContent = 'Critical (False Sharing)'; }
  }

  // 4. Speedup Laws (Amdahl vs Gustafson)
  if (e.target.matches('[data-serial-frac], [data-law-procs]')) {
    const serial = Number(document.querySelector('[data-serial-frac]').value) / 100;
    const procs = Number(document.querySelector('[data-law-procs]').value);
    const f = 1 - serial;
    const amdahl = 1 / (serial + f / procs);
    const gustafson = procs - serial * (procs - 1);
    const eff = (amdahl / procs) * 100;
    document.querySelector('[data-serial-frac-val]').textContent = `${Math.round(serial * 100)}%`;
    document.querySelector('[data-law-procs-val]').textContent = procs;
    document.querySelector('[data-amdahl-speedup]').textContent = `${amdahl.toFixed(2)}×`;
    document.querySelector('[data-gustafson-speedup]').textContent = `${gustafson.toFixed(2)}×`;
    document.querySelector('[data-law-efficiency]').textContent = `${eff.toFixed(1)}%`;
    if (document.querySelector('[data-chart-amdahl]')) {
      document.querySelector('[data-chart-amdahl]').style.height = `${Math.min(100, (amdahl / procs) * 100)}%`;
      document.querySelector('[data-chart-gustafson]').style.height = `${Math.min(100, (gustafson / procs) * 100)}%`;
    }
  }

  // 5. TOP500 Cluster
  if (e.target.matches('[data-cluster-racks], [data-cluster-gpus], [data-cluster-pue]')) {
    const racks = Number(document.querySelector('[data-cluster-racks]').value);
    const gpus = Number(document.querySelector('[data-cluster-gpus]').value);
    const pue = Number(document.querySelector('[data-cluster-pue]').value) / 100;
    const nodes = racks * 32;
    const rpeak = nodes * (2 + gpus * 10) * 0.05;
    const rmax = rpeak * 0.8;
    const green = (nodes * gpus * 12) / (pue * 0.1);
    document.querySelector('[data-cluster-racks-val]').textContent = racks;
    document.querySelector('[data-cluster-gpus-val]').textContent = gpus;
    document.querySelector('[data-cluster-pue-val]').textContent = pue.toFixed(2);
    document.querySelector('[data-cluster-rpeak]').textContent = `${rpeak.toFixed(1)} PFLOPS`;
    document.querySelector('[data-cluster-rmax]').textContent = `${rmax.toFixed(1)} PFLOPS`;
    document.querySelector('[data-cluster-efficiency]').textContent = `${green.toFixed(1)} GFLOPS/W`;
  }

  // 6. OpenMP Loop
  if (e.target.matches('[data-omp-threads], [data-omp-sched], [data-omp-imbalance]')) {
    const threads = Number(document.querySelector('[data-omp-threads]').value);
    const sched = document.querySelector('[data-omp-sched]').value;
    const imbalance = Number(document.querySelector('[data-omp-imbalance]').value) / 100;
    const time = 1 / threads + imbalance * 0.2 + (sched === 'dynamic' ? 0.05 : 0);
    const speedup = 1 / time;
    const eff = (speedup / threads) * 100;
    document.querySelector('[data-omp-threads-val]').textContent = threads;
    document.querySelector('[data-omp-imbalance-val]').textContent = `${Math.round(imbalance * 100)}%`;
    document.querySelector('[data-omp-time]').textContent = `${time.toFixed(2)}s`;
    document.querySelector('[data-omp-speedup]').textContent = `${speedup.toFixed(2)}×`;
    document.querySelector('[data-omp-eff]').textContent = `${eff.toFixed(1)}%`;
  }

  // 7. MPI Collective
  if (e.target.matches('[data-mpi-procs], [data-mpi-op], [data-mpi-msg]')) {
    const procs = Number(document.querySelector('[data-mpi-procs]').value);
    const op = document.querySelector('[data-mpi-op]').value;
    const msg = Number(document.querySelector('[data-mpi-msg]').value);
    const hops = Math.ceil(Math.log2(procs));
    const latency = hops * 0.2 + (msg * 0.1);
    const bw = (msg / latency) * 2.5;
    document.querySelector('[data-mpi-procs-val]').textContent = procs;
    document.querySelector('[data-mpi-msg-val]').textContent = `${msg} MB`;
    document.querySelector('[data-mpi-hops]').textContent = `${hops} steps`;
    document.querySelector('[data-mpi-comm]').textContent = `${latency.toFixed(2)} ms`;
    document.querySelector('[data-mpi-bandwidth]').textContent = `${bw.toFixed(2)} GB/s`;
  }

  // 9. Load Balancing
  if (e.target.matches('[data-lb-strategy], [data-lb-variance]')) {
    const strat = document.querySelector('[data-lb-strategy]').value;
    const variance = Number(document.querySelector('[data-lb-variance]').value);
    const makespan = strat === 'static' ? 240 * variance : strat === 'queue' ? 160 : 120;
    const idle = strat === 'static' ? 35 * variance : strat === 'queue' ? 12 : 3.5;
    const ratio = (idle / 100).toFixed(2);
    document.querySelector('[data-lb-variance-val]').textContent = variance === 1 ? 'Low' : variance === 2 ? 'Medium' : 'High';
    document.querySelector('[data-lb-makespan]').textContent = `${makespan} ms`;
    document.querySelector('[data-lb-idle]').textContent = `${idle.toFixed(1)}%`;
    document.querySelector('[data-lb-imbalance]').textContent = ratio;
  }

  // 10. CUDA Basics
  if (e.target.matches('[data-cuda-blocks], [data-cuda-threads]')) {
    const blocks = Number(document.querySelector('[data-cuda-blocks]').value);
    const threads = Number(document.querySelector('[data-cuda-threads]').value);
    const total = blocks * threads;
    const warps = threads / 32;
    const occ = Math.min(100, Math.round((threads / 1024) * 100));
    document.querySelector('[data-cuda-blocks-val]').textContent = blocks;
    document.querySelector('[data-cuda-threads-val]').textContent = threads;
    document.querySelector('[data-cuda-total-threads]').textContent = total.toLocaleString();
    document.querySelector('[data-cuda-warps-per-block]').textContent = `${warps} warps`;
    document.querySelector('[data-cuda-occupancy]').textContent = `${occ}%`;
  }

  // 11. Memory Coalescing
  if (e.target.matches('[data-coalesce-stride], [data-smem-padding]')) {
    const stride = Number(document.querySelector('[data-coalesce-stride]').value);
    const padding = Number(document.querySelector('[data-smem-padding]').value);
    const tx = stride;
    const bw = Math.round(910 / stride);
    const conflicts = padding === 0 ? '16-way bank conflict' : '1-way (conflict free)';
    document.querySelector('[data-coalesce-stride-val]').textContent = stride === 1 ? '1 (Coalesced)' : `${stride} (Uncoalesced)`;
    document.querySelector('[data-smem-padding-val]').textContent = `${padding} elements`;
    document.querySelector('[data-coalesce-tx]').textContent = `${tx} tx / warp`;
    document.querySelector('[data-coalesce-bw]').textContent = `${bw} GB/s`;
    document.querySelector('[data-coalesce-conflicts]').textContent = conflicts;
    if (document.querySelector('[data-coalesce-bar]')) {
      document.querySelector('[data-coalesce-bar]').style.height = `${Math.min(100, (bw / 910) * 100)}%`;
    }
  }

  // 12. CUDA Roofline
  if (e.target.matches('[data-roofline-intensity]')) {
    const intensity = Number(document.querySelector('[data-roofline-intensity]').value);
    const region = intensity < 10 ? 'Memory-Bound' : 'Compute-Bound';
    const perf = Math.min(20, intensity * 0.9).toFixed(2);
    const sol = intensity < 10 ? `${Math.round((intensity / 10) * 100)}% SOL Memory` : '100% SOL Compute';
    document.querySelector('[data-roofline-intensity-val]').textContent = intensity.toFixed(1);
    document.querySelector('[data-roofline-region]').textContent = region;
    document.querySelector('[data-roofline-perf]').textContent = `${perf} TFLOP/s`;
    document.querySelector('[data-roofline-sol]').textContent = sol;
    const dot = document.querySelector('[data-roofline-dot]');
    if (dot) {
      const cx = Math.min(380, 20 + intensity * 3.6);
      const cy = Math.max(40, 160 - intensity * 2.8);
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', cy);
    }
  }

  // 13. AI Accelerator
  if (e.target.matches('[data-ai-precision], [data-ai-gpus]')) {
    const prec = document.querySelector('[data-ai-precision]').value;
    const gpus = Number(document.querySelector('[data-ai-gpus]').value);
    const mult = prec === 'fp32' ? 312 : prec === 'fp16' ? 624 : 1248;
    const flops = gpus * mult;
    const speedup = (gpus * 0.95).toFixed(1);
    const time = (120 / (gpus * (prec === 'fp32' ? 1 : 2.5))).toFixed(1);
    document.querySelector('[data-ai-gpus-val]').textContent = gpus;
    document.querySelector('[data-ai-flops]').textContent = `${flops.toLocaleString()} TFLOP/s`;
    document.querySelector('[data-ai-speedup]').textContent = `${speedup}×`;
    document.querySelector('[data-ai-train-time]').textContent = `${time} min`;
  }

  // 16. Grover Search
  if (e.target.matches('[data-grover-oracle], [data-grover-steps]')) {
    const oracle = document.querySelector('[data-grover-oracle]').value;
    const steps = Number(document.querySelector('[data-grover-steps]').value);
    const prob = steps === 0 ? '25%' : steps === 1 ? '100%' : steps === 2 ? '25%' : '0%';
    document.querySelector('[data-grover-steps-val]').textContent = steps;
    document.querySelector('[data-grover-prob]').textContent = prob;
    document.querySelector('[data-grover-speedup]').textContent = `${(Math.sqrt(4) / Math.max(1, steps)).toFixed(2)}×`;
    document.querySelector('[data-grover-queries]').textContent = `${steps} query`;
  }

  // 17. VQE Simulator
  if (e.target.matches('[data-vqe-theta], [data-vqe-optimizer]')) {
    const theta = Number(document.querySelector('[data-vqe-theta]').value) / 100;
    const energy = -1.1373 + Math.pow(theta - 0.78, 2) * 0.8;
    const error = Math.abs(energy - (-1.1373));
    document.querySelector('[data-vqe-theta-val]').textContent = `${theta.toFixed(2)} rad`;
    document.querySelector('[data-vqe-energy]').textContent = `${energy.toFixed(3)} Hartree`;
    document.querySelector('[data-vqe-error]').textContent = `${error.toFixed(3)} Hartree`;
  }
});

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

document.documentElement.dataset.theme = state.theme;
startRouter();
updateProgress();
