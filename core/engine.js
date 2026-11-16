(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LanguageEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const directions = ['lv-ru', 'ru-lv'];
  const fail = message => { throw new Error(message); };
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const normalized = value => value.normalize('NFC').trim().toLocaleLowerCase();

  function validateCourse(course) {
    if (!course || course.schemaVersion !== 1 || !text(course.id) || !text(course.contentVersion) || course.agePath !== '10-17') fail('Unsupported course format.');
    if (JSON.stringify(course.languages) !== '["lv","ru"]') fail('Expected Latvian and Russian.');
    if (!Array.isArray(course.phrases) || !Array.isArray(course.lessons) || course.lessons.length !== 10) fail('Expected ten lessons and a phrase bank.');
    const bank = new Map();
    for (const phrase of course.phrases) {
      if (!phrase || !text(phrase.id) || !text(phrase.lv) || !text(phrase.ru) || bank.has(phrase.id)) fail('Invalid or duplicate phrase.');
      bank.set(phrase.id, phrase);
    }
    const ids = new Set();
    for (const lesson of course.lessons) {
      if (!lesson || !text(lesson.id) || !text(lesson.title) || ids.has(lesson.id) || !Array.isArray(lesson.prompts) || lesson.prompts.length !== 10) fail('Expected a unique lesson with a ten-question block.');
      ids.add(lesson.id);
      for (const prompt of lesson.prompts) {
        if (!prompt || !text(prompt.id) || ids.has(prompt.id) || !Array.isArray(prompt.distractorIds) || prompt.distractorIds.length !== 3) fail('Invalid prompt.');
        ids.add(prompt.id);
        const choices = [prompt.phraseId, ...prompt.distractorIds];
        if (new Set(choices).size !== 4 || choices.some(id => !bank.has(id))) fail('Invalid answer references.');
        for (const language of ['lv', 'ru']) {
          if (new Set(choices.map(id => normalized(bank.get(id)[language]))).size !== 4) fail('Ambiguous displayed options.');
        }
      }
    }
    return course;
  }

  function start(course, direction) {
    validateCourse(course);
    if (!directions.includes(direction)) fail('Unsupported translation direction.');
    return {courseId:course.id, direction, lessonIndex:0, promptIndex:0, consecutive:0, mistakes:0, revision:0, phase:'learning'};
  }

  function current(course, state) {
    if (!state || state.courseId !== course.id || !directions.includes(state.direction) || state.phase !== 'learning') fail('No active learning session.');
    if (!Number.isInteger(state.lessonIndex) || state.lessonIndex < 0 || state.lessonIndex >= course.lessons.length) fail('Invalid lesson.');
    const lesson = course.lessons[state.lessonIndex];
    if (!Number.isInteger(state.promptIndex) || state.promptIndex < 0 || state.promptIndex >= lesson.prompts.length || !Number.isInteger(state.consecutive) || state.consecutive < 0 || state.consecutive > 9 || !Number.isInteger(state.mistakes) || state.mistakes < 0 || state.mistakes > 2 || !Number.isSafeInteger(state.revision) || state.revision < 0) fail('Invalid session state.');
    return lesson.prompts[state.promptIndex];
  }

  function question(course, state, rng = Math.random) {
    const prompt = current(course, state);
    const [source, target] = state.direction.split('-');
    const bank = new Map(course.phrases.map(phrase => [phrase.id, phrase]));
    const options = [prompt.phraseId, ...prompt.distractorIds].map(id => ({id, text:bank.get(id)[target]}));
    for (let i = options.length - 1; i > 0; i--) {
      const value = rng();
      if (!Number.isFinite(value) || value < 0 || value >= 1) fail('Random source must return a value from zero up to one.');
      const j = Math.floor(value * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return {courseId:course.id, promptId:prompt.id, direction:state.direction, revision:state.revision, source, target, text:bank.get(prompt.phraseId)[source], correctId:prompt.phraseId, options};
  }

  function answer(course, state, shown, selectedId) {
    const prompt = current(course, state);
    if (!shown || shown.courseId !== course.id || shown.direction !== state.direction || shown.promptId !== prompt.id || shown.revision !== state.revision || !shown.options.some(option => option.id === selectedId)) fail('This answer is no longer valid.');
    const correct = selectedId === prompt.phraseId;
    const next = {...state, revision:state.revision + 1};
    let lessonChanged = false;
    let restarted = false;
    if (!correct) {
      next.promptIndex = Math.max(0, state.promptIndex - 1);
      next.consecutive = 0;
      next.mistakes++;
      if (next.mistakes === 3) {
        next.lessonIndex = 0; next.promptIndex = 0; next.mistakes = 0;
        restarted = true;
      }
    } else {
      next.consecutive++;
      if (next.consecutive === 10) {
        next.mistakes = 0;
        if (state.lessonIndex === course.lessons.length - 1) next.phase = 'complete';
        else { next.lessonIndex++; next.promptIndex = 0; next.consecutive = 0; lessonChanged = true; }
      } else next.promptIndex = (state.promptIndex + 1) % course.lessons[state.lessonIndex].prompts.length;
    }
    const target = state.direction.split('-')[1];
    return {state:next, feedback:{correct, correctText:course.phrases.find(p => p.id === prompt.phraseId)[target]}, lessonChanged, restarted, completed:next.phase === 'complete'};
  }
  return Object.freeze({validateCourse, start, question, answer});
});
