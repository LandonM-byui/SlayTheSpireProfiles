# Meet the Ascenders — Project Specification

## Purpose

A small, responsive character guide for *Slay the Spire 2*. Visitors can browse the roster, open a character profile using a URL query parameter, or use the menu to navigate to the roster, featured character, or a random character.

## Scope and requirements

- The page title and main heading are **Meet the Ascenders**.
- The roster includes The Ironclad, The Silent, The Defect, The Necrobinder, The Regent, and Neow.
- Character records are stored in `characters.json` and include a stable ID, display name, short bio, image URL, and presentation metadata.
- The index displays a link/card for every character.
- Selecting a character navigates to the same page with `?id=<character-id>` in the URL. The selected profile appears above the roster while the main page remains present.
- A missing `id` displays the full roster. An unrecognized `id` displays a clear error notice and keeps the roster available.
- The upper-right menu contains **All characters**, **Featured: The Ironclad**, and **Random** links.
- The menu supports open and closed states, keyboard activation, Escape to close and return focus to the trigger, and dismissal when clicking or moving keyboard focus outside it. Its `aria-expanded` value and visibility stay synchronized.
- Character data has loading feedback while it is retrieved and an error message if retrieval or validation fails.
- DOM rendering, character/URL helper functions, and menu behavior are separated into JavaScript modules.
- Styling uses a dark, ember-toned fantasy palette, serif display type, and responsive layouts inspired by the game.

## URL and navigation behavior

The site is a static single-document implementation. The query string selects the profile while preserving a shareable URL:

| URL | Result |
| --- | --- |
| `/` | Show the complete roster. |
| `/?id=ironclad` | Show The Ironclad profile and the complete roster. |
| `/?id=silent` | Show The Silent profile and the complete roster. |
| `/?id=not-a-character` | Show an invalid-character notice and the complete roster. |
| `/?random=1` | Select a random profile and replace the URL with its `?id=` URL. |

IDs are normalized to lowercase with spaces converted to hyphens before lookup. The roster cards use normal links, so browser history, reloads, bookmarks, and copy/paste of profile URLs work without client-side routing infrastructure.

## Content and presentation

Each character record provides a short descriptive bio. The selected profile also displays the character image, name, epithet, category, and a short flavor line. Image URLs are external; if an image cannot load, the portrait area displays a decorative fallback initial. The page also uses Google Fonts for Cinzel and Source Sans 3, with local system font fallbacks.

## File structure

- `index.html` — document shell, site header, menu, page title, roster region, and footer.
- `characters.json` — character content and portrait URLs.
- `styles.css` — visual theme, responsive layout, focus indicators, and reduced-motion handling.
- `js/app.js` — fetches and validates character data, resolves the URL state, and starts rendering.
- `js/characters.js` — pure ID normalization, lookup, route parsing, and random selection helpers.
- `js/render.js` — renders the roster, selected profile, and error states.
- `js/menu.js` — accessible menu state and dismissal behavior.
- `README.md` — local run instructions.

Because the page fetches `characters.json`, it should be served from a local or hosted web server rather than opened directly as a `file://` URL. See `README.md` for a local command.

## Acceptance criteria

The project is accepted when all of the following are true:

1. The browser document title and visible hero title read **Meet the Ascenders**.
2. The roster is populated from `characters.json` and contains all six requested entries, including Neow.
3. Each roster card links to the same page with the matching character ID in the query string.
4. Loading `/?id=<valid-id>` displays that character’s name, portrait (or fallback), and bio in a featured card, while keeping the roster visible.
5. Loading the page without an `id` displays the roster without a selected profile.
6. Loading the page with an unknown `id` displays an understandable invalid-ID message and leaves the roster usable.
7. If the character data cannot be fetched or is malformed, the page shows an understandable failure message instead of silently failing.
8. The interface provides visible loading feedback while character data is being fetched.
9. The menu trigger communicates its expanded/collapsed state through `aria-expanded`; opening and closing it updates both that value and the menu visibility.
10. The menu is usable by keyboard, closes on Escape while returning focus to its trigger, and closes when the user clicks or tabs outside it.
11. The menu contains working links for all characters, the Ironclad profile, and random selection.
12. Character data helpers do not manipulate the DOM, and rendering/menu responsibilities are kept in their own modules.
13. The layout remains usable on narrow screens, interactive controls have visible keyboard focus, and reduced-motion preferences are respected.

## Verification status

The implementation was reviewed against the requirements while creating the files. Automated or browser-based tests were not run.
