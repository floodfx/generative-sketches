import p5 from "p5";

// Generative Design P.1.1.2
function sketch(p: p5) {
  const segmentCount = 30;
  const radius = 200;

  p.setup = () => {
    p.createCanvas(420, 420);
  };

  p.draw = () => {
    p.colorMode("hsb", 360, p.width, p.height);
    p.background(360);

    const angleStep = 360 / segmentCount;

    p.beginShape(p.TRIANGLE_FAN);
    p.vertex(p.width / 2, p.height / 2);

    for (let angle = 0; angle <= 360; angle += angleStep) {
      let vx = p.width / 2 + p.cos(p.radians(angle)) * radius;
      let vy = p.height / 2 + p.sin(p.radians(angle)) * radius;
      p.vertex(vx, vy);
      p.fill(angle, p.mouseX, p.mouseY);
    }
    p.endShape();
  };
}

new p5(sketch);
