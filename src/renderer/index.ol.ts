// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
import * as DatGui from 'dat.gui';

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

interface SlidableValues {
  default: number;
  max: number;
  min: number;
}

interface GraphParams<type> {
  yOffset: type;
  lambda: type;
  amplitude: type;
  shift: type;
}

const wave: GraphParams<SlidableValues> = {
  yOffset: {
    default: canvasHeight / 2,
    max: canvasHeight,
    min: 0
  },
  lambda: {
    default: 0.01,
    max: 0.5,
    min: -0.5
  },
  amplitude: {
    default: 100,
    max: 300,
    min: -300
  },
  shift: {
    default: -0.01,
    max: 0.1,
    min: -0.1
  }
};

const manipulable: GraphParams<number> = {
  yOffset: canvasHeight / 2,
  lambda: 0.01,
  amplitude: 100,
  shift: -0.01
};

for (let key of Object.keys(wave)) {
  // Extract from slidable values map
  let properties: SlidableValues =
    wave[key as keyof GraphParams<SlidableValues>];
  // Manipulate the value
  Sliders.add(manipulable, key, properties.min, properties.max);
}

interface Coordinates {
  x: number;
  y: number;
}

function getSineCoordinates(
  iteration: number,
  xLimit: number,
  yOffset: number,
  frequency: number,
  increment: number,
  amplitude: number
): Coordinates | null {
  if (iteration >= xLimit) return null;
  return {
    x: iteration,
    y: yOffset + Math.sin(iteration * frequency + increment) * amplitude
  };
}

function getTanCoordinates(
  iteration: number,
  xLimit: number,
  yOffset: number,
  frequency: number,
  increment: number,
  amplitude: number
): Coordinates | null {
  if (iteration >= xLimit) return null;
  return {
    x: iteration,
    y: yOffset + Math.tan(iteration * frequency + increment) * amplitude
  };
}

let increment: number = manipulable.shift;

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.beginPath();
  // We start always from the middle
  context.moveTo(0, canvasHeight / 2);
  // We create a series of small lines that would create points
  for (let i = 0; i < canvasWidth; i += 1) {
    let coordinates: Coordinates | null = getTanCoordinates(
      i,
      canvasWidth,
      manipulable.yOffset,
      manipulable.lambda,
      increment,
      manipulable.amplitude
    );
    if (!coordinates) break;
    context.lineTo(coordinates.x, coordinates.y);
  }
  increment += manipulable.shift;
  context.stroke();
}

animate();
