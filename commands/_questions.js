/*CMD
  command: /questions
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const questions = quizTasker.getTasksForWork();
const quizQuestion = questions[0];

if (quizQuestion) {
  quizTasker.defineTask(quizQuestion);
  quizTasker.prepareTaskQuestion({
    taskID: quizQuestion.id,
    onAnswer: 'onAnswer'
  });

  smartBot.add({ quizId: quizQuestion.id });
} else {
  const quizStats = User.getProp('SmartTasker.default:completedTasks');

  if (quizStats) {
    const completedCount = quizStats.completedCount || 0;
    const skippedCount = quizStats.skippedCount || 0;
    const totalReward = quizStats.totalReward || 0;
    const totalQuestions = completedCount + skippedCount;
    const accuracy = totalQuestions > 0
      ? ((completedCount / totalQuestions) * 100).toFixed(2)
      : "0.00";

    smartBot.add({
      score: String(completedCount),
      totalQuestions: String(totalQuestions),
      accuracy: String(accuracy),
      totalPoints: String(totalReward)
    });

    smartBot.run({
      command: '/result'
    });

    return;
  } else {
    // If no completedTasks, run the quiz command
    smartBot.run({ command: '/quiz' });
  }
}
