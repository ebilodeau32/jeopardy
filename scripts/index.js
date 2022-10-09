//TODO: 1. Refactoring code to work with an API, 2. Refactor determineIndex function to be more universal between rounds 3.  


//importing question data
import placeholderQuestions from "./placeholder-questions.js";

//*------------------GLOBAL VARIABLES-----------------

//<<<<<<<<< DOM Selectors >>>>>>>>>>>>
let popUpBox = document.getElementById("popup-1");
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
let roundHeaderText = document.getElementById("round-header-text");

//Creating variables to be reassgined from local storage
let playerOne;
let playerTwo;
let roundCheck;

//Getting player data from local storage - Only applicable to Rounds 2 & 3
if (roundHeaderText.innerText === "Round One") {

  playerOne = JSON.parse(localStorage.getItem("playerOne"));
  playerTwo = JSON.parse(localStorage.getItem("playerTwo"));
  roundCheck = 1;


} else if (roundHeaderText.innerText === "Round Two") {
  playerOne = JSON.parse(localStorage.getItem("playerOne"));
  playerTwo = JSON.parse(localStorage.getItem("playerTwo"));
  roundCheck = 2;

} else {
  console.log("This is round 3.")

}

//reassigning playerScoreLabel to appropriate variables so they can be updated through currentPlayer/waitingPlayer within functions
playerOne.playerScoreLabel = player1Score
playerTwo.playerScoreLabel = player2Score

//turn HTML collection into an array
const gridBlockArray = Array.from(gridBlock);

player1Score.innerText = playerOne.score;
player2Score.innerText = playerTwo.score;
playerTurnSpan.innerText = playerOne.name;

// Declaring variables for global access
let blockClassList;
let pointValue;
let itemIndex;
let stopPass = false;
let currentPlayer = playerOne;
let waitingPlayer = playerTwo;
let numOfCardsUsed = [];

//For setting the titles of each category
let categoryArray = [
  "Nature",
  "Animals",
  "Computers",
  "Mythology",
  "History",
  "General",
];

//*<<<<<<<<< Filtereing out questions by category >>>>>>>>>>>>>>>>

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

//* <<<<<<<< Splitting arrays up into correct round >>>>>>>

let currentRoundArrayNature = determineRoundArray(roundCheck, natureQuestions);
let currentRoundArrayAnimals = determineRoundArray(roundCheck, animalQuestions);
let currentRoundArrayComputer = determineRoundArray(
  roundCheck,
  computerQuestions
);
let currentRoundArrayMythology = determineRoundArray(
  roundCheck,
  mythologyQuestions
);
let currentRoundArrayHistory = determineRoundArray(
  roundCheck,
  historyQuestions
);
let currentRoundArrayGeneral = determineRoundArray(
  roundCheck,
  generalQuestions
);

//*-----------------------PAGE SETUP-------------------
//Disable buttons on round start
nextRoundBtn.disabled = true;
passBtn.disabled = true;
guessBtn.disabled = true;

//Set player turn to begin game
playerTurnSpan.innerText = currentPlayer.name;

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
    //increment card counter by adding array item each time a card is clicked
    numOfCardsUsed.push("x");
    blockClassList = event.target.classList;
    pointValue = event.target.innerText;
    itemIndex = determineIndex(pointValue);
    selectAQuestion(itemIndex, block);
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
    stopPass = true;
  } else {
    stopPass = false;
    passBtn.disabled = true;
    alert("You can't pass this question again. Please enter your answer.");

  }
});

//Guess event listener
guessBtn.addEventListener("click", (event) => {
  console.log("guess button event listener triggered");
  checkAnswer(blockClassList, itemIndex);
});

//Next Round Button event listener
nextRoundBtn.addEventListener("click", (event) => {
  console.log("Next round button clicked!")
  passingRoundData()
})

//*-----------------------FUNCTIONS-------------------

//Assign category titles to each column from array

function assigningCategoryTitles() {
  let count = 0;
  gridCategoryBtn.forEach((categoryBlock) => {
    categoryBlock.innerText = categoryArray[count].toUpperCase();
    count++;
  });
}

//Determines which index numbers will be used for slicing based on the round number
//Round 1: index 0-5
//Rount2: index 5-10
function determineIndexToSlice(roundNum) {
  if (roundNum === 1) {
    let sliceArrayNums = [0, 5];
    return sliceArrayNums;
  }
  if (roundNum === 2) {
    //values for slicing round 2 here
    let sliceArrayNums = [5, 10];
    return sliceArrayNums;
  }
}

//Utilizes the slice values of determineIndexToSlice function and slices the provided array.

function determineRoundArray(roundCheck, array) {
  //returns an array that will determine start and end of slice
  let sliceArrayNums = determineIndexToSlice(roundCheck);
  let slice1 = sliceArrayNums[0];
  let slice2 = sliceArrayNums[1];

  //returns a new "filtered" array
  return array.slice(slice1, slice2);
}

//When a player selects a card...
function selectAQuestion(index, block) {
  //submit answer & pass buttons enabled
  console.log("select a question has been clicked");
  passBtn.disabled = false;
  guessBtn.disabled = false;

  //triggers active class for popup style in CSS
  popUpBox.classList.toggle("active");

  //based on button clicked (certain class) the correct type of text is filled onto the card
  assignQuestionsToCards(index, block);

}

//Determines which question gets assigned to which block
function assignQuestionsToCards(index, block) {
  switch (true) {
    case blockClassList.contains("nature"):
      questionPickerFunction(currentRoundArrayNature, index);
      block.disabled = true;
      block.innerText = "";
      break;
    case blockClassList.contains("animals"):
      console.log("I made it here!");
      questionPickerFunction(currentRoundArrayAnimals, index);
      block.disabled = true;
      block.innerText = "";
      break;
    case blockClassList.contains("computers"):
      questionPickerFunction(currentRoundArrayComputer, index);
      block.disabled = true;
      block.innerText = "";
      break;
    case blockClassList.contains("mythology"):
      questionPickerFunction(currentRoundArrayMythology, index);
      block.disabled = true;
      block.innerText = "";
      break;
    case blockClassList.contains("history"):
      questionPickerFunction(currentRoundArrayHistory, index);
      block.disabled = true;
      block.innerText = "";
      break;
    case blockClassList.contains("general"):
      questionPickerFunction(currentRoundArrayGeneral, index);
      block.disabled = true;
      block.innerText = "";
      break;
    default:
      console.log("Another category");
  }
}

//takes in the question array and assigns it to the card based on the point value/index
function questionPickerFunction(questionArray, index) {
  cardCategoryName.innerText = questionArray[index].category.toUpperCase();
  cardQuestionText.innerText = questionArray[index].question.toUpperCase();
}

function scoreUpdate(operation) {
  console.log("scoreUpdate function triggered");
  let oldScore;
  let newScore;

  if (currentPlayer.turnToGuess === true) {
    console.log(`score update ${currentPlayer.name}`)

    switch (operation) {
      case "add":
        oldScore = currentPlayer.score;
        console.log(oldScore);
        newScore = oldScore + Number(pointValue);
        currentPlayer.score = newScore;
        console.log(newScore)
        currentPlayer.playerScoreLabel.innerText = currentPlayer.score;
        break;
      case "subtract":
        console.log("player 1 subtract case");
        oldScore = currentPlayer.score;
        newScore = oldScore - Number(pointValue);
        currentPlayer.score = newScore;
        currentPlayer.playerScoreLabel.innerText = currentPlayer.score;
        break;
    }

  } else if (waitingPlayer.turnToGuess === true) {
    console.log(`score update ${waitingPlayer.name}`)
    switch (operation) {
      case "add":
        oldScore = waitingPlayer.score;
        console.log(oldScore);
        newScore = oldScore + Number(pointValue);
        waitingPlayer.score = newScore;
        console.log(newScore)
        waitingPlayer.playerScoreLabel.innerText = waitingPlayer.score;
        break;
      case "subtract":
        console.log("player 1 subtract case");
        oldScore = waitingPlayer.score;
        newScore = oldScore - Number(pointValue);
        waitingPlayer.score = newScore;
        waitingPlayer.playerScoreLabel.innerText = waitingPlayer.score;
        break;
    }
  }
}

//based on point values on the button, determines which question index to pull
//? Make point values into a variable and have those variables change based on round
function determineIndex(pointValue) {
  let index;
  if (roundCheck == 1) {
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
  else if (roundCheck == 2) {
    switch (true) {
      case pointValue == 200:
        return 0;
        break;
      case pointValue == 400:
        return 1;
        break;
      case pointValue == 600:
        return 2;
        break;
      case pointValue == 800:
        return 3;
        break;
      case pointValue == 1000:
        return 4;
        break;
      default:
        console.log("No index calc");
    }
  }
}

function passQuestion() {
  console.log("passQuestion function triggered");
  playerTurnSpan.textContent = waitingPlayer.name;
  waitingPlayer.turnToGuess = true;
  waitingPlayer.hasGuessed = true;
  currentPlayer.turnToGuess = false;
  alert(`Turn: ${waitingPlayer.name}`);
}

//!<<<<<<< GUESSING FUNCTIONALITY >>>>>>>>>>>>

//takes in the answer array and assigns it to the card based on the point value/index
function checkAnswer(blockClassList, index) {
  //compare input to correct answer
  console.log("This is the checkAnswer function");
  switch (true) {
    case blockClassList.contains("nature"):
      verifyGuess(currentRoundArrayNature, index, currentPlayer, waitingPlayer);
      break;
    case blockClassList.contains("animals"):
      console.log("I made it here!");
      verifyGuess(currentRoundArrayAnimals, index, currentPlayer, waitingPlayer);
      break;
    case blockClassList.contains("computers"):
      verifyGuess(currentRoundArrayComputer, index, currentPlayer, waitingPlayer);
      break;
    case blockClassList.contains("mythology"):
      verifyGuess(currentRoundArrayMythology, index, currentPlayer, waitingPlayer);
      break;
    case blockClassList.contains("history"):
      verifyGuess(currentRoundArrayHistory, index, currentPlayer, waitingPlayer);
      break;
    case blockClassList.contains("general"):
      verifyGuess(currentRoundArrayGeneral, index, currentPlayer, waitingPlayer);
      break;
    default:
      console.log("Another category");
  }
}

//Guess function that checks if an answer is correct or not and updates scores accordingly
function verifyGuess(questionArray, index, currentPlayer, waitingPlayer) {
  let guess = guessTextInput.value;
  let answer = questionArray[index].answer;

  //*>>>>>If input box is blank when guess button is clicked<<<<<

  if (guess === "") {
    alert(`You must type your guess!`);

    //*>>>>>if guess is CORRECT<<<<<

  } else if (guess === answer) {

    //*---WAITING PLAYER ANSWERS CORRECTLY--- 
    if (waitingPlayer.turnToGuess === true) {
      console.log("CORRECT - WAITING PLAYER")
      alert(`Correct! The answer was: ${answer}.`);
      //Because waiting player answered correctly, their turnToPick will change to TRUE, and currentPlayer is now false
      waitingPlayer.turnToPick = true;
      currentPlayer.turnToPick = false;

      //adding to waiting player score
      scoreUpdate("add");
      //Switching the values of current player and waiting player variables
      playerSwitch()
      //player objects are reset in preparation for next question
      playerObjectReset()
      //close popup window
      popUpBox.classList.toggle("active");

      //*---CURRERNT PLAYER ANSWERS CORRECTLY--- 
    } else if (currentPlayer.turnToGuess === true) {
      console.log(currentPlayer)
      console.log("CORRECT - CURRENT PLAYER")
      alert(`Correct! The answer was: ${answer}.`);
      //adding to current player score
      scoreUpdate("add");
      //! No player switch occurs if current player answers correctly
      //player objects are reset in preparation for next question
      playerObjectReset(currentPlayer, waitingPlayer)
      //close popup window
      popUpBox.classList.toggle("active");
    }
    //*>>>>>if guess is INCORRECT<<<<<
  } else if (guess !== answer) {

    //*---WAITING PLAYER GUESSES INCORRECTLY---
    if (waitingPlayer.hasGuessed === true && currentPlayer.hasGuessed === true) {
      console.log("INCORRECT - WAITING PLAYER")
      //subtract from waiting player score
      scoreUpdate("subtract");
      //! No player switch occurs if waiting player answers incorrectly
      //player objects are reset in preparation for next question
      playerObjectReset(currentPlayer, waitingPlayer)
      //alert with the correct answer
      alert(`Incorrect. The correct answer was: ${answer}`);
      console.log(currentPlayer)
      //close popup window
      popUpBox.classList.toggle("active");
    }

    //*---CURRERNT PLAYER GUESSES INCORRECTLY--- 
    else if (currentPlayer.hasGuessed === false) {
      console.log("INCORRECT - CURRENT PLAYER")
      alert(`Incorrect.`);
      //subtract from current player score
      scoreUpdate("subtract");
      //updating player objects
      waitingPlayer.turnToGuess = true;
      currentPlayer.hasGuessed = true;
      currentPlayer.turnToGuess = false;
      if (waitingPlayer.turnToGuess === true) {
        console.log("#10waiting player turn to guess = TRUE")
        waitingPlayer.turnToGuess = false;
        console.log(waitingPlayer);
        //Disable pass button after current player answers incorrectly
        passBtn.disabled = true;
        passQuestion();

      } else {
        console.log("This is the else inside of waitingplayer turntoguess true")
      }
    }
  }
  endOfRound()
  //disable pass button - you cannot pass a wrong answer question
  passBtn.disabled = true;
}

//Switching the values of current player and waiting player
function playerSwitch() {
  let placeholder1 = currentPlayer;
  let placeholder2 = waitingPlayer;
  currentPlayer = placeholder2;
  waitingPlayer = placeholder1;
  playerTurnSpan.innerText = currentPlayer.name;
}

//resetting both player objects to beginning of turn
function playerObjectReset() {
  console.log("current turn switch")

  // currentPlayer.turnToPick = true;
  currentPlayer.turnToGuess = true;
  currentPlayer.hasGuessed = false;

  // waitingPlayer.turnToPick = false;
  waitingPlayer.turnToGuess = false;
  waitingPlayer.hasGuessed = false;
  playerTurnSpan.innerText = currentPlayer.name;

}

//Checks to see if end of round thresholds have been met
function endOfRound() {
  if (roundCheck === 1) {
    if (playerOne.score > 14000 || playerTwo.score > 14000 || numOfCardsUsed.length > 28) {

      nextRoundBtn.disabled = false;
      alert("Move on to Round 2");

    } else {
      console.log("This round will continue")
    }

  } else if (roundCheck === 2) {
    if (playerOne.score > 30000 || playerTwo.score > 30000 || numOfCardsUsed.length > 28) {

      nextRoundBtn.disabled = false;
      alert("Move on to Final Round");

    } else {
      console.log("This round will continue")

    }
  }
}

//Saving player score information in local storage to be used in next round
function passingRoundData() {
  //clearing out predvious variables from local storage
  localStorage.clear()
  //turn player objects into strings to be stored in local storage
  let playerOne_serialized = JSON.stringify(playerOne)
  let playerTwo_serialized = JSON.stringify(playerTwo)
  localStorage.setItem("playerOne", playerOne_serialized);
  localStorage.setItem("playerTwo", playerTwo_serialized);
}


