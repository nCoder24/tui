const { Frame } = require("./src/frame");

const main = () => {
  const frame = new Frame(0, 0, 10, 10, process.stdout);
  console.clear();
  frame.put("xx", 0, 0);
  process.stdin.read();
}

main();