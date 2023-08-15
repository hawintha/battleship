import { Gameboard } from '../factories/gameboard.js';
import { Ship } from '../factories/ship.js';

let board;
beforeEach(() => {
    board = Gameboard();
    board.newField();
})

test('Create a new board', () => {
    expect(board.locations.length).toBe(100);
})

test('Add a horizontal Destroyer ship to the board', () => {
    const destroyer = Ship(2, 'destroyer');
    board.addShip(3, false, destroyer);
    expect(board.activeShips).toBe(1);
    expect(board.locations[3].occupied).toBe(destroyer);
    expect(board.locations[4].occupied).toBe(destroyer);
    expect(board.locations[5].occupied).toBeFalsy();
})
test('Add a vertical Submarine ship to the board', () => {
    const submarine = Ship(3, 'submarine');
    board.addShip(3, true, submarine);
    expect(board.activeShips).toBe(1);
    expect(board.locations[3].occupied).toBe(submarine);
    expect(board.locations[4].occupied).toBeFalsy();
    expect(board.locations[23].occupied).toBe(submarine);
})

test('Do not allow ships that go past the field boundaries', () => {
    expect(board.isPlaceInvalid(9, 3, false)).toBeTruthy();
    expect(board.isPlaceInvalid(84, 3, true)).toBeTruthy();
    expect(board.isPlaceInvalid(75, 3, true)).toBeFalsy();
})
test('Verify if a location is occupied by a ship', () => {
    const submarine = Ship(3, 'submarine');
    board.addShip(3, true, submarine);
    expect(board.isPlaceOccupied(13, 1, true)).toBe(submarine);
})
test('Verify if the ship length will collide with a preexisting ship', () => {
    const submarine = Ship(3, 'submarine');
    board.addShip(3, true, submarine);
    expect(board.checkCollision(2, 13, false)).toBeTruthy();
})

test('Randomly find a valid place on the board for a Submarine', () => {
    const submarine = Ship(3, 'submarine');
    expect(typeof board.getRandomPlace(submarine, false)).toBe('number');
})

test('Record & evaluate shots', () => {
    const submarine = Ship(3, 'submarine');
    board.addShip(3, true, submarine);
    board.receiveAttack(2);
    board.receiveAttack(3);
    expect(board.locations[2].isShot).toBe('missed');
    expect(board.locations[3].isShot).toBe('hit');
})
test('Report whether all ships have sunk', () => {
    const destroyer = Ship(2, 'destroyer');
    board.addShip(3, false, destroyer);
    expect(board.receiveAttack(3)).toBe('1 remaining');
    expect(board.activeShips).toBe(1);

    expect(board.receiveAttack(4)).toBe('All ships have sunk');
    expect(board.locations[4].occupied.hits).toBe(2);
    expect(board.locations[4].occupied.hasSunk()).toBe(true);
    expect(board.activeShips).toBe(0);
})