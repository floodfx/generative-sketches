import p5, { COLOR_MODE } from "p5";
import { sortColors, HsbgSortMode } from "../../../utils/color";
var image = require("./subway.jpg");



// Generative Design P.1.2.2
function sketch(p: p5) {

  let img: p5.Image;
  let sortMode: HsbgSortMode | undefined;


  p.setup = () => {
    p.createCanvas(420, 420);
    img = p.loadImage(image)
  };

  p.draw = () => {
    // calculate the tiles and rect size based on mouse x position
    let tileCount = Math.floor(p.width / p.max(p.mouseX, 5));
    let rectSize = Math.floor(p.width / tileCount);

    let i = 0;
    // sample a pixel for tiles
    let colors = new Array<string>(tileCount * tileCount);
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        const px = gridX * rectSize;
        const py = gridY * rectSize;
        // get a single pixel from the image
        const pixel = img.get(px, py);
        colors[i] = p.color(pixel).toString("#rgb");
        i++;
      }
    }
    // sort pixels
    colors = sortColors(colors, sortMode);

    // draw sorted pixel rectangles
    i = 0;
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        p.fill(p.color(colors[i]));
        p.rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
        i++;
      }
    }
    // show the sortMode
    p.fill('black');
    p.text(`sortMode: ${sortMode || 'none'}`, 0, 0, 100, 100);

  };

  // switch between color modes
  p.keyReleased = () => {
    switch (p.key) {
      case "4":
        sortMode = undefined;
        break;
      case "5":
        sortMode = "hue"
        break;
      case "6":
        sortMode = "saturation"
        break;
      case "7":
        sortMode = "brightness"
        break;
      case "8":
        sortMode = "grayscale"
        break;
    }
  };
}

new p5(sketch);
