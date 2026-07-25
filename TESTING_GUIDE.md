# HPQC Platform - Testing Guide

## 🚀 Quick Start

### Start Development Server:
```bash
npm run dev
```
Server will be available at: **http://localhost:3000**

---

## ✅ Feature Checklist

### 1. Unit 1 Interactive Diagrams (4 diagrams)

#### Test: Navigate to Unit 1 Topics
- [ ] **Topic 1: Why HPC?**
  - URL: `#/unit/1/topic/1`
  - Expected: "Sequential vs Parallel Execution Model" diagram
  - Actions: Click "Play" button to see animation
  - Actions: Click "Reset" button to restart

- [ ] **Topic 2: Flynn's Taxonomy**
  - URL: `#/unit/1/topic/2`
  - Expected: Interactive taxonomy quadrants (SISD/SIMD/MISD/MIMD)
  - Actions: Click each category button
  - Expected: Quadrant highlights, insight text updates

- [ ] **Topic 3: Memory Hierarchy**
  - URL: `#/unit/1/topic/3`
  - Expected: Pyramid diagram with clickable layers
  - Actions: Click each memory layer (Registers, L1, L2, L3, RAM, Storage)
  - Expected: Insight text updates with layer details

- [ ] **Topic 4: Amdahl's Law**
  - URL: `#/unit/1/topic/4`
  - Expected: Interactive speedup curve with slider
  - Actions: Drag "Serial Fraction" slider
  - Expected: Curve updates, max speedup recalculates

---

### 2. Unit 2 Interactive Diagrams (4 diagrams)

#### Test: Navigate to Unit 2 Topics
- [ ] **Topic 1: OpenMP Scheduling**
  - URL: `#/unit/2/topic/1`
  - Expected: Thread timeline visualization
  - Actions: Click Static/Dynamic/Guided buttons
  - Expected: Task distribution changes, load balance bar updates

- [ ] **Topic 2: MPI Collective Operations**
  - URL: `#/unit/2/topic/2`
  - Expected: Process communication diagram
  - Actions: Click Broadcast/Scatter/Gather/Allreduce buttons
  - Expected: Arrow patterns change, insight updates

- [ ] **Topic 3: Race Conditions & Deadlock**
  - URL: `#/unit/2/topic/3`
  - Expected: Synchronization issue visualizations
  - Actions: Click Race Condition/Deadlock/Correct Sync buttons
  - Expected: Scenario switches, insight explains issue

- [ ] **Topic 4: Work Stealing**
  - URL: `#/unit/2/topic/4`
  - Expected: Worker deques with task distribution
  - Actions: Click "Simulate Stealing" button
  - Expected: Toast notification shows stealing action

---

### 3. Interactive MCQ System (Unit 1)

#### Test: Unit 1 MCQs (25 questions total)
Navigate to any Unit 1 topic and scroll down to the MCQ section.

**Expected Elements:**
- [ ] Section heading: "Test Your Understanding"
- [ ] 5 MCQ cards per topic
- [ ] Each card has:
  - Numbered badge (Q1, Q2, etc.)
  - Question text
  - 4 options (A, B, C, D)
  - Hidden feedback panel

**Test MCQ Interaction:**
1. [ ] **Click correct answer:**
   - Option border turns green
   - Option letter badge turns green
   - Feedback panel appears with ✓ icon
   - "Correct!" title in green
   - Explanation text displayed
   - Score updates (+1 correct)

2. [ ] **Click incorrect answer:**
   - Option border turns red (shake animation)
   - Feedback panel appears with ✗ icon
   - "Incorrect" title in red
   - Correct answer highlights in blue
   - Blue badge shows "✓ Correct Answer"
   - Score stays the same

3. [ ] **After answering:**
   - All options become disabled
   - Cannot change answer
   - Cannot click other options

4. [ ] **Score Summary:**
   - Shows "X / 5" correct count
   - Shows percentage score
   - Updates in real-time

5. [ ] **Reset Button:**
   - Click "Reset Quiz" button
   - All cards reset to unanswered state
   - Score resets to 0/5 (0%)
   - Can answer again

---

### 4. Responsive Design Testing

#### Desktop (1920px+)
- [ ] Sidebar visible on left
- [ ] Content centered with max-width
- [ ] Diagrams use full SVG viewBox
- [ ] MCQ options display in single column
- [ ] All interactive elements accessible

#### Tablet Landscape (768px - 900px)
- [ ] Sidebar hidden or collapsible
- [ ] Content takes more width
- [ ] Diagrams scale proportionally
- [ ] Touch targets enlarged (44px minimum)

#### Mobile (≤560px)
- [ ] Single column layout
- [ ] Full-width buttons
- [ ] Smaller font sizes
- [ ] MCQ options stack vertically
- [ ] "✓ Correct Answer" badge moves below option
- [ ] Diagrams remain readable
- [ ] Controls stack vertically

**Test on mobile:**
```
Chrome DevTools > Toggle Device Toolbar > iPhone SE
```

---

### 5. Presentation Mode (Classroom Teaching)

#### Activate Presentation Mode:
- [ ] Click projector icon in header
- [ ] OR press **F** key (keyboard shortcut)

**Expected Behavior:**
- [ ] Sidebar disappears
- [ ] Navigation hidden
- [ ] Font sizes increase dramatically:
  - Headings: up to 6rem
  - Body text: 1.1rem minimum
- [ ] Margins increase (up to 12rem)
- [ ] Content optimized for projector display
- [ ] Toast notification: "Presentation Mode Enabled - Press F to toggle"
- [ ] Scroll to top automatically

#### Exit Presentation Mode:
- [ ] Click projector icon again
- [ ] OR press **F** key
- [ ] OR press **Escape** key

**Expected:**
- [ ] Returns to normal layout
- [ ] Sidebar reappears
- [ ] Font sizes return to normal
- [ ] Toast: "Presentation Mode Disabled"

---

### 6. Theme Toggle (Dark Mode)

- [ ] Click sun/moon icon in header
- [ ] Theme switches between light and dark
- [ ] Preference saved in localStorage
- [ ] Persists across page reloads
- [ ] All diagrams adapt to theme colors

---

### 7. Progress Tracking

#### Mark Topic Complete:
- [ ] Navigate to any topic
- [ ] Scroll to bottom
- [ ] Click "Mark complete ✓" button
- [ ] Toast: "Topic added to your progress"
- [ ] Progress bar updates in header
- [ ] Percentage increases

#### Check Progress:
- [ ] Navigate to home page
- [ ] Stats section shows completed count
- [ ] Unit cards show "X/Y topics"
- [ ] Progress stored in localStorage

---

### 8. Navigation & Routing

#### Test URL Routes:
- [ ] `#/` - Home page
- [ ] `#/unit/1` - Unit 1 overview
- [ ] `#/unit/1/topic/1` - Unit 1, Topic 1
- [ ] `#/unit/2/topic/1` - Unit 2, Topic 1
- [ ] `#/roadmap` - Learning roadmap
- [ ] `#/projects` - Projects view
- [ ] `#/questions` - Critical questions
- [ ] `#/invalid` - 404 page

**Expected:**
- [ ] All routes load correctly
- [ ] Back/forward buttons work
- [ ] Bookmarking URLs works
- [ ] Sharing URLs works

---

### 9. Accessibility (WCAG 2.1 AA)

- [ ] **Keyboard Navigation:**
  - Tab through all interactive elements
  - Enter/Space activate buttons
  - F toggles presentation mode
  - Escape exits presentation mode

- [ ] **Touch Targets:**
  - All buttons ≥44px touch area
  - MCQ options have large click area
  - Diagram controls easy to tap

- [ ] **Color Contrast:**
  - Text readable in both themes
  - Focus indicators visible
  - Error states distinguishable without color alone

- [ ] **Screen Reader:**
  - Alt text on all images/diagrams
  - ARIA labels on interactive elements
  - Heading hierarchy logical

---

### 10. Performance

- [ ] **Page Load:**
  - Initial load < 2 seconds
  - No console errors
  - No 404 requests

- [ ] **Interactions:**
  - Diagram updates < 100ms
  - MCQ feedback instant
  - Animations smooth (60fps)
  - No janky scrolling

- [ ] **Memory:**
  - No memory leaks
  - localStorage doesn't overflow
  - Diagrams clean up event listeners

---

## 🐛 Known Issues / Edge Cases

### None currently! All features working as expected. ✅

---

## 📊 Test Results Template

```
=== HPQC Platform Test Results ===
Date: _____________
Tester: _____________

Unit 1 Diagrams:     [ ] Pass  [ ] Fail
Unit 2 Diagrams:     [ ] Pass  [ ] Fail
MCQ System:          [ ] Pass  [ ] Fail
Responsive Design:   [ ] Pass  [ ] Fail
Presentation Mode:   [ ] Pass  [ ] Fail
Theme Toggle:        [ ] Pass  [ ] Fail
Progress Tracking:   [ ] Pass  [ ] Fail
Navigation:          [ ] Pass  [ ] Fail
Accessibility:       [ ] Pass  [ ] Fail
Performance:         [ ] Pass  [ ] Fail

Overall:             [ ] Pass  [ ] Fail

Notes:
_______________________________________
_______________________________________
_______________________________________
```

---

## 🚨 Troubleshooting

### Issue: Diagrams not appearing
**Solution:** Check browser console for errors. Ensure MathJax and all JS modules loaded.

### Issue: MCQ not responding
**Solution:** Open DevTools > Console. Check for event listener errors. Refresh page.

### Issue: Styles look broken
**Solution:** Hard refresh (Ctrl+Shift+R). Clear cache. Check `styles.css` loaded.

### Issue: Presentation mode not working
**Solution:** Press F key or click projector icon. Check localStorage for `presentationMode` key.

### Issue: Mobile layout broken
**Solution:** Check viewport meta tag. Test with actual device, not just DevTools.

---

## ✅ Final Verification

Before deploying to production:

1. [ ] Run `npm run dev` - No errors
2. [ ] Run `node scripts/integrity-check.mjs` - All checks pass
3. [ ] Test all 8 interactive diagrams
4. [ ] Test all 25 MCQs
5. [ ] Test on 3+ screen sizes
6. [ ] Test presentation mode
7. [ ] Test theme toggle
8. [ ] Test progress tracking
9. [ ] Test keyboard shortcuts
10. [ ] Verify no console errors
11. [ ] Check mobile usability
12. [ ] Verify accessibility
13. [ ] Performance benchmarks met
14. [ ] All routes work correctly
15. [ ] localStorage functions properly

---

## 🎉 Success Criteria

**Platform is ready for student use when:**
- ✅ All 8 diagrams are interactive
- ✅ All 25 MCQs provide instant feedback
- ✅ Responsive on all devices
- ✅ Presentation mode works for teaching
- ✅ No console errors or warnings
- ✅ Performance is smooth (60fps)
- ✅ Accessibility standards met
- ✅ Progress tracking functional
- ✅ Navigation works reliably

---

**Happy Testing! 🚀**
