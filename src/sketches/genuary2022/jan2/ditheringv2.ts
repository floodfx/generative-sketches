import p5 from "p5";
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

  function floydSteinbergDither() {
    let error = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // get the current color
        // since grayscale, we can just use the red channel value
        const x_color = p.get(x, y)[0];

        const x_error = x_color + error;

        if (x_error > 127) {
          error = x_error - 255;
        } else {
          error = x_error;
        }
        // if(error !== 0) {
        //   console.log('x: ' + x + ' y: ' + y + ' error: ' + error)
        //   return;
        // }

        // get other pixels around the current pixel
        const right_alpha = p.get(x + 1, y)[3];
        const bottom_alpha = p.get(x, y + 1)[3];
        const bottom_right_alpha = p.get(x + 1, y + 1)[3];
        const bottom_left_alpha = p.get(x - 1, y + 1)[3];

        // set the other pixels based on current pixel's alpha
        p.set(x + 1, y, [0, 0, 0, (error * 7) / 16]);
        p.set(x, y + 1, [0, 0, 0, (error * 5) / 16]);
        p.set(x + 1, y + 1, [0, 0, 0, (error * 1) / 16]);
        p.set(x - 1, y + 1, [0, 0, 0, (error * 3) / 16]);
      }
    }
    p.updatePixels();
  }

  p.setup = () => {
    p.createCanvas(width, height);
    p.colorMode("hsb", 360, 100, 100);
    p.background(0, 0, 100);

    p.loadImage(
      "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
      img => {
        p.image(img, 0, 0, width, height);
      },
    );

    // draw curves
    p.randomSeed(20220102);

    // dither flow field
    floydSteinbergDither();
  };

  p.draw = () => {};
}

new p5(sketch);
