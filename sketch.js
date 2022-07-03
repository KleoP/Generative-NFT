// variable declarations outside of setup(), draw(), and functions()
const DPI = 300; // resolution of printable image
const palmDPF = 50; // dots per foot of tree, 1 inch = 6 feet

const sheetWidth1Inches = 11.5; // standard herbarium sheet, vertical sheet
const sheetHeight1Inches = 16.5;
const sheetWidth2Inches = 16.5; // horizontal sheet
const sheetHeight2Inches = 11.5;
var sheetWidthInches, sheetHeightInches; // variables for printing sizes

const sheetWidth1 = sheetWidth1Inches * DPI;
const sheetHeight1 = sheetHeight1Inches * DPI;
const sheetWidth2 = sheetWidth2Inches * DPI;
const sheetHeight2 = sheetHeight2Inches * DPI;
var sheetWidth, sheetHeight; // working variables

const labelWidth1Inches = 2.75; // rectangular label
const labelHeight11nches = 4.75;
const labelWidth2Inches = 4.0; // square label
const labelHeight2Inches = 4.0;
var labelWidthInches, labelHeightInches;

const labelWidth1 = labelWidth1Inches * DPI;
const labelHeight1 = labelHeight11nches * DPI;
const labelWidth2 = labelHeight2Inches * DPI;
const labelHeight2 = labelHeight2Inches * DPI;
var labelWidth, labelHeight;

let timeOfDay, timeOfSea, timeOfland, skyColor, seaColor, landColor;
// random variables
let rProbability, rNumber, rW, rH, rColor;

let sketchTreeTopX, sketchTreeTopY, sketchTreeTrunkX, sketchTreeTrunkY, sketchOrbX, sketchOrbY;

let vertical = "vertical";
let moon = false;

let img_001;

function preload() {
  img_001 = loadImage("img_001.png");
}

function setup() {
  rProbability = int(random(0, 100));
  console.log("rProbability", rProbability);
if (rProbability > 25 ) {
  rSheetWidth = sheetWidth1;
  rSheetHeight = sheetHeight1;
} else if (rProbability <= 25) {
  rSheetWidth = sheetWidth2;
  rSheetHeight = sheetHeight2;
}
  createCanvas(rSheetWidth, rSheetHeight);
  noLoop();
}

function draw() {
  rColor = random(acidFreePaper);
  background(rColor);
 
  rProbability = int(random(0, 100)); // day, dusk, or night sky
  if (rProbability > 33) {
    timeOfDay = "day";
    skyColor = random(daySky);
  } else if (rProbability > 20) {
    timeOfDay = "dusk";
    skyColor = random(duskSky);
  } else {
    timeOfDay = "night";
    skyColor = random(nightSky);
  }
  
  if (rSheetWidth > rSheetHeight) {
    vertical = "horizonal";
  }
  console.log("Herbarium Sheet", width / DPI, height / DPI, vertical, timeOfDay);
  
  if ("timeOfDay" == "day") { // day, dusk, or night sea and land
    timeOfSea = "day";
    timeOfLand = "day"
    seaColor = random(daySea);
    landColor = random(dayLand);
  } else if ("timeOfDay" == "night") {
      timeOfSea = "night";
      timeOfLand = "day";
      seaColor = random(nightSea);
      landColor = random(nightLand);
    } else {
        rProbability = int(random(0, 100)); // at dusk, sea is day, or night
        if (rProbability > 25) {
          timeOfSea = "night";
          timeOfLand = "dusk"
          seaColor = random(nightSea);
          landColor = random(duskLand);
        } else {
          timeOfSea = "day";
          timeOfLand = "dusk";
          seaColor = random(daySea);
          landColor = random(duskLand);
        }
  }
  fill(skyColor);
  rect(palmDPF, palmDPF, width - 100, height - 100); // 100 = border
  fill(seaColor);
  rect(palmDPF, height * (2 / 3), width - 100, height - palmDPF - (height * (2/3)));
  fill(landColor);
  rect(palmDPF, height * (5 / 6), width - 100, height - palmDPF - (height * (5 / 6)));
  
  rNumber = random((width * (1 / 4)), (width * (3 / 4)));
  sketchTreeTopX = rNumber;
  sketchTreeTrunkX = sketchTreeTopX;
  rNumber = random(0, (height * (1 / 3)))
  sketchTreeTopY = rNumber;
  sketchTreeTrunkY = sketchTreeTopY;
  rColor = random(duskLand);
  fill(rColor);
  rect(sketchTreeTrunkX, sketchTreeTrunkY, width / 20, height * (7 / 8));
  rColor = random(leafGreens);
  fill(rColor);
  ellipse(sketchTreeTopX, sketchTreeTopY, width / 3, height / 5);
  
  // orb
  sketchOrbX = width / 6;
  sketchOrbY = width / 6;
  if (sketchTreeTopX < width / 2) {
    sketchOrbX = width - sketchOrbX;
    sketchOrbY = sketchOrbY;
  }
  rProbability = random(0, 100);
  if (timeOfDay == "day" || (timeOfDay == "dusk" && rProbability < 25)) {
    rColor = random(dayOrb);
  } else {
    rColor = random(nightOrb);
    moon = true;
  }
  fill(rColor);
  noStroke();
  if (moon) {
    fill(80, 0, 0, 100);
    image(img_001, sketchOrbX - (sheetWidth1 / 10), sketchOrbY - (sheetWidth1 / 10), sheetWidth1 / 5, sheetWidth1 / 5);
  }
  ellipse(sketchOrbX, sketchOrbY, sheetWidth1 / 5);
  console.log("moon?", moon);
}
 