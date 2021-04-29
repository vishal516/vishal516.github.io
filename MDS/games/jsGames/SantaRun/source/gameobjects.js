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
                "yshow": 800,
                "width": 1000,
                "height": 200,
                "count": 3
            },
            "house": {
                "x": 0,
                "y": 800,
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
        "width": 200,
        "height": 350,
        "level": 1,
        "score": 0,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
        "health": 10,
        "ammo": 10,
        "speed": 2,
        "gravity": 1 / 2,
        "jump": {
            "state": false,
            "height": 9,
            "speedfactor": 10
        },
        "shoot": {
            "state": false,
            "time": 9,
        },
        "animationframe": 0,
        "framelength": 19,
        "tilex": 5000 / 19,
        "tiley": 271,
        "imgpos": {
            "x": 40,
            "y": 30,
            "width": 100,
            "height": 60
        }
    },
    "background": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000,
        "layer2": {
            "x": 0,
            "y": 200,
            "width": 1600,
            "height": 500,
        },
        "layer3": {
            "x": 0,
            "y": 200,
            "width": 1600,
            "height": 900,
        }
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
    "images": ['images/background.jpg',
        'images/cloud.png',
        //GUI
        'images/Font.png',
        'images/jfont.png',

        //buttons
        'images/gamelogo.png',
        'images/BtnInfoOn.png',
        'images/BtnPlayOn.png',
        'images/BtnSoundOn.png',
        'images/BtnSoundOff.png',
        'images/BtnRestartOn.png',
        'images/BtnExitOn.png',
        'images/Button.png',
        //============================================= GAME PLAY ASSETS =====================================
        'images/road.png',
        'images/fog.png',
        'images/bg3.png',
        'images/bg2.png',
        'images/house/house10.png',
        'images/house/house20.png',
        'images/house/house30.png',
        'images/house/house40.png',
        'images/house/house50.png',
        'images/house/house11.png',
        'images/house/house21.png',
        'images/house/house31.png',
        'images/house/house41.png',
        'images/house/house51.png',

        'images/Player/santaspritesheet.png',
        'images/Player/santashootss.png',
        'images/Player/santajump.png',

        'images/enemies/deerss.png',
        'images/enemies/snowmanss.png',
        'images/enemies/cookiess.png',
        'images/enemies/elfss.png',
        'images/enemies/bomb.png',
        'images/enemies/smoke.png',
        'images/enemies/cart.png',
        'images/enemies/cart2.png',
        'images/snowball.png',
        'images/ammopickup.png',
        'images/healthpickup.png',
        //============================================ DEBUGGING ASSETS ====================================
        //'images/pixel.png'
    ],
    "sounds": ['media/Button.m4a', 'media/gamemusic.ogg', 'media/gameover.ogg', //============================================ SPECIFIC ============================================
        'media/ammo.ogg', 'media/life.ogg',
        'media/jump.ogg', 'media/shot.ogg', 'media/hit.ogg', 'media/hit2.ogg'
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
        image.src = imagefiles[i];
        image.onload = function(e) {
            loadcount += 1;
            console.log(e.path[0].outerHTML);
            if (loadcount == imagefiles.length) {
                preloaded = true;
            }
        };


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
        if (x.type == 1) return 4 * 100;
        if (x.type == 2) return 4 * 200;
        if (x.type == 3) return 4 * 230;
        if (x.type == 4) return 4 * 150;
        if (x.type == 5) return 4 * 120;
    }();

    this.height = function() {
        if (x.type == 1) return 4 * 100;
        if (x.type == 2) return 4 * 200;
        if (x.type == 3) return 4 * 230;
        if (x.type == 4) return 4 * 150;
        if (x.type == 5) return 4 * 160;
    }();

    this.img = img['house' + this.type + random(0, 1)];
    this.y = gameobjects.level.tile.ground.yshow - this.height;
}

function enemyConstructor() {
    this.type = random(2, 6);
    this.damageplayer = true;
    this.damageble = true;
    var x = this;

    this.width = function() {
        if (x.type == 1) return 250;
        if (x.type == 2) return 120;
        if (x.type == 3) return 200;
        if (x.type == 4) return 200;
        if (x.type == 5) return 200;
        if (x.type == 6) return 250;
    }();

    this.height = function() {
        if (x.type == 1) return 140;
        if (x.type == 2) return 200;
        if (x.type == 3) return 300;
        if (x.type == 4) return 300;
        if (x.type == 5) return 300;
        if (x.type == 6) return 350;
    }();

    this.img = function() {
        if (x.type == 1) return ['death'];
        if (x.type == 2) {
            x.damageble = false;
            return {
                img: function() { var imgs = ['cart', 'cart2']; return imgs[random(0, 1)] }(),
                animationframe: 0,
                totalframes: 1,
                tilex: 496,
                tiley: 420,
                x: 0,
                y: 30,
                width: 100,
                height: 50,
            };
        };
        if (x.type == 3) return {
            img: 'snowmanss',
            animationframe: 0,
            totalframes: 22,
            tilex: 4999 / 22,
            tiley: 253,
            x: 50,
            y: 30,
            width: 70,
            height: 50
        };
        if (x.type == 4) return {
            img: 'cookiess',
            animationframe: 0,
            totalframes: 22,
            tilex: 4999 / 22,
            tiley: 269,
            x: 50,
            y: 30,
            width: 70,
            height: 50
        };
        if (x.type == 5) return {
            img: 'elfss',
            animationframe: 0,
            totalframes: 22,
            tilex: 4999 / 22,
            tiley: 272,
            x: 50,
            y: 30,
            width: 70,
            height: 50
        };
        if (x.type == 6) return {
            img: 'deerss',
            animationframe: 0,
            totalframes: 22,
            tilex: 4999 / 22,
            tiley: 212,
            x: 250,
            y: 80,
            width: 350,
            height: 100
        };
    }();

    this.x = function() {
        var max = 0;

        for (var i = 0; i < gameobjects.level.enemycontainer.length; i++) {
            var newmax = gameobjects.level.enemycontainer[i].x + gameobjects.level.enemycontainer[i].width;
            if (newmax > max) max = newmax;
        }

        return max;
    }() + random(GUI.canvas.width / 2, GUI.canvas.width);

    this.y = function() {
        if (x.type == 1) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 2) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 3) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 4) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 5) return gameobjects.level.tile.ground.y - x.height;
        if (x.type == 6) return gameobjects.level.tile.ground.y - x.height;
    }();

    gameobjects.level.tile.ground.y - this.height;

    this.speed = function() {
        if (x.type == 1) return 0;
        if (x.type == 2) return 0;
        if (x.type == 3) return 0;
        if (x.type == 4) return 2;
        if (x.type == 5) return 2;
        if (x.type == 6) return 2;
    }();

    this.health = function() {
        if (x.type == 1) return 0;
        if (x.type == 2) return 0;
        if (x.type == 3) return 0;
        if (x.type == 4) return 0;
        if (x.type == 5) return 0;
        if (x.type == 6) return 0;
    }();

    this.attacktime = function() {
        if (x.type == 1) return 1000;
        if (x.type == 2) return 1000;
        if (x.type == 3) return 220;
        if (x.type == 4) return 1000;
        if (x.type == 5) return 1000;
        if (x.type == 6) return 1000;
    }();

    this.attacktimeinitial = function() {
        if (x.type == 1) return 1000;
        if (x.type == 2) return 1000;
        if (x.type == 3) return 22 * 10 * 2;
        if (x.type == 4) return 1000;
        if (x.type == 5) return 1000;
        if (x.type == 6) return 1000;
    }();

    this.fly = function() {
        if (x.type == -1) return true;
        else return false;
    }();
}

function bulletConstructor(rect, dir) {
    this.y = rect.y + rect.height * 0.4;
    this.width = 70;
    this.height = 70;
    this.dir = dir * (gameobjects.player.speed + gameobjects.player.level);
    sound.shot.play();
    if (dir < 0)
        this.x = rect.x + dir * rect.width / 2;
    if (dir > 0)
        this.x = rect.x + dir * rect.width;
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
    this.framemax = 10;
    this.tilex = 421;
    this.tiley = 410;
    sound.hit.play();
}

function collectableConstructor(rect) {
    this.x = rect.x;
    this.y = gameobjects.level.tile.ground.y - 130;
    this.height = 130;
    this.width = 130;
    this.type = random(1, 2);
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