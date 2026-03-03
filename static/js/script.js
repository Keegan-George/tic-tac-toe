const GameBoard = (() => {
    const gameboardArray = [
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

    function displayGameBoard() {
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

    GameBoard.displayGameBoard();

    let startGame = true;


    console.log(`Current player: ${currentPlayer}`);

    const gameboard = document.querySelector(".gameboard");

    gameboard.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");

        if (!cell) {
            return;
        }

        const row = cell.getAttribute("data-row");
        const column = cell.getAttribute("data-column");

        GameBoard.markPosition("X", row, column);
    });

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


    console.log(`Winner is: ${winningPlayer}`);
})();


const DisplayController = (() => {

})();