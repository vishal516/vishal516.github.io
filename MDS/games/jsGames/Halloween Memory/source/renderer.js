function rendergame() {
    context.drawImage(img.selector, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);
    for (var i = 0; i < gameobjects.grid.cells.length; i++) {
        var c = gameobjects.grid.cells[i];
        context.drawImage(c.image, c.x, c.y, c.width, c.height);
        if (gameobjects.selector.element != c && c.image != img.CardS)
            context.drawImage(img.Card, c.x, c.y, c.width, c.height);
    }

    if (gameobjects.matchfaileffects) {
        var m = gameobjects.matchfaileffects;
        context.drawImage(m.image, m.x, m.y, m.width, m.height);
    }

    //context.drawImage(gameobjects.selector.dir == 0 ? img.selectorh : img.selectorv, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);

    context.drawImage(img.selector, GUI.cellPreview.x, GUI.cellPreview.y, GUI.cellPreview.width, GUI.cellPreview.height);
    if (gameobjects.selector.element)
        context.drawImage(gameobjects.selector.element.image, GUI.cellPreview.x, GUI.cellPreview.y, GUI.cellPreview.width, GUI.cellPreview.height);

    context.drawImage(img.selector, GUI.collectionPreview.x, GUI.collectionPreview.y, GUI.collectionPreview.width, GUI.collectionPreview.height);

    // if (gameobjects.selector.dir)
    //     context.drawImage(img.directionv, GUI.directionPreview.x, GUI.directionPreview.y + 100, GUI.directionPreview.width, GUI.directionPreview.height);
    // else
    //     context.drawImage(img.directionh, GUI.directionPreview.x, GUI.directionPreview.y + 100, GUI.directionPreview.width, GUI.directionPreview.height);

    for (var i = 0; i < gameobjects.matcheffects.length; i++) {
        var m = gameobjects.matcheffects[i];
        context.drawImage(m.image, m.x, m.y, m.width, m.height);
    }
    for (let i = 0; i < 4; i++)
        context.drawImage(img.statsbg, GUI.levelicon.x - 8, GUI.levelicon.y + GUI.levelicon.icongap * i - 9, GUI.levelicon.width * 3 + 20, GUI.levelicon.height + 20);
    context.drawImage(img.level, GUI.levelicon.child.x, GUI.levelicon.child.y, GUI.levelicon.child.size, GUI.levelicon.child.size);
    context.drawImage(img.score, GUI.levelicon.child.x, GUI.levelicon.child.y + GUI.levelicon.icongap * 1, GUI.levelicon.child.size, GUI.levelicon.child.size);
    context.drawImage(img.time, GUI.levelicon.child.x, GUI.levelicon.child.y + GUI.levelicon.icongap * 2, GUI.levelicon.child.size, GUI.levelicon.child.size);
    context.drawImage(img.target, GUI.levelicon.child.x, GUI.levelicon.child.y + GUI.levelicon.icongap * 3, GUI.levelicon.child.size, GUI.levelicon.child.size);
    spriteWrite3(gameobjects.player.level + '', fontMedium, 180, GUI.levelicon.y + 30, false);
    spriteWrite3(gameobjects.player.time.toString().toHHMMSS().slice(3, 8), fontMedium, 180, GUI.levelicon.y + 30 + GUI.levelicon.icongap * 2, false);
    spriteWrite3(gameobjects.player.score + '', fontMedium, 180, GUI.levelicon.y + 30 + GUI.levelicon.icongap * 1, false);
    spriteWrite3(gameobjects.grid.cells.length + '/' + gameobjects.matcheffects.length, fontMedium, 180, GUI.levelicon.y + 30 + GUI.levelicon.icongap * 3, false);

    if (GUI.levelup.y > -100 && GUI.levelup.y < 1100) {
        spriteWrite2('LEVEL', fontXL, 800, GUI.levelup.y, true);
        spriteWrite2('COMPLETED', fontXL, 800, GUI.levelup.y + 100, true);
    }
}

var hint = 0;

function renderUI() {
    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite3('LOADING IS COMPLETE', fontMedium, 780, 400, true);
        spriteWrite3('PRESS OK BUTTON', fontBig, 780, 500, true);
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

        rendergame();

        if (hint < 800) {
            hint += 1;
            spriteWrite3('HOLD OK BUTTON TO PAUSE THE GAME', fontMedium, 800, 800, true);
        }
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('TIME OVER', fontXL, 800, 100, true);
        spriteWrite3('HIGH SCORE:' + gameobjects.player.highscore, fontMedium, 800, 450, true);
        spriteWrite3('YOUR SCORE:' + gameobjects.player.lastscore, fontMedium, 800, 550, true);
        spriteWrite3('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontBig, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        context.drawImage(img.arrows, 680, 230, 200, 200);
        spriteWrite2('HOW TO PLAY', fontXL, 800, 50, true);
        spriteWrite3('PRESS ARROW BUTTONS       TO MOVE CARD SELECTOR', fontMedium, 800, 300, true);
        spriteWrite3('PRESS OK BUTTON TO SELECT OR MATCH CARDS', fontMedium, 800, 450, true);
        spriteWrite3('HOLD OK BUTTON TO PAUSE/RESUME THE GAME', fontMedium, 800, 600, true);
        spriteWrite3('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontBig, 800, 800, true);
    }
    //spriteWrite3(gameobjects.holdtime + '  :  ' + gameobjects.ignoreEvent, fontMedium, 800, 20, true);
}