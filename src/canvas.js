const EventEmitter = require("events");
const blankPixel = "  ";

class Canvas extends EventEmitter {
  #pixels;
  #borderWidth;
  #components;

  constructor(hight, width) {
    super();
    this.#pixels = new Array(hight)
      .fill()
      .map(() => new Array(width).fill(blankPixel));
    this.#borderWidth = 0;
    this.#components = [];
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

    this.#components.forEach((component) => component.sync);
  }

  add(component, toX, toY) {
    this.#components.push(component);
    component.on("put", (pixel, x, y) => {
      const pos = { x: x + toX, y: y + toY };
      this.put(pixel, pos.x, pos.y);
    });

    component.sync();
  }

  drawBorder(config) {
    this.#borderWidth = config.width;
    this.#pixels.forEach((col) => {
      const horizontalLine = config.horizontalLine.repeat(2);
      col.unshift(horizontalLine);
      col.push(horizontalLine);
    });

    const leftCol = (
      config.topLeftCorner +
      config.leftVirticleLine.repeat(this.#pixels[0].length - 2) +
      config.bottomLeftCorner
    ).match(/../g);

    const rightCol = (
      config.topRightCorner +
      config.rightVirticleLine.repeat(this.#pixels[0].length - 2) +
      config.bottomRightCorner
    ).match(/../g);

    this.#pixels.unshift(leftCol);
    this.#pixels.push(rightCol);

    this.sync();
  }
}

exports.Canvas = Canvas;
