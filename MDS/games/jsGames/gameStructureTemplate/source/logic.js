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

function rightkey() {}

function downkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        if (gameobjects.player.health > 1) gameobjects.player.health -= 1;
        else gameover();
    }
}

function upkey() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        //
        gameobjects.player.score += 1;
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

}