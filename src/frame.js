const blankPixel = "  ";

class Frame {
  #position;
  #size;
  #stdin;
  #pixels;

  constructor(x, y, hight, width, stdin) {
    this.#position = { x, y };
    this.#size = { hight, width };
    this.#stdin = stdin;
    this.#pixels = new Array(hight)
    .fill()
    .map(() => new Array(width).fill(blankPixel));
  }

  #normalize({x, y}) {
    return {
      x: 2 * (x + this.#position.x),
      y: y + this.#position.y,
    };
  }

  setBackground(pixel) {
    this.#pixels.forEach((col, x) => {
      col.forEach((_, y) => {
        this.#pixels[x][y] = pixel;
        this.put(pixel, x, y);
      });
    });
  }

  put(pixel, relativeX, relativeY) {
    const relativePosition = { x: relativeX, y: relativeY };
    const { x, y } = this.#normalize(relativePosition);

    this.#stdin.cursorTo(x, y);
    this.#stdin.write(pixel);
  }

  add(component, toX, toY) {
    component.on("put", (pixel, x, y) => {
      const pos = {x: x + toX, y: y + toY};
      this.put(pixel, pos.x, pos.y);
    });

    component.sync();
  }

  //TODO: write remove(), drawBorder();
}

exports.Frame = Frame;