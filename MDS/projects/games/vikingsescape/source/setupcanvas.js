"use strict";

var lastgamestate = 'home';
window.addEventListener('blur', function() {
    lastgamestate = gameobjects.gamestate;
    gameobjects.gamestate = gameobjects.states.pause;
    sound.gamemusic.pause();
});
window.addEventListener('focus', function() {
    gameobjects.gamestate = lastgamestate;
    sound.gamemusic.loop = true;
    sound.gamemusic.play();
});

window.onload = function() {
    resizeCanvas();
    setTimeout(function() {
        canvas.style.display = 'block'; //document.getElementById('loader').remove();

        document.getElementById('loader').style.display = 'none';
        gameready();
    }, 2000);
};

window.onresize = function() {
    resizeCanvas();
};

var canvas;
var context;
Canvas2D();

function Canvas2D() {
    canvas = document.getElementById("viewport");
    context = canvas.getContext("2d");
}

var level = {
    x: 1,
    y: 65,
    width: canvas.width - 2,
    height: canvas.height - 66
};

function resizeCanvas() {
    canvas.style.height = window.innerHeight + 'px';
    canvas.style.width = window.innerWidth + 'px';
}

var canvas2d = new Canvas2D(); //resizeCanvasKeepAR();

function resizeCanvasKeepAR() {
    widthToHeight = window.innerWidth / window.innerHeight;
    widthToHeightIdeal = 16 / 10; //window.screen.width / window.screen.height;

    state = widthToHeight > widthToHeightIdeal ? 'wider' : 'higher';

    if (widthToHeight > widthToHeightIdeal) {
        canvas.style.height = window.innerHeight + 'px';
        canvas.style.width = window.innerHeight * widthToHeightIdeal + 'px';
        canvas.style.marginLeft = (window.innerWidth - window.innerHeight * widthToHeightIdeal) / 2 + 'px';
        canvas.style.marginTop = 0 + 'px';
    } else {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerWidth / widthToHeightIdeal + 'px';
        canvas.style.marginTop = (window.innerHeight - window.innerWidth / widthToHeightIdeal) / 2 + 'px';
        canvas.style.marginLeft = 0 + 'px';
    }
}