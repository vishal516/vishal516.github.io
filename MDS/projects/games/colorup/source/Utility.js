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
};

//-----------------------SPRITEFONTS------------------------------------------------------------------------------------

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

function spritefont(fontdata, s, fsize, fspacing, x, y, centered, ) {

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
    imgResolution: 2048,
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
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-+=~%!?&$(){}[]\\/<>^*@#"x|xxxxxxxxxxxxxxxx',
    lowercase: true,
    xindex: 16,
    yindex: 6,
    imgResolution: 1024,
    img: "jfont"
};
//---------------------------------------MORE UTILS---------------------------------------------------------

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


function drawcircle(centerX, centerY, radius, color) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = color + '55';
    context.fill();
    context.strokeStyle = color;
    context.lineWidth = 20;
    context.stroke();
}

function drawrect(x, y, width, height, color) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color + '55';
    context.fillRect(x, y, width, height);
    context.strokeStyle = color;
    context.lineWidth = 20;
    context.stroke();
}

function text(message, x, y, size, weight, c) {
    let color = gameobjects.bricks.colors[c]
    context.font = weight + " " + size + "px" + " arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = '#55' + color.replace('#', '');
    context.strokeStyle = color;
    context.lineWidth = size / 20;
    context.strokeText(message, x, y);
    context.fillText(message, x, y);

}

// gameobjects.bricks.player.y = gameobjects.containers.row.map((a) => a.y).reduce((a, b) => Math.min(a, b));
// gameobjects.bricks.topindex = gameobjects.containers.row.findIndex(a => a.y == gameobjects.bricks.player.y);
// gameobjects.bricks.bottom = gameobjects.containers.row.map((a) => a.y).reduce((a, b) => Math.max(a, b));
// gameobjects.bricks.bottomindex = gameobjects.containers.row.findIndex(a => a.y == gameobjects.bricks.bottom);