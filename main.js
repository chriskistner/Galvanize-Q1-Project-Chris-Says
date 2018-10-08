document.addEventListener("DOMContentLoaded", function (){
    //Generate Play Field
    const playField = document.querySelector(".playField");
    const easyMode = document.querySelector(".lv1")
    const normalMode = document.querySelector(".lv2")
    const hardMode= document.querySelector(".lv3")
    const submit = document.querySelector(".Submit");
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

const playButtons = document.querySelectorAll(".gameButton");
// Generates the random layout of the start of  the puzzle.
let answer = [];
function generatePuzzle (difficulty) {
    while(answer.length < difficulty){
        const random = Math.floor(Math.random()* 16)
        if(answer.indexOf(random) === -1){
            answer.push(random)    
        } 
    }
    return answer;

}
//Play Modes
let startingDifficulty;

// Start Game on Easy Difficulty
function playEasy () {
    let answer = generatePuzzle(4);
    startingDifficulty = 4;
    let inputs = Array.from(playButtons);
    delay(answer.length -1, 1500, showPuzzle(answer, inputs), clearBoard)
}
// Start a Game on Medium Difficulty
function playMedium () {
    let answer = generatePuzzle(5);
    console.log(answer);
    startingDifficulty = 5;
    let inputs = Array.from(playButtons);
    delay(answer.length -1, 1200, showPuzzle(answer, inputs), clearBoard)
}
//Start a Game on Hard Difficulty
function playHard () {
    let answer = generatePuzzle(6);
    console.log(answer);
    startingDifficulty = 6;
    let inputs = Array.from(playButtons);
    delay(answer.length -1, 800, showPuzzle(answer, inputs), clearBoard)
}
function clearBoard(){
    const inputs = Array.from(playButtons);
    inputs.forEach(ele => ele.classList.remove('highlighted'))
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
    console.log(submission);
    event.target.classList.add("selected");
}
function checkAnswer() {
    if (answer.length !== submission.length) {
        submit.textContent = `Incorrect`
    }
    if (arrayCheck(answer, submission)) {
        submit.textContent=`Correct`;
        updateScores(startingDifficulty);
    } else {submit.textContent = `Incorrect`}
}

function arrayCheck (arr1, arr2) {
    return arr1.toString() === arr2.toString();
}

//Score Calculator
let hiScore = document.querySelector('.hScore');
let currentScore = document.querySelector('.cScore');

function updateScores (difficulty) {
    let hiScoreVal = Number(hiScore.textContent);
    let scoreVal = Number(currentScore.textContent);
    console.log(hiScoreVal);
    if (difficulty === 4) {
        scoreVal += scoreVal + (answer.length * difficulty)
        currentScore.textContent= `${scoreVal}`;
        if (scoreVal > hiScoreVal) {
            hiScore.textContent = `${scoreVal}`;
        }
    }
    else if (difficulty === 5) {
        scoreVal += scoreVal + (answer.length * difficulty)
        currentScore.textContent= `${scoreVal}`;
        if (scoreVal > hiScoreVal) {
            hiScore.textContent = `${scoreVal}`;
        }
    } else {
        scoreVal += scoreVal + (answer.length *difficulty)
        currentScore.textContent =`${scoreVal}`;
        if (scoreVal > hiScoreVal) {
            hiScore.textContent = `${scoreVal}`;
        }
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
})