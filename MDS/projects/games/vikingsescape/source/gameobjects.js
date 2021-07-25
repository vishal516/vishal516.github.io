"use strict";

var gameobjects = {
    "keyState": {},
    //==============================GAME SPECIFIC OBJECTS================================= 
    "containers": {
        "backgroundcontainer": [],
        "backgroundcontainer2": [],
        "backgroundcontainer3": [],
        "bulletcontainer": [],
        "enemycontainer": [],
        "enemybulletcontainer": [],
        "treescontainer": [],
        "groundcontainer": [],
        "bushcontainer": [],
        "branchcontainer": [],
        "enemyonbranchcontainer": [],
        "enemyongroundcontainer": [],
        "collectablecontainer": [],
        "explocontainer": [],
        "default": {
            "enemycontainer": 5,
            "enemybulletcontainer": [],
            "treescontainer": 4,
            "backgroundcontainer": 2,
            "groundcontainer": 8,
            "bushcontainer": 8,
            "branchcontainer": 4,
            "enemyonbranchcontainer": 4,
            "enemyongroundcontainer": 4
        }
    },
    "level": {
        "speed": 4,
        "speedmax": 10,
        "speedmin": 1,
        "speedtimer": [0, 0],
        "bombdropcontainer": [],
        "blastcontainer": [],
        "collectablecontainer": [],
        "tile": {
            "background": {
                "width": 1600,
                "height": 1000,
                "img": "background",
                "tilegap": 0
            },
            "background2": {
                "y": 600,
                "width": 1600,
                "height": 400,
                "img": "bgstone",
                "tilegap": 0
            },
            "background3": {
                "y": 850,
                "width": 1600,
                "height": 400,
                "img": "bgwater",
                "tilegap": 0
            },
            "tree": {
                "width": 400,
                "height": 1000,
                "framelength": 3,
                "tilex": 1500 / 3,
                "tiley": 672,
                "tilegap": 200,
                "img": "trees"
            },
            "bush": {
                "width": 800,
                "height": 600,
                "framelength": 5,
                "tilex": 4010 / 5,
                "tiley": 602,
                "tilegap": -400,
                "img": "bgbush"
            },
            "ground": {
                "width": 400,
                "height": 400,
                "framelength": 5,
                "tilex": 1,
                "tiley": 1,
                "tilegap": 150,
                "img": "ground",
                "tile": [{
                    "x": 1,
                    "y": 1,
                    "w": 448,
                    "h": 239
                }, {
                    "x": 451,
                    "y": 1,
                    "w": 254,
                    "h": 186
                }, {
                    "x": 707,
                    "y": 1,
                    "w": 246,
                    "h": 116
                }, {
                    "x": 955,
                    "y": 1,
                    "w": 548,
                    "h": 354
                }, {
                    "x": 1505,
                    "y": 1,
                    "w": 548,
                    "h": 630
                }, {
                    "x": 2055,
                    "y": 1,
                    "w": 565,
                    "h": 548
                }, {
                    "x": 2622,
                    "y": 1,
                    "w": 565,
                    "h": 548
                }]
            },
            "branch": {
                "width": 400,
                "height": 100,
                "framelength": 3,
                "emptyframe": 3,
                "tilex": 1368 / 3,
                "tiley": 143,
                "tilegap": 200,
                "img": "branch"
            },
            "enemyonbranch": {
                "width": 150,
                "height": 150,
                "tilex": 1,
                "tiley": 1,
                "alignx": 100,
                "aligny": -200,
                "img": "denemy",
                "animation": "enemyonbranch"
            },
            "enemyonground": {
                "width": 200,
                "height": 200,
                "tilex": 1,
                "tiley": 1,
                "alignx": 100,
                "aligny": -200,
                "img": "denemy",
                "animation": "enemyonground"
            },
            "collectable": {
                "width": 100,
                "height": 100,
                "alignx": 0,
                "aligny": 0,
                "img": "potion"
            },
            "enemy": {
                "width": 150,
                "height": 150,
                "tilex": 1,
                "tiley": 1,
                "alignx": 100,
                "aligny": -200,
                "img": "denemy",
                "animation": "fly"
            },
            "bulletplayer": {
                "width": 50,
                "height": 50,
                "img": "denemy",
                "animation": "bullet"
            },
            "bulletenemy": {
                "width": 150,
                "height": 50,
                "img": "denemy",
                "animation": "bullet"
            },
            "explosion": {
                "animation": "explo"
            }
        },
        "ymax": 700,
        "ymin": 100
    },
    "animation": {
        "fly": [{
            "img": "bomber",
            "w": 1800 / 12,
            "h": 245,
            "stretchx": 20,
            "stretchy": 50,
            "alignx": 10,
            "aligny": 25,
            "framecount": 4,
            "frame": 0
        }, {
            "img": "fly1",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0,
            "shoots": true
        }, {
            "img": "fly2",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0
        }, {
            "img": "fly3",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0,
            "shoots": true
        }, {
            "img": "fly4",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0
        }, {
            "img": "fly5",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0,
            "shoots": true
        }, {
            "img": "fly6",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0
        }, {
            "img": "fly7",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0,
            "shoots": true
        }, {
            "img": "fly8",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0
        }, {
            "img": "fly9",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0,
            "shoots": true
        }, {
            "img": "fly10",
            "w": 1000 / 4,
            "h": 250,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 4,
            "frame": 0
        }],
        "enemyonground": [{
            "img": "spikes",
            "w": 174,
            "h": 147,
            "stretchx": 0,
            "stretchy": 0,
            "alignx": 0,
            "aligny": 0,
            "framecount": 1,
            "frame": 0
        }, {
            "img": "hog",
            "w": 1592 / 8,
            "h": 217,
            "stretchx": 50,
            "stretchy": 50,
            "alignx": 25,
            "aligny": 40,
            "framecount": 8,
            "frame": 0
        }, {
            "img": "pencil",
            "w": 71,
            "h": 144,
            "stretchx": 0,
            "stretchy": 0,
            "alignx": 0,
            "aligny": 0,
            "framecount": 1,
            "frame": 0
        }, {
            "img": "plant",
            "w": 3816 / 18,
            "h": 235,
            "stretchx": 50,
            "stretchy": 50,
            "alignx": 25,
            "aligny": 40,
            "framecount": 18,
            "frame": 0
        }, {
            "img": "cyclops",
            "w": 3072 / 8,
            "h": 395,
            "stretchx": 50,
            "stretchy": 50,
            "alignx": 25,
            "aligny": 40,
            "framecount": 8,
            "frame": 0
        }],
        "enemyonbranch": [{
            "img": "swordman",
            "w": 1464 / 8,
            "h": 160,
            "stretchx": 50,
            "stretchy": 50,
            "alignx": 25,
            "aligny": 40,
            "framecount": 8,
            "frame": 0
        }, {
            "img": "archer",
            "w": 1616 / 8,
            "h": 155,
            "stretchx": 50,
            "stretchy": 50,
            "alignx": 25,
            "aligny": 25,
            "framecount": 8,
            "frame": 0
        }, {
            "img": "summon",
            "w": 1056 / 8,
            "h": 181,
            "stretchx": 50,
            "stretchy": 80,
            "alignx": 25,
            "aligny": 70,
            "framecount": 8,
            "frame": 0
        }],
        "bullet": [{
            "img": "star",
            "w": 400 / 2,
            "h": 200,
            "stretchx": 50,
            "stretchy": 50,
            "alignx": 25,
            "aligny": 40,
            "framecount": 2,
            "frame": 0
        }],
        "explo": [{
            "img": "exploa",
            "w": 1198 / 10,
            "h": 119,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 8,
            "frame": 0
        }],
        // "explo": [{
        //     "img": "exploa",
        //     "w": 1600 / 8,
        //     "h": 200,
        //     "stretchx": 50,
        //     "stretchy": 50,
        //     "alignx": 25,
        //     "aligny": 25,
        //     "framecount": 8,
        //     "frame": 0,
        // }, ],
        "player": [{
            "img": "playerfly",
            "w": 2560 / 8,
            "h": 320,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 8,
            "frame": 0
        }, {
            "img": "playerattack",
            "w": 1600 / 5,
            "h": 320,
            "stretchx": 100,
            "stretchy": 100,
            "alignx": 50,
            "aligny": 50,
            "framecount": 5,
            "frame": 0
        }]
    },
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
        "playerHealth": 10
    },
    "player": {
        "transform": {
            "x": 100,
            "y": 500,
            "width": 200,
            "height": 200,
            "tilex": 1,
            "tiley": 1,
            "alignx": 0,
            "aligny": 0,
            "anitype": 0,
            "img": "dplayer",
            "animation": "player"
        },
        "level": 1,
        "score": 0,
        "highscore": 0,
        "lastscore": 0,
        "time": 0,
        "health": 10,
        "damageble": 100,
        "attack": 0
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
        'images/BtnPlayOn.png',
        'images/BtnInfoOn.png',
        'images/BtnPlayOn.png',
        'images/BtnSoundOn.png',
        'images/BtnSoundOff.png',
        'images/BtnRestartOn.png',
        'images/BtnExitOn.png',
        'images/Button.png',
        'images/ebullet.png',
        'images/exploa.png',
        'images/explob.png',
        'images/star.png',
        'images/potion.png',
        'images/tree/trees.png',
        'images/tree/bgstone.png',
        'images/tree/bgwater.png',
        'images/tree/bgbush.png',
        'images/tree/ground.png',
        'images/tree/branch.png',
        'images/enemies/pencil.png',
        'images/enemies/spikes.png',
        'images/enemies/bomber.png',
        'images/enemies/cyclops.png',
        'images/enemies/hog.png',
        'images/enemies/summon.png',
        'images/enemies/archer.png',
        'images/enemies/swordman.png',
        'images/enemies/fly1.png',
        'images/enemies/fly2.png',
        'images/enemies/fly3.png',
        'images/enemies/fly4.png',
        'images/enemies/fly5.png',
        'images/enemies/fly6.png',
        'images/enemies/fly7.png',
        'images/enemies/fly8.png',
        'images/enemies/fly9.png',
        'images/enemies/fly10.png',
        'images/enemies/plant.png',
        'images/player/playerfly.png',
        'images/player/playerattack.png',
        //debug
        'images/debug/dplayer.png',
        'images/debug/denemy.png',
        'images/debug/dblank.png'
    ],
    "sounds": ['media/Button.m4a',
        'media/gamemusic.ogg',
        'media/throw.ogg',
        'media/deathplayer.m4a',
        'media/deathenemy.ogg',
        'media/life.m4a'
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