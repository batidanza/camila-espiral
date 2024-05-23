import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { fetchCollection } from "../../services/collectionAPI";

class MovableImage {
  constructor(img, p5, x, y) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display() {
    this.p5.image(this.img, this.x, this.y);

    if (this.isDragging) {
      this.x = this.p5.mouseX + this.offsetX;
      this.y = this.p5.mouseY + this.offsetY;
    }
  }

  mousePressed(mx, my) {
    if (mx > this.x && mx < this.x + this.img.width && my > this.y && my < this.y + this.img.height) {
      this.isDragging = true;
      this.offsetX = this.x - mx;
      this.offsetY = this.y - my;
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}

export default () => {
  const [movableImages, setMovableImages] = useState([]);

  const setup = async (p5, canvasParentRef) => {
    // Calculate canvas dimensions
    let canvasWidth = Math.min(window.innerWidth * 0.8, 1024); // 80% of the window width or 1024px, whichever is smaller
    let canvasHeight = canvasWidth * (1.9 / 3);

    if (window.innerWidth < 780) {
      canvasWidth = window.innerWidth * 0.65;
      canvasHeight = window.innerHeight * 0.9;
    }

    // Create canvas and set parent
    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);

    // Apply CSS styles to canvas
    canvas.style("display", "block");
    canvas.style("margin", "auto");
    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");
    canvas.style("border", "2px solid black");
    canvas.style("border-radius", "10px");
    p5.textFont("Array");

    try {
      const collection = await fetchCollection(); // Obtener la colección de imágenes
      const imageUrls = collection.map(item => item.Image); // Extraer las URLs de las imágenes

      const loadImages = async () => {
        const loadedImages = [];
        for (const imageUrl of imageUrls) {
          const img = await new Promise(resolve => {
            p5.loadImage(imageUrl, img => {
              img.resize(200, 200);
              resolve(img);
            });
          });
          loadedImages.push(img);
        }
        return loadedImages;
      };

      const images = await loadImages();
      const movableImages = images.map(img => new MovableImage(img, p5, p5.random(p5.width), p5.random(p5.height)));
      setMovableImages(movableImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const draw = (p5) => {
    p5.background(255); // Clear the canvas

    // Move and display each movable image
    movableImages.forEach(movableImage => {
      movableImage.display();
    });
  };

  const mousePressed = (p5) => {
    movableImages.forEach(movableImage => {
      movableImage.mousePressed(p5.mouseX, p5.mouseY);
    });
  };

  const mouseReleased = () => {
    movableImages.forEach(movableImage => {
      movableImage.mouseReleased();
    });
  };

  return (
    <>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} />
    </>
  );
};
