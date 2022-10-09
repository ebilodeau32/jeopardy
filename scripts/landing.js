//Setting up data for the game to begin

let startBtn = document.getElementById("play-btn");

let player1Score = 0;
let player2Score = 0;

//Player objects to be passed to next page via local storage
let playerOne = {
    name: "Player 1",
    score: 0,
    turnToPick: true,
    turnToGuess: true,
    hasGuessed: false,
    playerScoreLabel: player1Score,
};

let playerTwo = {
    name: "Player 2",
    score: 0,
    turnToPick: false,
    turnToGuess: false,
    hasGuessed: false,
    playerScoreLabel: player2Score,
};

//Putting player objects in local storage
function passingRoundData() {
    let playerOne_serialized = JSON.stringify(playerOne)
    let playerTwo_serialized = JSON.stringify(playerTwo)
    localStorage.setItem("playerOne", playerOne_serialized);
    localStorage.setItem("playerTwo", playerTwo_serialized);
}

//Adding event listener to start button to trigger storage of data in local storage
startBtn.addEventListener("click", (event) => {
    passingRoundData()
})