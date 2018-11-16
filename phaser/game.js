var game = new Phaser.Game(1000, 500, Phaser.CANVAS, 'game');
// global game variables




Main = function () {};

Main.prototype = {

	preload: function () {
		this.game.stage.backgroundColor = '#5c97f0';
		this.load.image('preloading', 'assets/loader.png');
	
	},

	create: function () {
		"use strict";
	
		// adding all game states
		game.state.add('boot', boot);
	    game.state.add('level1', level1);

		// launching the boot screen
		game.state.start('boot');
	}

};

game.state.add('Main', Main);
game.state.start('Main');
