let windDirection = 360;
let windSpeed = 10;
let temperature = 303.15;
let stationName = "noname";

let colScale = d3
  .scaleLinear()
  .domain([-30, 0, 30])
  .range(["#0000ff", "#eeeeee", "#ff0000"]);

let lat = 47.09010078625099;
let lon = 8.273282944033701;
let apiKey = "b88ccf3688856fa3485d202fe21d4327";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

function preload() {
  weatherData = loadJSON(apiUrl);
}

function setup() {
  createCanvas(800, 600);
  console.log(weatherData);

  stationName = weatherData.name;
  windDirection = weatherData.wind.deg;
  windSpeed = weatherData.wind.speed;
  temperature = weatherData.main.temp;

  temperature = 30;

  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(250);

  let center = createVector(width / 2, height / 2);
  let windVectorLength = map(windSpeed, 0, 20, 30, 400);
  let windVector = createVector(windVectorLength, 0);
  windVector.setHeading(windDirection - 90);

  fill(0);
  let n = 6;
  let theta = 360 / n;

  let col = colScale(temperature);
  fill(col);
  stroke(0);
  let v = windVector.copy();


  for (let i = 0; i < n; i++) {
    let v1 = v.copy();
    let v2 = v.copy();
    v2.rotate(theta);

    if (i == 0) {
      v1.mult(1);
      v2.mult(0.8);
    } else if (i == 1) {
      v1.mult(0.8);
      v2.mult(0.6);
    } else if (i == 2) {
      v1.mult(0.6);
      v2.mult(0.4);
    } else if (i == 3) {
      v1.mult(0.4);
      v2.mult(0.6);
    } else if (i == 4) {
      v1.mult(0.6);
      v2.mult(0.8);
    } else if (i == 5) {
      v1.mult(0.8);
      v2.mult(1);
    } else {
      v1.mult(1);
      v2.mult(1);
    }

    let p1 = p5.Vector.add(center, v1);
    let p2 = p5.Vector.add(center, v2);

    let r = red(col);
    let g = green(col);
    let b = blue(col);
    let a = map(i, 0, n, 30, 255);
    fill(r, g, b, a);
    noStroke();
    triangle(center.x, center.y, p1.x, p1.y, p2.x, p2.y);

    v.rotate(theta);
  }

  noStroke();
  fill(0);
  textSize(20);
  text(stationName, 10, 20);
  text("Wind Speed:" + windSpeed + " m/s", 10, 40);
  text("Wind Direction:" + windDirection + "°", 10, 60);
  text("Temperature:" + temperature + "°C", 10, 80);
}