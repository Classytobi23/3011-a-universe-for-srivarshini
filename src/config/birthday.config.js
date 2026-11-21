/**
 * 🌌 3011 — A Universe for Srivarshini
 * Central Configuration File
 *
 * All personal text, dates, photos, greetings, wishes, friendship slides,
 * game rewards, and secret messages are configured here.
 * Maintainable and easily customizable in one central location.
 */
import { getAssetUrl } from '../utils/assets.js';

export const BIRTHDAY_CONFIG = {
  // 1. Recipient Details
  recipient: {
    fullName: "Srivarshini",
    preferredName: "Srivarshini",
    nickname: "Sri",
    birthDate: "2006-11-30",
    timezone: "Asia/Kolkata", // Indian Standard Time (IST = UTC + 5:30)
  },

  // 2. Birthday Target & Timing Settings
  countdown: {
    targetMonth: 11, // November (1-12)
    targetDay: 30,
    targetHour: 0,
    targetMinute: 0,
    targetSecond: 0,
    timezone: "Asia/Kolkata",
    preCountdownTitle: "A Cosmic Alignment in Progress",
    preCountdownSubtitle: "Counting down every heartbeat until your universe awakens on November 30 (IST)",
    unitLabels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    }
  },

  // 3. Birthday Reveal Greeting & Activation Messages
  birthdayReveal: {
    mainGreeting: "Happy Birthday, Srivarshini.",
    supportingMessages: [
      "Today, the universe celebrates you.",
      "I made a little place on the internet just for you."
    ],
    badgeText: "November 30 • A Celestial Orbit Complete",
    enterButtonText: "Enter Your Universe",
    musicPrompt: "Tap the floating music player for the background universe melody"
  },

  // 4. Section A — Welcome / Cinematic Introduction
  welcomeSection: {
    eyebrow: "Dedicated to Srivarshini",
    title: "Welcome to Your Universe",
    subtitle: "A private realm woven from starlight, memories, and the quiet beauty of genuine friendship.",
    leadParagraph: "Out of 8 billion people across thousands of galaxies, you exist right here in this time and space—making the world infinitely brighter, kinder, and more magical just by being in it.",
    scrollPrompt: "Begin the Journey"
  },

  // 5. Section B — Memories (Ordered 1 to 5)
  // Smart-cropping data and individual aspect ratios
  memories: [
    {
      id: "memory-1",
      filename: "image1.jpeg",
      src: getAssetUrl("memories/image1.jpeg"),
      fallbackSrc: getAssetUrl("memories/image1.jpeg"),
      title: "The Opening Spark",
      subtitle: "Where our stories quietly intertwine",
      caption: "Every unforgettable journey begins with moments that seem small at first, until you look back and realize they meant everything.",
      orientation: "landscape",
      aspectRatio: "16 / 9",
      width: 720,
      height: 405,
      role: "opening",
      section: "intro"
    },
    {
      id: "memory-2",
      filename: "image2.jpeg",
      src: getAssetUrl("memories/image2.jpeg"),
      fallbackSrc: getAssetUrl("memories/image2.jpeg"),
      title: "Pure Radiance",
      subtitle: "A smile that outshines every galaxy",
      caption: "Some people bring a natural grace into every room they enter. You have always been one of those rare souls.",
      orientation: "portrait",
      aspectRatio: "9 / 16",
      width: 720,
      height: 1280,
      role: "journey",
      section: "journey-1"
    },
    {
      id: "memory-3",
      filename: "image3.jpeg",
      src: getAssetUrl("memories/image3.jpeg"),
      fallbackSrc: getAssetUrl("memories/image3.jpeg"),
      title: "Quiet Strength & Grace",
      subtitle: "The constant anchor",
      caption: "True friendship isn't about being inseparable; it's about being separated and knowing nothing truly changes.",
      orientation: "portrait",
      aspectRatio: "9 / 16",
      width: 540,
      height: 960,
      role: "journey",
      section: "journey-2"
    },
    {
      id: "memory-4",
      filename: "image4.jpeg",
      src: getAssetUrl("memories/image4.jpeg"),
      fallbackSrc: getAssetUrl("memories/image4.jpeg"),
      title: "Frames of Joy",
      subtitle: "Moments etched in gold",
      caption: "The conversations, the silly giggles, and the comfort of having someone who truly understands without needing explanations.",
      orientation: "landscape",
      aspectRatio: "4 / 3",
      width: 720,
      height: 540,
      role: "journey",
      section: "journey-3"
    },
    {
      id: "memory-5",
      filename: "image5.jpeg",
      src: getAssetUrl("memories/image5.jpeg"),
      fallbackSrc: getAssetUrl("memories/image5.jpeg"),
      title: "The Brightest Constellation",
      subtitle: "A special moment saved for the quietest hour",
      caption: "To Srivarshini: may your future be as luminous, compassionate, and beautiful as the light you bring to everyone who knows you.",
      orientation: "portrait",
      aspectRatio: "9 / 16",
      width: 720,
      height: 1280,
      role: "final-reveal",
      section: "reveal"
    }
  ],

  // 6. Section C — Friendship Corner (Tobi & Srivarshini)
  // "TWO SOULS. ONE CHAOTIC FRIENDSHIP."
  friendshipCorner: {
    badge: "Special Feature • Two Souls",
    headline: "TWO SOULS. ONE CHAOTIC FRIENDSHIP.",
    subheadline: "A cinematic spotlight on the most entertaining dynamic in this universe.",
    dynamicStatement: "ONE CREATES CHAOS. ONE HAS TO TOLERATE IT.",
    heartfeltTransition: "Somewhere between the teasing and the chaos, this friendship became something worth keeping.",
    endingMessage: [
      "Some friendships are peaceful.",
      "Ours apparently chose chaos.",
      "But somewhere between all the teasing, arguments, laughter, and nonsense, you became one of my favourite parts of life.",
      "And honestly, I wouldn't replace this friendship."
    ],
    // Atmosphere styling inspired by Tamil Nadu dusk & evening streetlights
    atmosphere: {
      locationNote: "Warm Tamil Nadu twilight • Amber streetlights meet indigo skies & jasmine breezes",
      amberGlow: "rgba(251, 191, 36, 0.12)",
      indigoGlow: "rgba(99, 102, 241, 0.15)"
    },
    slides: [
      {
        id: "tobi",
        name: "TOBI",
        title: "THE CERTIFIED RAGE-BAITER",
        subtitle: "The Mastermind of Unnecessary Arguments",
        tag: "Slide 01 • The Chaos Creator",
        photoSrc: getAssetUrl("friendship/me.jpeg"),
        fallbackPhotoSrc: getAssetUrl("friendship/me.jpeg"),
        originalAspectRatio: "1 / 1",
        objectPosition: "center",
        dimensions: { width: 1254, height: 1254 },
        accentColor: "#a855f7",
        badgeColor: "bg-purple-950/80 border-purple-500/40 text-purple-300",
        traits: [
          "Expert in instigating unnecessary arguments",
          "Acts completely innocent after causing mayhem",
          "Can debate about nothing for 45 minutes straight",
          "Teasing is his primary love language"
        ],
        description: [
          "The certified rage-baiter of the century. Someone with an Olympic-level talent for poking, provoking, and turning a completely calm conversation into absolute theatrical chaos just to see her reaction.",
          "Will argue passionately that gravity doesn't work on Tuesdays, watch her roll her eyes in disbelief, and then casually ask, 'Why are you so mad?' with the most innocent face known to humankind.",
          "Yet underneath all the nonsense, relentless teasing, and unprovoked chaos lies someone who genuinely cares more than he will ever admit out loud."
        ]
      },
      {
        id: "srivarshini",
        name: "SRIVARSHINI",
        title: "THE ONE WHO HAS TO DEAL WITH HIM",
        subtitle: "The Queen of Supreme Patience",
        tag: "Slide 02 • The Constant Anchor",
        photoSrc: getAssetUrl("friendship/srivarshini.jpeg"),
        fallbackPhotoSrc: getAssetUrl("friendship/srivarshini.jpeg"),
        originalAspectRatio: "9 / 16",
        objectPosition: "center",
        dimensions: { width: 540, height: 960 },
        accentColor: "#f472b6",
        badgeColor: "bg-pink-950/80 border-pink-500/40 text-pink-300",
        traits: [
          "Holds world record for sighing at his jokes",
          "Maintains elegance despite constant provocation",
          "The infinitely sensible and grounded half",
          "Secretly finds the chaos hilarious"
        ],
        description: [
          "The calm, radiant, and endlessly patient other half of this chaotic friendship. The person chosen by destiny to manage, endure, and somehow survive Tobi's daily barrage of nonsense.",
          "Armed with an elite repertoire of side-eyes, deep sighs, and unmatched maturity, she brings poise and warmth into every situation—even when he is actively trying to test her sanity.",
          "An extraordinary best friend with a heart made of genuine gold. Without her grace and patience, the entire universe would have fallen apart long ago."
        ]
      }
    ]
  },

  // 7. Section D — The Garden of 365 Little Wishes
  gardenOfWishes: {
    badge: "The Celestial Meadow",
    title: "THE GARDEN OF 365 LITTLE WISHES",
    subtitle: "One flower for every day of the calendar year, blooming into glowing starlight.",
    birthdayRevealBadge: "November 30 • Full Garden Bloom",
    birthdayMessage: "365 days, countless little moments, and one person who makes the universe brighter.",
    leapYearBirthdayMessage: "366 days, countless little moments, and one person who makes the universe brighter.",
    instruction: "Tap any glowing flower to unveil a sweet wish planted in the soil of time.",
    // Sample wishes pool used to populate days of the year
    wishesPool: [
      "May today bring an unexplainable wave of quiet happiness to your heart.",
      "May you always remember how much warmth and kindness you carry with you.",
      "A wish for laughter that makes your cheeks hurt and worries dissolve.",
      "May the path ahead be kind, gentle, and filled with quiet victories.",
      "A little wish for unexpected good news and peace of mind.",
      "May your tea or coffee taste especially comforting today.",
      "May you never doubt how profoundly you make this world a better place.",
      "A wish for restful sleep, soft mornings, and starry nights.",
      "May you always find someone who makes you laugh as hard as Tobi makes you annoyed.",
      "A wish for boundless courage whenever you step into the unknown.",
      "May your favorite song play on the radio right when you need it most.",
      "May people treat your soft heart with the gentle respect it deserves.",
      "A wish that all your quiet, unspoken dreams find their wings.",
      "May you always have the confidence of someone who knows she is deeply loved.",
      "A little wish for sunny skies and sweet breezes wherever you walk."
    ]
  },

  // 8. Section E — Mini Game (Catch the Stars)
  catchTheStarsGame: {
    badge: "Interactive Mini Game",
    title: "CATCH THE STARS",
    subtitle: "Gather the falling celestial stardust before the cosmic clock strikes zero.",
    instructions: "Tap or click falling stars to score points. Golden stars and hearts give cosmic bonus points. Avoid dark cosmic debris!",
    durationSeconds: 30,
    pointValues: {
      normalStar: 10,
      goldenStar: 25,
      heart: 50,
      darkDebris: -15
    },
    endMessage: "You caught the stars, but you are the brightest one in this universe.",
    secretUnlockScore: 150,
    secretUnlockedMessage: "Cosmic Master Achievement Unlocked! 🌟 You caught the stars with pure magic. Secret blessing: In every timeline, dimension, and galaxy, your light shines unmatched."
  },

  // 9. Section F — A Letter From Your Best Friend
  letter: {
    heading: "A Letter From Your Best Friend",
    subheading: "Tap the wax seal to unfold this message from my heart",
    salutation: "Dearest Srivarshini,",
    paragraphs: [
      "If anyone ever asked me what makes a friendship truly unforgettable, I wouldn't need a dictionary—I would just talk about you.",
      "Having you in my life as my best friend has been one of the greatest gifts. In a world that often rushes by too fast, your presence has always brought warmth, grounded clarity, and so much genuine laughter.",
      "I built this universe because a simple text or a generic card could never hold how much you mean to me. I wanted you to have a private corner of the world wide web that belongs exclusively to you—where the stars align in your honor, and where your memories are preserved like treasures in the sky.",
      "As you step into another chapter of life, my only wish is for you to receive all the kindness and gentleness you so freely give away. May every dream you quietly harbor find its wings, and may you never forget how deeply loved and appreciated you are.",
      "Happy Birthday, Sri. Thank you for being my constant, my confidante, and the absolute best friend anyone could ever ask for."
    ],
    closing: "Always your best friend,",
    signature: "With love, stardust, and gratitude ✨"
  },

  // 10. Section G — Star Constellation (8 Interactive Nodes)
  constellation: {
    title: "A Constellation of Wishes",
    subtitle: "Click each celestial node to illuminate a special blessing placed among the stars for you.",
    stars: [
      {
        id: 1,
        name: "Lumina",
        title: "Wish of Unending Joy",
        wish: "May your days be filled with spontaneous laughter that makes your stomach ache and worries vanish.",
        color: "#c084fc",
        x: 18,
        y: 28
      },
      {
        id: 2,
        name: "Astraea",
        title: "Wish of Inner Peace",
        wish: "May you always find quiet stillness within your heart, no matter how loud the universe becomes around you.",
        color: "#38bdf8",
        x: 35,
        y: 18
      },
      {
        id: 3,
        name: "Celeste",
        title: "Wish of Boundless Courage",
        wish: "May you always trust your extraordinary intuition and take leaps toward whatever makes your soul sing.",
        color: "#f472b6",
        x: 62,
        y: 22
      },
      {
        id: 4,
        name: "Polaris",
        title: "Wish of Constant Direction",
        wish: "Whenever you feel lost, may you remember that you are your own North Star, guided by your immense goodness.",
        color: "#818cf8",
        x: 82,
        y: 35
      },
      {
        id: 5,
        name: "Aethel",
        title: "Wish of Gentle Love",
        wish: "May you be surrounded by people who cherish your sensitivity, admire your spirit, and protect your happiness.",
        color: "#ec4899",
        x: 74,
        y: 68
      },
      {
        id: 6,
        name: "Orion",
        title: "Wish of Victory & Success",
        wish: "May every goal you chase open doors you never even imagined, rewarding your silent hard work.",
        color: "#a855f7",
        x: 48,
        y: 80
      },
      {
        id: 7,
        name: "Vega",
        title: "Wish of Wonderful Health",
        wish: "May vitality, wellness, and restful sleep accompany your steps through every sunrise and sunset.",
        color: "#38bdf8",
        x: 26,
        y: 66
      },
      {
        id: 8,
        name: "Seren",
        title: "Wish of Lifelong Wonder",
        wish: "May you never lose the innocent sparkle in your eyes that sees beauty where others only see the ordinary.",
        color: "#e879f9",
        x: 44,
        y: 44
      }
    ]
  },

  // 11. Section H — Final Photo Reveal (image5)
  finalReveal: {
    badge: "The Climax of the Sky",
    title: "The Brightest Star in the Heavens",
    subtitle: "Saved for the quietest, most emotional moment of your birthday...",
    quote: "“Some souls are so radiant, they don't just exist in the cosmos—they illuminate it.”",
    caption: "Srivarshini — today, tomorrow, and across all galaxies."
  },

  // 12. Secret Easter Eggs
  easterEgg: {
    triggerTooltip: "A faint heartbeat in the deep cosmos...",
    title: "You Discovered the Secret Star! ✨💖",
    subtitle: "A hidden message only meant for your eyes",
    message: "If you found this tiny pulsing heart, it means you're looking closely—just like you always pay attention to the little things in people's lives. In a universe of infinite possibilities, having you as my best friend is the greatest fortune I could ever have. Keep smiling, Sri. The world is so much better with you in it!",
    closing: "— Sealed forever in our universe."
  },

  // 13. Section I — Final Closing Message
  finalMessage: {
    quote: "“You are made of stardust, quiet courage, and infinite beauty.”",
    author: "Dedicated with all my heart to Srivarshini",
    celebrationText: "Happy Birthday, Sri. May this orbit be your most magical yet.",
    replayPrompt: "Travel Back to the Stars"
  },

  // 14. Background Music Settings
  music: {
    title: "Birthday Universe Melody",
    artist: "A Celestial Tribute",
    src: getAssetUrl("birthday.mpeg"),
    fallbackSrc: getAssetUrl("birthday.mpeg"),
    defaultVolume: 0.7,
    fadeDuration: 2000
  }
};

export default BIRTHDAY_CONFIG;
