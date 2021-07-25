"use strict";

var gameobjects = {
    //==============================
    "debug": {
        "a": ''
    },
    "paralax": {
        "x": 0,
        "y": 150,
        "width": 1600 * 1.5,
        "height": 500 * 1.5,
        "dir": -1
    },
    "tile": {
        "x": -300,
        "y": 500,
        "width": 300,
        "height": 600,
        "dir": -1,
        "count": 8,
        "container": [],
        "varience": 180,
        "varience2": 250,
        "speed": 1,
        "xmin": 450,
    },
    "bgStack": [{
            "x": 0,
            "y": 0,
            "width": 1600,
            "height": 1000,
        },
        {
            "x": 1600,
            "y": 1000, // 2.94,
            "width": 1600,
            "height": 1000,
        },
    ],
    "bgInitial": {
        "x": 1600,
        "y": 1000, //340, // 1000 / 2.94,
        "width": 1600,
        "height": 1000,
    },
    "selector": {
        "x": 0,
        "y": 0,
        "width": 300,
        "height": 600,
        "dir": 0,
        "element": null
    },
    "placeholder": null,
    "containers": {
        "carscontainer": [],
        "smokecontainer": [],
    },
    "startpoint": { x: 1700, y: 800 },
    //==============================
    "defaults": {
        "warnings": {
            "x": 600,
            "y": 500,
            "width": 600,
            "height": 100
        },
        "scoreunit": 20,
        "disableInput": false,
        "duration": 1000 * 5,
        "durationmin": 0,
        "durationmax": 1000 * 5,
        "time": 5,
        "stopwatch": null,
        "speed": 4,
        "tilespeed": 1
    },
    "player": {
        "x": 0,
        "y": 0,
        "default": {
            "x": 450,
            "y": 250,
        },
        "corners": {
            "start": {
                "x": 0,
                "y": 0,
                "width": 50,
                "height": 50,
            },
            "end": {
                "x": 0,
                "y": 0,
                "width": 50,
                "height": 50,
            },
        },
        "width": 200,
        "height": 200,
        "level": 1,
        "score": 0,
        "ready": false,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
        "animation": {
            "pattern": "ABCDEFGHIJ",
            "frame": 0
        },
        "death": 0,
        "speed": 0,
    },
    "background": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000,
    },
    "gamestate": "",
    "states": {
        "loading": "loading",
        "home": "home",
        "play": "play",
        "pause": "pause",
        "overpass": "overpass",
        "overfail": "overfail",
        "info": "info",
    },
    "images": [
        'images/background.jpg',
        'images/cara.png',
        'images/car1.png',
        'images/car2.png',
        'images/car3.png',
        'images/car4.png',
        'images/cardamaged.png',
        'images/particles.png',
        //GUI
        'images/gamelogo.png',
        'images/BtnPlayOn.png',
        'images/BtnInfoOn.png',
        'images/BtnPlayOn.png',
        'images/BtnSoundOn.png',
        'images/BtnSoundOff.png',
        'images/BtnRestartOn.png',
        'images/BtnExitOn.png',
        'images/Button.png',
        'images/jfont.png',
        'images/mountainbg.png',
        'images/blur.png',
        //Debug
        'images/pixel.png'
    ],

    "sounds": ['media/gamemusic.webm', 'media/Button.m4a', 'media/die.webm', 'media/car.webm', 'media/swoosh.webm', 'media/levelcomplete.m4a']
};
var GUI = {
    "canvas": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000
    },
    "homeScreen": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000,
        "xdir": 1,
        "ydir": 1,
        "speed": 200
    },
    "levelicon": {
        "x": 70,
        "y": 100,
        "width": 100,
        "height": 100,
        "icongap": 200,
        "child": {
            "x": 80,
            "y": 110,
            "size": 80
        }
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
    "btnPointer": {
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
        "bubblesLength": 5
    },
    "btnPadding": 200,
    "pointerPadding": 40,
    "startintro": {
        "text": '',
        "x": 0,
        "y": 200,
        "ready": false
    },
    "loading": true
};
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

function cell(i) {
    this.x = gameobjects.tile.x + i * gameobjects.tile.width;
    this.y = gameobjects.tile.y + gameobjects.tile.varience;
}

function playerdeatheffect() {
    this.x = gameobjects.player.x;
    this.y = gameobjects.player.y;
    var x = this;
    createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(createjs.Tween.get(x, {
        paused: true,
        loop: true
    }).to({
        x: -300
    }, 1000 * 5).to({
        x: GUI.canvas.width + 100
    }, 0));
}

function smoke() {
    this.x = gameobjects.player.x + 50;
    this.y = gameobjects.player.y + 50;
    this.radius = 0;
    this.img = img.particles;
    this.alpha = 1;
}

function raindrop() {
    this.x = random(GUI.canvas.width + 100, GUI.canvas.width + 1100);
    this.y = randomFloat(0, GUI.canvas.height / 4);
    this.width = 180;
    this.height = 120;
    this.image = img.cloud;
    var x = this;
    createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(createjs.Tween.get(x, {
        paused: true,
        loop: true
    }).to({
        x: -300
    }, 1000 * 5).to({
        x: GUI.canvas.width + 100
    }, 0));
}

function car(row) {
    this.x = gameobjects.startpoint.x;
    this.y = gameobjects.startpoint.y + row * gameobjects.tile.varience2;
    this.width = gameobjects.player.width;
    this.height = gameobjects.player.height;
    this.img = img['car' + random(1, 4)];
    this.producedchild = false;
    this.corners = {
        "start": {
            "x": 0,
            "y": 0,
            "width": 50,
            "height": 50,
        },
        "end": {
            "x": 0,
            "y": 0,
            "width": 50,
            "height": 50,
        },
    }
}

function carplaceholder() {
    this.x = gameobjects.startpoint.x;
    this.y = gameobjects.startpoint.y;
    this.width = 50;
    this.height = 50;
    this.img = img.pixel;
    this.producedchild = false;
}
gameobjects.placeholder = new carplaceholder();


function raindropeffect() {
    for (var i = 0; i < GUI.decoration.bubblesLength; i++) {
        GUI.decoration.bubbles.push(new raindrop());
    }
}