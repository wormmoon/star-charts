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

//Generate constellation
function genConstellation() {
	myConstellation = new Constellation("LYNX");

	var starCount = tombola.range(4, 10); //How many stars the constellation will contain
	var cx = 250; //Central point on axis x
	var cy = 250; //central point on axis y
	//randomise the starting position
	var x = cx + tombola.range(-50, 50); //pick the place to start drawing the constellation 
	var y = cy + tombola.range(-50, 50);
	var min = 2; //min distance between stars
	var max = 50; //max dist. between stars
	var prevPosition = new Point(x, y);

	//Start at prevPosition and then generate a star at a new position based on prevPosition + a new random x and y value
	for(var i=0;i<starCount;i++) {
		var randomx = tombola.rangeFloat(min, max);
		if (tombola.percent(50)) randomx = -randomx;
		var randomy = tombola.rangeFloat(min, max);
		if (tombola.percent(50)) randomy = -randomy;		
		var position = new Point(prevPosition.x + randomx, prevPosition.y + randomy);
		var size = tombola.rangeFloat(0.5, 2); ///////make it so there's less of a chance of the bigger size stars appearing///////
		var star = new Star(position, size);
		myConstellation.stars.push(star);
		var line = new Line(prevPosition.clone(), position.clone());
		myConstellation.lines.push(line);
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

function Line(start, end) {
	this.start = start;
	this.end = end;
	this.calcGaps();
}

Line.prototype.draw = function() {
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.moveTo(this.start.x, this.start.y);
	ctx.lineTo(this.end.x, this.end.y);
	ctx.stroke();
};

Line.prototype.calcGaps = function() {
	var vector = new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
	console.log(vector);
	vector.normalise();
	console.log(vector);
	vector.multiply(5); //How can I reference the size of that particular star from within here?
	console.log(vector);
	this.start.x += vector.x;
	this.start.y += vector.y;
	this.end.x -= vector.x;
	this.end.y -= vector.y;
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