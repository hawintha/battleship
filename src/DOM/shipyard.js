const shipyard = (() => {
    const ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];

    const renderShips = () => {
        const newContainer = document.createElement('div');
        newContainer.classList.add('shipyard');

        const newLabel = document.createElement('span');
        newLabel.innerText = "SHIPYARD";
        newContainer.appendChild(newLabel);

        ships.forEach(ship => {
            const newCard = document.createElement('div');
            newCard.classList.add('ship-wrapper');

            const newImg = document.createElement('img');
            newImg.setAttribute('src', `../src/assets/${ship.toLowerCase()}.svg`);
            newImg.classList.add(ship.toLowerCase());
            newCard.appendChild(newImg);

            const newLabel = document.createElement('span');
            newCard.appendChild(newLabel);
            newLabel.innerText = ship;
            newContainer.appendChild(newCard);
        });
        return newContainer;
    }

    const calcColumn = (x) => {
        let column = x;
        while (column > 9) {
            column -= 10;
        }
        return column;
    }
    const setMargin = (ship, img) => {
        if (ship === 'submarine') {
            img.style.margin = '0 0 14px -24px';
        } else if (ship === 'destroyer') {
            img.style.margin = '0 0 10px -15px';
        } else {
            img.style.margin = '0 0 0 -18px';
        }
    }
    const placeShip = (x, isVertical, ship) => {
        const field = document.querySelector('.field');
        const shipImg = document.querySelector(`.${ship.name}`);
        const shipLabel = shipImg.nextElementSibling;
        shipLabel.remove();
        field.insertBefore(shipImg, field.children.item(x));
        let columnStart = calcColumn(x) + 1;
        if (isVertical) {
            shipImg.style.transform = 'rotate(90deg)';
            shipImg.style.transformOrigin = 'top left';
            columnStart += 1;
            setMargin(ship.name, shipImg);
        }
        shipImg.style.gridColumnStart = columnStart;
        shipImg.style.gridColumnEnd = columnStart + ship.length;
        shipImg.style.gridRow = Math.floor(x / 10) + 1;
    }
    return { renderShips, placeShip, calcColumn }
})();
export { shipyard };