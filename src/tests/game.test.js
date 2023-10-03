import { Game } from '../factories/game.js';

test('Initialize a game with a Player & AI', () => {
    const game = Game();
    game.setPlayers(0);
    expect(game.p1.name).toBe("Phantom")
    expect(game.p1.board.locations.length).toBe(100);
    expect(game.p1.fleet[4].name).toBe("destroyer");
})