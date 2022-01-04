import p5 from "p5";
// https://genuary.art/prompts#jan2
function sketch(p: p5) {
  const width = 1000;
  const height = 1000;

  const left_x = width * -0.5
  const right_x = width * 1.5
  const top_y = height * -0.5
  const bottom_y = height * 1.5
  const resolution = width * 0.01
  const num_columns = (right_x - left_x) / resolution
  const num_rows = (bottom_y - top_y) / resolution
  

  console.log(`left_x: ${left_x}`)
  console.log(`right_x: ${right_x}`)
  console.log(`top_y: ${top_y}`)
  console.log(`bottom_y: ${bottom_y}`)
  console.log(`resolution: ${resolution}`)
  console.log(`num_columns: ${num_columns}`)
  console.log(`num_rows: ${num_rows}`)

  const grid: Array<Array<number>> = []

  function generateGridOfAngles() {
     
    const default_angle = p.PI * 0.25
    
    for (let col = 0; col < num_columns; col++) {
      grid[col] = []
      for(let row = 0; row < num_rows; row++) {
        // Processing's noise() works best when the step between
      // points is approximately 0.005, so scale down to that
      const scaled_x = col * 0.005
      const scaled_y = row * 0.005
      // get our noise value, between 0.0 and 1.0
      const noise_val = p.noise(scaled_x, scaled_y)
      // translate the noise value to an angle (betwen 0 and 2 * PI)
      const angle = p.map(noise_val, 0.0, 1.0, 0.0, p.PI * 2.0)
        grid[col][row] = angle;
      }
    }
  }

  function drawCurve(x: number, y: number, num_steps: number = 50, stroke_alpha: number = 0.1) {
    const step_size = 20;
    p.noFill();
    p.stroke(0, 0, 0, stroke_alpha);
    p.beginShape();
    for (let n = 0; n < num_steps; n++) {
      p.vertex(x, y);
      let x_offset = x - left_x
      let y_offset = y - top_y
      let column_index = Math.floor(x_offset / resolution)
      let row_index = Math.floor(y_offset / resolution)
      // break if we are out of bounds
      if(column_index < 0 || column_index >= num_columns) {
        break;
      }
      if(row_index < 0 || row_index >= num_rows) {
        break;
      }
      let grid_angle = grid[column_index][row_index]
      let x_step = step_size * p.cos(grid_angle)
      let y_step = step_size * p.sin(grid_angle)
      x = x + x_step
      y = y + y_step
    }
    p.endShape()
  }

  function drawFlowAngles() {
    p.strokeWeight(2);
    for(var col = 0; col < num_columns; col++) {
      let x = col * resolution + left_x;
      for(var row = 0; row < num_rows; row++) {
        let y = row * resolution + top_y;
        const angle = grid[col][row]                
        p.stroke(0, 0, 0)
        p.fill(0, 0, 0)    
        // show the angle    
        p.line(x, y, x + p.cos(angle) * (resolution/2), y + p.sin(angle) * (resolution/2))
      }
    }
  }

  function floydSteinbergDither() {
    let error = 0;
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {

        // get the current color
        // since grayscale, we can just use the red channel value
        const x_color = p.get(x, y)[0];    
            
        const x_error = x_color + error;

        if(x_error > 127) {
          error = x_error - 255
        } else {
          error = x_error
        }
        // if(error !== 0) {
        //   console.log('x: ' + x + ' y: ' + y + ' error: ' + error)
        //   return;
        // }


        // get other pixels around the current pixel
        const right_alpha = p.get(x + 1, y)[3]
        const bottom_alpha = p.get(x, y + 1)[3]
        const bottom_right_alpha = p.get(x + 1, y + 1)[3]
        const bottom_left_alpha = p.get(x - 1, y + 1)[3]

        // set the other pixels based on current pixel's alpha
        p.set(x + 1, y, [0, 0, 0, error * 7 / 16])
        p.set(x, y + 1, [0, 0, 0, error * 5 / 16])
        p.set(x + 1, y + 1, [0, 0, 0, error * 1 / 16])
        p.set(x - 1, y + 1, [0, 0, 0, error * 3 / 16])
      }
    }
    p.updatePixels();
  }


  p.setup = () => {
    p.createCanvas(width, height);
    p.colorMode("hsb", 360, 100, 100);
    p.background(0, 0, 100);

    // generate the grid of angles
    generateGridOfAngles();

    // draw curves
    p.randomSeed(20220102)
    for(var i = 0; i < 1000; i++) {
      drawCurve(p.random(-500,1500), p.random(-500,1500), 79, 0.5)
    }
    // save canvas
    p.saveCanvas('sketch', 'png');

    // dither flow field
    floydSteinbergDither();
    

  };

  p.draw = () => {};
}

new p5(sketch);
