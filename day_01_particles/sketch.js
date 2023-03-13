let particles = [];
let n = 10;
let drawBackground = true;

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < n; i++) {
    particles[i] = new Particle(random(width), random(height));
  }

  angleMode(DEGREES);
}

function draw() {

  if (drawBackground) {
    background(255);
  }
  else {
    background(255, 255, 255, 20);
  }

  for (let i = 0; i < n; i++) {
    particles[i].update();
    particles[i].display();
  }


  ellipse(mouseX, mouseY, 10, 10);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0.01, 0.01);
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag();

    if (d > 10) {
      dir.normalize();
      //  dir.div(d);
      dir.mult(0.1)
      this.acc = dir;
    }

    else {
      this.acc.set(0, 0)
    }

    this.vel.add(this.acc);
    this.vel.limit(5)
    this.pos.add(this.vel);

    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  display() {

   // rect(this.pos.x, this.pos.y, 30, 2);
    let hdg = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(hdg);
    fill(0);
    rect(0, 0, 30, 2);
    pop();
  }
}


function mouseClicked() {
  drawBackground = !drawBackground;
  backround(200);
}


