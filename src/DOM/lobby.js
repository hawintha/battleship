import { shipyard } from './shipyard.js';
import { battlefield } from './battlefield.js';

const lobby = (() => {
    const content = document.querySelector('.content');

    const renderLobby = () => {
        const newSection = document.createElement('section');
        newSection.classList.add("lobby");
        content.appendChild(newSection);

        const newTitle = document.createElement('h1');
        newTitle.innerText = "Battleship";
        newSection.appendChild(newTitle);

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = "Captain's Name";
        newInput.classList.add("name-input");
        newSection.appendChild(newInput);

        const newBtn = document.createElement('button');
        newBtn.innerText = "Start";
        newBtn.classList.add("startBtn");
        newSection.appendChild(newBtn);
    }

    const renderLabels = (characters) => {
        const newContainer = document.createElement('div');
        newContainer.classList.add("labels");
        characters.forEach((char) => {
            const newLabel = document.createElement('span');
            newLabel.innerText = char;
            newContainer.appendChild(newLabel);
        })
        return newContainer;
    }

    const calcColumn = (i) => {
        let column = i;
        while (column > 9) {
            column -= 10;
        }
        return column;
    }
    const renderField = () => {
        const newContainer = document.createElement('div');
        newContainer.classList.add("field");
        for (let i = 0; i < 100; i++) {
            const newSquare = document.createElement('div');
            newSquare.dataset.index = i;
            newSquare.dataset.row = Math.floor(i / 10) + 1;
            newSquare.dataset.column = calcColumn(i) + 1;
            newSquare.setAttribute('style', `grid-area: ${newSquare.getAttribute('data-row')} / ${newSquare.getAttribute('data-column')};`);
            newContainer.appendChild(newSquare);
        }
        return newContainer;
    }
    const renderControls = () => {
        const newContainer = document.createElement('div');
        newContainer.classList.add("controls");
        const btns = ['Reset', 'Randomize', 'Confirm', 'Horizontal', 'Vertical'];
        btns.forEach(btn => {
            const newBtn = document.createElement('button');
            newBtn.innerText = btn;
            newBtn.classList.add(btn.toLowerCase());
            newContainer.appendChild(newBtn);
        });
        return newContainer;
    }
    const renderBoard = (heading) => {
        const newBoard = document.createElement('div');
        newBoard.classList.add("board", heading.substring(0, heading.length - 7).toLowerCase());
        const newHeading = document.createElement('h2');
        newHeading.innerText = heading;
        newBoard.appendChild(newHeading);
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        newBoard.appendChild(renderLabels(letters));
        newBoard.appendChild(renderLabels(numbers));
        newBoard.appendChild(renderField());
        return newBoard;
    }
    const renderSetup = (p1) => {
        const newSection = document.createElement('section');
        newSection.classList.add("setup");
        content.appendChild(newSection);
        newSection.appendChild(renderBoard("My Fleet"));
        document.querySelector('.board').appendChild(renderControls());
        document.querySelector('.confirm').disabled = true;

        newSection.appendChild(shipyard.renderWharf(p1.fleet));
    }

    const addListeners = (game) => {
        const randomizeBtn = document.querySelector('.randomize');
        const confirmBtn = document.querySelector('.confirm');
        randomizeBtn.addEventListener('click', () => {
            game.p1.fleet.forEach(ship => {
                game.p1.board.autoPlace(ship, false);
            })
            game.p2.fleet.forEach(ship => { //Auto place AI ships, but not on DOM
                game.p2.board.autoPlace(ship, true);
            })
            confirmBtn.disabled = false;
        });
        confirmBtn.addEventListener('click', () => {
            battlefield.renderBattlefield(game);
        });
    }
    return { renderLobby, renderBoard, renderSetup, addListeners }
})();
export { lobby };