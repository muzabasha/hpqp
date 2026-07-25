import { getTopic, getUnitTopics } from '../data/topics/index.js';
import { renderLab } from './labs.js';
import { DIAGRAM_REGISTRY } from './interactiveDiagrams.js';
import { renderInteractiveMCQ } from './interactiveMCQ.js';

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const list = (items) => items && items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';

// Get diagram for a topic based on unitId and topicId
function getDiagramForTopic(unitId, topicId) {
  const diagramMap = {
    '1-1': 'parallel-processing',
    '1-2': 'flynn-taxonomy',
    '1-3': 'memory-hierarchy',
    '1-4': 'amdahl-law',
    '2-1': 'openmp-scheduling',
    '2-2': 'mpi-collective',
    '2-3': 'race-deadlock',
    '2-4': 'work-stealing',
    '3-1': 'cuda-basics',
    '3-2': 'memory-coalescing',
    '3-3': 'gpu-profiling',
    '3-4': 'cloud-hpc',
    '4-1': 'qubit-bloch',
    '4-2': 'quantum-gates',
    '4-3': 'quantum-algorithms',
    '4-4': 'vqe-circuit'
  };
  const key = `${unitId}-${topicId}`;
  const diagramId = diagramMap[key];
  if (diagramId && DIAGRAM_REGISTRY[diagramId]) {
    return DIAGRAM_REGISTRY[diagramId]();
  }
  return '';
}

function renderSection1(t, unitId, topicId) {
  const next = topicId < (getUnitTopics(unitId).length) ? topicId + 1 : null;
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Section 1</div><h2>Prepare the ground</h2></div><p>Prerequisites, dependencies, and next steps</p></div>
  <div class="prereq-grid"><div class="prereq-card"><h4>Prerequisites</h4>${list(t.prerequisites)}</div><div class="prereq-card"><h4>Future dependencies</h4>${list(t.dependencies)}</div><div class="prereq-card"><h4>Preparation for next topic</h4><p>${esc(t.preparationPlan)}</p></div></div></section>`;
}

function renderSection2(t) {
  return `<section class="lesson-section story-section"><div class="section-heading"><div><div class="eyebrow">Section 2</div><h2>A story before the terminology</h2></div><p>Remember the idea before the label.</p></div>
  <div class="story-container"><p class="story-lead">${esc(t.story)}</p></div>
  <div class="story-questions"><h4>Reflect on the story</h4><div class="checklist">${t.storyQuestions.map((q) => `<div class="story-q"><span class="story-q-icon">?</span><span>${esc(q)}</span></div>`).join('')}</div></div>
  <div class="callout"><strong>What did we just learn?</strong> ${esc(t.storyBridge)}</div>
  <details><summary>Technical vocabulary</summary>${list(t.terminology)}</details></section>`;
}

function renderInteractiveDiagram(unitId, topicId) {
  const diagram = getDiagramForTopic(unitId, topicId);
  if (!diagram) return '';
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Interactive Visual</div><h2>Explore the concept visually</h2></div><p>Interactive diagram with animations and real-time controls</p></div>${diagram}</section>`;
}

function renderSection3(t) {
  const eqs = t.equations || [];
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Section 3</div><h2>Mathematical modelling</h2></div><p>Equation, simulation, decision</p></div>
  <div class="math-intro"><div class="math-why"><h4>Why model it?</h4><p><strong>Need:</strong> ${esc(t.mathNeed)}</p><p><strong>Motivation:</strong> ${esc(t.mathMotivation)}</p></div>
  <div class="math-challenges"><h4>Challenges</h4><div class="challenge-grid">${(t.realWorldChallenges || []).map((c) => `<div class="challenge-card real"><span class="challenge-icon">🌍</span><p>${esc(c)}</p></div>`).join('')}${(t.technicalChallenges || []).map((c) => `<div class="challenge-card tech"><span class="challenge-icon">⚙</span><p>${esc(c)}</p></div>`).join('')}</div></div></div>
  <div class="equations-container">${eqs.map((eq) => `<div class="equation-block"><div class="equation-name">${esc(eq.name)}</div><div class="equation-render">\\(${eq.latex}\\)</div><div class="equation-details"><div class="eq-row"><strong>Symbols:</strong> ${esc(eq.symbols)}</div><div class="eq-row"><strong>Meaning:</strong> ${esc(eq.meaning)}</div><div class="eq-row"><strong>Why needed:</strong> ${esc(eq.whyNeeded)}</div><div class="eq-row"><strong>Interpretation:</strong> ${esc(eq.interpretation)}</div></div></div>`).join('')}</div>
  <div class="numerical-example"><h4>Worked Example</h4><p>${esc(t.numericalExample)}</p></div>
  <div class="math-footer"><div><h4>Metrics to track</h4>${list(t.metrics)}</div><div><h4>Optimization possibilities</h4><p>${esc(t.optimizationPossibilities)}</p></div><div><h4>Future enhancements</h4><p>${esc(t.futureEnhancements)}</p></div></div></section>`;
}

function renderSection4(t) {
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Section 4</div><h2>Activity-based learning</h2></div><p>Four levels, one progression.</p></div>
  <div class="activities-container">${(t.activities || []).map((a) => `<div class="activity-card level-${a.level}"><div class="activity-header"><div class="eyebrow">Level ${a.level} — ${esc(a.levelName)}</div><h3>${esc(a.objective)}</h3></div><div class="activity-body"><div class="activity-col"><h4>Instructions</h4><p>${esc(a.instructions)}</p><h4>Inputs</h4><p>${esc(a.inputs)}</p><h4>Expected outputs</h4><p>${esc(a.expectedOutputs)}</p></div><div class="activity-col"><h4>Assessment rubric</h4><p>${esc(a.rubric)}</p><h4>Learning outcomes</h4><p>${esc(a.learningOutcomes)}</p><div class="activity-meta"><span class="meta-tag">⏱ ${esc(a.time)}</span><span class="meta-tag">📋 ${esc(a.materials)}</span></div></div></div></div>`).join('')}</div></section>`;
}

function renderSection5(t) {
  const timeline = t.projectTimeline || [];
  const risks = t.projectRisks || [];
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Section 5</div><h2>Project-based learning</h2></div><p>From classroom model to TRL 3 demonstration.</p></div>
  <div class="project-grid"><div class="project-col"><h4>Scope</h4><p>${esc(t.projectScope)}</p><h4>Feasibility</h4><p>${esc(t.projectFeasibility)}</p><h4>Methodology</h4><p>${esc(t.projectMethodology)}</p><h4>TRL Level</h4><p>${esc(t.projectTRL)}</p><h4>Budget</h4><p>${esc(t.projectBudget)}</p></div>
  <div class="project-col"><h4>Objectives</h4>${list(t.projectObjectives)}<h4>Outcomes</h4>${list(t.projectOutcomes)}<h4>Team roles</h4>${list(t.projectRoles)}</div></div>
  <div class="gantt-chart" aria-label="Project timeline"><div class="gantt-header">Timeline</div><div class="gantt-bars">${timeline.map((m, i) => `<div class="gantt-bar" style="--bar-index:${i}"><span class="gantt-label">${esc(m.milestone)}</span><span class="gantt-duration">${esc(m.duration)}</span><span class="gantt-deliverable">${esc(m.deliverable)}</span></div>`).join('')}</div></div>
  <div class="risk-table"><h4>Risk Assessment</h4><table><thead><tr><th>Risk</th><th>Severity</th><th>Mitigation</th></tr></thead><tbody>${risks.map((r) => `<tr><td>${esc(r.risk)}</td><td><span class="severity-badge severity-${esc(r.severity.toLowerCase())}">${esc(r.severity)}</span></td><td>${esc(r.mitigation)}</td></tr>`).join('')}</tbody></table></div></section>`;
}

function renderSection6(t) {
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Section 6</div><h2>Model 2-mark questions</h2></div><p>Recall, calculate, apply, solve.</p></div>
  <div class="question-grid">${(t.questions || []).map((q) => `<div class="question-card type-${q.type}"><div class="question-type-badge">${esc(q.type)}</div><h4 class="question-text">${esc(q.question)}</h4><details class="answer-reveal"><summary>Show answer</summary><div class="answer-content"><p class="answer-text"><strong>Answer:</strong> ${esc(q.answer)}</p><p class="explanation-text">${esc(q.explanation)}</p><div class="answer-meta"><div class="common-mistakes"><strong>Common mistakes:</strong> ${esc(q.commonMistakes)}</div><div class="tip"><strong>Tip:</strong> ${esc(q.tip)}</div></div></div></details></div>`).join('')}</div></section>`;
}

function renderSection7(t, unitId, topicId) {
  return `<section class="lesson-section"><div class="section-heading"><div><div class="eyebrow">Section 7 · NEP 2020</div><h2>Learn by doing</h2></div><p>Experiment → observe → analyze → compare → reflect → evaluate</p></div>
  <p>Use the virtual laboratory below as a guided simulation. Reset before a new trial, change one parameter at a time, pause your reasoning before reading the feedback, and compare at least two runs.</p>
  <div class="lab-steps"><span>1. Experiment</span><span>2. Observe</span><span>3. Analyze</span><span>4. Compare</span><span>5. Reflect</span><span>6. Evaluate</span></div>
  ${renderLab(t.labType || 'speedup')}</section>`;
}

function renderEndSection(t, unitId, topicId) {
  return `<section class="lesson-section end-section"><div class="section-heading"><div><div class="eyebrow">Topic synthesis</div><h2>Carry the idea forward</h2></div></div>
  <div class="end-grid"><div class="end-card insights"><h4>Key Insights</h4>${list(t.keyInsights)}</div><div class="end-card pros"><h4>Advantages</h4>${list(t.advantages)}</div><div class="end-card cons"><h4>Disadvantages</h4>${list(t.disadvantages)}</div></div>
  <div class="end-grid"><div class="end-card"><h4>Possible Improvements</h4>${list(t.improvements)}</div><div class="end-card"><h4>Future Scope</h4><p>${esc(t.futureScope)}</p></div></div>
  <div class="end-grid three-col"><div class="end-card"><h4>Industrial Applications</h4>${list(t.industrialApplications)}</div><div class="end-card"><h4>Research Opportunities</h4>${list(t.researchOpportunities)}</div><div class="end-card"><h4>Career Relevance</h4>${list(t.careerRelevance)}</div></div>
  <div class="actions"><a class="button" href="#/unit/${unitId}">← Unit overview</a><button class="button primary" data-action="mark-topic" data-topic="${unitId}-${topicId}">Mark complete ✓</button>${topicId < (getUnitTopics(unitId).length) ? `<a class="button" href="#/unit/${unitId}/topic/${topicId + 1}">Next topic →</a>` : `<a class="button" href="#/roadmap">Back to roadmap</a>`}</div></section>`;
}

export function renderTopicLesson(unitId, topicId) {
  const t = getTopic(unitId, topicId);
  if (!t) return `<div class="hero"><div class="eyebrow">Topic not found</div><h1>This topic is coming soon</h1><p class="lede">The content for this topic is being developed. Check back soon.</p><div class="actions"><a class="button primary" href="#/unit/${unitId}">← Back to Unit ${unitId}</a></div></div>`;
  const total = getUnitTopics(unitId).length;
  return `<div class="lesson-header"><div class="eyebrow">Unit ${unitId} / Topic ${String(topicId).padStart(2, '0')} / Complete lesson</div><h1>${esc(t.title)}</h1><p class="lede">${esc(t.description)}</p></div>
  <div class="lesson-nav"><a class="button" href="#/unit/${unitId}">← Unit map</a><span>Topic ${topicId} of ${total}</span><a class="button" href="#/unit/${unitId}/topic/${Math.min(topicId + 1, total)}">Next topic →</a></div>
  ${renderSection1(t, unitId, topicId)}
  ${renderSection2(t)}
  ${renderInteractiveDiagram(unitId, topicId)}
  ${renderSection3(t)}
  ${renderSection4(t)}
  ${renderSection5(t)}
  ${renderSection6(t)}
  ${renderInteractiveMCQ(topicId, unitId)}
  ${renderSection7(t, unitId, topicId)}
  ${renderEndSection(t, unitId, topicId)}`;
}
