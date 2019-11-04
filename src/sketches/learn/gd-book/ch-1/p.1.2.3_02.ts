import p5 from "p5";
import { Swatch } from "../../../utils/swatch";
import chroma, { Color } from "chroma-js";

const canvasW = 420;
const canvasH = 420;

const colorCount = 20;

const rows = canvasH / 30;
const rowHeight = Math.floor(canvasH / rows);

// Generative Design P.1.2.3_02
function sketch(p: p5) {
  // random colors
  let palette = generatePalette(p, colorCount);

  // return between 5-40 cols per row
  const colFunc = () => Math.floor(p.random(5, 40));
  let layout = generateLayout(rows, colFunc);

  // the actual colors/w/h per row/col
  let swatchMatrix = generateSwatchMatrix(p, palette, layout);

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.colorMode("hsb");
  };

  p.draw = () => {
    // draw the matrix
    swatchMatrix.forEach((rowSwatches, row) => {
      const posY = rowHeight * row;
      let posX = 0;
      rowSwatches.forEach(swatch => {
        p.fill(swatch.color.hex());
        p.rect(posX, posY, swatch.width, swatch.height);
        posX += swatch.width;
      });
    });
  };

  // switch between color palettes, layouts, matrix
  p.keyReleased = () => {
    switch (p.key) {
      default:
        // regenerate all
        palette = generatePalette(p, colorCount);
        layout = generateLayout(rows, colFunc);
        swatchMatrix = generateSwatchMatrix(p, palette, layout);
    }
  };
}

function generatePalette(p: p5, colorCount: number): string[] {
  return chroma.scale([chroma.random(), chroma.random()]).colors(colorCount);
}

// returns the number of columns per row in a number matrix [[col1Count],[col2Count]...[colNCount]]
function generateLayout(rowFunc: number, colFunc: () => number): number[] {
  return new Array<number>(rowFunc).fill(0).map(colFunc);
}

function generateSwatchMatrix(p: p5, colorPalette: string[], layout: number[]): Swatch[][] {
  const matrix = new Array<Array<Swatch>>(layout.length);

  for (let y = 0; y < rows; y++) {
    let cols = layout[y];
    let colsArray = new Array<Swatch>(cols);
    let rowRemaining = canvasW;
    for (let x = 0; x < cols; x++) {
      // colWidth should be rest of row if it is the last col
      const colWidth = x === cols - 1 ? rowRemaining : Math.ceil(p.random(5, rowRemaining / 2)); //Math.ceil(canvasW / cols);
      rowRemaining -= colWidth;
      // set col swatch
      colsArray[x] = new Swatch({
        color: chroma(colorPalette[Math.floor(p.random(0, colorPalette.length - 1))]),
        height: rowHeight,
        width: colWidth,
      });
    }
    // shuffle cols
    colsArray = colsArray.sort((a, b) => {
      const rand = p.random(-1, 1);
      if (rand > 0) return 1;
      if (rand < 0) return -1;
      return 0;
    });
    // put row into matrix
    matrix[y] = colsArray;
  }
  return matrix;
}

new p5(sketch);
