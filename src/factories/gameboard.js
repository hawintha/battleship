import { shipyard } from '../DOM/shipyard.js';
const Gameboard = () => {
    return {
        locations: [],
        unfiredShots: [],
        sunkShots: [],
        hitsToSearch: [],
        activeShips: 0,
        newField() {
            for (let i = 0; i < 100; i++) {
                this.locations.push({
                    occupied: false,
                    isShot: false
                });
                this.unfiredShots.push(i);
            }
        },

        addShip(x, ship) {
            this.activeShips++;
            for (let i = 0; i < ship.length; i++) {
                if (ship.isVertical) {
                    this.locations[x + (i * 10)].occupied = ship;
                    ship.coordinates.push(x + (i * 10));
                } else {
                    this.locations[x + i].occupied = ship;
                    ship.coordinates.push(x + i);
                }
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


        detectShip() {
            return this.hitsToSearch.filter((shot, i, array) => {
                return (
                    array.includes(shot - 10) || //If there was a hit above
                    (array.includes(shot + 1) && ((shot + 1) % 10 !== 0)) || //If there was a hit to the right
                    array.includes(shot + 10) || //If there was a hit below
                    (array.includes(shot - 1) && (shot % 10 !== 0)) //If there was a hit to the left
                )
            })
        },
        calcAdjacentShots() {
            let adjacentHits = this.detectShip(); //Get the locations of hits that were adjacent to another hit for smart targeting
            adjacentHits = adjacentHits.sort((a, b) => a - b); //Put hits in ascending order
            let possibleShots = [];
            let isVertical = (Math.abs(adjacentHits[1] - adjacentHits[0]) !== 1 ? true : false);
            if (isVertical) {
                let top = adjacentHits[0] - 10;
                if (top >= 0) possibleShots.push(top); //Add next shot above
                let lowermostHit = adjacentHits.find((shot, i, array) => { //Find lowermost hit
                    return !array.includes(shot + 10);
                })
                if (lowermostHit < 100) possibleShots.push(lowermostHit + 10); //Add next shot below
            } else {
                let rightmost = adjacentHits.find((shot, i, array) => !array.includes(shot + 1));
                if (adjacentHits[0] % 10 !== 0) possibleShots.push(adjacentHits[0] - 1); //Add next shot to the left unless it goes into a different row
                if ((rightmost + 1) % 10 !== 0) possibleShots.push(rightmost + 1); //Add next shot to the right unless it goes into a different row
            }
            return possibleShots.filter((shot) => this.unfiredShots.includes(shot)); //Filter out the already fired shots
        },
        calcSoloShots() {
            let origin = this.hitsToSearch[0];
            let surroundingShots = [
                origin - 10,
                origin - 1,
                origin + 1,
                origin + 10,
            ]
            return surroundingShots.filter((shot) => { //Filter out shots on the sides of the board that will go into a different row
                if (origin % 10 === 0) { //If origin shot is in the first column
                    return this.unfiredShots.includes(shot) && ((shot + 1) % 10 !== 0); //Ignore the next shot if it's in a different row
                } else if ((origin + 1) % 10 === 0) { //Else if origin is in the last column
                    return this.unfiredShots.includes(shot) && (shot % 10 !== 0); //Ignore the next shot if it's in a different row
                } else {
                    return this.unfiredShots.includes(shot); //Add shot to options if it hasn't been fired yet
                }
            })
        },
        getRandom(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        getTarget() {
            let possibleAdjacentShots = this.calcAdjacentShots(); //Prioritize targeting adjacent hits
            if (possibleAdjacentShots.length) {
                return this.getRandom(possibleAdjacentShots); //Get a random unfired possible adjacent target
            }
            if (this.hitsToSearch.length) { //Target solo hits
                let possibleSoloShots = this.calcSoloShots(); //Target shots around a hit to narrow down the enemy ship
                if (possibleSoloShots.length) {
                    return this.getRandom(possibleSoloShots);
                }
            }
        },
        getNextShot() {
            if (this.hitsToSearch.length === 0) { //If there are no hits left that partly identify an enemy ship
                let randomIndex = Math.floor(Math.random() * this.unfiredShots.length); //Get index of a random unfired location
                let nextShot = this.unfiredShots[randomIndex];
                this.unfiredShots.splice(randomIndex, 1); //Remove the chosen index from the array
                return nextShot;
            } else { //There is at least 1 fired shot that has not sunk a ship yet
                let nextShot = this.getTarget();
                let index = this.unfiredShots.indexOf(nextShot);
                this.unfiredShots.splice(index, 1); //Remove the shot from the array
                return nextShot;
            }
        },
        receiveAttack(x) {
            let ship = this.locations[x].occupied;
            if (ship) { //If this location is occupied by a ship
                this.locations[x].isShot = "hit"; //Record hit on gameboard
                ship.hit(x); //Track hits on each ship
                if (ship.hasSunk()) { //If attack sinks ship
                    ship.hits.forEach(index => {
                        this.sunkShots.push(index);
                    });
                    this.activeShips--;
                }
            } else {
                this.locations[x].isShot = "miss"; //Record missed shots on gameboard
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