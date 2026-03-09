function Player(name) {
    let score = 0;

    function addPoint() {
        score++;
    }

    function getScore() {
        return score;
    }

    return { name, addPoint, getScore };
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

    function markPosition(mark, row, column) {
        gameboardArray[row][column] = mark;
    }

    const DEBUG = false;
    function displayGameboard() {
        if (!DEBUG) { return; }
        console.log(`
            Tic Tac Toe Board:
            | ${gameboardArray[0][0]} | ${gameboardArray[0][1]} | ${gameboardArray[0][2]} |
            | ${gameboardArray[1][0]} | ${gameboardArray[1][1]} | ${gameboardArray[1][2]} |
            | ${gameboardArray[2][0]} | ${gameboardArray[2][1]} | ${gameboardArray[2][2]} |
            `
        );
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

            if (column.every(cell => cell !== "" && cell === column[0])) {
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

    function getScores() {
        return { X: playerX.getScore(), O: playerO.getScore() };
    }

    function reset() {
        switchPlayer();
        gameboardArray = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    return { markPosition, displayGameboard, isWinner, isFull, switchPlayer, isValidMove, getCurrentPlayer, reset, getScores };
})();

const DisplayController = (() => {
    let status = document.querySelector(".status");
    function updateStatus(message) {
        status.textContent = message;
    }

    function updateCell(cell, mark) {
        cell.textContent = mark;
    }

    const xScore = document.querySelector(".x-score");
    const oScore = document.querySelector(".o-score");
    function updateScore() {
        const scores = GameBoard.getScores();
        xScore.textContent = scores.X;
        oScore.textContent = scores.O;
    }

    const playerX = document.querySelector(".player_x");
    const playerO = document.querySelector(".player_o");
    function highlightCurrentPlayer() {
        if (GameBoard.getCurrentPlayer().name === "X") {
            playerX.classList.add("current");
            playerO.classList.remove("current");
        }
        else {
            playerO.classList.add("current");
            playerX.classList.remove("current");
        }
    }

    function clearCells() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.textContent = "");
    }

    const gameboard = document.querySelector(".gameboard");
    function enable() {
        gameboard.style.pointerEvents = "auto";
    }

    function disable() {
        gameboard.style.pointerEvents = "none";
    }

    return { updateCell, updateStatus, clearCells, enable, disable, updateScore, highlightCurrentPlayer };
})();


const GameController = (() => {
    DisplayController.updateStatus(`${GameBoard.getCurrentPlayer().name}'s turn`);
    DisplayController.highlightCurrentPlayer();

    const gameboard = document.querySelector(".gameboard");
    gameboard.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");

        if (!cell) {
            return;
        }

        const row = Number(cell.getAttribute("data-row"));
        const column = Number(cell.getAttribute("data-column"));

        handleMove(cell, row, column);
    });

    function handleMove(cell, row, column) {
        if (GameBoard.isValidMove(row, column)) {
            const mark = GameBoard.getCurrentPlayer().name;
            GameBoard.markPosition(mark, row, column);
            DisplayController.updateCell(cell, mark);

            if (GameBoard.isWinner()) {
                DisplayController.updateStatus(`Winner: ${mark}`);
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
                DisplayController.updateStatus(`${GameBoard.getCurrentPlayer().name}'s turn`);
                DisplayController.highlightCurrentPlayer();
            }
        }
    }

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", () => {
        GameBoard.reset();
        DisplayController.clearCells();
        DisplayController.enable();
        DisplayController.updateStatus(`${GameBoard.getCurrentPlayer().name}'s turn`);
        DisplayController.highlightCurrentPlayer();
    });
})();