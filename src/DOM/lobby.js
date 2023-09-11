import { characters } from './characters.js';
import { dragDrop } from './drag-drop.js';
import { shipyard } from './shipyard.js';
import { battlefield } from './battlefield.js';


const lobby = (() => {
    const content = document.querySelector('.content');

    const renderTitle = (type) => {
        const newSpan = document.createElement('span');
        newSpan.innerText = "Battleship";
        newSpan.classList = type;
        return newSpan;
    }
    const renderForm = () => {
        const newForm = document.createElement('form');

        const newHeading = document.createElement('h2');
        newHeading.innerText = "Character Selection";
        newForm.appendChild(newHeading);

        newForm.appendChild(characters.renderCharSelect());

        const newWrapper = document.createElement('div');
        newWrapper.classList.add("name-input-wrapper")
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = "Phantom";
        newInput.value = "Phantom";
        newInput.classList.add("name-input");
        newWrapper.appendChild(newInput);
        const newBorder = document.createElement('span');
        newBorder.classList.add("input-border");
        newWrapper.appendChild(newBorder);
        newForm.appendChild(newWrapper);

        const newBtn = document.createElement('button');
        newBtn.innerText = "START";
        newBtn.classList.add("startBtn");
        newForm.appendChild(newBtn);
        return newForm;
    }
    const renderLobby = () => {
        const newSection = document.createElement('section');
        newSection.classList.add("lobby");
        content.appendChild(newSection);

        const newTitle = document.createElement('div');
        newTitle.classList = "title"
        newTitle.appendChild(renderTitle('bg'));
        newTitle.appendChild(renderTitle('fg'));
        newSection.appendChild(newTitle);

        newSection.appendChild(renderForm());
        document.querySelectorAll('.arrow').forEach(arrow => {
            arrow.addEventListener('click', () => characters.changeChar(arrow));
        });
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
        const btns = ["Reset", "Random", "Confirm", "Vertical", "Horizontal"];
        btns.forEach(btn => {
            const newBtn = document.createElement('button');
            newBtn.innerText = btn;
            newBtn.classList.add(btn.toLowerCase());
            if (btn === "Vertical" || btn === "Horizontal") {
                newBtn.classList.add("orientation");
            }
            if (btn === "Confirm" || btn === "Horizontal") {
                newBtn.disabled = true;
            }
            newContainer.appendChild(newBtn);
        });
        return newContainer;
    }
    const renderBoard = (heading) => {
        const newBoard = document.createElement('div');
        newBoard.classList.add("board", heading.toLowerCase().slice(0, -7));
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
    const renderSetup = (game) => {
        const newSection = document.createElement('section');
        newSection.classList.add("pregame");
        document.querySelector('.content').replaceChildren(newSection);
        newSection.appendChild(characters.renderMsgBox("guide", game.p1.name.toLowerCase().replace(/\s/g, '')));

        const newContainer = document.createElement('div');
        newContainer.classList.add("setup");
        newSection.appendChild(newContainer);
        newContainer.appendChild(renderBoard("My Fleet"));
        newContainer.appendChild(shipyard.renderWharf(game.p1.fleet));

        newSection.appendChild(renderControls());
        document.querySelector('.horizontal').classList.add("on");
        addListeners(game);
    }

    const resetSetup = (game) => {
        game.p1.board.reset();
        const gameboard = document.querySelector('.board');
        gameboard.replaceChild(renderField(), document.querySelector('.field')); //New field
        const setup = document.querySelector('.setup');
        setup.replaceChild(shipyard.renderWharf(game.p1.fleet), document.querySelector('.wharf')); //Return wharf images
        dragDrop.addListeners(game);
    }
    const toggleBtns = (clickedBtn, oppositeBtn) => {
        clickedBtn.classList.add("on");
        oppositeBtn.classList.remove("on");
        clickedBtn.disabled = true;
        oppositeBtn.disabled = false;
    }
    const addListeners = (game) => {
        const resetBtn = document.querySelector('.reset');
        const randomizeBtn = document.querySelector('.random');
        const confirmBtn = document.querySelector('.confirm');
        const orientationBtns = document.querySelectorAll('.orientation');
        resetBtn.addEventListener('click', () => {
            resetSetup(game);
            confirmBtn.disabled = true;
        });
        randomizeBtn.addEventListener('click', () => {
            resetSetup(game); // Reset first before randomizing again
            game.p1.fleet.forEach(ship => {
                game.p1.board.autoPlace(ship, false);
            })
            confirmBtn.disabled = false;
        });
        confirmBtn.addEventListener('click', () => {
            game.p2.fleet.forEach(ship => { //Auto place AI ships, but not on DOM
                game.p2.board.autoPlace(ship, true);
            })
            battlefield.renderBattlefield(game);
        });
        orientationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns(btn, document.querySelector('.on'))
            });
        });
        dragDrop.addListeners(game);
    }
    return { renderLobby, renderBoard, renderSetup, addListeners }
})();
export { lobby };