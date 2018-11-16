var cursors;
var score = 0;
var score1 = 0;
var score2 = 0;
var plasticVisited = 0;
var plastic = 0;
var exploreTxt;

var level2 = {

	create: function () {
		"use strict";
		game.add.image(0, 0, 'bg-level1');
		game.world.setBounds(0, 0, 1900, 1082);

		// physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;

		//AUDIO

		this.intromusic = game.add.audio('level1-audio');
		this.factbubble = game.add.audio('factbubble');
		this.intromusic.play();

		////FISH
		this.orangefish= game.add.sprite(1200, 600, 'orangefish');
		game.physics.enable(this.orangefish);
		game.add.tween(this.orangefish).to({ x: 800 }, 30000, Phaser.Easing.Linear.None, true, 0, 1200, true)

		//WHALE
		this.whale= game.add.sprite(0, -100, 'whale');
		game.physics.enable(this.whale);
		game.add.tween(this.whale).to({ y: 800 }, 30000, Phaser.Easing.Linear.None, true, 0, 1200, true)

		//Seahorse
		this.seahorse= game.add.sprite(1600, 300, 'seahorse');
		game.physics.enable(this.seahorse);
		game.add.tween(this.seahorse).to({ x: -100 }, 60000, Phaser.Easing.Linear.None, true, 0, 1200, true)
		var tween2 = game.add.tween(this.seahorse).to( { alpha: 1 }, 2000, "Linear", true);

    	//  The 1000 tells it to wait for 1 second before restarting the fade.
    	tween2.repeat(10, 1000);

    	////FISH
    	this.crab= game.add.sprite(1200, 900, 'nextcrab');
    	game.physics.enable(this.crab);
    	game.add.tween(this.crab).to({ x: 800 }, 30000, Phaser.Easing.Linear.None, true, 0, 1200, true)


		////STARS
		this.star1 = game.add.sprite(850, 10, 'star');
		this.star1.fixedToCamera = true;
		this.star1.visible = false;

		this.star2 = game.add.sprite(900, 10, 'star');
		this.star2.fixedToCamera = true;
		this.star2.visible = false;

		this.star3 = game.add.sprite(950, 10, 'star');
		this.star3.fixedToCamera = true;
		this.star3.visible = false;



		//WATER BOTTLE GROUP
		this.bottle = game.add.sprite(10, 100, 'bottle');
		game.add.tween(this.bottle).to({ x: 200 }, 20000, Phaser.Easing.Linear.None, true, 0, 1200, true)
		game.physics.arcade.enable(this.bottle);

	    //BottleFact
	    this.bottlefact = game.add.sprite(0, 3, 'factbottle');
	    game.physics.arcade.enable(this.bottlefact);
	    this.bottlefact.visible = false;


		//STRAW GROUP
		this.straw = game.add.sprite(400, 700, 'straw');
		game.add.tween(this.straw).to({ x: 450 }, 20000, Phaser.Easing.Linear.None, true, 0, 1200, true)
		game.physics.arcade.enable(this.straw);

		this.strawfact = game.add.sprite(300, 450, 'factstraw');
		game.physics.arcade.enable(this.strawfact);
		this.strawfact.visible = false;


		//PLASTIC BAG GROUP
		this.bag = game.add.sprite(1300, 100, 'bag');
		game.add.tween(this.bag).to({ x: 1400 }, 10000, Phaser.Easing.Linear.None, true, 0, 1200, true)
		game.physics.arcade.enable(this.bag);

		this.bagfact = game.add.sprite(900, 0, 'factbag');
		game.physics.arcade.enable(this.bagfact);
		this.bagfact.visible = false;

		
			//Submarine
			this.sub = game.add.sprite(game.world.width / 2, game.world.height/2, 'sub');
			game.camera.follow(this.sub);
			game.physics.arcade.enable(this.sub);
			cursors = game.input.keyboard.createCursorKeys();


		// Display the timer
		this.plasticVisited = game.add.text(700, 10, {
			font: "15px Rammetto One",
			fill: "white"});

		this.plasticVisited.fixedToCamera = true;
		this.plasticVisited.text = 'Plastics:'; 


	    //Feedback for next level

	    this.exploreTxt = this.add.text(10, 10, {
	    	font: "15px Rammetto One",
	    	fill: "#fff",
	    });
	    this.exploreTxt.fixedToCamera = true;
	    this.exploreTxt.text = 'Explorer Information:';


	},
	


	update: function () {
		"use strict";
		//responisve
		game.scale.setShowAll();
		game.scale.refresh(); 

		//overlaps
		game.physics.arcade.overlap(this.sub, this.bottle, BottlePop, null, this);
		game.physics.arcade.overlap(this.sub, this.straw, StrawPop, null, this);
		game.physics.arcade.overlap(this.sub, this.bag, BagPop, null, this);
		game.physics.arcade.overlap(this.sub, this.crab, nextlevel, null, this);
		game.physics.arcade.overlap(this.sub, this.crab, keepExploring, null, this);
		

		if(cursors.left.isDown && this.sub.x>-10){
			this.sub.x -= 5;
		//scaling 100% pointing in the orginal directiosn
		this.sub.scale.x = -1;
	}

	if(cursors.right.isDown && this.sub.x<2000){
		this.sub.x += 5;
		this.sub.scale.x = 1;	
	}
	if(cursors.up.isDown && this.sub.y>10){
		this.sub.y -= 5;	
	}

	if(cursors.down.isDown && this.sub.y<1900){
		this.sub.y += 5;
	}	
}
};


//BOTTLE FUNCTIONS
function BottlePop(sub, bottle) {
	"use strict";
	this.bottlefact.visible = true;
	this.star1.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 15, fadeBottle, this);
	score++;

};

function fadeBottle() {
	"use strict";
	game.add.tween(this.bottlefact).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.bottlefact = game.add.sprite(5, 3, 'factbottle');
	this.bottlefact.visible = false;

};


//STRAW FUNCTIONS
function StrawPop(sub, straw) {
	"use strict";
	this.strawfact.visible = true;
	this.star2.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 15, fadeStraw, this);
	score1++;
	
};

function fadeStraw() {
	"use strict";
	game.add.tween(this.strawfact).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.strawfact = game.add.sprite(300, 450, 'factstraw');
	this.strawfact.visible = false;
};


//BAG FUNCTIONS
function BagPop(sub, bag) {
	"use strict";
	this.bagfact.visible = true;
	this.star3.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 15, bagStraw, this);
	score2++;
	
};

function bagStraw() {
	"use strict";
	game.add.tween(this.bagfact ).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.bagfact = game.add.sprite(900, 0, 'factbag');
	this.bagfact .visible = false;
};


//Try again
function keepExploring() {
	"use strict";
	this.exploreTxt.text = 'Keep Exploring... Find 3 Ocean facts to continue' ;
};


function nextlevel(sub, crab){
	"use strict";

	if (score >= 1 && score1 >= 1 && score2 >= 1) {
		sub.kill();
		console.log(score + score2 + score1);

		setTimeout(function() {
			game.state.start("level2");
		}, 500);
	}
}

function fadeTxT() {
	"use strict";
	game.add.tween(this.strawfact).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.strawfact = game.add.sprite(300, 450, 'factstraw');
	this.strawfact.visible = false;
};









