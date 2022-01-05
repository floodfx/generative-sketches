import p5 from "p5";
import chroma from "chroma-js";
// https://genuary.art/prompts#jan2
function sketch(p: p5) {
  const width = 1000;
  const height = 1000;

  const left_x = width * -0.5;
  const right_x = width * 1.5;
  const top_y = height * -0.5;
  const bottom_y = height * 1.5;
  const resolution = width * 0.01;
  const num_columns = (right_x - left_x) / resolution;
  const num_rows = (bottom_y - top_y) / resolution;

  console.log(`left_x: ${left_x}`);
  console.log(`right_x: ${right_x}`);
  console.log(`top_y: ${top_y}`);
  console.log(`bottom_y: ${bottom_y}`);
  console.log(`resolution: ${resolution}`);
  console.log(`num_columns: ${num_columns}`);
  console.log(`num_rows: ${num_rows}`);

  const grid: Array<Array<number>> = [];

  function generateGridOfAngles() {

    for (let col = 0; col < num_columns; col++) {
      grid[col] = [];
      for (let row = 0; row < num_rows; row++) {
        // Processing's noise() works best when the step between
        // points is approximately 0.005, so scale down to that
        const scaled_x = col * 0.005;
        const scaled_y = row * 0.005;
        // get our noise value, between 0.0 and 1.0
        const noise_val = p.noise(scaled_x, scaled_y);
        // translate the noise value to an angle (betwen 0 and 2 * PI)
        const angle = p.map(noise_val, 0.0, 1.0, 0.0, p.PI * 2.0);
        grid[col][row] = angle;
      }
    }
  }

  function drawCurve(x: number, y: number, num_steps: number = 50, color: string) {
    const step_size = 20;
    p.noFill();
    // p.fill(0, 0, 0, 0.02);
    p.colorMode(p.RGB)
    p.strokeWeight(p.round(p.random(5,25)));
    p.strokeCap(p.SQUARE);
    p.stroke(color);
    
    p.beginShape();
    for (let n = 0; n < num_steps; n++) {
      p.vertex(x, y);

      let x_offset = x - left_x;
      let y_offset = y - top_y;
      let column_index = Math.floor(x_offset / resolution);
      let row_index = Math.floor(y_offset / resolution);
      // break if we are out of bounds
      if (column_index < 0 || column_index >= num_columns) {
        break;
      }
      if (row_index < 0 || row_index >= num_rows) {
        break;
      }
      let grid_angle = grid[column_index][row_index];
      let x_step = step_size * p.cos(grid_angle);
      let y_step = step_size * p.sin(grid_angle);
      x = x + x_step;
      y = y + y_step;
      
    }
    p.endShape();
  }

  function drawFlowAngles() {
    p.strokeWeight(2);
    for (var col = 0; col < num_columns; col++) {
      let x = col * resolution + left_x;
      for (var row = 0; row < num_rows; row++) {
        let y = row * resolution + top_y;
        const angle = grid[col][row];
        p.stroke(0, 0, 0);
        p.fill(0, 0, 0);
        // show the angle
        p.line(x, y, x + p.cos(angle) * (resolution / 2), y + p.sin(angle) * (resolution / 2));
      }
    }
  }

  p.setup = () => {
    p.createCanvas(width, height);
    p.background("#FFFBDB");
    p.colorMode("hsb", 360, 100, 100);
    

    const colors = chroma.scale(["F9D371", "8843F2"]).mode("lch").colors(8);
    

    // p.noiseSeed(20220104);
    // p.randomSeed(20220104);
    // generate the grid of angles
    generateGridOfAngles();

    // draw curves    
    for (var i = 0; i < p.round(p.random(100,200)); i++) {
      drawCurve(p.random(-500, 1500), p.random(-500, 1500), 20, colors[p.round(p.random(0,7))]);
    }

    // p.noiseSeed(202201042);
    // p.randomSeed(202201042);

    generateGridOfAngles();

    // draw curves    
    for (var i = 0; i < p.round(p.random(100,200)); i++) {
      drawCurve(p.random(-500, 1500), p.random(-500, 1500), 20, colors[p.round(p.random(0,7))]);
    }
  };

  p.draw = () => {};
}

new p5(sketch);
