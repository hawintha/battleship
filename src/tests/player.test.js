import { Player } from '../factories/player.js';

let p1;
let AI;
beforeEach(() => { //Create players with 1 ship on each board
    p1 = Player();
    p1.initialize();
    p1.board.placeShip(3, 2, false);
    AI = Player();
    AI.initialize();
    AI.board.placeShip(4, 2, true);
})

test('Set up boards for each player with a preset ship', () => {
    expect(p1.board.locations[3].occupied).toBeTruthy;
    expect(AI.board.locations[4].occupied).toBeTruthy;
})

test('Player attacks enemy gameboard', () => {
    p1.attack(3, AI.board);
    expect(AI.board.locations[3].isShot).toBe('missed');
    p1.attack(4, AI.board);
    expect(AI.board.locations[4].isShot).toBe('hit');
})
test('AI attacks randomly on player\'s gameboard', () => {
    AI.autoAttack(p1.board);
    expect(p1.board.locations.some((location) => {
        location.isShot
    })).toBeTruthy;
})