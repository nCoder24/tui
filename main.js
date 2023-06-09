const { Canvas } = require("./src/canvas");
const { Frame } = require("./src/frame");

const showCursor = () => process.stdout.write('\u001B[?25h');
const hideCursor = () => process.stdout.write('\u001B[?25l');

const main = () => {
  const frame = new Frame(0, 0, 10, 10, process.stdout);
  const canvas = new Canvas(3, 3);
  hideCursor();
  console.clear();
  frame.add(canvas, 2, 2);
  canvas.put("--", 0, 0);
  
  process.stdin.read();
}

main();