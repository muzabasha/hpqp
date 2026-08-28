export const unitDetails = {
  1: { label: 'Foundations of HPC', outcomes: 'Explain architecture, memory behavior, performance metrics, and scalability.', activity: 'Model the system before changing the system.', lab: 'speedup' },
  2: { label: 'Parallel programming models', outcomes: 'Choose a programming model and reason about communication, synchronization, and load balance.', activity: 'Turn a sequential loop into a measured parallel workload.', lab: 'parallel' },
  3: { label: 'GPU computing and optimization', outcomes: 'Set up GPU development environments (local/cloud/containers), build and debug CUDA/GPU applications, and optimize performance through memory management and profiling.', activity: 'Set up the GPU toolchain, compile and debug a complete GPU application, and tune performance with profilers.', lab: 'gpu' },
  4: { label: 'Quantum computing', outcomes: 'Construct circuits, interpret measurement, and compare hybrid quantum-classical strategies.', activity: 'Build a circuit, observe its state, and connect it to an algorithm.', lab: 'quantum' }
};

export const topicDetails = {
  1: [
    ['Why high performance computing?', 'Frame the problem, architecture, measurement, and insight loop.', 'Case study: why weather models need more than a faster CPU.'],
    ['Flynn’s taxonomy and parallel architectures', 'Classify systems by instruction and data flow.', 'Sort real machines into SISD, SIMD, MISD, and MIMD.'],
    ['Memory hierarchy and cache coherence', 'Explain why data movement can dominate compute.', 'Trace a value from registers through cache, RAM, and storage.'],
    ['Speedup, efficiency, and scalability laws', 'Model serial bottlenecks with Amdahl’s and Gustafson’s Laws.', 'Use the speedup explorer to compare scale and efficiency.'],
    ['TOP500, Green500, and cluster basics', 'Evaluate performance alongside energy and system design.', 'Create an energy-aware cluster recommendation.']
  ],
  2: [
    ['OpenMP and loop parallelization', 'Use threads and worksharing to parallelize independent loop iterations.', 'Compare sequential and threaded work with a controllable workload.'],
    ['MPI and collective communication', 'Explain process boundaries and collective communication patterns.', 'Model a distributed sum and inspect communication overhead.'],
    ['Races, deadlocks, and synchronization', 'Identify unsafe interleavings and choose synchronization deliberately.', 'Step through a race, then apply a barrier or lock.'],
    ['Load balancing and Python multiprocessing', 'Distribute uneven work while accounting for process overhead.', 'Balance a mixed workload across workers.']
  ],
  3: [
    ['GPU architecture and CUDA basics', 'Set up the CUDA environment, verify device properties, and develop your first GPU applications.', 'Configure nvcc, write and compile vector addition and AXPY kernels from launch to result.'],
    ['Memory coalescing and occupancy', 'Master GPU memory hierarchies, develop tiled matrix multiplication (GEMM), and tune occupancy.', 'Eliminate uncoalesced memory strides and shared memory bank conflicts with array padding.'],
    ['Profiling and bottleneck analysis', 'Debug with compute-sanitizer/cuda-gdb and profile GPU kernels with Nsight Tools & Roofline model.', 'Profile compute-bound vs memory-bound kernels, fix warp stalls, and optimize kernel execution.'],
    ['Cloud HPC, containers, and AI accelerators', 'Set up Docker with NVIDIA Container Toolkit and develop AI accelerated applications with Tensor Cores.', 'Deploy containerized GPU pipelines, leverage mixed precision FP16/INT8, and scale across multi-GPU setups.']
  ],
  4: [
    ['Qubits, gates, and measurement', 'Represent a qubit state and predict measurement probabilities.', 'Compose gates and observe a simulated measurement distribution.'],
    ['Superposition and entanglement', 'Distinguish local superposition from multi-qubit entanglement.', 'Create a Bell state and inspect correlated outcomes.'],
    ['Deutsch-Jozsa, Grover, and Shor', 'Compare algorithmic ideas without treating speedup as magic.', 'Trace oracle, amplification, and measurement steps.'],
    ['VQE, QAOA, and hybrid systems', 'Design the classical optimizer and quantum circuit feedback loop.', 'Tune a parameterized circuit toward a lower objective value.']
  ]
};