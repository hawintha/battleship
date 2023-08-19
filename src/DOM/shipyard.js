const shipyard = (() => {
    const renderWharf = (fleet) => {
        const newContainer = document.createElement('div');
        newContainer.classList.add("wharf");

        const newLabel = document.createElement('h3');
        newLabel.innerText = "Wharf";
        newContainer.appendChild(newLabel);

        fleet.forEach(ship => {
            const newCard = document.createElement('div');
            newCard.classList.add("ship-wrapper");

            const newImg = document.createElement('img');
            newImg.setAttribute('src', `../src/assets/${ship.name}.svg`);
            newImg.classList.add(ship.name);
            newCard.appendChild(newImg);

            const newLabel = document.createElement('span');
            newCard.appendChild(newLabel);
            newLabel.innerText = ship.name;
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
    const positionImg = (shipImg, ship, field) => {
        field.appendChild(shipImg);
        let columnStart = calcColumn(ship.head) + 1;
        shipImg.removeAttribute('style');
        if (ship.isVertical) {
            shipImg.style.transform = 'rotate(90deg)';
            shipImg.style.transformOrigin = 'top left';
            columnStart += 1;
            setMargin(ship.name, shipImg);
        }
        shipImg.style.gridColumnStart = columnStart;
        shipImg.style.gridColumnEnd = columnStart + ship.length;
        shipImg.style.gridRow = Math.floor(ship.head / 10) + 1;
    }
    const placeShip = (ship) => {
        const shipImg = document.querySelector(`.${ship.name}`);
        const shipLabel = shipImg.nextElementSibling;
        shipLabel.remove();
        positionImg(shipImg, ship, document.querySelector('.field'));
    }

    const renderShipImg = (ship) => {
        const newImg = document.createElement('img');
        newImg.setAttribute('src', `../src/assets/${ship.name}.svg`);
        newImg.classList.add(ship.name);
        newImg.style.width = `${ship.length * 2.5}rem`;
        return newImg;
    }
    const renderYard = (type) => {
        const newYard = document.createElement('div');
        newYard.classList.add(type, "yard");

        const newHeading = document.createElement('h3');
        newHeading.innerText = type.toUpperCase();
        newYard.appendChild(newHeading);

        const newContainer = document.createElement('div');
        newContainer.classList.add('container');
        newYard.appendChild(newContainer);
        return newYard;
    }
    const renderShipyard = (fleet) => {
        const newYard = renderYard('shipyard');
        const container = newYard.lastElementChild;
        fleet.forEach(ship => {
            container.appendChild(renderShipImg(ship));
        })
        return newYard;
    }

    const renderGraveyard = (fleet) => {
        const newYard = renderYard('graveyard');
        const container = newYard.lastElementChild;
        fleet.forEach(ship => {
            const newSpan = document.createElement('span');
            newSpan.classList.add(ship.name)
            newSpan.innerText = ship.name[0].toUpperCase() + ship.name.slice(1) + ` (${ship.length})`;
            newSpan.style.width = `${(ship.length * 2) + 3}rem`;
            container.appendChild((newSpan));
        })
        return newYard;
    }

    return { renderWharf, positionImg, placeShip, calcColumn, renderShipImg, renderShipyard, renderGraveyard }
})();
export { shipyard };