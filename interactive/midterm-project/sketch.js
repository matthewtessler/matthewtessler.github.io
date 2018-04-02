var state; // true - play, false - pause
var diff; // 0 - easy, 1 - medium, 2 - hard
var points; // score-keeping
var count; // what num of keys being played in sequence
var playListenBuildInform; // 0 - play, 1 - listen , 2 - build
var keys; // stack of keys to play back, match off of
var upperBounds; // easy, medium, hard upper bounds for range of ASCII codes
var startMillis = -1; // timing mechanism, -1 indicates reset
var pos; // when viewing stack/arr of keys, the pos is used to read backwards
var winLoss; // flag indicates if user played sequence of keys correctly or not
var osc; // oscillator for sounds
var startOsc; // flag for osc start
var waitMillis; // use for brief delay of keys to differentiate
var letters; // to hold letter objects with images
var startBg; // start background
var pausedBg; // pause background
var timesPaused; // to track how many times the game has been paused

function getRandomInteger(min, max) { // random integer function from W3Schools.com
	return Math.floor(Math.random() * (max - min + 1) ) + min; // both inclusive
}

function preload() {
	letters = []; // letters arr will hold images
	for (var i = 65; i < 91; i++) { // add image objects to arr
		letters.push(new Letter(loadImage("letters/" + String(i) + ".png")));
	}
	// all external graphics created by Melissa Lopez, mel501@nyu.edu
	startBg = loadImage("backgrounds/start.jpg"); // start bg
	pausedBg = loadImage("backgrounds/paused.jpg"); // paused bg
	bg = loadImage("backgrounds/bg.jpg"); // playing bg
}

function setup() {
	createCanvas(500,500); // create canvas
	background(128); // bg starts as gray (the pause color)
	state = false; // state starts in pause
	diff = -1; // diff starts as -1, "not chosen"
	points = 0; // user starts at 0 points
	count = 1; // one key to repeat at first
	playListenBuildInform = 2; // start in build mode (have to make the stack of keys)
	keys = []; // start off with an empty stack
	upperBounds = [68, 76, 90]; // set upper bounds for difficulty modes ASCII codes
	osc = new p5.SinOsc(); // for sounds
	startOsc = false; // flag for starting sounds
	waitMillis = -1; // for artificial delay to distinguish characters
	timesPaused = 0; // to track number of times the game has been paused/unpaused
}

function draw() {
	if (state) { // play
		imageMode(CORNER); // puts image by corner point
		background(bg) // bg black
		fill(0); // text white

		if (playListenBuildInform === 0) { // play back keys
			text("Playing . . .\nPoints: " + points, 30, 35); 
			if (waitMillis === -1) { // insert artificial frame hiccup
				waitMillis = millis(); // set new wait time
			}
			else if (waitMillis > 250) { // pause for 250 milliseconds so user can distinguish to identical keys
				text(String(keys.length - pos) + " - " + String(String.fromCharCode(keys[pos])), 25, 75); // current key
				letters[keys[pos] - 65].display(); // display the letter image
				osc.freq(midiToFreq(keys[pos]-5)); // get freq for new key

				if (startMillis === -1) { // just entering play mode, set a fresh timer
					startMillis = millis();
					osc.start(); // start playin when timer starts
				}
				else if (millis() - startMillis > 1500) { // waited 1.5 seconds, go ahead
					pos--; // play next lowest letter on stack
					waitMillis = -1; // reset the wait time for the next time
					startMillis = millis(); // reset timer
					if (pos === -1) { // if there are no more elements to read on stack
						playListenBuildInform = 1; // switch to listen mode
						startMillis = -1; // reset for listen
						osc.stop(); // stop when no more notes to play
						pos = keys.length - 1; // start at end of arr again
					}
				}
			}			
		}
		else if (playListenBuildInform === 1) { // listen for keys
			text("Listening . . .\nPoints: " + points, 30, 35);		
		}
		else if (playListenBuildInform === 2) { // build set of keys
			text("Building . . .\nPoints: " + points, 30, 35);
			if (startMillis === -1) { // 
				// keys = []; 
				// for (var i = 0; i < count; i++) { // add a random key to keys stack
					keys.unshift(getRandomInteger(65,upperBounds[diff]));
				// }
				startMillis = millis(); // wait 3000 milliseconds after this time
			}
			else if (millis() - startMillis > 3000) {
				playListenBuildInform = 0; // once done building, switch to play mode
				startMillis = -1; // reset startMillis to be used again in play mode
				pos = count - 1; // position to read back keys at
			}
		}
		else if (playListenBuildInform === 3) { // inform that they lost or won
			text("Informing . . .\nPoints: " + points, 30,35);

			// option to go into pauses mode and change diff?
			if (startMillis === -1) {
				startMillis = millis();
			}
			else if (millis() - startMillis < 3000) {
				// if user won
				if (winLoss) {
					fill(0);
					text("Correct! Back to building . . .",30,85);
				}
				// if user lost
				else {
					// you made it to [this many] number of keys
					fill(0);
					text("You lost. Restarting now with 1 key . . .",30,60);
				}
			}
			else {
				playListenBuildInform = 2; // to build mode
				startMillis = -1; // restart clock
			}	

		
			// stops tones from LISTEN section
			if (millis() - startMillis > 1000) { 
				osc.stop();
			}
		}
	}
	else { // pause
		imageMode(CORNER);
		if (timesPaused > 0) {
			background(pausedBg);
		}
		else {
			background(startBg);
		}

		text("You are playing SimonKeys. You're current score is " + points + ".", 30,35);

		if (diff === -1) { // no mode chosen
			text("You have not chosen a difficulty mode.", 30, 60);
		}
		else if (diff === 0) { // easy mode chosen
			text("You are currently in Easy Mode.", 30,60);
		}
		else if (diff === 1) { // medium mode chosen
			text("You are currently in Medium Mode.", 30, 60);
		}
		else if (diff === 2) { // hard mode chosen
			text("You are currently in Hard Mode.", 30, 60);
		}
		text("For Easy (4 keys) select 1. For Medium (12 keys) select 2. For Hard (26 keys) select 3.", 30, 85);
		text("Click the space bar to play. Must refresh browser to change difficulty mode.", 30, 110);
	}
} 

function keyPressed() {
	if (keyCode === 32) { // space bar toggles play/pause
		if (diff !== -1) { // if user has difficulty mode chosen, let them play
			state = !state;
		}
		timesPaused++; // if timesPaused is greater than 0 user cannot change difficulty mode
	}
	else if (keyCode > 48 && keyCode < 52 && timesPaused === 0) {
			diff = keyCode-49; // easy
			count = 1; // start with one key
	}
	else if (state && playListenBuildInform === 1) { // listening for key press response
		text(String.fromCharCode(keyCode), 25, 75);
		osc.freq(midiToFreq(keyCode-5)); // change frequency to match key

		// makes sure osc only starts once so no repetitive sound
		if (!startOsc) { 
			osc.start();
			startOsc = true;
		}

		if (keyCode !== keys[pos]) { // they lost
			// reset
			count = 1; // count back to one, user starts again
			keys = []; // reset keys here
			playListenBuildInform = 3;
			winLoss = false; // tells inform that user lost
			startOsc = false; // set osc back to not playing in LISTEN
		}
		else if (pos == 0){ // they won b/c they played all keys back
			points += (upperBounds[diff] - 64) * count;
			count++; // increment count to add an additional key to next round
			playListenBuildInform = 3;
			winLoss = true; // tells inform that user won
			startOsc = false; // set osc back to not playing in LISTEN
		}

		pos--; // decrement pos to show next key when another is pressed
	}
}

// letter class will hold images and allow display
class Letter {
	constructor(img) { // add img object
		this.img = img;
	}

	display() { // display at 250,250
		imageMode(CENTER);
		image(this.img, 250,300);
	}
}