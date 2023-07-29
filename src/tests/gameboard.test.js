import { Gameboard } from '../factories/gameboard.js';

let board;
beforeEach(() => {
    board = Gameboard();
    board.newField();
})

test('Create a new board', () => {
    expect(board.locations.length).toBe(100);
})

test('Place horizontal ship at a specific coordinate', () => {
    board.placeShip(3, 2, false)
    expect(board.locations[2].occupied).toBe(false);
    expect(board.locations[3].occupied).toBeTruthy;
    expect(board.locations[4].occupied).toBeTruthy;
    expect(board.locations[5].occupied).toBe(false);
})
test('Place vertical ship at a specific coordinate', () => {
    board.placeShip(3, 2, true)
    expect(board.locations[3].occupied.length).toBe(2);
    expect(board.locations[4].occupied).toBe(false);
    expect(board.locations[13].occupied).toBeTruthy;
    expect(board.locations[23].occupied).toBe(false);
})

test('Record & evaluate shots', () => {
    board.placeShip(3, 2, false);
    board.receiveAttack(2);
    board.receiveAttack(3);
    expect(board.locations[2].isShot).toBe('missed');
    expect(board.locations[3].isShot).toBe('hit');
})

test('Report whether all ships have sunk', () => {
    board.placeShip(3, 2, false);
    expect(board.receiveAttack(3)).toBe('1 remaining');
    expect(board.activeShips).toBe(1);

    expect(board.receiveAttack(4)).toBe('All ships have sunk');
    expect(board.locations[4].occupied.hits).toBe(2);
    expect(board.locations[4].occupied.hasSunk()).toBe(true);
    expect(board.activeShips).toBe(0);
})