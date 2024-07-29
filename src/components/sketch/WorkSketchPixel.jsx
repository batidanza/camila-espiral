import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { getPhotoByArchive } from "../../services/ArchiveAPI";
import backgroundImage from "../../assets/pop-1.png";
import backgroundAudio from "../../assets/background-audio.wav";

class MovableImage {
  constructor(img, originalImg, p5, x, y) {
    this.img = img;
    this.originalImg = originalImg;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.angle = p5.random(p5.TWO_PI);
    this.rotationSpeed = p5.random(0.001, 0.01);
    this.radius = 50;
    this.vx = p5.random(-2, 2);
    this.vy = p5.random(-2, 2);
    this.clicked = false;
    this.size = 1;
    this.zooming = false;
    this.zoomSpeed = 0.010;
  }

  display() {
    const { p5, img, originalImg, x, y, angle, size, clicked } = this;
    p5.push();
    if (!clicked) {
      p5.translate(x + img.width * size / 2, y + img.height * size / 2);
      p5.rotate(angle);
      p5.translate(-img.width * size / 2, -img.height * size / 2);
      p5.image(img, 0, 0, img.width * size, img.height * size);
    } else {
      p5.translate(x, y);
      p5.image(originalImg, 0, 0, originalImg.width * size, originalImg.height * size);
    }
    p5.pop();
  }

  isMouseOver() {
    const { p5, x, y, img, size } = this;
    return (
      p5.mouseX >= x &&
      p5.mouseX <= x + img.width * size &&
      p5.mouseY >= y &&
      p5.mouseY <= y + img.height * size
    );
  }

  move() {
    if (!this.clicked) {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.rotationSpeed;

      if (this.x < 0 || this.x + this.img.width * this.size > this.p5.width) {
        this.vx *= -1;
      }
      if (this.y < 0 || this.y + this.img.height * this.size > this.p5.height) {
        this.vy *= -1;
      }
    }
  }

  handleClick() {
    if (this.isMouseOver()) {
      this.zooming = true;
      this.clicked = true;
    }
  }

  resetZoom() {
    this.size = 1;
    this.zooming = false;
    this.clicked = false;
    this.x = this.originalX;
    this.y = this.originalY;
  }

  update(p5) {
    if (this.zooming) {
      this.size += this.zoomSpeed;
      this.x = p5.width / 2 - (this.originalImg.width * this.size) / 2;
      this.y = p5.height / 2 - (this.originalImg.height * this.size) / 2;

      if (this.size > 20) {
        this.resetZoom();
        return true;
      }
    }
    return false;
  }
}

const MovableImageCanvas = () => {
  const [movableImages, setMovableImages] = useState([]);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);

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
      const collection = await getPhotoByArchive("Analogicas");
      const images = await loadImages(collection, p5);

      const movableImages = images.map((imgs, index) => {
        const [img, originalImg] = imgs;
        return new MovableImage(
          img,
          originalImg,
          p5,
          p5.random(p5.width - img.width),
          p5.random(p5.height - img.height)
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
            p5.loadImage(imageUrl, (originalImg) => {
              const img = originalImg.get();
              img.resize(imgWidth, 0);
              const originalWidth = originalImg.width * 0.4;
              originalImg.resize(originalWidth, 0);
              resolve([img, originalImg]);
            });
          })
      )
    );

    return loadedImages;
  };

  const draw = (p5) => {
    p5.clear();
    p5.background(245, 245, 245);
    if (zoomedImageIndex !== null) {
      const zoomedImage = movableImages[zoomedImageIndex];
      if (zoomedImage.update(p5)) {
        setZoomedImageIndex(null);
      } else {
        zoomedImage.display();
      }
    } else {
      movableImages.forEach((movableImage) => {
        movableImage.move();
        movableImage.display();
      });
    }
  };

  const mousePressed = (p5) => {
    if (zoomedImageIndex !== null) {
      const zoomedImage = movableImages[zoomedImageIndex];
      zoomedImage.resetZoom();
      setZoomedImageIndex(null);
    } else {
      movableImages.forEach((movableImage, index) => {
        movableImage.handleClick();
        if (movableImage.clicked) {
          setZoomedImageIndex(index);
        }
      });
    }
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </div>
  );
};

export default MovableImageCanvas;
