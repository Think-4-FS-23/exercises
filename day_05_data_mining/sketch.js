let projection = d3
  .geoMercator()
  .center([8.23, 46.8])
  .scale(10000)
  .translate([1000 / 2, 600 / 2]);

let trees = [];

let minAge = 0;
let maxAge = 0;
let medianAge = 0;
let meanAge = 0;
let anzahlGemeinden = 0;

function setup() {
  createCanvas(1000, 600);

  d3.csv("trees_9804.csv", d3.autoType).then((csv, error) => {
    trees = csv;

    trees = trees.map(function (d) {
      return {
        lat: d.lat,
        lon: d.lon,
        kategorie: d.kategorie,
        wald: d.wald,
        kanton: d.kanton,
        gemeinde: d.gemeinde,
        alter: d.alter,
      };
    });

    trees = trees.filter(function (d) {
      return d.kategorie == "Nadelbaum";
    });

    trees = trees.sort(function (a, b) {
      return b.alter - a.alter;
    });

    console.log(trees);

    minAge = d3.min(trees, function (d) {
      return d.alter;
    });

    maxAge = d3.max(trees, function (d) {
      return d.alter;
    });

    medianAge = d3.median(trees, function (d) {
      return d.alter;
    });

    meanAge = d3.mean(trees, function (d) {
      return d.alter;
    });

    let gemeinden = trees.map(function (d) {
      return d.gemeinde;
    });
    gemeinden = _.uniq(gemeinden);
    anzahlGemeinden = gemeinden.length;

    // save the filtered data to csv
    let csvString = d3.csvFormat(trees);
    console.log(csvString);
    save([csvString], "trees_9804_filtered.csv");

    // save the filtered data to json
    let json = {
      trees: trees,
    };
    saveJSON(json, "trees_9804_filtered.json");

    redraw();
  });

  noLoop();
}

function draw() {
  background(220);

  // draw trees
  for (let i = 0; i < trees.length; i++) {
    let tree = trees[i];
    let pos = projection([tree.lon, tree.lat]);
    fill(0);
    noStroke();

    if (tree.kategorie == "Nadelbaum") {
      fill(0, 0, 255);
    } else if (tree.kategorie == "Laubbaum") {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }

    if (tree.kanton == "LU") {
      fill(255, 0, 0);
    }

    ellipse(pos[0], pos[1], 3, 3);
  }
  fill(0);
  noStroke();
  textSize(20);
  text("Min age: " + minAge, 10, 30);
  text("Max age: " + maxAge, 10, 60);
  text("Anzahl Gemeinden: " + anzahlGemeinden, 10, 90);
  text("Median age: " + medianAge, 10, 120);
  text("Mean age: " + meanAge, 10, 150);
}

function keyTyped() {
  // pan and zoom
  if (key === "a") {
    projection.translate([
      projection.translate()[0] - 10,
      projection.translate()[1],
    ]);
  }
  if (key === "d") {
    projection.translate([
      projection.translate()[0] + 10,
      projection.translate()[1],
    ]);
  }
  if (key === "w") {
    projection.translate([
      projection.translate()[0],
      projection.translate()[1] - 10,
    ]);
  }
  if (key === "s") {
    projection.translate([
      projection.translate()[0],
      projection.translate()[1] + 10,
    ]);
  }
  if (key === "q") {
    projection.scale(projection.scale() * 1.1);
  }
  if (key === "e") {
    projection.scale(projection.scale() * 0.9);
  }
  redraw();
}
