import React, { useState, useRef, useEffect } from "react";
import Sketch from "react-p5";
import imageSrc from "../../assets/Copy of Photo_2023-09-20_200609_1.jpg"
const MovableImageCanvas = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [deformedImage, setDeformedImage] = useState(null);
  const [isDeforming, setIsDeforming] = useState(false);
  const pixelationLevel = useRef(0);
  const increasing = useRef(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval = setInterval(() => {
      if (increasing.current) {
        pixelationLevel.current += 0.20;
        if (pixelationLevel.current > 100) {
          increasing.current = false;
        }
      } else {
        pixelationLevel.current -= 0.20;
        if (pixelationLevel.current < 3) {
          increasing.current = true;
        }
      }

      if (!increasing.current && pixelationLevel.current <= 0) {
        setIsDeforming(false);
        setDeformedImage(null);
      }
    }, 5);

    return () => clearInterval(interval);
  }, []);

  const setup = (p5, canvasParentRef) => {
    const canvasWidth = 500; // Ancho deseado del canvas
    const canvasHeight = 300; // Alto deseado del canvas

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);

    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");

    loadImage(imageSrc, p5)
      .then((firstImage) => {
        firstImage.resize(canvasWidth, canvasHeight);
        setOriginalImage(firstImage);
        setDeformedImage(firstImage);
      })
      .catch((error) => console.error("Error loading image:", error));
  };

  const loadImage = (imageUrl, p5) => {
    return new Promise((resolve) => {
      p5.loadImage(imageUrl, (img) => {
        resolve(img);
      });
    });
  };

  const draw = (p5) => {
    if (originalImage && deformedImage) {
      const imgWidth = originalImage.width;
      const imgHeight = originalImage.height;
      const x = (p5.width - imgWidth) / 2;
      const y = (p5.height - imgHeight) / 2;

      const maxPixelSize = 20;
      const pixelSize = maxPixelSize * (pixelationLevel.current / 100);
      const opacityFactor = pixelationLevel.current / 100;

      const imgMouseX = p5.map(p5.mouseX, 0, p5.width, 0, imgWidth);
      const imgMouseY = p5.map(p5.mouseY, 0, p5.height, 0, imgHeight);

      for (let i = 0; i < imgWidth; i += pixelSize) {
        for (let j = 0; j < imgHeight; j += pixelSize) {
          const distToMouse = p5.dist(imgMouseX, imgMouseY, i, j);

          if (distToMouse < 50) {
            const c = deformedImage.get(i, j);
            p5.fill(c[0], c[1], c[2], c[3] * (1 - opacityFactor));
            p5.noStroke();
            p5.rect(x + i, y + j, pixelSize, pixelSize);
          }
        }
      }
    }

    p5.noFill();
    p5.stroke(0);
    p5.strokeWeight(2);
    p5.rect(1, 1, p5.width - 2, p5.height - 2);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
};

export default MovableImageCanvas;
