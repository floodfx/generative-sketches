import chroma from "chroma-js";

export type HsbgSortMode = "hue" | "saturation" | "brightness" | "grayscale";

export function sortColors(colors: string[], sortMode?: HsbgSortMode) {
  if (!sortMode) {
    return colors;
  }
  return colors.sort((a: string, b: string) => {
    // sort grayscale
    if (sortMode === "grayscale") {
      const agray = colorToGrayscale(a);
      const bgray = colorToGrayscale(b);
      if (agray > bgray) {
        return 1;
      } else if (agray < bgray) {
        return -1;
      }
      return 0;
    }

    // sort hsb
    let channel: string | undefined;
    switch (sortMode) {
      case "hue":
        channel = "hsv.h";
        break;
      case "saturation":
        channel = "hsv.s";
        break;
      case "brightness":
        channel = "hsv.v";
        break;
      default:
        // shouldn't happen but just in case
        return 0;
    }

    const ac = chroma(a).get(channel);
    const bc = chroma(b).get(channel);
    if (ac > bc) {
      return 1;
    } else if (ac < bc) {
      return -1;
    }
    return 0;
  })
}

export function colorToGrayscale(rgbaHex: string): string {
  // simply calculate C Linear (don't worry about nonlinear gamma correction)
  // https://stackoverflow.com/questions/17615963/standard-rgb-to-grayscale-conversion
  const [r, g, b] = chroma(rgbaHex).gl();
  const clinear = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return chroma([clinear, clinear, clinear], "gl").hex()
}
