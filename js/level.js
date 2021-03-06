// Level related functions

/** Displays a coinfirm popup to restart the game */
Game.confirmRestart = function() {
	confirm('Restart?', null, Game.restart);
	Game.removeHint();
};

/** Restarts the game */
Game.restart = function() {
	Game.removeHint();
	Game.emptyGrid();
	Game.resetTimer();
	Game.init();
};

/** Notices the player of the end of the level */
Game.endLevel = function() {
	alert('Yippe! You Completed ' + Game.level + ' Next Level?', Game.nextLevel);
	Game.removeHint();
}

/** Goes to the next level */
Game.nextLevel = function() {
	Game.level++;
	get('#current_gauge').style.height = '100%';
	get('#level').innerHTML = Game.level;
	Game.resetScore();
	Game.resetTimer();
	Game.emptyGrid();
	Game.createGrid();
};

/** Checks if the game is over (no possibility to make a streak) */
Game.checkGameOver = function() {
	if (!Game.checkHint()) {
		Game.gameOver();
	}
};

/** When the game is over : displays a popup to make the player restart */
Game.gameOver = function() {
	confirm('Sorry Game Over', null, Game.restart);
	Game.paused = true;
};