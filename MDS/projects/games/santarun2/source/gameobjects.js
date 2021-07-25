"use strict";

var gameobjects = {
    //==============================GAME SPECIFIC OBJECTS================================= 
    "level": {
        "speed": 1,
        "speedmax": 10,
        "speedmin": 1,
        "groundcontainer": [],
        "housecontainer": [],
        "enemycontainer": [],
        "bulletcontainer": [],
        "enemybulletcontainer": [],
        "bombdropcontainer": [],
        "blastcontainer": [],
        "collectablecontainer": [],
        "tile": {
            "ground": {
                "x": 0,
                "y": 900,
                "width": 100,
                "height": 100,
                "count": 17
            },
            "house": {
                "x": 0,
                "y": 900,
                "width": 500,
                "height": 500,
                "count": 3
            }
        }
    },
    "enemy": {
        "x": 100,
        "y": 50,
        "width": 50,
        "height": 50,
        "count": 4
    },
    //======================================= SPRITESHEET ANIMATIONS ======================
    //=====================================================================================
    "paralax": {
        "x": 0,
        "y": 150,
        "width": 1600 * 1.5,
        "height": 500 * 1.5,
        "dir": -1,
        "speed": 2
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
        "playerHealth": 5,
        "ammo": 40
    },
    "player": {
        "x": 300,
        "y": 900 - 150,
        "width": 50,
        "height": 200,
        "level": 1,
        "score": 0,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
        "health": 10,
        "ammo": 10,
        "speed": 2,
        "jump": {
            "state": false,
            "height": 6,
            "speedfactor": 1
        },
        "animationframe": 0,
        "framelength": 11,
        "tilex": 1078 / 11,
        "tiley": 111,
        "imgpos": {
            "x": 60,
            "y": 10,
            "width": 100,
            "height": 20
        }
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
        //new
        'images/background.jpg',
        'images/bg.png',
        'images/Player/playerrun.png',

        //
        'images/cloud.png',
        //GUI
        'images/Font.png',
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
        'images/button.png',
        //============================================= GAME PLAY ASSETS =====================================
        'images/road.png',
        'images/house/house1.png',
        'images/house/house2.png',
        'images/house/house3.png',
        'images/house/house4.png',
        'images/house/house5.png',
        'images/enemies/seel.png',
        'images/enemies/panguslide.png',
        'images/enemies/Walk/enemy50.png',
        'images/enemies/Walk/enemy51.png',
        'images/enemies/Walk/enemy52.png',
        'images/enemies/Walk/enemy53.png',
        'images/enemies/Walk/enemy54.png',
        'images/enemies/Walk/enemy55.png',
        'images/Player/Run/player0.png',
        'images/Player/Run/player1.png',
        'images/Player/Run/player2.png',
        'images/Player/Run/player3.png',
        'images/Player/Run/player4.png',
        'images/enemies/shooter.png',
        'images/enemies/crow/crow0.png',
        'images/enemies/crow/crow1.png',
        'images/enemies/crow/crow2.png',
        'images/enemies/crow/crow3.png',
        'images/enemies/crow/crow4.png',
        'images/enemies/crow/crow5.png',
        'images/enemies/bomb.png',
        'images/enemies/smoke.png',
        'images/enemies/cart.png',
        'images/bullet.png',
        'images/bullet1.png',
        'images/ammopickup.png',
        'images/healthpickup.png',
        //============================================ DEBUGGING ASSETS ====================================
        'images/pixel.png'
    ],
    "sounds": ['media/Button.m4a', 'media/gamemusic.ogg', 'media/gameover.ogg', //============================================ SPECIFIC ============================================
        'media/ammo.ogg', 'media/life.ogg', 'media/crow.ogg', 'media/jump.ogg', 'media/hit.ogg', 'media/noammo.ogg', 'media/shot.ogg', 'media/blast.ogg'
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
        "bubblesLength": 10
    },
    "pointerPadding": 40
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
    createjs.Tween.get(x).wait(random(0, 1000 * 9)).play(createjs.Tween.get(x, {
        paused: true,
        loop: true
    }).to({
        x: -300
    }, 1000 * 5).to({
        x: GUI.canvas.width + 100
    }, 0));
} //enable rain effect if required


function raindropeffect() {
    for (var i = 0; i < GUI.decoration.bubblesLength; i++) {
        GUI.decoration.bubbles.push(new raindrop());
    }
} //============================== CREATE GAME SPECIFIC ITEMS HERE =================================


function houseConstructor() {
    //intermittent bg items of different sizes
    this.x = 500;
    this.type = random(1, 5);
    var x = this;

    this.width = function() {
        if (x.type == 1) return 1 * 300;
        if (x.type == 2) return 1 * 350;
        if (x.type == 3) return 1 * 400;
        if (x.type == 4) return 1 * 320;
        if (x.type == 5) return 1 * 320;
    }();

    this.height = function() {
        if (x.type == 1) return 1 * 100;
        if (x.type == 2) return 1 * 150;
        if (x.type == 3) return 1 * 350;
        if (x.type == 4) return 1 * 350;
        if (x.type == 5) return 1 * 350;
    }();

    this.img = img['house' + this.type];
    this.y = 900 - this.height;
}

function enemyConstructor() {
    this.type = random(2, 7);
    this.damageplayer = true;
    var x = this;

    this.width = function() {
        if (x.type == 1) return 250;
        if (x.type == 2) return 120;
        if (x.type == 3) return 100;
        if (x.type == 4) return 70;
        if (x.type == 5) return 70;
        if (x.type == 6) return 150;
        if (x.type == 7) return 50;
    }();

    this.height = function() {
        if (x.type == 1) return 140;
        if (x.type == 2) return 150;
        if (x.type == 3) return 100;
        if (x.type == 4) return 150;
        if (x.type == 5) return 150;
        if (x.type == 6) return 70;
        if (x.type == 7) return 50;
    }();

    this.img = function() {
        if (x.type == 1) return ['pixel'];
        if (x.type == 2) return ['cart'];
        if (x.type == 3) return ['crow0', 'crow1', 'crow2', 'crow3'];
        if (x.type == 4) return ['seel'];
        if (x.type == 5) return ['enemy50', 'enemy51', 'enemy52', 'enemy53', 'enemy54', 'enemy55'];
        if (x.type == 6) return ['panguslide'];
        if (x.type == 7) return ['button'];
    }();

    this.imgpos = function() {
        if (x.type == 1) return {
            x: 10,
            y: 10,
            width: 20,
            height: 20
        };
        if (x.type == 2) return {
            x: 40,
            y: 0,
            width: 80,
            height: 0,
        };
        if (x.type == 3) return {
            x: 10,
            y: 10,
            width: 20,
            height: 20
        };
        if (x.type == 4) return {
            x: 60,
            y: 10,
            width: 80,
            height: 20
        };
        if (x.type == 5) return {
            x: 20,
            y: 0,
            width: 40,
            height: 0,
        };
        if (x.type == 6) return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        if (x.type == 7) return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
    }();

    this.animationframe = 0;

    this.x = function() {
        var max = 0;

        for (var i = 0; i < gameobjects.level.enemycontainer.length; i++) {
            var newmax = gameobjects.level.enemycontainer[i].x + gameobjects.level.enemycontainer[i].width;
            if (newmax > max) max = newmax;
        }

        return max;
    }() + random(GUI.canvas.width / 2, GUI.canvas.width);

    this.y = function() {
        let center = GUI.canvas.height / 2;
        if (x.type == 1) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 2) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 3) return center;
        if (x.type == 4) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 5) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 6) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 7) return random(center, center + 200);
    }();

    gameobjects.level.tile.ground.y - this.height;

    this.speed = function() {
        if (x.type == 1) return 0;
        if (x.type == 2) return 0;
        if (x.type == 3) return 2;
        if (x.type == 4) return 0;
        if (x.type == 5) return 2;
        if (x.type == 6) return 7;
        if (x.type == 7) return 7;
    }();

    this.health = function() {
        if (x.type == 1) return 0;
        if (x.type == 2) return 0;
        if (x.type == 3) return 0;
        if (x.type == 4) return 0;
        if (x.type == 5) return 0;
        if (x.type == 6) return 0;
        if (x.type == 7) return 0;
    }();

    this.attacktime = function() {
        if (x.type == 1) return 1000;
        if (x.type == 2) return 1000;
        if (x.type == 3) return 30;
        if (x.type == 4) return 30;
        if (x.type == 5) return 1000;
        if (x.type == 6) return 1000;
        if (x.type == 7) return 1000;
    }();

    this.attacktimeinitial = function() {
        if (x.type == 1) return 1000;
        if (x.type == 2) return 1000;
        if (x.type == 3) return 200;
        if (x.type == 4) return 100;
        if (x.type == 5) return 1000;
        if (x.type == 6) return 1000;
        if (x.type == 7) return 1000;
    }();

    this.damageble = function() {
        if (x.type == 2) return false;
        else return true;
    }();

    this.fly = function() {
        if (x.type == 3 || x.type == 7) return true;
        else return false;
    }();

    this.damage = true;
}

function bulletConstructor(rect, dir) {
    this.x = rect.x + rect.width * dir;
    this.y = rect.y + rect.height * 0.6;
    this.width = 40;
    this.height = 20;
    this.dir = dir * (gameobjects.player.speed + gameobjects.player.level);
    sound.shot.play();
}

function bombdropConstructor(recta) {
    this.x = recta.x + recta.width / 2;
    this.y = recta.y + recta.height;
    this.width = 50;
    this.height = 50;
    sound.crow.play();
}

function blastConstructor(recta) {
    var height = recta.height * 1.5;
    this.x = recta.x;
    this.y = gameobjects.level.tile.ground.y - height;
    this.width = height;
    this.height = height;
    this.frame = 1;
    this.framemax = 16;
    this.tilex = 2858 / 16;
    this.tiley = 137;
}

function collectableConstructor(rect) {
    this.x = rect.x;
    this.y = gameobjects.level.tile.ground.y - 80;
    this.height = 80;
    this.width = 80;
    this.type = 2; // random(1, 2);
    this.img = null;
    var x = this;

    if (this.type == 1) {
        this.img = img.ammopickup;
    }

    if (this.type == 2) {
        this.img = img.healthpickup;
    }

    this.collect = function() {
        if (x.type == 1) {
            gameobjects.player.ammo += 10;
            sound.ammo.play();
        }

        if (x.type == 2) {
            gameobjects.player.health += 2;
            sound.life.play();
        }
    };
}