
function Line(start, end, startRadius, endRadius) {
	this.start = start;  // is a point object
	this.end = end;
	this.intersectionStart = start.clone();
	this.intersectionEnd = end.clone();
	this.startRadius = startRadius;
	this.endRadius = endRadius;
	this.calcGaps();
	this.noGapStart = start;
	this.noGapEnd = end;
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
	//console.log(startVector);
	startVector.normalise();
	//console.log(startVector);
	startVector.multiply(4 + this.startRadius); //How can I reference the size of that particular star from within here?
	var endVector = startVector.clone();
	endVector.normalise();
	endVector.multiply(4 + this.endRadius);
	this.start.x += startVector.x;
	this.start.y += startVector.y;
	this.end.x -= endVector.x;
	this.end.y -= endVector.y;
}