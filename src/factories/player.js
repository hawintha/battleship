import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

const Player = () => {
    return {
        isAI: null,
        name: '',
        board: Gameboard(),
        fleet: [],
        newFleet() {
            const ships = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];
            const shipLengths = {
                carrier: 5,
                battleship: 4,
                cruiser: 3,
                submarine: 3,
                destroyer: 2
            };
            ships.forEach(ship => {
                const newShip = Ship(shipLengths[ship], ship, false);
                this.fleet.push(newShip);
            });
        },
        initialize(nameInput, isAI) {
            this.isAI = isAI;
            this.name = nameInput;
            this.board.newField();
            this.newFleet();
        },

        attack(x, enemyBoard) {
            return enemyBoard.receiveAttack(x);
        },

        autoAttack(enemyBoard) {
            let RNG = this.board.getNextShot()
            enemyBoard.receiveAttack(RNG);
            return RNG;
        }
    }
}
export { Player };