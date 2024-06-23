import React, { useState } from "react";
import Sketch from "react-p5";
import { fetchCollection } from "../../services/collectionAPI";
import { useNavigate } from "react-router-dom";
import img6 from "../../assets/Copia de IMG_3027.jpg"; // Importar la imagen de fondo
import customCursor from "../../assets/cursor 2.png"
class MovableImage {
  constructor(img, p5, x, y, name, onClick) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.name = name;
    this.angle = 0;
    this.radius = 50;
    this.vx = p5.random(-2, 2); // Velocidad en el eje X
    this.vy = p5.random(-2, 2); // Velocidad en el eje Y
    this.onClick = onClick; // Callback de clic
  }

  display() {
    const { p5, img, x, y } = this;
    p5.push();
    p5.image(img, x, y);
    p5.fill(255);
    p5.textAlign(p5.CENTER);
    p5.text(x + img.width / 2, y + img.height + 20);
    p5.pop();

    // Detectar clic en la imagen
    if (p5.mouseIsPressed && this.isMouseOver()) {
      this.onClick();
    }
  }

  isMouseOver() {
    const { p5, x, y, img } = this;
    return (
      p5.mouseX >= x &&
      p5.mouseX <= x + img.width &&
      p5.mouseY >= y &&
      p5.mouseY <= y + img.height
    );
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en los límites del canvas
    if (this.x <= 0 || this.x + this.img.width >= this.p5.width) {
      this.vx *= -1;
    }
    if (this.y <= 0 || this.y + this.img.height >= this.p5.height) {
      this.vy *= -1;
    }
  }
}

const MovableImageCanvas = () => {
  const [movableImages, setMovableImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const navigate = useNavigate();

  const setup = async (p5, canvasParentRef) => {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);

    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");
    canvas.style("position", "absolute");
    canvas.style("left", "0");
    canvas.style("top", "0");

    try {
      const collection = await fetchCollection();
      const images = await loadImages(collection, p5);

      p5.loadImage(img6, (img) => {
        setBackgroundImage(img);
      });

      const movableImages = images.map((img, index) => {
        return new MovableImage(
          img,
          p5,
          p5.random(p5.width - img.width),
          p5.random(p5.height - img.height),
          null,
          () => {
            navigate("/");
          }
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
              img.resize(300, 0);
              resolve(img);
            });
          })
      )
    );

    return loadedImages;
  };

  const draw = (p5) => {
    p5.background(255); // Limpia el fondo

    // Dibujar imagen de fondo si está disponible
    if (backgroundImage) {
      p5.push();
      p5.imageMode(p5.CENTER);
      p5.image(
        backgroundImage,
        p5.width / 2,
        p5.height / 2,
        backgroundImage.width,
        backgroundImage.height
      );
      p5.pop();
    }

    let isAnyImageHovered = false;

    movableImages.forEach((movableImage) => {
      movableImage.move();
      movableImage.display();
      if (movableImage.isMouseOver()) {
        isAnyImageHovered = true;
      }
    });

    const canvasElement = p5.canvas;
    if (isAnyImageHovered) {
      canvasElement.style.cursor = `url(${customCursor}), auto`;
    } else {
      canvasElement.style.cursor = ""; // Use default cursor from global CSS
    }
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default MovableImageCanvas;
