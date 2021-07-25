"use strict";

var gameobjects = {
    //==============================GAME SPECIFIC OBJECTS================================= 
    "keystate": [],
    "holdtimer": 40,
    "holddefault": 40,
    "slowupdate": 100,
    "selector": {
        "direction": 0,
        "tile": {
            "i": 0,
            "j": 0,
        },
        "color": 0,
        "c": 1,
    },

    "puzzle": {
        "size": 2,
        "dimention": 800,
        "cells": [],
        "timer": 0,
        "img": 1,
    },

    //=====================================================================================

    "paralax": {
        "x": 0,
        "y": 150,
        "width": 1600 * 1.5,
        "height": 500 * 1.5,
        "dir": -1,
        "speed": 2,
    },

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
        "playerHealth": 3,
    },
    "player": {
        "level": 1,
        "score": 0,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
        "health": 10,
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
        'images/images/puzzle1.png',
        'images/images/puzzle2.png',
        'images/images/puzzle3.png',
        'images/images/puzzle4.png',
        'images/images/puzzle5.png',
        'images/images/puzzle6.png',
        'images/images/puzzle7.png',
        'images/images/puzzle8.png',
        'images/images/puzzle9.png',
        'images/images/puzzle10.png',
        //GUI
        'images/jfont.png',
        //buttons
        'images/gamelogo.png',
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
        'media/Button.m4a',
        'media/gamemusic.webm',
        'media/rotate.webm',
        'media/win.webm',
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



function raindrop() {
    this.x = random(GUI.canvas.width + 100, GUI.canvas.width + 1100);
    this.y = randomFloat(0, GUI.canvas.height / 4);
    this.size = random(100, 200);
    this.width = this.size;
    this.height = this.size * 2 / 3;
    this.image = img.cloud;
    var x = this;
    createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(
        createjs.Tween.get(x, { paused: true, loop: true })
        .to({ x: -300 }, 1000 * 5)
        .to({ x: GUI.canvas.width + 100, }, 0)
    );
}