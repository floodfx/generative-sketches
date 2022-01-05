import p5 from "p5";
// https://genuary.art/prompts#jan2
function sketch(p: p5) {
  const width = 1000;
  const height = 1000;

  interface Point {
    x: number;
    y: number;
  }

  interface BoundingBox {
    top_left: Point;
    bottom_right: Point;
  }

  interface Scene {
    points: Array<Point>;
  }

  interface Color {
    r: number;
    g: number;
    b: number;
  }

  class Color {
    constructor(r: number, g: number, b: number) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    toRgbString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
  }

  interface ColorScheme {
    head: Color;
    body: Color;
    tail: Color;
    fire: Color;
  }

  const grays_pink_scheme: ColorScheme = {
    head: new Color(211, 222, 220),
    body: new Color(146, 169, 189),
    tail: new Color(124, 153, 172),
    fire: new Color(255, 239, 239),
  };

  const blues_orange_scheme: ColorScheme = {
    head: new Color(53, 88, 154),
    body: new Color(67, 6, 101),
    tail: new Color(252, 153, 24),
    fire: new Color(241, 74, 22),
  };

  const lav_teal_scheme: ColorScheme = {
    head: new Color(212, 122, 232),
    body: new Color(244, 190, 238),
    tail: new Color(168, 236, 231),
    fire: new Color(253, 255, 143),
  };

  const maroonish_scheme: ColorScheme = {
    head: new Color(245, 198, 165),
    body: new Color(255, 119, 119),
    tail: new Color(162, 65, 107),
    fire: new Color(133, 39, 71),
  };

  const color_schemes: Array<ColorScheme> = [
    grays_pink_scheme,
    blues_orange_scheme,
    lav_teal_scheme,
    maroonish_scheme,
    {
      head: new Color(249, 243, 223),
      body: new Color(205, 242, 202),
      tail: new Color(255, 222, 250),
      fire: new Color(255, 200, 152),
    },
    {
      head: new Color(255, 252, 202),
      body: new Color(85, 233, 188),
      tail: new Color(17, 211, 188),
      fire: new Color(83, 119, 128),
    },
  ];

  function getColorScheme(index: number = -1) {
    if (index === -1) {
      index = p.round(p.random(color_schemes.length - 1));
    }
    return color_schemes[index];
  }

  function drawWindow(
    x: number,
    y: number,
    w: number,
    h: number,
    translate_x: number,
    color: Color,
    probability: number = 0.5,
  ) {
    // randomly draw window
    if (p.random(0, 1) > probability) {
      // draw elipse
      p.push();
      // p.fill(20, 20, 100); // TODO - randomize color
      p.translate(translate_x, 0);
      p.ellipse(x, y, w, h);
      p.pop();
    }
  }

  function generateRocket(max_height: number, colorScheme: ColorScheme) {
    // rocket size should be between 20 and 60% of scene area
    // angle of the rocket will be random between 0 and 2 * PI
    // each rocket part will be within a few pixels of the previous part
    // each rocket part can be angled between 1 and 5 degrees

    const rocket_angle = p.random(0, 360);
    const rocket_size = p.round(p.random(0.5, 0.7) * max_height);
    console.log(`rocket_angle: ${rocket_angle}`, `rocket_size: ${rocket_size}`);

    const body_height = p.round(p.random(0.3, 0.5) * rocket_size);
    const body_width = p.round(p.random(0.2, 0.5) * body_height);
    console.log(`body_height: ${body_height}`, `body_width: ${body_width}`);

    const head_height = p.round(p.random(0.1, 0.2) * rocket_size);
    const head_width = p.round(p.random(0.7, 1) * body_width);
    console.log(`head_height: ${head_height}`, `head_width: ${head_width}`);

    const tail_height = p.round(p.random(0.1, 0.2) * rocket_size);
    const tail_width = p.round(p.random(1, 1.5) * body_width);
    console.log(`tail_height: ${tail_height}`, `tail_width: ${tail_width}`);

    const fire_height = p.round(p.random(0.1, 0.5) * rocket_size);
    const fire_width = p.round(p.random(0.8, 1) * tail_width);
    console.log(`fire_height: ${fire_height}`, `fire_width: ${fire_width}`);

    p.push();

    generateRocketBody({ x: 0, y: head_height }, { x: body_width, y: head_height + body_height }, colorScheme.body);
    generateRocketHead({ x: 0, y: 0 }, { x: head_width, y: head_height }, body_width, colorScheme.head);
    generateRocketTail(
      { x: 0, y: head_height + body_height },
      { x: tail_width, y: head_height + body_height + tail_height },
      body_width,
      colorScheme.tail,
    );
    generateRocketFire(
      { x: 0, y: head_height + body_height + tail_height },
      { x: fire_width, y: head_height + body_height + tail_height + fire_height },
      body_width,
      colorScheme.fire,
    );
    p.pop();
  }

  function generateRocketHead(top_left: Point, bottom_right: Point, body_width: number, color: Color) {
    const head_width = bottom_right.x - top_left.x;
    const head_height = bottom_right.y - top_left.y;
    const mid_error = p.random(0.1, 0.2) * head_width;
    const mid_x = p.round((top_left.x + bottom_right.x + p.random(-1 * mid_error, mid_error)) / 2);
    console.log(
      `generateRocketHead(${top_left.x}, ${top_left.y}, ${bottom_right.x}, ${bottom_right.y},${mid_x}, ${body_width}, ${head_width})`,
    );

    // draw head
    p.push();
    p.fill(color.toRgbString());
    p.angleMode(p.DEGREES);
    p.strokeCap(p.SQUARE);
    p.strokeWeight(0);
    p.rotate(p.random(-2, 2));
    p.translate((body_width - head_width) / 2, 0);
    p.triangle(mid_x, top_left.y, top_left.x, bottom_right.y, bottom_right.x, bottom_right.y);
    p.pop();

    // randomly draw window
    const window_w = p.random(head_width / 10, head_width / 5);
    const window_h = p.random(head_width / 10, head_width / 5);
    drawWindow(
      mid_x,
      bottom_right.y - head_height / 4,
      window_w,
      window_h,
      (body_width - head_width) / 2,
      new Color(20, 20, 100),
    );
  }

  function generateRocketBody(top_left: Point, bottom_right: Point, color: Color) {
    console.log(`generateRocketBody(${top_left.x}, ${top_left.y}, ${bottom_right.x}, ${bottom_right.y}`);

    const body_width = bottom_right.x - top_left.x;
    const body_height = bottom_right.y - top_left.y;

    // draw body
    p.push();
    p.angleMode(p.DEGREES);
    p.strokeCap(p.SQUARE);
    p.strokeWeight(0);
    p.fill(color.toRgbString());
    p.push();
    p.rectMode(p.CENTER);
    p.rotate(p.random(-2, 2));
    p.pop();
    p.rect(top_left.x, top_left.y, bottom_right.x - top_left.x, bottom_right.y - top_left.y);
    p.pop();

    // randomly draw wings
    if (p.random(0, 1) > 0.6) {
      p.push();
      p.noStroke();
      p.fill(color.toRgbString());

      // pick top x in top 50% of body
      const wing_top_y = p.round(p.random(0, 0.5) * body_height);
      // pick height max of what's left
      const wing_height = p.round(p.random(0.2, 1) * (body_height - wing_top_y));
      // pick width max body width
      const wing_width = p.round(p.random(0.5, 1) * body_width);
      // draw left wing
      p.rotate(p.random(-1, 1));
      p.triangle(
        top_left.x,
        top_left.y + wing_top_y,
        top_left.x - wing_width,
        top_left.y + wing_top_y + wing_height,
        top_left.x,
        top_left.y + wing_top_y + wing_height,
      );
      // draw right wing
      p.rotate(p.random(-1, 1));
      p.triangle(
        bottom_right.x,
        top_left.y + wing_top_y,
        bottom_right.x + wing_width,
        top_left.y + wing_top_y + wing_height,
        bottom_right.x,
        top_left.y + wing_top_y + wing_height,
      );
      p.pop();
    }

    // randomly draw 1, 3, or 5 windows
    const window_w = p.random(body_width / 10, body_width / 5);
    const window_h = p.random(body_width / 10, body_width / 5);
    const x = p.round(p.random(0.2, 0.8) * body_width);
    const num_windows = p.random([1, 3, 5]);
    const window_spacing_y = p.round(p.random(window_h));
    for (let i = 0; i < num_windows; i++) {
      drawWindow(
        x,
        top_left.y + 20 + i * window_h + i * window_spacing_y,
        window_w,
        window_h,
        0,
        new Color(20, 20, 100),
      );
    }
  }

  function generateRocketTail(top_left: Point, bottom_right: Point, body_width: number, color: Color) {
    console.log(`generateRocketTail(${top_left.x}, ${top_left.y}, ${bottom_right.x}, ${bottom_right.y})`);
    const tail_width = bottom_right.x - top_left.x;
    const tail_height = bottom_right.y - top_left.y;
    p.push();
    p.angleMode(p.DEGREES);
    p.strokeCap(p.SQUARE);

    p.strokeWeight(0);
    p.fill(color.toRgbString());
    p.push();
    p.rectMode(p.CENTER);
    // p.rotate(p.random(-2, 2));
    p.pop();
    p.translate((body_width - tail_width) / 2, 0);
    p.rotate(p.random(-1, 1));
    p.rect(top_left.x, top_left.y, bottom_right.x - top_left.x, bottom_right.y - top_left.y);
    p.pop();

    if (p.random(0, 1) > 0.6) {
      p.push();
      p.fill(color.toRgbString());
      p.strokeWeight(0);
      // pick top x in top 50% of body
      const wing_top_y = p.round(p.random(0, 0.5) * tail_height);
      // pick height max of what's left
      const wing_height = p.round(p.random(0.2, 1) * (tail_height - wing_top_y));
      // pick width max body width
      const wing_width = p.round(p.random(0.5, 1) * body_width);
      // translate to body
      p.translate((body_width - tail_width) / 2, 0);
      // draw left wing
      p.rotate(p.random(-1, 1));
      p.triangle(
        top_left.x,
        top_left.y + wing_top_y,
        top_left.x - wing_width,
        top_left.y + wing_top_y + wing_height,
        top_left.x,
        top_left.y + wing_top_y + wing_height,
      );
      // draw right wing
      p.rotate(p.random(-1, 1));
      p.triangle(
        bottom_right.x,
        top_left.y + wing_top_y,
        bottom_right.x + wing_width,
        top_left.y + wing_top_y + wing_height,
        bottom_right.x,
        top_left.y + wing_top_y + wing_height,
      );
      p.pop();
    }
  }

  function generateRocketFire(top_left: Point, bottom_right: Point, body_width: number, color: Color) {
    const fire_width = bottom_right.x - top_left.x;
    const mid_x = p.round((top_left.x + bottom_right.x) / 2);
    console.log(
      `generateRocketFire(${top_left.x}, ${top_left.y}, ${bottom_right.x}, ${
        bottom_right.y
      }, ${mid_x}), ${body_width} ${fire_width} ${body_width - fire_width / 2}`,
    );
    p.push();
    p.angleMode(p.DEGREES);
    p.strokeCap(p.SQUARE);
    p.strokeWeight(0);
    p.fill(color.toRgbString());
    // p.rotate(p.random(-0.5, 0.5));
    p.translate((body_width - fire_width) / 2, 0);
    p.rotate(p.random(-1, 1));
    // big flame
    p.triangle(mid_x, bottom_right.y, top_left.x, top_left.y, bottom_right.x, top_left.y);
    // small flame
    const small_flame_width = p.round(p.random(0.3, 0.5) * fire_width);
    const small_flame_height = p.round(p.random(0.3, 0.8) * fire_width);
    const small_flame_x_offset = (fire_width - small_flame_width) / 2;
    const rNewColor = (45 + color.r) % 255;
    const gNewColor = (45 + color.g) % 255;
    const bNewColor = (45 + color.b) % 255;
    console.log(`${rNewColor}, ${gNewColor}, ${bNewColor}`);
    p.fill(rNewColor, gNewColor, bNewColor);
    p.rotate(p.random(-1, 1));
    p.triangle(
      mid_x,
      top_left.y + small_flame_height,
      top_left.x + small_flame_x_offset,
      top_left.y,
      bottom_right.x - small_flame_x_offset,
      top_left.y,
    );
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(width, height);
    // p.colorMode("hsb", 360, 100, 100);
    p.background(0, 0, 100);
    // add stars
    const num_stars = 100;
    for (let i = 0; i < num_stars; i++) {
      p.push();
      p.translate(p.random(0, width), p.random(0, height));
      p.rectMode(p.CENTER);
      p.angleMode(p.DEGREES);
      const star_color = p.round(p.random(128, 200));
      // const star_alpha = p.round(p.random(0.4, 0.6)*255);
      p.fill(star_color);
      p.noStroke();
      const num_rects = p.round(p.random(3, 7));
      for (let j = 0; j < num_rects; j++) {
        p.rect(0, 0, p.random(3, 5), p.random(10, 15));
        p.rotate(p.random([30, 60, 90]));
      }
      p.pop();
    }
    let colorSchemeIndex = 0;
    const num_rockets = 5;
    for (let i = 0; i < num_rockets; i++) {
      const scheme = color_schemes[colorSchemeIndex % color_schemes.length];
      p.push();
      p.translate(50 + (i * width) / num_rockets, 50);
      generateRocket(300, scheme);
      p.pop();
      colorSchemeIndex++;
    }

    for (let i = 0; i < num_rockets; i++) {
      const scheme = color_schemes[colorSchemeIndex % color_schemes.length];
      p.push();
      p.translate(50 + (i * width) / num_rockets, 350);
      generateRocket(300, scheme);
      p.pop();
      colorSchemeIndex++;
    }
  };

  p.draw = () => {};
}

new p5(sketch);
