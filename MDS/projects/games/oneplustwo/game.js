window.onload = function() {
    document.getElementById('loader').remove();
    canvas.style.display = 'block';
    onInit();
}

function randomnoconcurrent(min, max) {
    lastrandom = x;
    x = random(min, max);
    if (lastrandom === x) {
        return randomnoconcurrent(min, max);
    } else {
        return x;
    }
}

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var gameobjects = {
    player: {
        score: 0,
        highscore: 0,
    },
    loader: {
        x: 350,
        y: 200,
        width: 300,
        height: 50,
    }
}
var lastrandom = 0;
var x = 0;
var timer = 100;
var answer = 1;
var question = 2;
var questions = {
    "options": [
        [
            [
                ["3-2"],
                ["2-1"],
            ],
            [
                ["3-1"],
                ["1+1"]
            ],
            [
                ["2+1"],
                ["1+1+1"]
            ],
        ],
        [
            [
                ["2-3"],
                ["1-2"],
            ],
            [
                ["1-3"],
                ["2-3-1"],
            ],
            [
                ["1-3-1"],
                ["2-3-2"]
            ],
        ]

    ],
}

var sound = {
    "sounds": [
        'media/true.ogv',
        'media/false.ogv',
        'media/pop.ogv',
        'media/swosh.ogv'
    ]
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

var sound = loadSound(sound.sounds);

var palet = {
    brown: '#795548', // '#99554899',
    red: '#ff0000',
    green: '#00ff00',
    blue: '#9999ff',
    white: '#ffffff',
    randomcolor: '#ffffff',
}
var state = 0;

function onInit() {
    main();
    question = 2;
    let hs = localStorage.getItem('highscore');
    gameobjects.player.highscore = hs ? hs : 0;
}

function render() {
    rect(0, 0, 1000, 500, palet.white);

    switch (state) {
        case 0:
            renderhome();
            break;
        case 1:
            rendergame();
            break;
        case 2:
            renderover();
            break;
    }

    function renderhome() {
        rect(0, 40, 1000, 200, palet.brown)
        text(500, 100, 'ONE PLUS TWO', 60, 600, palet.white);
        text(500, 200, 'HIGHSCORE:' + gameobjects.player.highscore, 40, 100, palet.white);
        text(500, 300, 'PRESS \'OK\' BUTTON TO START', 30, 100, palet.brown);
    }

    function renderover() {
        rect(0, 40, 1000, 200, palet.brown)
        text(500, 100, 'SCORE: ' + gameobjects.player.score, 60, 600, palet.white);
        text(500, 200, 'HIGHSCORE:' + gameobjects.player.highscore, 40, 100, palet.white);
        text(500, 300, 'PRESS \'OK\' BUTTON TO RESTART', 30, 100, palet.brown);
    }

    function rendergame() {
        rect(500 - 300 / 2, 200 + 50, 300, 50, palet.red);
        rect(500 - 300 / 2, 260 + 50, 300, 50, palet.red);
        rect(500 - 300 / 2, 320 + 50, 300, 50, palet.red);
        rect(500 - 300 / 2, 200 + 50, 3 * timer, 50, palet.brown);
        rect(500 - 300 / 2, 260 + 50, 3 * timer, 50, palet.brown);
        rect(500 - 300 / 2, 320 + 50, 3 * timer, 50, palet.brown);
        rect(500 - 300 / 2, (answer * 60 + 190), 300, 50, palet.green);
        text(500, 280, '1', 50, 600, palet.white);
        text(500, 280 + 60, '2', 50, 600, palet.white);
        text(500, 280 + 60 * 2, '3', 50, 600, palet.white);
        text(500, 160, equation, 1500 / equation.length > 200 ? 200 : 1500 / equation.length, 700, palet.red);
        text(500, 50, 'SCORE:' + gameobjects.player.score, 30, 700, palet.red);
    }
}

function main() {
    window.requestAnimationFrame(main);
    render();
}

function text(x, y, message, size, weight, color) {
    ctx.font = weight + " " + size + "px" + " arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(message, x, y);
}

function rect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

var equation = '0';

function equationbuilder() {
    let a = questions.options[0][question - 1];
    let b = a[random(0, a.length - 1)].toString();
    for (let i = 1; i < gameobjects.player.score.toString().length; i++) {
        b = equationwithoutbraces(b);
    }
    equation = b + '=?';
}

function equationwithbraces(b) {
    for (let i = 1; i < 3; i++) {
        let option = questions.options[0][i - 1];
        b = b.replace(i.toString(), '(' + option[random(0, option.length - 1)] + ')');
    }
    return b;
}

function equationwithoutbraces(b) {
    for (let i = 1; i < 3; i++) {
        let optionpositive = questions.options[0][i - 1];
        let optionnegative = questions.options[1][i - 1];
        b = '+' + b;
        if (b.includes('+' + i))
            b = b.replace('+' + i.toString(), '+' + optionpositive[random(0, optionpositive.length - 1)]);
        if (b.includes('-' + i))
            b = b.replace('-' + i.toString(), '+' + optionnegative[random(0, optionnegative.length - 1)]);
        if (b[0] === '+') {
            b = b.substr(1);
        }
    }
    return b;
}

function moveselection(dir) {
    answer += dir;
    answer = answer > 3 ? 3 : answer;
    answer = answer < 1 ? 1 : answer;
}

function selectanswer() {
    timer = 100;
    if (question === answer) {
        question = randomnoconcurrent(1, 3);
        equationbuilder();
        sound.true.play();
        gameobjects.player.score += 1;
    } else {
        clearInterval(intervaltimer);
        gameover();
    }
}

function gameover() {
    console.log('gameover');
    sound.false.play();
    state = 2;
    gameobjects.player.highscore = gameobjects.player.score > gameobjects.player.highscore ? gameobjects.player.score : gameobjects.player.highscore;
    localStorage.setItem('highscore', gameobjects.player.highscore);
}

function startgame() {
    gameobjects.player.score = 0;
    console.log('startgame');
    sound.pop.play();
    state = 1;
    timer = 100;
    starttimer();
    question = 2;
    equationbuilder();
}

var intervaltimer;

function starttimer() {
    intervaltimer = setInterval(() => {
            if (timer > 0) {
                timer -= 1;
            } else {
                clearInterval(intervaltimer);
                gameover();
            }
        },
        100);
}

function random(min, max) {
    return (Math.floor((max - min + 1) * Math.random() + min));
}

function randomex(min, max, except) {
    var x = random(min, max)
    while (x === except) {
        x = random(min, max);
    }
    return x;
}

window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
        case 13:
            switch (state) {
                case 0:
                    startgame();
                    break;
                case 2:
                    startgame();
                    break;
                case 1:
                    selectanswer();
                    break;
            }
            break;
        case 37:
            console.log(e.keyCode);
            break;
        case 38:
            if (state == 1)
                moveselection(-1);
            break;
        case 39:
            console.log(e.keyCode);
            break;
        case 40:
            if (state == 1)
                moveselection(1);
            break;
    }
})