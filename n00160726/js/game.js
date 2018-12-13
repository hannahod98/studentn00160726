//08 - Final
let gameScene = new Phaser.Scene('Game');
var score = 0;
var scoreText;
// set the configuration of the game
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 600,
    height: 1024,
    scene: gameScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 60 }
        }
    }
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);


// create a new scene


var timedEvent;
// some parameters for our scene
gameScene.init = function () {

    this.playerMaxX = 600
    this.playerMinX = 0
    this.starsMaxY = 280;
    this.starsMinY = 80;
    this.enemySpeed = 1.5;
    this.enemyBoundaryXMax = 600;
    this.enemyBoundaryYMin = -50;
    this.playerBoundaryXMax = 600;
    this.playerBoundaryYMin = 0;
}

// load assets
gameScene.preload = function () {
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('whale', 'assets/whale.png');
   /* this.load.spritesheet('player', 'assets/spritesheet.png',{
        frameWidth: 90, frameHeight: 100, endFrame: 3});*/


};

// called once after the preload ends
gameScene.create = function () {
    this.physics.world.gravity.y = 60;

    // create bg sprite
    let bg = this.add.sprite(0, 0, 'background');

    // change the origin to the top-left corner
    bg.setOrigin(0, 0);
    //score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // create the player
    this.player = this.physics.add.sprite(300, this.sys.game.config.height / 1.3, 'player');
//    this.anims.create({
//        key: 'walk',
//        frames: this.anims.generateFrameNumbers('player',{start: 0, end: 3}),
//        frameRate: 10,
//        repeat: -1
//    })

    // we are reducing the width and height by 50%
    this.player.setScale(0.2);
    //console.log(this.player);
    this.player.setCollideWorldBounds(true);
    // create whale
    this.whale = this.add.sprite(350, 540, 'whale');
    this.whale.setScale(0.4);
    
//    whale.flipX = true;
//    whale.flipY = true;
//    star = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this});
//     //06: group of enemies
//  this.stars = this.add.group({
//    key: 'star',
//    repeat: 4,
//    setXY: {
//      x: 110,
//      y: 100,
//      stepX: 90,
//      stepY: 20   let ranVal = Phaser.Math.Between(-100,-300);
  
//    }
//    });
    
    this.stars = this.physics.add.group({
        defaultKey: 'star',
        repeat: 4,
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: false
    });
    
//    for (let i=0;i<this.stars.length; i++){
    
        let ranVal = Phaser.Math.Between(-100,-300);
        this.stars.create(200, -30).setGravity(0, Phaser.Math.Between(100,300));     
        this.stars.create(300, -30).setGravity(0, Phaser.Math.Between(100,300));     
        this.stars.create(400, -30).setGravity(0, Phaser.Math.Between(100,300));     
        this.stars.create(500, -30).setGravity(0, Phaser.Math.Between(100,300));     
    

//    this.stars.create(200, 300).setGravity(0, -120);
//    this.stars.create(300, 300);
//    this.stars.create(400, 300);
//    this.stars.create(500, 300, 'star').body.allowGravity = false
    
//};

//this.physics.add.collider(stars, player);
//this.physics.add.overlap(player, stars, collectStar, null, this);
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

function onEvent ()
{
    timedEvent.reset({ delay: Phaser.Math.Between(100,5000), callback: onEvent, callbackScope: this, repeat: 1});
}

// this is called up to 60 times per second
gameScene.update = function () {
    // check for active input
    if (this.input.activePointer.downX > 300) {
        // player walks
//        player.anims.load('walk')
        this.player.x += 2.5;
//        this.playerBoundaryXMax;
        
    } else if (this.input.activePointer.downX < 150) {
        //console.log(this.player.x );
        this.player.x -= 2.5;
//        this.playerBoundaryYMin;
    } else {
        console.log("Pointer x" + this.input.activePointer.downX);
        console.log(this.player.x);
    }
    if (this.whale.x > this.enemyBoundaryXMax) {

        this.enemySpeed *= -1;
    }
    //move whale
    if (this.whale.x < this.enemyBoundaryYMin) {
       
        this.enemySpeed *= -1;
    }
    this.whale.x += this.enemySpeed;
    
    let stars = this.stars.getChildren();
    let numStars = stars.length;
        
    for (let i=0;i< numStars; i++) {
        let starY = stars[i].y;
        if (starY > 500) {
            stars[i].y = -30;
            
        }
        
        console.log(starY);
    }   
};   

gameScene.gameOver = function () {


}

    
};

