"use strict";

var gameobjects = {
    "keyState": [],
    "holdtime": 0,
    "canpick": false,
    "ignoreEvent": false,
    "defaults": {
        "warnings": {
            "x": 600,
            "y": 500,
            "width": 600,
            "height": 100
        },
        "scorepercell": 10,
        "disableInput": false,
        "duration": 1000 * 5,
        "durationmin": 0,
        "durationmax": 1000 * 5
    },
    "meter": {
        "x": 60,
        "y": 150,
        "width": 70,
        "height": 1000 * 0.7,
        "color": "#ff60f3"
    },
    "player": {
        "score": 0,
        "highscore": 0,
        "lastscore": 0
    },
    "grid": {
        "x": 0,
        "y": 0,
        "width": 1500,
        "height": 800,
        "cells": [],
        "cell": {
            "x": 0,
            "y": 0,
            "width": 120,
            "height": 120
        },
        "pos": 0,
        "grid": {
            "col": 10,
            "row": 6,
            "total": 60
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
    "images": ['images/j1.png', 'images/j2.png', 'images/j3.png', 'images/j4.png', 'images/j5.png', 'images/j6.png', 'images/j6.png', 'images/background.jpg', 'images/selector.png', 'images/selectorh.png', 'images/selectorv.png', 'images/Font.png', 'images/jfont.png', 'images/chessmap.png', 'images/directionh.png', 'images/directionv.png', 'images/block.png', //GUI
        'images/gamelogo.png', 'images/meter.png', 'images/BtnPlayOn.png', 'images/BtnInfoOn.png', 'images/BtnPlayOn.png', 'images/BtnSoundOn.png', 'images/BtnSoundOff.png', 'images/BtnRestartOn.png', 'images/BtnExitOn.png', 'images/Button.png'
    ],
    "sounds": ['media/swap.ogg', 'media/match.m4a', 'media/score.m4a', 'media/button.m4a', 'media/gamemusic.ogg']
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
        "y": 50,
        "width": 1600 - 350 * 2,
        "height": 400
    },
    "cellPreview": {
        "x": 1420,
        "y": 400,
        "width": 120,
        "height": 120
    },
    "directionPreview": {
        "x": 1420,
        "y": 550,
        "width": 120,
        "height": 120
    },
    "decoration": {
        "bubbles": new Array(40)
    },
    "btnPadding": 200,
    "pointerPadding": 40,
    "loading": true
}; //this image object contains all images by names

var img = loadImages(gameobjects.images);
var sound = loadSound(gameobjects.sounds);
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

function cell(i, j) {
    this.type = random(1, 6);
    this.y = i * gameobjects.grid.cell.height + gameobjects.grid.y;
    this.x = j * gameobjects.grid.cell.width + gameobjects.grid.x;
    this.height = gameobjects.grid.cell.height;
    this.width = gameobjects.grid.cell.width;
    this.image = img['j' + this.type];
    createjs.Tween.get(this).play(createjs.Tween.get(this, {
        paused: true,
        loop: true
    }).to({
        width: this.width + 5
    }, 500, createjs.Ease.quadOut).to({
        width: this.width
    }, 500, createjs.Ease.quadOut));
    sound.score.play();
}

function matcheffect(cell) {
    this.x = cell.x;
    this.y = cell.y;
    this.width = cell.width;
    this.height = cell.height;
    this.image = cell.image;
    createjs.Tween.get(this).to({
        alpha: 0,
        x: 750,
        y: 0
    }, 1000).call(function() {
        var x = this;

        for (var i = 0; i < gameobjects.matcheffects.length; i++) {
            if (gameobjects.matcheffects[i] == x) gameobjects.matcheffects.splice(i, 1);
        }
    });
}

var a = 0;

function raindrop() {
    this.x = randomFloat(0, 1600);
    this.y = random(-100, -1000);
    this.width = 100;
    this.height = 100;
    this.image = img['j' + random(1, 6)];
}

gameobjects.grid.width = gameobjects.grid.grid.col * gameobjects.grid.cell.width;
gameobjects.grid.height = gameobjects.grid.grid.row * gameobjects.grid.cell.height;