
function Star(position, size) {
	this.position = position;
	this.size = size;
	this.greekLetter = "";
}

Star.prototype.draw = function() {
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc(this.position.x, this.position.y, this.size, 0, (Math.PI * 2));
	ctx.fill();
}

Star.prototype.nearest = function() { //finds closest star
	var star, x1, x2, y1, y2;
	var smallest = 1000000;
	var closest = null; //use instead of 0 as we're looking for null or an object (not a number)
	x1 = this.position.x;
	y1 = this.position.y;
	for (i=0; i<myConstellation.stars.length; i++) {
		star = myConstellation.stars[i];
		if (star === this) continue;
		x2 = star.position.x;
		y2 = star.position.y;
		var adjacent = Math.abs(x1-x2); //abs always returns positive number
		var opposite = Math.abs(y1-y2); 
		var hypotenuse = Math.sqrt((adjacent**2) + (opposite**2));
		if (hypotenuse < smallest) {
			closest = star;
			smallest = hypotenuse;
		}
	}

	return closest;
}
