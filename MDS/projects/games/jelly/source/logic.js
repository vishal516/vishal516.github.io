"use strict";

function updater() {
    updaterwithpause();
}

function renderer() {
    renderUI();
}

function leftkey() {
    if (gameobjects.gamestate == gameobjects.states.play) moveleft();
}

function rightkey() {
    if (gameobjects.gamestate == gameobjects.states.play) moveright();
}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) moveup();
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) movedown();
}

function enterkey() {
    gameobjects.holdtime = 0;
    if (gameobjects.gamestate == gameobjects.states.play && gameobjects.canpick)
        pick();
}

function startgame() {
    gameobjects.gamestate = gameobjects.states.play;
    gameobjects.defaults.duration = gameobjects.defaults.durationmax / 2;
    gameobjects.player.score = 0;
    gameobjects.grid.x = (canvas.width - gameobjects.grid.width) / 2;
    gameobjects.grid.y = (canvas.height - gameobjects.grid.height) / 2;
    gameobjects.grid.cells = [];

    for (var i = 0; i < gameobjects.grid.grid.row; i++) {
        for (var j = 0; j < gameobjects.grid.grid.col; j++) {
            var x = new cell(i, j);
            gameobjects.grid.cells.push(x);
        }
    }

    setselectorpos();
    setTimeout(match, 1000);
    gameobjects.canpick = false;
    setTimeout(function() {
        gameobjects.canpick = true;
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
                pick();
                gameobjects.holdtime = 0;

            }
        }
        if (gameobjects.defaults.duration > gameobjects.defaults.durationmin) {
            gameobjects.defaults.duration -= 1;
        } else {
            gameobjects.gamestate = gameobjects.states.overfail;
            gameobjects.player.lastscore = gameobjects.player.score;
            if (gameobjects.player.highscore < gameobjects.player.score) gameobjects.player.highscore = gameobjects.player.score;
            gameobjects.player.score = 0;
        }
    }
}

function moveleft() {
    moveleftdir(false);
}

function moveright() {
    moverightdir(false);
}

function movedown() {
    moveleftdir(true);
}

function moveup() {
    moverightdir(true);
}

function moveleftdir(dir) {
    var xmin = Math.floor(gameobjects.grid.pos / gameobjects.grid.grid.col) * gameobjects.grid.grid.col;
    var xmax = xmin + gameobjects.grid.grid.col - 1;
    var ymin = gameobjects.grid.grid.col - 1;
    gameobjects.grid.cells.length - gameobjects.grid.grid.col;

    if (!dir) {
        if (!gameobjects.selector.element) {
            gameobjects.grid.pos -= 1;
            if (gameobjects.grid.pos < xmin) gameobjects.grid.pos = xmax;
            if (gameobjects.grid.pos > xmax) gameobjects.grid.pos = xmin;
            setselectorpos();
        } else {
            if (gameobjects.grid.pos > xmin) {
                gameobjects.grid.pos -= 1;
                setselectorpos();
                swap(gameobjects.grid.pos + 1, gameobjects.grid.pos);
            }
        }
    } else {
        if (!gameobjects.selector.element) {
            if (gameobjects.grid.pos > ymin) gameobjects.grid.pos -= gameobjects.grid.grid.col;
            else gameobjects.grid.pos += gameobjects.grid.grid.col * (gameobjects.grid.grid.row - 1);
            setselectorpos();
        } else {
            if (gameobjects.grid.pos > ymin) {
                gameobjects.grid.pos -= gameobjects.grid.grid.col;
                setselectorpos();
                swap(gameobjects.grid.pos + gameobjects.grid.grid.col, gameobjects.grid.pos);
            }
        }
    }
}

function moverightdir(dir) {
    var min = Math.floor(gameobjects.grid.pos / gameobjects.grid.grid.col) * gameobjects.grid.grid.col;
    var max = min + gameobjects.grid.grid.col - 1;
    gameobjects.grid.grid.col - 1;
    var ymax = gameobjects.grid.cells.length - gameobjects.grid.grid.col;

    if (!dir) {
        if (!gameobjects.selector.element) {
            gameobjects.grid.pos += 1;
            if (gameobjects.grid.pos < min) gameobjects.grid.pos = max;
            if (gameobjects.grid.pos > max) gameobjects.grid.pos = min;
            setselectorpos();
        } else {
            if (gameobjects.grid.pos < max) {
                gameobjects.grid.pos += 1;
                setselectorpos();
                swap(gameobjects.grid.pos - 1, gameobjects.grid.pos);
            }
        }
    } else {
        if (!gameobjects.selector.element) {
            if (gameobjects.grid.pos < ymax) gameobjects.grid.pos += gameobjects.grid.grid.col;
            else gameobjects.grid.pos -= gameobjects.grid.grid.col * (gameobjects.grid.grid.row - 1);
            setselectorpos();
        } else {
            if (gameobjects.grid.pos < ymax) {
                gameobjects.grid.pos += gameobjects.grid.grid.col;
                setselectorpos();
                swap(gameobjects.grid.pos - gameobjects.grid.grid.col, gameobjects.grid.pos);
            }
        }
    }
}

function rotate() {
    gameobjects.selector.dir = !gameobjects.selector.dir;
}

function pick() {
    if (gameobjects.selector.element == null) gameobjects.selector.element = gameobjects.grid.cells[gameobjects.grid.pos];
    else gameobjects.selector.element = null;
}

function swap(pos1, pos2) {
    var cell1 = gameobjects.grid.cells[pos1];
    var cell2 = gameobjects.grid.cells[pos2];
    var cell1pos = {
        x: cell1.x,
        y: cell1.y
    };
    var cell2pos = {
        x: cell2.x,
        y: cell2.y
    };
    setPosToAnotherObject(gameobjects.grid.cells[pos1], cell2pos);
    setPosToAnotherObject(gameobjects.grid.cells[pos2], cell1pos);
    gameobjects.grid.cells[pos1] = cell2;
    gameobjects.grid.cells[pos2] = cell1;
    var oldscore = gameobjects.player.score;
    match();

    if (oldscore < gameobjects.player.score) {
        gameobjects.selector.element = null;
        sound.match.play();
    } else {
        setTimeout(function() {
            gameobjects.grid.cells[pos1] = cell1;
            gameobjects.grid.cells[pos2] = cell2;
            setPosToAnotherObject(gameobjects.grid.cells[pos1], cell1pos);
            setPosToAnotherObject(gameobjects.grid.cells[pos2], cell2pos);
            gameobjects.selector.element = null;
            sound.swap.play();
        }, 100);
    }
}

function match() {
    var thiscelltype = 0;
    var lastcelltype = 0;
    var matchedCollection = [];

    for (var i = 0; i < gameobjects.grid.grid.row; i++) {
        var matched = [];
        var matchcounter = 0;

        for (var j = 0; j < gameobjects.grid.grid.col; j++) {
            var index = i * gameobjects.grid.grid.col + j;
            lastcelltype = thiscelltype;
            thiscelltype = gameobjects.grid.cells[index].type;

            if (thiscelltype == lastcelltype) {
                matchcounter += 1;
                matched.push(index);
            } else {
                if (matched.length > 2) {
                    matchedCollection.push(matched);
                }

                matchcounter = 1;
                matched = [];
                matched.push(index);
            }
        }

        if (matched.length > 2) {
            matchedCollection.push(matched);
        }
    }

    for (var i = 0; i < gameobjects.grid.grid.col; i++) {
        var matched = [];
        var matchcounter = 0;

        for (var _j = 0; _j < gameobjects.grid.grid.row; _j++) {
            var index = i + gameobjects.grid.grid.col * _j;
            lastcelltype = thiscelltype;
            thiscelltype = gameobjects.grid.cells[index].type;

            if (thiscelltype == lastcelltype) {
                matchcounter += 1;
                matched.push(index);
            } else {
                if (matched.length > 2) {
                    matchedCollection.push(matched);
                }

                matchcounter = 1;
                matched = [];
                matched.push(index);
            }
        }

        if (matched.length > 2) {
            matchedCollection.push(matched);
        }
    }

    if (matchedCollection.length > 0) {
        matchedCollection.forEach(function(element) {
            element.forEach(function(e) {
                var cell = gameobjects.grid.cells[e];
                if (cell) destroy(e);
            });
        });
        setTimeout(match, 500);
    } else return;
}

function destroy(pos) {
    gameobjects.matcheffects.push(new matcheffect(gameobjects.grid.cells[pos]));

    for (var i = pos; i > gameobjects.grid.grid.col - 1; i = i - gameobjects.grid.grid.col) {
        var thiscellindex = i;
        var uppercellindex = i - gameobjects.grid.grid.col;
        gameobjects.grid.cells[uppercellindex].y += gameobjects.grid.cell.height;
        gameobjects.grid.cells[thiscellindex] = gameobjects.grid.cells[uppercellindex];
    }

    var topmostindex = pos - Math.floor(pos / gameobjects.grid.grid.col) * gameobjects.grid.grid.col;
    gameobjects.grid.cells[topmostindex] = new cell(0, topmostindex);
    gameobjects.player.score += gameobjects.defaults.scorepercell;
    gameobjects.defaults.duration < gameobjects.defaults.durationmax ? gameobjects.defaults.duration += 100 : gameobjects.defaults.duration = gameobjects.defaults.durationmax;
}

function setselectorpos() {
    setPosToAnotherObject(gameobjects.selector, gameobjects.grid.cells[gameobjects.grid.pos]);
}

function setPosToAnotherObject(a, b) {
    a.x = b.x;
    a.y = b.y;
}