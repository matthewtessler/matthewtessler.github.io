var state; // true - play, false - pause
var diff; // 0 - easy, 1 - medium, 2 - hard
var points; // score-keeping
var count; // what num of keys being played in sequence
var playListenBuild; // 0 - play, 1 - listen , 2 - build
var keys;

function getRandomInteger(min, max) { // random integer function from W3Schools.com
	return Math.floor(Math.random() * (max - min + 1) ) + min; // both inclusive
}

function setup() {
	createCanvas(500,500); // create canvas
	background(128); // bg starts as gray (the pause color)
	state = false; // state starts in pause
	diff = -1; // diff starts as -1, "not chosen"
	points = 0; // user starts at 0 points
	count = 1; // one key to repeat at first
	playListenBuild = 2; // start in build mode (have to make the stack of keys)
	keys = []; // start off with an empty stack
}

function draw() {
	if (state) { // play
		console.log("hello!");
		background(0) // bg black
		fill(255); // text white

		if (playListenBuild === 0) { // play back keys
			text("Playing . . .", 25, 25);

			// bing bom boom 

			// this has to be time somehow so it doesn't go at 60 fps
			// has to be one every 1-3 seconds

			// first check if stack is not empty, if it is, change to listening
			// if stack is not empty, pop one from stack, play it (and eventually it's note)

		}
		else if (playListenBuild === 1) { // listen u keys
			text("Listening . . .", 25, 25);

			// listen for sequence of keys (I must only register when key goes up so I don't have double counts)
			// as the keys are being played, (eventually) play their notes

			// i'd like to compare to stack in real time

			// bing bom boom
					// points += diff * count
					// count++
					// back into build mode
				// bing bom bing
					// wrong!
					// count = 1
					// start again
					// back into build mode

		}
		else if (playListenBuild === 2) { // build set of keys
			text("Building . . .", 25, 25);
			// build stack with *count* number of keys randomly chosen
			for (var i = 0 ; i < count; i++) {
				keys.push(getRandomInteger(65,68));
			}
			console.log(keys);
			playListenBuild = 0; // once done building, switch to play mode

			// populate a stack with randomly chosen keys 
			// the keys that can be possibly chosen depends on diff level
			// easy -   ABCD
			// medium - ABCDEFGHIJKL
			// hard -   ABCDEFGHIJKLMNOPQRSTUVWXYZ
		}
	}
	else { // pause
		background(128); // bg gray
		text("You are playing SimonKeys. You're current score is " + points + ".", 25,25);

		if (diff === -1) { // no mode chosen
			text("You have not chosen a difficulty mode.", 25, 50);
		}
		else if (diff === 0) { // easy mode chosen
			text("You are currently in Easy Mode.", 25,50);
		}
		else if (diff === 1) { // medium mode chosen
			text("You are currently in Medium Mode.", 25, 50);
		}
		else if (diff === 2) { // hard mode chosen
			text("You are currently in Hard Mode.", 25, 50);
		}

		text("For Easy (4 keys) select 1. For Medium (12 keys) select 2. For Hard (26 keys) select 3.", 25, 75);
		text("To restart the game, choose a new difficulty mode. Click the space bar to play.", 25, 100);

	}
} 

function keyPressed() {
	if (keyCode === 32) { // space bar toggles play/pause
		if (diff !== -1) { // if user has difficulty mode chosen, let them play
			state = !state;
		}
	}
	else if (keyCode === 49 && !state) {
		if (diff !== 0) { // if selection is new, restart
			diff = 0;
			count = 1; // back to one key
		}
	}
	else if (keyCode === 50 && !state) {
		if (diff !== 1) { // if selection is new, restart
			diff = 1;
			count = 1; // back to one key
		}
	}
	else if (keyCode === 51 && !state) {
		if (diff !== 2) { // if selection is new, restart
			diff = 2;
			count = 1; // back to one key
		}
	}
}