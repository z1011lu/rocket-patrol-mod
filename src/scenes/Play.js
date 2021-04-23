class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket_01.png');
        this.load.image('spaceship', './assets/spaceship_01.png');
        this.load.image('starfield', './assets/spacefield.png');
        this.load.image('speedship', './assets/spaceship_03.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion_spritesheet_01.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //place custom UI border

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);


        //this.add.text(20, 20, "Rocket Patrol Play");

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        this.ship04 = new Speedship(this, -borderUISize*6, borderUISize*3.5, 'speedship', 0, 30).setOrigin(0, 0);
        this.ship05 = new Speedship(this, -borderUISize*3, borderUISize*4.5 + borderPadding*2, 'speedship', 0, 20).setOrigin(0,0);
        this.ship06 = new Speedship(this, game.config.width, borderUISize*6 + borderPadding*5.5, 'speedship', 0, 10).setOrigin(0,0);
        

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;


        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);


        this.timerRight = this.add.text(game.config.width - borderUISize - borderPadding * 10, borderUISize + borderPadding*2, game.settings.gameTimer/1000, scoreConfig);
        

        //Game over flag
        this.gameOver = false;


        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


    }
    update() {
        this.seconds += 0.01
        //this.timerRight.text = game.settings.gameTimer/1000 - Math.floor(this.seconds)
        /**
        currentTime = new Date();
        timeDifference = me.startTime.getTime() - currentTime.getTime();

        this.timeElapsed = Math.abs(timeDiffernece/1000);
        timeRemaining = this.game.settings.gameTimer - this.timeElapsed;


        this.timerRight.text = timeRemaining;
        **/


        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();

        if (!this.gameOver) { 
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();

            this.ship04.update();               // update speedships (x3)
            this.ship05.update();
            this.ship06.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
        }
        if (this.checkCollision(this.p1Rocket, this.ship06)) {
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship06);
        }
        

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;   
        let rng = Math.random();
        if(rng < 0.25){
            this.sound.play('sfx_explosion_0');
        }else if(rng < 0.5){
            this.sound.play('sfx_explosion_1');
        }else if(rng < 0.75){
            this.sound.play('sfx_explosion_2');
        }else{
            this.sound.play('sfx_explosion_3');
        }
    }

    

    
}