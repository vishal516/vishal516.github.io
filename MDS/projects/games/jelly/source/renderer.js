function renderGame() {
    context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.chessmap, gameobjects.grid.x, gameobjects.grid.y, gameobjects.grid.width, gameobjects.grid.height);
    context.drawImage(img.block, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);

    for (var i = 0; i < gameobjects.grid.cells.length; i++) {
        var c = gameobjects.grid.cells[i];
        context.drawImage(c.image, c.x, c.y, c.width, c.width);
    }

    //context.drawImage(gameobjects.selector.dir == 0 ? img.selectorh : img.selectorv, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);
    context.drawImage(img.selector, gameobjects.selector.x, gameobjects.selector.y, gameobjects.selector.width, gameobjects.selector.height);
    spriteWrite('Score:' + gameobjects.player.score, fontMedium, 800, 50, true);
    context.drawImage(img.selector, GUI.cellPreview.x, GUI.cellPreview.y, gameobjects.selector.width, gameobjects.selector.height);
    if (gameobjects.selector.element) context.drawImage(gameobjects.grid.cells[gameobjects.grid.pos].image, GUI.cellPreview.x, GUI.cellPreview.y, gameobjects.selector.width, gameobjects.selector.height);
    else context.drawImage(gameobjects.grid.cells[gameobjects.grid.pos].image, GUI.cellPreview.x + 20, GUI.cellPreview.y + 20, gameobjects.selector.width - 40, gameobjects.selector.height - 40);
    // if (gameobjects.selector.dir) context.drawImage(img.directionv, GUI.directionPreview.x, GUI.directionPreview.y, GUI.directionPreview.width, GUI.directionPreview.height);
    // else context.drawImage(img.directionh, GUI.directionPreview.x, GUI.directionPreview.y, GUI.directionPreview.width, GUI.directionPreview.height);

    for (var i = 0; i < gameobjects.matcheffects.length; i++) {
        var m = gameobjects.matcheffects[i];
        context.drawImage(m.image, m.x, m.y, m.width, m.height);
    }

    var loader = gameobjects.defaults.duration / 5 * 0.7;
    context.fillStyle = gameobjects.meter.color;
    context.fillRect(gameobjects.meter.x + gameobjects.meter.width / 4, gameobjects.meter.y + gameobjects.meter.height - loader, gameobjects.meter.width / 2, loader);
    context.drawImage(img.meter, gameobjects.meter.x, gameobjects.meter.y - 10, gameobjects.meter.width, gameobjects.meter.height + 10 * 2);
}

function renderUI() {
    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite('loading is complete', fontSmall, 780, 400, true);
        spriteWrite('press ok button', fontBig, 780, 500, true);
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
        spriteWrite2('paused', fontXL, 800, 50, true);
        context.drawImage(img.Button, GUI.pauseMenu.x - GUI.pointerPadding / 2 + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y - GUI.pointerPadding / 2 + GUI.btnPlay.y, GUI.btnCommon.width + GUI.pointerPadding, GUI.btnCommon.height + GUI.pointerPadding);

        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        renderGame();
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('GAME OVER', fontXL, 800, 100, true);
        spriteWrite('HIGH SCORE:' + gameobjects.player.highscore, fontMedium, 800, 450, true);
        spriteWrite('YOUR SCORE:' + gameobjects.player.lastscore, fontMedium, 800, 550, true);
        spriteWrite('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontMedium, 800, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        context.drawImage(img.background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
        spriteWrite2('how to play', fontXL, 800, 50, true);
        spriteWrite('press arrow buttons to move the selector', fontSmall, 800, 250, true);
        spriteWrite('press ok button to pick a jelly for swaping', fontSmall, 800, 350, true);
        spriteWrite('press arrow buttons with a jelly picked to swap', fontSmall, 800, 450, true);
        spriteWrite('while playing hold ok button to pause', fontSmall, 800, 550, true);
        spriteWrite('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontMedium, 800, 750, true);
    }
    //spriteWrite('state:' + gameobjects.gamestate, fontMedium, 400, 50, true);

}