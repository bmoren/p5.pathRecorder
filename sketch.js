//Swithch to the 3d example in the index.html

let recorder; //make a variable for the path recoder class to exist in


function setup() {
  createCanvas(400, 400);
    
  recorder = new p5pathrecorder(); //instantiate a new path recorder
  recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer
  
}

function draw() {
  background(220);
  
    // recorder.speed = 0.5 //change the playback speed 
  
    let pos = recorder.play() //play back the recording
  
    // console.log(pos)
  
     
  if(mouseIsPressed){
    recorder.recordFrame(mouseX,mouseY) //record a frame to the buffer
  }else{
    //dont draw the ellipse while recording.
    ellipse(pos.x, pos.y, 100, 100)
  }
  
  recorder.showPaths(); //show the path of the recording using points
  
}


function keyPressed(){
  
  recorder.save('myPaths') //save out the paths (you'll need to import them back into the editor and use the load() function to load the json file in the setup or preload

  
}
