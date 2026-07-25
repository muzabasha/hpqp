// Virtual Lab Experience Engine (17 Interactive Labs across 4 Units)
// Enhanced with Tutorial Mode, Challenges, and Real-time Feedback

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Lab Enhancement: Tutorial Mode System
const TUTORIAL_STEPS = {
  'hpc-throughput': [
    { step: 1, instruction: 'Start with 4 nodes and 1000 GFLOPs to see baseline performance', highlight: 'hpc-nodes' },
    { step: 2, instruction: 'Increase nodes to 32 to see linear speedup in action', highlight: 'hpc-nodes' },
    { step: 3, instruction: 'Now increase problem size to 10,000 GFLOPs and observe scalability', highlight: 'hpc-ops' },
    { step: 4, instruction: 'Notice how power consumption scales with node count', highlight: 'result' }
  ],
  'flynn-taxonomy': [
    { step: 1, instruction: 'Begin with SISD to understand serial execution', highlight: 'SISD' },
    { step: 2, instruction: 'Switch to SIMD and see 16x parallel lanes activate', highlight: 'SIMD' },
    { step: 3, instruction: 'Try MIMD to see independent instruction streams', highlight: 'MIMD' },
    { step: 4, instruction: 'Compare cycles: SISD takes 100, SIMD takes only 7!', highlight: 'result' }
  ],
  'speedup-laws': [
    { step: 1, instruction: 'Set serial fraction to 5% and 16 processors', highlight: 'serial-frac' },
    { step: 2, instruction: 'Observe Amdahl\'s law ceiling at ~13× speedup', highlight: 'amdahl-speedup' },
    { step: 3, instruction: 'Increase to 64 processors - Amdahl caps at 16×', highlight: 'law-procs' },
    { step: 4, instruction: 'Notice Gustafson achieves 61× with weak scaling!', highlight: 'gustafson-speedup' }
  ],
  'openmp-loop': [
    { step: 1, instruction: 'Start with 4 threads and static scheduling', highlight: 'omp-threads' },
    { step: 2, instruction: 'Set work imbalance to 80% - notice poor efficiency', highlight: 'omp-imbalance' },
    { step: 3, instruction: 'Switch to dynamic scheduling to improve load balance', highlight: 'omp-sched' },
    { step: 4, instruction: 'Efficiency jumps from ~60% to ~89%!', highlight: 'omp-eff' }
  ],
  'cuda-basics': [
    { step: 1, instruction: 'Set blocks to 32 and threads to 256', highlight: 'cuda-blocks' },
    { step: 2, instruction: 'Observe 8 warps per block (256/32 = 8)', highlight: 'cuda-warps-per-block' },
    { step: 3, instruction: 'Increase threads to 1024 for maximum occupancy', highlight: 'cuda-threads' },
    { step: 4, instruction: 'Total threads = blocks × threads/block', highlight: 'cuda-total-threads' }
  ]
};

// Lab Challenges for Better Learning
const LAB_CHALLENGES = {
  'hpc-throughput': {
    title: 'Challenge: Find the Sweet Spot',
    description: 'Configure nodes and problem size to achieve exactly 10 TFLOP/s throughput',
    check: (nodes, ops) => {
      const time = ops / (nodes * 350 + 100);
      const flops = (ops / time) / 1000;
      return Math.abs(flops - 10) < 0.5;
    },
    hint: 'Try around 16-20 nodes with 6000-8000 GFLOPs'
  },
  'flynn-taxonomy': {
    title: 'Challenge: Maximize Parallelism',
    description: 'Find the architecture that achieves 16× speedup for vector operations',
    check: (arch) => arch === 'SIMD',
    hint: 'SIMD processes 16 data items with a single instruction broadcast'
  },
  'speedup-laws': {
    title: 'Challenge: Amdahl\'s Ceiling',
    description: 'Find the serial fraction that limits speedup to exactly 10× with 64 processors',
    check: (serialFrac, procs) => {
      const f = 1 - (serialFrac / 100);
      const amdahl = 1 / ((1 - f) + f / procs);
      return Math.abs(amdahl - 10) < 0.2;
    },
    hint: 'Think: if max speedup is 10×, then 1/(1-f) = 10, so (1-f) = 0.1'
  },
  'cuda-basics': {
    title: 'Challenge: Maximum Occupancy',
    description: 'Configure grid and block dimensions to launch exactly 65,536 threads',
    check: (blocks, threads) => {
      return blocks * threads === 65536;
    },
    hint: 'Try 256 blocks × 256 threads, or 128 blocks × 512 threads'
  }
};

export const LAB_CATALOG = [
  { id: 'hpc-throughput', unit: 1, topic: 1, title: 'HPC Throughput & Benchmark Simulator' },
  { id: 'flynn-taxonomy', unit: 1, topic: 2, title: 'Flynn\'s Taxonomy Execution Pipeline' },
  { id: 'cache-coherence', unit: 1, topic: 3, title: 'Memory Hierarchy & MESI Cache Coherence' },
  { id: 'speedup-laws', unit: 1, topic: 4, title: 'Amdahl vs Gustafson Speedup & Scalability' },
  { id: 'top500-cluster', unit: 1, topic: 5, title: 'TOP500 & Green500 Cluster Builder' },
  { id: 'openmp-loop', unit: 2, topic: 1, title: 'OpenMP Worksharing & Loop Scheduling' },
  { id: 'mpi-collective', unit: 2, topic: 2, title: 'MPI Collective Communication & Topology' },
  { id: 'sync-deadlock', unit: 2, topic: 3, title: 'Race Condition, Mutex & Deadlock Sandbox' },
  { id: 'load-balancing', unit: 2, topic: 4, title: 'Dynamic Load Balancing & Work Stealing' },
  { id: 'cuda-basics', unit: 3, topic: 1, title: 'CUDA Execution Hierarchy Grid/Block/Thread' },
  { id: 'memory-coalescing', unit: 3, topic: 2, title: 'Warp Memory Coalescing & Bank Conflicts' },
  { id: 'roofline-profiling', unit: 3, topic: 3, title: 'CUDA Roofline Model & Profiling Sandbox' },
  { id: 'ai-accelerator', unit: 3, topic: 4, title: 'AI Accelerator & Cloud HPC Cluster Scaling' },
  { id: 'qubit-gates', unit: 4, topic: 1, title: 'Single Qubit Gate & Bloch Sphere Simulator' },
  { id: 'bell-entanglement', unit: 4, topic: 2, title: '2-Qubit Entanglement & Bell State Generator' },
  { id: 'quantum-algorithms', unit: 4, topic: 3, title: 'Deutsch-Jozsa & Grover Search Simulator' },
  { id: 'hybrid-vqe', unit: 4, topic: 4, title: 'Variational Quantum Eigensolver (VQE) Simulator' }
];

export function renderLabHub(currentType = 'hpc-throughput') {
  const currentLab = LAB_CATALOG.find(l => l.id === currentType);
  const unitLabs = LAB_CATALOG.filter(l => l.unit === currentLab.unit);
  
  return `<div class="lab-hub-header">
    <div class="eyebrow">Interactive Workspace · Enhanced Learning Mode</div>
    <h1>Virtual Laboratory Hub</h1>
    <p class="lede">Hands-on simulations with step-by-step tutorials, real-time feedback, and interactive challenges for faster, deeper learning.</p>
    
    <div class="lab-features-banner">
      <div class="lab-feature-item">
        <span class="feature-icon">🎯</span>
        <span>Step-by-Step Tutorials</span>
      </div>
      <div class="lab-feature-item">
        <span class="feature-icon">⚡</span>
        <span>Real-Time Feedback</span>
      </div>
      <div class="lab-feature-item">
        <span class="feature-icon">🏆</span>
        <span>Interactive Challenges</span>
      </div>
      <div class="lab-feature-item">
        <span class="feature-icon">📊</span>
        <span>Progress Tracking</span>
      </div>
    </div>
    
    <div class="lab-selector-enhanced">
      <div class="lab-selector-row">
        <label for="lab-select">Choose Experiment:</label>
        <select id="lab-select" onchange="location.hash='#/lab/'+this.value">
          ${LAB_CATALOG.map(l => `<option value="${l.id}" ${l.id === currentType ? 'selected' : ''}>Unit 0${l.unit} - Topic ${l.topic}: ${esc(l.title)}</option>`).join('')}
        </select>
      </div>
      <div class="lab-unit-quick-nav">
        <span>Quick Jump:</span>
        ${[1, 2, 3, 4].map(u => `<button class="unit-nav-btn ${currentLab.unit === u ? 'active' : ''}" onclick="location.hash='#/lab/${LAB_CATALOG.find(l => l.unit === u).id}'">Unit ${u}</button>`).join('')}
      </div>
    </div>
  </div>`;
}

export function renderLab(type = 'hpc-throughput', isStandalone = false) {
  let content = '';
  switch (type) {
    case 'hpc-throughput':
    case 'speedup':
      content = labHpcThroughput();
      break;
    case 'flynn-taxonomy':
      content = labFlynnTaxonomy();
      break;
    case 'cache-coherence':
      content = labCacheCoherence();
      break;
    case 'speedup-laws':
      content = labSpeedupLaws();
      break;
    case 'top500-cluster':
      content = labTop500Cluster();
      break;
    case 'openmp-loop':
    case 'parallel':
      content = labOpenmpLoop();
      break;
    case 'mpi-collective':
      content = labMpiCollective();
      break;
    case 'sync-deadlock':
      content = labSyncDeadlock();
      break;
    case 'load-balancing':
      content = labLoadBalancing();
      break;
    case 'cuda-basics':
      content = labCudaBasics();
      break;
    case 'memory-coalescing':
    case 'gpu':
      content = labMemoryCoalescing();
      break;
    case 'roofline-profiling':
      content = labRooflineProfiling();
      break;
    case 'ai-accelerator':
      content = labAiAccelerator();
      break;
    case 'qubit-gates':
      content = labQubitGates();
      break;
    case 'bell-entanglement':
    case 'quantum':
      content = labBellEntanglement();
      break;
    case 'quantum-algorithms':
      content = labQuantumAlgorithms();
      break;
    case 'hybrid-vqe':
      content = labHybridVqe();
      break;
    default:
      content = labHpcThroughput();
      break;
  }
  return isStandalone ? `${renderLabHub(type)}${content}` : content;
}

// 1. HPC Throughput & Benchmark Simulator (ENHANCED)
function labHpcThroughput() {
  const tutorialSteps = TUTORIAL_STEPS['hpc-throughput'] || [];
  const challenge = LAB_CHALLENGES['hpc-throughput'];
  
  return `<div class="lab-layout">
    <!-- Tutorial Progress Bar -->
    <div class="lab-tutorial-bar">
      <div class="tutorial-controls">
        <button class="tutorial-btn" data-tutorial-action="start" data-lab-id="hpc-throughput">
          <span>📚 Start Tutorial</span>
        </button>
        <div class="tutorial-progress" data-tutorial-progress style="display:none;">
          <span class="tutorial-step-indicator">Step <strong data-step-current>1</strong> of ${tutorialSteps.length}</span>
          <div class="tutorial-progress-bar">
            <div class="tutorial-progress-fill" data-progress-fill style="width:25%"></div>
          </div>
          <button class="tutorial-nav-btn" data-tutorial-action="next">Next →</button>
          <button class="tutorial-nav-btn secondary" data-tutorial-action="skip">Skip Tutorial</button>
        </div>
      </div>
      <div class="tutorial-hint" data-tutorial-hint style="display:none;">
        <span class="hint-icon">💡</span>
        <span data-hint-text>Start with 4 nodes and 1000 GFLOPs to see baseline performance</span>
      </div>
    </div>
    
    <div class="lab-panel">
      <div class="eyebrow">Unit 01 · Topic 01 Lab</div>
      <h2>HPC Throughput & Benchmark Simulator</h2>
      <p class="lede">Compare a standard PC vs a high-performance cluster. Adjust dataset size and node count to observe wall-clock speedup, achieved FLOPS, and power consumption.</p>
      
      <!-- Challenge Card -->
      <div class="lab-challenge-card" data-challenge-card>
        <div class="challenge-header">
          <span class="challenge-badge">🏆 Challenge</span>
          <h3>${challenge.title}</h3>
        </div>
        <p class="challenge-desc">${challenge.description}</p>
        <div class="challenge-status" data-challenge-status>
          <span class="status-indicator pending">⏳ Not Completed</span>
          <button class="hint-toggle-btn" data-action="toggle-hint">Show Hint</button>
        </div>
        <p class="challenge-hint" data-challenge-hint style="display:none;">💡 ${challenge.hint}</p>
      </div>
      
      <div class="control">
        <label for="hpc-nodes">Cluster Nodes <output data-hpc-nodes-val>16</output></label>
        <input id="hpc-nodes" data-hpc-nodes type="range" min="1" max="128" value="16" />
        <div class="control-tips">
          <span class="tip-badge">Typical HPC: 32-1024 nodes</span>
        </div>
      </div>
      
      <div class="control">
        <label for="hpc-ops">Problem Size (GFLOPs) <output data-hpc-ops-val>5000</output></label>
        <input id="hpc-ops" data-hpc-ops type="range" min="100" max="50000" step="100" value="5000" />
        <div class="control-tips">
          <span class="tip-badge">1 GFLOP = 10⁹ floating-point operations</span>
        </div>
      </div>
      
      <div class="formula">Throughput = N_ops / t_wall &nbsp; | &nbsp; Power = N_nodes × 0.35 kW</div>
      
      <div class="result-enhanced">
        <div class="result-card">
          <div class="result-icon">⏱️</div>
          <strong data-hpc-time>0.89s</strong>
          <span>wall-clock time</span>
          <div class="result-comparison">vs PC: 28.5s</div>
        </div>
        <div class="result-card highlight">
          <div class="result-icon">⚡</div>
          <strong data-hpc-flops>5.62 TFLOP/s</strong>
          <span>achieved throughput</span>
          <div class="result-comparison">32× faster</div>
        </div>
        <div class="result-card">
          <div class="result-icon">🔋</div>
          <strong data-hpc-power>5.6 kW</strong>
          <span>power draw</span>
          <div class="result-comparison">Efficiency: 1.0 GFLOPS/W</div>
        </div>
      </div>
      
      <div class="bar-chart" aria-label="Throughput comparison">
        <i data-hpc-bar-pc style="height:12%" title="Standard PC"></i>
        <i data-hpc-bar-hpc style="height:85%" title="HPC Cluster"></i>
      </div>
      <div class="chart-labels">
        <span>Standard PC</span>
        <span>HPC Cluster</span>
      </div>
      
      <!-- Key Insights Panel -->
      <div class="lab-insights-panel">
        <h4>📊 Key Insights</h4>
        <ul class="insights-list" data-insights-list>
          <li>🔹 Linear scaling: Doubling nodes nearly doubles throughput</li>
          <li>🔹 Strong scaling: Fixed problem completes faster with more nodes</li>
          <li>🔹 Power trade-off: More nodes = higher peak performance but more energy</li>
        </ul>
      </div>
    </div>
    
    <aside class="lab-panel">
      <div class="eyebrow">Learn by Doing</div>
      <h2>Experimenter Notes</h2>
      
      <!-- Real-time Feedback -->
      <div class="feedback-box" data-feedback-box>
        <p class="callout" data-hpc-feedback>As problem size grows, standard PC time scales linearly to hours, while the cluster maintains sub-second execution. Notice how power scales with node count!</p>
      </div>
      
      <!-- Interactive Metrics -->
      <div class="metrics-tracking">
        <h4>Your Progress</h4>
        <div class="metric-row">
          <span>Experiments Run:</span>
          <strong data-experiments-count>0</strong>
        </div>
        <div class="metric-row">
          <span>Best Throughput:</span>
          <strong data-best-throughput>0 TFLOP/s</strong>
        </div>
        <div class="metric-row">
          <span>Efficiency Score:</span>
          <strong data-efficiency-score>--</strong>
        </div>
      </div>
      
      <!-- Quick Reference -->
      <div class="quick-reference">
        <h4>Quick Reference</h4>
        <table class="ref-table">
          <tr>
            <td>1 GFLOP</td>
            <td>10⁹ operations</td>
          </tr>
          <tr>
            <td>1 TFLOP</td>
            <td>10¹² operations</td>
          </tr>
          <tr>
            <td>TOP500 #1</td>
            <td>~1 ExaFLOP (10¹⁸)</td>
          </tr>
        </table>
      </div>
      
      <button class="button primary" data-action="mark-lab" data-lab="hpc-throughput">Mark lab explored ✓</button>
      
      <!-- Compare Mode Toggle -->
      <button class="button secondary" data-action="toggle-compare" style="margin-top:0.5rem;">
        📊 Compare with Supercomputers
      </button>
    </aside>
  </div>`;
}

// 2. Flynn's Taxonomy Simulator (ENHANCED)
function labFlynnTaxonomy() {
  const tutorialSteps = TUTORIAL_STEPS['flynn-taxonomy'] || [];
  const challenge = LAB_CHALLENGES['flynn-taxonomy'] || {
    title: 'Challenge: Maximize Parallelism',
    description: 'Find the architecture that achieves 16× speedup for vector operations',
    hint: 'SIMD processes 16 data items with a single instruction broadcast',
    check: (arch) => arch === 'SIMD'
  };
  
  return `<div class="lab-layout">
    <!-- Tutorial Progress Bar -->
    <div class="lab-tutorial-bar">
      <div class="tutorial-controls">
        <button class="tutorial-btn" data-tutorial-action="start" data-lab-id="flynn-taxonomy">
          <span>📚 Start Tutorial</span>
        </button>
        <div class="tutorial-progress" data-tutorial-progress style="display:none;">
          <span class="tutorial-step-indicator">Step <strong data-step-current>1</strong> of ${tutorialSteps.length}</span>
          <div class="tutorial-progress-bar">
            <div class="tutorial-progress-fill" data-progress-fill style="width:25%"></div>
          </div>
          <button class="tutorial-nav-btn" data-tutorial-action="next">Next →</button>
          <button class="tutorial-nav-btn secondary" data-tutorial-action="skip">Skip Tutorial</button>
        </div>
      </div>
      <div class="tutorial-hint" data-tutorial-hint style="display:none;">
        <span class="hint-icon">💡</span>
        <span data-hint-text>Begin with SISD to understand serial execution</span>
      </div>
    </div>
    
    <div class="lab-panel">
      <div class="eyebrow">Unit 01 · Topic 02 Lab</div>
      <h2>Flynn's Taxonomy Execution Pipeline</h2>
      <p class="lede">Select an architectural class (SISD, SIMD, MISD, MIMD) and observe how instruction and data streams flow through processing units.</p>
      
      <!-- Challenge Card -->
      <div class="lab-challenge-card" data-challenge-card>
        <div class="challenge-header">
          <span class="challenge-badge">🏆 Challenge</span>
          <h3>${challenge.title}</h3>
        </div>
        <p class="challenge-desc">${challenge.description}</p>
        <div class="challenge-status" data-challenge-status>
          <span class="status-indicator pending">⏳ Not Completed</span>
          <button class="hint-toggle-btn" data-action="toggle-hint">Show Hint</button>
        </div>
        <p class="challenge-hint" data-challenge-hint style="display:none;">💡 ${challenge.hint}</p>
      </div>
      
      <div class="chip-row">
        <button class="button active" data-flynn="SISD">SISD · Serial</button>
        <button class="button" data-flynn="SIMD">SIMD · Vector/GPU</button>
        <button class="button" data-flynn="MISD">MISD · Redundant</button>
        <button class="button" data-flynn="MIMD">MIMD · Multi-Core</button>
      </div>
      
      <div class="flynn-canvas-box">
        <div class="flynn-diagram" data-flynn-diagram>
          <div class="stream-box inst">Instruction Stream: <strong data-flynn-inst>Single (PC)</strong></div>
          <div class="stream-box data">Data Stream: <strong data-flynn-data>Single (Scalar)</strong></div>
          <div class="proc-grid" data-flynn-procs><span class="proc-unit active">ALU 0</span></div>
        </div>
      </div>
      
      <div class="result-enhanced">
        <div class="result-card">
          <div class="result-icon">⏱️</div>
          <strong data-flynn-cycles>100 cycles</strong>
          <span>total cycles</span>
          <div class="result-comparison">Serial baseline</div>
        </div>
        <div class="result-card highlight">
          <div class="result-icon">🔢</div>
          <strong data-flynn-lanes>1 lane</strong>
          <span>active execution</span>
          <div class="result-comparison">Processing units</div>
        </div>
        <div class="result-card">
          <div class="result-icon">⚡</div>
          <strong data-flynn-speedup>1.00×</strong>
          <span>vector speedup</span>
          <div class="result-comparison">vs SISD baseline</div>
        </div>
      </div>
      
      <!-- Architecture Comparison Table -->
      <div class="lab-insights-panel">
        <h4>📊 Architecture Characteristics</h4>
        <table class="ref-table architecture-table">
          <tr>
            <td><strong>SISD</strong></td>
            <td>Single-core CPU, 1 instruction/cycle</td>
          </tr>
          <tr>
            <td><strong>SIMD</strong></td>
            <td>GPU/Vector units, 16 data lanes</td>
          </tr>
          <tr>
            <td><strong>MISD</strong></td>
            <td>Fault-tolerant, redundant computation</td>
          </tr>
          <tr>
            <td><strong>MIMD</strong></td>
            <td>Multi-core, independent instructions</td>
          </tr>
        </table>
      </div>
    </div>
    
    <aside class="lab-panel">
      <div class="eyebrow">Architecture Insight</div>
      <h2>What makes SIMD special?</h2>
      
      <!-- Real-time Feedback -->
      <div class="feedback-box" data-feedback-box>
        <p class="callout" data-flynn-feedback>SISD executes 1 instruction on 1 data item per cycle. Switch to SIMD to see 1 instruction broadcast across 16 data lanes simultaneously!</p>
      </div>
      
      <!-- Use Cases Panel -->
      <div class="metrics-tracking">
        <h4>Real-World Applications</h4>
        <div class="metric-row">
          <span>SISD:</span>
          <strong>Traditional CPUs</strong>
        </div>
        <div class="metric-row">
          <span>SIMD:</span>
          <strong>GPUs, AVX/SSE</strong>
        </div>
        <div class="metric-row">
          <span>MISD:</span>
          <strong>Space Shuttle</strong>
        </div>
        <div class="metric-row">
          <span>MIMD:</span>
          <strong>Server Clusters</strong>
        </div>
      </div>
      
      <!-- Quick Reference -->
      <div class="quick-reference">
        <h4>Key Metrics</h4>
        <table class="ref-table">
          <tr>
            <td>SIMD Speedup</td>
            <td>Up to 16×</td>
          </tr>
          <tr>
            <td>GPU Cores</td>
            <td>1000s of ALUs</td>
          </tr>
          <tr>
            <td>Modern CPU</td>
            <td>4-64 cores</td>
          </tr>
        </table>
      </div>
      
      <button class="button primary" data-action="mark-lab" data-lab="flynn-taxonomy">Mark lab explored ✓</button>
    </aside>
  </div>`;
}

// 3. Cache Coherence & MESI Simulator
function labCacheCoherence() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 01 · Topic 03 Lab</div><h2>Memory Hierarchy & MESI Cache Coherence</h2><p class="lede">Simulate read and write operations across multi-core L1/L2 caches to observe MESI protocol state transitions (Modified, Exclusive, Shared, Invalid).</p><div class="control"><label for="cache-pattern">Access Pattern</label><select id="cache-pattern" data-cache-pattern><option value="seq">Sequential Access (High Spatial Locality)</option><option value="stride">Strided Access (Medium Locality)</option><option value="rand">Random Access (Poor Locality)</option><option value="sharing">False Sharing (Thread Collision)</option></select></div><div class="control"><label for="cache-cores">Cores Sharing Memory <output data-cache-cores-val>4</output></label><input id="cache-cores" data-cache-cores type="range" min="1" max="8" value="4" /></div><div class="mesi-status-grid"><div class="mesi-core"><span>Core 0 Cache Line</span><strong data-mesi-c0 class="mesi-badge m-mod">Modified [M]</strong></div><div class="mesi-core"><span>Core 1 Cache Line</span><strong data-mesi-c1 class="mesi-badge m-inv">Invalid [I]</strong></div><div class="mesi-core"><span>Core 2 Cache Line</span><strong data-mesi-c2 class="mesi-badge m-inv">Invalid [I]</strong></div><div class="mesi-core"><span>Core 3 Cache Line</span><strong data-mesi-c3 class="mesi-badge m-inv">Invalid [I]</strong></div></div><div class="result"><div><strong data-cache-hit>93.8%</strong><span>L1 hit rate</span></div><div><strong data-cache-eat>2.4 ns</strong><span>effective access time</span></div><div><strong data-cache-bus>Low</strong><span>coherence bus traffic</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Cache Protocol</div><h2>Read the MESI State</h2><p class="callout" data-cache-feedback>Sequential access maximizes cache line utilization (64 bytes = 8 doubles). False sharing causes constant cache line invalidations ([I] state) across cores!</p><button class="button primary" data-action="mark-lab" data-lab="cache-coherence">Mark lab explored ✓</button></aside></div>`;
}

// 4. Speedup & Scalability Laws (Amdahl vs Gustafson) - ENHANCED
function labSpeedupLaws() {
  const tutorialSteps = TUTORIAL_STEPS['speedup-laws'] || [];
  const challenge = LAB_CHALLENGES['speedup-laws'];
  
  return `<div class="lab-layout">
    <!-- Tutorial Progress Bar -->
    <div class="lab-tutorial-bar">
      <div class="tutorial-controls">
        <button class="tutorial-btn" data-tutorial-action="start" data-lab-id="speedup-laws">
          <span>📚 Start Tutorial</span>
        </button>
        <div class="tutorial-progress" data-tutorial-progress style="display:none;">
          <span class="tutorial-step-indicator">Step <strong data-step-current>1</strong> of ${tutorialSteps.length}</span>
          <div class="tutorial-progress-bar">
            <div class="tutorial-progress-fill" data-progress-fill style="width:25%"></div>
          </div>
          <button class="tutorial-nav-btn" data-tutorial-action="next">Next →</button>
          <button class="tutorial-nav-btn secondary" data-tutorial-action="skip">Skip Tutorial</button>
        </div>
      </div>
      <div class="tutorial-hint" data-tutorial-hint style="display:none;">
        <span class="hint-icon">💡</span>
        <span data-hint-text>Set serial fraction to 5% and 16 processors</span>
      </div>
    </div>
    
    <div class="lab-panel">
      <div class="eyebrow">Unit 01 · Topic 04 Lab</div>
      <h2>Amdahl vs Gustafson Scalability Simulator</h2>
      <p class="lede">Compare Strong Scaling (fixed problem size) vs Weak Scaling (problem scales with processors). Sweep processors and serial fraction to visualize theoretical ceilings.</p>
      
      <!-- Challenge Card -->
      <div class="lab-challenge-card" data-challenge-card>
        <div class="challenge-header">
          <span class="challenge-badge">🏆 Challenge</span>
          <h3>${challenge.title}</h3>
        </div>
        <p class="challenge-desc">${challenge.description}</p>
        <div class="challenge-status" data-challenge-status>
          <span class="status-indicator pending">⏳ Not Completed</span>
          <button class="hint-toggle-btn" data-action="toggle-hint">Show Hint</button>
        </div>
        <p class="challenge-hint" data-challenge-hint style="display:none;">💡 ${challenge.hint}</p>
      </div>
      
      <div class="control">
        <label for="serial-frac">Serial Fraction (1 - f) <output data-serial-frac-val>5%</output></label>
        <input id="serial-frac" data-serial-frac type="range" min="1" max="40" value="5" />
        <div class="control-tips">
          <span class="tip-badge">Lower = more parallelizable code</span>
        </div>
      </div>
      
      <div class="control">
        <label for="law-procs">Processors (p) <output data-law-procs-val>64</output></label>
        <input id="law-procs" data-law-procs type="range" min="1" max="256" value="64" />
        <div class="control-tips">
          <span class="tip-badge">More processors ≠ always better (see Amdahl's Law)</span>
        </div>
      </div>
      
      <div class="formula">Amdahl: S = 1 / ((1-f) + f/p) &nbsp; | &nbsp; Gustafson: S = p - (1-f)(p-1)</div>
      
      <div class="result-enhanced">
        <div class="result-card highlight">
          <div class="result-icon">🔴</div>
          <strong data-amdahl-speedup>15.61×</strong>
          <span>Amdahl speedup</span>
          <div class="result-comparison">Strong Scaling (Fixed Size)</div>
        </div>
        <div class="result-card highlight">
          <div class="result-icon">🟢</div>
          <strong data-gustafson-speedup>60.85×</strong>
          <span>Gustafson speedup</span>
          <div class="result-comparison">Weak Scaling (Scaled Size)</div>
        </div>
        <div class="result-card">
          <div class="result-icon">📊</div>
          <strong data-law-efficiency>24.4%</strong>
          <span>parallel efficiency</span>
          <div class="result-comparison">Amdahl efficiency</div>
        </div>
      </div>
      
      <div class="model-chart">
        <i data-chart-amdahl style="height:24%" title="Amdahl"></i>
        <i data-chart-gustafson style="height:95%" title="Gustafson"></i>
      </div>
      <div class="chart-labels">
        <span>Amdahl (Strong)</span>
        <span>Gustafson (Weak)</span>
      </div>
      
      <!-- Theoretical Ceiling Info -->
      <div class="lab-insights-panel">
        <h4>📊 Key Insights</h4>
        <ul class="insights-list" data-insights-list>
          <li>🔹 Amdahl's Law: Serial code limits maximum speedup (ceiling = 1/(1-f))</li>
          <li>🔹 Gustafson's Law: Scaling problem size with processors achieves better speedup</li>
          <li>🔹 Efficiency drops as we add more processors due to serial bottleneck</li>
          <li>🔹 Real-world: Use Amdahl for fixed workloads, Gustafson for scalable problems</li>
        </ul>
      </div>
    </div>
    
    <aside class="lab-panel">
      <div class="eyebrow">Scalability Ceiling</div>
      <h2>Amdahl vs Gustafson</h2>
      
      <!-- Real-time Feedback -->
      <div class="feedback-box" data-feedback-box>
        <p class="callout" data-law-feedback>With a 5% serial fraction, Amdahl caps maximum possible speedup at 20× even with infinite cores. Gustafson shows weak scaling achieves 60.85× on 64 cores!</p>
      </div>
      
      <!-- Scalability Comparison -->
      <div class="metrics-tracking">
        <h4>Theoretical Limits</h4>
        <div class="metric-row">
          <span>Amdahl Ceiling:</span>
          <strong data-amdahl-ceiling>20×</strong>
        </div>
        <div class="metric-row">
          <span>Current Efficiency:</span>
          <strong data-current-eff>78%</strong>
        </div>
        <div class="metric-row">
          <span>Gustafson Advantage:</span>
          <strong data-gustafson-adv>3.9×</strong>
        </div>
      </div>
      
      <!-- Quick Reference -->
      <div class="quick-reference">
        <h4>Scalability Models</h4>
        <table class="ref-table">
          <tr>
            <td><strong>Strong Scaling</strong></td>
            <td>Fixed problem, more processors</td>
          </tr>
          <tr>
            <td><strong>Weak Scaling</strong></td>
            <td>Problem grows with processors</td>
          </tr>
          <tr>
            <td><strong>Efficiency</strong></td>
            <td>E = Speedup / Processors</td>
          </tr>
          <tr>
            <td><strong>Perfect</strong></td>
            <td>E = 100% (never achieved)</td>
          </tr>
        </table>
      </div>
      
      <button class="button primary" data-action="mark-lab" data-lab="speedup-laws">Mark lab explored ✓</button>
      
      <!-- Scenario Selector -->
      <button class="button secondary" data-action="toggle-scenario" style="margin-top:0.5rem;">
        🔬 Load Real-World Scenarios
      </button>
    </aside>
  </div>`;
}

// 5. TOP500 & Green500 Cluster Builder
function labTop500Cluster() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 01 · Topic 05 Lab</div><h2>TOP500 & Green500 Supercomputer Builder</h2><p class="lede">Configure a high-performance cluster node architecture. Balance CPU cores, GPU accelerators, interconnect, and liquid cooling to maximize GFLOPS/Watt.</p><div class="control"><label for="cluster-racks">Rack Count <output data-cluster-racks-val>32</output></label><input id="cluster-racks" data-cluster-racks type="range" min="1" max="100" value="32" /></div><div class="control"><label for="cluster-gpus">GPUs per Node <output data-cluster-gpus-val>4</output></label><input id="cluster-gpus" data-cluster-gpus type="range" min="0" max="8" value="4" /></div><div class="control"><label for="cluster-pue">Cooling PUE <output data-cluster-pue-val>1.15</output></label><input id="cluster-pue" data-cluster-pue type="range" min="105" max="200" step="5" value="115" /></div><div class="result"><div><strong data-cluster-rpeak>45.2 PFLOPS</strong><span>Rpeak (Theoretical)</span></div><div><strong data-cluster-rmax>36.1 PFLOPS</strong><span>Rmax (LINPACK)</span></div><div><strong data-cluster-efficiency>48.5 GFLOPS/W</strong><span>Green500 Score</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Supercomputer Benchmark</div><h2>LINPACK & Green500 Rank</h2><p class="callout" data-cluster-feedback>Adding GPU accelerators drastically boosts Rmax and GFLOPS/Watt. Lowering PUE towards 1.05 reduces non-computing cooling power overhead!</p><button class="button primary" data-action="mark-lab" data-lab="top500-cluster">Mark lab explored ✓</button></aside></div>`;
}

// 6. OpenMP Loop Scheduling Lab - ENHANCED
function labOpenmpLoop() {
  const tutorialSteps = TUTORIAL_STEPS['openmp-loop'] || [];
  const challenge = {
    title: 'Challenge: Perfect Load Balance',
    description: 'Achieve >95% parallel efficiency with high work imbalance (80%)',
    hint: 'Dynamic or guided scheduling adapts to uneven workloads better than static',
    check: (eff) => eff > 95
  };
  
  return `<div class="lab-layout">
    <!-- Tutorial Progress Bar -->
    <div class="lab-tutorial-bar">
      <div class="tutorial-controls">
        <button class="tutorial-btn" data-tutorial-action="start" data-lab-id="openmp-loop">
          <span>📚 Start Tutorial</span>
        </button>
        <div class="tutorial-progress" data-tutorial-progress style="display:none;">
          <span class="tutorial-step-indicator">Step <strong data-step-current>1</strong> of ${tutorialSteps.length}</span>
          <div class="tutorial-progress-bar">
            <div class="tutorial-progress-fill" data-progress-fill style="width:25%"></div>
          </div>
          <button class="tutorial-nav-btn" data-tutorial-action="next">Next →</button>
          <button class="tutorial-nav-btn secondary" data-tutorial-action="skip">Skip Tutorial</button>
        </div>
      </div>
      <div class="tutorial-hint" data-tutorial-hint style="display:none;">
        <span class="hint-icon">💡</span>
        <span data-hint-text>Start with 4 threads and static scheduling</span>
      </div>
    </div>
    
    <div class="lab-panel">
      <div class="eyebrow">Unit 02 · Topic 01 Lab</div>
      <h2>OpenMP Worksharing & Loop Scheduling</h2>
      <p class="lede">Compare static, dynamic, and guided thread chunk allocation on uniform vs imbalanced loop iterations.</p>
      
      <!-- Challenge Card -->
      <div class="lab-challenge-card" data-challenge-card>
        <div class="challenge-header">
          <span class="challenge-badge">🏆 Challenge</span>
          <h3>${challenge.title}</h3>
        </div>
        <p class="challenge-desc">${challenge.description}</p>
        <div class="challenge-status" data-challenge-status>
          <span class="status-indicator pending">⏳ Not Completed</span>
          <button class="hint-toggle-btn" data-action="toggle-hint">Show Hint</button>
        </div>
        <p class="challenge-hint" data-challenge-hint style="display:none;">💡 ${challenge.hint}</p>
      </div>
      
      <div class="control">
        <label for="omp-threads">Threads <output data-omp-threads-val>4</output></label>
        <input id="omp-threads" data-omp-threads type="range" min="1" max="16" value="4" />
        <div class="control-tips">
          <span class="tip-badge">Typically = CPU cores (avoid oversubscription)</span>
        </div>
      </div>
      
      <div class="control">
        <label for="omp-sched">Schedule Policy</label>
        <select id="omp-sched" data-omp-sched>
          <option value="static">omp schedule(static, chunk=10)</option>
          <option value="dynamic">omp schedule(dynamic, chunk=4)</option>
          <option value="guided">omp schedule(guided)</option>
        </select>
        <div class="control-tips">
          <span class="tip-badge">Static=fast, Dynamic=balanced, Guided=adaptive</span>
        </div>
      </div>
      
      <div class="control">
        <label for="omp-imbalance">Work Imbalance Factor <output data-omp-imbalance-val>50%</output></label>
        <input id="omp-imbalance" data-omp-imbalance type="range" min="0" max="100" value="50" />
        <div class="control-tips">
          <span class="tip-badge">0%=uniform, 100%=highly variable iteration times</span>
        </div>
      </div>
      
      <div class="result-enhanced">
        <div class="result-card">
          <div class="result-icon">⏱️</div>
          <strong data-omp-time>0.28s</strong>
          <span>relative time</span>
          <div class="result-comparison">Lower is better</div>
        </div>
        <div class="result-card highlight">
          <div class="result-icon">⚡</div>
          <strong data-omp-speedup>3.57×</strong>
          <span>speedup</span>
          <div class="result-comparison">vs serial execution</div>
        </div>
        <div class="result-card">
          <div class="result-icon">📊</div>
          <strong data-omp-eff>89.3%</strong>
          <span>parallel efficiency</span>
          <div class="result-comparison">Speedup / Threads</div>
        </div>
      </div>
      
      <div class="bar-chart" aria-label="Thread load distribution">
        <i data-omp-t0 style="height:90%" title="Thread 0"></i>
        <i data-omp-t1 style="height:85%" title="Thread 1"></i>
        <i data-omp-t2 style="height:88%" title="Thread 2"></i>
        <i data-omp-t3 style="height:82%" title="Thread 3"></i>
      </div>
      <div class="chart-labels">
        <span>Thread 0</span>
        <span>Thread 1</span>
        <span>Thread 2</span>
        <span>Thread 3</span>
      </div>
      
      <!-- Scheduling Comparison -->
      <div class="lab-insights-panel">
        <h4>📊 Scheduling Strategies</h4>
        <ul class="insights-list">
          <li>🔹 <strong>Static:</strong> Low overhead, but poor load balance with imbalanced loops</li>
          <li>🔹 <strong>Dynamic:</strong> Adaptive chunks, good for variable workloads</li>
          <li>🔹 <strong>Guided:</strong> Large chunks first, then smaller for fine-tuning</li>
          <li>🔹 Imbalance causes idle threads (wasted CPU cycles)</li>
        </ul>
      </div>
    </div>
    
    <aside class="lab-panel">
      <div class="eyebrow">OpenMP Code Lens</div>
      <h2>Pragma Inspection</h2>
      
      <pre class="code-block"><code>#pragma omp parallel for schedule(dynamic, 4)
for (int i = 0; i &lt; N; i++) {
    compute_heavy_work(i);
}</code></pre>
      
      <!-- Real-time Feedback -->
      <div class="feedback-box" data-feedback-box>
        <p class="callout" data-omp-feedback>Dynamic scheduling prevents fast threads from idling when iteration execution times vary wildly!</p>
      </div>
      
      <!-- Performance Metrics -->
      <div class="metrics-tracking">
        <h4>Load Balance Metrics</h4>
        <div class="metric-row">
          <span>Max Thread Time:</span>
          <strong data-max-thread-time>--</strong>
        </div>
        <div class="metric-row">
          <span>Min Thread Time:</span>
          <strong data-min-thread-time>--</strong>
        </div>
        <div class="metric-row">
          <span>Imbalance Ratio:</span>
          <strong data-imbalance-ratio>--</strong>
        </div>
      </div>
      
      <!-- Quick Reference -->
      <div class="quick-reference">
        <h4>OpenMP Directives</h4>
        <table class="ref-table">
          <tr>
            <td><code>parallel for</code></td>
            <td>Fork threads + distribute loop</td>
          </tr>
          <tr>
            <td><code>num_threads(n)</code></td>
            <td>Set thread count</td>
          </tr>
          <tr>
            <td><code>schedule(kind)</code></td>
            <td>Set loop distribution policy</td>
          </tr>
          <tr>
            <td><code>nowait</code></td>
            <td>Skip barrier synchronization</td>
          </tr>
        </table>
      </div>
      
      <button class="button primary" data-action="mark-lab" data-lab="openmp-loop">Mark lab explored ✓</button>
    </aside>
  </div>`;
}

// 7. MPI Collective Communication Simulator
function labMpiCollective() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 02 · Topic 02 Lab</div><h2>MPI Collective Communication & Topology</h2><p class="lede">Simulate distributed memory communication across MPI process topologies (Ring, Binary Tree, Hypercube) for collective calls like MPI_Bcast and MPI_Allreduce.</p><div class="control"><label for="mpi-procs">MPI Processes (np) <output data-mpi-procs-val>16</output></label><input id="mpi-procs" data-mpi-procs type="range" min="2" max="64" value="16" /></div><div class="control"><label for="mpi-op">Collective Routine</label><select id="mpi-op" data-mpi-op><option value="bcast">MPI_Bcast (Root Broadcast)</option><option value="scatter">MPI_Scatter (Divide Data)</option><option value="gather">MPI_Gather (Collect Data)</option><option value="allreduce">MPI_Allreduce (Ring Sum Reduction)</option></select></div><div class="control"><label for="mpi-msg">Payload Size <output data-mpi-msg-val>4 MB</output></label><input id="mpi-msg" data-mpi-msg type="range" min="1" max="64" value="4" /></div><div class="result"><div><strong data-mpi-hops">4 steps</strong><span>tree depth / hops</span></div><div><strong data-mpi-comm>1.42 ms</strong><span>comm latency</span></div><div><strong data-mpi-bandwidth>2.82 GB/s</strong><span>effective transfer</span></div></div></div><aside class="lab-panel"><div class="eyebrow">MPI Ring & Tree Topology</div><h2>LogP Latency Model</h2><p class="callout" data-mpi-feedback>Tree-based MPI_Bcast completes in O(log2 p) steps instead of O(p) naive sequential sends!</p><button class="button primary" data-action="mark-lab" data-lab="mpi-collective">Mark lab explored ✓</button></aside></div>`;
}

// 8. Race Condition & Mutex Deadlock Sandbox
function labSyncDeadlock() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 02 · Topic 03 Lab</div><h2>Race Condition, Mutex & Deadlock Sandbox</h2><p class="lede">Simulate multi-threaded access to shared variables with and without synchronization. Test lock order protocols to trigger or prevent circular wait deadlocks.</p><div class="chip-row"><button class="button active" data-sync-mode="race">No Lock (Race Condition)</button><button class="button" data-sync-mode="mutex">Mutex Lock (Safe)</button><button class="button" data-sync-mode="deadlock">Lock Inversion (Deadlock)</button><button class="button" data-sync-mode="ordered">Ordered Lock (Safe)</button></div><div class="sync-status-box"><div class="sync-state-badge" data-sync-badge>RACE DETECTED: Counter value is non-deterministic!</div><div class="result"><div><strong data-sync-counter>1,482,910</strong><span>counter (expected 2,000,000)</span></div><div><strong data-sync-contention>0.0 ms</strong><span>lock waiting time</span></div><div><strong data-sync-status>DATA RACE</strong><span>concurrency state</span></div></div></div></div><aside class="lab-panel"><div class="eyebrow">Concurrency Diagnostics</div><h2>ThreadSanitizer Output</h2><p class="callout" data-sync-feedback>Without a mutex, concurrent increments read stale data, resulting in missing counter updates. Switch to Mutex Lock for deterministic correctness!</p><button class="button primary" data-action="mark-lab" data-lab="sync-deadlock">Mark lab explored ✓</button></aside></div>`;
}

// 9. Dynamic Load Balancing & Work Stealing Lab
function labLoadBalancing() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 02 · Topic 04 Lab</div><h2>Dynamic Load Balancing & Work Stealing</h2><p class="lede">Simulate task decomposition and work-stealing queues across worker processes handling variable-length task burdens.</p><div class="control"><label for="lb-strategy">Load Strategy</label><select id="lb-strategy" data-lb-strategy><option value="static">Static Round-Robin (No Rebalancing)</option><option value="queue">Central Work Queue (Global Lock)</option><option value="stealing">Decentralized Work Stealing (Lock-Free)</option></select></div><div class="control"><label for="lb-variance">Task Size Variance <output data-lb-variance-val>High</output></label><input id="lb-variance" data-lb-variance type="range" min="1" max="3" value="3" /></div><div class="result"><div><strong data-lb-makespan>142 ms</strong><span>total makespan</span></div><div><strong data-lb-idle>4.2%</strong><span>worker idle time</span></div><div><strong data-lb-imbalance>0.05</strong><span>imbalance ratio (L)</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Work Stealing Pattern</div><h2>Deque Optimization</h2><p class="callout" data-lb-feedback>Work stealing allows idle worker threads to steal tasks from the tail of busy workers' deques, eliminating central queue contention!</p><button class="button primary" data-action="mark-lab" data-lab="load-balancing">Mark lab explored ✓</button></aside></div>`;
}

// 10. CUDA Grid/Block/Thread Hierarchy - ENHANCED
function labCudaBasics() {
  const tutorialSteps = TUTORIAL_STEPS['cuda-basics'] || [];
  const challenge = LAB_CHALLENGES['cuda-basics'];
  
  return `<div class="lab-layout">
    <!-- Tutorial Progress Bar -->
    <div class="lab-tutorial-bar">
      <div class="tutorial-controls">
        <button class="tutorial-btn" data-tutorial-action="start" data-lab-id="cuda-basics">
          <span>📚 Start Tutorial</span>
        </button>
        <div class="tutorial-progress" data-tutorial-progress style="display:none;">
          <span class="tutorial-step-indicator">Step <strong data-step-current>1</strong> of ${tutorialSteps.length}</span>
          <div class="tutorial-progress-bar">
            <div class="tutorial-progress-fill" data-progress-fill style="width:25%"></div>
          </div>
          <button class="tutorial-nav-btn" data-tutorial-action="next">Next →</button>
          <button class="tutorial-nav-btn secondary" data-tutorial-action="skip">Skip Tutorial</button>
        </div>
      </div>
      <div class="tutorial-hint" data-tutorial-hint style="display:none;">
        <span class="hint-icon">💡</span>
        <span data-hint-text>Set blocks to 32 and threads to 256</span>
      </div>
    </div>
    
    <div class="lab-panel">
      <div class="eyebrow">Unit 03 · Topic 01 Lab</div>
      <h2>CUDA Execution Hierarchy Visualizer</h2>
      <p class="lede">Map a 1D/2D grid of thread blocks onto Streaming Multiprocessors (SMs). Observe thread indexing <code>blockIdx</code> and <code>threadIdx</code> hardware dispatch.</p>
      
      <!-- Challenge Card -->
      <div class="lab-challenge-card" data-challenge-card>
        <div class="challenge-header">
          <span class="challenge-badge">🏆 Challenge</span>
          <h3>${challenge.title}</h3>
        </div>
        <p class="challenge-desc">${challenge.description}</p>
        <div class="challenge-status" data-challenge-status>
          <span class="status-indicator pending">⏳ Not Completed</span>
          <button class="hint-toggle-btn" data-action="toggle-hint">Show Hint</button>
        </div>
        <p class="challenge-hint" data-challenge-hint style="display:none;">💡 ${challenge.hint}</p>
      </div>
      
      <div class="control">
        <label for="cuda-blocks">Grid Dim (Blocks) <output data-cuda-blocks-val>64</output></label>
        <input id="cuda-blocks" data-cuda-blocks type="range" min="1" max="256" value="64" />
        <div class="control-tips">
          <span class="tip-badge">More blocks = better GPU utilization</span>
        </div>
      </div>
      
      <div class="control">
        <label for="cuda-threads">Block Dim (Threads/Block) <output data-cuda-threads-val>256</output></label>
        <input id="cuda-threads" data-cuda-threads type="range" min="32" max="1024" step="32" value="256" />
        <div class="control-tips">
          <span class="tip-badge">Must be multiple of warp size (32)</span>
        </div>
      </div>
      
      <div class="result-enhanced">
        <div class="result-card highlight">
          <div class="result-icon">🧵</div>
          <strong data-cuda-total-threads>16,384</strong>
          <span>total threads</span>
          <div class="result-comparison">Grid × Block dimensions</div>
        </div>
        <div class="result-card">
          <div class="result-icon">📦</div>
          <strong data-cuda-warps-per-block>8 warps</strong>
          <span>warps / block</span>
          <div class="result-comparison">Threads / 32</div>
        </div>
        <div class="result-card">
          <div class="result-icon">📊</div>
          <strong data-cuda-occupancy>100%</strong>
          <span>theoretical SM occupancy</span>
          <div class="result-comparison">Utilization estimate</div>
        </div>
      </div>
      
      <!-- CUDA Hierarchy Visualization -->
      <div class="lab-insights-panel">
        <h4>📊 CUDA Execution Model</h4>
        <ul class="insights-list">
          <li>🔹 <strong>Grid:</strong> Collection of thread blocks (1D, 2D, or 3D)</li>
          <li>🔹 <strong>Block:</strong> Group of threads (up to 1024) sharing memory</li>
          <li>🔹 <strong>Warp:</strong> 32 threads executing in lockstep (SIMT)</li>
          <li>🔹 <strong>SM:</strong> Streaming Multiprocessor (hardware unit)</li>
          <li>🔹 Optimal: Threads/block = multiple of 32, blocks >> SMs</li>
        </ul>
      </div>
    </div>
    
    <aside class="lab-panel">
      <div class="eyebrow">CUDA Code Lens</div>
      <h2>Thread Index Formula</h2>
      
      <pre class="code-block"><code>// Global thread ID
int tid = blockIdx.x * blockDim.x
        + threadIdx.x;

// 2D indexing
int row = blockIdx.y * blockDim.y + threadIdx.y;
int col = blockIdx.x * blockDim.x + threadIdx.x;</code></pre>
      
      <!-- Real-time Feedback -->
      <div class="feedback-box" data-feedback-box>
        <p class="callout" data-cuda-feedback>Threads execute in SIMT groups of 32 called warps. Setting 256 threads/block yields 8 full warps per block!</p>
      </div>
      
      <!-- GPU Specifications -->
      <div class="metrics-tracking">
        <h4>Typical GPU Specs</h4>
        <div class="metric-row">
          <span>NVIDIA A100:</span>
          <strong>108 SMs</strong>
        </div>
        <div class="metric-row">
          <span>Max Threads/SM:</span>
          <strong>2048</strong>
        </div>
        <div class="metric-row">
          <span>Max Blocks/SM:</span>
          <strong>32</strong>
        </div>
        <div class="metric-row">
          <span>Warp Size:</span>
          <strong>32 threads</strong>
        </div>
      </div>
      
      <!-- Quick Reference -->
      <div class="quick-reference">
        <h4>CUDA Built-ins</h4>
        <table class="ref-table">
          <tr>
            <td><code>blockIdx.x/y/z</code></td>
            <td>Block index in grid</td>
          </tr>
          <tr>
            <td><code>threadIdx.x/y/z</code></td>
            <td>Thread index in block</td>
          </tr>
          <tr>
            <td><code>blockDim.x/y/z</code></td>
            <td>Threads per block</td>
          </tr>
          <tr>
            <td><code>gridDim.x/y/z</code></td>
            <td>Blocks in grid</td>
          </tr>
        </table>
      </div>
      
      <button class="button primary" data-action="mark-lab" data-lab="cuda-basics">Mark lab explored ✓</button>
      
      <!-- Kernel Launch Calculator -->
      <button class="button secondary" data-action="launch-calculator" style="margin-top:0.5rem;">
        🧮 Kernel Launch Calculator
      </button>
    </aside>
  </div>`;
}

// 11. Memory Coalescing & Bank Conflict Analyzer
function labMemoryCoalescing() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 03 · Topic 02 Lab</div><h2>Memory Coalescing & Bank Conflict Analyzer</h2><p class="lede">Simulate 32-thread warp access patterns. Adjust stride to see how uncoalesced global memory reads or shared memory bank conflicts impair throughput.</p><div class="control"><label for="coalesce-stride">Global Access Stride <output data-coalesce-stride-val>1 (Coalesced)</output></label><input id="coalesce-stride" data-coalesce-stride type="range" min="1" max="16" value="1" /></div><div class="control"><label for="smem-padding">Shared Memory Padding <output data-smem-padding-val>0 (Conflict Risk)</output></label><input id="smem-padding" data-smem-padding type="range" min="0" max="4" value="0" /></div><div class="result"><div><strong data-coalesce-tx>1 tx</strong><span>memory transactions / warp</span></div><div><strong data-coalesce-bw>910 GB/s</strong><span>achieved bandwidth</span></div><div><strong data-coalesce-conflicts">1-way</strong><span>bank conflicts</span></div></div><div class="bar-chart" aria-label="Bandwidth efficiency"><i data-coalesce-bar style="height:95%"></i></div></div><aside class="lab-panel"><div class="eyebrow">Profiler Note</div><h2>Memory Access Pattern</h2><p class="callout" data-coalesce-feedback>Stride 1 allows all 32 threads in a warp to be served by a single 128-byte cache transaction. Stride 16 requires 16 separate transactions!</p><button class="button primary" data-action="mark-lab" data-lab="memory-coalescing">Mark lab explored ✓</button></aside></div>`;
}

// 12. CUDA Roofline Model & Profiling Sandbox
function labRooflineProfiling() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 03 · Topic 03 Lab</div><h2>CUDA Roofline Model & Profiling Sandbox</h2><p class="lede">Plot Operational Intensity (FLOP/byte) against GPU Peak Memory Bandwidth and Peak FLOPS to determine if a kernel is memory-bound or compute-bound.</p><div class="control"><label for="roofline-intensity">Operational Intensity (FLOP/byte) <output data-roofline-intensity-val>4.0</output></label><input id="roofline-intensity" data-roofline-intensity type="range" min="1" max="100" step="1" value="4" /></div><div class="result"><div><strong data-roofline-region>Memory-Bound</strong><span>limiting bottleneck</span></div><div><strong data-roofline-perf>3.60 TFLOP/s</strong><span>attainable performance</span></div><div><strong data-roofline-sol>75% SOL Memory</strong><span>speed-of-light utilization</span></div></div><div class="roofline-plot-box"><svg class="roofline-svg" viewBox="0 0 400 180"><polyline points="20,160 180,40 380,40" fill="none" stroke="var(--cyan)" stroke-width="3"/><circle data-roofline-dot cx="90" cy="110" r="7" fill="var(--orange)"/><text x="25" y="30" fill="var(--muted)" font-size="10">Peak Compute Roof</text><text x="260" y="150" fill="var(--muted)" font-size="10">Memory Bandwidth Slope</text></svg></div></div><aside class="lab-panel"><div class="eyebrow">Profiler Signal</div><h2>Nsight Profiler Insight</h2><p class="callout" data-roofline-feedback>At 4 FLOP/byte, the kernel sits under the memory bandwidth ceiling slope. Increasing computation reuse pushes the kernel into the compute-bound plateau!</p><button class="button primary" data-action="mark-lab" data-lab="roofline-profiling">Mark lab explored ✓</button></aside></div>`;
}

// 13. AI Accelerator & Cloud HPC Simulator
function labAiAccelerator() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 03 · Topic 04 Lab</div><h2>AI Accelerator & Cloud HPC Cluster Simulator</h2><p class="lede">Simulate mixed-precision Tensor Core (FP32 vs FP16 vs INT8) throughput and multi-GPU scaling over NVLink vs PCIe interconnects.</p><div class="control"><label for="ai-precision">Precision Mode</label><select id="ai-precision" data-ai-precision><option value="fp32">FP32 Single Precision (CUDA Cores)</option><option value="fp16">FP16 Mixed Precision (Tensor Cores)</option><option value="int8">INT8 Quantized (Tensor Cores)</option></select></div><div class="control"><label for="ai-gpus">Accelerator GPU Count <output data-ai-gpus-val>8</output></label><input id="ai-gpus" data-ai-gpus type="range" min="1" max="64" value="8" /></div><div class="result"><div><strong data-ai-flops>2,496 TFLOP/s</strong><span>aggregate throughput</span></div><div><strong data-ai-speedup>7.8×</strong><span>multi-GPU speedup</span></div><div><strong data-ai-train-time>14.2 min</strong><span>training time / epoch</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Tensor Core Accelerator</div><h2>Mixed Precision Gain</h2><p class="callout" data-ai-feedback>Switching from FP32 to FP16 Tensor Cores provides up to 8x matrix multiply speedup while keeping high precision through FP32 accumulation!</p><button class="button primary" data-action="mark-lab" data-lab="ai-accelerator">Mark lab explored ✓</button></aside></div>`;
}

// 14. Single Qubit Bloch Sphere Simulator
function labQubitGates() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 04 · Topic 01 Lab</div><h2>Single Qubit & Bloch Sphere Visualizer</h2><p class="lede">Apply quantum logic gates (H, X, Y, Z, S, T) to rotate the state vector |ψ⟩ = α|0⟩ + β|1⟩ on the 3D Bloch sphere.</p><div class="chip-row"><button class="button" data-gate="h">H · Hadamard</button><button class="button" data-gate="x">X · Bit Flip</button><button class="button" data-gate="z">Z · Phase Flip</button><button class="button" data-gate="s">S · Phase π/2</button><button class="button" data-gate="t">T · Phase π/4</button><button class="button" data-action="reset-circuit">Reset |0⟩</button></div><div class="bloch-box"><svg class="bloch-svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="75" fill="none" stroke="var(--line)" stroke-width="2"/><ellipse cx="100" cy="100" rx="75" ry="25" fill="none" stroke="var(--line)" stroke-linecap="round" stroke-dasharray="4,4"/><line x1="100" y1="25" x2="100" y2="175" stroke="var(--line)" stroke-width="1.5"/><line data-bloch-vec x1="100" y1="100" x2="100" y2="25" stroke="var(--cyan)" stroke-width="3.5" marker-end="url(#arrow)"/><text x="95" y="18" fill="var(--cyan)" font-weight="800">|0⟩</text><text x="95" y="195" fill="var(--pink)" font-weight="800">|1⟩</text></svg></div><div class="result"><div><strong data-state-label>|0⟩</strong><span>quantum state</span></div><div><strong data-state-prob0>100%</strong><span>P(|0⟩)</span></div><div><strong data-state-prob1>0%</strong><span>P(|1⟩)</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Quantum State Vector</div><h2>Amplitude & Phase</h2><p class="callout" data-quantum-feedback>Applying H transforms |0⟩ into equal superposition (|0⟩ + |1⟩)/√2 with 50% probability of measuring 0 or 1!</p><button class="button primary" data-action="mark-lab" data-lab="qubit-gates">Mark lab explored ✓</button></aside></div>`;
}

// 15. 2-Qubit Bell State Generator
function labBellEntanglement() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 04 · Topic 02 Lab</div><h2>2-Qubit Entanglement & Bell State Generator</h2><p class="lede">Construct 2-qubit circuits to produce the four maximally entangled Bell states (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩).</p><div class="chip-row"><button class="button" data-gate="h">H (q₀)</button><button class="button" data-gate="x">X (q₀)</button><button class="button" data-gate="cnot">CNOT (q₀ → q₁)</button><button class="button" data-gate="measure">Measure</button><button class="button" data-action="reset-circuit">Reset</button></div><div class="quantum-register"><div class="wire"><span>q₀</span><i data-wire-a></i></div><div class="wire"><span>q₁</span><i data-wire-b></i></div></div><div class="result"><div><strong data-state-label>|00⟩</strong><span>current state</span></div><div><strong data-state-probability>100%</strong><span>dominant probability</span></div><div><strong data-measurement>ready</strong><span>measurement</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Entanglement Concurrence</div><h2>Bell Correlation</h2><p class="callout" data-quantum-feedback>Applying H to q₀ and CNOT between q₀ and q₁ creates the maximally entangled Bell state (|00⟩ + |11⟩)/√2!</p><button class="button primary" data-action="mark-lab" data-lab="bell-entanglement">Mark lab explored ✓</button></aside></div>`;
}

// 16. Quantum Algorithm Simulator (Deutsch-Jozsa & Grover)
function labQuantumAlgorithms() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 04 · Topic 03 Lab</div><h2>Deutsch-Jozsa & Grover Search Simulator</h2><p class="lede">Step through Grover's algorithm to observe phase inversion and constructive amplitude amplification searching N = 2ⁿ items.</p><div class="control"><label for="grover-oracle">Grover Target Item</label><select id="grover-oracle" data-grover-oracle><option value="0">Item |00⟩ (Index 0)</option><option value="1">Item |01⟩ (Index 1)</option><option value="2" selected>Item |10⟩ (Index 2)</option><option value="3">Item |11⟩ (Index 3)</option></select></div><div class="control"><label for="grover-steps">Amplification Steps <output data-grover-steps-val>1</output></label><input id="grover-steps" data-grover-steps type="range" min="0" max="3" value="1" /></div><div class="result"><div><strong data-grover-prob>100%</strong><span>success probability</span></div><div><strong data-grover-speedup>2.00×</strong><span>quantum speedup</span></div><div><strong data-grover-queries>1 query</strong><span>oracle calls</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Amplitude Amplification</div><h2>Oracle Phase Flip</h2><p class="callout" data-grover-feedback>Grover's oracle flips the phase of the target item, and the diffusion operator reflects amplitudes about the mean, boosting target probability!</p><button class="button primary" data-action="mark-lab" data-lab="quantum-algorithms">Mark lab explored ✓</button></aside></div>`;
}

// 17. Hybrid Quantum-Classical VQE Simulator
function labHybridVqe() {
  return `<div class="lab-layout"><div class="lab-panel"><div class="eyebrow">Unit 04 · Topic 04 Lab</div><h2>Variational Quantum Eigensolver (VQE) Simulator</h2><p class="lede">Simulate the NISQ hybrid quantum-classical loop. Tune ansatz parameter θ to find the ground state energy of a hydrogen molecule (H₂).</p><div class="control"><label for="vqe-theta">Ansatz Parameter θ <output data-vqe-theta-val>0.78 rad</output></label><input id="vqe-theta" data-vqe-theta type="range" min="0" max="314" value="78" /></div><div class="control"><label for="vqe-optimizer">Classical Optimizer</label><select id="vqe-optimizer" data-vqe-optimizer><option value="cobyla">COBYLA (Noise Tolerant)</option><option value="gd">Gradient Descent</option></select></div><div class="result"><div><strong data-vqe-energy>-1.137 Hartree</strong><span>calculated ⟨E(θ)⟩</span></div><div><strong data-vqe-exact>-1.137 Hartree</strong><span>exact ground energy</span></div><div><strong data-vqe-error">0.000 Hartree</strong><span>energy error ΔE</span></div></div></div><aside class="lab-panel"><div class="eyebrow">Variational Principle</div><h2>Quantum-Classical Loop</h2><p class="callout" data-vqe-feedback>By Rayleigh-Ritz variational principle, ⟨E(θ)⟩ ≥ E₀. The classical optimizer tunes θ until minimum ground energy is found!</p><button class="button primary" data-action="mark-lab" data-lab="hybrid-vqe">Mark lab explored ✓</button></aside></div>`;
}