function Parallax(layer1, layer2, layer3, layer4, currentPlayer) {
	// Fields
	var _this = this;
	
	// Create gradient
	var gradient=context.createLinearGradient(0,0,200,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	
    _this.x = 0;
    _this.y = 0;
    _this.layer1 = layer1;
    _this.layer2 = layer2;
    _this.layer3 = layer3;
    _this.layer4 = layer4;
	_this.layer1b = layer1;
	_this.layer1c = layer1;
	_this.layer1d = layer1;
	_this.layer2b = layer2;
	_this.layer2c = layer2;
	_this.layer2d = layer2;
	_this.layer3b = layer3;
	_this.layer3c = layer3;
	_this.layer3d = layer3;

    _this.currentPlayer = currentPlayer;
	
	function formatNum(number, width) {
		if (number < 0)
			return '-'+new Array(+width + 1 - (Math.abs(number) + '').length).join('0') + Math.abs(number);
		else
			return '+'+new Array(+width + 1 - (number + '').length).join('0') + number;
	}
	
    // Methods
    _this.DrawBottomLayer = function(context)
    {
        context.setTransform(1, 0, 0, 1, 0, 0);

        // Nebula background
		lx = Math.floor(_this.x / 4 % _this.layer1.width);
		ly = Math.floor(_this.y / 4 % _this.layer1.height);
		if (_this.x < 0)
			lx += _this.layer1.width;
		if (_this.y < 0)
			ly += _this.layer1.height;
        context.drawImage(_this.layer1, lx, ly);
		context.drawImage(_this.layer1b, lx - _this.layer1.width, ly);
		context.drawImage(_this.layer1c, lx, ly - _this.layer1.height);
		context.drawImage(_this.layer1d, lx - _this.layer1.width, ly - _this.layer1.height);
        // Stars bottom layer
		lx = Math.floor(_this.x / 2 % _this.layer2.width);
		ly = Math.floor(_this.y / 2 % _this.layer2.height);
		if (_this.x < 0)
			lx += _this.layer2.width;
		if (_this.y < 0)
			ly += _this.layer2.height;
        context.drawImage(_this.layer2, lx, ly);
		context.drawImage(_this.layer2b, lx - _this.layer2.width, ly);
		context.drawImage(_this.layer2c, lx, ly - _this.layer2.height);
		context.drawImage(_this.layer2d, lx - _this.layer2.width, ly - _this.layer2.height);
    }

    _this.DrawTopLayer = function(context)
    {
        context.setTransform(1, 0, 0, 1, 0, 0);
        // Stars top layer
		lx = Math.floor(_this.x % _this.layer3.width);
		ly = Math.floor(_this.y % _this.layer3.height);
		if (_this.x < 0)
			lx += _this.layer3.width;
		if (_this.y < 0)
			ly += _this.layer3.height;
        context.drawImage(_this.layer3, lx, ly);
		context.drawImage(_this.layer3b, lx - _this.layer3.width, ly);
		context.drawImage(_this.layer3c, lx, ly - _this.layer3.height);
		context.drawImage(_this.layer3d, lx - _this.layer3.width, ly - _this.layer3.height);
        // Asteroids layer
        context.drawImage(_this.layer4, _this.x * 2, _this.y * 2);
		// Draw coordinates
		context.font="20px Verdana";
		context.fillStyle=gradient;
		context.fillText('X:' + formatNum(+Math.round(_this.x),6) + ' Y:' + formatNum(Math.round(_this.y),6), canvas.width/2-100, 20); 
    }

    _this.UpdateValues = function()
    {
        _this.x += -(currentPlayer.vx * 100);
        _this.y += (currentPlayer.vy * 100);
    }
}