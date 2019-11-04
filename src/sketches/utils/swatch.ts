import chroma from "chroma-js";

export interface SwatchProps {
  width: number;
  height: number;
  color: chroma.Color;
}

export class Swatch {
  readonly width: number;
  readonly height: number;
  readonly color: chroma.Color;

  constructor(props: SwatchProps) {
    const { width, height, color } = props;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}
