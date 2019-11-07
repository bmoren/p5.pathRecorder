// Ben Moren 2019
// GNU GPL 3.0

class p5pathRecorder {
  constructor() {
    this.buffer = []
    this.speed = 1
    this.survey = 0;
  }

  //record a frame of animation to the internal buffer
  recordFrame(x, y, z) {

    if (typeof z === "undefined") {
      this.buffer.push(createVector(x, y))
    } else {
      this.buffer.push(createVector(x, y, z))
    }
  }

  //save out the paths as json
  save(filename) {

    //save out the path to a JS file
    let writer = createWriter(filename + '.json');

    writer.print('[')

    for (let i = 0; i < this.buffer.length; i++) {

      if (this.buffer[i].z) {
        //there is a Z

        if (i != this.buffer.length - 1) {
          writer.print(
            `{"x": ${this.buffer[i].x},"y":${this.buffer[i].y},"z":${this.buffer[i].z}},`
          )
        } else {
          writer.print(
            `{"x": ${this.buffer[i].x},"y":${this.buffer[i].y},"z":${this.buffer[i].z}}`
          )
        }

      } else {
        //no Z

        if (i != this.buffer.length - 1) {
          writer.print(
            `{"x": ${this.buffer[i].x},"y":${this.buffer[i].y}},`
          )
        } else {
          writer.print(
            `{"x": ${this.buffer[i].x},"y":${this.buffer[i].y}}`
          )
        }

      }

    }

    writer.print(']')
    writer.close();

  }

  //clear the interal buffer
  clear() {
    this.buffer = []
  }

  //load a set of paths into the buffer from external file
  load(filepath) {
      let json = loadJSON(filepath, (data)=>{
        this.buffer = data
      })
  }

  //reset the start location
  startLocation(location){
    this.survey = location
  }


  //play back the animation buffer
  play() {

    this.survey += this.speed

    //play from the interal buffer if there is something there.
    if (this.buffer != undefined && this.buffer.length > 0) {
      return this.buffer[floor(this.survey % this.buffer.length)]
    }else{
      let zeroObject = {"x":0,"y":0,"z":0}
      return zeroObject
    }

  }

  // show the paths for debugging
  showPaths(){
    for(let i = 0 ; i < this.buffer.length; i ++){
      point(this.buffer[i].x,this.buffer[i].y,this.buffer[i].z)
    }
  }

  //animation ended event handler
  onEnded(cb){
    if(this.survey  % this.buffer.length == 0){
      cb()
    }
  }



} // close the class
