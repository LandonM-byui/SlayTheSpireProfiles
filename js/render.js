const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

function portrait(character, className = '') {
  const safe = escapeHtml(character.name);
  return `<div class="portrait ${className}" aria-hidden="true"><img src="${escapeHtml(character.portrait)}" alt="${character.name}" loading="lazy" onerror="this.closest('.portrait').classList.add('portrait-fallback'); this.remove()"><span class="fallback-sigil">${safe.slice(0, 1)}</span><span class="portrait-shade"></span></div>`;
}

export function renderRoster(container, characters, selected = null, notice = '') {
  if (!characters.length) {
    container.innerHTML = '<div class="error-state"><span class="error-mark">!</span><h3>No records found</h3><p>The character archive is empty.</p></div>';
    return;
  }
  const selectedMarkup = selected ? `<article class="feature-card accent-${escapeHtml(selected.accent)}">
    ${portrait(selected, 'feature-portrait')}
    <div class="feature-copy"><p class="eyebrow small">${escapeHtml(selected.epithet)}</p><h2>${escapeHtml(selected.name)}</h2><p class="feature-bio">${escapeHtml(selected.bio)}</p><p class="feature-motif">${escapeHtml(selected.motif)}</p><a class="text-link" href="index.html">← Return to all characters</a></div>
    <div class="feature-index" aria-hidden="true">01 <span>/ 06</span></div>
  </article>` : '';
  const cards = characters.map((character, index) => `<a class="character-card accent-${escapeHtml(character.accent)}${selected?.id === character.id ? ' is-current' : ''}" href="index.html?id=${encodeURIComponent(character.id)}" aria-label="Meet ${escapeHtml(character.name)}"${selected?.id === character.id ? ' aria-current="page"' : ''}>
    ${portrait(character)}<span class="card-number">0${index + 1}</span><span class="card-copy"><span class="card-type">${escapeHtml(character.type)}</span><span class="card-name">${escapeHtml(character.name)}</span><span class="card-arrow" aria-hidden="true">↗</span></span>
  </a>`).join('');
  const noticeMarkup = notice ? `<div class="route-notice" role="alert"><span class="error-mark">!</span><p>${escapeHtml(notice)}</p><a href="index.html">Clear selection ↗</a></div>` : '';
  container.innerHTML = `${noticeMarkup}${selectedMarkup}<div class="character-grid">${cards}</div>`;
}

export function renderFailure(container, message) {
  container.innerHTML = `<div class="error-state"><span class="error-mark">!</span><h3>Unable to open the archive</h3><p>${message}</p><a class="text-link" href="index.html">Reload the character index ↗</a></div>`;
}
