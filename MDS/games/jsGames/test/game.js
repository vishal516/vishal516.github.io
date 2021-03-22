// The function gets called when the window is fully loaded
window.onload = function() {


    // Get the canvas and context


    // Level properties


    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;

    // Initialize the game
    function init() {
        initer();

        // Enter main loop
        main(0);
    }

    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);

        // Update and render the game
        update(tframe);
        render();
    }

    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;

        updater();

        // Update the fps counter
        updateFps(dt);
    }

    function updateFps(dt) {
        if (fpstime > 0.25) {
            // Calculate fps
            fps = Math.round(framecount / fpstime);

            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }

        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }

    // Render the game
    function render() {
        // Draw the frame

        drawFrame();
        renderer();

    }

    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#d0d0d0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#e8eaec";
        context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);

        // Display fps
        context.fillStyle = "#000000";
        context.font = "12px Verdana";
        context.fillText("Fps: " + fps, 13, 50);
    }



    // Call init to start the game
    // function initTrigger() {
    //     console.log(preloaded);
    //     if (preloaded)

    //     setTimeout(initTrigger, 100);
    // }
    // initTrigger();
    init();
};