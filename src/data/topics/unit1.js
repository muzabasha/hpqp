export const unit1Topics = [
  {
    id: 1,
    title: 'Why High Performance Computing?',
    description: 'Frame the problem, architecture, measurement, and the insight loop that makes computation scale beyond a single processor.',
    prerequisites: ['Basic algorithms and Big-O notation', 'Computer organization fundamentals (CPU, memory, bus)', 'Linear algebra basics (matrices, vectors)', 'C or Python programming proficiency'],
    dependencies: ['Flynn\\\'s Taxonomy (Topic 2) builds on this classification', 'Memory Hierarchy (Topic 3) explains why raw speed isn\\\'t enough', 'Speedup Laws (Topic 4) quantify the gains we introduce here', 'Cluster Basics (Topic 5) shows real systems that implement these ideas'],
    preparationPlan: 'Review computer organization notes, refresh Big-O analysis, and read one case study about weather forecasting or genomic sequencing to see why a laptop isn\\\'t enough.',
    story: 'Imagine it is Monday morning at Sunnybrook Elementary. The lunch bell rings and 400 hungry students pour into the cafeteria. There is exactly one cook, one stove, and one counter. The cook starts flipping pancakes. One by one. By the time the twelfth pancake hits a plate, the kindergarteners are crying, the sixth-graders are staging a revolt, and someone has already started a petition to impeach the principal. The principal panics and calls a meeting. A parent suggests hiring five more cooks. The principal agrees, but there is a catch: all six cooks must share one spatula, one stove, and one counter. They trip over each other, bump elbows, and half the pancakes end up on the floor. The cafeteria is now slower than before. A second parent, an engineer, raises her hand: \\\"What if we buy four more stoves, assign each cook their own station, and create a serving line so students walk past each cook in order?\\\" The principal tries it. Suddenly pancakes appear three times faster. But then a problem appears: the cook at Station 3 makes blueberry pancakes while Station 1 makes chocolate chip. Students start complaining about inconsistency. The engineer suggests a shared recipe card and a timer so each cook works at the same pace. Now the cafeteria hums. But a new bottleneck appears: the dishwasher. It cannot keep up with six cooks. The engineer smiles and says, \\\"You just discovered HPC.\\\" The story has a hidden structure: identify the bottleneck, add resources wisely, share the workload, measure the result, and fix the next bottleneck. That loop never ends because every fix reveals a new constraint.',
    cartoonPanels: [
      {
        scene: 1,
        title: "1 Cook, 1 Stove Bottleneck",
        avatar: "👨‍🍳",
        tag: "Serial CPU Limit",
        caption: "400 hungry kids line up, but there is only 1 cook and 1 stove. Flipping pancakes one by one creates a massive serial queue!",
        concept: "Single-threaded CPU execution: 1 core handles all operations sequentially.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="30" y="100" width="80" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/><circle cx="50" cy="120" r="10" fill="#ef4444" opacity="0.8"/><circle cx="90" cy="120" r="10" fill="#334155"/><text x="70" y="70" font-size="36" text-anchor="middle">👨‍🍳</text><text x="82" y="45" font-size="18">🍳</text><g transform="translate(130, 110)"><text x="0" y="0" font-size="22">👧</text><text x="30" y="0" font-size="22">👦</text><text x="60" y="0" font-size="22">🧒</text><text x="90" y="0" font-size="22">👶</text><text x="125" y="0" font-size="16" fill="#ef4444" font-weight="bold">+396</text></g><path d="M 130 130 L 280 130" stroke="#f43f5e" stroke-width="3" stroke-dasharray="6,4"/><text x="205" y="155" text-anchor="middle" font-size="11" fill="#f43f5e" font-weight="bold">Long Queue (High Latency)</text></svg>`
      },
      {
        scene: 2,
        title: "6 Cooks, 1 Spatula Chaos",
        avatar: "💥",
        tag: "Lock Contention",
        caption: "The principal hires 5 more cooks, but forgets extra tools! All 6 cooks trip over each other fighting for 1 spatula.",
        concept: "Adding threads without scaling hardware memory/bus causes severe lock contention.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="120" y="100" width="80" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="160" y="135" font-size="24" text-anchor="middle">🍳</text><g transform="translate(60, 80)"><text x="0" y="0" font-size="26">👨‍🍳</text><text x="35" y="0" font-size="26">👩‍🍳</text><text x="70" y="0" font-size="26">👨‍🍳</text><text x="105" y="0" font-size="26">👩‍🍳</text><text x="140" y="0" font-size="26">👨‍🍳</text></g><path d="M 80 90 L 150 120 M 115 90 L 150 120 M 180 90 L 160 120" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/><text x="160" y="40" font-size="24" text-anchor="middle">💥 Collision!</text><text x="160" y="168" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">Resource Contention (Shared Lock)</text></svg>`
      },
      {
        scene: 3,
        title: "4 Cook Stations & Pipeline",
        avatar: "🚀",
        tag: "Multi-Core & Pipeline",
        caption: "The engineer installs 4 separate stations and an assembly line. Pancakes now flow out 3x faster in organized parallel streams!",
        concept: "Multi-core architecture with independent execution pipelines and private L1 caches.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(20, 40)"><rect x="0" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/><text x="30" y="32" font-size="20" text-anchor="middle">👨‍🍳</text><rect x="75" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/><text x="105" y="32" font-size="20" text-anchor="middle">👩‍🍳</text><rect x="150" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/><text x="180" y="32" font-size="20" text-anchor="middle">👨‍🍳</text><rect x="225" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/><text x="255" y="32" font-size="20" text-anchor="middle">👩‍🍳</text></g><path d="M 30 110 L 290 110" stroke="#22c55e" stroke-width="4"/><text x="160" y="140" font-size="22" text-anchor="middle">🥞 🥞 🥞 🥞</text><text x="160" y="165" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">Parallel Pipeline Throughput (3x Speedup)</text></svg>`
      },
      {
        scene: 4,
        title: "Overwhelmed Dishwasher",
        avatar: "🧼",
        tag: "Memory Wall",
        caption: "Cooks make pancakes fast, but the single dishwasher can't clean plates quick enough! A new bottleneck appears.",
        concept: "Memory Bandwidth Wall: CPU compute speed exceeds DRAM data supply rate.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(40, 50)"><rect x="0" y="0" width="100" height="80" rx="8" fill="#1e293b" stroke="#22c55e"/><text x="50" y="45" font-size="14" fill="#22c55e" font-weight="bold" text-anchor="middle">Fast Cooks</text></g><path d="M 140 90 L 190 90" stroke="#ef4444" stroke-width="4"/><g transform="translate(190, 50)"><rect x="0" y="0" width="90" height="80" rx="8" fill="#1e293b" stroke="#ef4444"/><text x="45" y="35" font-size="22" text-anchor="middle">🧼</text><text x="45" y="65" font-size="11" fill="#ef4444" font-weight="bold" text-anchor="middle">Slow Washer</text></g><text x="160" y="160" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">DRAM Memory Bandwidth Bottleneck</text></svg>`
      }
    ],
    storyQuestions: [
      'Why did adding more cooks without more stoves make things worse?',
      'What was the real bottleneck after the stoves were added?',
      'Why did the shared recipe card matter as much as the extra cooks?',
      'What would you measure to decide whether the next upgrade is worth the cost?'
    ],
    storyBridge: 'High Performance Computing is the cafeteria engineer applied to computation. We identify the bottleneck (CPU, memory, network), add resources wisely (cores, GPUs, nodes), share the workload (parallel programming), and measure the result (speedup, efficiency). The goal is never just \\\"more computers\\\" — it is \\\"more useful computation per unit of time and energy.\\\"',
    terminology: ['Throughput', 'Latency', 'Bottleneck', 'Scalability', 'Parallelism', 'Speedup', 'Efficiency', 'FLOP/s', 'Strong scaling', 'Weak scaling'],
    mathNeed: 'Without mathematical models we cannot predict whether adding more processors will help or hurt. We need equations to compare designs before spending budget on hardware.',
    mathMotivation: 'The performance of a computing system depends on CPU speed, memory bandwidth, interconnect latency, and the fraction of work that can be parallelized. Mathematical models let us reason about these factors analytically.',
    realWorldChallenges: ['Weather prediction requires solving partial differential equations on a global grid within minutes, not hours', 'Genomic sequencing compares billions of base pairs against a reference database', 'Climate modelling simulates centuries of atmospheric dynamics'],
    technicalChallenges: ['Amdahl\\\'s Law limits speedup by the serial fraction', 'Memory bandwidth often caps achievable throughput before CPU saturation', 'Communication overhead between nodes grows with cluster size'],
    equations: [
      {
        name: 'Throughput',
        latex: 'T = \\frac{N_{ops}}{t_{wall}}',
        symbols: 'T is throughput (FLOP/s), N_ops is total floating-point operations, t_wall is wall-clock time.',
        meaning: 'Throughput counts how many useful operations complete per second of real time.',
        whyNeeded: 'Throughput is the headline metric for any HPC system — it tells us the actual work rate, not just the theoretical peak.',
        interpretation: 'Higher throughput means the system completes more work in the same time. Compare achieved throughput to peak hardware throughput to find headroom.'
      },
      {
        name: 'Amdahl\\\'s Law (preview)',
        latex: 'S(p) = \\frac{1}{(1-f) + \\frac{f}{p}}',
        symbols: 'S is speedup, f is the parallel fraction, p is the number of processors.',
        meaning: 'Even with infinite processors the speedup is bounded by 1/(1-f).',
        whyNeeded: 'It quantifies the maximum benefit of parallelization given a serial bottleneck.',
        interpretation: 'If 90% of code is parallel (f=0.9), the maximum speedup with infinite processors is 10x.'
      }
    ],
    numericalExample: 'A simulation takes 100 seconds on one core. 80% of the time is parallelizable (f=0.8). On 4 processors: S = 1/(0.2 + 0.8/4) = 1/0.4 = 2.5x. The 80% that parallelizes finishes in 80/4=20s. The 20% serial part stays at 20s. Total = 40s. Speedup = 100/40 = 2.5x. Efficiency = 2.5/4 = 62.5%.',
    metrics: ['FLOP/s (floating-point operations per second)', 'Wall-clock time for a fixed problem', 'Energy per useful result (Joules/GFLOP)', 'Scalability curves (strong and weak)', 'Cost per unit of performance'],
    optimizationPossibilities: 'Optimize the serial fraction first, then overlap computation with communication, then tune memory access patterns.',
    futureEnhancements: 'Heterogeneous computing (CPU + GPU + FPGA), task-based runtime systems, auto-tuning compilers, and energy-aware scheduling are pushing HPC beyond traditional cluster models.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Demonstrate why parallelism matters using a simple sorting task.', instructions: 'Sort a deck of 52 cards by suit and number using one hand while narrating. Then ask a student to help: split the deck in half, sort simultaneously, merge. Compare times aloud.', inputs: 'One deck of cards, a timer', expectedOutputs: 'Students observe that two people sorting halves is faster, but merging adds work.', rubric: 'Observation accuracy 40%, engagement 30%, ability to describe the speedup 30%.', learningOutcomes: 'Understand that splitting work reduces time but introduces coordination cost.', time: '10 minutes', materials: 'Deck of cards, stopwatch, whiteboard' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Explore how the serial fraction limits speedup.', instructions: 'Use a calculator: fix f=0.1 and compute S for p=2,4,8,16,32,64,128. Plot the results. Then repeat with f=0.3. Compare the two curves.', inputs: 'Calculator or spreadsheet, the Amdahl equation', expectedOutputs: 'Two plots showing that higher serial fraction flattens the speedup curve much earlier.', rubric: 'Correct computation 40%, correct plot 30%, verbal explanation 30%.', learningOutcomes: 'Connect the abstract equation to a visual speedup ceiling.', time: '15 minutes', materials: 'Calculator, graph paper or spreadsheet' },
      { level: 3, levelName: 'All Students Do', objective: 'Measure real parallel speedup with a shared computation.', instructions: 'In groups of 4, time how long it takes to sum 10,000 random numbers sequentially, then split the work across 2 and 4 group members. Record results, compute speedup and efficiency, and identify the bottleneck.', inputs: 'List of random numbers, paper and pencil or spreadsheet', expectedOutputs: 'A table with sequential time, parallel time, speedup, and efficiency for 1, 2, and 4 workers.', rubric: 'Accurate measurements 30%, correct speedup calculation 30%, meaningful bottleneck analysis 40%.', learningOutcomes: 'Experience first-hand that adding workers has diminishing returns.', time: '25 minutes', materials: 'Printed number sheets, timers, spreadsheet' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Analyze a real HPC case study and identify performance bottlenecks.', instructions: 'Read a one-page case study about a weather model running on 512 cores. Identify the serial fraction, compute theoretical maximum speedup, and propose three optimizations ranked by expected impact.', inputs: 'Case study handout with timing data', expectedOutputs: 'Written analysis with Amdahl calculation, three ranked proposals, and energy consideration.', rubric: 'Correct Amdahl calculation 25%, quality of proposals 35%, consideration of energy 20%, writing clarity 20%.', learningOutcomes: 'Transfer classroom models to a realistic engineering scenario.', time: '20 minutes', materials: 'Case study handout, calculator' }
    ],
    projectScope: 'Build a small benchmarking tool that measures sequential vs parallel execution time for a vector addition problem, then analyze the serial fraction experimentally.',
    projectFeasibility: 'Uses only a laptop with Python and multiprocessing module. No special hardware needed. Browser simulation available for visualization.',
    projectObjectives: ['Write a sequential vector addition and measure wall-clock time', 'Implement a parallel version using Python multiprocessing', 'Measure speedup for 2, 4, and 8 workers', 'Estimate the serial fraction from observed speedup curves', 'Propose one optimization and predict its effect'],
    projectOutcomes: ['Runnable Python script with timing output', 'Speedup vs workers plot', 'Serial fraction estimate', 'One-page report with recommendations'],
    projectMethodology: 'Question: How does parallelism speed up vector addition? Hypothesis: Doubling workers should halve time (ignoring overhead). Experiment: Run with measured timings. Compare: Plot speedup curve. Reflect: Identify overhead sources.',
    projectRoles: ['Systems Lead: writes the code', 'Experiment Lead: runs measurements and controls variables', 'Data Analyst: creates plots and computes metrics', 'QA Lead: documents assumptions and validates results'],
    projectTimeline: [
      { milestone: 'Scope', duration: 'Day 1', deliverable: 'Problem statement and measurement plan' },
      { milestone: 'Baseline', duration: 'Days 2-3', deliverable: 'Sequential implementation with timing' },
      { milestone: 'Parallel', duration: 'Days 4-5', deliverable: 'Parallel version with worker sweep' },
      { milestone: 'Analysis', duration: 'Day 6', deliverable: 'Speedup plot and serial fraction estimate' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Written report with recommendations' }
    ],
    projectRisks: [
      { risk: 'Measurement noise from OS background processes', severity: 'Medium', mitigation: 'Run each trial 5 times and report the median' },
      { risk: 'Python GIL limits true parallelism for CPU-bound tasks', severity: 'High', mitigation: 'Use multiprocessing (separate processes), not threading' },
      { risk: 'Small problem size hides parallel benefits', severity: 'Medium', mitigation: 'Scale problem to at least 1 million elements' }
    ],
    projectBudget: 'Student time: ~12 hours. Cloud or lab cost: $0. Documentation and review: ~3 hours.',
    projectTRL: 'TRL 3 — Analytical proof of concept with a representative synthetic benchmark.',
    questions: [
      { type: 'conceptual', question: 'What is the central idea of High Performance Computing?', answer: 'HPC is the practice of coordinating multiple computing resources to solve a single problem faster than a single processor could, while measuring and optimizing throughput, latency, and energy.', explanation: 'HPC combines hardware (CPUs, GPUs, interconnects), software (parallel algorithms, runtimes), and measurement (profiling, benchmarking) to push computational boundaries.', commonMistakes: 'Thinking HPC just means \\\"buying a bigger computer.\\\" In reality, the algorithm and data movement matter as much as raw flops.', tip: 'Remember the cafeteria: more cooks only help if the kitchen is designed for them.' },
      { type: 'numerical', question: 'A program is 70% parallelizable. What is the maximum speedup with infinite processors?', answer: 'S = 1/(1-0.7) = 1/0.3 = 3.33x', explanation: 'Amdahl\\\'s Law: S(p→∞) = 1/(1-f). Here f=0.7 so the serial fraction is 0.3, giving a hard ceiling of 3.33x regardless of how many processors you add.', commonMistakes: 'Forgetting that 1-f is the serial fraction, not the parallel fraction.', tip: 'The serial fraction is the speed limit — no amount of hardware can break it.' },
      { type: 'application', question: 'When would adding more GPUs to a server stop improving performance?', answer: 'When the serial fraction or communication overhead dominates, or when memory bandwidth or PCIe bus becomes saturated.', explanation: 'Each additional GPU adds compute capacity, but if the serial portion of the code cannot be split further, or if the data transfer bus is full, the extra GPU sits idle.', commonMistakes: 'Assuming performance scales linearly with hardware count.', tip: 'Measure before you buy — profile first, purchase second.' },
      { type: 'problemSolving', question: 'Give one advantage and one limitation of Amdahl\\\'s Law as a performance model.', answer: 'Advantage: it provides a hard upper bound on speedup, which helps set realistic expectations. Limitation: it assumes fixed problem size (strong scaling only) and does not account for communication overhead.', explanation: 'Amdahl\\\'s Law is a starting point, not a complete model. Gustafson\\\'s Law addresses fixed-time scaling, and real models must include communication and synchronization costs.', commonMistakes: 'Treating Amdahl\\\'s Law as a prediction rather than a bound.', tip: 'Use Amdahl for the ceiling and actual benchmarks for the floor.' }
    ],
    labType: 'hpc-throughput',
    keyInsights: ['Identifying the bottleneck is the first and most important step in any optimization', 'Adding resources without fixing the bottleneck can make performance worse', 'Measurement must lead every optimization decision', 'HPC is a loop: measure, optimize, measure again'],
    advantages: ['Enables solutions to problems impossible on single processors', 'Drives scientific discovery in weather, medicine, and physics', 'Develops transferable engineering skills in measurement and optimization'],
    disadvantages: ['Diminishing returns from Amdahl\\\'s Law', 'Increased energy consumption and hardware cost', 'Programming complexity grows significantly with parallelism'],
    improvements: ['Use heterogeneous architectures (CPU+GPU) to attack different parts of the workload', 'Apply auto-tuning to find optimal parameters without manual profiling', 'Explore energy-aware scheduling to optimize Joules per useful result'],
    futureScope: 'Quantum computing, neuromorphic chips, and photonic interconnects are extending HPC beyond traditional von Neumann architectures.',
    industrialApplications: ['Weather forecasting (ECMWF, NOAA)', 'Genomic sequencing (Illumina, BGI)', 'Oil and gas seismic imaging', 'Financial risk modelling', 'Autonomous vehicle simulation'],
    researchOpportunities: ['Exascale computing and energy efficiency', 'Task-based runtime systems (StarPU, Legion)', 'Auto-tuning compilers (TVM, Halide)', 'Performance portability across architectures'],
    careerRelevance: ['Performance Engineer', 'HPC Systems Administrator', 'Parallel Software Developer', 'Computational Scientist', 'Solutions Architect (cloud HPC)']
  },
  {
    id: 2,
    title: 'Flynn\\\'s Taxonomy and Parallel Architectures',
    description: 'Classify computing systems by instruction and data flow to understand why different architectures suit different problems.',
    prerequisites: ['Topic 1: Why HPC — understanding of throughput, bottleneck, and scaling', 'Basic understanding of CPU instruction fetch-decode-execute cycle', 'Familiarity with registers, ALU, and control unit'],
    dependencies: ['Memory Hierarchy (Topic 3) explains how data moves within each architecture class', 'Speedup Laws (Topic 4) quantify the performance of different classifications', 'OpenMP (Unit 2) targets shared-memory MIMD systems', 'MPI (Unit 2) targets distributed-memory MIMD systems'],
    preparationPlan: 'Review the instruction cycle, distinguish between data and instruction streams, and sketch a simple block diagram of a single-core processor before classifying multi-core variants.',
    story: 'Imagine a highway system with four distinct intersections. Intersection A has one lane going one direction, one car at a time — predictable, orderly, but painfully slow during rush hour. This is the original von Neumann design: one instruction stream, one data stream. Intersection B is a highway with six lanes but a single traffic light controlling all of them. Every car must move in the exact same direction at the exact same time. If one car needs to turn left, every other lane stops. This is SIMD: one instruction applied to many data points simultaneously. Fantastic for identical operations, useless when cars need different destinations. Intersection C is a roundabout with a guard who lets cars enter only when the road ahead is completely clear. No car can move unless the path is guaranteed free. This resembles MISD: multiple instruction streams attempting to control one data pipeline. Rare, expensive, and mostly found in safety-critical flight controllers. Intersection D is a modern multi-lane interchange where each car follows its own GPS route at its own speed. One car might head to the beach, another to the mountains, another to the grocery store. Traffic lights coordinate major intersections, but individual cars make independent choices. This is MIMD: multiple instruction streams on multiple data streams simultaneously. Now imagine the highway engineer is asked: \\\"Which intersection design handles a snowstorm best?\\\" The answer depends on whether all cars need the same destination (SIMD wins) or different ones (MIMD wins). The engineer also discovers that some intersections have excellent roads but poor signage (fast CPU, slow memory), while others have wide roads but few lanes (big memory, few cores). The choice of intersection design is not just about speed — it is about matching the traffic pattern to the infrastructure.',
    cartoonPanels: [
      {
        scene: 1,
        title: "1-Lane Highway (SISD)",
        avatar: "🚗",
        tag: "SISD Class",
        caption: "One lane, one traffic light, one car at a time. Orderly and simple, but backs up during rush hour.",
        concept: "SISD: Single Instruction stream, Single Data stream (Classic Von Neumann CPU).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="20" y="70" width="280" height="40" fill="#334155"/><line x1="20" y1="90" x2="300" y2="90" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8,6"/><text x="80" y="96" font-size="24">🚗</text><circle cx="260" cy="50" r="12" fill="#ef4444"/><text x="160" y="145" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">SISD: 1 Instruction / 1 Data Item</text></svg>`
      },
      {
        scene: 2,
        title: "16-Lane Convoy (SIMD)",
        avatar: "🚌",
        tag: "SIMD Vector/GPU",
        caption: "16 parallel lanes controlled by 1 master traffic light. All 16 vehicles accelerate together in perfect sync!",
        concept: "SIMD: Single Instruction stream broadcast to Multiple Data lanes (GPUs & Vector CPUs).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(20, 20)"><rect x="0" y="0" width="280" height="120" rx="8" fill="#1e293b" stroke="#38bdf8"/><g font-size="16"><text x="25" y="25">🚗</text><text x="90" y="25">🚗</text><text x="155" y="25">🚗</text><text x="220" y="25">🚗</text><text x="25" y="53">🚗</text><text x="90" y="53">🚗</text><text x="155" y="53">🚗</text><text x="220" y="53">🚗</text><text x="25" y="81">🚗</text><text x="90" y="81">🚗</text><text x="155" y="81">🚗</text><text x="220" y="81">🚗</text><text x="25" y="109">🚗</text><text x="90" y="109">🚗</text><text x="155" y="109">🚗</text><text x="220" y="109">🚗</text></g></g><text x="160" y="165" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">SIMD: 1 Master Control -> 16 Parallel Lanes</text></svg>`
      },
      {
        scene: 3,
        title: "3 Security Guards (MISD)",
        avatar: "✈️",
        tag: "MISD Fault-Tolerant",
        caption: "3 independent security guards inspect the exact same car to guarantee 100% safety before takeoff.",
        concept: "MISD: Multiple Instruction streams process Single Data stream (Space Shuttle flight computers).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="120" y="60" width="80" height="50" rx="8" fill="#334155"/><text x="160" y="92" font-size="24" text-anchor="middle">🛩️</text><text x="60" y="50" font-size="22">👮‍♂️</text><text x="60" y="90" font-size="22">👮‍♀️</text><text x="60" y="130" font-size="22">👮‍♂️</text><path d="M 90 45 L 120 70 M 90 85 L 120 85 M 90 125 L 120 100" stroke="#38bdf8" stroke-width="2"/><text x="160" y="155" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">MISD: 3 Instructions -> 1 Shared Target</text></svg>`
      },
      {
        scene: 4,
        title: "Multi-Lane Interchange (MIMD)",
        avatar: "🏎️",
        tag: "MIMD Multi-Core",
        caption: "Multi-lane cloverleaf interchange where every driver follows their own GPS route independently.",
        concept: "MIMD: Multiple Instruction streams operate on Multiple Data streams (Multi-core CPUs & Clusters).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><path d="M 40 40 Q 160 160 280 40 M 40 140 Q 160 20 280 140" stroke="#475569" stroke-width="20" fill="none"/><text x="60" y="50" font-size="20">🏎️</text><text x="240" y="50" font-size="20">🚙</text><text x="60" y="140" font-size="20">🚚</text><text x="240" y="140" font-size="20">🚕</text><text x="160" y="168" text-anchor="middle" font-size="11" fill="#ec4899" font-weight="bold">MIMD: Independent Execution Across Cores</text></svg>`
      }
    ],
    storyQuestions: [
      'Why does SIMD work brilliantly when all cars go to the same place but fail when they diverge?',
      'What happens at Intersection D if one car breaks down in the middle of the roundabout?',
      'Why is MISD rarely seen on real highways?',
      'If you were building a highway for a city where every resident drives to a different neighborhood, which intersection would you choose?'
    ],
    storyBridge: 'Flynn\\\'s Taxonomy is the traffic engineer\\\'s classification of computing architectures. SISD is the single-lane road. SIMD is the synchronized convoy. MISD is the redundant safety system. MIMD is the modern multi-lane highway. Understanding which type of traffic your computation generates tells you which hardware to buy and which programming model to use.',
    terminology: ['SISD', 'SIMD', 'MISD', 'MIMD', 'Instruction stream', 'Data stream', 'Shared memory', 'Distributed memory', 'Flynn\\\'s Taxonomy', 'Architecture classification'],
    mathNeed: 'Architecture classification helps us predict the maximum theoretical throughput for a given workload type. We can model the throughput of each architecture class.',
    mathMotivation: 'Different architectures have different cost-performance profiles. Mathematical comparison helps choose the right hardware for a given problem.',
    realWorldChallenges: ['Image processing is naturally SIMD — the same filter applies to every pixel', 'Web servers are naturally MIMD — each request is independent', 'Scientific simulations may need both: MIMD across nodes, SIMD within each node'],
    technicalChallenges: ['MISD is theoretically possible but rarely practical outside fault-tolerant systems', 'Mapping irregular problems to SIMD hardware wastes lanes', 'Shared-memory MIMD requires careful synchronization'],
    equations: [
      {
        name: 'SIMD Throughput',
        latex: 'T_{SIMD} = N_{lanes} \\times T_{single}',
        symbols: 'T_SIMD is aggregate throughput, N_lanes is the number of SIMD lanes (vector width), T_single is the throughput of one lane.',
        meaning: 'SIMD throughput scales linearly with the number of lanes, but only when all lanes do useful work.',
        whyNeeded: 'It quantifies the theoretical speedup of vectorization for data-parallel workloads.',
        interpretation: 'A 256-bit AVX2 register holds 8 single-precision floats. If one lane processes one float per cycle, 8 lanes process 8 per cycle — an 8x throughput increase.'
      },
      {
        name: 'Amdahl Classification Speedup',
        latex: 'S_{SIMD} = \\alpha \\cdot N_{lanes} + (1 - \\alpha)',
        symbols: 'alpha is the fraction of code amenable to SIMD vectorization, N_lanes is vector width.',
        meaning: 'The overall speedup is a weighted blend of the vectorized portion (which scales with lane count) and the scalar portion (which stays constant).',
        whyNeeded: 'Real code is never 100% vectorizable, so this gives a realistic SIMD speedup estimate.',
        interpretation: 'If 80% of a loop vectorizes on a 8-lane unit, effective speedup is 0.8*8 + 0.2 = 6.6x.'
      }
    ],
    numericalExample: 'An image filter processes 1 million pixels. Scalar code: 10ms. SIMD (8 lanes, 90% vectorizable): effective speedup = 0.9*8 + 0.1 = 7.3x. Time = 10/7.3 = 1.37ms. The remaining 10% scalar code (1ms) dominates the tail.',
    metrics: ['Vectorization ratio (vector instructions / total instructions)', 'SIMD lane utilization', 'Instructions per cycle (IPC)', 'Memory bandwidth utilization', 'Interconnect latency between nodes'],
    optimizationPossibilities: 'Reorganize data layouts (Structure of Arrays vs Array of Structures) to maximize lane utilization, and align data to SIMD register boundaries.',
    futureEnhancements: 'Wider SIMD (AVX-512, ARM SVE), scalable vector extensions, and domain-specific architectures (tensor cores, matrix engines) are blurring the lines between Flynn classes.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Classify everyday devices using Flynn\\\'s categories.', instructions: 'Show images: a pocket calculator (SISD), a GPU rendering pixels (SIMD), a flight computer with triple redundancy (MISD), a cloud server cluster (MIMD). Ask students to match each to a Flynn class.', inputs: 'Images or slides of four devices', expectedOutputs: 'Correct classification of each device with brief justification.', rubric: 'Correct matches 50%, quality of justification 50%.', learningOutcomes: 'Recognize that real hardware maps to Flynn categories.', time: '10 minutes', materials: 'Slides or printed images, whiteboard' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Classify parallel workloads by Flynn category.', instructions: 'Present five workloads: video encoding, web server, flight controller, weather simulation, cryptocurrency mining. As a class, debate and assign each to SISD, SIMD, MISD, or MIMD.', inputs: 'Workload descriptions on handout', expectedOutputs: 'Correct classification with reasoning for each workload.', rubric: 'Correct classification 40%, reasoning quality 60%.', learningOutcomes: 'Understand that the workload determines the best architecture.', time: '15 minutes', materials: 'Handout, whiteboard' },
      { level: 3, levelName: 'All Students Do', objective: 'Map a real program to architecture classes.', instructions: 'In groups of 3, analyze a provided Python benchmark. Identify which parts are SISD, which are SIMD-able, and which require MIMD. Present findings to the class.', inputs: 'Python benchmark code, profiling results', expectedOutputs: 'Classification table with code regions mapped to Flynn categories.', rubric: 'Correct classification 35%, quality of analysis 35%, presentation 30%.', learningOutcomes: 'Realize that most programs contain a mix of Flynn categories.', time: '25 minutes', materials: 'Code printout, profiling results' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Design an architecture for a given problem.', instructions: 'Given a bioinformatics workload (DNA sequence alignment), choose the best Flynn category, justify the choice, estimate the speedup over SISD, and identify the main bottleneck.', inputs: 'Problem description with performance data', expectedOutputs: 'One-page architecture justification with speedup estimate.', rubric: 'Correct architecture choice 30%, justification quality 30%, speedup estimate accuracy 20%, bottleneck identification 20%.', learningOutcomes: 'Apply architectural thinking to a real scientific problem.', time: '20 minutes', materials: 'Problem handout, calculator' }
    ],
    projectScope: 'Build a comparison tool that runs the same workload (matrix multiplication) using SISD, SIMD (NumPy vectorized), and MIMD (multiprocessing) approaches and compares execution times.',
    projectFeasibility: 'Uses Python with NumPy and multiprocessing. No special hardware required. NumPy automatically uses SIMD instructions.',
    projectObjectives: ['Implement naive matrix multiplication (SISD)', 'Use NumPy for SIMD-accelerated multiplication', 'Use multiprocessing for MIMD multiplication', 'Measure and compare execution times across all three', 'Analyze which Flynn class wins for different matrix sizes'],
    projectOutcomes: ['Python benchmark script', 'Timing comparison chart', 'Analysis report explaining why different sizes favor different approaches'],
    projectMethodology: 'Question: How does the Flynn classification affect performance? Hypothesis: SIMD wins for medium matrices, MIMD for large matrices. Experiment: Benchmark with timed runs. Compare: Plot speedup curves. Reflect: Match results to architecture theory.',
    projectRoles: ['Code Lead: implements all three versions', 'Benchmark Lead: designs the measurement protocol', 'Analyst: creates comparison charts', 'Writer: documents findings'],
    projectTimeline: [
      { milestone: 'Setup', duration: 'Day 1', deliverable: 'Environment setup and problem definition' },
      { milestone: 'SISD baseline', duration: 'Days 2-3', deliverable: 'Naive implementation with timing' },
      { milestone: 'SIMD + MIMD', duration: 'Days 4-5', deliverable: 'NumPy and multiprocessing versions' },
      { milestone: 'Analysis', duration: 'Day 6', deliverable: 'Comparison chart and bottleneck analysis' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Final report with architecture recommendations' }
    ],
    projectRisks: [
      { risk: 'NumPy internals obscure SIMD measurement', severity: 'Medium', mitigation: 'Use size sweeps to reveal vectorization benefits at different scales' },
      { risk: 'MIMD overhead dominates for small matrices', severity: 'Medium', mitigation: 'Start at large matrix sizes (1000x1000) and work down' },
      { risk: 'Results vary across hardware', severity: 'Low', mitigation: 'Record hardware specs and repeat all trials' }
    ],
    projectBudget: 'Student time: ~12 hours. Compute cost: $0 (laptop). Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Experimental comparison of three Flynn classes on representative workloads.',
    questions: [
      { type: 'conceptual', question: 'What are the four categories of Flynn\\\'s Taxonomy?', answer: 'SISD (Single Instruction Single Data), SIMD (Single Instruction Multiple Data), MISD (Multiple Instruction Single Data), and MIMD (Multiple Instruction Multiple Data).', explanation: 'Flynn classified architectures by the number of independent instruction streams and data streams they can process simultaneously.', commonMistakes: 'Confusing SIMD with MIMD. SIMD applies ONE instruction to many data points; MIMD applies DIFFERENT instructions to DIFFERENT data.', tip: 'SIMD is like a choir singing the same song. MIMD is like a jazz ensemble.' },
      { type: 'numerical', question: 'A SIMD unit has 16 lanes and processes an array where 85% of operations are vectorizable. What is the effective speedup?', answer: 'S = 0.85 * 16 + 0.15 = 13.75x', explanation: 'The vectorized portion (85%) gets 16x speedup. The scalar portion (15%) stays at 1x. Weighted sum = 13.75x.', commonMistakes: 'Reporting 16x instead of the realistic 13.75x.', tip: 'Always account for the scalar tail — it is the speed limit.' },
      { type: 'application', question: 'Why is MISD rarely used in practice?', answer: 'MISD requires multiple independent instruction streams operating on the same data simultaneously. This is only useful for redundant fault-tolerant systems (like triple-modular redundancy in flight controllers) and is extremely expensive.', explanation: 'Most real workloads either apply the same operation to different data (SIMD) or different operations to different data (MIMD). The MISD pattern rarely occurs naturally.', commonMistakes: 'Thinking MISD is just MIMD with shared data.', tip: 'Think of MISD as three doctors independently diagnosing the same patient.' },
      { type: 'problemSolving', question: 'A workload applies the same mathematical transform to every pixel in a 4K image. Which Flynn category is the best fit, and why?', answer: 'SIMD, because the same instruction (the transform) applies to many data points (pixels) simultaneously. A modern CPU with 256-bit AVX2 can process 8 single-precision pixels per cycle.', explanation: 'Pixel transforms are embarrassingly parallel in the SIMD sense: identical operation, independent data. This maps perfectly to vector hardware.', commonMistakes: 'Choosing MIMD when SIMD is sufficient — MIMD adds unnecessary scheduling overhead.', tip: 'Same operation on many data points = SIMD. Different operations on different data = MIMD.' }
    ],
    labType: 'flynn-taxonomy',
    keyInsights: ['Architecture choice must match the workload pattern', 'SIMD excels at data-parallel tasks with uniform operations', 'MIMD handles irregular, independent tasks', 'Most real programs are hybrids that use multiple Flynn categories'],
    advantages: ['Provides a clear mental model for hardware selection', 'Helps predict which workloads will benefit from which hardware', 'Guides algorithm design toward the target architecture'],
    disadvantages: ['Real hardware is more complex than four categories', 'Modern CPUs mix SIMD and MIMD capabilities', 'Does not account for memory hierarchy or interconnect topology'],
    improvements: ['Extend the taxonomy with memory and interconnect dimensions', 'Add power and energy axes to the classification', 'Consider domain-specific accelerators (TPU, NPU) as additional categories'],
    futureScope: 'Quantum computing, neuromorphic processing, and photonic computing represent entirely new architecture classes beyond Flynn\\\'s original four categories.',
    industrialApplications: ['GPU manufacturing (NVIDIA, AMD) designs SIMD/MIMD hybrid architectures', 'Cloud providers offer SIMD-optimized instances (AWS c6g, Google TPU)', 'Embedded systems (automotive, aerospace) use MISD for safety-critical redundancy'],
    researchOpportunities: ['Architecture-aware algorithm design', 'Auto-vectorizing compilers', 'Heterogeneous computing frameworks (SYCL, Kokkos)', 'Performance portability across Flynn categories'],
    careerRelevance: ['Hardware Architect', 'Compiler Engineer', 'Performance Analyst', 'Embedded Systems Developer', 'GPU Software Engineer']
  },
  {
    id: 3,
    title: 'Memory Hierarchy and Cache Coherence',
    description: 'Explain why data movement often dominates compute time and how caches, registers, and main memory form a hierarchy.',
    prerequisites: ['Topic 1: understanding of bottlenecks and throughput', 'Topic 2: Flynn\\\'s Taxonomy and basic computer organization', 'Basic understanding of binary addressing and cache lines'],
    dependencies: ['Speedup Laws (Topic 4) quantify the impact of memory latency', 'GPU Architecture (Unit 3) depends on understanding coalesced memory access', 'Cache-aware algorithm design is essential for all parallel programming'],
    preparationPlan: 'Review the difference between registers, cache, RAM, and disk. Sketch a simple cache mapping diagram and refresh the concept of spatial and temporal locality.',
    story: 'You live in a tiny studio apartment. Your kitchen counter is tiny — it fits exactly one cutting board, one knife, and one bowl. This counter is your register: blazing fast, but room for almost nothing. Next to the counter is a small shelf that holds your ten most-used spices. This is your L1 cache: fast to reach, small capacity. Down the hall is a pantry with fifty jars. This is your L2 cache: a bit slower to walk to, but more spacious. Across the street is a grocery store with ten thousand products. This is your RAM: much larger, but you must leave the building to get anything. And somewhere in another city is a warehouse with millions of items. This is your SSD or hard drive: enormous capacity, glacial access time. Now suppose you are cooking a complicated recipe that needs seventeen different ingredients. If all seventeen are on the counter, you cook in five minutes. If you must walk to the shelf ten times, add ten minutes. If you must cross to the store five times, add thirty minutes. If you must drive to the warehouse twice, your dinner is tomorrow. A clever chef looks at the recipe first, gathers all seventeen ingredients before starting, and arranges them on the counter in the order they will be used. That is cache optimization: prefetch data you will need, arrange it in memory so spatial locality helps you, and minimize trips to slow storage. Now imagine ten chefs sharing the same kitchen. Chef A moves the salt to the counter. Chef B does not know and adds extra salt from the pantry. Chef C puts the salt back in the pantry while Chef A is still using it. This chaos is cache coherence: when multiple processors share memory, they must agree on where the latest version of every data item lives. The hardware coherence protocol (MESI, MOESI) is like a kitchen rule book that tracks which chef has which ingredient and whether it has been modified.',
    cartoonPanels: [
      {
        scene: 1,
        title: "The Tiny Counter (Registers)",
        avatar: "🔪",
        tag: "Registers",
        caption: "Cutting board right under your knife! Extremely fast (1 cycle), but holds only 1 ingredient at a time.",
        concept: "CPU Registers: Fastest storage element (~0.5 ns), very small capacity (a few dozen registers).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="110" y="60" width="100" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/><text x="160" y="98" font-size="28" text-anchor="middle">🔪🥕</text><text x="160" y="45" font-size="12" fill="#38bdf8" font-weight="bold" text-anchor="middle">Counter (Registers)</text><text x="160" y="150" font-size="11" fill="#22c55e" text-anchor="middle">Latency: 1 Cycle (~0.5 ns)</text></svg>`
      },
      {
        scene: 2,
        title: "Shelf vs. Supermarket (L1 vs RAM)",
        avatar: "🧂",
        tag: "Memory Gap",
        caption: "Reaching the spice shelf (L1) takes 5 seconds; driving to the warehouse (DRAM) takes 30 minutes!",
        concept: "L1 Cache (~1 ns) vs DRAM Main Memory (~100 ns latency gap).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(30, 40)"><rect x="0" y="0" width="80" height="70" rx="6" fill="#1e293b" stroke="#22c55e"/><text x="40" y="40" font-size="24" text-anchor="middle">🧂</text><text x="40" y="62" font-size="10" fill="#22c55e" text-anchor="middle">L1 (1 ns)</text></g><g transform="translate(200, 40)"><rect x="0" y="0" width="90" height="70" rx="6" fill="#1e293b" stroke="#ef4444"/><text x="45" y="40" font-size="24" text-anchor="middle">🏬</text><text x="45" y="62" font-size="10" fill="#ef4444" text-anchor="middle">DRAM (100 ns)</text></g><path d="M 115 75 L 195 75" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4"/><text x="155" y="65" font-size="16">🚗</text><text x="160" y="150" font-size="11" fill="#f59e0b" font-weight="bold" text-anchor="middle">100x Memory Latency Penalty!</text></svg>`
      },
      {
        scene: 3,
        title: "3 Chefs & Stale Salt (MESI Protocol)",
        avatar: "🍳",
        tag: "MESI Protocol",
        caption: "Chef A moves the salt to modified [M], Chef B gets invalid [I] state and must fetch the latest copy!",
        concept: "Cache Coherence: MESI protocol invalidates stale cache lines across multi-core CPUs.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(30, 40)"><text x="30" y="30" font-size="24">👨‍🍳</text><rect x="0" y="40" width="60" height="30" rx="4" fill="#22c55e"/><text x="30" y="60" fill="white" font-size="11" font-weight="bold" text-anchor="middle">[M] Core 0</text></g><g transform="translate(230, 40)"><text x="30" y="30" font-size="24">👩‍🍳</text><rect x="0" y="40" width="60" height="30" rx="4" fill="#ef4444"/><text x="30" y="60" fill="white" font-size="11" font-weight="bold" text-anchor="middle">[I] Core 1</text></g><path d="M 100 65 L 220 65" stroke="#ef4444" stroke-width="3" stroke-dasharray="4"/><text x="160" y="55" font-size="11" fill="#ef4444" text-anchor="middle">Invalidate Line!</text><text x="160" y="150" font-size="11" fill="#38bdf8" font-weight="bold" text-anchor="middle">MESI Hardware Coherence Enforcement</text></svg>`
      },
      {
        scene: 4,
        title: "False Sharing Elbow Bouncing",
        avatar: "💥",
        tag: "False Sharing",
        caption: "Chefs use different spices, but because they sit on 1 shared tray, the tray keeps bouncing between chefs!",
        concept: "False Sharing: Independent variables sharing a 64-byte line trigger continuous cache line invalidations.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="60" y="70" width="200" height="40" rx="6" fill="#1e293b" stroke="#ec4899" stroke-width="3"/><text x="100" y="96" font-size="20">🧂</text><text x="220" y="96" font-size="20">🌶️</text><text x="30" y="95" font-size="22">👨‍🍳</text><text x="280" y="95" font-size="22">👩‍🍳</text><text x="160" y="50" font-size="16" text-anchor="middle">⚡ 64-Byte Cache Line ⚡</text><text x="160" y="150" font-size="11" fill="#ec4899" font-weight="bold" text-anchor="middle">False Sharing Causes Line Bouncing</text></svg>`
      }
    ],
    storyQuestions: [
      'Why does walking to the grocery store mid-recipe ruin your cooking time?',
      'How would you reorganize the recipe to minimize trips to the pantry?',
      'Why do ten chefs with no communication make dangerous mistakes with shared ingredients?',
      'What rule would you create to prevent Chef B from using stale salt?'
    ],
    storyBridge: 'The memory hierarchy is a speed-size trade-off: fast memory is small, large memory is slow. Cache coherence ensures that when multiple processors share memory, each one sees a consistent view of every data item. Without coherence, parallel programs produce mysterious bugs because different cores see different values for the same variable.',
    terminology: ['Register', 'L1 cache', 'L2 cache', 'L3 cache', 'RAM', 'Cache line', 'Spatial locality', 'Temporal locality', 'Cache miss', 'Cache hit', 'MESI protocol', 'Coherence', 'False sharing', 'Write-back', 'Write-through'],
    mathNeed: 'Memory latency differences are so extreme (1 ns for L1 vs 100 ns for RAM) that the memory hierarchy dominates program performance more than arithmetic speed.',
    mathMotivation: 'We need models to predict the effective memory access time given cache hit rates and latency differences.',
    realWorldChallenges: ['Large datasets (genomics, climate) far exceed cache capacity, causing frequent cache misses', 'False sharing in multi-threaded programs silently destroys performance', 'Cache coherence traffic grows with core count, limiting scalability'],
    technicalChallenges: ['Optimizing for cache requires understanding data layout, not just algorithms', 'False sharing occurs when unrelated variables share a cache line', 'Coherence protocols add latency to every shared-memory write'],
    equations: [
      {
        name: 'Effective Access Time',
        latex: 'EAT = h \\times t_{cache} + (1 - h) \\times t_{memory}',
        symbols: 'h is cache hit rate, t_cache is cache access time, t_memory is main memory access time.',
        meaning: 'The average time to access a data item is a weighted average of cache and memory latencies.',
        whyNeeded: 'It quantifies exactly how much cache performance matters — even small hit rate improvements save significant time.',
        interpretation: 'If h=0.95, t_cache=1ns, t_memory=100ns, then EAT = 0.95*1 + 0.05*100 = 5.95ns. That 5% miss rate costs 5x more than a perfect cache hit.'
      },
      {
        name: 'Cache Miss Penalty',
        latex: 'P_{miss} = (1 - h) \\times (t_{memory} - t_{cache})',
        symbols: 'P_miss is the total penalty from misses, h is hit rate.',
        meaning: 'The total time lost to cache misses compared to a perfect cache.',
        whyNeeded: 'Isolates the cost of poor cache behavior, making optimization targets explicit.',
        interpretation: 'With h=0.9, the miss penalty is 0.1 * 99 = 9.9ns per access on average.'
      }
    ],
    numericalExample: 'A loop accesses 1 million 8-byte elements sequentially. L1 cache line = 64 bytes (8 elements). Sequential access: each cache miss loads 8 useful elements. Hit rate for elements 2-8 = 100%. Overall hit rate ≈ 7/8 = 87.5%. Random access: hit rate ≈ 0% (first access only). Sequential EAT = 0.875*1 + 0.125*100 = 13.375ns. Random EAT = 0*1 + 1*100 = 100ns. Sequential is 7.5x faster purely due to spatial locality.',
    metrics: ['Cache hit rate (L1, L2, L3)', 'Cycles per instruction (CPI)', 'Memory bandwidth utilization', 'False sharing events', 'TLB miss rate', 'Write-allocate vs write-through ratio'],
    optimizationPossibilities: 'Structure data for sequential access, pad arrays to avoid false sharing, prefetch data before it is needed, and use non-temporal stores for write-heavy patterns.',
    futureEnhancements: 'Persistent memory (Intel Optane), CXL-attached memory, and software-managed scratchpad memories are blurring the traditional hierarchy.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Demonstrate cache behavior using a classroom simulation.', instructions: 'Place 8 \\\"data items\\\" (index cards) on a desk (cache) and 100 items in a box across the room (RAM). Access items sequentially vs randomly. Time each approach. Show the massive difference.', inputs: 'Index cards, desk, box, timer', expectedOutputs: 'Sequential access is 5-10x faster than random access.', rubric: 'Demonstration clarity 50%, student engagement 50%.', learningOutcomes: 'See that data access pattern dramatically affects speed.', time: '10 minutes', materials: 'Index cards, desk, box, timer' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Calculate effective access time for different hit rates.', instructions: 'Given t_cache=1ns, t_memory=100ns, compute EAT for h = 0.5, 0.8, 0.95, 0.99. Plot the results. Discuss: how much does each 5% improvement in hit rate help?', inputs: 'Calculator, equation', expectedOutputs: 'EAT values showing dramatic improvement as hit rate increases.', rubric: 'Correct calculations 40%, meaningful discussion 60%.', learningOutcomes: 'Quantify the nonlinear impact of cache hit rate.', time: '15 minutes', materials: 'Calculator, graph paper' },
      { level: 3, levelName: 'All Students Do', objective: 'Detect false sharing in a parallel program.', instructions: 'In groups, run a provided multi-threaded counter benchmark. First version: counters on the same cache line (false sharing). Second version: counters on separate cache lines (padded). Compare speeds.', inputs: 'C or Python benchmark code, laptop', expectedOutputs: 'Speedup of 2-5x after removing false sharing.', rubric: 'Correct execution 30%, measured speedup 30%, explanation of why 40%.', learningOutcomes: 'Experience the silent performance killer of false sharing.', time: '25 minutes', materials: 'Laptop, benchmark code' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Optimize a matrix transpose for cache performance.', instructions: 'Implement a naive NxN matrix transpose. Then implement a blocked (tiled) transpose that operates on cache-sized blocks. Measure and compare performance for N=2048.', inputs: 'Matrix transpose code skeleton', expectedOutputs: 'Two implementations with timing comparison showing 3-10x improvement from blocking.', rubric: 'Correct implementation 30%, correct measurement 30%, analysis of why blocking helps 40%.', learningOutcomes: 'Apply cache-aware optimization to a real algorithm.', time: '20 minutes', materials: 'Code skeleton, compiler, timer' }
    ],
    projectScope: 'Build a memory access pattern visualizer that compares sequential, strided, and random access performance across different array sizes.',
    projectFeasibility: 'Uses Python with NumPy and time module. No special hardware. Results vary by CPU but the patterns are universal.',
    projectObjectives: ['Implement three access patterns: sequential, stride-2, random', 'Sweep array sizes from 1KB to 100MB', 'Plot execution time vs array size for each pattern', 'Identify cache level boundaries from performance cliffs', 'Explain results using cache line and hierarchy theory'],
    projectOutcomes: ['Python benchmark with three access patterns', 'Three-curve performance plot', 'Analysis identifying L1, L2, L3 boundaries', 'One-page optimization recommendations'],
    projectMethodology: 'Question: How does access pattern affect performance? Hypothesis: Sequential access will be fastest, random slowest, with cliffs at cache boundaries. Experiment: Timed sweeps. Compare: Plot three curves. Reflect: Match cliffs to cache levels.',
    projectRoles: ['Code Lead: implements benchmarks', 'Measurement Lead: designs sweep protocol', 'Analyst: creates plots and identifies cache boundaries', 'Writer: documents findings'],
    projectTimeline: [
      { milestone: 'Setup', duration: 'Day 1', deliverable: 'Problem definition and code skeleton' },
      { milestone: 'Implementation', duration: 'Days 2-3', deliverable: 'Three access pattern benchmarks' },
      { milestone: 'Measurement', duration: 'Days 4-5', deliverable: 'Full sweep data collected' },
      { milestone: 'Analysis', duration: 'Day 6', deliverable: 'Performance plot with cache boundary annotations' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Final report with optimization recommendations' }
    ],
    projectRisks: [
      { risk: 'OS caching masks hardware cache behavior', severity: 'Medium', mitigation: 'Use direct I/O or touch all data to flush OS cache' },
      { risk: 'Results vary across CPU models', severity: 'Low', mitigation: 'Document CPU model, repeat all trials, report median' },
      { risk: 'Compiler optimizations reorder memory accesses', severity: 'Medium', mitigation: 'Use volatile or memory barriers where appropriate' }
    ],
    projectBudget: 'Student time: ~12 hours. Compute cost: $0 (laptop). Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Empirical demonstration of memory hierarchy effects on access performance.',
    questions: [
      { type: 'conceptual', question: 'Why does the memory hierarchy exist?', answer: 'Because building a large memory that is also fast is prohibitively expensive. The hierarchy provides fast access to frequently used data (cache) while maintaining large capacity for infrequently used data (RAM, disk).', explanation: 'SRAM (cache) is fast but expensive per bit. DRAM (RAM) is cheaper but slower. Flash (SSD) is cheapest but slowest. The hierarchy balances cost, speed, and capacity.', commonMistakes: 'Thinking the hierarchy exists because engineers forgot to make fast large memory.', tip: 'Fast + Large + Cheap — pick two.' },
      { type: 'numerical', question: 'L1 access = 1ns, L2 access = 5ns, RAM access = 100ns. If L1 hit rate is 90% and L2 hit rate is 95% of remaining misses, what is the EAT?', answer: 'EAT = 0.90*1 + 0.10*0.95*5 + 0.10*0.05*100 = 0.90 + 0.475 + 0.50 = 1.875ns', explanation: 'Layer by layer: 90% of accesses hit L1 at 1ns. Of the 10% that miss, 95% hit L2 at 5ns. The remaining 0.5% go to RAM at 100ns.', commonMistakes: 'Forgetting to chain the conditional probabilities for L2 and RAM.', tip: 'Think of it as a funnel: each level catches some fraction of what the previous level missed.' },
      { type: 'application', question: 'What is false sharing and how do you fix it?', answer: 'False sharing occurs when two threads on different cores write to unrelated variables that happen to reside on the same cache line. The coherence protocol invalidates the entire line, causing unnecessary traffic.', explanation: 'Fix by padding the data structure so each thread\\\'s variables occupy separate cache lines (typically 64 bytes apart).', commonMistakes: 'Confusing false sharing with data races — false sharing is a performance issue, not a correctness issue.', tip: 'False sharing is invisible to correctness but devastating to performance.' },
      { type: 'problemSolving', question: 'A database query scans 10 GB of data randomly. Suggest two cache-friendly optimizations.', answer: '(1) Sort the data by the query key so accesses become sequential, exploiting spatial locality. (2) Use a Bloom filter or index to skip irrelevant data, reducing total data touched.', explanation: 'Random access defeats the cache entirely. Converting random to sequential access can improve performance by 10-100x.', commonMistakes: 'Suggesting \\\"add more cache\\\" instead of changing the access pattern.', tip: 'You cannot change the cache, but you can change how you use it.' }
    ],
    labType: 'cache-coherence',
    keyInsights: ['Data movement dominates computation in most real programs', 'Spatial and temporal locality are the foundation of cache performance', 'False sharing is invisible to correctness but devastating to performance', 'Cache-aware algorithms can outperform cache-oblivious ones by 10x or more'],
    advantages: ['Caches make fast memory appear large at low cost', 'Understanding the hierarchy enables dramatic software optimization', 'Coherence protocols allow safe shared-memory parallelism'],
    disadvantages: ['Cache misses impose severe penalties (100x slower than cache hit)', 'False sharing is nearly invisible without profiling tools', 'Coherence traffic grows with core count, limiting scalability'],
    improvements: ['Use profile-guided optimization to layout data for cache', 'Apply software prefetching for predictable access patterns', 'Use non-temporal stores to bypass cache for streaming writes'],
    futureScope: 'CXL-attached memory, processing-in-memory (PIM), and persistent memory are reshaping the traditional hierarchy.',
    industrialApplications: ['Database engine optimization (PostgreSQL, MySQL buffer management)', 'Game engine rendering (spatial data structure layout)', 'Scientific computing (matrix blocking, stencil optimization)', 'Cloud computing (cache-aware container scheduling)'],
    researchOpportunities: ['Cache-oblivious algorithms', 'Prefetch scheduling and data stream mining', 'Near-memory computing', 'Cache side-channel security'],
    careerRelevance: ['Performance Engineer', 'Database internals developer', 'Compiler optimization engineer', 'Systems programmer', 'Hardware-software co-design researcher']
  },
  {
    id: 4,
    title: 'Speedup, Efficiency, and Scalability Laws',
    description: 'Model serial bottlenecks with Amdahl\\\'s and Gustafson\\\'s Laws and learn to predict parallel performance before writing code.',
    prerequisites: ['Topic 1: basic HPC concepts and throughput', 'Topic 3: memory hierarchy effects on performance', 'Ability to read equations and compute numerical examples', 'Basic understanding of parallel vs serial execution'],
    dependencies: ['OpenMP (Unit 2) uses these laws to evaluate thread scaling', 'MPI (Unit 2) applies these laws across distributed nodes', 'GPU occupancy (Unit 3) extends these models to accelerators', 'All performance evaluation in the course builds on these laws'],
    preparationPlan: 'Review the Amdahl preview from Topic 1, compute a few examples by hand, and read about strong vs weak scaling before class.',
    story: 'You are the manager of a moving company. A client needs to move 12 boxes from an apartment to a truck. The truck is parked 50 meters away. One mover carries one box at a time: 12 trips x 50 meters = 600 meters of walking. Total time: 24 minutes. You hire a second mover. Now they can carry two boxes simultaneously. Great, right? Except they both need to fit through one narrow hallway, one staircase, and one doorway. They spend more time waiting for each other than carrying. The second mover only saves 4 minutes. You add a third mover. Now they are tripping over each other in the hallway. Time saved: 2 minutes. A fourth mover: 1 minute. A fifth: basically nothing, and someone sprains an ankle. The lesson? The hallway, staircase, and doorway are the serial bottleneck. No amount of movers can walk through a single doorway faster than one person. Now suppose the client has ten apartments in the same building. You assign one mover per apartment. Each mover works independently in their own apartment. Now ten movers all carry simultaneously with almost no interference. The hallway is shared only for loading the truck, which is a small fraction of total work. This is weak scaling: when you increase the problem size proportionally with the number of workers, speedup stays nearly linear. The moving company has discovered two fundamental laws. Amdahl\\\'s Law: for a fixed problem, the serial fraction limits speedup. Gustafson\\\'s Law: when you increase the problem size with the workers, you can maintain efficiency. The moving company\\\'s next challenge: a client with 1000 boxes and 10 narrow staircases. How do you partition the work to maximize throughput? You assign 10 movers, each handling 100 boxes in a different stairwell. Each mover\\\'s serial fraction (waiting at the staircase) is small relative to their carrying work. The company now has a scalability model: measure the serial fraction, predict the speedup curve, and choose the right number of movers for each building.',
    cartoonPanels: [
      {
        scene: 1,
        title: "4 Movers Jammed in 1 Doorway",
        avatar: "📦",
        tag: "Amdahl's Law",
        caption: "4 movers hired to carry 12 boxes, but only 1 mover fits through the narrow apartment doorway at a time!",
        concept: "Strong Scaling (Amdahl's Law): Fixed problem size N. Serial bottleneck limits speedup ceiling to 1/(1-f).",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="140" y="40" width="20" height="90" fill="#ef4444"/><text x="120" y="85" font-size="22">📦👷</text><text x="80" y="85" font-size="22">👷</text><text x="40" y="85" font-size="22">👷</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">Amdahl Ceiling: Doorway Serial Bottleneck</text></svg>`
      },
      {
        scene: 2,
        title: "10 Movers in 10 Stairwells",
        avatar: "🏢",
        tag: "Gustafson's Law",
        caption: "10 movers assigned to 10 separate stairwells simultaneously. Scaling boxes with workers maintains near-linear speedup!",
        concept: "Weak Scaling (Gustafson's Law): Scaling problem size with processor count keeps parallel efficiency high.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(30, 40)"><g font-size="18"><text x="0" y="25">🏢📦👷</text><text x="55" y="25">🏢📦👷</text><text x="110" y="25">🏢📦👷</text><text x="165" y="25">🏢📦👷</text><text x="220" y="25">🏢📦👷</text><text x="0" y="65">🏢📦👷</text><text x="55" y="65">🏢📦👷</text><text x="110" y="65">🏢📦👷</text><text x="165" y="65">🏢📦👷</text><text x="220" y="65">🏢📦👷</text></g></g><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">Gustafson Weak Scaling: Linear Speedup</text></svg>`
      },
      {
        scene: 3,
        title: "100 Movers for 12 Boxes",
        avatar: "📉",
        tag: "Diminishing Returns",
        caption: "Hiring 100 movers for 12 boxes saves 1 extra second, but 90 movers sit on the lawn drinking soda!",
        concept: "Diminishing Returns (E = S/P): Adding processors beyond the serial fraction limit wastes hardware & energy.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><path d="M 40 130 Q 160 40 280 40" stroke="#f59e0b" stroke-width="3" fill="none"/><circle cx="280" cy="40" r="6" fill="#ef4444"/><text x="210" y="60" font-size="11" fill="#ef4444" font-weight="bold">Efficiency Drops!</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">Diminishing Returns Beyond Optimal P</text></svg>`
      },
      {
        scene: 4,
        title: "Iso-Efficiency Fleet Balancing",
        avatar: "⚖️",
        tag: "Iso-Efficiency",
        caption: "The smart manager scales the mover count proportionally with the building size to guarantee constant 80% efficiency.",
        concept: "Iso-Efficiency Function: Dictates how fast problem size must grow relative to processor count.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="80" y="50" width="160" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/><text x="160" y="85" font-size="20" text-anchor="middle">📊 E = 80%</text><text x="160" y="105" font-size="11" fill="#38bdf8" text-anchor="middle">Iso-Efficiency Model</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">Optimal Problem-to-Processor Ratio</text></svg>`
      }
    ],
    storyQuestions: [
      'Why did the fourth mover save almost no time for the single apartment move?',
      'What changed when you moved to ten apartments that made ten movers effective?',
      'If each staircase becomes a bottleneck, how would you redesign the building?',
      'What would you measure to decide the optimal number of movers for a given building?'
    ],
    storyBridge: 'Amdahl\\\'s Law is the single-apartment scenario: fixed work, serial bottleneck, diminishing returns. Gustafson\\\'s Law is the ten-apartment scenario: scaling the problem with the workers keeps everyone busy. Real HPC always involves both: strong scaling (fixed problem) and weak scaling (growing problem).',
    terminology: ['Speedup', 'Efficiency', 'Strong scaling', 'Weak scaling', 'Amdahl\\\'s Law', 'Gustafson\\\'s Law', 'Serial fraction', 'Parallel fraction', 'Scalability', 'Diminishing returns', 'Iso-efficiency'],
    mathNeed: 'Without quantitative models we cannot predict whether parallelization is worth the investment. These laws let us forecast performance before writing code.',
    mathMotivation: 'Both laws capture different aspects of parallelism. Amdahl bounds fixed-size speedup; Gustafson bounds fixed-time speedup. Together they define the performance envelope.',
    realWorldChallenges: ['HPC codes often have 5-15% serial fractions that cap speedup at 7-20x', 'Weak scaling is hard to maintain because communication grows with problem size', 'Real measurements deviate from ideal models due to load imbalance and synchronization'],
    technicalChallenges: ['Measuring the serial fraction accurately requires careful profiling', 'Communication overhead is not captured by either law', 'Load imbalance effectively increases the serial fraction'],
    equations: [
      {
        name: 'Amdahl\\\'s Law',
        latex: 'S(p) = \\frac{1}{(1-f) + \\frac{f}{p}}',
        symbols: 'S is speedup, f is the parallel fraction of the workload, p is the number of processors.',
        meaning: 'The speedup of a parallel program is bounded by the reciprocal of the serial fraction. Even with infinite processors, speedup cannot exceed 1/(1-f).',
        whyNeeded: 'It provides the theoretical maximum speedup for a fixed problem size and helps set realistic expectations for parallelization.',
        interpretation: 'If f = 0.95 (95% parallel), maximum speedup = 1/0.05 = 20x. Adding processor 21 through infinity gains nothing.'
      },
      {
        name: 'Gustafson\\\'s Law',
        latex: 'S(p) = p - \\sigma(p - 1)',
        symbols: 'S is scaled speedup, p is the number of processors, sigma is the serial fraction.',
        meaning: 'When the problem size grows proportionally with the number of processors, speedup scales nearly linearly because the serial fraction becomes a smaller proportion of total work.',
        whyNeeded: 'It counters Amdahl\\\'s pessimism by showing that larger problems benefit more from parallelism.',
        interpretation: 'If sigma = 0.05 and p = 64, S = 64 - 0.05*63 = 60.85x. The serial fraction barely dents the speedup when the problem grows.'
      },
      {
        name: 'Parallel Efficiency',
        latex: 'E(p) = \\frac{S(p)}{p}',
        symbols: 'E is efficiency, S is speedup, p is the number of processors.',
        meaning: 'Efficiency measures what fraction of the total computational capacity is actually being used.',
        whyNeeded: 'Speedup alone is misleading — 10x speedup on 100 processors means E = 10%, which is wasteful.',
        interpretation: 'E = 1.0 is perfect. E > 0.5 is usually acceptable. E < 0.1 suggests the problem is not suited for this level of parallelism.'
      },
      {
        name: 'Iso-efficiency Function',
        latex: 'T_0 = \\frac{O(p)}{E_0 - 1}',
        symbols: 'T_0 is the problem size growth rate, p is processor count, E_0 is the target efficiency.',
        meaning: 'The minimum problem size growth needed to maintain constant efficiency as processors are added.',
        whyNeeded: 'It tells you how much bigger the problem must be to justify adding more processors.',
        interpretation: 'If T_0 grows linearly with p, the system scales well. If T_0 grows quadratically, scalability is poor.'
      }
    ],
    numericalExample: 'Amdahl: f=0.9, p=4: S=1/(0.1+0.9/4)=1/0.325=3.08x, E=3.08/4=77%. p=16: S=1/(0.1+0.9/16)=1/0.15625=6.4x, E=6.4/16=40%. p=64: S=1/(0.1+0.9/64)=1/0.114=8.77x, E=8.77/64=13.7%. Gustafson: sigma=0.1, p=16: S=16-0.1*15=14.5x. The difference is dramatic: Amdahl gives 6.4x, Gustafson gives 14.5x for the same serial fraction.',
    metrics: ['Speedup S(p)', 'Efficiency E(p)', 'Serial fraction f (measured via profiling)', 'Scalability curves', 'Iso-efficiency function'],
    optimizationPossibilities: 'Reduce the serial fraction through algorithm redesign, overlap serial and parallel phases, and use Gustafson scaling to justify larger problems on bigger machines.',
    futureEnhancements: 'Parameterized models that include communication cost, load imbalance, and memory contention are replacing simple Amdahl/Gustafson models in modern performance prediction.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Demonstrate Amdahl\\\'s Law with a classroom calculation.', instructions: 'Write f=0.1, 0.3, 0.5 on the board. For each, compute S for p=1,2,4,8,16,32,64. Draw the curves. Show that lower f gives higher ceilings.', inputs: 'Whiteboard, markers, calculator', expectedOutputs: 'Three speedup curves with clear ceiling differences.', rubric: 'Calculation accuracy 40%, visual clarity 30%, verbal explanation 30%.', learningOutcomes: 'See the hard ceiling that Amdahl\\\'s Law imposes.', time: '10 minutes', materials: 'Whiteboard, markers' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Explore Gustafson scaling as a counter to Amdahl.', instructions: 'Use the same f values. For each, compute Gustafson speedup at p=4,16,64. Plot alongside Amdahl curves. Discuss the difference.', inputs: 'Calculator, both equations', expectedOutputs: 'Overlay plots showing Amdahl vs Gustafson curves.', rubric: 'Correct computation 35%, overlay plot 35%, discussion quality 30%.', learningOutcomes: 'Understand when each law applies.', time: '15 minutes', materials: 'Calculator, graph paper' },
      { level: 3, levelName: 'All Students Do', objective: 'Measure real scaling on a parallel workload.', instructions: 'Groups of 4 sum 10 million numbers using 1,2,4 threads. Time each run, compute speedup and efficiency. Plot results and compare to Amdahl prediction.', inputs: 'Python with threading, timing code', expectedOutputs: 'Speedup and efficiency table, comparison plot, estimated serial fraction.', rubric: 'Correct measurements 30%, correct calculations 30%, meaningful comparison 40%.', learningOutcomes: 'See how real performance compares to theoretical bounds.', time: '25 minutes', materials: 'Laptops, Python, timing script' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Design a scaling strategy for a given problem.', instructions: 'Given a 500GB dataset and a 128-node cluster, estimate the serial fraction from provided benchmarks, compute Amdahl and Gustafson speedup, and recommend the optimal problem-to-processor ratio.', inputs: 'Benchmark data handout', expectedOutputs: 'Written analysis with both speedup estimates and a recommendation.', rubric: 'Correct Amdahl computation 25%, correct Gustafson computation 25%, quality of recommendation 50%.', learningOutcomes: 'Apply both laws to a realistic deployment decision.', time: '20 minutes', materials: 'Handout, calculator' }
    ],
    projectScope: 'Build a scaling analysis tool that takes measured serial/parallel times and generates Amdahl and Gustafson speedup predictions for any processor count.',
    projectFeasibility: 'Pure Python with matplotlib. No special hardware. Can use synthetic timings if real parallel code is unavailable.',
    projectObjectives: ['Implement Amdahl\\\'s Law as a Python function', 'Implement Gustafson\\\'s Law as a Python function', 'Generate speedup and efficiency curves', 'Compare predicted vs measured speedup', 'Recommend optimal processor count for a target efficiency'],
    projectOutcomes: ['Python module with both laws', 'Speedup and efficiency plots', 'Comparison of model vs measurement', 'Recommendation report'],
    projectMethodology: 'Question: How well do Amdahl and Gustafson predict real performance? Hypothesis: Amdahl is pessimistic, Gustafson is optimistic. Experiment: Measure and compare. Reflect: Identify model limitations.',
    projectRoles: ['Model Lead: implements equations', 'Measurement Lead: collects timing data', 'Analyst: creates comparison plots', 'Writer: documents findings'],
    projectTimeline: [
      { milestone: 'Scope', duration: 'Day 1', deliverable: 'Problem definition and model implementation' },
      { milestone: 'Models', duration: 'Days 2-3', deliverable: 'Amdahl and Gustafson functions with plotting' },
      { milestone: 'Measurement', duration: 'Days 4-5', deliverable: 'Real timing data collected' },
      { milestone: 'Comparison', duration: 'Day 6', deliverable: 'Model vs measurement analysis' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Final report with recommendations' }
    ],
    projectRisks: [
      { risk: 'Serial fraction varies with problem size', severity: 'Medium', mitigation: 'Measure at multiple problem sizes and report the range' },
      { risk: 'Threading overhead skews small-problem measurements', severity: 'Medium', mitigation: 'Use large enough problems to amortize overhead' },
      { risk: 'Gustafson assumes linear problem growth', severity: 'Low', mitigation: 'Test multiple growth rates and report sensitivity' }
    ],
    projectBudget: 'Student time: ~12 hours. Compute cost: $0 (laptop). Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Analytical and experimental validation of scalability models.',
    questions: [
      { type: 'conceptual', question: 'What is the difference between Amdahl\\\'s Law and Gustafson\\\'s Law?', answer: 'Amdahl\\\'s Law models strong scaling: fixed problem size, increasing processors. Gustafson\\\'s Law models weak scaling: problem size grows with processors.', explanation: 'Amdahl says \\\"you can\\\'t parallelize the serial part.\\\" Gustafson says \\\"but the serial part gets proportionally smaller as the problem grows.\\\"', commonMistakes: 'Using one law when the other is appropriate.', tip: 'Fixed problem = Amdahl. Growing problem = Gustafson.' },
      { type: 'numerical', question: 'Using Amdahl\\\'s Law with f=0.85, what speedup do you get with 32 processors? What is the efficiency?', answer: 'S = 1/(0.15 + 0.85/32) = 1/(0.15 + 0.0266) = 1/0.1766 = 5.66x. E = 5.66/32 = 17.7%.', explanation: 'The 15% serial fraction limits speedup to at most 6.67x. At 32 processors we are already close to this ceiling, so efficiency drops.', commonMistakes: 'Computing 1/(0.85/32) = 37.6x and forgetting the serial term.', tip: 'The denominator has two terms: serial and parallel. Never drop the serial term.' },
      { type: 'application', question: 'A code achieves 4x speedup on 8 processors. What is the serial fraction, and is this good?', answer: 'S=4, p=8: 4 = 1/(1-f + f/8). Solving: 1-f + f/8 = 0.25, so 1-f = 0.25 - f/8, meaning 1 = 0.25 + 7f/8, so f = 0.75/0.875 = 0.857. Serial fraction ≈ 14.3%. Efficiency = 50%.', explanation: 'A 14.3% serial fraction is quite high — the code needs optimization before scaling further.', commonMistakes: 'Forgetting to invert the speedup equation to solve for f.', tip: 'When speedup is low relative to processor count, the serial fraction is the first suspect.' },
      { type: 'problemSolving', question: 'Your team achieves 10x speedup on 100 processors. Is this a good use of resources? Propose three actions.', answer: 'Efficiency is 10% — extremely wasteful. Actions: (1) Profile to find the serial fraction, (2) Reduce the serial fraction through algorithm redesign, (3) Use fewer processors (maybe 20) to achieve the same speedup at 50% efficiency.', explanation: '100 processors giving only 10x means 90% of compute is wasted. The same result could be achieved with far fewer resources.', commonMistakes: 'Celebrating the 10x speedup without noting the 100x resource cost.', tip: 'Speedup is meaningless without efficiency context.' }
    ],
    labType: 'speedup-laws',
    keyInsights: ['Amdahl\\\'s Law provides an absolute ceiling for fixed-problem speedup', 'Gustafson\\\'s Law shows that growing the problem preserves parallel efficiency', 'Efficiency is as important as speedup — more processors is not always better', 'Real performance always falls between the two laws\\\' predictions'],
    advantages: ['Provides quantitative predictions before writing code', 'Helps set realistic expectations for stakeholders', 'Guides hardware procurement decisions', 'Enables fair comparison of parallel implementations'],
    disadvantages: ['Neither law accounts for communication overhead', 'Serial fraction measurement is non-trivial', 'Load imbalance effectively inflates the serial fraction', 'Memory effects are not captured'],
    improvements: ['Include communication cost models (LogP, LogGP)', 'Add memory bandwidth constraints to the prediction', 'Use measured serial fractions instead of estimates', 'Build adaptive models that update predictions during execution'],
    futureScope: 'Machine learning-based performance prediction, auto-tuning runtimes, and energy-aware scaling models are extending classical laws.',
    industrialApplications: ['Cloud auto-scaling decisions (how many instances to provision)', 'HPC procurement (predicting ROI on new clusters)', 'Algorithm selection (choosing between serial and parallel implementations)', 'SLA compliance (predicting completion time)'],
    researchOpportunities: ['Communication-aware scaling models', 'Energy-efficient parallelism', 'Algorithmic scalability analysis', 'Performance prediction for heterogeneous systems'],
    careerRelevance: ['HPC Performance Analyst', 'Cloud Solutions Architect', 'Algorithm Engineer', 'Capacity Planner', 'Research Scientist (parallel algorithms)']
  },
  {
    id: 5,
    title: 'TOP500, Green500, and Cluster Basics',
    description: 'Evaluate system performance alongside energy efficiency and understand the architecture of real-world HPC clusters.',
    prerequisites: ['Topics 1-4: all foundational HPC concepts', 'Understanding of speedup, efficiency, and scaling laws', 'Basic knowledge of networking (TCP/IP, Ethernet)', 'Familiarity with Linux command line'],
    dependencies: ['OpenMP and MPI (Unit 2) run on these cluster architectures', 'GPU computing (Unit 3) extends cluster nodes with accelerators', 'Quantum computing (Unit 4) will eventually hybridize with classical clusters'],
    preparationPlan: 'Visit top500.org and green500.org, browse the current rankings, and note the hardware specs of the top 10 systems. Familiarize yourself with terms like LINPACK, HPL, and HPCG benchmarks.',
    story: 'You are the head chef at a global cooking competition. The judges will rank every restaurant in the world based on two scores. Score one is \\\"How many meals can you prepare in one hour?\\\" Score two is \\\"How many meals per unit of electricity?\\\" A massive industrial kitchen with fifty ovens, twenty dishwashers, and a staff of two hundred can crank out ten thousand meals an hour. Impressive? Absolutely. But the electricity bill is the GDP of a small country, and the judges deduct points for energy waste. A tiny kitchen with five ovens and ten cooks produces only five hundred meals an hour, but runs on a single solar panel. On the energy-efficiency ranking, the tiny kitchen wins. Now the competition introduces a twist: the judges don\\\'t just measure how many meals you cook when everything goes perfectly. They measure how quickly you can solve a specific recipe that requires coordinating all fifty ovens simultaneously, with ingredients arriving from five different suppliers on strict schedules. This is the HPCG benchmark: it tests real-world coordination, not just raw throughput. The industrial kitchen discovers that while it can cook ten thousand simple meals per hour, the coordinated recipe requires all the ovens to synchronize their temperatures, the dishwashers to share water at precise intervals, and the suppliers to deliver in exact sequence. The kitchen\\\'s real throughput for the complex recipe drops to three thousand meals per hour — still impressive, but revealing that raw power is not the same as coordinated performance. The judges also notice that the industrial kitchen produces ten times the food waste of smaller kitchens. They add a \\\"waste per meal\\\" metric. This is the concept behind the Green500: energy per useful computation, not just computation per second. The global competition has another level: teams must submit their kitchen design — floor plan, equipment list, cooling system, power distribution — for other teams to study. This is the HPC challenge: not just how fast you cook, but how intelligently you designed the kitchen.',
    cartoonPanels: [
      {
        scene: 1,
        title: "50 Industrial Ovens (TOP500)",
        avatar: "🏆",
        tag: "TOP500 Rmax",
        caption: "50 commercial ovens cranking out 10,000 meals/hour! Enormous cooking speed, but the electric meter is smoking.",
        concept: "TOP500 List & LINPACK (Rmax): Measures raw floating-point throughput solving dense Ax=b.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(30, 40)"><g font-size="22"><text x="0" y="20">🎛️</text><text x="65" y="20">🎛️</text><text x="130" y="20">🎛️</text><text x="195" y="20">🎛️</text><text x="0" y="45">🎛️</text><text x="65" y="45">🎛️</text><text x="130" y="45">🎛️</text><text x="195" y="45">🎛️</text><text x="0" y="70">🎛️</text><text x="65" y="70">🎛️</text><text x="130" y="70">🎛️</text><text x="195" y="70">🎛️</text><text x="0" y="95">🎛️</text><text x="65" y="95">🎛️</text><text x="130" y="95">🎛️</text><text x="195" y="95">🎛️</text></g></g><text x="160" y="155" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">TOP500: Raw LINPACK Performance (Rmax)</text></svg>`
      },
      {
        scene: 2,
        title: "Solar Bistro (Green500)",
        avatar: "🌿",
        tag: "Green500 GFLOPS/W",
        caption: "Only 500 meals/hour, but runs on 1 solar panel! Wins 1st place in energy efficiency.",
        concept: "Green500 List: Measures computational efficiency in GFLOPS per Watt of electrical power.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="60" y="50" width="80" height="60" rx="8" fill="#1e293b" stroke="#22c55e"/><text x="100" y="88" font-size="26" text-anchor="middle">☀️</text><text x="210" y="88" font-size="26" text-anchor="middle">🌱</text><path d="M 140 80 L 180 80" stroke="#22c55e" stroke-width="3"/><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">Green500: Energy Efficiency (GFLOPS/Watt)</text></svg>`
      },
      {
        scene: 3,
        title: "Coordinated Recipe Test (HPCG)",
        avatar: "🍲",
        tag: "HPCG Benchmark",
        caption: "Simple meals were easy, but the complex multi-course recipe causes oven synchronization traffic jams!",
        concept: "HPCG Benchmark: Tests real-world sparse matrix memory bandwidth & interconnect latency.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(60, 40)"><rect x="0" y="0" width="200" height="70" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="100" y="42" font-size="24" text-anchor="middle">🍲🔄🍲</text></g><text x="160" y="155" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">HPCG: Sparse Memory Bandwidth & Latency</text></svg>`
      },
      {
        scene: 4,
        title: "Liquid Cooling Pipes (Low PUE)",
        avatar: "❄️",
        tag: "Cooling PUE",
        caption: "Cold water pipes wrapped directly around ovens eliminate noisy room fans, dropping PUE overhead to 1.05!",
        concept: "Direct-to-Chip Liquid Cooling: Lowers Power Usage Effectiveness (PUE) towards ideal 1.0.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="100" y="50" width="120" height="60" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="3"/><path d="M 60 80 L 260 80" stroke="#06b6d4" stroke-width="6" stroke-linecap="round"/><text x="160" y="85" font-size="22" text-anchor="middle">❄️ PUE = 1.05</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#06b6d4" font-weight="bold">Direct Liquid Cooling Minimizes Overhead</text></svg>`
      }
    ],
    storyQuestions: [
      'Why does a kitchen that excels at simple meals struggle with a complex coordinated recipe?',
      'What is the difference between raw cooking speed and energy-efficient cooking speed?',
      'If you could only see the number of meals per hour, what important information would you miss?',
      'How would you design a kitchen that scores well on both speed and efficiency?'
    ],
    storyBridge: 'HPC clusters are the industrial kitchens of computing. TOP500 ranks them by raw throughput (LINPACK benchmark). Green500 ranks them by energy efficiency (GFLOPS/watt). HPCG tests real-world coordination. Understanding these rankings helps engineers choose, design, and operate clusters that balance performance, cost, and energy.',
    terminology: ['TOP500', 'Green500', 'LINPACK', 'HPL', 'HPCG', 'GFLOPS', 'TFLOPS', 'PFLOPS', 'EFLOPS', 'Rack', 'Node', 'Interconnect', 'InfiniBand', 'Cooling', 'PUE'],
    mathNeed: 'Rankings are based on benchmark scores normalized by energy, cost, and problem characteristics. We need mathematical models to compare systems fairly.',
    mathMotivation: 'The TOP500 score (Rmax) and energy efficiency (GFLOPS/watt) are the two key metrics. Understanding their formulas helps interpret rankings.',
    realWorldChallenges: ['TOP500 rankings drive billion-dollar procurement decisions', 'Energy costs can exceed hardware costs over a system\\\'s lifetime', 'Different benchmarks measure different aspects of performance'],
    technicalChallenges: ['LINPACK tests dense linear algebra, which is not representative of all HPC workloads', 'Cooling systems consume 30-50% of total energy in large data centers', 'Interconnect topology determines actual application performance'],
    equations: [
      {
        name: 'LINPACK Efficiency',
        latex: '\\eta_{HPL} = \\frac{R_{max}}{R_{theoretical}}',
        symbols: 'eta_HPL is LINPACK efficiency, R_max is achieved performance, R_theoretical is peak theoretical FLOP/s.',
        meaning: 'The fraction of peak theoretical performance achieved by the LINPACK benchmark.',
        whyNeeded: 'It tells us how well the system converts theoretical peak into measured performance.',
        interpretation: 'A value of 0.85 means the system achieves 85% of its theoretical peak on dense linear algebra.'
      },
      {
        name: 'Energy Efficiency',
        latex: 'E = \\frac{R_{max}}{P_{total}}',
        symbols: 'E is energy efficiency (GFLOPS/watt), R_max is achieved performance, P_total is total system power.',
        meaning: 'How many useful computations are performed per watt of electrical power consumed.',
        whyNeeded: 'Energy efficiency is often more important than raw performance for large-scale systems.',
        interpretation: 'A system achieving 100 PFLOPS using 20 MW has E = 5 GFLOPS/watt. A system achieving 50 PFLOPS using 5 MW has E = 10 GFLOPS/watt — twice as efficient.'
      },
      {
        name: 'Power Usage Effectiveness',
        latex: 'PUE = \\frac{P_{total}}{P_{IT}}',
        symbols: 'PUE is Power Usage Effectiveness, P_total is facility power, P_IT is IT equipment power.',
        meaning: 'The ratio of total facility power to the power consumed by computing equipment. A PUE of 1.0 means all power goes to computing.',
        whyNeeded: 'PUE measures cooling and overhead efficiency. Lower is better.',
        interpretation: 'PUE of 1.1 means 10% overhead for cooling and infrastructure. PUE of 2.0 means half the power is wasted on cooling.'
      }
    ],
    numericalExample: 'The #1 TOP500 system (Frontier) achieves R_max = 1,206 PFLOPS using 21 MW. Energy efficiency = 1,206,000 TFLOPS / 21,000,000 W = 57.4 GFLOPS/watt. PUE ≈ 1.03 (liquid-cooled). Compare to a data center with PUE = 1.5: the same IT equipment would need 31.5 MW total — 50% more energy for the same compute.',
    metrics: ['Rmax (achieved LINPACK performance in PFLOPS)', 'Rpeak (theoretical peak in PFLOPS)', 'HPL efficiency (Rmax/Rpeak)', 'GFLOPS/watt (energy efficiency)', 'TFLOPS/dollar (cost efficiency)', 'PUE (power usage effectiveness)'],
    optimizationPossibilities: 'Improve LINPACK efficiency through better interconnect and matrix decomposition, reduce energy per FLOP through liquid cooling and low-power processors, and optimize PUE through free cooling and heat reuse.',
    futureEnhancements: 'Exascale systems (1+ EFLOPS), ARM-based HPC clusters, immersion cooling, heat reuse for district heating, and heterogeneous CPU+GPU+FPGA nodes.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Walk through the TOP500 website and interpret a system entry.', instructions: 'Project top500.org. Pick the #1 system. Read its specs: name, country, processor, cores, Rmax, Rpeak, power, efficiency. Explain each field.', inputs: 'Projector, internet access', expectedOutputs: 'Students can read and interpret a TOP500 entry.', rubric: 'Correct interpretation 50%, student engagement 50%.', learningOutcomes: 'Familiarity with real HPC system specifications.', time: '10 minutes', materials: 'Projector, internet' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Compare two systems on TOP500 for different optimization goals.', instructions: 'Pick #1 on TOP500 (fastest) and #1 on Green500 (most efficient). Compare their specs. Which would you choose for a climate simulation? For a university lab?', inputs: 'TOP500 and Green500 websites', expectedOutputs: 'Comparison table with specs and a justified recommendation for each scenario.', rubric: 'Correct data extraction 30%, quality of comparison 35%, justification 35%.', learningOutcomes: 'Understand that \\\"best\\\" depends on the optimization objective.', time: '15 minutes', materials: 'Internet access' },
      { level: 3, levelName: 'All Students Do', objective: 'Design a cluster for a specific budget and workload.', instructions: 'Groups of 4 receive a budget of $1M. They must choose processors, GPUs, interconnect, and storage to maximize TFLOPS/watt within budget. Present their design.', inputs: 'Budget sheet with hardware prices', expectedOutputs: 'Cluster design with specs, cost breakdown, estimated Rmax, and efficiency.', rubric: 'Feasibility of design 30%, cost accuracy 30%, efficiency estimation 40%.', learningOutcomes: 'Experience real-world trade-offs in cluster design.', time: '25 minutes', materials: 'Price list handout, calculator' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Analyze a TOP500 entry and predict its HPCG score.', instructions: 'Given a system\\\'s Rmax, Rpeak, interconnect type, and core count, predict whether its HPCG score will be above or below average and explain why.', inputs: 'System specification handout', expectedOutputs: 'Written analysis with prediction and justification.', rubric: 'Correct prediction 30%, quality of reasoning 50%, clarity 20%.', learningOutcomes: 'Understand that different benchmarks measure different capabilities.', time: '20 minutes', materials: 'Handout, reference data' }
    ],
    projectScope: 'Build a cluster comparison tool that fetches TOP500 data (or uses provided CSV) and generates interactive charts comparing performance, efficiency, and cost across systems.',
    projectFeasibility: 'Python with pandas and matplotlib. No special hardware. Data available from top500.org (CSV download).',
    projectObjectives: ['Load and parse TOP500 dataset', 'Create scatter plots of Rmax vs power, Rmax vs efficiency', 'Identify trends across processor types and interconnects', 'Compute cost-efficiency metrics', 'Generate a recommendation report for a specific use case'],
    projectOutcomes: ['Python analysis script', 'Interactive comparison charts', 'Trend analysis report', 'Recommendation for a specific workload'],
    projectMethodology: 'Question: What trends exist in TOP500 systems? Hypothesis: GPU-accelerated systems dominate efficiency. Experiment: Analyze the dataset. Compare: Visualize trends. Reflect: Extract actionable insights.',
    projectRoles: ['Data Lead: loads and cleans the dataset', 'Visualization Lead: creates charts', 'Analyst: interprets trends', 'Writer: documents findings'],
    projectTimeline: [
      { milestone: 'Data', duration: 'Day 1', deliverable: 'Dataset loaded and cleaned' },
      { milestone: 'Charts', duration: 'Days 2-3', deliverable: 'Four comparison charts' },
      { milestone: 'Trends', duration: 'Days 4-5', deliverable: 'Trend analysis with statistical support' },
      { milestone: 'Report', duration: 'Days 6-7', deliverable: 'Recommendation report' }
    ],
    projectRisks: [
      { risk: 'TOP500 data format changes between lists', severity: 'Low', mitigation: 'Use the most recent available list and document the vintage' },
      { risk: 'Missing data entries for some systems', severity: 'Medium', mitigation: 'Handle missing values gracefully, report completeness' },
      { risk: 'Cost data is not publicly available', severity: 'High', mitigation: 'Use industry price estimates and state assumptions clearly' }
    ],
    projectBudget: 'Student time: ~12 hours. Data cost: $0 (public). Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Analytical comparison of real HPC systems using public benchmark data.',
    questions: [
      { type: 'conceptual', question: 'What does the TOP500 list measure, and what does it NOT measure?', answer: 'TOP500 measures performance on the HPL (High Performance Linpack) benchmark, which solves a dense system of linear equations. It does NOT measure performance on sparse solvers, graph algorithms, AI workloads, or real application codes.', explanation: 'HPL is a proxy for raw floating-point throughput. Real applications rarely behave like HPL. HPCG was introduced to provide a second data point.', commonMistakes: 'Treating TOP500 rank as a universal measure of system capability.', tip: 'TOP500 tells you how fast a system cooks rice — not how well it handles a seven-course meal.' },
      { type: 'numerical', question: 'A system achieves 50 PFLOPS peak and 42 PFLOPS on LINPACK. What is its HPL efficiency?', answer: 'η = 42/50 = 0.84 = 84%', explanation: 'HPL efficiency is the ratio of achieved to peak performance. 84% is typical for a well-tuned system.', commonMistakes: 'Computing 50/42 instead of 42/50.', tip: 'Achieved goes on top, peak goes on bottom.' },
      { type: 'application', question: 'A university wants to buy a cluster for mixed workloads (CFD, ML, data analytics). Should they optimize for TOP500 rank or Green500 rank?', answer: 'Green500 rank (energy efficiency), because operating costs dominate the total cost of ownership over the system\\\'s lifetime. A TOP500-optimized system may waste energy on unused peak capacity.', explanation: 'For most institutions, electricity costs exceed hardware costs within 3-5 years. Energy efficiency directly reduces operational budget.', commonMistakes: 'Choosing the highest TOP500 rank because it sounds impressive.', tip: 'Buy for the workload, not for the trophy.' },
      { type: 'problemSolving', question: 'A data center has PUE = 1.8 and a new cooling design promises PUE = 1.1. If the IT load is 5 MW, what is the annual energy saving at $0.10/kWh?', answer: 'Old total: 5 * 1.8 = 9 MW. New total: 5 * 1.1 = 5.5 MW. Saving: 3.5 MW. Annual saving: 3.5 * 8760 * 0.10 = $3,066,000.', explanation: 'PUE directly multiplies the power required. Reducing from 1.8 to 1.1 saves 3.5 MW continuously, which is a massive financial and environmental benefit.', commonMistakes: 'Forgetting to convert MW to annual energy using 8760 hours/year.', tip: 'PUE improvement is one of the highest-ROI investments in HPC.' }
    ],
    labType: 'top500-cluster',
    keyInsights: ['TOP500 and Green500 measure different things — raw performance vs energy efficiency', 'HPCG provides a more realistic performance picture than LINPACK alone', 'PUE directly impacts operating costs and should be minimized', 'Real cluster design requires balancing performance, energy, cost, and workload fit'],
    advantages: ['Provides transparent, comparable benchmarks for all HPC systems', 'Drives innovation in energy-efficient computing', 'Helps institutions make informed procurement decisions', 'Tracks the evolution of computing capability over decades'],
    disadvantages: ['HPL benchmark is not representative of most real workloads', 'Rankings encourage over-optimization for the benchmark', 'Cost data is often hidden or misleading', 'Rankings do not account for software ecosystem and usability'],
    improvements: ['Include diverse benchmarks (HPCG, MLPerf, Graph500) in rankings', 'Report total cost of ownership alongside performance', 'Add software sustainability and portability metrics', 'Include energy source (renewable vs fossil) in efficiency metrics'],
    futureScope: 'Exascale computing (1 EFLOPS+), quantum-classical hybrid clusters, and carbon-neutral data centers are the next frontiers.',
    industrialApplications: ['National labs (ORNL, LLNL, Argonne) use TOP500 systems for scientific discovery', 'Cloud providers (AWS, Azure, GCP) offer HPC instances based on cluster designs', 'Automotive and aerospace companies use clusters for crash simulation', 'Pharmaceutical companies use clusters for drug discovery'],
    researchOpportunities: ['Exascale algorithm design', 'Energy-aware scheduling and DVFS', 'Liquid and immersion cooling systems', 'Heterogeneous cluster management (Slurm, Kubernetes)'],
    careerRelevance: ['HPC Systems Engineer', 'Data Center Operations Manager', 'Cluster Administrator', 'HPC Benchmark Analyst', 'Energy Efficiency Consultant']
  }
];
