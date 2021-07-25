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
        gameobjects.player.pos += gameobjects.player.pos < 3 ? 1 : 0;
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
        gameobjects.defaults.start = true;
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
    if (gameobjects.player.score >= 20 && gameobjects.player.gravity != 0.2) {
        gameobjects.player.jump.sfdefault = 5;
        gameobjects.player.gravity = 0.2;
    }
}

//====================================== GAME SPECIFIC CODE ONLY =========================================


function createbricks() {
    gameobjects.containers.row = [];
    for (let i = 0; i < 8; i++) {
        let thisrow = new row();
        thisrow.y = 1000 - i * (gameobjects.bricks.size.y + gameobjects.bricks.gap);
        gameobjects.containers.row.push(thisrow);
    }
    gameobjects.player.color = 0; // random(0, 3);
    gameobjects.containers.row[1].type = [0, 0, 0, 0];
    gameobjects.bricks.player.y = gameobjects.bricks.bottom;
    gameobjects.defaults.start = false;

    gameobjects.player.jump.sfdefault = 4;
    gameobjects.player.gravity = 0.1;

}

function updatelogic() {
    gameobjects.player.shadowpos -= (gameobjects.player.shadowpos - gameobjects.player.pos) * 0.2;
    if (gameobjects.containers.row.length > 0 && gameobjects.defaults.start) {

        if (gameobjects.bricks.player.y > gameobjects.bricks.bottom) {
            gameobjects.player.jump.speedfactor = gameobjects.player.jump.sfdefault;
            gameobjects.bricks.player.y = gameobjects.bricks.bottom;
            resolveb();
            if (gameobjects.containers.row[0].type[gameobjects.player.pos] === gameobjects.player.color) {
                addscore();
            } else {
                if (gameobjects.containers.row[0].modifier !== 4) {
                    gameobjects.player.color = gameobjects.containers.row[0].modifier;
                } else gameover();
            }
        } else {
            gameobjects.player.jumpvalue = gameobjects.player.jump.speedfactor * Math.abs(gameobjects.player.jump.speedfactor);
            gameobjects.bricks.player.y -= gameobjects.player.jumpvalue;
            //if (gameobjects.containers.row[1].y < gameobjects.bricks.bottom) 
            gameobjects.containers.row.forEach(i => i.y +=
                (gameobjects.bricks.bottom - gameobjects.containers.row[1].y) / gameobjects.player.jumpvalue
            );
            gameobjects.player.jump.speedfactor -= gameobjects.player.gravity; // gameobjects.player.jump.sfdefault * 0.04; // 
        }
    }
}

function resolveb() {
    gameobjects.containers.row.splice(0, 1);
    let thisrow = new row();
    thisrow.y = gameobjects.containers.row[gameobjects.containers.row.length - 1].y - gameobjects.bricks.size.y - gameobjects.bricks.gap;
    gameobjects.containers.row.push(thisrow);

}