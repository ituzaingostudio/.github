# Ituzaingó Studio — Game Standards

> Status: **Draft v0.1** · 2026-10-02
>
> The rules every Ituzaingó game follows. A game's own design doc (`docs/design.md` in the game's private repo) covers what makes that game unique. Anything decided here doesn't need repeating there. If a game needs to break a rule, its design doc says so and explains why.

## 1. What we make

**Single-player horror games for PC, with the look of the PlayStation 2 era.**

| | Rule |
|---|---|
| **Genre** | Horror, of any kind. Folklore, psychological, survival, supernatural: whatever the game needs. |
| **Players** | Single-player only. No co-op, no online features, no multiplayer modes. |
| **Platform** | PC first: Windows, plus Linux through Steam Deck. Consoles are not a goal for now. |
| **Look** | PS2-era 3D, enforced by hard rules (§4). |
| **Connection** | Every game is fully standalone: its own world, story and characters. What links them is the studio's style. |
| **Size** | Set per game. Every game must still be finishable by one person (§8). |
| **Camera** | Set per game: first-person, third-person or fixed cameras, whatever fits. |
| **Rating** | Mature (PEGI 18 / ESRB M). Anything the story needs is allowed (§6). |

## 2. Studio pillars

These apply to every game, on top of that game's own pillars.

1. **Atmosphere first.** Darkness, fog and sound are the main tools. A scene that is scary with the monster removed is a good scene.
2. **Commit to the era.** The PS2 limits are a style, not a filter added at the end. Assets are made to the budgets from day one.
3. **Small and finished beats big and abandoned.** Scope is cut until one person can ship it.
4. **Respect real cultures.** When a game uses real folklore, places or languages, it treats them as living things, not set dressing (§6).

### 2.1 The studio's signature

**Every game mentions Ituzaingó somewhere in its world.** It's the studio's name and a real town in Corrientes, and each game hides it as part of its fiction:
- a place name, a road sign, a bus destination, a radio station
- a line of dialogue, a name on an old photo, a word scratched into a wall

It must belong to the world: never a logo, a pop-up or a wink at the camera. Players who know the studio should smile when they find it; players who don't should never notice anything odd.

Each design doc records where it appears (§10).

## 3. Engine & tools

| Area | Standard |
|---|---|
| **Engine** | **Godot 4**, latest stable release when the game starts. Each game pins its Godot version and only upgrades between milestones. |
| **Language** | GDScript with static typing everywhere (`var speed: float`, typed function signatures). |
| **Renderer** | Forward+. Switch to the Mobile renderer only if Steam Deck performance needs it. |
| **3D** | Blender, exported as glTF (`.glb`). Source `.blend` files are kept in the repo. |
| **Version control** | One GitHub repo per game under `ituzaingostudio`, created from [**godot-game-template**](https://github.com/ituzaingostudio/godot-game-template), with Git LFS for binaries (`.blend`, `.png`, `.wav`, `.ogg`, `.glb`). Work goes through PRs, and CI (script check, budgets, tests, screenshots) must pass before merging. |
| **Shared code** | The PS2 look (§4) lives in one shared Godot add-on, [**PS2 Kit**](https://github.com/ituzaingostudio/ps2-kit), used by every game, so the look stays identical and improves in one place. Its budget checker runs on every game. |
| **Tuning** | All tuning numbers for a game live in one constants resource, never scattered through the logic. |
| **Input** | Every action goes through Godot's Input Map. No hard-coded keys. |

## 4. The PS2 look — hard rules

Every game follows these budgets. They are what makes an Ituzaingó game recognizable.

### 4.1 Resolution

- The 3D scene renders at about **448 pixels tall**, like the 640×448 most PS2 games used.
- It is scaled up to the screen by a whole number, using nearest-neighbor, so pixels stay crisp. PS2 Kit picks the scale that gets closest to 448 while filling the screen, so the real height lands between about 400 and 540 (Steam Deck: 640×400, 1080p: 960×540) and there are no black bars.
- Menus, subtitles and the interface render at the screen's real resolution so they stay readable (see §5.3), but are styled to fit the era.

### 4.2 Models

| Asset | Triangle budget |
|---|---|
| Main character / monster | 3,000–6,000 |
| Other characters | 1,500–4,000 |
| Props | 50–800 |
| Whole visible scene | at most 150,000 |

- Characters use at most 32 bones.
- Shapes and silhouettes matter more than detail. Use detail in textures, not geometry.

### 4.3 Textures

- At most **256×256** for characters and environments, **128×128** or less for props. One **512×512** "hero" texture per scene is allowed (a key painting, the monster's face).
- Color textures only. **No normal, roughness or metallic maps.** Detail is painted in.
- Bilinear filtering with mipmaps, no anisotropic filtering. (The PS2 filtered textures, unlike the PS1.)
- No warping textures and no jittery vertices. That is the PS1 look, not ours.

### 4.4 Lighting

- Lighting is mostly **baked**, into vertex colors or lightmaps.
- At most **4 dynamic lights** on screen at once.
- At most **one shadow-casting light** at a time (usually the player's flashlight), with low-resolution, hard-edged shadows.
- No global illumination, ambient occlusion, screen-space reflections or volumetric lighting.
- Materials are matte and shaded per-pixel. (Per-vertex shading would be more authentic, but in Godot 4.7 it drops spotlights, and the flashlight is usually a spotlight.)

### 4.5 Fog & view distance

- Every outdoor scene has **distance fog** and a short view distance. This hid the PS2's limits, and it's one of horror's best tools.
- Indoors, darkness takes the place of fog.

### 4.6 Image treatment

PS2 Kit (§3) applies these in this order:

1. **Glow:** a soft bloom that smears bright areas, the classic "PS2 glow".
2. **Color depth:** colors reduced to 5 bits per channel, with ordered dithering, which gives the soft banding of the era.
3. **Film grain:** subtle by default.
4. **Optional TV filter:** composite blur and scanlines. Off by default; a setting turns it on.

The resolution, budgets and color depth are part of the game and can't be turned off. Grain, glow intensity and the TV filter are adjustable in settings for comfort.

## 5. PC standards

### 5.1 Input

- **Keyboard & mouse and gamepad**, fully supported, with on-screen prompts that change to match whichever was used last.
- All controls can be rebound.

### 5.2 Performance

- **60 fps on Steam Deck** at the default settings. Mid-range PCs from about 2016 onward should run the game easily.
- No launcher. The game opens straight to its title screen.

### 5.3 Steam Deck Verified

Every Steam release must meet Valve's Steam Deck Verified requirements:

- Default controls work on the Deck with no setup, and every prompt shows Deck/gamepad buttons.
- Interface text is at least 9 px tall at 1280×800 (aim for 12 px).
- The on-screen keyboard appears for any text input.
- Default settings run well on the Deck.

### 5.4 Required settings

Every game ships with at least these:

- Fullscreen / windowed, monitor choice, V-sync, frame-rate cap
- Master, music, effects and voice volume
- Control rebinding, mouse sensitivity, invert Y
- Brightness / gamma calibration screen on first launch (darkness is part of the design, so it has to be calibrated)
- Subtitles, with size and background options
- Film grain, glow intensity, TV filter
- Field of view (first-person games)
- Reduced flashing (photosensitivity)

### 5.5 Saves

- Saves and settings go in Godot's `user://` folder, through one save module per game.
- Steam Cloud enabled for Steam releases.

## 6. Content & culture

### 6.1 Rating

Games are made for adults (PEGI 18 / ESRB M). Gore, violence and disturbing themes are allowed when they serve the game.

- Every game opens with a **content warning** naming its main themes, and has a **photosensitivity warning** if it uses flashing.
- Store pages list the same content warnings.

### 6.2 Real folklore, places and languages

When a game uses real folklore (like the Pombero in *Karai Pyhare*), real places or a real language:

- Treat it as **living culture**. It can be terrifying, but it can't be mocking. No caricatures of the people or region it comes from.
- Research the source and record it in the game's design doc (a folklore reference section, plus research notes if needed).
- Use the original names and words where they fit.

## 7. Language

- **English** is the language of every game: all text, menus and voice.
- **Local touches** come from each game's lore: Guaraní names and phrases in a Pombero game, and so on. These are flavor, not a full translation, and they're checked by a native speaker before release.
- All interface and dialogue text goes in Godot translation files (CSV or PO) from day one, even with only English, so adding languages later doesn't mean digging text out of the code.

## 8. Scope for a one-person studio

The studio is one person, working with Claude. Every rule here assumes that.

- **Prove the fun first.** Every game starts with a greybox version that plays from start to finish before any final art is made.
- **Each milestone must be playable** and end in one or more merged PRs.
- **Reuse before building.** The PS2 add-on, the save module, the settings menu and the input setup are made once and reused in every game.
- **Cut list.** Every design doc has an "Out (later)" list. When the schedule slips, features move there, and the release date doesn't move.
- **Art scope:** prefer few unique assets reused cleverly (tiling textures, modular rooms) over many one-off pieces. The PS2 budgets help with this.

## 9. Release

1. **itch.io first.** Every game goes out on itch.io first, as a demo or early build, to get players and feedback.
2. **Steam for the strongest.** Games that land well on itch.io get a full Steam release: Steam Deck Verified, Steam Cloud, achievements where they fit.
3. **No microtransactions or ads** in any game.

Pricing is decided per game, before its Steam page goes up.

## 10. Every game's design doc

Each game's design doc lives in **its own private repo** as `docs/design.md`, so story details stay unpublished. It has, at minimum:

1. **Header:** status, title, engine version.
2. **Pitch**, a paragraph or two.
3. **Pillars:** 3–4 of the game's own, in addition to the studio pillars.
4. **Sources:** folklore, references or inspiration, if any are real (§6.2).
5. **Core loop** and win / lose.
6. **Camera & controls** (camera is decided per game).
7. **Map / levels.**
8. **Systems.**
9. **Audio & presentation.**
10. **MVP scope**, with an "Out (later)" list.
11. **Milestones.**
12. **Ituzaingó:** where the studio's signature appears in the game (§2.1).
13. **Exceptions:** any rule from this document the game breaks, and why. Usually empty.
14. **Open questions.**

## 11. Games

| # | Title | Status | Links |
|---|---|---|---|
| 01 | *Karai Pyhare*: a story-driven Pombero horror game | In design | [repo](https://github.com/ituzaingostudio/karai-pyhare) (private; design in `docs/`) |

## 12. Open questions

- [ ] Price range for Steam releases.
- [ ] Whether Steam Deck Verified also applies to itch.io-only releases or only to Steam.
