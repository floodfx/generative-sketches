import p5 from "p5";
// https://genuary.art/prompts#jan1
function sketch(p: p5) {
  const WIDTH = 1010;
  const HEIGHT = 1010;
  const x = 100;
  const y = 100;

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.colorMode("hsb", 360, 100, 100);
    p.background(0, 0, 100);

    p.strokeWeight(1);
        
    p.stroke(0, 0, 0);
    for (let i = 0; i < 100; i++) {
      let col = i;
      for(let j = 0; j < 100; j++) {
        let row = j; 
        p.fill(0, 0, 0, p.random(0.05, 0.2));
        p.circle(
          10+col * 10,
          10+row * 10,
          10,          
        );
      }
    }
  };

  p.draw = () => {};
}

new p5(sketch);
