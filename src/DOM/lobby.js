import { shipyard } from './shipyard.js';

const lobby = (() => {
    const content = document.querySelector('.content');

    const renderLobby = () => {
        const newSection = document.createElement('section');
        newSection.classList.add('lobby');
        content.appendChild(newSection);

        const newTitle = document.createElement('h1');
        newTitle.innerText = "Battleship";
        newSection.appendChild(newTitle);

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = "Captain's Name";
        newInput.classList.add('name-input');
        newSection.appendChild(newInput);

        const newBtn = document.createElement('button');
        newBtn.innerText = "Start";
        newBtn.classList.add('startBtn');
        newSection.appendChild(newBtn);
    }

    const renderLabels = (characters) => {
        const newContainer = document.createElement('div');
        newContainer.classList.add('labels');
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
        newContainer.classList.add('field');
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
        newContainer.classList.add('controls');
        const btns = ['Reset', 'Randomize', 'Confirm', 'Horizontal', 'Vertical'];
        btns.forEach(btn => {
            const newBtn = document.createElement('button');
            newBtn.innerText = btn;
            newBtn.classList.add(btn.toLowerCase());
            newContainer.appendChild(newBtn);
        });
        return newContainer;
    }
    const renderBoard = () => {
        const newBoard = document.createElement('div');
        newBoard.classList.add('board');
        const newHeading = document.createElement('h2');
        newHeading.innerText = "My Fleet";
        newBoard.appendChild(newHeading);

        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        newBoard.appendChild(renderLabels(letters));
        newBoard.appendChild(renderLabels(numbers));
        newBoard.appendChild(renderField());
        newBoard.appendChild(renderControls());
        return newBoard;
    }
    const renderSetup = () => {
        const newSection = document.createElement('section');
        newSection.classList.add('setup');
        content.appendChild(newSection);
        newSection.appendChild(renderBoard());
        newSection.appendChild(shipyard.renderShips());
    }

    const addListeners = (player) => {
        const randomizeBtn = document.querySelector('.randomize');
        randomizeBtn.addEventListener('click', () => {
            player.fleet.forEach(ship => {
                player.board.autoPlace(ship);
            })
        });
    }
    return { renderLobby, renderSetup, addListeners }
})();
export { lobby };