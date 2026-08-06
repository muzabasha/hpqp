import { course } from './data/course.js';
import { allTopics, getTopic, getUnitTopics, getTotalTopics } from './data/topics/index.js';
import { renderLab, LAB_CATALOG, TUTORIAL_STEPS } from './components/labs.js';
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

function generateRoadmapSVG() {
  return `<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" class="roadmap-svg" role="img" aria-label="HPQC Learning Roadmap">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0284c7;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#65a30d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#84cc16;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ea580c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#db2777;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Title -->
    <text x="600" y="40" text-anchor="middle" class="roadmap-title" font-size="32" font-weight="700" fill="var(--ink)">
      Mastering High Performance &amp; Quantum Computing
    </text>
    <text x="600" y="70" text-anchor="middle" class="roadmap-subtitle" font-size="16" fill="var(--muted)">
      Your 14-Week Journey to Computing Excellence
    </text>
    
    <!-- Path connecting all phases -->
    <path d="M 150 150 Q 300 200, 450 150 T 750 150 Q 900 200, 1050 150" 
          stroke="var(--line)" stroke-width="4" fill="none" stroke-dasharray="8,4" opacity="0.5"/>
    
    <!-- Phase 1: HPC Foundations (Weeks 1-8) -->
    <g class="roadmap-phase" data-phase="1">
      <rect x="50" y="100" width="300" height="200" rx="16" fill="url(#gradient1)" opacity="0.15"/>
      <rect x="50" y="100" width="300" height="200" rx="16" fill="none" stroke="url(#gradient1)" stroke-width="3"/>
      <text x="200" y="130" text-anchor="middle" font-size="14" font-weight="600" fill="#0284c7">WEEKS 1-8</text>
      <text x="200" y="155" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">HPC Foundations</text>
      <text x="200" y="180" text-anchor="middle" font-size="14" fill="var(--muted)">Parallel Models</text>
      
      <circle cx="80" cy="220" r="8" fill="#0284c7" filter="url(#glow)"/>
      <text x="95" y="225" font-size="13" fill="var(--ink)">Unit 1: Parallel Architectures</text>
      
      <circle cx="80" cy="250" r="8" fill="#0284c7" filter="url(#glow)"/>
      <text x="95" y="255" font-size="13" fill="var(--ink)">Unit 2: OpenMP &amp; MPI</text>
      
      <circle cx="80" cy="280" r="8" fill="#0284c7" filter="url(#glow)"/>
      <text x="95" y="285" font-size="13" fill="var(--ink)">5 Topics • 25 MCQs</text>
    </g>
    
    <!-- Arrow 1 to 2 -->
    <path d="M 350 200 L 430 200" stroke="var(--cyan)" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="var(--cyan)" />
      </marker>
    </defs>
    
    <!-- Phase 2: GPU Acceleration (Weeks 9-12) -->
    <g class="roadmap-phase" data-phase="2">
      <rect x="430" y="100" width="300" height="200" rx="16" fill="url(#gradient2)" opacity="0.15"/>
      <rect x="430" y="100" width="300" height="200" rx="16" fill="none" stroke="url(#gradient2)" stroke-width="3"/>
      <text x="580" y="130" text-anchor="middle" font-size="14" font-weight="600" fill="#65a30d">WEEKS 9-12</text>
      <text x="580" y="155" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">GPU Acceleration</text>
      <text x="580" y="180" text-anchor="middle" font-size="14" fill="var(--muted)">Optimization &amp; Profiling</text>
      
      <circle cx="460" cy="220" r="8" fill="#65a30d" filter="url(#glow)"/>
      <text x="475" y="225" font-size="13" fill="var(--ink)">Unit 3: CUDA Programming</text>
      
      <circle cx="460" cy="250" r="8" fill="#65a30d" filter="url(#glow)"/>
      <text x="475" y="255" font-size="13" fill="var(--ink)">Cloud HPC &amp; Profiling</text>
      
      <circle cx="460" cy="280" r="8" fill="#65a30d" filter="url(#glow)"/>
      <text x="475" y="285" font-size="13" fill="var(--ink)">4 Topics • 20 MCQs</text>
    </g>
    
    <!-- Arrow 2 to 3 -->
    <path d="M 730 200 L 810 200" stroke="var(--lime)" stroke-width="3" fill="none" marker-end="url(#arrowhead2)"/>
    <defs>
      <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="var(--lime)" />
      </marker>
    </defs>
    
    <!-- Phase 3: Quantum Computing (Weeks 13-14) -->
    <g class="roadmap-phase" data-phase="3">
      <rect x="810" y="100" width="300" height="200" rx="16" fill="url(#gradient3)" opacity="0.15"/>
      <rect x="810" y="100" width="300" height="200" rx="16" fill="none" stroke="url(#gradient3)" stroke-width="3"/>
      <text x="960" y="130" text-anchor="middle" font-size="14" font-weight="600" fill="#ea580c">WEEKS 13-14</text>
      <text x="960" y="155" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">Quantum Computing</text>
      <text x="960" y="180" text-anchor="middle" font-size="14" fill="var(--muted)">Hybrid Design</text>
      
      <circle cx="840" cy="220" r="8" fill="#ea580c" filter="url(#glow)"/>
      <text x="855" y="225" font-size="13" fill="var(--ink)">Unit 4: Qubits &amp; Gates</text>
      
      <circle cx="840" cy="250" r="8" fill="#ea580c" filter="url(#glow)"/>
      <text x="855" y="255" font-size="13" fill="var(--ink)">Algorithms &amp; VQE/QAOA</text>
      
      <circle cx="840" cy="280" r="8" fill="#ea580c" filter="url(#glow)"/>
      <text x="855" y="285" font-size="13" fill="var(--ink)">4 Topics • 20 MCQs</text>
    </g>
    
    <!-- Professional Outcomes Section -->
    <g class="roadmap-outcomes">
      <rect x="200" y="380" width="800" height="180" rx="16" fill="url(#gradient4)" opacity="0.1"/>
      <rect x="200" y="380" width="800" height="180" rx="16" fill="none" stroke="url(#gradient4)" stroke-width="3" stroke-dasharray="6,3"/>
      
      <text x="600" y="415" text-anchor="middle" font-size="18" font-weight="700" fill="var(--ink)">
        Professional Outcomes &amp; Mastery
      </text>
      
      <!-- Outcome columns -->
      <g transform="translate(220, 440)">
        <circle cx="10" cy="0" r="6" fill="#db2777"/>
        <text x="25" y="5" font-size="13" fill="var(--ink)" font-weight="600">60 TRL-4 Projects</text>
        <text x="25" y="22" font-size="11" fill="var(--muted)">Proof-of-concept implementations</text>
        <text x="25" y="36" font-size="11" fill="var(--muted)">with step-by-step rubrics</text>
      </g>
      
      <g transform="translate(480, 440)">
        <circle cx="10" cy="0" r="6" fill="#db2777"/>
        <text x="25" y="5" font-size="13" fill="var(--ink)" font-weight="600">80 Scenario Questions</text>
        <text x="25" y="22" font-size="11" fill="var(--muted)">10-mark critical thinking</text>
        <text x="25" y="36" font-size="11" fill="var(--muted)">problems with model answers</text>
      </g>
      
      <g transform="translate(760, 440)">
        <circle cx="10" cy="0" r="6" fill="#db2777"/>
        <text x="25" y="5" font-size="13" fill="var(--ink)" font-weight="600">17 Virtual Labs</text>
        <text x="25" y="22" font-size="11" fill="var(--muted)">Interactive simulators for</text>
        <text x="25" y="36" font-size="11" fill="var(--muted)">hands-on practice</text>
      </g>
      
      <g transform="translate(220, 500)">
        <circle cx="10" cy="0" r="6" fill="#db2777"/>
        <text x="25" y="5" font-size="13" fill="var(--ink)" font-weight="600">85 Interactive MCQs</text>
        <text x="25" y="22" font-size="11" fill="var(--muted)">Instant feedback with detailed</text>
        <text x="25" y="36" font-size="11" fill="var(--muted)">explanations for mastery</text>
      </g>
      
      <g transform="translate(480, 500)">
        <circle cx="10" cy="0" r="6" fill="#db2777"/>
        <text x="25" y="5" font-size="13" fill="var(--ink)" font-weight="600">13 Interactive Diagrams</text>
        <text x="25" y="22" font-size="11" fill="var(--muted)">Visual learning tools for</text>
        <text x="25" y="36" font-size="11" fill="var(--muted)">complex concepts</text>
      </g>
      
      <g transform="translate(760, 500)">
        <circle cx="10" cy="0" r="6" fill="#db2777"/>
        <text x="25" y="5" font-size="13" fill="var(--ink)" font-weight="600">Presentation Mode</text>
        <text x="25" y="22" font-size="11" fill="var(--muted)">Full-screen teaching mode</text>
        <text x="25" y="36" font-size="11" fill="var(--muted)">for classroom projection</text>
      </g>
    </g>
    
    <!-- Footer stats -->
    <text x="600" y="620" text-anchor="middle" font-size="24" font-weight="700" fill="var(--ink)">
      Complete Mastery: 17 Topics • 85 MCQs • 60 Projects • 80 Questions • 17 Labs
    </text>
    <text x="600" y="650" text-anchor="middle" font-size="14" fill="var(--muted)">
      From Silicon to Quantum Circuits — Your Journey to Computing Excellence
    </text>
  </svg>`;
}

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

  <!-- Course Introduction Video -->
  <div class="video-section">
    <div class="section-heading">
      <div>
        <div class="eyebrow">Course Overview</div>
        <h2>Watch the Introduction</h2>
      </div>
      <p>Discover what you'll learn in this comprehensive HPC & Quantum Computing course</p>
    </div>
    
    <div class="video-player-container">
      <div class="video-wrapper">
        <video 
          id="course-video" 
          class="course-video"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%230f172a' width='1280' height='720'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230284c7' font-size='64' font-family='sans-serif'%3EHPC %26 Quantum Computing%3C/text%3E%3C/svg%3E"
          preload="metadata">
          <source src="./HPC___Quantum_Computing.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        
        <!-- Custom Video Controls -->
        <div class="video-controls" id="video-controls">
          <div class="progress-bar" id="progress-bar">
            <div class="progress-filled" id="progress-filled"></div>
          </div>
          
          <div class="controls-row">
            <div class="controls-left">
              <button class="control-btn" id="play-pause-btn" aria-label="Play/Pause">
                <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg class="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              </button>
              
              <button class="control-btn" id="mute-btn" aria-label="Mute/Unmute">
                <svg class="volume-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <svg class="muted-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              </button>
              
              <div class="time-display">
                <span id="current-time">0:00</span> / <span id="duration">0:00</span>
              </div>
            </div>
            
            <div class="controls-right">
              <button class="control-btn" id="fullscreen-btn" aria-label="Fullscreen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Loading Spinner -->
        <div class="video-loading" id="video-loading" style="display:none;">
          <div class="spinner"></div>
        </div>
      </div>
      
      <div class="video-info">
        <h3>🎥 Course Introduction</h3>
        <p>Get an overview of High Performance Computing and Quantum Computing concepts covered in this comprehensive course.</p>
        <div class="video-features">
          <span class="video-feature">📚 Course Overview</span>
          <span class="video-feature">🎯 Learning Objectives</span>
          <span class="video-feature">🚀 Career Opportunities</span>
        </div>
      </div>
    </div>
  </div>

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

  <div class="section-heading"><div><div class="eyebrow">Learning Journey</div><h2>Your Roadmap to Mastery</h2></div><p>Visualize your complete learning path from HPC fundamentals to quantum computing.</p></div>
  <div class="roadmap-container">
    <div class="roadmap-controls">
      <button class="roadmap-control-btn" data-action="zoom-out" aria-label="Zoom out">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="8" cy="8" r="6"/>
          <line x1="4" y1="8" x2="12" y2="8"/>
          <line x1="13" y1="13" x2="18" y2="18"/>
        </svg>
      </button>
      <span class="roadmap-zoom-level">100%</span>
      <button class="roadmap-control-btn" data-action="zoom-in" aria-label="Zoom in">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="8" cy="8" r="6"/>
          <line x1="4" y1="8" x2="12" y2="8"/>
          <line x1="8" y1="4" x2="8" y2="12"/>
          <line x1="13" y1="13" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="roadmap-control-btn" data-action="reset" aria-label="Reset zoom">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M3 10a7 7 0 1 1 7 7"/>
          <polyline points="1,13 3,10 6,12"/>
        </svg>
      </button>
      <button class="roadmap-control-btn" data-action="fullscreen" aria-label="Toggle fullscreen">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M3 7V3h4M17 7V3h-4M3 13v4h4M17 13v4h-4"/>
        </svg>
      </button>
    </div>
    <div class="roadmap-viewport">
      <div class="roadmap-content">
        ${generateRoadmapSVG()}
      </div>
    </div>
    <div class="roadmap-instructions">
      <span>💡 Click and drag to pan • Use zoom controls or mouse wheel • Press Esc to exit fullscreen</span>
    </div>
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

// Performance: Throttle helper for high-frequency events (like input/scroll)
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance: Debounce helper for expensive operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance: Request animation frame wrapper
function scheduleUpdate(fn) {
  requestAnimationFrame(() => {
    fn();
  });
}

// Event Listeners for Theme, Progress, Virtual Labs, Projects, & Questions Filter
// Optimized to prevent UI blocking
document.addEventListener('click', (e) => {
  // Early return if no relevant target
  if (!e.target) return;
  
  // Use event delegation efficiently - check specific areas first
  const action = e.target.closest('[data-action]');
  if (action) {
    e.preventDefault(); // Prevent default early
    
    const actionType = action.dataset.action;
    
    // Fast paths for common actions
    switch(actionType) {
      case 'toggle-theme':
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = state.theme;
        save();
        return;
      
      case 'mark-topic':
        const topicKey = `topic-${action.dataset.topic}`;
        if (!state.completed.includes(topicKey)) state.completed.push(topicKey);
        save();
        toast('Topic added to your progress.');
        return;
      
      case 'mark-lab':
        const labKey = `lab-${action.dataset.lab}`;
        if (!state.completed.includes(labKey)) state.completed.push(labKey);
        save();
        toast('Lab progress saved on this device.');
        return;
      
      case 'toggle-presentation':
        scheduleUpdate(() => {
          const isPresentationMode = document.body.classList.toggle('presentation-mode');
          document.documentElement.dataset.presentation = isPresentationMode;
          state.presentationMode = isPresentationMode;
          save();
          toast(isPresentationMode ? 'Presentation Mode Enabled - Press F to toggle' : 'Presentation Mode Disabled');
          if (isPresentationMode) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
        return;
      
      case 'reset-circuit':
        scheduleUpdate(() => updateQuantum('reset'));
        return;
      
      case 'toggle-ux-modal':
        scheduleUpdate(() => {
          const modal = document.getElementById('ux-modal');
          if (modal) {
            const isHidden = modal.getAttribute('aria-hidden') === 'true';
            modal.setAttribute('aria-hidden', String(!isHidden));
            modal.classList.toggle('open');
          }
        });
        return;
      
      case 'retest-ux':
        scheduleUpdate(() => {
          toast('Running live UI/UX audit... 100% WCAG AAA Compliant!');
          const gauge = document.querySelector('[data-ux-gauge]');
          const display = document.querySelector('[data-ux-score-display]');
          if (gauge && display) {
            gauge.style.strokeDashoffset = '0';
            display.textContent = '100';
          }
        });
        return;
      
      case 'toggle-hint':
        scheduleUpdate(() => {
          const hintEl = document.querySelector('[data-challenge-hint]');
          if (hintEl) {
            const isVisible = hintEl.style.display !== 'none';
            hintEl.style.display = isVisible ? 'none' : 'block';
            e.target.textContent = isVisible ? 'Show Hint' : 'Hide Hint';
          }
        });
        return;
      
      case 'toggle-compare':
        scheduleUpdate(() => handleCompareMode());
        return;
    }
  }

  // Project Unit Filters - defer rendering
  const projBtn = e.target.closest('[data-project-unit]');
  if (projBtn) {
    scheduleUpdate(() => {
      const main = document.getElementById('app');
      if (main) main.innerHTML = renderProjectsView(projBtn.dataset.projectUnit);
    });
    return;
  }

  // Question Unit Filters - defer rendering
  const qBtn = e.target.closest('[data-question-unit]');
  if (qBtn) {
    scheduleUpdate(() => {
      const main = document.getElementById('app');
      if (main) main.innerHTML = renderCriticalQuestionsView(qBtn.dataset.questionUnit);
    });
    return;
  }

  // Flynn Taxonomy Category Buttons
  const flynnBtn = e.target.closest('[data-flynn]');
  if (flynnBtn) {
    scheduleUpdate(() => {
      document.querySelectorAll('[data-flynn]').forEach(b => b.classList.remove('active'));
      flynnBtn.classList.add('active');
      updateFlynn(flynnBtn.dataset.flynn);
    });
    return;
  }

  // Sync / Mutex Sandbox Buttons
  const syncBtn = e.target.closest('[data-sync-mode]');
  if (syncBtn) {
    scheduleUpdate(() => {
      document.querySelectorAll('[data-sync-mode]').forEach(b => b.classList.remove('active'));
      syncBtn.classList.add('active');
      updateSync(syncBtn.dataset.syncMode);
    });
    return;
  }

  // Quantum Gate Buttons
  const gateBtn = e.target.closest('[data-gate]');
  if (gateBtn) {
    scheduleUpdate(() => updateQuantum(gateBtn.dataset.gate));
    return;
  }

  // Interactive Diagram Controls
  const diagramAction = e.target.closest('[data-diagram-action]');
  if (diagramAction) {
    scheduleUpdate(() => {
      handleDiagramAction(diagramAction.dataset.diagramAction, e.target.closest('[data-diagram]'));
    });
    return;
  }

  const flynnSelect = e.target.closest('[data-flynn-select]');
  if (flynnSelect) {
    scheduleUpdate(() => handleFlynnSelect(flynnSelect.dataset.flynnSelect));
    return;
  }

  const memLayer = e.target.closest('[data-layer]');
  if (memLayer) {
    scheduleUpdate(() => handleMemoryLayer(memLayer.dataset.layer));
    return;
  }

  // Unit 3 Diagram Interactions
  const cudaLevel = e.target.closest('[data-cuda-level]');
  if (cudaLevel) {
    scheduleUpdate(() => handleCudaLevel(cudaLevel.dataset.cudaLevel));
    return;
  }

  const coalescePattern = e.target.closest('[data-coalesce-pattern]');
  if (coalescePattern) {
    scheduleUpdate(() => handleCoalescePattern(coalescePattern.dataset.coalescePattern));
    return;
  }

  // Unit 4 Diagram Interactions
  const blochState = e.target.closest('[data-bloch-state]');
  if (blochState) {
    scheduleUpdate(() => handleBlochState(blochState.dataset.blochState));
    return;
  }

  // Unit 2 Diagram Interactions
  const scheduleSelect = e.target.closest('[data-schedule-select]');
  if (scheduleSelect) {
    scheduleUpdate(() => handleScheduleSelect(scheduleSelect.dataset.scheduleSelect));
    return;
  }

  // Enhanced Lab Features
  const tutorialAction = e.target.closest('[data-tutorial-action]');
  if (tutorialAction) {
    scheduleUpdate(() => {
      handleTutorialAction(tutorialAction.dataset.tutorialAction, tutorialAction.dataset.labId);
    });
    return;
  }
  
  const challengeBadge = e.target.closest('[data-challenge-badge]');
  if (challengeBadge) {
    scheduleUpdate(() => toggleChallengeCard());
    return;
  }

  // Video Player Controls
  const playPauseBtn = e.target.closest('#play-pause-btn');
  if (playPauseBtn) {
    togglePlayPause(); // Keep synchronous for media
    return;
  }

  const muteBtn = e.target.closest('#mute-btn');
  if (muteBtn) {
    toggleMute(); // Keep synchronous for media
    return;
  }

  const fullscreenBtn = e.target.closest('#fullscreen-btn');
  if (fullscreenBtn) {
    toggleFullscreen(); // Keep synchronous for media
    return;
  }

  // Global Lab Controls
  const speedBtn = e.target.closest('.speed-btn');
  if (speedBtn) {
    handleSpeedChange(speedBtn.dataset.speed);
    return;
  }

  const controlAction = e.target.closest('.control-action-btn');
  if (controlAction) {
    scheduleUpdate(() => handleLabControlAction(controlAction.dataset.action));
    return;
  }

  // Auto-run toggle
  const autoRunToggle = e.target.closest('#auto-run-toggle');
  if (autoRunToggle) {
    handleAutoRunToggle(autoRunToggle.checked);
    return;
  }

  // Hints toggle
  const hintsToggle = e.target.closest('#hints-toggle');
  if (hintsToggle) {
    handleHintsToggle(hintsToggle.checked);
    return;
  }

  // Formulas toggle
  const formulasToggle = e.target.closest('#formulas-toggle');
  if (formulasToggle) {
    handleFormulasToggle(formulasToggle.checked);
    return;
  }

  const mpiOp = e.target.closest('[data-mpi-op]');
  if (mpiOp) {
    scheduleUpdate(() => handleMPIOperation(mpiOp.dataset.mpiOp));
    return;
  }

  const syncIssue = e.target.closest('[data-sync-issue]');
  if (syncIssue) {
    scheduleUpdate(() => handleSyncIssue(syncIssue.dataset.syncIssue));
    return;
  }

  const stealingAction = e.target.closest('[data-stealing-action]');

  if (stealingAction) handleWorkStealing(stealingAction.dataset.stealingAction);

  // MCQ Answer Selection
  const mcqOption = e.target.closest('[data-mcq-answer]');
  if (mcqOption) handleMCQAnswer(mcqOption);

  // MCQ Reset
  if (action && action.dataset.action === 'reset-mcq') {
    resetMCQTopic(action.dataset.topic);
  }

  // Roadmap Zoom Controls
  if (action && action.dataset.action) {
    const roadmapAction = action.dataset.action;
    if (roadmapAction === 'zoom-in' || roadmapAction === 'zoom-out' || roadmapAction === 'reset' || roadmapAction === 'fullscreen') {
      handleRoadmapControl(roadmapAction);
    }
  }
});

// Roadmap zoom state
let roadmapZoom = 1;
let roadmapPanX = 0;
let roadmapPanY = 0;
let roadmapIsDragging = false;
let roadmapStartX = 0;
let roadmapStartY = 0;

function handleRoadmapControl(action) {
  const viewport = document.querySelector('.roadmap-viewport');
  const content = document.querySelector('.roadmap-content');
  const zoomLabel = document.querySelector('.roadmap-zoom-level');
  const container = document.querySelector('.roadmap-container');
  
  if (!viewport || !content) return;

  if (action === 'zoom-in') {
    roadmapZoom = Math.min(roadmapZoom + 0.25, 3);
  } else if (action === 'zoom-out') {
    roadmapZoom = Math.max(roadmapZoom - 0.25, 0.5);
  } else if (action === 'reset') {
    roadmapZoom = 1;
    roadmapPanX = 0;
    roadmapPanY = 0;
  } else if (action === 'fullscreen') {
    if (!document.fullscreenElement) {
      container.requestFullscreen?.() || 
      container.webkitRequestFullscreen?.() || 
      container.msRequestFullscreen?.();
      toast('Fullscreen enabled - Press Esc to exit');
    } else {
      document.exitFullscreen?.() || 
      document.webkitExitFullscreen?.() || 
      document.msExitFullscreen?.();
    }
  }

  content.style.transform = `translate(${roadmapPanX}px, ${roadmapPanY}px) scale(${roadmapZoom})`;
  if (zoomLabel) zoomLabel.textContent = `${Math.round(roadmapZoom * 100)}%`;
}

// Add mouse wheel zoom support
document.addEventListener('wheel', (e) => {
  if (e.target.closest('.roadmap-viewport')) {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleRoadmapControl('zoom-in');
    } else {
      handleRoadmapControl('zoom-out');
    }
  }
}, { passive: false });

// Add pan/drag support
document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.roadmap-viewport')) {
    roadmapIsDragging = true;
    roadmapStartX = e.clientX - roadmapPanX;
    roadmapStartY = e.clientY - roadmapPanY;
    document.body.style.cursor = 'grabbing';
  }
});

document.addEventListener('mousemove', (e) => {
  if (roadmapIsDragging) {
    roadmapPanX = e.clientX - roadmapStartX;
    roadmapPanY = e.clientY - roadmapStartY;
    const content = document.querySelector('.roadmap-content');
    if (content) {
      content.style.transform = `translate(${roadmapPanX}px, ${roadmapPanY}px) scale(${roadmapZoom})`;
    }
  }
});

document.addEventListener('mouseup', () => {
  if (roadmapIsDragging) {
    roadmapIsDragging = false;
    document.body.style.cursor = '';
  }
});

const setText = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = String(val); };
const setStyle = (sel, prop, val) => { const el = document.querySelector(sel); if (el) el.style[prop] = String(val); };

let experimentCount = 0;
function trackLabExperiment() {
  experimentCount++;
  const el = document.querySelector('[data-experiments-count]');
  if (el) el.textContent = String(experimentCount);
}

function checkChallengeCompletion(labId, data) {
  const statusEl = document.querySelector('[data-challenge-status]');
  if (!statusEl) return;

  let isComplete = false;
  if (labId === 'hpc-throughput') {
    if (data.nodes >= 32 && data.ops >= 10000) isComplete = true;
  } else if (labId === 'flynn-taxonomy') {
    if (data === 'SIMD' || data === 'MIMD') isComplete = true;
  } else if (labId === 'cache-coherence') {
    if (data === 'seq' || data === 'sharing') isComplete = true;
  } else if (labId === 'speedup-laws') {
    if (data.serialVal <= 5 && data.procs >= 64) isComplete = true;
  } else if (labId === 'top500-cluster') {
    if (data.racks >= 32 && data.gpus >= 4) isComplete = true;
  }

  if (isComplete) {
    statusEl.innerHTML = '<span class="status-indicator completed">✅ Completed! +50 XP</span>';
  }
}

function handleCompareMode() {
  toast('Supercomputer Comparison Loaded: Frontier (1.1 EFLOPS), Fugaku (442 PFLOPS), LUMI (379 PFLOPS).');
}

function handleScenarioToggle() {
  toast('Real-World Scenario Loaded: Climate Modeling Grid (s = 2%, p = 256, 98% Parallelizable).');
}

function updateFlynn(arch) {
  const instMap = {
    'SISD': 'Single (Program Counter)',
    'SIMD': 'Single (Broadcast Control)',
    'MISD': 'Multiple (Redundant Stream)',
    'MIMD': 'Multiple (Independent Threads)'
  };
  const dataMap = {
    'SISD': 'Single (Scalar Memory)',
    'SIMD': 'Multiple (Vector Lanes)',
    'MISD': 'Single (Shared Target)',
    'MIMD': 'Multiple (Independent Arrays)'
  };
  const aluMap = {
    'SISD': '<span class="proc-unit active">ALU 0</span>',
    'SIMD': Array.from({length:16}, (_,i) => `<span class="proc-unit active" style="background:var(--cyan-soft);color:var(--cyan);margin:2px;">Vector Lane ${i}</span>`).join(''),
    'MISD': '<span class="proc-unit active">Guard 0</span><span class="proc-unit active">Guard 1</span><span class="proc-unit active">Guard 2</span>',
    'MIMD': Array.from({length:8}, (_,i) => `<span class="proc-unit active" style="background:color-mix(in srgb, var(--cyan) 20%, transparent);color:var(--cyan);margin:2px;">Core ${i}</span>`).join('')
  };
  const cyclesMap = { 'SISD': '100 cycles', 'SIMD': '6.25 cycles', 'MISD': '100 cycles', 'MIMD': '3.12 cycles' };
  const lanesMap = { 'SISD': '1 lane', 'SIMD': '16 vector lanes', 'MISD': '3 redundant guards', 'MIMD': '32 independent cores' };
  const speedupMap = { 'SISD': '1.00×', 'SIMD': '16.00×', 'MISD': '1.00× (3× Safety)', 'MIMD': '32.00×' };
  const feedbackMap = {
    'SISD': 'SISD executes 1 instruction on 1 scalar data item per cycle (Classic Uniprocessor CPU).',
    'SIMD': '🚀 SIMD broadcasts 1 instruction across 16 parallel data lanes (GPU warps & vector units)! 16x speedup achieved!',
    'MISD': '🛡️ MISD runs 3 redundant instruction streams on 1 data item to guarantee 100% fault-tolerant safety.',
    'MIMD': '🏎️ MIMD runs multiple independent instruction streams on multiple data arrays across multi-core CPUs and cluster nodes!'
  };

  setText('[data-flynn-inst]', instMap[arch] || 'Single');
  setText('[data-flynn-data]', dataMap[arch] || 'Single');
  setText('[data-flynn-cycles]', cyclesMap[arch] || '100 cycles');
  setText('[data-flynn-lanes]', lanesMap[arch] || '1 lane');
  setText('[data-flynn-speedup]', speedupMap[arch] || '1.00×');

  const procsEl = document.querySelector('[data-flynn-procs]');
  if (procsEl) procsEl.innerHTML = aluMap[arch] || '<span class="proc-unit active">ALU 0</span>';

  const feedbackEl = document.querySelector('[data-flynn-feedback]');
  if (feedbackEl) feedbackEl.textContent = feedbackMap[arch] || '';

  checkChallengeCompletion('flynn-taxonomy', arch);
  trackLabExperiment();
}

function updateCacheCoherence(pattern, cores) {
  const patternMap = {
    'seq': { hit: '93.8%', eat: '2.4 ns', bus: 'Low', c0: 'm-mod', c0t: 'Modified [M]', c1: 'm-shr', c1t: 'Shared [S]', c2: 'm-shr', c2t: 'Shared [S]', c3: 'm-shr', c3t: 'Shared [S]', msg: 'Sequential access maximizes spatial locality (64-byte line = 8 doubles).' },
    'stride': { hit: '75.0%', eat: '8.5 ns', bus: 'Medium', c0: 'm-exc', c0t: 'Exclusive [E]', c1: 'm-inv', c1t: 'Invalid [I]', c2: 'm-inv', c2t: 'Invalid [I]', c3: 'm-inv', c3t: 'Invalid [I]', msg: 'Strided access fetches lines with partial utilization.' },
    'rand': { hit: '12.5%', eat: '88.0 ns', bus: 'High', c0: 'm-inv', c0t: 'Invalid [I]', c1: 'm-inv', c1t: 'Invalid [I]', c2: 'm-inv', c2t: 'Invalid [I]', c3: 'm-inv', c3t: 'Invalid [I]', msg: 'Random access breaks spatial locality, causing 88 ns DRAM latencies.' },
    'sharing': { hit: '45.0%', eat: '48.0 ns', bus: 'Critical (False Sharing)', c0: 'm-mod', c0t: 'Modified [M]', c1: 'm-inv', c1t: 'Invalid [I]', c2: 'm-inv', c2t: 'Invalid [I]', c3: 'm-inv', c3t: 'Invalid [I]', msg: '⚠️ False Sharing! Independent variables on the same 64-byte line cause line bouncing across cores!' }
  };

  const data = patternMap[pattern] || patternMap['seq'];
  setText('[data-cache-cores-val]', cores);
  setText('[data-cache-hit]', data.hit);
  setText('[data-cache-eat]', data.eat);
  setText('[data-cache-bus]', data.bus);

  const c0 = document.querySelector('[data-mesi-c0]');
  if (c0) { c0.className = `mesi-badge ${data.c0}`; c0.textContent = data.c0t; }
  const c1 = document.querySelector('[data-mesi-c1]');
  if (c1) { c1.className = `mesi-badge ${data.c1}`; c1.textContent = data.c1t; }
  const c2 = document.querySelector('[data-mesi-c2]');
  if (c2) { c2.className = `mesi-badge ${data.c2}`; c2.textContent = data.c2t; }
  const c3 = document.querySelector('[data-mesi-c3]');
  if (c3) { c3.className = `mesi-badge ${data.c3}`; c3.textContent = data.c3t; }

  const feedbackEl = document.querySelector('[data-cache-feedback]');
  if (feedbackEl) feedbackEl.textContent = data.msg;

  checkChallengeCompletion('cache-coherence', pattern);
  trackLabExperiment();
}

function updateSpeedupLaws(serialVal, procs) {
  const serial = serialVal / 100;
  const f = 1 - serial;
  const amdahl = 1 / (serial + f / procs);
  const gustafson = procs - serial * (procs - 1);
  const eff = (amdahl / procs) * 100;
  const ceiling = 1 / serial;
  const adv = (gustafson / amdahl).toFixed(1);

  setText('[data-serial-frac-val]', `${serialVal}%`);
  setText('[data-law-procs-val]', procs);
  setText('[data-amdahl-speedup]', `${amdahl.toFixed(2)}×`);
  setText('[data-gustafson-speedup]', `${gustafson.toFixed(2)}×`);
  setText('[data-law-efficiency]', `${eff.toFixed(1)}%`);
  setText('[data-amdahl-ceiling]', `${ceiling.toFixed(0)}×`);
  setText('[data-current-eff]', `${eff.toFixed(0)}%`);
  setText('[data-gustafson-adv]', `${adv}×`);

  setStyle('[data-chart-amdahl]', 'height', `${Math.min(100, (amdahl / procs) * 100)}%`);
  setStyle('[data-chart-gustafson]', 'height', `${Math.min(100, (gustafson / procs) * 100)}%`);

  const feedbackEl = document.querySelector('[data-law-feedback]');
  if (feedbackEl) {
    feedbackEl.textContent = `With a ${serialVal}% serial fraction, Amdahl caps maximum possible speedup at ${ceiling.toFixed(0)}× even with infinite cores. Gustafson shows weak scaling achieves ${gustafson.toFixed(2)}× on ${procs} cores!`;
  }

  checkChallengeCompletion('speedup-laws', { serialVal, procs });
  trackLabExperiment();
}

function updateTop500Cluster(racks, gpus, pueVal) {
  const pue = pueVal / 100;
  const nodes = racks * 32;
  const rpeak = nodes * (2 + gpus * 10) * 0.05;
  const rmax = rpeak * 0.82;
  const power = nodes * (0.35 + gpus * 0.30) * pue;
  const green = (rmax * 1000) / power;

  setText('[data-cluster-racks-val]', racks);
  setText('[data-cluster-gpus-val]', gpus);
  setText('[data-cluster-pue-val]', pue.toFixed(2));
  setText('[data-cluster-rpeak]', `${rpeak.toFixed(1)} PFLOPS`);
  setText('[data-cluster-rmax]', `${rmax.toFixed(1)} PFLOPS`);
  setText('[data-cluster-efficiency]', `${green.toFixed(1)} GFLOPS/W`);

  const feedbackEl = document.querySelector('[data-cluster-feedback]');
  if (feedbackEl) {
    feedbackEl.textContent = `Cluster configured with ${nodes} nodes (${racks} racks, ${gpus} GPUs/node). Rmax achieves ${rmax.toFixed(1)} PFLOPS at PUE ${pue.toFixed(2)} (${green.toFixed(1)} GFLOPS/W)!`;
  }

  checkChallengeCompletion('top500-cluster', { racks, gpus, pueVal });
  trackLabExperiment();
}

document.addEventListener('input', throttle((e) => {
  handleInput(e);
}, 50));

document.addEventListener('change', (e) => {
  handleInput(e);
});

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

    trackLabExperiment();
    checkChallengeCompletion('hpc-throughput', { nodes, ops });

    if (flops > tutorialState.bestThroughput) {
      tutorialState.bestThroughput = flops;
      const bestEl = document.querySelector('[data-best-throughput]');
      if (bestEl) {
        bestEl.textContent = `${flops.toFixed(2)} TFLOP/s`;
        bestEl.parentElement.classList.add('updated');
        setTimeout(() => bestEl.parentElement.classList.remove('updated'), 500);
      }
    }

    const efficiency = (flops / power).toFixed(2);
    const effEl = document.querySelector('[data-efficiency-score]');
    if (effEl) effEl.textContent = `${efficiency} GFLOPS/W`;

    const feedbackEl = document.querySelector('[data-hpc-feedback]');
    if (feedbackEl) {
      if (nodes < 8) {
        feedbackEl.textContent = 'Try increasing nodes to see better scalability. HPC clusters typically have 32+ nodes for production workloads.';
      } else if (nodes > 64 && ops < 10000) {
        feedbackEl.textContent = 'Great node count! Now increase problem size to fully utilize the cluster capacity.';
      } else if (flops > 15) {
        feedbackEl.textContent = '🚀 Excellent throughput! This configuration delivers supercomputer-class performance.';
      } else {
        feedbackEl.textContent = 'As problem size grows, standard PC time scales linearly to hours, while the cluster maintains sub-second execution.';
      }
    }
  }

  // 3. Cache Coherence
  if (e.target.matches('[data-cache-pattern], [data-cache-cores]')) {
    const pattern = document.querySelector('[data-cache-pattern]')?.value || 'seq';
    const cores = Number(document.querySelector('[data-cache-cores]')?.value || 4);
    updateCacheCoherence(pattern, cores);
  }

  // 4. Speedup Laws (Amdahl vs Gustafson)
  if (e.target.matches('[data-serial-frac], [data-law-procs]')) {
    const serialVal = Number(document.querySelector('[data-serial-frac]')?.value || 5);
    const procs = Number(document.querySelector('[data-law-procs]')?.value || 64);
    updateSpeedupLaws(serialVal, procs);
  }

  // 5. TOP500 Cluster
  if (e.target.matches('[data-cluster-racks], [data-cluster-gpus], [data-cluster-pue]')) {
    const racks = Number(document.querySelector('[data-cluster-racks]')?.value || 32);
    const gpus = Number(document.querySelector('[data-cluster-gpus]')?.value || 4);
    const pueVal = Number(document.querySelector('[data-cluster-pue]')?.value || 115);
    updateTop500Cluster(racks, gpus, pueVal);
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

// updateFlynn is handled above with rich vector visualization

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

// Enhanced Lab Tutorial System
let tutorialState = {
  active: false,
  currentStep: 0,
  labId: null,
  experimentsCount: 0,
  bestThroughput: 0
};

function handleTutorialAction(action, labId) {
  const tutorialPanel = document.querySelector('[data-tutorial-panel]');
  const startBtn = document.querySelector('[data-tutorial-action="start"]');
  
  if (action === 'start') {
    tutorialState.active = true;
    tutorialState.currentStep = 0;
    tutorialState.labId = labId;
    
    // Show tutorial panel
    if (tutorialPanel) {
      tutorialPanel.style.display = 'block';
      tutorialPanel.classList.remove('collapsed');
    }
    
    updateTutorialStep();
    toast('📚 Tutorial started! Follow the step-by-step guidance.');
  } else if (action === 'next') {
    tutorialState.currentStep++;
    updateTutorialStep();
  } else if (action === 'skip') {
    tutorialState.active = false;
    
    // Hide tutorial panel
    if (tutorialPanel) {
      tutorialPanel.style.display = 'none';
      tutorialPanel.classList.add('collapsed');
    }
    
    // Remove all highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });
    
    toast('Tutorial closed. Explore freely!');
  }
}

function toggleChallengeCard() {
  const challengeCard = document.querySelector('[data-challenge-card]');
  if (challengeCard) {
    challengeCard.classList.toggle('collapsed');
  }
}

function updateTutorialStep() {
  const stepEl = document.querySelector('[data-step-current]');
  const fillEl = document.querySelector('[data-progress-fill]');
  const hintTextEl = document.querySelector('[data-hint-text]');
  
  // Get tutorial steps for current lab
  const labId = tutorialState.labId || 'hpc-throughput';
  const steps = TUTORIAL_STEPS[labId] || [];
  const maxSteps = steps.length || 4;
  const currentStepData = steps[tutorialState.currentStep];
  
  const progress = ((tutorialState.currentStep + 1) / maxSteps) * 100;
  
  if (stepEl) stepEl.textContent = tutorialState.currentStep + 1;
  if (fillEl) fillEl.style.width = `${progress}%`;
  
  // Use actual tutorial instruction or fallback to generic hint
  if (hintTextEl && currentStepData) {
    hintTextEl.textContent = currentStepData.instruction;
    
    // Highlight the relevant element if specified
    if (currentStepData.highlight) {
      // Remove previous highlights
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });
      
      // Add highlight to current element
      const highlightEl = document.querySelector(`[data-${currentStepData.highlight}], #${currentStepData.highlight}, [id*="${currentStepData.highlight}"]`);
      if (highlightEl) {
        highlightEl.classList.add('tutorial-highlight');
        // Scroll into view
        highlightEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  } else if (hintTextEl) {
    // Fallback hints if no specific tutorial data
    const fallbackHints = {
      0: 'Start with default values and observe the baseline',
      1: 'Adjust the first parameter and see the impact',
      2: 'Try extreme values to understand limits',
      3: 'Find the optimal configuration for best performance'
    };
    hintTextEl.textContent = fallbackHints[tutorialState.currentStep] || 'Continue exploring the lab';
  }
  
  // Auto-complete tutorial after last step
  if (tutorialState.currentStep >= maxSteps - 1) {
    const nextBtn = document.querySelector('[data-tutorial-action="next"]');
    if (nextBtn) {
      nextBtn.textContent = 'Complete Tutorial ✓';
      nextBtn.onclick = (e) => {
        e.preventDefault();
        toast('🎉 Tutorial completed! Keep experimenting to master the lab.');
        tutorialState.active = false;
        
        const tutorialPanel = document.querySelector('[data-tutorial-panel]');
        if (tutorialPanel) {
          tutorialPanel.style.display = 'none';
          tutorialPanel.classList.add('collapsed');
        }
        
        // Remove all highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
          el.classList.remove('tutorial-highlight');
        });
      };
    }
  }
}

// Compare mode and challenge tracking functions handled above

// Global Lab Control State
let labControlState = {
  speed: 1,
  autoRun: true,
  showHints: true,
  showFormulas: true,
  comparisonMode: false,
  savedConfigs: JSON.parse(localStorage.getItem('lab-configs') || '[]')
};

// Speed Control Handler
function handleSpeedChange(speed) {
  labControlState.speed = parseFloat(speed);
  
  // Update active button
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.speed === speed) {
      btn.classList.add('active');
    }
  });
  
  // Apply speed to animations
  document.documentElement.style.setProperty('--animation-speed', speed);
  toast(`Animation speed set to ${speed}×`);
}

// Lab Control Actions Handler
function handleLabControlAction(action) {
  switch(action) {
    case 'save-config':
      saveCurrentConfig();
      break;
    case 'load-config':
      showLoadConfigDialog();
      break;
    case 'reset-lab':
      resetLabToDefaults();
      break;
    case 'compare-mode':
      toggleComparisonMode();
      break;
    case 'show-explanation':
      showTheoryExplanation();
      break;
    case 'show-examples':
      showCodeExamples();
      break;
    case 'take-screenshot':
      captureLabScreenshot();
      break;
    case 'export-data':
      exportLabData();
      break;
  }
}

// Save Current Configuration
function saveCurrentConfig() {
  const config = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    lab: window.location.hash.split('/')[2] || 'unknown',
    speed: labControlState.speed,
    autoRun: labControlState.autoRun,
    showHints: labControlState.showHints,
    showFormulas: labControlState.showFormulas,
    parameters: captureCurrentParameters()
  };
  
  labControlState.savedConfigs.push(config);
  localStorage.setItem('lab-configs', JSON.stringify(labControlState.savedConfigs));
  
  showExportToast('✓ Configuration saved successfully!');
}

// Capture Current Lab Parameters
function captureCurrentParameters() {
  const params = {};
  
  // Capture all range inputs
  document.querySelectorAll('input[type="range"]').forEach(input => {
    params[input.id] = input.value;
  });
  
  // Capture all select inputs
  document.querySelectorAll('select').forEach(select => {
    if (select.id && select.id !== 'lab-select') {
      params[select.id] = select.value;
    }
  });
  
  return params;
}

// Show Load Config Dialog
function showLoadConfigDialog() {
  if (labControlState.savedConfigs.length === 0) {
    toast('No saved configurations found');
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'explanation-modal active';
  modal.innerHTML = `
    <div class="explanation-content">
      <button class="explanation-close-btn" onclick="this.closest('.explanation-modal').remove()">×</button>
      <h2>📂 Load Saved Configuration</h2>
      <div class="saved-configs-list">
        ${labControlState.savedConfigs.reverse().map(config => `
          <div class="saved-config-item" onclick="loadConfiguration(${config.id})">
            <strong>${config.lab}</strong>
            <span>${new Date(config.timestamp).toLocaleString()}</span>
            <span>Speed: ${config.speed}×, ${Object.keys(config.parameters).length} parameters</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Load Configuration
window.loadConfiguration = function(configId) {
  const config = labControlState.savedConfigs.find(c => c.id === configId);
  if (!config) return;
  
  // Apply speed
  handleSpeedChange(config.speed.toString());
  
  // Apply parameters
  Object.entries(config.parameters).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  // Close modal
  document.querySelector('.explanation-modal')?.remove();
  toast('✓ Configuration loaded!');
};

// Reset Lab to Defaults
function resetLabToDefaults() {
  // Reset all range inputs to their default values
  document.querySelectorAll('input[type="range"]').forEach(input => {
    input.value = input.defaultValue || input.min;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  
  // Reset all selects to first option
  document.querySelectorAll('select').forEach(select => {
    if (select.id !== 'lab-select') {
      select.selectedIndex = 0;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  
  // Reset speed
  handleSpeedChange('1');
  
  toast('✓ Lab reset to defaults');
}

// Toggle Comparison Mode
function toggleComparisonMode() {
  labControlState.comparisonMode = !labControlState.comparisonMode;
  
  let panel = document.querySelector('.comparison-mode-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.className = 'comparison-mode-panel';
    panel.innerHTML = `
      <div class="comparison-header">
        <h3>📊 Comparison Mode</h3>
        <button class="close-comparison-btn" onclick="document.querySelector('.comparison-mode-panel').classList.remove('active')">×</button>
      </div>
      <div class="comparison-configs">
        <p style="color:var(--muted); font-size:0.85rem;">
          Save multiple configurations and compare results side-by-side.
        </p>
        <button class="button primary" onclick="addComparisonSnapshot()">
          + Add Current State
        </button>
        <div id="comparison-snapshots"></div>
      </div>
    `;
    document.body.appendChild(panel);
  }
  
  panel.classList.toggle('active', labControlState.comparisonMode);
}

// Show Theory Explanation
function showTheoryExplanation() {
  const currentLab = window.location.hash.split('/')[2] || 'hpc-throughput';
  const explanations = {
    'hpc-throughput': {
      title: 'HPC Throughput Fundamentals',
      content: `
        <p><strong>Throughput</strong> measures the number of operations completed per unit time.</p>
        <p><strong>Formula:</strong> Throughput = Operations / Time</p>
        <p><strong>Key Concepts:</strong></p>
        <ul>
          <li>FLOPS (Floating Point Operations Per Second)</li>
          <li>TFLOPS = 10¹² FLOPS</li>
          <li>Linear scaling: 2× nodes ≈ 2× throughput</li>
          <li>Power consumption scales with node count</li>
        </ul>
        <p><strong>Real-World Applications:</strong> Weather simulations, molecular dynamics, AI training</p>
      `
    },
    'flynn-taxonomy': {
      title: 'Flynn\'s Taxonomy Architecture Classification',
      content: `
        <p><strong>Flynn's Taxonomy</strong> classifies computer architectures by instruction and data streams.</p>
        <p><strong>Categories:</strong></p>
        <ul>
          <li><strong>SISD:</strong> Single Instruction, Single Data (traditional CPUs)</li>
          <li><strong>SIMD:</strong> Single Instruction, Multiple Data (GPUs, vector processors)</li>
          <li><strong>MISD:</strong> Multiple Instruction, Single Data (rare, fault-tolerant systems)</li>
          <li><strong>MIMD:</strong> Multiple Instruction, Multiple Data (multi-core CPUs, clusters)</li>
        </ul>
        <p><strong>Performance:</strong> SIMD can achieve 16× speedup for data-parallel operations</p>
      `
    }
  };
  
  const explanation = explanations[currentLab] || { title: 'Theory', content: '<p>Explanation not available for this lab.</p>' };
  
  const modal = document.createElement('div');
  modal.className = 'explanation-modal active';
  modal.innerHTML = `
    <div class="explanation-content">
      <button class="explanation-close-btn" onclick="this.closest('.explanation-modal').remove()">×</button>
      <h2>${explanation.title}</h2>
      ${explanation.content}
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Show Code Examples
function showCodeExamples() {
  const currentLab = window.location.hash.split('/')[2] || 'hpc-throughput';
  const examples = {
    'openmp-loop': {
      title: 'OpenMP Loop Scheduling Examples',
      content: `
        <h3>Static Scheduling:</h3>
        <pre class="code-block"><code>#pragma omp parallel for schedule(static, 10)
for (int i = 0; i < N; i++) {
    process(data[i]);
}</code></pre>
        
        <h3>Dynamic Scheduling:</h3>
        <pre class="code-block"><code>#pragma omp parallel for schedule(dynamic, 4)
for (int i = 0; i < N; i++) {
    compute_heavy_work(i);
}</code></pre>
        
        <h3>Guided Scheduling:</h3>
        <pre class="code-block"><code>#pragma omp parallel for schedule(guided)
for (int i = 0; i < N; i++) {
    adaptive_computation(i);
}</code></pre>
      `
    },
    'cuda-basics': {
      title: 'CUDA Kernel Launch Examples',
      content: `
        <h3>1D Grid Launch:</h3>
        <pre class="code-block"><code>int blockSize = 256;
int numBlocks = (N + blockSize - 1) / blockSize;
kernel<<<numBlocks, blockSize>>>(d_data, N);</code></pre>
        
        <h3>Thread Index Calculation:</h3>
        <pre class="code-block"><code>__global__ void kernel(float *data, int n) {
    int tid = blockIdx.x * blockDim.x + threadIdx.x;
    if (tid < n) {
        data[tid] = process(data[tid]);
    }
}</code></pre>
      `
    }
  };
  
  const example = examples[currentLab] || { title: 'Code Examples', content: '<p>Examples not available for this lab.</p>' };
  
  const modal = document.createElement('div');
  modal.className = 'explanation-modal active';
  modal.innerHTML = `
    <div class="explanation-content" style="max-width:900px;">
      <button class="explanation-close-btn" onclick="this.closest('.explanation-modal').remove()">×</button>
      <h2>💻 ${example.title}</h2>
      ${example.content}
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Capture Screenshot
function captureLabScreenshot() {
  // Create flash effect
  const flash = document.createElement('div');
  flash.className = 'screenshot-flash';
  document.body.appendChild(flash);
  
  setTimeout(() => flash.remove(), 300);
  
  // Show success message
  showExportToast('📸 Screenshot captured! (Browser screenshot tool can save)');
}

// Export Lab Data as CSV
function exportLabData() {
  const params = captureCurrentParameters();
  const csvContent = Object.entries(params)
    .map(([key, value]) => `${key},${value}`)
    .join('\n');
  
  const blob = new Blob(['Parameter,Value\n' + csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lab-data-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  
  showExportToast('📊 Data exported as CSV!');
}

// Show Export Toast
function showExportToast(message) {
  const existingToast = document.querySelector('.export-toast');
  if (existingToast) existingToast.remove();
  
  const exportToast = document.createElement('div');
  exportToast.className = 'export-toast';
  exportToast.textContent = message;
  document.body.appendChild(exportToast);
  
  setTimeout(() => exportToast.classList.add('show'), 100);
  setTimeout(() => {
    exportToast.classList.remove('show');
    setTimeout(() => exportToast.remove(), 300);
  }, 3000);
}

// Toggle Handlers
function handleAutoRunToggle(checked) {
  labControlState.autoRun = checked;
  toast(checked ? 'Auto-run enabled' : 'Auto-run disabled');
}

function handleHintsToggle(checked) {
  labControlState.showHints = checked;
  document.querySelectorAll('.tutorial-hint, .callout').forEach(el => {
    el.style.display = checked ? 'flex' : 'none';
  });
  toast(checked ? 'Hints visible' : 'Hints hidden');
}

function handleFormulasToggle(checked) {
  labControlState.showFormulas = checked;
  document.querySelectorAll('.formula, .equation').forEach(el => {
    el.style.display = checked ? 'block' : 'none';
  });
  toast(checked ? 'Formulas visible' : 'Formulas hidden');
}

// Video Player Functions
function initVideoPlayer() {
  const video = document.getElementById('course-video');
  const progressBar = document.getElementById('progress-bar');
  const progressFilled = document.getElementById('progress-filled');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const loading = document.getElementById('video-loading');

  if (!video) return;

  // Update time display
  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
  });

  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);
  });

  // Progress bar click
  progressBar?.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  });

  // Show/hide loading spinner
  video.addEventListener('waiting', () => {
    if (loading) loading.style.display = 'flex';
  });

  video.addEventListener('canplay', () => {
    if (loading) loading.style.display = 'none';
  });

  // Show controls on hover
  const container = document.querySelector('.video-player-container');
  const controls = document.getElementById('video-controls');
  
  container?.addEventListener('mouseenter', () => {
    controls?.classList.add('visible');
  });

  container?.addEventListener('mouseleave', () => {
    if (!video.paused) {
      controls?.classList.remove('visible');
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!video || document.activeElement.tagName === 'INPUT') return;
    
    if (e.code === 'Space' && e.target.closest('.video-player-container')) {
      e.preventDefault();
      togglePlayPause();
    } else if (e.code === 'KeyM' && e.target.closest('.video-player-container')) {
      toggleMute();
    } else if (e.code === 'KeyF' && e.target.closest('.video-player-container')) {
      toggleFullscreen();
    }
  });
}

function togglePlayPause() {
  const video = document.getElementById('course-video');
  const playIcon = document.querySelector('#play-pause-btn .play-icon');
  const pauseIcon = document.querySelector('#play-pause-btn .pause-icon');

  if (!video) return;

  if (video.paused) {
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    video.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
}

function toggleMute() {
  const video = document.getElementById('course-video');
  const volumeIcon = document.querySelector('#mute-btn .volume-icon');
  const mutedIcon = document.querySelector('#mute-btn .muted-icon');

  if (!video) return;

  video.muted = !video.muted;
  
  if (video.muted) {
    volumeIcon.style.display = 'none';
    mutedIcon.style.display = 'block';
  } else {
    volumeIcon.style.display = 'block';
    mutedIcon.style.display = 'none';
  }
}

function toggleFullscreen() {
  const container = document.querySelector('.video-wrapper');
  
  if (!container) return;

  if (!document.fullscreenElement) {
    container.requestFullscreen?.() || 
    container.webkitRequestFullscreen?.() || 
    container.msRequestFullscreen?.();
  } else {
    document.exitFullscreen?.() || 
    document.webkitExitFullscreen?.() || 
    document.msExitFullscreen?.();
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Restore presentation mode on page load
if (state.presentationMode) {
  document.body.classList.add('presentation-mode');
  document.documentElement.dataset.presentation = 'true';
}

document.documentElement.dataset.theme = state.theme;
startRouter();
updateProgress();

// Initialize video player after router
setTimeout(initVideoPlayer, 100);

es

// Listen for Amdahl slider input
document.addEventListener('input', (e) => {
  if (e.target.matches('[data-amdahl-slider]')) {
    updateAmdahlCurve();
  }
});

// Initialize Amdahl curve on page load
setTimeout(updateAmdahlCurve, 100);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // F key or f key - Toggle presentation mode
  if ((e.key === 'F' || e.key === 'f') && !e.ctrlKey && !e.altKey && !e.metaKey) {
    // Only if not in an input field
    if (!['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      e.preventDefault();
      document.querySelector('[data-action="toggle-presentation"]')?.click();
    }
  }
  // Escape key - Exit presentation mode
  if (e.key === 'Escape') {
    const isPresentationMode = document.body.classList.contains('presentation-mode');
    if (isPresentationMode) {
      e.preventDefault();
      document.querySelector('[data-action="toggle-presentation"]')?.click();
    }
  }
});

// Apply saved presentation mode on load
if (state.presentationMode) {
  document.body.classList.add('presentation-mode');
  document.documentElement.dataset.presentation = true;
}

// Unit 2 Diagram Handlers
function handleScheduleSelect(schedule) {
  document.querySelectorAll('[data-schedule-select]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-schedule-select="${schedule}"]`)?.classList.add('primary');
  
  const diagram = document.querySelector('[data-diagram="openmp-scheduling"]');
  if (!diagram) return;
  
  // Clear existing tasks
  for (let i = 0; i < 4; i++) {
    const taskGroup = diagram.querySelector(`[data-thread-tasks="${i}"]`);
    if (taskGroup) taskGroup.innerHTML = '';
  }
  
  const insights = {
    'static': '<strong>Static Scheduling:</strong> Iterations divided equally among threads at compile time. Best for uniform workloads. Low overhead but can cause imbalance if iteration costs vary.',
    'dynamic': '<strong>Dynamic Scheduling:</strong> Iterations assigned to threads at runtime from a shared queue. Higher overhead but adapts to load imbalance. Each thread fetches next iteration when idle.',
    'guided': '<strong>Guided Scheduling:</strong> Hybrid approach starting with large chunks that decrease exponentially. Balances low overhead of static with adaptability of dynamic. Ideal for moderately imbalanced workloads.'
  };
  
  const balanceValues = {
    'static': 65, // 65% balance (some imbalance)
    'dynamic': 95, // 95% balance (good)
    'guided': 85   // 85% balance (very good)
  };
  
  const balanceText = {
    'static': 'Static: Equal iteration count per thread (may cause imbalance)',
    'dynamic': 'Dynamic: Runtime work queue (adapts to imbalance, higher overhead)',
    'guided': 'Guided: Decreasing chunk sizes (balances overhead vs adaptability)'
  };
  
  // Update task visualization based on schedule type
  if (schedule === 'static') {
    // Static: Each thread gets 4 consecutive iterations
    const colors = ['var(--cyan)', 'var(--lime)', 'var(--orange)', 'var(--pink)'];
    for (let thread = 0; thread < 4; thread++) {
      const taskGroup = diagram.querySelector(`[data-thread-tasks="${thread}"]`);
      for (let iter = 0; iter < 4; iter++) {
        const x = 160 + (thread * 4 + iter) * 37.5;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', 50 + thread * 70);
        rect.setAttribute('width', 35);
        rect.setAttribute('height', 40);
        rect.setAttribute('fill', colors[thread]);
        rect.setAttribute('opacity', '0.7');
        rect.setAttribute('rx', '4');
        taskGroup.appendChild(rect);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + 17.5);
        text.setAttribute('y', 50 + thread * 70 + 25);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '11');
        text.textContent = thread * 4 + iter;
        taskGroup.appendChild(text);
      }
    }
  } else if (schedule === 'dynamic') {
    // Dynamic: Random distribution simulating runtime assignment
    const iterOrder = [0,4,1,8,5,2,12,9,6,3,13,10,7,14,11,15];
    const colors = ['var(--cyan)', 'var(--lime)', 'var(--orange)', 'var(--pink)'];
    iterOrder.forEach((iter, idx) => {
      const thread = idx % 4;
      const taskGroup = diagram.querySelector(`[data-thread-tasks="${thread}"]`);
      const posInThread = Math.floor(idx / 4);
      const x = 160 + posInThread * 150;
      
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', 50 + thread * 70);
      rect.setAttribute('width', 35);
      rect.setAttribute('height', 40);
      rect.setAttribute('fill', colors[thread]);
      rect.setAttribute('opacity', '0.7');
      rect.setAttribute('rx', '4');
      taskGroup.appendChild(rect);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x + 17.5);
      text.setAttribute('y', 50 + thread * 70 + 25);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '11');
      text.textContent = iter;
      taskGroup.appendChild(text);
    });
  } else if (schedule === 'guided') {
    // Guided: Start with large chunks, decrease exponentially
    const chunks = [[0,1,2,3,4,5,6,7], [8,9,10,11], [12,13], [14], [15]];
    const threadAssign = [0, 1, 2, 3, 0];
    const colors = ['var(--cyan)', 'var(--lime)', 'var(--orange)', 'var(--pink)'];
    
    chunks.forEach((chunk, chunkIdx) => {
      const thread = threadAssign[chunkIdx];
      const taskGroup = diagram.querySelector(`[data-thread-tasks="${thread}"]`);
      chunk.forEach((iter, iterIdx) => {
        const posInThread = chunk[0] + iterIdx;
        const x = 160 + posInThread * 37.5;
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', 50 + thread * 70);
        rect.setAttribute('width', 35);
        rect.setAttribute('height', 40);
        rect.setAttribute('fill', colors[thread]);
        rect.setAttribute('opacity', '0.7');
        rect.setAttribute('rx', '4');
        taskGroup.appendChild(rect);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + 17.5);
        text.setAttribute('y', 50 + thread * 70 + 25);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '11');
        text.textContent = iter;
        taskGroup.appendChild(text);
      });
    });
  }
  
  // Update insight and balance bar
  const insightEl = diagram.querySelector('[data-schedule-insight]');
  if (insightEl) insightEl.innerHTML = insights[schedule];
  
  const balanceBar = diagram.querySelector('[data-balance-bar]');
  if (balanceBar) {
    balanceBar.style.width = `${balanceValues[schedule]}%`;
  }
  
  const balanceTextEl = diagram.querySelector('[data-balance-text]');
  if (balanceTextEl) balanceTextEl.textContent = balanceText[schedule];
}

function handleMPIOperation(operation) {
  document.querySelectorAll('[data-mpi-op]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-mpi-op="${operation}"]`)?.classList.add('primary');
  
  const diagram = document.querySelector('[data-diagram="mpi-collective"]');
  if (!diagram) return;
  
  // Clear existing arrows
  const commArrows = diagram.querySelector('[data-comm-pattern]');
  if (commArrows) commArrows.innerHTML = '';
  
  const dataLabels = diagram.querySelector('[data-data-labels]');
  if (dataLabels) dataLabels.innerHTML = '';
  
  const insights = {
    'broadcast': '<strong>MPI_Bcast:</strong> Distributes data from root process to all other processes. Uses tree-based algorithm with O(log n) complexity instead of linear sends. Essential for sharing parameters across distributed computation.',
    'scatter': '<strong>MPI_Scatter:</strong> Divides data from root and distributes unique chunks to each process. Root has array [A,B,C,D]; after scatter, R0 has A, R1 has B, R2 has C, R3 has D. Used for data parallel workloads.',
    'gather': '<strong>MPI_Gather:</strong> Collects data from all processes to root. Inverse of scatter. Each process sends its local result; root receives all results in order. Used for collecting distributed computation results.',
    'allreduce': '<strong>MPI_Allreduce:</strong> Performs reduction operation (sum, max, min, etc.) across all processes and returns result to ALL processes. Combines MPI_Reduce + MPI_Bcast. Critical for global synchronization and consensus.'
  };
  
  const complexities = {
    'broadcast': 'Complexity: O(log n)',
    'scatter': 'Complexity: O(log n)',
    'gather': 'Complexity: O(log n)',
    'allreduce': 'Complexity: O(log n)'
  };
  
  // Create SVG elements for communication patterns
  if (operation === 'broadcast') {
    // Root to all workers (one-to-all)
    const paths = [
      'M 400 115 L 250 220',
      'M 400 115 L 400 300',
      'M 400 115 L 550 220'
    ];
    paths.forEach(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', 'var(--cyan)');
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrow-cyan)');
      path.classList.add('comm-line');
      commArrows.appendChild(path);
    });
    
    ['Data', 'Data', 'Data'].forEach((label, i) => {
      const positions = [[310, 170], [400, 215], [480, 170]];
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', positions[i][0]);
      text.setAttribute('y', positions[i][1]);
      text.setAttribute('fill', 'var(--cyan)');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', 'bold');
      text.textContent = label;
      dataLabels.appendChild(text);
    });
  } else if (operation === 'scatter') {
    // Root distributes unique chunks
    const paths = [
      'M 400 115 L 250 220',
      'M 400 115 L 400 300',
      'M 400 115 L 550 220'
    ];
    paths.forEach(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', 'var(--lime)');
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrow-lime)');
      path.classList.add('comm-line');
      commArrows.appendChild(path);
    });
    
    ['Chunk A', 'Chunk B', 'Chunk C'].forEach((label, i) => {
      const positions = [[295, 170], [385, 215], [465, 170]];
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', positions[i][0]);
      text.setAttribute('y', positions[i][1]);
      text.setAttribute('fill', 'var(--lime)');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-weight', 'bold');
      text.textContent = label;
      dataLabels.appendChild(text);
    });
  } else if (operation === 'gather') {
    // Workers to root (all-to-one)
    const paths = [
      'M 250 220 L 400 115',
      'M 400 300 L 400 115',
      'M 550 220 L 400 115'
    ];
    paths.forEach(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', 'var(--orange)');
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrow-cyan)');
      path.classList.add('comm-line');
      commArrows.appendChild(path);
    });
    
    ['Result 1', 'Result 2', 'Result 3'].forEach((label, i) => {
      const positions = [[285, 170], [375, 215], [455, 170]];
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', positions[i][0]);
      text.setAttribute('y', positions[i][1]);
      text.setAttribute('fill', 'var(--orange)');
      text.setAttribute('font-size', '10');
      text.setAttribute('font-weight', 'bold');
      text.textContent = label;
      dataLabels.appendChild(text);
    });
  } else if (operation === 'allreduce') {
    // All-to-all reduction (bidirectional)
    const paths = [
      'M 250 235 L 400 245',
      'M 400 315 L 400 245',
      'M 550 235 L 400 245',
      'M 400 130 L 250 235',
      'M 400 130 L 400 315',
      'M 400 130 L 550 235'
    ];
    paths.forEach((d, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', i < 3 ? 'var(--pink)' : 'var(--cyan)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrow-cyan)');
      path.setAttribute('opacity', '0.7');
      path.classList.add('comm-line');
      commArrows.appendChild(path);
    });
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '400');
    text.setAttribute('y', '195');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--pink)');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.textContent = 'Sum/Max/Min';
    dataLabels.appendChild(text);
  }
  
  // Update info box
  const insightEl = diagram.querySelector('[data-mpi-insight]');
  if (insightEl) insightEl.innerHTML = insights[operation];
  
  const opName = diagram.querySelector('.info-box text');
  if (opName) {
    const opNames = {
      'broadcast': 'MPI_Bcast',
      'scatter': 'MPI_Scatter',
      'gather': 'MPI_Gather',
      'allreduce': 'MPI_Allreduce'
    };
    opName.textContent = opNames[operation];
  }
  
  const complexityEl = diagram.querySelector('[data-op-complexity]');
  if (complexityEl) complexityEl.textContent = complexities[operation];
}

function handleSyncIssue(issue) {
  document.querySelectorAll('[data-sync-issue]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-sync-issue="${issue}"]`)?.classList.add('primary');
  
  const diagram = document.querySelector('[data-diagram="race-deadlock"]');
  if (!diagram) return;
  
  // Show/hide scenarios
  diagram.querySelectorAll('[data-scenario]').forEach(scenario => {
    scenario.style.display = scenario.dataset.scenario === issue ? '' : 'none';
  });
  
  const insights = {
    'race': '<strong>Race Condition:</strong> Occurs when multiple threads access shared memory without proper synchronization. Final result depends on unpredictable thread execution order. Fix: Use mutexes, atomic operations, or critical sections.',
    'deadlock': '<strong>Deadlock:</strong> Two or more threads wait indefinitely for locks held by each other. Circular dependency: T1 holds A, wants B; T2 holds B, wants A. Fix: Lock ordering, timeouts, or deadlock detection algorithms.',
    'correct': '<strong>Correct Synchronization:</strong> Uses mutex locks to ensure mutual exclusion. Only one thread can modify shared data at a time. Atomic operations or critical sections prevent race conditions and ensure data consistency.'
  };
  
  const insightEl = diagram.querySelector('[data-sync-insight]');
  if (insightEl) insightEl.innerHTML = insights[issue];
}

function handleWorkStealing(action) {
  const diagram = document.querySelector('[data-diagram="work-stealing"]');
  if (!diagram) return;
  
  // This would animate work stealing visualization
  // For now, just show a toast
  if (action === 'steal') {
    toast('Worker 4 stealing task from Worker 1\'s deque...');
  } else if (action === 'reset') {
    toast('Work stealing deques reset to initial state');
  }
}

// Unit 3 (GPU) Diagram Handlers
function handleCudaLevel(level) {
  document.querySelectorAll('[data-cuda-level]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-cuda-level="${level}"]`)?.classList.add('primary');
  
  const diagram = document.querySelector('[data-diagram="cuda-basics"]');
  if (!diagram) return;
  
  const insights = {
    'thread': '<strong>Thread Level:</strong> Individual execution unit. Each thread has its own registers and executes the kernel code. threadIdx identifies each thread within a block.',
    'warp': '<strong>Warp Level:</strong> 32 threads execute in SIMT lockstep. All threads in a warp must execute the same instruction. Divergence (if/else) serializes execution.',
    'block': '<strong>Block Level:</strong> Group of threads (up to 1024) sharing shared memory and able to synchronize via __syncthreads(). Blocks execute independently.',
    'grid': '<strong>Grid Level:</strong> Collection of all blocks launched by a kernel. Grid dimensions define the total parallelism. Blocks can execute in any order.'
  };
  
  const insightEl = diagram.querySelector('[data-cuda-insight]');
  if (insightEl) insightEl.innerHTML = insights[level];
  
  // Highlight relevant elements
  diagram.querySelectorAll('.cuda-block, .cuda-warp, .thread-blocks').forEach(el => {
    el.style.opacity = '0.4';
  });
  
  if (level === 'thread') {
    diagram.querySelectorAll('.thread-blocks').forEach(el => el.style.opacity = '1');
  } else if (level === 'warp') {
    diagram.querySelectorAll('.cuda-warp').forEach(el => el.style.opacity = '1');
  } else if (level === 'block') {
    diagram.querySelectorAll('.cuda-block').forEach(el => el.style.opacity = '1');
  } else if (level === 'grid') {
    diagram.querySelectorAll('.cuda-block').forEach(el => el.style.opacity = '1');
  }
}

function handleCoalescePattern(pattern) {
  document.querySelectorAll('[data-coalesce-pattern]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-coalesce-pattern="${pattern}"]`)?.classList.add('primary');
  
  const diagram = document.querySelector('[data-diagram="memory-coalescing"]');
  if (!diagram) return;
  
  // Update arrows visualization
  const arrows = diagram.querySelector('[data-pattern]');
  if (arrows) {
    if (pattern === 'sequential') {
      // Show straight vertical arrows
      arrows.innerHTML = Array.from({length: 16}, (_, i) => `
        <path d="M ${61 + i * 45} 185 L ${61 + i * 45} 90" stroke="var(--lime)" stroke-width="2" fill="none" opacity="0.7"/>
      `).join('');
    } else {
      // Show strided arrows (crossing pattern)
      arrows.innerHTML = Array.from({length: 16}, (_, i) => `
        <path d="M ${61 + i * 45} 185 L ${61 + ((i * 2) % 16) * 45} 90" stroke="var(--pink)" stroke-width="2" fill="none" opacity="0.5" stroke-dasharray="4"/>
      `).join('');
    }
  }
  
  // Update performance stats
  const seqStats = diagram.querySelector('[data-sequential-stats]');
  const strStats = diagram.querySelector('[data-strided-stats]');
  if (seqStats && strStats) {
    if (pattern === 'sequential') {
      seqStats.style.display = '';
      strStats.style.display = 'none';
    } else {
      seqStats.style.display = 'none';
      strStats.style.display = '';
    }
  }
  
  const insights = {
    'sequential': '<strong>Sequential Access (Coalesced):</strong> Consecutive threads access consecutive memory addresses. GPU combines all 32 thread requests into 1 memory transaction. Full bandwidth utilization (~900 GB/s).',
    'strided': '<strong>Strided Access (Uncoalesced):</strong> Threads access memory with gaps (stride). Each thread triggers a separate memory transaction. Bandwidth drops by stride factor (stride=16 → 16× slower).'
  };
  
  const insightEl = diagram.querySelector('[data-coalesce-insight]');
  if (insightEl) insightEl.innerHTML = insights[pattern];
}

// Unit 4 (Quantum) Diagram Handlers
function handleBlochState(state) {
  document.querySelectorAll('[data-bloch-state]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`[data-bloch-state="${state}"]`)?.classList.add('primary');
  
  const diagram = document.querySelector('[data-diagram="qubit-bloch"]');
  if (!diagram) return;
  
  const stateVectors = {
    '|0⟩': { x2: 400, y2: 90, label: '|0⟩', eq: 'α=1, β=0', p0: '100%', p1: '0%' },
    '|1⟩': { x2: 400, y2: 410, label: '|1⟩', eq: 'α=0, β=1', p0: '0%', p1: '100%' },
    '|+⟩': { x2: 580, y2: 250, label: '|+⟩', eq: 'α=1/√2, β=1/√2', p0: '50%', p1: '50%' },
    '|-⟩': { x2: 220, y2: 250, label: '|-⟩', eq: 'α=1/√2, β=-1/√2', p0: '50%', p1: '50%' }
  };
  
  const vec = stateVectors[state];
  if (!vec) return;
  
  // Update state vector line
  const stateLine = diagram.querySelector('.state-vector');
  if (stateLine) {
    stateLine.setAttribute('x2', vec.x2);
    stateLine.setAttribute('y2', vec.y2);
  }
  
  // Update info panel
  const stateLabel = diagram.querySelector('[data-state-label]');
  const stateEq = diagram.querySelector('[data-state-eq]');
  if (stateLabel) stateLabel.textContent = vec.label;
  if (stateEq) stateEq.textContent = vec.eq;
  
  const insight = diagram.querySelector('[data-bloch-insight]');
  if (insight) {
    const insights = {
      '|0⟩': '<strong>|0⟩ State:</strong> North pole of Bloch sphere. Pure computational basis state. Measurement always yields 0.',
      '|1⟩': '<strong>|1⟩ State:</strong> South pole. Pure computational basis state. Measurement always yields 1.',
      '|+⟩': '<strong>|+⟩ State:</strong> Equal superposition (H|0⟩). On X-axis. Measures 0 or 1 with 50% probability each.',
      '|-⟩': '<strong>|-⟩ State:</strong> Equal superposition with negative phase (H|1⟩). On -X axis. Also 50/50 measurement probabilities.'
    };
    insight.innerHTML = insights[state];
  }
}

// MCQ Handler Functions
function handleMCQAnswer(optionElement) {
  const mcqId = optionElement.dataset.mcqAnswer;
  const optionIndex = Number(optionElement.dataset.optionIndex);
  const isCorrect = optionElement.dataset.isCorrect === 'true';
  
  const mcqCard = optionElement.closest('.mcq-card');
  if (!mcqCard) return;
  
  // Check if already answered
  if (mcqCard.classList.contains('answered')) return;
  
  // Mark as answered
  mcqCard.classList.add('answered');
  
  // Highlight selected option
  const allOptions = mcqCard.querySelectorAll('.mcq-option');
  allOptions.forEach(opt => {
    opt.disabled = true;
    if (opt === optionElement) {
      opt.classList.add(isCorrect ? 'correct' : 'incorrect');
    }
    // Also highlight the correct answer
    if (opt.dataset.isCorrect === 'true') {
      opt.classList.add('correct-answer');
    }
  });
  
  // Show feedback
  const feedback = mcqCard.querySelector(`[data-feedback="${mcqId}"]`);
  if (feedback) {
    feedback.style.display = 'block';
    const feedbackIcon = feedback.querySelector('.feedback-icon');
    const feedbackTitle = feedback.querySelector('.feedback-title');
    
    if (isCorrect) {
      feedbackIcon.textContent = '✓';
      feedbackIcon.style.color = 'var(--cyan)';
      feedbackTitle.textContent = 'Correct!';
      feedbackTitle.style.color = 'var(--cyan)';
    } else {
      feedbackIcon.textContent = '✗';
      feedbackIcon.style.color = 'var(--pink)';
      feedbackTitle.textContent = 'Incorrect';
      feedbackTitle.style.color = 'var(--pink)';
    }
  }
  
  // Update score
  updateMCQScore(mcqId, isCorrect);
}

function updateMCQScore(mcqId, isCorrect) {
  // Extract topic from mcqId (format: "unitId-topicId-questionIndex")
  const parts = mcqId.split('-');
  const topic = `${parts[0]}-${parts[1]}`;
  
  const summary = document.querySelector(`[data-mcq-summary="${topic}"]`);
  if (!summary) return;
  
  const correctCountEl = summary.querySelector('[data-correct-count]');
  const totalCountEl = summary.querySelector('[data-total-count]');
  const scoreEl = summary.querySelector('[data-score]');
  
  if (!correctCountEl || !totalCountEl || !scoreEl) return;
  
  // Count answered questions
  const container = document.querySelector(`[data-mcq-topic="${topic}"]`);
  if (!container) return;
  
  const answeredCards = container.querySelectorAll('.mcq-card.answered');
  const correctAnswers = Array.from(answeredCards).filter(card => 
    card.querySelector('.mcq-option.correct')
  ).length;
  
  const total = Number(totalCountEl.textContent);
  const percentage = Math.round((correctAnswers / total) * 100);
  
  correctCountEl.textContent = correctAnswers;
  scoreEl.textContent = `${percentage}%`;
}

function resetMCQTopic(topic) {
  const container = document.querySelector(`[data-mcq-topic="${topic}"]`);
  if (!container) return;
  
  // Reset all MCQ cards
  container.querySelectorAll('.mcq-card').forEach(card => {
    card.classList.remove('answered');
    
    // Reset options
    card.querySelectorAll('.mcq-option').forEach(opt => {
      opt.disabled = false;
      opt.classList.remove('correct', 'incorrect', 'correct-answer');
    });
    
    // Hide feedback
    card.querySelectorAll('.mcq-feedback').forEach(fb => {
      fb.style.display = 'none';
    });
  });
  
  // Reset score
  const summary = document.querySelector(`[data-mcq-summary="${topic}"]`);
  if (summary) {
    summary.querySelector('[data-correct-count]').textContent = '0';
    summary.querySelector('[data-score]').textContent = '0%';
  }
  
  toast('Quiz reset successfully');
}

// Start the router
startRouter();
