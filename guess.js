//Set variables
let squares = [];
let gamePieceColors = [];
let gamePieces = [];
let scoreBoard = document.querySelector("#scoreBoard");
let colorBanner = document.querySelector("#colorBanner");
let easyMode = document.querySelector("#easyMode");
let hardMode = document.querySelector("#hardMode");
let newColors = document.querySelector("#newColors");
let gameBoard = document.querySelector("#gameBoard");
let bannerTop = document.querySelector(".bannerTop");
let randomChoice = 10;
let randomRed = 0;
let randomGreen = 0;
let randomBlue = 0;
let modeCount = 6;
let gameOver = false;

//Buttons
easyMode.addEventListener("click", function () {
    if (modeCount === 6) {
        modeCount = 3;
        this.classList.add("modeActive");
        hardMode.classList.remove("modeActive");
        startGame();
    }
});
hardMode.addEventListener("click", function () {
    if (modeCount === 3) {
        modeCount = 6;
        easyMode.classList.remove("modeActive");
        this.classList.add("modeActive");
        startGame();
    }
});

newColors.addEventListener("click", function () {
    startGame();
});


//Random number generator
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Get random color numbers
function randomizeColors() {
    randomRed = randomNumber(0, 255);
    randomGreen = randomNumber(0, 255);
    randomBlue = randomNumber(0, 255);
    return;
}

//Start the game
function startGame() {
    gameOver = false;
    scoreBoard.textContent = "PICK ONE";
    newColors.textContent = "NEW COLORS";
    getNewColors();
    randomChoice = randomNumber(0, modeCount);
    colorBanner.textContent = `${gamePieceColors[randomChoice]}`;
    clickWatcher();
}

//Watch Clicks
function clickWatcher() {
    squares = document.querySelectorAll(".thumb");
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            if (this.style.backgroundColor == colorBanner.textContent && gameOver == false) {
                winner();
            } else if (gameOver == false) {
                scoreBoard.textContent = "TRY AGAIN";
                this.style.backgroundColor = "#C1C1C1";
            }
        });
    }
    return;
}

//Winner!
function winner() {
    bannerTop.style.backgroundColor = colorBanner.textContent;
    scoreBoard.textContent = "YOU WIN!";
    $(squares).css("background-color", colorBanner.textContent);
    newColors.textContent = "NEW GAME";
    gameOver = true;
}

//Assign and display new colors
function getNewColors() {
    bannerTop.style.backgroundColor = "rgb(193, 20, 20)";
    gamePieceColors = [];
    gamePieces = [];
    for (let i = 0; i < modeCount; i++) {
        randomizeColors();
        gamePieceColors.push(`rgb(${randomRed}, ${randomBlue}, ${randomGreen})`);
        gamePieces += `<div id="tic${i}" class="thumb col-lg-3" style="background-color: ${gamePieceColors[i]}"></div>`;
    }
    gameBoard.innerHTML = gamePieces;
    return;
}
