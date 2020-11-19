const tablePicker = document.getElementById("table-picker");
const tablePickerBtn = document.getElementById("table-picker-form");
const gameContainer = document.querySelector(".container .game-container");

tablePickerBtn.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    if (width >= 10 && width <= 22) {
        if (height >= 22 && height <= 44) {
            createTable(width, height);
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
}