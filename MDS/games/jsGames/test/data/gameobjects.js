var gameobjects = {
    "square": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 100,
        "xdir": 1,
        "ydir": 1,
        "speed": 200,
    },
    "background": {
        "x": 0,
        "y": 0,
        "width": 1600,
        "height": 1000,
        "speed": 200,
    },

    "fish": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 100,
        "xdir": 1,
        "ydir": 1,
        "speed": 200,
        "catched": false,
    },
    "shark": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 100,
        "xdir": 1,
        "ydir": 1,
        "speed": 200,
    },

    "score": 0,
    "images": [
        'data/bg.jpg',
        'data/electrio.png',
        'data/Textures/Background/Background.png',
        'data/fishing.png'

    ]
}

//this image object contains all images by names
var img = loadImages(gameobjects.images);

// Image loading global variables
var loadcount = 0;
var loadtotal = 0;
var preloaded = false;


// Load images
function loadImages(imagefiles) {
    preloaded = false;

    // Load the images
    var loadedimages = [];
    var imagesD = {};
    for (var i = 0; i < imagefiles.length; i++) {
        // Create the image object
        var image = new Image();
        console.log('pre', i, imagefiles.length, preloaded);
        // Add onload event handler
        image.onload = function(i) {
            console.log(i, imagefiles.length, preloaded);

            if (i == imagefiles.length) {
                // Done loading
                preloaded = true;
            }
        };

        // Set the source url of the image
        image.src = imagefiles[i];

        // Save to the image array
        loadedimages[i] = image;
        imagesD[image.src.split('/')[image.src.split('/').length - 1].split('.')[0]] = image;

    }

    console.log(imagesD, loadedimages);
    // Return an array of images
    return imagesD;
}