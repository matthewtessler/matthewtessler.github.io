var capture; // video
var artwork; // starry night
var theWanderers = []; // particles

function preload() {
	artwork = loadImage('images/starry.jpg');
}

function setup() {
	createCanvas(500,500);
	capture = createCapture(VIDEO); // capture video stream
	capture.size(320, 240); // video dimensions
	capture.hide(); // hide the video capture
	startTrackerFromProcessing(capture); // face tracker
	for (var x = 0; x < artwork.width; x += 10) {
		for (var y = 0; y < artwork.height; y += 10) {
			var strip = new p5.Image(10, 10);
	    	strip.copy(artwork, x, y, 10, 10, 0, 0, 10, 10);
	     	theWanderers.push(new Wanderer(x, y, strip));
	    }
  	}
}

function draw() {
	background(0,10); // black, 10 percent opacity for fade

	push();
	translate(50,90); // move origin to center artwork

	var faceArray = getFaceArray(); // get points of face
	
	if (faceArray) {
		var lipDistance = dist(faceArray[47][0], faceArray[47][1], faceArray[53][0], faceArray[53][1]);
		var openDistance = dist(faceArray[60][0], faceArray[60][1], faceArray[57][0], faceArray[57][1]);
		if (openDistance/lipDistance > 0.4) {
			for (var i = 0;i < theWanderers.length; i++) {
				theWanderers[i].displayWander();
			}
		}
		else {
			for (var i = 0;i < theWanderers.length; i++) {
				theWanderers[i].displayComeBack();
			}
		}
	}
	else {
		image(artwork,0,0);
	}

	pop(); // changes origin back to 0,0
}

class Wanderer {
	constructor(x,y,myImage) {
		this.x = x;
		this.y = y;
		this.desiredX = x;
		this.desiredY = y;
		this.myImage = myImage;
		this.xOffset = random(1000);
  		this.yOffset = random(2000, 3000);
	}

	displayWander() {
		this.x += map(noise(this.xOffset), 0, 1, -5, 5);
    	this.y += map(noise(this.yOffset), 0, 1, -5, 5);
    	this.xOffset += 0.01;
    	this.yOffset += 0.01;
    	image(this.myImage, this.x, this.y);
	}

	displayComeBack() {
		var xDist = this.desiredX - this.x;
    	var yDist = this.desiredY - this.y;
   		this.x += xDist * 0.1;
    	this.y += yDist * 0.1;
    	image(this.myImage, this.x, this.y);
	}
}