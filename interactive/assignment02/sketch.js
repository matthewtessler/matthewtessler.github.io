var paddlePos = 150; // initial pos for paddle
var ballX, ballY, ballXSpeed, ballYSpeed, targetX, targetY;
var points = 0;
var misses = 0;
var win, lose, bounce;

var target;
function preload() {
  target = loadImage('apple.png');

  soundFormats('ogg', 'mp3');
  win = loadSound('win.mp3');
  lose = loadSound('trombone.mp3');
  bounce = loadSound('bounce.mp3');
  bounce.rate(2);

}

function setup() {
	createCanvas(400,600);
	background(0); // bg solid color

	ballX = 200; // original ball position X
	ballY = 300; // original ball position Y
	ballXSpeed = random(-10,10); // random X speed
	ballYSpeed = random(-10,10); // random Y speed
	targetX = random(35,365); // random X pos
	targetY = random(35,375); // random Y pos

}

function draw() {
	background(0); // refresh bg
	text("Points: " + points, 25,25);
	text("Misses: " + misses, 25,50);

	imageMode(CENTER);
	if (int(dist(targetX,targetY, ballX, ballY)) < 25) { // hit
		win.play();
		points++;
		targetX = random(35,365);
		targetY = random(35,375);
	}
	image(target,targetX,targetY, 50, 50); // draw image

	fill(128);
	strokeWeight(0);
	rect(0,0,10,600);  // left
	rect(390,0,10,600) // right
	rect(0,0,400,10);  // up

	rect(paddlePos,590,100,10); // paddle

	// move left if possible
	if(keyIsDown(65) && paddlePos > 10) {
		paddlePos -= 4;
	} //  move right if possible
	else if (keyIsDown(68) && paddlePos < 290) {
		paddlePos += 4;
	}

	fill(255); // ball color
	ellipse(ballX,ballY,26,26); // draw ball

	ballX += ballXSpeed; // next frame's ballX
	ballY += ballYSpeed; // next frame's ballY

	// BALL X
	if (ballX < 23 || ballX > 377) {
		ballXSpeed = -(ballXSpeed);
		bounce.play();
	}

	// BALL Y
	if(ballY < 23) {
		ballYSpeed = -(ballYSpeed);
		bounce.play()
	}
	else if (ballY > 577 && ballY < 599) {
		if (ballX >= paddlePos && ballX <= paddlePos + 50) { // hit left side
			ballXSpeed = -(Math.abs(ballXSpeed)) + 3 ; // go left and speed up
			ballYSpeed = -ballYSpeed;
			bounce.play();
		}
		else if (ballX >= paddlePos+50 && ballX <= paddlePos + 100) { // hit right side
			ballXSpeed = Math.abs(ballXSpeed) + 3; // go right and speed up
			ballYSpeed = -ballYSpeed;
			bounce.play();
		}
	}
	// wait for ball to go past boundary then reset, if not it resets before border
	else if (ballY > 599) { 
		lose.play();
		ballX = 200;
		ballY = 300;
		ballXSpeed = random(-10,10);
		ballYSpeed = random(-10,10);
		misses++;
	}

}