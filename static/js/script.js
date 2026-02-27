const TicTacToe = (() => {
    const gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const markPosition = (mark, xCoor, yCoor) => {
        if (gameBoard[xCoor][yCoor] === "") {
            gameBoard[xCoor][yCoor] = mark;
        }

        else {
            console.log("Please choose another position. That position is already marked");
        }


    }

    const showGameBoard = () => gameBoard;


    return { markPosition, showGameBoard };
})();