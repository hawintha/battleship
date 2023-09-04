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

        addShip(x, ship) {
            this.activeShips++;
            for (let i = 0; i < ship.length; i++) {
                if (ship.isVertical) this.locations[x + (i * 10)].occupied = ship;
                else this.locations[x + i].occupied = ship;
            }
            ship.head = x;
        },
        isPlaceInvalid(RNG, ship) { //Enforce board boundaries
            if (ship.isVertical) {
                return RNG + ((ship.length - 1) * 10) > 99; //Invalid if ship's end is past the last grid row
            } else {
                let column = shipyard.calcColumn(RNG);
                return column + ship.length > 10; //Invalid if ship's end is past the rightmost grid column
            }
        },
        isPlaceOccupied(RNG, i, isVertical) {
            if (isVertical) {
                return this.locations[RNG + (i * 10)].occupied;
            } else {
                return this.locations[RNG + i].occupied;
            }
        },
        checkCollision(RNG, ship) { //Check if any part of the new ship will collide with an already placed ship
            for (let i = 0; i < ship.length; i++) {
                if (this.isPlaceOccupied(RNG, i, ship.isVertical)) { //If place is occupied
                    return true;
                }
            }
        },
        getRandomPlace(ship) {
            let RNG = Math.floor(Math.random() * 100);
            let needRecursion = false;
            if (this.isPlaceInvalid(RNG, ship)) { //If place is invalid
                needRecursion = true; //Need to find another place
            } else {
                needRecursion = this.checkCollision(RNG, ship);
            }
            if (needRecursion) return this.getRandomPlace(ship);
            return RNG;
        },
        autoPlace(ship, isAI) {
            ship.setRandomAxis(); //Randomly decide the ship's orientation
            let RNG = this.getRandomPlace(ship); //Randomly find a valid place on the board for the ship
            this.addShip(RNG, ship); //Add to array
            if (!isAI) shipyard.placeShip(ship); //DOM placement
        },

        receiveAttack(x) {
            let ship = this.locations[x].occupied;
            if (this.locations[x].isShot !== false) return "Already shot"
            if (ship) { //If this location is occupied by a ship
                this.locations[x].isShot = "hit"; //Record hits on gameboard
                ship.hit(); //Track hits on each ship
                if (ship.hasSunk()) { //If attack sinks ship
                    this.activeShips--;
                    return ship.name;
                }
            } else {
                this.locations[x].isShot = "missed"; //Record missed shots on gameboard
            }
        },

        reset() {
            this.activeShips = 0;
            this.locations = [];
            this.newField();
        }
    }
}
export { Gameboard };