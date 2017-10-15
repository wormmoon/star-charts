
function Constellation(name) {
	this.stars = [];
	this.lines = [];
	this.name = name;
}

Constellation.prototype.draw = function() {
	//draw stars
	for(var i = 0; i < this.stars.length; i++) {
		this.stars[i].draw();
	}

	//draw lines
	for(var i = 1; i < this.lines.length; i++) {
		this.lines[i].draw();
	}
}

Constellation.prototype.generate = function() {


	var starCount = tombola.range(4, 10); //How many stars the constellation will contain
	var cx = width/2; //Central point on axis x
	var cy = height/2; //central point on axis y
	//randomise the starting position
	var x = cx; //pick the place to start drawing the constellation 
	var y = cy;
	var min = 20; //min distance between stars
	var max = 50; //max dist. between stars
	var prevPosition = new Point(x, y);
	var prevSize;
	angle = Math.random() * 360;
	var counter = 0;

	//Start at prevPosition and then generate a star at a new position based on prevPosition + a new random x and y value
	for(var i=0;i<starCount;i++) {

		// create this stars position, by moving from the last star in a direction which is the previous angle +/- some variation 
		var position = this.calcNewStarPosition(prevPosition, angle, min, max);
		if (i === 0) position = prevPosition.clone();



		//CHECK FOR LINE INTERSECTION
		do {
			counter++;
			if (counter > 100) break; //
			//Set intersection to false (if during for loop intersection doesn't return true it will stay false and therefore draw the line(store the line points))
			var intersection = false;
			//Check each line for intersection and if true set intersection back to true and return to top of while loop and run again
			for(var j = 0; j < this.lines.length; j++) {
				var l = this.lines[j];
				if (lineIntersect(position.x, position.y, prevPosition.x, prevPosition.y, l.intersectionStart.x, l.intersectionStart.y, l.intersectionEnd.x, l.intersectionEnd.y)) { //l is a line object
					//Intersection has occurred so this fails the test so it goes back to top of while loop
					intersection = true;
					console.log("An intersection has occurred");
					break;
				}
			}
			if (intersection) {
				position = this.calcNewStarPosition(prevPosition, angle, min, max);
			}
		}
		while (intersection);

		var size;
		if (tombola.percent(25)) {size = tombola.rangeFloat(3.5,5); //Make it so the larger stars are less likely to appear
		} else {size = tombola.rangeFloat(0.7, 3.4);}



		// CREATE STAR//
		var star = new Star(position, size);
		this.stars.push(star);

		//if unavoidable intersection connect to closest star
		if (intersection) {
			var nearest = star.nearest();
			if (nearest) {
				star.position = nearest.position;
				console.log("unavoidable intersection");
			}
		}


		//CREATELINE //
		if (prevSize === undefined) prevSize = size;
		var line = new Line(prevPosition.clone(), position.clone(), prevSize, size);

		this.lines.push(line);
		prevSize = size; //remembers this star's size
		prevPosition = position; //So that each new star is positioned relative to the last
	}

}

Constellation.prototype.calcNewStarPosition = function(prevPosition, prevAngle, minDist, maxDist) {
	angle = tombola.range(prevAngle - 120, prevAngle + 120);
	//angle = 90;
	var range = tombola.rangeFloat(minDist, maxDist);
	var randomx = range * Math.cos(angle * Math.PI/180); //generates a random distance and a random angle on x axis
	var randomy = range * Math.sin(angle * Math.PI/180);
	return new Point(prevPosition.x + randomx, prevPosition.y + randomy);
}