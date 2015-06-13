// point.js
'use strict';


class Point {

  constructor() {
    this.shape = 'rect';
    this.radius = 1;
    this.x = 0;
    this.y = 0;
  }

  setPosition(x,y) {
    this.x = x;
    this.y = y;
  }

  render(sketch) {
    let fn = this.shape;
    sketch[fn](this.x, this.y, this.radius, this.radius);
  }

}

module.exports = Point;