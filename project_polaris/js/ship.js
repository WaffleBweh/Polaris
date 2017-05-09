function Ship(name, sprite, x, y, mapX, mapY, angle) {
	// Fields
	var _this = this;

    _this.name = name;
    _this.sprite = sprite;
    _this.x = x;
    _this.y = y;
    _this.mapX = mapX;
    _this.mapY = mapY;
    // angle = Direction and speed of rotation
    // realAngle = Angle seen by other players (in radians)
    _this.angle = 0;
    _this.realAngle = angle;
    // Vector for speed
    _this.vx = 0;
    _this.vy = 0;
    _this.v = 0;

	// Const
	_this.ANGLE_VELOCITY = 0.0025;
	_this.MAX_ROTATE = 0.1;
	_this.MIN_ROTATE = 0.0;

    _this.VELOCITY = 0.01;
    _this.MAX_VELOCITY = 0.075;
    _this.MIN_VELOCITY = 0.0;

	_this.FRICTION = 0.0025;

    // Methods
    _this.Draw = function(context){
    	// Reset the canvas
    	context.setTransform(1, 0, 0, 1, 0, 0);
    	// Move the point to the center of the ship
		context.translate(_this.x, _this.y);
		context.rotate(_this.realAngle);
		context.drawImage(_this.sprite, -(_this.sprite.width / 2), -(_this.sprite.height / 2));		

		// Draw the name above the ship
		var stringPosX = -(5 * _this.name.length);
		var stringPosY = -(100);

		context.setTransform(1, 0, 0, 1, 0, 0);
		context.translate(_this.x, _this.y);
		context.font = '20px Oswald';
		context.fillStyle = 'white';
		context.fillText(_this.name, stringPosX, stringPosY);
    }

    // Ship physics
    _this.UpdateValues = function(){
    	// Calculate the intertia to apply to the ship's velocity and angle velocity
    	var angleInertiaPercentage = Math.abs(_this.angle / _this.MAX_ROTATE);
        var velocityInertiaPercentage = Math.abs(_this.v / _this.MAX_VELOCITY);

    	// Put a maximum rotate speed
    	if (_this.angle >= _this.MAX_ROTATE){
    		_this.angle = _this.MAX_ROTATE;
    	}
    	else if (_this.angle <= -_this.MAX_ROTATE){
    		_this.angle = -_this.MAX_ROTATE;
    	}

        // Put a maximum velocity
        if (_this.v >= _this.MAX_VELOCITY){
            _this.v = _this.MAX_VELOCITY;
        }
        else if (_this.v <= -_this.MAX_VELOCITY){
            _this.v = -_this.MAX_VELOCITY;
        }

    	// Slows down the ship angle and velocity on its own (inertia)
    	if (_this.angle > _this.MIN_ROTATE) {
    		_this.angle -= _this.FRICTION * angleInertiaPercentage;
    	}
    	else if (_this.angle < -_this.MIN_ROTATE){
    		_this.angle += _this.FRICTION * angleInertiaPercentage;
    	}

        if (_this.v > _this.MIN_VELOCITY) {
            _this.v -= _this.FRICTION * velocityInertiaPercentage;
        }
        else if (_this.v < -_this.MIN_VELOCITY){
            _this.v += _this.FRICTION * velocityInertiaPercentage;
        }

        // Calculate the real angle of the ship in radians
        _this.realAngle += _this.angle;
        _this.realAngle %= Math.PI * 2;

        // Get the velocity from vectors (vx and vy) using a^2 + b^2 = c^2
        //_this.v = Math.sqrt((_this.vx * this.vx) + (_this.vy * this.vy));

        // Get the velocity vectors of the ship (vx and vy)
        _this.vx = _this.v * Math.sin(_this.realAngle);
        _this.vy = _this.v * Math.cos(_this.realAngle);

        // Add the velocity to our coordinates
        _this.mapX += _this.vx * 150;
        _this.mapY += _this.vy * 150;

        /*
        console.log("Name : " + _this.name);
        console.log("X : " + _this.mapX);
        console.log("Y : " + _this.mapY);

		console.log("Velocity : " + _this.v);
		console.log("Angle : " + _this.realAngle);
		*/
		
    }

    _this.MoveForwards = function(){
        _this.v += playerShip.VELOCITY;
    }

    _this.MoveBackwards = function(){
        _this.v -= playerShip.VELOCITY / 5;
    }

    _this.RotateRight = function(){
    	_this.angle -= playerShip.ANGLE_VELOCITY;
    }

    _this.RotateLeft = function(){
    	_this.angle += playerShip.ANGLE_VELOCITY;
    }
}