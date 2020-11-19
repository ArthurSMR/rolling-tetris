const tablePicker = document.getElementById("table-picker");
const tablePickerBtn = document.getElementById("table-picker-form");
const gameContainer = document.querySelector(".container .game-container");

tablePickerBtn.addEventListener('submit', handleSubmit);

var tableWidth = 0;
var tableHeight = 0;
var lines = null;


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

    function timeout() {
        setTimeout(() => {
            piece = document.querySelectorAll(".container .game-container table tr .tetromino");
            if (piece != null) {
                piece.forEach((p) => {
                    p.removeAttribute('class');
                })
            }

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

            const tetrominos = [oPiece, iPiece, tPiece, uPiece, lPiece, jPiece];

            var cells = tPiece[2];

            draw(cells);
            y++;
            timeout();
        }, 2000)
    }

    timeout();
}

function draw(cells) {
    cells.forEach((cell) => {
        cell.classList.add('tetromino');
    })
}