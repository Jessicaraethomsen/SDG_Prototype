var cursors;
var score = 0;
var score1 = 0;
var score2 = 0;
var popup;
var tween = null;
var button;

var level1 = {

	create: function () {
		"use strict";

		//SETTING GAME WORLD AND BG
		game.add.image(0, 0, 'bg-level1');
		game.world.setBounds(0, 0, 1900, 1082);

		// GAME WORLD PHYSICS 
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;

		//Background Countries
		this.land = game.add.sprite(0, 0,'bg-land');

		//AUDIO
		this.intromusic = game.add.audio('level1-audio');
		this.intromusic.play();

		//AUDIO BUTTON ON/PAUSED
		//ON
		this.button = game.add.button(940, 0,'music', offVolume, this);
    	this.button.input.useHandCursor = true;
		this.button.fixedToCamera = true;
		this.button.visible = true;

		//OFF
		this.buttonOff = game.add.button(940, 0,'music-off', onVolume, this);
    	this.buttonOff.input.useHandCursor = true;
		this.buttonOff.fixedToCamera = true;
		this.buttonOff.visible = false;


		//HELP BUTTON
		this.buttonHelp = game.add.button(890, 0,'help', openWindow, this);
    	this.buttonHelp.input.useHandCursor = true;
    	this.buttonHelp.fixedToCamera = true;
		this.buttonHelp.visible = true;

		//LOGO CONST
		this.logo = game.add.sprite(0, 0,'logo');
		this.logo.fixedToCamera = true;
	
		//SCOOTER
			this.explorer = game.add.sprite(game.world.width / 2, game.world.height/2, 'scooter');
			game.camera.follow(this.explorer);
			game.physics.arcade.enable(this.explorer);
			cursors = game.input.keyboard.createCursorKeys();
			this.explorer.visible = true;

		//BOAT


		//POPUP
		 //  You can drag the pop-up window around
		 this.popup = game.add.sprite(game.world.centerX, game.world.centerY, 'helpPop');
		 this.popup.alpha = 0.8;
		 this.popup.anchor.set(0.5);
		 this.popup.inputEnabled = true;
		 this.popup.visible = false;

	    //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
	    var pw = (this.popup.width / 2) - 30;
	    var ph = (this.popup.height / 2) - 8;

	    //  And click the close button to close it down again
	    var closeButton = game.make.sprite(pw, -ph, 'cancel');
	   	closeButton.inputEnabled = true;
	    closeButton.input.priorityID = 1;
	    closeButton.input.useHandCursor = true;
	    closeButton.events.onInputDown.add(closeWindow, this);

	    //  Add the "close button" to the popup window image
	    this.popup.addChild(closeButton);

	    //  Hide it awaiting a click
	    this.popup.scale.set(0.1);


		// COUNTRIES VISITED
		this.countriesVisited = game.add.text(500, 10,);
		this.countriesVisited.fixedToCamera = true;
		this.countriesVisited.text = 'Visited Countries:'; 
		this.countriesVisited.addColor("#fff", 0); //white


	    //FEEDBACK/ARE YOU FINISHED EXPLPORING

	    this.exploreTxt = this.add.text(10, 10, {
	    	font: "10px Rammetto One",
	    	fill: "#fff"});
	    this.exploreTxt.fixedToCamera = true;
	    this.exploreTxt.text = '';
	    this.exploreTxt.addColor("#fff", 0);  	    
	},
	


	update: function () {
		"use strict";
		//ALLOWS GAME TO BE RESIZED (REFRESH SCREEN)
		game.scale.setShowAll();
		game.scale.refresh(); 
		this.explorer.rotation = game.physics.arcade.angleToPointer(this.explorer);


		//OVERLAPS
		game.physics.arcade.overlap(this.explorer, this.land, SwitchTransport, null, this);
		//COLLOSIONS
	




    	//  ONLY MOVE WHEN MOUSE ISDOWN
    if(game.input.activePointer.isDown)
    {
        //  250 SPEED THROUGH MOUSE
        game.physics.arcade.moveToPointer(this.explorer, 250);

    }

    else
    {
        this.explorer.body.velocity.setTo(0, 0);
        	
    }

}
};





//FUNCTION TO SWITCH FROM BOAT TO SCOOTER
function SwitchTransport(explorer, land) {
	"use strict";
	this.explorer.visible = true;

};


//MUSIC ON/OFF FUNCTIONS
function offVolume() {
	"use strict";
		this.intromusic.pause();
		this.button.visible = false;
		this.buttonOff.visible = true;

console.log("clickclick");
  
};


function onVolume() {
	"use strict";
		this.intromusic.pause();
		this.buttonOff.visible = false;
	    this.button.visible = true;
	    this.intromusic.play();


console.log("clickclick");
  
};

function openWindow() {

	console.log("clickclick");

    if ((tween !== null && tween.isRunning) || this.popup.scale.x === 1)
    {
        return;
    }
    this.popup.visible = true;
    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    tween = game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);

}

function closeWindow() {

    if (tween && tween.isRunning || this.popup.scale.x === 0.1)
    {
        return;
    }

    //  Create a tween that will close the window, but only if it's not already tweening or closed
    tween = game.add.tween(this.popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
    this.popup.visible = false;
}


//NEXT LEVEL EXPLORING DONE
function nextlevel(explorer, crab){
	"use strict";

	if (score >= 1 && score1 >= 1 && score2 >= 1) {
		explorer.kill();
		console.log(score + score2 + score1);
		setTimeout(function() {
			this.game.state.start("boot"); 
		}, 500);
	}

};





