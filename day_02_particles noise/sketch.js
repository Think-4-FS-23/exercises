var agents = [];
let n = 1000;
function setup() {
  createCanvas(800, 600);
  for (var i = 0; i < n; i++) {
    agents[i] = new Agent();
  }
  angleMode(DEGREES)
  background(255);
}

function draw() {
  background(255,5)

  // Draw agents
  stroke(0);
  for (var i = 0; i < n; i++) {
    agents[i].update();
    agents[i].display();
  }
}

class Agent {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.posOld = this.pos.copy();

    this.vel = createVector(2, 0);

    this.angle = 0;
  }

  update() {
    let isOutside =
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height;
    if (isOutside) {
      this.pos.set(random(width), random(height));
      this.posOld = this.pos.copy();
      this.angle = 0;
    }
    let sc = 0.01;
    let noiseValue = noise(this.pos.x * sc, this.pos.y * sc);
    this.angle = map(noiseValue, 0, 1, 0, 365);
    this.vel.setHeading(this.angle);
    this.posOld = this.pos.copy();
    this.pos.add(this.vel);
  }

  display() {
    stroke(0);
    line(this.posOld.x, this.posOld.y, this.pos.x, this.pos.y);
  }
}
