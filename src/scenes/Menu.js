class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('lightyears', './assets/lightyears.mp3');
        this.load.audio('sfx_explosion_0', './assets/explosion_01.wav');
        this.load.audio('sfx_explosion_1', './assets/explosion_02.wav');
        this.load.audio('sfx_explosion_2', './assets/explosion_03.wav');
        this.load.audio('sfx_explosion_3', './assets/explosion_04.wav');
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Menu");
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move, (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> Expert', menuConfig).setOrigin(0.5);
        //this.scene.start("playScene")

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 30000,  
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
          this.sound.play('lightyears');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 20000,
          }
          this.sound.play('sfx_select');
          this.sound.play('lightyears');
          this.scene.start('playScene');    
        }
    }
    
}