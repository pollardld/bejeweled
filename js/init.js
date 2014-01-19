// Game initialisation

var Game = {};
Game.GRID_SIZE = 8;
Game.TILE_SIZE = 80;

// Initializes the game ================= /
Game.init = function () {
	Game.gemRange = 6;		// The number of different gems on the grid
	Game.level = 1;
	Game.time = 0;
	Game.gem = null;		// The currently selected gem
	Game.moving = false;	// Are the gems moving or not ?
	Game.score = {
		goal: 5000,
		current: 0
	};
	Game.bonus = {};
	Game.pauses = false;
	Game.initTimer();

	// We initialize the UI
	get('#level').innerHTML = Game.level;
	get('#current_score').innerHTML = Game.score.current;
	get('#goal_score').innerHTML = Game.score.goal;
	get('#restart_bt').onclick = Game.confirmRestart;

	Game.createGrid();
};

// Create game's grid ================= /
Game.createGrid = function() {
	var grid = get('#grid'), map = [], row, vGems = [], hGems = [], bg;

	for (var i = 0, j = 0; i < Game.GRID_SIZE; i++) {
		row = [];
		map.push(row);	// We create a row in the map

		for (j = 0; j < Game.GRID_SIZE; j++) {
			do {
				gem = new Game.Gem(j, i, parseInt(Math.random() * Game.gemRange));
				if (i > 0)
					vGems = gem.parseNeighbours(true, -1);
				if (j > 0)
					hGems = gem.parseNeighbours(false, -1);
			}while (vGems.length >= 2 || hGems.length >= 2);

			gem.addEventListener('click', Game.onGemClick, false);	// We add the mouse event listener
			gem.pop(grid);
			vGems = [];
			hGems = [];
		};
	};
	
	// We check if there is at least one possible move
	Game.checkGameOver();

	// If the player leaves the page, we stop the timer 
	window.onblur = function(){
		Game.pauses = true;
	}

	// When he returns on the page, we resume the timer
	window.onfocus = function(){
		Game.pauses = false;
	}
};

// Empty Grid ================= /
Game.emptyGrid = function() {
	var items = get('.item'), grid = get('#grid');
	for (var i = 0; i < items.length; i++) {
		grid.removeChild(items[i]);
	};
}