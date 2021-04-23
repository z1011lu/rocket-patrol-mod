//const { Phaser } = require("../lib/phaser");
//Rocket Patrol Mod
//By Zachary Lu
//It took me about 15 hours to complete
//4/21/21
//Royalty free music by Eric Matyas

//Points breakdown:
/*
Starting: 10
Add your own (copyright-free) background music to the Play scene (5)
Create a new scrolling tile sprite for the background (5)

Novice: 50
Create 4 new explosion SFX and randomize which one plays on impact (10)
Create a new animated sprite for the Spaceship enemies (10)
Create a new title screen (e.g., new artwork, typography, layout) (10)
Replace the UI borders with new artwork (10)
Implement parallax scrolling (10)

Intermediate: 40
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)

*/

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

