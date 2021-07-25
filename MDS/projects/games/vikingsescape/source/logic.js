"use strict";

function updater() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        updatelogic();
    }
}

function renderer() {
    renderUI();
}

function leftkey() {}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {}
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {}
}

function enterkey() { //
    //if (gameobjects.gamestate == gameobjects.states.play)
}

function spacekeyDebug() { //debug
}

function reset() {
    gameobjects.player.score = 0;
    gameobjects.player.health = gameobjects.defaults.playerHealth;
    initlogic();
}

function startgame() {
    gameobjects.gamestate = gameobjects.states.play;
}

function gameover() {
    gameobjects.gamestate = gameobjects.states.overfail;
    scoremanager();
}

function startnewgame() {
    reset();
    startgame();
}

function scoremanager() {
    gameobjects.player.lastscore = gameobjects.player.score;
    if (gameobjects.player.highscore < gameobjects.player.score) gameobjects.player.highscore = gameobjects.player.score;
}

function addscore() {
    gameobjects.player.score += gameobjects.defaults.scoreunit;
} //====================================== GAME SPECIFIC CODE SECTION =========================================


function createbackground() {
    gameobjects.containers.bushcontainer = fillcontainer(gameobjects.containers.bushcontainer, bush, gameobjects.containers.default.bushcontainer);
    gameobjects.containers.treescontainer = fillcontainer(gameobjects.containers.treescontainer, tree, gameobjects.containers.default.treescontainer);
    gameobjects.containers.backgroundcontainer = fillcontainer(gameobjects.containers.backgroundcontainer, background, gameobjects.containers.default.backgroundcontainer);
    gameobjects.containers.backgroundcontainer2 = fillcontainer(gameobjects.containers.backgroundcontainer2, background2, gameobjects.containers.default.backgroundcontainer);
    gameobjects.containers.backgroundcontainer3 = fillcontainer(gameobjects.containers.backgroundcontainer3, background3, gameobjects.containers.default.backgroundcontainer);
    gameobjects.containers.groundcontainer = fillcontainer(gameobjects.containers.groundcontainer, ground, gameobjects.containers.default.groundcontainer);
    gameobjects.containers.branchcontainer = fillcontainer(gameobjects.containers.branchcontainer, branch, gameobjects.containers.default.branchcontainer);
}

function initlogic() {
    gameobjects.containers.enemybulletcontainer = [];
    gameobjects.containers.enemycontainer = [];
    gameobjects.containers.enemyonbranchcontainer = [];
    gameobjects.containers.enemyongroundcontainer = [];
    gameobjects.containers.collectablecontainer = [];
}

function updatelogic() {
    // if (gameobjects.keyState[38]) {
    //     gameobjects.player.transform.y -= gameobjects.player.transform.y < gameobjects.level.ymin ? 0 : gameobjects.level.speed + gameobjects.player.level
    //     console.log('pressing up');
    // };
    // if (gameobjects.keyState[40]) {
    //     gameobjects.player.transform.y += gameobjects.player.transform.y > gameobjects.level.ymax ? 0 : gameobjects.level.speed + gameobjects.player.level
    //     console.log('pressing down');
    // };

    if (gameobjects.keyState[38]) {
        gameobjects.player.transform.y -= gameobjects.level.speed + gameobjects.player.level;
        console.log('pressing up');
    }

    if (gameobjects.keyState[40]) {
        gameobjects.player.transform.y += gameobjects.level.speed + gameobjects.player.level;
        console.log('pressing down');
    }

    if (gameobjects.player.transform.y > gameobjects.level.ymax) gameobjects.player.transform.y = gameobjects.level.ymax;

    if (gameobjects.player.transform.y < gameobjects.level.ymin) gameobjects.player.transform.y = gameobjects.level.ymin;


    paralaxmove(gameobjects.containers.treescontainer, 0);
    paralaxmove(gameobjects.containers.bushcontainer, 0);
    paralaxmove(gameobjects.containers.backgroundcontainer, -gameobjects.player.level * 3);
    paralaxmove(gameobjects.containers.backgroundcontainer2, -gameobjects.player.level * 1.5);
    paralaxmove(gameobjects.containers.backgroundcontainer3, -gameobjects.player.level * 1);
    paralaxmove(gameobjects.containers.groundcontainer, 0);
    paralaxmove(gameobjects.containers.branchcontainer, 0);
    paralaxmove(gameobjects.containers.enemyonbranchcontainer, 0);
    paralaxmove(gameobjects.containers.enemyongroundcontainer, 0);
    paralaxmove(gameobjects.containers.explocontainer, 0);
    paralaxmove(gameobjects.containers.collectablecontainer, 0);
    paralaxmove(gameobjects.containers.enemycontainer, gameobjects.player.level * 1.5);
    paralaxmove(gameobjects.containers.bulletcontainer, (gameobjects.player.level + gameobjects.level.speed) * -4);
    paralaxmove(gameobjects.containers.enemybulletcontainer, (gameobjects.player.level + gameobjects.level.speed) * 2);
    paralaxrearange(gameobjects.containers.treescontainer, gameobjects.level.tile.tree.tilegap);
    paralaxrearange(gameobjects.containers.bushcontainer, gameobjects.level.tile.bush.tilegap);
    paralaxrearange(gameobjects.containers.backgroundcontainer, 0);
    paralaxrearange(gameobjects.containers.backgroundcontainer2, 0);
    paralaxrearange(gameobjects.containers.backgroundcontainer3, 0);
    paralaxrecreate(gameobjects.containers.groundcontainer, ground, 0, enemyonground);
    paralaxrecreate(gameobjects.containers.branchcontainer, branch, gameobjects.level.tile.tree.tilegap, enemyonbranch);
    intervalevent(function() {
        cleargarbage([gameobjects.containers.enemyonbranchcontainer, gameobjects.containers.enemyongroundcontainer, gameobjects.containers.enemybulletcontainer, gameobjects.containers.enemycontainer, gameobjects.containers.collectablecontainer], [gameobjects.containers.bulletcontainer]);
        if (random(0, 1) == 0) fillsingle(gameobjects.containers.enemycontainer, enmey());
    }, 0, 100);
    intervalevent(function() {
        enemyshoot();
    }, 1, 20);

    if (gameobjects.player.transform.y + gameobjects.player.transform.height > gameobjects.level.tile.background3.y && gameobjects.player.health > 1 && gameobjects.player.damageble == 0) {
        gameobjects.player.health -= 1;
        gameobjects.player.damageble = 200;
        sound.deathplayer.play();
    }

    collision([gameobjects.containers.bulletcontainer], [gameobjects.containers.enemycontainer, gameobjects.containers.enemyonbranchcontainer, gameobjects.containers.enemyongroundcontainer]);
    if (gameobjects.player.damageble > 0) gameobjects.player.damageble -= 1;
    else playercollision([gameobjects.containers.enemybulletcontainer, gameobjects.containers.enemycontainer, gameobjects.containers.enemyonbranchcontainer, gameobjects.containers.enemyongroundcontainer, gameobjects.containers.collectablecontainer]);
}

function rightkey() {
    gameobjects.player.transform.anitype = 1;
    setTimeout(function() {
        fillsingle(gameobjects.containers.bulletcontainer, playerbullet());
        gameobjects.player.transform.anitype = 0;
    }, 100);
} //====================================== REFERENCED FUNCTIONS (CORE-LOGICS) SECTION =========================================


function paralaxmove(objectarray, relativespeed) {
    for (var i = 0; i < objectarray.length; i++) {
        objectarray[i].x -= gameobjects.level.speed + gameobjects.player.level + relativespeed;
    }
}

function enemyshoot() {
    for (var i = 0; i < gameobjects.containers.enemycontainer.length; i++) {
        var element = gameobjects.containers.enemycontainer[i];
        if (gameobjects.animation[element.animation][element.anitype].shoots)
            if (element.x < GUI.canvas.width * 0.7 && Math.abs(gameobjects.player.transform.y + gameobjects.player.transform.height / 2 - (element.y + element.height / 2)) < 200) fillsingle(gameobjects.containers.enemybulletcontainer, enemybullet(element));
    }
}

function paralaxrearange(objectarray, tilepadding) {
    //object pooling
    for (var i = 0; i < objectarray.length; i++) {
        var element = objectarray[i];

        if (element.x < -element.width) {
            objectarray.splice(i, 1);
            element.x = objectarray[objectarray.length - 1].x + element.width + tilepadding;
            objectarray.push(element);
        }
    }
}

function paralaxrecreate(objectarray, create, tilepadding, createsecondary) {
    //object instantiating
    for (var i = 0; i < objectarray.length; i++) {
        var element = objectarray[i];

        if (element.x < -element.width) {
            objectarray.splice(i, 1);
            var lastelement = objectarray[objectarray.length - 1];
            var j = objectarray.push(create(0));
            objectarray[j - 1].x = lastelement.x + lastelement.width + tilepadding;
            createsecondary(objectarray[j - 1]);
        }
    }
}

function fillbytype(container, element, index, farguments) {
    if (farguments != null) container.push(element.apply(null, farguments));
    else if (typeof element !== 'function') container.push(element);
    else container.push(element(index));
}

function fillcontainer(container, element, count, farguments) {
    container = [];
    for (var i = 0; i < count; i++) {
        fillbytype(container, element, i, farguments); //container.push(element(i));
    }
    return container;
}

function fillsingle(container, element) {
    container.push(element);
}

function cleargarbage(containersL2R, containersR2L) {
    for (var j = 0; j < containersL2R.length; j++) {
        var c = containersL2R[j];

        for (var i = 0; i < c.length; i++) {
            var t = c[i];

            if (t.x < -t.width) {
                c.splice(i, 1);
            }
        }
    }

    for (var _j = 0; _j < containersR2L.length; _j++) {
        var _c = containersR2L[_j];

        for (var _i = 0; _i < _c.length; _i++) {
            var _t = _c[_i];

            if (_t.x > GUI.canvas.width + _t.width) {
                _c.splice(_i, 1);
            }
        }
    }
}

function intervalevent(method, time, delay) {
    if (gameobjects.level.speedtimer[time] < delay) {
        gameobjects.level.speedtimer[time] += gameobjects.player.level;
    } else {
        gameobjects.level.speedtimer[time] = 0;
        method();
    }
}

function collision(arraya, arrayb) {
    for (var k = 0; k < arraya.length; k++) {
        for (var i = 0; i < arraya[k].length; i++) {
            for (var l = 0; l < arrayb.length; l++) {
                for (var j = 0; j < arrayb[l].length; j++) {
                    if (arraya[k][i] != null && arrayb[l][j] != null) {
                        if (checkIntersection(arraya[k][i], arrayb[l][j])) {
                            if (arraya[k][i].health > 0) {
                                arraya[k][i].health -= 1;
                            } else {
                                arraya[k].splice(i, 1);
                            }

                            if (arrayb[l][j].health > 0) {
                                arrayb[l][j].health -= 1;
                                sound.deathenemy.play();
                                gameobjects.player.score += gameobjects.defaults.scoreunit;
                            } else {
                                explosion(arrayb[l][j]);
                                arrayb[l].splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
    }
}

function playercollision(arrayb) {
    for (var l = 0; l < arrayb.length; l++) {
        for (var j = 0; j < arrayb[l].length; j++) {
            if (arrayb[l][j] != null) {
                if (arrayb[l] === gameobjects.containers.collectablecontainer) {
                    if (checkIntersection(gameobjects.player.transform, arrayb[l][j])) {
                        arrayb[l].splice(j, 1);
                        gameobjects.player.health += 2;
                        if (gameobjects.player.health > gameobjects.defaults.playerHealth) gameobjects.player.health = gameobjects.defaults.playerHealth;
                        sound.life.play();
                    }
                } else {
                    if (checkIntersection(gameobjects.player.transform, arrayb[l][j])) {
                        arrayb[l].splice(j, 1);

                        if (gameobjects.player.health > 1) {
                            gameobjects.player.health -= 1;
                            gameobjects.player.damageble = 200;
                            sound.deathplayer.play();
                            return;
                        } else {
                            gameover();
                        }
                    }
                }
            }
        }
    }
}