import { shipyard } from '../DOM/shipyard.js';
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

        addShip(x, isVertical, ship) {
            this.activeShips++;
            for (let i = 0; i < ship.length; i++) {
                if (isVertical) this.locations[x + (i * 10)].occupied = ship;
                else this.locations[x + i].occupied = ship;
            }
        },
        isPlaceInvalid(RNG, length, isVertical) { //Enforce board boundaries
            if (isVertical) {
                return RNG + ((length - 1) * 10) > 99; //Invalid if ship's end is past the last grid row
            } else {
                let column = shipyard.calcColumn(RNG);
                return column + length > 10; //Invalid if ship's end is past the rightmost grid column
            }
        },
        isPlaceOccupied(RNG, i, isVertical) {
            if (isVertical) {
                return this.locations[RNG + (i * 10)].occupied;
            } else {
                return this.locations[RNG + i].occupied;
            }
        },
        checkCollision(length, RNG, isVertical) {
            for (let i = 0; i < length; i++) {
                if (this.isPlaceOccupied(RNG, i, isVertical)) { //If place is occupied
                    return true;
                }
            }
        },
        getRandomPlace(ship, isVertical) {
            let RNG = Math.floor(Math.random() * 100);
            let needRecursion = false;
            if (this.isPlaceInvalid(RNG, ship.length, isVertical)) { //If place is invalid
                needRecursion = true; //Need to find another place
            } else {
                needRecursion = this.checkCollision(ship.length, RNG, isVertical);
            }
            if (needRecursion) return this.getRandomPlace(ship, isVertical);
            return RNG;
        },
        autoPlace(ship) {
            let isVertical = Math.random() < 0.5; //Randomly decide the ship's orientation
            let RNG = this.getRandomPlace(ship, isVertical); //Randomly find a valid place on the board for the ship
            this.addShip(RNG, isVertical, ship); //Add to array
            shipyard.placeShip(RNG, isVertical, ship); //DOM placement
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