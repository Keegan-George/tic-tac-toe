const GameBoard = (() => {
    const gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const markPosition = (mark, xCoor, yCoor) => {
        if (gameboard[xCoor][yCoor] === "") {
            gameboard[xCoor][yCoor] = mark;
        }

        else {
            console.log("Please choose another position. This position is already marked.");
        }
    }

    const showGameBoard = () => gameboard;

    function isWinner() {
        //check each row
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i].every(mark => mark !== "" && mark === gameboard[i][0])) {
                return true;
            }
        }

        //check each column


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


    return { markPosition, showGameBoard, isWinner };
})();