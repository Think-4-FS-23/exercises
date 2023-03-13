let particles = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  particles.push(new Particle(400, 600, 10));

  background(255);
}

function draw() {

  for (let i = 0; i < particles.length; i++) {
    if (particles.length < 700) {
      particles[i].update();
    }
    particles[i].show();
  }
}

class Particle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy();
    this.vel = createVector(0, -3);
    this.r = r;
    this.age = 0;
    this.divisions = 0;
    this.steps = 50;
  }

  show() {
    noFill();
    stroke(0);
    strokeWeight(this.r);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }

  update() {
    this.vel.rotate(random(-2, 2));
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.age++;
    this.r = map(this.age, 0, 200, 20, 1);
    this.r = constrain(this.r, 1, 20);

    if (this.age % this.steps == 0 && particles.length < 5000) {
      if (this.divisions < 1) {
        this.divide();
      } else if (random(0, 1) < 0.5) {
        this.divide();
      }
    }
  }

  divide() {
    console.log("divide");
    let p = new Particle(this.pos.x, this.pos.y, this.r);
    p.vel = this.vel.copy();
    p.vel.rotate(-20);
    this.vel.rotate(20);
    p.age = this.age;

    this.divisions++;

    if (this.divisions == 1) {
      this.steps = 40;
    }
    if (this.divisions == 2) {
      this.steps = 30;
    }
    if (this.divisions == 3) {
      this.steps = 20;
    } else {
      this.steps = 10;
    }
    p.divisions = this.divisions;
    p.steps = this.steps;

    particles.push(p);
  }
}
