import p5 from "p5";

// Generative Design P.1.0
function sketch(p: p5) {
  const x = 100;
  const y = 100;

  p.setup = () => {
    p.createCanvas(720, 720);
  };

  p.draw = () => {
    p.colorMode("hsb", 360, 100, 100);
    p.rectMode("center");
    p.noStroke();
    p.background(p.mouseY / 2, 100, 100);

    p.fill(360 - p.mouseY / 2, 100, 100);
    p.rect(360, 360, p.mouseX + 1, p.mouseX + 1);
  };
}

new p5(sketch);