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
            row.setAttribute('class', 'row')
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
        board,
    };
})();

// Player Factory

const Player = (marker) => {
    const getMarker = () => marker;
    return {getMarker,}
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
                gameboardModule.board[i] = activePlayer.getMarker();
                cell[i].textContent = activePlayer.getMarker();
                changeActivePlayer();
                console.log('hi');
            });
        };
    };

    return {
        activePlayer,
        changeActivePlayer,
        markCells,
    };
})();

game.markCells();


 /* 
const incrementScore = () => {} */