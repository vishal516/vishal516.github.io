"use strict"; // The function gets called when the window is fully loaded

var gameready = function() {
    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;

    console.log('assets loaded');
    window.addEventListener('keydown', function(e) {
        gameobjects.keyState[e.keyCode || e.which] = true;
    }, true);
    window.addEventListener('keyup', function(e) {
        gameobjects.keyState[e.keyCode || e.which] = false;
    }, true);

    window.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                leftkey();
                leftkeyPressedGUI();
                break;

            case 38:
                upkey();
                break;

            case 39:
                rightkey();
                rightkeyPressedGUI();
                break;

            case 40:
                downkey();
                break;

            case 32:
                spacekeyDebug();
                break;

            case 13:
                enterkeyPressedGUI();
                enterkey();
                break;
        }
    }, false);

    function main(tframe) {
        window.requestAnimationFrame(main);
        update(tframe);
        render();
    }

    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        updater();
        updateFps(dt);
    }

    function updateFps(dt) {
        if (fpstime > 0.25) {
            Math.round(framecount / fpstime);
            fpstime = 0;
            framecount = 0;
        }

        fpstime += dt;
        framecount++;
    }

    function render() {
        renderer();
        drawFrameRate();
    }

    function drawFrameRate() {
        context.fillStyle = "#000000";
        context.font = "12px Verdana";
    }

    (function() {
        uiInit(); //initer(); 

        main(0);
    })();
};