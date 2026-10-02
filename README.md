# Ituzaingó Studio — organization profile & branding

- `profile/README.md` — the public profile shown on [github.com/ituzaingostudio](https://github.com/ituzaingostudio).
- `svg/`, `png/` — logo files.
- `games/STUDIO.md` — the standards every game follows (single-player, PC-first, Godot 4, PS2 look). Each game's design lives in its own private repo.

## Logo files

| File | Use |
|---|---|
| `ituzaingo-wordmark` | Full wordmark, 1680×520 (PNG also at 2×). `-transparent` for placing on dark artwork. |
| `ituzaingo-cover` | Community/banner cover, 1440×456 and 720×228 (prefer the 1440×456 one). |
| `ituzaingo-icon-emblem` | **GitHub avatar** and other small profile images. Square "i" at 24%: still black on black, slightly brighter so it holds up at small sizes. |
| `ituzaingo-icon-bright` | Square "i" at 42%, for places where it must stay readable when tiny. |
| `ituzaingo-icon` | Square "i" at the logo's own 18%, for large sizes. |

The logo is meant for dark backgrounds only.

Values: background `#07090B`, mark `#C9D2C4`, Cormorant Garamond Light; letters fade from 18% opacity at the top to nothing near the baseline, with a soft blur.

## Rebuilding

```sh
npm install
npm run build
```

`build.js` outlines the text with the font and renders every SVG and PNG, so the files don't depend on the font being installed.
