(function (root) {
  'use strict';
  function create(document, pack, player) {
    const $ = id => document.getElementById(id);
    player = player || root.LanguageAudio.create(pack, src => {
      const media = $('audio-media'); media.src = src; return media;
    });
    let labels, last = null, generation = 0;
    function reset() {
      generation++; player.stop(); last = null;
      $('audio-panel').hidden = true;
      $('audio-error').textContent = '';
    }
    function localize(source) {
      labels = pack.ui[source];
      if (labels) $('audio-replay').textContent = labels.replay;
    }
    async function replay() {
      if (!last) return;
      const ticket = ++generation;
      $('audio-error').textContent = '';
      const failed = () => { if (ticket === generation) $('audio-error').textContent = labels.error; };
      const result = await player.play(last.id, last.language, last.text, failed);
      if (ticket === generation && result === false) $('audio-error').textContent = labels.error;
    }
    async function answer(shown, feedback) {
      reset();
      const clip = pack.clips[shown.target]?.[shown.correctId];
      if (!labels || !pack.directions.includes(shown.source + '-' + shown.target) || !clip || clip.text !== feedback.correctText) return;
      last = {id:shown.correctId, language:shown.target, text:clip.text};
      $('audio-caption').textContent = labels.label;
      $('audio-label').textContent = clip.text;
      $('audio-label').lang = shown.target;
      $('audio-panel').hidden = false;
      await replay();
    }
    $('audio-replay').addEventListener('click', replay);
    return {localize, answer, reset};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LanguageAudioView = api;
})(globalThis);
