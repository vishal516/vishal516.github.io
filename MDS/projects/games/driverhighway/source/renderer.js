"use strict";

function containerrender(container) {
    for (let i = 0; i < container.length; i++) {
        let item = container[i];
        context.drawImage(item.img, item.x, item.y, item.width, item.height);
    }
}

function smokerender() {
    let container = gameobjects.containers.smokecontainer;
    for (let i = 0; i < container.length; i++) {
        let item = container[i];
        drawcircle(item.x, item.y, item.radius, 'rgba(100,100,100,' + item.alpha + ')');
    }
}

function containerrenderimage(container, img) {
    for (let i = 0; i < container.length; i++) {
        let item = container[i];
        context.drawImage(img, item.x, item.y - 1100, item.width, item.height + 2000);
    }
}

function containerrenderdebug(container, img) {
    for (let i = 0; i < container.length; i++) {
        let item = container[i];
        context.drawImage(img, item.x, item.y, item.width, item.height); // item.width * 2 / 3, item.height / 2);
    }
}

function drawcircle(x, y, r, c) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = c;
    context.fill();
    context.strokeStyle = c;
    context.stroke();
}

function renderGame() {
    containerrender(gameobjects.containers.carscontainer);
    smokerender();
    context.drawImage(img.cara, gameobjects.player.x, gameobjects.player.y, gameobjects.player.width, gameobjects.player.height);
    //containerrender([gameobjects.placeholder]);
}

function renderUI() {
    context.drawImage(img.background, 1, 0, 1, 1, 0, 0, gameobjects.background.width, gameobjects.background.height);
    containerrenderimage(gameobjects.bgStack, img.background);

    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spriteWrite3('LOADING IS COMPLETE', 60, 0.5, GUI.canvas.width / 2, 400, true);
        spriteWrite3('PRESS OK BUTTON', 80, 0.5, GUI.canvas.width / 2, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        context.drawImage(img.gamelogo, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        context.drawImage(img.blur, 0, 0, GUI.canvas.width, GUI.canvas.height);
        spriteWrite3('PAUSE', 200, 0.5, GUI.canvas.width / 2, 50, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }

    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();

        // containerrenderdebug([gameobjects.player.corners.start, gameobjects.player.corners.end], img.pixel);
        // gameobjects.containers.carscontainer.forEach(car => {
        //     containerrenderdebug([car.corners.start, car.corners.end], img.pixel);
        // });
        //spriteWrite3('debug:' + gameobjects.containers.smokecontainer.length, 60, 0.5, 200, 50, true);

        spriteWrite3('SCORE:' + gameobjects.player.score, 60, 0.5, GUI.canvas.width / 2, 50, true);
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.blur, 0, 0, GUI.canvas.width, GUI.canvas.height);
        context.drawImage(img.cardamaged, gameobjects.player.x, gameobjects.player.y, gameobjects.player.width, gameobjects.player.height);
        spriteWrite3('GAME OVER', 200, 0.5, GUI.canvas.width / 2, 50, true);
        spriteWrite3('HIGH SCORE:' + gameobjects.player.highscore, 100, 0.5, GUI.canvas.width / 2, 450, true);
        spriteWrite3('YOUR SCORE:' + gameobjects.player.lastscore, 100, 0.5, GUI.canvas.width / 2, 550, true);
        spriteWrite3('PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.5, GUI.canvas.width / 2, 850, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        context.drawImage(img.blur, 0, 0, GUI.canvas.width, GUI.canvas.height);
        spriteWrite3('CONTROLS', 60 + 30, 0.5, GUI.canvas.width / 2, 50, true);
        spriteWrite3('PRESS UP BUTTON TO SLIDE UP THE CAR', 60, 0.5, GUI.canvas.width / 2, 150, true);
        spriteWrite3('PRESS DOWN BUTTON TO SLIDE DOWN THE CAR', 60, 0.5, GUI.canvas.width / 2, 200, true);
        spriteWrite3('PRESS OK BUTTON TO PAUSE/RESUME THE GAME', 60, 0.5, GUI.canvas.width / 2, 250, true);
        spriteWrite3('HOW TO PLAY', 100, 0.5, GUI.canvas.width / 2, 350, true);
        spriteWrite3('DRIVE THROUGH THE TRAFFIC AND AVOID', 60, 0.5, GUI.canvas.width / 2, 450, true);
        spriteWrite3('HITTING OTHER CARS', 60, 0.5, GUI.canvas.width / 2, 500, true);
        spriteWrite3('PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60 + 10, 0.5, GUI.canvas.width / 2, 850, true);
    }

}