//console.log(canvas);
var GUI = {
    "canvas": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000,
    },
    "homeScreen": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000,
        "xdir": 1,
        "ydir": 1,
        "speed": 200,
    },
    "gamelogo": {
        "x": 350,
        "y": 50,
        "width": 1600 - 350 * 2,
        "height": 400,
    },
    "playMenu": {
        "x": 0,
        "y": 500,
        "width": 400,
        "height": 400,
    },
    "pauseMenu": {
        "x": 0,
        "y": 500,
        "width": 400,
        "height": 400,
    },
    "btnPlay": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150,
    },
    "btnSound": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150,
    },
    "btnInfo": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150,
    },

    "btnCommon": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150,
    },
    "btnPointer": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150,
    },

    "levelup": {
        "x": 350,
        "y": 50,
        "width": 1600 - 350 * 2,
        "height": 400,
    },
    "btnPadding": 200,
    "loading": true,
}

var homeScreenButtonList = [img.BtnPlayOn, img.BtnInfoOn, img.BtnSoundOn];
var pauseScreenButtonList = [img.BtnPlayOn, img.BtnRestartOn, img.BtnExitOn, img.BtnSoundOn];
var homeScreenPointerPos = 0;
var pauseScreenPointerPos = 0;

function createHomeMenu() {
    createjs.Tween.get(GUI.gamelogo).play(
        createjs.Tween.get(GUI.gamelogo, { paused: true, loop: true })
        .to({ width: GUI.gamelogo.width + 20, height: GUI.gamelogo.height + 20 }, 500, createjs.Ease.quadOut)
        .to({ width: GUI.gamelogo.width, height: GUI.gamelogo.height }, 500, createjs.Ease.quadOut)
    );
    createjs.Tween.get(GUI.gamelogo).play(
        createjs.Tween.get(GUI.gamelogo, { paused: true, loop: true })
        .to({ x: GUI.gamelogo.x - 10 }, 500, createjs.Ease.quadOut)
        .to({ x: GUI.gamelogo.x }, 500, createjs.Ease.quadOut)
    );
    setPanelPos();

    function setPanelPos() {
        GUI.playMenu.width = GUI.btnCommon.width * (homeScreenButtonList.length + 1);
        GUI.playMenu.x = (canvas.width - GUI.playMenu.width) / 2 - 8 * homeScreenButtonList.length;
        GUI.pauseMenu.width = GUI.btnCommon.width * (pauseScreenButtonList.length + 1);
        GUI.pauseMenu.x = (canvas.width - GUI.pauseMenu.width) / 2 - 8 * pauseScreenButtonList.length;
    }

    createjs.Tween.get(GUI.btnCommon).play(
        createjs.Tween.get(GUI.btnCommon, { paused: true, loop: true })
        .to({ height: GUI.btnCommon.height + 5 }, 500, createjs.Ease.quadOut)
        .to({ height: GUI.btnCommon.height }, 500, createjs.Ease.quadOut)
    );

    GUI.levelup.y = -400;
}

function renderUI() {
    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spriteFont.drawText('LOADING IS COMPLETE\nPRESS OK BUTTON', { x: 520, y: 400 });
    } else if (gameobjects.gamestate == gameobjects.states.home) //home
    {
        context.drawImage(img.GameLogo, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.playMenu.x + GUI.btnCommon.x + 200 * homeScreenPointerPos, GUI.playMenu.y + 150 + GUI.btnPlay.y, GUI.btnPointer.width, GUI.btnPointer.height);
        for (var i = 0; i < homeScreenButtonList.length; i++) {
            context.drawImage(homeScreenButtonList[i], GUI.playMenu.x + GUI.btnCommon.x + 200 * i, GUI.playMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.pause) //pause
    {
        context.drawImage(img.Paused, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        context.drawImage(img.Button, GUI.pauseMenu.x + GUI.btnCommon.x + 200 * pauseScreenPointerPos, GUI.pauseMenu.y + 150 + GUI.btnPlay.y, GUI.btnPointer.width, GUI.btnPointer.height);
        for (var i = 0; i < pauseScreenButtonList.length; i++) {
            context.drawImage(pauseScreenButtonList[i], GUI.pauseMenu.x + GUI.btnCommon.x + 200 * i, GUI.pauseMenu.y + GUI.btnCommon.y, GUI.btnCommon.width, GUI.btnCommon.height);
        }
    } else if (gameobjects.gamestate == gameobjects.states.play) //play
    {
        context.drawImage(img.Frame2, 70, 0, 1450, 70);
        context.drawImage(img.Frame, 70 + 700 / 2, 930, 1450 - 700, 70);
        if (gameobjects.player.worms < 1)
            spriteFont.drawText('NEED WORMS!!', { x: gameobjects.defaults.warnings.x, y: gameobjects.defaults.warnings.y });
        spriteFont.drawText('TARGET:' + gameobjects.player.target, { x: 100, y: 5 });
        spriteFont.drawText('SCORE:' + gameobjects.player.score, { x: 480, y: 5 });
        spriteFont.drawText('LEVEL:' + gameobjects.player.level, { x: 800, y: 5 });
        spriteFont.drawText('TIME:' + gameobjects.player.time.toString().toHHMMSS(), { x: 1100, y: 5 });
        spriteFont.drawText('BOMBS:' + gameobjects.player.bombs, { x: 480, y: 950 });
        spriteFont.drawText('WORMS:' + gameobjects.player.worms, { x: 850, y: 950 });
        context.drawImage(img.LevelUp, GUI.levelup.x, GUI.levelup.y, GUI.levelup.width, GUI.levelup.height);
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.TimeOver, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        spriteFont.drawText('HIGH SCORE:' + gameobjects.player.HighScore, { x: 550, y: 400 });
        spriteFont.drawText('YOUR SCORE:' + gameobjects.player.lastScore, { x: 550, y: 500 });
        spriteFont.drawText('TIME IS OVER\nPRESS OK BUTTON TO GO BACK TO MAIN MENU', { x: 250, y: 600 });
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spriteFont.drawText('PRESS DOWN BUTTON FOR FISHING\n PRESS UP BUTTON TO DROP BOMBS\n PRESS LEFT BUTTON TO MOVE LEFT\n PRESS RIGHT BUTTON TO MOVE RIGHT', { x: 320, y: 200 });
        spriteFont.drawText('PRESS OK BUTTON TO GO BACK TO MAIN MENU', { x: 250, y: 600 });
    }
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
        }, 10)

        GUI.loading = false;
        sound.gamemusic.loop = true;
        sound.gamemusic.play();
    }
    if (gameobjects.gamestate == gameobjects.states.home) {
        if (homeScreenPointerPos == 0) {
            startGame();
            gameobjects.gamestate = gameobjects.states.play;
        }
        if (homeScreenPointerPos == 1) { // show info
            gameobjects.gamestate = gameobjects.states.info;
            console.log('info');
        }
        if (homeScreenPointerPos == 2) { // toggle audio on off
            console.log('audio');
            handleGlobalSound();
            homeScreenButtonList[2] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
            pauseScreenButtonList[3] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
        }
    } else if (gameobjects.gamestate == gameobjects.states.info) {
        gameobjects.gamestate = gameobjects.states.home;
    } else if (gameobjects.gamestate == gameobjects.states.play) {
        gameobjects.gamestate = gameobjects.states.pause;
        console.log('paused');

    } else if (gameobjects.gamestate == gameobjects.states.pause) {

        if (pauseScreenPointerPos == 0) {
            gameobjects.gamestate = gameobjects.states.play;
        }
        if (pauseScreenPointerPos == 1) { // restart level
            restartgame();
            gameobjects.gamestate = gameobjects.states.play;
        }
        if (pauseScreenPointerPos == 2) { // go to home
            clearLastGame();
            gameobjects.gamestate = gameobjects.states.home;
        }
        if (pauseScreenPointerPos == 3) { // toggle audio on off
            console.log('audio');
            handleGlobalSound();
            homeScreenButtonList[2] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
            pauseScreenButtonList[3] = globalsound ? img.BtnSoundOn : img.BtnSoundOff;
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

//console.log(spriteFont);

function downkeyPressedGUI() {}

function upkeyPressedGUI() {}

function movePointer(pos, list, add) {
    return add ? ((pos + 1 >= list.length) ? 0 : pos + 1) : ((pos - 1 < 0) ? list.length - 1 : pos - 1)
}

var lastgamestate = 'home';
window.addEventListener('blur', function() {
    lastgamestate = gameobjects.gamestate;
    gameobjects.gamestate = gameobjects.states.pause;
    sound.gamemusic.pause();

});
window.addEventListener('focus', function() {
    gameobjects.gamestate = lastgamestate;
    sound.gamemusic.play();
});