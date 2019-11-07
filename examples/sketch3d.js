//switch to the 2d example in the index.html

let recorder; //make a variable for the path recoder class to exist in
let zDepth = 0;
let r = 0;

let pathToggle = true;


function setup() {
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES);

  recorder = new p5pathRecorder(); //instantiate a new path recorder
  // recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer
  // recorder.speed = 0.5 //change the playback speed

}

function draw() {
  background(0);


    let pos = recorder.play() //play back the recording
    // console.log(pos)


  if(mouseIsPressed){

    zDepth = zDepth - 10
    recorder.recordFrame(mouseX,mouseY,zDepth) //record a frame to the buffer

  }else{
    zDepth = 0
    //dont draw the box while recording.
    push()
      translate(-height/2,-width/2) //since we're using mouseX/Y we need to change coordinates to match.
      translate(pos.x,pos.y,pos.z) //move based on the buffer
      r++
      rotateX(r) // rotate the box
      stroke(255,0,0)
      box(100,100,100)
    pop()
  }

  push()
    translate(-height/2,-width/2) //since we're using mouseX/Y we need to change coordinates to match.
    stroke(255)
    recorder.showPaths(); //show the path of the recording using points
  pop()
}


function keyPressed(){
  if(key == 'c'){
    //clear
    recorder.clear()
  }

  if(key == 's'){
    recorder.save('myPaths') //save out the paths (you'll need to import them back into the editor and use the load() function to load the json file in the setup or preload
  }

  if(key == 'p'){
    pathToggle = !pathToggle
  }


}
