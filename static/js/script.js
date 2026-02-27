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
    }

    const showGameBoard = () => gameBoard;


    return { markPosition, showGameBoard };
})();