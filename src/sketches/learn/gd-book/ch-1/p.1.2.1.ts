import p5, { Color } from "p5";

function randomColor(p: p5) {
  return p.color(p.random(0, 256), p.random(0, 256), p.random(0, 256));
}

function fillRandomColor(p: p5, colorArray: p5.Color[]) {
  return colorArray.map(() => randomColor(p));
}

// Generative Design P.1.2.1
function sketch(p: p5) {
  // max number of tiles on each axis
  const maxTilesX = 50,
    maxTilesY = 25;

  // random start (left) colors and end (right) colors to interpolate between
  const colorsLeft: p5.Color[] = fillRandomColor(p, new Array<p5.Color>(maxTilesY).fill(randomColor(p)));
  const colorsRight: p5.Color[] = fillRandomColor(p, new Array<p5.Color>(maxTilesY).fill(randomColor(p)));

  p.setup = () => {
    p.createCanvas(420, 420);
  };

  p.draw = () => {
    // determine number of tiles based on mouse position
    const tileCountX = p.map(p.mouseX, 0, p.width, 2, maxTilesX);
    const tileCountY = p.map(p.mouseY, 0, p.height, 2, maxTilesY, true);

    const tileWidth = p.width / tileCountX;
    const tileHeight = p.height / tileCountY;

    // file tiles
    for (let gridY = 0; gridY < tileCountY; gridY++) {
      const col1 = colorsLeft[gridY];
      const col2 = colorsRight[gridY];

      for (let gridX = 0; gridX < tileCountX; gridX++) {
        // amount of interpolation to do between colors
        const amount = p.map(gridX, 0, tileCountX - 1, 0, 1);

        // actually calculate the change in color
        const interCol = p.lerpColor(col1, col2, amount);

        p.fill(interCol);

        // draw the color swatch
        const posX = tileWidth * gridX;
        const posY = tileHeight * gridY;
        p.rect(posX, posY, tileWidth, tileHeight);
      }
    }
  };

  // switch between color modes
  p.keyReleased = () => {
    switch (p.key) {
      case "1":
        p.colorMode("hsb");
        break;
      default:
        p.colorMode("rgb");
    }
  };
}

new p5(sketch);
