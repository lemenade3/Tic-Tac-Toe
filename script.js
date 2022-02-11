const gameboardModule = (() => {
    const board = [];
    const makeBoard = () => {
        for (let i = 0; i < 3; i++) {
            const _row = [];
            for (let j = 0; j < 3; j++) {
                _row.push('');
            };
            board.push(_row);
        };
        return board;
    };
    const displayBoard = () => {
        const container = document.querySelector('#container');
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.setAttribute('class', 'row');
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.setAttribute('class', 'cell');
                cell.textContent = board[i][j];
                row.append(cell);
            };
            container.append(row);
        };
    };
    const removeBoard = () => {
        const row = document.querySelectorAll('.row');
        for (let i = 0; i < row.length; i++) {
            row[i].remove();
        };
    };
    return {
        makeBoard,
        displayBoard,
        removeBoard,
    };
})();

// Player Factory

const Player = (marker) => {
    const getMarker = () => marker;
    return {getMarker,};
};

const player1 = Player('X');
const player2 = Player('O');

// Game module

const game = (() => {

    let activePlayer = player1;

    const changeActivePlayer = () => {
        if (activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        };
    };

    const markCells = () => {
        const cell = document.querySelectorAll('.cell')
        for (let i = 0; i < cell.length; i++) {
            cell[i].addEventListener('click', () => {
                if (cell[i].textContent === '') {
                    cell[i].textContent = activePlayer.getMarker();
                    checkWin();
                    changeActivePlayer();
                };
            });
        };
    };

    const checkWin = () => {
        const cell = document.querySelectorAll('.cell');
        const board = [];
        for (let i = 0; i < cell.length; i++) {
            board.push(cell[i].textContent);
        };

        const bC = [
            [board[0],board[1],board[2]],
            [board[3],board[4],board[5]],
            [board[6],board[7],board[8]]
        ];

        const declareWinner = () => {
            winner = document.querySelector('#winner');
            winner.textContent = `${activePlayer.getMarker()} Wins!`;
        }

        const declareDraw = () => {
            winner = document.querySelector('#winner');
            winner.textContent = `It's a Draw...`;
        }
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (bC[i][0] === activePlayer.getMarker() && bC[i][1] === activePlayer.getMarker() && bC[i][2] === activePlayer.getMarker() || bC[0][j] === activePlayer.getMarker() && bC[1][j] === activePlayer.getMarker() && bC[2][j] === activePlayer.getMarker() || bC[0][0] === activePlayer.getMarker() && bC[1][1] === activePlayer.getMarker() && bC[2][2] === activePlayer.getMarker() || bC[0][2] === activePlayer.getMarker() && bC[1][1] === activePlayer.getMarker() && bC[2][0] === activePlayer.getMarker()) {
                    let winModal = document.querySelector('#winModal')
                    declareWinner()
                    winModal.style.display = "block";
                    gameboardModule.removeBoard();
                } else if (bC[0][0] != '' && bC[0][1] != '' && bC[0][2] != '' && bC[1][0] != '' && bC[1][1] != '' && bC[1][2] != '' && bC[2][0] != '' && bC[2][1] != '' && bC[2][2] != '') {
                    declareDraw();
                    winModal.style.display = "block";
                    gameboardModule.removeBoard();
                };
                // Need to find a cleaner way to do this, code checks if symbols match in each row, then in each column then across both diagonals
            };
        };
    };

    let modal = document.querySelector("#modal");
    
    let twoPlayer = document.querySelector('#twoPlayer')
    twoPlayer.addEventListener('click', () => {
        gameboardModule.makeBoard();
        gameboardModule.displayBoard();
        game.markCells();
        modal.style.display = "none";
        activePlayer = player1;
    });

    const selectComputer = document.querySelector('#computer');
    selectComputer.addEventListener('click', () => {
        gameboardModule.makeBoard();
        gameboardModule.displayBoard();
        game.markCells();
        modal.style.display = "none";
        activePlayer = player1;
        const cells = document.querySelectorAll('.cell')
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', () => {aiModule.makeMove()});
        };
    });
    
    let newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', () => {
        modal.style.display = "block";
        winModal.style.display = "none";
    });

    return {
        markCells,
        checkWin,
        changeActivePlayer,
    };
})();

const aiModule = (() => {

    const makeMove = () => {
        const cells = document.querySelectorAll('.cell')
        let bestScore = -Infinity;
        for (let i = 0; i < cells[i].length; i++) {
            cells[i].textContent = player2.getMarker();
            score = minimax(cells);
            if (score > bestScore) {
                bestScore = score;
            };
            cells[i].textContent = '';
        }
        return cells[i]
    };

    function minimax(cells, maximisingPlayer) {
    };

    return {
        makeMove,
    }
})();

/* while (true) {
    const randomMove = cells[Math.floor(Math.random() * cells.length)];
    if (randomMove.textContent === '') {
        randomMove.textContent = player2.getMarker();
        game.checkWin();
        game.changeActivePlayer();
        break
    };
}; */