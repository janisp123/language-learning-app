(function (root) {
  'use strict';
  function create(document, pack, player) {
    const $ = id => document.getElementById(id);
    player = player || root.LanguageAudio.create(pack, src => {
      const media = $('audio-media'); media.src = src; return media;
    });
    let labels, prompt = null, generation = 0;
    function reset() {
      generation++; player.stop(); prompt = null;
      $('question-replay').hidden = true;
      $('question-replay').disabled = true;
      $('question-audio-error').textContent = '';
    }
    function localize(source) {
      labels = pack.ui[source];
    }
    function question(shown) {
      reset();
      const clip = pack.clips[shown.source]?.[shown.conceptId];
      if (!labels || !pack.directions.includes(shown.source + '-' + shown.target) || !clip || clip.text !== shown.text) return;
      prompt = {id:shown.conceptId, language:shown.source, text:clip.text};
      const button = $('question-replay');
      const label = labels.prompt + ': ' + shown.text;
      button.setAttribute('aria-label', label); button.title = label;
      button.hidden = false; button.disabled = false;
      void replay();
    }
    async function replay() {
      if (!prompt) return;
      const ticket = ++generation;
      $('question-audio-error').textContent = '';
      const failed = () => { if (ticket === generation) $('question-audio-error').textContent = labels.error; };
      const result = await player.play(prompt.id, prompt.language, prompt.text, failed);
      if (ticket === generation && result === false) $('question-audio-error').textContent = labels.error;
    }
    $('question-replay').addEventListener('click', replay);
    return {localize, question, reset};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LanguageAudioView = api;
})(globalThis);
