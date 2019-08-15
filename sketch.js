//Carier
var SliderCarrierAmplitude;
var SliderCarrierFrequency;
var SliderCarrierPhase;
var SliderCarrierBias;
var CarrierWaveText;
//Signal
var SliderSignalAmplitude;
var SliderSignalFrequency;
var SliderSignalPhase;
var SliderSignalBias;
var SignalWaveText;
//symbol
var SliderSymbolAmplitude;
var SliderSymbolPhase;
var SymbolText;
var SymbolCheckbox
//interaction
var touchMe = false;
/// config //
//
var upperGraphYScale = 100;//1->100
var upperGraphXScale = 1 / 100;//100->1
var upperGraphPadding = 1 / 40; // proportion of with to be left blank on both sides
//
var lowerRightGraphYScale = 150;//1->150
var lowerRightGraphXScale = 1 / 150;//150->1
var lowerRightGraphPadding = 1 / 40; // proportion of with to be left blank on both sides
//
var lowerLeftGraphYScale = 150;//1->150
var lowerLeftGraphXScale = 1 / 150;//150->1
var lowerLeftGraphPadding = 1 / 40; // proportion of with to be left blank on both sides

function setup() {
  let canvas = createCanvas(windowWidth - 300 - 12 - 12, windowHeight);
  canvas.parent('sketch-div');
  SliderCarrierAmplitude = document.getElementById('SliderCarrierAmplitude');
  SliderCarrierFrequency = document.getElementById('SliderCarrierFrequency');
  SliderCarrierPhase = document.getElementById('SliderCarrierPhase');
  SliderCarrierBias = document.getElementById('SliderCarrierBias');
  CarrierWaveText = document.getElementById('CarrierWave');
  SliderSignalAmplitude = document.getElementById('SliderSignalAmplitude');
  SliderSignalFrequency = document.getElementById('SliderSignalFrequency');
  SliderSignalPhase = document.getElementById('SliderSignalPhase');
  SliderSignalBias = document.getElementById('SliderSignalBias');
  SignalWaveText = document.getElementById('SignalWave');
  SliderSymbolAmplitude = document.getElementById('SliderSymbolAmplitude');
  SliderSymbolPhase = document.getElementById('SliderSymbolPhase');
  SymbolText = document.getElementById('SymbolText');
  SymbolCheckbox = document.getElementById('SymbolCheckbox');
}

function draw() {
  background(255);
  //update slider values
  var CarrierAmplitude = SliderCarrierAmplitude.value / 100, CarrierFreq = SliderCarrierFrequency.value / 50, CarrierPhase = SliderCarrierPhase.value / 100, CarrierBias = SliderCarrierBias.value / 10;
  var SignalAmplitude = SliderSignalAmplitude.value / 100, SignalFreq = SliderSignalFrequency.value / 200, SignalPhase = SliderSignalPhase.value / 100, SignalBias = SliderSignalBias.value / 10;
  var SymbolAmplitude = SliderSymbolAmplitude.value / 100, SymbolPhase = SliderSymbolPhase.value / 100;
  //display Carrier wave function 
  CarrierWaveText.innerHTML = ('Carrier wave <br> f(x)=' + CarrierAmplitude + '*sin(2π' + (CarrierFreq).toFixed(2) + '*x' + (CarrierPhase < 0 ? '-' : '+') + abs(CarrierPhase) + ')' + (CarrierBias < 0 ? '-' : '+') + abs(CarrierBias));
  SignalWaveText.innerHTML = ('Carrier wave <br> f(x)=sgn{' + SignalAmplitude + '*sin(2π' + (SignalFreq).toFixed(2) + '*x' + (SignalPhase < 0 ? '-' : '+') + abs(SignalPhase) + ')' + (SignalBias < 0 ? '-' : '+') + abs(SignalBias) + '}');
  SymbolText.innerHTML = "Symbol:<br> Amplitude = " + SymbolAmplitude + ", Phase = " + SymbolPhase;



  /* UPPER GRAPH */
  push();
  translate(width / 2, height / 4);

  // draw upper graph time-value-axis
  strokeWeight(2);
  stroke(0);
  // axes
  line(0, height / 4 - height * upperGraphPadding, 0, -height / 4 + height * upperGraphPadding);
  line(-width / 2 + width * upperGraphPadding, 0, width / 2 - width * upperGraphPadding, 0);
  line(5, -upperGraphYScale, -5, -upperGraphYScale);
  line(5, upperGraphYScale, -5, upperGraphYScale);
  line(1 / upperGraphXScale, -5, 1 / upperGraphXScale, 5);
  line(-1 / upperGraphXScale, -5, -1 / upperGraphXScale, 5);
  // upperGraph temp var
  var upperGraphMinX = (-width / 2) + width * upperGraphPadding;
  var upperGraphMaxX = (width / 2) - width * upperGraphPadding;
  // upper graph sine(x) function in grey for comparison
  strokeWeight(4);
  stroke(0, 50);
  noFill();
  beginShape()
  for (var x = upperGraphMinX; x < upperGraphMaxX; x++) {
    var output = sine(x * upperGraphXScale, CarrierAmplitude, CarrierFreq, CarrierPhase, CarrierBias);//o sinus¿?
    vertex(x, output * upperGraphYScale);
  }
  endShape();
  // upper graph modulated signal
  stroke(0);
  noFill();
  beginShape()
  for (var x = upperGraphMinX; x < upperGraphMaxX; x++) {
    if (x >= 0 && x * upperGraphXScale < 1 / (SignalFreq * 2) && SymbolCheckbox.checked) {//first signal symbol
      var output = sine(x * upperGraphXScale, SymbolAmplitude, CarrierFreq, SymbolPhase, CarrierBias) * square_(x * upperGraphXScale, SignalAmplitude, SignalFreq, SignalPhase, SignalBias);
      vertex(x, -output * upperGraphYScale);
    } else {
      var output = sine(x * upperGraphXScale, CarrierAmplitude, CarrierFreq, CarrierPhase, CarrierBias) * square_(x * upperGraphXScale, SignalAmplitude, SignalFreq, SignalPhase, SignalBias);
      vertex(x, -output * upperGraphYScale);
    }
  }
  endShape();
  // upper graph data blue signal (signal is a square wave, aka 101010...)
  stroke(0, 0, 200, 100);
  noFill();
  beginShape()
  for (var x = upperGraphMinX; x < upperGraphMaxX; x++) {
    var output = square_(x * upperGraphXScale, SignalAmplitude, SignalFreq, SignalPhase, SignalBias);
    vertex(x, -output * upperGraphYScale);
  }
  endShape();
  // labels
  textFont('Georgia');
  fill(0);
  stroke(255);
  textSize(20);
  // Y-scale
  textAlign(LEFT);
  text("1", 5, -upperGraphYScale);
  text("-1", 5, upperGraphYScale);
  // X-scale
  textAlign(CENTER);
  text("1", 1 / upperGraphXScale, -10);
  text("-1", -1 / upperGraphXScale, -10);
  pop();



  /* CONSTELATION DIAGRAM LEFT */
  push();
  translate(width / 4, height - height / 4);

  // draw lower Left graph time-value-axis
  strokeWeight(2);
  stroke(0);
  // axes
  line(0, height / 4 - height * lowerLeftGraphPadding, 0, -height / 4 + height * lowerLeftGraphPadding);
  line(-width / 4 + width * lowerLeftGraphPadding, 0, width / 4 - width * lowerLeftGraphPadding, 0);
  line(5, -lowerLeftGraphYScale, -5, -lowerLeftGraphYScale);
  line(5, lowerLeftGraphYScale, -5, lowerLeftGraphYScale);
  line(1 / lowerLeftGraphXScale, -5, 1 / lowerLeftGraphXScale, 5);
  line(-1 / lowerLeftGraphXScale, -5, -1 / lowerLeftGraphXScale, 5);
  // constelation
  stroke(255);
  fill(240, 0, 0, 50);
  var minX = -1 / lowerLeftGraphXScale;
  var maxX = 1 / lowerLeftGraphXScale;
  var n_QAM = 16;
  var displacement_QAM = (maxX - minX) / sqrt(n_QAM) / 2;
  for (let x = minX; x < maxX; x += displacement_QAM * 2) {
    for (let y = minX; y < maxX; y += displacement_QAM * 2) {
      ellipse(x + displacement_QAM, y + displacement_QAM, 30, 30);
    }
  }
  // red dot
  stroke(255);
  // if mouse gets near constelation diagram, change stroke to blue
  var cw = 2 * width / 4 + width * lowerLeftGraphPadding;
  var ch = 2 * height / 4 - height * lowerLeftGraphPadding;
  if (mouseX - width / 4 > - cw / 2 &&
    mouseX - width / 4 < + cw / 2 &&
    mouseY - (height - height / 4) > - ch / 2 &&
    mouseY - (height - height / 4) < + ch / 2) {
    stroke(0, 0, 255);//blue
  }
  fill(240, 0, 0);
  var angleConstelation = SymbolPhase + Math.PI / 2;
  var radiusConstelation = SymbolAmplitude;
  var xConstelation = radiusConstelation * sin(angleConstelation);
  var yConstelation = radiusConstelation * cos(angleConstelation);
  var dotX = xConstelation / lowerLeftGraphXScale;
  var dotY = yConstelation * lowerLeftGraphYScale;
  var dw = 10;//dot width
  var dh = 10;
  var x = (mouseX - width / 4);
  var y = (mouseY - (height - (height / 4)));
  //if mouse on top of the red dot
  if (mouseX - width / 4 - dotX > - dw * 2 &&
    mouseX - width / 4 - dotX < + dw * 2 &&
    mouseY - (height - height / 4) - dotY > - dh * 2 &&
    mouseY - (height - height / 4) - dotY < + dh * 2) {
    stroke(0, 255, 0);//green
    if (mouseIsPressed) {
      touchMe = true;
      SliderSymbolAmplitude.value = sqrt(sq(x * lowerRightGraphXScale) + sq(y / lowerRightGraphYScale)) * 100;
      if (x < 0) {
        SliderSymbolPhase.value = 100 * (atan2(x * lowerRightGraphXScale, y / lowerRightGraphYScale) + 2 * Math.PI - Math.PI / 2);
      } else {
        SliderSymbolPhase.value = 100 * (atan2(x * lowerRightGraphXScale, y / lowerRightGraphYScale) - Math.PI / 2);
      }
      SliderSymbolPhase.value = 100 * (atan2(x * lowerRightGraphXScale, y / lowerRightGraphYScale) - Math.PI / 2);
      SymbolAmplitude = SliderSymbolAmplitude.value / 100;
      SymbolPhase = SliderSymbolPhase.value / 100;
      angleConstelation = SymbolPhase + Math.PI / 2;
      radiusConstelation = SymbolAmplitude;
      xConstelation = radiusConstelation * sin(angleConstelation);
      yConstelation = radiusConstelation * cos(angleConstelation);
      dotX = xConstelation / lowerRightGraphXScale;
      dotY = yConstelation * lowerRightGraphYScale;
      dw = 15;//dot width
      dh = 15;
    }
  }
  ellipse(dotX, dotY, dw, dh);
  textAlign(CENTER);
  if (!touchMe) {
    fill(0);
    stroke(255);
    text("Drag me!", dotX, dotY - dh);
  }
  //text(atan2(x * lowerRightGraphXScale, y / lowerRightGraphYScale), dotX, dotY - dh);//debug angle
  // labels
  textFont('Georgia');
  fill(0);
  stroke(255);
  textSize(20)
  // Y-scale
  textAlign(LEFT);
  text("Q", 5, -lowerLeftGraphYScale);
  text("-Q", 5, lowerLeftGraphYScale);
  // X-scale
  textAlign(CENTER);
  text("I", 1 / lowerLeftGraphXScale, -10);
  text("-I", -1 / lowerLeftGraphXScale, -10);
  textAlign(CENTER);
  text("Constellation diagram " + n_QAM + "-QAM", 0, -height / 4);
  pop();



  /* CONSTELATION DIAGRAM RIGHT */
  push();
  translate(width - width / 4, height - height / 4);

  // draw lowerRight graph time-value-axis
  strokeWeight(2);
  stroke(0);
  // axes
  line(0, height / 4 - height * lowerRightGraphPadding, 0, -height / 4 + height * lowerRightGraphPadding);
  line(-width / 4 + width * lowerRightGraphPadding, 0, width / 4 - width * lowerRightGraphPadding, 0);
  line(5, -lowerRightGraphYScale, -5, -lowerRightGraphYScale);
  line(5, lowerRightGraphYScale, -5, lowerRightGraphYScale);
  line(1 / lowerRightGraphXScale, -5, 1 / lowerRightGraphXScale, 5);
  line(-1 / lowerRightGraphXScale, -5, -1 / lowerRightGraphXScale, 5);

  //line and ark with amplitude and phase
  //ark (Phase) 
  stroke(150);
  strokeWeight(2);
  fill(255, 0);
  if (0 < SymbolAmplitude) {
    if (0 < SymbolPhase) {
      //"left" or up
      arc(0, 0, 1.1 * (radiusConstelation * lowerRightGraphYScale), 1.1 * (radiusConstelation * lowerRightGraphYScale), -angleConstelation - -Math.PI - Math.PI / 2, 0);
    } else {
      //"right" or down
      arc(0, 0, 1.1 * (radiusConstelation * lowerRightGraphYScale), 1.1 * (radiusConstelation * lowerRightGraphYScale), 0, -angleConstelation - -Math.PI - Math.PI / 2);
    }
  } else {
    if (0 < SymbolPhase) {
      //"right" or down
      arc(0, 0, 1.1 * (radiusConstelation * lowerRightGraphYScale), 1.1 * (radiusConstelation * lowerRightGraphYScale), -angleConstelation - Math.PI / 2, Math.PI);
    } else {
      //"left" or up
      arc(0, 0, 1.1 * (radiusConstelation * lowerRightGraphYScale), 1.1 * (radiusConstelation * lowerRightGraphYScale), Math.PI, -angleConstelation - Math.PI / 2);
    }
  }
  //line (Amplitude)
  stroke(150);
  line(0, 0, xConstelation / lowerRightGraphXScale, yConstelation * lowerRightGraphYScale);

  stroke(255);
  fill(0);
  textAlign(CENTER);
  textSize(15)
  text("A " + SymbolAmplitude, 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * sin(angleConstelation), 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * cos(angleConstelation));

  //TODO at phaseSlider = 0 visibility problem
  var phaseToCloseToAmplitudeOffset = inRange(SymbolPhase, -.3, .3) ? -30 : 0;
  if (0 <= SymbolAmplitude) {
    var shiftedAngle = angleConstelation - Math.PI / 2
    var AngleArk = (shiftedAngle - shiftedAngle / 2) + Math.PI / 2;//+ (SymbolPhase > 0 ? 0 : Math.PI);
    text("φ " + SymbolPhase, 1.1 * radiusConstelation * lowerRightGraphYScale / 2 * sin(AngleArk), 1.1 * radiusConstelation * lowerRightGraphYScale / 2 * cos(AngleArk) + phaseToCloseToAmplitudeOffset);
  } else {
    var shiftedAngle = angleConstelation - Math.PI / 2
    var AngleArk = (shiftedAngle - shiftedAngle / 2) + Math.PI / 2;
    text("φ " + SymbolPhase, 1.2 * radiusConstelation * lowerRightGraphYScale / 2 * sin(AngleArk), 1.2 * radiusConstelation * lowerRightGraphYScale / 2 * cos(AngleArk) + phaseToCloseToAmplitudeOffset);
  }
  // text("0 deg", 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * sin(0), 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * cos(0));
  // text("π/2 deg", 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * sin(Math.PI / 2), 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * cos(Math.PI / 2));
  // text("π deg", 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * sin(Math.PI), 1.5 * radiusConstelation * lowerRightGraphYScale / 2 * cos(Math.PI));
  // red dot
  fill(240, 0, 0);
  stroke(255);
  ellipse(xConstelation / lowerRightGraphXScale, yConstelation * lowerRightGraphYScale, 10, 10);

  // labels
  textFont('Georgia');
  fill(0);
  stroke(255);
  textSize(20)
  // Y-scale
  textAlign(LEFT);
  text("Q", 5, -lowerRightGraphYScale);
  text("-Q", 5, lowerRightGraphYScale);
  // X-scale
  textAlign(CENTER);
  text("I", 1 / lowerRightGraphXScale, -10);
  text("-I", -1 / lowerRightGraphXScale, -10);
  textAlign(CENTER);
  text("Constellation diagram", 0, -height / 4);
  pop();
}

function sine(x, amplitude = 1, freq = 1, phase = 0, bias = 0) {
  return (amplitude * sin(2 * Math.PI * freq * x + phase) + bias);
}

function square_(x, amplitude = 1, freq = 1, phase = 0, bias = 0) {
  var out = 1;
  if (sine(x, amplitude, freq, phase, 0) < 0) {
    out = -1
  }
  return out * amplitude + bias;
}
function inRange(value, min, max) {
  if (min < value && value < max) {
    return true;
  }
  return false
}

function windowResized() {
  resizeCanvas(windowWidth - 300 - 12 - 12, windowHeight);
}
