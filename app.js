(() => {
  'use strict';
  const {questions, sources, version} = window.SPD_CONTENT;
  const KEY = 'spd-tutor:v1';
  const $ = id => document.getElementById(id);
  const fresh = () => ({schema:1, content:version, answers:questions.map(() => null), current:0, large:false});
  let state = fresh();
  let storageOK = true;
  let notice = '';
  function valid(s) {
    return s && s.schema === 1 && s.content === version && typeof s.large === 'boolean' &&
      Number.isInteger(s.current) && s.current >= 0 && s.current < questions.length &&
      Array.isArray(s.answers) && s.answers.length === questions.length &&
      s.answers.every((a,i) => a === null || (Number.isInteger(a) && a >= 0 && a < questions[i].choices.length));
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== null) {
      try { const restored = JSON.parse(raw); if (valid(restored)) state = restored; else notice = 'Saved practice was incompatible. A new chapter has started.'; }
      catch { notice = 'Saved practice could not be read. A new chapter has started.'; }
    }
  } catch { storageOK = false; }
  function save() {
    if (storageOK) {
      try { localStorage.setItem(KEY, JSON.stringify(state)); }
      catch { storageOK = false; }
    }
    $('storage-status').textContent = storageOK ? (notice || 'Progress saves in this browser on this device.') : 'Saving is unavailable. Your progress lasts only for this session.';
  }
  function node(tag, text, cls) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (cls) el.className = cls;
    return el;
  }
  function button(text, action, cls) {
    const el = node('button', text, cls); el.type = 'button'; el.addEventListener('click', action); return el;
  }
  function focusQuestion() { const el = $('question-title'); if (el) el.focus(); }
  function go(i) { state.current = i; save(); render(); focusQuestion(); }
  function render() {
    const answered = state.answers.filter(a => a !== null).length;
    const score = state.answers.reduce((n,a,i) => n + (a === questions[i].correct ? 1 : 0),0);
    $('question-count').textContent = `Question ${state.current + 1} of ${questions.length}`;
    $('score').textContent = `${score} correct · ${answered} answered`;
    $('progress').value = answered;
    $('chapter-status').textContent = answered === questions.length ? `Complete · ${score}/${questions.length} correct` : `${answered}/${questions.length} answered · saved here`;
    if (!storageOK) $('chapter-status').textContent = `${answered}/${questions.length} answered · session only`;
    const root = $('quiz'); root.replaceChildren();
    if (answered === questions.length) {
      const done = node('section',undefined,'completion');
      done.append(node('h3', 'Chapter complete. Keep building.'),node('p',`You answered ${score} of ${questions.length} correctly (${Math.round(score/questions.length*100)}%). This is practice, not a certification result.`));
      done.append(button('Start a fresh practice', () => { $('reset-confirm').hidden = false; $('confirm-reset').focus(); }));
      root.append(done);
    }
    const q = questions[state.current], submitted = state.answers[state.current] !== null;
    const form = node('form');
    const fieldset = node('fieldset');
    const legend = node('legend',q.prompt); legend.id = 'question-title'; legend.tabIndex = -1; fieldset.append(legend);
    q.choices.forEach((choice,i) => {
      const label = node('label',undefined,'option');
      const radio = node('input'); radio.type = 'radio'; radio.name = 'answer'; radio.value = String(i); radio.required = true;
      radio.checked = state.answers[state.current] === i; radio.disabled = submitted;
      label.append(radio,node('span',choice)); fieldset.append(label);
    });
    form.append(fieldset);
    if (!submitted) {
      const actions = node('div',undefined,'actions');
      const check = node('button','Check answer','primary'); check.type = 'submit';
      actions.append(check,node('span','Choose one answer.','hint')); form.append(actions);
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (state.answers[state.current] !== null) return;
        const checked = form.querySelector('input:checked'); if (!checked) return;
        state.answers[state.current] = Number(checked.value); save(); render(); $('feedback-title').focus();
      });
    }
    root.append(form);
    if (submitted) {
      const correct = state.answers[state.current] === q.correct;
      const feedback = node('section',undefined,`feedback${correct ? '' : ' wrong'}`);
      feedback.setAttribute('aria-labelledby','feedback-title'); feedback.setAttribute('role','status');
      const title = node('h3',correct ? 'Correct. Nice progress.' : 'Not quite. Let’s look at why.'); title.id = 'feedback-title'; title.tabIndex = -1;
      feedback.append(title,node('p',`Correct answer: ${q.choices[q.correct]}`),node('p',q.explanation));
      const simple = node('details'); simple.append(node('summary','Explain it more simply'),node('p',q.simple)); feedback.append(simple);
      const source = node('a',`${sources[q.source].title} ↗`); source.href = sources[q.source].url; source.target = '_blank'; source.rel = 'noopener noreferrer'; feedback.append(source);
      root.append(feedback);
    }
    const actions = node('div',undefined,'actions');
    const prev = button('← Previous', () => go(state.current-1)); prev.disabled = state.current === 0; actions.append(prev);
    if (state.current < questions.length-1) actions.append(button(submitted ? 'Next question →' : 'Skip for now →', () => go(state.current+1),submitted ? 'primary' : 'quiet'));
    else {
      const nextUnanswered = state.answers.findIndex(a => a === null);
      if (nextUnanswered >= 0 && nextUnanswered !== state.current) actions.append(button('Go to unanswered →', () => go(nextUnanswered),'primary'));
    }
    root.append(actions);
    $('question-nav').replaceChildren();
    questions.forEach((question,i) => {
      const b = button(String(i+1), () => go(i),state.answers[i] !== null ? 'answered' : '');
      b.setAttribute('aria-label',`Question ${i+1}: ${question.topic}${state.answers[i] !== null ? ', answered' : ', unanswered'}`);
      if (i === state.current) b.setAttribute('aria-current','step');
      $('question-nav').append(b);
    });
    document.body.classList.toggle('large',state.large); $('text-size').setAttribute('aria-pressed',String(state.large));
    $('text-size').textContent = state.large ? 'Standard text' : 'Larger text';
  }
  $('text-size').addEventListener('click', () => { state.large = !state.large; save(); render(); });
  $('reset').addEventListener('click', () => { $('reset-confirm').hidden = false; $('confirm-reset').focus(); });
  $('cancel-reset').addEventListener('click', () => { $('reset-confirm').hidden = true; $('reset').focus(); });
  $('confirm-reset').addEventListener('click', () => {
    let removed = true;
    try { localStorage.removeItem(KEY); } catch { removed = false; storageOK = false; }
    const large = state.large; state = fresh(); state.large = large; notice = '';
    $('reset-confirm').hidden = true;
    $('reset-status').textContent = removed ? 'Saved practice deleted. A new chapter is ready.' : 'Session practice cleared. Browser storage could not be accessed; saved data removal is not confirmed.';
    $('storage-status').textContent = storageOK ? 'Practice cleared. New answers will save in this browser.' : 'Saving is unavailable. Your progress lasts only for this session.';
    render(); focusQuestion();
  });
  save(); render();
})();
