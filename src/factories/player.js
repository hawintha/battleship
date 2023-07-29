import { Gameboard } from './gameboard.js';

const Player = () => {
    return {
        board: Gameboard(),
        initialize() {
            this.board.newField();
        },

        attack(x, enemyBoard) {
            enemyBoard.receiveAttack(x);
        },
        autoAttack(enemyBoard) {
            let RNG = Math.floor(Math.random() * 100);
            if (enemyBoard.locations[RNG].isShot === false) {
                enemyBoard.receiveAttack(RNG);
            } else {
                this.autoAttack(enemyBoard);
            }
        },
    }
}
export { Player };