import { characters } from './characters.js';
import { lobby } from './lobby.js';
import { shipyard } from './shipyard.js';

const battlefield = (() => {
    const displayShips = (fleet) => {
        fleet.forEach(ship => {
            const shipImg = shipyard.renderShipImg(ship);
            shipyard.positionImg(shipImg, ship, document.querySelector('.field'));
        });
    }
    const sinkShip = (enemy, i) => {
        let ship = enemy.board.locations[i].occupied;
        if (enemy.isAI === true) {
            const shipImg = shipyard.renderShipImg(ship);
            shipyard.positionImg(shipImg, ship, document.querySelector('.enemy .field')); //Reveal ship
            const graveyardShip = document.querySelector(`.graveyard .${ship.name}`);
            graveyardShip.style.textDecoration = 'line-through';
        } else {
            const shipyardShip = document.querySelector(`.shipyard .${ship.name}`);
            shipyardShip.classList.add("sunken"); //Fade ship in shipyard
        }
    }
    const checkIfSunk = (enemy, i) => {
        let ship = enemy.board.locations[i].occupied;
        if (ship.hasSunk()) {
            sinkShip(enemy, i);
            return enemy.board.activeShips === 0 ? "win" : "sinks";
        } else {
            return "hits";
        }
    }
    const checkShot = (shotType, enemy, i) => {
        return shotType === "hit" ? checkIfSunk(enemy, i) : "miss";
    }
    const displayShot = (player, enemy, square) => {
        let i = square.dataset.index;
        let shotType = enemy.board.locations[i].isShot;
        square.classList.add("shot", shotType); //Blue dot for missed, red dot for hit
        let status = checkShot(shotType, enemy, i);
        characters.changeMsg(player.isAI, player.name.toLowerCase().replace(/\s/g, ''), enemy.name.toLowerCase().replace(/\s/g, ''), status);
        if (status === "win") {
            characters.changeMsg(enemy.isAI, enemy.name.toLowerCase().replace(/\s/g, ''), enemy.name.toLowerCase().replace(/\s/g, ''), "lose");
            return "win";
        }
    }
    const p1Attack = (square, game) => {
        return game.p1.attack(square.dataset.index, game.p2.board);
    }
    const p2Attack = (game) => {
        let squareIndex = game.p2.autoAttack(game.p1.board);
        let attackedSquare = document.querySelector('.friendly .field').children.item(squareIndex);
        if (displayShot(game.p2, game.p1, attackedSquare) === "win") {
            game.isOver = true; //Disable attack listener
        }
    }
    const ctrlAtk = (e, game) => {
        if (!game.isOver && p1Attack(e.target, game) !== "Already shot") { //Prevent P1 from attacking the same square
            if (displayShot(game.p1, game.p2, e.target) !== "win") {
                setTimeout(() => { p2Attack(game) }, 1500);
            } else {
                game.isOver = true;
            }
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
        const newSection = document.createElement('section');
        newSection.classList.add("battlefield");
        content.replaceChildren(newSection)

        const newBattleground = document.createElement('div');
        newBattleground.classList.add("battleground");
        newBattleground.appendChild(lobby.renderBoard("Friendly Waters")); //P1 board
        newBattleground.appendChild(lobby.renderBoard("Enemy Waters")); //P2 board
        newBattleground.appendChild(shipyard.renderShipyard(game.p1.fleet));
        newBattleground.appendChild(shipyard.renderGraveyard(game.p2.fleet));
        newSection.appendChild(newBattleground);

        const newMsgContainer = document.createElement('div');
        newMsgContainer.classList.add("messages");
        newSection.appendChild(newMsgContainer);
        newMsgContainer.appendChild(characters.renderMsgBox("p1", game.p1.name.toLowerCase().replace(/\s/g, '')));
        newMsgContainer.appendChild(characters.renderMsgBox("p2", game.p2.name.toLowerCase().replace(/\s/g, '')));

        displayShips(game.p1.fleet);
        addAttackListener(game);
    }

    return { renderBattlefield }
})();
export { battlefield }