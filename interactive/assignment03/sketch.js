var runner, chaser, points, state, chaserPic, runnerPic, bg, startTime, d, secondsToGo, lose;

class Runner {

	// set runner origin coordinates as arguments
	constructor(originX,originY) {
		this.x = originX;
		this.y = originY;
	}

	getX() { // return x val
		return this.x;
	}

	getY() { // return y val
		return this.y;
	}

	setX(x) { // set x val
		this.x = x;
	}
	setY(y) { // set y val
		this.y = y;
	}

	move(dir) { // up - 1, down - 2, left - 3, right - 4
		if (dir == 1 && this.y >= 5) { // up if not at boundary
			this.y -= 5;
		}
		else if (dir == 2 && this.y <= 475) { // down if not at boundary
			this.y += 5;
		}
		else if (dir == 3 && this.x >= 5) { // left if not at boundary
			this.x -= 5;
		}
		else if (dir == 4 && this.x <= 475) { // right if not at boundary
			this.x += 5;
		}
	}
	
}

class Chaser {

	// set chaser origin as a random position
	constructor() {
		this.x = random(0,500);
		this.y = random(0,500);
	}

	getX() { // return x val
		return this.x;
	}

	setX(x) { // set x val
		this.x = x;
	}

	getY() { // return y val
		return this.y;
	}

	setY(y) { // set y val
		this.y = y;
	}

	getSpeed() { // return speed of chaser
		return this.speed;
	}

	setSpeed(speed) { // set speed of chaser
		this.speed = speed;
	}

}

function preload() {
	chaserPic = loadImage("police.png"); // police car (chaser)
	runnerPic = loadImage("robber.png"); // robber (the runner)
	bg = loadImage("map.jpg");
	soundFormats('ogg', 'mp3');
	lose = loadSound("jail_cell_door.mp3");
}

function setup() {
	var myCanvas = createCanvas(500,500); // 500 x 500
	myCanvas.parent("canv"); // put inside canv div
	background(0); // set bg as black

	runner = new Runner(250,480); // create runner obj at bottom of screen
	chaser = new Chaser(); // create chaser obj
	points = 0; // start at 0 points for user (who is the runner)
	state = 0; // 0 - paused, 1 - playing
}

function draw() {

	if (state == 1) { // if game is started

		// *** RESTART WITH WIN *** RESTART WITH WIN *** RESTART WITH WIN ***
		// if user has made it to 10 seconds elapsed, they win and get point(s)!
		if (Date.now() - startTime > 10000) {
			points += chaser.getSpeed(); // get number of points equal to speed set
			startTime = Date.now(); // get startTime for new round of the chase
			chaser.setX(random(0,500)); // get new x pos for chaser
			chaser.setY(random(0,500)); // get new y pos for chaser
			runner.setX(250); // give runner new x pos
			runner.setY(480); // give runner new y pos

		}
		secondsToGo = parseInt((Date.now() - startTime) / 1000);
		background(bg); // refresh bg
		text("Points: " + points,25,25); // display current points on the board
		text("Time Left: " + (Date.now() - startTime) / 1000, 25,42); // display current count
		
		// W A S D keyboard moving controls
		if (keyIsDown(87)) { // up
			//console.log("up pressed");
			runner.move(1);
		}
		else if (keyIsDown(83)) { // down 
			//console.log("down pressed");
			runner.move(2);
		}
		else if (keyIsDown(65)) { // left 
			//console.log("left pressed");
			runner.move(3);
		}
		else if (keyIsDown(68)) { // right
			//console.log("right pressed");
			runner.move(4);
		}
		
		// draw the runner and chaser at current coordinates
		image(runnerPic, runner.getX(),runner.getY(),50,50);
		image(chaserPic, chaser.getX(),chaser.getY(),25,25);

		// *** RESTART WITH LOSS *** RESTART WITH LOSS *** RESTART WITH LOSS ***
		// if the distance between the chaser and the runner is less than 20, collision
		if (dist(runner.getX(), runner.getY(), chaser.getX(), chaser.getY()) < 20) {
			points -= (-1 * chaser.getSpeed() + 6); // deduct points according to difficulty
			startTime = Date.now(); // get start time for new round
			chaser.setX(random(0,500)); // get new x pos for chaser
			chaser.setY(random(0,500)); // get new y pos for chaser
			runner.setX(250); // get new x pos for runner
			runner.setY(480); // get new y pos for runner
			lose.play();
		}
		// *** USER HAS NOT COLLIDED AT THIS FRAME, MOVE USER CLOSER ***
		else {
			// set the position of chaser as a certain percentage of the distance between them closer, magnify percentage depending on speed
			distX = runner.getX() - chaser.getX(); // x dist between runner and chaser
			distY = runner.getY() - chaser.getY(); // y dist between runner and chaser


			// *** MOVING LOGIC ***
			var newX = (0.005 + (0.003) * secondsToGo) * distX * chaser.getSpeed(); // speeds up as time elapses
			var newY = (0.005 + (0.003) * secondsToGo) * distY * chaser.getSpeed(); // speeds up as time elapses
			chaser.setX(newX + chaser.getX()); // set new x for next frame
			chaser.setY(newY + chaser.getY()); // set new y for next frame
		}
	}
	else if (state == 0) { // game not started
		background(125); // gray background for opening screen
		text("Welcome to Cops and Robbers!\nEscape the Cops for 10 seconds and win a point.\nSelect initial speed of the cops (between 1 and 5).\nThe faster the cops, the more points you can win.\nAlso, if you get caught, you'll lose less points.\nPress P to toggle between pause and play.", 25,25);
		if (keyIsDown(80)) {

			startTime = Date.now() // get startTime

			// was a valid number b/t 1 and 5 added? 
			var value = parseInt(select("#inputSpeed").value());

			// validate the number, if it's valid, make it the chaser speed, if not, make the chaser speed 1
			if (isNaN(value)) {
				chaser.setSpeed(1);
			}
			else if (value <= 5 && value > 0) {
				chaser.setSpeed(value);
			}
			else {
				chaser.setSpeed(1);
			}

			state = 1;
		}
	}
}

