// 432 Park Avenue: 1,396 feet tall, 85 stories
// 93 by 93 foot square with 6 10 x 10 windows per face
// windows 4 pixels, space b/t is 1 pixel


function setup() {
  createCanvas(750, 750); // 750 x 750 pixels

  background(201,224,238); // light blue sky

  strokeWeight(0); // no border for the building
  
  
  fill(244); // nearly white building
  rect(20,20,40,600); // building is 15:1 ratio

  fill(128); // half gray for the street
  rect(0,620,750,130); // street

  // street lines
  strokeWeight(3);
  stroke(221,164,32);
  line(0,685,750,685);
  line(0,690,750,690);

  // street arrow towards 432
  stroke(255);
  fill(255);
  triangle(560,650,590,640,590,660);
  strokeWeight(0);
  text("To 432 Park Avenue", 600,655);


  // windows start here
  xPos = 22.3; 
  yPos = 22;
  
  // border for the windows is an orange
  strokeWeight(0.75);
  stroke(240,167,124);

  fill(201,224,238); // window fill is same as blue sky

  // 85 floors
  for(var i = 0; i < 85; i++) {
  	// 6 windows per floor
  	for(var j = 0; j < 6; j++) {
  		rect(xPos,yPos,3.5,3.5);
  		if (j != 5) {
  			xPos += 6.2;
  		}
  		else {
  			xPos = 22.3;
  		}
  	}
  	yPos += 7.05;
  }
  strokeWeight(0);
  fill(252,212,64); // orange/yellow sun
  ellipse(600,50,50,50);

  // clouds
  fill(255);
  ellipse(590,70,80,50);

}