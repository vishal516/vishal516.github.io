"use strict";

var gameobjects = {
    "keyState": {},
    "ignoreEvent": false,
    "holdtime": 0,
    "canpick": false,
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
        "stopwatch": null
    },
    "meter": {
        "x": 60,
        "y": 150,
        "width": 70,
        "height": 1000 * 0.7,
        "color": "#ff60f3"
    },
    "player": {
        "level": 1,
        "score": 0,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
    },
    "grid": {
        "x": 0,
        "y": 30,
        "width": 800,
        "height": 700,
        "level": 1,
        "cells": [],
        "cell": {
            "x": 0,
            "y": 0,
            "width": 90,
            "height": 120
        },
        "pos": 0,
        "grid": {
            "col": 10,
            "row": 6,
            "total": 60,
            "type": 0,
            "matrix": '',
            "rowmax": 6,
            "colmax": 8,
        }
    },
    "selector": {
        "x": 0,
        "y": 0,
        "width": 120,
        "height": 120,
        "dir": 0,
        "element": null
    },
    "background": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000
    },
    "matcheffects": [],
    "matchfaileffects": null,
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
        'images/bat.png',
        //GUI
        'images/selector.png',
        'images/selectorh.png',
        'images/selectorv.png',
        'images/Font.png',
        'images/jfont.png',
        'images/directionh.png',
        'images/directionv.png',
        'images/gamelogo.png',
        'images/BtnPlayOn.png',
        'images/BtnInfoOn.png',
        'images/BtnPlayOn.png',
        'images/BtnSoundOn.png',
        'images/BtnSoundOff.png',
        'images/BtnRestartOn.png',
        'images/BtnExitOn.png',
        'images/Button.png',
        'images/hm/Cards/Card_1.png',
        'images/hm/Cards/Card_2.png',
        'images/hm/Cards/Card_3.png',
        'images/hm/Cards/Card_4.png',
        'images/hm/Cards/Card_5.png',
        'images/hm/Cards/Card_6.png',
        'images/hm/Cards/Card_7.png',
        'images/hm/Cards/Card_8.png',
        'images/hm/Cards/Card_9.png',
        'images/hm/Cards/Card_10.png',
        'images/hm/Cards/Card_11.png',
        'images/hm/Cards/Card_12.png',
        'images/hm/Cards/Card_13.png',
        'images/hm/Cards/Card_14.png',
        'images/hm/Cards/Card_15.png',
        'images/hm/Cards/Card_16.png',
        'images/hm/Cards/Card_17.png',
        'images/hm/Cards/Card_18.png',
        'images/hm/Cards/Card_19.png',
        'images/hm/Cards/Card_20.png',
        'images/hm/Cards/Card_21.png',
        'images/hm/Cards/Card_22.png',
        'images/hm/Cards/Card_23.png',
        'images/hm/Cards/Card_24.png',
        'images/hm/Cards/Card_25.png',
        'images/hm/Cards/Card_26.png',
        'images/hm/Cards/Card_27.png',
        'images/hm/Cards/Card_28.png',
        'images/hm/Cards/Card_29.png',
        'images/hm/Cards/Card_30.png',
        'images/hm/Cards/Card_31.png',
        'images/hm/Cards/Card_32.png',
        'images/hm/Cards/Card_33.png',
        'images/hm/Cards/Card_34.png',
        'images/hm/Cards/Card_35.png',
        'images/hm/Cards/Card_36.png',
        'images/hm/Cards/Card_37.png',
        'images/hm/Cards/Card_38.png',
        'images/hm/Cards/Card_39.png',
        'images/hm/Cards/CardS.png',
        'images/hm/Cards/Card.png',
        'images/target.png',
        'images/time.png',
        'images/score.png',
        'images/level.png',
        'images/statsbg.png',
        'images/arrows.png',
    ],
    "sounds": ['media/swap.ogg', 'media/match.m4a', 'media/score.m4a', 'media/button.m4a',
        'media/gamemusic.ogg',
        'media/card.m4a',
        'media/game_over.ogg',
        'media/level_completed.ogg',
        'media/match.ogg',
        'media/turn.m4a',
        'media/Button.m4a',
    ]
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
        "y": 0,
        "width": 1600 - 400 * 2 + 50,
        "height": 500
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
    "cellPreview": {
        "x": 1250,
        "y": 150,
        "width": 200,
        "height": 200 * 1.2,
    },

    "collectionPreview": {
        "x": 1250,
        "y": 580,
        "width": 200,
        "height": 200 * 1.2,
    },
    "directionPreview": {
        "x": 1280,
        "y": 320,
        "width": 120,
        "height": 120
    },
    "decoration": {
        "bubbles": new Array(40)
    },
    "btnPadding": 200,
    "pointerPadding": 40,
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

function cell(i, j, t) {
    gameobjects.grid.cell.height = gameobjects.grid.cell.width * 1.2;
    this.x = j * gameobjects.grid.cell.width + gameobjects.grid.x;
    this.y = i * gameobjects.grid.cell.height + gameobjects.grid.y;
    this.width = gameobjects.grid.cell.width;
    this.height = gameobjects.grid.cell.height;
    this.type = t + 1;
    this.image = img['Card_' + this.type];
    sound.card.play();
}

function matcheffect(cell) {
    this.x = cell.x;
    this.y = cell.y;
    this.width = cell.width;
    this.height = cell.height;
    this.image = cell.image;
    sound.match.play();
    createjs.Tween.get(this).to({
        x: GUI.collectionPreview.x,
        y: GUI.collectionPreview.y,
        width: GUI.collectionPreview.width,
        height: GUI.collectionPreview.height,
    }, 1000).call(function() {
        //var x = this;for (var i = 0; i < gameobjects.matcheffects.length; i++) {if (gameobjects.matcheffects[i] == x) gameobjects.matcheffects.splice(i, 1);}//uncomment if effect is selfdestructive
    });
}

function matchfaileffect(cell) {
    this.x = cell.x;
    this.y = cell.y;
    this.width = cell.width;
    this.height = cell.height;
    this.image = cell.image;
}



function raindrop() {
    this.x = randomFloat(0, 1600);
    this.y = random(1100, 2000);
    this.width = 100;
    this.height = 150;
    this.image = img.bat; //['Card_' + random(1, 6)];
    var x = this;
    var randomsize = random(20, 100);
    var randomsize2 = random(20, 100);
    createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(
        createjs.Tween.get(x, { paused: true, loop: true })
        .to({ y: -100, width: randomsize, height: randomsize }, 1000 * 5)
        .to({ y: 1100, width: randomsize2, height: randomsize2 }, 0)
    );
}