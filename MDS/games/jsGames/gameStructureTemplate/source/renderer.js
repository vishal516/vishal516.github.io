function renderGame() {

}

function renderUI() {
    gameobjects.background.x > -gameobjects.background.width ? gameobjects.background.x -= gameobjects.paralax.speed : gameobjects.background.x += gameobjects.background.width;

    context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.background, gameobjects.background.x + gameobjects.background.width, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    var drops = GUI.decoration.bubbles;
    for (var i = 0; i < drops.length; i++) {
        context.drawImage(drops[i].image, drops[i].x, drops[i].y, drops[i].width, drops[i].height);
    }

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
        spritefont(spritefont1, 'SCORE:' + gameobjects.player.score + '  HEALTH:' + gameobjects.player.health, 40, 0.6, 800, 100, true);
        //rendergame();
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        spritefont(spritefont1, 'GAME OVER', 200, 0.6, 800, 100, true);
        spritefont(spritefont1, 'HIGH SCORE:' + gameobjects.player.highscore, 40, 0.6, 800, 450, true);
        spritefont(spritefont1, 'YOUR SCORE:' + gameobjects.player.lastscore, 40, 0.6, 800, 550, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.6, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spritefont(spritefont1, 'HOW TO PLAY', 40, 0.6, 800, 50, true);
        spritefont(spritefont1, 'PRESS DOWN BUTTON TO SWITCH BETWEEN', 40, 0.6, 800, 300, true);
        spritefont(spritefont1, 'HORIZONTAL OR VERTICAL MOVEMENT', 40, 0.6, 800, 350, true);
        spritefont(spritefont1, 'PRESS LEFT BUTTON OR RIGHT BUTTON TO', 40, 0.6, 800, 450, true);
        spritefont(spritefont1, 'MOVE IN THE SELECTED DIRECTION', 40, 0.6, 800, 500, true);
        spritefont(spritefont1, 'PRESS UP BUTTON TO PICK A CARD TO MATCH', 40, 0.6, 800, 600, true);
        spritefont(spritefont1, 'WHILE PLAYING PRESS OK BUTTON TO PAUSE', 40, 0.6, 800, 700, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.6, 800, 800, true);
    }
    //spritefont'state:' + gameobjects.gamestate, fontMedium, 400, 50, true);
}