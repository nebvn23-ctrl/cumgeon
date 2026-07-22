// ============================================================================
// CUMGEON — CENTRAL CONTENT CONFIGURATION
// ----------------------------------------------------------------------------
// Every piece of copy, every media path, every external link and every
// feature flag used across the site lives in this single file.
// Edit this file to reskin, rewrite or relaunch the site — you should not
// need to touch component code to change content.
// ============================================================================

export type LoreVisual =
  | "trench"
  | "greenFields"
  | "matrix"
  | "rainbowBridge"
  | "moon"
  | "explosion"
  | "manifesto"
  | "scanner";

export interface LoreChapter {
  id: string;
  index: string; // "01" .. "09"
  title: string;
  paragraphs: string[];
  visual: LoreVisual;
  /** Large background number / stamp shown behind the character (chapter 1 uses "900x") */
  stamp?: string;
  /** Short terminal-style annotations shown as HUD chrome during the chapter */
  terminalLines?: string[];
}

export interface MemeArchiveEntry {
  id: string;
  title: string;
  classification: string;
  category: "ORIGIN" | "TRENCH" | "ASCENSION" | "INFECTION" | "CHAOS" | "SPACE";
  image: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const cumgeonConfig = {
  // ------------------------------------------------------------------------
  // IDENTITY
  // ------------------------------------------------------------------------
  identity: {
    name: "CUMGEON",
    subtitle: "THE LAST BULL OF THE TRENCHES",
    tagline: "Bull body. Pigeon genetics. Trench mentality.",
    shortDescription:
      "Bull body. Pigeon genetics. Trench mentality. Meet Cumgeon—the meme that didn't enter the meta. It infected it.",
    manifestoLine: "THE META WAS NOT FOLLOWED. IT WAS INFECTED.",
    trenchStatus: "TRENCH STATUS: CONTAMINATED",
    controlStatusDefault: "CONTROL: SITE",
    controlStatusInfected: "CONTROL: CUMGEON",
  },

  // ------------------------------------------------------------------------
  // QUOTES
  // ------------------------------------------------------------------------
  quotes: {
    hero: "Are you buying the bottom—or becoming the bottom?",
    heroSecondary: "The bull suit stays on until generational wealth.",
  },

  // ------------------------------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------------------------------
  navigation: {
    main: [
      { label: "LORE", href: "#lore" },
      { label: "MUTATION", href: "#mutation" },
      { label: "MEMES", href: "#memes" },
      { label: "COMMUNITY", href: "#community" },
    ] as NavItem[],
    buyLabel: "BUY",
  },

  // ------------------------------------------------------------------------
  // MEDIA — IMAGES
  // ------------------------------------------------------------------------
  // "scene" = full uploaded photographic environment (used as backgrounds)
  // "cutout" = background-removed CUMGEON character extraction (used for
  //            free-floating layered compositing over text/scenes)
  media: {
    scenes: {
      trenches: "/media/cumgeon/scenes/cumgeon-trenches.jpg",
      matrix: "/media/cumgeon/scenes/cumgeon-matrix.jpg",
      rainbowBridge: "/media/cumgeon/scenes/cumgeon-rainbow-bridge.jpg",
      moon: "/media/cumgeon/scenes/cumgeon-moon.jpg",
      greenFields: "/media/cumgeon/scenes/cumgeon-green-fields.jpg",
      explosion: "/media/cumgeon/scenes/cumgeon-explosion.jpg",
    },
    cutouts: {
      trenches: "/media/cumgeon/character/cumgeon-trenches-cutout.png",
      matrix: "/media/cumgeon/character/cumgeon-matrix-cutout.png",
      rainbowBridge: "/media/cumgeon/character/cumgeon-rainbow-bridge-cutout.png",
      moon: "/media/cumgeon/character/cumgeon-moon-cutout.png",
      greenFields: "/media/cumgeon/character/cumgeon-green-fields-cutout.png",
      explosion: "/media/cumgeon/character/cumgeon-explosion-cutout.png",
    },
  },

  // ------------------------------------------------------------------------
  // MEDIA — VIDEO ("THE ORIGINAL MUTATION")
  // ------------------------------------------------------------------------
  video: {
    src: "/media/cumgeon/video/cumgeon-transformation.mp4",
    poster: "/media/cumgeon/posters/cumgeon-transformation-poster.jpg",
    // Secondary silent widescreen cut of the same transmission, used as an
    // ambient looping background texture (Giant Reveal + System Failure).
    ambientLoopSrc: "/media/cumgeon/video/cumgeon-ambient-loop.mp4",
    // Real duration probed from the source file via ffprobe: 5.04s @ 24fps.
    durationSeconds: 5.04,
    // Annotation cues as a fraction (0–1) of real playback duration, so they
    // stay in sync regardless of the exact encode used.
    annotations: [
      { at: 0.0, label: "SUBJECT: FLOATING" },
      { at: 0.18, label: "TAIL RESPONSE DETECTED" },
      { at: 0.4, label: "GENETIC STRUCTURE UNSTABLE" },
      { at: 0.6, label: "TRANSFORMATION IN PROGRESS" },
      { at: 0.82, label: "PIGEON FORM CONFIRMED" },
      { at: 0.94, label: "SUBJECT MAINTAINS EYE CONTACT" },
    ],
  },

  // ------------------------------------------------------------------------
  // INTRO TERMINAL SEQUENCE
  // ------------------------------------------------------------------------
  intro: {
    lines: [
      "CONNECTING TO TRENCH NODE...",
      "SCANNING RECYCLED METAS...",
      "PANIC SELLERS DETECTED...",
      "EXIT LIQUIDITY IDENTIFIED...",
      "SEARCHING FOR LAST BULL...",
      "UNKNOWN GENETIC SIGNATURE...",
      "PIGEON: CONFIRMED",
      "BULL: POSSIBLE",
      "CUM: UNRESOLVED",
      "ENTITY FOUND: CUMGEON",
    ],
    warning: ["WARNING:", "WEAPONIZED STUPIDITY DETECTED"],
    skipLabel: "SKIP INTRO",
    soundOnLabel: "ENABLE SOUND",
    soundOffLabel: "SOUND OFF",
  },

  // ------------------------------------------------------------------------
  // HERO
  // ------------------------------------------------------------------------
  hero: {
    headline: "CUMGEON",
    subtitle: "THE LAST BULL OF THE TRENCHES",
    supportingLines: ["Pigeon genetics.", "Trench mentality."],
    scrollHint: "SCROLL TO DESCEND",
    buttons: {
      buy: "BUY CUMGEON",
      lore: "ENTER THE LORE",
      archive: "OPEN MEME ARCHIVE",
    },
  },

  // ------------------------------------------------------------------------
  // LORE JOURNEY — 9 CHAPTERS (verbatim content, do not rewrite the meaning)
  // ------------------------------------------------------------------------
  lore: [
    {
      id: "last-bull",
      index: "01",
      title: "THE LAST BULL OF THE TRENCHES",
      paragraphs: [
        "Cumgeon wasn't born in the trenches.",
        "The trenches were born inside Cumgeon.",
        "While everyone else panic-sold, chased fake callers, and became exit liquidity, Cumgeon stood perfectly still in his sacred bull suit—watching, calculating, accumulating.",
        "They called him stupid.",
        "Then his bag did a 900x.",
      ],
      visual: "trench",
      stamp: "900x",
      terminalLines: ["DEPTH: -14M", "STATUS: ACCUMULATING"],
    },
    {
      id: "sacred-bull-suit",
      index: "02",
      title: "THE SACRED BULL SUIT",
      paragraphs: [
        "Now Cumgeon wanders the blockchain grasslands, searching for worthy holders.",
        "He does not promise utility.\nHe does not whisper about roadmaps.\nHe simply stares into your soul and asks:",
        "“Are you buying the bottom—or becoming the bottom?”",
        "Every dip strengthens his horns.\nEvery holder feeds his aura.\nEvery jeet becomes fertilizer for his green fields.",
      ],
      visual: "greenFields",
      terminalLines: ["AURA: CHARGING", "HORNS: HARDENING"],
    },
    {
      id: "bull-suit-stays-on",
      index: "03",
      title: "THE BULL SUIT STAYS ON",
      paragraphs: [
        "You don't buy Cumgeon because it makes sense.",
        "You buy Cumgeon because, deep down, you already know:",
        "The bull suit stays on until generational wealth.",
      ],
      visual: "greenFields",
      terminalLines: ["MANIFESTO: LOADING"],
    },
    {
      id: "so-memeable",
      index: "04",
      title: "WHY CUMGEON IS SO MEMEABLE",
      paragraphs: [
        "Nobody knows whether Cumgeon is a dog, a pigeon, a bull, or a CUM.",
        "That's the point.",
        "His face fits every meme.\nHis lore makes no sense.\nHis name should never have existed.",
      ],
      visual: "scanner",
      terminalLines: ["IDENTITY SCAN: RUNNING"],
    },
    {
      id: "flip-the-trenches",
      index: "05",
      title: "HOW CUMGEON WILL FLIP THE TRENCHES",
      paragraphs: [
        "The trenches are full of fear, recycled metas, and broken believers.",
        "Cumgeon brings something stronger:",
        "Weaponized stupidity.",
        "He doesn't follow the meta.\nHe contaminates it.",
        "First they laugh.\nThen they meme.\nThen Cumgeon is everywhere.",
      ],
      visual: "matrix",
      terminalLines: ["META: CONTAMINATING", "IMMUNE RESPONSE: NONE"],
    },
    {
      id: "chosen-pigeon",
      index: "06",
      title: "THE CHOSEN PIGEON",
      paragraphs: [
        "Every pigeon dreams of flying.",
        "Cumgeon dreamed of something greater:",
        "Taking over the timeline.",
        "He left the flock, entered the trenches, and never looked back.",
      ],
      visual: "rainbowBridge",
      terminalLines: ["FLOCK STATUS: ABANDONED"],
    },
    {
      id: "cumgeon-effect",
      index: "07",
      title: "THE CUMGEON EFFECT",
      paragraphs: [
        "One Cumgeon meme is a joke.\nTen Cumgeon memes are a movement.\nA thousand Cumgeon memes are an unavoidable cultural infection.",
        "You don't discover Cumgeon.",
        "Cumgeon eventually reaches you.",
      ],
      visual: "matrix",
      terminalLines: ["REPLICATION: EXPONENTIAL"],
    },
    {
      id: "lunar-migration",
      index: "08",
      title: "LUNAR MIGRATION",
      paragraphs: ["Born to fly.\nForced to trench.", "The trenches needed a hero.\nThey got Cumgeon."],
      visual: "moon",
      terminalLines: ["TARGET: MOON", "ROUTE: UNGOVERNABLE"],
    },
    {
      id: "too-memeable",
      index: "09",
      title: "TOO MEMEABLE TO STOP",
      paragraphs: [
        "Too strange to ignore.\nToo memeable to stop.",
        "Bull body. Pigeon genetics. Trench mentality.",
        "He didn't enter the meta. He infected it.",
      ],
      visual: "explosion",
      terminalLines: ["DETONATION: T-MINUS 0"],
    },
  ] as LoreChapter[],

  // ------------------------------------------------------------------------
  // IDENTITY SCANNER (Chapter 04)
  // ------------------------------------------------------------------------
  identityScanner: [
    { label: "DOG?", value: "12%" },
    { label: "PIGEON?", value: "97%" },
    { label: "BULL?", value: "SPIRITUALLY" },
    { label: "CUM?", value: "CLASSIFIED" },
  ],

  // ------------------------------------------------------------------------
  // MEME ARCHIVE
  // ------------------------------------------------------------------------
  memeArchive: [
    {
      id: "trench-origin",
      title: "TRENCH ORIGIN",
      classification: "FILE 001 — RECOVERED",
      category: "TRENCH",
      image: "/media/cumgeon/scenes/cumgeon-trenches.jpg",
      alt: "Cumgeon floating through a muddy World War style trench lined with sandbags and barbed wire.",
    },
    {
      id: "meta-contamination",
      title: "META CONTAMINATION",
      classification: "FILE 002 — CLASSIFIED",
      category: "INFECTION",
      image: "/media/cumgeon/scenes/cumgeon-matrix.jpg",
      alt: "Cumgeon suspended inside a dark green data corridor made of streaming code.",
    },
    {
      id: "rainbow-ascension",
      title: "RAINBOW ASCENSION",
      classification: "FILE 003 — UNVERIFIED",
      category: "ASCENSION",
      image: "/media/cumgeon/scenes/cumgeon-rainbow-bridge.jpg",
      alt: "Cumgeon ascending a wooden staircase toward a rainbow over green fields.",
    },
    {
      id: "lunar-migration",
      title: "LUNAR MIGRATION",
      classification: "FILE 004 — DEEP SPACE",
      category: "SPACE",
      image: "/media/cumgeon/scenes/cumgeon-moon.jpg",
      alt: "Cumgeon orbiting near the moon against a field of stars.",
    },
    {
      id: "green-field-prophecy",
      title: "GREEN FIELD PROPHECY",
      classification: "FILE 005 — PASTORAL",
      category: "ORIGIN",
      image: "/media/cumgeon/scenes/cumgeon-green-fields.jpg",
      alt: "Cumgeon floating low over sunlit green grasslands.",
    },
    {
      id: "weaponized-stupidity",
      title: "WEAPONIZED STUPIDITY",
      classification: "FILE 006 — HAZARD",
      category: "CHAOS",
      image: "/media/cumgeon/scenes/cumgeon-explosion.jpg",
      alt: "Cumgeon calmly floating in front of a massive desert explosion.",
    },
    {
      id: "original-mutation",
      title: "THE ORIGINAL MUTATION",
      classification: "FILE 000 — SOURCE TRANSMISSION",
      category: "ORIGIN",
      image: "/media/cumgeon/posters/cumgeon-transformation-poster.jpg",
      alt: "Recovered transmission still of Cumgeon mid-transformation into full pigeon form.",
    },
  ] as MemeArchiveEntry[],

  archiveCategories: ["ORIGIN", "TRENCH", "ASCENSION", "INFECTION", "CHAOS", "SPACE"] as const,

  // ------------------------------------------------------------------------
  // SYSTEM FAILURE SEQUENCE
  // ------------------------------------------------------------------------
  systemFailure: {
    message: "META CONNECTION LOST",
    rebootLabel: "REBOOT",
    skipLabel: "SKIP",
  },

  // ------------------------------------------------------------------------
  // GIANT REVEAL
  // ------------------------------------------------------------------------
  giantReveal: {
    lines: [
      "THE TRENCHES NEEDED A HERO.",
      "THEY GOT CUMGEON.",
      "YOU DON'T DISCOVER CUMGEON.\nCUMGEON EVENTUALLY REACHES YOU.",
    ],
  },

  // ------------------------------------------------------------------------
  // FINAL SECTION / MANIFESTO
  // ------------------------------------------------------------------------
  finalManifesto: {
    lines: ["BUY CUMGEON.", "HOLD CUMGEON.", "BECOME UNGOVERNABLE."],
    closingLines: ["THE BULL SUIT STAYS ON", "UNTIL GENERATIONAL WEALTH."],
    departure: "THE META REMAINS CONTAMINATED.",
    idlePeek: "STILL WATCHING?",
    returnMessage: "YOU CAME BACK.",
    ctas: {
      buy: "BUY CUMGEON",
      community: "JOIN THE COMMUNITY",
      restart: "RESTART THE LORE",
    },
  },

  // ------------------------------------------------------------------------
  // EXTERNAL LINKS — placeholders only. Replace with real destinations.
  // Nothing here is invented: these are intentionally unresolved until you
  // configure them. See README.md → "Setting real external links".
  // ------------------------------------------------------------------------
  links: {
    buy: "[BUY_LINK]",
    contractAddress: "HaVA37HXw3NsfueckK7iwZk7W4UT3RPveezVdp5Tpump",
    x: "https://x.com/CUMGEON_SOL",
    telegram: "[TELEGRAM_LINK]",
    dexscreener: "[DEXSCREENER_LINK]",
  },

  // ------------------------------------------------------------------------
  // FOOTER
  // ------------------------------------------------------------------------
  footer: {
    line1: "CUMGEON is a fictional internet character. Nothing on this site is financial advice.",
    line2: "No utility, roadmap, or promise of profit is implied or offered.",
    copyright: `© ${new Date().getFullYear()} CUMGEON. Weaponized stupidity, deployed responsibly.`,
  },

  // ------------------------------------------------------------------------
  // SEO
  // ------------------------------------------------------------------------
  // Replace `siteUrl` with your real production domain once you have one —
  // it drives canonical URLs, Open Graph/Twitter image URLs and sitemap.xml.
  seo: {
    siteUrl: "https://cumgeon.example",
    title: "CUMGEON — The Last Bull of the Trenches",
    description:
      "Bull body. Pigeon genetics. Trench mentality. Meet Cumgeon—the meme that didn't enter the meta. It infected it.",
    ogImage: "/media/cumgeon/scenes/cumgeon-trenches.jpg",
    themeColor: "#0a0d08",
  },

  // ------------------------------------------------------------------------
  // FEATURE FLAGS
  // ------------------------------------------------------------------------
  featureFlags: {
    enableIntro: true,
    enableCustomCursor: true,
    enableFilmGrain: true,
    enableScanlines: true,
    enableMatrixRain: true,
    enableSystemFailureSequence: true,
    enableIdlePeek: true,
    enableSoundToggle: true,
    // Contract address UI only renders once this is flipped to true AND
    // links.contractAddress no longer contains the literal placeholder text.
    showContractAddress: true,
  },

  // ------------------------------------------------------------------------
  // AUDIO
  // ------------------------------------------------------------------------
  // No external sound-effect files were supplied with this project. Rather
  // than fabricate or source stock audio, UI "sound" is synthesized at
  // runtime with the Web Audio API (see src/lib/audio.ts) for the terminal
  // blip / pulse, and otherwise controls the transformation video's own
  // native audio track. Replace with real SFX files by editing lib/audio.ts.
  audio: {
    useSynthesizedTerminalBeep: true,
    useSynthesizedHeartbeat: true,
  },

  // ------------------------------------------------------------------------
  // MOTION / ACCESSIBILITY
  // ------------------------------------------------------------------------
  motion: {
    respectReducedMotion: true,
    // When true, reduced-motion visitors get fully static section variants
    // instead of transform/opacity transitions.
    reducedMotionDisablesParallax: true,
  },
} as const;

export type CumgeonConfig = typeof cumgeonConfig;
