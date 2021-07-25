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

function rightkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        //firebullet();
    }
}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) { //
    }
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        //
        jump();
    }
}

function enterkey() { //
    //if (gameobjects.gamestate == gameobjects.states.play)
}

function spacekeyDebug() {
    //debug
    gameobjects.player.level += 1;
}

function reset() {
    gameobjects.player.score = 0;
    gameobjects.player.level = 6;
    gameobjects.player.ammo = gameobjects.defaults.ammo;
    gameobjects.level.blastcontainer = [];
    gameobjects.level.bombdropcontainer = [];
    gameobjects.level.bulletcontainer = [];
    gameobjects.level.enemycontainer = [];
    gameobjects.level.collectablecontainer = [];
    gameobjects.level.enemycontainer = [];
    gameobjects.player.health = gameobjects.defaults.playerHealth;
}

function playerdamage() {
    if (gameobjects.player.health > 1) gameobjects.player.health -= 1;
    else gameover();
}

function startgame() {
    gameobjects.gamestate = gameobjects.states.play;
}

function gameover() {
    gameobjects.gamestate = gameobjects.states.overfail;
    sound.gameover.play();
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
    if (gameobjects.player.level < 4) gameobjects.player.level += 0.01;
} //====================================== GAME SPECIFIC BEHAVIOUR ONLY =========================================


function startlogic() {
    //create ground tiles
    (function() {
        for (var i = 0; i < gameobjects.level.tile.ground.count; i++) {
            var element = Object.create(gameobjects.level.tile.ground);
            element.x = gameobjects.level.tile.ground.width * i;
            gameobjects.level.groundcontainer.push(element);
        }
    })(); //create house tiles


    (function() {
        for (var i = 0; i < gameobjects.level.tile.house.count; i++) {
            var element = new houseConstructor();

            if (i > 0) {
                element.x = 900 * i; //gameobjects.level.housecontainer[i - 1].x * i;
            } else {
                element.x = 0;
            }

            gameobjects.level.housecontainer.push(element);
        }
    })();
}

var delayedupdate = 100;

function updatelogic() {

    if (delayedupdate < 1) {
        gameobjects.player.score += 1;
        delayedupdate = 100;
    } else delayedupdate -= 1;
    //jump
    (function() {
        var groundy = gameobjects.level.tile.ground.y - gameobjects.player.height;

        if (gameobjects.player.jump.state) {
            gameobjects.player.y -= gameobjects.player.jump.speedfactor * 3;
            gameobjects.player.jump.speedfactor -= 0.2;
            if (gameobjects.player.y + gameobjects.player.height >= gameobjects.level.tile.ground.y) gameobjects.player.jump.state = false;
        }

        if (gameobjects.player.y > groundy) gameobjects.player.y = groundy;
    })(); //update ground tiles


    (function() {
        var length = gameobjects.level.groundcontainer.length;

        for (var i = 0; i < length; i++) {
            if (gameobjects.level.groundcontainer[i].x < -gameobjects.level.tile.ground.width) {
                var t = gameobjects.level.groundcontainer[i];
                gameobjects.level.groundcontainer.splice(i, 1);
                gameobjects.level.groundcontainer.push(t);
                gameobjects.level.groundcontainer[length - 1].x = gameobjects.level.groundcontainer[length - 2].x + gameobjects.level.tile.ground.width;
            }
        }

        for (var _i = 0; _i < gameobjects.level.tile.ground.count; _i++) {
            gameobjects.level.groundcontainer[_i].x -= gameobjects.player.speed + gameobjects.player.level;
        }
    })(); //update house tiles


    (function() {
        var length = gameobjects.level.housecontainer.length;

        for (var i = 0; i < length; i++) {
            if (gameobjects.level.housecontainer[i].x < -900) {
                var t = new houseConstructor();
                gameobjects.level.housecontainer.splice(i, 1);
                gameobjects.level.housecontainer.push(t);
                t.x = gameobjects.level.housecontainer[gameobjects.level.housecontainer.length - 2].x + 900; // gameobjects.level.housecontainer[gameobjects.level.housecontainer.length - 2].width;

                if (random(1, 10) == 1) {
                    gameobjects.level.collectablecontainer.push(new collectableConstructor(t));
                }
            }
        }

        for (var _i2 = 0; _i2 < length; _i2++) {
            gameobjects.level.housecontainer[_i2].x -= gameobjects.player.speed + gameobjects.player.level;
        }
    })(); //update enemies


    (function() {
        enemeyGenerator();

        for (var i = 0; i < gameobjects.level.enemycontainer.length; i++) {
            if (gameobjects.level.enemycontainer[i].x < -300) {
                gameobjects.level.enemycontainer.splice(i, 1);
            } else if (gameobjects.level.enemycontainer[i].damage && checkIntersection(gameobjects.player, gameobjects.level.enemycontainer[i])) {
                // if (!gameobjects.level.enemycontainer[i].fly) gameobjects.level.blastcontainer.push(new blastConstructor(gameobjects.level.enemycontainer[i]));
                // gameobjects.level.enemycontainer.splice(i, 1);
                gameobjects.level.enemycontainer[i].damage = false;
                sound.hit.play();
                playerdamage();
            }
        }

        for (var _i3 = 0; _i3 < gameobjects.level.enemycontainer.length; _i3++) {
            gameobjects.level.enemycontainer[_i3].x -= gameobjects.level.enemycontainer[_i3].speed + gameobjects.player.speed + gameobjects.player.level;

            if (gameobjects.level.enemycontainer[_i3].attacktime > 0) {
                gameobjects.level.enemycontainer[_i3].attacktime -= 1;
            } else {
                //enemyattack(gameobjects.level.enemycontainer[_i3]);
            }
        }
    })(); //update bullets


    (function() {
        for (var i = 0; i < gameobjects.level.bulletcontainer.length; i++) {
            gameobjects.level.bulletcontainer[i].x += gameobjects.level.bulletcontainer[i].dir;

            if (gameobjects.level.bulletcontainer[i].x > GUI.canvas.width + 100) {
                gameobjects.level.bulletcontainer.splice(i, 1);
                return;
            } else {
                for (var j = 0; j < gameobjects.level.enemycontainer.length; j++) {
                    if (gameobjects.level.enemycontainer[j].damageble) {
                        if (checkIntersection(gameobjects.level.bulletcontainer[i], gameobjects.level.enemycontainer[j])) {
                            addscore();
                            if (!gameobjects.level.enemycontainer[i].fly) gameobjects.level.blastcontainer.push(new blastConstructor(gameobjects.level.enemycontainer[j]));
                            gameobjects.level.bulletcontainer.splice(i, 1);

                            if (gameobjects.level.enemycontainer[j].health < 1) {
                                if (random(1, 5) == 1) gameobjects.level.collectablecontainer.push(new collectableConstructor(gameobjects.level.enemycontainer[j]));
                                gameobjects.level.enemycontainer.splice(j, 1);
                            } else gameobjects.level.enemycontainer[j].health -= 1;

                            break;
                        }
                    }
                }
            }
        }

        for (var _i4 = 0; _i4 < gameobjects.level.enemybulletcontainer.length; _i4++) {
            gameobjects.level.enemybulletcontainer[_i4].x += gameobjects.level.enemybulletcontainer[_i4].dir;

            if (checkIntersection(gameobjects.level.enemybulletcontainer[_i4], gameobjects.player)) {
                gameobjects.level.enemybulletcontainer.splice(_i4, 1);
                playerdamage();
                gameobjects.level.blastcontainer.push(new blastConstructor(gameobjects.player));
            }
        }

        for (var _i5 = 0; _i5 < gameobjects.level.bombdropcontainer.length; _i5++) {
            var element = gameobjects.level.bombdropcontainer[_i5];

            if (element.y > gameobjects.level.tile.ground.y - element.height) {
                var blastarea = {
                    x: element.x - 150,
                    y: element.y,
                    width: 300,
                    height: 300
                };
                gameobjects.level.blastcontainer.push(new blastConstructor(blastarea));
                gameobjects.level.bombdropcontainer.splice(_i5, 1);
                sound.blast.play();
            } else if (checkIntersection(element, gameobjects.player)) {
                var blastarea = {
                    x: element.x - 150,
                    y: element.y,
                    width: 200,
                    height: 200
                };
                gameobjects.level.blastcontainer.push(new blastConstructor(blastarea));
                gameobjects.level.bombdropcontainer.splice(_i5, 1);
                playerdamage();
            } else {
                gameobjects.level.bombdropcontainer[_i5].x -= gameobjects.player.speed + gameobjects.player.level;
                gameobjects.level.bombdropcontainer[_i5].y += 0.8 * (gameobjects.player.speed + gameobjects.player.level);
            }
        }

        for (var _i6 = 0; _i6 < gameobjects.level.blastcontainer.length; _i6++) {
            gameobjects.level.blastcontainer[_i6].x -= gameobjects.player.speed + gameobjects.player.level;
        }

        for (var _i7 = 0; _i7 < gameobjects.level.collectablecontainer.length; _i7++) {
            var element = gameobjects.level.collectablecontainer[_i7];

            if (element.x > -element.width) {
                element.x -= gameobjects.player.speed + gameobjects.player.level;
            }

            if (checkIntersection(element, gameobjects.player)) {
                element.collect();
                gameobjects.level.collectablecontainer.splice(_i7, 1);
            }
        }
    })();
} //====================================== Refereced functions( GAME SPECIFIC ) ===================================================


function enemeyGenerator() {
    for (var i = 0; i < gameobjects.enemy.count; i++) {
        if (!gameobjects.level.enemycontainer[i]) {
            gameobjects.level.enemycontainer[i] = new enemyConstructor();
        }
    }
}

function firebullet() {
    if (gameobjects.player.ammo > 0) {
        gameobjects.level.bulletcontainer.push(new bulletConstructor(gameobjects.player, 1));
        gameobjects.player.ammo -= 1;
    } else sound.noammo.play();
}

function jump() {
    if (!gameobjects.player.jump.state) {
        gameobjects.player.jump.state = true;
        gameobjects.player.jump.speedfactor = gameobjects.player.jump.height;
        sound.jump.play();
    }
}

function enemyattack(enemy) {
    enemy.attacktime = enemy.attacktimeinitial;

    if (enemy.x < GUI.canvas.width) {
        if (enemy.type == 4) {
            gameobjects.level.enemybulletcontainer.push(new bulletConstructor(enemy, -2));
        }

        if (enemy.type == 3) {
            gameobjects.level.bombdropcontainer.push(new bombdropConstructor(enemy, 1));
        }
    }
} // 510566
// 099458
// 21317-token