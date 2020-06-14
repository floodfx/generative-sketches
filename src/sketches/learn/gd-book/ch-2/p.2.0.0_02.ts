import p5 from "p5";

interface Point {
  x: number;
  y: number;
}

// Generative Design P.2.0.0_01
function sketch(p: p5) {
  const x = 100;
  const y = 100;

  p.setup = () => {
    p.createCanvas(420, 420);
  };

  p.draw = () => {
    // don't clear background
    //p.background(255);
    p.translate(p.width / 2, p.height / 2);

    // number of lines drawn
    let circleRes = p.map(p.mouseY, 0, p.height, 2, 10);
    let radius = p.mouseX - p.width / 2 + 0.5;
    let angle = p.TWO_PI / circleRes;

    p.strokeWeight(p.mouseY / 20);

    p.beginShape();
    let points: Point[] = [];
    for (let i = 0; i <= circleRes; i++) {
      let x = p.cos(angle * i) * radius;
      let y = p.sin(angle * i) * radius;
      points.push({
        x,
        y,
      });
    }
    points.forEach((point, index) => {
      if (index === points.length - 1) {
        // connect last point with first point
        p.line(point.x, point.y, points[0].x, points[0].y);
      } else {
        p.line(point.x, point.y, points[index + 1].x, points[index + 1].y);
      }
    });
    p.endShape();
  };
}

new p5(sketch);
