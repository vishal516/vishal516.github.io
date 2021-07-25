var caught = null;
var scrollength = 0;
var fishes = [];
var collectables = [];
var sharks = [];
var bombs = [];
var blasts = [];
var bubbles = [];
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
    createBubble();
    createHomeMenu();
}

function restartgame() {
    clearLastGame();
    startGame();
}

function clearLastGame() {
    gameobjects.player.lastScore = gameobjects.player.score;
    gameobjects.player.HighScore = gameobjects.player.lastScore > gameobjects.player.HighScore ? gameobjects.player.lastScore : gameobjects.player.HighScore;
    fishes = [];
    sharks = [];
    collectables = [];
    caught = false;
}

function startGame() {
    gameobjects.player.target = gameobjects.player.targetMin; //gameobjects.player.targetMin + gameobjects.player.level * gameobjects.player.targetTolevelFactor;
    gameobjects.collectableWormTick = 10;
    gameobjects.collectableTimeTick = 0;
    gameobjects.player.score = 0;
    gameobjects.player.level = 1;
    gameobjects.player.x = 400;
    createFish();
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

function onEachSecond() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        gameobjects.player.time -= 1;
        stopwatchTick();
    }

    if (gameobjects.player.time == 0) {
        stopwatchTimeOut();
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

    var populatesharks = random(1, 10) == 1 ? createShark() : null;
    //var populatecollectables = random(1, 10 + gameobjects.player.level) == 1 ? createCollectables() : null;//less per level

    random(1, 10) == 1 ? createCollectables(random(3, 5)) : null; //same for all levels
    gameobjects.collectableTimeTick += 1;
    gameobjects.collectableWormTick += 1;
    if (gameobjects.collectableTimeTick > gameobjects.defaults.collectableTimeTickMax) {
        gameobjects.collectableTimeTick = 0;
        createCollectables(2);
    }
    if (gameobjects.collectableWormTick > gameobjects.defaults.collectableWormTick) {
        gameobjects.collectableWormTick = 0;
        createCollectables(1);
    }
}

function stopwatchTimeOut() {
    //called on stopwatch time complete
    gameobjects.gamestate = gameobjects.states.overfail;
    gameobjects.player.level = 1;
    sound.gameover.play();
    clearLastGame();
}

function upkeyPressed() {
    if (gameobjects.player.bombs > 0) {
        bombs.push(new bombEntity());
        gameobjects.player.bombs -= 1;
    }
}

function updater() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        backgroundScrolling();

        for (var _i8 = 0; _i8 < fishes.length; _i8++) {
            fishes[_i8].x += fishes[_i8].xdir * fishes[_i8].speed;
            if (fishes[_i8].x > 1800) fishes[_i8].x = -100;
            if (fishes[_i8].x < -200) fishes[_i8].x = 1700;
        }

        for (var _i9 = 0; _i9 < sharks.length; _i9++) {
            sharks[_i9].x += sharks[_i9].xdir * sharks[_i9].speed;

            if (sharks[_i9].x > 2300 || sharks[_i9].x < -700) //if shark is out of bounds
            {
                sharks.splice(_i9, 1);
            }
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

        var caughtFish = gameobjects.player.worms > 0 ? fishCatched() : null;
        var fishlost = fishLost();
        caught = caughtFish ? caughtFish : caught;

        if (keyState[40] && !caught) {
            gameobjects.hook.y += 5;
        } else gameobjects.hook.y -= 5;

        gameobjects.hook.x = gameobjects.player.x + 377;

        for (var _i10 = 0; _i10 < collectables.length; _i10++) {
            collectables[_i10].y -= collectables[_i10].speed;

            if (collectables[_i10].y < 250) //if collectables out of water
            {
                if (checkIntersection1D(gameobjects.player.x + 40, gameobjects.player.width - 120, collectables[_i10].x, collectables[_i10].size)) {
                    if (collectables[_i10].type == 1) gameobjects.player.worms += collectables[_i10].scorepoints();
                    if (collectables[_i10].type == 2) gameobjects.player.time += collectables[_i10].scorepoints();
                    if (collectables[_i10].type == 3) gameobjects.player.bombs += collectables[_i10].scorepoints();
                    if (collectables[_i10].type == 4) gameobjects.player.score += collectables[_i10].scorepoints();
                    if (collectables[_i10].type == 5) gameobjects.player.score += collectables[_i10].scorepoints();
                    sound.addbombs.play();
                }

                collectables.splice(_i10, 1);
            }
        }

        if (caught) {
            caught.x = gameobjects.hook.x;
            caught.y = gameobjects.hook.y;
        }

        if (gameobjects.hook.y < 150) {
            gameobjects.hook.y = 150;
            caught = null;
        } else if (gameobjects.hook.y > 900) {
            gameobjects.hook.y = 900;
        }

        for (var _i11 = 0; _i11 < bombs.length; _i11++) {
            bombs[_i11].y += bombs[_i11].speed;

            if (bombs[_i11].y > 800) {
                createBlast(bombs[_i11]), bombs.splice(_i11, 1);
            }
        }
        sharkCatched();
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
            if (gameobjects.gamestate == gameobjects.states.play) upkeyPressed();
            upkeyPressedGUI();
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
    gameobjects.hook.x = -1000;
    gameobjects.background.y = 200;
    gameobjects.background.x = level.x / 2;
    createjs.Tween.get(gameobjects.background).play(createjs.Tween.get(gameobjects.background, {
            paused: true,
            loop: true
        }).to({
            y: 205
        }, 500, createjs.Ease.quadOut).to({
            y: 200
        }, 500, createjs.Ease.quadOut) //bounceOut
    );
    createjs.Tween.get(gameobjects.player).play(createjs.Tween.get(gameobjects.player, {
            paused: true,
            loop: true
        }).to({
            y: gameobjects.player.y + 10
        }, 500, createjs.Ease.quadOut).to({
            y: gameobjects.player.y
        }, 500, createjs.Ease.quadOut) //bounceOut
    );
}

function createFish() {
    var fishcount = gameobjects.fish.MinCount + gameobjects.fish.morePerLevel * gameobjects.player.level;
    fishcount = fishcount > gameobjects.fish.maxCount ? gameobjects.fish.maxCount : fishcount;

    for (var _i12 = 0; _i12 < fishcount; _i12++) {
        if (fishes[_i12] == null) {
            fishes[_i12] = new fishEntity();
            FishyMotion(_i12);
        }
    }

    function FishyMotion(i) {
        createjs.Tween.get(fishes[i]).play(createjs.Tween.get(fishes[i], {
            paused: true,
            loop: true
        }).to({
            y: fishes[i].y + 10
        }, 500, createjs.Ease.quadOut).to({
            y: fishes[i].y
        }, 500, createjs.Ease.quadOut));
        createjs.Tween.get(fishes[i]).play(createjs.Tween.get(fishes[i], {
            paused: true,
            loop: true
        }).to({
            height: fishes[i].height + 5
        }, 500, createjs.Ease.quadOut).to({
            height: fishes[i].height
        }, 500, createjs.Ease.quadOut));
    }
};

function createShark() {
    var sharkcount = gameobjects.shark.MinCount + gameobjects.shark.morePerLevel * gameobjects.player.level;
    sharkcount = sharkcount > gameobjects.shark.maxCount ? gameobjects.shark.maxCount : sharkcount;

    for (var _i13 = 0; _i13 < sharkcount; _i13++) {
        if (sharks[_i13] == null) {
            sharks[_i13] = new sharkEntity();
            FishyMotion(_i13);
            break;
        }
    }

    function FishyMotion(i) {
        createjs.Tween.get(sharks[i]).play(createjs.Tween.get(sharks[i], {
            paused: true,
            loop: true
        }).to({
            y: sharks[i].y + 10
        }, 500, createjs.Ease.quadOut).to({
            y: sharks[i].y
        }, 500, createjs.Ease.quadOut));
        createjs.Tween.get(sharks[i]).play(createjs.Tween.get(sharks[i], {
            paused: true,
            loop: true
        }).to({
            height: sharks[i].height + 5
        }, 500, createjs.Ease.quadOut).to({
            height: sharks[i].height
        }, 500, createjs.Ease.quadOut));
    }
}


function createCollectables(type) {
    for (var _i14 = 0; _i14 < gameobjects.collectables.maxCount; _i14++) {
        if (collectables[_i14] == null) {
            collectables[_i14] = new collectableEntity(type);
            break;
        }
    }
}

function createBubble() {
    for (var _i15 = 0; _i15 < 50; _i15++) {
        if (bubbles[_i15] == null) {
            var bubble = new bubbleEntity();
            bubbles[_i15] = bubble;
            bubbleMotion(_i15);
        }
    }

    function bubbleMotion(i) {
        bubbles[i].x = random(0, 1600);
        bubbles[i].y = 900;
        bubbles[i].size = random(10, 30);
        createjs.Tween.get(bubbles[i], {
            loop: false
        }).wait(random(bubbles[i].x)).to({
            x: bubbles[i].x,
            y: 240,
            width: bubbles[i].size,
            height: bubbles[i].size
        }, random(5000, 10000), createjs.Ease.easeInOut).call(bubbleMotion, [i]);
    }
}

function fishCatched() {
    var collision = null;

    for (var _i16 = 0; _i16 < fishes.length; _i16++) {
        if (checkIntersection(gameobjects.hook, fishes[_i16])) {
            collision = fishes[_i16];
            gameobjects.player.score += collision.scorepoints;
            gameobjects.player.worms -= 1;
            fishes.splice(_i16, 1);
            createFish();
            return collision;
        }
    }
}

function sharkCatched() {
    for (var _i17 = 0; _i17 < sharks.length; _i17++) {
        for (var _j2 = 0; _j2 < bombs.length; _j2++) {
            if (checkIntersection(bombs[_j2], sharks[_i17])) {
                gameobjects.player.score += 1 * gameobjects.shark.scorepoints;
                createBlast(bombs[_j2]);
                bombs.splice(_j2, 1);
                sharks.splice(_i17, 1);
                break;
            }
        }
    }
}

function createBlast(bomb) {
    var blast = new blastEntity();
    blast.x = bomb.x + bomb.width / 2 - blast.width / 2;
    blast.y = bomb.y + bomb.height / 2 - blast.height / 2;;
    var index = blasts.push(blast) - 1;
}

function fishLost() {
    var collision = null;

    for (var _j3 = 0; _j3 < sharks.length; _j3++) {
        for (var _i18 = 0; _i18 < fishes.length; _i18++) {
            if (checkIntersection(sharks[_j3], fishes[_i18])) {
                collision = fishes[_i18];
                fishes.splice(_i18, 1);
                createFish();
                return collision;
            }
        }
    }
}

function checkIntersection(rect1, rect2) {
    if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y) return false;
    return true;
}

function checkIntersection1D(rect1x, rect1width, rect2x, rect2width) {
    if (rect1x >= rect2x + rect2width || rect1x + rect1width <= rect2x) return false;
    return true;
}