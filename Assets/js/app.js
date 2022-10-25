// Declare variables: DOM hooks
var correctEl = document.querySelector(".scoreboard_score_value--correct");
var incorrectEl = document.querySelector(".scoreboard_score_value--incorrect");
var timerElement = document.querySelector(".timer-count");
var startQuizButtonEl = document.querySelector(".start-quiz");
var greetingEl = document.querySelector(".greeting");
var quizResultsEl = document.querySelector(".quizboard_result");
var quizDisplayEl = document.querySelector(".quizboard_display");
var questionTextEl = document.getElementById("js-question-text");
var answersListEl = document.getElementById("js-answers-list");
var resultsEl = document.querySelector(".results");
var initialsEl = document.querySelector("#initials");
var submitbuttonEl = document.querySelector("#initials-submit");
// Declare variable state
var correctAnswer = 0;
var incorrectAnswer = 0;
var timer = 0;
var timerCount = 0;
var currentQuestionIndex = 0;
var currentAnswer = [];

// Declare variables: constants
var questionList = [
  {
    questionText: " How can you detect the client's browser name?",
    answers: {
      a: "a: client.navName",
      b: "b: navigator.appName",
      c: "c: browser.name",
    },
    correctAnswer: "b: navigator.appName",
  },
  {
    questionText:
      "How do you find the number with the highest value of x and y?",
    answers: {
      a: "a: Math.ceil(x ,y)",
      b: "b: ceil(x, y)",
      c: "c: Math.max(x, y)",
    },
    correctAnswer: "c: Math.max(x, y)",
  },
  {
    questionText: "How does a WHILE loop start?",
    answers: {
      a: "a: while (i <= 10)",
      b: "b: while i = 1 to 10",
      c: "c: while (i <= 10; i++)",
    },
    correctAnswer: "a: while (i <= 10)",
  },
  {
    questionText: "How do you write 'Hello World' in an alert box?",
    answers: {
      a: "a: alertBox('Hello World');",
      b: "b: msg('Hello World')",
      c: 'c: alert("Hello World")',
    },
    correctAnswer: 'c: alert("Hello World")',
  },
  {
    questionText: "The external JavaScript file must contain the <script> tag.",
    answers: {
      a: "a: True",
      b: "b: False",
    },
    correctAnswer: "b: False",
  },
  {
    questionText: "Where is the correct place to insert a JavaScript?",
    answers: {
      a: "a: The <body> section",
      b: "b: Both the <head> and the <body> section are correct",
      c: "c: The <head> section",
    },
    correctAnswer: "b: Both the <head> and the <body> section are correct",
  },
  {
    questionText:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: {
      a: 'a: <script src="xxx.js">',
      b: 'b: <script href="xxx.js">',
      c: 'c: <script name="xxx.js">',
    },
    correctAnswer: 'a: <script src="xxx.js">',
  },
  {
    questionText: "What event occurs when the user clicks on an HTML element?",
    answers: {
      a: "a: onmouseover",
      b: "b: onmouseclick ",
      c: "c: onclick",
    },
    correctAnswer: "c: onclick",
  },
];

// The init function is called when the page loads
function init() {
  getCorrectAnswer();
  getIncorrectAnswer();
}

function renderQuizQuestion(questionObj) {
  questionTextEl.textContent = questionObj.questionText;
  renderQuestionAnswers(questionObj.answers);
  correctAnswer = questionObj.correctAnswer;
}

function renderQuestionAnswers(answerObj) {
  let answerButtons = document.querySelectorAll("li");
  console.log(answerButtons);
  if (answerButtons.length > 0) {
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].remove();
    }
  }

  for (const answerKey in answerObj) {
    var answerButton = document.createElement("button");
    answerButton.textContent = answerObj[answerKey];
    answerButton.classList.add("js-answer-button");
    answerButton.setAttribute("data-answer-key", answerKey);
    var listItem = document.createElement("li");
    listItem.appendChild(answerButton);
    answersListEl.appendChild(listItem);
  }
}

var kStorageKey = "scores";

// Event: Page load
function init() {
  console.log("Game loading...");
  // Retrieve data from persistance
  var scores = JSON.parse(localStorage.getItem(kStorageKey));
  // Update state
  if (scores) {
    correctAnswer = scores.correctAnswer;
    incorrectAnswer = scores.incorrectAnswer;
  }
}
// Event: Click start
function handleClickStart(ev) {
  console.log("Game Started!");
  timerCount = 59;
  console.log("timer ticked!", timerCount);
  startQuizButtonEl.style.display = "none";
  greetingEl.style.display = "none";
  if (timer >= 0) {
    renderQuizQuestion(questionList[currentQuestionIndex]);
    startTimer();
  }
}
startQuizButtonEl.addEventListener("click", handleClickStart);

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount <= 0) {
      clearInterval(timer);
      alert("Time is up!");
    }
  }, 1000);
}

// Event: Answer Question
function handleAnswerSelected(ev) {
  console.log("Answer selected:", ev.target);
  let text = ev.target.textContent;
  console.log(text);
  currentQuestionIndex++;

  if (text === correctAnswer) {
    alert("Correct!");
    correctAnswer++;
  } else {
    alert("Wrong!");
    timerCount = timerCount - 5;
    incorrectAnswer++;
  }
  console.log(currentQuestionIndex);
  console.log(questionList.length);
  if (timerCount <= 0 || currentQuestionIndex === questionList.length) {
    handleGameEnds();
  } else {
    renderQuizQuestion(questionList[currentQuestionIndex]);
  }
}
answersListEl.addEventListener("click", handleAnswerSelected);

// Event: Quiz ends
function handleGameEnds() {
  console.log("this!");
  quizDisplayEl.style.display = "none";
  resultsEl.style.display = "block";
  clearInterval(timer);
  timer = null;
}

function handleSubmit() {
  let initials = initialsEl.value.trim();
  let highscores;
  if (!highscores) {
    highscores = [];
  } else {
    highscores = JSON.parse(localStorage.getItem("highscores"));
  }
  let newScore = {
    correctAnswer: correctAnswer,
    incorrectAnswer: incorrectAnswer,
    initials: initials,
  };
  highscores.push(newScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}
submitButtonEl.addEventListener("click", handleSubmit);

// function updateScoreboard() {
//   // Update UI
//   correctAnswerEl = correctAnswer;
//   incorrectAnswerEl = incorrectAnswer;
// }

init();
