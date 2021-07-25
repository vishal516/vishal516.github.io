"use strict";

function renderplayer() {
    if (gameobjects.player.attack > 0) renderanim(gameobjects.player.transform, gameobjects.animation[gameobjects.player.transform.animation], 1);
    else renderanim(gameobjects.player.transform, gameobjects.animation[gameobjects.player.transform.animation], 0);
}

var blink = true;

function renderGame() {
    rednerallanim([gameobjects.containers.enemycontainer, gameobjects.containers.enemyongroundcontainer, gameobjects.containers.enemyonbranchcontainer, gameobjects.containers.bulletcontainer]);

    if (gameobjects.player.damageble > 0) {
        if (blink) renderplayer();
        else {
            var t = gameobjects.player.transform;
            context.drawImage(img.dblank, t.x, t.y, t.width, t.height);
        }
        blink = !blink;
    } else {
        renderplayer();
    }

    renderselfdestructiveanim(gameobjects.containers.explocontainer);
    rednerall([gameobjects.containers.backgroundcontainer3]);
}

function renderUI() {
    rednerall([gameobjects.containers.backgroundcontainer, gameobjects.containers.backgroundcontainer2, gameobjects.containers.bushcontainer, gameobjects.containers.treescontainer, gameobjects.containers.branchcontainer, gameobjects.containers.enemybulletcontainer, gameobjects.containers.bulletcontainer // gameobjects.containers.enemyongroundcontainer,
        // gameobjects.containers.enemyonbranchcontainer,
        //gameobjects.containers.enemycontainer
    ]);
    rednerallunalignedsheet([gameobjects.containers.groundcontainer]);
    rednerallsimple([gameobjects.containers.enemybulletcontainer, gameobjects.containers.collectablecontainer]);

    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spritefont(spritefont2, 'LOADING IS COMPLETE', 40, 0.6, 780, 400, true);
        spritefont(spritefont2, 'PRESS OK BUTTON', 60, 0.6, 780, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        context.drawImage(img.gamelogo, (GUI.canvas.width - GUI.gamelogo.width) / 2, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        spritefont(spritefont2, 'PAUSED', 40, 0.6, 800, 60, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
        spritefont(spritefont2, 'SCORE:' + gameobjects.player.score + '  HEALTH:' + gameobjects.player.health, 40, 0.6, 800, 100, true);
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        spritefont(spritefont2, 'GAME OVER', 200, 0.6, 800, 100, true);
        spritefont(spritefont2, 'HIGH SCORE:' + gameobjects.player.highscore, 40, 0.6, 800, 450, true);
        spritefont(spritefont2, 'YOUR SCORE:' + gameobjects.player.lastscore, 40, 0.6, 800, 550, true);
        spritefont(spritefont2, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.6, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spritefont(spritefont2, 'HOW TO PLAY', 80, 0.6, 800, 100, true);
        spritefont(spritefont2, 'PRESS DOWN BUTTON TO MOVE DOWN', 40, 0.6, 800, 300, true);
        spritefont(spritefont2, 'PRESS UP BUTTON TO MOVE UP', 40, 0.6, 800, 350, true);
        spritefont(spritefont2, 'PRESS RIGHT BUTTON TO THROW STARS', 40, 0.6, 800, 450, true);
        spritefont(spritefont2, 'WHILE PLAYING PRESS OK BUTTON TO PAUSE', 40, 0.6, 800, 700, true);
        spritefont(spritefont2, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.6, 800, 800, true);
    } //spritefont'state:' + gameobjects.gamestate, fontMedium, 400, 50, true);

}