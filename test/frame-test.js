const { describe, it, beforeEach, before } = require("node:test");
const assert = require("assert");
const { Frame } = require("../src/frame");
const { createSpy } = require("./spy");

describe("Frame", () => {
  beforeEach(() => {
    mockStdin = {
      write: createSpy(),
      cursorTo: createSpy()
    }
  });

  describe("put", () => {
    it("should put to top left corner on the screen for [0, 0]", () => {
      const frame = new Frame(0, 0, 10, 10, mockStdin);
      frame.put("x", 0, 0);

      assert.ok(mockStdin.write.isCalledOnce("x"));
      assert.ok(mockStdin.cursorTo.isCalledOnce(0, 0));
    });

    it("should put to the absolute position on the screen", () => {
      const frame = new Frame(5, 5, 10, 10, mockStdin);
      frame.put("x", 1, 2);

      assert.ok(mockStdin.write.isCalledOnce("x"));
      assert.ok(mockStdin.cursorTo.isCalledOnce(12, 7));
    });
  });

  //TODO: write test for add();
});