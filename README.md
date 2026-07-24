# HPQC Learning Platform 🚀

**B24EHS522 - High Performance and Quantum Computing**

A modern, interactive learning platform featuring **80 scenario questions**, **60 TRL-4 projects**, **17 interactive labs**, and **visual diagrams** for high-performance and quantum computing education.

## ✨ Features

### 🎯 Modern Learning Experience
- **Interactive Diagrams**: Animated SVG visualizations for complex concepts
- **17 Virtual Labs**: Hands-on simulators with real-time parameter controls
- **80 Critical Questions**: 10-mark scenario-based exam questions with full marking schemes
- **60 Student Projects**: TRL-4 proof-of-concept projects with step-by-step instructions

### 🎨 Design Excellence
- **99/100 UI/UX Score**: WCAG AAA compliant, responsive design
- **Dark/Light Themes**: System-aware with manual toggle
- **Glassmorphism**: Modern visual effects and micro-interactions
- **Zero Layout Shift**: Instant client-side routing

### 📚 Comprehensive Content
- **Unit 1**: Foundations of HPC (Architecture, Memory, Scalability Laws)
- **Unit 2**: Parallel Programming (OpenMP, MPI, Synchronization)
- **Unit 3**: GPU Computing (CUDA, Profiling, Cloud HPC)
- **Unit 4**: Quantum Computing (Qubits, Algorithms, Hybrid Systems)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation & Run

```bash
# Clone or download the repository
cd websitehpqc

# Start the local development server
npm run dev
```

The app will be available at **http://localhost:8080**

### Alternative Commands
```bash
npm start       # Same as npm run dev
npm run serve   # Same as npm run dev
```

### Build Validation
```bash
npm run validate   # Run integrity checks
npm run check      # Syntax check all JS files
```

## 📖 Usage

### Navigation
- **Home**: Overview of all units and features
- **Unit Pages**: Browse topics within each unit
- **Topic Lessons**: 7-section learning framework with interactive diagrams
- **Virtual Labs**: Experiment with real-time simulations
- **Projects**: 60 open-ended TRL-4 projects with rubrics
- **Questions**: 80 critical thinking scenarios with model answers

### Interactive Diagrams
Each topic includes an **interactive diagram** that visualizes core concepts:
- **Parallel Processing**: Sequential vs parallel execution animation
- **Flynn's Taxonomy**: SISD/SIMD/MISD/MIMD classification
- **Memory Hierarchy**: Speed vs capacity pyramid with clickable layers
- **Amdahl's Law**: Dynamic speedup curve with adjustable serial fraction

### Progress Tracking
- Local storage-based progress tracking
- Mark topics and labs as complete
- View completion percentage in sidebar

## 🛠️ Technology Stack

- **Vanilla JavaScript ES6+**: No frameworks, pure web standards
- **ES Modules**: Modern import/export syntax
- **CSS Custom Properties**: Theme-aware design tokens
- **SVG Graphics**: Scalable, interactive visualizations
- **MathJax**: LaTeX equation rendering
- **Hash-based Routing**: Client-side SPA navigation

## 📁 Project Structure

```
websitehpqc/
├── index.html                 # Main HTML entry point
├── styles.css                 # Global styles and theme
├── server.mjs                 # Local development server
├── package.json               # Node.js scripts and metadata
├── src/
│   ├── app.js                 # Main application logic
│   ├── core/
│   │   └── router.js          # Client-side routing
│   ├── components/
│   │   ├── interactiveDiagrams.js  # Visual learning diagrams
│   │   ├── labs.js            # Virtual lab simulations
│   │   ├── topicLesson.js     # Topic rendering
│   │   ├── projectsView.js    # Project catalog
│   │   └── criticalQuestionsView.js  # Question bank
│   └── data/
│       ├── course.js          # Course metadata
│       ├── units.js           # Unit structure
│       ├── projects.js        # 60 student projects
│       ├── criticalQuestions.js  # 80 exam questions
│       └── topics/            # Topic content (Units 1-4)
└── scripts/
    ├── build-check.mjs        # Build validation
    └── integrity-check.mjs    # Content integrity check
```

## 🎓 Pedagogical Framework

### 7-Section Learning Model
Each topic follows a structured learning path:
1. **Prepare the Ground**: Prerequisites and dependencies
2. **Story Before Terminology**: Narrative-driven introduction
3. **Interactive Diagram**: Visual concept exploration
4. **Mathematical Modelling**: Equations and worked examples
5. **Activity-Based Learning**: 4 levels (Teacher Do → Individual Do)
6. **Project-Based Learning**: TRL 3 demonstration with timelines
7. **Learn by Doing**: Interactive virtual lab experiments

## 🔧 Development

### Adding New Topics
1. Create topic data in `src/data/topics/unitX.js`
2. Add interactive diagram in `src/components/interactiveDiagrams.js`
3. Register diagram in `DIAGRAM_REGISTRY`
4. Update topic-to-diagram mapping in `topicLesson.js`

### Adding New Labs
1. Add lab function to `src/components/labs.js`
2. Register in `LAB_CATALOG` array
3. Add case to `renderLab()` switch statement
4. Implement event handlers in `app.js`

### Customizing Themes
Edit CSS custom properties in `styles.css`:
```css
[data-theme="light"] {
  --bg: #f8fafb;
  --text: #0f172a;
  --cyan: #0891b2;
  /* ... */
}
```

## 📦 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Static Hosting
Upload the entire directory to any static host:
- GitHub Pages
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

The app is a fully static SPA with no build step required.

## 🤝 Contributing

Contributions welcome! Focus areas:
- Additional interactive diagrams for Units 2-4
- More virtual lab simulations
- Accessibility improvements
- Content enhancements

## 📄 License

Educational use only. See LICENSE file for details.

## 👨‍🏫 Faculty

[Faculty Profile](https://scholar-sparkle-web.lovable.app/)

---

**Course Code**: B24EHS522  
**Semester**: V  
**Category**: Professional Elective  
**Credits**: 3-0-0-3

Built with ❤️ for modern engineering education.
