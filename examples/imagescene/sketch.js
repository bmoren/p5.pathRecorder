let recordings = [] //store all of the paths!

let pathToggle = false;

let bird1,bird2,bird3,flower1,flower2,bkg,grass ;

function preload(){
  bird1 = loadImage('images/bird1.png')
  bird2 = loadImage('images/bird2.png')
  bird3 = loadImage('images/bird3.png')
  flower1 = loadImage('images/flower1.png')
  flower2 = loadImage('images/flower2.png')
  bkg = loadImage('images/bkg.png')
  grass = loadImage('images/grass.png')

}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER)

  //create multiple path recordings
  for(let i = 0 ; i <= 6; i ++){
    let recorder = new p5pathRecorder(); //instantiate a new path recorder
    recordings.push(recorder)
  }

  recordings[6].load('animations/grass.json') //load some existing paths from a file
  recordings[5].load('animations/mtn.json') //load some existing paths from a file
  recordings[4].load('animations/flower1.json') //load some existing paths from a file
  recordings[3].load('animations/flower2.json') //load some existing paths from a file
  recordings[2].load('animations/bird1.json') //load some existing paths from a file
  recordings[1].load('animations/bird2.json') //load some existing paths from a file
  recordings[0].load('animations/bird3.json') //load some existing paths from a file




}

function draw() {
  background(255);

  if(keyIsPressed && mouseIsPressed){
    // console.log(key)
    if(key == 1 || key == 2 || key == 3 || key == 4 || key == 5 || key == 6 || key == 7){

      // console.log(key-1)
      recordings[key-1].recordFrame(mouseX,mouseY)
    }
  }else{
    //dont playback while recording paths


    let b3 = recordings[0].play()
    let b2 = recordings[1].play()
    let b1 = recordings[2].play()
    let f2 = recordings[3].play()
    let f1 = recordings[4].play()
    let mtn = recordings[5].play()
    let grs = recordings[6].play()

    image(bird3,b3.x,b3.y,100,100)

    image(bird1,b1.x,b1.y,100,100)
    image(flower2,f2.x,f2.y,140,240)
    image(bird2,b2.x,b2.y,100,100)

    image(flower1,f1.x,f1.y,150,300)
    image(bkg,mtn.x,mtn.y,900,300)
    image(grass,grs.x,grs.y,900,100)




  }

  if(pathToggle){
    for(let i = 0 ; i < recordings.length; i ++){
        recordings[i].showPaths()
    }
  }

}


function keyPressed(){
  // if(key == 'c'){
  //   //clear them all!
  //   for(let i = 0 ; i < recordings.length; i ++){
  //     recordings[i].clear()
  //   }
  // }

  if(key == 'p'){
    pathToggle = !pathToggle
  }

  if(key == 's'){
    // recordings[6].save('grass')
    // recordings[5].save('mtn')
    // recordings[4].save('flower1')
    // recordings[3].save('flower2')
    // recordings[2].save('bird1')
    // recordings[1].save('bird2')
    // recordings[0].save('bird3')
  }

}
