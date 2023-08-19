import { lobby } from './lobby.js';
import { shipyard } from './shipyard.js';

const battlefield = (() => {
    const displayShips = (fleet) => {
        fleet.forEach(ship => {
            const shipImg = shipyard.renderShipImg(ship);
            shipyard.positionImg(shipImg, ship, document.querySelector('.field'));
        });
    }
    const showIfSunk = (enemy, i) => {
        let ship = enemy.board.locations[i].occupied;
        if (ship.hasSunk()) {
            if (enemy.name === "AI") {
                const shipImg = shipyard.renderShipImg(ship);
                shipyard.positionImg(shipImg, ship, document.querySelector('.enemy .field')); //Reveal ship
                const graveyardShip = document.querySelector(`.graveyard .${ship.name}`);
                graveyardShip.style.textDecoration = 'line-through';
            } else {
                const shipyardShip = document.querySelector(`.shipyard .${ship.name}`);
                shipyardShip.classList.add("sunken"); //Fade ship in shipyard
            }
        }
    }
    const displayShot = (enemy, square) => {
        let i = square.dataset.index;
        let shotType = enemy.board.locations[i].isShot;
        square.classList.add("shot", shotType); //Blue dot for missed, red dot for hit
        if (shotType === "hit") showIfSunk(enemy, i);
    }
    const checkWinner = (p1, p2) => {
        if (p1.board.activeShips === 0) return p2.name;
        else if (p2.board.activeShips === 0) return p1.name;
        else return null;
    }
    const p1Attack = (square, game) => {
        let result = game.p1.attack(square.dataset.index, game.p2.board);
        displayShot(game.p2, square);
        return result;
    }
    const p2Attack = (p1, p2) => {
        let squareIndex = p2.autoAttack(p1.board);
        let attackedSquare = document.querySelector('.friendly .field').children.item(squareIndex);
        displayShot(p1, attackedSquare);
        let winner = checkWinner(p1, p2);
        if (winner !== null) console.log(`Captain ${winner} has won!`);
    }
    const ctrlAtk = (e, game) => {
        if (p1Attack(e.target, game) !== "Already shot") { //Prevent attacks on the same square
            setTimeout(() => { p2Attack(game.p1, game.p2) }, 200);
        }
    }
    const addAttackListener = (game) => {
        const enemySquares = document.querySelectorAll('.enemy .field div');
        for (let square of enemySquares) {
            square.addEventListener('click', (e) => ctrlAtk(e, game))
        }
    }
    const renderBattlefield = (game) => {
        const content = document.querySelector('.content');
        content.replaceChildren();
        const newSection = document.createElement('section');
        newSection.classList.add("battlefield");
        content.appendChild(newSection);

        newSection.appendChild(lobby.renderBoard("Friendly Waters")); //P1 board
        newSection.appendChild(lobby.renderBoard("Enemy Waters")); //P2 board
        newSection.appendChild(shipyard.renderShipyard(game.p1.fleet));
        newSection.appendChild(shipyard.renderGraveyard(game.p2.fleet));
        displayShips(game.p1.fleet);
        addAttackListener(game);
    }

    return { renderBattlefield }
})();
export { battlefield }