# CLAUDE.md

This is Ituzaingó Studio's organization repo (`ituzaingostudio/.github`): the public GitHub profile, the logo files, and the studio standards every game follows.

| Path | What |
|---|---|
| `profile/README.md` | The **public** profile on github.com/ituzaingostudio. Anything merged here is visible to everyone. |
| `games/STUDIO.md` | Studio standards (single-player, PC-first, Godot 4, PS2 look). Games and `ps2-kit` cite its section numbers, so don't renumber sections. |
| `games/<game>/design.md` | Each game's design doc, when present. |
| `build.js`, `svg/`, `png/` | Logo generator and its output. |

## Commands

```sh
npm install
npm run build     # regenerates every SVG and PNG from build.js
```

## Rules

- Never edit files in `svg/` or `png/` by hand: change `build.js` and rebuild, then look at the changed images before committing.
- Logo values are fixed unless the user asks: background `#07090B`, mark `#C9D2C4`, Cormorant Garamond Light, letters fading from 18% opacity. The logo is for dark backgrounds only.
- Changing `STUDIO.md` changes the rules for every game: say which games and `ps2-kit` rules are affected in the PR.
- This repo is public: don't add private game details, unreleased plans, or anything from private game repos unless the user says so.
- Work on a branch, open a PR, and merge it yourself (squash). There is no CI: run `npm run build` and confirm the logo files are unchanged (or changed as intended) before merging.
