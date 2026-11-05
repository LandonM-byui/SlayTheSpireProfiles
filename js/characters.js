export const normalizeId = (value) => typeof value === 'string'
  ? value.trim().toLowerCase().replace(/\s+/g, '-')
  : '';

export function resolveCharacter(characters, value) {
  const id = normalizeId(value);
  return characters.find((character) => character.id === id) ?? null;
}

export function getRandomCharacter(characters, currentId = '') {
  const options = characters.filter((character) => character.id !== currentId);
  return options[Math.floor(Math.random() * options.length)] ?? characters[0] ?? null;
}

export function readRoute(search) {
  const params = new URLSearchParams(search);
  return { id: params.get('id'), random: params.has('random') };
}
