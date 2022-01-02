import p5, { Vector } from "p5";
// https://genuary.art/prompts#jan1

interface Point {
  alpha: number;
}

function draw9x9(p: p5, strokeWeight: number) {
  // build points
  const rows = [];
  for (let i = 0; i < 9; i++) {
    const nextRow: Point[] = new Array(9);
    nextRow[0] = nextRow[8] = { alpha: p.random([0, 1]) };
    nextRow[1] = nextRow[7] = { alpha: p.random([0, 1]) };
    nextRow[2] = nextRow[6] = { alpha: p.random([0, 1]) };
    nextRow[3] = nextRow[5] = { alpha: p.random([0, 1]) };
    nextRow[4] = { alpha: p.random([0, 1]) };
    rows.push(nextRow);
  }

  // paint points
  const hue = p.random(200, 300);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const pixel = row[j];

      p.strokeWeight(1);
      p.stroke(hue, 100, 100, pixel.alpha);
      p.strokeCap(p.SQUARE);
      p.fill(hue, 100, 100, pixel.alpha == 0 ? 0 : 0.8);
      p.rect(j * strokeWeight, i * strokeWeight, strokeWeight, strokeWeight);
    }
  }
}

function sketch(p: p5) {
  const WIDTH = 1000;
  const HEIGHT = 1000;

  p.setup = () => {
    // calculate width and height needed
    // stroke weight per pixel
    p.randomSeed(20220101);
    const strokeWeight = 2;
    const padding = strokeWeight * 4;
    const boxWidth = 9 * strokeWeight + padding * 2;
    const boxHeight = 9 * strokeWeight + padding * 2;
    const canvasWidth = boxWidth * 100;
    const canvasHeight = boxHeight * 100;
    p.createCanvas(canvasWidth, canvasHeight);
    p.colorMode("hsb", 360, 100, 100);
    p.background(0, 0, 100);

    for (let i = 0; i < 100; i++) {
      p.push();
      for (let j = 0; j < 100; j++) {
        draw9x9(p, strokeWeight);
        p.translate(0, 10 * strokeWeight + padding);
      }
      p.pop();
      p.translate(10 * strokeWeight + padding, 0);
    }
  };

  p.draw = () => {};
}

new p5(sketch);
