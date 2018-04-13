var world, balloon, container, earth, spots, slide;

function setup() {
	noCanvas();
	slide = loadSound('sounds/slide.mp3'); // sound for sliding to spots
	soundFormats('ogg', 'mp3');

	world = new World('VRScene');
	world.setFlying(true); // user can move in three dimensions

	plane = new Plane({x:0, y:0, z:0, width: 100, height: 100, red:96, green:128, blue:56, rotationX:-90});
	sun = new Sphere({x:-100,y:10,z:-1000,radius:10,asset:"sun", 
		clickFunction: function(e) {
	 		e.setRadius(e.getRadius()*1.05);
	 	} // if clicked, sun expands by 5 percent
	 });
	balloon = new OBJ({asset:'balloon_obj',mtl:'balloon_mtl',x: 20,y: 5,z: -50,rotationX:0,rotationY:180,scaleX:1,scaleY:1,scaleZ:1});
	container = new Container3D({x:0, y:1, z:-10});
	world.add(plane);
	world.add(sun);
	world.add(balloon);
	world.add(container);

	var b = new Box({x:-10,y:1,z:0,red:255,green:0,blue:0}); // all these objects rotate with the container as a composite object
	var s = new Sphere({x:-10,y:3,z:0,radius:1,red:255,green:165,blue:0});
	var r = new Ring({x:-10,y:5,z:0,radiusInner:0.5,radiusOuter:1,side:'double',red:255,green:255,blue:0,rotationY:90});
	var to = new Torus({x:-10,y:7,z:0,radius:0.5,radiusTubular:0.05,red:0,green:255,blue:0});
	var tok = new TorusKnot({x:-10,y:9,z:0,radius:0.5,radiusTubular:0.05,red:0,green:0,blue:255});
	var co = new Cone({x:-10,y:12,z:0,radiusBottom:1,radiusTop:0,red:255,green:0,blue:255});
	container.addChild(b);
	container.addChild(s);
	container.addChild(r);
	container.addChild(to);
	container.addChild(tok);
	container.addChild(co);

	spots = [];
	for (var i = 0; i < 100; i++) {
		spots.push(new Spot(random(-100,100),random(1,1000),random(-100,100))); // randomized spots can be teleported to
	}
}

function draw() {
	balloon.spinY(0.05);
	container.spinY(2);
	sun.spinY(3);

	if (mouseIsPressed) { // user moves slowly forward when mouse is pressed
		world.moveUserForward(0.05);
	}
}

class Spot { // spot class makes cylinders that can be slid to on landscape
	constructor(x,y,z) {
		this.marker = new Cylinder({x:x,y:y,z:z,red:random(255),green:random(255),blue:random(255),radius:3,height:0.25,openEnded:false,
			clickFunction: function(e) { // if user clicks cylinder, they're slid to the object in three seconds and sound is triggered
				slide.play();
				world.slideToObject(e,3000);
			}
		});
		world.add(this.marker);
	}
}