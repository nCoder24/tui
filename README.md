# TUI - Terminal User Interface
framework to create terminal applications

## How does TUI works ?
It provides components like frames and canvas containing methods to draw on it.
Components can be nested to create complex UIs.

## What are the components ?
- Frame
- Canvas

## How nested components can be created ?
```js
frame = new Frame(x, y, hight, width);
canvas = new Canvas(hight, width);
innerCanvas = new Canvas(hight, width);

canvas.add(innerCanvas, x, y);
frame.add(canvas, x, y);

frame.setVisible();
```