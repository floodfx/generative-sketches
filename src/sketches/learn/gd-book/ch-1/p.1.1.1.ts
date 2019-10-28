import p5 from "p5";

// Generative Design P.1.0
function sketch(p: p5) {
  let stepX: number, stepY: number;
  const y = 100;

  p.setup = () => {
    p.createCanvas(800, 400);
    p.background(0);
  };

  p.draw = () => {
    p.colorMode("hsb", p.width, p.height, 100);

    stepX = p.mouseX + 2;
    stepY = p.mouseY + 2;

    for (let gridY = 0; gridY < p.height; gridY += stepY) {
      for (let gridX = 0; gridX < p.width; gridX += stepX) {
        p.fill(gridX, p.height - gridY, 100);
        p.rect(gridX, gridY, stepX, stepY);
      }
    }
  }
}

new p5(sketch);
