var state; // 0, 1, or 2
var instruments; // s0
var sounds; // s0
var pictures;

//STATE 1: matching
var speaker;
var soundActivator;
var clickChecker = false;
var winChecker, matchCheck,soundMatch, imgMatch, soundMatchX, soundMatchY, imgMatchX, imgMatchY, newY,newX;
var SoundS1Array = [];
var j, x, i;
//END STATE 1 SPECIFIC

//STATE 2
var remixSounds;
var stateTwo;

function preload() {
	sounds = [];
	sounds.push(loadSound('sounds/edited/instruments/flute.mp3')); // 1
	sounds.push(loadSound('sounds/edited/instruments/birdWhistle.mp3')); // 2
	sounds.push(loadSound('sounds/edited/instruments/ocarina.mp3')); // 3
	sounds.push(''); // 4 - not there
	sounds.push(loadSound('sounds/edited/instruments/shellTrumpet.mp3')); // 5
	sounds.push(loadSound('sounds/edited/instruments/panpipe.mp3')); // 6
	sounds.push(''); // 7 - not there
	sounds.push(loadSound('sounds/edited/instruments/peyoteRattle.mp3')); // 8
	soundFormats('ogg','mp3');

	remixSounds = [];
	//beats
	remixSounds.push(loadSound('sounds/edited/remixSounds/70BPM_SimpleStraightBeat.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/bossaNova_DrumGroove.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/caxixiShakerSolo.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/dubstepBeat.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/guiro_Cha.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/hipHop.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/soulRnB.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/tboxDrum.mp3'));
	//soundscapes
	remixSounds.push(loadSound('sounds/edited/remixSounds/bellRing.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/birdChirping.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/ocean.mp3'));
	remixSounds.push(loadSound('sounds/edited/remixSounds/flowingStream.mp3'));

	pictures = [];
	for (var i = 0; i < 8; i++) {
		pictures.push(loadImage('images/' + String(i+1) + '.png'));
	}
	pictures.push(loadImage('images/drumIcon.png'));
	pictures.push(loadImage('images/treeIcon.png'));
	pictures.push(loadImage('images/brooklynMuseumLogo.jpg'));

	speaker = loadImage("images/speaker.png");
}

function setup() {
	noStroke();
	createCanvas(500,600);
	background(255,0,0);
	imageMode(CENTER);
	state = 0;

	// s0
	instruments = [];
	var x = 70;
	var y = 150;
	for (var i = 0; i < 8; i++) {
		instruments.push(new Instrument(x,y,i));
		if (i == 3) { // for two rows of four
			x = 70;
			y = 350;
		}
		else {
			x += 120;
		}
	}

	//STATE 1
	SoundS1Array = [[425,66.66],[425,133.33],[425,200],[425,266.66],[425,333.33],[425,400],[425,466.66],[425,533.33]]

	///PUT ARRAY SHUFFLING HERE

	for (i = SoundS1Array.length - 1; i>0; i--) {
		j = Math.floor(Math.random()*(i+1));
		x = SoundS1Array[i];
		SoundS1Array[i] = SoundS1Array[j];
		SoundS1Array[j] = x;
	}

	fluteSound = new SoundS1(SoundS1Array[0][0],SoundS1Array[0][1],0);
	birdSound = new SoundS1(SoundS1Array[1][0],SoundS1Array[1][1],1);
	ocarinaSound = new SoundS1(SoundS1Array[2][0],SoundS1Array[2][1],2);
	hamastsaSound = new SoundS1(SoundS1Array[3][0],SoundS1Array[3][1],3);
	shellSound = new SoundS1(SoundS1Array[4][0],SoundS1Array[4][1],4);
	panpipeSound = new SoundS1(SoundS1Array[5][0],SoundS1Array[5][1],5);
	oysterSound = new SoundS1(SoundS1Array[6][0],SoundS1Array[6][1],6);
	peyoteSound = new SoundS1(SoundS1Array[7][0],SoundS1Array[7][1],7);
	fluteImg = new ImgS1(75,66.66,0);
	birdImg = new ImgS1(75,133.33,1);
	ocarinaImg = new ImgS1(75,200,2);
	hamastsaImg = new ImgS1(75,266.66,3);
	shellImg = new ImgS1(75,333.33,4);
	panpipeImg = new ImgS1(75,400,5);
	oysterImg = new ImgS1(75,466.66,6);
	peyoteImg = new ImgS1(75,533.33,7);
	//END STATE 1

	stateTwo = new StateTwo(instruments, remixSounds);
}

function draw() {
	if (state == 0) {
		background(79,219,255);
		imageMode(CENTER);
		image(pictures[10], width/2, 50, 190, 110);
		text("Play", 25,25);

		for (var i = 0; i < 8; i++) {
			instruments[i].display();
		}
	}
	else if (state == 1) {
		background(79,219,255);
		fill(255);
		text("Matching", 25,25);
		imageMode(CENTER);
		image(pictures[10], width/2, 50, 190, 110);
		matchGame();
	}
	else if (state == 2) {
		background(79,219,255);
		imageMode(CENTER);
		image(pictures[10], width/2, 50, 190, 110);
		stateTwo.display();
	}

}

function keyPressed() {
	if (keyCode === 39 && state !== 2) {
		state++;
	  for (var i=0; i<12; i++) {
			if (sounds[i] !== 'undefined' && sounds[i] !== '' && i<sounds.length) {
				sounds[i].stop();
			}
			if (remixSounds[i] !== 'undefined' && remixSounds[i] !== '') {
				remixSounds[i].stop();
			}
		}
	}
	else if (keyCode === 37 && state !== 0) {
		state--;
		for (var i=0; i<12; i++) {
			if (sounds[i] !== 'undefined' && sounds[i] !== '' && i<sounds.length) {
				sounds[i].stop();
			}
			if (remixSounds[i] !== 'undefined' && remixSounds[i] !== '') {
				remixSounds[i].stop();
			}
		}
	}
}


// s0
class Instrument { // maybe i could have play/pause right on the ellipse? like the play/pause graphic, gray it or change opacity when it plays?
	constructor(x,y,i) {
		this.x = x;
		this.y = y;
		this.i = i;
		if (sounds[this.i] != '') {
			this.hasSound = true;
		}
		else {
			this.hasSound = false;
		}
	}

	display() {
		if (this.hasSound && sounds[this.i].isPlaying()) {
			fill(128);
		}
		else if (this.hasSound && !sounds[this.i].isPlaying()) {
			fill(255);
		}
		else if (!this.hasSound) {
			fill(0);
		}
		else {
			fill(255);
		}
		ellipse(this.x, this.y, 100,100);
		image(pictures[this.i], this.x,this.y,75,75);
		fill(255);
	}

	clicked() {
		if (this.hasSound) {
			if (soundActivator != this.i) {
				if (soundActivator < 8) {
					sounds[soundActivator].pause();
				}
				sounds[this.i].play();
				soundActivator = this.i;
			}
			else if (soundActivator == this.i && sounds[this.i].isPlaying()) {
				sounds[this.i].pause();
			}
			else {
				sounds[this.i].play();
			}
		}
	}
}



//STATE 1: matching
function matchGame() {
	fluteSound.display();
	birdSound.display();
	ocarinaSound.display();
	hamastsaSound.display();
	shellSound.display();
	panpipeSound.display();
	oysterSound.display();
	peyoteSound.display();
	fluteImg.display();
	birdImg.display();
	ocarinaImg.display();
	hamastsaImg.display();
	shellImg.display();
	panpipeImg.display();
	oysterImg.display();
	peyoteImg.display();
	fluteImg.move();
	birdImg.move();
	ocarinaImg.move();
	hamastsaImg.move();
	shellImg.move();
	panpipeImg.move();
	oysterImg.move();
	peyoteImg.move();
	if (winChecker == true && imgMatch == 0) {
		fluteImg = new ImgS1(SoundS1Array[0][0],SoundS1Array[0][1],0);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 1) {
		birdImg = new ImgS1(SoundS1Array[1][0],SoundS1Array[1][1],1);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 2) {
		ocarinaImg = new ImgS1(SoundS1Array[2][0],SoundS1Array[2][1],2);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 3) {
		hamastsaImg = new ImgS1(SoundS1Array[3][0],SoundS1Array[3][1],3);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 4) {
		shellImg = new ImgS1(SoundS1Array[4][0],SoundS1Array[4][1],4);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 5) {
		panpipeImg = new ImgS1(SoundS1Array[5][0],SoundS1Array[5][1],5);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 6) {
		oysterImg = new ImgS1(SoundS1Array[6][0],SoundS1Array[6][1],6);
		winChecker = false;
	}
	if (winChecker == true && imgMatch == 7) {
		peyoteImg = new ImgS1(SoundS1Array[7][0],SoundS1Array[7][1],7);
		winChecker = false;
	}
}

function touchStarted() {

	if (state === 0 || state === 2) {
		for (var i = 0; i < 8; i++) {
			if (dist(mouseX, mouseY, instruments[i].x, instruments[i].y) < 50) {
				instruments[i].clicked();
			}
		}
	}

	if (state ==2) {
		stateTwo.clickRemix();
	}

	if (state == 1) {
		fluteSound.playSound();
		birdSound.playSound();
		ocarinaSound.playSound();
		hamastsaSound.playSound();
		shellSound.playSound();
		panpipeSound.playSound();
		oysterSound.playSound();
		peyoteSound.playSound();
		fluteImg.clickCheck();
		birdImg.clickCheck();
		ocarinaImg.clickCheck();
		hamastsaImg.clickCheck();
		shellImg.clickCheck();
		panpipeImg.clickCheck();
		oysterImg.clickCheck();
		peyoteImg.clickCheck();
	}
}
function touchEnded() {
	if (state == 1) {
		fluteImg.clickCheckOff();
		birdImg.clickCheckOff();
		ocarinaImg.clickCheckOff();
		hamastsaImg.clickCheckOff();
		shellImg.clickCheckOff();
		panpipeImg.clickCheckOff();
		oysterImg.clickCheckOff();
		peyoteImg.clickCheckOff();

	}
}
class ImgS1 {
	constructor(x,y,i) {
		this.xPos = x;
		this.xPosSave = x;
		this.yPos = y;
		this.yPosSave = y;
		this.i = i;
		if (sounds[this.i] != '') {
			this.hasSound = true;
		}
		else {
			this.hasSound = false;
		}
	}
	display() {
		if (this.xPosSave > 200) {
			fill(180,255,180);
			if (dist(mouseX,mouseY,this.xPos,this.yPos)<27) {
				fill(50,200,50);
			}
			else if (this.hasSound && sounds[this.i].isPlaying()) {
				fill(50,255,50);
				soundMatch = '';
			}
		}
		else {
			fill(255);
			if (dist(mouseX,mouseY,this.xPos,this.yPos)<27) {
				fill(200);
			}
		}
		ellipse(this.xPos, this.yPos, 60, 60);
		imageMode(CENTER);
		image(pictures[this.i], this.xPos, this.yPos, 55, 55);
	}
	clickCheck() {
		if (dist(mouseX,mouseY,this.xPos,this.yPos)<27) {
			this.clickChecker = true;
			imgMatch = this.i;
		}
		else {
			this.clickChecker = false;
		}
	}
	clickCheckOff() {
		if (this.xPos > 300) {
			imgMatchX = mouseX;
			imgMatchY = mouseY;
			matchCheck = true;
		}
		this.clickChecker = false;

	}
	move() {
		if (this.xPosSave < 200) {
			if (this.clickChecker == true) {
				this.xPos = mouseX;
				this.yPos = mouseY;
			}
			else if (this.clickChecker == false) {
				this.xPos = this.xPosSave;
				this.yPos = this.yPosSave;
			}
		}
	}
}
class SoundS1 {
	constructor(x,y,i) {
		this.xPos = x;
		this.yPos = y;
		this.i = i;
		if (sounds[this.i] != '') {
			this.hasSound = true;
		}
		else {
			this.hasSound = false;
		}
	}
	display() {
		if (dist(mouseX,mouseY,this.xPos,this.yPos)<27) {
			soundMatch = this.i;
			soundMatchX = this.xPos;
			soundMatchY = this.yPos;
			if (matchCheck == true && soundMatch == imgMatch && dist(soundMatchX,soundMatchY,imgMatchX,imgMatchY)<27) {
				matchCheck = false;
				newX = this.xPos;
				newY = this.yPos;
				winChecker = true;
				print('won');
			}
			fill(150);
		}
		else if (this.hasSound && sounds[this.i].isPlaying()) {
			fill(150);
			soundMatch = '';
		}
		else if (!this.hasSound) {
			fill(25);
			soundMatch = '';
		}
		else {
			fill(255);
		}
		ellipse(this.xPos, this.yPos, 55, 55);
		imageMode(CENTER);
		image(speaker, this.xPos, this.yPos, 30, 30);
	}
	playSound() {
		if (dist(mouseX,mouseY,this.xPos,this.yPos)<27 && this.hasSound) {  //23 instead of 20 diameter for a little wiggle room
			if (soundActivator != this.i) {
				if (soundActivator < 8) {
					sounds[soundActivator].pause();
				}
				sounds[this.i].play();
				soundActivator = this.i;
			}
			else if (soundActivator == this.i && sounds[this.i].isPlaying()) {
				sounds[this.i].pause();
			}
			else {
				sounds[this.i].play();
			}
		}
	}
}
// END STATE 1

class StateTwo {
	constructor(instruments) {
		this.instruments = instruments;
		this.remixButtonDiameter = 40;
		this.remixButtonRadius = this.remixButtonDiameter/2;
		this.remixButtons = [];
		var column = 1;
		var row = 1;
		for (var i=0; i<12; i++) {
			if (row <= 2) {
				var temp = new RemixButton(70*column, 70*row + 400, i)
				this.remixButtons.push(temp);
				column++;
				if (column === 7) {
					row++;
					column = 1;
				}
			}
		}
	}

	display() {
		text("Remix", 25,25);
		for (var i = 0; i < 8; i++) {
			instruments[i].display();
		}
		/***************remix buttons************/
		for (var i=0; i<12; i++) {
			this.remixButtons[i].display();
		}
		/***********end remix buttons************/
	}

	clickRemix() {
		for (var i=0; i<12; i++) {
			this.remixButtons[i].clicked();
			//console.log('clicked!');
		}
	}
}

class RemixButton {
	constructor(x, y, soundIndex) {
		this.xPos = x;
		this.yPos = y;
		this.diameter = 40;
		this.radius = this.diameter/2;
		this.soundIndex = soundIndex;
		if (this.soundIndex <=7) {
			this.isBeat = true;
			this.isSoundscape = false;
		}
		else if (this.soundIndex >= 8) {
			this.isBeat = false;
			this.isSoundscape = true;
		}
	}

	display() {
		if (remixSounds[this.soundIndex].isPlaying()) {
			fill(128);
		}
		else {
			fill(255);
		}
		ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
		imageMode(CENTER);
		if (this.isBeat) {
			image(pictures[8], this.xPos, this.yPos, this.radius, this.radius);
		}
		else if (this.isSoundscape) {
			image(pictures[9], this.xPos, this.yPos, this.radius, this.radius);
		}
	}

	clicked() {
		if (dist(mouseX, mouseY, this.xPos, this.yPos) < this.radius) {
			if (remixSounds[this.soundIndex].isPlaying()) {
				remixSounds[this.soundIndex].pause();
			}
			else {
				remixSounds[this.soundIndex].play();
			}
		}
	}
}
