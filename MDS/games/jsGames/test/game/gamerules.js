function updater() {
    fishCatched();
    moveplayer();

}

function initer() {
    init();
}


function renderer() {
    draw();
}

function init() {
    gameobjects.square.x = level.x + (level.width - gameobjects.square.width) / 2;
    gameobjects.square.y = level.y + (level.height - gameobjects.square.height) / 2;
    gameobjects.fish.x = level.x + (level.width - gameobjects.square.width) / 2;
    gameobjects.fish.y = level.y + (level.height - gameobjects.square.height) / 2;
    gameobjects.background.y = 200;
    gameobjects.background.x = level.x / 2;

    gameobjects.square.x = 0;
    gameobjects.background.x = level.width;
    img.fishing.x = 1000;
    createjs.Tween.get(gameobjects.square).to({ x: 1000 }, 1000).call(handleComplete);
    createjs.Tween.get(gameobjects.fish).to({ y: 200 }, 500, createjs.Ease.getPowIn(2.2));
    createjs.tween.get(gameobjects.background).to({ x: 0 }, 1000).call(handleComplete);


    function handleComplete() {
        console.log("Tween complete");
    }
}

function draw() {
    context.drawImage(img.Background, gameobjects.background.x, gameobjects.background.y, gameobjects.background.width, gameobjects.background.height);
    context.drawImage(img.electrio, gameobjects.fish.x, gameobjects.fish.y, gameobjects.fish.width, gameobjects.fish.height);
    context.drawImage(img.fishing, gameobjects.square.x, gameobjects.square.y, gameobjects.square.width, gameobjects.square.height);

}

function checkIntersection(rect1, rect2) {
    if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y)
        return false;
    return true;
}


function fishCatched() {
    if (checkIntersection(gameobjects.square, gameobjects.fish)) {
        if (!gameobjects.fish.catched) {
            console.log('fish catched ');
            gameobjects.fish.catched = true;
        }
    }
}


function moveplayer() {
    if (keyState[37]) {
        gameobjects.square.x -= canvas.width / 100;
    }
    if (keyState[38]) {
        gameobjects.square.y -= canvas.width / 100;
    }
    if (keyState[39]) {
        gameobjects.square.x += canvas.width / 100;
    }
    if (keyState[40]) {
        gameobjects.square.y += canvas.width / 100;
    }
    if (gameobjects.square.x + gameobjects.square.width > canvas.width)
        gameobjects.square.x = canvas.width - gameobjects.square.width;
    if (gameobjects.square.x < 0)
        gameobjects.square.x = 0;
    if (gameobjects.square.y + gameobjects.square.height > canvas.height)
        gameobjects.square.y = canvas.height - gameobjects.square.height;
    if (gameobjects.square.y < canvas.height / 3)
        gameobjects.square.y = canvas.height / 3;
}


function moveplayerFourDirectional() {

    if (keyState[37]) {
        gameobjects.square.x -= canvas.width / 100;
    }
    if (keyState[38]) {
        gameobjects.square.y -= canvas.width / 100;
    }
    if (keyState[39]) {
        gameobjects.square.x += canvas.width / 100;
    }
    if (keyState[40]) {
        gameobjects.square.y += canvas.width / 100;
    }
    if (gameobjects.square.x + gameobjects.square.width > canvas.width)
        gameobjects.square.x = canvas.width - gameobjects.square.width;
    if (gameobjects.square.x < 0)
        gameobjects.square.x = 0;
    if (gameobjects.square.y + gameobjects.square.height > canvas.height)
        gameobjects.square.y = canvas.height - gameobjects.square.height;
    if (gameobjects.square.y - gameobjects.square.height < 0)
        gameobjects.square.y = gameobjects.square.height;

}


var keyState = {};
window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);