var moles;
var points = 0;
var hmr;
var hit;
var molePic;

function preload() {
	hmr = loadImage('hammer.png');
	molePic = loadImage('mole.png');
	hit = loadSound('hit.mp3');
	soundFormats('ogg', 'mp3');
}

function setup() {
	createCanvas(500,500);
	background(0);
	noiseDetail(24);
	imageMode(CENTER);
	noCursor();
	moles = [];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			moles.push(new Mole(i*100 + 150, j*100 + 150));
		}
	}
}

function draw() {
	background(0);
	for (var i = 0; i < moles.length; i++) {
		moles[i].display();
	}
	fill(255);
	text(points, 25,25);
	image(hmr, mouseX, mouseY, 50,50);
}

class Mole {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.updown = true; // up - true, down - false
		this.count = Math.floor(Math.random() * 181) + 1;
	}

	display() {
		if (this.updown) image(molePic, this.x,this.y, 50,50);
		this.update();
		this.checkHit();
	}

	update() {
		if (this.count > 0) {
			this.count--;
		}
		else {
			this.count = Math.floor(Math.random() * 181) + 1;
			this.updown = !this.updown;
		}
	}

	checkHit() {
		if (dist(mouseX, mouseY, this.x, this.y) < 50 && this.updown && mouseIsPressed) {
			hit.play();
			points++;
			this.updown = false;
			this.count = 181; // let it rest for three seconds
		}
	}
}