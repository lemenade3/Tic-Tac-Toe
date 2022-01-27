
const gameboardModule = (() => {
    const _board = [];
    const makeBoard = () => {
        for (let i = 0; i < 3; i++) {
            const _row = [];
            for (let j = 0; j < 3; j++) {
                _row.push('');
            };
            _board.push(_row);
        };
        return _board;
    };
    const markCell = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (_board[i][j] === '') {
                    _board[i][j] = Player.marker;
                    _board[i][j].removeEventListener('click', marker);
                };
            };
        };
        return _board;
    };
    const displayBoard = () => {
        const container = document.querySelector('#container');
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.setAttribute('class', 'row')
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.setAttribute('class', 'cell');
                cell.textContent = _board[i][j];
                row.append(cell);
            };
            container.append(row);
        };
    };
    return {
        makeBoard,
        markCell,
        displayBoard,
    };
})();

// Player Factory

const Player = (name, marker) => {
    const getName = () => name;
    const marker = () => marker;
    return {getName, marker,}
};

// Game module

const game = (() => {
    const player1 = Player('Oli', 'X'); // obtain name from input
    const player2 = () => {
        if (input === '', '0') {
            //create AI
        } else {
            Player("Bilbo", '0');
        }
    };
    const changeTurn = () => {
        let turn = player1
        if (turn === player1) {
            turn = player2;
        } else if (turn === player2) {
            turn = player1;
        };
        return turn;
    }
    const win = () => {

    }
    const incrementScore = () => {

    }

    return {
         changeTurn,
         player1,
         player2,
    }
})();

