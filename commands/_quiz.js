/*CMD
  command: /quiz
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (content) {
  const data = JSON.parse(content);

  smartBot.add({ message_id: params });

  if (data.response_code === 0 && data.results.length > 0) {
    const generateTaskID = () => 'quiz_' + Math.random().toString(36).substr(2, 9);

    const resultsWithTaskID = data.results.map(result => {
      const decodedQuestion = decodeURIComponent(result.question);
      const decodedCorrectAnswer = decodeURIComponent(result.correct_answer);
      const decodedIncorrectAnswers = result.incorrect_answers.map(decodeURIComponent);

      const answers = [decodedCorrectAnswer, ...decodedIncorrectAnswers];
      const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

      return {
        id: generateTaskID(),
        amount: QUIZ_REWARD,
        question: decodedQuestion,
        answers: shuffledAnswers,
        correctAnswer: decodedCorrectAnswer,
      };
    });

    User.setProp('quizQuestions', resultsWithTaskID, 'json');
    User.deleteProp('SmartTasker.default:completedTasks');
    smartBot.add({ count: resultsWithTaskID.length });

    smartBot.run({ command: 'quizBegin' });
  } else if (data.response_code === 1) {
    smartBot.run({ command: 'quizRequestEmpty' });
  } else {
    smartBot.run({ command: 'quizRequestFailed' });
  }

  return;
}

if (isNumeric(params)) {
  const message_id = request.message.message_id;

  smartBot.run({ command: 'quizFetching' });
  
  let urlParams = `?amount=${params}&encode=url3986`;
  
  if (settings.mode) {
    urlParams += `&difficulty=${settings.mode}`;
  }
  
  if (settings.category) {
    urlParams += `&category=${settings.category}`;
  }

  HTTP.get({
    url: OPEN_TDB_API_URL + urlParams,
    success: '/quiz ' + message_id,
    error: 'httpRequestError',
    // background: true
  });

  return;
}

