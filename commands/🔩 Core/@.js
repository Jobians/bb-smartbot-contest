/*CMD
  command: @
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🔩 Core
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// SmartBot Fix
// command.name = message;

const QUIZ_REWARD = 1;
const ADMIN_TG_ID = 1350180828;
const SETUP_FOLDERS = ['🛠️ Setup'];
const OPEN_TDB_API_URL = 'https://opentdb.com/api.php';
const META_AI_API_URL = 'https://api.jobians.top/ai/beta.php';

const defaultSettings = {
  mode: null,
  category: null
};

let settings = User.getProp('settings', defaultSettings);
const quizQuestions = User.getProp('quizQuestions', []);

// Initialize SmartBot with the defined options.
let smartBot = new SmartBot({
  params: {
    currency: 'Points'
  },
  // defaultMarkdown: 'HTML',
  // strict_params: true,
  // debug: true,
  skip_cmd_folders: SETUP_FOLDERS
});

let quizTasker = new SmartTasker({
  tasks: quizQuestions,
  balance: 0,
  smartBot: smartBot
});

function completeQuiz(quizId) {
  const completedExecution = quizTasker.completeExecution(quizId);
  const taskDef = quizTasker.curTask;

  if (completedExecution) {
    smartBot.run({
      command: 'correctAnswer',
      options: {
        amount: taskDef.amount
      }
    });
    return true;
  }
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function isAdmin() {
  const adminId = ADMIN_TG_ID;
  if (!user) {
    return false;
  }
  return user.telegramid === adminId;
}

// Handle the /id command to send the user's Telegram ID.
if (message === '/id') {
  Bot.sendMessage(user.telegramid);
}
