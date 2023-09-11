import { Game } from '../factories/game.js';
import { lobby } from './lobby.js';

const view = (() => {
    const loadSetup = () => {
        const game = Game();
        const p1CharIndex = document.querySelector('.char-select img').dataset.index;
        game.setPlayers(Number(p1CharIndex));
        lobby.renderSetup(game);
    }

    const loadLobby = () => {
        lobby.renderLobby();
        document.querySelector('.startBtn').addEventListener('click', (e) => {
            e.preventDefault();
            loadSetup();
        });
    }
    return { loadLobby };
})();

export { view };