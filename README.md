# Meet the Ascenders

A small static Slay the Spire 2 character guide. Character records live in `characters.json`; DOM rendering, URL helpers, and menu behavior are kept in separate ES modules under `js/`.

## Run locally

Because the page fetches `characters.json`, open it through a local web server rather than as a `file://` URL. From this folder, run:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Character profiles use URLs such as `http://localhost:8000/?id=ironclad`.
