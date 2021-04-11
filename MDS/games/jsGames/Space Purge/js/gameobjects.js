"use strict";

var gameobjects = {
    "defaults": {
        "warnings": {
            "x": 600,
            "y": 500,
            "width": 600,
            "height": 100
        },
        "worms": 15,
        "bombs": 5
    },
    "player": {
        "x": -900,
        "y": 60,
        "width": 250,
        "height": 100,
        "xdir": 1,
        "ydir": 1,
        "speed": 200,
        "health": 100,
        "healthMax": 100,
        "damagefactor": 10,
        "score": 0,
        "level": 1,
        "target": 250,
        "targetMin": 250,
        "targetTolevelFactor": 150,
        "timeMin": 120,
        "time": 0,
        "timeToLevelFactor": 1,
        "lastScore": 0,
        "HighScore": 5000,
        "worms": 0,
        "bombs": 0,
        "collisionBox": {
            "x": -900,
            "y": 60,
            "width": 350 - 30 * 1,
            "height": 100
        },
        "firerate": 10,
        "fireinterval": 0,
        "extrafire": 0,
        "invincible": 0
    },
    "collectables": {
        "x": 0,
        "y": 60,
        "width": 50,
        "height": 50,
        "speed": 10,
        "total": 20,
        "totalworms": 10,
        "totalbombs": 3,
        "maxCount": 2
    },
    "background": {
        "x": 0,
        "y": 0,
        "width": 900,
        "height": 1000,
        "speed": 200
    },
    "fish": {
        "maxCount": 10,
        "morePerLevel": 1,
        "MinCount": 4,
        "caught": {
            "x": 0,
            "y": 0,
            "width": 140,
            "height": 80,
            "rotation": 90
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
    "earth": {
        "x": -500,
        "y": 0,
        "width": 1000,
        "height": 1000,
        "health": 100,
        "damagefactor": 10
    },
    "images": ['images/background.jpg', 'images/Spaceship_3.png', 'images/laser.png', 'images/earth.png', 'images/asteroids/Asteroids1.png', 'images/asteroids/Asteroids2.png', 'images/asteroids/Asteroids3.png', 'images/asteroids/Asteroids4.png', 'images/asteroids/Asteroids5.png', 'images/asteroids/Asteroids6.png', 'images/asteroids/Asteroids7.png', 'images/asteroids/Asteroids8.png', 'images/asteroids/Asteroids9.png', 'images/asteroids/Asteroids10.png', 'images/asteroids/Asteroids11.png', 'images/asteroids/Asteroids12.png', 'images/collectable1.png', 'images/collectable2.png', 'images/collectable3.png', 'images/collectable4.png', 'images/collectable4.png', 'images/collectable5.png', 'images/shield.png', 'images/Explosion_1/Explosion_1_0.png', 'images/Explosion_1/Explosion_1_1.png', 'images/Explosion_1/Explosion_1_2.png', 'images/Explosion_1/Explosion_1_3.png', 'images/Explosion_1/Explosion_1_4.png', 'images/Explosion_1/Explosion_1_5.png', 'images/Explosion_1/Explosion_1_6.png', 'images/Explosion_1/Explosion_1_7.png', 'images/Explosion_1/Explosion_1_8.png', 'images/gamelogo.png', //GUI images        
        'images/Paused.png', 'images/LevelUp.png', 'images/gameover.png', 'images/Font.png', 'images/Frame2.png', 'images/Frame.png', 'images/BtnPlayOn.png', 'images/BtnSoundOn.png', 'images/BtnSoundOff.png', 'images/BtnRestartOn.png', 'images/BtnInfoOn.png', 'images/BtnExitOn.png', 'images/Button.png'
    ],
    "sounds": ['media/gamemusic.ogg', 'media/bomb.m4a', 'media/explosion.m4a', 'media/bubble.m4a', 'media/caught.m4a', 'media/addbombs.m4a', 'media/levelup.m4a', 'media/gameover.m4a']
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
        "x": 350,
        "y": 50,
        "width": 1600 - 350 * 2,
        "height": 400
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
    "btnPadding": 200,
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

        image.onload = function(e) {
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
    console.log(soundfiles);
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

function fishEntity() {
    this.type = random(1, 12);
    this.xdir = -1; //randomBool(-1, 1);

    this.x = this.xdir == -1 ? 1700 : -100;
    this.y = random(350, 800);
    this.height = 20 * this.type;
    this.width = 20 * this.type;
    this.speed = randomFloat(1, 5);
    this.scorepoints = this.type;
    this.fishtype = 'Asteroids' + this.type; // + (this.xdir == 1 ? 1 : 0);
    //sound.caught.play();
}

function collectableEntity() {
    this.x = 1800;
    this.y = random(100, 900); //canvas.height;

    this.size = 100;
    this.width = this.size;
    this.height = this.size;
    this.speed = 2;
    this.type = random(1, 5);
    this.image = img['collectable' + this.type];

    this.scorepoints = function() {
        if (this.type == 2) return 100;
        if (this.type == 3) return 100;
        if (this.type == 5) return 500;
    };

    sound.bubble.play();
}

function bombEntity() {
    this.x = gameobjects.player.x + gameobjects.player.width;
    this.y = gameobjects.player.y + gameobjects.player.height / 2; //canvas.height;

    this.width = 50;
    this.height = 20;
    this.speed = 9;
    sound.bomb.play();
}

function blastEntity(bomb) {
    this.width = 400;
    this.height = 400;
    this.frames = [img.Explosion_1_0, img.Explosion_1_1, img.Explosion_1_2, img.Explosion_1_3, img.Explosion_1_4, img.Explosion_1_5, img.Explosion_1_6, img.Explosion_1_7, img.Explosion_1_8];
    this.frameIndex = 0;
    sound.explosion.play();
    this.x = bomb.x + bomb.width / 2 - this.width / 2;
    this.y = bomb.y + bomb.height / 2 - this.height / 2;
} //================================ CANVAS SETUP =====================================
// document.onreadystatechange = function() {
//     console.log(document.readyState, document.visibilityState, )
//     var loader = document.getElementById('loader');
//     var assetcount = 100;
//     var loaderMax = window.innerWidth / assetcount;
//     var loaderNow = 0;
//     var x = setInterval(function() {
//         if (loaderNow == 100)
//             clearInterval(x);
//         loader.style.width = window.innerWidth / (window.innerWidth - loaderNow) + 'px';
//         loaderNow += 1;
//     }, 1000)
// }


var lastgamestate = 'home';
window.addEventListener('blur', function() {
    lastgamestate = gameobjects.gamestate;
    gameobjects.gamestate = gameobjects.states.pause;
    sound.gamemusic.pause();
});
window.addEventListener('focus', function() {
    gameobjects.gamestate = lastgamestate;
    sound.gamemusic.play();
});

window.onload = function() {
    resizeCanvas();
    canvas.style.display = 'block';
    loader.style.display = 'none';
    gameready();
}

window.onresize = function() {
    resizeCanvas();
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
} //====================================GAMERULES-SECTION==========================================================