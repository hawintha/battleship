import { lobby } from './lobby.js';
import { shipyard } from './shipyard.js';

const battlefield = (() => {
    const displayShips = (array) => {
        let deployedShips = [];
        for (let i = 0; i < array.length; i++) {
            const ship = array[i].occupied;
            if (ship) {
                if (deployedShips.includes(ship)) continue; //Skip already deployed ships
                else deployedShips.push(ship);
                const shipImg = shipyard.renderShipImg(ship);
                if (ship === array[i + 1].occupied) { //Horizontal ship
                    shipyard.positionImg(shipImg, i, false, ship);
                } else { //Vertical ship
                    shipyard.positionImg(shipImg, i, true, ship);
                }
            }
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
        displayShips(game.p1.board.locations);
    }

    return { renderBattlefield }
})();
export { battlefield }