// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Point = require('./point');

let config = {
  canvasWrapper: '.canvas-wrapper',
  pointSpacing: 10,
  maxRadius: 3
};

let pointList = [];

function mySketch(s){

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $(config.canvasWrapper);
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight(),
      'p2d'
    ).parent($canvasWrapper[0]);

    // modes
    s.rectMode(s.RADIUS);
    s.fill(0);

    // Create a grid of points
    for (let x = 0; x < s.width; x += config.pointSpacing ) {
      for (let y = 0; y < s.height; y += config.pointSpacing) {
        let p = new Point();
        p.setPosition(x,y);
        p.setSketch(s);
        pointList.push(p);
      }
    }

    pointList.map(function(point){
      point.render(s);
    });

  };

  s.draw = function() {
    s.clear();
    for(let i = 0; i < pointList.length; i++) {
      let p = pointList[i];
      let d = p.distanceFromMouse();
      // radius varies inversely with distance
      let r = Math.min(200/d,config.maxRadius);
      p.setRadius(r);
      p.render();
    }

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