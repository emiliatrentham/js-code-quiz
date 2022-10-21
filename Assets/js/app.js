// Declare variables: DOM hooks
// In the JavaScript, create variables for each of the DOM elements that will dispaly feedback
// Create variables for the elements that will receive input 
// Set each variable to its DOM element 

var correctEl = document.querySelector(".scoreboard_score_value--correct");
var incorrectEl = document.querySelector(".scoreboard_score_value--incorrect");
var timerEl = document.querySelector("quizboard_timer");
var startQuizButton = document.querySelector(".controls_startquiz");
var quizResultsEl = document.querySelector(".quizboard_result");
var quizDisplayEl = document.querySelector(".quizboard_display");
var controlsEl = document.querySelector(".controls");

// Declare variable state 
// What are the data that need to be kept track of?
// Global state variables sometimes emerge while working on event handlers (i.e., it becomes clearer what needs to be tracked accross the application)
// State variables:
// "State describes the status of the entire program or and individual object. It could be text, a number, a boolean, or another data type"

var correct = 0;
var incorrect = 0;
var timer = null; 
var timeLeft = 0;
var currentQuestionIndex;
var currentAnswer;

// Declare variables: constants 
// What are the data the application needs that won't change?
// e.g Math constants, pre-created content (maybe the questions and answers?)

// var questionList? =[
    
// ]

var qDuration = 50;

// Identify events 
// Based on the variables created in Step 2, create event handlers 
//... where [EVENT TYPE] is "click" or "change" or "keydown" etc
// Identify the things that should happen in the click handlers 
// There is always a page load event. Usually have a function for anything that needs setting up at the beginning, before people interact with the page. Start the execution of this setup function at the bottom of the page

// Event: Page load 
function init() {
    console.log("Game loading...");
}
// Event: Click start
function handleClickStart(ev) {
    console.log("Game Started!");
}
startQuizButtonEl.addEventListener("click", handleClickStart);

// Event: Timer tick 
function handleTimerTick(ev) {
    console.log("timer ticked!");
}

// Event: Answer Question

function handleAnswerSelected(ev) {
    console.log("Answer selected: ", ev.key);
}
document.addEventListener("keydown", handleKeyDown); 

// Event: Quiz ends 
function handleGameEnds() {
    
}
// Refactor 
// Identify tasks that can be broken into their own functions, outside the event handlers 
// Are there tasks that more than one event handlet share?

// function myName() {
    
// }