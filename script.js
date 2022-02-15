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

    const resetPlayers = () => {activePlayer = player1};

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
                if (bC[i][0] === activePlayer.getMarker() && bC[i][1] === activePlayer.getMarker()
                 && bC[i][2] === activePlayer.getMarker() || bC[0][j] === activePlayer.getMarker()
                  && bC[1][j] === activePlayer.getMarker() && bC[2][j] === activePlayer.getMarker() 
                  || bC[0][0] === activePlayer.getMarker() && bC[1][1] === activePlayer.getMarker()
                   && bC[2][2] === activePlayer.getMarker() || bC[0][2] === activePlayer.getMarker()
                    && bC[1][1] === activePlayer.getMarker() && bC[2][0] === activePlayer.getMarker()) {
                    let winModal = document.querySelector('#winModal')
                    declareWinner()
                    winModal.style.display = "block";
                    gameboardModule.removeBoard();
                } else if (bC[0][0] != '' && bC[0][1] != '' && bC[0][2] != '' && bC[1][0] != '' &&
                 bC[1][1] != '' && bC[1][2] != '' && bC[2][0] != '' && bC[2][1] != '' && bC[2][2] != '') {
                    declareDraw();
                    winModal.style.display = "block";
                    gameboardModule.removeBoard();
                };
                // Need to find a cleaner way to do this, code checks if symbols match in each row, then in each column then across both diagonals
            };
        };
    };

    return {
        markCells,
        checkWin,
        changeActivePlayer,
        resetPlayers,
    };
})();




const displayModule = (() => {
    let modal = document.querySelector("#modal");
    
    let twoPlayer = document.querySelector('#twoPlayer')
    twoPlayer.addEventListener('click', () => {
        gameboardModule.makeBoard();
        gameboardModule.displayBoard();
        game.markCells();
        modal.style.display = "none";
        game.resetPlayers();
    });

    const selectComputer = document.querySelector('#computer');
    selectComputer.addEventListener('click', () => {
        gameboardModule.makeBoard();
        gameboardModule.displayBoard();
        game.markCells();
        modal.style.display = "none";
        game.resetPlayers();
        const cells = document.querySelectorAll('.cell')
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', () => {aiModule.aiMove()},{once: true}); // This line allows double clicking on opponents cell which breaks the game.
        };
    });
    
    let newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', () => {
        modal.style.display = "block";
        winModal.style.display = "none";
    });
})();





const aiModule = (() => {

    const aiMove = () => {
        findBestMove();
        game.checkWin();
        game.changeActivePlayer();
    };

    function findBestMove () {
        const cells = document.querySelectorAll('.cell');
        let bestMove;
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = player2.getMarker();
                let score = minimax(cells, 0, true);
                cells[i].textContent = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = cells[i];
                };
            };
        };
        bestMove.textContent = player2.getMarker();
    }

    function minimax(cells, depth, maximisingPlayer) {

        function findResult() {
            let result;
            if (cells[0].textContent === 'X' && cells[1].textContent === 'X' && cells[2].textContent === 'X' || cells[3].textContent === 'X' && cells[4].textContent === 'X' && cells[5].textContent === 'X' || cells[6].textContent === 'X' && cells[7].textContent === 'X' && cells[8].textContent === 'X'
            || cells[0].textContent === 'X' && cells[3].textContent === 'X' && cells[6].textContent === 'X'|| cells[1].textContent === 'X' && cells[4].textContent === 'X' && cells[7].textContent === 'X'|| cells[2].textContent === 'X' && cells[5].textContent === 'X' && cells[8].textContent === 'X'
            || cells[0].textContent === 'X' && cells[4].textContent === 'X' && cells[8].textContent === 'X'|| cells[2].textContent === 'X' && cells[4].textContent === 'X' && cells[6].textContent === 'X') {
                result = -1;
            } else if (cells[0].textContent === 'O' && cells[1].textContent === 'O' && cells[2].textContent === 'O' || cells[3].textContent === 'O' && cells[4].textContent === 'O' && cells[5].textContent === 'O' || cells[6].textContent === 'O' && cells[7].textContent === 'O' && cells[8].textContent === 'O'
            || cells[0].textContent === 'O' && cells[3].textContent === 'O' && cells[6].textContent === 'O'|| cells[1].textContent === 'O' && cells[4].textContent === 'O' && cells[7].textContent === 'O'|| cells[2].textContent === 'O' && cells[5].textContent === 'O' && cells[8].textContent === 'O'
            || cells[0].textContent === 'O' && cells[4].textContent === 'O' && cells[8].textContent === 'O'|| cells[2].textContent === 'O' && cells[4].textContent === 'O' && cells[6].textContent === 'O') {
                result = 1;
            } else if (cells[0].textContent != '' && cells[1].textContent != '' && cells[2].textContent != ''
            && cells[3].textContent != '' && cells[4].textContent != '' && cells[5].textContent != '' &&
            cells[6].textContent != '' && cells[7].textContent != '' && cells[8].textContent != '') {
                result = 0;
            };
            return result;
        };

        if (findResult() != undefined) {
            return findResult();
        };

        if (maximisingPlayer) {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (cells[i].textContent === '') {
                    cells[i].textContent = player1.getMarker();
                    let score = minimax(cells, depth + 1, false);
                    cells[i].textContent = '';
                    if (score < bestScore) {
                        bestScore = score;
                    };
                };
            };
            return bestScore;
        } else {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (cells[i].textContent === '') {
                    cells[i].textContent = player2.getMarker();
                    let score = minimax(cells, depth + 1, true);
                    cells[i].textContent = '';
                    if (score > bestScore) {
                        bestScore = score;
                    };
                };
            };
            return bestScore;
        }
    };

    return {
        aiMove,
    }
})();

/* while (true) {
    const randomMove = cells[Math.floor(Math.random() * cells.length)];
    if (randomMove.textContent === '') {
        randomMove.textContent = player2.getMarker();
        break
    };
}; */