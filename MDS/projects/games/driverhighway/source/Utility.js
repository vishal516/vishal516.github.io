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


function characterIndex(char, fontdata) {
    for (var a = 0; a < fontdata.xindex; a++) {
        for (var b = 0; b < fontdata.yindex; b++) {
            var character = fontdata.characterSet[b * fontdata.xindex + a];

            if (fontdata.lowercase) {
                if (char == character) {
                    var c = {
                        i: a,
                        j: b
                    };
                    return c;
                }
            } else {
                if (char.toLowerCase() == character.toLowerCase()) {
                    var c = {
                        i: a,
                        j: b
                    };
                    return c;
                }
            }
        }
    }
}

function spritefont(s, font, x, y, centered, fontdata) {
    if (centered) x -= (s.length + 1) * font.size * font.spacing / 2;
    var charwidth = fontdata.imgResolutionx / fontdata.xindex;
    var charheight = fontdata.imgResolutiony / fontdata.yindex;

    for (var k = 0; k < s.length; k++) {
        if (s[k] != ' ') {
            var i = characterIndex(s[k], fontdata).i;
            var j = characterIndex(s[k], fontdata).j;
            context.drawImage(img[fontdata.img], charwidth * i, charheight * j, charwidth, charheight, x + font.size * font.spacing * k, y, //0 * font.size * font.spacing * j,
                font.size, font.size);
        }
    }
}

function spriteanim(n, font, x, y, fontdata) {
    var charwidth = 113.8; //fontdata.imgResolutionx / fontdata.xindex;//unaligned sheet

    var charheight = 166; //fontdata.imgResolutiony / fontdata.yindex;//unaligned sheet

    var i = n % fontdata.xindex;
    var j = Math.ceil(n / fontdata.xindex) - 1;
    context.drawImage(img[fontdata.img], charwidth * i, charheight * j, charwidth, charheight, x, y, font.sizex, font.sizey);
}

function playeranimation(s, sx, sy, x, y) {
    spriteanim(s, {
        sizex: sx,
        sizey: sy,
        spacing: 0.5
    }, x, y, spritesheetplayer);
}

function spriteWrite1(s, font, x, y, centered) {
    spritefont(s, font, x, y, centered, spritefont1);
}


function spriteWrite3(s, _size, _spacing, x, y, centered) {
    spritefont(s, {
        size: _size,
        spacing: _spacing
    }, x, y, centered, spritefont1);
}

var spritesheetplayer = {
    characterSet: 63,
    lowercase: true,
    xindex: 9,
    yindex: 7,
    imgResolutionx: 1024,
    imgResolutiony: 1024,
    img: "surfer"
};
var spritefont1 = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:/======',
    lowercase: true,
    xindex: 14,
    yindex: 5,
    imgResolutionx: 1695,
    imgResolutiony: 908,
    img: "jfont"
};

var spritefont2 = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-+=~%!?&$(){}[]\\/<>^*@#"x|xxxxxxxxxxxxxxxx',
    lowercase: true,
    xindex: 16,
    yindex: 6,
    imgResolution: 1024 * 2,
    img: "Font"
};
var spritefont3 = {
    characterSet: '1234567890abcdefghijklmnopqrstuvwxyz:/,!+-.%xxx',
    lowercase: false,
    xindex: 5,
    yindex: 9,
    imgResolution: 320,
    img: "fontbold"
};
var fontSmall = {
    size: 30,
    spacing: 0.6
};
var fontMedium = {
    size: 40,
    spacing: 0.6
};
var fontBig = {
    size: 60,
    spacing: 0.6
};
var fontXL = {
    size: 200,
    spacing: 0.6
};
var fontXXL = {
    size: 300,
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

function randomizeArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        var r = random(0, arr.length - 1);
        var rvalue = arr[r];
        var ivalue = arr[i];
        arr[i] = rvalue;
        arr[r] = ivalue;
    }
    return arr;
}

function checkIntersection(rect1, rect2) {
    if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y) return false;
    return true;
}

function setselectorpos() {
    setPosToAnotherObject(gameobjects.selector, gameobjects.grid.cells[gameobjects.grid.pos]);
}

function setPosToAnotherObject(a, b) {
    a.x = b.x;
    a.y = b.y;
}