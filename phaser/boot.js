// The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {


	active: function () {
	
		game.time.events.add(Phaser.Timer.SECOND, this.createText);
	},

	// The Google Fonts we want to load (specify as many as you like in the array)
	google: {
		families: ['Poppins']

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
		game.load.image('boat', 'assets/boat.png');
	



		//Splash1- GAME INSTRUCTIONS
		//game.load.image('bg-level1', 'assets/bg-water.png');
		


		
		//LEVEL1 BACKGROUND-ocean
		game.load.image('bg-level1', 'assets/bg-water.png');
		game.load.image('bg-land', 'assets/bg-land.png');
		game.load.image('bg-cover', 'assets/bg-cover.png');
	


		//Elements
		game.load.image('boat', 'assets/boat.png');
		game.load.image('scooter', 'assets/scooter.png');
		game.load.image('logo', 'assets/logo.png');
		game.load.image('marker', 'assets/marker.png');
		game.load.image('star', 'assets/star.png');

		//Controls & Buttons
		game.load.image('music', 'assets/bg-music.png');
		game.load.image('help', 'assets/help.png');
		game.load.image('music-off', 'assets/bg-music-off.png');
		game.load.image('cancel', 'assets/cancel.png');


		//Popup Windows
		game.load.image('helpPop', 'assets/helpPop.png');
		game.load.image('japanPop', 'assets/japanPop.png');
		game.load.image('moroccoPop', 'assets/moroccoPop.png');
		game.load.image('aussiePop', 'assets/aussiePop.png');
		game.load.image('italyPop', 'assets/italyPop.png')
		game.load.image('mexicoPop', 'assets/mexicoPop.png');
		game.load.image('brazilPop', 'assets/brazilPop.png')




		//LEVEL2 BACKGROUND-arcticsea


  
		//AUDIO FILES
		 game.load.audio('level1-audio', 'audio/Lovable_Clown_Sit_Com.mp3');
		 game.load.audio('factbubble', 'audio/fact.wav');
		
		

		game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
		game.scale.setShowAll();
		game.scale.refresh(); 



	},



	//INTRODUCTION SPLASH SCREEN- on boot.
	create: function () {

		game.add.image(0, 0, 'bg-cover');
		game.world.setBounds(0, 0, 1900, 1082);
		
		var button = game.add.button(game.world.centerX - 600, 380, 'button', this.actionOnClick, this, 2, 1, 0);

		this.boat = game.add.sprite(game.height / 2, 400, 'boat');
		this.boat.anchor.setTo(0.5, 0);
		game.physics.enable(this.boat);
		game.physics.arcade.enableBody(this.boat); 
		this.boat.body.collideWorldBounds = true; 
		this.boat.body.velocity.setTo(-10, 0);
		this.boat.body.bounce.set(1, 1);
		this.boat.scale.x = -1;

		var title = game.add.text(game.world.centerX - 690 , 60, '', {
			font: "60px poppins",
			fill: "#fff"
		});

		title.anchor.set(0.1);
	},


	update: function () {
		// changing boat's sprite orientation on impact with the world's bounds
		
		if (this.boat.body.blocked.left) {
			this.boat.scale.x = 1;
		} else if (this.boat.body.blocked.right) {
			this.boat.scale.x = -1;
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
