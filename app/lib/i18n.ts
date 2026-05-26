import { Lang, LocalizedString } from "./types";

export const t = (str: LocalizedString, lang: Lang): string => str[lang];

export const UI = {
  // Navigation
  continue: { uk: "Продовжити", en: "Continue" },
  back: { uk: "Назад", en: "Back" },
  next: { uk: "Далі", en: "Next" },

  // Theme toggle
  themeLight: { uk: "☀️ Світла", en: "☀️ Light" },
  themeDark:  { uk: "🌙 Темна",  en: "🌙 Dark"  },

  // Landing
  landingBadge: {
    uk: "🌍 AI-репетитор іноземних мов",
    en: "🌍 AI Language Tutor",
  },
  landingTitle: {
    uk: "Вивчай мову.\nГовори без страху.",
    en: "Learn a language.\nSpeak without fear.",
  },
  landingSubtitle: {
    uk: "Персональний репетитор з англійської та інших мов — без засудження, без нудьги. Отримай свій план за 2 хвилини.",
    en: "Your personal tutor for English and other languages — no judgment, no boredom. Get your plan in 2 minutes.",
  },
  landingCta: {
    uk: "Підібрати план — це безкоштовно →",
    en: "Get your plan — it's free →",
  },
  landingNote: {
    uk: "10 000+ людей вже навчаються",
    en: "10,000+ people already learning",
  },

  // Quiz UI
  questionOf: { uk: "питання", en: "of" },
  selectMultiple: {
    uk: "Обери до 3-х варіантів",
    en: "Choose up to 3 options",
  },
  selectedCount: { uk: "обрано", en: "selected" },

  // Analysis screen
  analysisTitle: {
    uk: "Будуємо твій профіль...",
    en: "Building your profile...",
  },
  analysisSubtitle: {
    uk: "AI аналізує твої відповіді та генерує персональний план",
    en: "AI is analysing your answers and generating a personal plan",
  },
  analysisSteps: [
    { uk: "Оцінка словникового запасу...", en: "Assessing vocabulary..." },
    {
      uk: "Підбір тем за інтересами...",
      en: "Matching topics to your interests...",
    },
    {
      uk: "Налаштування вайбу наставника...",
      en: "Calibrating tutor personality...",
    },
    {
      uk: "Генерація персонального плану...",
      en: "Generating your personal plan...",
    },
  ],
  analysisDone: {
    uk: "Готово! Твій план сформовано ✅",
    en: "Done! Your plan is ready ✅",
  },

  // Email step
  emailTitle: {
    uk: "Твій AI-наставник готовий! 🎉",
    en: "Your AI Tutor is ready! 🎉",
  },
  emailSubtitle: {
    uk: "Введи email, щоб зберегти перший діалог та отримати доступ",
    en: "Enter your email to save your first conversation and get access",
  },
  emailNamePlaceholder: { uk: "Як тебе звати?", en: "What's your name?" },
  emailPlaceholder: { uk: "твій@email.com", en: "your@email.com" },
  emailCta: { uk: "Отримати доступ 🚀", en: "Get Access 🚀" },
  emailPrivacy: {
    uk: "Без спаму. Можна відписатися будь-коли.",
    en: "No spam. Unsubscribe anytime.",
  },

  // Success page
  successBadge: { uk: "🏆 Ти зробив це!", en: "🏆 You did it!" },
  successTitle: {
    uk: "Ласкаво просимо до\nнового тебе!",
    en: "Welcome to\na new you!",
  },
  successSubtitle: {
    uk: "Твій персональний AI-наставник вже чекає. Перша розмова налаштована під твої інтереси.",
    en: "Your personal AI tutor is already waiting. First conversation is tuned to your interests.",
  },
  successCta: {
    uk: "Почати першу розмову 💬",
    en: "Start first conversation 💬",
  },
  successNote: {
    uk: "Посилання надіслано на твій email",
    en: "Link sent to your email",
  },

} as const;
