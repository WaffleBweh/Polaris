var canvas;
var context;
var playerSprite;
var playerShip;
var mouseX;
var mouseY;
var canvasOffset;
var offsetX;
var offsetY;
var parallax;
var multiplayerManager;

// Initialize an array of keys
var keyArray = [];
keyArray["w"] = false;
keyArray["a"] = false;
keyArray["s"] = false;
keyArray["d"] = false;

// Initialize
$( document ).ready(function() {
	canvas = document.getElementById('mainCanvas');
	context = canvas.getContext('2d');
	canvasOffset = $("#mainCanvas").offset();
	offsetX = canvasOffset.left;
	offsetY = canvasOffset.top;

	// Create the player's ship
	var playerX = (canvas.width / 2);
	var playerY = (canvas.height / 2);

	var shipName = prompt("Please enter your ship's name");

	playerShip = new Ship(shipName, spaceship, playerX, playerY, 2500, 1200, 0);
	parallax = new Parallax(layer1, layer2, layer2, layer3, playerShip);

	// Initialize the multiplayer manager
	multiplayerManager = new MultiplayerManager(playerShip);
	
	// Make our own focus on canvas
    document.addEventListener('mousedown', function(event) {
        lastDownTarget = event.target;
    }, false);

	// Add a handler for key presses
	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('keyup', onKeyUp, false);
	// Add an event handler for removing ship when the player leaves
	window.onbeforeunload = deleteShip;

	// Launch the game timer (60fps) when the components are ready
	timer = setInterval(update, 16);
});

function update() {
	// Clear the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Update the values
	playerShip.UpdateValues();
	parallax.UpdateValues();
	// Update the ships position (multiplayer)
	multiplayerManager.UpdateValues();

	// Draw the ships and the background
	parallax.DrawBottomLayer(context);
	multiplayerManager.DrawShips(context);
	playerShip.Draw(context);
	parallax.DrawTopLayer(context);


	// Move the ship using input from user
	if (keyArray["w"]) {
		playerShip.MoveForwards();
	}

	if (keyArray["a"]) {
	    playerShip.RotateRight();
	}

	if (keyArray["s"]) {
		playerShip.MoveBackwards();	
	}

	if (keyArray["d"]) {
		playerShip.RotateLeft();
	}
}

// Check for key presses
function onKeyDown(e){
	// Check if we are focused on the canvas
	if(lastDownTarget == canvas) {
	    
	    // W or up arrow pressed
		if ( e.keyCode == 87 || e.keyCode == 38) {
			keyArray["w"] = true;
		}

		// A or left arrow pressed
		if ( e.keyCode == 65 || e.keyCode == 37) {
			keyArray["a"] = true;

		}

		// S or down arrow pressed
		if ( e.keyCode == 83 || e.keyCode == 40) {
			keyArray["s"] = true;
		}

		// D or right arrow pressed
		if ( e.keyCode == 68 || e.keyCode == 39) {	
			keyArray["d"] = true;
		}
	}
}

// Checks for key releases
function onKeyUp(e){
	// Check if we are focused on the canvas
	if(lastDownTarget == canvas) {
	    
	    // W or up arrow released
		if ( e.keyCode == 87 || e.keyCode == 38) {
			keyArray["w"] = false;
		}

		// A or left arrow released
		if ( e.keyCode == 65 || e.keyCode == 37) {
			keyArray["a"] = false;
		}

		// S or down arrow released
		if ( e.keyCode == 83 || e.keyCode == 40) {
			keyArray["s"] = false;
		}

		// D or right arrow released
		if ( e.keyCode == 68 || e.keyCode == 39) {		
			keyArray["d"] = false;
		}
	}
}

function deleteShip(){
	multiplayerManager.DeletePlayerShip();
	return null;
}