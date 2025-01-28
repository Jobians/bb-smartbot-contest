/*CMD
  command: lng-en
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🛠️ Setup

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const LANG_CODE = "en";

const LANG = {
  types: {
    langVer: "Lang file version: 1.0.0",
    keyboards: {
      next: [
        [{ text: "Next Question 🔄", command: "/questions" }]
      ]
    }
  },

  titles: {
    demoTasks: {
      onBotStart: "Welcome Bonus"
    }
  },

  commands: {
    "/start": {
      text: "*🎉 Welcome to the Trivia Bot! 🎉*\n\nLet’s test your knowledge with some exciting trivia questions! Choose an option below to get started. 🤩",
      keyboard: "Start Quiz 🎮\nSettings ⚙️, Leaderboard 🏆"
    },

    "/quiz": {
      alias: "Start Quiz 🎮",
      text: "📝 How many questions would you like to answer?",
      inline_buttons: [
        [
          { text: "5", command: "/quiz 5" },
          { text: "10", command: "/quiz 10" },
          { text: "20", command: "/quiz 20" },
          { text: "30", command: "/quiz 30" }
        ]
      ]
    },

    "noQuiz": {
      text: "❎ *No tasks avaible now.* \n\n⏳ Please try again later.",
      inline_buttons: []
    },

    // show question for task
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
        [{ text: "I don't know 🤷", command: "onAnswer skip_{quizId}" }],
      ]
    },

    "skipQuiz": {
      edit: true,
      text: `❌ You chose to skip this one!\nThe correct answer was: *{correctAnswer}* 😅\n\nNo worries, let’s keep going 💪!`,
      inline_buttons: "#/keyboards/next"
    },

    "correctAnswer": {
      edit: true,
      text: `🎉 Woohoo! You're correct!\n\n🎊 You just bagged *{amount} points*! Keep it up! 🚀`,
      inline_buttons: "#/keyboards/next"
    },

    "wrongAnswer": {
      edit: true,
      text: "Oh no! ❌ You missed it!\nThe right answer was: *{correctAnswer}* 😅\n\nDon’t give up, you’re almost there! 💪",
      inline_buttons: "#/keyboards/next"
    },

    "alreadyRewarded": {
      edit: true,
      text: "*✅  Already rewarded!* \n\nTask: {title}"
    },

    "/skip": {
      text: "Task skipped. You can start another task from the menu.",
      keyboard: "🔙 Back"
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

    "quizReqestFailed": {
      text: "❌ Oops! Something went wrong while fetching questions. Please try again later.",
      "edit": true,
      "message_id": "{message_id}"
    },
    
    "quizFetching": {
      text: "⏳ Please hold on while we fetch your quiz questions...",
      "edit": true
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

