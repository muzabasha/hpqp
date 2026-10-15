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

// Unit 1, Topic 5: TOP500, Green500, and Cluster Architecture
export function diagramTop500Cluster() {
  return `<div class="interactive-diagram" data-diagram="top500-cluster">
    <div class="diagram-header">
      <h4>TOP500 & Green500 Supercomputing Cluster Architecture</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-cluster-mode="arch">Cluster Hierarchy</button>
        <button class="button small" data-cluster-mode="linpack">LINPACK (Rmax/Rpeak)</button>
        <button class="button small" data-cluster-mode="green500">Green500 PUE & Efficiency</button>
      </div>
    </div>
    <svg viewBox="0 0 800 480" class="diagram-svg">
      <!-- Cluster Facility Frame -->
      <rect x="20" y="20" width="760" height="440" fill="var(--surface)" stroke="var(--cyan)" stroke-width="2" rx="12"/>
      <text x="40" y="50" font-weight="bold" font-size="16" fill="var(--cyan)">HPC Data Center / Supercomputer Cluster Fabric</text>

      <!-- Rack 1 -->
      <g class="cluster-rack" data-rack="1" transform="translate(40, 70)">
        <rect x="0" y="0" width="130" height="260" fill="var(--surface-sunken)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="65" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--ink)">Rack 01</text>
        ${[0, 1, 2, 3].map((b) => `
          <g transform="translate(10, ${40 + b * 50})">
            <rect x="0" y="0" width="110" height="40" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1.5" rx="4"/>
            <text x="55" y="18" text-anchor="middle" font-size="10" font-weight="600">Blade Node ${b + 1}</text>
            <text x="55" y="32" text-anchor="middle" font-size="8" fill="var(--muted)">2x CPU + 4x GPU</text>
          </g>
        `).join('')}
      </g>

      <!-- Rack 2 -->
      <g class="cluster-rack" data-rack="2" transform="translate(190, 70)">
        <rect x="0" y="0" width="130" height="260" fill="var(--surface-sunken)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="65" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--ink)">Rack 02</text>
        ${[0, 1, 2, 3].map((b) => `
          <g transform="translate(10, ${40 + b * 50})">
            <rect x="0" y="0" width="110" height="40" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="1.5" rx="4"/>
            <text x="55" y="18" text-anchor="middle" font-size="10" font-weight="600">Blade Node ${b + 5}</text>
            <text x="55" y="32" text-anchor="middle" font-size="8" fill="var(--muted)">2x CPU + 4x GPU</text>
          </g>
        `).join('')}
      </g>

      <!-- Compute Node Breakdown (Zoomed Inspection) -->
      <g transform="translate(340, 70)">
        <rect x="0" y="0" width="420" height="260" fill="var(--surface)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="210" y="25" text-anchor="middle" font-weight="bold" font-size="14" fill="var(--orange)">Compute Node Architecture Breakdown</text>

        <!-- Host Dual-Socket CPUs -->
        <rect x="20" y="45" width="180" height="55" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1.5" rx="6"/>
        <text x="110" y="68" text-anchor="middle" font-size="11" font-weight="bold">Dual Host CPUs</text>
        <text x="110" y="86" text-anchor="middle" font-size="9" fill="var(--muted)">2× AMD EPYC / Intel Xeon (128 Cores)</text>

        <!-- High-Speed Interconnect -->
        <rect x="220" y="45" width="180" height="55" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="1.5" rx="6"/>
        <text x="310" y="68" text-anchor="middle" font-size="11" font-weight="bold">Fabric Interconnect</text>
        <text x="310" y="86" text-anchor="middle" font-size="9" fill="var(--muted)">400 Gbps InfiniBand / Slingshot</text>

        <!-- GPU Accelerators -->
        <text x="210" y="125" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--lime)">Accelerated GPUs (Direct Liquid Cooled)</text>
        ${[0, 1, 2, 3].map((g) => `
          <g transform="translate(${25 + g * 95}, 135)">
            <rect x="0" y="0" width="85" height="55" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="1.5" rx="4"/>
            <text x="42.5" y="24" text-anchor="middle" font-size="10" font-weight="bold">GPU ${g}</text>
            <text x="42.5" y="40" text-anchor="middle" font-size="8" fill="var(--muted)">A100 / MI250X</text>
          </g>
        `).join('')}

        <!-- Liquid Cooling Pipes -->
        <path d="M 15 210 L 405 210" stroke="var(--cyan)" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="210" y="235" text-anchor="middle" font-size="10" fill="var(--cyan)" font-weight="600">Direct-to-Chip Chilled Liquid Loop (PUE = 1.03)</text>
      </g>

      <!-- Dynamic Metrics & Insights Panel -->
      <g transform="translate(40, 350)">
        <rect x="0" y="0" width="720" height="90" fill="var(--surface-sunken)" stroke="var(--line)" stroke-width="1.5" rx="8"/>
        
        <g transform="translate(30, 25)">
          <text x="0" y="0" font-size="11" fill="var(--muted)">TOP500 Metric (LINPACK Rmax):</text>
          <text x="0" y="25" font-size="16" font-weight="bold" fill="var(--cyan)" data-cluster-metric-1>1.194 EFLOPS (Frontier #1)</text>
          <text x="0" y="45" font-size="10" fill="var(--muted)" data-cluster-sub-1>HPL benchmark actual sustained performance</text>
        </g>

        <g transform="translate(290, 25)">
          <text x="0" y="0" font-size="11" fill="var(--muted)">Theoretical Peak (Rpeak):</text>
          <text x="0" y="25" font-size="16" font-weight="bold" fill="var(--lime)" data-cluster-metric-2>1.685 EFLOPS</text>
          <text x="0" y="45" font-size="10" fill="var(--muted)" data-cluster-sub-2>Efficiency Rmax / Rpeak = 70.8%</text>
        </g>

        <g transform="translate(530, 25)">
          <text x="0" y="0" font-size="11" fill="var(--muted)">Green500 Power Efficiency:</text>
          <text x="0" y="25" font-size="16" font-weight="bold" fill="var(--orange)" data-cluster-metric-3>52.5 GFLOPS / Watt</text>
          <text x="0" y="45" font-size="10" fill="var(--muted)" data-cluster-sub-3>PUE: 1.03 | Direct Warm-Water Cooled</text>
        </g>
      </g>
    </svg>
    <div class="diagram-insight" data-cluster-insight>
      <strong>TOP500 vs Green500:</strong> TOP500 ranks clusters by raw sustained LINPACK performance (Rmax in PFLOPS/EFLOPS). Green500 ranks them by energy efficiency (GFLOPS/Watt). Exascale systems rely on GPU accelerators and liquid cooling to keep facility Power Usage Effectiveness (PUE) below 1.10.
    </div>
  </div>`;
}

// Export all diagram rendering functions
export const DIAGRAM_REGISTRY = {
  'parallel-processing': diagramParallelProcessing,
  'flynn-taxonomy': diagramFlynnTaxonomy,
  'memory-hierarchy': diagramMemoryHierarchy,
  'amdahl-law': diagramAmdahlLaw,
  'top500-cluster': diagramTop500Cluster,
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

// Unit 3, Topic 1: CUDA Basics - Threads, Blocks, Grids & SIMT Execution
export function diagramCudaBasics() {
  return `<div class="interactive-diagram" data-diagram="cuda-basics">
    <div class="diagram-header">
      <div>
        <h4>CUDA Execution Model: Threads, Blocks, Grids &amp; SIMT</h4>
        <p class="diagram-subtitle">Real-time thread coordinate mapping, warp lockstep execution, and branch divergence visualizer</p>
      </div>
      <div class="diagram-controls">
        <button type="button" class="button small primary" data-cuda-view="hierarchy">Hierarchy</button>
        <button type="button" class="button small" data-cuda-view="simt">SIMT Lockstep</button>
        <button type="button" class="button small" data-cuda-view="divergence">Branch Divergence</button>
        <button type="button" class="button small" data-cuda-action="step-warp">▶ Animate Warp</button>
        <button type="button" class="button small" data-cuda-action="reset">⟲ Reset</button>
      </div>
    </div>

    <!-- Interactive Coordinate Controls & Formula Bar -->
    <div class="diagram-toolbar" style="display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center; background:var(--paper); padding:0.85rem 1rem; border-radius:10px; margin-bottom:1rem; border:1px solid var(--line);">
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <label style="font-size:0.85rem; font-weight:600; color:var(--text);">Block ID (<span style="color:var(--lime);">blockIdx.x</span>):</label>
        <input type="range" min="0" max="3" value="0" step="1" data-cuda-block-slider style="width:90px; cursor:pointer;" />
        <span class="badge" data-cuda-block-display style="background:var(--lime-soft); color:var(--lime); font-weight:700;">0</span>
      </div>
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <label style="font-size:0.85rem; font-weight:600; color:var(--text);">Thread ID (<span style="color:var(--pink);">threadIdx.x</span>):</label>
        <input type="range" min="0" max="31" value="0" step="1" data-cuda-thread-slider style="width:130px; cursor:pointer;" />
        <span class="badge" data-cuda-thread-display style="background:var(--pink-soft); color:var(--pink); font-weight:700;">0</span>
      </div>
      <div style="margin-left:auto; font-size:0.85rem; font-family:monospace; background:var(--surface); padding:0.35rem 0.75rem; border-radius:6px; border:1px solid var(--line);" data-cuda-formula>
        <strong>1D Index:</strong> <span style="color:var(--cyan);">idx = 0 &times; 32 + 0 = 0</span>
      </div>
    </div>

    <svg viewBox="0 0 800 480" class="diagram-svg" data-cuda-svg>
      <!-- Grid Boundary -->
      <rect x="15" y="15" width="770" height="450" fill="var(--surface)" stroke="var(--cyan)" stroke-width="2" rx="12"/>
      <g transform="translate(30, 42)">
        <text font-weight="800" font-size="16" fill="var(--cyan)">Grid (Kernel Launch: 4 Blocks &times; 32 Threads = 128 Threads)</text>
      </g>

      <!-- 4 Blocks in Grid -->
      <g class="cuda-blocks-container">
        <!-- Block 0 -->
        <g class="cuda-block-card" data-block-id="0" transform="translate(30, 60)">
          <rect x="0" y="0" width="170" height="230" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2.5" rx="8" class="cuda-block-bg"/>
          <text x="85" y="24" text-anchor="middle" font-weight="700" font-size="13" fill="var(--lime)">Block 0 (Active)</text>
          
          <!-- Warp 0 in Block 0: 32 thread lanes (8x4 grid) -->
          <g class="warp-lanes" data-warp-id="0" transform="translate(10, 38)">
            <rect x="0" y="0" width="150" height="150" fill="var(--surface)" stroke="var(--line)" rx="6"/>
            <text x="75" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">Warp 0 (32 Lanes)</text>
            <g class="thread-grid" transform="translate(10, 26)">
              ${Array.from({length: 32}, (_, i) => {
                const col = i % 8;
                const row = Math.floor(i / 8);
                return `<rect class="cuda-thread-cell" data-t="${i}" x="${col * 16.5}" y="${row * 28}" width="13" height="22" rx="3" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="1.2" style="cursor:pointer; transition:all 0.2s;" />
                <text class="cuda-thread-lbl" data-t-lbl="${i}" x="${col * 16.5 + 6.5}" y="${row * 28 + 15}" text-anchor="middle" font-size="8" font-weight="700" fill="var(--pink)" pointer-events="none">${i}</text>`;
              }).join('')}
            </g>
          </g>
          <text x="85" y="212" text-anchor="middle" font-size="10" fill="var(--muted)" font-weight="600">32 Threads / Warp</text>
        </g>

        <!-- Block 1 -->
        <g class="cuda-block-card" data-block-id="1" transform="translate(220, 60)">
          <rect x="0" y="0" width="170" height="230" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5" rx="8" opacity="0.8" class="cuda-block-bg"/>
          <text x="85" y="24" text-anchor="middle" font-weight="700" font-size="13" fill="var(--muted)">Block 1</text>
          <rect x="10" y="38" width="150" height="150" fill="var(--paper)" stroke="var(--line)" stroke-dasharray="4,4" rx="6"/>
          <text x="85" y="115" text-anchor="middle" font-size="12" fill="var(--muted)">Threads 32..63</text>
          <text x="85" y="212" text-anchor="middle" font-size="10" fill="var(--muted)">Warp 1</text>
        </g>

        <!-- Block 2 -->
        <g class="cuda-block-card" data-block-id="2" transform="translate(410, 60)">
          <rect x="0" y="0" width="170" height="230" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5" rx="8" opacity="0.6" class="cuda-block-bg"/>
          <text x="85" y="24" text-anchor="middle" font-weight="700" font-size="13" fill="var(--muted)">Block 2</text>
          <rect x="10" y="38" width="150" height="150" fill="var(--paper)" stroke="var(--line)" stroke-dasharray="4,4" rx="6"/>
          <text x="85" y="115" text-anchor="middle" font-size="12" fill="var(--muted)">Threads 64..95</text>
          <text x="85" y="212" text-anchor="middle" font-size="10" fill="var(--muted)">Warp 2</text>
        </g>

        <!-- Block 3 -->
        <g class="cuda-block-card" data-block-id="3" transform="translate(600, 60)">
          <rect x="0" y="0" width="170" height="230" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5" rx="8" opacity="0.6" class="cuda-block-bg"/>
          <text x="85" y="24" text-anchor="middle" font-weight="700" font-size="13" fill="var(--muted)">Block 3</text>
          <rect x="10" y="38" width="150" height="150" fill="var(--paper)" stroke="var(--line)" stroke-dasharray="4,4" rx="6"/>
          <text x="85" y="115" text-anchor="middle" font-size="12" fill="var(--muted)">Threads 96..127</text>
          <text x="85" y="212" text-anchor="middle" font-size="10" fill="var(--muted)">Warp 3</text>
        </g>
      </g>

      <!-- Hardware Execution Plane: Streaming Multiprocessor (SM) & Architecture -->
      <g transform="translate(30, 310)">
        <rect x="0" y="0" width="440" height="135" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5" rx="8"/>
        <text x="15" y="24" font-weight="800" font-size="12" fill="var(--cyan)">Hardware SM Core Architecture</text>
        
        <!-- Warp Scheduler -->
        <rect x="15" y="36" width="130" height="40" fill="var(--cyan-soft)" stroke="var(--cyan)" rx="5"/>
        <text x="80" y="55" text-anchor="middle" font-size="10" font-weight="700">Warp Scheduler</text>
        <text x="80" y="68" text-anchor="middle" font-size="8" fill="var(--muted)">Zero-overhead switch</text>

        <!-- Register File -->
        <rect x="155" y="36" width="130" height="40" fill="var(--pink-soft)" stroke="var(--pink)" rx="5"/>
        <text x="220" y="55" text-anchor="middle" font-size="10" font-weight="700">64K Registers</text>
        <text x="220" y="68" text-anchor="middle" font-size="8" fill="var(--muted)">Per-thread private</text>

        <!-- Shared Memory / L1 -->
        <rect x="295" y="36" width="130" height="40" fill="var(--lime-soft)" stroke="var(--lime)" rx="5"/>
        <text x="360" y="55" text-anchor="middle" font-size="10" font-weight="700">48 KB Shared Mem</text>
        <text x="360" y="68" text-anchor="middle" font-size="8" fill="var(--muted)">Block-wide __syncthreads()</text>

        <text x="15" y="100" font-size="11" fill="var(--text)" data-cuda-status>
          ⚡ <strong>SIMT Lockstep:</strong> 32 threads in Warp 0 execute identical PC instruction simultaneously.
        </text>
        <text x="15" y="120" font-size="10" fill="var(--muted)" data-cuda-substatus>
          SM Hardware maintains separate program counter &amp; active mask per warp.
        </text>
      </g>

      <!-- Live Thread Telemetry HUD -->
      <g transform="translate(490, 310)">
        <rect x="0" y="0" width="280" height="135" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5" rx="8"/>
        <text x="15" y="24" font-weight="800" font-size="12" fill="var(--lime)">Selected Thread Telemetry</text>
        
        <text x="15" y="50" font-size="11">Global Index: <tspan font-weight="700" fill="var(--cyan)" data-hud-idx>0</tspan></text>
        <text x="15" y="70" font-size="11">Coordinate: <tspan font-weight="700" fill="var(--text)" data-hud-coord>Block 0, Thread 0</tspan></text>
        <text x="15" y="90" font-size="11">Warp Lane ID: <tspan font-weight="700" fill="var(--pink)" data-hud-lane>Lane 0 of 32</tspan></text>
        <text x="15" y="112" font-size="10" font-weight="700" fill="var(--lime)" data-hud-state>Status: ACTIVE (Executing)</text>
      </g>
    </svg>

    <div class="diagram-insight" data-cuda-insight>
      <strong>CUDA Execution Hierarchy:</strong> A kernel launches a <strong>Grid</strong> of <strong>Blocks</strong> mapped onto hardware <strong>Streaming Multiprocessors (SMs)</strong>. Each block is partitioned into 32-thread <strong>Warps</strong> that execute in SIMT lockstep. Each thread computes its unique memory index via <code>int idx = blockIdx.x * blockDim.x + threadIdx.x</code>.
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



// Unit 3, Topic 2: Memory Coalescing & Shared Memory Bank Conflicts
export function diagramMemoryCoalescing() {
  return `<div class="interactive-diagram" data-diagram="memory-coalescing">
    <div class="diagram-header">
      <div>
        <h4>GPU Memory Access Patterns: Coalescing &amp; Bank Conflicts</h4>
        <p class="diagram-subtitle">Explore 128-byte global memory cache line transactions and 32-bank shared memory collisions</p>
      </div>
      <div class="diagram-controls">
        <button type="button" class="button small primary" data-coalesce-mode="global">Global Coalescing</button>
        <button type="button" class="button small" data-coalesce-mode="shared">Shared Mem Banks</button>
        <button type="button" class="button small" data-coalesce-action="burst">▶ Animate Bus Burst</button>
        <button type="button" class="button small" data-coalesce-action="reset">⟲ Reset</button>
      </div>
    </div>

    <!-- Controls Toolbar -->
    <div class="diagram-toolbar" style="display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center; background:var(--paper); padding:0.85rem 1rem; border-radius:10px; margin-bottom:1rem; border:1px solid var(--line);">
      <div style="display:flex; align-items:center; gap:0.5rem;" data-coalesce-stride-control>
        <label style="font-size:0.85rem; font-weight:600; color:var(--text);">Global Stride (s):</label>
        <button type="button" class="button small primary" data-coalesce-stride="1">s=1 (Ideal)</button>
        <button type="button" class="button small" data-coalesce-stride="2">s=2</button>
        <button type="button" class="button small" data-coalesce-stride="4">s=4</button>
        <button type="button" class="button small" data-coalesce-stride="8">s=8</button>
        <button type="button" class="button small" data-coalesce-stride="16">s=16 (Worst)</button>
      </div>
      <div style="display:none; align-items:center; gap:0.5rem;" data-coalesce-pad-control>
        <label style="font-size:0.85rem; font-weight:600; color:var(--text);">Shared Memory Padding:</label>
        <button type="button" class="button small primary" data-coalesce-pad="0">Pad +0 (Conflicts)</button>
        <button type="button" class="button small" data-coalesce-pad="1">Pad +1 (Conflict-Free)</button>
      </div>
      <div style="margin-left:auto; display:flex; gap:0.75rem; align-items:center;">
        <span class="badge" data-coalesce-badge-tx style="background:var(--cyan-soft); color:var(--cyan); font-weight:700;">1 Transaction</span>
        <span class="badge" data-coalesce-badge-bw style="background:var(--lime-soft); color:var(--lime); font-weight:700;">900 GB/s</span>
      </div>
    </div>

    <svg viewBox="0 0 800 460" class="diagram-svg" data-coalesce-svg>
      <!-- Global Memory View (Default) -->
      <g class="coalesce-global-view">
        <!-- 16 Global Memory Words with 128-Byte Cache Segments -->
        <text x="25" y="32" font-weight="700" font-size="13" fill="var(--text)">DRAM / HBM Global Memory Array (128-Byte Cache Lines):</text>
        <g class="global-mem-words" transform="translate(25, 45)">
          ${Array.from({length: 16}, (_, i) => `
            <rect class="mem-slot" data-slot="${i}" x="${i * 46.5}" y="0" width="42" height="42" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1.8" rx="5" />
            <text x="${i * 46.5 + 21}" y="25" text-anchor="middle" font-size="11" font-weight="700" fill="var(--cyan)">[${i}]</text>
          `).join('')}
        </g>
        
        <!-- 128-Byte Cache Line Brackets -->
        <g transform="translate(25, 95)">
          <rect x="0" y="0" width="368" height="24" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1.5" rx="4"/>
          <text x="184" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="var(--orange)">Cache Line 0 (Words 0..7: 128 Bytes)</text>

          <rect x="375" y="0" width="368" height="24" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="1.5" rx="4"/>
          <text x="559" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="var(--pink)">Cache Line 1 (Words 8..15: 128 Bytes)</text>
        </g>

        <!-- Connecting Access Vectors from Threads to Memory -->
        <g class="coalesce-access-arrows" data-coalesce-arrows transform="translate(25, 0)">
          ${Array.from({length: 16}, (_, i) => `
            <line x1="${i * 46.5 + 21}" y1="210" x2="${i * 46.5 + 21}" y2="92" stroke="var(--lime)" stroke-width="2" stroke-linecap="round" marker-end="url(#arrow-coalesce-lime)" class="access-vector" />
          `).join('')}
        </g>

        <!-- Warp Threads (16 Threads Representing Half-Warp) -->
        <text x="25" y="185" font-weight="700" font-size="13" fill="var(--text)">Warp Execution Threads (SIMT Lockstep Access):</text>
        <g class="warp-lane-threads" transform="translate(25, 205)">
          ${Array.from({length: 16}, (_, i) => `
            <circle class="lane-circle" data-lane="${i}" cx="${i * 46.5 + 21}" cy="22" r="17" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2"/>
            <text x="${i * 46.5 + 21}" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="var(--lime)">T${i}</text>
          `).join('')}
        </g>
      </g>

      <!-- Shared Memory View (Hidden by default) -->
      <g class="coalesce-shared-view" style="display:none;" transform="translate(25, 20)">
        <text x="0" y="20" font-weight="700" font-size="14" fill="var(--lime)">Shared Memory 16-Bank Structure (4 Bytes / Bank):</text>
        <g class="shared-banks-grid" transform="translate(0, 35)">
          ${Array.from({length: 16}, (_, b) => `
            <g class="bank-col" data-bank="${b}" transform="translate(${b * 46.5}, 0)">
              <rect x="0" y="0" width="42" height="190" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5" rx="4"/>
              <text x="21" y="20" text-anchor="middle" font-size="9" font-weight="800" fill="var(--muted)">Bank ${b}</text>
              <rect class="bank-cell cell-0" x="4" y="32" width="34" height="30" rx="3" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1"/>
              <text x="21" y="51" text-anchor="middle" font-size="9" font-weight="700">W${b}</text>
              <rect class="bank-cell cell-1" x="4" y="68" width="34" height="30" rx="3" fill="var(--paper)" stroke="var(--line)" stroke-width="1"/>
              <text x="21" y="87" text-anchor="middle" font-size="9" fill="var(--muted)">W${b + 16}</text>
              <rect class="bank-cell cell-2" x="4" y="104" width="34" height="30" rx="3" fill="var(--paper)" stroke="var(--line)" stroke-width="1"/>
              <text x="21" y="123" text-anchor="middle" font-size="9" fill="var(--muted)">W${b + 32}</text>
              <rect class="bank-cell cell-3" x="4" y="140" width="34" height="30" rx="3" fill="var(--paper)" stroke="var(--line)" stroke-width="1"/>
              <text x="21" y="159" text-anchor="middle" font-size="9" fill="var(--muted)">W${b + 48}</text>
            </g>
          `).join('')}
        </g>
      </g>

      <!-- Live Bus Telemetry Panel -->
      <g transform="translate(25, 290)">
        <rect x="0" y="0" width="750" height="150" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5" rx="8"/>
        <text x="20" y="28" font-weight="800" font-size="13" fill="var(--cyan)">Memory Bus Controller Telemetry</text>

        <!-- Metric 1: Transactions -->
        <g transform="translate(20, 45)">
          <rect x="0" y="0" width="220" height="85" fill="var(--surface)" stroke="var(--line)" rx="6"/>
          <text x="15" y="24" font-size="11" fill="var(--muted)">Bus Transactions / Warp:</text>
          <text x="15" y="55" font-size="22" font-weight="800" fill="var(--lime)" data-metric-tx>1 Transaction</text>
          <text x="15" y="75" font-size="10" fill="var(--muted)" data-metric-tx-note>100% Coalesced (128-byte payload)</text>
        </g>

        <!-- Metric 2: Effective Bandwidth -->
        <g transform="translate(260, 45)">
          <rect x="0" y="0" width="220" height="85" fill="var(--surface)" stroke="var(--line)" rx="6"/>
          <text x="15" y="24" font-size="11" fill="var(--muted)">Effective Bandwidth:</text>
          <text x="15" y="55" font-size="22" font-weight="800" fill="var(--cyan)" data-metric-bw>900 GB/s</text>
          <text x="15" y="75" font-size="10" fill="var(--muted)" data-metric-bw-note>Theoretical HBM2 peak saturated</text>
        </g>

        <!-- Metric 3: Bus Efficiency -->
        <g transform="translate(500, 45)">
          <rect x="0" y="0" width="230" height="85" fill="var(--surface)" stroke="var(--line)" rx="6"/>
          <text x="15" y="24" font-size="11" fill="var(--muted)">Memory Bus Efficiency:</text>
          <text x="15" y="55" font-size="22" font-weight="800" fill="var(--lime)" data-metric-eff>100.0%</text>
          <text x="15" y="75" font-size="10" fill="var(--muted)" data-metric-eff-note>Zero wasted bus bytes</text>
        </g>
      </g>

      <defs>
        <marker id="arrow-coalesce-lime" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="var(--lime)"/>
        </marker>
        <marker id="arrow-coalesce-pink" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="var(--pink)"/>
        </marker>
      </defs>
    </svg>

    <div class="diagram-insight" data-coalesce-insight>
      <strong>Memory Coalescing Principle:</strong> When consecutive threads in a warp access contiguous 4-byte or 8-byte global memory words (stride=1), the GPU memory controller combines all 32 requests into a <strong>single 128-byte cache line transaction</strong>. Strided access (e.g. stride=16) fragments the requests into 16 separate transactions, wasting 93.75% of memory bus bandwidth!
    </div>
  </div>`;
}

// Unit 3, Topic 3: GPU Performance Profiling & Roofline Model Sandbox
export function diagramGpuProfiling() {
  return `<div class="interactive-diagram" data-diagram="gpu-profiling">
    <div class="diagram-header">
      <div>
        <h4>GPU Performance Profiling: Interactive Roofline Sandbox</h4>
        <p class="diagram-subtitle">Real-time arithmetic intensity tuning, ceiling boundaries, and kernel bottleneck diagnostics</p>
      </div>
      <div class="diagram-controls">
        <button type="button" class="button small primary" data-roofline-preset="saxpy">SAXPY</button>
        <button type="button" class="button small" data-roofline-preset="stencil">2D Stencil</button>
        <button type="button" class="button small" data-roofline-preset="spmv">SpMV</button>
        <button type="button" class="button small" data-roofline-preset="fft">1D FFT</button>
        <button type="button" class="button small" data-roofline-preset="gemm">GEMM FP32</button>
        <button type="button" class="button small" data-roofline-preset="tensor">Tensor FP16</button>
      </div>
    </div>

    <!-- Real-Time Intensity Slider & Presets -->
    <div class="diagram-toolbar" style="display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center; background:var(--paper); padding:0.85rem 1rem; border-radius:10px; margin-bottom:1rem; border:1px solid var(--line);">
      <div style="display:flex; align-items:center; gap:0.75rem; flex:1; min-width:280px;">
        <label style="font-size:0.85rem; font-weight:700; color:var(--text);">Operational Intensity (<span style="color:var(--cyan);">I</span>):</label>
        <input type="range" min="-1" max="2" value="-0.6" step="0.05" data-roofline-slider style="flex:1; cursor:pointer;" />
        <span class="badge" data-roofline-intensity-display style="background:var(--cyan-soft); color:var(--cyan); font-weight:800; min-width:85px; text-align:center;">0.25 FLOP/B</span>
      </div>
      <div style="display:flex; gap:0.6rem; align-items:center;">
        <span class="badge" data-roofline-regime-badge style="background:var(--pink-soft); color:var(--pink); font-weight:800; text-transform:uppercase;">Memory Bound</span>
        <span class="badge" data-roofline-flops-badge style="background:var(--lime-soft); color:var(--lime); font-weight:800;">0.23 TFLOPS</span>
      </div>
    </div>

    <svg viewBox="0 0 800 480" class="diagram-svg" data-roofline-svg>
      <!-- Background Grid -->
      <rect x="70" y="30" width="700" height="360" fill="var(--surface)" rx="8" />

      <!-- Horizontal Grid Lines (Log Scale: 0.1, 1, 10, 20 TFLOPS) -->
      <line x1="70" y1="390" x2="770" y2="390" stroke="var(--line)" stroke-width="1.5"/>
      <line x1="70" y1="310" x2="770" y2="310" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="70" y1="210" x2="770" y2="210" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="70" y1="90" x2="770" y2="90" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3"/>

      <!-- Vertical Grid Lines (Log Scale Intensity: 0.1, 1, 10, 100 FLOP/Byte) -->
      <line x1="70" y1="30" x2="70" y2="390" stroke="var(--line)" stroke-width="1.5"/>
      <line x1="240" y1="30" x2="240" y2="390" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="430" y1="30" x2="430" y2="390" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="620" y1="30" x2="620" y2="390" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3"/>

      <!-- Axis Labels -->
      <text x="25" y="210" text-anchor="middle" font-size="12" font-weight="700" fill="var(--muted)" transform="rotate(-90 25 210)">Attained Performance (TFLOP/s)</text>
      <text x="420" y="425" text-anchor="middle" font-size="12" font-weight="700" fill="var(--muted)">Operational Intensity I (FLOPs / Byte)</text>

      <!-- Tick Labels Y-axis -->
      <text x="60" y="394" text-anchor="end" font-size="11" fill="var(--muted)">0.1</text>
      <text x="60" y="314" text-anchor="end" font-size="11" fill="var(--muted)">1.0</text>
      <text x="60" y="214" text-anchor="end" font-size="11" fill="var(--muted)">5.0</text>
      <text x="60" y="94" text-anchor="end" font-size="11" font-weight="700" fill="var(--cyan)">20.0</text>

      <!-- Tick Labels X-axis -->
      <text x="70" y="408" text-anchor="middle" font-size="11" fill="var(--muted)">0.1</text>
      <text x="240" y="408" text-anchor="middle" font-size="11" fill="var(--muted)">1.0</text>
      <text x="430" y="408" text-anchor="middle" font-size="11" fill="var(--muted)">10.0</text>
      <text x="620" y="408" text-anchor="middle" font-size="11" fill="var(--muted)">100.0</text>

      <!-- Memory Bandwidth Ceiling Line (Sloped: 900 GB/s) -->
      <path d="M 70 390 L 510 90" stroke="var(--pink)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <text x="260" y="235" fill="var(--pink)" font-size="12" font-weight="800" transform="rotate(-30 260 235)">DRAM Bandwidth: 900 GB/s</text>

      <!-- Compute Peak Ceiling Line (Flat: 20 TFLOPS) -->
      <line x1="510" y1="90" x2="770" y2="90" stroke="var(--cyan)" stroke-width="3.5" stroke-linecap="round"/>
      <text x="640" y="78" text-anchor="middle" fill="var(--cyan)" font-size="12" font-weight="800">Peak Compute: 20 TFLOP/s</text>

      <!-- Ridge Point (I = 22.2 FLOP/Byte) -->
      <circle cx="510" cy="90" r="7" fill="var(--orange)" stroke="white" stroke-width="2"/>
      <text x="510" y="65" text-anchor="middle" fill="var(--orange)" font-size="11" font-weight="800">Ridge Point (I = 22.2)</text>

      <!-- Preset Kernel Markers on Curve -->
      <g class="roofline-markers">
        <circle cx="120" cy="355" r="5" fill="var(--muted)" /><text x="130" y="358" font-size="9" fill="var(--muted)">SAXPY</text>
        <circle cx="260" cy="275" r="5" fill="var(--muted)" /><text x="270" y="278" font-size="9" fill="var(--muted)">Stencil</text>
        <circle cx="310" cy="235" r="5" fill="var(--muted)" /><text x="320" y="238" font-size="9" fill="var(--muted)">SpMV</text>
        <circle cx="400" cy="170" r="5" fill="var(--muted)" /><text x="410" y="173" font-size="9" fill="var(--muted)">1D FFT</text>
        <circle cx="530" cy="90" r="5" fill="var(--muted)" /><text x="540" y="110" font-size="9" fill="var(--muted)">GEMM</text>
        <circle cx="680" cy="90" r="5" fill="var(--muted)" /><text x="690" y="110" font-size="9" fill="var(--muted)">Tensor Core</text>
      </g>

      <!-- Dynamic Operating Point Marker & Axis Projections -->
      <g class="operating-point-group" data-op-group>
        <line x1="120" y1="355" x2="120" y2="390" stroke="var(--cyan)" stroke-width="1.8" stroke-dasharray="4,4" data-op-x-proj />
        <line x1="70" y1="355" x2="120" y2="355" stroke="var(--cyan)" stroke-width="1.8" stroke-dasharray="4,4" data-op-y-proj />
        <circle cx="120" cy="355" r="14" fill="none" stroke="var(--cyan)" stroke-width="2" opacity="0.6" class="ping-circle" data-op-ping />
        <circle cx="120" cy="355" r="8" fill="var(--cyan)" stroke="white" stroke-width="2" data-op-dot />
      </g>
    </svg>

    <!-- Diagnostics & Actionable Optimization Plan -->
    <div class="diagram-insight" data-roofline-insight>
      <strong>Kernel Diagnosis:</strong> Currently operating at <strong>0.25 FLOP/Byte</strong> in the <strong>Memory-Bound Regime</strong>. Attained performance is strictly throttled by the 900 GB/s memory bus. <em>Optimization Prescription:</em> Apply Shared Memory Tiling (Topic 3.2), fuse consecutive elementwise operations, and maximize register reuse to push operational intensity past the Ridge Point (22.2 FLOP/Byte).
    </div>
  </div>`;
}

// Unit 3, Topic 4: Cloud HPC Deployment & Scaling Interconnects
export function diagramCloudHpc() {
  return `<div class="interactive-diagram" data-diagram="cloud-hpc">
    <div class="diagram-header">
      <div>
        <h4>Cloud HPC Architecture: Multi-GPU &amp; Interconnect Scaling</h4>
        <p class="diagram-subtitle">Compare PCIe Gen4, NVLink 3.0 mesh, and InfiniBand HDR/NDR fabrics for distributed AI &amp; HPC</p>
      </div>
      <div class="diagram-controls">
        <button type="button" class="button small primary" data-cloud-tier="single">Single GPU (PCIe)</button>
        <button type="button" class="button small" data-cloud-tier="multi">Multi-GPU (NVLink)</button>
        <button type="button" class="button small" data-cloud-tier="cluster">Cluster (InfiniBand)</button>
        <button type="button" class="button small" data-cloud-action="traffic">▶ Animate Interconnect</button>
      </div>
    </div>

    <!-- Workload Profile Selector Toolbar -->
    <div class="diagram-toolbar" style="display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center; background:var(--paper); padding:0.85rem 1rem; border-radius:10px; margin-bottom:1rem; border:1px solid var(--line);">
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <label style="font-size:0.85rem; font-weight:700; color:var(--text);">Distributed Workload:</label>
        <button type="button" class="button small primary" data-cloud-workload="resnet">ResNet-50 (Data Parallel)</button>
        <button type="button" class="button small" data-cloud-workload="llama8b">Llama-3 8B (Pipeline)</button>
        <button type="button" class="button small" data-cloud-workload="llama70b">Llama-3 70B (Megatron 3D)</button>
        <button type="button" class="button small" data-cloud-workload="climate">Climate HPC (Domain Decomp)</button>
      </div>
      <div style="margin-left:auto; display:flex; gap:0.75rem; align-items:center;">
        <span class="badge" data-cloud-badge-vram style="background:var(--cyan-soft); color:var(--cyan); font-weight:700;">40 GB VRAM</span>
        <span class="badge" data-cloud-badge-eff style="background:var(--lime-soft); color:var(--lime); font-weight:700;">100% Efficiency</span>
      </div>
    </div>

    <svg viewBox="0 0 800 480" class="diagram-svg" data-cloud-svg>
      <!-- Infrastructure Diagram Canvas -->
      
      <!-- Tier 1: Single Node PCIe (Left) -->
      <g class="tier-card tier-single" data-tier-box="single" transform="translate(25, 30)">
        <rect x="0" y="0" width="230" height="250" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2.5" rx="10" />
        <text x="115" y="28" text-anchor="middle" font-weight="800" font-size="13" fill="var(--cyan)">Single GPU Instance</text>
        
        <!-- CPU Host Box -->
        <rect x="25" y="48" width="180" height="50" rx="6" fill="var(--surface)" stroke="var(--line)"/>
        <text x="115" y="70" text-anchor="middle" font-size="11" font-weight="700">Host CPU + 64GB RAM</text>
        <text x="115" y="86" text-anchor="middle" font-size="9" fill="var(--muted)">PyTorch / CUDA Driver</text>

        <!-- PCIe Bus Channel -->
        <line x1="115" y1="98" x2="115" y2="135" stroke="var(--cyan)" stroke-width="4" stroke-dasharray="6,4" class="pcie-traffic-line"/>
        <text x="125" y="120" font-size="9" font-weight="700" fill="var(--cyan)">PCIe 4.0 (64 GB/s)</text>

        <!-- GPU Box -->
        <rect x="25" y="135" width="180" height="65" rx="6" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="1.8"/>
        <text x="115" y="158" text-anchor="middle" font-size="12" font-weight="800" fill="var(--lime)">NVIDIA A100 SXM</text>
        <text x="115" y="174" text-anchor="middle" font-size="10" fill="var(--muted)">40 GB HBM2e | 19.5 TFLOPS</text>
        <text x="115" y="189" text-anchor="middle" font-size="9" font-weight="700" fill="var(--cyan)">Zero Interconnect Overhead</text>

        <text x="115" y="230" text-anchor="middle" font-size="10" fill="var(--muted)">Best for: Prototyping &amp; Fine-Tuning</text>
      </g>

      <!-- Tier 2: 8x GPU NVLink Node (Middle) -->
      <g class="tier-card tier-multi" data-tier-box="multi" transform="translate(280, 30)" opacity="0.45">
        <rect x="0" y="0" width="230" height="250" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="10" />
        <text x="115" y="28" text-anchor="middle" font-weight="800" font-size="13" fill="var(--lime)">Multi-GPU Node (8x A100)</text>

        <!-- 8 GPU Mesh Grid -->
        <g transform="translate(20, 48)">
          ${Array.from({length: 8}, (_, i) => {
            const x = (i % 4) * 48;
            const y = Math.floor(i / 4) * 45;
            return `<rect x="${x}" y="${y}" width="42" height="36" rx="4" fill="var(--surface)" stroke="var(--lime)" stroke-width="1.2"/>
            <text x="${x + 21}" y="${y + 22}" text-anchor="middle" font-size="9" font-weight="700">GPU ${i}</text>`;
          }).join('')}
        </g>

        <!-- NVSwitch Crossbar Fabric -->
        <rect x="20" y="150" width="190" height="42" rx="5" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="1.5"/>
        <text x="115" y="168" text-anchor="middle" font-size="10" font-weight="800" fill="var(--orange)">NVSwitch Fabric: 600 GB/s</text>
        <text x="115" y="182" text-anchor="middle" font-size="8" fill="var(--muted)">Full All-to-All Bisection Bandwidth</text>

        <text x="115" y="215" text-anchor="middle" font-size="11" font-weight="700" fill="var(--lime)">Total VRAM: 320 GB HBM2</text>
        <text x="115" y="232" text-anchor="middle" font-size="9" fill="var(--muted)">Best for: 7B-70B LLM Training</text>
      </g>

      <!-- Tier 3: GPU Cluster with InfiniBand Fabric (Right) -->
      <g class="tier-card tier-cluster" data-tier-box="cluster" transform="translate(535, 30)" opacity="0.45">
        <rect x="0" y="0" width="240" height="250" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="10" />
        <text x="120" y="28" text-anchor="middle" font-weight="800" font-size="13" fill="var(--pink)">Cloud Cluster (32 Nodes)</text>

        <!-- 4 Rack Nodes Illustrated -->
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="95" height="42" rx="4" fill="var(--surface)" stroke="var(--pink)" stroke-width="1"/>
          <text x="47" y="24" text-anchor="middle" font-size="9" font-weight="700">Rack Node 1</text>
          
          <rect x="105" y="0" width="95" height="42" rx="4" fill="var(--surface)" stroke="var(--pink)" stroke-width="1"/>
          <text x="152" y="24" text-anchor="middle" font-size="9" font-weight="700">Rack Node 2</text>

          <rect x="0" y="48" width="95" height="42" rx="4" fill="var(--surface)" stroke="var(--pink)" stroke-width="1"/>
          <text x="47" y="72" text-anchor="middle" font-size="9" font-weight="700">Rack Node 3</text>

          <rect x="105" y="48" width="95" height="42" rx="4" fill="var(--surface)" stroke="var(--pink)" stroke-width="1"/>
          <text x="152" y="72" text-anchor="middle" font-size="9" font-weight="700">Rack Node 4</text>
        </g>

        <!-- InfiniBand Spine/Leaf Fabric -->
        <rect x="20" y="150" width="200" height="42" rx="5" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="1.5"/>
        <text x="120" y="168" text-anchor="middle" font-size="10" font-weight="800" fill="var(--cyan)">InfiniBand HDR / NDR 400G</text>
        <text x="120" y="182" text-anchor="middle" font-size="8" fill="var(--muted)">GPUDirect RDMA (1.2 &mu;s Latency)</text>

        <text x="120" y="215" text-anchor="middle" font-size="11" font-weight="700" fill="var(--pink)">256 GPUs | 10.2 TB VRAM</text>
        <text x="120" y="232" text-anchor="middle" font-size="9" fill="var(--muted)">Best for: Frontier AI &amp; Supercomputing</text>
      </g>

      <!-- Scaling Telemetry HUD -->
      <g transform="translate(25, 305)">
        <rect x="0" y="0" width="750" height="150" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5" rx="8"/>
        <text x="20" y="28" font-weight="800" font-size="13" fill="var(--cyan)">Distributed Scaling Performance Telemetry</text>

        <g transform="translate(20, 45)">
          <rect x="0" y="0" width="220" height="85" fill="var(--surface)" stroke="var(--line)" rx="6"/>
          <text x="15" y="24" font-size="11" fill="var(--muted)">Total Sustained Compute:</text>
          <text x="15" y="55" font-size="20" font-weight="800" fill="var(--lime)" data-cloud-metric-compute>19.5 TFLOPS</text>
          <text x="15" y="75" font-size="10" fill="var(--muted)" data-cloud-metric-compute-note>1&times; Single GPU peak</text>
        </g>

        <g transform="translate(260, 45)">
          <rect x="0" y="0" width="220" height="85" fill="var(--surface)" stroke="var(--line)" rx="6"/>
          <text x="15" y="24" font-size="11" fill="var(--muted)">Interconnect Bandwidth:</text>
          <text x="15" y="55" font-size="20" font-weight="800" fill="var(--cyan)" data-cloud-metric-bw>64 GB/s (PCIe 4.0)</text>
          <text x="15" y="75" font-size="10" fill="var(--muted)" data-cloud-metric-bw-note>Host CPU &lt;-&gt; GPU bridge</text>
        </g>

        <g transform="translate(500, 45)">
          <rect x="0" y="0" width="230" height="85" fill="var(--surface)" stroke="var(--line)" rx="6"/>
          <text x="15" y="24" font-size="11" fill="var(--muted)">Scaling Efficiency:</text>
          <text x="15" y="55" font-size="20" font-weight="800" fill="var(--lime)" data-cloud-metric-eff>100% Ideal</text>
          <text x="15" y="75" font-size="10" fill="var(--muted)" data-cloud-metric-eff-note>Comm overhead: 0.0%</text>
        </g>
      </g>
    </svg>

    <div class="diagram-insight" data-cloud-insight>
      <strong>Interconnect Hierarchy:</strong> In modern GPU supercomputing, performance is governed by interconnect bandwidth: <strong>PCIe 4.0/5.0</strong> (64-128 GB/s) serves host-device loading; <strong>NVLink 3.0/4.0</strong> (600-900 GB/s) allows all-to-all GPU communication inside a node; and <strong>InfiniBand / RoCE</strong> (200-400 Gbps with GPUDirect RDMA) enables zero-copy cluster scaling for foundation models.
    </div>
  </div>`;
}


// Unit 4 Quantum Computing Diagrams

export function diagramQubitBloch() {
  return `<div class="interactive-diagram" data-diagram="qubit-bloch">
    <div class="diagram-header">
      <h4>Qubit State: Bloch Sphere Representation</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-bloch-state="|0⟩">|0⟩ Ground</button>
        <button class="button small" data-bloch-state="|1⟩">|1⟩ Excited</button>
        <button class="button small" data-bloch-state="|+⟩">|+⟩ Superposition</button>
        <button class="button small" data-bloch-state="|-⟩">|-⟩ Phase -1</button>
      </div>
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
      <rect x="50" y="30" width="220" height="150" fill="var(--surface)" stroke="var(--line)" stroke-width="2" rx="8"/>
      <text x="160" y="60" text-anchor="middle" font-weight="bold" font-size="13">Active Qubit State</text>
      <text x="160" y="90" text-anchor="middle" font-size="16" font-weight="700" fill="var(--pink)" data-state-label>|0⟩</text>
      <text x="160" y="115" text-anchor="middle" font-size="13" font-weight="600" fill="var(--cyan)" data-state-eq>α=1, β=0</text>
      <text x="160" y="145" text-anchor="middle" font-size="11" fill="var(--muted)">|α|² + |β|² = 1 (100% |0⟩)</text>
    </svg>
    <div class="diagram-insight" data-bloch-insight>
      <strong>|0⟩ State:</strong> North pole of Bloch sphere. Pure computational basis state. Measurement always yields 0.
    </div>
  </div>`;
}

export function diagramQuantumGates() {
  return `<div class="interactive-diagram" data-diagram="quantum-gates">
    <div class="diagram-header">
      <h4>Single-Qubit Quantum Gates Simulator</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-qgate-type="h">Hadamard (H)</button>
        <button class="button small" data-qgate-type="x">Pauli-X (NOT)</button>
        <button class="button small" data-qgate-type="z">Pauli-Z (Phase)</button>
        <button class="button small" data-qgate-type="s">Phase S (π/2)</button>
        <button class="button small" data-qgate-type="t">T Gate (π/4)</button>
      </div>
    </div>
    <svg viewBox="0 0 800 500" class="diagram-svg">
      <text x="50" y="40" font-weight="bold" font-size="18" fill="var(--cyan)">Standard Universal Quantum Gate Library</text>
      <g transform="translate(50, 70)" class="qgate-card" data-gate-card="h">
        <rect x="0" y="0" width="160" height="100" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Hadamard (H)</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Creates superposition</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">H|0⟩ = |+⟩</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">H|1⟩ = |-⟩</text>
      </g>
      <g transform="translate(240, 70)" class="qgate-card" data-gate-card="x">
        <rect x="0" y="0" width="160" height="100" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Pauli-X</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Bit flip (NOT gate)</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">X|0⟩ = |1⟩</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">X|1⟩ = |0⟩</text>
      </g>
      <g transform="translate(430, 70)" class="qgate-card" data-gate-card="z">
        <rect x="0" y="0" width="160" height="100" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Pauli-Z</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Phase flip</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">Z|0⟩ = |0⟩</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">Z|1⟩ = -|1⟩</text>
      </g>
      <g transform="translate(620, 70)" class="qgate-card" data-gate-card="s">
        <rect x="0" y="0" width="160" height="100" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="16">Phase S / T</text>
        <text x="80" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">Arbitrary Z rotation</text>
        <text x="80" y="75" text-anchor="middle" font-size="10" font-family="monospace">S = diag(1, i)</text>
        <text x="80" y="90" text-anchor="middle" font-size="10" font-family="monospace">T = diag(1, e^iπ/4)</text>
      </g>

      <!-- Matrix Representation Display Box -->
      <g transform="translate(50, 200)">
        <rect x="0" y="0" width="730" height="160" fill="var(--surface-sunken)" stroke="var(--line)" stroke-width="2" rx="8"/>
        <text x="365" y="35" text-anchor="middle" font-weight="bold" font-size="14" fill="var(--cyan)">Unitary Transformation Matrix &amp; Circuit Effect</text>
        <text x="365" y="70" text-anchor="middle" font-family="monospace" font-size="15" fill="var(--ink)" data-qgate-matrix>H = 1/√2 [ [1,  1], [1, -1] ]</text>
        <text x="365" y="105" text-anchor="middle" font-size="13" fill="var(--lime)" data-qgate-action>Action: Rotates |0⟩ into equal superposition (|+⟩ = (|0⟩ + |1⟩)/√2)</text>
        <text x="365" y="135" text-anchor="middle" font-size="11" fill="var(--muted)" data-qgate-physics>Bloch Sphere: 180° rotation about the (X+Z)/√2 axis</text>
      </g>
    </svg>
    <div class="diagram-insight" data-qgate-insight>
      <strong>Hadamard (H) Gate:</strong> Creates equal superposition: H|0⟩ = (|0⟩ + |1⟩)/√2 and H|1⟩ = (|0⟩ - |1⟩)/√2. Represents a 180° rotation around the (X+Z)/√2 axis on the Bloch sphere.
    </div>
  </div>`;
}


export function diagramQuantumAlgorithms() {
  return `<div class="interactive-diagram" data-diagram="quantum-algorithms">
    <div class="diagram-header">
      <h4>Quantum Algorithm: Grover Search Execution Flow</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-grover-step="1">Step 1: Superposition</button>
        <button class="button small" data-grover-step="2">Step 2: Oracle Phase Flip</button>
        <button class="button small" data-grover-step="3">Step 3: Diffusion (Inversion)</button>
        <button class="button small" data-grover-step="4">Step 4: Measurement</button>
      </div>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <text x="400" y="35" text-anchor="middle" font-weight="bold" font-size="18" fill="var(--cyan)">Grover's Amplitude Amplification Pipeline</text>
      <g transform="translate(50, 60)" class="grover-box" data-grover-box="1">
        <rect x="0" y="0" width="150" height="80" fill="var(--cyan-soft)" stroke="var(--cyan)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">1. Initialize</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">Apply H⊗n</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Equal superposition</text>
      </g>
      <path d="M 200 100 L 240 100" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <g transform="translate(240, 60)" class="grover-box" data-grover-box="2">
        <rect x="0" y="0" width="150" height="80" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">2. Oracle</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">Mark target</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Phase flip (-1)</text>
      </g>
      <path d="M 390 100 L 430 100" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <g transform="translate(430, 60)" class="grover-box" data-grover-box="3">
        <rect x="0" y="0" width="150" height="80" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">3. Diffusion</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">Amplify amplitude</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Inversion about avg</text>
      </g>
      <path d="M 580 100 L 620 100" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <g transform="translate(620, 60)" class="grover-box" data-grover-box="4">
        <rect x="0" y="0" width="150" height="80" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="8"/>
        <text x="75" y="25" text-anchor="middle" font-weight="bold" font-size="13">4. Measure</text>
        <text x="75" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">High probability</text>
        <text x="75" y="65" text-anchor="middle" font-size="10" fill="var(--muted)">Find target item</text>
      </g>
      <text x="315" y="170" text-anchor="middle" font-style="italic" fill="var(--muted)">Repeat √N times for optimal amplitude</text>
      <path d="M 430 145 Q 315 190 200 145" stroke="var(--orange)" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow-orange)"/>
      <defs>
        <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="var(--orange)"/>
        </marker>
      </defs>

      <!-- Dynamic Grover State Visualizer -->
      <g transform="translate(50, 210)">
        <rect x="0" y="0" width="720" height="180" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5" rx="8"/>
        <text x="360" y="30" text-anchor="middle" font-weight="bold" font-size="13" fill="var(--cyan)">Amplitude State Distribution (N = 4, target = |10⟩)</text>
        
        <!-- Bars for |00⟩, |01⟩, |10⟩, |11⟩ -->
        <g transform="translate(80, 50)">
          <rect x="0" y="30" width="100" height="50" fill="var(--cyan-soft)" stroke="var(--cyan)" rx="4" data-grover-bar-0/>
          <text x="50" y="100" text-anchor="middle" font-size="11">|00⟩: 0.50</text>
          
          <rect x="140" y="30" width="100" height="50" fill="var(--cyan-soft)" stroke="var(--cyan)" rx="4" data-grover-bar-1/>
          <text x="190" y="100" text-anchor="middle" font-size="11">|01⟩: 0.50</text>
          
          <rect x="280" y="30" width="100" height="50" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="4" data-grover-bar-2/>
          <text x="330" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--pink)">|10⟩: 0.50 ★</text>
          
          <rect x="420" y="30" width="100" height="50" fill="var(--cyan-soft)" stroke="var(--cyan)" rx="4" data-grover-bar-3/>
          <text x="470" y="100" text-anchor="middle" font-size="11">|11⟩: 0.50</text>
        </g>
      </g>
    </svg>
    <div class="diagram-insight" data-grover-insight>
      <strong>Step 1 (Superposition):</strong> Apply Hadamard gates H⊗n to initialize all N = 2ⁿ basis states in an equal superposition with amplitude 1/√N.
    </div>
  </div>`;
}

export function diagramVqeCircuit() {
  return `<div class="interactive-diagram" data-diagram="vqe-circuit">
    <div class="diagram-header">
      <h4>Variational Quantum Eigensolver (VQE) Hybrid Loop</h4>
      <div class="diagram-controls">
        <button class="button small primary" data-vqe-phase="ansatz">Phase 1: Quantum Ansatz |ψ(θ)⟩</button>
        <button class="button small" data-vqe-phase="measure">Phase 2: Measure Hamiltonian ⟨H⟩</button>
        <button class="button small" data-vqe-phase="classical">Phase 3: Classical Optimization</button>
      </div>
    </div>
    <svg viewBox="0 0 800 450" class="diagram-svg">
      <rect x="50" y="50" width="700" height="350" fill="var(--surface)" stroke="var(--cyan)" stroke-width="2" rx="12"/>
      <text x="400" y="85" text-anchor="middle" font-weight="bold" font-size="16" fill="var(--cyan)">VQE NISQ Hybrid Quantum-Classical Feedback Loop</text>
      
      <g transform="translate(100, 120)" class="vqe-box" data-vqe-box="ansatz">
        <rect x="0" y="0" width="180" height="100" fill="var(--lime-soft)" stroke="var(--lime)" stroke-width="2" rx="8"/>
        <text x="90" y="30" text-anchor="middle" font-weight="bold" font-size="13">1. Quantum Device</text>
        <text x="90" y="50" text-anchor="middle" font-size="10" fill="var(--muted)">Prepare ansatz state</text>
        <text x="90" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--cyan)">|ψ(θ)⟩ = U(θ)|0⟩</text>
        <text x="90" y="90" text-anchor="middle" font-size="10" fill="var(--muted)">Parameterized rotation gates</text>
      </g>
      
      <path d="M 280 170 L 350 170" stroke="var(--line)" stroke-width="2" marker-end="url(#arrow-cyan)"/>
      <text x="315" y="165" text-anchor="middle" font-size="10" fill="var(--muted)">Energy E(θ)</text>
      
      <g transform="translate(350, 120)" class="vqe-box" data-vqe-box="classical">
        <rect x="0" y="0" width="180" height="100" fill="var(--orange-soft)" stroke="var(--orange)" stroke-width="2" rx="8"/>
        <text x="90" y="30" text-anchor="middle" font-weight="bold" font-size="13">2. Classical Computer</text>
        <text x="90" y="55" text-anchor="middle" font-size="10" fill="var(--muted)">Optimizer updates θ</text>
        <text x="90" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--orange)">Minimize ⟨ψ(θ)|H|ψ(θ)⟩</text>
        <text x="90" y="95" text-anchor="middle" font-size="10" fill="var(--muted)">(COBYLA, SPSA, GD)</text>
      </g>
      
      <path d="M 440 220 Q 440 280 200 280 Q 200 240 100 220" stroke="var(--line)" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow-cyan)"/>
      <text x="270" y="300" text-anchor="middle" font-size="10" fill="var(--muted)">New parameters θ (Feedback Loop)</text>
      
      <g transform="translate(560, 120)" class="vqe-box" data-vqe-box="result">
        <rect x="0" y="0" width="160" height="100" fill="var(--pink-soft)" stroke="var(--pink)" stroke-width="2" rx="8"/>
        <text x="80" y="30" text-anchor="middle" font-weight="bold" font-size="13">3. Final Convergence</text>
        <text x="80" y="55" text-anchor="middle" font-size="10" fill="var(--muted)">Ground state energy</text>
        <text x="80" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--pink)">E₀ ≈ min E(θ)</text>
        <text x="80" y="90" text-anchor="middle" font-size="9" fill="var(--muted)">Molecular ground energy</text>
      </g>
    </svg>
    <div class="diagram-insight" data-vqe-insight>
      <strong>Phase 1 (Quantum Device):</strong> Parameterized circuit generates trial state |ψ(θ)⟩ using rotation gates and entangling layers (ansatz).
    </div>
  </div>`;
}
