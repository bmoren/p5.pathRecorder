let recordings = [] //store all of the paths!

let pathToggle = true;

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
  
  if(pathToggle){
    for(let i = 0 ; i < recordings.length; i ++){
        recordings[i].showPaths()
    }
  }

  if(keyIsPressed && mouseIsPressed){
    // console.log(key)
    if(key == 1 || key == 2 || key == 3 || key == 4 || key == 5){

      // console.log(key-1)
      recordings[key-1].recordFrame(mouseX,mouseY)
    }
  }else{
    //dont playback while recording paths

    ellipse(recordings[0].play().x, recordings[0].play().y, 100)
    rect(recordings[1].play().x, recordings[1].play().y, 100, 100)
    ellipse(recordings[2].play().x, recordings[2].play().y, 100, 20)
    rect(recordings[3].play().x, recordings[3].play().y, 20, 100)
    ellipse(recordings[4].play().x, recordings[4].play().y, 50)

    // or (only ellipses)

    // for(let i = 0 ; i < recordings.length; i ++){
    //     let pos = recordings[i].play()
    //     ellipse(pos.x,pos.y,50)
    // }

  }
}


function keyPressed(){
  if(key == 'c'){
    //clear them all!
    for(let i = 0 ; i < recordings.length; i ++){
      recordings[i].clear()
    }
  }

  if(key == 'p'){
    pathToggle = !pathToggle
  }

}
