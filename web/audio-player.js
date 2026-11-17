(function (root) {
  'use strict';
  function create(pack, factory = src => new Audio(src)) {
    let active = null;
    let generation = 0;
    function stop() {
      generation++;
      if (active) { active.pause(); active.currentTime = 0; active = null; }
    }
    async function play(id, language, text, onError = () => {}) {
      stop();
      const ticket = generation;
      const clip = pack.clips[language]?.[id];
      if (!clip || clip.text !== text) return false;
      try {
        active = factory(clip.src);
        active.onerror = () => { if (ticket === generation) onError(); };
        await active.play();
        return ticket === generation ? true : null;
      } catch (_) {
        return ticket === generation ? false : null;
      }
    }
    return {play, stop};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LanguageAudio = api;
})(globalThis);
