
//variables
const X_CLASS = 'x';
const O_CLASS = 'circle';

//need to create an array for the winning combinations
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//to see who's turn it is:
let circleTurn

//selecting cells
const cellElements = document.querySelectorAll('[data-cell]');
//get board
const board = document.getElementById('board');
//get button
const restartButton = document.getElementById('restart');
//winning message
const winningMessageElement = document.getElementById('winningMessage');
const winningTextElement = document.querySelector('#win-message-text');

//could not figure out how to get it to show who's turn then have it swap
//const playerTurn = document.getElementById('whosTurn')
//that's why I went with the hover so you kinda know who's turn it is...

//Need to call startGame
startGame();

//select a click eventListener
restartButton.addEventListener('click', startGame);
//function to create an hover state for our first instance instance 
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => { //loop through cells
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', oneClick);
        cell.addEventListener('click', oneClick, { once:true} ) //every time we click on a cell we add this but only be able to click once
    });
    setBoardHoverClass();
}


//create function of oneClick
function oneClick(event) {
    //have to get our cell, which ever we clicked on
    const cell = event.target;
    //who's turn is it. If it is O's turn then return O class otherwise return the X class
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    //place the mark using a function. pass the cell we are on and who's turn it is
    placeMark(cell, currentClass)
    //check fo win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) { //check for a drew
        endGame(true); //want the game to end if it's a draw
    } else {
        //switch turns, only want to swap turns if there is no winner yet
    switchTurns()
    //want to call the hover states for out X's and O's
    setBoardHoverClass()
    };
};

//create endGame function
function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = 'It\'s a Draw! Play again!';
    }else { 
        winningMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
}

//create isDraw, need to check to see if every cell is filled
//had to destructure the cellElements into an array so it will be able to use the every method
function isDraw() {
    return [...cellElements].every(cell => { //check each cell if it has a class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

//function for placeMark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

//function to swap turns
function switchTurns() {
    circleTurn = !circleTurn;
};

//make the board have hover marks. need to do this after we swap turns so we know which current player it is
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (circleTurn) { //if it is circles turn then we want to add in the circle class
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
};

//create the function for checkWin. need to check all of the winning combos to see of any are met by current combos using the some method
function checkWin(currentClass) {
   return winningCombos.some(combos => { //loop through and check all of the indexes to see of the cell elements have the same class
    return combos.every(index => {
        return cellElements[index].classList.contains(currentClass);
    })
   })
}


