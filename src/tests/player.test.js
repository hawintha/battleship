import { Player } from '../factories/player.js';

let p1;
let AI;
beforeEach(() => {
    p1 = Player();
    p1.initialize("", 3);
    AI = Player();
    AI.initialize("", 2);
})

test('Initialize a game with 2 boards & their corresponding fleets', () => {
    expect(p1.board.locations[0].occupied).toBeFalsy();
    expect(AI.fleet[4].name).toBe("destroyer");
})

test('Set up boards for each player with a preset ship', () => {
    expect(p1.board.locations[3].occupied).toBeTruthy;
    expect(AI.board.locations[4].occupied).toBeTruthy;
})

test('Player attacks enemy gameboard', () => {
    const destroyer = AI.fleet[4];
    AI.board.locations[4].occupied = destroyer;
    p1.attack(3, AI.board);
    expect(AI.board.locations[3].isShot).toBe('miss');
    p1.attack(4, AI.board);
    expect(AI.board.locations[4].isShot).toBe('hit');
})
test('AI attacks randomly on player\'s gameboard', () => {
    AI.autoAttack(p1.board);
    expect(p1.board.locations.some((location) => {
        location.isShot
    })).toBeTruthy;
})