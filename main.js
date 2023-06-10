const { Canvas } = require("./src/canvas");
const { Frame } = require("./src/frame");

const showCursor = () => process.stdout.write('\u001B[?25h');
const hideCursor = () => process.stdout.write('\u001B[?25l');

const main = () => {
  const frame = new Frame(0, 0, 10, 10, process.stdout);
  const canvas = new Canvas(5, 5);
  const innerCanvas = new Canvas(2, 2);
  canvas.add(innerCanvas, 0, 0);
  
  hideCursor();
  console.clear();
  
  frame.setBackground("xx")
  frame.add(canvas, 2, 2);
  
  innerCanvas.put("--", 0, 0);
  innerCanvas.put("@@", 0, 1);
  
  const { thinBorder } = require("./resourses/box-chars.json");
  canvas.drawBorder(thinBorder);
  innerCanvas.drawBorder(thinBorder);
  
  process.stdin.read();
}

main();