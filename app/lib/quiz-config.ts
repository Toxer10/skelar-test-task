import { QuizEntry, QuizQuestion, QuizAnswers, Reaction } from "./types";

// Language name helpers for factory questions
const LANG_NAME_GEN: Record<string, { uk: string; en: string }> = {
  english: { uk: "англійської", en: "English" },
  spanish: { uk: "іспанської", en: "Spanish" },
  german:  { uk: "німецької",  en: "German"  },
};

const LANG_NAME_INS: Record<string, { uk: string; en: string }> = {
  english: { uk: "з англійською", en: "with English" },
  spanish: { uk: "з іспанською",  en: "with Spanish" },
  german:  { uk: "з німецькою",   en: "with German"  },
};

// Q6: Prior experience with the chosen language
function makeQ6(answers: QuizAnswers): QuizQuestion {
  const lang = answers[1] as string;
  const name = LANG_NAME_GEN[lang] ?? LANG_NAME_GEN.english;

  return {
    id: 6,
    type: "single",
    question: {
      uk: `Ти навчався ${name.uk} раніше?`,
      en: `Have you studied ${name.en} before?`,
    },
    subtitle: {
      uk: "Розкажи — підберемо правильну точку входу",
      en: "Tell us — we'll find the right entry point for you",
    },
    options: [
      {
        id: "scratch",
        emoji: "🌱",
        label: { uk: "Ніколи не пробував — з нуля", en: "Never tried — starting fresh" },
        value: "scratch",
      },
      {
        id: "school",
        emoji: "🏫",
        label: { uk: "Трохи в школі, але давно забув", en: "A bit in school, mostly forgotten" },
        value: "school",
      },
      {
        id: "gave_up",
        emoji: "📦",
        label: { uk: "Починав сам, але кинув", en: "Tried self-studying but quit" },
        value: "gave_up",
      },
      {
        id: "has_base",
        emoji: "🔑",
        label: { uk: "Є база — хочу говорити вільно", en: "I have a base — want to speak freely" },
        value: "has_base",
      },
    ],
    aiReaction: (values) => {
      const reactions: Record<string, Reaction> = {
        scratch: {
          message: {
            uk: "Найчесніший старт — ніяких звичок, які треба ламати. Починаємо разом з нуля.",
            en: "The most honest start — no habits to unlearn. We begin from scratch, together.",
          },
        },
        school: {
          message: {
            uk: "Школа дала більше, ніж здається. Часто виявляється, що знаєш набагато більше ніж думаєш — просто треба це розбудити.",
            en: "School gave you more than you think. Often you know far more than you realize — we just need to wake it up.",
          },
        },
        gave_up: {
          message: {
            uk: "Те, що ти пробував — вже говорить про тебе. Щось конкретне зупинило, і ми це знайдемо та виправимо.",
            en: "The fact that you tried says a lot. Something specific stopped you — we'll find it and fix it.",
          },
        },
        has_base: {
          message: {
            uk: "Ідеально — є база, є мотивація. Нам залишається перетворити знання на живе мовлення.",
            en: "Perfect — you have the base, you have the drive. We just need to turn knowledge into real speech.",
          },
        },
      };
      return reactions[values[0]] ?? { message: { uk: "Зрозуміло!", en: "Got it!" } };
    },
  };
}

// Q7: Current situation with the chosen language
function makeQ7(answers: QuizAnswers): QuizQuestion {
  const lang = answers[1] as string;
  const name = LANG_NAME_INS[lang] ?? LANG_NAME_INS.english;

  return {
    id: 7,
    type: "single",
    question: {
      uk: `Де ти зараз ${name.uk}?`,
      en: `Where are you right now ${name.en}?`,
    },
    subtitle: {
      uk: "Обери найближче до твоєї ситуації",
      en: "Pick what's closest to your situation",
    },
    options: [
      {
        id: "zero",
        emoji: "👀",
        label: { uk: "Бачу і чую — але нічого не розумію", en: "I see and hear it — but understand nothing" },
        value: "zero",
      },
      {
        id: "passive",
        emoji: "👂",
        label: { uk: "Розумію трохи, але говорити не виходить", en: "I understand a little but can't speak" },
        value: "passive",
      },
      {
        id: "struggling",
        emoji: "💬",
        label: { uk: "Спілкуюся, але з паузами і помилками", en: "I communicate but with pauses and mistakes" },
        value: "struggling",
      },
      {
        id: "reading",
        emoji: "📖",
        label: { uk: "Читаю добре, але говорити — страшно", en: "I read well but speaking terrifies me" },
        value: "reading",
      },
    ],
    aiReaction: (values) => {
      const reactions: Record<string, Reaction> = {
        zero: {
          message: {
            uk: "Це найкраща точка старту — ніяких поганих звичок. Побудуємо розуміння з першого уроку.",
            en: "Actually the best starting point — no bad habits. We'll build comprehension from lesson one.",
          },
        },
        passive: {
          message: {
            uk: "Пасивне розуміння є — а це вже половина шляху. Навчимо мозок переходити від «розумію» до «кажу».",
            en: "You have passive comprehension — that's half the journey. Now we teach your brain to go from 'understand' to 'speak'.",
          },
        },
        struggling: {
          message: {
            uk: "Паузи і помилки — це не проблема, це процес. Зробимо так, щоб слова починали приходити самі.",
            en: "Pauses and mistakes aren't a problem — they're the process. We'll make words start coming on their own.",
          },
        },
        reading: {
          message: {
            uk: "Класичний розрив між пасивним і активним. Знання є — просто ще не «розговорилися». Виправимо.",
            en: "Classic gap between passive and active. The knowledge is there — it just hasn't been spoken yet. We'll fix that.",
          },
        },
      };
      return reactions[values[0]] ?? { message: { uk: "Зрозуміло!", en: "Got it!" } };
    },
  };
}

export const QUESTIONS: QuizEntry[] = [
  // Q1: Language choice
  {
    id: 1,
    type: "single",
    question: {
      uk: "Яку мову ти мрієш освоїти?",
      en: "Which language do you want to learn?",
    },
    subtitle: {
      uk: "Вибери мову — і ми підберемо ідеальний темп навчання",
      en: "Pick a language — we'll build the perfect learning pace for you",
    },
    options: [
      { id: "en", emoji: "🇬🇧", label: { uk: "Англійська", en: "English" }, value: "english" },
      { id: "es", emoji: "🇪🇸", label: { uk: "Іспанська",  en: "Spanish" }, value: "spanish" },
      { id: "de", emoji: "🇩🇪", label: { uk: "Німецька",   en: "German"  }, value: "german"  },
    ],
  },

  // Q2: Goal (multi-select)
  {
    id: 2,
    type: "multi",
    maxSelections: 3,
    question: {
      uk: "Яка твоя головна ціль?",
      en: "What's your main goal?",
    },
    options: [
      { id: "it",     emoji: "💻", label: { uk: "Отримати офер в IT",              en: "Land a job in IT"              }, value: "it_job"       },
      { id: "travel", emoji: "✈️", label: { uk: "Вільно говорити в подорожах",      en: "Travel without stress"         }, value: "travel"       },
      { id: "reloc",  emoji: "🏠", label: { uk: "Переїхати без стресу",             en: "Relocate stress-free"          }, value: "relocation"   },
      { id: "series", emoji: "🍿", label: { uk: "Дивитися серіали без субтитрів",   en: "Watch shows without subtitles" }, value: "entertainment"},
      { id: "career", emoji: "📈", label: { uk: "Кар'єрне зростання та зарплата",  en: "Career growth & salary"        }, value: "career"       },
    ],
  },

  // Q3: Past pain
  {
    id: 3,
    type: "single",
    question: {
      uk: "Що дратувало у навчанні раніше?",
      en: "What annoyed you about learning before?",
    },
    subtitle: {
      uk: "Розкажи — ми це виправимо",
      en: "Tell us — we'll fix it",
    },
    options: [
      { id: "grammar", emoji: "📚", label: { uk: "Нудна граматика й таблиці",    en: "Boring grammar & tables"    }, value: "boring_grammar"  },
      { id: "fear",    emoji: "😓", label: { uk: "Страх зробити помилку",         en: "Fear of making mistakes"    }, value: "fear_of_mistakes"},
      { id: "time",    emoji: "⏰", label: { uk: "Немає часу на довгі уроки",     en: "No time for long lessons"   }, value: "no_time"         },
      { id: "money",   emoji: "💸", label: { uk: "Дорогі репетитори",             en: "Expensive tutors"           }, value: "expensive"       },
    ],
    aiReaction: (values) => {
      const map: Record<string, Reaction> = {
        boring_grammar: {
          message: { uk: "Граматика — найпоширеніший бар'єр у навчанні",         en: "Grammar is the most common learning barrier"       },
          stat:    { uk: "81% учнів відзначили те саме",                          en: "81% of learners said the same"                     },
        },
        fear_of_mistakes: {
          message: { uk: "Страх помилок є у кожного початківця",                 en: "Fear of mistakes is universal for beginners"       },
          stat:    { uk: "74% людей, які починали з нами, відчували те саме",    en: "74% of people who started with us felt the same"   },
        },
        no_time: {
          message: { uk: "Час — найцінніший ресурс, ми це розуміємо",            en: "Time is precious — we totally get it"              },
          stat:    { uk: "Наші уроки займають лише 5–15 хвилин",                 en: "Our lessons take just 5–15 minutes"                },
        },
        expensive: {
          message: { uk: "Дорогі репетитори — справжня проблема",               en: "Expensive tutors are a real problem"               },
          stat:    { uk: "LinguaAI коштує у 10 разів менше, ніж репетитор",      en: "LinguaAI costs 10x less than a private tutor"      },
        },
      };
      return map[values[0]] ?? { message: { uk: "Зрозуміло! Врахуємо це у твоєму плані", en: "Got it! We'll factor this into your plan" } };
    },
  },

  // Q4: Learning style
  {
    id: 4,
    type: "single",
    question: {
      uk: "Як ти краще засвоюєш нове?",
      en: "How do you learn best?",
    },
    subtitle: {
      uk: "Підлаштуємо метод навчання під тебе",
      en: "We'll match the method to how your brain works",
    },
    options: [
      { id: "convo",   emoji: "🗣️", label: { uk: "Через живу розмову",            en: "Through live conversation"          }, value: "conversation" },
      { id: "drills",  emoji: "🔁", label: { uk: "Через вправи та повтори",       en: "Through exercises & repetition"     }, value: "exercises"    },
      { id: "reading", emoji: "📖", label: { uk: "Через текст і читання",         en: "Through reading & text"             }, value: "reading"      },
      { id: "mix",     emoji: "🎯", label: { uk: "Мікс — все потроху",            en: "A mix of everything"                }, value: "mix"          },
    ],
  },

  // Q5: Topics (multi-select)
  {
    id: 5,
    type: "multi",
    maxSelections: 3,
    question: {
      uk: "Які теми змушують твої очі світитися?",
      en: "Which topics make your eyes light up?",
    },
    options: [
      { id: "tech",   emoji: "🤖", label: { uk: "Технології та ШІ",        en: "Tech & AI"            }, value: "tech"       },
      { id: "psych",  emoji: "🧠", label: { uk: "Психологія",               en: "Psychology"           }, value: "psychology" },
      { id: "travel", emoji: "🗺️", label: { uk: "Подорожі",                 en: "Travel"               }, value: "travel"     },
      { id: "memes",  emoji: "😂", label: { uk: "Меми та поп-культура",     en: "Memes & Pop Culture"  }, value: "memes"      },
      { id: "biz",    emoji: "📈", label: { uk: "Бізнес та стартапи",       en: "Business & Startups"  }, value: "business"   },
      { id: "cinema", emoji: "🎬", label: { uk: "Кіно та серіали",          en: "Cinema & Shows"       }, value: "cinema"     },
    ],
  },

  // Q6: Prior experience with chosen language (language-aware)
  makeQ6,

  // Q7: Current situation with chosen language (language-aware)
  makeQ7,

  // Q8: Daily time
  {
    id: 8,
    type: "single",
    question: {
      uk: "Скільки часу на день ти готовий виділити?",
      en: "How much time per day can you give?",
    },
    subtitle: {
      uk: "Чесно — без шкоди для сну і серіалів",
      en: "Be honest — without sacrificing sleep or shows",
    },
    options: [
      { id: "5",  emoji: "☕", label: { uk: "5 хв — кава-брейк",          en: "5 min — coffee break"    }, value: "5min"  },
      { id: "15", emoji: "🚇", label: { uk: "15 хв — поки їду в метро",   en: "15 min — while commuting"}, value: "15min" },
      { id: "30", emoji: "📚", label: { uk: "30 хв — серйозний намір",    en: "30 min — serious intent" }, value: "30min" },
      { id: "60", emoji: "🔥", label: { uk: "1 год+ — ультра-режим",      en: "1 hr+ — ultra mode"      }, value: "60min" },
    ],
  },

  // Q9: Speaking fear — emotional close before email
  {
    id: 9,
    type: "single",
    question: {
      uk: "Який твій головний страх при розмові?",
      en: "What's your biggest fear when speaking?",
    },
    subtitle: {
      uk: "Ми знаємо, як це подолати",
      en: "We know exactly how to overcome this",
    },
    options: [
      { id: "blank",   emoji: "💭", label: { uk: "Забуду елементарне слово",     en: "I'll blank on a simple word"          }, value: "blank"   },
      { id: "accent",  emoji: "👂", label: { uk: "Не зрозумію акцент носія",     en: "I won't understand native accents"    }, value: "accent"  },
      { id: "judged",  emoji: "👀", label: { uk: "Засудять за мій акцент",       en: "They'll judge my accent"              }, value: "judged"  },
      { id: "grammar", emoji: "🧩", label: { uk: "Зроблю граматичну помилку",    en: "I'll make a grammar mistake"          }, value: "grammar" },
    ],
    aiReaction: (values) => {
      const map: Record<string, Reaction> = {
        blank: {
          message: { uk: "Це трапляється з усіма — і це вирішується",                   en: "This happens to everyone — and it's fixable"                  },
          stat:    { uk: "Ми тренуємо активний словник, щоб слова приходили миттєво",   en: "We train active vocabulary so words come instantly"           },
        },
        accent: {
          message: { uk: "Розуміння акцентів — це навичка, не талант",                  en: "Understanding accents is a skill, not a talent"               },
          stat:    { uk: "Ми тренуємо її з перших уроків через реальне аудіо",          en: "We train it from lesson one using real audio"                 },
        },
        judged: {
          message: { uk: "Більшість носіїв раді, коли їх мову вчать",                   en: "Most native speakers are happy when people learn their language"},
          stat:    { uk: "Засуджують — одиниці. Підтримують — більшість",               en: "Judgement is rare. Support is the norm"                       },
        },
        grammar: {
          message: { uk: "Навіть носії роблять граматичні помилки",                     en: "Even native speakers make grammar mistakes"                   },
          stat:    { uk: "Головне — бути зрозумілим, а не бездоганним",                 en: "The goal is to be understood, not perfect"                    },
        },
      };
      return map[values[0]] ?? { message: { uk: "Це нормально — ми розберемося разом!", en: "That's normal — we'll tackle it together!" } };
    },
  },
];
