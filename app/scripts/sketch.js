// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Point = require('./point');

let config = {
  canvasWrapper: '.canvas-wrapper',
  pointSpacing: 25,
};

let pointList = [];

function mySketch(s){

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $(config.canvasWrapper);
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    // Create a grid of points
    for (let x = 0; x < s.width; x += config.pointSpacing ) {
      for (let y = 0; y < s.height; y += config.pointSpacing) {
        let p = new Point();
        p.setPosition(x,y);
        pointList.push(p);
      }
    }

    pointList.map(function(point){
      point.render(s);
    });

  };

  s.draw = function() {
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper);

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);

  };
}

function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};