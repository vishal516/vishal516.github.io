"use strict";

function updater() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        updatelogic();
    }
}

function renderer() {
    renderUI();
}

function leftkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        gameobjects.player.pos -= gameobjects.player.pos > 0 ? 1 : 0;
        sound.slide.play();
    }
}

function rightkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        gameobjects.player.pos += gameobjects.player.pos < 4 ? 1 : 0;
        sound.slide.play();
    }
}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        //
    }
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        //
    }
}

function enterkey() { //
    //if (gameobjects.gamestate == gameobjects.states.play)
}

function spacekeyDebug() {
    //debug
}

function reset() {
    gameobjects.player.score = 0;
    gameobjects.player.health = gameobjects.defaults.playerHealth;
    gameobjects.containers.bricks = [];
    createbricks();
}

function startgame() {
    gameobjects.gamestate = gameobjects.states.play;
}

function gameover() {
    gameobjects.gamestate = gameobjects.states.overfail;
    scoremanager();
    sound.gameover.play();
}

function startnewgame() {
    reset();
    startgame();
}

function scoremanager() {
    gameobjects.player.lastscore = gameobjects.player.score;
    if (gameobjects.player.highscore < gameobjects.player.score) {
        gameobjects.player.highscore = gameobjects.player.score;
        localStorage.setItem('hs', gameobjects.player.highscore);
    }
}

function addscore() {
    gameobjects.player.score += gameobjects.defaults.scoreunit;
}

//====================================== GAME SPECIFIC CODE ONLY =========================================

function createbricks() {
    gameobjects.containers.row = [];
    for (let i = 0; i < 8; i++) {
        let thisrow = new row();
        thisrow.y = 850 + i * gameobjects.bricks.size.y;
        gameobjects.containers.row.push(thisrow);
    }
    if (gameobjects.containers.row[0].type[gameobjects.player.pos] === gameobjects.player.color)
        gameobjects.player.pos = randomexcept(0, 4, gameobjects.player.pos);
}

function updatelogic() {

    gameobjects.bricks.player.y = gameobjects.containers.row[0].y;

    if (gameobjects.bricks.player.y < gameobjects.bricks.size.y) {
        gameover();
    }

    if (gameobjects.containers.row.length > 0 && gameobjects.player.score > 0) {
        let speed = (2 + gameobjects.player.score / 100)
        gameobjects.containers.row.forEach(item => item.y -= speed);
    }
    resolverows();
}


function resolverows() {
    let top = gameobjects.containers.row[0].y + gameobjects.bricks.size.y * 1;
    if (top < GUI.canvas.height && gameobjects.containers.row[0].type[gameobjects.player.pos] === gameobjects.player.color) {
        gameobjects.containers.row.splice(0, 1);
        let thisrow = new row();
        thisrow.y = gameobjects.containers.row[gameobjects.containers.row.length - 1].y + gameobjects.bricks.size.y;
        gameobjects.containers.row.push(thisrow);
        if (randomBool(true, false)) {
            gameobjects.player.color = random(0, 4);
        }
        addscore();
        sound.resolve.play();
        //setTimeout(resolverows, 400);
    }
}