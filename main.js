document.addEventListener("DOMContentLoaded", function (){
    //DOM Objects
    const playField = document.querySelector(".playField");
    const easyMode = document.querySelector(".lv1")
    const normalMode = document.querySelector(".lv2")
    const hardMode= document.querySelector(".lv3")
    const submit = document.querySelector(".Submit");
    const reset = document.querySelector(".reset");
    const submitButton = document.querySelector('.submitButton')
    let hiScore = document.querySelector('.hScore');
    let currentScore = document.querySelector('.cScore');
    let storedHiScore = localStorage.getItem('HiScore');

    //Generate Play Field
    function createBoard (ID) {
        return `
        <div class = "gameButton" data-id="${ID}">
        </div>`
    }
    function createGrid (num) {
        const board = [];
        for (let i = 0; i <= num; i++) {
        board.push(createBoard(i))
    }
    return board;
}
const renderBoard = createGrid(15);
playField.innerHTML = renderBoard.join('\n');
(function hiScoreCheck () {
    if (localStorage.getItem("HiScore") === null) {
        hiScore.textContent = `${0}`;
    } else {hiScore.textContent = storedHiScore;}
}());

// Generates the random layout of the start of  the puzzle.
const playButtons = document.querySelectorAll(".gameButton");
let answer = [];
function generatePuzzle (difficulty, answer = []) {
    while(answer.length < difficulty){
        let random = Math.floor(Math.random()* 16)
        if(answer.indexOf(random) === -1){
            answer.push(random)    
        } 
    }
    return answer;
}
//Play Modes
let startingDifficulty;
function play (puzzle, startingDiff, delayTime) {
    // answer = generatePuzzle();
    startingDifficulty = startingDiff;
    let inputs = Array.from(playButtons);
    delay(puzzle.length -1, delayTime, showPuzzle(puzzle, inputs), clearBoard);
}

// Start Game on Easy Difficulty
function playEasy () {
    answer = generatePuzzle(4);
    clearBoard();
    play(answer, 10, 1500)
}
// Start a Game on Medium Difficulty
function playMedium () {
    answer = generatePuzzle(5);
    clearBoard();
    play(answer, 25, 1200);
}
//Start a Game on Hard Difficulty
function playHard () {
    answer = generatePuzzle(6);
    clearBoard();
    play(answer, 50, 800);
}
function clearBoard(){
    const inputs = Array.from(playButtons);
    inputs.forEach(ele => ele.classList.remove('highlighted'));
    inputs.forEach(ele => ele.classList.remove('selected'));
}

function playNextRound() {
    const inputs = Array.from(playButtons);
    if (answer.length < 16) {
        answer = generatePuzzle(answer.length +1, answer)
    }
    submission = [];
    inputs.forEach(ele => ele.classList.remove('selected'));
    submit.textContent = `SUBMIT`;
    play(answer, 10, 1500);
}

function showPuzzle (answer,inputs) {
    let index = 0
    return function(){
        inputs[answer[index]].classList.add('highlighted')
        index++
    }
}
function delay(numberOfTimes, milliseconds, cb, lastAction){

    if(numberOfTimes < 0) return setTimeout(lastAction,milliseconds)
    setTimeout(function(){
        cb()
        delay(numberOfTimes -1, milliseconds, cb, lastAction)
    },milliseconds)
}
// Answer Check;
let submission = [];
function inputAnswer(event) {
    submission.push(event.target.getAttribute('data-id'));
    event.target.classList.add("selected");
}
function checkAnswer() {
    let hiScoreVal = Number(hiScore.textContent);
    if (answer.length !== submission.length) {
        submit.textContent = `Sorry Try Again`;
        localStorage.setItem("HiScore", hiScoreVal);
        setTimeout(resetGame, 1500)
    }
    if (arrayCheck(answer, submission)) {
        submit.textContent=`Correct`;
        updateScores(startingDifficulty);
        playNextRound();
    } else {
        submit.textContent = `Sorry Try Again`;
        localStorage.setItem("HiScore", hiScoreVal);
        setTimeout(resetGame, 1500);
    }
}
function arrayCheck (arr1, arr2) {
    return arr1.toString() === arr2.toString();
}
// Reset Game
function resetGame () {
    const inputs = Array.from(playButtons);
    answer = [];
    submission = [];
    currentScore.textContent = `${0}`;
    inputs.forEach(ele => ele.classList.remove('selected'));
    submit.textContent = `SUBMIT`;
}
//Score Calculator
function updateScores (difficulty) {
    let hiScoreVal = Number(hiScore.textContent);
    let scoreVal = Number(currentScore.textContent);
    scoreVal += scoreVal + (answer.length * difficulty)
    currentScore.textContent= `${scoreVal}`;
    if (scoreVal > hiScoreVal) {
        hiScore.textContent = `${scoreVal}`;
        localStorage.setItem("HiScore", scoreVal);
    }
}
//Event Listeners
playButtons.forEach(cell => cell.addEventListener("mouseover", function(){
    cell.classList.add('hover');
}));
playButtons.forEach(cell => cell.addEventListener("mouseout", function() {
    cell.classList.remove('hover')
}));
playButtons.forEach(cell => cell.addEventListener("click", inputAnswer));
easyMode.addEventListener('click', playEasy);
normalMode.addEventListener('click', playMedium);
hardMode.addEventListener('click', playHard);
submit.addEventListener('click', checkAnswer);
submitButton.addEventListener('mouseover', function (){
    submitButton.classList.add('emphasize')
});
submitButton.addEventListener('mouseout', function (){
    submitButton.classList.remove('emphasize')
});
reset.addEventListener('click', resetGame);
})