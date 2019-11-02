import { colorToGrayscale, sortColors } from "./color";
import chroma from "chroma-js";
import p5 from "p5";

describe("colorToGrayscale", () => {

  it('calculates gray from red', () => {
    const grayFromRed = colorToGrayscale("#ff0000");
    expect(grayFromRed).toEqual("#363636");
  });

  it('calculates gray from green', () => {
    const grayFromGreen = colorToGrayscale("#00ff00");
    expect(grayFromGreen).toEqual("#b6b6b6");
  });

  it('calculates gray from blue', () => {
    const grayFromBlue = colorToGrayscale("#0000ff");
    expect(grayFromBlue).toEqual("#121212");
  });

  it('calculates white from white', () => {
    const white = colorToGrayscale("#ffffff");
    expect(white).toEqual("#ffffff")
  })

  it('calculates black from black', () => {
    const black = colorToGrayscale("#000000");
    expect(black).toEqual("#000000")
  })

})

describe("color sorting", () => {
  const white_to_black = chroma.scale(['white', 'black']).colors(12);

  it("ignores sorting for color mode undefined", () => {
    expect(sortColors(white_to_black)).toEqual(white_to_black)
  })

  it("sorts colors from black to white for grayscale", () => {
    const black_to_white = chroma.scale(['black', 'white']).colors(12);
    expect(sortColors(white_to_black, "grayscale")).toEqual(black_to_white)
  })

  it("sorts by hue", () => {
    const mixed_hue = [
      chroma.hsv(200, 0, 0.1).hex(),
      chroma.hsv(300, 0, 0.1).hex(),
      chroma.hsv(100, 0, 0.1).hex(),
    ]
    const sorted_hue = [
      chroma.hsv(300, 0, 0.1).hex(),
      chroma.hsv(200, 0, 0.1).hex(),
      chroma.hsv(100, 0, 0.1).hex(),
    ]
    // console.log("mixed_hue", mixed_hue, mixed_hue.map((value) => chroma(value).get('hsv.h')))
    // console.log("sorted_hue", sorted_hue, sorted_hue.map((value) => chroma(value).get('hsv.h')))
    expect(sortColors(mixed_hue, "hue")).toEqual(sorted_hue)
  })

  it("sorts by saturation", () => {
    const mixed_sat = [
      chroma.hsv(300, 0.6, 0.1).hex(),
      chroma.hsv(200, 1, 0.1).hex(),
      chroma.hsv(100, 0.2, 0.1).hex(),
    ]
    const sorted_sat = [
      chroma.hsv(100, 0.2, 0.1).hex(),
      chroma.hsv(300, 0.6, 0.1).hex(),
      chroma.hsv(200, 1, 0.1).hex(),
    ]
    // console.log("mixed_sat", mixed_sat, mixed_sat.map((value) => chroma(value).get('hsv.s')))
    // console.log("sorted_sat", sorted_sat, sorted_sat.map((value) => chroma(value).get('hsv.s')))
    expect(sortColors(mixed_sat, "saturation")).toEqual(sorted_sat)
  })

  it("sorts by brightness", () => {
    const mixed_bright = [
      chroma.hsv(180, 1, 0.2).hex(),
      chroma.hsv(180, 1, 0.3).hex(),
      chroma.hsv(180, 1, 0.1).hex(),
    ]
    const sorted_bright = [
      chroma.hsv(180, 1, 0.1).hex(),
      chroma.hsv(180, 1, 0.2).hex(),
      chroma.hsv(180, 1, 0.3).hex(),
    ]
    // console.log("mixed_bright", mixed_bright, mixed_bright.map((value) => chroma(value).get('hsv.v')))
    // console.log("sorted_bright", sorted_bright, sorted_bright.map((value) => chroma(value).get('hsv.v')))
    expect(sortColors(mixed_bright, "brightness")).toEqual(sorted_bright)
  })


})
