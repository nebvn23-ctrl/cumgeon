# CUMGEON — The Last Bull of the Trenches

A cinematic, character-driven meme site built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP/ScrollTrigger, and Lenis smooth-scroll. CUMGEON — a bull-suited, pigeon-tailed entity — escapes the uploaded meme images and takes over the interface as you scroll.

> **Content note:** `CUMGEON` is a deliberately absurd, crude meme-coin-style character name (a portmanteau of "cum" + "pigeon"/"dungeon"), consistent with the uploaded artwork. Nothing on the site states or implies a real financial product — see "Nothing was invented" below.

---

## 1. Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build (also used by Vercel):

```bash
npm run build
npm run start
```

Requires Node.js 18.18+ (Node 20+ recommended). No environment variables are required for the site to run as shipped.

---

## 2. What's real vs. what's a placeholder

Per the brief, **nothing was invented**: there is no real contract address, buy link, exchange listing, holder count, price, partnership, or roadmap anywhere in the code. Every external destination lives in one file, `src/config/cumgeon.ts`, under `links`, as a bracketed placeholder:

```ts
links: {
  buy: "[BUY_LINK]",
  contractAddress: "[CONTRACT_ADDRESS]",
  x: "[X_LINK]",
  telegram: "[TELEGRAM_LINK]",
  dexscreener: "[DEXSCREENER_LINK]",
},
```

Until you replace these, the site behaves safely on its own:

- **BUY CUMGEON** buttons show a tasteful "LINK COMING SOON" tooltip instead of navigating anywhere.
- **Social links** (X / Telegram / Dexscreener) render dimmed and inert — not clickable, not a broken link.
- The **contract-address copy pill** in the footer doesn't render at all until you both set a real address *and* flip a feature flag (see §5).

---

## 3. Asset mapping — where every uploaded file is used

All six uploaded character images were background-removed (to produce free-floating cutouts for layering) **and** kept as full photographic scenes (for backgrounds), because different sections need different treatments.

| Uploaded file | Renamed as | Used as background in... | Used as floating cutout in... |
|---|---|---|---|
| `4becfc65-...png` (trench) | `cumgeon-trenches.jpg` / `-cutout.png` | Chapter 01, Meme Archive card "TRENCH ORIGIN" | Hero, Chapter 01, Mobile menu tail, Archive crate reveal, Intro eye-glimpse |
| `4a7a5bf2-...png` (matrix/server room) | `cumgeon-matrix.jpg` / `-cutout.png` | Chapters 05 & 07, Archive card "META CONTAMINATION", System Failure | Chapters 05 & 07, System Failure sequence |
| `a1587a00-...png` (rainbow staircase) | `cumgeon-rainbow-bridge.jpg` / `-cutout.png` | Chapter 06, Archive card "RAINBOW ASCENSION" | Chapter 06 |
| `d85f9bad-...png` (moon) | `cumgeon-moon.jpg` / `-cutout.png` | Chapter 08, Archive card "LUNAR MIGRATION" | Chapter 08 (orbit), Hero background accent, **Giant Reveal climax** |
| `7978de62-...png` (green field) | `cumgeon-green-fields.jpg` / `-cutout.png` | Chapters 02 & 03, Archive card "GREEN FIELD PROPHECY", Final section (sunrise) | Chapters 02 & 03, Final manifesto |
| `89e59c2f-...png` (explosion) | `cumgeon-explosion.jpg` / `-cutout.png` | Chapter 09, Archive card "WEAPONIZED STUPIDITY" | Chapter 09 |
| `video__1_.mp4` (square, has audio) | `cumgeon-transformation.mp4` | **"THE ORIGINAL MUTATION"** video section — this is the file with an actual audio track, so it's the one with mute/unmute controls | — |
| `video.mp4` (widescreen, silent) | `cumgeon-ambient-loop.mp4` | Shipped as a spare ambient asset (`cumgeonConfig.video.ambientLoopSrc`) for you to drop into any section as a muted background loop — not wired into a section by default, to keep the initial build lean | — |

**Note on the wide wordmark banner:** the brief mentions a seventh file (`9233b407-...png`, "official wide banner and wordmark") — it wasn't actually present among the uploaded files, only the six character scenes and two videos were. Rather than invent or substitute an unrelated stock image, the hero wordmark is built entirely in code (`LiquidWordmark.tsx`) as large, liquid-filtered display type, which the brief also explicitly allows ("reconstruct the composition into layered elements"). If you later obtain that banner file, drop it in `public/media/cumgeon/` and reference it from `cumgeonConfig.media` / the Open Graph image in `seo.ogImage`.

**Why cutouts exist at all:** the brief calls for layered masking so CUMGEON reads as "in" the scene rather than a rectangle pasted on top. The six `-cutout.png` files in `public/media/cumgeon/character/` are background-removed (via `rembg`/U²-Net) versions of the source art, used by every `<CharacterActor>` instance across the site. The explosion source photo didn't cut out cleanly (fire/smoke confused the matting model), so Chapter 09 instead layers the *trench* cutout's clean silhouette treatment isn't used there — it reuses the explosion cutout deliberately, because its rough edges blend almost seamlessly against the very same fire-toned background it was cut from.

---

## 4. Adding or replacing meme images

Everything lives in `src/config/cumgeon.ts` under `memeArchive`:

```ts
{
  id: "trench-origin",
  title: "TRENCH ORIGIN",
  classification: "FILE 001 — RECOVERED",
  category: "TRENCH", // one of: ORIGIN | TRENCH | ASCENSION | INFECTION | CHAOS | SPACE
  image: "/media/cumgeon/scenes/cumgeon-trenches.jpg",
  alt: "Cumgeon floating through a muddy World War style trench...",
}
```

To add a new meme:

1. Drop the image file into `public/media/cumgeon/scenes/` (or any `public/` path).
2. Add a new entry to the `memeArchive` array with a unique `id`, a real `category`, and descriptive `alt` text (screen readers rely on this).
3. Nothing else needs to change — the grid, filters, and lightbox all read from this array automatically.

To swap a character pose used elsewhere on the site (Hero, lore chapters, etc.), edit `media.cutouts` / `media.scenes` in the same config file — every `<CharacterActor variant="...">` reference reads from those two maps.

---

## 5. Setting real external links

Open `src/config/cumgeon.ts` and replace the placeholders in `links`:

```ts
links: {
  buy: "https://your-real-dex-or-aggregator-link",
  contractAddress: "So1anaOrEvmAddressHere...",
  x: "https://x.com/your_handle",
  telegram: "https://t.me/your_group",
  dexscreener: "https://dexscreener.com/...",
},
```

Any link left as a bracketed placeholder (e.g. still `"[X_LINK]"`) automatically stays disabled/inert across the whole site — you don't need to touch component code.

---

## 6. Adding a contract address safely

The contract-address pill is **off by default**, on purpose (so a placeholder can never accidentally look like a real, trustworthy address). To turn it on once you actually have one:

1. Set a real value for `links.contractAddress` in `src/config/cumgeon.ts`.
2. Flip the flag in the same file:
   ```ts
   featureFlags: {
     ...
     showContractAddress: true,
   }
   ```
3. The footer will now show a `CA: ...` pill with a working "copy to clipboard" button.

---

## 7. Feature flags

All in `cumgeonConfig.featureFlags`:

| Flag | Effect when `false` |
|---|---|
| `enableIntro` | Skips the cinematic terminal intro entirely |
| `enableCustomCursor` | Uses the plain system cursor everywhere |
| `enableFilmGrain` / `enableScanlines` | Disables those texture overlays |
| `enableMatrixRain` | *(reserved — MatrixRain always respects `prefers-reduced-motion` already)* |
| `enableSystemFailureSequence` | Removes the "META CONNECTION LOST" section |
| `enableIdlePeek` | Disables the idle "STILL WATCHING?" peek |
| `enableSoundToggle` | *(sound is opt-in and session-scoped either way)* |
| `showContractAddress` | See §6 |

---

## 8. Motion, sound & accessibility notes

- **Reduced motion:** every animated component checks `prefers-reduced-motion` (via `useReducedMotion`) and swaps to a static or near-instant equivalent — including a fully static, button-gated version of the opening intro. A blanket CSS safety net in `globals.css` also collapses any animation this hook doesn't already catch.
- **Sound:** nothing plays audio until the visitor explicitly enables sound (nav bar or intro screen). There are no bundled audio files — the terminal blip / heartbeat / glitch stinger the brief asks for are synthesized at runtime with the Web Audio API (`src/lib/audio.ts`), so you're not shipping (or needing to source) stock SFX. Swap in real files there if you'd prefer.
- **Custom cursor:** only hides the native OS cursor after it has successfully mounted; if anything throws during setup, the real cursor is left alone. Automatically disabled on touch/coarse-pointer devices.
- **Keyboard & screen readers:** skip-to-content link, focus-trapped modals (mobile menu, archive lightbox) with Escape-to-close and focus restoration, alt text on every meme, decorative character instances marked `aria-hidden`, visible focus rings, no information conveyed by animation alone.
- **Smooth scroll + in-page links:** Lenis powers the smooth-scroll feel. Every same-page `<a href="#...">` and the "Restart the Lore" button are routed through a shared helper (`src/lib/scroll.ts`) so they animate through Lenis instead of fighting it with a native jump.

---

## 9. Project structure

```
src/
  app/                 layout, page, globals.css, robots.ts, sitemap.ts
  components/
    navigation/        Navigation, MobileMenu
    intro/              TrenchTerminal (opening sequence)
    hero/               Hero, LiquidWordmark
    character/          CharacterActor (the reusable "CUMGEON is alive" system), CharacterEye
    lore/               LoreJourney, LoreChapter (shared chrome), IdentityScanner
    scenes/             TrenchScene, GreenFieldsScene, ScannerScene, MatrixInfectionScene,
                         RainbowAscensionScene, MoonOrbitScene, ExplosionScene, GiantReveal, MatrixRain
    archive/            MemeArchive, MemeCard, ArchiveCrate, ArchiveModal
    video/              MutationTransmission
    effects/            SmoothScroll, FilmGrain, ScanLines, ContaminationCursor,
                         ParticleField, FakeSystemFailure, AmbientPresence
    footer/             FinalManifesto
    providers/          SiteStateProvider (sound / intro / "infected" nav state)
  config/cumgeon.ts      <-- all copy, media paths, links, flags live here
  hooks/                useReducedMotion, useMediaQuery, useSoundPreference
  lib/                  utils, audio (synthesized SFX), scroll (Lenis-aware navigation)
public/media/cumgeon/    scenes/ character/ video/ posters/
```

---

## 10. Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: Vercel auto-detects **Next.js** — leave build command as `next build` / output as default.
4. No environment variables are required for the current content.
5. Deploy. That's it — video, images, fonts, and all animation run client-side with no external API dependency.

### Custom domain

1. Project → **Settings → Domains** → add your domain.
2. Add the DNS records Vercel shows you (an `A`/`ALIAS` record at the apex, a `CNAME` for `www`).
3. Verify both the root domain and `www` resolve and get HTTPS certificates issued (automatic via Vercel).
4. Update `seo.siteUrl` in `src/config/cumgeon.ts` to your real domain — this drives canonical URLs, Open Graph/Twitter card URLs, and `sitemap.xml`.

---

## 11. Known trade-offs / good next steps

- **Next.js version:** pinned to `14.2.35` (latest patched release on the 14.x line) rather than jumping to the current `16.x` line, since that would also require a React 19 upgrade and re-testing every animation library against it. The 14→16 migration is a reasonable next step but deserves its own testing pass rather than being bundled in sight-unseen.
- `npm audit` will still flag a handful of advisories against Next's middleware/RSC/i18n features — this project uses none of those (no middleware, no Server Actions, no i18n routing), so exposure is minimal, but running `npm audit fix` (or planning the v16 migration above) is worth doing before a high-stakes production launch.
- Typography currently uses system font stacks (no external font fetch), so `npm run build` never depends on network access to Google Fonts or similar. If you want a real ultra-condensed display face, add it via `next/font/local` with a licensed font file and point `--font-display` at it in `globals.css`.
- The spare silent widescreen video (`cumgeon-ambient-loop.mp4`) isn't wired into a section yet — see §3.

---

## 12. Production checklist

- [ ] Replace all five placeholders in `links` (§5)
- [ ] Decide on a real contract address and flip `showContractAddress` when ready (§6)
- [ ] Update `seo.siteUrl` to your real domain (§10)
- [ ] Swap `seo.ogImage` for the real wide banner if/when you have it (§3)
- [ ] Run `npm audit` and review the Next.js version trade-off above (§11)
- [ ] Click through the site once with a screen reader and once with `prefers-reduced-motion` enabled
- [ ] Test on at least one real iOS and one real Android device (custom cursor, sound gating, and touch targets all branch on real device capability, not just viewport width)
