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

function spritefont(fontdata, s, fsize, fspacing, x, y, centered) {
    if (centered) x -= (s.length + 1) * fsize * fspacing / 2;
    var charwidth = fontdata.imgResolution / fontdata.xindex;
    var stretchx = charwidth - fontdata.xindex;

    for (var k = 0; k < s.length; k++) {
        if (s[k] != ' ') {
            var i = characterIndex(s[k], fontdata).i;
            var j = characterIndex(s[k], fontdata).j;
            context.drawImage(img[fontdata.img], charwidth * i, charwidth * j, stretchx, stretchx, x + fsize * fspacing * k, y, //0 * fsize * fspacing * j,
                fsize, fsize);
        }
    }
}

var spritefont1 = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;?!-+=~&$%()\/{}[]<>^*▲▼@',
    lowercase: false,
    xindex: 8,
    yindex: 8,
    imgResolution: 512,
    img: "jfont"
};
var spritefont2 = {
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-+=~%!?&$(){}[]\\/<>^*@#"x|xxxxxxxxxxxxxxxx',
    lowercase: true,
    xindex: 16,
    yindex: 6,
    imgResolution: 1024 * 2,
    img: "Font"
}; //--------------------------------------bulk rendering utils------------------------------------------------

function rednerall(array) {
    for (var index = 0; index < array.length; index++) {
        var element = array[index];

        for (var i = 0; i < element.length; i++) {
            var t = element[i];
            context.drawImage(img[t.img], t.tilex * t.type, 0, t.tilex, t.tiley, t.x, t.y, t.width, t.height);
        }
    }
}

function rednerallunalignedsheet(array) {
    for (var index = 0; index < array.length; index++) {
        for (var i = 0; i < array[index].length; i++) {
            var t = array[index][i];
            context.drawImage(img[t.img], t.tilex, t.tiley, t.width, t.height, t.x, t.y, t.width, t.height);
        }
    }
}

function rednerallanim(array) {
    for (var index = 0; index < array.length; index++) {
        for (var i = 0; i < array[index].length; i++) {
            renderanim(array[index][i], gameobjects.animation[array[index][i].animation]);
        }
    }
}

function renderselfdestructiveanim(container) {
    for (var index = 0; index < container.length; index++) {
        var element = container[index];
        var anim = gameobjects.animation[element.animation][0];

        if (element.aniframe < anim.framecount - 1) {
            element.aniframe += 0.2;
            context.drawImage(img[anim.img], anim.w * Math.floor(element.aniframe), 0, anim.w, anim.h, element.x - anim.alignx, element.y - anim.aligny, element.width * 1.5 + anim.stretchx, element.height * 1.5 + anim.stretchy);
        } else {
            container.splice(index, 1);
        }
    }
}

function renderanim(t, a, type) {
    if (type) t.anitype == type;
    t.aniframe = loopnext(t.aniframe, a[t.anitype].framecount - 1);
    var anim = a[t.anitype];
    context.drawImage(img[anim.img], anim.w * Math.floor(t.aniframe), 0, anim.w, anim.h, t.x - anim.alignx, t.y - anim.aligny, t.width + anim.stretchx, t.height + anim.stretchy);
}

function rednerallsimple(array) {
    for (var index = 0; index < array.length; index++) {
        for (var i = 0; i < array[index].length; i++) {
            var t = array[index][i];
            context.drawImage(img[t.img], t.x, t.y, t.width, t.height);
        }
    }
} //---------------------------------------MORE UTILS---------------------------------------------------------


function randomBool(min, max) {
    return random(1, 2) == 1 ? min : max;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
    return parseFloat(Math.random() * (max - min) + min).toFixed(3);
}

function loopnext(x, n) {
    x < n ? x += 0.2 : x = 0;
    return x;
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

function checkCircleIntersection(cir1, cir2) {
    var x1 = cir1.x + cir1.width / 2;
    var y1 = cir1.y + cir1.height / 2;
    var x2 = cir2.x + cir2.width / 2;
    var y2 = cir2.y + cir2.height / 2;
    if ((cir1.width + cir2.width) / 2 > Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) return true;
    else return false;
}