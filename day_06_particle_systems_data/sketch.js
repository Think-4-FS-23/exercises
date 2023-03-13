var projection = d3.geoMercator()
  .center([8.270510652512703,46.9906633008496])
  .scale(2880295)
  .translate([400,300]);

let systems = [];
let data = [];

function setup() {
  createCanvas(800, 600);

  angleMode(DEGREES);
  d3.csv("trees.csv",d3.autoType).then(function(csv){
    data = csv;
    console.log(data);

    let minO2 = d3.min(data, function(d){
      return d.o2;
    });
    let maxO2 = d3.max(data, function(d){
      return d.o2;
    });

    console.log('minO2: ' + minO2);
    console.log('maxO2: ' + maxO2);

    for(let i = 0; i < data.length; i++) {
      let x = projection([data[i].lon,data[i].lat])[0];
      let y = projection([data[i].lon,data[i].lat])[1];

      let r = random(0,255);
      let g = random(0,255);
      let b = random(0,255);

      let strength = map(data[i].o2, 0, maxO2, 0, 2);

      let ps = new ParticleSystem(x,y,r,g,b,strength);
      systems.push(ps);
    }
  })
}

function draw() {
  background(255);
  for(let i = 0; i < systems.length; i++) {
    systems[i].run();
  }
  fill(0);
  noStroke();
  text('center: ' + projection.center(), 10, 20);
  text('scale: ' + projection.scale(), 10, 40);
}

function keyTyped(){
  if(key === 'a'){
    projection.center([projection.center()[0]-0.001,projection.center()[1]]);
  } else if(key === 'd'){
    projection.center([projection.center()[0]+0.001,projection.center()[1]]);
  }
  if(key === 'w'){
    projection.center([projection.center()[0],projection.center()[1]+0.001]);
  }
  if(key === 's'){
    projection.center([projection.center()[0],projection.center()[1]-0.001]);
  }
  if(key === 'q'){
    projection.scale(projection.scale()*1.1);
  }
  if(key === 'e'){
    projection.scale(projection.scale()*0.9);
  }

  for(let i = 0; i < data.length; i++) {
    let x = projection([data[i].lon,data[i].lat])[0];
      let y = projection([data[i].lon,data[i].lat])[1];

      systems[i].setPosition(x,y);
  }
  // log the projection center and scale
  console.log('center: ' + projection.center());
  console.log('scale: ' + projection.scale());
}

class ParticleSystem {
  constructor(x,y,r,g,b,strength) {
    this.origin = createVector(x, y)
    this.particles = [];
    this.r =r;
    this.g = g;
    this.b = b;
    this.strength = strength;
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x,this.origin.y,this.r,this.g,this.b,this.strength));
  }

  run() {
    this.addParticle();
    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  setPosition(x,y){
    this.origin = createVector(x, y)
  }
}

class Particle{
  constructor(x,y,r,g,b,strength) {
    this.strength = strength;
    this.acceleration = createVector(0, 0);
    // this.velocity = createVector(random(-this.strength, this.strength), random(-this.strength, this.strength));
    this.velocity = createVector(1,0);
    this.velocity.setMag(random(0,this.strength));
    this.velocity.rotate(random(0,360));
    this.position = createVector(x,y);
    this.lifespan = 255;
    this.r = r;
    this.g = g;
    this.b = b;

    this.radius = random(3,12);
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 4;
  }

  display() {
    noStroke();
    fill(this.r,this.g,this.b, this.lifespan);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }

  isDead() {
    return this.lifespan < 0;
  }
}
