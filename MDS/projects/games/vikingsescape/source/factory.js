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
        sound.gamemusic.loop = true;
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

function position(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
}

function scale(width, height) {
    this.width = width;
    this.height = height;
}

function mix(objects) {
    var newobject = {};
    for (let i = 0; i < objects.length; i++) {
        var properties = Object.getOwnPropertyDescriptors(objects[i]);
        Object.defineProperties(newobject, properties);
    }
    return newobject;
}

function transform(x, y, width, height) {
    var exclusiveproperties = {};
    return mix([new position(x, y), new scale(width, height), exclusiveproperties]);
};

function tile(object, hidden) {
    this.type = random(0, (object.framelength ? object.framelength : 1) - 1);
    this.tilex = object.tilex ? object.tilex : object.width;
    this.tiley = object.tiley ? object.tiley : object.height;
    this.tilegap = object.tilegap ? object.tilegap : 0;
    this.alignx = object.alignx ? object.alignx : 0;
    this.aligny = object.aligny ? object.aligny : 0;
    this.img = object.img ? object.img : 'denemy';
    if (hidden) {
        if (random(0, hidden) === hidden)
            this.img = 'dblank';
    }
}

function damageble(h) {
    this.health = h;
}

function animation(object) {
    this.animation = object.animation;
    this.anitype = random(0, gameobjects.animation[object.animation].length - 1);
    this.aniframe = 0;
}

function explosion(object) {
    var explo = mix([transform(object.x, object.y, object.width, object.height), new animation(gameobjects.level.tile.explosion)]);
    gameobjects.containers.explocontainer.push(explo);
}
"use strict";

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
        sound.gamemusic.loop = true;
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
}

function position(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
}

function scale(width, height) {
    this.width = width;
    this.height = height;
}

function mix(objects) {
    var newobject = {};

    for (var i = 0; i < objects.length; i++) {
        var properties = Object.getOwnPropertyDescriptors(objects[i]);
        Object.defineProperties(newobject, properties);
    }

    return newobject;
}

function transform(x, y, width, height) {
    return mix([new position(x, y), new scale(width, height), {}]);
}

function tile(object, hidden) {
    this.type = random(0, (object.framelength ? object.framelength : 1) - 1);
    this.tilex = object.tilex ? object.tilex : object.width;
    this.tiley = object.tiley ? object.tiley : object.height;
    this.tilegap = object.tilegap ? object.tilegap : 0;
    this.alignx = object.alignx ? object.alignx : 0;
    this.aligny = object.aligny ? object.aligny : 0;
    this.img = object.img ? object.img : 'denemy';

    if (hidden) {
        if (random(0, hidden) === hidden) this.img = 'dblank';
    }
}

function damageble(h) {
    this.health = h;
}

function animation(object) {
    this.animation = object.animation;
    this.anitype = random(0, gameobjects.animation[object.animation].length - 1);
    this.aniframe = 0;
}

function explosion(object) {
    var explo = mix([transform(object.x, object.y, object.width, object.height), new animation(gameobjects.level.tile.explosion)]);
    gameobjects.containers.explocontainer.push(explo);
}

function platfromenemy(pos, t, health) {
    var rect = mix([transform(pos.x, pos.y, t.width, t.height), new tile(t), new damageble(health), new animation(t)]);
    rect.x = pos.x + (pos.width - t.width) / 2; //rect.x + rect.alignx;

    rect.y = rect.y - rect.height;
    return rect;
}

function collectable(pos, t, health) {
    var rect = mix([transform(pos.x, pos.y, t.width, t.height), new tile(t), new damageble(health)]);
    rect.x = pos.x + (pos.width - t.width) / 2; //rect.x + rect.alignx;

    rect.y = rect.y - rect.height;
    return rect;
}

function tilex(index, t, hidden) {
    var t = mix([transform(index * (t.width + t.tilegap), t.y, t.width, t.height), new tile(t, hidden)]);
    t.x = t.x + t.alignx;
    return t;
}

function bullet(t, img, health, bullet, aligny) {
    return mix([transform(t.x, t.y + aligny, bullet.width, bullet.height), {
        "img": img
    }, new damageble(health), new animation(bullet)]);
} //-----------------------------------------final classes--------------------------------------


function ground(index) {
    gameobjects.level.tile.ground.y = random(700, 800);
    var temp = tilex(index, gameobjects.level.tile.ground, 1);
    var tile = gameobjects.level.tile.ground.tile[temp.type];
    temp.tilex = tile.x;
    temp.tiley = tile.y;
    temp.width = tile.w;
    temp.height = tile.h;
    return temp;
}

function playerbullet() {
    sound.throw.play();
    return bullet(gameobjects.player.transform, "denemy", 0, gameobjects.level.tile.bulletplayer, 0);
}

function enemybullet(t) {
    return bullet(t, "ebullet", 0, gameobjects.level.tile.bulletenemy, t.height / 2);
}

function enmey() {
    var t = gameobjects.level.tile.enemy;
    return mix([transform(GUI.canvas.width + t.width, random(100, 500), t.width, t.height), new tile(t), new damageble(1), new animation(t)]);
}

function enemyonbranch(pos) {
    if (pos.img != 'dblank' && random(0, 1) == 0) {
        gameobjects.containers.enemyonbranchcontainer.push(platfromenemy(pos, gameobjects.level.tile.enemyonbranch, 2));
    }
}

function enemyonground(pos) {
    if (pos.img !== 'dblank') {
        if (random(0, 1) == 0) gameobjects.containers.enemyongroundcontainer.push(platfromenemy(pos, gameobjects.level.tile.enemyonground, 2));
        else if (random(0, 5) == 0) {
            gameobjects.containers.collectablecontainer.push(collectable(pos, gameobjects.level.tile.collectable, 0));
        }
    }
}

function tree(index) {
    return tilex(index, gameobjects.level.tile.tree);
}

function branch(index) {
    gameobjects.level.tile.branch.y = random(200, 300);
    return tilex(index, gameobjects.level.tile.branch, 1);
}

function bush(index) {
    gameobjects.level.tile.bush.y = random(-200, 0);
    return tilex(index, gameobjects.level.tile.bush);
}

function background(index) {
    return tilex(index, gameobjects.level.tile.background);
}

function background2(index) {
    return tilex(index, gameobjects.level.tile.background2);
}

function background3(index) {
    return tilex(index, gameobjects.level.tile.background3);
}

function platfromenemy(pos, t, health) {
    var rect = mix([transform(pos.x, pos.y, t.width, t.height), new tile(t), new damageble(health), new animation(t)]);
    rect.x = pos.x + (pos.width - t.width) / 2; //rect.x + rect.alignx;
    rect.y = rect.y - rect.height;
    return rect;
}

function collectable(pos, t, health) {
    var rect = mix([transform(pos.x, pos.y, t.width, t.height), new tile(t), new damageble(health)]);
    rect.x = pos.x + (pos.width - t.width) / 2; //rect.x + rect.alignx;
    rect.y = rect.y - rect.height;
    return rect;
}

function tilex(index, t, hidden) {
    var t = mix([transform(index * (t.width + t.tilegap), t.y, t.width, t.height), new tile(t, hidden)]);
    t.x = t.x + t.alignx;
    return t;
}

function bullet(t, img, health, bullet, aligny) {
    return mix([transform(t.x, t.y + aligny, bullet.width, bullet.height), { "img": img }, new damageble(health), new animation(bullet)]);
}


//-----------------------------------------final classes--------------------------------------

function ground(index) {
    gameobjects.level.tile.ground.y = random(700, 800);
    var temp = tilex(index, gameobjects.level.tile.ground, 1);
    var tile = gameobjects.level.tile.ground.tile[temp.type];
    temp.tilex = tile.x;
    temp.tiley = tile.y;
    temp.width = tile.w;
    temp.height = tile.h;
    return temp;
}

function playerbullet() {
    sound.throw.play();
    return bullet(gameobjects.player.transform, "denemy", 0, gameobjects.level.tile.bulletplayer, 0);
}

function enemybullet(t) {
    return bullet(t, "ebullet", 0, gameobjects.level.tile.bulletenemy, t.height / 2);
}

function enmey() {
    var t = gameobjects.level.tile.enemy;
    return mix([transform(GUI.canvas.width + t.width, random(100, 500), t.width, t.height), new tile(t), new damageble(1), new animation(t)]);
}

function enemyonbranch(pos) {
    if (pos.img != 'dblank' && random(0, 1) == 0) {
        gameobjects.containers.enemyonbranchcontainer.push(platfromenemy(pos, gameobjects.level.tile.enemyonbranch, 2));
    }
}

function enemyonground(pos) {
    if (pos.img !== 'dblank') {
        if (random(0, 1) == 0)
            gameobjects.containers.enemyongroundcontainer.push(platfromenemy(pos, gameobjects.level.tile.enemyonground, 2));
        else if (random(0, 5) == 0) {
            gameobjects.containers.collectablecontainer.push(collectable(pos, gameobjects.level.tile.collectable, 0));
        }
    }
}

function tree(index) {
    return tilex(index, gameobjects.level.tile.tree);
}

function branch(index) {
    gameobjects.level.tile.branch.y = random(200, 300);
    return tilex(index, gameobjects.level.tile.branch, 1);
}

function bush(index) {
    gameobjects.level.tile.bush.y = random(-200, 0);
    return tilex(index, gameobjects.level.tile.bush);
}

function background(index) {
    return tilex(index, gameobjects.level.tile.background);
}

function background2(index) {
    return tilex(index, gameobjects.level.tile.background2);
}

function background3(index) {
    return tilex(index, gameobjects.level.tile.background3);
}