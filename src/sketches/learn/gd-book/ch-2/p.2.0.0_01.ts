import p5 from "p5";

// Generative Design P.2.0.0_01
function sketch(p: p5) {
  const x = 100;
  const y = 100;

  p.setup = () => {
    p.createCanvas(420, 420);
  };

  p.draw = () => {
    // clear the last frame
    p.background(255);

    // move origin to center
    p.translate(p.width / 2, p.height / 2);

    // calc lines
    let circleRes = p.map(p.mouseY, 0, p.height, 2, 80);
    let radius = p.mouseX - p.width / 2 + 0.5
    let angle = p.TWO_PI / circleRes;

    p.strokeWeight(p.mouseY / 20);

    // draw "flower" circle
    p.beginShape();
    for (let i = 0; i < circleRes; i++) {
      let x = p.cos(angle * i) * radius;
      let y = p.sin(angle * i) * radius;
      p.line(0, 0, x, y);
      //p.vertex(x, y)
    }
    p.endShape();
  };
}

new p5(sketch);
