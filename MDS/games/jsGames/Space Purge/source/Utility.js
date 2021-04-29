"use strict";

//-----------------------SECONDS TO hh:mm:ss --------------------------------------------------------------------------
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

function randomBool(min, max) {
    return random(1, 2) == 1 ? min : max;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
    return parseFloat(Math.random() * (max - min) + min).toFixed(3);
}