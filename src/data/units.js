export const unitDetails = {
  1: { label: 'Foundations of HPC', outcomes: 'Explain architecture, memory behavior, performance metrics, and scalability.', activity: 'Model the system before changing the system.', lab: 'speedup' },
  2: { label: 'Parallel programming models', outcomes: 'Choose a programming model and reason about communication, synchronization, and load balance.', activity: 'Turn a sequential loop into a measured parallel workload.', lab: 'parallel' },
  3: { label: 'GPU computing and optimization', outcomes: 'Map work to GPU hardware and identify memory, occupancy, and profiling bottlenecks.', activity: 'Tune a kernel by changing one hardware-facing variable at a time.', lab: 'gpu' },
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
    ['GPU architecture and CUDA basics', 'Map grids, blocks, warps, and threads to a GPU execution model.', 'Step through a vector-add kernel from launch to result.'],
    ['Memory coalescing and occupancy', 'Relate access patterns and active warps to throughput.', 'Tune coalescing and occupancy to improve a kernel score.'],
    ['Profiling and bottleneck analysis', 'Read profiler signals and form a measurable optimization hypothesis.', 'Compare compute-bound and memory-bound traces.'],
    ['Cloud HPC, containers, and AI accelerators', 'Evaluate portability, cost, and accelerator fit in deployment.', 'Choose an accelerator and deployment shape for a workload.']
  ],
  4: [
    ['Qubits, gates, and measurement', 'Represent a qubit state and predict measurement probabilities.', 'Compose gates and observe a simulated measurement distribution.'],
    ['Superposition and entanglement', 'Distinguish local superposition from multi-qubit entanglement.', 'Create a Bell state and inspect correlated outcomes.'],
    ['Deutsch-Jozsa, Grover, and Shor', 'Compare algorithmic ideas without treating speedup as magic.', 'Trace oracle, amplification, and measurement steps.'],
    ['VQE, QAOA, and hybrid systems', 'Design the classical optimizer and quantum circuit feedback loop.', 'Tune a parameterized circuit toward a lower objective value.']
  ]
};