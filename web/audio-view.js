(function (root) {
  'use strict';
  function create(document, pack, player) {
    const $ = id => document.getElementById(id);
    player = player || root.LanguageAudio.create(pack, src => {
      const media = $('audio-media'); media.src = src; return media;
    });
    let labels, prompt = null, activeQuestion = null, generation = 0;
    function reset() {
      generation++; player.stop(); prompt = null; activeQuestion = null;
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
    function replay() { return play(prompt); }
    function option(shown, answer, button) {
      const clip = pack.clips[shown.target]?.[answer.id];
      const available = labels && pack.directions.includes(shown.source + '-' + shown.target) &&
        shown.options.some(item => item.id === answer.id && item.text === answer.text) && clip && clip.text === answer.text;
      button.disabled = !available;
      const label = (available ? labels.answer : labels?.unavailable) + ': ' + answer.text;
      button.setAttribute('aria-label', label); button.title = label;
      button.addEventListener('click', () => {
        if (button.disabled || activeQuestion !== shown) return;
        return play({id:answer.id, language:shown.target, text:answer.text});
      });
    }
    $('question-replay').addEventListener('click', replay);
    return {localize, question, option, reset};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LanguageAudioView = api;
})(globalThis);
