"use strict";

function updater() {
    updaterwithpause();
}

function renderer() {
    renderUI();
}

function leftkey() {}

function rightkey() {}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) slidedown();
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) slideup();
}

function enterkey() { //
    //if (gameobjects.gamestate == gameobjects.states.play)
}

function spacekeyDebug() { //creategrid();
}

function startnewgame() {
    reset();
}

function reset() {
    gameobjects.player.level = 0;
    gameobjects.player.speed = gameobjects.defaults.speed;
    gameobjects.player.x = 600;
    gameobjects.player.score = 0;
    console.log('new game');
    createTiles();
}

function startgame() {
    gameobjects.gamestate = gameobjects.states.play;
}

function gameover() {
    console.log('game over');
    gameobjects.player.speed = 0;
    gameobjects.player.ready = false;
    GUI.startintro.y = -100;
    scoremanager();
    sound.die.play();
    createjs.Tween.get(gameobjects.player).wait(0).play(createjs.Tween.get(gameobjects.player, {
        paused: true,
        loop: false
    }).to({
        y: gameobjects.player.x - 200
    }, 500, createjs.Ease.quadOut).to({
        y: 1100
    }, 500, createjs.Ease.quadOut).call(function() {
        gameobjects.gamestate = gameobjects.states.overfail;
        sound.levelcomplete.play();
    }));
}

function updaterwithpause() {
    logic();
}

function logic() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        var tile = gameobjects.tile.container;

        for (let i = 0; i < tile.length; i++) {
            if (gameobjects.player.speed > 0)
                gameobjects.player.y = gameobjects.selector.y - gameobjects.player.height;
        }

        for (let i = 0; i < gameobjects.tile.count; i++) {
            var element = gameobjects.tile.container[i];
            if (element.x < -1 * gameobjects.tile.width) {
                gameobjects.tile.container.splice(i, 1);
                gameobjects.tile.container.push(element);
                gameobjects.tile.container[tile.length - 1].x = gameobjects.tile.container[tile.length - 2].x + gameobjects.tile.width;
                gameobjects.tile.container[tile.length - 1].y = gameobjects.tile.y + random(1, 3) * gameobjects.tile.varience;
            }
        }

        for (let i = 0; i < gameobjects.tile.count; i++) {
            gameobjects.tile.container[i].x -= gameobjects.player.speed + gameobjects.player.level;
        }

        for (let i = 0; i < gameobjects.tile.count; i++) {
            if (gameobjects.tile.container[i].x < gameobjects.tile.xmin + gameobjects.tile.width &&
                gameobjects.tile.container[i].x > gameobjects.tile.xmin) {
                if (gameobjects.tile.container[i].x > gameobjects.selector.x) {
                    if (gameobjects.selector.y != tile[i].y) {
                        gameover();
                        console.log('...');
                    }
                    gameobjects.selector = tile[i];
                    addscore();
                };
            }
        }
        gameobjects.paralax.x += gameobjects.defaults.speed * gameobjects.paralax.dir;
        if (gameobjects.paralax.x < gameobjects.paralax.width * -1) {
            gameobjects.paralax.x = 0;
        }
    }
}

function scoremanager() {
    gameobjects.player.lastscore = gameobjects.player.score;
    if (gameobjects.player.highscore < gameobjects.player.score)
        gameobjects.player.highscore = gameobjects.player.score;
}

function addscore() {
    if (gameobjects.player.ready) gameobjects.player.score += gameobjects.defaults.scoreunit;
    if (gameobjects.player.level < 3) gameobjects.player.level += 0.1;
}

//====================================GAME SPECIFIC==========================================================


function createTiles() {
    gameobjects.tile.container = [];

    for (var i = 0; i < gameobjects.tile.count; i++) {
        var tile = {
            x: gameobjects.tile.width * i,
            y: gameobjects.tile.y + gameobjects.tile.varience * 3,
        }
        gameobjects.tile.container.push(tile);
    }
    gameobjects.selector.x = gameobjects.tile.container[2].x;
    gameobjects.selector.y = gameobjects.tile.container[2].y;
}

function slideup() {
    if (gameobjects.selector.y > gameobjects.tile.y) {
        gameobjects.selector.y -= gameobjects.tile.varience;
        sound.swoosh.play();
    }
    gameobjects.player.ready = true;
}

function slidedown() {
    if (gameobjects.selector.y < gameobjects.tile.y + gameobjects.tile.varience * 3) {
        gameobjects.selector.y += gameobjects.tile.varience;
        sound.swoosh.play();
    }
    gameobjects.player.ready = true;
}