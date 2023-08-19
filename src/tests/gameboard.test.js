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
    const destroyer = Ship(2, 'destroyer', false);
    board.addShip(3, destroyer);
    expect(board.activeShips).toBe(1);
    expect(board.locations[3].occupied).toBe(destroyer);
    expect(board.locations[4].occupied).toBe(destroyer);
    expect(board.locations[5].occupied).toBeFalsy();
})
test('Add a vertical Submarine ship to the board', () => {
    const submarine = Ship(3, 'submarine', true);
    board.addShip(3, submarine);
    expect(board.activeShips).toBe(1);
    expect(board.locations[3].occupied).toBe(submarine);
    expect(board.locations[4].occupied).toBeFalsy();
    expect(board.locations[23].occupied).toBe(submarine);
})

test('Do not allow ships that go past the field boundaries', () => {
    const submarine = Ship(3, 'submarine', false);
    const cruiser = Ship(3, 'cruiser', true);
    expect(board.isPlaceInvalid(9, submarine)).toBeTruthy();
    expect(board.isPlaceInvalid(84, cruiser)).toBeTruthy();
    expect(board.isPlaceInvalid(75, cruiser)).toBeFalsy();
})
test('Verify if a location is occupied by a ship', () => {
    const submarine = Ship(3, 'submarine', true);
    board.addShip(3, submarine);
    expect(board.isPlaceOccupied(13, 1, true)).toBe(submarine);
})
test('Verify if the ship length will collide with a preexisting ship', () => {
    const submarine = Ship(3, 'submarine', false);
    board.addShip(3, submarine);
    expect(board.checkCollision(2, submarine)).toBeTruthy();
})

test('Randomly find a valid place on the board for a Submarine', () => {
    const submarine = Ship(3, 'submarine');
    expect(typeof board.getRandomPlace(submarine)).toBe('number');
})

test('Record & evaluate shots', () => {
    const submarine = Ship(3, 'submarine');
    board.addShip(3, submarine);
    board.receiveAttack(2);
    board.receiveAttack(3);
    expect(board.locations[2].isShot).toBe('missed');
    expect(board.locations[3].isShot).toBe('hit');
})
test('Report whether all ships have sunk', () => {
    const destroyer = Ship(2, 'destroyer');
    board.addShip(3, destroyer);
    board.receiveAttack(3);
    expect(board.activeShips).toBe(1);

    board.receiveAttack(4);
    expect(board.locations[4].occupied.hits).toBe(2);
    expect(board.locations[4].occupied.hasSunk()).toBe(true);
    expect(board.activeShips).toBe(0);
})