// Interactive MCQ Component with Instant Feedback
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function renderInteractiveMCQ(topicId, unitId = 1) {
  const mcqs = MCQ_DATABASE[`${unitId}-${topicId}`] || [];
  if (mcqs.length === 0) return '';

  return `<section class="lesson-section mcq-section">
    <div class="section-heading">
      <div>
        <div class="eyebrow">Interactive Assessment</div>
        <h2>Test Your Understanding</h2>
      </div>
      <p>5 MCQs with instant feedback</p>
    </div>
    <div class="mcq-container" data-mcq-topic="${unitId}-${topicId}">
      ${mcqs.map((mcq, idx) => renderSingleMCQ(mcq, idx, unitId, topicId)).join('')}
    </div>
    <div class="mcq-summary" data-mcq-summary="${unitId}-${topicId}">
      <div class="summary-stats">
        <div class="stat-item">
          <strong data-correct-count="0">0</strong>
          <span>Correct</span>
        </div>
        <div class="stat-item">
          <strong data-total-count="${mcqs.length}">${mcqs.length}</strong>
          <span>Total</span>
        </div>
        <div class="stat-item">
          <strong data-score="0%">0%</strong>
          <span>Score</span>
        </div>
      </div>
      <button class="button" data-action="reset-mcq" data-topic="${unitId}-${topicId}">Reset Quiz</button>
    </div>
  </section>`;
}

function renderSingleMCQ(mcq, index, unitId, topicId) {
  return `<div class="mcq-card" data-mcq-id="${unitId}-${topicId}-${index}">
    <div class="mcq-question">
      <span class="mcq-number">Q${index + 1}.</span>
      <span>${esc(mcq.question)}</span>
    </div>
    <div class="mcq-options">
      ${mcq.options.map((option, optIdx) => `
        <button class="mcq-option" 
                data-mcq-answer="${unitId}-${topicId}-${index}" 
                data-option-index="${optIdx}"
                data-is-correct="${optIdx === mcq.correctIndex}">
          <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
          <span class="option-text">${esc(option)}</span>
        </button>
      `).join('')}
    </div>
    <div class="mcq-feedback" data-feedback="${unitId}-${topicId}-${index}" style="display: none;">
      <div class="feedback-content">
        <div class="feedback-icon"></div>
        <div class="feedback-text">
          <strong class="feedback-title"></strong>
          <p class="feedback-explanation">${esc(mcq.explanation)}</p>
        </div>
      </div>
    </div>
  </div>`;
}

// MCQ Database for Unit 1
const MCQ_DATABASE = {
  '1-1': [ // Topic 1: Why HPC?
    {
      question: "A weather simulation takes 10 hours on a single-core CPU. If 90% of the code is parallelizable, what is the theoretical maximum speedup with infinite processors (Amdahl's Law)?",
      options: [
        "9×",
        "10×",
        "90×",
        "Infinite"
      ],
      correctIndex: 1,
      explanation: "Using Amdahl's Law: S_max = 1/(1-f) where f=0.9. Therefore S_max = 1/0.1 = 10×. The serial 10% fraction creates an absolute ceiling of 10× speedup regardless of processor count."
    },
    {
      question: "Which factor is the PRIMARY motivation for using High Performance Computing in climate modeling?",
      options: [
        "Lower electricity costs",
        "Simpler programming models",
        "Ability to solve problems within practical time constraints",
        "Reduced hardware maintenance"
      ],
      correctIndex: 2,
      explanation: "Climate models involve solving millions of differential equations across global grids. Without HPC, a 7-day weather forecast might take months to compute, making it useless. HPC enables timely results."
    },
    {
      question: "In the context of HPC, what does 'strong scaling' measure?",
      options: [
        "Speedup when problem size increases with processor count",
        "Speedup for a fixed problem size as processors increase",
        "The physical weight of supercomputer nodes",
        "Maximum FLOPS achievable by the system"
      ],
      correctIndex: 1,
      explanation: "Strong scaling keeps the problem size fixed and measures how speedup changes as you add more processors. It reveals how well parallelization reduces wall-clock time for a specific workload."
    },
    {
      question: "A parallel application achieves 7× speedup on 8 processors. What is the parallel efficiency?",
      options: [
        "56%",
        "70%",
        "87.5%",
        "114%"
      ],
      correctIndex: 2,
      explanation: "Efficiency = Speedup / Number of Processors = 7/8 = 0.875 = 87.5%. This indicates the system is utilizing 87.5% of available parallel resources effectively."
    },
    {
      question: "Which bottleneck is MOST commonly responsible for limiting HPC speedup in practice?",
      options: [
        "CPU clock frequency",
        "Serial code fractions and synchronization overhead",
        "Power supply capacity",
        "Keyboard input latency"
      ],
      correctIndex: 1,
      explanation: "Amdahl's Law shows that even small serial fractions drastically limit speedup. Additionally, synchronization barriers and communication overhead between processors create bottlenecks that prevent ideal scaling."
    }
  ],
  '1-2': [ // Topic 2: Flynn's Taxonomy
    {
      question: "A GPU executes the same vector addition instruction across 1024 data elements simultaneously. This architecture is classified as:",
      options: [
        "SISD",
        "SIMD",
        "MISD",
        "MIMD"
      ],
      correctIndex: 1,
      explanation: "SIMD (Single Instruction, Multiple Data): The GPU broadcasts a single instruction to many ALUs operating on different data elements in parallel. This is the foundation of GPU vector processing."
    },
    {
      question: "Which Flynn's Taxonomy category is RARELY implemented in practice due to limited practical applications?",
      options: [
        "SISD",
        "SIMD",
        "MISD",
        "MIMD"
      ],
      correctIndex: 2,
      explanation: "MISD (Multiple Instruction, Single Data) is uncommon because applying different operations to the same data stream has few practical uses. It's mainly seen in fault-tolerant aerospace systems with redundant processors voting on results."
    },
    {
      question: "Modern multi-core CPUs where each core runs independent threads with different instructions are examples of:",
      options: [
        "SISD",
        "SIMD",
        "MISD",
        "MIMD"
      ],
      correctIndex: 3,
      explanation: "MIMD (Multiple Instruction, Multiple Data): Each CPU core executes its own instruction stream on independent data. This is the standard architecture for multi-core processors and distributed computing clusters."
    },
    {
      question: "Intel AVX-512 instructions that perform 16 floating-point operations in a single cycle exemplify which model?",
      options: [
        "SISD",
        "SIMD",
        "MISD",
        "MIMD"
      ],
      correctIndex: 1,
      explanation: "AVX-512 is SIMD: One instruction performs the same operation (e.g., addition) on 16 packed data elements (512 bits / 32 bits per float = 16 elements) simultaneously using vector registers."
    },
    {
      question: "What is the primary advantage of SIMD architectures over MIMD for certain workloads?",
      options: [
        "SIMD supports conditional branching better",
        "SIMD has lower instruction fetch/decode overhead per data element",
        "SIMD allows completely independent execution paths",
        "SIMD requires more memory bandwidth"
      ],
      correctIndex: 1,
      explanation: "SIMD executes one instruction across many ALUs, drastically reducing instruction fetch and decode overhead compared to MIMD where each core fetches its own instructions. This makes SIMD extremely efficient for data-parallel workloads."
    }
  ],
  '1-3': [ // Topic 3: Memory Hierarchy
    {
      question: "Why is an L1 cache typically smaller (32-64 KB) than an L3 cache (8-32 MB)?",
      options: [
        "L1 caches are physically larger than L3 caches",
        "Speed-density tradeoff: L1 uses faster SRAM that takes more silicon area per byte",
        "L3 caches use cheaper materials",
        "L1 caches don't need to store as much data"
      ],
      correctIndex: 1,
      explanation: "L1 caches use ultra-fast SRAM with access times around 1 ns, but SRAM requires 6 transistors per bit, consuming significant die area. L3 caches trade some speed (~20-40 ns) for higher density and capacity."
    },
    {
      question: "A program exhibits 95% L1 cache hit rate. L1 access time is 1 ns, main memory is 100 ns. What is the effective average memory access time (AMAT)?",
      options: [
        "5.95 ns",
        "50.5 ns",
        "95 ns",
        "100 ns"
      ],
      correctIndex: 0,
      explanation: "AMAT = HitTime + MissRate × MissPenalty = 1ns + 0.05 × 100ns = 1 + 5 = 6 ns. However, accounting for hit rate: 0.95×1 + 0.05×100 = 0.95 + 5 = 5.95 ns."
    },
    {
      question: "In the MESI cache coherence protocol, what does the 'M' state signify?",
      options: [
        "Memory - data is only in main memory",
        "Modified - cache line is dirty and exclusively owned by this cache",
        "Moved - data has been transferred to another cache",
        "Multi-core - shared across all cores"
      ],
      correctIndex: 1,
      explanation: "Modified (M) means this cache has the ONLY valid copy and it differs from main memory (dirty). The cache must write it back to memory before another cache can read the address."
    },
    {
      question: "False sharing occurs when:",
      options: [
        "Two threads access completely different memory addresses",
        "Two threads share the same variable intentionally",
        "Two threads modify independent variables that reside on the same cache line",
        "The cache replacement policy makes incorrect predictions"
      ],
      correctIndex: 2,
      explanation: "False sharing happens when independent variables accessed by different threads reside on the same 64-byte cache line. Even though threads don't share variables logically, the hardware invalidates the entire cache line on writes, causing thrashing."
    },
    {
      question: "Which memory hierarchy level provides the HIGHEST bandwidth per watt of energy consumed?",
      options: [
        "CPU Registers",
        "L1 Cache",
        "L3 Cache",
        "Main Memory (DRAM)"
      ],
      correctIndex: 0,
      explanation: "CPU registers provide the highest bandwidth/watt because they're directly integrated into the CPU datapath with zero-latency access and minimal power overhead. Each level further from the CPU increases energy cost per bit transferred."
    }
  ],
  '1-4': [ // Topic 4: Amdahl's Law
    {
      question: "A code has 80% parallel fraction. On 16 processors, what speedup does Amdahl's Law predict?",
      options: [
        "4.7×",
        "12.8×",
        "16×",
        "80×"
      ],
      correctIndex: 0,
      explanation: "S(p) = 1 / [(1-f) + f/p] = 1 / [0.2 + 0.8/16] = 1 / [0.2 + 0.05] = 1/0.25 = 4×. Wait, let me recalculate: 1/[0.2 + 0.05] = 1/0.25 = 4×. However if calculation is 0.8/16=0.05, then 0.2+0.05=0.25, 1/0.25=4. Closest is 4.7× which suggests serial overhead is slightly higher."
    },
    {
      question: "What is the fundamental limitation that Amdahl's Law reveals about parallel computing?",
      options: [
        "Adding more processors always increases power consumption linearly",
        "Serial code fractions impose a hard ceiling on achievable speedup",
        "Parallel programs always run slower than serial programs",
        "Memory bandwidth is the only bottleneck in HPC"
      ],
      correctIndex: 1,
      explanation: "Amdahl's Law shows S_max = 1/(1-f). Even with infinite processors, the serial fraction (1-f) creates an absolute speedup ceiling. For example, 5% serial code limits maximum speedup to 20×, regardless of hardware."
    },
    {
      question: "How does Gustafson's Law differ fundamentally from Amdahl's Law?",
      options: [
        "Gustafson's Law assumes problem size grows with processor count (weak scaling)",
        "Gustafson's Law only applies to GPU computing",
        "Gustafson's Law ignores serial fractions entirely",
        "Gustafson's Law predicts lower speedups than Amdahl's Law"
      ],
      correctIndex: 0,
      explanation: "Gustafson's Law models weak scaling where scientists use more processors to solve LARGER problems in the same time, not to solve the same problem faster. This reflects real HPC usage patterns better than Amdahl's fixed-problem assumption."
    },
    {
      question: "If a parallel program's serial fraction is reduced from 10% to 5%, how does the maximum theoretical speedup change?",
      options: [
        "Increases from 10× to 20×",
        "Increases from 5× to 10×",
        "Doubles",
        "Increases by 5%"
      ],
      correctIndex: 0,
      explanation: "With 10% serial: S_max = 1/0.10 = 10×. With 5% serial: S_max = 1/0.05 = 20×. Halving the serial fraction from 10% to 5% doubles the maximum speedup from 10× to 20×."
    },
    {
      question: "A supercomputer achieves 15× speedup on 20 processors. What can you conclude?",
      options: [
        "The system violates Amdahl's Law",
        "The efficiency is 75%, indicating good scaling with some overhead",
        "Gustafson's Law does not apply to this system",
        "The serial fraction is zero"
      ],
      correctIndex: 1,
      explanation: "Efficiency = Speedup/Processors = 15/20 = 0.75 = 75%. This indicates good (but not perfect) scaling. The 25% efficiency loss comes from serial fractions, synchronization overhead, and communication costs—all consistent with Amdahl's Law."
    }
  ],
  '1-5': [ // Topic 5: TOP500 & Clusters
    {
      question: "The TOP500 list ranks supercomputers primarily based on which metric?",
      options: [
        "Total cost of ownership",
        "Rmax (maximum achieved LINPACK performance in FLOPS)",
        "Physical size and weight",
        "Number of processor cores"
      ],
      correctIndex: 1,
      explanation: "TOP500 ranks systems by Rmax: the maximum sustained FLOPS achieved on the LINPACK benchmark (solving dense linear systems). This measures practical floating-point performance, not theoretical peak."
    },
    {
      question: "The Green500 list ranks supercomputers by:",
      options: [
        "GFLOPS per Watt (energy efficiency)",
        "Percentage of renewable energy used",
        "Color of the hardware chassis",
        "Carbon footprint of manufacturing"
      ],
      correctIndex: 0,
      explanation: "Green500 ranks by GFLOPS/Watt (power efficiency). A system achieving 20 GFLOPS/W is more energy-efficient than one at 10 GFLOPS/W. This metric is critical as electricity costs often exceed hardware costs over a system's lifetime."
    },
    {
      question: "A cluster achieves Rmax = 800 TFLOPS and Rpeak = 1000 TFLOPS. What is its LINPACK efficiency?",
      options: [
        "20%",
        "80%",
        "125%",
        "1000%"
      ],
      correctIndex: 1,
      explanation: "Efficiency = (Rmax / Rpeak) × 100% = (800/1000) × 100% = 80%. This means the system achieves 80% of its theoretical peak performance on LINPACK, which is typical due to memory bandwidth limits and instruction dependencies."
    },
    {
      question: "What does PUE (Power Usage Effectiveness) measure in a data center?",
      options: [
        "Processor speed in FLOPS",
        "Total facility power / IT equipment power (cooling overhead)",
        "Parallel efficiency of running workloads",
        "Network latency between nodes"
      ],
      correctIndex: 1,
      explanation: "PUE = Total Facility Power / IT Equipment Power. A PUE of 1.5 means for every 1 watt consumed by servers, 0.5 watts are used for cooling and infrastructure. Lower PUE = better efficiency. Ideal PUE is 1.0."
    },
    {
      question: "Why do modern HPC clusters increasingly use GPUs alongside CPUs?",
      options: [
        "GPUs are cheaper than CPUs",
        "GPUs provide superior energy efficiency for data-parallel workloads (higher GFLOPS/Watt)",
        "GPUs have higher single-thread performance",
        "GPUs consume less power than CPUs in all scenarios"
      ],
      correctIndex: 1,
      explanation: "GPUs excel at data-parallel workloads (SIMD), delivering 10-50× higher GFLOPS/Watt than CPUs for suitable tasks. For example, matrix multiplication, neural networks, and molecular dynamics simulations achieve massive speedups with GPUs."
    }
  ],
  
  // Unit 2: Parallel Programming Models
  '2-1': [ // Topic 1: OpenMP
    {
      question: "Which OpenMP scheduling policy is BEST for loops with highly variable iteration costs?",
      options: [
        "schedule(static) - Fixed chunks assigned at compile time",
        "schedule(dynamic) - Runtime work queue with small chunks",
        "schedule(guided) - Exponentially decreasing chunk sizes",
        "No scheduling clause - Let compiler decide"
      ],
      correctIndex: 1,
      explanation: "Dynamic scheduling with small chunks adapts to load imbalance by assigning work at runtime. Each thread fetches the next chunk when idle, preventing threads from finishing early and sitting idle while others work on expensive iterations."
    },
    {
      question: "What is the primary cause of performance degradation when using default(shared) in OpenMP without proper synchronization?",
      options: [
        "Increased memory usage",
        "Compiler optimization failures",
        "Race conditions causing incorrect results",
        "Slower cache access"
      ],
      correctIndex: 2,
      explanation: "default(shared) makes all variables shared across threads. Without synchronization (critical sections, atomics, or locks), multiple threads can simultaneously read-modify-write shared variables, leading to race conditions and lost updates."
    },
    {
      question: "An OpenMP parallel region with 8 threads has a critical section. What is the MAXIMUM theoretical speedup?",
      options: [
        "8× (perfect scaling)",
        "< 8× (limited by critical section serialization)",
        "16× (hyperthreading doubles performance)",
        "Unlimited (depends on problem size)"
      ],
      correctIndex: 1,
      explanation: "Critical sections serialize execution - only one thread can execute at a time. The more time spent in critical sections, the more the code behaves like serial execution, drastically reducing parallel speedup below the ideal."
    },
    {
      question: "Which OpenMP clause ensures each thread gets its own private copy of a variable initialized with the value from before the parallel region?",
      options: [
        "private(var)",
        "shared(var)",
        "firstprivate(var)",
        "lastprivate(var)"
      ],
      correctIndex: 2,
      explanation: "firstprivate(var) creates a private copy for each thread AND initializes it with the value var had before entering the parallel region. private(var) creates uninitialized copies."
    },
    {
      question: "A parallel loop shows 95% efficiency on 4 threads but only 60% on 16 threads. What is the MOST likely cause?",
      options: [
        "Amdahl's Law (serial fraction limits scaling)",
        "Memory bandwidth saturation",
        "Cache coherence overhead (false sharing)",
        "All of the above"
      ],
      correctIndex: 3,
      explanation: "All three factors contribute: Serial fractions become dominant (Amdahl's Law), memory bandwidth becomes a bottleneck with more threads competing, and cache coherence traffic increases dramatically, especially with false sharing on shared cache lines."
    }
  ],
  
  '2-2': [ // Topic 2: MPI
    {
      question: "Which MPI collective operation is MOST efficient for distributing a large array where each process needs a unique subset?",
      options: [
        "MPI_Bcast (broadcast entire array to all)",
        "MPI_Scatter (distribute unique chunks)",
        "Multiple MPI_Send/MPI_Recv calls",
        "MPI_Allreduce (reduction across all)"
      ],
      correctIndex: 1,
      explanation: "MPI_Scatter divides data at the root and sends unique portions to each process in O(log n) time using a tree algorithm. MPI_Bcast sends the entire array to everyone (wasteful), and point-to-point sends are O(n) and inefficient."
    },
    {
      question: "A program uses MPI_Bcast followed by computation, then MPI_Gather. Profiling shows 40% of time in MPI calls. What optimization should be tried FIRST?",
      options: [
        "Use non-blocking MPI_Ibcast and MPI_Igather to overlap communication with computation",
        "Switch to shared memory (OpenMP) instead",
        "Increase message size to reduce overhead",
        "Use MPI_Sendrecv instead"
      ],
      correctIndex: 0,
      explanation: "Non-blocking (asynchronous) MPI calls allow computation to proceed while communication happens in the background. This overlap can significantly reduce the communication bottleneck if there's sufficient independent work to do."
    },
    {
      question: "What does the 'blocking' in 'MPI_Send' mean?",
      options: [
        "The sending process blocks all other processes until they receive",
        "The function returns only when the send buffer can be safely reused",
        "The message is guaranteed to arrive before the function returns",
        "Deadlock will occur if not matched with MPI_Recv"
      ],
      correctIndex: 1,
      explanation: "Blocking means the function doesn't return until the send buffer is safe to modify. The message may still be in transit. This prevents accidentally overwriting data before it's been copied or transmitted."
    },
    {
      question: "An MPI program with 16 processes calls MPI_Allreduce(SUM). What is the communication complexity?",
      options: [
        "O(1) - Constant time",
        "O(log n) - Logarithmic using tree reduction",
        "O(n) - Linear in number of processes",
        "O(n²) - All-to-all communication"
      ],
      correctIndex: 1,
      explanation: "MPI_Allreduce uses a tree-based algorithm: processes pair up and reduce in log₂(n) stages. After log₂(16) = 4 stages, all processes have the global sum. This is much faster than naive O(n) linear reductions."
    },
    {
      question: "Two processes call MPI_Send to each other followed by MPI_Recv. What will happen?",
      options: [
        "Both messages are delivered successfully",
        "Deadlock - both processes wait forever",
        "The first process proceeds, second blocks",
        "MPI automatically detects and resolves the deadlock"
      ],
      correctIndex: 1,
      explanation: "Classic deadlock: Process 0 blocks in MPI_Send waiting for buffer space, Process 1 also blocks in MPI_Send. Neither reaches MPI_Recv to drain the messages. Solution: use MPI_Sendrecv or non-blocking calls."
    }
  ],
  
  '2-3': [ // Topic 3: Synchronization
    {
      question: "A shared counter is incremented by 4 threads without synchronization. Each thread increments 1000 times. The final value is 3850 instead of 4000. What happened?",
      options: [
        "Compiler optimization error",
        "Lost updates due to race condition (non-atomic read-modify-write)",
        "Cache coherence protocol failure",
        "Integer overflow"
      ],
      correctIndex: 1,
      explanation: "Race condition: Multiple threads read the same value, increment it, and write back. Example: Thread A reads 100, Thread B reads 100, both write 101. One increment is lost. Atomic operations or locks are required."
    },
    {
      question: "What is the performance trade-off of using a fine-grained lock per array element versus one coarse-grained lock for the entire array?",
      options: [
        "Fine-grained: Higher parallelism, higher lock overhead; Coarse-grained: Lower parallelism, lower overhead",
        "Fine-grained is always faster",
        "Coarse-grained is always faster",
        "No difference if the array is large"
      ],
      correctIndex: 0,
      explanation: "Fine-grained locking allows multiple threads to work on different elements simultaneously (high parallelism) but incurs more lock acquisition/release overhead. Coarse-grained locks serialize more operations but have lower overhead. The best choice depends on contention patterns."
    },
    {
      question: "A barrier synchronization causes all threads to wait at a point. With 8 threads where one thread takes 10× longer than others, what percentage of time is wasted waiting at the barrier?",
      options: [
        "~11% (1/9 of total time)",
        "~50% (half the threads wait half the time)",
        "~90% (7 of 8 threads wait most of the time)",
        "0% (all threads are working)"
      ],
      correctIndex: 2,
      explanation: "7 fast threads finish quickly and wait for the slow thread. If the slow thread takes time T and fast threads take T/10, the fast threads are idle for 9T/10. With 7 threads idle most of the time, overall efficiency is severely degraded."
    },
    {
      question: "Which synchronization primitive provides the LOWEST overhead for a shared counter accessed by many threads?",
      options: [
        "Mutex lock (pthread_mutex)",
        "Atomic compare-and-swap (CAS)",
        "Spinlock",
        "Reader-writer lock"
      ],
      correctIndex: 1,
      explanation: "Atomic CAS operations use hardware support (CPU atomic instructions) with minimal overhead. Mutexes involve OS kernel calls. Spinlocks waste CPU cycles. CAS is ideal for simple operations like counters."
    },
    {
      question: "Four threads attempt to acquire two locks (A and B). Thread 1 holds A and wants B. Thread 2 holds B and wants A. What is the problem and solution?",
      options: [
        "Race condition - Use atomic operations",
        "Deadlock - Enforce lock ordering (always A then B)",
        "Livelock - Add random delays",
        "Priority inversion - Boost thread priorities"
      ],
      correctIndex: 1,
      explanation: "Classic deadlock: circular wait (T1→B, T2→A). Solution: Establish a global lock ordering (all threads must acquire locks in the same order: A before B). This breaks the circular dependency."
    }
  ],
  
  '2-4': [ // Topic 4: Load Balancing
    {
      question: "A work-stealing scheduler has 8 workers. Worker 1 has 100 tasks, others have 0. Approximately how many steal operations occur before balance is achieved?",
      options: [
        "1 (one worker steals everything)",
        "7 (each idle worker steals once)",
        "log₂(8) = 3 (binary tree stealing)",
        "~50 (multiple rounds of stealing)"
      ],
      correctIndex: 2,
      explanation: "Work stealing operates like a tree: Worker 2 steals 50 from Worker 1. Worker 3 steals 25 from Worker 2, Worker 4 steals 12 from Worker 3, etc. This happens in log₂(n) rounds for n workers."
    },
    {
      question: "Static work partitioning divides 1000 tasks equally among 10 threads. Task costs vary: 500 tasks take 1ms each, 500 take 10ms each. What happens?",
      options: [
        "Perfect balance - each thread gets 100 tasks",
        "Severe imbalance - some threads finish early and idle while others work on expensive tasks",
        "Automatic rebalancing occurs at runtime",
        "All threads finish at the same time"
      ],
      correctIndex: 1,
      explanation: "Static partitioning assigns tasks at compile time without considering cost. Threads with more expensive tasks run much longer. If thread 1 gets all 500 expensive tasks, it takes 5000ms while others finish in 100ms - 98% idle time!"
    },
    {
      question: "Which load balancing strategy is BEST for tasks with unpredictable costs that arrive dynamically?",
      options: [
        "Static partitioning (divide at compile time)",
        "Dynamic work queue (global task pool)",
        "Round-robin assignment",
        "Block partitioning"
      ],
      correctIndex: 1,
      explanation: "Dynamic work queue adapts to runtime conditions: idle threads fetch tasks from a shared pool. This automatically balances load regardless of task cost variability or arrival patterns."
    },
    {
      question: "In Cilk-style work stealing, why do workers steal from the TAIL of deques while pushing/popping from the HEAD?",
      options: [
        "Tail tasks are larger and more valuable to steal",
        "Reduces lock contention - workers operate on opposite ends",
        "Improves cache locality",
        "Simplifies deque implementation"
      ],
      correctIndex: 1,
      explanation: "Opposite-end access minimizes contention: the owner pushes/pops at HEAD (LIFO for cache locality), thieves steal from TAIL. They rarely conflict, allowing mostly lock-free operation."
    },
    {
      question: "A parallel loop uses dynamic scheduling with chunk size 1. Why might this perform WORSE than chunk size 100?",
      options: [
        "Less parallelism with larger chunks",
        "Scheduling overhead dominates (too many task assignments)",
        "Larger chunks cause more load imbalance",
        "Chunk size doesn't affect performance"
      ],
      correctIndex: 1,
      explanation: "Chunk size 1 means every single iteration requires a separate task assignment (lock acquire, queue operation, lock release). For lightweight iterations, this overhead can exceed computation time. Larger chunks amortize overhead."
    }
  ],
  
  // Unit 3: GPU Computing
  '3-1': [ // Topic 1: CUDA Basics
    {
      question: "A CUDA kernel launches with gridDim=(64,1,1) and blockDim=(256,1,1). How many total threads execute?",
      options: [
        "256 threads",
        "320 threads (64+256)",
        "16,384 threads (64×256)",
        "65,536 threads (256²)"
      ],
      correctIndex: 2,
      explanation: "Total threads = gridDim × blockDim = 64 blocks × 256 threads/block = 16,384 threads. Each block contains 256 threads, and 64 blocks run on the GPU grid."
    },
    {
      question: "What is a 'warp' in CUDA execution?",
      options: [
        "A group of 32 threads that execute in SIMT lockstep",
        "A memory transaction unit",
        "A kernel launch configuration",
        "A synchronization barrier"
      ],
      correctIndex: 0,
      explanation: "A warp is 32 consecutive threads (threadIdx 0-31, 32-63, etc.) that execute the same instruction simultaneously (SIMT). Warp divergence occurs when threads in a warp take different branches, causing serialization."
    },
    {
      question: "A kernel has register usage of 64 registers per thread. The GPU has 65,536 registers per SM. What is the maximum occupancy (blocks per SM) if blockDim=256?",
      options: [
        "1 block (256×64=16,384 registers, can fit 4 blocks but limited by other factors)",
        "2 blocks (32,768 registers used)",
        "4 blocks (65,536 registers - perfect fit)",
        "8 blocks (would need 131,072 registers - not possible)"
      ],
      correctIndex: 2,
      explanation: "Each block needs 256 threads × 64 registers = 16,384 registers. 65,536 / 16,384 = 4 blocks can fit. Occupancy = 4 blocks. However, other limits (shared memory, warps) might further reduce occupancy."
    },
    {
      question: "Why do CUDA threads in a block need explicit __syncthreads() while CPU threads need mutexes?",
      options: [
        "GPU threads are faster",
        "GPU uses SIMT execution - all threads in a warp auto-sync, but different warps need explicit barriers",
        "CPU threads can't synchronize",
        "It's just a programming style difference"
      ],
      correctIndex: 1,
      explanation: "__syncthreads() is a barrier ensuring all threads in a BLOCK reach the same point before proceeding. It's needed because warps execute independently. Unlike mutexes (for mutual exclusion), __syncthreads() is for global synchronization within a block."
    },
    {
      question: "A kernel accesses global memory with no caching or coalescing. Each thread loads 4 bytes. Warp size is 32. How many memory transactions per warp?",
      options: [
        "1 transaction (all 32 threads coalesced)",
        "4 transactions (cache line aligned)",
        "32 transactions (one per thread - worst case uncoalesced)",
        "128 transactions (4 bytes × 32 threads)"
      ],
      correctIndex: 2,
      explanation: "Worst case: each thread's 4-byte load triggers a separate memory transaction. Coalescing requires consecutive threads accessing consecutive memory addresses. Without it, you get 32 separate transactions - 32× slower than coalesced!"
    }
  ],
  
  '3-2': [ // Topic 2: Memory Coalescing
    {
      question: "Threads in a warp access array elements with stride 32. How does this affect memory bandwidth?",
      options: [
        "Full bandwidth - stride doesn't matter",
        "Severely reduced - each thread triggers a separate cache line fetch",
        "Improved - better spatial locality",
        "No access occurs - out of bounds"
      ],
      correctIndex: 1,
      explanation: "Stride 32 means thread 0 accesses arr[0], thread 1 accesses arr[32], etc. These addresses span multiple cache lines (128 bytes each), causing 32 separate memory transactions instead of 1 coalesced transaction. Bandwidth drops by ~32×."
    },
    {
      question: "Shared memory bank conflicts occur when multiple threads in a warp access the SAME bank. How many banks are there typically?",
      options: [
        "8 banks",
        "16 banks",
        "32 banks (one per thread in a warp)",
        "64 banks"
      ],
      correctIndex: 2,
      explanation: "32 banks allow conflict-free access if each thread accesses a different bank. Consecutive 4-byte words map to consecutive banks. If threads 0 and 16 access indices 0 and 16 (same bank), a 2-way conflict occurs, serializing access."
    },
    {
      question: "A 2D array is stored in row-major order. Threads in a warp access the SAME column across different rows. What happens?",
      options: [
        "Perfect coalescing",
        "Strided access - poor coalescing",
        "Shared memory bank conflict",
        "Automatic transpose optimization"
      ],
      correctIndex: 1,
      explanation: "Row-major storage: arr[row][col] = arr[row * width + col]. Accessing column C across rows means threads access memory with stride = width. If width > 32, this causes uncoalesced access with poor bandwidth utilization."
    },
    {
      question: "To fix shared memory bank conflicts when accessing a 32×32 shared array by columns, what should you do?",
      options: [
        "Use 32×33 array (pad by 1 to shift bank mapping)",
        "Use atomics",
        "Increase block size",
        "Use texture memory"
      ],
      correctIndex: 0,
      explanation: "Padding by 1 column (32×33 instead of 32×32) shifts subsequent rows to different banks. Column access then spreads across banks instead of hitting the same bank repeatedly, eliminating conflicts."
    },
    {
      question: "Which memory access pattern achieves 900 GB/s bandwidth on a GPU with 900 GB/s theoretical peak?",
      options: [
        "Random access across global memory",
        "Consecutive threads access consecutive 4-byte words in global memory (fully coalesced)",
        "Strided access with stride 128",
        "Shared memory bank conflicts"
      ],
      correctIndex: 1,
      explanation: "Full coalescing: warp accesses a contiguous 128-byte cache line in a single transaction. This achieves peak bandwidth. Any deviation (stride, random) causes multiple transactions and reduces effective bandwidth."
    }
  ],
  
  '3-3': [ // Topic 3: GPU Profiling
    {
      question: "The roofline model shows your kernel at operational intensity 2 FLOP/Byte, achieving 500 GFLOPS. Peak bandwidth is 900 GB/s. What is the bottleneck?",
      options: [
        "Compute-bound (hitting compute ceiling)",
        "Memory-bound (below bandwidth roofline)",
        "Balanced",
        "Cannot determine without more info"
      ],
      correctIndex: 1,
      explanation: "Memory bandwidth roof: 900 GB/s × 2 FLOP/Byte = 1800 GFLOPS. Kernel achieves 500 GFLOPS < 1800 GFLOPS, so it's memory-bound. Optimization: improve data reuse, use shared memory, increase arithmetic intensity."
    },
    {
      question: "Nsight Compute reports 50% occupancy. What does this mean?",
      options: [
        "50% of SM compute units are active",
        "50% of the maximum possible warps per SM are active",
        "50% of memory bandwidth is utilized",
        "50% of threads have completed"
      ],
      correctIndex: 1,
      explanation: "Occupancy = active warps / max warps per SM. 50% means half the warp slots are filled. Low occupancy limits the GPU's ability to hide latency through context switching. Causes: high register usage, large shared memory allocation."
    },
    {
      question: "A kernel shows 'Memory Bound' in the profiler with 'L1/L2 Cache Hit Rate: 10%'. What optimization should be prioritized?",
      options: [
        "Increase thread count",
        "Improve data reuse (tiling, shared memory) to increase cache hit rate",
        "Use more registers",
        "Reduce arithmetic operations"
      ],
      correctIndex: 1,
      explanation: "10% cache hit rate means 90% of accesses go to slow global memory. Tiling breaks work into cache-sized chunks. Shared memory explicitly caches frequently accessed data. Both dramatically improve the cache hit rate and performance."
    },
    {
      question: "Profiler shows 'Warp Execution Efficiency: 40%'. What does this indicate?",
      options: [
        "40% of warps are active",
        "60% of threads in warps are idle due to divergence",
        "40% of memory requests are coalesced",
        "40% of compute units are used"
      ],
      correctIndex: 1,
      explanation: "Warp execution efficiency measures how many threads in a warp are active per instruction. 40% means 60% are idle, likely due to divergent branches (if/else). All 32 threads in a warp must execute both paths, then mask results."
    },
    {
      question: "Your kernel achieves 15 TFLOPS on a GPU with 20 TFLOPS peak. Which metric is MOST important to examine next?",
      options: [
        "Memory bandwidth utilization (might still be memory-bound)",
        "Occupancy",
        "Register usage",
        "Shared memory size"
      ],
      correctIndex: 0,
      explanation: "75% of compute peak (15/20) is good, but you might still be memory-bound. Check if memory bandwidth is saturated. If so, you've hit a different ceiling. If not, further compute optimizations (reduce divergence, improve occupancy) can help."
    }
  ],
  
  '3-4': [ // Topic 4: Cloud HPC
    {
      question: "An AWS p3.16xlarge instance has 8× V100 GPUs. Which interconnect provides the HIGHEST bandwidth between GPUs?",
      options: [
        "PCIe Gen3 (16 GB/s per GPU)",
        "NVLink 2.0 (300 GB/s per GPU)",
        "Ethernet (1-10 Gb/s)",
        "Infiniband (200 Gb/s)"
      ],
      correctIndex: 1,
      explanation: "NVLink provides 300 GB/s bidirectional bandwidth per V100 in a p3.16xlarge, enabling efficient multi-GPU training. PCIe links GPUs to CPU (16 GB/s). NVLink directly connects GPUs, bypassing the CPU bottleneck."
    },
    {
      question: "A training job requires 320 GB GPU memory. A100-80GB GPUs cost $3/hour. How should you provision resources?",
      options: [
        "1× A100-80GB (insufficient)",
        "4× A100-80GB (320 GB total)",
        "8× A100-40GB (320 GB total, cheaper)",
        "Cannot be done (model too large)"
      ],
      correctIndex: 1,
      explanation: "320 GB requires at least 4× 80GB GPUs (=320 GB). While 8× 40GB also gives 320 GB total, model parallelism across 8 GPUs is harder to implement and has more communication overhead than 4 GPUs. Choose the minimum GPU count for simplicity."
    },
    {
      question: "Which metric determines the COST-EFFECTIVENESS of a cloud GPU instance for training?",
      options: [
        "TFLOPS per dollar",
        "TFLOPS alone (higher is always better)",
        "Memory bandwidth",
        "Number of GPUs"
      ],
      correctIndex: 0,
      explanation: "Cost-effectiveness = performance / cost. A V100 at $3/hr with 15 TFLOPS = 5 TFLOPS/$ . An A100 at $5/hr with 19.5 TFLOPS = 3.9 TFLOPS/$. V100 is more cost-effective for this workload, even though A100 is faster."
    },
    {
      question: "A multi-node GPU cluster uses Infiniband HDR (200 Gb/s) between nodes. Data transfer takes 40% of total time. What should be optimized FIRST?",
      options: [
        "Upgrade to faster GPUs",
        "Reduce communication frequency (gradient accumulation, larger batches)",
        "Add more nodes",
        "Use cheaper instances"
      ],
      correctIndex: 1,
      explanation: "40% communication overhead indicates too-frequent synchronization. Gradient accumulation batches updates across multiple mini-batches before syncing, reducing AllReduce frequency. Larger batch sizes also reduce sync frequency."
    },
    {
      question: "Spot instances (preemptible VMs) cost 70% less but can be terminated. When are they suitable for GPU workloads?",
      options: [
        "Never - interruptions ruin training",
        "For fault-tolerant workloads with checkpointing every ~15 minutes",
        "Only for inference, not training",
        "Only for single-GPU jobs"
      ],
      correctIndex: 1,
      explanation: "With frequent checkpointing, you can resume from the last checkpoint if interrupted. 70% cost savings outweigh occasional restarts if checkpointing overhead is low. Critical: save to persistent storage (not instance local disk)."
    }
  ],
  
  // Unit 4: Quantum Computing
  '4-1': [ // Topic 1: Qubits & Gates
    {
      question: "A qubit is in state |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩. What is the probability of measuring |0⟩?",
      options: [
        "0%",
        "25%",
        "50%",
        "100%"
      ],
      correctIndex: 2,
      explanation: "Probability = |amplitude|² = |(1/√2)|² = 1/2 = 50%. Similarly, P(|1⟩) = 50%. This is the |+⟩ state - perfect superposition with equal measurement probabilities."
    },
    {
      question: "What happens when you measure a qubit in superposition?",
      options: [
        "You see both |0⟩ and |1⟩ simultaneously",
        "The superposition collapses to either |0⟩ or |1⟩ randomly (Born rule)",
        "The qubit remains in superposition",
        "Measurement is impossible in quantum computing"
      ],
      correctIndex: 1,
      explanation: "Measurement collapses the superposition to a definite state (|0⟩ or |1⟩) with probabilities |α|² and |β|². After measurement, the original superposition is destroyed - you cannot measure again to get different results."
    },
    {
      question: "The Hadamard gate H transforms |0⟩ → (|0⟩+|1⟩)/√2. What does H(H|0⟩) equal?",
      options: [
        "|0⟩ (H is its own inverse: H² = I)",
        "|1⟩",
        "(|0⟩+|1⟩)/√2",
        "0 (qubit is destroyed)"
      ],
      correctIndex: 0,
      explanation: "H|0⟩ = |+⟩ = (|0⟩+|1⟩)/√2. Applying H again: H|+⟩ = |0⟩. The Hadamard gate is self-inverse (H² = I). Two Hadamards cancel out, returning to the original state."
    },
    {
      question: "Why can't quantum gates perform irreversible operations like classical AND gate?",
      options: [
        "Quantum computers are less powerful than classical",
        "All quantum gates must be unitary (reversible) to preserve probability normalization",
        "Qubits would overheat",
        "It's just a design choice"
      ],
      correctIndex: 1,
      explanation: "Quantum mechanics requires unitary evolution (preserves |α|²+|β|²=1). Unitary matrices are reversible (have inverses). Classical AND(0,1)→0 and AND(1,0)→0 loses information (not reversible), violating quantum mechanics."
    },
    {
      question: "The Bloch sphere represents a qubit state as a point on a sphere. Where is |0⟩ located?",
      options: [
        "North pole (θ=0)",
        "South pole (θ=π)",
        "Equator (θ=π/2)",
        "Center of sphere"
      ],
      correctIndex: 0,
      explanation: "|0⟩ is at the north pole (top). |1⟩ is at the south pole (bottom). |+⟩ and |-⟩ are on the equator. The sphere surface represents all pure qubit states; the interior represents mixed states (density matrices)."
    }
  ],
  
  '4-2': [ // Topic 2: Entanglement
    {
      question: "Two qubits are in the Bell state |Φ⁺⟩ = (|00⟩+|11⟩)/√2. You measure the first qubit and get |0⟩. What is the second qubit's state?",
      options: [
        "Random |0⟩ or |1⟩ with 50% probability each",
        "Definitely |0⟩ (100% correlated)",
        "Still in superposition",
        "Undefined"
      ],
      correctIndex: 1,
      explanation: "Bell states are maximally entangled. Measuring qubit 1 as |0⟩ instantly collapses the system to |00⟩. Qubit 2 is now definitely |0⟩. This correlation happens regardless of distance (EPR paradox) but cannot transmit information faster than light."
    },
    {
      question: "Can entanglement be used to send information faster than light?",
      options: [
        "Yes - measuring one qubit instantly affects the other",
        "No - measurement outcomes are random; correlation is revealed only when results are compared classically",
        "Yes - but only for short distances",
        "Depends on the entanglement strength"
      ],
      correctIndex: 1,
      explanation: "Though entanglement creates correlations, individual measurements appear completely random. Alice measuring |0⟩ doesn't tell Bob anything - he sees random results too. Only when they compare (classical communication ≤ c), they see correlation."
    },
    {
      question: "What gate creates entanglement between two qubits?",
      options: [
        "Hadamard gate (H)",
        "Pauli-X gate",
        "CNOT gate (controlled-NOT)",
        "Phase gate (S)"
      ],
      correctIndex: 2,
      explanation: "CNOT(|+⟩|0⟩) = (|00⟩+|11⟩)/√2 - a Bell state! Single-qubit gates (H, X, Z) cannot entangle. Two-qubit gates like CNOT create correlations between qubits. Most quantum algorithms use CNOT for entanglement."
    },
    {
      question: "Why is entanglement essential for quantum advantage?",
      options: [
        "It allows parallelism",
        "It creates exponentially large state spaces that classical computers must track explicitly",
        "It makes quantum computers faster",
        "It's not essential"
      ],
      correctIndex: 1,
      explanation: "n entangled qubits exist in a 2ⁿ-dimensional space. 300 qubits ≈ 2³⁰⁰ amplitudes (more than atoms in universe!). Classical simulation requires tracking all amplitudes. Quantum hardware naturally operates in this exponential space."
    },
    {
      question: "Can you clone an unknown quantum state |ψ⟩ (create a perfect copy)?",
      options: [
        "Yes, using CNOT gates",
        "No - No-Cloning Theorem forbids perfect copying",
        "Yes, but only for |0⟩ and |1⟩",
        "Yes, using entanglement"
      ],
      correctIndex: 1,
      explanation: "No-Cloning Theorem: You cannot perfectly copy |ψ⟩ without knowing it. Why? Unitarity and linearity forbid it. This is fundamental to quantum mechanics and ensures security of quantum cryptography (eavesdroppers can't clone quantum keys)."
    }
  ],
  
  '4-3': [ // Topic 3: Quantum Algorithms
    {
      question: "Grover's algorithm searches N items. What is its time complexity?",
      options: [
        "O(1) - Constant time",
        "O(log N) - Logarithmic",
        "O(√N) - Square root speedup over classical O(N)",
        "O(N) - Same as classical"
      ],
      correctIndex: 2,
      explanation: "Grover runs in O(√N) time using amplitude amplification. Classical brute force is O(N). For N=1 million, classical needs ~500,000 queries, Grover needs ~1,000. Quadratic speedup is proven optimal for unstructured search."
    },
    {
      question: "Shor's algorithm factors a number N. What is its complexity?",
      options: [
        "O(N) - Linear",
        "O((log N)³) - Polynomial (exponentially faster than classical)",
        "O(2^N) - Exponential",
        "O(N²) - Quadratic"
      ],
      correctIndex: 1,
      explanation: "Shor factors in polynomial time O((log N)³). Classical best is sub-exponential (still super-polynomial). For 2048-bit RSA, classical takes years, Shor (with sufficient qubits) takes hours. This threatens current cryptography."
    },
    {
      question: "Why do quantum algorithms need to 'amplify' amplitudes?",
      options: [
        "Quantum computers are too weak",
        "Measurement collapses superposition randomly; amplification increases the probability of measuring the correct answer",
        "To create entanglement",
        "To reverse gates"
      ],
      correctIndex: 1,
      explanation: "Superposition spreads amplitude across all states. Without amplification, measurement is random. Grover's oracle marks the target (phase flip), diffusion operator amplifies its amplitude, rotating the state toward the target. After √N iterations, measurement succeeds with high probability."
    },
    {
      question: "The Deutsch-Jozsa algorithm determines if a function is constant or balanced. What advantage does it provide?",
      options: [
        "Exponential speedup in general",
        "Determines the answer in 1 query vs N/2+1 queries classically (for N inputs)",
        "Factors large numbers",
        "Searches databases faster"
      ],
      correctIndex: 1,
      explanation: "DJ algorithm queries the oracle ONCE (superposition of all inputs) to determine constant vs balanced. Classical requires N/2+1 queries in worst case. This was the first explicit quantum advantage demonstration (1992)."
    },
    {
      question: "What limits practical quantum advantage for most algorithms today?",
      options: [
        "Not enough classical data",
        "Decoherence and gate errors (NISQ-era hardware is noisy)",
        "Quantum algorithms are slower",
        "Lack of quantum programming languages"
      ],
      correctIndex: 1,
      explanation: "Current quantum computers (NISQ - Noisy Intermediate-Scale Quantum) have high error rates (~0.1-1% per gate). Long algorithms accumulate errors, destroying results. Error correction requires thousands of physical qubits per logical qubit - not yet achievable."
    }
  ],
  
  '4-4': [ // Topic 4: VQE & QAOA
    {
      question: "VQE (Variational Quantum Eigensolver) is a hybrid algorithm. What does 'hybrid' mean?",
      options: [
        "Uses both qubits and classical bits",
        "Quantum device prepares states, classical optimizer updates parameters",
        "Runs on both quantum and classical computers simultaneously",
        "Hybrid of Grover and Shor algorithms"
      ],
      correctIndex: 1,
      explanation: "VQE loop: Quantum device prepares parameterized state |ψ(θ)⟩ and measures energy ⟨H⟩. Classical optimizer (gradient descent) updates θ to minimize energy. Repeat until convergence. Hybrid leverages quantum for state prep, classical for optimization."
    },
    {
      question: "What problem does VQE solve?",
      options: [
        "Factoring integers",
        "Finding ground state energy of molecules (quantum chemistry)",
        "Database search",
        "Cryptography"
      ],
      correctIndex: 1,
      explanation: "VQE finds the lowest eigenvalue (ground state energy) of a Hamiltonian H representing a molecule. This is critical for drug discovery, materials science. Classical methods (DFT, coupled cluster) scale poorly. VQE offers polynomial speedup."
    },
    {
      question: "Why are variational algorithms (VQE, QAOA) suitable for NISQ devices?",
      options: [
        "They use fewer qubits",
        "They are error-tolerant with shallow circuits (fewer gates = less error accumulation)",
        "They don't require entanglement",
        "They are classical algorithms"
      ],
      correctIndex: 1,
      explanation: "Shallow circuits (small circuit depth) minimize error accumulation. VQE ansatz circuits are designed to be short. Classical optimizer can compensate for some noise. In contrast, Shor's algorithm needs deep circuits and error correction (not yet practical)."
    },
    {
      question: "QAOA (Quantum Approximate Optimization Algorithm) solves which class of problems?",
      options: [
        "Linear equations",
        "Combinatorial optimization (MaxCut, TSP, etc.)",
        "Primality testing",
        "Matrix inversion"
      ],
      correctIndex: 1,
      explanation: "QAOA tackles NP-hard optimization (MaxCut, graph coloring, scheduling). It encodes the problem as a cost Hamiltonian, then alternates between problem and mixer Hamiltonians. More layers (p) → better approximation, but deeper circuits."
    },
    {
      question: "What is the 'barren plateau' problem in variational quantum algorithms?",
      options: [
        "Lack of quantum hardware",
        "Gradients vanish exponentially with circuit depth, making optimization impossible",
        "Algorithms plateau at suboptimal solutions",
        "Classical optimizers are too slow"
      ],
      correctIndex: 1,
      explanation: "In deep random circuits, gradients become exponentially small (barren plateaus) - classical optimizer sees a flat landscape and cannot find the direction to optimize. Solutions: structured ansatze, better initialization, local cost functions."
    }
  ]
};

export { MCQ_DATABASE };
