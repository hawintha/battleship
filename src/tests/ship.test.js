import { Ship } from '../factories/ship.js';

test('Ship is able to register & keep track of the # of hits', () => {
    const submarine = Ship(3);
    submarine.hit(5);
    expect(submarine.hits[0]).toBe(5);
})

test('Ship is able to calculate if it has been sunk', () => {
    const destroyer = Ship(2)
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.hasSunk()).toBe(true);
})