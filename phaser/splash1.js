// Splash screen level 1, JS object literal notation

var splash1 = {

	create: function () {
        
		game.add.image(0, 0, 'bg-intro-sign');
		game.world.setBounds(0, 0, 1900, 1082);

		var instructions = game.add.text(game.world.centerX - 450 , 190, 'Level 1:\n HELLO EXPLORERS\n\nSwim around the ocean and explore \n And see how much you can learn. \n ', {
			font: "20px Rammetto One",
			align: "center",
			fill: "#fff",
		});
		
		instructions.anchor.set(0.5);


		this.whale= game.add.sprite(-10, -100, 'whale');
		game.physics.enable(this.whale);
		game.add.tween(this.whale).to({ y: 100 }, 10000, Phaser.Easing.Linear.None, true, 0, 1200, true)






		setTimeout(function () {
			game.state.start("level1");
		}, 9000);
		
		
	},


	update: function () {


	},

}
