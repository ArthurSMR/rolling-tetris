const tablePicker = document.getElementById("table-picker");
const tablePickerBtn = document.getElementById("btn-table-picker");

tablePickerBtn.addEventListener('click', handleSubmit);

var tableWidth = 10;
var tableHeight = 22;
var tableSize = 0;
var speed = 1000;
var isReversed = false;

let grid;
let squares;

let currentIndex = 0
let currentRotation = 0
let score = 0
let lines = 0
let timerId

let nextRandom = 0

let x = 10;

let timerPlayed
var seconds = 0
var totalSeconds = 0
var minutes = 0

const scoreDisplay = document.querySelector('.score');
const linesDisplay = document.querySelector('.lines');

function handleSubmit(event) {
    event.preventDefault();

    // tableWidth = document.getElementById("width").value;
    // tableHeight = document.getElementById("height").value;

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

function startGame() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        disableScrollWithKeyboard()
        draw();
        timerId = setInterval(moveDown, speed);
        timerPlayed = setInterval(incrementTime, 1000)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);               
    }
}

function incrementTime() {

    seconds += 1
    totalSeconds += 1

    if (seconds == 60) {
        seconds = 0
        minutes += 1
    } 

    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds
}

function disableScrollWithKeyboard() {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
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

const oTetromino = [
    [0, 1, 10, 10 + 1],
    [0, 1, 10, 10 + 1],
    [0, 1, 10, 10 + 1],
    [0, 1, 10, 10 + 1]
];

const iTetromino = [
    [1, 10 + 1, 10 * 2 + 1, 10 * 3 + 1],
    [10, 10 + 1, 10 + 2, 10 + 3],
    [1, 10 + 1, 10 * 2 + 1, 10 * 3 + 1],
    [10, 10 + 1, 10 + 2, 10 + 3]
];

const tTetromino = [
    [1, 10, 10 + 1, 10 + 2],
    [1, 10 + 1, 10 + 2, 10 * 2 + 1],
    [10, 10 + 1, 10 + 2, 10 * 2 + 1],
    [1, 10, 10 + 1, 10 * 2 + 1]
];

const uTetromino = [
    [1, 10 + 1, 2, 3, 10 + 3],
    [1, 2, 10 + 2, 10 * 2 + 2, 10 * 2 + 1],
    [1, 10 + 1, 10 + 2, 10 + 3, 3],
    [1, 2, 10 + 1, 10 * 2 + 1, 10 * 2 + 2]
]

const jTetromino = [
    [1, 10 + 1, 10 * 2 + 1, 10 * 2],
    [10, 10 * 2, 10 * 2 + 1, 10 * 2 + 2],
    [1, 10 + 1, 10 * 2 + 1, 2],
    [10, 10 + 1, 10 + 2, 10 * 2 + 2],
];

const specialTetromino = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const lTetromino = [
    [1, 10 + 1, 10 * 2 + 1, 10 * 2 + 2],
    [1, 10 + 1, 2, 3],
    [2, 1, 10 + 2, 10 * 2 + 2],
    [2, 10, 10 + 1, 10 + 2],
]

const theTetrominoes = [oTetromino, iTetromino, tTetromino, uTetromino, jTetromino, specialTetromino, lTetromino];

//Randomly Select Tetromino
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//move the Tetromino moveDown
let currentPosition = 4;
//draw the shape
function draw() {

    if (isSpecialBlock()) {
        current.forEach(index => {
            squares[currentPosition + index].classList.replace("main-grid", "specialblock")
        })
    } else {
        current.forEach(index => {
            squares[currentPosition + index].classList.replace("main-grid", "block")
        })
    }
}

//undraw the shape
function undraw() {

    if (isSpecialBlock()) {
        current.forEach(index => {
            squares[currentPosition + index].classList.replace('specialblock', 'main-grid')
        })
    } else {
        current.forEach(index => {
            squares[currentPosition + index].classList.replace('block', 'main-grid')
        })
    }
}

//move down on loop
function moveDown() {
    undraw()
    currentPosition = currentPosition += 10
    draw()
    freeze()
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

        if (isSpecialBlock()) {
            current.forEach(index => squares[index + currentPosition].classList.replace('specialblock', 'block2'))
        } else {
            current.forEach(index => squares[index + currentPosition].classList.replace('block', 'block2'))
        }
        // start a new tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        increaseSpeed()
        draw()
        addScore()
        gameOver()
    }
}

//Rotate the Tetromino
function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation >= 4) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//Score
function addScore() {
	
	var linesmult = 0;
    for(ci = 0; ci < 220; ci += 10){
        const row = [ci, ci+1, ci+2, ci+3, ci+4, ci+5, ci+6, ci+7, ci+8, ci+9];

        if (row.every(index => squares[index].classList.contains('block2'))) {
            lines += 1
            linesmult += 1
            linesDisplay.innerHTML = lines
            row.forEach(index => {
                squares[index].classList.replace('block2', 'main-grid') || squares[index].classList.replace('block', 'main-grid')
            })
            const squaresRemoved = squares.splice(ci, 10)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))

            if (isSpecialBlock()) {
                // rotateBoard()
            }
        }
    }

    if(linesmult > 0) {
    	var scorecount = (linesmult * 10)*linesmult
    	score = score + scorecount
    	scoreDisplay.innerHTML = score
	}
}

function rotateBoard() {
    isReversed = !isReversed
    squares.reverse()
    grid = drawReversedGrid()
}

function drawReversedGrid() {

    let grid = document.createElement("div")
    grid.setAttribute("class", "grid")

    for (let i = 0; i < squares.lenght; i++) {
        let gridElement = document.createElement("div")
        gridElement.setAttribute("class", squares[i].classList.value)
        grid.appendChild(gridElement)
    }
    return grid;
}

function isSpecialBlock(){

    if (current == specialTetromino[currentRotation]) {
        return true
    }
    return false
}

function increaseSpeed() {
    if (speed > 200) {
        clearInterval(timerId);
        speed = speed - 25;
        timerId = setInterval(moveDown, speed);
    }
}

//Rotate the Tetromino
function rotate() {
    undraw()
    currentRotation++
    if (currentRotation >= 4) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//Game Over
function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        window.location.replace('http://localhost:8080/rolling-tetris/perdeu.php?pontos=' + score + '&tempo=' + totalSeconds);
        clearInterval(timerId)
        clearInterval(timerPlayed)
    }
}