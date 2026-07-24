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
  'amdahl-law': diagramAmdahlLaw
};
