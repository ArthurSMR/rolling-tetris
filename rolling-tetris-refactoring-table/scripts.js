const tablePicker = document.getElementById("table-picker");
const tablePickerBtn = document.getElementById("btn-table-picker");

tablePickerBtn.addEventListener('click', handleSubmit);

var tableWidth = 0;
var tableHeight = 0;
var tableSize = 0;
var speed = 1000;

let grid;
let squares;

let ci = 0
let currentRotation = 0
let score = 0
let lines = 0
let timerId
let nextRandom = 0

let x = 10;

const scoreDisplay = document.querySelector('.score');
const linesDisplay = document.querySelector('.lines');

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

function startGame(){
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        disableScrollWithKeyboard()
        draw();
        timerId = setInterval(moveDown, speed);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);               
    }
}

function disableScrollWithKeyboard() {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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

const specialTetromino = [
    [0, 1, 10, 10 + 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, specialTetromino]

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
        increaseSpeed()
        draw()
        gameOver()
        addScore()
    }
}

function increaseSpeed() {
    if (speed > 100) {
        clearInterval(timerId);
        speed = speed - 25;
        timerId = setInterval(moveDown, speed);
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
        alert("Você perdeu, sua pontuação foi de: ")
        clearInterval(timerId)
    }
}

//Score
function addScore() {
	//ARRUMAR WIDTH HEIGHT
	var linesmult = 0;
    for(ci = 0; ci < 220; ci += 10){
        const row = [ci, ci+1, ci+2, ci+3, ci+4, ci+5, ci+6, ci+7, ci+8, ci+9];

        if(row.every(index => squares[index].classList.contains('block2'))){
            lines += 1
    		linesmult += 1
            linesDisplay.innerHTML = lines
            row.forEach(index => {
                squares[index].classList.replace('block2','main-grid') || squares[index].classList.replace('block','main-grid')
            })
            const squaresRemoved = squares.splice(ci, 10)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }


    }

    if(linesmult > 0){
    	var scorecount = (linesmult * 10)*linesmult
    	score = score + scorecount
    	scoreDisplay.innerHTML = score
	}

}

function specialBlock(){
	for(ci = 0; ci < 220; ci += 10){
        const row = [ci, ci+1, ci+2, ci+3, ci+4, ci+5, ci+6, ci+7, ci+8, ci+9];

        if(row.some(index => squares[index].classList.contains('specialblock'))){
        	alert('Bloco Special');
        }


    }
}