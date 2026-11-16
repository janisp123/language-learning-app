(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  try {
    const E = globalThis.LanguageEngine;
    const course = E.validateCourse(JSON.parse($('course-data').textContent));
    const languages = {lv:'Latvian', ru:'Russian'};
    let state = null;
    let shown = null;
    let pending = null;
    let advanceTimer = null;
    let generation = 0;

    function cancelAdvance() {
      if (advanceTimer !== null) clearTimeout(advanceTimer);
      advanceTimer = null; generation++; pending = null;
    }

    for (const lesson of course.lessons) {
      const item = document.createElement('li'); item.textContent = lesson.title; $('lesson-list').append(item);
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
      state = E.start(course, $('direction').value);
      pending = null; screen('practice'); render();
    }
    function render(clearFeedback = true) {
      const lesson = course.lessons[state.lessonIndex];
      shown = E.question(course, state);
      $('lesson-label').textContent = `Lesson ${state.lessonIndex + 1} of ${course.lessons.length}`;
      $('lesson-title').textContent = lesson.title;
      $('direction-label').textContent = `${languages[shown.source]} → ${languages[shown.target]}`;
      $('instruction').textContent = `Choose the ${languages[shown.target]} translation`;
      $('question').textContent = shown.text; $('question').lang = shown.source;
      $('progress').value = state.consecutive;
      $('progress').textContent = `${state.consecutive} of 10`;
      $('progress-label').textContent = `Consecutive correct: ${state.consecutive} of 10`;
      $('mistakes').textContent = `Mistakes in this block: ${state.mistakes} of 3`;
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
        feedback.textContent = 'Not quite. Correct translation: ';
        const translation = document.createElement('span'); translation.lang = shown.target; translation.textContent = pending.feedback.correctText;
        feedback.append(translation, document.createTextNode(pending.restarted
          ? ' Third mistake in this block. Starting again at lesson 1, question 1.'
          : ' Restarting this block at question 1; the consecutive count resets.'));
      } else if (pending.completed) feedback.textContent = 'Correct. You have completed the final lesson.';
      else if (pending.lessonChanged) feedback.textContent = `Correct. Next: ${course.lessons[pending.state.lessonIndex].title}.`;
      else feedback.textContent = 'Correct. Moving to the next prompt.';
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
    $('error').textContent = 'The lesson data could not be loaded. Please download a fresh test build or report the problem on GitHub.';
    $('error').hidden = false;
    $('start').disabled = true;
    for (const id of ['practice','finished']) $(id).hidden = true;
    $('setup').hidden = false;
  }
})();
