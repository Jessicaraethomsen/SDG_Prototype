var cursors;
var score = 0;
var popup;
var scoreTxt;
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

		//Japan Marker
		this.japanMarker = game.add.sprite(1675, 330, 'marker');
		game.physics.arcade.enable(this.japanMarker);
		this.japanStar = game.add.sprite(1675, 330, 'star');
		game.physics.arcade.enable(this.japanStar);
		this.japanStar.visible = false;
		this.japanPop = game.add.sprite(1275, 150, 'japanPop');
		this.japanPop.visible = false;

		//ItalyMarker
		this.italyMarker = game.add.sprite(1060, 330, 'marker');
		game.physics.arcade.enable(this.italyMarker);
		this.italyStar = game.add.sprite(1060, 330, 'star');
		game.physics.arcade.enable(this.italyStar);
		this.italyStar.visible = false;
		this.italyPop = game.add.sprite(1060, 230, 'italyPop');
		this.italyPop.visible = false;


		//mexicoMarker
		this.mexicoMarker = game.add.sprite(200, 450, 'marker');
		game.physics.arcade.enable(this.mexicoMarker);
		this.mexicoStar = game.add.sprite(200, 450, 'star');
		game.physics.arcade.enable(this.mexicoStar);
		this.mexicoStar.visible = false;
		this.mexicoPop = game.add.sprite(200, 250, 'mexicoPop');
		this.mexicoPop.visible = false;


		//brazilMarker
		this.brazilMarker = game.add.sprite(450, 600, 'marker');
		game.physics.arcade.enable(this.brazilMarker);
		this.brazilStar = game.add.sprite(450, 600, 'star');
		game.physics.arcade.enable(this.brazilStar);
		this.brazilStar.visible = false;
		this.brazilPop = game.add.sprite(450, 700, 'brazilPop');
		this.brazilPop.visible = false;


		//morrocoMarker
		this.morrocoMarker = game.add.sprite(925, 420, 'marker');
		game.physics.arcade.enable(this.morrocoMarker);
		this.morrocoStar = game.add.sprite(925, 420, 'star');
		game.physics.arcade.enable(this.morrocoStar);
		this.morrocoStar.visible = false;
		this.moroccoPop = game.add.sprite(925, 520, 'moroccoPop');
		this.moroccoPop.visible = false;

		//austrailaMarker
		this.austrailaMarker = game.add.sprite(1600, 830, 'marker');
		game.physics.arcade.enable(this.austrailaMarker);
		this.austrailaStar = game.add.sprite(1600, 830, 'star');
		game.physics.arcade.enable(this.austrailaStar);
		this.austrailaStar.visible = false;
		this.aussiePop = game.add.sprite(1500, 650, 'aussiePop');
		this.aussiePop.visible = false;



		//SCOOTER
		this.explorer = game.add.sprite(game.world.width / 2, game.world.height/2, 'scooter');
		game.camera.follow(this.explorer);
		game.physics.arcade.enable(this.explorer);


		cursors = game.input.keyboard.createCursorKeys();

		//POPUP
		 this.popup = game.add.sprite(game.world.centerX, game.world.centerY, 'helpPop');
		 this.popup.alpha = 0.9;
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


	    //FEEDBACK/ARE YOU FINISHED EXPLPORING

	    this.exploreTxt = this.add.text(10, 10, {
	    	font: "10px Poppin",
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
		game.physics.arcade.overlap(this.explorer, this.japanMarker, japanPop, null, this);
		game.physics.arcade.overlap(this.explorer, this.italyMarker, italyPop, null, this);
		game.physics.arcade.overlap(this.explorer, this.morrocoMarker, morrocoPop, null, this);
		game.physics.arcade.overlap(this.explorer, this.mexicoMarker, mexicoPop, null, this);
		game.physics.arcade.overlap(this.explorer, this.austrailaMarker, austrailaPop, null, this);
		game.physics.arcade.overlap(this.explorer, this.brazilMarker, brazilPop, null, this);


	


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




function japanPop(explorer,japanMarker) {
	"use strict";

	this.japanStar.visible = true;
	score++;
	console.log("clickclick");
	//true
	this.japanPop.visible = true;
	//false
	this.moroccoPop.visible = false;
	this.aussiePop.visible = false;
	this.italyPop.visible = false;
	this.brazilPop.visible = false;
	this.mexicoPop.visible = false;

};


function italyPop(explorer,italyMarker) {
	"use strict";

	this.italyStar.visible = true;
	score++;
	console.log("clickclick");
	//true
	this.italyPop.visible = true;
	//false
	this.japanPop.visible = false;
	this.moroccoPop.visible = false;
	this.aussiePop.visible = false;
	this.brazilPop.visible = false;
	this.mexicoPop.visible = false;
};



function morrocoPop(explorer,morrocoMarker) {
	"use strict";

	this.morrocoStar.visible = true;
	score++;
	console.log("clickclick");
	//true
	this.moroccoPop.visible = true;

	//false
	this.japanPop.visible = false;
	this.aussiePop.visible = false;
	this.italyPop.visible = false;
	this.brazilPop.visible = false;
	this.mexicoPop.visible = false;

};


function mexicoPop(explorer,mexicoMarker) {
	"use strict";

	this.mexicoStar.visible = true;
	score++;
	console.log("clickclick");
	//true
	this.mexicoPop.visible = true;
	//false
	this.japanPop.visible = false;
	this.moroccoPop.visible = false;
	this.aussiePop.visible = false;
	this.italyPop.visible = false;
	this.brazilPop.visible = false;

};


function austrailaPop(explorer,austrailaMarker) {
	"use strict";

	this.austrailaStar.visible = true;
	score++;
	console.log("clickclick");
	//true
	this.aussiePop.visible = true;
	//false
	this.japanPop.visible = false;
	this.moroccoPop.visible = false;
	this.italyPop.visible = false;
	this.brazilPop.visible = false;
	this.mexicoPop.visible = false;


};



function brazilPop(explorer,brazilMarker) {
	"use strict";

	this.brazilStar.visible = true;
	score++;
	console.log("clickclick");
	//true
	this.brazilPop.visible = true;
	//false
	this.japanPop.visible = false;
	this.moroccoPop.visible = false;
	this.aussiePop.visible = false;
	this.italyPop.visible = false;
	this.mexicoPop.visible = false;


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


//JAPAN FUNCTIONS









