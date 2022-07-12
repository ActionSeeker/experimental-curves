/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 838:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
const DatGui = __importStar(__webpack_require__(344));
const canvas = document.getElementById('plot-area');
const context = (canvas.getContext('2d'));
// Assign canvas height and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const Sliders = new DatGui.GUI();
const wave = {
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
const manipulable = {
    yOffset: canvasHeight / 2,
    xOffset: canvasWidth / 2,
    angle: 360,
    amplitude: -3,
    rotation: 1.8
};
const curveFolder = Sliders.addFolder('Curves');
for (let key of Object.keys(wave)) {
    // Extract from slidable values map
    let properties = wave[key];
    // Manipulate the value
    curveFolder.add(manipulable, key, properties.min, properties.max);
}
curveFolder.open();
const colours = {
    h: 100,
    s: 50,
    l: 50
};
const hueFolder = Sliders.addFolder('Colours');
hueFolder.add(colours, 'h', 0, 359);
hueFolder.add(colours, 's', 0, 100);
hueFolder.add(colours, 'l', 0, 100);
hueFolder.open();
// function polarPlotter(degree: number): PolarCoordinates {
//   const angle = (Math.PI * degree) / 180;
//   return {
//     r: spirals(angle),
//     t: angle
//   };
// }
function multiplePolarPlotter(degree) {
    const angle = (Math.PI * degree) / 180;
    const roots = funnyAmoebas(angle);
    const points = [];
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
function weirdButterfly(angle) {
    return [1 - Math.cos(angle) * Math.sin(3 * angle)];
}
function spirals(angle) {
    return [angle];
}
function flowers(angle) {
    return [Math.cos(5 * angle) * Math.sin(5 * angle)];
}
function weirdCurves(angle) {
    let factor = 5;
    let adjustor = 10;
    let B = -2 * factor * (Math.sin(angle) + Math.cos(angle)) * adjustor;
    let C = 10 * factor - Math.asin(Math.tan(angle)) * adjustor;
    return [
        (-1 * B + Math.sqrt(B * B - 4 * C)) / 2,
        (-1 * B - Math.sqrt(B * B - 4 * C)) / 2
    ];
}
function polarToRectCoordinates(polar) {
    return {
        x: polar.r * Math.cos(polar.t),
        y: polar.r * Math.sin(polar.t)
    };
}
function amoebas(angle) {
    return [Math.cos(Math.cos(3 * angle))];
}
function funnyAmoebas(angle) {
    // return [Math.tan(3 * Math.atan(3 * angle)) + Math.cos(Math.tan(3 * angle))];
    // return [Math.cos(angle) * Math.cos(angle)];
    // return [10 + Math.cos(3 * angle) + Math.sin(3 * angle) * Math.sin(3 * angle)];
    // return [Math.sin(3 * angle) / (3 * angle)];
    // return [Math.tan(3 * angle)];
    return [10 + Math.tan(Math.sqrt((2 * angle) / 15))];
    // return [Math.expm1(angle)];
    // return [Math.tan(Math.sqrt(angle))];
}
function rings(angle) {
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
        let polarcoors = multiplePolarPlotter(i + increment);
        let coordinates = [];
        polarcoors.forEach((p) => coordinates.push(polarToRectCoordinates(p)));
        coordinates.forEach((c) => {
            context.lineTo(manipulable.xOffset + c.x * manipulable.amplitude, manipulable.yOffset + c.y * manipulable.amplitude);
        });
    }
    increment += manipulable.rotation;
    hue = (hue + 1) % 359;
    context.strokeStyle = `hsl(${hue}, ${colours.s}%, ${colours.l}%)`;
    context.stroke();
}
animate();


/***/ }),

/***/ 344:
/***/ ((module) => {

module.exports = require("dat.gui");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(838);
/******/ 	
/******/ })()
;