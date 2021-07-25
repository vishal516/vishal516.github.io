"use strict";

function uiInit() {
    gameobjects.gamestate = gameobjects.states.loading;
    createHomeMenu();
    raindropeffect(); //decoration
}

function createHomeMenu() {
    createjs.Tween.get(GUI.gamelogo).play(createjs.Tween.get(GUI.gamelogo, {
        paused: true,
        loop: true
    }).to({
        width: GUI.gamelogo.width + 20,
        height: GUI.gamelogo.height + 20
    }, 500, createjs.Ease.quadOut).to({
        width: GUI.gamelogo.width,
        height: GUI.gamelogo.height
    }, 500, createjs.Ease.quadOut));
    createjs.Tween.get(GUI.gamelogo).play(createjs.Tween.get(GUI.gamelogo, {
        paused: true,
        loop: true
    }).to({
        x: GUI.gamelogo.x - 10
    }, 500, createjs.Ease.quadOut).to({
        x: GUI.gamelogo.x
    }, 500, createjs.Ease.quadOut));

    (function() {
        GUI.playMenu.width = GUI.btnCommon.width * (homeScreenButtonList.length + 1);
        GUI.playMenu.x = (canvas.width - GUI.playMenu.width) / 2 - 8 * homeScreenButtonList.length;
        GUI.pauseMenu.width = GUI.btnCommon.width * (pauseScreenButtonList.length + 1);
        GUI.pauseMenu.x = (canvas.width - GUI.pauseMenu.width) / 2 - 8 * pauseScreenButtonList.length;
    })();

    createjs.Tween.get(GUI.btnCommon).play(createjs.Tween.get(GUI.btnCommon, {
        paused: true,
        loop: true
    }).to({
        height: GUI.btnCommon.height + 5
    }, 500, createjs.Ease.quadOut).to({
        height: GUI.btnCommon.height
    }, 500, createjs.Ease.quadOut));
    GUI.levelup.y = -400;
}

function leftkeyPressedGUI() {
    if (gameobjects.gamestate == gameobjects.states.home) homeScreenPointerPos = movePointer(homeScreenPointerPos, homeScreenButtonList, false);
    if (gameobjects.gamestate == gameobjects.states.pause) pauseScreenPointerPos = movePointer(pauseScreenPointerPos, pauseScreenButtonList, false);
}

function rightkeyPressedGUI() {
    if (gameobjects.gamestate == gameobjects.states.home) homeScreenPointerPos = movePointer(homeScreenPointerPos, homeScreenButtonList, true);
    if (gameobjects.gamestate == gameobjects.states.pause) pauseScreenPointerPos = movePointer(pauseScreenPointerPos, pauseScreenButtonList, true);
}

function enterkeyPressedGUI() {
    if (gameobjects.gamestate == gameobjects.states.loading) {
        setTimeout(function() {
            gameobjects.gamestate = gameobjects.states.home;
        }, 10);
        GUI.loading = false;
        sound.gamemusic.loop = true;
        sound.gamemusic.play();
    }

    if (gameobjects.gamestate == gameobjects.states.home) {
        if (homeScreenPointerPos == 0) {
            gameobjects.gamestate = gameobjects.states.play;
            startgame();
        }

        if (homeScreenPointerPos == 1) {
            // show info
            gameobjects.gamestate = gameobjects.states.info;
            console.log('info');
        }

        if (homeScreenPointerPos == 2) {
            // toggle audio on off
            console.log('audio');
            handleGlobalSound();
            homeScreenButtonList[2] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
            pauseScreenButtonList[3] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
        }
    } else if (gameobjects.gamestate == gameobjects.states.info) {
        gameobjects.gamestate = gameobjects.states.home;
    } else if (gameobjects.gamestate == gameobjects.states.play) {
        // gameobjects.gamestate = gameobjects.states.pause;
        // console.log('paused');
    } else if (gameobjects.gamestate == gameobjects.states.pause) {
        if (gameobjects.ignoreEvent)
            gameobjects.ignoreEvent = false;
        else {
            if (pauseScreenPointerPos == 0) {
                gameobjects.gamestate = gameobjects.states.play;
            }

            if (pauseScreenPointerPos == 1) {
                // restart level
                startgame();
                gameobjects.gamestate = gameobjects.states.play;
            }

            if (pauseScreenPointerPos == 2) {
                // go to home
                gameobjects.gamestate = gameobjects.states.home;
            }

            if (pauseScreenPointerPos == 3) {
                // toggle audio on off
                console.log('audio');
                handleGlobalSound();
                homeScreenButtonList[2] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
                pauseScreenButtonList[3] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
            }
        }

    } else if (gameobjects.gamestate == gameobjects.states.overpass) // overpass
    {
        //startGame();
        gameobjects.gamestate = gameobjects.states.play;
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        gameobjects.gamestate = gameobjects.states.home;
    }
}

function downkeyPressedGUI() {}

function upkeyPressedGUI() {}

function movePointer(pos, list, add) {
    return add ? pos + 1 >= list.length ? 0 : pos + 1 : pos - 1 < 0 ? list.length - 1 : pos - 1;
}

function raindropeffect() {
    for (var i = 0; i < GUI.decoration.bubbles.length; i++) {
        var x = new raindrop();
        createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(
            createjs.Tween.get(x, { paused: true, loop: true })
            .to({ y: 1000 }, 1000 * 5)
            .to({ y: 0 }, 0)
        );
        GUI.decoration.bubbles[i] = x;
    }
}