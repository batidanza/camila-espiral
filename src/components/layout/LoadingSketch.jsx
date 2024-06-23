import React, { useState } from "react";
import Sketch from "react-p5";

export default () => {
  const [x, setX] = useState(3);
  const [y, setY] = useState(3);
  const [dragging, setDragging] = useState(false);

  

  const setup = (p5, canvasParentRef) => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
  
    // Establecer propiedades de estilo al canvas
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-2');
    p5.clear();
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };
  

  const draw = (p5) => {
    p5.background(255, 255, 255);
    p5.noFill();

    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 68; i++) {
      p5.push();
      p5.rotate(p5.sin(p5.frameCount + i) * 1400);

      // Utilizar el color British Green
      const britishGreen = {
        r: 0,
        g: 0,
        b: 0
      };

      p5.stroke(britishGreen.r, britishGreen.g, britishGreen.b);

      p5.circle(x, y, 200 - i * 3, 200 - i / 3, 200 - i);
    
      p5.pop();
    }
  };

  const mousePressed = (p5) => {
    const distance = p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY);
    if (distance < 200) {
      setDragging(true);
    }
  };

  const mouseReleased = () => {
    setDragging(false);
  };

  const mouseDragged = (p5) => {
    if (dragging) {
      setX(p5.mouseX - p5.width / 2);
      setY(p5.mouseY - p5.height / 2);
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
      mouseDragged={mouseDragged}
    />
  );
};
