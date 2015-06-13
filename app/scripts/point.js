// point.js
'use strict';


class Point {

  constructor() {
    this.shape = 'ellipse';
    this.radius = 1;
    this.x = 0;
    this.y = 0;
    this.sketch = null;
  }

  setSketch(sketch) {
    this.sketch = sketch;
  }

  setPosition(x,y) {
    this.x = x;
    this.y = y;
  }

  setRadius(r) {
    this.radius = r;
  }

  distanceFromMouse() {
    let dx = this.x - this.sketch.mouseX;
    let dy = this.y - this.sketch.mouseY;
    let d = Math.sqrt(dx*dx + dy*dy);
    return d;
  }

  render() {
    if (this.radius < 0.5) {
      return;
    }
    let fn = this.shape;
    this.sketch[fn](this.x, this.y, this.radius, this.radius);
  }

}

module.exports = Point;