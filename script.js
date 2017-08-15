var canvas;
var ctx;
var myConstellation;
var angle;

function init() {
	console.log('page has loaded...');

	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	canvas.style.width = "500px";
	canvas.style.height = "500px";
	canvas.width = 500;
	canvas.height = 500;


	//Generate constellation & then draw
	myConstellation = new Constellation();
	myConstellation.generate();
	draw();

}



