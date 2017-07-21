var canvas;
var ctx;
var myConstellation;

function init() {
	console.log('page has loaded...');

	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	canvas.style.width = "500px";
	canvas.style.height = "500px";
	canvas.width = 500;
	canvas.height = 500;

	draw();
	genConstellation();
	drawConstellation();

}

//FUNCTIONS

function draw() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 500, 500);
}

function drawConstellation() {
	//draw stars
	for(var i = 0; i < myConstellation.stars.length; i++) {
		myConstellation.stars[i].draw();
	}

	//draw lines
	for(var i = 1; i < myConstellation.lines.length; i++) {
		myConstellation.lines[i].draw();
	}
}



//GENERATE CONSTELLATION
function genConstellation() {
	myConstellation = new Constellation("LYNX");

	var starCount = tombola.range(4, 10); //How many stars the constellation will contain
	var cx = 250; //Central point on axis x
	var cy = 250; //central point on axis y
	//randomise the starting position
	var x = cx; //pick the place to start drawing the constellation 
	var y = cy;
	var min = 2; //min distance between stars
	var max = 50; //max dist. between stars
	var prevPosition = new Point(x, y);
	var prevSize;

	//Start at prevPosition and then generate a star at a new position based on prevPosition + a new random x and y value
	for(var i=0;i<starCount;i++) {
		var theta = Math.random() * 360;
		var randomx = tombola.rangeFloat(min, max) * (Math.cos(theta)); //generates a random distance and a random angle on x axis
		//if (tombola.percent(50)) randomx = -randomx;
		var randomy = tombola.rangeFloat(min, max) * (Math.sin(theta));
		//if (tombola.percent(50)) randomy = -randomy;
		//This makes first star origin of constellation (cancelling randomisation for the origin)
		if (i === 0) { 
			randomx = 0;
			randomy = 0;
		}		
		var position = new Point(prevPosition.x + randomx, prevPosition.y + randomy);



		//CHECK FOR LINE INTERSECTION
		do {
			//Set intersection to false (if during for loop intersection doesn't return true it will stay false and therefore draw the line(store the line points))
			var intersection = false;
			//Check each line for intersection and if true set intersection back to true and return to top of while loop and run again
			for(var j = 0; j < myConstellation.lines.length; j++) {
				var l = myConstellation.lines[j];
				if (lineIntersect(position.x, position.y, prevPosition.x, prevPosition.y, l.start.x, l.start.y, l.end.x, l.end.y)) {
					//Intersection has occurred so this fails the test so it goes back to top of while loop
					intersection = true;
					console.log("An intersection has occurred");
					//break;
				}
			}
			if (intersection) {
				randomx = tombola.rangeFloat(min, max);
				if (tombola.percent(50)) randomx = -randomx;
				randomy = tombola.rangeFloat(min, max);
				if (tombola.percent(50)) randomy = -randomy;
				position = new Point(prevPosition.x + randomx, prevPosition.y + randomy);
			}
		}
		while (intersection);

		var size;
		if (tombola.percent(25)) {size = tombola.rangeFloat(3.5,5); //Make it so the larger stars are less likely to appear
		} else {size = tombola.rangeFloat(0.7, 3.4);}



		// CREATE STAR//
		var star = new Star(position, size);
		myConstellation.stars.push(star);



		//CREATELINE //
		if (prevSize === undefined) prevSize = size;
		var line = new Line(prevPosition.clone(), position.clone(), prevSize, size);

		myConstellation.lines.push(line);
		prevSize = size; //remembers this star's size
		prevPosition = position; //So that each new star is positioned relative to the last
	}

	console.log(myConstellation.stars);
}



//OBJECTS

//below is an object, defined like a function but with a capital letter at beginning of name - fundamentally the same as a function but you create an instance of it by saying e.g.: new Constellation();
function Constellation(name) {
	this.stars = [];
	this.lines = [];
	this.name = name;
}

function Star(position, size) {
	this.position = position;
	this.size = size;
	this.greekLetter = "";
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.clone = function() {
	return new Point(this.x, this.y);
}

function Line(start, end, startRadius, endRadius) {
	this.start = start;  // is a point object
	this.end = end;
	this.startRadius = startRadius;
	this.endRadius = endRadius;
	this.calcGaps();
}

Line.prototype.draw = function() {
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.moveTo(this.start.x, this.start.y);
	ctx.lineTo(this.end.x, this.end.y); //line.end needs to be a random distance * (math.cos/sin(random angle))
	ctx.stroke();
};

Line.prototype.calcGaps = function() {
	var startVector = new Vector(this.end.x - this.start.x, this.end.y - this.start.y); //does this need to change?
	console.log(startVector);
	startVector.normalise();
	console.log(startVector);
	startVector.multiply(4 + this.startRadius); //How can I reference the size of that particular star from within here?
	var endVector = startVector.clone();
	endVector.normalise();
	endVector.multiply(4 + this.endRadius);
	this.start.x += startVector.x;
	this.start.y += startVector.y;
	this.end.x -= endVector.x;
	this.end.y -= endVector.y;
}

Star.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.arc(this.position.x, this.position.y, this.size, 0, (Math.PI * 2));
	ctx.fill();
}



// we're taking the line between two stars and normalising its vector to calculate the gaps desired at each end of the line when drawn
function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.multiply = function(factor) {
	this.x *= factor;
	this.y *= factor;
};

Vector.prototype.getMagnitude = function() {
	return Math.sqrt((this.x*this.x) + (this.y*this.y));
};

Vector.prototype.normalise = function() {
	var m = this.getMagnitude();
	if (m>0) {
		this.x /= m;
		this.y /= m;
	}
};

Vector.prototype.clone = function() {
	return new Vector(this.x, this.y);
};


// UTILS

function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}