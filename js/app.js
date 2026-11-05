import { getRandomCharacter, readRoute, resolveCharacter } from './characters.js';
import { renderFailure, renderRoster } from './render.js';
import { initMenu } from './menu.js';

const content = document.querySelector('#content');
const count = document.querySelector('#character-count');
initMenu();

async function loadCharacters() {
  try {
    const response = await fetch('./characters.json');
    if (!response.ok) throw new Error(`The archive returned ${response.status}.`);
    const characters = await response.json();
    if (!Array.isArray(characters) || !characters.every((item) => item.id && item.name && item.bio && item.portrait)) {
      throw new Error('The character records are incomplete or malformed.');
    }
    const route = readRoute(window.location.search);
    let selected = route.id ? resolveCharacter(characters, route.id) : null;
    if (route.id && !selected) {
      renderRoster(content, characters, null, `“${route.id}” is not a recognized character. Choose a name from the roster below.`);
    } else {
      if (route.random) {
        selected = getRandomCharacter(characters);
        const url = new URL(window.location.href);
        url.search = `?id=${encodeURIComponent(selected.id)}`;
        window.history.replaceState({}, '', url);
      }
      renderRoster(content, characters, selected);
    }
    count.textContent = String(characters.length).padStart(2, '0');
    content.setAttribute('aria-busy', 'false');
  } catch (error) {
    renderFailure(content, `${error.message} Please check that characters.json is available from a local web server.`);
    content.setAttribute('aria-busy', 'false');
  }
}

loadCharacters();
