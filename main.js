const { Canvas } = require("./src/canvas");
const { Frame } = require("./src/frame");

const main = () => {
  const frame = new Frame(0, 0, 10, 10, process.stdout);
  const canvas = new Canvas(3, 3);
  frame.add(canvas, 2, 2);
  
  console.clear();
  canvas.put("--", 0, 0);
  
  process.stdin.read();
}

main();