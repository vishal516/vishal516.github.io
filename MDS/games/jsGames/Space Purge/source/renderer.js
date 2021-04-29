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
    spacing: 0.6,
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
        context.drawImage(img.gamelogo, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
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
        context.drawImage(img.Frame, 0, 100, 1600, 50);
        // context.drawImage(img.Frame, 420, 800, 750, 100);
        spriteWrite('TARGET:' + gameobjects.player.target + '    SCORE:' + gameobjects.player.score + '    LEVEL:' + gameobjects.player.level +
            '    HEALTH:' + gameobjects.player.health + '    EARTH:' + gameobjects.earth.health, fontSmall, 800, 110, true);

        context.drawImage(img.LevelUp, GUI.levelup.x, GUI.levelup.y, GUI.levelup.width, GUI.levelup.height);
    } else if (gameobjects.gamestate == gameobjects.states.overfail) // overfailed
    {
        context.drawImage(img.gameover, GUI.gamelogo.x, GUI.gamelogo.y, GUI.gamelogo.width, GUI.gamelogo.height);
        spriteWrite('HIGH SCORE:' + gameobjects.player.HighScore, fontMedium, 820, 450, true);
        spriteWrite('YOUR SCORE:' + gameobjects.player.lastScore, fontMedium, 820, 550, true);
        spriteWrite('GAME IS OVER', fontMedium, 820, 650, true);
        spriteWrite('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontSmall, 820, 750, true);
    } else if (gameobjects.gamestate == gameobjects.states.info) // info
    {
        spriteWrite('PRESS ARROW BUTTONS TO MOVE THe SHIP', fontMedium, 820, 450, true);
        spriteWrite('PRESS OK BUTTON TO PAUSE/RESUME THE GAME', fontMedium, 820, 550, true);
        spriteWrite('PRESS OK BUTTON TO GO BACK TO MAIN MENU', fontSmall, 820, 750, true);
    }
}

function renderGlobalElements() {
    context.drawImage(img.background, scrollength, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.background, gameobjects.background.width + scrollength, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.background, gameobjects.background.width * 2 + scrollength, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height); //context.drawImage(img.flash, gameobjects.earth.width, gameobjects.earth.y, gameobjects.earth.width, gameobjects.earth.height);

    context.drawImage(img.earth, gameobjects.earth.x, gameobjects.earth.y, gameobjects.earth.width, gameobjects.earth.height); // context.fillStyle = "#FF0000";
    // context.fillRect(gameobjects.player.x, gameobjects.player.y, gameobjects.player.width, gameobjects.player.height);

    if (gameobjects.player.invincible) context.drawImage(img.shield, gameobjects.player.x, gameobjects.player.y - (gameobjects.player.width - gameobjects.player.height) / 2, gameobjects.player.width, gameobjects.player.width);
    context.drawImage(img.Spaceship_3, gameobjects.player.x, gameobjects.player.y, gameobjects.player.width, gameobjects.player.height);

    for (let i = 0; i < asteroids.length; i++) {
        context.drawImage(img[asteroids[i].fishtype], asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height);
    }

    ;

    for (let i = 0; i < collectables.length; i++) {
        // context.fillStyle = "#FF9990";
        // context.fillRect(collectables[i].x, collectables[i].y, collectables[i].size, collectables[i].size);
        context.drawImage(collectables[i].image, collectables[i].x, collectables[i].y, collectables[i].size, collectables[i].size);
    }

    ;

    for (let i = 0; i < bullets.length; i++) {
        context.drawImage(img.laser, bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
    }

    ;

    for (let i = 0; i < blasts.length; i++) {
        if (blasts[i].frameIndex > blasts[i].frames.length - 1) {
            blasts.splice(i, 1);
        } else {
            context.drawImage(blasts[i].frames[parseInt(blasts[i].frameIndex)], blasts[i].x, blasts[i].y, blasts[i].width, blasts[i].height);
            blasts[i].frameIndex += 0.2;
        }
    }

    ; //circle collison debugging
    // if (gameobjects) {
    //     c2 = gameobjects.player;
    //     x2 = gameobjects.player.x + gameobjects.player.width / 2;
    //     y2 = gameobjects.player.y + gameobjects.player.height / 2;
    //     context.beginPath();
    //     context.arc(x2, y2, c2.width / 2, 0, 2 * Math.PI, false);
    //     context.fillStyle = 'yellow';
    //     context.fill();
    //     context.stroke();
    // }
}