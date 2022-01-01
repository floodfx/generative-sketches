import p5 from "p5";
// https://genuary.art/prompts#jan1
function sketch(p: p5) {
  const WIDTH = p.windowWidth;
  const HEIGHT = p.windowHeight;
  const x = 100;
  const y = 100;

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode("hsb", 360, 100, 100);
    p.background(0, 0, 100);

    p.strokeWeight(1);

    for (let i = 0; i < 10000; i++) {
      p.fill(0, 0, 0, 0);
      p.stroke(0, 0, 0, 0.1);
      p.triangle(
        p.random(WIDTH),
        p.random(HEIGHT),
        p.random(WIDTH),
        p.random(HEIGHT),
        p.random(WIDTH),
        p.random(HEIGHT),
      );
    }
  };

  p.draw = () => {};
}

new p5(sketch);
