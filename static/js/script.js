/**
 * Creates a player with a name and internal score.
 * @param {string} name - The identifier for the player (i.e., "X" or "O").
 * @returns {{name: string, addPoint: function(): void, getScore: function(): number}}
 */
function Player(name) {
    let score = 0;

    /**
     * Increments the player's score by one.
     * @returns {void}
     */
    function addPoint() {
        score++;
    }

    /**
     * Gets the current score of the player.
     * @returns {number} The current score.
     */
    function getScore() {
        return score;
    }

    return { name, addPoint, getScore };
}

/**
 * Module that encapsulates the tic tac toe board state and game logic.
 * @namespace GameBoard
 */
const GameBoard = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let currentPlayer = playerX;
    let gameboardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    /**
     * Marks a position on the game board with the given player's mark.
     * Assumes the move has already been validated.
     * @param {string} mark - The mark to place on the board (i.e., "X" or "O").
     * @param {number} row - The row index (0–2).
     * @param {number} column - The column index (0–2).
     * @returns {void}
     */
    function markPosition(mark, row, column) {
        gameboardArray[row][column] = mark;
    }

    const DEBUG = false;
    /**
     * Logs the current game board to the console when debug mode is enabled.
     * @returns {void}
     */
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

    /**
     * Determines whether the current game board has a winning line.
     * @returns {boolean} True if there is a winner; false otherwise.
     */
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

    /**
     * Checks if all cells on the game board are filled.
     * @returns {boolean} True if the board is full; false otherwise.
     */
    function isFull() {
        return gameboardArray.every(row => row.every(cell => cell !== ""));
    }

    /**
     * Switches the active player between X and O.
     * @returns {void}
     */
    function switchPlayer() {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }

    /**
     * Validates whether a move can be made at the given position.
     * @param {number} row - The row index (0–2).
     * @param {number} column - The column index (0–2).
     * @returns {boolean} True if the cell is empty; false otherwise.
     */
    function isValidMove(row, column) {
        return gameboardArray[row][column] === "";
    }

    /**
     * Gets the player whose turn it currently is.
     * @returns {{name: string, addPoint: function(): void, getScore: function(): number}} The current player object.
     */
    function getCurrentPlayer() {
        return currentPlayer;
    }

    /**
     * Returns the scores for both players.
     * @returns {{X: number, O: number}} An object containing scores for X and O.
     */
    function getScores() {
        return { X: playerX.getScore(), O: playerO.getScore() };
    }

    /**
     * Starts a new game by switching the starting player and clearing the board.
     * @returns {void}
     */
    function newGame() {
        switchPlayer();
        gameboardArray = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    return { markPosition, displayGameboard, isWinner, isFull, switchPlayer, isValidMove, getCurrentPlayer, newGame, getScores };
})();


/**
 * Module responsible for updating the DOM to reflect game state.
 * @namespace DisplayController
 */
const DisplayController = (() => {
    let status = document.querySelector(".status");
    /**
     * Updates the status message shown to the user.
     * @param {string} message - The message to display.
     * @returns {void}
     */
    function updateStatus(message) {
        status.textContent = message;
    }

    /**
     * Updates the content of a single cell element with the given mark.
     * @param {HTMLElement} cell - The cell element to update.
     * @param {string} mark - The mark to display (i.e., "X" or "O").
     * @returns {void}
     */
    function updateCell(cell, mark) {
        cell.textContent = mark;
    }

    const xScore = document.querySelector(".x-score");
    const oScore = document.querySelector(".o-score");
    /**
     * Updates the displayed scores for both players.
     * @returns {void}
     */
    function updateScore() {
        const scores = GameBoard.getScores();
        xScore.textContent = scores.X;
        oScore.textContent = scores.O;
    }

    const playerX = document.querySelector(".player_x");
    const playerO = document.querySelector(".player_o");
    /**
     * Highlights the current player panel in the UI.
     * @returns {void}
     */
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

    /**
     * Clears all marks from the board cells in the DOM.
     * @returns {void}
     */
    function clearCells() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.textContent = "");
    }

    const gameboard = document.querySelector(".gameboard");
    /**
     * Enables interaction with the game board.
     * @returns {void}
     */
    function enable() {
        gameboard.style.pointerEvents = "auto";
    }

    /**
     * Disables interaction with the game board.
     * @returns {void}
     */
    function disable() {
        gameboard.style.pointerEvents = "none";
    }

    return { updateCell, updateStatus, clearCells, enable, disable, updateScore, highlightCurrentPlayer };
})();

/**
 * Module that connects user interactions to the game logic and display.
 * @namespace GameController
 */
const GameController = (() => {
    DisplayController.updateStatus(`${GameBoard.getCurrentPlayer().name}'s turn`);
    DisplayController.highlightCurrentPlayer();

    const gameboard = document.querySelector(".gameboard");
    /**
     * Handles click events on the game board and delegates valid moves.
     * @param {MouseEvent} event - The click event object.
     * @returns {void}
     */
    gameboard.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");

        if (!cell) {
            return;
        }

        const row = Number(cell.getAttribute("data-row"));
        const column = Number(cell.getAttribute("data-column"));

        handleMove(cell, row, column);
    });

    /**
     * Processes a single move: validates it, updates the board and display,
     * checks for game end conditions, and switches players if needed.
     * @param {HTMLElement} cell - The clicked cell element.
     * @param {number} row - The row index (0–2).
     * @param {number} column - The column index (0–2).
     * @returns {void}
     */
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

    const newGameButton = document.querySelector(".new-game");
    /**
     * Handles the "New Game" button click by resetting game state and UI.
     * @returns {void}
     */
    newGameButton.addEventListener("click", () => {
        GameBoard.newGame();
        DisplayController.clearCells();
        DisplayController.enable();
        DisplayController.updateStatus(`${GameBoard.getCurrentPlayer().name}'s turn`);
        DisplayController.highlightCurrentPlayer();
    });
})();