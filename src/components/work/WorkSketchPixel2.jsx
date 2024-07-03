import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { fetchMl } from "../../services/collectionAPI";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/pop-1.png";
import backgroundAudio from "../../assets/background-audio.wav";

class MovableImage {
  constructor(img, p5, x, y, onClick) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.angle = p5.random(p5.TWO_PI); // Usar p5.TWO_PI en lugar de TWO_PI
    this.rotationSpeed = p5.random(0.001, 0.01);
    this.radius = 50;
    this.vx = p5.random(-2, 2);
    this.vy = p5.random(-2, 2);
    this.onClick = onClick;
    this.clicked = false;
  }

  display() {
    const { p5, img, x, y, angle, clicked } = this;
    p5.push();
    p5.translate(x + img.width / 2, y + img.height / 2);
    p5.rotate(angle);
    p5.translate(-img.width / 2, -img.height / 2);
    p5.image(img, 0, 0);
    if (clicked) {
      p5.stroke(255);
      p5.strokeWeight(3);
    }
    p5.pop();
  }

  isMouseOver() {
    const { p5, x, y, img } = this;
    return p5.mouseX >= x && p5.mouseX <= x + img.width && p5.mouseY >= y && p5.mouseY <= y + img.height;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.rotationSpeed;

    if (this.x <= 0 || this.x + this.img.width >= this.p5.width) {
      this.vx *= -1;
    }
    if (this.y <= 0 || this.y + this.img.height >= this.p5.height) {
      this.vy *= -1;
    }
  }

  handleClick() {
    if (this.isMouseOver()) {
      this.clicked = !this.clicked;
      this.onClick();
    }
  }
}

const MovableImageCanvas = () => {
  const [movableImages, setMovableImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(backgroundAudio);
    audio.loop = true;
    audio.play().catch((error) => console.error("Error playing audio:", error));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const setup = async (p5, canvasParentRef) => {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);

    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");

    p5.loadImage(backgroundImage, (img) => {
      p5.image(img, 0, 0, p5.width, p5.height);
    });

    try {
      const collection = await fetchMl();
      const images = await loadImages(collection, p5);

      const movableImages = images.map((img, index) => {
        return new MovableImage(
          img,
          p5,
          p5.random(p5.width - img.width),
          p5.random(p5.height - img.height),
          () => navigate("/")
        );
      });

      setMovableImages(movableImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadImages = async (collection, p5) => {
    const imageUrls = collection.map((item) => item.Image);

    const isMobile = window.innerWidth <= 768;
    const imgWidth = isMobile ? 100 : 180;

    const loadedImages = await Promise.all(
      imageUrls.map(
        (imageUrl) =>
          new Promise((resolve) => {
            p5.loadImage(imageUrl, (img) => {
              img.resize(imgWidth, 0);
              resolve(img);
            });
          })
      )
    );

    return loadedImages;
  };

  const draw = (p5) => {
    p5.clear();
    movableImages.forEach((movableImage) => {
      movableImage.move();
      movableImage.display();
    });
  };

  const mousePressed = (p5) => {
    movableImages.forEach((movableImage) => movableImage.handleClick());
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </div>
  );
};

export default MovableImageCanvas;
