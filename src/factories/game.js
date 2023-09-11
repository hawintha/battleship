import { Player } from '../factories/player.js';

const Game = () => {
    return {
        isOver: false,
        chars: ["Phantom", "Tess", "Hawkeye", "Aeona", "Mo Xuan"],
        p1: Player(),
        p2: Player(),

        getRandomEnemy(p1Index) {
            const RNG = Math.floor(Math.random() * 5);
            if (RNG === p1Index) return this.getRandomEnemy(p1Index);
            else return this.chars[RNG];
        },
        setPlayers(p1CharIndex) {
            this.p1.initialize(this.chars[p1CharIndex], false);
            this.p2.initialize(this.getRandomEnemy(p1CharIndex), true);
        }
    }
}
export { Game };