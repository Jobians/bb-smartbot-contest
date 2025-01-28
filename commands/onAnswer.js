/*CMD
  command: onAnswer
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

function rejectWrongAnswer(taskID, skip = false) {
  let cmdName = skip ? 'skipQuiz' : 'wrongAnswer';

  quizTasker.skipTask();

  const wrongAnswerTask = quizTasker.tasks.find(item => item.id === taskID);
  if (wrongAnswerTask) {
    smartBot.add({ correctAnswer: wrongAnswerTask.correctAnswer });
    smartBot.run({
      command: cmdName,
      options: { taskID }
    });
  } else {
    smartBot.run({ command: 'quizNotFound' });
    return;
  }
}

function processAnswer(acceptedAnswer, skip = false) {
  if (acceptedAnswer.isCorrect) {
    return completeQuiz(acceptedAnswer.taskID);
  }
  rejectWrongAnswer(acceptedAnswer.taskID, skip);
}

let skipParam = false;
let taskIDToSkip = null;

if (params && params.startsWith('skip_')) {
  skipParam = true;
  taskIDToSkip = params.replace('skip_', '');
}

if (skipParam && taskIDToSkip) {
  rejectWrongAnswer(taskIDToSkip, true);
} else {
  const acceptedAnswer = quizTasker.acceptAnswer();
  if (acceptedAnswer) {
    processAnswer(acceptedAnswer);
  } else {
    smartBot.run({ command: 'quizNotFound' });
    return;
  }
}

