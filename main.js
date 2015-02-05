// create our only state, 'mainState'
var mainState = {

  // define the 3 default Phaser functions

  preload: function () {
    // this function will be executed at the beginning
    // load game assets

    game.load.image('player', 'assets/player.png');
    game.load.image('wallV', 'assets/wallVertical.png');
    game.load.image('wallH', 'assets/wallHorizontal.png');
  },

  create: function () {
    // called after preload function
    // set up the game, display sprites, etc.

    game.stage.backgroundColor = '#3498db';
    game.physics.startSystem(Phaser.Physics.ARCADE);


    // set up our player ----------------------------------

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 0.5);

    // tell Phaser that the player will use the Arcade physics engine
    game.physics.arcade.enable(this.player);

    // add vertical gravity to the player
    this.player.body.gravity.y = 500;


    // set up controls ------------------------------------

    this.cursor = game.input.keyboard.createCursorKeys();

    this.createWorld();
  },

  update: function () {
    // this function called 60 times / second
    // contains the game's logic

    game.physics.arcade.collide(this.player, this.walls);
    this.movePlayer();
  },

  movePlayer: function () {
    // left arrow key
    if(this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    }

    // right arrow key
    else if(this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    }

    // neither right nor left is pressed
    else {
      // stop the player
      this.player.body.velocity.x = 0;
    }

    // up arrow key && player touching the ground
    if(this.cursor.up.isDown && this.player.body.touching.down) {
      // jump
      this.player.body.velocity.y = -320;
    }
  },

  createWorld: function() {
    // walls ----------------------------------------------

    this.walls = game.add.group();
    this.walls.enableBody = true;

    // side walls
    game.add.sprite(0, 0, 'wallV', 0, this.walls); // left wall
    game.add.sprite(480, 0, 'wallV', 0, this.walls); // right wall

    // floors/ceilings
    game.add.sprite(0, 0, 'wallH', 0, this.walls); //top left
    game.add.sprite(300, 0, 'wallH', 0, this.walls) //top right
    game.add.sprite(0, 320, 'wallH', 0, this.walls) // bottom left
    game.add.sprite(300, 320, 'wallH', 0, this.walls) // bottom right

    game.add.sprite(-100, 160, 'wallH', 0, this.walls) // middle left
    game.add.sprite(400, 160, 'wallH', 0, this.walls); //middle right

    var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
    middleTop.scale.setTo(1.5, 1);
    var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
    middleBottom.scale.setTo(1.5, 1);

    // this.walls.setAll('body.immovable', true);
  },

  playerDie: function() {
    console.log("player dead");
    game.start.start('main');
  },

};

// create a 500px by 340px game in the 'gameDiv' element
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');