var canvas;
var ctx;
var myConstellation;
var angle;
var width = 450;
var height = 450;

function init() {
	// console.log('page has loaded...');

	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	// canvas.style.width = "500px";
	// canvas.style.height = "500px";
	canvas.width = width;
	canvas.height = height;


	//Generate constellation & then draw
	myConstellation = new Constellation();
	myConstellation.generate();
	draw();

}


