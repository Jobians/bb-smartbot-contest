/*CMD
  command: lng-en
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🛠️ Setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const LANG_CODE = "en";
const currentLang = "🇺🇸 English";

const LANG = {
  types: {
    keyboards: {
      next: [
        [{ text: "Next Question 🔄", command: "/questions" }]
      ],
      back: [
        [{ text: "⬅️ Back to Questions", command: "/questions" }]
      ],
      language: [
        [{ text: currentLang, command: "setLng en" },
        { text: "🇮🇳 Hinglish", command: "setLng hi" }
        ]
      ]
    }
  },
  titles: {
    curLang: currentLang,
    leaderboard: {
      title: "*🏆 Quiz Leaderboard 🏆*",
      no_leaderboard: "🏆 *No leaderboard yet!*\n\n🎮 Play some quizzes to get on the board!",
      user_rank: "📍 *You are ranked #{rank}* with _{points} {currency}_!",
      top_champion: "👑 *You’re the leaderboard champion!* Keep defending your spot! 🔥",
      close_to_top: "🚀 *You're so close!* Earn *{points_needed} more {currency}* to take the top spot!",
      not_ranked_yet: "📢 *You're not ranked yet!*\n🎯 You have _{user_points} {currency}_. Earn *{points_needed} more {currency}* to enter the leaderboard!",
      no_points: "📢 *You're not on the leaderboard yet!*\n🎯 Play more to secure your spot!",
      ranks: "{medal} {name} — _{points} {currency}_"
    },
  },
  commands: {
    "/start": {
      text: "🌍 Please select your language. \n\nCurrent language: \"{curLang}\"",
      inline_buttons: "#/keyboards/language"
    },
    
    "/main": {
      text: "*🎉 Welcome to the Trivia Bot! 🎉*\n\nLet’s test your knowledge with some exciting trivia questions! Choose an option below to get started. 🤩",
      keyboard: "Start Quiz 🎮\nSettings ⚙️, Leaderboard 🏆"
    },

    "/quiz": {
      alias: "Start Quiz 🎮",
      text: "🧠 How many *questions* do you want to answer today?",
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
      text: "🤔 Here’s your question:\n\n*{question}*\n\nChoose your answer below:",
      inline_buttons: [
        [
          { text: "{answer1}", command: "{onAnswer1}" },
          { text: "{answer2}", command: "{onAnswer2}" }
        ],
        [
          { text: "{answer3}", command: "{onAnswer3}" },
          { text: "{answer4}", command: "{onAnswer4}" }
        ],
        [{ text: "Skip this question ⏭️", command: "onAnswer skip {quizId}" }],
        [
          { "text": "Let AI explain 🤖", "command": "onAnswer ask_ai {quizId}" }
        ]
      ]
    },

    "/settings": {
      "edit": "{edit}",
      "alias": "Settings ⚙️",
      "text": "⚙️ *Customize Your Quiz Experience!*\n\nChoose your preferred difficulty level and category to get started:",
      "inline_buttons": [
        [
          { "text": "{mode_easy}Easy", "command": "/settings mode easy" },
          { "text": "{mode_medium}Medium", "command": "/settings mode medium" },
          { "text": "{mode_hard}Hard", "command": "/settings mode hard" }
        ],
        [
          { "text": "{category_9}General Knowledge", "command": "/settings category 9" },
          { "text": "{category_18}Science: Computers", "command": "/settings category 18" }
        ],
        [
          { "text": "{category_30}Science: Gadgets", "command": "/settings category 30" },
          { "text": "{category_15}Entertainment: Video Games", "command": "/settings category 15" }
        ],
        [
          { "text": "{category_17}Science & Nature", "command": "/settings category 17" },
          { "text": "{category_28}Vehicles", "command": "/settings category 28" }
        ],
        [
          { "text": "{category_19}Science: Mathematics", "command": "/settings category 19" },
          { "text": "{category_29}Entertainment: Comics", "command": "/settings category 29" }
        ]
      ]
    },

    "/leaderboard": {
      "alias": "Leaderboard 🏆",
      text: `{leaderboardText}{ranks}\n{userRankText}`
    },

    "skipQuiz": {
      edit: true,
      text: `❌ You chose to skip this one!\nThe correct answer was: *{correctAnswer}* 😅\n\nNo worries, let’s keep going 💪!`,
      inline_buttons: "#/keyboards/next"
    },

    "correctAnswer": {
      edit: true,
      text: `🎉 Woohoo! You're correct!\n\n🎊 You just bagged *{amount} {currency}*! Keep it up! 🚀`,
      inline_buttons: "#/keyboards/next"
    },

    "wrongAnswer": {
      edit: true,
      text: "Oh no! ❌ You missed it!\nThe right answer was: *{correctAnswer}* 😅\n\nDon’t give up, you’re almost there! 💪",
      inline_buttons: "#/keyboards/next"
    },

    "quizNotFound": {
      text: "🚫 Oops! This quiz is no longer available.",
      inline_buttons: [],
      "edit": true
    },

    "quizBegin": {
      text: "🎯 Great! You’ll have {count} questions.",
      inline_buttons: [
        [{ text: "Let’s begin! 🤩", command: "/questions" }]
      ],
      "edit": true,
      "message_id": "{message_id}"
    },

    "quizRequestFailed": {
      text: "❌ Oops! Something went wrong while fetching questions. Please try again later.",
      "edit": true,
      "message_id": "{message_id}"
    },

    "quizRequestEmpty": {
      text: "❌ Not enough questions for your query. Try a smaller number of questions.",
      "edit": true,
      "message_id": "{message_id}"
    },

    "quizFetching": {
      text: "⏳ Please hold on while we fetch your quiz questions...",
      "edit": true
    },

    "aiRequestInProgress": {
      edit: true,
      text: "⏳ Your AI response is on the way, please wait a moment...",
      inline_buttons: "#/keyboards/back"
    },

    "aiResponseReceived": {
      edit: true,
      text: "💡 Here's the Ai explanation you requested: \n\n```🤖Meta-Llama-3.3\n{response}```",
      message_id: "{message_id}",
      inline_buttons: "#/keyboards/back"
    },

    "aiRequestFailed": {
      edit: true,
      text: "❌ Oops! Something went wrong while fetching the AI response.",
      message_id: "{message_id}"
    },

    "httpRequestError": {
      text: "🌐 There was an issue with the request. Please try again later.",
    },

    "!": {
      text: "🥲 Sorry, an unknown error occurred. Please try again later. 🙏",
    },

    "/result": {
      text: `🎉 *Quiz Completed!* 🎉\n\nYou did an awesome job! Here’s your performance:\n\n🏅 **Your Score**: *{score}* / *{totalQuestions}*\n🎯 **Accuracy**: *{accuracy}%*\n💰 **Total Points Bagged**: *{totalPoints}*\n\n🔥 **Great effort!** Keep going, you’re doing amazing! Ready for the next challenge?`,
      inline_buttons: [
        [{ text: "Start New Quiz 🎮", command: "/quiz" }],
        [{ text: "Leaderboard 🏆", command: "/leaderboard" }]
      ],
      "edit": true
    },
  }
};

// Setup the bot with the language configuration
smartBot.setupLng(LANG_CODE, LANG);
