let startBtn = document.getElementById("play-btn");

let player1Score = 0;
let player2Score = 0;

let playerOne = {
    name: "Player 1",
    score: 14000,
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

console.log(playerOne)
console.log(playerTwo)

function passingRoundData() {

    let playerOne_serialized = JSON.stringify(playerOne)
    let playerTwo_serialized = JSON.stringify(playerTwo)
    localStorage.setItem("playerOne", playerOne_serialized);
    localStorage.setItem("playerTwo", playerTwo_serialized);
    console.log(playerOne_serialized);

}



startBtn.addEventListener("click", (event) => {
    console.log("Start button clicked!")
    passingRoundData()
})