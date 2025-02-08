/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🛠️ Setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Restrict access to admins only
if (!isAdmin()) {
  return;
}

// Language configuration
// The first language acts as the default (English by default).
const languages = [
  {
    name: "English",
    code: "en",
    flag: "🇺🇸"
  },
  {
    name: "Hinglish",
    code: "hi",
    flag: "🇮🇳"
  }
];

// Register commands for each language
languages.forEach(language => {
  const commandName = `lng-${language.code}`;
  Bot.run({ command: commandName });
});

// Notify about installed languages
const allLanguages = languages.map(language => language.name).join(", ");
Bot.sendMessage(`Multi-Languages installed: ${allLanguages}`);

// Final setup message
Bot.sendMessage(
  "Bot setup done!\n\n*Please go to the /setup command > BJS and on the first line add:*\n\n`return`"
);
