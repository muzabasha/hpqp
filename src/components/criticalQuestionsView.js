import { CRITICAL_QUESTIONS } from '../data/criticalQuestions.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function renderCriticalQuestionsView(activeUnit = 'all') {
  const allQuestions = activeUnit === 'all'
    ? Object.values(CRITICAL_QUESTIONS).flat()
    : (CRITICAL_QUESTIONS[activeUnit] || []);

  return `<div class="questions-container">
    <div class="hero">
      <div class="eyebrow">Assessment Bank · 10 Marks Each</div>
      <h1>80 Critical Thinking Scenario Questions</h1>
      <p class="lede">Comprehensive scenario-based engineering exam questions designed to evaluate high-order analysis, design, and problem solving across all 4 course units. Complete with marking schemes and model answers.</p>
      <div class="filter-bar">
        <span class="filter-label">Filter Unit:</span>
        <button class="button ${activeUnit === 'all' ? 'primary' : ''}" data-question-unit="all">All Units (80)</button>
        <button class="button ${activeUnit === '1' ? 'primary' : ''}" data-question-unit="1">Unit 1 (20)</button>
        <button class="button ${activeUnit === '2' ? 'primary' : ''}" data-question-unit="2">Unit 2 (20)</button>
        <button class="button ${activeUnit === '3' ? 'primary' : ''}" data-question-unit="3">Unit 3 (20)</button>
        <button class="button ${activeUnit === '4' ? 'primary' : ''}" data-question-unit="4">Unit 4 (20)</button>
      </div>
    </div>

    <div class="topic-list questions-list">
      ${allQuestions.map((q, idx) => `
        <article class="question-scenario-card">
          <div class="q-card-header">
            <div>
              <span class="eyebrow">UNIT 0${q.unitId} · ${esc(q.topic)}</span>
              <h2>Q${idx + 1}. ${esc(q.scenarioTitle)} <span class="marks-badge">10 MARKS</span></h2>
            </div>
          </div>
          <div class="scenario-box">
            <h4>Engineering Scenario</h4>
            <p>${esc(q.scenario)}</p>
          </div>
          <div class="question-prompt-box">
            <h4>Question Prompt</h4>
            <pre class="prompt-text">${esc(q.questionPrompt)}</pre>
          </div>
          <details class="answer-reveal">
            <summary class="button primary">Show Marking Scheme & Model Answer (10 Marks)</summary>
            <div class="answer-content-box">
              <h4>Detailed Marking Scheme (10 Marks Breakdown)</h4>
              <ul class="scheme-list">
                ${q.markingScheme.map(m => `<li><strong>[${m.points} Marks]</strong> ${esc(m.criteria)}</li>`).join('')}
              </ul>
              <h4>Model Academic & Engineering Answer</h4>
              <pre class="model-answer-text">${esc(q.modelAnswer)}</pre>
            </div>
          </details>
        </article>
      `).join('')}
    </div>
  </div>`;
}
