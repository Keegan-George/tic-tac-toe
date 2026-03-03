const GameBoard = (() => {
    const gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function markPosition(mark, xCoor, yCoor) {
        if (gameboard[xCoor][yCoor] === "") {
            gameboard[xCoor][yCoor] = mark;
        }

        else {
            console.log("Please choose another position. This position is already marked.");
        }
    }

    function displayGameBoard() {
        console.log(`
            Tic Tac Toe Board:
            | ${gameboard[0][0]} | ${gameboard[0][1]} | ${gameboard[0][2]} |
            | ${gameboard[1][0]} | ${gameboard[1][1]} | ${gameboard[1][2]} |
            | ${gameboard[2][0]} | ${gameboard[2][1]} | ${gameboard[2][2]} |
            `
        )
    }

    function isWinner() {
        //check each row
        if (gameboard.some(row => row.every(cell => cell !== "" && cell === row[0]))) {
            return true;
        }

        //check each column
        for (let i = 0; i < gameboard.length; i++) {
            let column = [];
            for (let j = 0; j < gameboard.length; j++) {
                column.push(gameboard[j][i]);
            }

            if (column.every(cell => cell !== "" && cell === column[i][0])) {
                return true;
            }
        }

        //check diagonal
        if (gameboard[0][0] !== "" && (gameboard[0][0] === gameboard[1][1]) && (gameboard[0][0] === gameboard[2][2])) {
            return true;
        }

        //check anti-diagonal
        if (gameboard[0][2] !== "" && (gameboard[0][2] === gameboard[1][1]) && (gameboard[0][2] === gameboard[2][0])) {
            return true;
        }

        return false;
    }

    function isFull() {
        return gameboard.every(row => row.every(cell => cell !== ""));
    }

    return { markPosition, displayGameBoard, isWinner, isFull };
})();

const GameController = (() => {
    const player1 = "X";
    const player2 = "O";
    let currentPlayer = player1;
    let winningPlayer = "";

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    console.log("Starting game...");
    GameBoard.displayGameBoard();

    let startGame = true;

    while (startGame) {
        console.log(`Current player: ${currentPlayer}`);

        let row = Number(prompt("Select a row: "));
        let column = Number(prompt("Select a column: "));

        GameBoard.markPosition(currentPlayer, row, column);
        GameBoard.displayGameBoard();

        if (GameBoard.isWinner()) {
            startGame = false;
            winningPlayer = currentPlayer;
        }
        else if (GameBoard.isFull()) {
            startGame = false;
            winningPlayer = "draw";
        }

        switchPlayer();

    }

    console.log(`Winner is: ${winningPlayer}`);
})();