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
		ctx.beginPath();
		ctx.fillStyle = "#ffffff";
		ctx.arc(this.x, this.y, this.size, 0, (Math.PI * this.size * 2));
		ctx.fill();
		console.log("drawConstellation has run")
	}
}

//Generate constellation
function genConstellation() {
	myConstellation = new Constellation("LYNX");

	var age = 4 + (Math.floor(Math.random() * 6)); //How many stars the constellation will contain
	var cx = (Math.floor(Math.random() * 500)); //Central point on axis x
	var cy = (Math.floor(Math.random() * 500)); //central point on axis y

	for(var i=0;i<age;i++) {
		var x = cx - 50 + (Math.floor(Math.random() * 100));
		var y = cy - 50 + (Math.floor(Math.random() * 100));
		var position = new Point(x, y);
		var size = 0.5 + Math.random();
		var star = new Star(position, size);
		//need to push this info to the empty stars array so it can be used by drawConstellation() function?
		myConstellation.stars.push(star);
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
