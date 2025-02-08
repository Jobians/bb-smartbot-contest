/*CMD
  command: lng-hi
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🛠️ Setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const LANG_CODE = "hi";
const currentLang = "🇮🇳 Hinglish";

const LANG = {
  types: {
    langVer: "Lang file version: 1.0.0",
    keyboards: {
      next: [
        [{ text: "Agla Sawal 🔄", command: "/questions" }]
      ],
      back: [
        [{ text: "⬅️ Wapas Sawalon Par", command: "/questions" }]
      ],
      language: [
        [{ text: currentLang, command: "setLng hi" },
        { text: "🇺🇸 English", command: "setLng en" }
        ]
      ]
    }
  },
  titles: {
    curLang: currentLang,
    leaderboard: {
      title: "*🏆 Quiz Leaderboard 🏆*",
      no_leaderboard: "🏆 *Abhi tak koi leaderboard nahi hai!*\n\n🎮 Thoda quiz khelo aur apna naam board pe le aao!",
      user_rank: "📍 *Aapka rank #{rank} hai* _{points} {currency}_ ke saath!",
      top_champion: "👑 *Aap leaderboard champion ho!* Apni jagah bachaye rakho! 🔥",
      close_to_top: "🚀 *Aap bahut kareeb ho!* Bas *{points_needed} aur {currency}* kamao aur top position le lo!",
      not_ranked_yet: "📢 *Aap abhi tak rank nahi hue ho!*\n🎯 Aapke paas _{user_points} {currency}_ hain. Leaderboard pe aane ke liye *{points_needed} aur {currency}* kamao!",
      no_points: "📢 *Aap abhi leaderboard pe nahi ho!*\n🎯 Aur khelo taaki aapki position ban sake!",
      ranks: "{medal} {name} — _{points} {currency}_"
    },
  },
  commands: {
    "/start": {
      text: "🌍 Kripya apni bhasha chuniye. \n\nCurrent language: \"{curLang}\"",
      inline_buttons: "#/keyboards/language"
    },

    "/main": {
      text: "*🎉 Swagat hai Trivia Bot me! 🎉*\n\nChaliye apki knowledge test karte hain mazedar quiz ke saath! 🤩",
      keyboard: "Quiz Shuru Karein 🎮\nSettings ⚙️, Leaderboard 🏆"
    },

    "/quiz": {
      alias: "Quiz Shuru Karein 🎮",
      text: "🧠 Aap aaj kitne *sawal* karna chahenge?",
      inline_buttons: [
        [
          { text: "5 ⚡", command: "/quiz 5" },
          { text: "10 💪", command: "/quiz 10" },
          { text: "20 🚀", command: "/quiz 20" },
          { text: "30 🔥", command: "/quiz 30" }
        ]
      ]
    },

    "/questions": {
      edit: true,
      text: "🤔 Yeh raha aapka sawal:\n\n*{question}*\n\nApna jawab neeche se chuniye:",
      inline_buttons: [
        [
          { text: "{answer1}", command: "{onAnswer1}" },
          { text: "{answer2}", command: "{onAnswer2}" }
        ],
        [
          { text: "{answer3}", command: "{onAnswer3}" },
          { text: "{answer4}", command: "{onAnswer4}" }
        ],
        [{ text: "Is sawal ko skip karein ⏭️", command: "onAnswer skip {quizId}" }],
        [
          { text: "AI se samjhaiye 🤖", command: "onAnswer ask_ai {quizId}" }
        ]
      ]
    },

    "/settings": {
      edit: "{edit}",
      alias: "Settings ⚙️",
      text: "⚙️ *Apne Quiz Ka Experience Customize Karein!*\n\nApni pasandida difficulty aur category chuniye:",
      inline_buttons: [
        [
          { text: "{mode_easy}Aasan", command: "/settings mode easy" },
          { text: "{mode_medium}Madhyam", command: "/settings mode medium" },
          { text: "{mode_hard}Kathin", command: "/settings mode hard" }
        ],
        [
          { text: "{category_9}General Knowledge", command: "/settings category 9" },
          { text: "{category_18}Science: Computers", command: "/settings category 18" }
        ],
        [
          { text: "{category_30}Science: Gadgets", command: "/settings category 30" },
          { text: "{category_15}Entertainment: Video Games", command: "/settings category 15" }
        ],
        [
          { text: "{category_17}Science & Nature", command: "/settings category 17" },
          { text: "{category_28}Vehicles", command: "/settings category 28" }
        ],
        [
          { text: "{category_19}Science: Mathematics", command: "/settings category 19" },
          { text: "{category_29}Entertainment: Comics", command: "/settings category 29" }
        ]
      ]
    },

    "/leaderboard": {
      alias: "Leaderboard 🏆",
      text: `{leaderboardText}{ranks}\n{userRankText}`
    },

    "skipQuiz": {
      edit: true,
      text: `❌ Aapne ye question skip kar diya!\nSahi jawab tha: *{correctAnswer}* 😅\n\nChaliye agla sawal karte hain! 💪`,
      inline_buttons: "#/keyboards/next"
    },

    "correctAnswer": {
      edit: true,
      text: `🎉 Wah! Sahi jawab!\n\n🎊 Aapne *{amount} {currency}* kama liya! Aise hi aage badhte raho! 🚀`,
      inline_buttons: "#/keyboards/next"
    },

    "wrongAnswer": {
      edit: true,
      text: "Oh no! ❌ Galat jawab!\nSahi jawab tha: *{correctAnswer}* 😅\n\nHimmat mat haaro, agle wale mein sahi karna! 💪",
      inline_buttons: "#/keyboards/next"
    },

    "quizNotFound": {
      text: "🚫 Oops! Ye quiz ab available nahi hai.",
      inline_buttons: [],
      edit: true
    },

    "quizBegin": {
      text: "🎯 Shandar! Aapko {count} sawal milenge.",
      inline_buttons: [
        [{ text: "Chalo shuru karein! 🤩", command: "/questions" }]
      ],
      edit: true,
      message_id: "{message_id}"
    },

    "quizFetching": {
      text: "⏳ Kripya rukiye, hum aapke quiz ke sawal le rahe hain...",
      edit: true
    },

    "quizRequestFailed": {
      text: "❌ Oops! Sawal fetch karte samay kuch gadbad ho gayi. Kripya baad mein koshish karein.",
      edit: true,
      message_id: "{message_id}"
    },

    "aiResponseReceived": {
      edit: true,
      text: "💡 Yeh raha AI ka jawab jo aapne manga tha: \n\n```🤖Meta-Llama-3.3\n{response}```",
      message_id: "{message_id}",
      inline_buttons: "#/keyboards/back"
    },

    "/result": {
      text: `🎉 *Quiz Pura Hua!* 🎉\n\nBadhai ho! Aapka performance yeh raha:\n\n🏅 **Aapka Score**: *{score}* / *{totalQuestions}*\n🎯 **Sahi jawab percentage**: *{accuracy}%*\n💰 **Total Points**: *{totalPoints}*\n\n🔥 **Badiya khela!** Agle challenge ke liye tayyar ho?`,
      inline_buttons: [
        [{ text: "Naya Quiz Shuru Karein 🎮", command: "/quiz" }],
        [{ text: "Leaderboard 🏆", command: "/leaderboard" }]
      ],
      edit: true
    },
  }
};

// Bot ko language config ke saath setup karein
smartBot.setupLng(LANG_CODE, LANG);

