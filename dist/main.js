/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM/battlefield.js":
/*!********************************!*\
  !*** ./src/DOM/battlefield.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   battlefield: () => (/* binding */ battlefield)\n/* harmony export */ });\n/* harmony import */ var _characters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characters.js */ \"./src/DOM/characters.js\");\n/* harmony import */ var _lobby_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lobby.js */ \"./src/DOM/lobby.js\");\n/* harmony import */ var _shipyard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipyard.js */ \"./src/DOM/shipyard.js\");\n\r\n\r\n\r\n\r\nconst battlefield = (() => {\r\n    const displayShips = (fleet) => {\r\n        fleet.forEach(ship => {\r\n            const shipImg = _shipyard_js__WEBPACK_IMPORTED_MODULE_2__.shipyard.renderShipImg(ship);\r\n            _shipyard_js__WEBPACK_IMPORTED_MODULE_2__.shipyard.positionImg(shipImg, ship, document.querySelector('.field'));\r\n        });\r\n    }\r\n    const sinkShip = (enemy, i) => {\r\n        let ship = enemy.board.locations[i].occupied;\r\n        if (enemy.isAI === true) {\r\n            const shipImg = _shipyard_js__WEBPACK_IMPORTED_MODULE_2__.shipyard.renderShipImg(ship);\r\n            _shipyard_js__WEBPACK_IMPORTED_MODULE_2__.shipyard.positionImg(shipImg, ship, document.querySelector('.enemy .field')); //Reveal ship\r\n            const graveyardShip = document.querySelector(`.graveyard .${ship.name}`);\r\n            graveyardShip.style.textDecoration = 'line-through';\r\n        } else {\r\n            const shipyardShip = document.querySelector(`.shipyard .${ship.name}`);\r\n            shipyardShip.classList.add(\"sunken\"); //Fade ship in shipyard\r\n        }\r\n    }\r\n    const checkIfSunk = (enemy, i) => {\r\n        let ship = enemy.board.locations[i].occupied;\r\n        if (ship.hasSunk()) {\r\n            sinkShip(enemy, i);\r\n            return enemy.board.activeShips === 0 ? \"win\" : \"sinks\";\r\n        } else {\r\n            return \"hits\";\r\n        }\r\n    }\r\n    const checkShot = (shotType, enemy, i) => {\r\n        return shotType === \"hit\" ? checkIfSunk(enemy, i) : \"miss\";\r\n    }\r\n    const displayShot = (player, enemy, square) => {\r\n        let i = square.dataset.index;\r\n        let shotType = enemy.board.locations[i].isShot;\r\n        square.classList.add(\"shot\", shotType); //Blue dot for missed, red dot for hit\r\n        let status = checkShot(shotType, enemy, i);\r\n        _characters_js__WEBPACK_IMPORTED_MODULE_0__.characters.changeMsg(player.isAI, player.name.toLowerCase().replace(/\\s/g, ''), enemy.name.toLowerCase().replace(/\\s/g, ''), status);\r\n        if (status === \"win\") {\r\n            _characters_js__WEBPACK_IMPORTED_MODULE_0__.characters.changeMsg(enemy.isAI, enemy.name.toLowerCase().replace(/\\s/g, ''), enemy.name.toLowerCase().replace(/\\s/g, ''), \"lose\");\r\n            return \"win\";\r\n        }\r\n    }\r\n    const p1Attack = (square, game) => {\r\n        return game.p1.attack(square.dataset.index, game.p2.board);\r\n    }\r\n    const p2Attack = (game) => {\r\n        let squareIndex = game.p2.autoAttack(game.p1.board);\r\n        let attackedSquare = document.querySelector('.friendly .field').children.item(squareIndex);\r\n        if (displayShot(game.p2, game.p1, attackedSquare) === \"win\") {\r\n            game.isOver = true; //Disable attack listener\r\n        }\r\n    }\r\n    const ctrlAtk = (e, game) => {\r\n        if (!game.isOver && p1Attack(e.target, game) !== \"Already shot\") { //Prevent P1 from attacking the same square\r\n            if (displayShot(game.p1, game.p2, e.target) !== \"win\") {\r\n                setTimeout(() => { p2Attack(game) }, 1500);\r\n            } else {\r\n                game.isOver = true;\r\n            }\r\n        }\r\n    }\r\n    const addAttackListener = (game) => {\r\n        const enemySquares = document.querySelectorAll('.enemy .field div');\r\n        for (let square of enemySquares) {\r\n            square.addEventListener('click', (e) => ctrlAtk(e, game))\r\n        }\r\n    }\r\n    const renderBattlefield = (game) => {\r\n        const content = document.querySelector('.content');\r\n        const newSection = document.createElement('section');\r\n        newSection.classList.add(\"battlefield\");\r\n        content.replaceChildren(newSection)\r\n\r\n        const newBattleground = document.createElement('div');\r\n        newBattleground.classList.add(\"battleground\");\r\n        newBattleground.appendChild(_lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.renderBoard(\"Friendly Waters\")); //P1 board\r\n        newBattleground.appendChild(_lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.renderBoard(\"Enemy Waters\")); //P2 board\r\n        newBattleground.appendChild(_shipyard_js__WEBPACK_IMPORTED_MODULE_2__.shipyard.renderShipyard(game.p1.fleet));\r\n        newBattleground.appendChild(_shipyard_js__WEBPACK_IMPORTED_MODULE_2__.shipyard.renderGraveyard(game.p2.fleet));\r\n        newSection.appendChild(newBattleground);\r\n\r\n        const newMsgContainer = document.createElement('div');\r\n        newMsgContainer.classList.add(\"messages\");\r\n        newSection.appendChild(newMsgContainer);\r\n        newMsgContainer.appendChild(_characters_js__WEBPACK_IMPORTED_MODULE_0__.characters.renderMsgBox(\"p1\", game.p1.name.toLowerCase().replace(/\\s/g, '')));\r\n        newMsgContainer.appendChild(_characters_js__WEBPACK_IMPORTED_MODULE_0__.characters.renderMsgBox(\"p2\", game.p2.name.toLowerCase().replace(/\\s/g, '')));\r\n\r\n        displayShips(game.p1.fleet);\r\n        addAttackListener(game);\r\n    }\r\n\r\n    return { renderBattlefield }\r\n})();\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/battlefield.js?");

/***/ }),

/***/ "./src/DOM/characters.js":
/*!*******************************!*\
  !*** ./src/DOM/characters.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   characters: () => (/* binding */ characters)\n/* harmony export */ });\nconst characters = (() => {\r\n    const chars = [\"phantom\", \"tess\", \"hawkeye\", \"aeona\", \"moxuan\"];\r\n    let current = 0;\r\n    const renderChar = (img, i) => {\r\n        img.setAttribute('src', `./assets/${chars[i]}.webp`);\r\n        img.dataset.index = i;\r\n    }\r\n    const renderCharSelect = () => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(\"char-select\");\r\n\r\n        const newLeftArrow = document.createElement('i');\r\n        newLeftArrow.classList.add(\"bx\", \"bx-chevron-left\", \"arrow\");\r\n        newContainer.appendChild(newLeftArrow);\r\n\r\n        const img = document.createElement('img');\r\n        renderChar(img, current)\r\n        newContainer.appendChild(img);\r\n\r\n        const newRightArrow = document.createElement('i');\r\n        newRightArrow.classList.add(\"bx\", \"bx-chevron-right\", \"arrow\");\r\n        newContainer.appendChild(newRightArrow);\r\n        return newContainer;\r\n    }\r\n    const changeChar = (arrow) => {\r\n        if (arrow.classList.contains(\"bx-chevron-right\")) {\r\n            if (current < 4) current++;\r\n            else current = 0;\r\n        } else {\r\n            if (current === 0) current = 4;\r\n            else current--;\r\n        }\r\n        const input = document.querySelector('.name-input');\r\n        input.placeholder = chars[current][0].toUpperCase() + chars[current].slice(1); //Default char name\r\n        renderChar(document.querySelector('.char-select img'), current);\r\n    }\r\n\r\n    const p1Messages = {\r\n        guide: [\"Captain, let's plan our formation.\"],\r\n        start: [\"Captain, all ships are ready for battle. Let's make our first move.\"],\r\n        miss: [\"Our aim needs work, Captain.\"],\r\n        hits: [\"Enemy spotted!\"],\r\n        sinks: [\"Captain! We've sunk the enemy ship!\"],\r\n        win: [\"Mission accomplished! That was a breeze.\"],\r\n        lose: [\"Mission failed.\"],\r\n    }\r\n    const p2Messages = {\r\n        start: [\"I'll show you no mercy.\"],\r\n        miss: [\"You can't hide forever.\"],\r\n        hits: [\"Take that!\"],\r\n        sinks: [\"Rest in peace!\"],\r\n        gotHit: [\"Ugh\"],\r\n        sunk: [\"You'll pay for that!\"],\r\n        win: [\"You're no match for me.\"],\r\n        lose: [\"I'll get you next time.\"],\r\n    }\r\n    const renderImg = (name) => {\r\n        const newImg = document.createElement('img');\r\n        newImg.classList.add(name)\r\n        newImg.setAttribute('src', `./assets/${name}.webp`);\r\n        return newImg;\r\n    }\r\n    const renderMsg = (msg) => {\r\n        const newP = document.createElement('p');\r\n        newP.innerText = msg;\r\n        return newP;\r\n    }\r\n    const renderBubble = (name, msg) => {\r\n        const speechBubble = document.createElement('div');\r\n        speechBubble.classList.add(name, \"speech-bubble\");\r\n        speechBubble.appendChild(renderMsg(msg));\r\n        return speechBubble;\r\n    }\r\n    const renderMsgBox = (type, name) => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(type);\r\n        newContainer.classList.add(\"hidden\");\r\n        if (type === \"p2\") {\r\n            newContainer.appendChild(renderBubble(name, p2Messages[\"start\"]));\r\n            newContainer.appendChild(renderImg(name));\r\n            setTimeout(() => newContainer.classList.remove(\"hidden\"), 1000);\r\n        } else {\r\n            newContainer.appendChild(renderImg(name));\r\n            if (type === \"p1\") newContainer.appendChild(renderBubble(name, p1Messages[\"start\"]));\r\n            else if (type === \"guide\") newContainer.appendChild(renderMsg(p1Messages[\"guide\"]));\r\n            setTimeout(() => newContainer.classList.remove(\"hidden\"), 1);\r\n        }\r\n        return newContainer;\r\n    }\r\n\r\n    const changeMsg = (isAI, player, enemy, type) => {\r\n        const enemyImg = document.querySelector(`img.${enemy}`);\r\n        enemyImg.setAttribute('src', `./assets/${enemy}.webp`); //Idle\r\n        const enemyMsg = document.querySelector(`.${enemy} p`);\r\n        const playerImg = document.querySelector(`img.${player}`);\r\n        playerImg.setAttribute('src', `./assets/${player}-${type}.webp`);\r\n        const playerMsg = document.querySelector(`.${player} p`);\r\n        if (!isAI) { //If p1 was attacker\r\n            playerMsg.innerText = p1Messages[type];\r\n            if (type === \"hits\") {\r\n                enemyMsg.innerText = p2Messages[\"gotHit\"];\r\n                enemyImg.setAttribute('src', `./assets/${enemy}-gotHit.webp`);\r\n            } else if (type === \"sinks\") {\r\n                enemyMsg.innerText = p2Messages[\"sunk\"];\r\n                enemyImg.setAttribute('src', `./assets/${enemy}-sunk.webp`);\r\n            } else if (type === \"lose\") {\r\n                return; //p1 lost\r\n            } else {\r\n                enemyMsg.innerText = \"...\";\r\n            }\r\n        } else { //If p2 was attacker\r\n            playerMsg.innerText = p2Messages[type];\r\n        }\r\n    }\r\n    return { renderCharSelect, changeChar, renderMsgBox, changeMsg }\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/characters.js?");

/***/ }),

/***/ "./src/DOM/lobby.js":
/*!**************************!*\
  !*** ./src/DOM/lobby.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   lobby: () => (/* binding */ lobby)\n/* harmony export */ });\n/* harmony import */ var _shipyard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipyard.js */ \"./src/DOM/shipyard.js\");\n/* harmony import */ var _battlefield_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./battlefield.js */ \"./src/DOM/battlefield.js\");\n/* harmony import */ var _characters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./characters.js */ \"./src/DOM/characters.js\");\n\r\n\r\n\r\n\r\nconst lobby = (() => {\r\n    const content = document.querySelector('.content');\r\n\r\n    const renderTitle = (type) => {\r\n        const newSpan = document.createElement('span');\r\n        newSpan.innerText = \"Battleship\";\r\n        newSpan.classList = type;\r\n        return newSpan;\r\n    }\r\n    const renderForm = () => {\r\n        const newForm = document.createElement('form');\r\n\r\n        const newHeading = document.createElement('h2');\r\n        newHeading.innerText = \"Character Selection\";\r\n        newForm.appendChild(newHeading);\r\n\r\n        newForm.appendChild(_characters_js__WEBPACK_IMPORTED_MODULE_2__.characters.renderCharSelect());\r\n\r\n        const newWrapper = document.createElement('div');\r\n        newWrapper.classList.add(\"name-input-wrapper\")\r\n        const newInput = document.createElement('input');\r\n        newInput.type = 'text';\r\n        newInput.placeholder = \"Phantom\";\r\n        newInput.classList.add(\"name-input\");\r\n        newWrapper.appendChild(newInput);\r\n        const newBorder = document.createElement('span');\r\n        newBorder.classList.add(\"input-border\");\r\n        newWrapper.appendChild(newBorder);\r\n        newForm.appendChild(newWrapper);\r\n\r\n        const newBtn = document.createElement('button');\r\n        newBtn.innerText = \"START\";\r\n        newBtn.classList.add(\"startBtn\");\r\n        newForm.appendChild(newBtn);\r\n        return newForm;\r\n    }\r\n    const renderLobby = () => {\r\n        const newSection = document.createElement('section');\r\n        newSection.classList.add(\"lobby\");\r\n        content.appendChild(newSection);\r\n\r\n        const newTitle = document.createElement('div');\r\n        newTitle.classList = \"title\"\r\n        newTitle.appendChild(renderTitle('bg'));\r\n        newTitle.appendChild(renderTitle('fg'));\r\n        newSection.appendChild(newTitle);\r\n\r\n        newSection.appendChild(renderForm());\r\n        document.querySelectorAll('.arrow').forEach(arrow => {\r\n            arrow.addEventListener('click', () => _characters_js__WEBPACK_IMPORTED_MODULE_2__.characters.changeChar(arrow));\r\n        });\r\n    }\r\n\r\n    const renderLabels = (characters) => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(\"labels\");\r\n        characters.forEach((char) => {\r\n            const newLabel = document.createElement('span');\r\n            newLabel.innerText = char;\r\n            newContainer.appendChild(newLabel);\r\n        })\r\n        return newContainer;\r\n    }\r\n\r\n    const calcColumn = (i) => {\r\n        let column = i;\r\n        while (column > 9) {\r\n            column -= 10;\r\n        }\r\n        return column;\r\n    }\r\n    const renderField = () => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(\"field\");\r\n        for (let i = 0; i < 100; i++) {\r\n            const newSquare = document.createElement('div');\r\n            newSquare.dataset.index = i;\r\n            newSquare.dataset.row = Math.floor(i / 10) + 1;\r\n            newSquare.dataset.column = calcColumn(i) + 1;\r\n            newSquare.setAttribute('style', `grid-area: ${newSquare.getAttribute('data-row')} / ${newSquare.getAttribute('data-column')};`);\r\n            newContainer.appendChild(newSquare);\r\n        }\r\n        return newContainer;\r\n    }\r\n    const renderControls = () => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(\"controls\");\r\n        const btns = ['Reset', 'Random', 'Confirm', 'Vertical'];\r\n        btns.forEach(btn => {\r\n            const newBtn = document.createElement('button');\r\n            newBtn.innerText = btn;\r\n            newBtn.classList.add(btn.toLowerCase());\r\n            newContainer.appendChild(newBtn);\r\n        });\r\n        return newContainer;\r\n    }\r\n    const renderBoard = (heading) => {\r\n        const newBoard = document.createElement('div');\r\n        newBoard.classList.add(\"board\", heading.toLowerCase().slice(0, -7));\r\n        const newHeading = document.createElement('h2');\r\n        newHeading.innerText = heading;\r\n        newBoard.appendChild(newHeading);\r\n        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];\r\n        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\r\n        newBoard.appendChild(renderLabels(letters));\r\n        newBoard.appendChild(renderLabels(numbers));\r\n        newBoard.appendChild(renderField());\r\n        return newBoard;\r\n    }\r\n    const renderSetup = (game) => {\r\n        const newSection = document.createElement('section');\r\n        newSection.classList.add(\"pregame\");\r\n        document.querySelector('.content').replaceChildren(newSection);\r\n        newSection.appendChild(_characters_js__WEBPACK_IMPORTED_MODULE_2__.characters.renderMsgBox(\"guide\", game.p1.name.toLowerCase().replace(/\\s/g, '')));\r\n\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(\"setup\");\r\n        newSection.appendChild(newContainer);\r\n        newContainer.appendChild(renderBoard(\"My Fleet\"));\r\n        newContainer.appendChild(_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.renderWharf(game.p1.fleet));\r\n\r\n        newSection.appendChild(renderControls());\r\n        document.querySelector('.confirm').disabled = true;\r\n        addListeners(game);\r\n    }\r\n\r\n    const resetSetup = (p1) => {\r\n        p1.board.reset();\r\n        const board = document.querySelector('.board');\r\n        board.replaceChild(renderField(), document.querySelector('.field')); //New field\r\n        const setup = document.querySelector('.setup');\r\n        setup.replaceChild(_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.renderWharf(p1.fleet), document.querySelector('.wharf')); //Return wharf images\r\n    }\r\n    const addListeners = (game) => {\r\n        const resetBtn = document.querySelector('.reset');\r\n        resetBtn.addEventListener('click', () => {\r\n            resetSetup(game.p1);\r\n        });\r\n\r\n        const randomizeBtn = document.querySelector('.random');\r\n        const confirmBtn = document.querySelector('.confirm');\r\n        randomizeBtn.addEventListener('click', () => {\r\n            if (!(document.querySelector('.ship-wrapper').firstElementChild)) {//If Random Btn was clicked again, reset first before randomizing again\r\n                resetSetup(game.p1);\r\n            }\r\n            game.p1.fleet.forEach(ship => {\r\n                game.p1.board.autoPlace(ship, false);\r\n            })\r\n            confirmBtn.disabled = false;\r\n        });\r\n        confirmBtn.addEventListener('click', () => {\r\n            game.p2.fleet.forEach(ship => { //Auto place AI ships, but not on DOM\r\n                game.p2.board.autoPlace(ship, true);\r\n            })\r\n            _battlefield_js__WEBPACK_IMPORTED_MODULE_1__.battlefield.renderBattlefield(game);\r\n        });\r\n    }\r\n    return { renderLobby, renderBoard, renderSetup, addListeners }\r\n})();\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/lobby.js?");

/***/ }),

/***/ "./src/DOM/shipyard.js":
/*!*****************************!*\
  !*** ./src/DOM/shipyard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shipyard: () => (/* binding */ shipyard)\n/* harmony export */ });\nconst shipyard = (() => {\r\n    const renderWharf = (fleet) => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add(\"wharf\");\r\n\r\n        const newLabel = document.createElement('h3');\r\n        newLabel.innerText = \"Wharf\";\r\n        newContainer.appendChild(newLabel);\r\n\r\n        fleet.forEach(ship => {\r\n            const newCard = document.createElement('div');\r\n            newCard.classList.add(\"ship-wrapper\");\r\n\r\n            const newImg = document.createElement('img');\r\n            newImg.setAttribute('src', `./assets/${ship.name}.svg`);\r\n            newImg.classList.add(ship.name);\r\n            newCard.appendChild(newImg);\r\n\r\n            const newLabel = document.createElement('span');\r\n            newCard.appendChild(newLabel);\r\n            newLabel.innerText = ship.name[0].toUpperCase() + ship.name.slice(1) + ` (${ship.length})`;\r\n            newContainer.appendChild(newCard);\r\n        });\r\n        return newContainer;\r\n    }\r\n\r\n    const calcColumn = (x) => {\r\n        let column = x;\r\n        while (column > 9) {\r\n            column -= 10;\r\n        }\r\n        return column;\r\n    }\r\n    const setMargin = (ship, img) => {\r\n        if (ship === 'submarine') {\r\n            img.style.margin = '0 0 14px -24px';\r\n        } else if (ship === 'destroyer') {\r\n            img.style.margin = '0 0 10px -15px';\r\n        } else {\r\n            img.style.margin = '0 0 0 -18px';\r\n        }\r\n    }\r\n    const positionImg = (shipImg, ship, field) => {\r\n        field.appendChild(shipImg);\r\n        let columnStart = calcColumn(ship.head) + 1;\r\n        shipImg.removeAttribute('style');\r\n        if (ship.isVertical) {\r\n            shipImg.style.transform = 'rotate(90deg)';\r\n            shipImg.style.transformOrigin = 'top left';\r\n            columnStart += 1;\r\n            setMargin(ship.name, shipImg);\r\n        }\r\n        shipImg.style.gridColumnStart = columnStart;\r\n        shipImg.style.gridColumnEnd = columnStart + ship.length;\r\n        shipImg.style.gridRow = Math.floor(ship.head / 10) + 1;\r\n    }\r\n    const placeShip = (ship) => {\r\n        const shipImg = document.querySelector(`.${ship.name}`);\r\n        const shipLabel = shipImg.nextElementSibling;\r\n        shipLabel.remove();\r\n        positionImg(shipImg, ship, document.querySelector('.field'));\r\n    }\r\n\r\n    const renderShipImg = (ship) => {\r\n        const newImg = document.createElement('img');\r\n        newImg.setAttribute('src', `./assets/${ship.name}.svg`);\r\n        newImg.classList.add(ship.name);\r\n        newImg.style.width = `${ship.length * 2.5}rem`;\r\n        return newImg;\r\n    }\r\n    const renderYard = (type) => {\r\n        const newYard = document.createElement('div');\r\n        newYard.classList.add(type, \"yard\");\r\n\r\n        const newHeading = document.createElement('h3');\r\n        newHeading.innerText = type.toUpperCase();\r\n        newYard.appendChild(newHeading);\r\n\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add('container');\r\n        newYard.appendChild(newContainer);\r\n        return newYard;\r\n    }\r\n    const renderShipyard = (fleet) => {\r\n        const newYard = renderYard('shipyard');\r\n        const container = newYard.lastElementChild;\r\n        fleet.forEach(ship => {\r\n            container.appendChild(renderShipImg(ship));\r\n        })\r\n        return newYard;\r\n    }\r\n\r\n    const renderGraveyard = (fleet) => {\r\n        const newYard = renderYard('graveyard');\r\n        const container = newYard.lastElementChild;\r\n        fleet.forEach(ship => {\r\n            const newSpan = document.createElement('span');\r\n            newSpan.classList.add(ship.name)\r\n            newSpan.innerText = ship.name[0].toUpperCase() + ship.name.slice(1) + ` (${ship.length})`;\r\n            newSpan.style.width = `${(ship.length * 2) + 3}rem`;\r\n            container.appendChild((newSpan));\r\n        })\r\n        return newYard;\r\n    }\r\n\r\n    return { renderWharf, positionImg, placeShip, calcColumn, renderShipImg, renderShipyard, renderGraveyard }\r\n})();\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/shipyard.js?");

/***/ }),

/***/ "./src/DOM/view.js":
/*!*************************!*\
  !*** ./src/DOM/view.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   view: () => (/* binding */ view)\n/* harmony export */ });\n/* harmony import */ var _factories_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/game.js */ \"./src/factories/game.js\");\n/* harmony import */ var _lobby_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lobby.js */ \"./src/DOM/lobby.js\");\n\r\n\r\n\r\nconst view = (() => {\r\n    const loadSetup = () => {\r\n        const game = (0,_factories_game_js__WEBPACK_IMPORTED_MODULE_0__.Game)();\r\n        const p1CharIndex = document.querySelector('.char-select img').dataset.index;\r\n        game.setPlayers(document.querySelector('.name-input').value, Number(p1CharIndex));\r\n        _lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.renderSetup(game);\r\n    }\r\n\r\n    const loadLobby = () => {\r\n        _lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.renderLobby();\r\n        document.querySelector('.startBtn').addEventListener('click', (e) => {\r\n            e.preventDefault();\r\n            loadSetup();\r\n        });\r\n    }\r\n    return { loadLobby };\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/view.js?");

/***/ }),

/***/ "./src/factories/game.js":
/*!*******************************!*\
  !*** ./src/factories/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _factories_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/player.js */ \"./src/factories/player.js\");\n\r\n\r\nconst Game = () => {\r\n    return {\r\n        isOver: false,\r\n        chars: [\"Phantom\", \"Tess\", \"Hawkeye\", \"Aeona\", \"Mo Xuan\"],\r\n        p1: (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(),\r\n        p2: (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(),\r\n\r\n        getRandomEnemy(p1Index) {\r\n            const RNG = Math.floor(Math.random() * 5);\r\n            if (RNG === p1Index) return this.getRandomEnemy(p1Index);\r\n            else return this.chars[RNG];\r\n        },\r\n        setPlayers(nameInput, p1CharIndex) {\r\n            if (!nameInput) this.p1.initialize(this.chars[p1CharIndex], false); //If no custom name, use default char's name\r\n            else this.p1.initialize(nameInput, false);// Else use user-inputted name\r\n            this.p2.initialize(this.getRandomEnemy(p1CharIndex), true);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/game.js?");

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _DOM_shipyard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/shipyard.js */ \"./src/DOM/shipyard.js\");\n\r\nconst Gameboard = () => {\r\n    return {\r\n        locations: [],\r\n        activeShips: 0,\r\n        newField() {\r\n            for (let i = 0; i < 100; i++) {\r\n                this.locations.push({\r\n                    occupied: false,\r\n                    isShot: false\r\n                });\r\n            }\r\n        },\r\n\r\n        addShip(x, ship) {\r\n            this.activeShips++;\r\n            for (let i = 0; i < ship.length; i++) {\r\n                if (ship.isVertical) this.locations[x + (i * 10)].occupied = ship;\r\n                else this.locations[x + i].occupied = ship;\r\n            }\r\n            ship.head = x;\r\n        },\r\n        isPlaceInvalid(RNG, ship) { //Enforce board boundaries\r\n            if (ship.isVertical) {\r\n                return RNG + ((ship.length - 1) * 10) > 99; //Invalid if ship's end is past the last grid row\r\n            } else {\r\n                let column = _DOM_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.calcColumn(RNG);\r\n                return column + ship.length > 10; //Invalid if ship's end is past the rightmost grid column\r\n            }\r\n        },\r\n        isPlaceOccupied(RNG, i, isVertical) {\r\n            if (isVertical) {\r\n                return this.locations[RNG + (i * 10)].occupied;\r\n            } else {\r\n                return this.locations[RNG + i].occupied;\r\n            }\r\n        },\r\n        checkCollision(RNG, ship) { //Check if any part of the new ship will collide with an already placed ship\r\n            for (let i = 0; i < ship.length; i++) {\r\n                if (this.isPlaceOccupied(RNG, i, ship.isVertical)) { //If place is occupied\r\n                    return true;\r\n                }\r\n            }\r\n        },\r\n        getRandomPlace(ship) {\r\n            let RNG = Math.floor(Math.random() * 100);\r\n            let needRecursion = false;\r\n            if (this.isPlaceInvalid(RNG, ship)) { //If place is invalid\r\n                needRecursion = true; //Need to find another place\r\n            } else {\r\n                needRecursion = this.checkCollision(RNG, ship);\r\n            }\r\n            if (needRecursion) return this.getRandomPlace(ship);\r\n            return RNG;\r\n        },\r\n        autoPlace(ship, isAI) {\r\n            ship.setRandomAxis(); //Randomly decide the ship's orientation\r\n            let RNG = this.getRandomPlace(ship); //Randomly find a valid place on the board for the ship\r\n            this.addShip(RNG, ship); //Add to array\r\n            if (!isAI) _DOM_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.placeShip(ship); //DOM placement\r\n        },\r\n\r\n        receiveAttack(x) {\r\n            let ship = this.locations[x].occupied;\r\n            if (this.locations[x].isShot !== false) return \"Already shot\"\r\n            if (ship) { //If this location is occupied by a ship\r\n                this.locations[x].isShot = \"hit\"; //Record hits on gameboard\r\n                ship.hit(); //Track hits on each ship\r\n                if (ship.hasSunk()) { //If attack sinks ship\r\n                    this.activeShips--;\r\n                    return ship.name;\r\n                }\r\n            } else {\r\n                this.locations[x].isShot = \"missed\"; //Record missed shots on gameboard\r\n            }\r\n        },\r\n\r\n        reset() {\r\n            this.activeShips = 0;\r\n            this.locations = [];\r\n            this.newField();\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/factories/gameboard.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/factories/ship.js\");\n\r\n\r\n\r\nconst Player = () => {\r\n    return {\r\n        isAI: null,\r\n        name: '',\r\n        board: (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(),\r\n        fleet: [],\r\n        newFleet() {\r\n            const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];\r\n            const shipLengths = {\r\n                carrier: 5,\r\n                battleship: 4,\r\n                cruiser: 3,\r\n                submarine: 3,\r\n                destroyer: 2\r\n            };\r\n            ships.forEach(ship => {\r\n                const newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_1__.Ship)(shipLengths[ship], ship, false);\r\n                this.fleet.push(newShip);\r\n            });\r\n        },\r\n        initialize(nameInput, isAI) {\r\n            this.isAI = isAI;\r\n            this.name = nameInput;\r\n            this.board.newField();\r\n            this.newFleet();\r\n        },\r\n\r\n        attack(x, enemyBoard) {\r\n            return enemyBoard.receiveAttack(x);\r\n        },\r\n        autoAttack(enemyBoard) {\r\n            let RNG = Math.floor(Math.random() * 100);\r\n            if (enemyBoard.locations[RNG].isShot === false) {\r\n                enemyBoard.receiveAttack(RNG);\r\n            } else {\r\n                return this.autoAttack(enemyBoard); //Get different RNG\r\n            }\r\n            return RNG;\r\n        },\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/player.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nconst Ship = (l, name, isVertical) => {\r\n    return {\r\n        name: name,\r\n        isVertical: isVertical,\r\n        length: l,\r\n        head: null,\r\n        hits: 0,\r\n        hit() {\r\n            this.hits++;\r\n        },\r\n        hasSunk() {\r\n            return this.hits === this.length;\r\n        },\r\n        setRandomAxis() {\r\n            return this.isVertical = Math.random() < 0.5;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM/view.js */ \"./src/DOM/view.js\");\n\r\n\r\n_DOM_view_js__WEBPACK_IMPORTED_MODULE_0__.view.loadLobby();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;