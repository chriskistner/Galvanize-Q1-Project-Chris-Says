document.addEventListener("DOMContentLoaded", function (){
    //Generate Play Field
    const playField = document.querySelector(".playField");
    const easyMode = document.querySelector(".lv1")
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
    console.log(answer); 
    return answer;

}

// Play Easy Mode
function playEasy () {
    let answer = generatePuzzle(4);
    let inputs = Array.from(playButtons);
    delay(answer.length -1, 1500, showPuzzle(answer, inputs), clearBoard)
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
        console.log(numberOfTimes);
        delay(numberOfTimes -1, milliseconds, cb, lastAction)
    },milliseconds)
}
function checkAnswer() {
    for (keys of submission) {

    } 
}

let submission = [];
function inputAnswer(event) {
    submission.push(event.target.getAttribute('data-id'));
    console.log(submission);
}

function checkAnswer() {
    for (let i = 0; i < answer.length; i++) {
        let ans = answer[i];
        for (let x = 0; x < submission.length; x++) {
            let subM = submission[x];
            if (subM != ans){
                submit.textContent = `Incorrect`
            } else {
                submit.textContent= 'Correct';
            }
        }
    }
    if (answer.length !== submission.length) {
        submit.textContent = `Incorrect`
    }
}




//Event Listeners
playButtons.forEach(cell => cell.addEventListener("mouseover", function(){
    cell.classList.add('highlighted');
}));
playButtons.forEach(cell => cell.addEventListener("mouseout", function() {
    cell.classList.remove('highlighted')
}));
playButtons.forEach(cell => cell.addEventListener("click", inputAnswer));
easyMode.addEventListener('click', playEasy)
submit.addEventListener('click', checkAnswer);
})