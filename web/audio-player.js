(function (root) {
  'use strict';
  function create(pack, factory = src => new Audio(src)) {
    let active = null;
    let generation = 0;
    let cancelWait = null;
    function stop() {
      generation++;
      if (cancelWait) cancelWait();
      if (active) { active.onended = null; active.onerror = null; active.pause(); active.currentTime = 0; active = null; }
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
    function playToEnd(id, language, text, onError = () => {}) {
      stop();
      const ticket = generation;
      const clip = pack.clips[language]?.[id];
      if (!clip || clip.text !== text) return Promise.resolve(false);
      return new Promise(resolve => {
        let settled = false, timer, media;
        function finish(result) {
          if (settled) return;
          settled = true; clearTimeout(timer);
          if (cancelWait === cancel) cancelWait = null;
          if (media) {
            media.onended = null; media.onerror = null;
            if (result !== true) { media.pause(); media.currentTime = 0; }
          }
          resolve(result);
        }
        const cancel = () => finish(null);
        const fail = () => { if (!settled && ticket === generation) onError(); finish(ticket === generation ? false : null); };
        cancelWait = cancel;
        try {
          media = factory(clip.src); active = media;
          media.onended = () => finish(ticket === generation ? true : null);
          media.onerror = fail;
          timer = setTimeout(fail, 30000);
          Promise.resolve(media.play()).catch(fail);
        } catch (_) { fail(); }
      });
    }
    return {play, playToEnd, stop};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LanguageAudio = api;
})(globalThis);
