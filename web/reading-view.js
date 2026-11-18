(function (root) {
  'use strict';
  const languages = {'lv-ru':'lv', 'ru-en':'ru', 'en-ja':'ja-Latn'};
  const notices = {
    'lv-ru':'Lasīšanas palīgs ir aptuvens. Precīzai izrunai klausies ierakstu.',
    'ru-en':'Подсказка передаёт звучание приблизительно. Слушайте запись для произношения.',
    'en-ja':'Romaji shows sounds, not English letter names. Small kana join the preceding sound (し + ゃ = sha); っ doubles the next consonant; ー lengthens a vowel. Kanji readings may belong to a group. Listen to the recording.'
  };
  function create(document, pack) {
    function render(button, direction, conceptId, original) {
      if (!Object.hasOwn(languages, direction)) return false;
      const entry = pack.directions[direction]?.[conceptId];
      if (!entry || entry.text !== original) throw new Error('Reading guide identity mismatch.');
      button.replaceChildren();
      button.setAttribute('aria-label', original);
      const content = document.createElement('span'); content.className = direction === 'en-ja' ? 'reading-symbols' : 'reading-word';
      const descriptions = [];
      for (const [index, segment] of entry.segments.entries()) {
        const unit = document.createElement('span'); unit.className = 'reading-unit';
        const base = document.createElement('span'); base.className = 'reading-base'; base.textContent = segment.text;
        const guide = document.createElement('span'); guide.className = 'reading-guide'; guide.textContent = segment.reading;
        guide.setAttribute('lang', languages[direction]);
        const id = 'reading-' + direction + '-' + conceptId + '-' + index;
        guide.setAttribute('id', id); descriptions.push(id);
        if (segment.note) { guide.setAttribute('title', segment.note); guide.setAttribute('aria-label', segment.reading + ': ' + segment.note); }
        unit.append(base, guide);
        if (segment.note && (segment.combinedReading || /^[っッー]$/.test(segment.text) || segment.text.length > 1)) {
          const role = document.createElement('span'); role.className = 'reading-role'; role.setAttribute('lang', 'en');
          role.textContent = segment.combinedReading ? '→ ' + segment.combinedReading : /[っッ]/.test(segment.text) ? 'double' : segment.text === 'ー' ? 'long' : 'group';
          unit.append(role);
        }
        content.append(unit);
      }
      button.append(content); button.setAttribute('aria-describedby', descriptions.join(' '));
      return true;
    }
    return {render, notice:direction => notices[direction] || ''};
  }
  const api = {create};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LanguageReadingView = api;
})(globalThis);
