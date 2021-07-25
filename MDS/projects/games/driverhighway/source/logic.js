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
    gameobjects.player.level = 1;
    gameobjects.player.speed = gameobjects.defaults.speed;
    gameobjects.player.x = gameobjects.player.default.x;
    gameobjects.player.y = gameobjects.player.default.y;
    gameobjects.player.score = 0;
    console.log('new game');
    createcars();
    gameobjects.containers.carscontainer = [];
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
}

function updaterwithpause() {
    if (gameobjects.gamestate == gameobjects.states.play) {
        logic();
    }
}


function scoremanager() {
    gameobjects.player.lastscore = gameobjects.player.score;
    if (gameobjects.player.highscore < gameobjects.player.score) {
        gameobjects.player.highscore = gameobjects.player.score;
        localStorage.setItem('highscore', gameobjects.player.highscore);
        gameobjects.player.score = 0;
    }
}

//====================================GAME SPECIFIC==========================================================


function logic() {
    for (let i = 0; i < gameobjects.bgStack.length; i++) {
        if (gameobjects.bgStack[i].x <= -gameobjects.bgStack[i].width) {
            gameobjects.bgStack[i].x = gameobjects.bgStack[Math.abs(1 - i)].x + gameobjects.bgInitial.x;
            gameobjects.bgStack[i].y = gameobjects.bgStack[Math.abs(1 - i)].y + gameobjects.bgInitial.y;
            //gameobjects.bgStack[i].y = 1000;
            gameobjects.bgInitial.y;
        }
    }

    gameobjects.bgStack.forEach(element => {
        let speed = (gameobjects.player.score / 100 + 6);
        element.x -= (1600 / 1000) * speed;
        element.y -= speed;
    });

    movecars([...gameobjects.containers.carscontainer, gameobjects.placeholder, ...gameobjects.containers.smokecontainer]);

    if (gameobjects.placeholder.x < 1000) {
        gameobjects.placeholder.x = gameobjects.startpoint.x;
        gameobjects.placeholder.y = gameobjects.startpoint.y;
        createcars();
        gameobjects.player.score += 1;
    }
    dustbin(gameobjects.containers.carscontainer);
    colliderconnector([gameobjects.player, ...gameobjects.containers.carscontainer]);
    collisiondetection([gameobjects.player.corners.start, gameobjects.player.corners.end], gameobjects.containers.carscontainer, function() {
        gameover();
        gameobjects.gamestate = gameobjects.states.overfail;
    });

    smokeeffect();
}

function colliderconnector(arr) {
    arr.forEach(obj => {
        obj.corners.start.x = obj.x + obj.corners.start.width / 5;
        obj.corners.start.y = obj.y + obj.corners.start.height / 5;
        obj.corners.end.x = obj.x + obj.width - 70;
        obj.corners.end.y = obj.y + obj.height - 100;
    });
}

function collisiondetection(arra, arrb, func) {
    for (let i = 0; i < arra.length; i++) {
        for (let j = 0; j < arrb.length; j++) {
            let arrc = [arrb[j].corners.start, arrb[j].corners.end];
            for (let k = 0; k < arrc.length; k++) {
                if (checkIntersection(arra[i], arrc[k])) {
                    func();
                    return;
                }
            }

        }
    }
}

function createcars() {
    let newcars = [];
    for (var i = 0; i < 3; i++) {
        newcars.push(new car(i));
    }
    newcars.splice(random(0, 1), random(1, 2));
    gameobjects.containers.carscontainer.push(...newcars);
}

function slideup() {
    if (gameobjects.player.y > gameobjects.player.default.y - gameobjects.tile.varience) {
        gameobjects.player.y -= gameobjects.tile.varience;
        gameobjects.player.x += gameobjects.tile.varience * (1000 / 1600);
        sound.swoosh.play();
    }
}

function slidedown() {
    if (gameobjects.player.y < gameobjects.player.default.y + gameobjects.tile.varience) {
        gameobjects.player.y += gameobjects.tile.varience;
        gameobjects.player.x -= gameobjects.tile.varience * (1000 / 1600);
        sound.swoosh.play();
    }
}

function movecars(container) {
    container.forEach(element => {
        let speed = (gameobjects.player.score / 100 + 3);
        element.x -= (1600 / 1000) * speed;
        element.y -= speed;
    });
}

let animationinterval = 11

function smokeeffect() {
    if (animationinterval < 0) {
        if (gameobjects.containers.smokecontainer.length < 10) {
            gameobjects.containers.smokecontainer.push(new smoke());
            animationinterval = 11;
        }
    } else animationinterval -= 1;

    for (let i = 0; i < gameobjects.containers.smokecontainer.length; i++) {
        if (gameobjects.containers.smokecontainer[i].alpha > 0) {
            gameobjects.containers.smokecontainer[i].alpha -= 0.02;
            gameobjects.containers.smokecontainer[i].radius += 1;
        } else gameobjects.containers.smokecontainer.splice(i, 1);
    }
}

function dustbin(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].x < -arr[i].width)
            arr.splice(i, 1);
    }
}