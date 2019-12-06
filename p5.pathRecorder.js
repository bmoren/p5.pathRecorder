// Ben Moren 2019
// GNU GPL 3.0

class p5pathRecorder {
  constructor() {
    this.buffer = []
    this.speed = 1
    this.survey = 0;
    this.direction = 1;
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
        // this.buffer = data   //convert this to p5 vectors before adding to the buffer

        for(let point of data){
          let p = createVector(point.x,point.y,point.z)
          this.buffer.push(p)
        }

      })
  }

  //reset the start location
  startLocation(location){

    //constrain this to 0, the length of the buffer
    this.survey = constrain(location,0,this.buffer.length-1)

  }


  //play back the animation buffer
  play(direction) {

    //increment the survey!
    this.survey += this.speed * this.direction


    if (this.buffer != undefined && this.buffer.length > 0) {
      //play from the interal buffer if there is something there.

      if(direction === 'forward' || typeof direction === "undefined"){
        this.direction = 1;

        if(this.survey >= this.buffer.length-1){
          this.survey = 0;
        } //reset

      }else if(direction === 'reverse'){
        this.direction = -1

        if(this.survey <= 0){
          this.survey = this.buffer.length-1;
        } //reset

      }else if(direction === "alternate"){

        if(this.survey <= 0 || this.survey >= this.buffer.length-1){
          this.direction = -this.direction //flip the direction
        }

      }

      //this needs to be constrained to account for fast playback speeds
      return this.buffer[constrain(floor(this.survey),0,this.buffer.length-1)]


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
    if(this.survey  % this.buffer.length === 0){
      cb()
    }
  }



} // close the class
