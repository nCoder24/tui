const EventEmitter = require("events");
const blankPixel = "  ";

class Canvas extends EventEmitter {
  #pixels;
  #borderWidth;

  constructor(hight, width) {
    super();
    this.#pixels = new Array(hight)
      .fill()
      .map(() => new Array(width).fill(blankPixel));
    this.#borderWidth = 0;
  }

  put(pixel, x, y) {
    const absX = x + this.#borderWidth;
    const absY = y + this.#borderWidth;

    this.#pixels[absX][absY] = pixel;
    this.emit("put", pixel, absX, absY);
  }

  sync() {
    this.#pixels.forEach((col, x) => {
      col.forEach((pixel, y) => {
        this.emit("put", pixel, x, y);
      });
    });
  }

  drawBorder() {
    this.#borderWidth = 1;
    const { thinBorder } = require("../resourses/box-chars.json");
    this.#pixels.forEach((col) => {
      const horizontalLine = thinBorder.horizontalLine.repeat(2);
      col.unshift(horizontalLine);
      col.push(horizontalLine);
    });

    const leftCol = (
      thinBorder.topLeftCorner +
      thinBorder.leftVirticleLine.repeat(this.#pixels[0].length - 2) +
      thinBorder.bottomLeftCorner
    ).match(/../g);

    const rightCol = (
      thinBorder.topRightCorner +
      thinBorder.rightVirticleLine.repeat(this.#pixels[0].length - 2) +
      thinBorder.bottomRightCorner
    ).match(/../g);

    this.#pixels.unshift(leftCol);
    this.#pixels.push(rightCol);

    this.sync();
  }
}

exports.Canvas = Canvas;
