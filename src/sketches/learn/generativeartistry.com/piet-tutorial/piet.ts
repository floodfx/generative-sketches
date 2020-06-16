// see https://generativeartistry.com/tutorials/piet-mondrian/

var canvas = document.querySelector('canvas')!;
var context = canvas.getContext('2d')!;

var size = 640;//window.innerWidth;
var dpr = 1//window.devicePixelRatio;
canvas.width = 640//size * dpr;
canvas.height = 640//size * dpr;
context.lineWidth = 8;
var step = size / 20;
var squaresToColor = size / 10;

var white = '#F2F5F1';
var colors = ['#D40920', '#1356A2', '#F7D842']

interface Coordinate {
  x?: number;
  y?: number;
}

interface PietRect {
  x: number,
  y: number,
  width: number,
  height: number,
  color?: string
}

let squares: PietRect[] = [{
  x: 0,
  y: 0,
  width: size,
  height: size
}];

function splitSquaresWith(coordinates: Coordinate) {
  // Loops through the squares, and find if
  // one should be split
  const { x, y } = coordinates;

  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    if (x && x > square.x && x < square.x + square.width) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(square, y);
      }
    }
  }
}

function splitOnX(square: PietRect, splitAt: number) {
  // Create two new squares, based on
  // splitting the given one at the
  // x coordinate given
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height
  };

  var squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height
  };

  squares.push(squareA);
  squares.push(squareB);
}

function splitOnY(square: PietRect, splitAt: number) {
  // Create two new squares, based on
  // splitting the given one at the
  // y coordinate given
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y)
  };

  var squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y
  };

  squares.push(squareA);
  squares.push(squareB);
}

for (var i = 0; i < size; i += step) {
  splitSquaresWith({ y: i });
  splitSquaresWith({ x: i });
}

for (var i = 0; i < squaresToColor; i++) {
  squares[Math.floor(Math.random() * squares.length)].color = colors[i % colors.length];
}

function draw() {
  for (var i = 0; i < squares.length; i++) {
    context.beginPath();
    context.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height
    );
    if (squares[i].color !== undefined) {
      context.fillStyle = squares[i].color!;
    } else {
      context.fillStyle = white
    }
    context.fill()
    context.stroke();
  }
}

draw()

