import placeholderQuestions from "./placeholder-questions.js";

console.log(placeholderQuestions);

let natureQuestions = placeholderQuestions.filter(
  (question) => question.category === "Nature"
);
console.log(natureQuestions);


//!-----------ROUND 1 & 2 FUNCTIONALITY--------------

//*------------------GLOBAL VARIABLES-----------------

let nextRoundBtn = document.getElementById("next-round-btn");
let passBtn = document.getElementById("pass-btn");
let guessBtn = document.getElementById("guess-btn");
let playerTurnSpan = document.getElementById("player-turn");
let gridBlock = document.querySelectorAll(".grid-question");
let gridCategoryBtn = document.querySelectorAll(".grid-button-category");

//*-----------------------PAGE SETUP-------------------
//Disable buttons on round start
nextRoundBtn.disabled = true;
passBtn.disabled = true;
guessBtn.disabled = true;

//Set player turn to begin game
playerTurnSpan.innerText = "Player 1";

//Assigning questions and categories



//*-------------------EVENT LISTENERS-----------------
//Disable all category buttons so they can't be clicked
console.log(gridCategoryBtn);
gridCategoryBtn.forEach(block => {
    block.disabled = true;
})

//Add event listeners to every grid-block element
gridBlock.forEach(block => {
    block.addEventListener("click" , event => {
        console.log('A modal will pop up with question text.');
        selectAQuestion();
    })
})

//Escape out of popup question window using ESC button
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
document.getElementById("popup-1").classList.toggle("active");
	}
});



//*-----------------------FUNCTIONS-------------------

//When a player selects a card...
function selectAQuestion(){
//submit answer & pass buttons enabled
passBtn.disabled = false;
guessBtn.disabled = false;

//triggers active class for popup style in CSS
document.getElementById("popup-1").classList.toggle("active");

//based on button clicked (certain class) the correct type of text is filled onto the card




}

