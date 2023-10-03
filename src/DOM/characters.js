const characters = (() => {
    const chars = ["phantom", "tess", "hawkeye", "aeona", "moxuan"];
    let current = 0;
    const renderChar = (img, i) => {
        img.setAttribute('src', `./assets/${chars[i]}.webp`);
        img.dataset.index = i;
    }
    const renderCharSelect = () => {
        const newContainer = document.createElement('div');
        newContainer.classList.add("char-select");

        const newLeftArrow = document.createElement('i');
        newLeftArrow.classList.add("bx", "bx-chevron-left", "arrow");
        newContainer.appendChild(newLeftArrow);

        const img = document.createElement('img');
        renderChar(img, current)
        newContainer.appendChild(img);

        const newRightArrow = document.createElement('i');
        newRightArrow.classList.add("bx", "bx-chevron-right", "arrow");
        newContainer.appendChild(newRightArrow);
        return newContainer;
    }
    const changeChar = (arrow) => {
        if (arrow.classList.contains("bx-chevron-right")) {
            if (current < 4) current++;
            else current = 0;
        } else {
            if (current === 0) current = 4;
            else current--;
        }
        const input = document.querySelector('.name-input');
        input.placeholder = chars[current][0].toUpperCase() + chars[current].slice(1); //Default char name placeholder
        input.value = chars[current][0].toUpperCase() + chars[current].slice(1); //Default char name value
        renderChar(document.querySelector('.char-select img'), current);
    }

    const p1Messages = {
        guide: ["Captain, let's plan our formation."],
        start: ["Captain, all ships are ready for battle. Let's make our first move."],
        miss: ["Our aim needs work, Captain."],
        hit: ["Enemy spotted!"],
        sinks: ["Captain! We've sunk the enemy ship!"],
        win: ["Mission accomplished! That was a breeze."],
        lose: ["Mission failed."],
    }
    const p2Messages = {
        start: ["I'll show you no mercy."],
        miss: ["You can't hide forever."],
        hit: ["Take that!"],
        sinks: ["Rest in peace!"],
        gotHit: ["Ugh"],
        sunk: ["You'll pay for that!"],
        win: ["You're no match for me."],
        lose: ["I'll get you next time."],
    }
    const renderImg = (name) => {
        const newImg = document.createElement('img');
        newImg.classList.add(name)
        newImg.setAttribute('src', `./assets/${name}.webp`);
        return newImg;
    }
    const renderMsg = (msg) => {
        const newP = document.createElement('p');
        newP.innerText = msg;
        return newP;
    }
    const renderBubble = (name, msg) => {
        const speechBubble = document.createElement('div');
        speechBubble.classList.add(name, "speech-bubble");
        speechBubble.appendChild(renderMsg(msg));
        return speechBubble;
    }
    const renderMsgBox = (type, name) => {
        const newContainer = document.createElement('div');
        newContainer.classList.add(type);
        newContainer.classList.add("hidden");
        if (type === "p2") {
            newContainer.appendChild(renderBubble(name, p2Messages["start"]));
            newContainer.appendChild(renderImg(name));
            setTimeout(() => newContainer.classList.remove("hidden"), 1000);
        } else {
            newContainer.appendChild(renderImg(name));
            if (type === "p1") newContainer.appendChild(renderBubble(name, p1Messages["start"]));
            else if (type === "guide") newContainer.appendChild(renderMsg(p1Messages["guide"]));
            setTimeout(() => newContainer.classList.remove("hidden"), 1);
        }
        return newContainer;
    }

    const changeMsg = (isAI, player, enemy, type) => {
        const enemyImg = document.querySelector(`img.${enemy}`);
        enemyImg.setAttribute('src', `./assets/${enemy}.webp`); //Idle
        const enemyMsg = document.querySelector(`.${enemy} p`);
        const playerImg = document.querySelector(`img.${player}`);
        playerImg.setAttribute('src', `./assets/${player}-${type}.webp`);
        const playerMsg = document.querySelector(`.${player} p`);
        if (!isAI) { //If p1 was attacker
            playerMsg.innerText = p1Messages[type];
            if (type === "hits") {
                enemyMsg.innerText = p2Messages["gotHit"];
                enemyImg.setAttribute('src', `./assets/${enemy}-gotHit.webp`);
            } else if (type === "sinks") {
                enemyMsg.innerText = p2Messages["sunk"];
                enemyImg.setAttribute('src', `./assets/${enemy}-sunk.webp`);
            } else if (type === "lose") {
                return; //p1 lost
            } else {
                enemyMsg.innerText = "...";
            }
        } else { //If p2 was attacker
            playerMsg.innerText = p2Messages[type];
        }
    }
    return { renderCharSelect, changeChar, renderMsgBox, changeMsg }
})();

export { characters };