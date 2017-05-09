function MultiplayerManager(playerShip) {
	var _this = this;
	_this.currentPlayerShip = playerShip;
	_this.ships = new Array();

    _this.UpdateValues = function(context){
		// Ajax request for pulling ships
		$.ajax({
			url: './php/getShips.php',
			type: 'POST',
			success: function(result){
				result = JSON.parse(result);

				// Clean the array
				_this.ships.length = 0;

				// Store every ship in an array
				for (i = 0; i < result.length; i++) { 
					// Calculate the position of each ship on the canvas in comparaison to the player
					var newX = (playerShip.x + (result[i].x - playerShip.mapX));
					var newY = (playerShip.y + (playerShip.mapY) - result[i].y);

					_this.ships[i] = new Ship(result[i].name, playerShip.sprite, newX, newY, result[i].x, result[i].y, result[i].angle);
				}
			}
		});

		// Ajax request for sending playership info
		$.ajax({
			url: './php/sendPlayerShipInfo.php',
			type: 'POST',
			data: {
				shipName: _this.currentPlayerShip.name,
				x: _this.currentPlayerShip.mapX,
				y: _this.currentPlayerShip.mapY,
				angle: _this.currentPlayerShip.realAngle
			},
			success: function(result){}
		});
    }

    // Removes the player's ship from the database
    _this.DeletePlayerShip = function(context){
		$.ajax({
			url: './php/deleteShip.php',
			type: 'POST',
			success: function(result){}
		});
    }

    _this.DrawShips = function(context)
    {
    	for (i = 0; i < _this.ships.length; i++) { 
    		// Draw each ship
    		_this.ships[i].Draw(context);
    	}
    }
}