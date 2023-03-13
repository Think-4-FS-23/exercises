let data = [];
let selectedData = [];

let treeId = 41172;
let currentYear = 0;

function setup() {
  createCanvas(800, 800);

  d3.csv("treerings.csv",d3.autoType).then(function(csv){
    data = csv;
    selectedData = csv.filter(function(d){
      return d.id==treeId;
    })

    currentYear = d3.min(selectedData, function(d){
      return d.year;
    });

    console.log(data);
  })

  frameRate(10);
}

function draw() {
  background(255);
  // farben für den Verlauf
  let from = color(131, 67, 51);
  let to = color(234, 221, 202);

  r = 0;
  for (var i = 0; i < selectedData.length; i++) {
    if(selectedData[i].year < currentYear){
    // füllfarbe in abhängigkeit der dicke
    let c = lerpColor(from, to, map(selectedData[i].ring, 0, 200, 0, 1));

    noFill();
    stroke(c);
    strokeWeight(selectedData[i].ring*0.02);
    ellipse(width/2, height/2, 2*r*0.02);
    r += selectedData[i].ring;
    }
  }
  // draw treeId and age
  fill(0);
  noStroke();

  textSize(20);
  text("Tree ID: " + treeId, 20, 30);
  text("Age: " + calcAge(selectedData), 20, 60);
  text("Current Year: " + currentYear, 20, 90);

  currentYear++;
}

function calcAge(treeData){
  let minYear = d3.min(treeData, function(d){
    return d.year;
  });
  let maxYear = d3.max(treeData, function(d){
    return d.year;
  });
  return maxYear - minYear;

}