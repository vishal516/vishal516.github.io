function characterIndex(char) {
    for (var _i = 0; _i < spritefontproperties.xindex; _i++) {
        for (var _j = 0; _j < spritefontproperties.yindex; _j++) {
            var character = spritefontproperties.characterSet[_j * spritefontproperties.xindex + _i];

            if (char.toLowerCase() == character.toLowerCase()) {
                var c = {
                    i: _i,
                    j: _j
                };
                return c;
            }
        }
    }
}

function spriteWrite(s, font, x, y, centered) {
    if (centered) x -= s.length * font.size * font.spacing / 2;

    for (var k = 0; k < s.length; k++) {
        if (s[k] != ' ') {
            var i = characterIndex(s[k]).i;
            var j = characterIndex(s[k]).j;
            context.drawImage(img.Font, font.charwidth * i, font.charwidth * j, font.stretchx, font.stretchx, x + font.size * font.spacing * k, y, //0 * font.size * font.spacing * j,
                font.size, font.size);
        }
    }
}

var spritefontproperties = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;?!-+=~&$%()\/{}[]<>^*▲▼@',
    xindex: 8,
    yindex: 8
};
var fontSmall = {
    x: 0,
    y: 0,
    width: 50,
    height: 80,
    size: 30,
    stretchx: 120,
    stretchy: 120,
    spacing: 0.6,
    charwidth: 128
};
var fontMedium = {
    x: 0,
    y: 0,
    width: 50,
    height: 80,
    size: 40,
    stretchx: 120,
    stretchy: 120,
    spacing: 0.68,
    charwidth: 128
};

var fontClear = {
    x: 0,
    y: 0,
    width: 50,
    height: 80,
    size: 50,
    stretchx: 120,
    stretchy: 120,
    spacing: 0.7,
    charwidth: 128
};

var fontBig = {
    x: 0,
    y: 0,
    width: 50,
    height: 80,
    size: 60,
    stretchx: 120,
    stretchy: 120,
    spacing: 0.6,
    charwidth: 128
};

function renderUI() {
    if (gameobjects.gamestate == gameobjects.states.loading) //LOADING
    {
        spriteWrite('loading is complete', fontSmall, 780, 400, true);
        spriteWrite('press ok button', fontBig, 780, 500, true);
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
        if (gameobjects.player.worms < 1) spriteWrite('NEED WORMS!!', fontBig, 780, gameobjects.defaults.warnings.y, true);

        spriteWrite('TARGET:' + gameobjects.player.target, fontMedium, 100, GUI.stats.yup, false);
        spriteWrite('SCORE:' + gameobjects.player.score, fontMedium, 480, GUI.stats.yup, false);
        spriteWrite('LEVEL:' + gameobjects.player.level, fontMedium, 800, GUI.stats.yup, false);
        spriteWrite('TIME:' + gameobjects.player.time.toString().toHHMMSS(), fontMedium, 1100, GUI.stats.yup, false);
        spriteWrite('BOMBS:' + gameobjects.player.bombs, fontMedium, 480, 940, false);
        spriteWrite('WORMS:' + gameobjects.player.worms, fontMedium, 850, 940, false);
        context.drawImage(img.LevelUp, GUI.levelup.x, GUI.levelup.y, GUI.levelup.width, GUI.levelup.height);
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.TimeOver, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        spriteWrite('HIGH SCORE:' + gameobjects.player.HighScore, fontMedium, 780, 400, true);
        spriteWrite('YOUR SCORE:' + gameobjects.player.lastScore, fontMedium, 780, 500, true);
        spriteWrite('TIME IS OVER', fontMedium, 780, 600, true);
        spriteWrite('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontMedium, 780, 700, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spriteWrite('PRESS DOWN BUTTON FOR FISHING', fontClear, 780, 200, true);
        spriteWrite('PRESS UP BUTTON TO DROP BOMBS', fontClear, 780, 300, true);
        spriteWrite('PRESS LEFT BUTTON TO MOVE LEFT', fontClear, 780, 400, true);
        spriteWrite('PRESS RIGHT BUTTON TO MOVE RIGHT', fontClear, 780, 500, true);
        spriteWrite('WHILE PLAYING PRESS OK BUTTON TO', fontClear, 780, 600, true);
        spriteWrite('PAUSE THE GAME', fontClear, 780, 650, true);
        spriteWrite('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontClear, 780, 800, true);
    }
}

function renderGlobalElements() {
    context.drawImage(img.Sky, scrollength, 0, gameobjects.background.width, 460);
    context.drawImage(img.Sky, gameobjects.background.width + scrollength, 0, gameobjects.background.width, 460);
    context.drawImage(img.Sky, gameobjects.background.width * 2 + scrollength, 0, gameobjects.background.width, 460);
    context.drawImage(img.PlayerHandRot, gameobjects.player.x + 155, gameobjects.player.y + 30, gameobjects.player.width / 1.5, gameobjects.player.height);
    context.drawImage(img.PlayerBody, gameobjects.player.x + 110, gameobjects.player.y + 95, gameobjects.player.width / 5, gameobjects.player.height - 50);
    context.drawImage(img.Boat, gameobjects.player.x + 20, gameobjects.player.y + 110, gameobjects.player.width / 1.2, gameobjects.player.height - 20);
    context.drawImage(img.PlayerHandPaddle, gameobjects.player.x + 110, gameobjects.player.y + 88, gameobjects.player.width / 4, gameobjects.player.height);
    context.drawImage(img.PlayerHead_0, gameobjects.player.x + 100, gameobjects.player.y + 25, gameobjects.player.width / 4, gameobjects.player.height / 1.3);
    context.drawImage(img.Background, scrollength, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.Background, gameobjects.background.width + scrollength, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.Background, gameobjects.background.width * 2 + scrollength, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);

    for (var _i2 = 0; _i2 < bubbles.length; _i2++) {
        context.drawImage(img.Bubble, bubbles[_i2].x, bubbles[_i2].y, bubbles[_i2].width, bubbles[_i2].height);
    }

    context.drawImage(img.Underwater, 0, 650, gameobjects.background.width, 300);
    context.drawImage(img.Underwater, gameobjects.background.width, 650, gameobjects.background.width, 300);
    context.drawImage(img.Ground, 0, 900, gameobjects.background.width, 100);
    context.drawImage(img.Ground, gameobjects.background.width, 900, gameobjects.background.width, 100);
    context.beginPath();
    context.strokeStyle = '#bccdd2';
    context.lineWidth = 1;
    context.moveTo(gameobjects.hook.x + 10, gameobjects.player.y + 45);
    context.lineTo(gameobjects.hook.x + 10, gameobjects.hook.y);
    context.stroke();
    context.drawImage(img.Plumb, gameobjects.hook.x + 5, gameobjects.player.y + 50, gameobjects.hook.width / 2, gameobjects.hook.height / 2);
    if (gameobjects.player.worms > 0) context.drawImage(img.Worm_0, gameobjects.hook.x, gameobjects.hook.y + 20, gameobjects.hook.width * 2, gameobjects.hook.height * 2);
    context.drawImage(img.Hook, gameobjects.hook.x - 4, gameobjects.hook.y, gameobjects.hook.width * 1.5, gameobjects.hook.height * 2);

    if (caught) {
        context.save();
        context.translate(gameobjects.hook.x + caught.width / 2, gameobjects.hook.y + caught.height / 2);
        context.rotate(-80);
        context.translate(-(gameobjects.hook.x + caught.width / 2), -(gameobjects.hook.y + caught.height / 2));
        context.drawImage(img[caught.fishtype], gameobjects.hook.x, gameobjects.hook.y + 20, caught.width - 10, caught.height + 10);
        context.restore();
    }

    for (var _i3 = 0; _i3 < fishes.length; _i3++) {
        if (fishes[_i3].xdir == -1) context.drawImage(img[fishes[_i3].fishtype], fishes[_i3].x, fishes[_i3].y, fishes[_i3].width, fishes[_i3].height);
        else {
            context.save();
            context.scale(-1, 1);
            context.drawImage(img[fishes[_i3].fishtype], -(fishes[_i3].width + fishes[_i3].x), fishes[_i3].y, fishes[_i3].width, fishes[_i3].height);
            context.restore();
        }
    }

    for (var _i4 = 0; _i4 < sharks.length; _i4++) {
        if (sharks[_i4].xdir == -1) context.drawImage(img.Shark_0, sharks[_i4].x, sharks[_i4].y, sharks[_i4].width, sharks[_i4].height);
        else {
            context.save();
            context.scale(-1, 1);
            context.drawImage(img.Shark_0, -(sharks[_i4].width + sharks[_i4].x), sharks[_i4].y, sharks[_i4].width, sharks[_i4].height);
            context.restore();
        }
    }

    for (var _i5 = 0; _i5 < collectables.length; _i5++) {
        context.drawImage(collectables[_i5].image, collectables[_i5].x, collectables[_i5].y, collectables[_i5].size, collectables[_i5].size);
    }

    for (var _i6 = 0; _i6 < bombs.length; _i6++) {
        context.drawImage(img.Bomb, bombs[_i6].x, bombs[_i6].y, bombs[_i6].width, bombs[_i6].height);
    }

    for (var _i7 = 0; _i7 < blasts.length; _i7++) {
        if (blasts[_i7].frameIndex > blasts[_i7].frames.length - 1) {
            blasts.splice(_i7, 1);
        } else {
            context.drawImage(blasts[_i7].frames[parseInt(blasts[_i7].frameIndex)], blasts[_i7].x, blasts[_i7].y, blasts[_i7].width, blasts[_i7].height);
            blasts[_i7].frameIndex += 0.2;
        }
    }
}