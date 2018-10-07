document.addEventListener("DOMContentLoaded", function (){
    //Generate Play Field
    const playField = document.querySelector(".playField");
    console.log(playField);
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

playButtons.forEach(cell => cell.addEventListener("mouseover", function(){
    cell.classList.add('highlighted');
}));

playButtons.forEach(cell => cell.addEventListener("mouseout", function() {
    cell.classList.remove('highlighted')
}));
})