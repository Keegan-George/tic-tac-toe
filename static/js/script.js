function Player(name) {
    let score = 0;

    function addPoint() {
        score++;
    }

    function getScore() {
        return score;
    }

    return { name, addPoint, getScore }
}

const GameBoard = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let currentPlayer = playerX;
    let gameboardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function markPosition(mark, xCoor, yCoor) {
        if (gameboardArray[xCoor][yCoor] === "") {
            gameboardArray[xCoor][yCoor] = mark;
        }

        else {
            console.log("Please choose another position. This position is already marked.");
        }
    }

    function displayGameboard() {
        console.log(`
            Tic Tac Toe Board:
            | ${gameboardArray[0][0]} | ${gameboardArray[0][1]} | ${gameboardArray[0][2]} |
            | ${gameboardArray[1][0]} | ${gameboardArray[1][1]} | ${gameboardArray[1][2]} |
            | ${gameboardArray[2][0]} | ${gameboardArray[2][1]} | ${gameboardArray[2][2]} |
            `
        )
    }

    function isWinner() {
        //check each row
        if (gameboardArray.some(row => row.every(cell => cell !== "" && cell === row[0]))) {
            return true;
        }

        //check each column
        for (let i = 0; i < gameboardArray.length; i++) {
            let column = [];
            for (let j = 0; j < gameboardArray.length; j++) {
                column.push(gameboardArray[j][i]);
            }

            if (column.every(cell => cell !== "" && cell === column[i][0])) {
                return true;
            }
        }

        //check diagonal
        if (gameboardArray[0][0] !== "" && (gameboardArray[0][0] === gameboardArray[1][1]) && (gameboardArray[0][0] === gameboardArray[2][2])) {
            return true;
        }

        //check anti-diagonal
        if (gameboardArray[0][2] !== "" && (gameboardArray[0][2] === gameboardArray[1][1]) && (gameboardArray[0][2] === gameboardArray[2][0])) {
            return true;
        }

        return false;
    }

    function isFull() {
        return gameboardArray.every(row => row.every(cell => cell !== ""));
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }

    function isValidMove(row, column) {
        return gameboardArray[row][column] === "";
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function reset() {
        currentPlayer = playerX;
        gameboardArray = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    return { markPosition, displayGameboard, isWinner, isFull, switchPlayer, isValidMove, getCurrentPlayer, reset };
})();

const DisplayController = (() => {
    let status = document.querySelector(".status");
    function updateStatus(message) {
        status.textContent = message;
    }

    function updateCell(mark, row, column) {
        const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        cell.textContent = mark;
    }

    const xScore = document.querySelector(".x-score");
    const oScore = document.querySelector(".o-score");
    function updateScore() {
        currentPlayerScore = GameBoard.getCurrentPlayer().getScore();
        if (GameBoard.getCurrentPlayer().name == "X") {
            xScore.textContent = currentPlayerScore;
        }
        else {
            oScore.textContent = currentPlayerScore;
        }
    }

    function clearDisplay() {
        updateStatus("-");
    }

    function clearCells() {
        cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.textContent = "");
    }

    function reset() {
        clearDisplay("-");
        clearCells();
    }

    function enable() {
        const gameboard = document.querySelector(".gameboard");
        gameboard.style.pointerEvents = "auto";
    }

    function disable() {
        const gameboard = document.querySelector(".gameboard");
        gameboard.style.pointerEvents = "none";
    }

    return { updateCell, updateStatus, reset, enable, disable, updateScore };
})();


const GameController = (() => {
    const gameboard = document.querySelector(".gameboard");
    gameboard.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");

        if (!cell) {
            return;
        }

        row = cell.getAttribute("data-row");
        column = cell.getAttribute("data-column");

        validateClick(row, column);
    });

    function validateClick(row, column) {
        if (GameBoard.isValidMove(row, column)) {
            GameBoard.markPosition(GameBoard.getCurrentPlayer().name, row, column);
            GameBoard.displayGameboard();
            DisplayController.updateCell(GameBoard.getCurrentPlayer().name, row, column);

            if (GameBoard.isWinner()) {
                DisplayController.updateStatus(`Winner: ${GameBoard.getCurrentPlayer().name}`);
                GameBoard.getCurrentPlayer().addPoint();
                DisplayController.updateScore();
                DisplayController.disable();
            }

            else if (GameBoard.isFull()) {
                DisplayController.updateStatus("Draw");
                DisplayController.disable();
            }

            else {
                GameBoard.switchPlayer();
                DisplayController.updateStatus(`Current player: ${GameBoard.getCurrentPlayer().name}`);
            }
        }
    }

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", () => {
        GameBoard.reset();
        DisplayController.reset();
        DisplayController.enable();
    });
})();