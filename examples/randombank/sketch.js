let recordings = [] //store all of the paths!

let pathToggle = true;

let source = 0
let c = 255

function setup() {
  createCanvas(800, 800);

  //create multiple path recordings
  for(let i = 0 ; i <= 4; i ++){
    let recorder = new p5pathRecorder(); //instantiate a new path recorder
    recorder.load('myPaths-'+ i +'.json') //load some existing paths from a file
    // console.log(recorder.buffer) //see the paths buffer
    recordings.push(recorder)
  }

}

function draw() {
  background(0);
  stroke(255);

  //check when the current playback is finished and when done choose a new animation path source
  recordings[source].onEnded(function(){
      source = floor(random(5))
      c = color(random(255), random(255), random(255))
  })


  //playback the current source
  let playhead = recordings[source].play()
  fill(c)
  ellipse(playhead.x, playhead.y, 100)

  //handle the path displays
  if(pathToggle){
    for(let i = 0 ; i < recordings.length; i ++){
        recordings[i].showPaths()
    }
  }

}


function keyPressed(){

  if(key == 'p'){
    pathToggle = !pathToggle
  }

}
