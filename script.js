
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
                    _board[i][j] = 'x'; // add event listener to allow changing to player.marker on click
                };
            };
        };
        return _board;
    }
    return {
        makeBoard,
        markCell,
    };
})();


// Cell marker module

// Player Factory

const player = (name, marker) => {
    let score = 0;
    const getName = () => name;
    const getMarker = () => marker;

};

// Turn Module
const turnModule = (() => {
    let turn;
    if (turn == player) {
        turn = computer;
    } else if (turn == computer) {
        turn = player;
    };
    return turn;
})

// Score module

