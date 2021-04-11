 //===========================================================================================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //=======================================                                   =================================================
 //=======================================          GAMEOBJECTS              =================================================
 //=======================================                                   =================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //===========================================================================================================================
 //console.log(canvas);


 var gameobjects = {
     "totalBubbles": 25,
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
         "width": 350,
         "height": 100,
         "xdir": 1,
         "ydir": 1,
         "speed": 200,
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
         }
     },
     "hook": {
         "x": 0,
         "y": 60,
         "width": 20,
         "height": 20,
         "speed": 10
     },
     "collectables": {
         "x": 0,
         "y": 60,
         "width": 20,
         "height": 20,
         "speed": 10,
         "total": 20,
         "totalworms": 10,
         "totalbombs": 3,
         "maxCount": 2
     },
     "bubble": {
         "x": 0,
         "y": 60,
         "width": 200,
         "height": 200,
         "speed": 10
     },
     "background": {
         "x": 0,
         "y": 0,
         "width": 900,
         "height": 1000,
         "speed": 200
     },
     "sky": {
         "x": 0,
         "y": 0,
         "width": 900,
         "height": 1000,
         "speed": 200
     },
     "underwater": {
         "x": 0,
         "y": 0,
         "width": 900,
         "height": 1000,
         "speed": 200
     },
     "ground": {
         "x": 0,
         "y": 0,
         "width": 900,
         "height": 1000,
         "speed": 200
     },
     "fish": {
         "maxCount": 50,
         "morePerLevel": 2,
         "MinCount": 10,
         "caught": {
             "x": 0,
             "y": 0,
             "width": 140,
             "height": 80,
             "rotation": 90
         }
     },
     "shark": {
         "maxCount": 2,
         "morePerLevel": 1,
         "MinCount": 1,
         "scorepoints": 50
     },
     "collectableImages": ["BubbleWorm", "BubbleTime", "BubbleBomb", "BubbleGift", "BubbleTreasure"],
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
     "images": ['data/Textures/Background/Sky.png', 'data/Textures/Background/Background.png', 'data/Textures/Background/Underwater.png', 'data/Textures/Background/Ground.png', 'data/Textures/Fishes/Fish_1_0.png', 'data/Textures/Fishes/Fish_2_0.png', 'data/Textures/Fishes/Fish_3_0.png', 'data/Textures/Fishes/Fish_4_0.png', 'data/Textures/Fishes/Fish_5_0.png', 'data/Textures/Player/PlayerHead_0.png', 'data/Textures/Player/Boat.png', 'data/Textures/Player/Worm_0.png', 'data/Textures/Player/PlayerHandPaddle.png', 'data/Textures/Player/PlayerHandRot.png', 'data/Textures/Player/PlayerBody.png', 'data/Textures/Player/Hook.png', 'data/Textures/Player/Plumb.png', 'data/Textures/Bubbles/Bubble.png', 'data/Textures/Shark/Shark_0.png', 'data/Textures/Bubbles/BubbleWorm.png', 'data/Textures/Bubbles/BubbleBomb.png', 'data/Textures/Bubbles/BubbleGift.png', 'data/Textures/Bubbles/BubbleTime.png', 'data/Textures/Bubbles/BubbleTreasure.png', 'data/Textures/Bubbles/Bomb.png', 'data/Textures/collisionBox.png', 'data/Textures/Explosion_1/Explosion_1_0.png', 'data/Textures/Explosion_1/Explosion_1_1.png', 'data/Textures/Explosion_1/Explosion_1_2.png', 'data/Textures/Explosion_1/Explosion_1_3.png', 'data/Textures/Explosion_1/Explosion_1_4.png', 'data/Textures/Explosion_1/Explosion_1_5.png', 'data/Textures/Explosion_1/Explosion_1_6.png', 'data/Textures/Explosion_1/Explosion_1_7.png', 'data/Textures/Explosion_1/Explosion_1_8.png', 'data/Textures/GameLogo.png', //GUI images
         'data/Textures/Buttons/BtnPlayOn.png', 'data/Textures/Buttons/Button.png', 'data/Textures/Buttons/BtnSoundOn.png', 'data/Textures/Buttons/BtnSoundOff.png', 'data/Textures/Buttons/BtnRestartOn.png', 'data/Textures/Buttons/BtnInfoOn.png', 'data/Textures/Buttons/BtnExitOn.png', 'data/Textures/Text/Paused.png', 'data/Textures/Text/LevelUp.png', 'data/Textures/Text/TimeOver.png', 'data/Textures/Frame2.png', 'data/Textures/Frame.png', 'data/Textures/Fonts/Font.png' //sprite font
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
     this.type = random(1, 5);
     this.xdir = randomBool(-1, 1);
     this.x = this.xdir == -1 ? 1700 : -100;
     this.y = random(350, 800);
     this.height = 80;
     this.width = 120;
     this.speed = randomFloat(1, 5);
     this.scorepoints = 8 + this.type * 2;
     this.fishtype = 'Fish_' + this.type + '_0'; // + (this.xdir == 1 ? 1 : 0);

     sound.caught.play();
 }

 function sharkEntity() {
     this.xdir = randomBool(-1, 1);
     this.width = 600;
     this.height = 300;
     this.x = this.xdir == -1 ? 1700 + this.width : -(100 + this.width);
     this.y = random(300, 600);
     this.ydir = 1;
     this.speed = 5;
 }

 function bubbleEntity() {
     this.xdir = randomBool(-1, 1);
     this.x = random(0, 1600);
     this.y = random(900, 1800); //canvas.height;

     this.size = random(10, 25);
     this.speed = randomFloat(1, 5);
 }

 function collectableEntity() {
     this.x = random(100, 1500);
     this.y = 1000; //canvas.height;
     this.size = 70;
     this.speed = 2;
     this.type = random(1, 5);
     this.fishtype = 'Fish_' + this.type + '_0'; // + (this.xdir == 1 ? 1 : 0); //10 30 5 100 200

     this.image = img[gameobjects.collectableImages[this.type - 1]];

     this.scorepoints = function() {
         if (this.type == 1) return 10;
         if (this.type == 2) return 30;
         if (this.type == 3) return 5;
         if (this.type == 4) return 100;
         if (this.type == 5) return 200;
     };

     sound.bubble.play();
 }

 function bombEntity() {
     this.x = gameobjects.player.x + gameobjects.player.width / 2;
     this.y = 300; //canvas.height;

     this.width = 50;
     this.height = 50;
     this.speed = 2;
     sound.bomb.play();
 }

 function blastEntity() {
     this.x = 0;
     this.y = 0;
     this.width = 400;
     this.height = 400;
     this.frames = [img.Explosion_1_0, img.Explosion_1_1, img.Explosion_1_2, img.Explosion_1_3, img.Explosion_1_4, img.Explosion_1_5, img.Explosion_1_6, img.Explosion_1_7, img.Explosion_1_8];
     this.frameIndex = 0;
     sound.explosion.play();
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

 //disable for testing

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