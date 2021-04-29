"use strict";

var scrollength = 0;
var asteroids = [];
var collectables = [];
var bullets = [];
var blasts = [];
var keyState = {};
var stopwatch = null;
window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);
window.addEventListener("keyup", moveSomething, false);

function initer() {
    CreatBackground();
    createHomeMenu();
}

function restartgame() {
    clearLastGame();
    startGame();
}

function clearLastGame() {
    gameobjects.player.lastScore = gameobjects.player.score;
    gameobjects.player.HighScore = gameobjects.player.lastScore > gameobjects.player.HighScore ? gameobjects.player.lastScore : gameobjects.player.HighScore;
    asteroids = [];
    collectables = [];
    bullets = [];
    gameobjects.player.x = -900;
}

function startGame() {
    gameobjects.player.target = gameobjects.player.targetMin; //gameobjects.player.targetMin + gameobjects.player.level * gameobjects.player.targetTolevelFactor;

    gameobjects.player.health = 100;
    gameobjects.earth.health = 100;
    gameobjects.player.score = 0;
    gameobjects.player.level = 1;
    gameobjects.player.x = 400;
    gameobjects.player.y = 450;
    gameobjects.player.extrafire = 0;
    gameobjects.player.invincible = 0;
    bullets = [];
    createAsteroid();
    gameobjects.player.worms = gameobjects.defaults.worms;
    gameobjects.player.bombs = gameobjects.defaults.bombs;
    gameobjects.player.time = gameobjects.player.timeMin; // gameobjects.player.timeMin + gameobjects.player.level * gameobjects.player.timeToLevelFactor;

    clearTimeout(stopwatch);
    stopwatch = stopwatchcounter();
}

function stopwatchcounter() {
    function timerLocal() {
        onEachSecond();
    }

    return setInterval(timerLocal, 1000);
}

;

function onEachSecond() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        gameobjects.player.time -= 1;
        stopwatchTick();
    }

    if (gameobjects.player.time == 0) {
        //stopwatchTimeOut();
        clearTimeout(stopwatch);
    }
}

function stopwatchTick() {
    if (gameobjects.player.score >= gameobjects.player.target) {
        gameobjects.player.level += 1;
        gameobjects.player.target = gameobjects.player.targetMin + gameobjects.player.level * gameobjects.player.targetTolevelFactor;
        createjs.Tween.get(GUI.levelup).play(createjs.Tween.get(GUI.levelup, {
            paused: true,
            loop: false
        }).to({
            y: 1400
        }, 0).to({
            y: -400
        }, 2000, createjs.Ease.quadOut).to({
            y: 1400
        }, 0));
        sound.levelup.play();
    }

    var populatecollectables = random(1, 10 + gameobjects.player.level) == 1 ? createCollectables() : null;
}

function stopwatchTimeOut() {
    //called on stopwatch time complete
    gameobjects.gamestate = gameobjects.states.overfail;
    gameobjects.player.level = 1;
    sound.gameover.play();
    clearLastGame();
}

;

function updater() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        backgroundScrolling();

        for (var i = 0; i < asteroids.length; i++) {
            asteroids[i].x += asteroids[i].xdir * asteroids[i].speed;
            if (asteroids[i].x > 1800) asteroids[i].x = -100;
            if (asteroids[i].x < -200) asteroids[i].x = 1700;
        }

        if (keyState[37]) {
            gameobjects.player.x -= 5;
        }

        if (keyState[39]) {
            gameobjects.player.x += 5;
        }

        if (gameobjects.player.x + gameobjects.player.width > canvas.width) gameobjects.player.x = canvas.width - gameobjects.player.width;

        if (gameobjects.player.x < 0) {
            gameobjects.player.x = 0;
        }

        if (keyState[38]) {
            gameobjects.player.y -= 5;
        }

        if (keyState[40]) {
            gameobjects.player.y += 5;
        }

        if (gameobjects.player.y + gameobjects.player.height > canvas.height) gameobjects.player.y = canvas.height - gameobjects.player.height;

        if (gameobjects.player.y < 0) {
            gameobjects.player.y = 0;
        }

        for (var _i = 0; _i < collectables.length; _i++) {
            if (collectables[_i].x < 0) collectables.splice(_i, 1);
            else {
                collectables[_i].x -= collectables[_i].speed;

                if (checkIntersection(gameobjects.player, collectables[_i])) {
                    if (collectables[_i].type == 1) gameobjects.player.health = gameobjects.player.healthMax;

                    if (collectables[_i].type == 2) {
                        gameobjects.player.extrafire = collectables[_i].scorepoints();
                    }

                    if (collectables[_i].type == 3) gameobjects.player.invincible = collectables[_i].scorepoints();

                    if (collectables[_i].type == 4) {
                        asteroids = [];
                        createAsteroid();
                    }

                    if (collectables[_i].type == 5) gameobjects.player.score += collectables[_i].scorepoints();
                    sound.addbombs.play();
                    collectables.splice(_i, 1);
                }
            }
        }

        if (gameobjects.player.fireinterval > 1) {
            var bullet = new bombEntity();
            bullets.push(bullet);

            if (gameobjects.player.extrafire > 0) {
                gameobjects.player.extrafire -= 1;
                bullet.height *= 3;
                bullet.y = bullet.y - bullet.height / 3;
            }

            gameobjects.player.fireinterval = 0;
        }

        gameobjects.player.fireinterval += 1 / gameobjects.player.firerate;

        for (var _i2 = 0; _i2 < bullets.length; _i2++) {
            bullets[_i2].x += bullets[_i2].speed;

            if (bullets[_i2].x > 1800) {
                //createBlast(bombs[i]),
                bullets.splice(_i2, 1);
            }

            ;
        }

        enemyHit();
        playerHit();
        earthHit();
    }
}

function renderer() {
    renderGlobalElements();
    renderUI();
}

function moveSomething(e) {
    switch (e.keyCode) {
        case 37:
            leftkeyPressedGUI();
            break;

        case 38:
            if (!gameobjects.gamestate == gameobjects.states.play) upkeyPressedGUI();
            break;

        case 39:
            rightkeyPressedGUI();
            break;

        case 40:
            downkeyPressedGUI();
            break;

        case 32:
            // space pressed
            break;

        case 13:
            enterkeyPressedGUI();
            break;
    }
}

function backgroundScrolling() {
    scrollength -= 1;
    if (scrollength < -gameobjects.background.width) scrollength = 0;
}

function CreatBackground() {
    gameobjects.player.x = -1000;
    gameobjects.background.y = -2;
    gameobjects.background.x = level.x / 2;
}

function createAsteroid() {
    var asteroidcount = gameobjects.fish.MinCount + gameobjects.fish.morePerLevel * (gameobjects.player.level - 1);
    asteroidcount = asteroidcount > gameobjects.fish.maxCount ? gameobjects.fish.maxCount : asteroidcount;

    for (var i = 0; i < asteroidcount; i++) {
        if (asteroids[i] == null) {
            asteroids[i] = new fishEntity();
        }
    }
}

function createCollectables() {
    for (var i = 0; i < gameobjects.collectables.maxCount; i++) {
        if (collectables[i] == null) {
            collectables[i] = new collectableEntity();
            break;
        }
    }
}

function playerHit() {
    for (var i = 0; i < asteroids.length; i++) {
        if (checkIntersection(asteroids[i], gameobjects.player)) {
            if (gameobjects.player.health > 0) {
                blasts.push(new blastEntity(asteroids[i]));
                asteroids.splice(i, 1);
                if (gameobjects.player.invincible > 0) gameobjects.player.invincible -= gameobjects.player.damagefactor;
                else gameobjects.player.health -= gameobjects.player.damagefactor;
                createAsteroid();
            } else {
                console.log('game over');
                gameobjects.player.health = 0;
                stopwatchTimeOut();
            }
        }
    }
}

function earthHit() {
    for (var i = 0; i < asteroids.length; i++) {
        if (checkCircleIntersection(asteroids[i], gameobjects.earth)) {
            if (gameobjects.earth.health > 0) {
                blasts.push(new blastEntity(asteroids[i]));
                asteroids.splice(i, 1);
                gameobjects.earth.health -= gameobjects.earth.damagefactor;
                createAsteroid();
            } else {
                console.log('game over');
                gameobjects.earth.health = 0;
                stopwatchTimeOut();
            }
        }
    }
}

function enemyHit() {
    for (var i = 0; i < asteroids.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if (checkIntersection(bullets[j], asteroids[i])) {
                gameobjects.player.score += 1 * asteroids[i].scorepoints;
                blasts.push(new blastEntity(asteroids[i]));
                bullets.splice(j, 1);
                asteroids.splice(i, 1);
                createAsteroid();
                break;
            }
        }
    }
}

function checkIntersection(rect1, rect2) {
    if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y) return false;
    return true;
}

function checkCircleIntersection(cir1, cir2) {
    var c1 = cir1;
    var x1 = cir1.x + cir1.width / 2;
    var y1 = cir1.y + cir1.height / 2;
    var c2 = cir2;
    var x2 = cir2.x + cir2.width / 2;
    var y2 = cir2.y + cir2.height / 2;
    if ((c1.width + c2.width) / 2 > Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) return true;
    else return false;
}

function setPositionToObject(o1, o2) {
    o1.x = o2.x + o2.width / 2;
    o1.y = o2.y + o2.height / 2;
}