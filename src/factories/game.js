import { Player } from '../factories/player.js';

const Game = () => {
    return {
        p1: Player(),
        p2: Player(),
        setPlayers(p1Name) {
            this.p1.initialize(p1Name);
            this.p2.initialize("AI");
        }
    }
}
export { Game };