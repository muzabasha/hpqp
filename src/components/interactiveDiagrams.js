// Interactive SVG Diagrams for Visual Learning
// Each diagram is an interactive, animated visualization that explains core concepts

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Unit 1, Topic 1: HPC Motivation - Parallel vs Sequential Processing
export function diagramParallelProcessing() {
  return `<div class="interactive-diagram" data-diagram="parallel-processing">
    <div class="diagram-header">
      <h4>Sequential vs Parallel Execution Model</h4>
      <div class="diagram-controls">
        <button class="button small" data-diagram-action="play">▶ Animate</button>
        <button class="button small" data-diagram-action="reset">⟲ Reset</button>
      </div>
    </div>
    <svg viewBox="0 0 800 400" class="diagram-svg">
      <!-- Sequential Processing (Top Half) -->
      <text x="20" y="30" class="diagram-label">Sequential (1 Worker):</text>
      <rect x="20" y="50" width="760" height="60" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
      <g class="sequential-tasks">
        <rect class="task-block task-1" x="30" y="60" width="140" height="40" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="4"/>
        <text x="100" y="85" text-anchor="middle" class="task-label">Task 1</text>
        <rect class="task-block task-2" x="180" y="60" width="140" height="40" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="4" opacity="0.3"/>
        <text x="250" y="85" text-anchor="middle" class="task-label">Task 2</text>
        <rect class="task-block task-3" x="330" y="60" width="140" height="40" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="4" opacity="0.3"/>
        <text x="400" y="85" text-anchor="middle" class="task-label">Task 3</text>
        <rect class="task-block task-4" x="480" y="60" width="140" height="40" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="4" opacity="0.3"/>
        <text x="550" y="85" text-anchor="middle" class="task-label">Task 4</text>
      </g>
      <text x="650" y="85" class="diagram-time" data-seq-time>Time: 4 units</text>
      
      <!-- Parallel Processing (Bottom Half) -->
      <text x="20" y="160" class="diagram-label">Parallel (4 Workers):</text>
      <rect x="20" y="180" width="760" height="180" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
      <g class="parallel-tasks">
        <g class="worker-1">
          <text x="100" y="200" text-anchor="middle" class="worker-label">Worker 1</text>
          <rect class="task-block" x="30" y="210" width="140" height="40" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="4"/>
          <text x="100" y="235" text-anchor="middle" class="task-label">Task 1</text>
        </g>
        <g class="worker-2">
          <text x="250" y="200" text-anchor="middle" class="worker-label">Worker 2</text>
          <rect class="task-block" x="180" y="210" width="140" height="40" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="4" opacity="0.3"/>
          <text x="250" y="235" text-anchor="middle" class="task-label">Task 2</text>
        </g>
        <g class="worker-3">
          <text x="400" y="200" text-anchor="middle" class="worker-label">Worker 3</text>
          <rect class="task-block" x="330" y="210" width="140" height="40" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="4" opacity="0.3"/>
          <text x="400" y="235" text-anchor="middle" class="task-label">Task 3</text>
        </g>
        <g class="worker-4">
          <text x="550" y="200" text-anchor="middle" class="worker-label">Worker 4</text>
          <rect class="task-block" x="480" y="210" width="140" height="40" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="4" opacity="0.3"/>
          <text x="550" y="235" text-anchor="middle" class="task-label">Task 4</text>
        </g>
      </g>
      <text x="650" y="235" class="diagram-time" data-par-time>Time: 1 unit</text>
      
      <!-- Speedup Arrow -->
      <path d="M 700 120 L 700 170" stroke="var(--cyan)" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
      <text x="720" y="150" class="speedup-label" fill="var(--cyan)">4× Speedup!</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="var(--cyan)"/>
        </marker>
      </defs>
    </svg>
    <div class="diagram-insight">
      <strong>Key Insight:</strong> Parallel processing divides work across multiple workers simultaneously, reducing total execution time proportional to the number of workers (ideal case).
    </div>
  </div>`;
}

// Unit 1, Topic 2: Flynn's Taxonomy Interactive
export function diagramFlynnTaxonomy() {
  return `<div class="interactive-diagram" data-diagram="flynn">
    <div class="diagram-header">
      <h4>Flynn's Taxonomy: Instruction & Data Stream Classification</h4>
      <div class="diagram-controls">
        <button class="button small ${true ? 'primary' : ''}" data-flynn-select="SISD">SISD</button>
        <button class="button small" data-flynn-select="SIMD">SIMD</button>
        <button class="button small" data-flynn-select="MISD">MISD</button>
        <button class="button small" data-flynn-select="MIMD">MIMD</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <!-- Grid -->
      <line x1="400" y1="50" x2="400" y2="450" stroke="var(--line)" stroke-width="2"/>
      <line x1="50" y1="250" x2="750" y2="250" stroke="var(--line)" stroke-width="2"/>
      
      <!-- Axis Labels -->
      <text x="400" y="30" text-anchor="middle" class="axis-label">Instruction Stream →</text>
      <text x="780" y="250" text-anchor="middle" class="axis-label">Multiple</text>
      <text x="20" y="250" text-anchor="middle" class="axis-label">Single</text>
      <text x="30" y="20" class="axis-label" transform="rotate(-90 30 20)">Data Stream →</text>
      
      <!-- SISD Quadrant (Top-Left) -->
      <g class="flynn-quad sisd-quad active" data-quad="SISD">
        <rect x="60" y="60" width="330" height="180" fill="var(--cyan-soft)" opacity="0.3" rx="12"/>
        <text x="225" y="100" text-anchor="middle" class="quad-title">SISD</text>
        <text x="225" y="125" text-anchor="middle" class="quad-subtitle">Single Instruction, Single Data</text>
        <circle cx="225" cy="160" r="30" fill="var(--cyan)" opacity="0.5"/>
        <text x="225" y="168" text-anchor="middle" fill="white" font-size="14">CPU</text>
        <text x="225" y="210" text-anchor="middle" class="quad-example">Example: Traditional von Neumann</text>
      </g>
      
      <!-- SIMD Quadrant (Top-Right) -->
      <g class="flynn-quad simd-quad" data-quad="SIMD">
        <rect x="410" y="60" width="330" height="180" fill="var(--lime-soft)" opacity="0.3" rx="12"/>
        <text x="575" y="100" text-anchor="middle" class="quad-title">SIMD</text>
        <text x="575" y="125" text-anchor="middle" class="quad-subtitle">Single Instruction, Multiple Data</text>
        <g transform="translate(500, 150)">
          <circle cx="0" cy="0" r="20" fill="var(--lime)" opacity="0.5"/>
          <circle cx="50" cy="0" r="20" fill="var(--lime)" opacity="0.5"/>
          <circle cx="100" cy="0" r="20" fill="var(--lime)" opacity="0.5"/>
          <circle cx="150" cy="0" r="20" fill="var(--lime)" opacity="0.5"/>
        </g>
        <text x="575" y="210" text-anchor="middle" class="quad-example">Example: GPU Vector Processing</text>
      </g>
      
      <!-- MISD Quadrant (Bottom-Left) -->
      <g class="flynn-quad misd-quad" data-quad="MISD">
        <rect x="60" y="260" width="330" height="180" fill="var(--orange-soft)" opacity="0.3" rx="12"/>
        <text x="225" y="300" text-anchor="middle" class="quad-title">MISD</text>
        <text x="225" y="325" text-anchor="middle" class="quad-subtitle">Multiple Instruction, Single Data</text>
        <g transform="translate(225, 360)">
          <rect x="-60" y="-15" width="40" height="30" fill="var(--orange)" opacity="0.5" rx="4"/>
          <rect x="-10" y="-15" width="40" height="30" fill="var(--orange)" opacity="0.5" rx="4"/>
          <rect x="40" y="-15" width="40" height="30" fill="var(--orange)" opacity="0.5" rx="4"/>
          <path d="M -85 0 L -60 0 M 30 0 L -10 0 M 80 0 L 40 0" stroke="var(--orange)" stroke-width="2"/>
        </g>
        <text x="225" y="410" text-anchor="middle" class="quad-example">Example: Fault-Tolerant Systems</text>
      </g>
      
      <!-- MIMD Quadrant (Bottom-Right) -->
      <g class="flynn-quad mimd-quad" data-quad="MIMD">
        <rect x="410" y="260" width="330" height="180" fill="var(--pink-soft)" opacity="0.3" rx="12"/>
        <text x="575" y="300" text-anchor="middle" class="quad-title">MIMD</text>
        <text x="575" y="325" text-anchor="middle" class="quad-subtitle">Multiple Instruction, Multiple Data</text>
        <g transform="translate(500, 360)">
          <rect x="0" y="0" width="30" height="30" fill="var(--pink)" opacity="0.5" rx="4"/>
          <rect x="40" y="0" width="30" height="30" fill="var(--pink)" opacity="0.5" rx="4"/>
          <rect x="80" y="0" width="30" height="30" fill="var(--pink)" opacity="0.5" rx="4"/>
          <rect x="120" y="0" width="30" height="30" fill="var(--pink)" opacity="0.5" rx="4"/>
        </g>
        <text x="575" y="410" text-anchor="middle" class="quad-example">Example: Multi-core CPUs, Clusters</text>
      </g>
    </svg>
    <div class="diagram-insight" data-flynn-insight>
      <strong>SISD:</strong> Traditional single-core execution. One instruction processes one data element at a time.
    </div>
  </div>`;
}

// Unit 1, Topic 3: Memory Hierarchy Pyramid
export function diagramMemoryHierarchy() {
  return `<div class="interactive-diagram" data-diagram="memory-hierarchy">
    <div class="diagram-header">
      <h4>Memory Hierarchy: Speed vs Capacity Trade-off</h4>
      <p class="diagram-subtitle">Click on each layer to explore details</p>
    </div>
    <svg viewBox="0 0 800 600" class="diagram-svg">
      <!-- Registers Layer (Top) -->
      <g class="mem-layer" data-layer="registers" style="cursor: pointer;">
        <polygon points="400,50 500,120 300,120" fill="var(--cyan)" opacity="0.8"/>
        <text x="400" y="95" text-anchor="middle" fill="white" font-weight="bold">Registers</text>
        <text x="550" y="85" class="mem-spec">~1 ns</text>
        <text x="550" y="105" class="mem-spec">< 1 KB</text>
      </g>
      
      <!-- L1 Cache Layer -->
      <g class="mem-layer" data-layer="l1" style="cursor: pointer;">
        <polygon points="400,120 550,220 250,220" fill="var(--lime)" opacity="0.7"/>
        <text x="400" y="175" text-anchor="middle" fill="white" font-weight="bold">L1 Cache</text>
        <text x="600" y="160" class="mem-spec">~1-2 ns</text>
        <text x="600" y="180" class="mem-spec">32-64 KB</text>
      </g>
      
      <!-- L2 Cache Layer -->
      <g class="mem-layer" data-layer="l2" style="cursor: pointer;">
        <polygon points="400,220 600,320 200,320" fill="var(--orange)" opacity="0.6"/>
        <text x="400" y="275" text-anchor="middle" fill="white" font-weight="bold">L2 Cache</text>
        <text x="650" y="255" class="mem-spec">~5-10 ns</text>
        <text x="650" y="275" class="mem-spec">256 KB - 1 MB</text>
      </g>
      
      <!-- L3 Cache Layer -->
      <g class="mem-layer" data-layer="l3" style="cursor: pointer;">
        <polygon points="400,320 650,420 150,420" fill="var(--pink)" opacity="0.5"/>
        <text x="400" y="375" text-anchor="middle" fill="white" font-weight="bold">L3 Cache</text>
        <text x="700" y="355" class="mem-spec">~20-40 ns</text>
        <text x="700" y="375" class="mem-spec">8-32 MB</text>
      </g>
      
      <!-- Main Memory Layer -->
      <g class="mem-layer" data-layer="ram" style="cursor: pointer;">
        <polygon points="400,420 700,520 100,520" fill="#7c3aed" opacity="0.4"/>
        <text x="400" y="475" text-anchor="middle" fill="white" font-weight="bold">Main Memory (RAM)</text>
        <text x="750" y="455" class="mem-spec">~100 ns</text>
        <text x="750" y="475" class="mem-spec">8-128 GB</text>
      </g>
      
      <!-- Storage Layer (Bottom) -->
      <g class="mem-layer" data-layer="storage" style="cursor: pointer;">
        <polygon points="400,520 750,580 50,580" fill="#64748b" opacity="0.3"/>
        <text x="400" y="555" text-anchor="middle" fill="white" font-weight="bold">Storage (SSD/HDD)</text>
        <text x="780" y="545" class="mem-spec">~1 ms</text>
        <text x="780" y="565" class="mem-spec">TB - PB</text>
      </g>
      
      <!-- Arrows showing direction -->
      <g>
        <path d="M 50 100 L 30 100 L 30 550 L 50 550" stroke="var(--cyan)" stroke-width="3" fill="none" marker-start="url(#arrow-up)" marker-end="url(#arrow-down)"/>
        <text x="15" y="200" class="axis-label" transform="rotate(-90 15 200)">Faster →</text>
        <text x="15" y="450" class="axis-label" transform="rotate(-90 15 450)">← Larger</text>
      </g>
      
      <defs>
        <marker id="arrow-up" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="5 0, 10 10, 0 10" fill="var(--cyan)"/>
        </marker>
        <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="5 10, 10 0, 0 0" fill="var(--cyan)"/>
        </marker>
      </defs>
    </svg>
    <div class="diagram-insight" data-mem-insight>
      <strong>Memory Hierarchy Principle:</strong> Smaller, faster memory sits closer to the CPU. Each level caches frequently accessed data from slower, larger levels below.
    </div>
  </div>`;
}

// Unit 1, Topic 4: Amdahl's Law Visualization
export function diagramAmdahlLaw() {
  return `<div class="interactive-diagram" data-diagram="amdahl">
    <div class="diagram-header">
      <h4>Amdahl's Law: The Serial Bottleneck</h4>
      <div class="diagram-controls">
        <label>Serial Fraction: <span data-amdahl-frac>10%</span></label>
        <input type="range" min="1" max="50" value="10" data-amdahl-slider style="width: 200px; margin: 0 0.5rem;"/>
      </div>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <!-- Axes -->
      <line x1="80" y1="50" x2="80" y2="380" stroke="var(--line)" stroke-width="2"/>
      <line x1="80" y1="380" x2="750" y2="380" stroke="var(--line)" stroke-width="2"/>
      <text x="40" y="200" class="axis-label" transform="rotate(-90 40 200)">Speedup</text>
      <text x="400" y="420" text-anchor="middle" class="axis-label">Number of Processors</text>
      
      <!-- Grid lines -->
      <line x1="80" y1="330" x2="750" y2="330" stroke="var(--line)" opacity="0.2" stroke-dasharray="4"/>
      <line x1="80" y1="280" x2="750" y2="280" stroke="var(--line)" opacity="0.2" stroke-dasharray="4"/>
      <line x1="80" y1="230" x2="750" y2="230" stroke="var(--line)" opacity="0.2" stroke-dasharray="4"/>
      <line x1="80" y1="180" x2="750" y2="180" stroke="var(--line)" opacity="0.2" stroke-dasharray="4"/>
      <line x1="80" y1="130" x2="750" y2="130" stroke="var(--line)" opacity="0.2" stroke-dasharray="4"/>
      <line x1="80" y1="80" x2="750" y2="80" stroke="var(--line)" opacity="0.2" stroke-dasharray="4"/>
      
      <!-- Y-axis labels -->
      <text x="70" y="385" text-anchor="end" class="tick-label">0</text>
      <text x="70" y="335" text-anchor="end" class="tick-label">5</text>
      <text x="70" y="285" text-anchor="end" class="tick-label">10</text>
      <text x="70" y="235" text-anchor="end" class="tick-label">15</text>
      <text x="70" y="185" text-anchor="end" class="tick-label">20</text>
      <text x="70" y="135" text-anchor="end" class="tick-label">25</text>
      <text x="70" y="85" text-anchor="end" class="tick-label">30</text>
      
      <!-- X-axis labels -->
      <text x="80" y="400" text-anchor="middle" class="tick-label">1</text>
      <text x="215" y="400" text-anchor="middle" class="tick-label">4</text>
      <text x="350" y="400" text-anchor="middle" class="tick-label">8</text>
      <text x="485" y="400" text-anchor="middle" class="tick-label">16</text>
      <text x="620" y="400" text-anchor="middle" class="tick-label">32</text>
      <text x="750" y="400" text-anchor="middle" class="tick-label">64</text>
      
      <!-- Amdahl's Law Curve -->
      <path class="amdahl-curve" d="M 80,380" stroke="var(--cyan)" stroke-width="3" fill="none" data-curve-path/>
      
      <!-- Theoretical Max Line (Ceiling) -->
      <line class="max-speedup-line" x1="80" y1="280" x2="750" y2="280" stroke="var(--pink)" stroke-width="2" stroke-dasharray="8" data-max-line/>
      <text x="760" y="285" fill="var(--pink)" class="max-label" data-max-label>Max: 10×</text>
      
      <!-- Shaded Ceiling Region -->
      <rect x="80" y="50" width="670" height="230" fill="var(--pink)" opacity="0.1" data-ceiling-rect/>
      
      <!-- Info Box -->
      <rect x="520" y="70" width="220" height="100" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
      <text x="630" y="95" text-anchor="middle" font-weight="bold">Amdahl's Law</text>
      <text x="630" y="115" text-anchor="middle" font-size="14" data-formula>S = 1 / (s + p/n)</text>
      <text x="630" y="135" text-anchor="middle" font-size="12" fill="var(--muted)">s = serial fraction</text>
      <text x="630" y="152" text-anchor="middle" font-size="12" fill="var(--muted)" data-max-speedup-text>Max Speedup: 10.0×</text>
    </svg>
    <div class="diagram-insight">
      <strong>Key Lesson:</strong> Even with infinite processors, speedup is capped by the serial fraction. If 10% of code is serial, maximum speedup = 1/0.10 = 10×.
    </div>
  </div>`;
}

// Export all diagram rendering functions
export const DIAGRAM_REGISTRY = {
  'parallel-processing': diagramParallelProcessing,
  'flynn-taxonomy': diagramFlynnTaxonomy,
  'memory-hierarchy': diagramMemoryHierarchy,
  'amdahl-law': diagramAmdahlLaw,
  'openmp-scheduling': diagramOpenMPScheduling,
  'mpi-collective': diagramMPICollective,
  'race-deadlock': diagramRaceDeadlock,
  'work-stealing': diagramWorkStealing,
  'cuda-basics': diagramCudaBasics,
  'memory-coalescing': diagramMemoryCoalescing,
  'gpu-profiling': diagramGpuProfiling,
  'cloud-hpc': diagramCloudHpc,
  'qubit-bloch': diagramQubitBloch,
  'quantum-gates': diagramQuantumGates,
  'quantum-algorithms': diagramQuantumAlgorithms,
  'vqe-circuit': diagramVqeCircuit
};

// Unit 3, Topic 1: CUDA Basics - Threads, Blocks, Grids
export function diagramCudaBasics() {
  return `<div class="interactive-diagram" data-diagram="cuda-basics">
    <div class="diagram-header">
      <h4>CUDA Execution Model: Threads, Blocks, and Grids</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-cuda-level="thread">Thread</button>
        <button class="button small" data-cuda-level="warp">Warp</button>
        <button class="button small" data-cuda-level="block">Block</button>
        <button class="button small" data-cuda-level="grid">Grid</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <!-- Grid Level (Entire Kernel) -->
      <rect x="20" y="20" width="760" height="460" fill="var(--surface)" stroke="var(--cyan)" stroke-width="3" rx="12"/>
      <text x="40" y="50" font-weight="bold" font-size="18" fill="var(--cyan)">Grid (Kernel Launch)</text>
      
      <!-- Block 0 -->
      <g class="cuda-block" data-block="0">
        <rect x="40" y="70" width="220" height="200" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="150" y="95" text-anchor="middle" font-weight="bold" fill="var(--lime)">Block 0</text>
        
        <!-- Warps in Block 0 -->
        <g class="cuda-warp" data-warp="0">
          <rect x="50" y="105" width="200" height="35" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1.5" rx="4"/>
          <text x="60" y="125" font-size="11" font-weight="600">Warp 0 (32 threads)</text>
          <!-- Thread visualization -->
          <g class="thread-blocks">
            ${Array.from({length: 8}, (_, i) => `<rect x="${55 + i * 24}" y="130" width="4" height="8" fill="var(--pink)" rx="1"/>`).join('')}
          </g>
        </g>
        
        <g class="cuda-warp" data-warp="1">
          <rect x="50" y="145" width="200" height="35" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1.5" rx="4"/>
          <text x="60" y="165" font-size="11" font-weight="600">Warp 1 (32 threads)</text>
          <g class="thread-blocks">
            ${Array.from({length: 8}, (_, i) => `<rect x="${55 + i * 24}" y="170" width="4" height="8" fill="var(--pink)" rx="1"/>`).join('')}
          </g>
        </g>
        
        <text x="150" y="240" text-anchor="middle" font-size="10" fill="var(--muted)" font-style="italic">256 threads total</text>
        <text x="150" y="255" text-anchor="middle" font-size="10" fill="var(--muted)" font-style="italic">8 warps per block</text>
      </g>
      
      <!-- Block 1 -->
      <g class="cuda-block" data-block="1">
        <rect x="280" y="70" width="220" height="200" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8" opacity="0.7"/>
        <text x="390" y="95" text-anchor="middle" font-weight="bold" fill="var(--lime)">Block 1</text>
        <text x="390" y="170" text-anchor="middle" font-size="12" fill="var(--muted)">256 threads</text>
      </g>
      
      <!-- Block 2 -->
      <g class="cuda-block" data-block="2">
        <rect x="520" y="70" width="220" height="200" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8" opacity="0.5"/>
        <text x="630" y="95" text-anchor="middle" font-weight="bold" fill="var(--lime)">Block 2</text>
        <text x="630" y="170" text-anchor="middle" font-size="12" fill="var(--muted)">256 threads</text>
      </g>
      
      <!-- More blocks indicator -->
      <text x="400" y="300" text-anchor="middle" font-size="14" fill="var(--muted)" font-style="italic">... more blocks ...</text>
      
      <!-- Streaming Multiprocessor (SM) -->
      <g class="sm-boundary">
        <rect x="40" y="320" width="350" height="140" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" stroke-dasharray="6 3" rx="8" opacity="0.3"/>
        <text x="55" y="345" font-weight="bold" font-size="14" fill="var(--cyan)">Streaming Multiprocessor (SM)</text>
        <text x="55" y="365" font-size="11" fill="var(--muted)">• Executes warps from blocks</text>
        <text x="55" y="382" font-size="11" fill="var(--muted)">• Shared memory per block</text>
        <text x="55" y="399" font-size="11" fill="var(--muted)">• 64K registers per SM</text>
        <text x="55" y="416" font-size="11" fill="var(--muted)">• L1 cache / Shared memory</text>
        <text x="55" y="433" font-size="11" fill="var(--muted)">• Warp scheduler</text>
      </g>
      
      <!-- Memory Hierarchy Indicator -->
      <g transform="translate(420, 320)">
        <rect x="0" y="0" width="320" height="140" fill="var(--paper)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="10" y="25" font-weight="bold" font-size="14">GPU Memory Hierarchy:</text>
        <text x="15" y="48" font-size="11" fill="var(--pink)">★ Registers (per thread) - fastest</text>
        <text x="15" y="65" font-size="11" fill="var(--orange)">★ Shared Mem (per block) - fast</text>
        <text x="15" y="82" font-size="11" fill="var(--lime)">★ L1/L2 Cache - cached</text>
        <text x="15" y="99" font-size="11" fill="var(--cyan)">★ Global Memory - slowest</text>
        <text x="15" y="120" font-size="10" fill="var(--muted)" font-style="italic">Optimize: minimize global memory access</text>
      </g>
    </svg>
    <div class="diagram-insight" data-cuda-insight>
      <strong>SIMT Execution:</strong> A GPU kernel launches a grid of thread blocks. Each block contains warps of 32 threads that execute in lockstep (SIMT). Blocks run on Streaming Multiprocessors (SMs) which have shared memory, registers, and L1 cache. All threads in a warp must execute the same instruction simultaneously.
    </div>
  </div>`;
}

// Unit 2, Topic 1: OpenMP Loop Scheduling
export function diagramOpenMPScheduling() {
  return `<div class="interactive-diagram" data-diagram="openmp-scheduling">
    <div class="diagram-header">
      <h4>OpenMP Loop Scheduling: Static vs Dynamic vs Guided</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-schedule-select="static">Static</button>
        <button class="button small" data-schedule-select="dynamic">Dynamic</button>
        <button class="button small" data-schedule-select="guided">Guided</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <!-- 4 Threads Timeline -->
      <text x="20" y="30" class="diagram-label">4 Threads Processing 16 Loop Iterations:</text>
      
      <!-- Thread Labels -->
      <text x="80" y="70" class="worker-label">Thread 0</text>
      <text x="80" y="140" class="worker-label">Thread 1</text>
      <text x="80" y="210" class="worker-label">Thread 2</text>
      <text x="80" y="280" class="worker-label">Thread 3</text>
      
      <!-- Timeline Grid -->
      <g class="schedule-timeline">
        <!-- Thread 0 -->
        <rect x="160" y="50" width="600" height="40" fill="var(--surface)" stroke="var(--line)" stroke-width="1" rx="4"/>
        <g data-thread-tasks="0"></g>
        
        <!-- Thread 1 -->
        <rect x="160" y="120" width="600" height="40" fill="var(--surface)" stroke="var(--line)" stroke-width="1" rx="4"/>
        <g data-thread-tasks="1"></g>
        
        <!-- Thread 2 -->
        <rect x="160" y="190" width="600" height="40" fill="var(--surface)" stroke="var(--line)" stroke-width="1" rx="4"/>
        <g data-thread-tasks="2"></g>
        
        <!-- Thread 3 -->
        <rect x="160" y="260" width="600" height="40" fill="var(--surface)" stroke="var(--line)" stroke-width="1" rx="4"/>
        <g data-thread-tasks="3"></g>
      </g>
      
      <!-- Time Axis -->
      <line x1="160" y1="320" x2="760" y2="320" stroke="var(--line)" stroke-width="2"/>
      <text x="460" y="345" text-anchor="middle" class="axis-label">Time →</text>
      
      <!-- Load Imbalance Indicator -->
      <g class="load-indicator">
        <rect x="160" y="360" width="600" height="80" fill="var(--paper)" stroke="var(--line)" stroke-width="1" rx="8"/>
        <text x="180" y="385" class="diagram-label">Load Balance:</text>
        <text x="180" y="410" font-size="14" fill="var(--muted)" data-balance-text>Static: Equal iteration count per thread</text>
        <rect x="180" y="420" width="580" height="8" fill="var(--line)" rx="4"/>
        <rect x="180" y="420" width="580" height="8" fill="var(--cyan)" rx="4" data-balance-bar/>
      </g>
    </svg>
    <div class="diagram-insight" data-schedule-insight>
      <strong>Static Scheduling:</strong> Iterations divided equally among threads at compile time. Best for uniform workloads. Low overhead but can cause imbalance if iteration costs vary.
    </div>
  </div>`;
}

// Unit 2, Topic 2: MPI Collective Communication
export function diagramMPICollective() {
  return `<div class="interactive-diagram" data-diagram="mpi-collective">
    <div class="diagram-header">
      <h4>MPI Collective Operations: Communication Patterns</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-mpi-op="broadcast">Broadcast</button>
        <button class="button small" data-mpi-op="scatter">Scatter</button>
        <button class="button small" data-mpi-op="gather">Gather</button>
        <button class="button small" data-mpi-op="allreduce">Allreduce</button>
      </div>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <!-- Root/Source Process -->
      <g class="root-process">
        <circle cx="400" cy="80" r="35" fill="var(--cyan)" opacity="0.8" stroke="var(--cyan)" stroke-width="3"/>
        <text x="400" y="88" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Rank 0</text>
        <text x="400" y="135" text-anchor="middle" class="diagram-label" data-root-label>Root (Source)</text>
      </g>
      
      <!-- Worker Processes (arranged in circle) -->
      <g class="worker-processes">
        <!-- Rank 1 -->
        <circle cx="250" cy="250" r="30" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2"/>
        <text x="250" y="258" text-anchor="middle" font-weight="bold">R1</text>
        
        <!-- Rank 2 -->
        <circle cx="400" cy="330" r="30" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2"/>
        <text x="400" y="338" text-anchor="middle" font-weight="bold">R2</text>
        
        <!-- Rank 3 -->
        <circle cx="550" cy="250" r="30" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2"/>
        <text x="550" y="258" text-anchor="middle" font-weight="bold">R3</text>
      </g>
      
      <!-- Communication Arrows (updated by interaction) -->
      <g class="comm-arrows" data-comm-pattern>
        <!-- Broadcast: Root to all -->
        <path d="M 400 115 L 250 220" stroke="var(--cyan)" stroke-width="3" fill="none" marker-end="url(#arrow-cyan)" class="comm-line"/>
        <path d="M 400 115 L 400 300" stroke="var(--cyan)" stroke-width="3" fill="none" marker-end="url(#arrow-cyan)" class="comm-line"/>
        <path d="M 400 115 L 550 220" stroke="var(--cyan)" stroke-width="3" fill="none" marker-end="url(#arrow-cyan)" class="comm-line"/>
      </g>
      
      <!-- Data Labels -->
      <g class="data-labels" data-data-labels>
        <text x="310" y="170" fill="var(--cyan)" font-size="12" font-weight="bold">Data</text>
        <text x="400" y="215" fill="var(--cyan)" font-size="12" font-weight="bold">Data</text>
        <text x="480" y="170" fill="var(--cyan)" font-size="12" font-weight="bold">Data</text>
      </g>
      
      <!-- Info Box -->
      <g class="info-box">
        <rect x="20" y="360" width="280" height="70" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="35" y="385" font-weight="bold" font-size="14">MPI_Bcast</text>
        <text x="35" y="405" font-size="12" fill="var(--muted)" data-op-complexity>Complexity: O(log n)</text>
        <text x="35" y="420" font-size="12" fill="var(--muted)">One-to-All Communication</text>
      </g>
      
      <defs>
        <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="var(--cyan)"/>
        </marker>
        <marker id="arrow-lime" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="var(--lime)"/>
        </marker>
      </defs>
    </svg>
    <div class="diagram-insight" data-mpi-insight>
      <strong>MPI_Bcast:</strong> Distributes data from root process to all other processes. Uses tree-based algorithm with O(log n) complexity instead of linear sends. Essential for sharing parameters across distributed computation.
    </div>
  </div>`;
}

// Unit 2, Topic 3: Race Conditions & Deadlock
export function diagramRaceDeadlock() {
  return `<div class="interactive-diagram" data-diagram="race-deadlock">
    <div class="diagram-header">
      <h4>Synchronization Issues: Race Condition vs Deadlock</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-sync-issue="race">Race Condition</button>
        <button class="button small" data-sync-issue="deadlock">Deadlock</button>
        <button class="button small" data-sync-issue="correct">Correct Sync</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <!-- Race Condition Visualization -->
      <g class="race-scenario" data-scenario="race">
        <text x="400" y="40" text-anchor="middle" class="diagram-label">Shared Counter (Initial Value: 0)</text>
        
        <!-- Shared Memory -->
        <rect x="350" y="60" width="100" height="50" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="6"/>
        <text x="400" y="92" text-anchor="middle" font-size="20" font-weight="bold" data-counter-val>0</text>
        
        <!-- Thread 1 -->
        <g transform="translate(150, 180)">
          <rect x="0" y="0" width="200" height="180" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
          <text x="100" y="25" text-anchor="middle" font-weight="bold" fill="var(--cyan)">Thread 1</text>
          <text x="10" y="50" font-size="11" font-family="monospace" fill="var(--muted)">1. Read counter = 0</text>
          <text x="10" y="70" font-size="11" font-family="monospace" fill="var(--muted)">2. Increment: 0 + 1 = 1</text>
          <text x="10" y="90" font-size="11" font-family="monospace" fill="var(--orange)">3. Context Switch! ⚠️</text>
          <text x="10" y="110" font-size="11" font-family="monospace" fill="var(--muted)">4. (Resume)</text>
          <text x="10" y="130" font-size="11" font-family="monospace" fill="var(--muted)">5. Write counter = 1</text>
          <text x="10" y="155" font-size="10" fill="var(--pink)" font-weight="bold">❌ Lost Update!</text>
        </g>
        
        <!-- Thread 2 -->
        <g transform="translate(450, 180)">
          <rect x="0" y="0" width="200" height="180" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
          <text x="100" y="25" text-anchor="middle" font-weight="bold" fill="var(--lime)">Thread 2</text>
          <text x="10" y="50" font-size="11" font-family="monospace" fill="var(--muted)">1. Read counter = 0</text>
          <text x="10" y="70" font-size="11" font-family="monospace" fill="var(--muted)">2. Increment: 0 + 1 = 1</text>
          <text x="10" y="90" font-size="11" font-family="monospace" fill="var(--muted)">3. Write counter = 1</text>
          <text x="10" y="110" font-size="11" font-family="monospace" fill="var(--muted)">4. Done</text>
          <text x="10" y="155" font-size="10" fill="var(--pink)" font-weight="bold">❌ Lost Update!</text>
        </g>
        
        <!-- Result -->
        <text x="400" y="400" text-anchor="middle" font-size="16" fill="var(--pink)" font-weight="bold">
          Final Counter: 1 (Expected: 2) - Race Condition!
        </text>
      </g>
      
      <!-- Deadlock Visualization (hidden by default) -->
      <g class="deadlock-scenario" data-scenario="deadlock" style="display: none;">
        <text x="400" y="40" text-anchor="middle" class="diagram-label">Two Threads, Two Locks (A and B)</text>
        
        <!-- Lock A -->
        <g transform="translate(200, 150)">
          <rect x="0" y="0" width="80" height="80" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="3" rx="8"/>
          <text x="40" y="35" text-anchor="middle" font-weight="bold">Lock A</text>
          <text x="40" y="60" text-anchor="middle" font-size="28">🔒</text>
        </g>
        
        <!-- Lock B -->
        <g transform="translate(520, 150)">
          <rect x="0" y="0" width="80" height="80" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="3" rx="8"/>
          <text x="40" y="35" text-anchor="middle" font-weight="bold">Lock B</text>
          <text x="40" y="60" text-anchor="middle" font-size="28">🔒</text>
        </g>
        
        <!-- Thread 1 -->
        <circle cx="240" cy="320" r="40" fill="var(--cyan)" opacity="0.8"/>
        <text x="240" y="328" text-anchor="middle" fill="white" font-weight="bold">T1</text>
        <text x="240" y="380" text-anchor="middle" font-size="12" fill="var(--muted)">Holds Lock A</text>
        <text x="240" y="395" text-anchor="middle" font-size="12" fill="var(--pink)" font-weight="bold">Waiting for Lock B</text>
        
        <!-- Thread 2 -->
        <circle cx="560" cy="320" r="40" fill="var(--lime)" opacity="0.8"/>
        <text x="560" y="328" text-anchor="middle" fill="white" font-weight="bold">T2</text>
        <text x="560" y="380" text-anchor="middle" font-size="12" fill="var(--muted)">Holds Lock B</text>
        <text x="560" y="395" text-anchor="middle" font-size="12" fill="var(--pink)" font-weight="bold">Waiting for Lock A</text>
        
        <!-- Circular Wait Arrows -->
        <path d="M 280 310 Q 400 280 520 310" stroke="var(--pink)" stroke-width="3" fill="none" marker-end="url(#arrow-pink)" stroke-dasharray="8,4"/>
        <path d="M 520 330 Q 400 360 280 330" stroke="var(--pink)" stroke-width="3" fill="none" marker-end="url(#arrow-pink)" stroke-dasharray="8,4"/>
        
        <text x="400" y="270" text-anchor="middle" font-size="12" fill="var(--pink)" font-weight="bold">Circular Wait</text>
        <text x="400" y="440" text-anchor="middle" font-size="16" fill="var(--pink)" font-weight="bold">⚠️ DEADLOCK - Both threads stuck forever!</text>
      </g>
      
      <defs>
        <marker id="arrow-pink" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="var(--pink)"/>
        </marker>
      </defs>
    </svg>
    <div class="diagram-insight" data-sync-insight>
      <strong>Race Condition:</strong> Occurs when multiple threads access shared data without proper synchronization. The outcome depends on unpredictable thread scheduling. Solution: Use mutexes, atomic operations, or locks to ensure mutual exclusion.
    </div>
  </div>`;
}

// Unit 2, Topic 4: Work Stealing & Load Balancing
export function diagramWorkStealing() {
  return `<div class="interactive-diagram" data-diagram="work-stealing">
    <div class="diagram-header">
      <h4>Work Stealing: Dynamic Load Balancing</h4>
      <div class="diagram-controls">
        <button class="button small" data-stealing-action="simulate">▶ Simulate Stealing</button>
        <button class="button small" data-stealing-action="reset">⟲ Reset</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <text x="20" y="30" class="diagram-label">4 Workers with Task Deques (Double-Ended Queues):</text>
      
      <!-- Worker 0 (Busy - has many tasks) -->
      <g transform="translate(50, 80)">
        <rect x="0" y="0" width="160" height="80" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="80" y="20" text-anchor="middle" font-weight="bold" fill="var(--cyan)">Worker 0</text>
        <text x="80" y="38" text-anchor="middle" font-size="11" fill="var(--muted)">Status: <tspan fill="var(--orange)" font-weight="bold">BUSY</tspan></text>
        
        <!-- Task Deque -->
        <g class="task-deque" data-worker="0">
          <rect x="10" y="45" width="25" height="25" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1" rx="3"/>
          <text x="22" y="62" text-anchor="middle" font-size="10">T1</text>
          
          <rect x="38" y="45" width="25" height="25" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1" rx="3"/>
          <text x="50" y="62" text-anchor="middle" font-size="10">T2</text>
          
          <rect x="66" y="45" width="25" height="25" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1" rx="3"/>
          <text x="78" y="62" text-anchor="middle" font-size="10">T3</text>
          
          <rect x="94" y="45" width="25" height="25" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1" rx="3"/>
          <text x="106" y="62" text-anchor="middle" font-size="10">T4</text>
          
          <rect x="122" y="45" width="25" height="25" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1" rx="3"/>
          <text x="134" y="62" text-anchor="middle" font-size="10">T5</text>
        </g>
      </g>
      
      <!-- Worker 1 (Idle) -->
      <g transform="translate(250, 80)">
        <rect x="0" y="0" width="160" height="80" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="80" y="20" text-anchor="middle" font-weight="bold" fill="var(--lime)">Worker 1</text>
        <text x="80" y="38" text-anchor="middle" font-size="11" fill="var(--muted)">Status: <tspan fill="var(--pink)" font-weight="bold">IDLE</tspan></text>
        <text x="80" y="60" text-anchor="middle" font-size="10" fill="var(--muted)" font-style="italic">Empty deque</text>
      </g>
      
      <!-- Worker 2 (Moderate) -->
      <g transform="translate(450, 80)">
        <rect x="0" y="0" width="160" height="80" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="80" y="20" text-anchor="middle" font-weight="bold" fill="var(--orange)">Worker 2</text>
        <text x="80" y="38" text-anchor="middle" font-size="11" fill="var(--muted)">Status: <tspan fill="var(--lime)" font-weight="bold">ACTIVE</tspan></text>
        
        <g class="task-deque" data-worker="2">
          <rect x="38" y="45" width="25" height="25" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1" rx="3"/>
          <text x="50" y="62" text-anchor="middle" font-size="10">T8</text>
          
          <rect x="66" y="45" width="25" height="25" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1" rx="3"/>
          <text x="78" y="62" text-anchor="middle" font-size="10">T9</text>
        </g>
      </g>
      
      <!-- Worker 3 (Few tasks) -->
      <g transform="translate(50, 200)">
        <rect x="0" y="0" width="160" height="80" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="80" y="20" text-anchor="middle" font-weight="bold" fill="var(--pink)">Worker 3</text>
        <text x="80" y="38" text-anchor="middle" font-size="11" fill="var(--muted)">Status: <tspan fill="var(--lime)" font-weight="bold">ACTIVE</tspan></text>
        
        <g class="task-deque" data-worker="3">
          <rect x="66" y="45" width="25" height="25" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="1" rx="3"/>
          <text x="78" y="62" text-anchor="middle" font-size="10">T6</text>
        </g>
      </g>
      
      <!-- Stealing Arrow (animated) -->
      <g class="stealing-arrow" style="opacity: 0;">
        <path d="M 210 120 Q 250 120 250 120" stroke="var(--lime)" stroke-width="4" fill="none" marker-end="url(#arrow-steal)"/>
        <text x="230" y="115" fill="var(--lime)" font-size="12" font-weight="bold">STEAL!</text>
      </g>
      
      <!-- Algorithm Explanation -->
      <g transform="translate(250, 200)">
        <rect x="0" y="0" width="360" height="150" fill="var(--paper)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="10" y="25" font-weight="bold" font-size="14">Work Stealing Algorithm:</text>
        
        <text x="15" y="48" font-size="12" fill="var(--muted)">1. Each worker has a local task deque</text>
        <text x="15" y="68" font-size="12" fill="var(--muted)">2. Workers push/pop tasks from HEAD (LIFO)</text>
        <text x="15" y="88" font-size="12" fill="var(--muted)">3. Idle workers STEAL from TAIL of busy workers</text>
        <text x="15" y="108" font-size="12" fill="var(--muted)">4. Minimizes contention (opposite ends)</text>
        <text x="15" y="128" font-size="12" fill="var(--cyan)" font-weight="bold">✓ Automatic load balancing with low overhead</text>
      </g>
      
      <defs>
        <marker id="arrow-steal" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 12 6, 0 12" fill="var(--lime)"/>
        </marker>
      </defs>
    </svg>
    <div class="diagram-insight" data-stealing-insight>
      <strong>Work Stealing:</strong> Idle workers "steal" tasks from busy workers' queues. Workers operate on their own deque (HEAD) while thieves steal from the opposite end (TAIL), minimizing lock contention. Used in Java Fork/Join, Intel TBB, and Cilk.
    </div>
  </div>`;
}



// Unit 3, Topic 2: Memory Coalescing Pattern
export function diagramMemoryCoalescing() {
  return `<div class="interactive-diagram" data-diagram="memory-coalescing">
    <div class="diagram-header">
      <h4>GPU Memory Coalescing: Sequential vs Strided Access</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-coalesce-pattern="sequential">Sequential (Coalesced)</button>
        <button class="button small" data-coalesce-pattern="strided">Strided (Uncoalesced)</button>
      </div>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <!-- Memory Array -->
      <text x="20" y="30" font-weight="bold" font-size="16">Global Memory Array:</text>
      <g class="memory-array">
        ${Array.from({length: 16}, (_, i) => `
          <rect x="${40 + i * 45}" y="50" width="42" height="40" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="4"/>
          <text x="${61 + i * 45}" y="75" text-anchor="middle" font-size="11" font-weight="600">[${i}]</text>
        `).join('')}
      </g>
      
      <!-- Warp Threads (32 threads, showing 16) -->
      <text x="20" y="140" font-weight="bold" font-size="16">Warp (32 threads):</text>
      <g class="warp-threads">
        ${Array.from({length: 16}, (_, i) => `
          <circle cx="${61 + i * 45}" cy="170" r="15" fill="var(--lime)" opacity="0.8"/>
          <text x="${61 + i * 45}" y="175" text-anchor="middle" font-size="10" fill="white" font-weight="600">T${i}</text>
        `).join('')}
      </g>
      
      <!-- Access Pattern Arrows (Sequential by default) -->
      <g class="access-arrows" data-pattern="sequential">
        ${Array.from({length: 16}, (_, i) => `
          <path d="M ${61 + i * 45} 185 L ${61 + i * 45} 90" stroke="var(--lime)" stroke-width="2" fill="none" marker-end="url(#arrow-lime)" opacity="0.7"/>
        `).join('')}
      </g>
      
      <!-- Cache Lines -->
      <text x="20" y="240" font-weight="bold" font-size="16">Cache Lines (128 bytes each):</text>
      <g class="cache-lines">
        <rect x="40" y="255" width="360" height="50" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="6"/>
        <text x="220" y="285" text-anchor="middle" font-weight="600" fill="var(--orange)">Cache Line 0 (32 consecutive elements)</text>
        
        <rect x="420" y="255" width="360" height="50" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="6" opacity="0.4"/>
        <text x="600" y="285" text-anchor="middle" font-weight="600" fill="var(--pink)">Cache Line 1</text>
      </g>
      
      <!-- Performance Metrics -->
      <g class="performance-box">
        <rect x="40" y="330" width="720" height="100" fill="var(--paper)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="60" y="360" font-weight="bold" font-size="15">Performance Impact:</text>
        
        <g data-sequential-stats>
          <text x="70" y="385" font-size="13" fill="var(--lime)">✓ Sequential: 1 memory transaction per warp</text>
          <text x="70" y="405" font-size="13" fill="var(--lime)">✓ Bandwidth: ~900 GB/s (full utilization)</text>
        </g>
        
        <g data-strided-stats style="display: none;">
          <text x="70" y="385" font-size="13" fill="var(--pink)">✗ Strided: 16+ memory transactions per warp</text>
          <text x="70" y="405" font-size="13" fill="var(--pink)">✗ Bandwidth: ~56 GB/s (16x slower!)</text>
        </g>
      </g>
    </svg>
    <div class="diagram-insight" data-coalesce-insight>
      <strong>Memory Coalescing:</strong> When consecutive threads in a warp access consecutive memory addresses, the GPU combines requests into a single memory transaction (coalesced). Strided or random access patterns cause multiple transactions, drastically reducing bandwidth utilization.
    </div>
  </div>`;
}

// Unit 3, Topic 3: GPU Profiling Metrics
export function diagramGpuProfiling() {
  return `<div class="interactive-diagram" data-diagram="gpu-profiling">
    <div class="diagram-header">
      <h4>GPU Performance Profiling: Roofline Model</h4>
      <p class="diagram-subtitle">Operational Intensity vs Achieved Performance</p>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <!-- Axes -->
      <line x1="80" y1="50" x2="80" y2="420" stroke="var(--line)" stroke-width="2"/>
      <line x1="80" y1="420" x2="750" y2="420" stroke="var(--line)" stroke-width="2"/>
      
      <!-- Axis Labels -->
      <text x="30" y="200" class="axis-label" transform="rotate(-90 30 200)">Performance (TFLOP/s)</text>
      <text x="400" y="460" text-anchor="middle" class="axis-label">Operational Intensity (FLOP/Byte)</text>
      
      <!-- Y-axis ticks -->
      <text x="70" y="425" text-anchor="end" font-size="11">0</text>
      <text x="70" y="325" text-anchor="end" font-size="11">5</text>
      <text x="70" y="225" text-anchor="end" font-size="11">10</text>
      <text x="70" y="125" text-anchor="end" font-size="11">15</text>
      <text x="70" y="65" text-anchor="end" font-size="11">20</text>
      
      <!-- X-axis ticks -->
      <text x="80" y="440" text-anchor="middle" font-size="11">0.1</text>
      <text x="200" y="440" text-anchor="middle" font-size="11">1</text>
      <text x="350" y="440" text-anchor="middle" font-size="11">10</text>
      <text x="550" y="440" text-anchor="middle" font-size="11">100</text>
      <text x="750" y="440" text-anchor="middle" font-size="11">1000</text>
      
      <!-- Memory Bandwidth Bound (Sloped Line) -->
      <line x1="80" y1="420" x2="350" y2="120" stroke="var(--pink)" stroke-width="3" stroke-dasharray="8"/>
      <text x="180" y="290" fill="var(--pink)" font-size="12" font-weight="600" transform="rotate(-35 180 290)">Memory Bound</text>
      <text x="140" y="340" fill="var(--pink)" font-size="10">(900 GB/s)</text>
      
      <!-- Compute Bound (Flat Line) -->
      <line x1="350" y1="120" x2="750" y2="120" stroke="var(--cyan)" stroke-width="3"/>
      <text x="550" y="110" fill="var(--cyan)" font-size="12" font-weight="600">Compute Bound (20 TFLOP/s Peak)</text>
      
      <!-- Ridge Point -->
      <circle cx="350" cy="120" r="6" fill="var(--orange)" stroke="var(--orange)" stroke-width="2"/>
      <text x="360" y="100" fill="var(--orange)" font-size="11" font-weight="700">Ridge Point</text>
      <text x="360" y="115" fill="var(--orange)" font-size="9">(I = 10 FLOP/Byte)</text>
      
      <!-- Sample Kernels -->
      <g class="sample-kernels">
        <!-- SAXPY (memory-bound) -->
        <circle cx="150" cy="350" r="8" fill="var(--lime)" opacity="0.8"/>
        <text x="160" y="355" font-size="11" fill="var(--lime)" font-weight="600">SAXPY</text>
        <text x="160" y="368" font-size="9" fill="var(--muted)">(I=0.5)</text>
        
        <!-- GEMM (compute-bound) -->
        <circle cx="550" cy="125" r="8" fill="var(--lime)" opacity="0.8"/>
        <text x="560" y="130" font-size="11" fill="var(--lime)" font-weight="600">GEMM</text>
        <text x="560" y="143" font-size="9" fill="var(--muted)">(I=100)</text>
        
        <!-- FFT (balanced) -->
        <circle cx="320" cy="200" r="8" fill="var(--orange)" opacity="0.8"/>
        <text x="330" y="205" font-size="11" fill="var(--orange)" font-weight="600">FFT</text>
        <text x="330" y="218" font-size="9" fill="var(--muted)">(I=5)</text>
      </g>
      
      <!-- Info Box -->
      <rect x="500" y="200" width="240" height="140" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
      <text x="520" y="225" font-weight="bold" font-size="13">Optimization Strategy:</text>
      <text x="515" y="250" font-size="11" fill="var(--pink)">• Memory-Bound:</text>
      <text x="525" y="265" font-size="10" fill="var(--muted)">Improve coalescing, use shared mem</text>
      <text x="515" y="290" font-size="11" fill="var(--cyan)">• Compute-Bound:</text>
      <text x="525" y="305" font-size="10" fill="var(--muted)">Increase occupancy, reduce divergence</text>
      <text x="515" y="325" font-size="11" fill="var(--orange)">• Balanced:</text>
      <text x="525" y="340" font-size="10" fill="var(--muted)">Optimize both compute & memory</text>
    </svg>
    <div class="diagram-insight">
      <strong>Roofline Model:</strong> Plots achieved performance vs operational intensity. Kernels below the memory bandwidth line are memory-bound (improve data access). Kernels below the compute ceiling are compute-bound (improve arithmetic intensity). Profiling tools like Nsight Compute map your kernel onto this model.
    </div>
  </div>`;
}

// Unit 3, Topic 4: Cloud HPC Deployment
export function diagramCloudHpc() {
  return `<div class="interactive-diagram" data-diagram="cloud-hpc">
    <div class="diagram-header">
      <h4>Cloud HPC Deployment: Scaling GPU Workloads</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-cloud-tier="single">Single GPU</button>
        <button class="button small" data-cloud-tier="multi">Multi-GPU Node</button>
        <button class="button small" data-cloud-tier="cluster">GPU Cluster</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <!-- Cloud Infrastructure Layers -->
      
      <!-- Layer 1: Single GPU Instance -->
      <g class="tier-single">
        <rect x="50" y="50" width="220" height="180" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="3" rx="10"/>
        <text x="160" y="80" text-anchor="middle" font-weight="bold" font-size="15" fill="var(--cyan)">Single GPU Instance</text>
        
        <!-- GPU Card -->
        <rect x="80" y="100" width="160" height="70" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="6"/>
        <text x="160" y="125" text-anchor="middle" font-size="12" font-weight="600">NVIDIA A100</text>
        <text x="160" y="145" text-anchor="middle" font-size="10" fill="var(--muted)">40 GB VRAM</text>
        <text x="160" y="160" text-anchor="middle" font-size="10" fill="var(--muted)">19.5 TFLOPS (FP32)</text>
        
        <text x="160" y="195" text-anchor="middle" font-size="11" fill="var(--muted)">Cost: ~$3/hour</text>
        <text x="160" y="215" text-anchor="middle" font-size="11" font-weight="600" fill="var(--cyan)">Use Case: Training, Inference</text>
      </g>
      
      <!-- Layer 2: Multi-GPU Node -->
      <g class="tier-multi" opacity="0.5">
        <rect x="300" y="50" width="220" height="180" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="3" rx="10"/>
        <text x="410" y="80" text-anchor="middle" font-weight="bold" font-size="15" fill="var(--lime)">Multi-GPU Node</text>
        
        <!-- 8 GPUs -->
        ${Array.from({length: 4}, (_, i) => `
          <rect x="${320 + (i % 2) * 85}" y="${110 + Math.floor(i / 2) * 45}" width="70" height="35" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1.5" rx="4"/>
          <text x="${355 + (i % 2) * 85}" y="${132 + Math.floor(i / 2) * 45}" text-anchor="middle" font-size="9">GPU ${i}</text>
        `).join('')}
        
        <text x="410" y="195" text-anchor="middle" font-size="11" fill="var(--muted)">8x A100 (NVLink)</text>
        <text x="410" y="215" text-anchor="middle" font-size="11" font-weight="600" fill="var(--lime)">Use Case: Large Model Training</text>
      </g>
      
      <!-- Layer 3: GPU Cluster -->
      <g class="tier-cluster" opacity="0.3">
        <rect x="550" y="50" width="220" height="180" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="3" rx="10"/>
        <text x="660" y="80" text-anchor="middle" font-weight="bold" font-size="15" fill="var(--pink)">GPU Cluster</text>
        
        <!-- Multiple Nodes -->
        ${Array.from({length: 6}, (_, i) => `
          <rect x="${570 + (i % 3) * 65}" y="${100 + Math.floor(i / 3) * 50}" width="55" height="40" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1.5" rx="4"/>
          <text x="${597.5 + (i % 3) * 65}" y="${123 + Math.floor(i / 3) * 50}" text-anchor="middle" font-size="8">Node ${i}</text>
        `).join('')}
        
        <text x="660" y="195" text-anchor="middle" font-size="11" fill="var(--muted)">256+ GPUs (Infiniband)</text>
        <text x="660" y="215" text-anchor="middle" font-size="11" font-weight="600" fill="var(--pink)">Use Case: Supercomputing</text>
      </g>
      
      <!-- Communication Bandwidth -->
      <g transform="translate(50, 260)">
        <rect x="0" y="0" width="700" height="160" fill="var(--paper)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="10" y="25" font-weight="bold" font-size="14">Communication Bandwidth:</text>
        
        <text x="20" y="50" font-size="12" fill="var(--cyan)" font-weight="600">PCIe Gen 4:</text>
        <text x="30" y="68" font-size="11" fill="var(--muted)">• 64 GB/s per GPU (to CPU)</text>
        <text x="30" y="83" font-size="11" fill="var(--muted)">• Bottleneck for CPU-GPU data transfer</text>
        
        <text x="20" y="108" font-size="12" fill="var(--lime)" font-weight="600">NVLink 3.0:</text>
        <text x="30" y="126" font-size="11" fill="var(--muted)">• 600 GB/s between GPUs (per GPU pair)</text>
        <text x="30" y="141" font-size="11" fill="var(--muted)">• Enables efficient multi-GPU training</text>
        
        <text x="380" y="50" font-size="12" fill="var(--pink)" font-weight="600">Infiniband HDR:</text>
        <text x="390" y="68" font-size="11" fill="var(--muted)">• 200 Gb/s between nodes</text>
        <text x="390" y="83" font-size="11" fill="var(--muted)">• Low latency (~1-2 μs)</text>
        
        <text x="380" y="108" font-size="12" fill="var(--orange)" font-weight="600">Scaling Challenge:</text>
        <text x="390" y="126" font-size="11" fill="var(--muted)">• Communication overhead increases</text>
        <text x="390" y="141" font-size="11" fill="var(--muted)">• Need distributed training frameworks</text>
      </g>
    </svg>
    <div class="diagram-insight" data-cloud-insight>
      <strong>Cloud HPC Scaling:</strong> Single GPUs handle most workloads. Multi-GPU nodes (NVLink) enable large model training. GPU clusters (Infiniband) tackle supercomputing problems. Key challenge: minimize communication overhead as you scale.
    </div>
  </div>`;
}


// Unit 4 Quantum Computing Diagrams

export function diagramQubitBloch() {
  return `<div class="interactive-diagram" data-diagram="qubit-bloch">
    <div class="diagram-header">
      <h4>Qubit State: Bloch Sphere Representation</h4>
      <p class="diagram-subtitle">Visualizing superposition states</p>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <ellipse cx="400" cy="250" rx="180" ry="180" fill="var(--cyan-soft)" opacity="0.2" stroke="var(--cyan)" stroke-width="2"/>
      <line x1="220" y1="250" x2="580" y2="250" stroke="var(--line)" stroke-width="2"/>
      <text x="590" y="255" font-size="14" font-weight="600">X</text>
      <line x1="400" y1="70" x2="400" y2="430" stroke="var(--line)" stroke-width="2"/>
      <text x="410" y="60" font-size="14" font-weight="600">Z</text>
      <line x1="400" y1="250" x2="400" y2="90" stroke="var(--pink)" stroke-width="4" class="state-vector"/>
      <circle cx="400" cy="90" r="8" fill="var(--pink)"/>
      <text x="405" y="55" text-anchor="middle" font-size="16" font-weight="700" fill="var(--cyan)">|0⟩</text>
      <text x="405" y="450" text-anchor="middle" font-size="16" font-weight="700" fill="var(--cyan)">|1⟩</text>
      <rect x="50" y="30" width="200" height="140" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
      <text x="150" y="60" text-anchor="middle" font-weight="bold" font-size="13">Qubit State</text>
      <text x="150" y="90" text-anchor="middle" font-size="16" font-weight="700" fill="var(--pink)">|ψ⟩ = α|0⟩ + β|1⟩</text>
      <text x="150" y="120" text-anchor="middle" font-size="11" fill="var(--muted)">|α|² + |β|² = 1</text>
    </svg>
    <div class="diagram-insight">
      <strong>Bloch Sphere:</strong> Every single-qubit state maps to a point on a sphere surface. North pole = |0⟩, South pole = |1⟩. Superposition states lie between poles.
    </div>
  </div>`;
}

export function diagramQuantumGates() {
  return `<div class="interactive-diagram" data-diagram="quantum-gates">
    <div class="diagram-header">
      <h4>Single-Qubit Quantum Gates</h4>
      <p class="diagram-subtitle">Unitary transformations on the Bloch sphere</p>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <text x="50" y="40" font-weight="bold" font-size="18" fill="var(--cyan)">Common Quantum Gates</text>
      <g transform="translate(50, 70)">
        <rect x="0" y="0" width="160" height="100" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Hadamard (H)</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Creates superposition</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">H|0⟩ = |+⟩</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">H|1⟩ = |-⟩</text>
      </g>
      <g transform="translate(240, 70)">
        <rect x="0" y="0" width="160" height="100" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Pauli-X</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Bit flip (NOT gate)</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">X|0⟩ = |1⟩</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">X|1⟩ = |0⟩</text>
      </g>
      <g transform="translate(430, 70)">
        <rect x="0" y="0" width="160" height="100" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Pauli-Z</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Phase flip</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">Z|0⟩ = |0⟩</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">Z|1⟩ = -|1⟩</text>
      </g>
      <g transform="translate(620, 70)">
        <rect x="0" y="0" width="160" height="100" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">CNOT</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">2-qubit entangling</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">Control + Target</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">Creates entanglement</text>
      </g>
    </svg>
    <div class="diagram-insight">
      <strong>Quantum Gates:</strong> Unitary matrices that transform qubit states. Hadamard creates superposition, Pauli gates flip bits/phases, CNOT entangles qubits.
    </div>
  </div>`;
}


export function diagramQuantumAlgorithms() {
  return `<div class="interactive-diagram" data-diagram="quantum-algorithms">
    <div class="diagram-header">
      <h4>Quantum Algorithm: Grover Search</h4>
      <p class="diagram-subtitle">Quadratic speedup for unstructured search</p>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <text x="400" y="35" text-anchor="middle" font-weight="bold" font-size="18" fill="var(--cyan)">Grover's Algorithm Steps</text>
      <g transform="translate(50, 60)">
        <rect x="0" y="0" width="150" height="80" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">1. Initialize</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">Apply H⊗n</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Equal superposition</text>
      </g>
      <path d="M 200 100 L 240 100" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <g transform="translate(240, 60)">
        <rect x="0" y="0" width="150" height="80" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">2. Oracle</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">Mark target</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Phase flip</text>
      </g>
      <path d="M 390 100 L 430 100" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <g transform="translate(430, 60)">
        <rect x="0" y="0" width="150" height="80" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">3. Diffusion</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">Amplify amplitude</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Inversion about avg</text>
      </g>
      <path d="M 580 100 L 620 100" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <g transform="translate(620, 60)">
        <rect x="0" y="0" width="150" height="80" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">4. Measure</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">High probability</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Find target</text>
      </g>
      <text x="315" y="170" text-anchor="middle" font-style="italic" fill="var(--muted)">Repeat √N times</text>
      <path d="M 430 145 Q 315 190 200 145" stroke="var(--orange)" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow-orange)"/>
      <defs>
        <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="var(--orange)"/>
        </marker>
      </defs>
    </svg>
    <div class="diagram-insight">
      <strong>Grover's Algorithm:</strong> Searches N items in O(√N) time vs O(N) classically. Oracle marks target, diffusion amplifies its amplitude through √N iterations.
    </div>
  </div>`;
}

export function diagramVqeCircuit() {
  return `<div class="interactive-diagram" data-diagram="vqe-circuit">
    <div class="diagram-header">
      <h4>Variational Quantum Eigensolver (VQE)</h4>
      <p class="diagram-subtitle">Hybrid quantum-classical algorithm</p>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <rect x="50" y="50" width="700" height="350" fill="var(--surface)" stroke="var(--cyan)" stroke-width="2" rx="12"/>
      <text x="400" y="85" text-anchor="middle" font-weight="bold" font-size="16" fill="var(--cyan)">VQE Workflow</text>
      <g transform="translate(100, 120)">
        <rect x="0" y="0" width="180" height="100" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="90" y="30" text-anchor="middle" font-weight="bold" font-size="13">Quantum Device</text>
        <text x="90" y="50" text-anchor="middle" font-size="10" fill="var(--muted)">Prepare ansatz state</text>
        <text x="90" y="70" text-anchor="middle" font-size="10" fill="var(--muted)">|ψ(θ)⟩</text>
        <text x="90" y="90" text-anchor="middle" font-size="10" fill="var(--muted)">Measure ⟨H⟩</text>
      </g>
      <path d="M 280 170 L 350 170" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <text x="315" y="165" text-anchor="middle" font-size="10" fill="var(--muted)">Energy E(θ)</text>
      <g transform="translate(350, 120)">
        <rect x="0" y="0" width="180" height="100" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="90" y="30" text-anchor="middle" font-weight="bold" font-size="13">Classical Computer</text>
        <text x="90" y="55" text-anchor="middle" font-size="10" fill="var(--muted)">Optimizer updates θ</text>
        <text x="90" y="75" text-anchor="middle" font-size="10" fill="var(--muted)">Minimize E(θ)</text>
        <text x="90" y="95" text-anchor="middle" font-size="10" fill="var(--muted)">(gradient descent)</text>
      </g>
      <path d="M 440 220 Q 440 280 200 280 Q 200 240 100 220" stroke="var(--line)" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow-cyan)"/>
      <text x="270" y="300" text-anchor="middle" font-size="10" fill="var(--muted)">New parameters θ</text>
      <g transform="translate(560, 120)">
        <rect x="0" y="0" width="160" height="100" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="13">Result</text>
        <text x="80" y="55" text-anchor="middle" font-size="10" fill="var(--muted)">Ground state energy</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" fill="var(--muted)">E₀ ≈ min E(θ)</text>
      </g>
    </svg>
    <div class="diagram-insight">
      <strong>VQE:</strong> Hybrid algorithm for finding molecular ground states. Quantum device prepares trial states, classical optimizer minimizes energy. Used in quantum chemistry simulations.
    </div>
  </div>`;
}
