import React, { useState } from "react";
import Sketch from "react-p5";
import { fetchCollection } from "../../services/collectionAPI";

class MovableImage {
  constructor(img, p5, x, y, name) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.name = name;
  }

  display() {
    const { p5, img, x, y, name } = this;
    p5.push();
    p5.image(img, x, y);
    p5.pop();
  }
}

const MovableImageCanvas = () => {
  const [movableImages, setMovableImages] = useState([]);

  const setup = async (p5, canvasParentRef) => {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);

    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");

    try {
      const collection = await fetchCollection();
      const images = await loadImages(collection, p5);

      const movableImages = images.map((img, index) => {
        const name = collection[index].Name;
        return new MovableImage(
          img,
          p5,
          p5.random(p5.width - img.width),
          p5.random(p5.height - img.height),
          name
        );
      });

      setMovableImages(movableImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadImages = async (collection, p5) => {
    const imageUrls = collection.map((item) => item.Image);

    const loadedImages = await Promise.all(
      imageUrls.map(
        (imageUrl) =>
          new Promise((resolve) => {
            p5.loadImage(imageUrl, (img) => {
              img.resize(200, 0);
              resolve(img);
            });
          })
      )
    );

    return loadedImages;
  };

  const draw = (p5) => {
    p5.background(255, 0, 0);

    movableImages.forEach((movableImage) => {
      movableImage.display();
    });
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default MovableImageCanvas;
