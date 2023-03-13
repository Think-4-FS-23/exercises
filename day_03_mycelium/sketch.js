let particles = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  for(let i = 0; i < 100; i++){
    particles.push(new Particle(width/2, height/2));
  }

  frameRate(12);
  background(0);
}

function draw() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.vel.rotate(random(0, 360));
  }

  show() {
    fill(255,50);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 1);
  }

  update() {
    this.vel.rotate(random(-4, 4));
    this.pos.add(this.vel);

    let probability = 0.05;
    if (random(0, 1) < probability && particles.length < 5000) {
      console.log("new particle", particles.length);
      let p = new Particle(this.pos.x, this.pos.y);
      p.vel = this.vel.copy();
      p.vel.rotate(random(-30, 30));
      particles.push(p);
    }
  }
}
