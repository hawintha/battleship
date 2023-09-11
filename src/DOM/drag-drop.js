import { shipyard } from './shipyard.js';

const dragDrop = (() => {
    let ship = null;

    const handleDragStart = (img, game) => {
        ship = game.p1.fleet.find(item => item.name === img.className);
        if (document.querySelector('.on').innerText === "Vertical") { //If vertical button was turned on
            ship.isVertical = true;
        } else {
            ship.isVertical = false;
        }
    }
    const dragStart = (game) => {
        const ships = document.querySelectorAll('.wharf img');
        ships.forEach(img => {
            img.addEventListener('dragstart', () => {
                handleDragStart(img, game);
            });
        });
    }

    const isPlaceInvalid = (index, i) => {
        if (ship.isVertical) {
            return Math.floor((index + (i * 10))) > 100; //If next square will go past the lower boundary
        } else {
            return Math.floor((index + i) / 10) !== Math.floor(index / 10); //If part of ship will be in a different row due to lack of space
        }
    }
    const calcNextSquare = (index, i) => {
        if (ship.isVertical) {
            return document.querySelector(`.field div[data-index='${index + (i * 10)}']`);
        } else {
            return document.querySelector(`.field div[data-index='${index + i}']`);
        }
    }
    const isCollision = (index, i) => {
        let nextSquare = calcNextSquare(index, i);
        return nextSquare.className === "occupied"; //If ship will collide with a placed ship
    }
    const invalidateSquares = () => {
        const validSquares = document.querySelectorAll('.valid-drag');
        validSquares.forEach(square => {
            square.className = "invalid-drag";
        });
    }
    const styleSquare = (index) => {
        for (let i = 0; i < ship.length; i++) {
            if (isPlaceInvalid(index, i) || isCollision(index, i)) {
                invalidateSquares(); //Add red shadow
                break;
            } else {
                let nextSquare = calcNextSquare(index, i);
                nextSquare.classList.add("valid-drag"); //Add blue shadow
            }
        }
    }
    const handleDragOver = (e, index) => {
        e.preventDefault(); //Allow drop
        styleSquare(index);
    }
    const dragOver = () => {
        const squares = document.querySelectorAll('.field div');
        squares.forEach((square, index) => {
            square.addEventListener('dragover', (e) => {
                handleDragOver(e, index)
            });
        });
    }

    const handleDragLeave = () => { //Remove all shadows
        let hoveredSquares = document.querySelectorAll('.field div:not(.occupied)');
        hoveredSquares.forEach(square => {
            square.classList.remove("invalid-drag");
            square.classList.remove("valid-drag");
        });
    }
    const dragLeave = () => {
        const squares = document.querySelectorAll('.field div');
        squares.forEach(square => {
            square.addEventListener('dragleave', handleDragLeave);
        });
    }

    const handleDragDrop = (square, index, game) => {
        if (square.className === "valid-drag") {
            game.p1.board.addShip(index, ship);
            shipyard.placeShip(ship);
            const occupiedSquares = document.querySelectorAll('.valid-drag');
            occupiedSquares.forEach(square => {
                square.className = "occupied"; //Remove blue shadows
            });
        } else {
            const invalidSquares = document.querySelectorAll('.invalid-drag');
            invalidSquares.forEach(square => {
                square.classList.remove("invalid-drag");//Remove red shadows
            });
        }
    }
    const dragDrop = (game) => {
        const squares = document.querySelectorAll('.field div');
        squares.forEach((square, index) => {
            square.addEventListener('drop', () => {
                handleDragDrop(square, index, game);
            });
        });
    }

    const addListeners = (game) => {
        dragStart(game);
        dragOver();
        dragLeave();
        dragDrop(game);
    }
    return { addListeners }
})();
export { dragDrop };