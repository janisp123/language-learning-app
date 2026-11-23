(function (root) {
  'use strict';
  function create(document, pack, player) {
    const $ = id => document.getElementById(id);
    player = player || root.LanguageAudio.create(pack, src => {
      const media = $('audio-media'); media.src = src; return media;
    });
    let labels, prompt = null, activeQuestion = null, generation = 0, correcting = false;
    function reset() {
      generation++; correcting = false; player.stop(); prompt = null; activeQuestion = null;
      $('question-replay').hidden = true;
      $('question-replay').disabled = true;
      $('question-audio-error').textContent = '';
    }
    function localize(source) {
      labels = pack.ui[source];
    }
    function question(shown) {
      reset(); activeQuestion = shown;
      const clip = pack.clips[shown.source]?.[shown.conceptId];
      if (!labels || !pack.directions.includes(shown.source + '-' + shown.target) || !clip || clip.text !== shown.text) return;
      prompt = {id:shown.conceptId, language:shown.source, text:clip.text};
      const button = $('question-replay');
      const label = labels.prompt + ': ' + shown.text;
      button.setAttribute('aria-label', label); button.title = label;
      button.hidden = false; button.disabled = false;
      void replay();
    }
    async function play(binding) {
      if (!binding) return;
      const ticket = ++generation;
      $('question-audio-error').textContent = '';
      const failed = () => { if (ticket === generation) $('question-audio-error').textContent = labels.error; };
      const result = await player.play(binding.id, binding.language, binding.text, failed);
      if (ticket === generation && result === false) $('question-audio-error').textContent = labels.error;
    }
    function replay() { if (!correcting) return play(prompt); }
    async function correct(shown, correctText, onRound = () => {}) {
      if (activeQuestion !== shown) return null;
      if (!labels || !pack.directions.includes(shown.source + '-' + shown.target)) return false;
      const answer = shown.options.find(item => item.id === shown.correctId);
      if (!answer || answer.text !== correctText) return false;
      const ticket = ++generation;
      correcting = true; player.stop();
      $('question-replay').disabled = true;
      $('question-audio-error').textContent = '';
      const failed = () => { if (ticket === generation) $('question-audio-error').textContent = labels.error; };
      for (let round = 1; round <= 3; round++) {
        if (ticket !== generation) return null;
        onRound(round);
        for (const binding of [{id:shown.conceptId,language:shown.source,text:shown.text}, {id:shown.correctId,language:shown.target,text:correctText}]) {
          const result = await player.playToEnd(binding.id,binding.language,binding.text,failed);
          if (ticket !== generation || result === null) return null;
          if (result !== true) { failed(); correcting = false; return false; }
        }
      }
      correcting = false;
      return true;
    }
    function option(shown, answer, button) {
      const clip = pack.clips[shown.target]?.[answer.id];
      const available = labels && pack.directions.includes(shown.source + '-' + shown.target) &&
        shown.options.some(item => item.id === answer.id && item.text === answer.text) && clip && clip.text === answer.text;
      button.disabled = !available;
      const label = (available ? labels.answer : labels?.unavailable) + ': ' + answer.text;
      button.setAttribute('aria-label', label); button.title = label;
      button.addEventListener('click', () => {
        if (button.disabled || correcting || activeQuestion !== shown) return;
        return play({id:answer.id, language:shown.target, text:answer.text});
      });
    }
    $('question-replay').addEventListener('click', replay);
    return {localize, question, option, correct, reset};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LanguageAudioView = api;
})(globalThis);
