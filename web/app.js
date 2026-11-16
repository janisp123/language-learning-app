(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let messages;
  let loadFailed = false;
  try {
    const E = globalThis.LanguageEngine;
    const locales = JSON.parse($('ui-data').textContent);
    let course = null;
    let state = null;
    let shown = null;
    let pending = null;
    let advanceTimer = null;
    let generation = 0;

    function t(key, values = {}) {
      return messages.messages[key].replace(/\{(\w+)\}/g, (_, name) => String(values[name]));
    }
    function localize() {
      const source = $('direction').value.split('-')[0];
      messages = locales[source];
      document.documentElement.lang = source;
      document.title = t('pageTitle');
      for (const [id, value] of Object.entries(messages.static)) $(id).textContent = value;
      $('choices').setAttribute('aria-label', t('choices'));
      $('lesson-list').replaceChildren();
      if (course) for (const lesson of course.lessons) {
        const item = document.createElement('li'); item.textContent = messages.lessons[lesson.id]; $('lesson-list').append(item);
      }
    }
    localize();
    $('direction').addEventListener('change', () => {
      setup(); localize();
      if (loadFailed) $('error').textContent = t('error');
    });
    course = E.validateCourse(JSON.parse($('course-data').textContent));
    for (const locale of ['lv', 'ru']) for (const lesson of course.lessons) {
      if (!locales[locale].lessons[lesson.id]) throw new Error('Missing lesson translation.');
    }
    localize();

    function cancelAdvance() {
      if (advanceTimer !== null) clearTimeout(advanceTimer);
      advanceTimer = null; generation++; pending = null;
    }

    function screen(id) {
      for (const name of ['setup','practice','finished']) $(name).hidden = name !== id;
    }
    function setup() {
      cancelAdvance();
      state = null; shown = null; pending = null;
      screen('setup'); $('direction').focus();
    }
    function begin() {
      cancelAdvance();
      localize();
      state = E.start(course, $('direction').value);
      pending = null; screen('practice'); render();
    }
    function render(clearFeedback = true) {
      const lesson = course.lessons[state.lessonIndex];
      shown = E.question(course, state);
      $('lesson-label').textContent = t('lesson', {n:state.lessonIndex + 1, total:course.lessons.length});
      $('lesson-title').textContent = messages.lessons[lesson.id];
      $('direction-label').textContent = messages.static[`direction-${state.direction}`];
      $('instruction').textContent = t('instruction');
      $('question').textContent = shown.text; $('question').lang = shown.source;
      $('progress').value = state.consecutive;
      $('progress').textContent = t('progressValue', {n:state.consecutive});
      $('progress-label').textContent = t('progress', {n:state.consecutive});
      $('mistakes').textContent = t('mistakes', {n:state.mistakes});
      if (clearFeedback) { $('feedback').textContent = ''; $('feedback').className = 'feedback'; }
      $('choices').replaceChildren();
      for (const option of shown.options) {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'choice'; button.lang = shown.target;
        button.textContent = option.text; button.dataset.optionId = option.id;
        button.addEventListener('click', () => select(option.id));
        $('choices').append(button);
      }
      $('question').focus();
    }
    function select(id) {
      if (pending) return;
      pending = E.answer(course, state, shown, id);
      for (const button of $('choices').children) {
        button.disabled = true;
        if (button.dataset.optionId === shown.correctId) button.classList.add('correct');
        else if (button.dataset.optionId === id) button.classList.add('incorrect');
      }
      const feedback = $('feedback');
      feedback.className = 'feedback';
      if (!pending.feedback.correct) {
        feedback.className = 'feedback wrong';
        feedback.textContent = t('wrong');
        const translation = document.createElement('span'); translation.lang = shown.target; translation.textContent = pending.feedback.correctText;
        feedback.append(translation, document.createTextNode(t(pending.restarted ? 'reset' : 'back')));
      } else if (pending.completed) feedback.textContent = t('completed');
      else if (pending.lessonChanged) feedback.textContent = t('nextLesson', {title:messages.lessons[course.lessons[pending.state.lessonIndex].id]});
      else feedback.textContent = t('correct');
      const ticket = ++generation;
      advanceTimer = setTimeout(() => {
        if (ticket !== generation || !pending) return;
        advanceTimer = null;
        state = pending.state; pending = null;
        if (state.phase === 'complete') { screen('finished'); $('finished-title').focus(); }
        else render(false);
      }, 500);
    }
    for (const id of ['start','restart','again']) $(id).addEventListener('click', begin);
    for (const id of ['change','choose']) $(id).addEventListener('click', setup);
    screen('setup');
  } catch (error) {
    loadFailed = true;
    $('error').textContent = messages?.messages.error || 'Neizdevās ielādēt mācību materiālu. Lejupielādē failu vēlreiz.';
    $('error').hidden = false;
    $('start').disabled = true;
    for (const id of ['practice','finished']) $(id).hidden = true;
    $('setup').hidden = false;
  }
})();
