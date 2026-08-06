export const unit3Topics = [
  {
    id: 1,
    title: 'GPU Architecture and CUDA Basics',
    description: 'Understand how thousands of simple cores collaborate through warps and threads to achieve massive throughput on data-parallel workloads.',
    prerequisites: ['Unit 1: Flynn\'s Taxonomy and parallel architectures', 'Unit 1: Memory hierarchy and cache concepts', 'Unit 2: Basic threading and synchronization (OpenMP/MPI)', 'C or Python programming proficiency'],
    dependencies: ['Memory Coalescing (Topic 2) builds on understanding of GPU memory levels', 'Profiling (Topic 3) uses GPU metrics introduced here', 'Cloud HPC (Topic 4) deploys GPU workloads on cloud accelerators', 'AI workloads depend heavily on GPU tensor cores introduced in this topic'],
    preparationPlan: 'Review the SIMT execution model concept, read an introductory CUDA programming guide, and refresh knowledge of C pointer arithmetic and array indexing before class.',
    story: 'Imagine it is Monday morning at Sunnybrook Elementary again, but this time the principal has hired one thousand kindergarteners to flip pancakes. There is a critical catch: every kindergartener is five years old and can only flip exactly one pancake at a time using their left hand. No exceptions. They cannot choose a different spatula. They cannot flip two pancakes. They cannot flip with their right hand. If any child reaches into the wrong ingredient jar, the entire group of twenty-five children standing at that table must stop, wait for the slowest child to finish, and then restart together. This is the GPU execution model in a nutshell. The kindergarteners are CUDA cores. The twenty-five-child groups are warps. Every child in a warp must do the exact same flip at the exact same time. If one child needs blueberries while the others need chocolate chips, all twenty-five wait until the blueberry child finishes. The principal quickly discovers a few interesting things. First, even though each child is individually slow (a GPU core has a much lower clock speed than a CPU), the sheer number of children means pancakes appear at a staggering rate — if they are all doing the same thing. Second, the principal needs a massive countertop (global memory) because no individual child has enough counter space (registers) to hold more than one pancake. Walking across the room to the countertop takes much longer than flipping (memory latency), so the principal buys a series of smaller shelves (shared memory and L1 cache) near each group of twenty-five children. The shelves hold ingredients the group needs together. Third, the principal notices that when all twenty-five children are flipping identical chocolate chip pancakes, they are blazingly fast. But when ten children need blueberry, eight need strawberry, and seven need plain, the group efficiency collapses because children are idle while waiting for the instructions to diverge and reconverge. The parent engineer from last year walks in, looks at the chaos, and says: "You have just built a GPU. The children are CUDA cores. The tables are Streaming Multiprocessors. The countertop is global memory. The shelves are shared memory. And that rule about everyone flipping the same way? That is SIMT — Single Instruction, Multiple Threads." The principal sighs: "How do I program this?" The engineer pulls out a whiteboard and writes: "First, arrange your pancakes so every child can reach the countertop in the same step. Second, keep each group working on the same recipe. Third, make sure the shelves are stocked before the children need the ingredients." The principal realizes the kitchen has incredible raw throughput, but only if the recipe is written for a thousand identical hands.',
    cartoonPanels: [
      {
        scene: 1,
        title: "F1 CPU vs. 1000 Bicycles",
        avatar: "🏎️",
        tag: "SIMT Execution",
        caption: "Formula 1 sports car (CPU) carries 1 VIP fast; 1000 delivery bicycles (GPU) carry 1000 packages at once!",
        concept: "SIMT Architecture: Thousands of lightweight CUDA cores executing parallel thread instructions.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(30, 40)"><rect x="0" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#ef4444"/><text x="50" y="38" font-size="22" text-anchor="middle">🏎️ CPU</text><text x="50" y="60" font-size="10" fill="#ef4444" text-anchor="middle">1 Fast Core</text></g><g transform="translate(190, 40)"><rect x="0" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#22c55e"/><text x="50" y="38" font-size="22" text-anchor="middle">🚲 GPU</text><text x="50" y="60" font-size="10" fill="#22c55e" text-anchor="middle">1000 Cores</text></g><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">SIMT: Massive Data-Parallel Throughput</text></svg>`
      },
      {
        scene: 2,
        title: "PCIe Bus Bridge Bottleneck",
        avatar: "🌉",
        tag: "PCIe Latency",
        caption: "Data packets queuing across the PCIe bridge between Host CPU RAM and Device VRAM.",
        concept: "Host-to-Device Transfer Penalty: PCIe bandwidth (16-64 GB/s) limits small GPU kernel launches.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(20, 50)"><rect x="0" y="0" width="70" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/><text x="35" y="32" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">CPU RAM</text></g><g transform="translate(230, 50)"><rect x="0" y="0" width="70" height="50" rx="6" fill="#1e293b" stroke="#22c55e"/><text x="35" y="32" fill="#22c55e" font-size="12" font-weight="bold" text-anchor="middle">GPU VRAM</text></g><path d="M 90 75 L 230 75" stroke="#f59e0b" stroke-width="4" stroke-dasharray="6,4"/><text x="160" y="65" font-size="14">🌉 PCIe Bus</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">cudaMemcpy Host-to-Device Latency</text></svg>`
      },
      {
        scene: 3,
        title: "Grid, Block & Thread Matrix",
        avatar: "📐",
        tag: "CUDA Hierarchy",
        caption: "Mapping 2D image pixels to Grid Index, Thread Block ID, and 32-thread Warps.",
        concept: "CUDA Thread Hierarchy: Kernel <<< Grid, Block >>> maps threads to 1D, 2D, or 3D problem spaces.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="70" y="35" width="180" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/><text x="160" y="65" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grid <<< G, B >>></text><text x="160" y="90" font-size="12" fill="#22c55e" text-anchor="middle">Block (tx, ty) -> Thread ID</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">Thread Block Index Mapping</text></svg>`
      },
      {
        scene: 4,
        title: "Warp Divergence Masking",
        avatar: "🔀",
        tag: "Warp Divergence",
        caption: "Half of 32 threads take the IF branch while the other half wait idling; then roles flip for ELSE!",
        concept: "Warp Divergence: Serializes divergent branches within a 32-thread warp, lowering warp efficiency.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="110" y="30" width="100" height="40" rx="6" fill="#1e293b" stroke="#ec4899"/><text x="160" y="55" font-size="14" text-anchor="middle">🔀 IF / ELSE</text><path d="M 130 70 L 70 110 M 190 70 L 250 110" stroke="#ec4899" stroke-width="2"/><text x="70" y="130" font-size="18">🟢 IF</text><text x="250" y="130" font-size="18">⏸️ Wait</text><text x="160" y="160" text-anchor="middle" font-size="11" fill="#ec4899" font-weight="bold">Branch Divergence Serializes Warps</text></svg>`
      }
    ],
    storyQuestions: [
      'Why does every child in a group of twenty-five need to flip the same pancake at the same time?',
      'What happens to the group\'s speed when one child needs a different ingredient than the rest?',
      'Why does the small shelf near the table help more than making the countertop bigger?',
      'What strategy would you use to keep all one thousand children busy if you have three different pancake recipes?'
    ],
    storyBridge: 'GPU architecture mirrors the Sunnybrook kitchen. A GPU contains thousands of small cores (kindergarteners), grouped into warps of 32 threads (tables of twenty-five), organized on Streaming Multiprocessors (the kitchen itself). Global memory is the distant countertop. Shared memory is the nearby shelf. The programming challenge is identical: keep the children doing the same thing, minimize trips to the countertop, and organize the shelves so every child finds what they need without waiting.',
    terminology: ['CUDA Core', 'Streaming Multiprocessor (SM)', 'Warp', 'Warp divergence', 'SIMT', 'Grid', 'Block', 'Thread', 'Global memory', 'Shared memory', 'Registers', 'Constant memory', 'Texture memory', 'Kernel launch', 'Block size', 'Grid size'],
    mathNeed: 'We need quantitative models to predict how efficiently a GPU kernel utilizes its thousands of cores, because raw core count does not translate directly to throughput.',
    mathMotivation: 'GPU performance depends on the number of active warps, memory access patterns, and warp divergence — all of which can be modeled mathematically before writing code.',
    realWorldChallenges: ['Deep learning training requires billions of multiply-accumulate operations that map naturally to GPU cores', 'Real-time ray tracing demands massive parallelism across millions of pixels', 'Scientific simulations (molecular dynamics, climate) must be restructured from sequential to massive data-parallel formats'],
    technicalChallenges: ['CPU-GPU data transfer over PCIe bus creates a bottleneck for small problems', 'Warp divergence reduces effective throughput when threads in a warp follow different branches', 'Programmers must manage three levels of memory: registers, shared memory, and global memory'],
    equations: [
      {
        name: 'GPU Core Throughput',
        latex: 'T_{GPU} = N_{cores} \\times f_{clock} \\times U',
        symbols: 'T_GPU is theoretical GPU throughput (FLOP/s), N_cores is the total number of CUDA cores, f_clock is the clock frequency in GHz, U is the utilization factor (0 to 1).',
        meaning: 'The achievable throughput depends on how many cores are active and how efficiently each core is utilized each clock cycle.',
        whyNeeded: 'Raw core counts are misleading without accounting for utilization losses from divergence, memory stalls, and occupancy limits.',
        interpretation: 'An RTX 4090 has 16,384 cores at 2.52 GHz. Theoretical peak = 16384 * 2.52 * 2 (FMA) = ~82.6 TFLOPS. Actual utilization is typically 60-80%.'
      },
      {
        name: 'Warp Execution Efficiency',
        latex: '\\eta_{warp} = \\frac{N_{active\\_threads}}{N_{warp\\_size}}',
        symbols: 'eta_warp is warp execution efficiency, N_active_threads is the number of threads in the warp doing useful work, N_warp_size is 32 (fixed warp size on NVIDIA GPUs).',
        meaning: 'The fraction of threads in a warp that are actively executing the same instruction at any given cycle.',
        whyNeeded: 'When threads diverge (if-else branches), inactive threads waste execution slots, directly reducing throughput.',
        interpretation: 'A warp with 20 out of 32 threads active has efficiency 20/32 = 62.5%. The other 37.5% of the compute cycle is wasted.'
      },
      {
        name: 'Kernel Execution Time',
        latex: 'T_{kernel} = \\frac{N_{blocks}}{N_{SM}} \\times T_{block}',
        symbols: 'T_kernel is total kernel execution time, N_blocks is the number of thread blocks, N_SM is the number of Streaming Multiprocessors, T_block is the execution time of one block.',
        meaning: 'The total time to execute a kernel is determined by how many blocks must cycle through the available SMs.',
        whyNeeded: 'It shows that both the problem size (N_blocks) and the hardware (N_SM) jointly determine execution time.',
        interpretation: 'A GPU with 80 SMs executing 800 blocks needs 10 rounds. If each block takes 5 microseconds, the kernel takes 50 microseconds.'
      }
    ],
    numericalExample: 'An RTX 4090 has 128 SMs, each with 128 CUDA cores (16,384 total). A kernel launches 512 blocks of 256 threads each. Occupancy: 512 blocks / 128 SMs = 4 blocks per SM. Total threads = 512 × 256 = 131,072. Warps per block = 256/32 = 8. Active warps per SM = 4 × 8 = 32. Maximum warps per SM = 48. Occupancy = 32/48 = 66.7%. If the kernel executes 20 FLOP/s per thread per cycle at 2.52 GHz: Achieved FLOPS = 131,072 threads × 20 × 2.52 × 10^9 = 6.61 TFLOPS. Compared to peak 82.6 TFLOPS, utilization is 8.0%. This low value highlights the need for optimization — more work per thread or better occupancy would close the gap.',
    metrics: ['Occupancy (active warps / maximum warps)', 'Warp execution efficiency', 'Achieved vs peak FLOP/s', 'Kernel execution time', 'Thread block configuration', 'Grid coverage of SMs'],
    optimizationPossibilities: 'Tune block size to maximize occupancy, minimize warp divergence by restructuring branch logic, use shared memory to reduce global memory accesses, and overlap kernel execution with data transfers using CUDA streams.',
    futureEnhancements: 'Tensor cores for mixed-precision matrix operations, thread block clusters (Hopper architecture), asynchronous execution with warp-level synchronization, and dynamic parallelism for nested kernel launches.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Demonstrate SIMT execution using a hands-on pancake analogy.', instructions: 'Assign 32 students to be "threads in a warp." Give them a recipe card: "All 32 of you must crack one egg." Time it. Then give mixed instructions: half crack eggs, half stir batter. Time again. Show the slowdown caused by divergence.', inputs: '32 students, recipe cards, timer', expectedOutputs: 'Students observe that uniform instructions are faster than mixed instructions within a group.', rubric: 'Demonstration clarity 50%, student engagement 30%, correct analogy mapping 20%.', learningOutcomes: 'Understand that warps execute in lockstep and divergence wastes cycles.', time: '10 minutes', materials: 'Recipe cards, timer, whiteboard' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Calculate GPU occupancy for different block configurations.', instructions: 'Given a GPU with 64 SMs, max 48 warps per SM, max 2048 threads per SM. Compute occupancy for block sizes 64, 128, 256, 512 threads. Plot occupancy vs block size. Identify the optimal configuration.', inputs: 'GPU specification handout, calculator', expectedOutputs: 'Occupancy values for four block sizes showing which maximizes warp utilization.', rubric: 'Correct calculations 40%, correct plot 30%, meaningful interpretation 30%.', learningOutcomes: 'Connect block size choice to hardware occupancy limits.', time: '15 minutes', materials: 'Handout, calculator, graph paper' },
      { level: 3, levelName: 'All Students Do', objective: 'Write and run a simple CUDA kernel for vector addition.', instructions: 'In groups of 3, write a CUDA C program that adds two vectors of 1 million elements. Launch with block sizes of 128, 256, and 512. Measure and report execution time and calculate occupancy for each.', inputs: 'CUDA development environment, starter code template', expectedOutputs: 'Working vector addition kernel, timing results for three configurations, occupancy calculation.', rubric: 'Correct kernel code 30%, correct timing 30%, occupancy analysis 20%, discussion of results 20%.', learningOutcomes: 'Experience writing and launching a GPU kernel and connecting configuration to performance.', time: '25 minutes', materials: 'Laptop with CUDA toolkit, starter template' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Analyze GPU architecture specifications and predict kernel performance.', instructions: 'Given the specifications of two GPUs (e.g., RTX 3060 vs RTX 4090), compare their SM counts, cores per SM, memory bandwidth, and clock speed. Predict which GPU achieves higher speedup for a given kernel and explain why.', inputs: 'GPU specification comparison sheet', expectedOutputs: 'Written comparison with occupancy predictions and architectural bottleneck analysis.', rubric: 'Correct specification extraction 25%, accurate prediction 30%, quality of reasoning 30%, clarity 15%.', learningOutcomes: 'Apply architectural understanding to real GPU hardware comparison.', time: '20 minutes', materials: 'Specification handout, calculator' }
    ],
    projectScope: 'Build a CUDA vector operations benchmark that launches kernels with varying block and grid configurations, measures execution time, and computes occupancy for each configuration.',
    projectFeasibility: 'Requires a CUDA-capable GPU (NVIDIA GTX 1060 or newer) and the CUDA toolkit. No cloud cost if local GPU is available. Fallback: use CPUsim or NSight Compute for profiling without a GPU.',
    projectObjectives: ['Implement a vector addition kernel in CUDA C', 'Experiment with block sizes of 64, 128, 256, and 512 threads', 'Measure kernel execution time using CUDA events', 'Calculate occupancy for each configuration using CUDA occupancy API', 'Identify the optimal block size and explain why'],
    projectOutcomes: ['Working CUDA vector addition program', 'Timing results table for four block sizes', 'Occupancy vs block size plot', 'One-page analysis of the optimal configuration'],
    projectMethodology: 'Question: How does block size affect GPU kernel performance? Hypothesis: Occupancy peaks at a specific block size determined by SM register and shared memory limits. Experiment: Launch kernels with varying configurations. Compare: Plot time and occupancy. Reflect: Match results to architecture theory.',
    projectRoles: ['Kernel Lead: writes the CUDA kernel', 'Benchmark Lead: designs measurement protocol and timing', 'Analyst: computes occupancy and creates plots', 'Writer: documents findings and recommendations'],
    projectTimeline: [
      { milestone: 'Setup', duration: 'Day 1', deliverable: 'CUDA environment verified, problem defined' },
      { milestone: 'Kernel', duration: 'Days 2-3', deliverable: 'Working vector addition kernel with timing' },
      { milestone: 'Sweep', duration: 'Days 4-5', deliverable: 'Results for four block sizes collected' },
      { milestone: 'Analysis', duration: 'Day 6', deliverable: 'Occupancy plot and optimal configuration identified' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Final report with architecture recommendations' }
    ],
    projectRisks: [
      { risk: 'No CUDA-capable GPU available on student laptop', severity: 'High', mitigation: 'Use Google Colab with GPU runtime or university lab machines' },
      { risk: 'Driver version incompatibility', severity: 'Medium', mitigation: 'Document tested driver/CUDA version combinations before starting' },
      { risk: 'Small problem size hides GPU benefits due to launch overhead', severity: 'Medium', mitigation: 'Use at least 1 million elements and report both absolute time and throughput' }
    ],
    projectBudget: 'Student time: ~12 hours. GPU compute cost: $0 (Google Colab free tier or local GPU). CUDA toolkit: free. Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Experimental demonstration of GPU kernel performance across block configurations.',
    questions: [
      { type: 'conceptual', question: 'What is a warp in GPU computing and why does it matter?', answer: 'A warp is a group of 32 threads that execute the same instruction simultaneously on NVIDIA GPUs. It matters because all threads in a warp must follow the same execution path — if they diverge (take different branches), the hardware serializes the branches, wasting cycles on inactive threads.', explanation: 'The SIMT execution model means hardware manages threads in warps, not individually. This is why GPU programming requires thinking about groups of threads, not individual threads.', commonMistakes: 'Assuming each CUDA core runs an independent thread. In reality, 32 cores in an SM execute one warp together.', tip: 'Think of a warp as a school of fish — they all turn together or the school splits, which is slow.' },
      { type: 'numerical', question: 'A GPU has 80 SMs, each supporting a maximum of 2048 threads. You launch 400 blocks of 256 threads each. What is the occupancy?', answer: 'Total threads = 400 × 256 = 102,400. Max concurrent threads = 80 × 2048 = 163,840. Occupancy = 102,400 / 163,840 = 62.5%. Alternatively: blocks per SM = 400/80 = 5. Warps per block = 256/32 = 8. Active warps per SM = 5 × 8 = 40. Max warps per SM = 2048/32 = 64. Occupancy = 40/64 = 62.5%.', explanation: 'Occupancy can be calculated from thread count or warp count — both give the same result. 62.5% is reasonable but leaves room for improvement.', commonMistakes: 'Forgetting to divide block count by SM count when computing per-SM occupancy.', tip: 'Always compute occupancy per SM, not globally — each SM operates independently.' },
      { type: 'application', question: 'When should you prefer a GPU over a CPU for a computational task?', answer: 'When the task is data-parallel (same operation on many data points), has high arithmetic intensity (many FLOP/s per byte of data), and does not require complex control flow (few branches). Deep learning training, image processing, and large matrix operations are classic GPU workloads.', explanation: 'GPUs excel at throughput-oriented workloads where thousands of threads do the same thing. CPUs excel at latency-oriented workloads with complex branching and sequential dependencies.', commonMistakes: 'Assuming GPUs are always faster. For serial tasks with complex logic, a CPU is 10-100x faster.', tip: 'GPU = many simple workers doing the same thing. CPU = one skilled worker doing complex work.' },
      { type: 'problemSolving', question: 'You launch a CUDA kernel with 1 million threads in blocks of 64. The kernel runs slowly. What are three possible causes and fixes?', answer: '(1) Low occupancy: blocks of 64 may not fill the SM. Fix: increase block size to 256. (2) Excessive kernel launch overhead: many small blocks mean many launches. Fix: increase work per thread, reduce total blocks. (3) Global memory bottleneck: threads may access memory in scattered patterns. Fix: use shared memory and restructure data access.', explanation: 'Slow GPU kernels usually stem from one of three issues: underutilized hardware (occupancy), overhead dominance (too many small blocks), or memory bottleneck (poor access patterns).', commonMistakes: 'Jumping to code optimization without first profiling to identify the actual bottleneck.', tip: 'Profile first — the GPU profiler will tell you whether the bottleneck is compute, memory, or launch overhead.' }
    ],
    labType: 'cuda-basics',
    keyInsights: ['GPU throughput comes from massive parallelism, not individual core speed', 'Warp-level execution means all 32 threads in a warp must follow the same instruction path', 'Block size directly affects occupancy and should be tuned for each GPU architecture', 'CPU and GPU are complementary — the CPU handles serial work, the GPU handles parallel throughput'],
    advantages: ['Massive throughput for data-parallel workloads (TFLOP/s at consumer prices)', 'Excellent energy efficiency per FLOP compared to CPUs', 'Mature programming ecosystem (CUDA, OpenCL, SYCL)', 'Widely available in cloud platforms and workstations'],
    disadvantages: ['Programming model requires restructuring algorithms into thread blocks', 'CPU-GPU data transfer overhead penalizes small problems', 'Warp divergence can dramatically reduce effective throughput', 'Memory constraints (shared memory, registers) limit kernel complexity'],
    improvements: ['Use warp-level primitives (shuffles, ballot) to reduce shared memory usage', 'Overlap computation and data transfer using CUDA streams', 'Employ mixed precision (FP16/BF16) to double throughput on tensor cores', 'Use persistent kernels to amortize launch overhead'],
    futureScope: 'Grace Hopper superchips (CPU+GPU on one die), chiplet-based GPU designs, unified memory architectures, and photonic interconnects between GPU clusters are the next frontiers.',
    industrialApplications: ['Deep learning training (NVIDIA A100/H100 clusters at OpenAI, Google)', 'Autonomous vehicle perception (NVIDIA DRIVE platform)', 'Drug discovery molecular simulation (AMBER, GROMACS on GPU)', 'Real-time ray tracing in gaming (NVIDIA RTX, Unreal Engine 5)', 'Financial Monte Carlo simulations on GPU clusters'],
    researchOpportunities: ['Automatic GPU kernel generation from high-level descriptions', 'Memory-efficient attention mechanisms for large language models', 'GPU architecture for graph and sparse workloads', 'Heterogeneous CPU+GPU+FPGA scheduling'],
    careerRelevance: ['GPU Software Engineer', 'CUDA Developer', 'Machine Learning Infrastructure Engineer', 'HPC Application Developer', 'Graphics Rendering Engineer']
  },
  {
    id: 2,
    title: 'Memory Coalescing and Occupancy',
    description: 'Master GPU memory access patterns and thread scheduling to extract maximum throughput from the memory hierarchy.',
    prerequisites: ['Topic 1: GPU architecture, warps, and CUDA basics', 'Unit 1: Memory hierarchy and cache concepts', 'Basic understanding of C pointers and array indexing', 'Familiarity with GPU memory types (global, shared, registers)'],
    dependencies: ['Profiling (Topic 3) uses coalescing and occupancy metrics introduced here', 'Cloud HPC (Topic 4) deploys optimized kernels on cloud GPUs', 'All GPU optimization depends on understanding memory access patterns', 'Deep learning frameworks optimize these patterns automatically but understanding helps customization'],
    preparationPlan: 'Review how cache lines work from Unit 1, read about GPU memory coalescing rules, and understand the difference between row-major and column-major array layouts in C.',
    story: 'You are a very organized grocery shopper with a very specific rule: when you enter aisle one, you must pick up items in multiples of thirty-two, and those thirty-two items must be on consecutive shelves. If items one through thirty-two are all on the same shelf, you grab them all in one swipe — fast and clean. But if item one is at the far left of the shelf, item two is at the far right, and item three is on a completely different shelf in the next aisle, you have to walk back and forth thirty-two times for what should have been one grab. This is memory coalescing. The GPU equivalent: when 32 threads in a warp each request one element from global memory, the hardware can combine those 32 requests into a single memory transaction if the elements are consecutive in memory. If the elements are scattered, the hardware issues multiple transactions, wasting bandwidth. Now imagine your grocery store has a loyalty program: the more items you grab in one transaction, the bigger the discount. If you grab 32 consecutive items, you pay for one bag. If you grab 32 random items, you pay for 32 bags. The store manager (GPU memory controller) loves you when you shop in order. Now suppose the store has two floors. The first floor (shared memory) is small but you can grab anything on it in one step. The second floor (global memory) is massive but you have to take the elevator, which takes 400 steps worth of time. A smart shopper buys a basket on the first floor, fills it with everything they need for the current recipe (block), and only takes the elevator once per basket load. This is the shared memory tiling pattern: load a tile of data from global memory into shared memory, cooperate with your shopping group to use it, then load the next tile. But there is a trap: two shoppers (threads) reaching for the same item at the same time on the first floor can cause a conflict. If shopper A and shopper B both grab the same bottle of olive oil at the same time, they collide. This is a bank conflict — shared memory is divided into banks, and if two threads in the same warp access different addresses that map to the same bank, the accesses are serialized. The store manager (shared memory controller) says: "You cannot both have the same shelf at the same time. Shopper B, wait one turn." The remedy: each shopper should aim for different banks. The store layout has 32 shelves (banks). If shoppers are spaced 32 apart, no two shoppers ever collide. The principal walks in and says: "This is way too complicated. Can\'t I just buy everything online?" The engineer says: "That is what optimized CUDA libraries like cuBLAS do. But if your recipe is custom, you need to understand the store layout yourself."',
    cartoonPanels: [
      {
        scene: 1,
        title: "Coalesced Express Lane Sweep",
        avatar: "🛒",
        tag: "Coalesced Access",
        caption: "32 threads reading 32 consecutive array items in 1 single 128-byte DRAM transaction!",
        concept: "Coalesced Memory Access: 32 threads accessing contiguous addresses merged into 1 memory request.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="40" y="50" width="240" height="40" rx="6" fill="#1e293b" stroke="#22c55e" stroke-width="2"/><text x="160" y="75" fill="#22c55e" font-size="12" font-weight="bold" text-anchor="middle">[0] [1] [2] ... [31] Consecutive</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">1 Single 128-Byte DRAM Transaction</text></svg>`
      },
      {
        scene: 2,
        title: "Uncoalesced Scavenger Hunt",
        avatar: "💥",
        tag: "Uncoalesced Stride",
        caption: "32 threads grabbing items from 32 random memory locations, forcing 32 separate transactions!",
        concept: "Uncoalesced Memory Access: Strided access forces up to 32 separate memory transactions per warp.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g fill="#ef4444" font-size="18"><text x="30" y="70">📦</text><text x="100" y="70">📦</text><text x="170" y="70">📦</text><text x="240" y="70">📦</text></g><path d="M 40 85 L 40 120 M 110 85 L 110 120 M 180 85 L 180 120 M 250 85 L 250 120" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/><text x="160" y="155" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">32 Separate Transactions (32x Penalty)</text></svg>`
      },
      {
        scene: 3,
        title: "Shared Memory Fast Basket",
        avatar: "📦",
        tag: "__shared__ Tiling",
        caption: "Thread block loading global array tiles into fast shared memory for 10x compute reuse!",
        concept: "Shared Memory Tiling: Load tile into __shared__ memory to bypass global DRAM latency.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="80" y="45" width="160" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/><text x="160" y="80" font-size="18" text-anchor="middle">📦 __shared__ Tile</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">1.5 TB/s On-Chip Shared Memory Tiling</text></svg>`
      },
      {
        scene: 4,
        title: "32-Bank Collision Lock",
        avatar: "🏛️",
        tag: "Bank Conflict",
        caption: "2 threads accessing addresses mapping to the same shared memory bank collide, serializing access!",
        concept: "Shared Memory Bank Conflict: Accesses to same bank serialize. Fix by padding arrays by +1.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="110" y="45" width="100" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="160" y="80" font-size="20" text-anchor="middle">🏛️ Bank 0</text><path d="M 60 75 L 110 75 M 260 75 L 210 75" stroke="#ef4444" stroke-width="3"/><text x="160" y="155" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">Serialized Bank Conflict (Pad by +1)</text></svg>`
      }
    ],
    storyQuestions: [
      'Why does the store give you a discount for grabbing 32 consecutive items but charge you more for 32 random items?',
      'What happens to your shopping speed when two shoppers try to grab from the same shelf simultaneously?',
      'How does buying a basket on the first floor reduce your elevator trips?',
      'If you know your recipe requires flour, sugar, and eggs (all on different aisles), how would you reorganize your shopping trip?'
    ],
    storyBridge: 'Memory coalescing is the grocery store discount for buying in order. Occupancy is how many shoppers can be in the store simultaneously without blocking each other. Bank conflicts are two shoppers reaching for the same shelf. Shared memory tiling is the shopping basket strategy. Together, these concepts determine whether your GPU kernel uses its bandwidth efficiently or wastes cycles walking back and forth.',
    terminology: ['Memory coalescing', 'Coalesced access', 'Uncoalesced access', 'Global memory bandwidth', 'Shared memory banks', 'Bank conflict', 'Occupancy', 'Register pressure', 'Shared memory size', 'L2 cache', 'DRAM bandwidth', 'Transaction size', 'Cache line', 'Streaming multiprocessor (SM)', 'Thread block'],
    mathNeed: 'Memory bandwidth is the primary bottleneck in most GPU kernels. We need formulas to predict the minimum number of memory transactions for a given data access pattern.',
    mathMotivation: 'Coalesced access reduces memory transactions by up to 32x compared to uncoalesced access. Quantifying this difference guides data layout decisions.',
    realWorldChallenges: ['Matrix operations naturally have one coalesced dimension and one uncoalesced dimension', 'Struct-of-Arrays vs Array-of-Structures layout dramatically affects coalescing', 'Shared memory bank conflicts silently reduce throughput by up to 32x'],
    technicalChallenges: ['Coalescing requires threads in a warp to access consecutive addresses, which conflicts with some algorithmic patterns', 'Register pressure from large kernels limits occupancy, but spilling registers to local memory kills performance', 'Shared memory is limited (48-164 KB per SM), requiring careful tiling strategies'],
    equations: [
      {
        name: 'Memory Transaction Count',
        latex: 'T_{access} = \\frac{N_{requests}}{B_{width}}',
        symbols: 'T_access is the number of memory transactions, N_requests is the number of byte requests from a warp, B_width is the transaction width (typically 32 or 128 bytes).',
        meaning: 'The hardware groups scattered memory requests into the minimum number of transactions, but scattered requests require more transactions.',
        whyNeeded: 'It quantifies the bandwidth waste from uncoalesced access patterns.',
        interpretation: 'If 32 threads each request 4 bytes from consecutive addresses (128 bytes total), one 128-byte transaction suffices. If they request from 32 different cache lines, 32 transactions are needed — a 32x waste.'
      },
      {
        name: 'Effective Bandwidth',
        latex: 'BW_{eff} = \\frac{N_{bytes\\_accessed}}{T_{kernel}}',
        symbols: 'BW_eff is effective bandwidth achieved by the kernel, N_bytes_accessed is total bytes read/written, T_kernel is kernel execution time.',
        meaning: 'The actual data rate achieved by the kernel, compared to the hardware peak bandwidth.',
        whyNeeded: 'It directly measures whether the memory system is being used efficiently.',
        interpretation: 'An RTX 4090 has 1008 GB/s peak bandwidth. If a kernel achieves 600 GB/s, utilization is 59.5%, suggesting room for coalescing optimization.'
      },
      {
        name: 'Occupancy Formula',
        latex: '\\eta = \\frac{N_{active\\_warps}}{N_{max\\_warps}}',
        symbols: 'eta is occupancy, N_active_warps is the number of warps concurrently resident on an SM, N_max_warps is the hardware maximum warps per SM.',
        meaning: 'The fraction of maximum concurrent warps that are actually resident and eligible to execute.',
        whyNeeded: 'Higher occupancy hides memory latency by having more warps available when one stalls.',
        interpretation: 'An SM with max 48 warps and 32 active warps has occupancy 66.7%. The remaining 33.3% means the SM has room for more warps that could hide latency.'
      },
      {
        name: 'Bank Conflict Penalty',
        latex: 'T_{bank} = N_{conflicts} \\times T_{bank\\_access}',
        symbols: 'T_bank is total shared memory access time, N_conflicts is the number of serialized bank accesses, T_bank_access is the time per bank access (1 cycle for no conflict).',
        meaning: 'When multiple threads in a warp access different addresses that map to the same bank, the accesses are serialized, multiplying the access time.',
        whyNeeded: 'Bank conflicts can reduce shared memory throughput by up to 32x, making them as devastating as uncoalesced global memory.',
        interpretation: 'If 4 threads hit the same bank, the access takes 4 cycles instead of 1 — a 4x penalty on that shared memory operation.'
      }
    ],
    numericalExample: 'A matrix of 4096×4096 single-precision floats (64 MB) is accessed row by row. Each row has 4096 elements × 4 bytes = 16,384 bytes. A 128-byte cache line holds 32 floats. Sequential access: 4096/32 = 128 cache lines per row. Each warp (32 threads) accesses 32 consecutive floats = 128 bytes = one cache line = one transaction. Perfectly coalesced. Column access: threads in a warp access elements 4096 apart in memory. Each element is in a different cache line. 32 threads → 32 transactions. 32x worse. Effective bandwidth for row access: 16,384 bytes / T_row. For column access: 16,384 bytes × 32 / T_col. If T_row ≈ T_col (same number of memory operations but 32x more transactions), column access throughput is 32x lower.',
    metrics: ['Memory coalescing efficiency', 'Effective bandwidth vs peak bandwidth', 'Occupancy percentage', 'Shared memory bank conflicts', 'Register usage per thread', 'L2 cache hit rate'],
    optimizationPossibilities: 'Restructure data layouts for coalesced access (Structure of Arrays instead of Array of Structures), pad shared memory arrays to avoid bank conflicts, tune block size to balance occupancy and register pressure, and use shared memory tiling to reuse data from global memory.',
    futureEnhancements: 'Asynchronous memory copy (cp.async in Hopper), distributed shared memory across SMs, tensor memory accelerator (TMA) for bulk data movement, and hardware-accelerated memory compression.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Demonstrate coalesced vs uncoalesced access using a classroom analogy.', instructions: 'Line up 32 students (a warp). Give each a number. For coalesced access: student i picks up item i from a shelf (consecutive). Time it. For uncoalesced access: student i picks up item (i × 100) mod 3200 (scattered). Time it. Show the dramatic slowdown.', inputs: '32 students, shelf with labeled items, timer', expectedOutputs: 'Scattered access is visibly slower, demonstrating the coalescing principle.', rubric: 'Demonstration clarity 50%, analogy accuracy 30%, student engagement 20%.', learningOutcomes: 'See that consecutive thread access patterns are faster.', time: '10 minutes', materials: 'Labeled items, shelf, timer' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Calculate coalescing efficiency for different access patterns.', instructions: 'Given a warp of 32 threads each requesting 4 bytes, compute the number of 128-byte transactions for: (a) consecutive addresses, (b) stride-2 access, (c) stride-32 access, (d) random access. Plot transactions vs stride.', inputs: 'Calculator, transaction formula', expectedOutputs: 'Transaction counts: 1, 1, 32, 32 for the four patterns respectively.', rubric: 'Correct calculations 40%, meaningful plot 30%, interpretation 30%.', learningOutcomes: 'Quantify the cost of non-coalesced access.', time: '15 minutes', materials: 'Calculator, graph paper' },
      { level: 3, levelName: 'All Students Do', objective: 'Measure coalescing impact on a real GPU kernel.', instructions: 'In groups of 3, implement two versions of a vector-scalar multiply: (a) coalesced (threads access consecutive elements), (b) strided (threads access every 32nd element). Measure bandwidth for both on a CUDA GPU.', inputs: 'CUDA environment, starter code', expectedOutputs: 'Two bandwidth measurements showing coalesced access achieves near-peak bandwidth.', rubric: 'Correct implementations 30%, accurate measurements 30%, coalescing analysis 40%.', learningOutcomes: 'Experience the measurable impact of coalescing on real hardware.', time: '25 minutes', materials: 'Laptop with CUDA, starter code' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Optimize a matrix transpose for coalescing and bank conflicts.', instructions: 'Implement a naive NxN matrix transpose (uncoalesced output). Then implement a shared-memory tiled transpose that achieves coalesced access in both read and write. Pad shared memory to avoid bank conflicts. Measure both.', inputs: 'Matrix transpose code skeleton', expectedOutputs: 'Two implementations with timing comparison and bank conflict analysis.', rubric: 'Correct implementations 25%, correct measurements 25%, coalescing analysis 25%, bank conflict analysis 25%.', learningOutcomes: 'Apply coalescing and bank conflict optimization to a classic GPU problem.', time: '20 minutes', materials: 'Code skeleton, CUDA environment' }
    ],
    projectScope: 'Build a GPU memory access benchmark that systematically measures the impact of coalescing, stride patterns, and bank conflicts on kernel bandwidth and occupancy.',
    projectFeasibility: 'Requires a CUDA-capable GPU and CUDA toolkit. Uses simple kernels that measure bandwidth across different access patterns. No complex library dependencies.',
    projectObjectives: ['Implement coalesced and uncoalesced vector access patterns', 'Measure effective bandwidth for stride-1, stride-2, stride-32, and random access', 'Implement a shared memory benchmark with and without bank conflicts', 'Compute occupancy for different block sizes and register counts', 'Generate a report ranking optimization techniques by impact'],
    projectOutcomes: ['CUDA bandwidth benchmark program', 'Bandwidth vs stride plot', 'Bank conflict impact measurement', 'Occupancy vs block/register configuration chart', 'One-page optimization guide'],
    projectMethodology: 'Question: How do coalescing and occupancy affect GPU kernel bandwidth? Hypothesis: Coalesced access will achieve near-peak bandwidth; bank conflicts will reduce shared memory throughput proportionally. Experiment: Timed bandwidth measurements. Compare: Plot results against peak hardware bandwidth. Reflect: Identify the dominant optimization target.',
    projectRoles: ['Kernel Lead: writes the CUDA kernels', 'Measurement Lead: designs timing protocol', 'Analyst: creates bandwidth and occupancy plots', 'Writer: documents optimization recommendations'],
    projectTimeline: [
      { milestone: 'Setup', duration: 'Day 1', deliverable: 'CUDA environment and problem definition' },
      { milestone: 'Kernels', duration: 'Days 2-3', deliverable: 'Coalesced, strided, and bank conflict kernels' },
      { milestone: 'Measurement', duration: 'Days 4-5', deliverable: 'Full bandwidth sweep data' },
      { milestone: 'Analysis', duration: 'Day 6', deliverable: 'Bandwidth and occupancy plots' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Optimization guide with recommendations' }
    ],
    projectRisks: [
      { risk: 'GPU hardware variations affect bandwidth numbers', severity: 'Low', mitigation: 'Record GPU model, driver version, and repeat all measurements' },
      { risk: 'L2 cache effects mask uncoalesced access at small sizes', severity: 'Medium', mitigation: 'Use problem sizes large enough to exceed L2 cache capacity' },
      { risk: 'Occupancy limits vary by SM architecture and are hard to predict', severity: 'Medium', mitigation: 'Use CUDA occupancy API to compute exact occupancy, do not estimate' }
    ],
    projectBudget: 'Student time: ~12 hours. GPU compute cost: $0 (Google Colab or local GPU). Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Empirical measurement of coalescing and occupancy effects on GPU kernel bandwidth.',
    questions: [
      { type: 'conceptual', question: 'What is memory coalescing and why does it matter on GPUs?', answer: 'Memory coalescing is the hardware mechanism that combines memory requests from 32 threads in a warp into the fewest possible transactions when the threads access consecutive addresses. It matters because global memory bandwidth is the primary bottleneck for most GPU kernels — uncoalesced access can waste up to 32x more memory transactions.', explanation: 'The memory controller detects when threads in a warp request consecutive addresses and merges those requests into a single wide transaction. Scattered requests require separate transactions.', commonMistakes: 'Assuming the programmer must explicitly merge requests. Coalescing is automatic — the programmer\'s job is to write access patterns that the hardware CAN coalesce.', tip: 'Thread i should access array[i], not array[i × stride].' },
      { type: 'numerical', question: 'A warp reads 32 single-precision values. If all are in the same 128-byte cache line, how many memory transactions occur? If they span 32 different cache lines?', answer: 'Same cache line: 1 transaction (128 bytes covers all 32 × 4-byte values). Different cache lines: 32 transactions (one per cache line, each returning 128 bytes but only 4 bytes useful).', explanation: 'When all values are in one cache line, the hardware issues one transaction. When scattered, each value requires its own transaction — 32x more memory traffic for the same useful data.', commonMistakes: 'Forgetting that each cache line fetch returns 128 bytes even if only 4 bytes are useful.', tip: 'Coalescing success = 1 transaction per warp. Failure = 32 transactions per warp.' },
      { type: 'application', question: 'You have an Array of Structures (AoS): structs {float x, y, z, w;} data[N]. Threads access data[threadIdx].x. Is this coalesced? How do you fix it?', answer: 'Not coalesced. Each struct is 16 bytes, and consecutive structs are 16 bytes apart. Thread 0 accesses offset 0, thread 1 accesses offset 16 — these are NOT in the same 128-byte cache line (they are, but the y, z, w fields between them waste bandwidth). Fix: use Structure of Arrays (SoA): float x[N], y[N], z[N], w[N]. Now thread 0 accesses x[0], thread 1 accesses x[1] — consecutive 4-byte values, perfectly coalesced.', explanation: 'AoS wastes bandwidth because the hardware fetches the entire struct (16 bytes) but only uses one field (4 bytes). SoA packs all values of one field contiguously.', commonMistakes: 'Thinking AoS is coalesced because the structs are contiguous — the individual field accesses are strided.', tip: 'AoS = 25% bandwidth utilization. SoA = 100%. Always prefer SoA for GPU.' },
      { type: 'problemSolving', question: 'A kernel achieves only 20% of peak memory bandwidth. List three possible causes and one diagnostic for each.', answer: '(1) Uncoalesced access: diagnose with nsight compute memory throughput chart. (2) Shared memory bank conflicts: diagnose with shared memory replay counter. (3) Insufficient occupancy: diagnose with occupancy calculator. Other causes include register spill to local memory and L2 cache thrashing.', explanation: 'Low bandwidth utilization usually traces to one of these three memory issues. The GPU profiler quantifies each independently.', commonMistakes: 'Blaming the GPU hardware when the issue is the access pattern.', tip: 'Profile, don\'t guess — the profiler will tell you exactly which memory level is the bottleneck.' }
    ],
    labType: 'memory-coalescing',
    keyInsights: ['Coalesced access reduces memory transactions by up to 32x compared to uncoalesced access', 'Shared memory bank conflicts are as devastating as uncoalesced global memory access', 'Occupancy hides memory latency but is limited by registers, shared memory, and block size', 'Data layout (SoA vs AoS) is the single most impactful GPU optimization decision'],
    advantages: ['Dramatic bandwidth improvement from coalescing (up to 32x)', 'Shared memory tiling reduces global memory traffic by orders of magnitude', 'Bank conflict avoidance is simple (pad arrays by one element)', 'Occupancy tuning is well-supported by CUDA profiling tools'],
    disadvantages: ['Coalescing constraints often conflict with natural data structures', 'Shared memory is limited per SM (48-164 KB), requiring careful tiling', 'Register pressure from complex kernels limits occupancy', 'Bank conflict diagnosis requires specialized tools (nsight compute)'],
    improvements: ['Use CUDA memory hints (cudaMemAdvise) for NUMA-aware access', 'Apply swizzling techniques to eliminate bank conflicts algorithmically', 'Use asynchronous copy (cp.async) to overlap global→shared memory transfer with computation', 'Leverage L2 cache residency control (cudaAccessPolicyWindow) for persistent data'],
    futureScope: 'Hardware-accelerated memory compression, CXL-attached GPU memory pools, and software-managed cache hierarchies are extending the memory system beyond current limits.',
    industrialApplications: ['Deep learning matrix multiplication (cuBLAS GEMM optimization)', 'Image processing convolution kernels (cuDNN)', 'Sparse matrix operations (cuSPARSE)', 'Ray tracing BVH traversal (optimal memory access patterns)', 'Molecular dynamics force calculations (coalesced atom access)'],
    researchOpportunities: ['Automatic data layout transformation for GPU coalescing', 'Bank-conflict-free shared memory design', 'Compiler-driven occupancy optimization', 'Memory-aware auto-tuning for GPU kernels'],
    careerRelevance: ['GPU Performance Engineer', 'HPC Optimization Specialist', 'CUDA Library Developer', 'Machine Learning Compiler Engineer', 'Graphics Engine Programmer']
  },
  {
    id: 3,
    title: 'Profiling and Bottleneck Analysis',
    description: 'Identify performance bottlenecks in GPU kernels using profiling tools and systematic analysis to guide optimization decisions.',
    prerequisites: ['Topic 1: GPU architecture and CUDA basics', 'Topic 2: Memory coalescing and occupancy', 'Familiarity with Linux command line and performance metrics', 'Basic understanding of hardware counters and bottlenecks'],
    dependencies: ['Cloud HPC (Topic 4) uses profiling to optimize cloud GPU workloads', 'All optimization efforts depend on identifying the correct bottleneck first', 'Performance engineering careers require profiling as a core skill', 'Deep learning framework optimization uses similar profiling techniques'],
    preparationPlan: 'Review GPU memory hierarchy from Topic 1, understand the difference between compute-bound and memory-bound kernels, and install NVIDIA nsight compute or nsight systems if possible.',
    story: 'You are a doctor at Sunnybrook General Hospital. A patient walks in complaining of headaches, fatigue, and difficulty concentrating. The inexperienced doctor immediately prescribes three different medications: one for headaches, one for fatigue, and one for concentration. The patient gets worse. A senior doctor arrives, examines the patient, and runs a systematic diagnostic: blood tests (are iron levels low?), sleep study (is the patient sleeping poorly?), eye exam (is vision straining?), stress evaluation (is work overwhelming?). The results reveal the root cause: chronic iron deficiency causing anemia, which produces ALL three symptoms. One treatment — iron supplements — resolves everything. The inexperienced doctor treated symptoms. The senior doctor treated the cause. Now imagine the hospital has a new MRI machine (profiling tool). The MRI reveals not just the brain structure but the actual blood flow, oxygen levels, and electrical activity in real time. The senior doctor can now see exactly which region of the brain is underperforming, rather than guessing from external symptoms. This is GPU profiling. A developer writes a slow CUDA kernel and immediately assumes the problem is "not enough GPU cores" (the headaches symptom). They buy a bigger GPU (prescribe more medication). The kernel is still slow. The profiler (MRI) reveals the real problem: the kernel is spending 85% of its time waiting for global memory (anemia — the root cause). The "not enough cores" was a symptom; the memory bandwidth was the disease. The profiling tools are like different diagnostic instruments. nsight systems (blood test) shows a high-level timeline of CPU and GPU activity — you can see if the GPU is idle waiting for data from the CPU. nsight compute (MRI) shows detailed hardware metrics per kernel — cache hit rates, memory throughput, compute throughput, warp occupancy. Nsight compute even has a "speed of light" analysis that tells you what fraction of peak compute or memory bandwidth you are using, like the MRI telling you what fraction of your brain is getting oxygen. The senior doctor now teaches the resident: "Before you prescribe any treatment, always run the diagnostic first. The symptoms will mislead you. Only the measurement tells the truth." The resident asks: "What if the measurement itself takes longer than the treatment?" The senior doctor smiles: "Good question. That is why we use sampling and selective instrumentation — only measure what matters, when it matters."',
    cartoonPanels: [
      {
        scene: 1,
        title: "Roofline Telemetry Diagnostic",
        avatar: "🏎️",
        tag: "Roofline Model",
        caption: "Profiler telemetry checking whether engine speed (Compute) or fuel hose flow rate (Memory) caps speed!",
        concept: "Roofline Analysis: Quantifies maximum attainable GFLOPS/s based on arithmetic intensity.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><path d="M 40 130 L 140 50 L 280 50" stroke="#38bdf8" stroke-width="3" fill="none"/><circle cx="110" cy="74" r="6" fill="#ef4444"/><text x="125" y="78" font-size="11" fill="#ef4444" font-weight="bold">Memory Bound!</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">Compute-Bound vs Memory-Bound Ceiling</text></svg>`
      },
      {
        scene: 2,
        title: "Nsight Compute Kernel MRI",
        avatar: "🩺",
        tag: "Nsight Compute",
        caption: "Nsight Compute MRI scanning warp stall reasons, cache hit rates, and Speed of Light metrics.",
        concept: "Hardware Counter Profiling: Pinpoints memory stall cycles, register pressure, and warp occupancy.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="80" y="45" width="160" height="60" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/><text x="160" y="78" font-size="18" text-anchor="middle">🩺 Nsight MRI 85%</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">Nsight Compute Speed of Light Analysis</text></svg>`
      },
      {
        scene: 3,
        title: "Vectorized 128-Bit Loads (float4)",
        avatar: "⚡",
        tag: "Vectorized IO",
        caption: "Carrying 4 values in 1 wide armful (float4) instead of 4 separate trips across the bus!",
        concept: "Vectorized Memory Access (`LDG.128`): Fetches 16 bytes in a single instruction to maximize bandwidth.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="70" y="50" width="180" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="160" y="78" font-size="14" fill="#f59e0b" font-weight="bold" text-anchor="middle">float4 {x, y, z, w} [128-bit]</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">Single-Instruction Vectorized Fetch</text></svg>`
      },
      {
        scene: 4,
        title: "Kernel Fusion Assembly",
        avatar: "🔥",
        tag: "Kernel Fusion",
        caption: "Fusing 3 separate math operations into 1 single combined kernel to eliminate intermediate DRAM writes!",
        concept: "Kernel Fusion: Combines adjacent element-wise kernels, saving global memory roundtrips.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(40, 50)"><rect x="0" y="0" width="240" height="45" rx="6" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="120" y="28" font-size="14" fill="#ec4899" font-weight="bold" text-anchor="middle">Fused: Scale + Add + ReLU</text></g><text x="160" y="155" text-anchor="middle" font-size="11" fill="#ec4899" font-weight="bold">Fused Single-Pass Execution</text></svg>`
      }
    ],
    storyQuestions: [
      'Why did treating all three symptoms separately make the patient worse instead of better?',
      'What does the MRI reveal that the patient\'s description of symptoms cannot?',
      'How does a GPU profiler like nsight compute tell you whether a kernel is compute-bound or memory-bound?',
      'If profiling takes significant time, how do you decide what to profile and what to skip?'
    ],
    storyBridge: 'GPU profiling is the diagnostic process for kernel performance. Without profiling, developers guess at bottlenecks and waste time optimizing the wrong thing. With profiling, they identify the root cause — whether it is memory bandwidth, compute throughput, occupancy, or instruction overhead — and apply targeted fixes. The profiler is the stethoscope, blood test, and MRI of GPU performance engineering.',
    terminology: ['Profiling', 'Bottleneck analysis', 'Compute-bound', 'Memory-bound', 'Latency-bound', 'Nsight Systems', 'Nsight Compute', 'Hardware counters', 'SM activity', 'Memory throughput', 'Compute throughput', 'Occupancy', 'Warp stall reasons', 'Speed of light (SOL)', 'Roofline model'],
    mathNeed: 'The roofline model provides a mathematical framework to determine whether a kernel is limited by compute capacity or memory bandwidth, given its arithmetic intensity.',
    mathMotivation: 'Profiling data is only useful when interpreted through a performance model. The roofline model turns raw numbers into actionable optimization targets.',
    realWorldChallenges: ['Real kernels have mixed bottlenecks that shift with input size and GPU architecture', 'Profiling overhead can distort measurements for short-running kernels', 'Production kernels running at scale may exhibit different bottlenecks than in profiling runs'],
    technicalChallenges: ['Hardware counters are limited and cannot all be read simultaneously', 'Memory-level parallelism and cache effects make bottleneck analysis non-trivial', 'Dynamic behavior (warp scheduling, cache eviction) means profiling results vary between runs'],
    equations: [
      {
        name: 'Roofline Model',
        latex: 'P = \\min(P_{peak}, R \\times AI)',
        symbols: 'P is achievable performance (FLOP/s), P_peak is peak compute throughput (FLOP/s), R is peak memory bandwidth (bytes/s), AI is arithmetic intensity (FLOP/s per byte).',
        meaning: 'A kernel\'s performance is the minimum of its compute ceiling and its memory ceiling. Below a critical arithmetic intensity, memory is the bottleneck; above it, compute is the bottleneck.',
        whyNeeded: 'It provides a clear, quantitative answer to "should I optimize compute or memory?"',
        interpretation: 'If a kernel has AI = 2 FLOP/byte and the GPU has P_peak = 10 TFLOPS and R = 1 TB/s, then memory ceiling = 1 × 2 = 2 TFLOPS, compute ceiling = 10 TFLOPS. The kernel is memory-bound at 2 TFLOPS.'
      },
      {
        name: 'Arithmetic Intensity',
        latex: 'AI = \\frac{N_{FLOP}}{N_{bytes}}',
        symbols: 'AI is arithmetic intensity (FLOP/byte), N_FLOP is the number of floating-point operations, N_bytes is the number of bytes transferred from memory.',
        meaning: 'The ratio of compute work to memory traffic. Higher AI means more compute per byte fetched.',
        whyNeeded: 'It characterizes the fundamental compute-to-memory balance of an algorithm, independent of the hardware.',
        interpretation: 'Matrix multiplication has AI = O(N) for NxN matrices (high AI, compute-bound). Vector addition has AI = 2/8 = 0.25 FLOP/byte (low AI, memory-bound).'
      },
      {
        name: 'Kernel Throughput Ratio',
        latex: '\\rho = \\frac{T_{achieved}}{T_{peak}}',
        symbols: 'rho is the throughput ratio (SOL percentage), T_achieved is achieved FLOP/s or bandwidth, T_peak is the hardware peak.',
        meaning: 'What percentage of the hardware peak the kernel actually achieves, for either compute or memory.',
        whyNeeded: 'It gives a single number that quantifies optimization headroom.',
        interpretation: 'rho_compute = 60% means 40% of peak compute is unused. rho_memory = 85% means the memory system is well-utilized. Optimization should target the lower ratio.'
      },
      {
        name: 'Warp Stall Cycles',
        latex: 'CPI = C_{exec} + C_{stall}',
        symbols: 'CPI is cycles per instruction, C_exec is cycles spent executing instructions, C_stall is cycles spent stalled (waiting for memory, synchronization, or other reasons).',
        meaning: 'The total CPI is the sum of execution time and stall time. High stall cycles indicate a bottleneck.',
        whyNeeded: 'Decomposing CPI into execution and stall components reveals what the GPU is actually doing during each cycle.',
        interpretation: 'A CPI of 4.0 where 3.5 cycles are stalls means the GPU spends 87.5% of its time waiting. Identifying the stall reason (memory, barrier, instruction fetch) pinpoints the bottleneck.'
      }
    ],
    numericalExample: 'A kernel processes 1 million single-precision elements. It performs 4 FLOP/s per element (multiply + add) = 4 MFLOP. It reads 4 MB of data (1M × 4 bytes). Arithmetic intensity = 4M FLOP / 4M bytes = 1 FLOP/byte. GPU peak: P_peak = 10 TFLOPS, R = 1 TB/s. Roofline: P_compute_ceiling = 10 TFLOPS. P_memory_ceiling = R × AI = 1 TB/s × 1 = 1 TFLOPS. Kernel is memory-bound, limited to 1 TFLOPS maximum. nsight compute shows 0.85 TFLOPS achieved. SOL memory = 85%. SOL compute = 0.85/10 = 8.5%. Optimization target: increase arithmetic intensity (e.g., tile the computation to reuse data from shared memory, increasing AI from 1 to 10). New ceiling: 10 TFLOPS, which is now compute-bound.',
    metrics: ['Achieved compute throughput (FLOP/s) vs peak', 'Achieved memory bandwidth (GB/s) vs peak', 'Arithmetic intensity (FLOP/byte)', 'Occupancy percentage', 'Warp stall reasons breakdown', 'Cache hit rates (L1, L2)', 'SM activity percentage'],
    optimizationPossibilities: 'Use roofline analysis to identify whether compute or memory is the bottleneck, then apply targeted optimizations: increase arithmetic intensity through tiling for memory-bound kernels, use mixed precision for compute-bound kernels, reduce warp stalls through instruction-level optimization.',
    futureEnhancements: 'Automated optimization recommendations from profiling tools, machine learning-based bottleneck prediction, continuous profiling in production GPU workloads, and cross-architecture profiling portability (MAP, ExtraP).',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Walk through nsight compute output for a simple kernel.', instructions: 'Project nsight compute summary for a vector addition kernel. Identify: SOL metric (memory vs compute), occupancy, cache hit rate, and warp stall reasons. Explain each metric and what it tells you about the bottleneck.', inputs: 'Nsight compute output screenshot', expectedOutputs: 'Students can identify the bottleneck type from profiler output.', rubric: 'Correct identification 40%, clear explanation 30%, student engagement 30%.', learningOutcomes: 'Read and interpret basic GPU profiler output.', time: '10 minutes', materials: 'Projector, nsight compute output' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Apply the roofline model to classify two kernels.', instructions: 'Provide arithmetic intensity and hardware specs for two kernels: vector addition (AI=0.25) and matrix multiply (AI=N). Compute the roofline ceiling for each. Classify each as compute-bound or memory-bound.', inputs: 'Roofline equation, hardware specs', expectedOutputs: 'Vector addition classified as memory-bound, matrix multiply as compute-bound (for large N).', rubric: 'Correct calculations 40%, correct classification 30%, meaningful discussion 30%.', learningOutcomes: 'Use the roofline model as a diagnostic tool.', time: '15 minutes', materials: 'Calculator, hardware specs handout' },
      { level: 3, levelName: 'All Students Do', objective: 'Profile a slow kernel and identify the bottleneck.', instructions: 'In groups of 3, run a provided intentionally slow CUDA kernel through nsight compute. Identify the primary bottleneck from the roofline chart and warp stall analysis. Propose one optimization. Implement it. Re-profile to verify improvement.', inputs: 'Nsight compute, slow kernel code, CUDA environment', expectedOutputs: 'Before/after profiling comparison showing identified bottleneck and speedup from fix.', rubric: 'Correct bottleneck identification 30%, quality of optimization 30%, measured improvement 20%, documentation 20%.', learningOutcomes: 'Complete the profile-identify-optimize-reprofile loop.', time: '25 minutes', materials: 'Laptop with nsight compute, starter kernel' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Build a roofline plot for a GPU and classify three kernels.', instructions: 'Given GPU peak FLOP/s and bandwidth, construct a roofline plot. Plot three kernels with different arithmetic intensities. For each, determine the performance ceiling and suggest the highest-impact optimization.', inputs: 'GPU specs, three kernel descriptions with AI and achieved FLOP/s', expectedOutputs: 'Roofline plot with three kernels, performance ceilings, and optimization recommendations.', rubric: 'Correct roofline construction 25%, correct classification 25%, quality of recommendations 30%, clarity 20%.', learningOutcomes: 'Use the roofline model for systematic performance analysis.', time: '20 minutes', materials: 'Graph paper or plotting tool, kernel descriptions' }
    ],
    projectScope: 'Build a profiling toolkit that runs a GPU kernel, collects hardware metrics, constructs a roofline plot, and generates a bottleneck analysis report with optimization recommendations.',
    projectFeasibility: 'Requires a CUDA-capable GPU and nsight compute. Can be done on Google Colab with GPU runtime. Uses provided kernels and profiling scripts.',
    projectObjectives: ['Run nsight compute on three GPU kernels (vector add, matrix multiply, convolution)', 'Extract compute throughput, memory bandwidth, and occupancy for each', 'Construct a roofline plot with hardware ceilings', 'Identify the bottleneck for each kernel', 'Generate an optimization report with targeted recommendations'],
    projectOutcomes: ['Profiling script that collects GPU hardware metrics', 'Roofline plot for three kernels', 'Bottleneck analysis report', 'Optimization recommendations with predicted speedup'],
    projectMethodology: 'Question: What is the primary bottleneck for each kernel? Hypothesis: Vector add is memory-bound, matrix multiply is compute-bound, convolution is mixed. Experiment: Profile with nsight compute. Compare: Construct roofline plot. Reflect: Match profiler data to theory.',
    projectRoles: ['Profiling Lead: runs nsight compute and collects metrics', 'Analysis Lead: constructs roofline plot and interprets results', 'Optimization Lead: proposes targeted fixes', 'Writer: documents findings and recommendations'],
    projectTimeline: [
      { milestone: 'Setup', duration: 'Day 1', deliverable: 'Environment setup and kernel selection' },
      { milestone: 'Profiling', duration: 'Days 2-3', deliverable: 'Metrics collected for all three kernels' },
      { milestone: 'Roofline', duration: 'Days 4-5', deliverable: 'Roofline plot constructed and bottlenecks classified' },
      { milestone: 'Analysis', duration: 'Day 6', deliverable: 'Bottleneck report with optimization recommendations' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Final report with before/after comparisons' }
    ],
    projectRisks: [
      { risk: 'Nsight compute requires specific driver versions', severity: 'Medium', mitigation: 'Test tool availability before starting, use fallback profiling if needed' },
      { risk: 'Profiling overhead distorts measurements for short kernels', severity: 'Medium', mitigation: 'Use large problem sizes and multiple iterations to amortize overhead' },
      { risk: 'Hardware counters may not be available on all GPUs', severity: 'Low', mitigation: 'Use software-based timing as fallback, document GPU capabilities' }
    ],
    projectBudget: 'Student time: ~12 hours. GPU compute cost: $0 (Google Colab or local GPU). Nsight compute: free with CUDA toolkit. Documentation: ~3 hours.',
    projectTRL: 'TRL 3 — Systematic profiling and bottleneck classification using industry-standard tools.',
    questions: [
      { type: 'conceptual', question: 'What is the difference between a compute-bound and a memory-bound kernel?', answer: 'A compute-bound kernel spends most of its time executing arithmetic instructions — increasing compute throughput (more cores, higher clock, tensor cores) would improve performance. A memory-bound kernel spends most of its time waiting for data from memory — increasing memory bandwidth or arithmetic intensity would improve performance.', explanation: 'The roofline model formalizes this: if the kernel\'s performance is at the compute ceiling, it is compute-bound; if at the memory ceiling, it is memory-bound.', commonMistakes: 'Assuming a kernel with low FLOP/s is always memory-bound. It might have high stalls from other reasons (synchronization, instruction fetch).', tip: 'Check the SOL metrics: the lower of (compute SOL%, memory SOL%) identifies the bottleneck.' },
      { type: 'numerical', question: 'A kernel performs 8 FLOP/s per byte of data transferred. The GPU has 20 TFLOPS peak compute and 2 TB/s memory bandwidth. What is the roofline performance ceiling?', answer: 'Compute ceiling = 20 TFLOPS. Memory ceiling = 2 TB/s × 8 FLOP/byte = 16 TFLOPS. The kernel is memory-bound at 16 TFLOPS (min of 20 and 16).', explanation: 'The roofline model takes the minimum of the two ceilings. The kernel cannot exceed 16 TFLOPS regardless of how many cores are available, because memory cannot feed data fast enough.', commonMistakes: 'Computing 20 × 8 = 160 TFLOPS instead of 2 × 8 = 16 TFLOPS.', tip: 'Memory ceiling = bandwidth × AI, not peak compute × AI.' },
      { type: 'application', question: 'A profiling tool shows that a kernel achieves only 15% of peak memory bandwidth. List three possible causes and one fix for each.', answer: '(1) Uncoalesced memory access: fix by restructuring data layout for consecutive thread access. (2) Low occupancy from high register usage: fix by reducing per-thread register demand or increasing block size. (3) Bank conflicts in shared memory: fix by padding shared memory arrays.', explanation: 'Low memory bandwidth utilization is one of the most common GPU performance issues. Each cause has a different optimization path.', commonMistakes: 'Assuming the fix is always "add more shared memory" without diagnosing the actual cause.', tip: 'Use the profiler to distinguish between coalescing issues, occupancy issues, and bank conflicts.' },
      { type: 'problemSolving', question: 'You profile a kernel and find: 80% SOL memory, 12% SOL compute, occupancy = 50%. What do you optimize first and why?', answer: 'The kernel is clearly memory-bound (80% memory SOL vs 12% compute SOL). However, 80% memory utilization is already good, so the next target is occupancy (50%). Increasing occupancy from 50% to 75% would allow more warps to hide memory latency, potentially increasing effective bandwidth from 80% to 90%+. After occupancy, consider increasing arithmetic intensity through computation reuse.', explanation: 'The profiler reveals the hierarchy: memory-bound first, then occupancy limitation. Compute optimization would have negligible effect at 12% SOL.', commonMistakes: 'Optimizing compute because SOL compute is lowest — but the kernel is memory-bound, so compute SOL is irrelevant.', tip: 'Always optimize the BOTTLENECK, not the lowest metric. The bottleneck is the one closest to 100%.' }
    ],
    labType: 'roofline-profiling',
    keyInsights: ['Always profile before optimizing — guessing the bottleneck wastes time', 'The roofline model provides a clear compute-vs-memory decision framework', 'Warp stall reasons reveal the root cause of underperformance', 'Profiling should be an iterative loop: profile, optimize, re-profile'],
    advantages: ['Quantitative bottleneck identification eliminates guesswork', 'Industry-standard tools (nsight compute, nsight systems) provide comprehensive metrics', 'Roofline model gives actionable optimization targets', 'Profiling skills transfer across GPU architectures and programming frameworks'],
    disadvantages: ['Profiling overhead can distort measurements for small kernels', 'Hardware counters are limited and architecture-specific', 'Interpreting profiler output requires significant experience', 'Tool output can be overwhelming for beginners'],
    improvements: ['Use automated roofline analysis for quick bottleneck triage', 'Implement continuous profiling in production GPU workloads', 'Build profiling-guided auto-tuning systems', 'Develop cross-architecture profiling portability layers'],
    futureScope: 'Machine learning-guided profiling, automated optimization prescription, production-grade GPU observability platforms, and cross-vendor profiling standards.',
    industrialApplications: ['NVIDIA performance engineering (cuBLAS, cuDNN optimization)', 'Cloud GPU instance performance validation (AWS, Azure, GCP)', 'Game engine GPU profiling (Unreal, Unity profiler integration)', 'Autonomous vehicle perception pipeline optimization', 'Drug discovery molecular simulation performance tuning'],
    researchOpportunities: ['Automated GPU kernel optimization from profiling data', 'Performance portability prediction across GPU architectures', 'Low-overhead production profiling for GPU clusters', 'ML-based performance prediction from static code analysis'],
    careerRelevance: ['GPU Performance Engineer', 'Performance Profiling Specialist', 'HPC Performance Analyst', 'CUDA Library Developer', 'Cloud GPU Optimization Engineer']
  },
  {
    id: 4,
    title: 'Cloud HPC, Docker/Kubernetes, and AI Accelerators',
    description: 'Deploy, scale, and optimize parallel workloads using Cloud HPC instances, Docker/Kubernetes containers, OpenCL/CUDA runtimes, and specialized Tensor Core AI accelerators.',
    prerequisites: ['Topic 1: GPU architecture and CUDA basics', 'Topic 2: Memory coalescing and occupancy', 'Topic 3: Profiling and bottleneck analysis', 'Basic Linux command line and Docker familiarity'],
    dependencies: ['All previous GPU topics provide the foundation for deployment decisions', 'Unit 1: Cluster basics and TOP500 concepts apply to cloud HPC', 'Unit 2: MPI concepts extend to cloud-based distributed GPU workloads', 'Industry deployment requires understanding of both performance and cost trade-offs'],
    preparationPlan: 'Set up a free-tier cloud account (AWS, GCP, or Azure), install Docker locally if possible, and read one case study about cloud-based scientific computing or AI training.',
    story: 'You own a small bakery that has grown so popular you cannot keep up with demand. You have three options. Option one: build a new permanent kitchen (on-premises HPC cluster). It costs $500,000 upfront, takes six months to build, seats fifty bakers, and you pay electricity and maintenance forever — even when business is slow on Tuesdays. Option two: rent a food truck (cloud GPU instance). It costs $50 per day, you can drive it to the busiest location each morning, and you only pay when it is running. On Monday you need a truck with a pizza oven (A100 GPU). On Tuesday you need a truck with a deep fryer (T4 GPU). On Wednesday you need five trucks simultaneously for a festival (multi-GPU cluster). The food truck is infinitely flexible but costs more per meal during busy periods. Option three: build a prefab kitchen in a shipping container (containers and Kubernetes). It is a standardized kitchen that you can drop into any food truck, any permanent building, or any rented warehouse. The recipe works exactly the same everywhere. If you built the kitchen yourself (native installation), you would discover it only works in your building, breaks when you move it, and every new chef must install every ingredient by hand. The shipping container kitchen (Docker) is the revolution: package the kitchen once, run it anywhere. Now the bakery faces a new challenge: a food critic (performance engineer) visits and says your croissants are slow because your ovens are not designed for croissants. You investigate and discover that general-purpose ovens (GPUs) are good at many things but not optimal for croissants. A specialized croissant oven (Google TPU, AWS Trainium) bakes croissants twice as fast at half the energy. But it cannot bake pizza or cakes. The food critic says: "If you bake 90% croissants, buy a croissant oven. If you bake 10% croissants, the general oven is fine." The bakery now has a portfolio: permanent kitchen for core products (on-premises cluster), food trucks for variable demand (cloud instances), prefab kitchens for portability (containers), and specialized ovens for dominant products (AI accelerators). The principal from Sunnybrook Elementary visits and says: "This is more complicated than managing kindergarteners." You reply: "But the principles are the same — match the tool to the workload, measure the cost, and optimize continuously."',
    cartoonPanels: [
      {
        scene: 1,
        title: "Shipping Container Kitchen (Docker)",
        avatar: "📦",
        tag: "Apptainer / Docker",
        caption: "Standardized container kitchen dropping onto any cloud host without dependencies breaking!",
        concept: "Containerized HPC: Encapsulates CUDA drivers, MPI libraries, and code for 100% reproducible execution.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="80" y="45" width="160" height="65" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/><text x="160" y="78" font-size="20" text-anchor="middle">🐳 Docker Box</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#38bdf8" font-weight="bold">Portable Reproducible Execution Engine</text></svg>`
      },
      {
        scene: 2,
        title: "NVIDIA Tensor Core Matrix Engine",
        avatar: "⚡",
        tag: "Tensor Cores",
        caption: "Dedicated hardware matrix engine computing D = A x B + C in 1 single clock cycle!",
        concept: "NVIDIA Tensor Cores: Hardware matrix multiply-accumulate accelerators for AI & linear algebra.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="70" y="45" width="180" height="60" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/><text x="160" y="80" font-size="16" fill="#22c55e" font-weight="bold" text-anchor="middle">D = A × B + C [FP16/INT8]</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">1-Cycle Matrix Multiplication Engine</text></svg>`
      },
      {
        scene: 3,
        title: "Automatic Mixed Precision (AMP)",
        avatar: "🎛️",
        tag: "AMP FP16/FP32",
        caption: "Math computed in fast FP16 while master weights are kept in FP32 for numerical stability.",
        concept: "Mixed Precision Arithmetic: Halves memory bandwidth footprint while preserving numerical accuracy.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><g transform="translate(40, 50)"><rect x="0" y="0" width="110" height="45" rx="6" fill="#1e293b" stroke="#22c55e"/><text x="55" y="28" fill="#22c55e" font-size="12" font-weight="bold" text-anchor="middle">FP16 Fast Compute</text></g><g transform="translate(170, 50)"><rect x="0" y="0" width="110" height="45" rx="6" fill="#1e293b" stroke="#38bdf8"/><text x="55" y="28" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">FP32 Master Weight</text></g><text x="160" y="155" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">Automatic Mixed Precision (AMP) Pipeline</text></svg>`
      },
      {
        scene: 4,
        title: "Cloud Fleet Elastic Auto-Scaling",
        avatar: "☁️",
        tag: "Cloud Auto-Scale",
        caption: "Cluster automatically provisions 64 GPU instances during spikes and spins down to 0 to save money!",
        concept: "Cloud Elasticity: Dynamic provisioning matching compute instances directly to active workload queues.",
        svg: `<svg viewBox="0 0 320 180" class="cartoon-svg"><rect width="320" height="180" rx="12" fill="#0f172a"/><rect x="80" y="45" width="160" height="60" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/><text x="160" y="80" font-size="20" text-anchor="middle">☁️ AWS / GCP Fleet</text><text x="160" y="155" text-anchor="middle" font-size="11" fill="#06b6d4" font-weight="bold">Pay-Per-Use Elastic Scaling Cluster</text></svg>`
      }
    ],
    storyQuestions: [
      'Why does the food truck cost more per meal during busy periods but save money during slow periods?',
      'How does the shipping container kitchen solve the "works on my machine" problem?',
      'When would you choose a specialized croissant oven over a general-purpose oven?',
      'How do you decide the right mix of permanent kitchen, food trucks, and specialized ovens?'
    ],
    storyBridge: 'Cloud HPC is the food truck strategy: trade capital expense for operational flexibility. Containers are the shipping container kitchen: package once, run anywhere. AI accelerators are the specialized ovens: maximum throughput for specific workloads at the cost of generality. Together, they represent the modern deployment landscape for GPU computing.',
    terminology: ['Cloud HPC', 'IaaS', 'PaaS', 'GPU instance', 'Spot instance', 'Docker', 'Container', 'Kubernetes', 'Kubernetes cluster', 'NVIDIA NGC', 'Tensor Processing Unit (TPU)', 'AWS Trainium', 'Inferentia', 'FPGA', 'MLOps', 'Serverless GPU', 'Elastic scaling', 'Cost optimization', 'Pay-per-use', 'Reserved instance'],
    mathNeed: 'Cloud GPU cost optimization requires comparing total cost of ownership across on-premises, on-demand, spot, and reserved pricing models.',
    mathMotivation: 'The choice between cloud and on-premises deployment depends on utilization rate, workload variability, and time-to-deploy — all of which can be modeled mathematically.',
    realWorldChallenges: ['Cloud GPU costs can exceed $30/hour for high-end instances (A100, H100)', 'Spot instances offer 60-90% discount but can be interrupted with 2-minute notice', 'Container orchestration adds complexity but enables elastic scaling and reproducibility'],
    technicalChallenges: ['GPU passthrough in containers requires NVIDIA Container Toolkit', 'Cross-cloud GPU performance varies due to virtualization overhead and NIC configuration', 'AI accelerators (TPU, Trainium) use different programming models than CUDA'],
    equations: [
      {
        name: 'Cloud vs On-Premises Break-Even',
        latex: 'C_{cloud} \\times U_{hours} = C_{on\\_prem} \\div T_{payback}',
        symbols: 'C_cloud is hourly cloud cost, U_hours is utilization hours per year, C_on_prem is the upfront on-premises cost, T_payback is the desired payback period in years.',
        meaning: 'The cloud is cheaper when utilization is low; on-premises is cheaper when utilization is high and sustained.',
        whyNeeded: 'It quantifies the break-even utilization rate that determines which deployment model is economically optimal.',
        interpretation: 'If an H100 cloud instance costs $4/hr and an H100 GPU card costs $30,000, break-even at 3-year payback is 30000/(4 × 3 × 8760) = 28.5% utilization. Below that, cloud is cheaper.'
      },
      {
        name: 'Spot Instance Cost Savings',
        latex: 'S_{spot} = \\frac{C_{on\\_demand} - C_{spot}}{C_{on\\_demand}} \\times 100\\%',
        symbols: 'S_spot is the percentage savings, C_on_demand is the on-demand price per hour, C_spot is the spot price per hour.',
        meaning: 'The discount percentage offered by spot instances compared to on-demand pricing.',
        whyNeeded: 'Spot instances can dramatically reduce cloud costs for interruptible workloads.',
        interpretation: 'If on-demand is $4/hr and spot is $1.20/hr, savings = (4-1.2)/4 = 70%. For a 100-GPU training job running 1000 hours, that saves $280,000.'
      },
      {
        name: 'Container Overhead',
        latex: 'O_{container} = \\frac{T_{container}}{T_{native}} \\times 100\\%',
        symbols: 'O_container is the containerization overhead percentage, T_container is execution time in a container, T_native is execution time on bare metal.',
        meaning: 'The performance overhead introduced by running in a container compared to bare metal.',
        whyNeeded: 'Containers are designed for near-zero overhead, but GPU passthrough and storage layers can introduce measurable overhead.',
        interpretation: 'A well-configured Docker container with NVIDIA GPU passthrough typically has less than 2% overhead. Network storage (NFS, EFS) can add 5-15% for I/O-heavy workloads.'
      },
      {
        name: 'Total Cost of Ownership',
        latex: 'TCO = C_{hardware} + C_{power} + C_{cooling} + C_{network} + C_{staff} + C_{depreciation}',
        symbols: 'TCO is total cost of ownership over the system lifetime, C_hardware is acquisition cost, C_power is electricity, C_cooling is cooling overhead, C_network is networking equipment, C_staff is administration cost, C_depreciation is value lost over time.',
        meaning: 'The true cost of owning and operating an on-premises GPU system over its lifetime (typically 3-5 years).',
        whyNeeded: 'Hardware purchase price is typically only 40-50% of TCO. Power, cooling, and staffing costs dominate.',
        interpretation: 'A $500K GPU cluster may cost $1.2M over 5 years when power ($250K), cooling ($100K), network ($50K), and staff ($300K) are included.'
      }
    ],
    numericalExample: 'An AI startup needs 8× H100 GPUs for 6 months of model training. Option A: On-premises. Hardware cost = $250,000. Power = 10 kW × $0.10/kWh × 8760 hrs × 0.5 (50% utilization) × 5 years = $21,900. Cooling = $8,760. Staff = $50,000/year × 5 = $250,000. Total TCO over 5 years ≈ $530,000. Cost for 6 months of training ≈ $53,000 (amortized). Option B: Cloud (on-demand). 8× H100 instances at $12/hr × 24 hrs × 180 days = $414,720. Option C: Cloud (spot). 8× H100 at $3.60/hr × 24 × 180 = $124,416 (with ~15% interruption overhead = $143,079). For this specific scenario: spot is cheapest ($143K), on-premises amortized is middle ($53K amortized but $250K upfront), on-demand is most expensive ($415K). The right choice depends on whether the startup can handle spot interruptions and how long they will need GPUs beyond 6 months.',
    metrics: ['Cost per GPU-hour (on-demand, spot, reserved)', 'Total Cost of Ownership (TCO)', 'Container overhead percentage', 'Spot instance interruption frequency', 'Elastic scaling latency', 'GPU utilization rate', 'Training time per epoch'],
    optimizationPossibilities: 'Use spot instances for fault-tolerant training jobs with checkpointing, reserve instances for predictable workloads, optimize container images for fast startup, use Kubernetes for automatic GPU allocation, and select the right accelerator (GPU vs TPU) for the workload.',
    futureEnhancements: 'Serverless GPU (AWS Lambda with GPU), confidential computing on GPU, photonic interconnects between cloud GPU nodes, carbon-aware scheduling that shifts workloads to green energy regions, and multi-accelerator orchestration frameworks.',
    activities: [
      { level: 1, levelName: 'Teacher Do', objective: 'Compare cloud vs on-premises cost models using a real-world example.', instructions: 'Project a spreadsheet comparing cloud GPU costs (on-demand, spot, reserved) vs on-premises costs (hardware, power, cooling, staff) for an AI training workload. Walk through each cost category.', inputs: 'Spreadsheet with cost data', expectedOutputs: 'Students understand that cloud is not always cheaper — utilization matters.', rubric: 'Cost accuracy 30%, clear explanation 40%, student engagement 30%.', learningOutcomes: 'Understand the economic trade-offs between deployment models.', time: '10 minutes', materials: 'Projector, spreadsheet' },
      { level: 2, levelName: 'Teacher + Student Together', objective: 'Calculate break-even utilization for cloud vs on-premises.', instructions: 'Given an H100 GPU costing $30,000 (on-premises, 3-year life) and a cloud H100 at $4/hr, compute the utilization rate where cloud becomes more expensive. Plot cost vs utilization for both models.', inputs: 'Calculator, pricing data', expectedOutputs: 'Break-even utilization calculated and plotted.', rubric: 'Correct calculation 40%, meaningful plot 30%, interpretation 30%.', learningOutcomes: 'Quantify the economic decision between deployment models.', time: '15 minutes', materials: 'Calculator, graph paper' },
      { level: 3, levelName: 'All Students Do', objective: 'Run a GPU workload in a Docker container on a cloud instance.', instructions: 'In groups of 3, launch a cloud GPU instance (AWS p3 or GCP T4), install Docker with NVIDIA Container Toolkit, run a simple CUDA kernel inside the container, and compare execution time to bare metal.', inputs: 'Cloud account (free tier), Docker, CUDA image', expectedOutputs: 'Working containerized GPU workload with timing comparison to bare metal.', rubric: 'Successful deployment 30%, timing comparison 30%, overhead analysis 20%, cost tracking 20%.', learningOutcomes: 'Experience containerized GPU deployment end-to-end.', time: '25 minutes', materials: 'Cloud account, laptop with Docker' },
      { level: 4, levelName: 'Individual Student Do', objective: 'Design a cloud GPU deployment strategy for a given workload.', instructions: 'Given a workload description (e.g., 3-month ML training, variable batch inference), design a cloud deployment strategy: choose instance types, pricing model (on-demand/spot/reserved), container orchestration approach, and estimate total cost.', inputs: 'Workload description with compute and memory requirements', expectedOutputs: 'Deployment strategy document with cost estimate and risk assessment.', rubric: 'Appropriate instance selection 25%, pricing model justification 25%, cost accuracy 25%, risk assessment 25%.', learningOutcomes: 'Apply cloud GPU deployment knowledge to a realistic scenario.', time: '20 minutes', materials: 'Workload description, cloud pricing data' }
    ],
    projectScope: 'Build a cost-performance comparison tool that evaluates cloud GPU instances (on-demand, spot, reserved) vs on-premises deployment for a given workload, including container overhead analysis.',
    projectFeasibility: 'Uses cloud free-tier credits (AWS $100, GCP $300) for hands-on testing. Docker and NVIDIA Container Toolkit are free. No hardware purchase needed.',
    projectObjectives: ['Deploy a CUDA workload in a Docker container on a cloud GPU instance', 'Measure container overhead vs bare metal execution', 'Collect pricing data for on-demand, spot, and reserved instances', 'Build a cost model comparing cloud vs on-premises for a given workload', 'Generate a deployment recommendation report'],
    projectOutcomes: ['Docker-based GPU workload deployment guide', 'Container overhead measurement results', 'Cost comparison model with interactive plots', 'Deployment recommendation report for a specific workload'],
    projectMethodology: 'Question: What is the optimal deployment strategy for a GPU workload? Hypothesis: Spot instances with checkpointing offer the best cost/performance for training; reserved instances for inference. Experiment: Deploy and measure. Compare: Build cost models. Reflect: Match deployment to workload characteristics.',
    projectRoles: ['Infrastructure Lead: sets up cloud instances and Docker environment', 'Benchmark Lead: measures container overhead and GPU performance', 'Cost Analyst: builds cost models and comparison plots', 'Writer: documents deployment strategy and recommendations'],
    projectTimeline: [
      { milestone: 'Setup', duration: 'Day 1', deliverable: 'Cloud account, Docker environment, workload defined' },
      { milestone: 'Deploy', duration: 'Days 2-3', deliverable: 'Containerized GPU workload running on cloud instance' },
      { milestone: 'Measure', duration: 'Days 4-5', deliverable: 'Overhead measurements and pricing data collected' },
      { milestone: 'Analyze', duration: 'Day 6', deliverable: 'Cost comparison model and deployment strategy' },
      { milestone: 'Report', duration: 'Day 7', deliverable: 'Final report with deployment recommendations' }
    ],
    projectRisks: [
      { risk: 'Free-tier credits exhausted before measurements complete', severity: 'Medium', mitigation: 'Use minimal instance sizes and short test runs; track spending carefully' },
      { risk: 'Spot instances interrupted during measurement', severity: 'Medium', mitigation: 'Run measurements multiple times and use checkpointing for long runs' },
      { risk: 'Cloud pricing changes between project start and end', severity: 'Low', mitigation: 'Document pricing date and use relative comparisons rather than absolute costs' }
    ],
    projectBudget: 'Student time: ~15 hours. Cloud cost: $0-50 (free-tier credits). Docker and toolkit: free. Documentation: ~3 hours.',
    projectTRL: 'TRL 4 — Component validation of containerized GPU workload on cloud infrastructure.',
    questions: [
      { type: 'conceptual', question: 'What is the advantage of running GPU workloads in containers instead of bare metal?', answer: 'Containers provide reproducibility (same environment everywhere), portability (move between cloud providers), isolation (no dependency conflicts), and rapid deployment (launch in seconds vs hours for bare-metal setup). They also enable elastic scaling through orchestration platforms like Kubernetes.', explanation: 'Docker packages the entire software stack — OS libraries, CUDA runtime, application code — into a portable image. NVIDIA Container Toolkit provides GPU passthrough with near-native performance.', commonMistakes: 'Assuming containers add significant GPU overhead. With proper GPU passthrough, overhead is typically under 2%.', tip: 'Containers are the "shipping containers" of software — standardized, portable, and stackable.' },
      { type: 'numerical', question: 'An on-demand GPU instance costs $4/hr. A spot instance costs $1.20/hr with a 10% interruption rate. If a training job runs for 1000 hours, what is the total cost for on-demand vs spot (accounting for re-runs)?', answer: 'On-demand: 1000 × $4 = $4,000. Spot: 1000 × $1.20 = $1,200 base. With 10% interruption, ~100 hours of work must be re-run: 100 × $1.20 = $120 extra. Total spot: $1,320. Savings: ($4,000 - $1,320) / $4,000 = 67%.', explanation: 'Spot instances offer massive savings even with interruptions, provided the workload can checkpoint and resume.', commonMistakes: 'Forgetting to account for re-run costs from interruptions.', tip: 'Spot savings are real but require fault-tolerant checkpointing.' },
      { type: 'application', question: 'When should you choose a TPU over a GPU for a workload?', answer: 'Choose a TPU when the workload is dominated by large matrix multiplications (e.g., Transformer training) that map to TPU matrix multiply units (MXU). TPUs offer better FLOP/s per watt and lower cost for these specific workloads. Choose GPUs for general-purpose compute, mixed workloads, or when CUDA ecosystem compatibility is required.', explanation: 'TPUs are domain-specific accelerators — they trade generality for efficiency on specific operations. The XLA compiler optimizes TensorFlow/JAX code for TPU architecture automatically.', commonMistakes: 'Assuming TPUs are universally faster than GPUs. For non-matrix workloads, GPUs often win.', tip: 'TPU = specialized croissant oven. GPU = general-purpose kitchen. Match the tool to the workload.' },
      { type: 'problemSolving', question: 'A company is spending $50,000/month on cloud GPU instances for model training. Propose three cost-reduction strategies.', answer: '(1) Switch 60% of training to spot instances with checkpointing: saves ~$24,000/month. (2) Use reserved instances for the 40% of always-on inference workloads: saves ~$8,000/month. (3) Optimize training efficiency (mixed precision, gradient accumulation) to reduce total GPU hours by 30%: saves ~$15,000/month. Total potential savings: ~$47,000/month (94%).', explanation: 'Cloud cost optimization combines pricing strategy (spot/reserved), workload optimization (reduce GPU hours), and right-sizing (use appropriate instance types).', commonMistakes: 'Focusing only on instance type without addressing training efficiency.', tip: 'The cheapest GPU hour is the one you don\'t need — optimize the algorithm first.' }
    ],
    labType: 'ai-accelerator',
    keyInsights: ['Cloud GPUs offer flexibility but at a premium over on-premises for high-utilization workloads', 'Spot instances provide 60-90% discount for interruptible workloads with checkpointing', 'Containers provide near-native GPU performance with massive deployment benefits', 'AI accelerators (TPU, Trainium) offer better efficiency for specific workloads than general GPUs', 'The right deployment strategy depends on utilization rate, workload variability, and time-to-deploy'],
    advantages: ['Elastic scaling — provision GPUs on demand, release when done', 'No upfront capital expenditure — pay-per-use pricing', 'Rapid experimentation with different GPU types and configurations', 'Global availability and low-latency edge deployment', 'Managed services (SageMaker, Vertex AI) simplify ML operations'],
    disadvantages: ['Higher per-hour cost than on-premises for sustained high utilization', 'Spot instance interruptions require fault-tolerant workloads', 'Data transfer costs between regions and to/from cloud storage', 'Vendor lock-in through cloud-specific services and APIs', 'Networking overhead in multi-node GPU training on cloud instances'],
    improvements: ['Adopt Kubernetes with GPU scheduling for automatic resource management', 'Use cloud-native profiling tools (CloudWatch, Cloud Monitoring) for production observability', 'Implement multi-cloud strategies to avoid vendor lock-in', 'Leverage carbon-aware scheduling to reduce energy costs and environmental impact'],
    futureScope: 'Serverless GPU computing, confidential GPU computing for sensitive data, photonic GPU interconnects, quantum-GPU hybrid computing, and edge GPU inference on 5G networks.',
    industrialApplications: ['OpenAI training GPT models on Azure GPU clusters', 'Amazon SageMaker for managed ML training and inference', 'Google Cloud TPUs for Transformer-based research', 'NVIDIA DGX Cloud for enterprise AI development', 'Autonomous vehicle perception on cloud-edge GPU pipelines', 'Pharmaceutical drug discovery on cloud GPU clusters (Schrödinger, Recursion)'],
    researchOpportunities: ['Multi-cloud GPU scheduling optimization', 'Cost-aware training that adapts to spot pricing in real time', 'Federated learning on heterogeneous cloud accelerators', 'Energy-efficient cloud GPU deployment and carbon-aware scheduling', 'Performance portability across cloud GPU providers'],
    careerRelevance: ['Cloud HPC Engineer', 'MLOps Engineer', 'GPU Infrastructure Architect', 'Cloud Cost Optimization Analyst', 'AI Platform Engineer', 'DevOps Engineer (GPU workloads)']
  }
];
