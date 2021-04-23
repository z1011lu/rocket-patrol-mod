//const { Phaser } = require("../lib/phaser");
//Rocket Patrol Mod
//By Zachary Lu
//It took me about 15 hours to complete
//4/21/21

//Points breakdown: TO DO

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

