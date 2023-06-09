const EventEmitter = require("events");

const emptyPixel = " ";

class Canvas extends EventEmitter {
  #pixels;

  constructor(hight, width) {
    super();
    this.#pixels = new Array(hight).fill().map(() => new Array(width).fill("**"));
  }

  put(pixel, x, y) {
    this.#pixels[x][y] = pixel;
    this.emit("put", pixel, x, y);
  }
}

exports.Canvas = Canvas;
