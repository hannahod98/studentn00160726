class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        this.active;
        this.currentScene;

        this.menubg;
    }

    preload() {
        this.load.image('menubg', 'assets/images/menu.jpg');
        this.load.image('button', 'assets/images/button.png');
        this.load.image('sound', 'assets/images/soundOff.png');
        this.load.audio('menu_music', 'assets/audio/Waterfall.mp3');
    }
    create() {
        let menubg = this.add.sprite(0, 0, 'menubg');
        let button = this.add.sprite(65, 460, 'button');
        let sound = this.add.sprite(550, 35, 'sound');

        let menu_music = this.sound.add('menu_music');

        menu_music.play();

        menubg.setOrigin(0, 0);
        button.setOrigin(0, 0);
        //When button is pressed the game scene starts and the main menu music stops
        button.setInteractive();
        button.on('pointerdown', () => this.scene.start('Game'));
        button.on('pointerdown', () => menu_music.stop());

        //mutes sound in main menu
        sound.setInteractive();
        sound.on('pointerdown', () => menu_music.stop());


    }
}

// create a new scene
//Game
let gameScene = new Phaser.Scene('Game');

var score = 0;
var scoreText;

// some parameters for our scene
gameScene.init = function () {


}

// load assets
gameScene.preload = function () {

    // load images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('whale', 'assets/images/whale.png');
    this.load.image('button', 'assets/images/quit_button.png');
    //assets for mute audio
    this.load.image('sound', 'assets/images/soundOff.png');
    this.load.audio('game_music', 'assets/audio/Cloud_Nine.mp3');

};

// called once after the preload ends
gameScene.create = function () {

    // create bg sprite
    let bg = this.add.sprite(0, 0, 'background');

    // change the origin to the top-left corner
    bg.setOrigin(0, 0);

    //score
    scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });

    // create whale
    var whale = this.add.image(0, 550, 'whale');
    whale.setScale(0.4);
    var tween = this.tweens.add({
        targets: whale,
        x: 600,
        ease: 'Power1',
        duration: 3000,
        flipX: true,
        yoyo: true,
        repeat: -1
    });

    //create a group
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 2,
        setXY: {
            x: 150,
            y: -30,
            stepX: 200,
            stepY: 150
        }
    });

  

    // create the player
    player = this.physics.add.sprite(300, this.sys.game.config.height / 1.3, 'player');

    // we are reducing the width and height 
    player.setScale(0.4);

    //player cannot go beyond the world bounds
    player.setCollideWorldBounds(true);

    //player is not affected by gravity
    player.body.allowGravity = false;


    this.physics.add.overlap(player, this.stars, collectStar, null, this);

    

    let button = this.add.sprite(6, 940, 'button');
    let sound = this.add.sprite(550, 975, 'sound');
    let game_music = this.sound.add('game_music');

    game_music.play();
    //mutes sound in game scene
    sound.setInteractive();
    sound.on('pointerdown', () => game_music.stop());

    button.setOrigin(0, 0);
    //When button is pressed the game scene starts and the main menu music stops
    button.setInteractive();
    button.on('pointerdown', () => this.scene.start('Menu'));
    button.on('pointerdown', () => game_music.stop());

};

//this.physics.add.collider(this.stars, player);
//this.physics.add.overlap(player, this.stars, collectStar, null, this);


// this is called up to 60 times per second
gameScene.update = function () {
    // check for active input
    if (this.input.activePointer.downX > 300) {
        // player walks
        player.x += 3.5;
    } else if (this.input.activePointer.downX < 150) {
        player.x -= 3.5;
    }

    this.stars.children.iterate(function (child) {
        //if the y position of the start is at the bottom 
        //then reset the y
        if (child.y > 1024) {

            child.disableBody(true, true);
            child.enableBody(true, child.x, 0, true, true);
            console.log(gameScene.physics.world.gravity.y);

        }

    });

  


    /*let stars = this.stars.getChildren();
    
    
    let numStars = this.stars.length;
    let starspeed = 1.5;

    for (let i = 0; i < numStars; i++) {
        
        console.log(this.stars[i].y)
        
        let starY = this.stars[i].y;
        if (starY > 1200) {
            this.stars[i].y = -30;
        }
        this.stars[i].y += this.starspeed;

        //console.log(this.stars[i].gravity);

        //console.log(starY);
        
    }*/



};

function collectStar(player, star) {

    console.log("collect star function called");

    star.disableBody(true, true);
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    //Sets the stars in ramdom positions after it resets
    var y = -(Math.floor((Math.random() * 100) + 1));

    star.enableBody(true, star.x, y, true, true);
}

//
//gameScene.gameOver = function () {
//
//
//};

// create a new game, pass the configuration
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 600,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 100
            }
        }
    },
    scene: [Menu, gameScene]
};
let game = new Phaser.Game(config);
