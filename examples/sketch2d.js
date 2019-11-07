//Swithch to the 3d example in the index.html

let recorder; //make a variable for the path recoder class to exist in

let pathToggle = true;


function setup() {
  createCanvas(800, 800);

  recorder = new p5pathRecorder(); //instantiate a new path recorder
  recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer

}

function draw() {
  background(0);
  stroke(255);

    // recorder.speed = 0.5 //change the playback speed

    let pos = recorder.play() //play back the recording

    // console.log(pos)


  if(mouseIsPressed){
    recorder.recordFrame(mouseX,mouseY) //record a frame to the buffer
  }else{
    //dont draw the ellipse while recording.
    ellipse(pos.x, pos.y, 100, 100)
  }

  if(pathToggle){
    recorder.showPaths(); //show the path of the recording using points
  }
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
