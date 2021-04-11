"use strict"; //-----------------------SECONDS TO hh:mm:ss --------------------------------------------------------------------------

String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param

    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
}; //-----------------------SPRITEFONTS------------------------------------------------------------------------------------


function characterIndex(char) {
    for (var _i = 0; _i < spritefont1.xindex; _i++) {
        for (var _j = 0; _j < spritefont1.yindex; _j++) {
            var character = spritefont1.characterSet[_j * spritefont1.xindex + _i];

            if (char.toLowerCase() == character.toLowerCase()) {
                var c = {
                    i: _i,
                    j: _j
                };
                return c;
            }
        }
    }
}

function spriteWrite(s, font, x, y, centered) {
    if (centered) x -= s.length * font.size * font.spacing / 2;
    var charwidth = spritefont1.imgResolution / spritefont1.xindex;
    var stretchx = charwidth - spritefont1.xindex;

    for (var k = 0; k < s.length; k++) {
        if (s[k] != ' ') {
            var i = characterIndex(s[k]).i;
            var j = characterIndex(s[k]).j;
            context.drawImage(img[spritefont1.img], charwidth * i, charwidth * j, stretchx, stretchx, x + font.size * font.spacing * k, y, //0 * font.size * font.spacing * j,
                font.size, font.size);
        }
    }
}

function spriteWrite2(s, font, x, y, centered) {
    if (centered) x -= s.length * font.size * font.spacing / 2;
    var charwidth = spritefont2.imgResolution / spritefont2.xindex;
    var stretchx = charwidth - spritefont2.xindex;

    for (var k = 0; k < s.length; k++) {
        if (s[k] != ' ') {
            var i = characterIndex(s[k]).i;
            var j = characterIndex(s[k]).j;
            context.drawImage(img[spritefont2.img], charwidth * i, charwidth * j, stretchx, stretchx, x + font.size * font.spacing * k, y, //0 * font.size * font.spacing * j,
                font.size, font.size);
        }
    }
}

var spritefont1 = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;?!-+=~&$%()\/{}[]<>^*▲▼@',
    xindex: 8,
    yindex: 8,
    imgResolution: 512,
    img: "jfont"
};
var spritefont2 = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;?!-+=~&$%()\/{}[]<>^*▲▼@',
    xindex: 8,
    yindex: 8,
    imgResolution: 1024,
    img: "Font"
};
var fontSmall = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    size: 30,
    spacing: 0.6
};
var fontMedium = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    size: 50,
    spacing: 0.6
};
var fontBig = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    size: 60,
    spacing: 0.6
};
var fontXL = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    size: 200,
    spacing: 0.6
}; //---------------------------------------MORE UTILS---------------------------------------------------------

function randomBool(min, max) {
    return random(1, 2) == 1 ? min : max;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
    return parseFloat(Math.random() * (max - min) + min).toFixed(3);
}