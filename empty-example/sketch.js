var x,y;

function setup() {
  // put setup code here
  createCanvas(2160, 800);
  // Starts in the middle
  x = width / 2;
  y = height;

}

var z= 50;
var synth = new Tone.AMSynth().toMaster()

  function draw() {

    synth.triggerAttackRelease((x/2) + '', '32n')
    // put drawing code here
    background(200);

    frameRate(8);
    for (var i = 0; i < width; i++) {

    line(x, y, x, 0);
    stroke(z);
    //z = z + random(-1,1)
    // Jiggling randomly on the horizontal axis
    x = x + random(-2, 2);
    // Moving up at a constant speed
    y = y - .5;
    // Reset to the bottom
    if (y < 0) {
      y = height;
    }

    }
  }
