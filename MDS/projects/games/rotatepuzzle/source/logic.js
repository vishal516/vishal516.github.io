"use strict";

function updater() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        updatelogic();
    }
}

function renderer() {
    renderUI();
}

function rightkey() {
    gameobjects.selector.tile.i += 1;
    if (gameobjects.selector.tile.i > gameobjects.puzzle.size - 1)
        gameobjects.selector.tile.i = 0;
}

function leftkey() {
    gameobjects.selector.tile.i -= 1;
    if (gameobjects.selector.tile.i < 0)
        gameobjects.selector.tile.i = gameobjects.puzzle.size - 1;

}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        // if (gameobjects.player.health > 1) gameobjects.player.health -= 1;
        // else gameover();

        gameobjects.selector.tile.j -= 1;
        if (gameobjects.selector.tile.j < 0)
            gameobjects.selector.tile.j = gameobjects.puzzle.size - 1;
    }
}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        //
        //gameobjects.player.score += 1;
        gameobjects.selector.tile.j += 1;
        if (gameobjects.selector.tile.j > gameobjects.puzzle.size - 1)
            gameobjects.selector.tile.j = 0;
    }
}

function enterkey() { //
    let delay = false;
    if (gameobjects.gamestate == gameobjects.states.play && delay == false) {
        sound.rotate.play();
        let x = gameobjects.puzzle.cells[gameobjects.selector.tile.i * gameobjects.puzzle.size + gameobjects.selector.tile.j];
        x += 90;
        if (x > 360) {
            x -= 360;
        } //= gameobjects.selector.direction;
        gameobjects.puzzle.cells[gameobjects.selector.tile.i * gameobjects.puzzle.size + gameobjects.selector.tile.j] = x;
        if (gameobjects.puzzle.cells.filter((element) => element === 360).length == gameobjects.puzzle.size * gameobjects.puzzle.size) {
            delay = true;
            sound.win.play();
            setTimeout(
                function() {
                    gameobjects.player.level += 1;
                    gameobjects.player.score += gameobjects.puzzle.timer * gameobjects.player.level;
                    createpuzzle();
                    delay = false;
                }, 1000
            )

        }
    }
}

function spacekeyDebug() {
    //debug
}

var timerf;

function timer() {
    clearInterval(timerf);
    timerf = setInterval(
        function() {
            if (gameobjects.gamestate == gameobjects.states.play)
                gameobjects.puzzle.timer -= 1;
            if (gameobjects.puzzle.timer < 1) {
                clearInterval(timerf);
                gameover();
            }
        }, 1000
    );
}

function createpuzzle() {
    gameobjects.puzzle.size = gameobjects.player.level > 5 ? 6 : gameobjects.player.level + 1;
    gameobjects.puzzle.img = gameobjects.player.level > 10 ? random(1, 10) : gameobjects.player.level;
    gameobjects.puzzle.cells = [];
    for (let i = 0; i < gameobjects.puzzle.size; i++) {
        for (let j = 0; j < gameobjects.puzzle.size; j++) {
            gameobjects.puzzle.cells.push(randomfrom([90, 180, 270]));
        }
    }
    gameobjects.puzzle.timer = gameobjects.puzzle.size * gameobjects.puzzle.size * 5;
    timer();
}

function reset() {
    gameobjects.player.score = 0;
    gameobjects.player.level = 1;
    gameobjects.player.health = gameobjects.defaults.playerHealth;
    createpuzzle();
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
}

//====================================== GAME SPECIFIC CODE ONLY =========================================

function updatelogic() {
    if (gameobjects.keystate[13]) {
        gameobjects.holdtimer -= 1;
        if (gameobjects.holdtimer < 0) {
            gameobjects.gamestate = gameobjects.states.pause;
        }
    } else
        gameobjects.holdtimer = gameobjects.holddefault;
}