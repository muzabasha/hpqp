// 60 Open-Ended TRL 4 Proof-of-Concept Student Projects with Detailed Instructions

export const STUDENT_PROJECTS = [];

const projectTemplates = [
  // UNIT 1 PROJECTS (1-15)
  { u: 1, title: 'Multi-Core Benchmark Suite & Amdahl Analyzer', domain: 'HPC Foundations', tech: 'Python / C++ Multiprocessing' },
  { u: 1, title: 'Cache Line False Sharing Profiler & Alignment Tool', domain: 'HPC Foundations', tech: 'C++17 / Pthreads / Valgrind' },
  { u: 1, title: 'MESI Cache Coherence Protocol Simulator', domain: 'HPC Foundations', tech: 'Python / Discrete Event Sim' },
  { u: 1, title: 'Gustafson Weak Scaling Analyzer for Large Meshes', domain: 'HPC Foundations', tech: 'C++ / OpenMP' },
  { u: 1, title: 'TOP500 Cluster Energy & Green500 Metric Calculator', domain: 'HPC Foundations', tech: 'Python / Streamlit / NumPy' },
  { u: 1, title: 'Flynn Taxonomy SIMD Vectorization Inspector', domain: 'HPC Foundations', tech: 'C++ AVX2 / GCC Intrinsics' },
  { u: 1, title: 'Roofline Model Auto-Generator for Multi-Core CPUs', domain: 'HPC Foundations', tech: 'Python / LIKWID / C++' },
  { u: 1, title: 'Interconnect Latency & Bandwidth Benchmarking Tool', domain: 'HPC Foundations', tech: 'C++ / Sockets / Ping-Pong' },
  { u: 1, title: 'High-Throughput Matrix Multiply Cache Tiling Engine', domain: 'HPC Foundations', tech: 'C / Cachegrind' },
  { u: 1, title: 'Parallel File I/O Throughput Benchmarker (POSIX vs HDF5)', domain: 'HPC Foundations', tech: 'C++ / HDF5' },
  { u: 1, title: 'CPU Power Usage Effectiveness (PUE) Dynamic Monitor', domain: 'HPC Foundations', tech: 'Python / RAPL Sensors' },
  { u: 1, title: 'Strong vs Weak Scaling Mesh Refinement Simulator', domain: 'HPC Foundations', tech: 'Python / SciPy / Matplotlib' },
  { u: 1, title: 'NUMA Node Memory Bandwidth Locality Analyzer', domain: 'HPC Foundations', tech: 'C++ / libnuma' },
  { u: 1, title: 'Instruction-Level Parallelism (ILP) Pipeline Visualizer', domain: 'HPC Foundations', tech: 'JavaScript / Python' },
  { u: 1, title: 'HPC Node Architecture Tradeoff Estimator Tool', domain: 'HPC Foundations', tech: 'Python / Pandas' },

  // UNIT 2 PROJECTS (16-30)
  { u: 2, title: 'OpenMP Adaptive Loop Scheduler Engine', domain: 'Parallel Programming', tech: 'C++ / OpenMP 5.0' },
  { u: 2, title: 'MPI Ring Allreduce Collective Communication Engine', domain: 'Parallel Programming', tech: 'C / MPICH / OpenMPI' },
  { u: 2, title: 'ThreadSanitizer Data Race Detector & Mutex Sandbox', domain: 'Parallel Programming', tech: 'C++17 / TSan' },
  { u: 2, title: 'Decentralized Work-Stealing Task Queue Engine', domain: 'Parallel Programming', tech: 'C++ / Lock-Free Deque' },
  { u: 2, title: 'Python Multiprocessing vs Asyncio Crawler Engine', domain: 'Parallel Programming', tech: 'Python 3 / Multiprocessing' },
  { u: 2, title: 'MPI Master-Worker Dynamic Load Balancer for Mandelbrot', domain: 'Parallel Programming', tech: 'C++ / MPI' },
  { u: 2, title: 'Dining Philosophers Deadlock Prevention Sandbox', domain: 'Parallel Programming', tech: 'C++11 / Mutex' },
  { u: 2, title: '2D Stencil Parallel PDE Solver (OpenMP + MPI Hybrid)', domain: 'Parallel Programming', tech: 'C++ / Hybrid OpenMP+MPI' },
  { u: 2, title: 'Parallel Sort Engine (Radix vs QuickSort on OpenMP)', domain: 'Parallel Programming', tech: 'C++ / OpenMP Tasks' },
  { u: 2, title: 'Distributed Graph Traversal Engine with MPI', domain: 'Parallel Programming', tech: 'C++ / MPI / GraphX' },
  { u: 2, title: 'Producer-Consumer Ring Buffer with Lock-Free Semaphores', domain: 'Parallel Programming', tech: 'C++ Atomics' },
  { u: 2, title: 'Parallel N-Body Gravitational Physics Simulator', domain: 'Parallel Programming', tech: 'C++ / OpenMP' },
  { u: 2, title: 'Distributed Log Reduction Engine using MPI_Allreduce', domain: 'Parallel Programming', tech: 'C++ / MPI' },
  { u: 2, title: 'Lock Contention Profiler & Spinlock vs Mutex Analyzer', domain: 'Parallel Programming', tech: 'C++ / Pthreads' },
  { u: 2, title: 'Python Process Pool Map-Reduce Framework for Big Data', domain: 'Parallel Programming', tech: 'Python / Multiprocessing' },

  // UNIT 3 PROJECTS (31-45)
  { u: 3, title: 'CUDA High-Performance Matrix Multiplication (GEMM)', domain: 'GPU Computing', tech: 'CUDA / Shared Memory' },
  { u: 3, title: 'GPU Memory Coalescing & Bank Conflict Analyzer', domain: 'GPU Computing', tech: 'CUDA / Nsight Compute' },
  { u: 3, title: 'CUDA Roofline Model Profiling & Optimization Suite', domain: 'GPU Computing', tech: 'CUDA / Python / Nsight' },
  { u: 3, title: 'Dockerized CUDA HPC Pipeline for Cloud Deployment', domain: 'GPU Computing', tech: 'Docker / NVIDIA Container Toolkit' },
  { u: 3, title: 'Kubernetes Multi-Node GPU Pod Scaler Simulator', domain: 'GPU Computing', tech: 'Kubernetes / Helm / PyTorch' },
  { u: 3, title: 'Tensor Core Mixed-Precision (FP32/FP16/INT8) Engine', domain: 'GPU Computing', tech: 'CUDA / WMMA / Tensor Cores' },
  { u: 3, title: 'CUDA 2D Image Convolution Filter Engine', domain: 'GPU Computing', tech: 'CUDA / Shared Memory Tiling' },
  { u: 3, title: 'OpenCL Cross-Platform Vector Processing Engine', domain: 'GPU Computing', tech: 'OpenCL C++ API' },
  { u: 3, title: 'CUDA Warp Divergence Inspector & Branch Sanitizer', domain: 'GPU Computing', tech: 'CUDA / NVCC' },
  { u: 3, title: 'PyTorch Multi-GPU Distributed Data Parallel (DDP) Scaler', domain: 'GPU Computing', tech: 'PyTorch / NCCL / NVLink' },
  { u: 3, title: 'CUDA Parallel Prefix Sum (Scan) Algorithm Engine', domain: 'GPU Computing', tech: 'CUDA / Blelloch Scan' },
  { u: 3, title: 'GPU Acceleration for 3D FFT Signal Processing', domain: 'GPU Computing', tech: 'CUDA / cuFFT' },
  { u: 3, title: 'CUDA Global Memory Bandwidth Benchmark Suite', domain: 'GPU Computing', tech: 'CUDA / C++' },
  { u: 3, title: 'AI Accelerator Throughput Profiler (GPU vs TPU vs NPU)', domain: 'GPU Computing', tech: 'Python / ONNX Runtime' },
  { u: 3, title: 'Cloud GPU Spot Instance Fault-Tolerant Checkpointer', domain: 'GPU Computing', tech: 'Python / AWS SDK / PyTorch' },

  // UNIT 4 PROJECTS (46-60)
  { u: 4, title: 'Single Qubit Bloch Sphere Simulator & Gate Pipeline', domain: 'Quantum Computing', tech: 'Python / Qiskit / Matplotlib' },
  { u: 4, title: '2-Qubit Bell State Generator & Teleportation Pipeline', domain: 'Quantum Computing', tech: 'Python / Qiskit / Cirq' },
  { u: 4, title: 'Grover Search Engine for Unstructured Database Search', domain: 'Quantum Computing', tech: 'Python / Qiskit' },
  { u: 4, title: 'Deutsch-Jozsa Quantum Algorithm Simulator', domain: 'Quantum Computing', tech: 'Python / Cirq' },
  { u: 4, title: 'Shor Period Finding & RSA Factorization Simulator', domain: 'Quantum Computing', tech: 'Python / SymPy / Qiskit' },
  { u: 4, title: 'VQE Ground State Molecular Energy Solver for H2/LiH', domain: 'Quantum Computing', tech: 'Python / Qiskit Nature / PySCF' },
  { u: 4, title: 'QAOA Max-Cut Graph Combinatorial Optimization Engine', domain: 'Quantum Computing', tech: 'Python / NetworkX / Qiskit' },
  { u: 4, title: 'Hybrid Quantum-Classical Neural Network Classifier', domain: 'Quantum Computing', tech: 'Python / PennyLane / PyTorch' },
  { u: 4, title: 'Quantum Noise & Decoherence Mitigation Simulator', domain: 'Quantum Computing', tech: 'Python / Qiskit Aer' },
  { u: 4, title: 'Quantum Circuit Gate Synthesis & Optimization Engine', domain: 'Quantum Computing', tech: 'Python / Qiskit Transpiler' },
  { u: 4, title: 'Superdense Coding Protocol Simulator', domain: 'Quantum Computing', tech: 'Python / Cirq' },
  { u: 4, title: 'Quantum Random Number Generator (QRNG) Hardware Validator', domain: 'Quantum Computing', tech: 'Python / IBM Quantum' },
  { u: 4, title: 'Barren Plateau Landscape Visualizer for Parameterized Circuits', domain: 'Quantum Computing', tech: 'Python / PennyLane' },
  { u: 4, title: 'Quantum Fourier Transform (QFT) Circuit Generator', domain: 'Quantum Computing', tech: 'Python / Qiskit' },
  { u: 4, title: 'Post-Quantum Lattice-Based Key Exchange Prototype', domain: 'Quantum Computing', tech: 'Python / Kyber / Cryptography' }
];

projectTemplates.forEach((t, index) => {
  const pId = `prj-${String(index + 1).padStart(2, '0')}`;
  STUDENT_PROJECTS.push({
    id: pId,
    unitId: t.u,
    title: t.title,
    domain: t.domain,
    trlLevel: 'TRL 4 - Lab-Validated Proof of Concept',
    problemStatement: `Design, implement, and empirically validate a functional ${t.title} prototype (${t.tech}). The goal is to solve a representative performance or algorithmic challenge in ${t.domain} and demonstrate a TRL 4 proof-of-concept in a laboratory/simulation environment.`,
    architecture: `Software Stack: ${t.tech}. Target Platform: Modern multi-core CPU / GPU accelerator / Quantum Simulator.`,
    prerequisites: [`Proficiency in ${t.tech.split('/')[0].trim()}`, 'Basic understanding of system benchmarking and timing measurement', 'Git version control and Markdown reporting skills'],
    stepByStepInstructions: [
      {
        step: 1,
        title: 'Step 1: Environment Setup & Project Scope',
        description: `Install required compilers/libraries (${t.tech}). Initialize a Git repository. Formulate a concrete problem statement specifying input sizes, target metrics, and boundary conditions.`
      },
      {
        step: 2,
        title: 'Step 2: Baseline Implementation & Measurement Protocol',
        description: 'Implement a minimal unoptimized serial or reference version. Establish a rigorous timing protocol (high-resolution timers, warm-up runs, median of 5 trials) to establish baseline execution metrics.'
      },
      {
        step: 3,
        title: 'Step 3: Core Algorithm Implementation & Optimization',
        description: 'Develop the parallel, GPU-accelerated, or quantum circuit solution. Apply domain-specific optimizations (e.g. cache tiling, SIMD vectorization, memory coalescing, or ansatz tuning).'
      },
      {
        step: 4,
        title: 'Step 4: Empirical Validation & TRL 4 Benchmarking',
        description: 'Sweep problem sizes and worker counts. Generate comparative performance plots (Speedup, Efficiency, FLOPS, or Success Probability). Verify functional correctness against the baseline.'
      },
      {
        step: 5,
        title: 'Step 5: Deliverables & TRL 4 Proof-of-Concept Report',
        description: 'Compile a final TRL 4 engineering report containing problem statement, system architecture, benchmark plots, bottleneck analysis, and instructions to reproduce results.'
      }
    ],
    expectedDeliverables: [
      'Clean, well-documented source code repository on GitHub/GitLab',
      'Reproducible benchmark script and raw measurement CSV/JSON data',
      'Performance visualization plots (PNG/SVG)',
      '5-page TRL 4 Proof-of-Concept Technical Report (PDF/Markdown)'
    ],
    rubric: [
      { criteria: 'Functional Correctness & TRL 4 Validation', weight: '30%' },
      { criteria: 'Implementation Rigor & Code Quality', weight: '30%' },
      { criteria: 'Empirical Benchmarking & Bottleneck Analysis', weight: '25%' },
      { criteria: 'Documentation & Reproducibility Instructions', weight: '15%' }
    ]
  });
});
