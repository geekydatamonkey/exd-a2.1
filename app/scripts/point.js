// point.js
'use strict';


class Point {

  constructor() {
    this.shape = 'ellipse';
    this.radius = 1;
    this.x = 0;
    this.y = 0;
    this.sketch = null;
    this.rippleStartTime = 0;
    this.rippleLength = 1000000;
    this.click = null;
    this.maxRadius = 20;
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

  distanceFrom(x,y) {
    let dx = this.x - x;
    let dy = this.y - y;
    let d = Math.sqrt(dx*dx + dy*dy);
    return d;
  }

  beginRippling(clickX,clickY) {
    this.rippleStartTime = (new Date()).getTime();
    this.click = {
      x: clickX,
      y: clickY
    };
  }

  getRadius() {
    
    // no ripple started
    if (this.rippleStartTime === null) {
      return this.radius;
    }

    // how long is ripple going?
    let t = (new Date()).getTime() - this.rippleStartTime;

    // stop ripple if longer than ripple length;
    if (t > this.rippleLength) {
      this.rippleStartTime = null;
      return this.radius;
    }

    // rippling
    let π = Math.PI;

    // damped wave equation
    let d = Math.max(this.distanceFrom(this.click.x, this.click.y), 1);
    let scaleFactor = Math.exp(-1*t/(π * 1000))*Math.cos(π*t/1000) + 1;
    
    let r = Math.max(scaleFactor*200/d,1);
    console.log(r);
    this.radius = r;
    return this.radius;
  }

  render() {
    let r = this.getRadius();
    if (r < 1) {
      return;
    }
    let fn = this.shape;
    this.sketch[fn](this.x, this.y, r, r);
  }

}

module.exports = Point;