import * as DatGui from 'dat.gui';

export default interface Plotter {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  cartesianSlider: DatGui.GUI;
  polarSlider: DatGui.GUI;
  plotAndAnimate(): void;
}
