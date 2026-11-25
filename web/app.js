(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let messages;
  let loadFailed = false;
  try {
    const E = globalThis.LanguageEngine;
    const locales = JSON.parse($('ui-data').textContent);
    const audio = globalThis.LanguageAudioView?.create(document, JSON.parse($('audio-data').textContent));
    function renderTheme() {
      const dark = document.documentElement.dataset.theme === 'dark';
      $('learning-theme-toggle').textContent = dark ? '☀' : '☾';
      $('learning-theme-toggle').setAttribute('aria-pressed', String(dark));
      $('theme-color').setAttribute('content', dark ? '#14261f' : '#183f36');
    }
    $('learning-theme-toggle').addEventListener('click', () => {
      document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      renderTheme();
    });
    renderTheme();
    const focusedNode = $('focused-data');
    const focusedData = focusedNode?.textContent ? JSON.parse(focusedNode.textContent) : null;
    let legacyCourse = null;
    let course = null;
    let state = null;
    let shown = null;
    let pending = null;
    let advanceTimer = null;
    let generation = 0;

    function t(key, values = {}) {
      return messages.messages[key].replace(/\{(\w+)\}/g, (_, name) => String(values[name]));
    }
    const reports = globalThis.LanguageReport?.create(document, {
      message: t,
      getContext: () => shown && state?.phase === 'learning' ? {
        ...shown, appVersion: $('app-version').getAttribute('content'), contentVersion: course.contentVersion,
        preset: focusedData ? $('course-selection').value : 'full',
        presetLabel: focusedData ? $('course-selection').selectedOptions[0].textContent : messages.static['course-full'],
        directionLabel: `${messages.names[shown.source].label} → ${messages.names[shown.target].label}`
      } : null,
      afterClose: () => {
        if (!$('practice').hidden) $('report-open').focus();
        else if (!$('finished').hidden) $('finished-title').focus();
        else $('direction').focus();
      }
    });
    function localize() {
      const source = $('direction').value.split('-')[0];
      messages = locales[source];
      audio?.localize(source);
      document.documentElement.lang = source;
      document.title = t('pageTitle');
      $('learning-theme-toggle').setAttribute('aria-label', t('theme'));
      $('learning-theme-toggle').title = t('theme');
      $('report-open').setAttribute('aria-label',t('reportOpen'));
      $('report-open').title = t('reportOpen');
      for (const [id, value] of Object.entries(messages.static)) $(id).textContent = value;
      for (const option of $('direction').options) {
        const [from, to] = option.value.split('-');
        option.textContent = `${messages.names[from].label} → ${messages.names[to].label}`;
      }
      $('choices').setAttribute('aria-label', t('choices'));
      $('lesson-list').replaceChildren();
      if (course) for (const lesson of course.lessons) {
        const item = document.createElement('li'); item.textContent = messages.focusedLessons?.[lesson.id] || messages.lessons[lesson.id]; $('lesson-list').append(item);
      }
    }
    localize();
    $('direction').addEventListener('change', () => {
      setup(); selectCourse(); localize();
      if (loadFailed) $('error').textContent = t('error');
    });
    legacyCourse = E.validateCourse(JSON.parse($('course-data').textContent));
    course = legacyCourse;
    for (const locale of new Set(course.directions.map(direction => direction.split('-')[0]))) for (const lesson of course.lessons) {
      if (!locales[locale].lessons[lesson.id]) throw new Error('Missing lesson translation.');
    }
    if (focusedData) {
      $('course-selection').value = 'kids';
      $('course-selection').addEventListener('change',()=>{setup();selectCourse();localize();});
      selectCourse();
    } else if ($('focused-controls')) $('focused-controls').hidden = true;
    localize();

    function selectCourse() {
      if (!legacyCourse) return;
      course = focusedData && $('course-selection').value !== 'full'
        ? E.validateCourse(globalThis.LanguageCourseSelection.select(legacyCourse,focusedData,$('course-selection').value,$('direction').value))
        : legacyCourse;
    }

    function cancelAdvance() {
      reports?.reset();
      audio?.reset();
      $('correction-status').textContent = '';
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
      selectCourse(); localize();
      state = E.start(course, $('direction').value);
      pending = null; screen('practice'); render();
    }
    function render(clearFeedback = true) {
      const lesson = course.lessons[state.lessonIndex];
      shown = E.question(course, state);
      $('lesson-label').textContent = t('lesson', {n:state.lessonIndex + 1, total:course.lessons.length});
      $('lesson-title').textContent = (messages.focusedLessons?.[lesson.id] || messages.lessons[lesson.id]);
      $('direction-label').textContent = `${messages.names[shown.source].label} → ${messages.names[shown.target].label}`;
      $('instruction').textContent = t('instruction', {language:messages.names[shown.target].target});
      $('question').textContent = shown.text; $('question').lang = shown.source;
      audio?.question(shown);
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
        const row = document.createElement('div'); row.className = 'answer-option';
        const speaker = document.createElement('button');
        speaker.type = 'button'; speaker.className = 'answer-replay';
        speaker.innerHTML = $('question-replay').innerHTML;
        speaker.disabled = true;
        audio?.option(shown, option, speaker);
        row.append(button, speaker); $('choices').append(row);
      }
      $('question').focus();
    }
    function select(id) {
      if (pending) return;
      pending = E.answer(course, state, shown, id);
      for (const row of $('choices').children) {
        const [button, speaker] = row.children;
        button.disabled = true; speaker.disabled = true;
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
      else if (pending.lessonChanged) feedback.textContent = t('nextLesson', {
        n:pending.state.lessonIndex, remaining:course.lessons.length - pending.state.lessonIndex,
        title:(messages.focusedLessons?.[course.lessons[pending.state.lessonIndex].id] || messages.lessons[course.lessons[pending.state.lessonIndex].id])
      });
      else feedback.textContent = t('correct');
      const ticket = ++generation;
      function advance() {
        if (ticket !== generation || !pending) return;
        advanceTimer = null;
        $('correction-status').textContent = '';
        state = pending.state; pending = null;
        if (state.phase === 'complete') {
          audio?.reset();
          $('finished-intro').textContent = t('finishedSummary', {total:course.lessons.length});
          screen('finished'); $('finished-title').focus();
        }
        else render(false);
      }
      if (pending.feedback.correct) {
        if (audio?.selected) {
          void audio.selected(shown).then(result => {
            if (ticket !== generation || !pending || result === null) return;
            advanceTimer = setTimeout(advance,1000);
          });
        } else advanceTimer = setTimeout(advance,1000);
      } else if (audio?.correct) {
        const round = n => { if (ticket === generation) $('correction-status').textContent = t('listening',{n,total:3}); };
        void audio.correct(shown,pending.feedback.correctText,round).then(result => {
          if (ticket !== generation || !pending || result === null) return;
          if (result === true) advance();
          else advanceTimer = setTimeout(advance,500);
        });
      } else advanceTimer = setTimeout(advance,500);
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
