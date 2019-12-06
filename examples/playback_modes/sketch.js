let recorder; //make a variable for the path recoder class to exist in

let pathToggle = true;

let playbackMode = 'forward'

let slider


function setup() {
  createCanvas(800, 800);

  recorder = new p5pathRecorder(); //instantiate a new path recorder
  recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer

  slider = createSlider(0,5, 1.5,0.1)
  slider.parent('playback-speed')

}

function draw() {
  background(0);
  stroke(255);

    recorder.speed = slider.value() //change the playback speed
    select('#pb-info').html( slider.value() ) //update the text on the HTML page

    let pos = recorder.play(playbackMode) //play back the recording

    // console.log(pos)


  if(mouseIsPressed && mouseY > 0){
    recorder.recordFrame(mouseX,mouseY) //record a frame to the buffer
  }else{
    //dont draw the ellipse while recording.
    ellipse(pos.x, pos.y, 100, 100)
  }

  if(pathToggle){
    recorder.showPaths(); //show the path of the recording using points
  }
  // console.log(recorder.survey)
}


function keyPressed(){
  if(key === 'c'){
    //clear
    recorder.clear()
  }

  if(key === 's'){
    recorder.save('myPaths') //save out the paths (you'll need to import them back into the editor and use the load() function to load the json file in the setup or preload
  }

  if(key === 'p'){
    pathToggle = !pathToggle
  }

  if(key === 'r'){
    recorder.startLocation(0)
  }
  
  if(key === 'f'){
    playbackMode = 'forward'
  }
  if(key === 'b'){
    playbackMode = 'reverse'
  }
  if(key === 'a'){
    playbackMode = 'alternate'

  }


}
