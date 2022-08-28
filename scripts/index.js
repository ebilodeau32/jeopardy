import placeholderQuestions from "./placeholder-questions.js";

console.log(placeholderQuestions);


let natureQuestions = placeholderQuestions.filter(
  (question) => question.category === "Nature"
);

let animalQuestions = placeholderQuestions.filter(
  (question) => question.category === "Animals"
);

let computerQuestions = placeholderQuestions.filter(
  (question) => question.category === "Computers"
);

let mythologyQuestions = placeholderQuestions.filter(
  (question) => question.category === "Mythology"
);

let historyQuestions = placeholderQuestions.filter(
  (question) => question.category === "History"
);

let generalQuestions = placeholderQuestions.filter(
  (question) => question.category === "General"
);

//Splitting arrays up into first and second rounds
let firstRoundArrayNature = natureQuestions.slice(0, 5);
let secondRoundArrayNature = natureQuestions.slice(5, 10);

let firstRoundArrayAnimals = animalQuestions.slice(0, 5);
let secondRoundArrayAnimals = animalQuestions.slice(5, 10);

let firstRoundArrayComputer = computerQuestions.slice(0, 5);
let secondRoundArrayComputer = computerQuestions.slice(5, 10);

let firstRoundArrayMythology = mythologyQuestions.slice(0, 5);
let secondRoundArrayMythology = mythologyQuestions.slice(5, 10);

let firstRoundArrayHistory = historyQuestions.slice(0, 5);
let secondRoundArrayHistory = historyQuestions.slice(5, 10);

let firstRoundArrayGeneral = generalQuestions.slice(0, 5);
let secondRoundArrayGeneral = generalQuestions.slice(5, 10);

//?find a way to loop over objects, pick out a specific value, and push into the array below
let categoryArray = [
  "Nature",
  "Animals",
  "Computers",
  "Mythology",
  "History",
  "General",
];

let playerOne = {
  name: "Player 1",
  score: 0,
}

let playerTwo = {
  name: "Player 2",
  score: 0,
}

//!-----------ROUND 1 & 2 FUNCTIONALITY--------------

//*------------------GLOBAL VARIABLES-----------------

let popUpBox =  document.getElementById("popup-1");
let nextRoundBtn = document.getElementById("next-round-btn");
let passBtn = document.getElementById("pass-btn");
let guessBtn = document.getElementById("guess-btn");
let playerTurnSpan = document.getElementById("player-turn");
let gridBlock = document.getElementsByClassName("grid-question");
let gridCategoryBtn = document.querySelectorAll(".grid-button-category");
let cardCategoryName = document.getElementById("card-category-name");
let cardQuestionText = document.getElementById("card-question-text");
let guessTextInput = document.getElementById("text-input");
let player1Score = document.getElementById("player1-score");
let player2Score = document.getElementById("player2-score");


console.log(guessTextInput);
// console.log(gridBlock);
// console.log(cardCategoryName.innerText);
// console.log(cardQuestionText.innerText);

//turn HTML collection into an array
const gridBlockArray = Array.from(gridBlock);
let roundCheck = 1;
let blockClassList;
let pointValue;
let itemIndex;
let category;
let stopPass = false;
let currentTurn = "Player 1";

player1Score.innerText = playerOne.score;

//*-----------------------PAGE SETUP-------------------
//Disable buttons on round start
nextRoundBtn.disabled = true;
passBtn.disabled = true;
guessBtn.disabled = true;

//Set player turn to begin game
playerTurnSpan.innerText = currentTurn;

//Assigning categories
assigningCategoryTitles();



//*-------------------EVENT LISTENERS-----------------
//Disable all category buttons so they can't be clicked
gridCategoryBtn.forEach((block) => {
  block.disabled = true;
});

//Add event listeners to every grid-block element
gridBlockArray.forEach((block) => {
  block.addEventListener("click", (event) => {
    console.log("trigger popup with question text.");
    console.log(event.target);
    blockClassList = event.target.classList;
    pointValue = event.target.innerText;
    itemIndex = determineIndex(pointValue);
    console.log(blockClassList);
    // console.log(pointValue);
    selectAQuestion(blockClassList, block, itemIndex);
  });
});

//Escape out of popup question window using ESC button for debugging purposes
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.getElementById("popup-1").classList.toggle("active");
  }
});

//Pass question event listener
passBtn.addEventListener("click", (event) => {
  if (stopPass == false) {
    stopPass = passQuestion();
  } else {
    stopPass = false;
    passBtn.disabled = true;
    alert("You can't pass this question again. Please enter your answer.");
  }
});

//Guess event listener
guessBtn.addEventListener("click", (event) => {
  checkAnswer(blockClassList, itemIndex);
});

//*-----------------------FUNCTIONS-------------------

//assign category titles to each column from array
function assigningCategoryTitles() {
  let count = 0;
  gridCategoryBtn.forEach((categoryBlock) => {
    categoryBlock.innerText = categoryArray[count].toUpperCase();
    count++;
  });
}

//When a player selects a card...
function selectAQuestion(blockClassList, block, index) {
  //submit answer & pass buttons enabled
  passBtn.disabled = false;
  guessBtn.disabled = false;

  //triggers active class for popup style in CSS
   popUpBox.classList.toggle("active");

  //based on button clicked (certain class) the correct type of text is filled onto the card
  //! ------ PULLS FROM ROUND 1 ARRAYS-------
  if (roundCheck == 1) {
    switch (true) {
      case blockClassList.contains("nature"):
        questionPickerFunction(firstRoundArrayNature, index);
        block.disabled = true;
        break;
      case blockClassList.contains("animals"):
        console.log("I made it here!");
        questionPickerFunction(firstRoundArrayAnimals, index);
        block.disabled = true;
        break;
      case blockClassList.contains("computers"):
        questionPickerFunction(firstRoundArrayComputer, index);
        block.disabled = true;
        break;
      case blockClassList.contains("mythology"):
        questionPickerFunction(firstRoundArrayMythology, index);
        block.disabled = true;
        break;
      case blockClassList.contains("history"):
        questionPickerFunction(firstRoundArrayHistory, index);
        block.disabled = true;
        break;
      case blockClassList.contains("general"):
        questionPickerFunction(firstRoundArrayGeneral, index);
        block.disabled = true;
        break;
      default:
        console.log("Another category");
    }
    //! ------ PULLS FROM ROUND 2 ARRAYS-------
  }
  if (roundCheck == 2) {
    switch (true) {
      case blockClassList.contains("nature"):
        questionPickerFunction(secondRoundArrayNature, index);
        block.disabled = true;
        break;
      case blockClassList.contains("animals"):
        questionPickerFunction(secondRoundArrayAnimals, index);
        block.disabled = true;
        break;
      case blockClassList.contains("computers"):
        questionPickerFunction(secondRoundArrayComputer, index);
        block.disabled = true;
        break;
      case blockClassList.contains("mythology"):
        questionPickerFunction(secondRoundArrayMythology, index);
        block.disabled = true;
        break;
      case blockClassList.contains("history"):
        questionPickerFunction(secondRoundArrayHistory, index);
        block.disabled = true;
        break;
      case blockClassList.contains("general"):
        questionPickerFunction(secondRoundArrayGeneral, index);
        block.disabled = true;
        break;
      default:
        console.log("Another category");
    }
  }
}

//takes in the question array and assigns it to the card based on the point value/index
function questionPickerFunction(questionArray, index) {
  cardCategoryName.innerText = questionArray[index].category.toUpperCase();
  cardQuestionText.innerText = questionArray[index].question.toUpperCase();
}

//Guess function that checks if an answer is correct or not and updates scores accordingly
function answerPickerFunction(questionArray, index) {
  //getting the value of the user input
  let guess = guessTextInput.value;
  let answer = questionArray[index].answer;
  if (guess === answer) {
    alert(`Correct! The answer was: ${answer}.`);
    //add points to score
    scoreUpdate("add");
    //remove text content from card
    //current player does not change
  } else {
    //subtracts point total from player score
    scoreUpdate("subtract");
    //turn switches to other player
    currentTurnSwitch();
    //disable pass button
    passBtn.disabled = true;
    //if player 2 doesn't answer correctly, the original player gets a new question
    alert(`Incorrect. Your opponent has a chance to answer.`);
  }
}

function scoreUpdate(operation) {
  let oldScore;
  let newScore;
  console.log(currentTurn);
  if (currentTurn == "Player 1") {
    console.log("ScoreUpdate - Player 1")
    switch (operation) {
      case "add":
        oldScore = playerOne.score;
        console.log(oldScore);
        newScore = oldScore + Number(pointValue);
        playerOne.score = newScore;
        player1Score.innerText = playerOne.score;
        break;
      case "subtract":
        console.log("player 1 subtract case");
        oldScore = playerOne.score;
        newScore = oldScore - Number(pointValue);
        playerOne.score = newScore;
        player1Score.innerText = playerOne.score;
        break;
    }
  }
  else {
    console.log("ScoreUpdate - Player 2");
    switch (operation) {
      case "add":
        oldScore = playerTwo.score;
        console.log(oldScore);
        newScore = oldScore + Number(pointValue);
        playerTwo.score = newScore;
        player2Score.innerText = playerTwo.score;
        break;
      case "subtract":
        console.log("player 2 subtract case");
        oldScore = playerTwo.score;
        newScore = oldScore - Number(pointValue);
        playerTwo.score = newScore;
        player2Score.innerText = playerTwo.score;
        break;
    }
  }
  popUpBox.classList.toggle("active");
}

//based on point values on the button, determines which question index to pull
function determineIndex(pointValue) {
  let index;
  switch (true) {
    case pointValue == 100:
      return 0;
      break;
    case pointValue == 200:
      return 1;
      break;
    case pointValue == 300:
      return 2;
      break;
    case pointValue == 400:
      return 3;
      break;
    case pointValue == 500:
      return 4;
      break;
    default:
      console.log("No index calc");
  }
}

function passQuestion(event) {
  if (playerTurnSpan.innerText == "Player 1") {
    currentTurn = "Player 2";
playerTurnSpan.innerText = "Player 2";
    alert("You passed the question. Turn: Player 2");
    return true;
  } else {
    currentTurn = "Player 1";
    playerTurnSpan.innerText = "Player 2";
    alert("You passed the question. Turn: Player 1");
    return true;
  }
}

//takes in the answer array and assigns it to the card based on the point value/index
function checkAnswer(blockClassList, index) {
  //compare input to correct answer
  //! ------ PULLS FROM ROUND 1 ARRAYS-------
  if (roundCheck == 1) {
    switch (true) {
      case blockClassList.contains("nature"):
        answerPickerFunction(firstRoundArrayNature, index);
        break;
      case blockClassList.contains("animals"):
        console.log("I made it here!");
        answerPickerFunction(firstRoundArrayAnimals, index);
        break;
      case blockClassList.contains("computers"):
        answerPickerFunction(firstRoundArrayComputer, index);
        break;
      case blockClassList.contains("mythology"):
        answerPickerFunction(firstRoundArrayMythology, index);
        break;
      case blockClassList.contains("history"):
        answerPickerFunction(firstRoundArrayHistory, index);
        break;
      case blockClassList.contains("general"):
        answerPickerFunction(firstRoundArrayGeneral, index);
        break;
      default:
        console.log("Another category");
    }
    //! ------ PULLS FROM ROUND 2 ARRAYS-------
  }
  if (roundCheck == 2) {
    switch (true) {
      case blockClassList.contains("nature"):
        answerPickerFunction(secondRoundArrayNature, index);
        break;
      case blockClassList.contains("animals"):
        answerPickerFunction(secondRoundArrayAnimals, index);
        break;
      case blockClassList.contains("computers"):
        answerPickerFunction(secondRoundArrayComputer, index);
        break;
      case blockClassList.contains("mythology"):
        answerPickerFunction(secondRoundArrayMythology, index);
        break;
      case blockClassList.contains("history"):
        answerPickerFunction(secondRoundArrayHistory, index);
        break;
      case blockClassList.contains("general"):
        answerPickerFunction(secondRoundArrayGeneral, index);
        break;
      default:
        console.log("Another category");
    }
  }
}

function currentTurnSwitch(){
  switch(currentTurn){
    case currentTurn == "Player 1":
      currentTurn = "Player 2";
      break;
    case currentTurn == "Player 2":
      currentTurn = "Player 1";
      break;
  }
}

//? Need to create a check for the end of the round
function endOfRound(){
  alert("Move on to Round 2");
  nextRoundBtn.disabled = false;
}

