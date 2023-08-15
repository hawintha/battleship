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

/***/ "./src/DOM/lobby.js":
/*!**************************!*\
  !*** ./src/DOM/lobby.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   lobby: () => (/* binding */ lobby)\n/* harmony export */ });\n/* harmony import */ var _shipyard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipyard.js */ \"./src/DOM/shipyard.js\");\n\r\n\r\nconst lobby = (() => {\r\n    const content = document.querySelector('.content');\r\n\r\n    const renderLobby = () => {\r\n        const newSection = document.createElement('section');\r\n        newSection.classList.add('lobby');\r\n        content.appendChild(newSection);\r\n\r\n        const newTitle = document.createElement('h1');\r\n        newTitle.innerText = \"Battleship\";\r\n        newSection.appendChild(newTitle);\r\n\r\n        const newInput = document.createElement('input');\r\n        newInput.type = 'text';\r\n        newInput.placeholder = \"Captain's Name\";\r\n        newInput.classList.add('name-input');\r\n        newSection.appendChild(newInput);\r\n\r\n        const newBtn = document.createElement('button');\r\n        newBtn.innerText = \"Start\";\r\n        newBtn.classList.add('startBtn');\r\n        newSection.appendChild(newBtn);\r\n    }\r\n\r\n    const renderLabels = (characters) => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add('labels');\r\n        characters.forEach((char) => {\r\n            const newLabel = document.createElement('span');\r\n            newLabel.innerText = char;\r\n            newContainer.appendChild(newLabel);\r\n        })\r\n        return newContainer;\r\n    }\r\n\r\n    const calcColumn = (i) => {\r\n        let column = i;\r\n        while (column > 9) {\r\n            column -= 10;\r\n        }\r\n        return column;\r\n    }\r\n    const renderField = () => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add('field');\r\n        for (let i = 0; i < 100; i++) {\r\n            const newSquare = document.createElement('div');\r\n            newSquare.dataset.index = i;\r\n            newSquare.dataset.row = Math.floor(i / 10) + 1;\r\n            newSquare.dataset.column = calcColumn(i) + 1;\r\n            newSquare.setAttribute('style', `grid-area: ${newSquare.getAttribute('data-row')} / ${newSquare.getAttribute('data-column')};`);\r\n            newContainer.appendChild(newSquare);\r\n        }\r\n        return newContainer;\r\n    }\r\n    const renderControls = () => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add('controls');\r\n        const btns = ['Reset', 'Randomize', 'Confirm', 'Horizontal', 'Vertical'];\r\n        btns.forEach(btn => {\r\n            const newBtn = document.createElement('button');\r\n            newBtn.innerText = btn;\r\n            newBtn.classList.add(btn.toLowerCase());\r\n            newContainer.appendChild(newBtn);\r\n        });\r\n        return newContainer;\r\n    }\r\n    const renderBoard = () => {\r\n        const newBoard = document.createElement('div');\r\n        newBoard.classList.add('board');\r\n        const newHeading = document.createElement('h2');\r\n        newHeading.innerText = \"My Fleet\";\r\n        newBoard.appendChild(newHeading);\r\n\r\n        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];\r\n        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\r\n        newBoard.appendChild(renderLabels(letters));\r\n        newBoard.appendChild(renderLabels(numbers));\r\n        newBoard.appendChild(renderField());\r\n        newBoard.appendChild(renderControls());\r\n        return newBoard;\r\n    }\r\n    const renderSetup = () => {\r\n        const newSection = document.createElement('section');\r\n        newSection.classList.add('setup');\r\n        content.appendChild(newSection);\r\n        newSection.appendChild(renderBoard());\r\n        newSection.appendChild(_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.renderShips());\r\n    }\r\n\r\n    const addListeners = (player) => {\r\n        const randomizeBtn = document.querySelector('.randomize');\r\n        randomizeBtn.addEventListener('click', () => {\r\n            player.fleet.forEach(ship => {\r\n                player.board.autoPlace(ship);\r\n            })\r\n        });\r\n    }\r\n    return { renderLobby, renderSetup, addListeners }\r\n})();\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/lobby.js?");

/***/ }),

/***/ "./src/DOM/shipyard.js":
/*!*****************************!*\
  !*** ./src/DOM/shipyard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shipyard: () => (/* binding */ shipyard)\n/* harmony export */ });\nconst shipyard = (() => {\r\n    const ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];\r\n\r\n    const renderShips = () => {\r\n        const newContainer = document.createElement('div');\r\n        newContainer.classList.add('shipyard');\r\n\r\n        const newLabel = document.createElement('span');\r\n        newLabel.innerText = \"SHIPYARD\";\r\n        newContainer.appendChild(newLabel);\r\n\r\n        ships.forEach(ship => {\r\n            const newCard = document.createElement('div');\r\n            newCard.classList.add('ship-wrapper');\r\n\r\n            const newImg = document.createElement('img');\r\n            newImg.setAttribute('src', `../src/assets/${ship.toLowerCase()}.svg`);\r\n            newImg.classList.add(ship.toLowerCase());\r\n            newCard.appendChild(newImg);\r\n\r\n            const newLabel = document.createElement('span');\r\n            newCard.appendChild(newLabel);\r\n            newLabel.innerText = ship;\r\n            newContainer.appendChild(newCard);\r\n        });\r\n        return newContainer;\r\n    }\r\n\r\n    const calcColumn = (x) => {\r\n        let column = x;\r\n        while (column > 9) {\r\n            column -= 10;\r\n        }\r\n        return column;\r\n    }\r\n    const setMargin = (ship, img) => {\r\n        if (ship === 'submarine') {\r\n            img.style.margin = '0 0 14px -24px';\r\n        } else if (ship === 'destroyer') {\r\n            img.style.margin = '0 0 10px -15px';\r\n        } else {\r\n            img.style.margin = '0 0 0 -18px';\r\n        }\r\n    }\r\n    const placeShip = (x, isVertical, ship) => {\r\n        const field = document.querySelector('.field');\r\n        const shipImg = document.querySelector(`.${ship.name}`);\r\n        const shipLabel = shipImg.nextElementSibling;\r\n        shipLabel.remove();\r\n        field.insertBefore(shipImg, field.children.item(x));\r\n        let columnStart = calcColumn(x) + 1;\r\n        if (isVertical) {\r\n            shipImg.style.transform = 'rotate(90deg)';\r\n            shipImg.style.transformOrigin = 'top left';\r\n            columnStart += 1;\r\n            setMargin(ship.name, shipImg);\r\n        }\r\n        shipImg.style.gridColumnStart = columnStart;\r\n        shipImg.style.gridColumnEnd = columnStart + ship.length;\r\n        shipImg.style.gridRow = Math.floor(x / 10) + 1;\r\n    }\r\n    return { renderShips, placeShip, calcColumn }\r\n})();\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/shipyard.js?");

/***/ }),

/***/ "./src/DOM/view.js":
/*!*************************!*\
  !*** ./src/DOM/view.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   view: () => (/* binding */ view)\n/* harmony export */ });\n/* harmony import */ var _factories_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/game.js */ \"./src/factories/game.js\");\n/* harmony import */ var _lobby_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lobby.js */ \"./src/DOM/lobby.js\");\n\r\n\r\n\r\nconst view = (() => {\r\n    const loadSetup = () => {\r\n        const game = (0,_factories_game_js__WEBPACK_IMPORTED_MODULE_0__.Game)();\r\n        game.setPlayers(document.querySelector('.name-input').value);\r\n        document.querySelector('.content').replaceChildren();\r\n        _lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.renderSetup();\r\n        _lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.addListeners(game.p1);\r\n    }\r\n\r\n    const loadLobby = () => {\r\n        _lobby_js__WEBPACK_IMPORTED_MODULE_1__.lobby.renderLobby();\r\n        document.querySelector('.startBtn').addEventListener('click', loadSetup);\r\n    }\r\n    return { loadLobby };\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/DOM/view.js?");

/***/ }),

/***/ "./src/factories/game.js":
/*!*******************************!*\
  !*** ./src/factories/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _factories_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/player.js */ \"./src/factories/player.js\");\n\r\n\r\nconst Game = () => {\r\n    return {\r\n        p1: (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(),\r\n        p2: (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(),\r\n        setPlayers(p1Name) {\r\n            this.p1.initialize(p1Name);\r\n            this.p2.initialize(\"AI\");\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/game.js?");

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _DOM_shipyard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/shipyard.js */ \"./src/DOM/shipyard.js\");\n\r\nconst Gameboard = () => {\r\n    return {\r\n        locations: [],\r\n        activeShips: 0,\r\n        newField() {\r\n            for (let i = 0; i < 100; i++) {\r\n                this.locations.push({\r\n                    occupied: false,\r\n                    isShot: false\r\n                });\r\n            }\r\n        },\r\n\r\n        addShip(x, isVertical, ship) {\r\n            this.activeShips++;\r\n            for (let i = 0; i < ship.length; i++) {\r\n                if (isVertical) this.locations[x + (i * 10)].occupied = ship;\r\n                else this.locations[x + i].occupied = ship;\r\n            }\r\n        },\r\n        isPlaceInvalid(RNG, length, isVertical) { //Enforce board boundaries\r\n            if (isVertical) {\r\n                return RNG + ((length - 1) * 10) > 99; //Invalid if ship's end is past the last grid row\r\n            } else {\r\n                let column = _DOM_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.calcColumn(RNG);\r\n                return column + length > 10; //Invalid if ship's end is past the rightmost grid column\r\n            }\r\n        },\r\n        isPlaceOccupied(RNG, i, isVertical) {\r\n            if (isVertical) {\r\n                return this.locations[RNG + (i * 10)].occupied;\r\n            } else {\r\n                return this.locations[RNG + i].occupied;\r\n            }\r\n        },\r\n        checkCollision(length, RNG, isVertical) {\r\n            for (let i = 0; i < length; i++) {\r\n                if (this.isPlaceOccupied(RNG, i, isVertical)) { //If place is occupied\r\n                    return true;\r\n                }\r\n            }\r\n        },\r\n        getRandomPlace(ship, isVertical) {\r\n            let RNG = Math.floor(Math.random() * 100);\r\n            let needRecursion = false;\r\n            if (this.isPlaceInvalid(RNG, ship.length, isVertical)) { //If place is invalid\r\n                needRecursion = true; //Need to find another place\r\n            } else {\r\n                needRecursion = this.checkCollision(ship.length, RNG, isVertical);\r\n            }\r\n            if (needRecursion) return this.getRandomPlace(ship, isVertical);\r\n            return RNG;\r\n        },\r\n        autoPlace(ship) {\r\n            let isVertical = Math.random() < 0.5; //Randomly decide the ship's orientation\r\n            let RNG = this.getRandomPlace(ship, isVertical); //Randomly find a valid place on the board for the ship\r\n            this.addShip(RNG, isVertical, ship); //Add to array\r\n            _DOM_shipyard_js__WEBPACK_IMPORTED_MODULE_0__.shipyard.placeShip(RNG, isVertical, ship); //DOM placement\r\n        },\r\n\r\n        receiveAttack(x) {\r\n            let ship = this.locations[x].occupied;\r\n            if (ship) { //If this location is occupied by a ship\r\n                this.locations[x].isShot = 'hit'; //Track shots on gameboard\r\n                ship.hit(); //Track hits on ship\r\n                if (ship.hasSunk()) { //If attack sinks ship\r\n                    this.activeShips--;\r\n                    if (this.activeShips === 0) return 'All ships have sunk'; //Report whether all ships sunk\r\n                }\r\n            } else {\r\n                this.locations[x].isShot = 'missed';\r\n            }\r\n            return `${this.activeShips} remaining`\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/factories/gameboard.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/factories/ship.js\");\n\r\n\r\n\r\nconst Player = () => {\r\n    return {\r\n        name: '',\r\n        board: (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(),\r\n        fleet: [],\r\n        newFleet() {\r\n            const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];\r\n            const shipLengths = {\r\n                carrier: 5,\r\n                battleship: 4,\r\n                cruiser: 3,\r\n                submarine: 3,\r\n                destroyer: 2\r\n            };\r\n            ships.forEach(ship => {\r\n                const newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_1__.Ship)(shipLengths[ship], ship);\r\n                this.fleet.push(newShip);\r\n            });\r\n        },\r\n        initialize(nameInput) {\r\n            if (nameInput) this.name = nameInput;\r\n            this.board.newField();\r\n            this.newFleet();\r\n        },\r\n\r\n        attack(x, enemyBoard) {\r\n            enemyBoard.receiveAttack(x);\r\n        },\r\n        autoAttack(enemyBoard) {\r\n            let RNG = Math.floor(Math.random() * 100);\r\n            if (enemyBoard.locations[RNG].isShot === false) {\r\n                enemyBoard.receiveAttack(RNG);\r\n            } else {\r\n                this.autoAttack(enemyBoard);\r\n            }\r\n        },\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/player.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nconst Ship = (l, name) => {\r\n    return {\r\n        length: l,\r\n        name: name,\r\n        hits: 0,\r\n        hit() {\r\n            this.hits++;\r\n        },\r\n        hasSunk() {\r\n            return this.hits === this.length;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/factories/ship.js?");

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