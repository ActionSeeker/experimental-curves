interface SlidableValues {
  default: number;
  max: number;
  min: number;
}

export default interface PolarSlidables<type> {
  yOffset: type;
  xOffset: type;
  angle: type;
  amplitude: type;
  rotation: type;
}

export default interface CartesianSlidables<type> {
  yOffset: type;
  lambda: type;
  amplitude: type;
  shift: type;
}
