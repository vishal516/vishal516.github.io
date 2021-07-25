function renderGame() {
    for (let r = 0; r < gameobjects.containers.row.length; r++) {
        let row = gameobjects.containers.row[r];
        for (let i = 0; i < 4; i++) {
            //context.drawImage(img.box, 100 * row.type[i], 0, 100, 100, 106 + gameobjects.bricks.size.x * i, row.y, gameobjects.bricks.size.x, gameobjects.bricks.tweensize.y);
            drawrect(115 + gameobjects.bricks.size.x * i, row.y, gameobjects.bricks.size.x - 20, gameobjects.bricks.tweensize.y, gameobjects.bricks.colors[row.type[i]])
                //if (r == 0)context.drawImage(img.pixel, 106 + gameobjects.bricks.size.x * i, row.y, gameobjects.bricks.size.x, gameobjects.bricks.tweensize.y);
        }
    }
    drawrect(-25, -20, 120, GUI.canvas.height + 40);
    drawrect(GUI.canvas.width - 85, -20, 120, GUI.canvas.height + 40);
    //context.drawImage(img.box, 100 * gameobjects.player.color, 0, 100, 100, 106 + gameobjects.bricks.size.x * gameobjects.player.pos, gameobjects.bricks.player.y - gameobjects.bricks.size.y, gameobjects.bricks.size.x, gameobjects.bricks.tweensize.y);
    //context.drawImage(img.box, 100 * gameobjects.player.color, 0, 100, 100, 106 + gameobjects.bricks.size.x * gameobjects.player.shadowpos + (gameobjects.bricks.size.x - 100) / 2, gameobjects.bricks.player.y - gameobjects.bricks.size.y, 100, gameobjects.bricks.tweensize.y);
    drawcircle(106 + gameobjects.bricks.size.x * gameobjects.player.shadowpos + gameobjects.bricks.size.x / 2, gameobjects.bricks.player.y - 50, 50, gameobjects.bricks.colors[gameobjects.player.color]);
}


function renderUI() {

    context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);

    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        text('LOADING IS COMPLETE', 800, 450, 50, 600, 2);
        text('PRESS OK BUTTON', 800, 550, 80, 600, random(0, 3));
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        text('COLOR UP', 800, 200, 200, 600, random(0, 3));
        //context.drawImage(img.gamelogo, (GUI.canvas.width - GUI.gamelogo.width) / 2, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (let i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }

    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        text('PAUSED', 800, 200, 120, 600, 2);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (let i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
        text('SCORE:' + gameobjects.player.score, 800, 150, 60, 600, 2);
        if (!gameobjects.defaults.start)
            text('PRESS UP BUTTON TO START', 800, 450, 60, 600, random(0, 3));
        if (gameobjects.player.score < 20 && gameobjects.player.score > 15)
            text('SPEED UP IN ' + (20 - gameobjects.player.score), 800, 450, 60, 600, random(0, 3));

    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        text('GAME OVER', 800, 200, 120, 600, 2);
        text('YOUR SCORE:' + gameobjects.player.lastscore, 800, 400, 70, 600, 3);
        text('HIGH SCORE:' + gameobjects.player.highscore, 800, 550, 100, 600, 1);
        text('PRESS OK BUTTON TO GO BACK TO MAIN MENU', 800, 800, 60, 600, random(0, 3));
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        text('HOW TO PLAY', 800, 150, 120, 600, 2);
        text('PRESS LEFT BUTTON TO MOVE LEFT', 800, 300, 60, 600, 3);
        text('PRESS RIGHT BUTTON TO MOVE RIGHT', 800, 400, 60, 600, 3);
        text('DONT LET THE BALL DROP ON A WRONG', 800, 500, 60, 600, 3);
        text('COLOR BLOCK', 800, 550, 60, 600, 3);
        text('WHILE PLAYING PRESS OK BUTTON TO PAUSE', 800, 650, 60, 600, 3);
        text('PRESS OK BUTTON TO GO BACK TO MAIN MENU', 800, 800, 60, 600, random(0, 3));

    }
    //spritefont'state:' + gameobjects.gamestate, fontMedium, 400, 50, true);
}