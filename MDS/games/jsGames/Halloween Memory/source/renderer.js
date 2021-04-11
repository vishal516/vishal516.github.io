function rendergame() {
    context.drawImage(img.selector, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);
    for (var i = 0; i < gameobjects.grid.cells.length; i++) {
        var c = gameobjects.grid.cells[i];
        context.drawImage(c.image, c.x, c.y, c.width, c.height);
        if (gameobjects.selector.element != c && c.image != img.CardS)
            context.drawImage(img.Card, c.x, c.y, c.width, c.height);
    }
    context.drawImage(gameobjects.selector.dir == 0 ? img.selectorh : img.selectorv, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);

    context.drawImage(img.selector, GUI.cellPreview.x, GUI.cellPreview.y, GUI.cellPreview.width, GUI.cellPreview.height);
    if (gameobjects.selector.element)
        context.drawImage(gameobjects.selector.element.image, GUI.cellPreview.x, GUI.cellPreview.y, GUI.cellPreview.width, GUI.cellPreview.height);

    context.drawImage(img.selector, GUI.collectionPreview.x, GUI.collectionPreview.y, GUI.collectionPreview.width, GUI.collectionPreview.height);

    if (gameobjects.selector.dir)
        context.drawImage(img.directionv, GUI.directionPreview.x, GUI.directionPreview.y + 100, GUI.directionPreview.width, GUI.directionPreview.height);
    else
        context.drawImage(img.directionh, GUI.directionPreview.x, GUI.directionPreview.y + 100, GUI.directionPreview.width, GUI.directionPreview.height);

    for (var i = 0; i < gameobjects.matcheffects.length; i++) {
        var m = gameobjects.matcheffects[i];
        context.drawImage(m.image, m.x, m.y, m.width, m.height);
    }

    spriteWrite2('LEVEL:' + gameobjects.player.level, fontSmall, 10, 300, false);
    spriteWrite2('TIME:' + gameobjects.player.time.toString().toHHMMSS(), fontSmall, 10, 400, false);
    spriteWrite2('SCORE:' + gameobjects.player.score, fontSmall, 10, 500, false);
    spriteWrite2('TARGET:' + gameobjects.grid.cells.length + '/' + gameobjects.matcheffects.length, fontSmall, 10, 600, false);

    if (GUI.levelup.y > -100 && GUI.levelup.y < 1100) {
        spriteWrite2('LEVEL', fontXL, 800, GUI.levelup.y, true);
        spriteWrite2('COMPLETED', fontXL, 800, GUI.levelup.y + 100, true);
    }
}


function renderUI() {
    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('LOADING IS COMPLETE', fontSmall, 780, 400, true);
        spriteWrite2('PRESS OK BUTTON', fontBig, 780, 500, true);
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        var drops = GUI.decoration.bubbles;

        for (var i = 0; i < drops.length; i++) {
            context.drawImage(drops[i].image, drops[i].x, drops[i].y, drops[i].width, drops[i].height);
        }

        context.drawImage(img.gamelogo, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }

    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('PAUSED', fontXXL, 800, 50, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        //renderGame();
        rendergame();
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('TIME OVER', fontXL, 800, 100, true);
        spriteWrite2('HIGH SCORE:' + gameobjects.player.highscore, fontMedium, 800, 450, true);
        spriteWrite2('YOUR SCORE:' + gameobjects.player.lastscore, fontMedium, 800, 550, true);
        spriteWrite2('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontBig, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('HOW TO PLAY', fontXL, 800, 50, true);
        spriteWrite2('PRESS DOWN BUTTON TO SWITCH BETWEEN HORIZONTAL OR VERTICAL MOVEMENT', fontSmall, 800, 300, true);
        spriteWrite2('PRESS LEFT BUTTON OR RIGHT BUTTON TO MOVE VERTICALLY OR HORIZONTALLY', fontSmall, 800, 400, true);
        spriteWrite2('PRESS UP BUTTON TO PICK A CARD TO MATCH', fontSmall, 800, 500, true);
        spriteWrite2('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontBig, 800, 650, true);
    }
    //spriteWrite('state:' + gameobjects.gamestate, fontMedium, 400, 50, true);
}