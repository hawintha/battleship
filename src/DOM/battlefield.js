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
    const checkShot = (oldNumShips, newNumShips) => { //Win, sinks, or hit
        if (oldNumShips !== newNumShips) {
            return newNumShips === 0 ? "win" : "sinks";
        } else return "hit"; //Hit did not sink ship
    }
    const updateMsg = (shotType, player, enemy) => {
        characters.changeMsg(player.isAI, player.name.toLowerCase().replace(/\s/g, ''), enemy.name.toLowerCase().replace(/\s/g, ''), shotType);
        if (shotType === "win") {
            characters.changeMsg(enemy.isAI, enemy.name.toLowerCase().replace(/\s/g, ''), enemy.name.toLowerCase().replace(/\s/g, ''), "lose");
        }
    }
    const p2Attack = (game) => {
        let enemyShips = game.p1.board.activeShips;
        let index = game.p2.autoAttack(game.p1.board);
        let square = document.querySelector('.friendly .field').children.item(index);
        let shotType = game.p1.board.locations[index].isShot; //Hit or miss
        square.classList.add("shot", shotType); //Blue dot for miss, red dot for hit

        if (shotType === "hit") {
            game.p2.board.hitsToSearch.push(index);
            game.p2.board.hitsToSearch.sort((a, b) => a - b); //Put hits in ascending order
            shotType = checkShot(enemyShips, game.p1.board.activeShips);
            if (shotType === "sinks") {
                let ship = game.p1.board.locations[index].occupied;
                game.p2.board.hitsToSearch = game.p2.board.hitsToSearch.filter((hit) => {
                    return !ship.coordinates.includes(hit); //Filter out sunk shots from the search queue
                })
                sinkShip(game.p1, index);
            } else if (shotType === "win") {
                game.isOver = true; //End game
            }
        }
        updateMsg(shotType, game.p2, game.p1);
    }
    const ctrlAtk = (e, game) => {
        let square = e.target;
        let index = square.dataset.index
        let enemyShips = game.p2.board.activeShips;
        game.p1.attack(index, game.p2.board);
        let shotType = game.p2.board.locations[index].isShot; //Hit or miss
        square.classList.add("shot", shotType); //Blue dot for miss, red dot for hit
        if (shotType === "hit") {
            shotType = checkShot(enemyShips, game.p2.board.activeShips); //Sink or win or hit
            if (shotType !== "hit") { //Sink or win
                sinkShip(game.p2, index);
                if (shotType === "win") {
                    game.isOver = true; //End game
                }
            }
        }
        if (!game.isOver) setTimeout(() => { p2Attack(game) }, 1500); //If p1 didn't win, let AI attack
        updateMsg(shotType, game.p1, game.p2);
    }
    const addAttackListener = (game) => {
        const enemySquares = document.querySelectorAll('.enemy .field div');
        for (let square of enemySquares) {
            square.addEventListener('click', (e) => {
                if (!game.isOver && !e.target.classList.contains("shot")) { //Prevent P1 from attacking the same square
                    ctrlAtk(e, game);
                }
            })
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