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

console.log(firstRoundArrayGeneral);


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
let gridBlock = document.getElementsByClassName("grid-question");
let gridCategoryBtn = document.querySelectorAll(".grid-button-category");
let cardCategoryName = document.getElementById("card-category-name");
let cardQuestionText = document.getElementById("card-question-text");

// console.log(cardCategoryName.innerText);
// console.log(cardQuestionText.innerText);

const gridBlockArray = Array.from(gridBlock);
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

console.log(gridBlockArray);


gridBlockArray.forEach((block) => {
  block.addEventListener("click", (event) => {
    console.log("trigger popup with question text.");
    console.log(event.target); 
    //!---THIS IS THE KEY TO MOVING FORWARD!!!
    selectAQuestion();

    //!use event.target?
  });
});

//Escape out of popup question window using ESC button
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.getElementById("popup-1").classList.toggle("active");
  }
});

//Pass question event listener
passBtn.addEventListener("click", (event) => {
  checkAnswer();
});

//Guess event listener
guessBtn.addEventListener("click", (event) => {
let index = determineIndex()
  // checkAnswer(questionArray, pointValue);
  console.log("Guess button event listener");
});

//*----------------GAME FUNCTION---------------------

function playJeopardy(){


}


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

if(roundCheck == 1) {
  switch (true) {
    case block.classList.contains("nature"):
      questionPickerFunction(firstRoundArrayNature, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("animals"):
      questionPickerFunction(firstRoundArrayAnimals, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("computers"):
      questionPickerFunction(firstRoundArrayComputer, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("mythology"):
      questionPickerFunction(firstRoundArrayMythology, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("history"):
      questionPickerFunction(firstRoundArrayHistory, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("general"):
      questionPickerFunction(firstRoundArrayGeneral, block.innerText);
      block.disabled = true;
      break;
    default:
      console.log("Another category");
  }

} if(roundCheck == 2){
  switch (true) {
    case block.classList.contains("nature"):
      questionPickerFunction(secondRoundArrayNature, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("animals"):
      questionPickerFunction(secondRoundArrayAnimals, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("computers"):
      questionPickerFunction(secondRoundArrayComputer, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("mythology"):
      questionPickerFunction(secondRoundArrayMythology, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("history"):
      questionPickerFunction(secondRoundArrayHistory, block.innerText);
      block.disabled = true;
      break;
    case block.classList.contains("general"):
      questionPickerFunction(secondRoundArrayGeneral, block.innerText);
      block.disabled = true;
      break;
    default:
      console.log("Another category");
  }


}else {
  console.log("Else - Select A Question")
}


 
}

//takes in the question array and assigns it to the card based on the point value/index
function questionPickerFunction(questionArray, pointValue) {
 
  if (roundCheck === 1) {
    let index = determineIndex(pointValue);

    console.log("This will use round 1 array");
    cardCategoryName.innerText = questionArray[index].category.toUpperCase();
    cardQuestionText.innerText = questionArray[index].question.toUpperCase();
    
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

//! need to limit passing to once!
function passQuestion() {
  if (playerTurnSpan.innerText == "Player 1") {
    playerTurnSpan.innerText = "Player 2";
    alert("You passed the question. Turn: Player 2");
  } else {
    playerTurnSpan = "Player 1";
    alert("You passed the question. Turn: Player 1");
  }
}

//Guess function that checks if an answer is correct. if correct...if incorrect....
function checkAnswer(array, pointValue) {
  console.log(array);
  console.log("CheckAnswer function runs");
  console.log(index);
  alert(`The correct answer is: ${array[index].answer}`);
}
