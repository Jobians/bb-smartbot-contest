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

let skipParam = false;
let taskIDToSkip = null;

function getTaskById(taskID) {
  return quizTasker.tasks.find(item => item.id === taskID);
}

function handleTaskNotFound() {
  smartBot.run({ command: 'quizNotFound' });
}

function rejectWrongAnswer(taskID, skip = false) {
  const cmdName = skip ? 'skipQuiz' : 'wrongAnswer';
  quizTasker.skipTask();

  const wrongAnswerTask = getTaskById(taskID);
  if (!wrongAnswerTask) {
    return handleTaskNotFound();
  }

  smartBot.add({ correctAnswer: wrongAnswerTask.correctAnswer });
  smartBot.run({
    command: cmdName,
    options: { taskID }
  });
}

function processAnswer(acceptedAnswer) {
  if (acceptedAnswer.isCorrect) {
    return completeQuiz(acceptedAnswer.taskID);
  }
  rejectWrongAnswer(acceptedAnswer.taskID);
}

function handleAIRequest(quizId) {
  const message_id = request.message.message_id;
  const quizQuestion = getTaskById(quizId);

  if (!quizQuestion) {
    return handleTaskNotFound();
  }

  smartBot.run({ command: 'aiRequestInProgress' });

  HTTP.post({
    url: META_AI_API_URL,
    body: {
      model: "Meta-Llama-3.3-70B-Instruct",
      messages: [
        {
          role: "system",
          content: "Briefly explain the question with some context and provide the explanation. Keep it short and to the point, avoiding a long story."
        },
        {
          role: "user",
          content: quizQuestion.question
        }
      ],
    },
    error: 'httpRequestError',
    success: 'onAnswer ' + message_id,
    // background: true
  });
}

function handleContentResponse(content) {
  const data = JSON.parse(content);
  smartBot.add({ ask_ai: true, message_id: params });

  const command = data.content ? 'aiResponseReceived' : 'aiRequestFailed';

  if (data.content) {
    smartBot.add({ response: data.content });
  }

  smartBot.run({ command });
}

// Handle AI content response
if (content) {
  handleContentResponse(content);
  return;
}

// Handle quiz task parameters
if (params) {
  const [type, quizId] = params.split(' ');

  if (type === 'skip') {
    skipParam = true;
    taskIDToSkip = quizId;
  } else if (type === 'ask_ai') {
    handleAIRequest(quizId);
    return;
  }
}

// Handle skip or process the answer
if (skipParam && taskIDToSkip) {
  rejectWrongAnswer(taskIDToSkip, true);
  return;
}

const acceptedAnswer = quizTasker.acceptAnswer();
if (acceptedAnswer) {
  processAnswer(acceptedAnswer);
} else {
  handleTaskNotFound();
  return;
}
