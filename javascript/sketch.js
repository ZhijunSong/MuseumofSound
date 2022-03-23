let sounds = [];
let imports = [];
let fileName=[];
let backgroundImg=[];
let total= 10;
let nodeY = [];
let nodeX;
let clicked = false;
let clickedItem = -1;
let cnv;




function preload(){
    // fileName=[];
    // for(let i =0;i<total-1;i++){
    //   imports[i]=loadSound('assets/ChinatownErHu.m4a');
    // backgroundImg[i]=loadImage('image/,,,,');

    // }
    //canal st
    imports[0] = loadSound('assets/Canal street/Canal St.01.m4a');

    imports[1] = loadSound('assets/Canal street/Canal St.02.mp3');
    imports[2] = loadSound('assets/Canal street/Canal St.03.m4a');
    imports[3] = loadSound('assets/Canal street/Canal St.04.m4a');
    imports[4] = loadSound('assets/Canal street/Canal St.05.m4a');

    //14th
    imports[5] = loadSound('assets/14th street/14th St 01.mp3');
    imports[6] = loadSound('assets/14th street/14th St. 02.mp3');
    imports[7] = loadSound('assets/14th street/14th St. 03.mp3');


    //34th
  
    imports[8] = loadSound('assets/Ktown/34th st 02.mp3');
    imports[9] = loadSound('assets/Ktown/34th St.01.m4a');
    imports[10] = loadSound('assets/14th street/14th St 01.mp3');
    imports[11] = loadSound('assets/14th street/14th St 01.mp3');

}

function setup(){
    cnv=createCanvas(windowWidth,windowHeight*2);
    cnv.parent('canvas');
    cnv.style("width:100%");
    cnv.style("height:100%");
    

    for(let i = 0; i < 5; i++){
      nodeY[i] = height/i
    }
      
    nodeX = width/4;

    //create sounds
    
    sounds[0] = new SoundNode(imports[0], 1, 'snvo', nodeX, nodeY[0]);
    sounds[1] = new SoundNode(imports[1], 1, 'snvo', nodeX, nodeY[1]);
    sounds[2] = new SoundNode(imports[2], 1, 'snvo', nodeX, nodeY[2]);
    sounds[3] = new SoundNode(imports[3], 1, 'snvo', nodeX, nodeY[3]);
    sounds[4] = new SoundNode(imports[4], 1, 'snvo', nodeX, nodeY[4]);
  
    sounds[0].active = true;
    sounds[0].sound_id.play();
}

function draw(){
  
    background(0);
    // background(50);
    stroke(255, 208, 79);
    strokeWeight(10);
    line(nodeX, 0, nodeX, height);
   
    sounds.forEach(sound => sound.display());
    sounds.forEach(sound => sound.play());
  
    



}

function windowResized() {
  cnv=resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
  for(let i = 0; i < sounds.length; i++){
    if(sounds[i].checkClick()){
      clicked = true;
      clickedItem = i;
    }else{
      clicked =false;
    }
  }
  if(clicked){
  sounds.forEach(sound => sound.stop());
  sounds[clickedItem].active = true;
  sounds[clickedItem].sound_id.play();
  clicked = false;
  clickedItem = -1;

  }
  
  
}
  
class SoundNode{
  constructor(sound_id, rel_pos, desc, x, y){
      this.sound_id = sound_id;
      this.rel_pos = rel_pos;
      this.height = 50;
      this.desc = desc;
      this.active = false;
      this.playing = false;
      this.x = x;
      this.y = y;
      this.d = 50;
      this.d2 = 100;
      this.color = color(255, 214, 108)
  }

  display(){
      if(!this.active){
          stroke(this.color, 100);
          strokeWeight(5);
          fill(this.color, 100);
          circle(this.x, this.y, this.d);
          noFill();
          circle(this.x, this.y, this.d2);
      }else{
          stroke(this.color);
          strokeWeight(5);
          fill(this.color);
          circle(this.x, this.y, this.d2);
      }
  }

  checkClick(){
      let d = dist(this.x, this.y, mouseX, mouseY);
          if(d <= this.d2){
              return true;
          }
          else{
            return false;
          }
      
  }

  play(){
      if(this.active){
          let m = map(mouseX, this.x, width, 0, this.sound_id.duration())
          let pos = map(this.sound_id.currentTime(), 0, this.sound_id.duration(), this.x, width)
          strokeWeight(5);
          stroke(200);
          line(this.x, this.y, width, this.y);
          stroke(255);
          line(this.x, this.y, pos, this.y);

          if(mouseX < width && mouseX > this.x && mouseY < this.y + 20 && mouseY > this.y - 20){
              circle(mouseX, this.y, 20);
              if(mouseIsPressed){
                  this.sound_id.jump(m, this.sound_id.duration)
              }
          }
          
      }
  }

  //for switch
  stop(){
    this.active = false
    this.sound_id.stop();
  }




}