"use strict";

function renderGame() {
    var tile = gameobjects.tile.container;
    var gap = 6;

    for (var i = 0; i < gameobjects.tile.count; i++) {
        if (gameobjects.selector == tile[i] && gameobjects.gamestate == gameobjects.states.play) {
            context.drawImage(img.iceActive, tile[i].x + gap, tile[i].y, gameobjects.tile.width + gap * 2, gameobjects.tile.height);
        } else {
            context.drawImage(img.ice, gameobjects.tile.container[i].x + gap, gameobjects.tile.container[i].y, gameobjects.tile.width + gap * 2, gameobjects.tile.height);
        }
        // context.font = "30px Arial";
        // context.strokeText(i + ' : ' + gameobjects.tile.container[i].x + ' : ' + gameobjects.tile.container[i].y,gameobjects.tile.container[i].x, 400);
    }

}

function renderUI() {
    context.drawImage(img.background, 1, 0, 1, 1, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.cloudbg, gameobjects.paralax.x, gameobjects.paralax.y, gameobjects.paralax.width, gameobjects.paralax.height);
    context.drawImage(img.cloudbg, gameobjects.paralax.x + gameobjects.paralax.width, gameobjects.paralax.y, gameobjects.paralax.width, gameobjects.paralax.height);
    var mhight = 300;
    var my = 600;
    context.drawImage(img.mountainbg, gameobjects.paralax.x, my, gameobjects.paralax.width, mhight);
    context.drawImage(img.mountainbg, gameobjects.paralax.x + gameobjects.paralax.width, my, gameobjects.paralax.width, mhight);
    renderGame();

    // context.font = "30px Arial";
    // context.strokeText(gameobjects.player.ready, 10, 50);
    var drops = GUI.decoration.bubbles;

    for (var i = 0; i < drops.length; i++) {
        context.drawImage(drops[i].image, drops[i].x, drops[i].y, drops[i].width, drops[i].height);
    }

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
        if (gameobjects.player.animation.frame > 8) gameobjects.player.animation.frame = 0;
        var frame = Math.ceil(gameobjects.player.animation.frame += 0.25);
        playeranimation(frame, 130, 170, gameobjects.player.x, gameobjects.player.y);
        spriteWrite3('SCORE:' + gameobjects.player.score, 60, 0.5, GUI.canvas.width / 2, 50, true);
        //spriteWrite3('level:' + gameobjects.player.level, 30, 0.5, GUI.canvas.width / 2, 300, true);//uncomment to check speed
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.blur, 0, 0, GUI.canvas.width, GUI.canvas.height);
        spriteWrite3('GAME OVER', 200, 0.5, GUI.canvas.width / 2, 50, true);
        spriteWrite3('HIGH SCORE:' + gameobjects.player.highscore, 100, 0.5, GUI.canvas.width / 2, 450, true);
        spriteWrite3('YOUR SCORE:' + gameobjects.player.lastscore, 100, 0.5, GUI.canvas.width / 2, 550, true);
        spriteWrite3('PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60, 0.5, GUI.canvas.width / 2, 850, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        context.drawImage(img.blur, 0, 0, GUI.canvas.width, GUI.canvas.height);
        spriteWrite3('CONTROLS', 60 + 30, 0.5, GUI.canvas.width / 2, 50, true);
        spriteWrite3('PRESS UP BUTTON TO SLIDE UP THE FLOOR', 60, 0.5, GUI.canvas.width / 2, 150, true);
        spriteWrite3('PRESS DOWN BUTTON TO SLIDE DOWN THE FLOOR', 60, 0.5, GUI.canvas.width / 2, 200, true);
        spriteWrite3('PRESS OK BUTTON TO PAUSE/RESUME THE GAME', 60, 0.5, GUI.canvas.width / 2, 250, true);
        spriteWrite3('HOW TO PLAY', 100, 0.5, GUI.canvas.width / 2, 350, true);
        spriteWrite3('ALIGN THE TIDES AND CREATE A SAFE PASSAGE', 60, 0.5, GUI.canvas.width / 2, 450, true);
        spriteWrite3('FOR THE SURFER', 60, 0.5, GUI.canvas.width / 2, 500, true);
        spriteWrite3('PRESS OK BUTTON TO GO BACK TO MAIN MENU', 60 + 10, 0.5, GUI.canvas.width / 2, 850, true);
    }

}