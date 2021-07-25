function rotatedimage(img, tpx, tpy, tx, ty, x, y, width, height, angle) {
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(angle * Math.PI / 180);
    context.translate(-(x + width / 2), -(y + height / 2));
    context.drawImage(img, tpx, tpy, tx, ty, x, y, width, height);
    context.restore();
}

function renderGame() {
    gameobjects.slowupdate -= 1
    if (gameobjects.slowupdate < 1) {
        gameobjects.slowupdate = 5;
        gameobjects.selector.c -= 1;
        if (gameobjects.selector.c < -8 || gameobjects.selector.c > 8)
            gameobjects.selector.c = 9;
    }

    let c = Math.abs(gameobjects.selector.c).toString();
    rect(400 - 10, 100 - 10, 820, 820, '#000000');
    let imax = gameobjects.puzzle.size;
    let jmax = gameobjects.puzzle.size;
    let size = gameobjects.puzzle.dimention / gameobjects.puzzle.size;
    let tilex = 1024;
    let tiley = 1536;
    for (let i = 0; i < imax; i++) {
        for (let j = 0; j < jmax; j++) {
            rotatedimage(img['puzzle' + gameobjects.puzzle.img], (tilex / imax) * i, (tiley / jmax) * j, tilex / imax, tiley / jmax, 400 + size * i, 100 + size * j, size, size, gameobjects.puzzle.cells[i * imax + j]);
            if (i == gameobjects.selector.tile.i && j == gameobjects.selector.tile.j) {
                rect(400 + size * i, 100 + size * j, size, size, '#' + c + c + c + c + c + c + '99');
            }
        }
    }

}

function renderUI() {

    context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);

    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spritefont(spritefont1, 'LOADING IS COMPLETE', 40, 0.6, 780, 400, true);
        spritefont(spritefont1, 'PRESS OK BUTTON', 60, 0.6, 780, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        context.drawImage(img.gamelogo, (GUI.canvas.width - GUI.gamelogo.width) / 2, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }

    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        spritefont(spritefont1, 'PAUSED', 40, 0.6, 800, 60, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
        spritefont(spritefont1, 'LEVEL:' + gameobjects.player.level, 40, 0.6, 200, 400, true);
        spritefont(spritefont1, 'SCORE:' + gameobjects.player.score, 40, 0.6, 200, 500, true);
        spritefont(spritefont1, 'TIMER', 40, 0.6, 1400, 400, true);
        spritefont(spritefont1, gameobjects.puzzle.timer.toString().toHHMMSS(), 40, 0.6, 1400, 500, true);

    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        spritefont(spritefont1, 'GAME OVER', 200, 0.6, 800, 100, true);
        spritefont(spritefont1, 'HIGH SCORE:' + gameobjects.player.highscore, 40, 0.6, 800, 450, true);
        spritefont(spritefont1, 'YOUR SCORE:' + gameobjects.player.lastscore, 40, 0.6, 800, 550, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.6, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spritefont(spritefont1, 'HOW TO PLAY', 40, 0.6, 800, 50, true);
        spritefont(spritefont1, 'PRESS ARROW BUTTONS TO MOVE SELECTOR', 40, 0.6, 800, 300, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO ROTATE THE SELECTED BLOCK', 40, 0.6, 800, 350, true);
        spritefont(spritefont1, 'HOLD OK BUTTON TO PAUSE', 40, 0.6, 800, 450, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.6, 800, 800, true);
    }
}

function rect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}