/*CMD
  command: /settings
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (params) {
  const [type, value] = params.split(" ");

  const settingMap = {
    mode: 'mode',
    category: 'category'
  };

  if (settingMap[type]) {
    if (settings[settingMap[type]] === defaultSettings[settingMap[type]] && settings[settingMap[type]] === value) {
      return; 
    }
    
    // If the current value is the same as the selected value, reset to default
    if (settings[settingMap[type]] === value) {
      settings[settingMap[type]] = defaultSettings[settingMap[type]];
    } else {
      settings[settingMap[type]] = value;
    }
    
    User.setProp('settings', settings);
    smartBot.add({ edit: true });
  }
}

const { mode, category } = settings;

smartBot.add({
  [`mode_${mode}`]: '✅ ',
  [`category_${category}`]: '✅ '
});

if (params) {
  smartBot.run({ command: '/settings' });
  return;
}
