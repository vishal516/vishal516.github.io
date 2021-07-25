"use strict";

function renderGame() {
    for (var i = 0; i < gameobjects.level.groundcontainer.length; i++) {
        var element = gameobjects.level.groundcontainer[i];
        context.drawImage(img.road, element.x, element.y, element.width, element.height);
    }

    for (var _i = 0; _i < gameobjects.level.housecontainer.length; _i++) {
        var element = gameobjects.level.housecontainer[_i];
        context.drawImage(element.img, element.x, element.y, element.width, element.height);
    }

    (function() {
        gameobjects.player.animationframe += 0.2;
        if (gameobjects.player.animationframe > gameobjects.player.img.length - 1) gameobjects.player.animationframe = 0;
        var image = img[gameobjects.player.img[Math.floor(gameobjects.player.animationframe)]]; //debug player collision
        //context.drawImage(img.pixel, gameobjects.player.x, gameobjects.player.y, gameobjects.player.width, gameobjects.player.height);

        context.drawImage(image, gameobjects.player.x - gameobjects.player.imgpos.x, gameobjects.player.y - gameobjects.player.imgpos.y, gameobjects.player.width + gameobjects.player.imgpos.width, gameobjects.player.height + gameobjects.player.imgpos.height);
    })();

    for (var _i2 = 0; _i2 < gameobjects.level.enemycontainer.length; _i2++) {
        var element = gameobjects.level.enemycontainer[_i2];
        element.animationframe += 0.2;
        if (element.animationframe > element.img.length - 1) element.animationframe = 0;
        var image = element.img[Math.floor(element.animationframe)]; //debug enemy collision
        //context.drawImage(img.pixel, element.x, element.y, element.width, element.height);

        context.drawImage(img[image], element.x - element.imgpos.x, element.y - element.imgpos.y, element.width + element.imgpos.width, element.height + element.imgpos.height);
    }

    for (var _i3 = 0; _i3 < gameobjects.level.bulletcontainer.length; _i3++) {
        var element = gameobjects.level.bulletcontainer[_i3];
        context.drawImage(img.bullet, element.x, element.y, element.width, element.height);
    }

    for (var _i4 = 0; _i4 < gameobjects.level.enemybulletcontainer.length; _i4++) {
        var element = gameobjects.level.enemybulletcontainer[_i4];
        context.drawImage(img.bullet1, element.x, element.y, element.width, element.height);
    }

    for (var _i5 = 0; _i5 < gameobjects.level.bombdropcontainer.length; _i5++) {
        var element = gameobjects.level.bombdropcontainer[_i5];
        context.drawImage(img.bomb, element.x, element.y, element.width, element.height);
    }

    for (var _i6 = 0; _i6 < gameobjects.level.blastcontainer.length; _i6++) {
        var element = gameobjects.level.blastcontainer[_i6];
        context.drawImage(img.smoke, element.tilex * Math.floor(element.frame), 0, element.tilex, element.tiley, element.x, element.y, element.width, element.height);
        if (element.frame <= element.framemax) gameobjects.level.blastcontainer[_i6].frame += 0.4;
        else {
            gameobjects.level.blastcontainer.splice(_i6, 1);
        }
    }

    for (var _i7 = 0; _i7 < gameobjects.level.collectablecontainer.length; _i7++) {
        var element = gameobjects.level.collectablecontainer[_i7];
        context.drawImage(element.img, element.x, element.y, element.width, element.height);
    }
}

var spacing = 0.4; // context.font = "30px Arial";
// context.strokeText(i, gameobjects.level.groundcontainer[i].x, 400);

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
        spritefont(spritefont1, 'LOADING IS COMPLETE', 60, spacing, 780, 400, true);
        spritefont(spritefont1, 'PRESS OK BUTTON', 80, spacing, 780, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        //renderGame(); //optional
        context.drawImage(img.gamelogo, (GUI.canvas.width - GUI.gamelogo.width) / 2, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        renderGame();
        spritefont(spritefont1, 'PAUSED', 200, spacing, 800, 100, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
        spritefont(spritefont1, 'SCORE:' + gameobjects.player.score + '  AMMO:' + gameobjects.player.ammo + '  HEALTH:' + gameobjects.player.health, 60, spacing, 800, 100, true); //memory leak debugger ===========================================================================
        // spritefont(spritefont1,
        //     ' blast:' + gameobjects.level.blastcontainer.length +
        //     ' bullet:' + gameobjects.level.bulletcontainer.length +
        //     ' ebullet:' + gameobjects.level.enemybulletcontainer.length +
        //     ' enemy:' + gameobjects.level.enemycontainer.length +
        //     ' ground:' + gameobjects.level.bombdropcontainer.length, 40, spacing, 800, 300, true);
        //================================================================================================
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        spritefont(spritefont1, 'GAME OVER', 200, spacing, 800, 100, true);
        spritefont(spritefont1, 'HIGH SCORE:' + gameobjects.player.highscore, 60, spacing, 800, 300, true);
        spritefont(spritefont1, 'YOUR SCORE:' + gameobjects.player.lastscore, 60, spacing, 800, 400, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 80, spacing, 800, 800, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spritefont(spritefont1, 'CONTROLS', 100, spacing, 800, 50, true);
        spritefont(spritefont1, 'PRESS UP BUTTON TO JUMP', 60, spacing, 800, 150, true);
        spritefont(spritefont1, 'PRESS RIGHT BUTTON TO SHOOT', 60, spacing, 800, 200, true);
        spritefont(spritefont1, 'PRESS OK BUTTON TO PAUSE;RESUME THE GAME', 60, spacing, 800, 250, true);

        spritefont(spritefont1, 'HOW TO PLAY', 100, spacing, 800, 350, true);
        spritefont(spritefont1, 'JUMP OVER TO AVOID OBSTACLES         ', 60, spacing, 800, 450, true);
        context.drawImage(img.cart, 1000, 430, 200, 100);
        spritefont(spritefont1, 'SHOOT;DODGE ENEMIES                    ', 60, spacing, 800, 560, true);
        context.drawImage(img.enemy50, 820, 550, 100, 100);
        context.drawImage(img.shooter, 930, 550, 100, 100);
        context.drawImage(img.crow4, 1050, 550, 150, 100);
        spritefont(spritefont1, 'PICK COLLECTABLES       TO GAIN AMMO AND HEALTH', 60, spacing, 800, 670, true);
        context.drawImage(img.ammopickup, 660, 660, 70, 70);
        context.drawImage(img.healthpickup, 740, 660, 70, 70);
        spritefont(spritefont1, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 80, spacing, 800, 800, true);
    } //spritefont'state:' + gameobjects.gamestate, fontMedium, 400, 50, true);
}