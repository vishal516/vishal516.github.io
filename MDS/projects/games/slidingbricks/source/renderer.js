function renderGame() {

    for (let r = 0; r < gameobjects.containers.row.length; r++) {
        let row = gameobjects.containers.row[r];
        for (let i = 0; i < 5; i++) {
            context.drawImage(img.box, 100 * row.type[i], 0, 100, 100, 106 + gameobjects.bricks.size.x * i, row.y, gameobjects.bricks.size.x, gameobjects.bricks.tweensize.y);
            //spritefont(spritefont1, row.type[i] + ':' + '' + i, 60,spacing, 106 + gameobjects.bricks.size.x * row.type[i], row.y, false);
        }
    }
    context.drawImage(img.box, 100 * gameobjects.player.color, 0, 100, 100, 106 + gameobjects.bricks.size.x * gameobjects.player.pos, gameobjects.bricks.player.y - gameobjects.bricks.size.y, gameobjects.bricks.size.x, gameobjects.bricks.tweensize.y);
    //spritefont(spritefont1, 'f' + gameobjects.player.pos, 40,spacing, gameobjects.bricks.size.x * gameobjects.player.pos + gameobjects.bricks.size.x, gameobjects.bricks.player.y - gameobjects.bricks.size.y, true);

    if (gameobjects.player.score < 1) {
        spritefont(spritefont1, 'Match identical bricks by moving', 40, spacing, 800, 400, true);
        spritefont(spritefont1, 'left and right to clear lines', 40, spacing, 800, 450, true);
    }
}

let spacing = 0.5;

function renderUI() {

    context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);

    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spritefont(spritefont1, 'LOADING IS COMPLETE', 40, spacing, 780, 400, true);
        spritefont(spritefont1, 'PRESS OK BUTTON', 60, spacing, 780, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        context.drawImage(img.gamelogo, (GUI.canvas.width - GUI.gamelogo.width) / 2, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }

    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        spritefont(spritefont1, 'PAUSED', 40, spacing, 800, 60, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
        spritefont(spritefont1, 'SCORE:' + gameobjects.player.score, 40, spacing, 800, 100, true);
        //rendergame();
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        spritefont(spritefont1, 'GAME OVER', 200, spacing, 800, 100, true);
        spritefont(spritefont1, 'HIGH SCORE:' + gameobjects.player.highscore, 40, spacing, 800, 450, true);
        spritefont(spritefont1, 'YOUR SCORE:' + gameobjects.player.lastscore, 40, spacing, 800, 550, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, spacing, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spritefont(spritefont1, 'HOW TO PLAY', 70, spacing, 800, 100, true);
        spritefont(spritefont1, 'PRESS LEFT BUTTON TO MOVE LEFT', 40, spacing, 800, 200, true);
        spritefont(spritefont1, 'PRESS RIGHT BUTTON TO MOVE RIGHT', 40, spacing, 800, 250, true);
        spritefont(spritefont1, 'Match identical bricks by moving', 40, spacing, 800, 400, true);
        spritefont(spritefont1, 'left and right to clear lines', 40, spacing, 800, 450, true);
        spritefont(spritefont1, 'WHILE PLAYING PRESS OK BUTTON TO PAUSE', 40, spacing, 800, 600, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, spacing, 800, 800, true);
    }
    //spritefont'state:' + gameobjects.gamestate, fontMedium, 400, 50, true);
}