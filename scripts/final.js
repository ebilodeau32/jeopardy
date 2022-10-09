//Importing final question from question file
import placeholderQuestions from "./placeholder-questions.js";

//*------------------GLOBAL VARIABLES-----------------

//<<<<<<<<< DOM Selectors >>>>>>>>>>>>
let finalQuestion = document.getElementById("final-question");
let finalCategory = document.getElementById("final-category");
let cardCategoryName = document.getElementById("card-category-name");
let cardQuestionText = document.getElementById("card-question-text");
let playerTurnSpan = document.getElementById("player-turn-span");
let betBtn = document.getElementById("bet-btn");
let betAmount = document.getElementById("bet-amount");
let finalAnswer = document.getElementById("final-answer");
let popUpBox = document.getElementById("popup-1");
let popUpBox2 = document.getElementById("popup-2");
let guessBtn = document.getElementById("guess-btn");
let player1FinalScore = document.getElementById("player1-score-span-final");
let player2FinalScore = document.getElementById("player2-score-span-final");
let winnerFinal = document.getElementById("winner-final");
let restartBtn = document.getElementById("restart-btn");

let finalQuestions = placeholderQuestions.filter((question) => question.category === "Final"
);

//<<<<<< Variables to be reassigned in functions below >>>>>>>>>
let firstPlayer;
let secondPlayer;
let firstPlayerBet;
let secondPlayerBet;
let firstPlayerGuess;
let secondPlayerGuess;
let currentPlayer;

//*------------------FINAL JEOPARDY SETUP----------------
//assigning player object values from JSONs passed through local storage
let playerOne = JSON.parse(localStorage.getItem("playerOne"));
let playerTwo = JSON.parse(localStorage.getItem("playerTwo"));

//Assigning first/second player based on who was in control in the previous round
if (playerOne.turnToGuess === true) {
    firstPlayer = playerOne
    secondPlayer = playerTwo
    currentPlayer = firstPlayer
} else {
    firstPlayer = playerTwo
    secondPlayer = playerOne
    currentPlayer = secondPlayer
}

//assigning the value of player turn label at top
playerTurnSpan.innerText = currentPlayer.name;

alert(`Welcome to Final Jeopardy! Each player will have a chance to make a wager and answer the question. ${firstPlayer.name} will begin.`)

//When bet button is clicked, check who is the current player and assign input value accordingly
betBtn.addEventListener("click", (event) => {
    console.log("bet button triggered")

    if (currentPlayer === firstPlayer) {
        firstPlayerBet = betAmount.value
        console.log(firstPlayerBet)
        checkforBetValues()
        currentPlayer = secondPlayer;
        playerTurnSpan.innerText = currentPlayer.name;

    } else if (currentPlayer === secondPlayer) {
        secondPlayerBet = betAmount.value
        console.log(firstPlayerBet)
        console.log(secondPlayerBet)
        checkforBetValues()
        currentPlayer = firstPlayer;
        playerTurnSpan.innerText = currentPlayer.name;

    }

})

function finalJeopardyQuestion() {
    cardCategoryName.innerText = finalQuestions[0].category;
    cardQuestionText.innerText = finalQuestions[0].question;
    popUpBox.classList.toggle("active");
}


guessBtn.addEventListener("click", (event) => {
    console.log("Guess Button triggered")
    if (currentPlayer === firstPlayer) {
        firstPlayerGuess = finalAnswer.value
        console.log(firstPlayerGuess)
        checkForAnswerValues()

        if (firstPlayerGuess === "Burlington Code Academy") {
            //answer for first player is correct
            playerOne.score = playerOne.score + Number(firstPlayerBet)
            console.log(playerOne.score)

        } else if (firstPlayerGuess !== "Burlington Code Academy") {
            //answer for second player is incorrect
            playerOne.score = playerOne.score - Number(firstPlayerBet)
            console.log(playerOne.score)

        }
        currentPlayer = secondPlayer
        playerTurnSpan.innerText = currentPlayer.name;
        player1FinalScore.innerText = playerOne.score
    } else if (currentPlayer === secondPlayer) {
        secondPlayerGuess = finalAnswer.value
        console.log(secondPlayerGuess)
        checkForAnswerValues()
        currentPlayer = firstPlayer
        playerTurnSpan.innerText = currentPlayer.name;
        if (secondPlayerGuess === "Burlington Code Academy") {
            //answer for second player is correct
            playerTwo.score = playerTwo.score + Number(secondPlayerBet)
            console.log(playerTwo.score)

        } else if (secondPlayerGuess !== "Burlington Code Academy") {
            //answer for second player is incorrect
            playerTwo.score = playerTwo.score - Number(secondPlayerBet)
            console.log(playerTwo.score)
        }
        player2FinalScore.innerText = playerTwo.score
    }

})

function checkforBetValues() {
    if (firstPlayerBet == undefined) {
        alert(`Thank you for entering your bet, ${currentPlayer.name}. Please give the device to the next player.`)


    } else if (secondPlayerBet == undefined) {
        alert(`Thank you for entering your bet, ${currentPlayer.name}. Please give the device to the next player.`)


    } else {
        console.log("Trigger final jeopardy function.")
        if (currentPlayer === firstPlayer) {
            currentPlayer = secondPlayer;
        } else {
            currentPlayer = firstPlayer;
        }
        alert(`Now that everyone has entered a bet, let's start the final Jeopardy Round. Current turn: ${currentPlayer.name}`)
        finalJeopardyQuestion()

    }

}

function checkForAnswerValues() {
    if (firstPlayerGuess == undefined) {
        alert(`Thank you for your final answer, ${currentPlayer.name}. Please give the device to ${firstPlayer.name}`)

    } else if (secondPlayerGuess == undefined) {
        alert(`Thank you for your final answer, ${currentPlayer.name}. Please give the device to ${secondPlayer.name}`)

    } else {
        console.log("Trigger end of game function.")
        alert(`The correct answer was Burlington Code Academy. Let's see the final game results...`)
        endOfGame()
    }

}

function endOfGame() {

    //Filling popup with final score information
    player1FinalScore.innerText = playerOne.score
    player2FinalScore.innerText = playerTwo.score

    if (playerOne.score > playerTwo.score) {
        winnerFinal.innerText = playerOne.name

    } else if (playerOne.score < playerTwo.score) {
        winnerFinal.innerText = playerTwo.name
    } else {
        winnerFinal.innerText = `It's a tie! ${playerOne.name} & ${playerTwo.name} both win!`
    }


    //close first popup box
    popUpBox.classList.toggle("active");
    //open second popup box
    popUpBox2.classList.toggle("active");

}


restartBtn.addEventListener("click", (event) => {
    localStorage.clear()
    window.location.href = 'index.html';
})