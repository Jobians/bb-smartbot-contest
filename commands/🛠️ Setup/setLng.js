/*CMD
  command: setLng
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🛠️ Setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let newLang  = params; // it is "en", "hi"

Api.deleteMessage({
message_id:  request.message.message_id
});

smartBot.setUserLang(newLang);
smartBot.run({ command: '/main' });
