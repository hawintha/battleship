import { Ship } from './ship.js';

const Gameboard = () => {
    return {
        locations: [],
        activeShips: 0,
        newField() {
            for (let i = 0; i < 100; i++) {
                this.locations.push({
                    occupied: false,
                    isShot: false
                });
            }
        },
        placeShip(x, length, isVertical) {
            let newShip = Ship(length);
            this.activeShips++;
            for (let i = 0; i < length; i++) {
                if (!isVertical) this.locations[x + i].occupied = newShip;
                else this.locations[x + (i * 10)].occupied = newShip;
            }
        },
        receiveAttack(x) {
            let ship = this.locations[x].occupied;
            if (ship) { //If this location is occupied by a ship
                this.locations[x].isShot = 'hit'; //Track shots on gameboard
                ship.hit(); //Track hits on ship
                if (ship.hasSunk()) { //If attack sinks ship
                    this.activeShips--;
                    if (this.activeShips === 0) return 'All ships have sunk'; //Report whether all ships sunk
                }
            } else {
                this.locations[x].isShot = 'missed';
            }
            return `${this.activeShips} remaining`
        }
    }
}
export { Gameboard };