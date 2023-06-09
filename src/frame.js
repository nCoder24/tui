class Frame {
  #position;
  #size;
  #stdin;

  constructor(x, y, hight, width, stdin) {
    this.#position = { x, y };
    this.#size = { hight, width };
    this.#stdin = stdin;
  }

  #normalize({x, y}) {
    return {
      x: 2 * (x + this.#position.x),
      y: y + this.#position.y,
    };
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
  }

  //TODO: write remove(), drawBorder();
}

exports.Frame = Frame;