//console.log(canvas);
caught = null;
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
    spriteFontInitialization();
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
};

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
        createjs.Tween.get(GUI.levelup).play(
            createjs.Tween.get(GUI.levelup, { paused: true, loop: false })
            .to({ y: 1400 }, 0)
            .to({ y: -400 }, 2000, createjs.Ease.quadOut).to({ y: 1400 }, 0)
        );
        sound.levelup.play();
    }

    var populatesharks = random(1, 10) == 1 ? createShark() : null;
    var populatecollectables = random(1, 10 + gameobjects.player.level) == 1 ? createCollectables() : null;
}

function stopwatchTimeOut() { //called on stopwatch time complete
    gameobjects.gamestate = gameobjects.states.overfail;
    gameobjects.player.level = 1;
    sound.gameover.play();
    clearLastGame();
};

function upkeyPressed() {
    if (gameobjects.player.bombs > 0) {
        bombs.push(new bombEntity());
        gameobjects.player.bombs -= 1;
    }
}

function updater() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        backgroundScrolling();
        for (let i = 0; i < fishes.length; i++) {
            fishes[i].x += fishes[i].xdir * fishes[i].speed;
            if (fishes[i].x > 1800) fishes[i].x = -100;
            if (fishes[i].x < -200) fishes[i].x = 1700;
        }

        for (let i = 0; i < sharks.length; i++) {
            sharks[i].x += sharks[i].xdir * sharks[i].speed;
            if (sharks[i].x > 2300 || sharks[i].x < -700) //if shark is out of bounds
            {
                sharks.splice(i, 1);
            }
        }

        if (keyState[37]) {
            gameobjects.player.x -= 5;
        }
        if (keyState[39]) {
            gameobjects.player.x += 5;
        }
        if (gameobjects.player.x + gameobjects.player.width > canvas.width)
            gameobjects.player.x = canvas.width - gameobjects.player.width;
        if (gameobjects.player.x < 0) {
            gameobjects.player.x = 0;
        }

        var caughtFish = gameobjects.player.worms > 0 ? fishCatched() : null;
        var fishlost = fishLost();
        caught = caughtFish ? caughtFish : caught;

        if (keyState[40] && !caught) {
            gameobjects.hook.y += 5;
        } else
            gameobjects.hook.y -= 5;

        gameobjects.hook.x = gameobjects.player.x + 377;

        for (let i = 0; i < collectables.length; i++) {
            collectables[i].y -= collectables[i].speed;
            if (collectables[i].y < 250) //if collectables out of water
            {
                if (checkIntersection1D(gameobjects.player.x + 40, gameobjects.player.width - 120, collectables[i].x, collectables[i].size)) {
                    if (collectables[i].type == 1)
                        gameobjects.player.worms += collectables[i].scorepoints();
                    if (collectables[i].type == 2)
                        gameobjects.player.time += collectables[i].scorepoints();
                    if (collectables[i].type == 3)
                        gameobjects.player.bombs += collectables[i].scorepoints();
                    if (collectables[i].type == 4)
                        gameobjects.player.score += collectables[i].scorepoints();
                    if (collectables[i].type == 5)
                        gameobjects.player.score += collectables[i].scorepoints();
                    sound.addbombs.play();
                }
                collectables.splice(i, 1);
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

        for (let i = 0; i < bombs.length; i++) {
            bombs[i].y += bombs[i].speed;
            if (bombs[i].y > 800) {
                createBlast(bombs[i]),
                    bombs.splice(i, 1)
            };
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
        case 32: // space pressed
            break;
        case 13:
            enterkeyPressedGUI();
            break;
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

    for (let i = 0; i < bubbles.length; i++) {
        context.drawImage(img.Bubble, bubbles[i].x, bubbles[i].y, bubbles[i].width, bubbles[i].height);
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
    if (gameobjects.player.worms > 0)
        context.drawImage(img.Worm_0, gameobjects.hook.x, gameobjects.hook.y + 20, gameobjects.hook.width * 2, gameobjects.hook.height * 2);
    context.drawImage(img.Hook, gameobjects.hook.x - 4, gameobjects.hook.y, gameobjects.hook.width * 1.5, gameobjects.hook.height * 2);

    if (caught) {
        context.save();
        context.translate(gameobjects.hook.x + caught.width / 2, gameobjects.hook.y + caught.height / 2);
        context.rotate(-80);
        context.translate(-(gameobjects.hook.x + caught.width / 2), -(gameobjects.hook.y + caught.height / 2));
        context.drawImage(img[caught.fishtype], gameobjects.hook.x, gameobjects.hook.y + 20, caught.width - 10, caught.height + 10);
        context.restore();
    }

    for (let i = 0; i < fishes.length; i++) {
        if (fishes[i].xdir == -1)
            context.drawImage(img[fishes[i].fishtype], fishes[i].x, fishes[i].y, fishes[i].width, fishes[i].height);
        else {
            context.save();
            context.scale(-1, 1);
            context.drawImage(img[fishes[i].fishtype], -(fishes[i].width + fishes[i].x), fishes[i].y, fishes[i].width, fishes[i].height);
            context.restore();
        }
    }

    for (let i = 0; i < sharks.length; i++) {
        if (sharks[i].xdir == -1)
            context.drawImage(img.Shark_0, sharks[i].x, sharks[i].y, sharks[i].width, sharks[i].height);
        else {
            context.save();
            context.scale(-1, 1);
            context.drawImage(img.Shark_0, -(sharks[i].width + sharks[i].x), sharks[i].y, sharks[i].width, sharks[i].height);
            context.restore();
        }
    }

    for (let i = 0; i < collectables.length; i++) {
        context.drawImage(collectables[i].image, collectables[i].x, collectables[i].y, collectables[i].size, collectables[i].size);
    }

    for (let i = 0; i < bombs.length; i++) {
        context.drawImage(img.Bomb, bombs[i].x, bombs[i].y, bombs[i].width, bombs[i].height);
    }
    for (let i = 0; i < blasts.length; i++) {
        if (blasts[i].frameIndex > blasts[i].frames.length - 1) {
            blasts.splice(i, 1);
        } else {
            context.drawImage(blasts[i].frames[parseInt(blasts[i].frameIndex)], blasts[i].x, blasts[i].y, blasts[i].width, blasts[i].height);
            blasts[i].frameIndex += 0.2;
        }
    }
}

function backgroundScrolling() {
    scrollength -= 1;
    if (scrollength < -gameobjects.background.width)
        scrollength = 0;
}

function CreatBackground() {
    gameobjects.player.x = -1000;
    gameobjects.hook.x = -1000;
    gameobjects.background.y = 200;
    gameobjects.background.x = level.x / 2;

    createjs.Tween.get(gameobjects.background).play(
        createjs.Tween.get(gameobjects.background, { paused: true, loop: true })
        .to({ y: 205 }, 500, createjs.Ease.quadOut)
        .to({ y: 200 }, 500, createjs.Ease.quadOut) //bounceOut
    );
    createjs.Tween.get(gameobjects.player).play(
        createjs.Tween.get(gameobjects.player, { paused: true, loop: true })
        .to({ y: gameobjects.player.y + 10 }, 500, createjs.Ease.quadOut)
        .to({ y: gameobjects.player.y }, 500, createjs.Ease.quadOut) //bounceOut
    );
}

function createFish() {
    var fishcount = gameobjects.fish.MinCount + gameobjects.fish.morePerLevel * gameobjects.player.level;
    fishcount = fishcount > gameobjects.fish.maxCount ? gameobjects.fish.maxCount : fishcount;
    for (let i = 0; i < fishcount; i++) {
        if (fishes[i] == null) {
            fishes[i] = new fishEntity();
            FishyMotion(i);
        }
    }

    function FishyMotion(i) {
        createjs.Tween.get(fishes[i]).play(
            createjs.Tween.get(fishes[i], { paused: true, loop: true })
            .to({ y: fishes[i].y + 10 }, 500, createjs.Ease.quadOut)
            .to({ y: fishes[i].y }, 500, createjs.Ease.quadOut)
        );
        createjs.Tween.get(fishes[i]).play(
            createjs.Tween.get(fishes[i], { paused: true, loop: true })
            .to({ height: fishes[i].height + 5 }, 500, createjs.Ease.quadOut)
            .to({ height: fishes[i].height }, 500, createjs.Ease.quadOut)
        );
    }
};

function createShark() {
    var sharkcount = gameobjects.shark.MinCount + gameobjects.shark.morePerLevel * gameobjects.player.level;
    sharkcount = sharkcount > gameobjects.shark.maxCount ? gameobjects.shark.maxCount : sharkcount;
    for (let i = 0; i < sharkcount; i++) {
        if (sharks[i] == null) {
            sharks[i] = new sharkEntity();
            FishyMotion(i);
            break;
        }
    }

    function FishyMotion(i) {
        createjs.Tween.get(sharks[i]).play(
            createjs.Tween.get(sharks[i], { paused: true, loop: true })
            .to({ y: sharks[i].y + 10 }, 500, createjs.Ease.quadOut)
            .to({ y: sharks[i].y }, 500, createjs.Ease.quadOut)
        );
        createjs.Tween.get(sharks[i]).play(
            createjs.Tween.get(sharks[i], { paused: true, loop: true })
            .to({ height: sharks[i].height + 5 }, 500, createjs.Ease.quadOut)
            .to({ height: sharks[i].height }, 500, createjs.Ease.quadOut)
        );
    }
};

function createCollectables() {
    for (let i = 0; i < gameobjects.collectables.maxCount; i++) {
        if (collectables[i] == null) {
            collectables[i] = new collectableEntity();
            break;
        }
    }
}

function createBubble() {
    for (let i = 0; i < 50; i++) {
        if (bubbles[i] == null) {
            var bubble = new bubbleEntity();
            bubbles[i] = bubble;
            thisBubble = i;
            bubbleMotion(i);
        }
    }

    function bubbleMotion(i) {
        bubbles[i].x = random(0, 1600);
        bubbles[i].y = 900;
        bubbles[i].size = random(10, 30);
        createjs.Tween.get(bubbles[i], { loop: false }).wait(random(bubbles[i].x)).to({ x: bubbles[i].x, y: 240, width: bubbles[i].size, height: bubbles[i].size }, random(5000, 10000), createjs.Ease.easeInOut).call(bubbleMotion, [i])
    }
};

function fishCatched() {
    var collision = null;
    for (let i = 0; i < fishes.length; i++) {
        if (checkIntersection(gameobjects.hook, fishes[i])) {
            collision = fishes[i];
            gameobjects.player.score += collision.scorepoints;
            gameobjects.player.worms -= 1;
            fishes.splice(i, 1);
            createFish();
            return collision;
        }
    }
}

function sharkCatched() {
    for (let i = 0; i < sharks.length; i++) {
        for (let j = 0; j < bombs.length; j++) {
            if (checkIntersection(bombs[j], sharks[i])) {
                gameobjects.player.score += 1 * gameobjects.shark.scorepoints;
                createBlast(bombs[j]);
                bombs.splice(j, 1);
                sharks.splice(i, 1);
                break;
            }
        }
    }
}

function createBlast(bomb) {
    var blast = new blastEntity();
    blast.x = (bomb.x + bomb.width / 2) - blast.width / 2;
    blast.y = (bomb.y + bomb.height / 2) - blast.height / 2;;
    var index = blasts.push(blast) - 1;
}

function fishLost() {
    var collision = null;
    for (let j = 0; j < sharks.length; j++) {
        for (let i = 0; i < fishes.length; i++) {
            if (checkIntersection(sharks[j], fishes[i])) {
                collision = fishes[i];
                fishes.splice(i, 1);
                createFish();
                return collision;
            }
        }
    }
}

function checkIntersection(rect1, rect2) {
    if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y)
        return false;
    return true;
}

function checkIntersection1D(rect1x, rect1width, rect2x, rect2width) {
    if (rect1x >= rect2x + rect2width || rect1x + rect1width <= rect2x)
        return false;
    return true;
}