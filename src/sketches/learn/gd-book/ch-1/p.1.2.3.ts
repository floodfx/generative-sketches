import p5 from "p5";

// Generative Design P.1.2.3
function sketch(p: p5) {
  const tileCountX = 20;
  const tileCountY = 10;

  // containers for random colors
  let hueValues = Array<number>(tileCountX).fill(0);
  let saturationValues = Array<number>(tileCountX).fill(0);
  let brightnessValues = Array<number>(tileCountX).fill(0);

  p.setup = () => {
    p.createCanvas(420, 420);
    p.colorMode("hsb");
  };

  p.draw = () => {
    // calc tile h/w based on canvas size
    const tileWidth = Math.floor(p.width / tileCountX);
    const tileHeight = Math.floor(p.height / tileCountY);

    let counter = 0;
    // draw color tiles
    for (let gridY = 0; gridY < tileCountY; gridY++) {
      for (let gridX = 0; gridX < tileCountX; gridX++) {
        let index = (counter + gridY) % tileCountX;

        // calc next position
        const posX = tileWidth * gridX;
        const posY = tileHeight * gridY;

        // draw the color swatch
        p.fill(hueValues[index], saturationValues[index], brightnessValues[index]);
        p.rect(posX, posY, tileWidth, tileHeight);
        counter++;
      }
    }
  };

  // switch between color modes
  p.keyReleased = () => {
    switch (p.key) {
      case "1":
        // full random
        for (let i = 0; i < tileCountX; i++) {
          hueValues[i] = p.random(0, 360);
          saturationValues[i] = p.random(0, 101);
          brightnessValues[i] = p.random(0, 101);
        }
        break;
      case "2":
        // random with full brightness
        for (let i = 0; i < tileCountX; i++) {
          hueValues[i] = p.random(0, 360);
          saturationValues[i] = p.random(0, 101);
          brightnessValues[i] = 100;
        }
        break;
      case "3":
        // random with full saturation
        for (let i = 0; i < tileCountX; i++) {
          hueValues[i] = p.random(0, 360);
          saturationValues[i] = 100;
          brightnessValues[i] = p.random(0, 101);
        }
        break;
      case "4":
        // full saturation with limited hue and brightness range
        for (let i = 0; i < tileCountX; i++) {
          hueValues[i] = p.random(0, 180);
          saturationValues[i] = 100;
          brightnessValues[i] = p.random(50, 90);
        }
        break;
      case "5":
        // alternating random
        for (let i = 0; i < tileCountX; i++) {
          if (i % 2 === 0) {
            hueValues[i] = p.random(0, 360);
            saturationValues[i] = 100;
            brightnessValues[i] = p.random(0, 101);
          } else {
            hueValues[i] = 195;
            saturationValues[i] = p.random(0, 101);
            brightnessValues[i] = 100;
          }
        }
        break;
    }
  };
}

new p5(sketch);
