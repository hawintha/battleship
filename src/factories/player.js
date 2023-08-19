import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

const Player = () => {
    return {
        name: '',
        board: Gameboard(),
        fleet: [],
        newFleet() {
            const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
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
        initialize(nameInput) {
            if (nameInput) this.name = nameInput;
            this.board.newField();
            this.newFleet();
        },

        attack(x, enemyBoard) {
            return enemyBoard.receiveAttack(x);
        },
        autoAttack(enemyBoard) {
            let RNG = Math.floor(Math.random() * 100);
            if (enemyBoard.locations[RNG].isShot === false) {
                enemyBoard.receiveAttack(RNG);
            } else {
                return this.autoAttack(enemyBoard); //Get different RNG
            }
            return RNG;
        },
    }
}
export { Player };