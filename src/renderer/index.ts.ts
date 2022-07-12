// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
import * as DatGui from 'dat.gui';

import Plotter from './interfaces/plotter';

const canvas = <HTMLCanvasElement>document.getElementById('plot-area');
const context: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
  canvas.getContext('2d')
);

// Assign canvas height and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth: number = canvas.width;
const canvasHeight: number = canvas.height;

const Sliders: DatGui.GUI = new DatGui.GUI();

const wave: GraphParams<SlidableValues> = {
  yOffset: {
    default: canvasHeight / 2,
    max: canvasHeight,
    min: 0
  },
  xOffset: {
    default: canvasWidth / 2,
    max: canvasWidth,
    min: 0
  },
  angle: {
    default: 360,
    max: 360 * 20,
    min: 0
  },
  amplitude: {
    default: 10,
    max: canvasWidth / 2,
    min: -canvasWidth / 2
  },
  rotation: {
    default: 1.8,
    max: 3.6,
    min: -3.6
  }
};

const manipulable: GraphParams<number> = {
  yOffset: canvasHeight / 2,
  xOffset: canvasWidth / 2,
  angle: 360,
  amplitude: -3,
  rotation: 1.8
};

const curveFolder: DatGui.GUI = Sliders.addFolder('Curves');
for (let key of Object.keys(wave)) {
  // Extract from slidable values map
  let properties: SlidableValues =
    wave[key as keyof GraphParams<SlidableValues>];
  // Manipulate the value
  curveFolder.add(manipulable, key, properties.min, properties.max);
}
curveFolder.open();

const colours = {
  h: 100,
  s: 50,
  l: 50
};

const hueFolder: DatGui.GUI = Sliders.addFolder('Colours');
hueFolder.add(colours, 'h', 0, 359);
hueFolder.add(colours, 's', 0, 100);
hueFolder.add(colours, 'l', 0, 100);
hueFolder.open();

interface Coordinates {
  x: number;
  y: number;
}

interface PolarCoordinates {
  r: number;
  t: number;
}

// function polarPlotter(degree: number): PolarCoordinates {
//   const angle = (Math.PI * degree) / 180;
//   return {
//     r: spirals(angle),
//     t: angle
//   };
// }

function multiplePolarPlotter(degree: number): PolarCoordinates[] {
  const angle = (Math.PI * degree) / 180;
  const roots: number[] = funnyAmoebas(angle);
  const points: PolarCoordinates[] = [];
  roots.forEach((root) => {
    if (!isNaN(root))
      points.push({
        r: root,
        t: angle
      });
    else {
      points.push({
        r: 0,
        t: 0
      });
    }
  });
  return points;
}

function weirdButterfly(angle: number): number[] {
  return [1 - Math.cos(angle) * Math.sin(3 * angle)];
}

function spirals(angle: number): number[] {
  return [angle];
}

function flowers(angle: number): number[] {
  return [Math.cos(5 * angle) * Math.sin(5 * angle)];
}

function weirdCurves(angle: number): number[] {
  let factor: number = 5;
  let adjustor: number = 10;
  let B: number = -2 * factor * (Math.sin(angle) + Math.cos(angle)) * adjustor;
  let C: number = 10 * factor - Math.asin(Math.tan(angle)) * adjustor;
  return [
    (-1 * B + Math.sqrt(B * B - 4 * C)) / 2,
    (-1 * B - Math.sqrt(B * B - 4 * C)) / 2
  ];
}

function polarToRectCoordinates(polar: PolarCoordinates): Coordinates {
  return {
    x: polar.r * Math.cos(polar.t),
    y: polar.r * Math.sin(polar.t)
  };
}

function amoebas(angle: number): number[] {
  return [Math.cos(Math.cos(3 * angle))];
}

function funnyAmoebas(angle: number): number[] {
  // return [Math.tan(3 * Math.atan(3 * angle)) + Math.cos(Math.tan(3 * angle))];
  // return [Math.cos(angle) * Math.cos(angle)];
  // return [10 + Math.cos(3 * angle) + Math.sin(3 * angle) * Math.sin(3 * angle)];
  // return [Math.sin(3 * angle) / (3 * angle)];
  // return [Math.tan(3 * angle)];
  // return [10 + Math.tan(Math.sqrt((2 * angle) / 15))];
  // return [Math.expm1(angle)];
  return [Math.tan(Math.sqrt(angle))];
}

function rings(angle: number): number[] {
  return [3 * Math.sin(1.25 * angle)];
}

let increment = manipulable.rotation;
let hue = colours.h;

function animate() {
  requestAnimationFrame(animate);
  // context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = '#111111';
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.beginPath();
  // We start always from the middle
  context.moveTo(canvasWidth / 2, canvasHeight / 2);
  // We create a series of small lines that would create points
  for (let i = 0; i <= manipulable.angle; i += 1) {
    // let polarcoors: PolarCoordinates = polarPlotter(i + increment);
    // let coordinates: Coordinates = polarToRectCoordinates(polarcoors);
    // context.lineTo(
    //   canvasWidth / 2 + coordinates.x * manipulable.amplitude,
    //   canvasHeight / 2 + coordinates.y * manipulable.amplitude
    // );
    let polarcoors: PolarCoordinates[] = multiplePolarPlotter(i + increment);
    let coordinates: Coordinates[] = [];
    polarcoors.forEach((p) => coordinates.push(polarToRectCoordinates(p)));
    coordinates.forEach((c) => {
      context.lineTo(
        manipulable.xOffset + c.x * manipulable.amplitude,
        manipulable.yOffset + c.y * manipulable.amplitude
      );
    });
  }
  increment += manipulable.rotation;
  hue = (hue + 1) % 359;
  context.strokeStyle = `hsl(${hue}, ${colours.s}%, ${colours.l}%)`;
  context.stroke();
}

animate();
