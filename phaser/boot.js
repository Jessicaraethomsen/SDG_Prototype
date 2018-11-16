// The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {


	active: function () {
	
		game.time.events.add(Phaser.Timer.SECOND, this.createText);
	},

	// The Google Fonts we want to load (specify as many as you like in the array)
	google: {
		families: ['Rammetto One']

	},

	createText: function () {
		// dummy function to render Google web fonts
	}

};

// Boot screen, JS object literal notation


var boot = {

	preload: function () {
		//loading bar
		var preloader = game.add.sprite(game.world.centerX - 250 , 200, 'preloading');
		this.load.setPreloadSprite(preloader);
		// preloading Background Images
		
		
		
		//INTRODUCTION SPLASH SCREEN
		game.load.image('button', 'assets/button_sprite.png');
		game.load.image('bg', 'assets/bg.png');
		game.load.image('seahorse', 'assets/seahorse.png');
		game.load.image('orangefish', 'assets/orangefish.png');



		//Splash1- GAME INSTRUCTIONS
		game.load.image('bg-intro-sign', 'assets/oceanafari-intro-sign.png');
		game.load.image('whale', 'assets/whale.png', 250, 215);


		
		//LEVEL1 BACKGROUND-ocean
		game.load.image('bg-level1', 'assets/bg-water.png');
		game.load.image('bg-land', 'assets/bg-land.png');
	


		//Elements
		game.load.image('boat', 'assets/boat.png');
		game.load.image('scooter', 'assets/scooter.png');
		game.load.image('logo', 'assets/logo.png');

		//Controls & Buttons
		game.load.image('music', 'assets/bg-music.png');
		game.load.image('help', 'assets/help.png');
		game.load.image('music-off', 'assets/bg-music-off.png');
		game.load.image('cancel', 'assets/cancel.png');


		//Popup Windows
		game.load.image('helpPop', 'assets/helpPop.png');






		//LEVEL2 BACKGROUND-arcticsea


  
		//AUDIO FILES
		 game.load.audio('level1-audio', 'audio/level1audio.mp3');
		 game.load.audio('factbubble', 'audio/fact.wav');
		
		

		game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
		game.scale.setShowAll();
		game.scale.refresh(); 



	},



	//INTRODUCTION SPLASH SCREEN- on boot.
	create: function () {

		game.add.image(0, 0, 'bg-level1');
		game.world.setBounds(0, 0, 1900, 1082);
		
		var button = game.add.button(game.world.centerX - 600, 280, 'button', this.actionOnClick, this, 2, 1, 0);

		this.seahorse = game.add.sprite(game.height / 2, 400, 'seahorse');
		this.seahorse.anchor.setTo(0.5, 0);
		game.physics.enable(this.seahorse);
		game.physics.arcade.enableBody(this.seahorse); // important for velocity (movement) + collision detection
		this.seahorse.body.collideWorldBounds = true; // seahorse cannot leave the world ;-)
		this.seahorse.body.velocity.setTo(-20, 0);
		this.seahorse.body.bounce.set(1, 1);


		this.orangefish = game.add.sprite(game.height / 4, 40, 'orangefish');
		this.orangefish.anchor.setTo(0.5, 0);
		game.physics.enable(this.orangefish);
		game.physics.arcade.enableBody(this.orangefish); 
		this.orangefish.body.collideWorldBounds = true; 
		this.orangefish.body.velocity.setTo(-40, 0);
		this.orangefish.body.bounce.set(1, 1);

		var title = game.add.text(game.world.centerX - 740 , 120, 'Goal 2: Zero Hunger', {
			font: "60px Rammetto One",
			fill: "#fff"
		});

		title.anchor.set(0.1);


		var title2 = game.add.text(game.world.centerX - 550 , 200, 'EXPLORE AND LEARN', {
			font: "20px Rammetto One",
			fill: "#fff"
		});
				title2.anchor.set(0.1);


		
	},



	update: function () {
		// changing seahorse's sprite orientation on impact with the world's bounds
		if (this.seahorse.body.blocked.left) {
			this.seahorse.scale.x = -1;
		} else if (this.seahorse.body.blocked.right) {
			this.seahorse.scale.x = 1;
		}

		if (this.orangefish.body.blocked.left) {
			this.orangefish.scale.x = -1;
		} else if (this.orangefish.body.blocked.right) {
			this.orangefish.scale.x = 1;
		}


	},

	actionOnClick: function () {
		// launching level 1 splash screen
		game.state.start('level1');
		game.sound.stopAll(); 
	},

	instructionLaunch: function (){
		game.state.start('instructionSplash');
			game.sound.stopAll(); 

	}

}
