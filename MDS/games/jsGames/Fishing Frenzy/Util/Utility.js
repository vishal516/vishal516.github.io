//-----------------------SECONDS TO hh:mm:ss --------------------------------------------------------------------------
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

//------------------------SPRITE-FONT-----------------------------------------------------------------------------------
class SpriteFont {
    static DEFAULT_OPTIONS = {
        scale: 1,
        characterSpacing: 1,
        lineSpacing: 10,
        align: 'left',
    };

    constructor(sourceImage, destinationCanvas, config, options = {}) {
        this.sourceImage = sourceImage;

        this.destinationCanvas = destinationCanvas;
        this.destinationContext = destinationCanvas.getContext('2d');
        console.log(context);

        this.config = config;

        this.options = Object.assign({}, SpriteFont.DEFAULT_OPTIONS, options);
    }

    drawCharacter(character, position = { x: 0, y: 0 }) {
        const characterIndex = this.config.characterSet.indexOf(character);

        if (characterIndex === -1) {
            throw new Error(`Font character "${character}" is not defined`);
        }

        const rowIndex = Math.floor(characterIndex / this.config.columnCount);
        const columnIndex = characterIndex % this.config.columnCount;

        const {
            characterWidth,
            characterHeight,
            horizontalSpacing,
            verticalSpacing,
        } = this.config;

        const sourceX = columnIndex * (characterWidth + horizontalSpacing);
        const sourceY = rowIndex * (characterHeight + verticalSpacing);
        const sourceWidth = characterWidth;
        const sourceHeight = characterHeight;

        const destinationX = position.x;
        const destinationY = position.y;
        const destinationWidth = characterWidth * this.options.scale;
        const destinationHeight = characterHeight * this.options.scale;

        this.destinationContext.drawImage(
            this.sourceImage,
            sourceX, sourceY, sourceWidth, sourceHeight,
            destinationX, destinationY, destinationWidth, destinationHeight
        );
    }

    drawWord(word, position = { x: 0, y: 0 }) {
        const characters = this.splitWordIntoCharacters(word);

        characters.forEach((character, characterIndex) => {
            let characterSpacing = this.options.characterSpacing;
            if (characterIndex === 0) {
                characterSpacing = 0;
            }

            const characterTotalWidth = this.config.characterWidth * this.options.scale + characterSpacing;

            const characterX = position.x + characterIndex * characterTotalWidth;
            const characterY = position.y;

            const characterPosition = {
                x: characterX,
                y: characterY,
            };

            this.drawCharacter(character, characterPosition);
        });
    }

    drawLine(line, position = { x: 0, y: 0 }) {
        const words = this.splitLineIntoWords(line);

        let prevWordEndX = 0;

        words.forEach((word, wordIndex) => {
            const wordX = position.x + prevWordEndX;
            const wordY = position.y;
            const wordPosition = {
                x: wordX,
                y: wordY,
            };

            this.drawWord(word, wordPosition);

            const wordWidth = this.getWordWidth(word);

            let wordSpacing = this.getWordSpacing();
            if (wordIndex === words.length - 1) {
                wordSpacing = 0;
            }

            const wordTotalWidth = wordWidth + wordSpacing;

            prevWordEndX += wordTotalWidth;
        });
    }

    drawText(text, position = { x: 0, y: 0 }) {
        const textWidth = this.getTextWidth(text);

        const lines = this.splitTextIntoLines(text);

        lines.forEach((line, lineIndex) => {
            let lineSpacing = this.options.lineSpacing;
            if (lineIndex === 0) {
                lineSpacing = 0;
            }

            const lineWidth = this.getLineWidth(line);

            let lineX = position.x;
            if (this.options.align === 'center') {
                lineX += (textWidth - lineWidth) / 2;
            } else if (this.options.align === 'right') {
                lineX += textWidth - lineWidth;
            }

            const lineTotalHeight = this.config.characterHeight * this.options.scale + lineSpacing;

            const lineY = position.y + lineTotalHeight * lineIndex;

            const linePosition = {
                x: lineX,
                y: lineY,
            };

            this.drawLine(line, linePosition);
        });
    }

    splitWordIntoCharacters(word) {
        return Array.from(word);
    }

    splitLineIntoWords(line) {
        return line.split(' ');
    }

    splitTextIntoLines(text) {
        return text.split('\n');
    }

    getWordWidth(word) {
        const allCharactersWidth = word.length * (this.config.characterWidth * this.options.scale);
        const allSpacingsWidth = (word.length - 1) * this.options.characterSpacing;

        const wordWidth = allCharactersWidth + allSpacingsWidth;

        return wordWidth;
    }

    getWordSpacing() {
        return this.config.characterWidth * this.options.scale + this.options.characterSpacing * 2
    }

    getLineWidth(line) {
        let lineWidth = 0;

        const words = this.splitLineIntoWords(line);

        words.forEach((word, wordIndex) => {
            const wordWidth = this.getWordWidth(word);

            let wordSpacing = this.getWordSpacing();
            if (wordIndex === 0) {
                wordSpacing = 0;
            }

            const wordTotalWidth = wordWidth + wordSpacing;

            lineWidth += wordTotalWidth;
        });

        return lineWidth;
    }

    getTextWidth(text) {
        const lines = this.splitTextIntoLines(text);

        const lineWidths = lines.map((line) => {
            return this.getLineWidth(line);
        });

        const maxLineWidth = Math.max(...lineWidths);

        return maxLineWidth;
    }
}

var spriteFont = null;

function spriteFontInitialization() {
    {
        const config = {
            characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;?!-+=~&$%()\/{}[]<>^*▲▼@',
            characterWidth: 128,
            characterHeight: 128,
            horizontalSpacing: 0,
            verticalSpacing: 0,
            columnCount: 8,
            rowCount: 8,
        };
        const destinationCanvas = canvas;

        const intermediaryCanvas = document.createElement('canvas');
        const intermediaryContext = intermediaryCanvas.getContext('2d');

        const image = img.Font;

        intermediaryCanvas.width = image.naturalWidth;
        intermediaryCanvas.height = image.naturalHeight;
        intermediaryContext.drawImage(image, 0, 0);

        const scalefactor = 0.4;
        const options = {
            scale: scalefactor,
            characterSpacing: -60 * scalefactor,
            align: 'center',
        };
        spriteFont = new SpriteFont(
            intermediaryCanvas,
            destinationCanvas,
            config,
            options
        );
        console.log('spriteFont intace created');
    }
    spriteFont.drawText('THE DOG BARKS\nVERY LOUDLY\nAT THE FENCE', { x: 10, y: 0 });

}

function randomBool(min, max) {
    return random(1, 2) == 1 ? min : max;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min)).toFixed(3);
}

//-------------------simple stopwatch-----------------------------------------------------------------------------------------------
function stopwatch(t) {
    function timer() {
        console.log('local t: ' + t.toString().toHHMMSS());
        t -= 1;
        if (t == 0) {
            console.log('timer finished');
            clearTimeout(timer);
        }
    }
    return setInterval(timer, 1000);
}


//-------------------custom sound class-----------------------------------------------------------------------------------------------
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}
//-------------------UNUSED CODE-------------------------------------------------------------------------------------------------------

// function keyboardInput() {
//     if (keyState[37]) {}
//     if (keyState[38]) {}
//     if (keyState[39]) {}
//     if (keyState[40]) {}
//     if (keyState[13]) {}
// }

// function moveplayerFourDirectional() {

//     if (keyState[37]) {
//         gameobjects.square.x -= canvas.width / 100;
//     }
//     if (keyState[38]) {
//         gameobjects.square.y -= canvas.width / 100;
//     }
//     if (keyState[39]) {
//         gameobjects.square.x += canvas.width / 100;
//     }
//     if (keyState[40]) {
//         gameobjects.square.y += canvas.width / 100;
//     }
//     if (gameobjects.square.x + gameobjects.square.width > canvas.width)
//         gameobjects.square.x = canvas.width - gameobjects.square.width;
//     if (gameobjects.square.x < 0)
//         gameobjects.square.x = 0;
//     if (gameobjects.square.y + gameobjects.square.height > canvas.height)
//         gameobjects.square.y = canvas.height - gameobjects.square.height;
//     if (gameobjects.square.y < 0)
//         gameobjects.square.y = 0;

// }

// function stopwatchTimeOut() { //called on stopwatch time complete
//     console.log('timer finished');
//     if (gameobjects.player.score >= gameobjects.player.target) { //pass
//         gameobjects.gamestate = gameobjects.states.overpass;
//         gameobjects.player.level += 1;
//         clearLastGame();

//         //gameobjects.player.level += 1;
//         //gameobjects.player.target = gameobjects.player.targetMin + gameobjects.player.level * gameobjects.player.targetTolevelFactor;

//     } else{ //fail
//         gameobjects.gamestate = gameobjects.states.overfail;
//         gameobjects.player.level = 1;
//         clearLastGame();
//     }
// };