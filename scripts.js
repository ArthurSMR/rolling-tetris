const tablePicker = document.getElementById("table-picker");
const tablePickerBtn = document.getElementById("btn-table-picker");

tablePickerBtn.addEventListener('click', handleSubmit);

var tableWidth = 0;
var tableHeight = 0;
var tableSize = 0;

let grid;
let squares;

let currentIndex = 0
let currentRotation = 0
let score = 0
let lines = 0
let timerId
let nextRandom = 0

let x = 10;

function handleSubmit(event) {
    event.preventDefault();

    tableWidth = document.getElementById("width").value;
    tableHeight = document.getElementById("height").value;

    if (tableWidth >= 10 && tableWidth <= 22) {
        if (tableHeight >= 22 && tableHeight <= 44) {
            tableSize = tableHeight * tableWidth;
            grid = createGrid();
            squares = Array.from(grid.querySelectorAll('div'));     
            tablePicker.remove();
            startGame();
        }
    }
}

function createGrid() {
    // the main grid
    let grid = document.querySelector(".grid")
    for (let i = 0; i < tableSize; i++) {
        let gridElement = document.createElement("div")
        gridElement.setAttribute("class", "main-grid")
        grid.appendChild(gridElement)
    }

    // set base of grid
    for (let i = 0; i < tableWidth; i++) {
        let gridElement = document.createElement("div")
        gridElement.setAttribute("class", "block3")
        grid.appendChild(gridElement)
    }

    return grid;
}

//assign functions to keycodes
function control(e) {
    if (e.keyCode === 39)
        moveright()
    else if (e.keyCode === 38)
        rotate()
    else if (e.keyCode === 37)
        moveleft()
    else if (e.keyCode === 40)
        moveDown()
}

// the classical behavior is to speed up the block if down button is kept pressed so doing that
document.addEventListener('keydown', control)

//The Tetrominoes
const lTetromino = [
    [1, 10 + 1, 10 * 2 + 1, 2],
    [10, 10 + 1, 10 + 2, 10 * 2 + 2],
    [1, 10 + 1, 10 * 2 + 1, 10 * 2],
    [10, 10 * 2, 10 * 2 + 1, 10 * 2 + 2]
]

const zTetromino = [
    [0, 10, 10 + 1, 10 * 2 + 1],
    [10 + 1, 10 + 2, 10 * 2, 10 * 2 + 1],
    [0, 10, 10 + 1, 10 * 2 + 1],
    [10 + 1, 10 + 2, 10 * 2, 10 * 2 + 1]
]

const tTetromino = [
    [1, 10, 10 + 1, 10 + 2],
    [1, 10 + 1, 10 + 2, 10 * 2 + 1],
    [10, 10 + 1, 10 + 2, 10 * 2 + 1],
    [1, 10, 10 + 1, 10 * 2 + 1]
]

const oTetromino = [
    [0, 1, 10, 10 + 1],
    [0, 1, 10, 10 + 1],
    [0, 1, 10, 10 + 1],
    [0, 1, 10, 10 + 1]
]

const iTetromino = [
    [1, 10 + 1, 10 * 2 + 1, 10 * 3 + 1],
    [10, 10 + 1, 10 + 2, 10 + 3],
    [1, 10 + 1, 10 * 2 + 1, 10 * 3 + 1],
    [10, 10 + 1, 10 + 2, 10 + 3]
]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

//Randomly Select Tetromino
let random = Math.floor(Math.random() * theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]

//move the Tetromino moveDown
let currentPosition = 4
//draw the shape
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.replace("main-grid", "block")
    })
}

//undraw the shape
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.replace('block', 'main-grid')
    })
}

//move down on loop
function moveDown() {
    undraw()
    currentPosition = currentPosition += 10
    draw()
    freeze()
}

function startGame(){
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        draw();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);               
    }
}

//move left and prevent collisions with shapes moving left
function moveright() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % tableWidth === tableWidth - 1)
    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition -= 1
    }
    draw()
}

//move right and prevent collisions with shapes moving right
function moveleft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % x === 0)
    if (!isAtLeftEdge) currentPosition -= 1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition += 1
    }
    draw()
}

//freeze the shape
function freeze() {
    // if block has settled
    if (current.some(index => squares[currentPosition + index + x].classList.contains('block3') || squares[currentPosition + index + x].classList.contains('block2'))) {
        // make it block2
        current.forEach(index => squares[index + currentPosition].classList.replace('block', 'block2'))
        // start a new tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        gameOver()
    }
}

//Rotate the Tetromino
function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//Game Over
function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        alert("sefu")
        clearInterval(timerId)
    }
}