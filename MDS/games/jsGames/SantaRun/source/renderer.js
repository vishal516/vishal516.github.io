"use strict";

function renderGame() {
    for (var i = 0; i < gameobjects.level.groundcontainer.length; i++) {
        var element = gameobjects.level.groundcontainer[i];
        context.drawImage(img.road, element.x, element.yshow, element.width, element.height);
    }

    for (var _i = 0; _i < gameobjects.level.housecontainer.length; _i++) {
        var element = gameobjects.level.housecontainer[_i];
        context.drawImage(element.img, element.x, element.y, element.width, element.height);
    }

    context.drawImage(img.fog, gameobjects.background.layer3.x, gameobjects.background.y, gameobjects.background.layer3.width, gameobjects.background.height);
    context.drawImage(img.fog, gameobjects.background.layer3.x + gameobjects.background.layer3.width, gameobjects.background.y, gameobjects.background.layer3.width, gameobjects.background.height);

    (function() {
        gameobjects.player.animationframe += 0.5;
        if (gameobjects.player.animationframe > gameobjects.player.framelength - 1) gameobjects.player.animationframe = 0;
        var frame = Math.floor(gameobjects.player.animationframe);
        //context.drawImage(img.pixel, gameobjects.player.x, gameobjects.player.y, gameobjects.player.width, gameobjects.player.height);

        if (gameobjects.player.shoot.state == true) {
            context.drawImage(img.santashootss, gameobjects.player.tilex * frame, 0, gameobjects.player.tilex, gameobjects.player.tiley,
                gameobjects.player.x - gameobjects.player.imgpos.x, gameobjects.player.y - gameobjects.player.imgpos.y, gameobjects.player.width + gameobjects.player.imgpos.width, gameobjects.player.height + gameobjects.player.imgpos.height);
            if (gameobjects.player.animationframe > 16)
                gameobjects.player.shoot.state = false;

        } else {
            if (gameobjects.player.jump.state)
                context.drawImage(img.santajump, gameobjects.player.x - gameobjects.player.imgpos.x, gameobjects.player.y, gameobjects.player.width + gameobjects.player.imgpos.width, gameobjects.player.height + gameobjects.player.imgpos.height);
            else
                context.drawImage(img.santaspritesheet, gameobjects.player.tilex * frame, 0, gameobjects.player.tilex, gameobjects.player.tiley,
                    gameobjects.player.x - gameobjects.player.imgpos.x, gameobjects.player.y - gameobjects.player.imgpos.y, gameobjects.player.width + gameobjects.player.imgpos.width, gameobjects.player.height + gameobjects.player.imgpos.height);
        }
    })();

    for (var _i2 = 0; _i2 < gameobjects.level.enemycontainer.length; _i2++) {
        var element = gameobjects.level.enemycontainer[_i2];
        element.img.animationframe += 0.5;
        if (element.img.animationframe >= element.img.totalframes - 1) element.img.animationframe = 0;
        var frame = Math.floor(element.img.animationframe);
        //debug enemy collision
        //context.drawImage(img.pixel, element.x, element.y, element.width, element.height);
        var image = img[element.img.img]
        context.drawImage(image, element.img.tilex * frame, 0, element.img.tilex, element.img.tiley,
            element.x - element.img.x, element.y - element.img.y, element.width + element.img.width, element.height + element.img.height);
    }

    for (var _i3 = 0; _i3 < gameobjects.level.bulletcontainer.length; _i3++) {
        var element = gameobjects.level.bulletcontainer[_i3];
        context.drawImage(img.snowball, element.x, element.y, element.width, element.height);
    }

    for (var _i4 = 0; _i4 < gameobjects.level.enemybulletcontainer.length; _i4++) {
        var element = gameobjects.level.enemybulletcontainer[_i4];
        context.drawImage(img.snowball, element.x, element.y, element.width, element.height);
    }

    for (var _i5 = 0; _i5 < gameobjects.level.bombdropcontainer.length; _i5++) {
        var element = gameobjects.level.bombdropcontainer[_i5];
        context.drawImage(img.bomb, element.x, element.y, element.width, element.height);
    }

    for (var _i6 = 0; _i6 < gameobjects.level.blastcontainer.length; _i6++) {
        var element = gameobjects.level.blastcontainer[_i6];
        context.drawImage(img.smoke, element.tilex * Math.floor(element.frame), 0, element.tilex, element.tiley, element.x, element.y, element.width, element.height);
        if (element.frame <= element.framemax) gameobjects.level.blastcontainer[_i6].frame += 0.5;
        else {
            gameobjects.level.blastcontainer.splice(_i6, 1);
        }
    }

    for (var _i7 = 0; _i7 < gameobjects.level.collectablecontainer.length; _i7++) {
        var element = gameobjects.level.collectablecontainer[_i7];
        context.drawImage(element.img, element.x, element.y, element.width, element.height);
    }
}

var spacing = 0.5; // context.font = "30px Arial";
// context.strokeText(i, gameobjects.level.groundcontainer[i].x, 400);

function renderUI() {

    gameobjects.background.x > -gameobjects.background.width ? gameobjects.background.x -= gameobjects.paralax.speed : gameobjects.background.x += gameobjects.background.width;
    gameobjects.background.layer2.x > -gameobjects.background.layer2.width ? gameobjects.background.layer2.x -= gameobjects.paralax.speed : gameobjects.background.layer2.x += gameobjects.background.layer2.width;
    context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.background, gameobjects.background.x + gameobjects.background.width, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.bg2, gameobjects.background.layer2.x, gameobjects.background.layer2.y, gameobjects.background.layer2.width, gameobjects.background.layer2.height);
    context.drawImage(img.bg2, gameobjects.background.layer2.x + gameobjects.background.layer2.width, gameobjects.background.layer2.y, gameobjects.background.layer2.width, gameobjects.background.layer2.height);
    context.drawImage(img.bg3, gameobjects.background.layer3.x, gameobjects.background.layer3.y, gameobjects.background.layer3.width, gameobjects.background.layer3.height);
    context.drawImage(img.bg3, gameobjects.background.layer3.x + gameobjects.background.layer3.width, gameobjects.background.layer3.y, gameobjects.background.layer3.width, gameobjects.background.layer3.height);

    var drops = GUI.decoration.bubbles;

    for (var i = 0; i < drops.length; i++) {
        context.drawImage(drops[i].image, drops[i].x, drops[i].y, drops[i].width, drops[i].height);
    }

    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spritefont(spritefont2, 'LOADING IS COMPLETE', 60, spacing, 780, 400, true);
        spritefont(spritefont2, 'PRESS OK BUTTON', 80, spacing, 780, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        //renderGame(); //optional
        //context.drawImage(img.gamelogo, (GUI.canvas.width - GUI.gamelogo.width) / 2, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        spritefont(spritefont2, 'SANTA', GUI.gamelogo.height, spacing, 800, GUI.gamelogo.y - 100, true);
        spritefont(spritefont2, 'RUN', GUI.gamelogo.height - 50, spacing, 800, GUI.gamelogo.y + 100, true);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        renderGame();
        spritefont(spritefont2, 'PAUSED', 200, spacing, 800, 100, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
        spritefont(spritefont2, 'SCORE:' + gameobjects.player.score + '  ICE:' + gameobjects.player.ammo + '  HEALTH:' + gameobjects.player.health, 60, spacing, 800, 100, true); //memory leak debugger ===========================================================================
        // spritefont(spritefont2,
        //     ' blast:' + gameobjects.level.blastcontainer.length +
        //     ' bullet:' + gameobjects.level.bulletcontainer.length +
        //     ' ebullet:' + gameobjects.level.enemybulletcontainer.length +
        //     ' enemy:' + gameobjects.level.enemycontainer.length +
        //     ' ground:' + gameobjects.level.bombdropcontainer.length, 40, spacing, 800, 300, true);
        //================================================================================================
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        spritefont(spritefont2, 'GAME OVER', 200, spacing, 800, 100, true);
        spritefont(spritefont2, 'HIGH SCORE:' + gameobjects.player.highscore, 60, spacing, 800, 300, true);
        spritefont(spritefont2, 'YOUR SCORE:' + gameobjects.player.lastscore, 60, spacing, 800, 400, true);
        spritefont(spritefont2, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 40, spacing, 800, 800, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spritefont(spritefont2, 'CONTROLS', 100, spacing, 800, 50, true);
        spritefont(spritefont2, 'PRESS UP BUTTON TO JUMP', 60, spacing, 800, 150, true);
        spritefont(spritefont2, 'PRESS RIGHT BUTTON TO SHOOT', 60, spacing, 800, 200, true);
        spritefont(spritefont2, 'PRESS OK BUTTON TO PAUSE/RESUME THE GAME', 60, spacing, 800, 250, true);

        spritefont(spritefont2, 'HOW TO PLAY', 100, spacing, 800, 350, true);
        spritefont(spritefont2, 'JUMP OVER TO AVOID OBSTACLES         ', 60, spacing, 800, 450, true);
        context.drawImage(img.cart, 1100, 430, 100, 100);
        context.drawImage(img.cart2, 1250, 430, 100, 100);
        spritefont(spritefont2, 'SHOOT ICE OR DODGE ENEMIES                       ', 60, spacing, 800, 560, true);
        context.drawImage(img.snowmanss, 0, 0, 200, 150, 820, 530, 100, 100);
        context.drawImage(img.elfss, 0, 0, 200, 120, 930, 530, 100, 100);
        context.drawImage(img.deerss, 0, 0, 200, 120, 990, 530, 150, 100);
        context.drawImage(img.cookiess, 0, 0, 200, 120, 1100, 530, 150, 100);
        spritefont(spritefont2, 'PICK COLLECTABLES       TO GAIN ICE AND HEALTH', 60, spacing, 800, 670, true);
        context.drawImage(img.ammopickup, 660, 660, 70, 70);
        context.drawImage(img.healthpickup, 740, 660, 70, 70);
        spritefont(spritefont2, 'PRESS OK BUTTON TO GO BACK TO MAIN MENU', 40, spacing, 800, 800, true);
    } //spritefont'state:' + gameobjects.gamestate, fontMedium, 400, 50, true);

}