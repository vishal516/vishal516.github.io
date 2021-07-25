"use strict";

var gameobjects = {
    //==============================GAME SPECIFIC OBJECTS================================= 



    //=====================================================================================


    "defaults": {
        "warnings": {
            "x": 600,
            "y": 500,
            "width": 600,
            "height": 100
        },
        "scoreunit": 1,
        "disableInput": false,
        "duration": 1000 * 5,
        "durationmin": 0,
        "durationmax": 1000 * 5,
        "time": 5,
        "stopwatch": null,
        "playerHealth": 3,
        "speed": 2,
        "start": false,
    },
    "player": {
        "level": 1,
        "score": 0,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
        "health": 10,
        "pos": 0,
        "shadowpos": 0,
        "color": 0,
        "speed": 1,
        "gravity": 0.2, //0.2, 0.1,
        "jump": {
            "state": false,
            "height": 7,
            "speedfactor": 4,
            "sfdefault": 5, //4,
        },
        "jumpvalue": 0
    },

    "bricks": {
        "row": {
            "x": 100,
            "y": 800,
        },
        "bricks": {
            "x": 100,
            "y": 0,
        },
        "size": {
            "x": 0,
            "y": 0,
        },
        "tweensize": {
            "x": 0,
            "y": 0,
        },
        "player": {
            "x": 0,
            "y": 0,
        },
        "playershadow": {
            "x": 0,
            "y": 0,
        },
        "gap": 300,
        "topindex": 1,
        "bottomindex": 1,
        "top": 1,
        "bottom": 700,
        "resolvable": false,
        "colors": ['#008db6', '#fdb323', '#38e62f', '#ee412f']
    },

    "containers": {
        "row": [],
        "col": [],
        "bricks": [],
    },

    "background": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000
    },
    "gamestate": "",
    "states": {
        "loading": "loading",
        "home": "home",
        "play": "play",
        "pause": "pause",
        "overpass": "overpass",
        "overfail": "overfail",
        "info": "info"
    },


    "images": [
        'images/background.jpg',
        'images/pixel.png',

        //GUI
        //buttons
        'images/BtnPlayOn.png',
        'images/BtnInfoOn.png',
        'images/BtnPlayOn.png',
        'images/BtnSoundOn.png',
        'images/BtnSoundOff.png',
        'images/BtnRestartOn.png',
        'images/BtnExitOn.png',
        'images/Button.png',
        //
    ],
    "sounds": [
        'media/Button.mp3',
        'media/gamemusic.mp3',
        'media/slide.mp3',
        'media/gameover.mp3',
        'media/resolve.mp3',
    ]
};
var GUI = {
    "canvas": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000
    },

    "gamelogo": {
        "x": 400,
        "y": 150,
        "width": 1600 - 300 * 2 - 50,
        "height": 300
    },
    "playMenu": {
        "x": 0,
        "y": 500,
        "width": 400,
        "height": 400
    },
    "pauseMenu": {
        "x": 0,
        "y": 500,
        "width": 400,
        "height": 400
    },
    "btnPlay": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150
    },
    "btnSound": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150
    },
    "btnInfo": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150
    },
    "btnCommon": {
        "x": 50,
        "y": 50,
        "width": 150,
        "height": 150
    },

    "levelup": {
        "x": 350,
        "y": 1100,
        "width": 1600 - 350 * 2,
        "height": 400
    },

    "decoration": {
        "bubbles": [],
        "bubblesLength": 10,
    },

    "pointerPadding": 40,
};

gameobjects.player.highscore = localStorage.getItem('hs');
var img = loadImages(gameobjects.images); //this image object contains all images by names
var sound = loadSound(gameobjects.sounds); //this sound object contains all sounds by names
var homeScreenButtonList = [img.BtnPlayOn, img.BtnInfoOn, img.BtnSoundOn];
var pauseScreenButtonList = [img.BtnPlayOn, img.BtnRestartOn, img.BtnExitOn, img.BtnSoundOn];
var homeScreenPointerPos = 0;
var pauseScreenPointerPos = 0;
var globalsound = true;
var loadcount = 0;
var loadtotal = 0;
var preloaded = false; // Load images

function loadImages(imagefiles) {
    preloaded = false;
    var loadedimages = [];
    var imagesD = {};

    for (var i = 0; i < imagefiles.length; i++) {
        var image = new Image();

        image.onload = function() {
            loadcount += 1;

            if (loadcount == imagefiles.length) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
        imagesD[image.src.split('/')[image.src.split('/').length - 1].split('.')[0]] = image;
    }
    return imagesD;
}

function loadSound(soundfiles) {
    var loadedSound = [];
    var loadedSoundD = {};

    for (var i = 0; i < soundfiles.length; i++) {
        var s = new Audio(soundfiles[i]);
        loadedSound[i] = s;
        loadedSoundD[s.src.split('/')[s.src.split('/').length - 1].split('.')[0]] = s;
    }

    return loadedSoundD;
}

function handleGlobalSound() {
    globalsound = !globalsound;

    if (!globalsound) {
        sound.gamemusic.pause();
        sound.gamemusic.currentTime = 0;
    } else {
        sound.gamemusic.play();
    }

    Object.keys(sound).forEach(function(key) {
        globalsound ? sound[key].volume = 1 : sound[key].volume = 0;
    });
}

gameobjects.bricks.size.x = (GUI.canvas.width - 200) / 4;
gameobjects.bricks.size.y = 100; // 200 * 2 / 3;
gameobjects.bricks.tweensize.x = gameobjects.bricks.size.x;
gameobjects.bricks.tweensize.y = gameobjects.bricks.size.y;
brickstween();


function raindrop() {
    this.x = random(100, GUI.canvas.width - 100 - (GUI.canvas.width - 200) / 5); // random(GUI.canvas.width + 100, GUI.canvas.width + 1100);
    this.y = randomFloat(-200, -500);
    this.size = 200;
    this.width = (GUI.canvas.width - 200) / 5;
    this.height = this.size * 2 / 3;
    var x = this;
    createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(
        createjs.Tween.get(x, { paused: true, loop: true })
        .to({ y: -300 }, 1000).to({ y: GUI.canvas.height + 100, }, 1000 * 4)
    );
}

//enable rain effect if required
function raindropeffect() {
    for (var i = 0; i < GUI.decoration.bubblesLength; i++) {
        GUI.decoration.bubbles.push(new raindrop());
    }
}

function row() {
    this.y = 1100;
    this.x = 100;
    let a = 4;
    if (random(1, 5) === a) {
        a = random(0, 3)
        this.type = [a, a, a, a];
    } else {
        this.type = randomizeArray([0, 1, 2, 3]);
    }
    this.modifier = a;
    //console.log(this);
}


function brickstween() {
    createjs.Tween.get(gameobjects.bricks.tweensize).play(createjs.Tween.get(gameobjects.bricks.tweensize, {
        paused: true,
        loop: true
    }).to({
        x: gameobjects.bricks.tweensize.x + 4,
        y: gameobjects.bricks.tweensize.y + 4
    }, 500, createjs.Ease.quadOut).to({
        x: gameobjects.bricks.tweensize.x,
        y: gameobjects.bricks.tweensize.y
    }, 500, createjs.Ease.quadOut));
    console.log('brickstween');

    // createjs.Tween.get(GUI.gamelogo).play(createjs.Tween.get(GUI.gamelogo, {
    //     paused: true,
    //     loop: true
    // }).to({
    //     x: GUI.gamelogo.x - 10
    // }, 500, createjs.Ease.quadOut).to({
    //     x: GUI.gamelogo.x
    // }, 500, createjs.Ease.quadOut));
}