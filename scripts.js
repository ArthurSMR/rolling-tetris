const tablePicker = document.getElementById("table-picker");
const tablePickerBtn = document.getElementById("table-picker-form");
const gameContainer = document.querySelector(".container .game-container");

tablePickerBtn.addEventListener('submit', handleSubmit);

var tableWidth = 0;
var tableHeight = 0;
var lines = null;
var currentPiece;
var x = 0;
var y = 0;
var timer;


function handleSubmit(event) {
    event.preventDefault();

    tableWidth = document.getElementById("width").value;
    tableHeight = document.getElementById("height").value;

    if (tableWidth >= 10 && tableWidth <= 22) {
        if (tableHeight >= 22 && tableHeight <= 44) {
            createTable(tableWidth, tableHeight);
            tablePicker.remove();
        }
    }
}

function createTable(width, height) {
    var table = document.createElement('table');

    for (let i = 0; i < height; i++) {
        var row = document.createElement('tr');

        for (let j = 0; j < width; j++) {
            var column = document.createElement('td');
            row.append(column);
        }
        table.append(row);
    }

    table.append(document.createElement('tr'));

    gameContainer.append(table);

    lines = table.rows;

    play();
}

function play() {
    x = parseInt(tableWidth / 2);
    y = 3;

    movePiece();
}

function movePiece() {

    timer = setTimeout(() => {

        piece = document.querySelectorAll(".container .game-container table tr .tetromino");
        if (piece != null) {
            piece.forEach((p) => {
                p.removeAttribute('class');
            })
        }
        
        currentPiece = createPiece();
        draw(currentPiece);
        y++;
        checkForColision();
    }, 200);
}

function checkForColision() {

    if (lines[y].cells[x].className == 'tetromino-fixed') {
        respawnPiece();
    } else if (y < tableHeight - 2) {
        movePiece();
    } else {
        respawnPiece();
    }
    
}

function respawnPiece() {
    clearTimeout(timer);

    currentPiece.forEach((cp) => {
        cp.removeAttribute('class');
        cp.classList.add('tetromino-fixed');
    })
    
    y = 3;

    movePiece();
}

function willColideWithTetromino() {

    currentPiece.forEach((cp) => { 
        if (lines[y].cells[x].className == 'tetromino-fixed') {
            respawnPiece();
        }
    })
}

function draw(cells) {
    cells.forEach((cell) => {
        cell.classList.add('tetromino');
    })
}

function createPiece() {

    const tPiece = [
        [lines[y].cells[x], lines[y].cells[x + 1], lines[y].cells[x - 1], lines[y + 1].cells[x]],
        [lines[y].cells[x], lines[y - 1].cells[x], lines[y + 1].cells[x], lines[y].cells[x - 1]],
        [lines[y].cells[x], lines[y].cells[x + 1], lines[y].cells[x - 1], lines[y - 1].cells[x]],
        [lines[y].cells[x], lines[y - 1].cells[x], lines[y + 1].cells[x], lines[y].cells[x + 1]],
    ]

    const uPiece = [
        [lines[y].cells[x], lines[y].cells[x + 1], lines[y + 1].cells[x + 1], lines[y].cells[x - 1], lines[y + 1].cells[x - 1]],
        [lines[y].cells[x], lines[y - 1].cells[x], lines[y - 1].cells[x - 1], lines[y + 1].cells[x], lines[y + 1].cells[x - 1]],
        [lines[y].cells[x], lines[y].cells[x + 1], lines[y - 1].cells[x + 1], lines[y].cells[x - 1], lines[y - 1].cells[x - 1]],
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y + 1].cells[x + 1], lines[y - 1].cells[x], lines[y - 1].cells[x + 1]],
    ]

    const lPiece = [
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y + 2].cells[x], lines[y + 2].cells[x + 1]],
        [lines[y].cells[x], lines[y].cells[x - 1], lines[y].cells[x - 2], lines[y + 1].cells[x - 2]],
        [lines[y].cells[x], lines[y - 1].cells[x], lines[y - 2].cells[x], lines[y - 2].cells[x - 1]],
        [lines[y].cells[x], lines[y].cells[x + 1], lines[y].cells[x + 2], lines[y - 1].cells[x + 2]],
    ]

    const jPiece = [
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y + 2].cells[x], lines[y + 2].cells[x - 1]],
        [lines[y].cells[x], lines[y].cells[x - 1], lines[y].cells[x - 2], lines[y - 1].cells[x - 2]],
        [lines[y].cells[x], lines[y - 1].cells[x], lines[y - 2].cells[x], lines[y - 2].cells[x + 1]],
        [lines[y].cells[x], lines[y].cells[x - 1], lines[y].cells[x + 1], lines[y + 1].cells[x + 1]],
    ]

    const oPiece = [
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y].cells[x - 1], lines[y + 1].cells[x - 1]],
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y].cells[x - 1], lines[y + 1].cells[x - 1]],
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y].cells[x - 1], lines[y + 1].cells[x - 1]],
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y].cells[x - 1], lines[y + 1].cells[x - 1]],
    ]

    const iPiece = [
        [lines[y].cells[x], lines[y + 1].cells[x], lines[y + 2].cells[x], lines[y + 3].cells[x]],
        [lines[y].cells[x], lines[y].cells[x - 1], lines[y].cells[x - 2], lines[y].cells[x - 3]],
        [lines[y].cells[x], lines[y - 1].cells[x], lines[y - 2].cells[x], lines[y - 3].cells[x]],
        [lines[y].cells[x], lines[y].cells[x + 1], lines[y].cells[x + 2], lines[y].cells[x + 3]],
    ]

    const tetrominos = [oPiece, iPiece, uPiece, lPiece, jPiece];

    return iPiece[1];

}

//detecting arrow key presses
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37: // Move to left
            x = x - 1;
            break;
        case 39: // Move piece to right
            x = x + 1;
            break;
    }
});