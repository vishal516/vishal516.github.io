"use strict";

function updater() {
    updaterwithpause();
}

function renderer() {
    renderUI();
}

function leftkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        moveleft(true);
    }
}

function rightkey() {
    if (gameobjects.gamestate == gameobjects.states.play) moveright(true);
}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) moveright(false);
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play)
        moveleft(false);
}

function enterkey() {
    gameobjects.holdtime = 0;
    if (gameobjects.gamestate == gameobjects.states.play && gameobjects.canpick) pick();
};

function spacekeyDebug() {
    //creategrid();
}

function startgame() {
    gameobjects.gamestate = gameobjects.states.play;
    gameobjects.defaults.duration = gameobjects.defaults.durationmax / 2;
    gameobjects.player.score = 0;
    gameobjects.grid.x = (canvas.width - gameobjects.grid.width) / 2;
    gameobjects.grid.grid.row = 0;
    gameobjects.grid.grid.col = 0;
    gameobjects.grid.level = 1;
    gameobjects.player.level = 1;
    gameobjects.matcheffects = [];
    gameobjects.canpick = false;
    creategrid();
    setTimeout(function() {
        gameobjects.canpick = true;
    }, 1000);
}

function timeover() {
    gameobjects.gamestate = gameobjects.states.overfail;
    sound.game_over.play();
    gameobjects.player.lastscore = gameobjects.player.score;
    if (gameobjects.player.lastscore > gameobjects.player.highscore)
        gameobjects.player.highscore = gameobjects.player.lastscore;
}

function creategrid() {
    gameobjects.matcheffects = [];
    gameobjects.grid.cells = [];
    gameobjects.grid.level += 1;
    var bestfit = {
        x: 0,
        y: 0
    };
    var length = gameobjects.grid.level;

    var createbestfit = function() {
        var lengthdouble = length * 2;
        var smallestfit = length * 4; // Number.MAX_SAFE_INTEGER;// max safe integer not supported in IE

        for (var _i = 2; _i < lengthdouble; _i++) {
            if (lengthdouble % _i == 0) {
                var fit = _i + lengthdouble / _i;

                if (smallestfit > fit) {
                    smallestfit = fit;

                    if (_i > lengthdouble / _i) {
                        bestfit.x = _i;
                        bestfit.y = lengthdouble / _i;
                    } else {
                        bestfit.x = lengthdouble / _i;
                        bestfit.y = _i;
                    }
                }
            }
        }

        if (bestfit.x > gameobjects.grid.grid.colmax || bestfit.y > gameobjects.grid.grid.rowmax) {
            if (bestfit.x * bestfit.y > gameobjects.grid.grid.colmax * gameobjects.grid.grid.rowmax) {
                bestfit.x = gameobjects.grid.grid.colmax;
                bestfit.y = gameobjects.grid.grid.rowmax;
                console.log('max reached');
            } else {
                length += 1;
                createbestfit();
            }
        }
    };

    createbestfit();
    gameobjects.grid.cell.width = gameobjects.grid.width / bestfit.x;
    gameobjects.grid.height = gameobjects.grid.cell.width * 1.2 * bestfit.y;
    gameobjects.grid.y = (canvas.height - gameobjects.grid.height) / 2;
    gameobjects.selector.width = gameobjects.grid.cell.width;
    gameobjects.selector.height = gameobjects.grid.cell.width * 1.2;
    gameobjects.grid.grid.matrix = bestfit.x + 'x' + bestfit.y;
    gameobjects.grid.grid.col = bestfit.x;
    gameobjects.grid.grid.row = bestfit.y;
    gameobjects.grid.cells = [];
    var typeArray = [];

    for (var _i2 = 0; _i2 < bestfit.x * bestfit.y / 2; _i2++) {
        typeArray.push(_i2);
        typeArray.push(_i2);
    }

    typeArray = randomizeArray(typeArray);
    var type = -1;

    for (var i = 0; i < gameobjects.grid.grid.row; i++) {
        for (var j = 0; j < gameobjects.grid.grid.col; j++) {
            type += 1;
            var x = new cell(i, j, typeArray[type]);
            gameobjects.grid.cells.push(x);
        }
    }

    gameobjects.player.time = gameobjects.defaults.time * (bestfit.x * bestfit.y);
    gameobjects.grid.pos = 0;
    setselectorpos();
    clearInterval(gameobjects.defaults.stopwatch);
    gameobjects.defaults.stopwatch = counter();
    gameobjects.selector.element = null;
}

function counter() {
    return setInterval(function() {
        if (gameobjects.gamestate == gameobjects.states.play) {
            gameobjects.player.time -= 1;
            if (gameobjects.player.time < 1) {
                clearInterval(gameobjects.defaults.stopwatch);
                timeover();
            }
        }
    }, 1000);
}

function updaterwithpause() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        if (gameobjects.keyState[13]) {
            gameobjects.holdtime += 1;
            if (gameobjects.holdtime > 40) {
                gameobjects.ignoreEvent = true;
                gameobjects.gamestate = gameobjects.states.pause;
                console.log('paused');
                gameobjects.holdtime = 0;

            }
        }

        if (!(gameobjects.defaults.duration > gameobjects.defaults.durationmin)) {
            gameobjects.gamestate = gameobjects.states.overfail;
            gameobjects.player.lastscore = gameobjects.player.score;
            if (gameobjects.player.highscore < gameobjects.player.score) gameobjects.player.highscore = gameobjects.player.score;
            gameobjects.player.score = 0;
        }
    }
}

function moveleft(vertical) {
    var xmin = Math.floor(gameobjects.grid.pos / gameobjects.grid.grid.col) * gameobjects.grid.grid.col;
    var xmax = xmin + gameobjects.grid.grid.col - 1;
    var ymin = gameobjects.grid.grid.col - 1;

    if (vertical) {
        gameobjects.grid.pos -= 1;
        if (gameobjects.grid.pos < xmin) gameobjects.grid.pos = xmax;
        if (gameobjects.grid.pos > xmax) gameobjects.grid.pos = xmin;
        setselectorpos();
    } else {
        if (gameobjects.grid.pos > ymin) gameobjects.grid.pos -= gameobjects.grid.grid.col;
        else gameobjects.grid.pos += gameobjects.grid.grid.col * (gameobjects.grid.grid.row - 1);
        setselectorpos();
    }
}

function moveright(vertical) {
    var min = Math.floor(gameobjects.grid.pos / gameobjects.grid.grid.col) * gameobjects.grid.grid.col;
    var max = min + gameobjects.grid.grid.col - 1;
    var ymax = gameobjects.grid.cells.length - gameobjects.grid.grid.col;

    if (vertical) {
        gameobjects.grid.pos += 1;
        if (gameobjects.grid.pos < min) gameobjects.grid.pos = max;
        if (gameobjects.grid.pos > max) gameobjects.grid.pos = min;
        setselectorpos();
    } else {
        if (gameobjects.grid.pos < ymax) gameobjects.grid.pos += gameobjects.grid.grid.col;
        else gameobjects.grid.pos -= gameobjects.grid.grid.col * (gameobjects.grid.grid.row - 1);
        setselectorpos();
    }
}

function rotate() {
    gameobjects.selector.dir = !gameobjects.selector.dir;
}

function pick() {
    if (gameobjects.grid.cells[gameobjects.grid.pos].type == 0) {
        console.log('cant pick');
        sound.Button.play();
    } else {
        var newElement = gameobjects.grid.cells[gameobjects.grid.pos];
        if (gameobjects.selector.element == null)
            gameobjects.selector.element = gameobjects.grid.cells[gameobjects.grid.pos];
        else if (gameobjects.selector.element == newElement)
            gameobjects.selector.element = null;
        else {
            if (gameobjects.selector.element.type == newElement.type) {
                destroy();
            } else {
                gameobjects.matchfaileffects = new matchfaileffect(gameobjects.grid.cells[gameobjects.grid.pos])
                setTimeout(function() {
                    gameobjects.matchfaileffects = null;
                    gameobjects.selector.element = null;
                }, 250);
                sound.turn.play();
            }
        }
    }
}

function destroy() {
    gameobjects.matcheffects.push(new matcheffect(gameobjects.grid.cells[gameobjects.grid.pos]));
    gameobjects.matcheffects.push(new matcheffect(gameobjects.selector.element));
    gameobjects.grid.cells[gameobjects.grid.pos].image = img.CardS;
    gameobjects.grid.cells[gameobjects.grid.pos].type = 0;
    gameobjects.selector.element.image = img.CardS;
    gameobjects.selector.element.type = 0;
    gameobjects.selector.element = null;
    gameobjects.player.score += gameobjects.defaults.scoreunit;

    if (gameobjects.matcheffects.length == gameobjects.grid.cells.length) {
        clearInterval(gameobjects.defaults.stopwatch);
        sound.level_completed.play();
        setTimeout(function() {
            gameobjects.player.level += 1;
            creategrid();
        }, 2000);
        createjs.Tween.get(GUI.levelup).wait(1000).play(createjs.Tween.get(GUI.levelup, {
            paused: true,
            loop: false
        }).to({
            y: 200
        }, 1000, createjs.Ease.quadOut).to({
            y: 1100
        }, 500, createjs.Ease.quadOut).to({
            y: -100
        }, 0));
    }
}

function setselectorpos() {
    setPosToAnotherObject(gameobjects.selector, gameobjects.grid.cells[gameobjects.grid.pos]);
}

function setPosToAnotherObject(a, b) {
    a.x = b.x;
    a.y = b.y;
}

function randomizeArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        var r = random(0, arr.length - 1);
        var rvalue = arr[r];
        var ivalue = arr[i];
        arr[i] = rvalue;
        arr[r] = ivalue;
    }

    return arr;
}