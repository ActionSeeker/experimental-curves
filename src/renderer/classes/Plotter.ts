import Plotter from '../interfaces/plotter';
import * as DatGui from 'dat.gui';

export default class GraphPlotter implements Plotter {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  cartesianSlider: DatGui.GUI;
  polarSlider: DatGui.GUI;

  constructor(
    canvas: HTMLCanvasElement,
    cartesianSlider: DatGui.GUI,
    polarSlider: DatGui.GUI
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.cartesianSlider = cartesianSlider;
    this.polarSlider = polarSlider;
  }

  plotAndAnimate() {}
}
