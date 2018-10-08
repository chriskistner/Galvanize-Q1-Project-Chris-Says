document.addEventListener("DOMContentLoaded", function (){
    //Generate Play Field
    const playField = document.querySelector(".playField");
    const easyMode = document.querySelector(".lv1")
    function createBoard () {
        return `
        <div class = "gameButton">
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
function generatePuzzle (difficulty) {
    const answer = [];

    while(answer.length <= difficulty){
        const random = Math.floor(Math.random()* 16)
        if(answer.indexOf(random) === -1){
            answer.push(random)    
        } 
    }
    
    return answer;
}
// Play Easy Mode
function playEasy () {
    let answer = generatePuzzle(4);
    const inputs = Array.from(playButtons);


    delay(answer.length - 1, 1500, showPuzzle(answer, inputs), clearBoard)

}

function clearBoard(){
    const inputs = Array.from(playButtons);
    console.log('clearing')
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
    if(numberOfTimes < 0) return lastAction()
    setTimeout(function(){
        cb()
        delay(numberOfTimes -1, milliseconds, cb, lastAction)
    },milliseconds)
}


//Event Listeners
playButtons.forEach(cell => cell.addEventListener("mouseover", function(){
    cell.classList.add('highlighted');
}));
playButtons.forEach(cell => cell.addEventListener("mouseout", function() {
    cell.classList.remove('highlighted')
}));
easyMode.addEventListener('click', playEasy);
})