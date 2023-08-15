import { Game } from '../factories/game.js';
import { lobby } from './lobby.js';

const view = (() => {
    const loadSetup = () => {
        const game = Game();
        game.setPlayers(document.querySelector('.name-input').value);
        document.querySelector('.content').replaceChildren();
        lobby.renderSetup();
        lobby.addListeners(game.p1);
    }

    const loadLobby = () => {
        lobby.renderLobby();
        document.querySelector('.startBtn').addEventListener('click', loadSetup);
    }
    return { loadLobby };
})();

export { view };