import placeholderQuestions from "./placeholder-questions.js";

// console.log(placeholderQuestions);

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

console.log(historyQuestions);

//?find a way to loop over objects, pick out a specific value, and push into the array below
let categoryArray = [
  "Nature",
  "Animals",
  "Computers",
  "Mythology",
  "History",
  "General",
];

//!-----------ROUND 1 & 2 FUNCTIONALITY--------------

//*------------------GLOBAL VARIABLES-----------------

let nextRoundBtn = document.getElementById("next-round-btn");
let passBtn = document.getElementById("pass-btn");
let guessBtn = document.getElementById("guess-btn");
let playerTurnSpan = document.getElementById("player-turn");
let gridBlock = document.querySelectorAll(".grid-question");
let gridCategoryBtn = document.querySelectorAll(".grid-button-category");
let cardCategoryName = document.getElementById("card-category-name");
let cardQuestionText = document.getElementById("card-question-text");

// console.log(cardCategoryName.innerText);
// console.log(cardQuestionText.innerText);

let roundCheck = 1;

//*-----------------------PAGE SETUP-------------------
//Disable buttons on round start
nextRoundBtn.disabled = true;
passBtn.disabled = true;
guessBtn.disabled = true;

//Set player turn to begin game
playerTurnSpan.innerText = "Player 1";

//Assigning categories
assigningCategoryTitles();

//*-------------------EVENT LISTENERS-----------------
//Disable all category buttons so they can't be clicked
// console.log(gridCategoryBtn);

gridCategoryBtn.forEach((block) => {
  block.disabled = true;
});

//Add event listeners to every grid-block element
gridBlock.forEach((block) => {
  block.addEventListener("click", (event) => {
    console.log("A modal will pop up with question text.");
    selectAQuestion(block);
    console.log(block);
  });
});

//Escape out of popup question window using ESC button
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.getElementById("popup-1").classList.toggle("active");
  }
});

//Pass question event listener
passBtn.addEventListener("click" , passQuestion)

//*-----------------------FUNCTIONS-------------------
//assign category titles to each column from array
function assigningCategoryTitles() {
  let count = 0;
  gridCategoryBtn.forEach((categoryBlock) => {
    // console.log(categoryBlock);
    categoryBlock.innerText = categoryArray[count].toUpperCase();
    count++;
  });
}

//When a player selects a card...
function selectAQuestion(block) {
  //submit answer & pass buttons enabled
  passBtn.disabled = false;
  guessBtn.disabled = false;

  //triggers active class for popup style in CSS
  document.getElementById("popup-1").classList.toggle("active");

  //based on button clicked (certain class) the correct type of text is filled onto the card
  switch (true) {
    case block.classList.contains("nature"):
      questionPickerFunction(natureQuestions, block.innerText);
      break;
    case block.classList.contains("animals"):
      questionPickerFunction(animalQuestions, block.innerText);
      break;
    case block.classList.contains("computers"):
      questionPickerFunction(computerQuestions, block.innerText);
      break;
    case block.classList.contains("mythology"):
      questionPickerFunction(mythologyQuestions, block.innerText);
      break;
    case block.classList.contains("history"):
      questionPickerFunction(historyQuestions, block.innerText);
      break;
    case block.classList.contains("general"):
      questionPickerFunction(generalQuestions, block.innerText);
      break;
    default:
      console.log("Another category");
  }
}

//takes in the question array and assigns it to the card based on the point value/index
function questionPickerFunction(questionArray, pointValue) {
  //separate original array into 2 separate arrays to be used in different rounds
  let firstRoundArray = questionArray.slice(0, 5);
  let secondRoundArray = questionArray.slice(5, 10);
  console.log(firstRoundArray);
  console.log(secondRoundArray);
  if (roundCheck === 1) {
    let index = determineIndex(pointValue);

    console.log("This will use round 1 array");
    cardCategoryName.innerText = firstRoundArray[index].category.toUpperCase();
    cardQuestionText.innerText = firstRoundArray[index].question.toUpperCase();
    //remove the first item in this array so the question can't be used again
    firstRoundArray.shift();
    console.log(`Adjusted: ${firstRoundArray}`);
  } else {
    console.log("This will use round 2 array");
  }
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
    case pointValue == 300:
      return 2;
    case pointValue == 400:
      return 3;
    case pointValue == 500:
      return 4;
    default:
      console.log("No index calc");
  }
}

//! need to limit passing to once!
function passQuestion(){
    if(playerTurnSpan.innerText == "Player 1"){
        playerTurnSpan.innerText = "Player 2";
        alert("You passed the question. Turn: Player 2");
    } else {
        playerTurnSpan = "Player 1";
        alert("You passed the question. Turn: Player 1");
    }
}

//Guess function that checks if an answer is correct. if correct...if incorrect....