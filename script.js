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
    return {
        makeBoard,
        displayBoard,
    };
})();

// Player Factory

const Player = (marker) => {
    const getMarker = () => marker;
    return {getMarker,};
};

gameboardModule.makeBoard();
gameboardModule.displayBoard();

// Game module

const game = (() => {
    const player1 = Player('X');
    const player2 = Player('O');

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

        const findVertical = () => {
            
        }
    };

    return {
        markCells,
        checkWin,
    };
})();

game.markCells();

