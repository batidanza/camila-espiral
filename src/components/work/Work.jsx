import React, { useState } from "react";
import Sketch from "react-p5";
import { fetchCollection } from "../../services/collectionAPI";
import { useNavigate } from "react-router-dom";
import img6 from "../../assets/raja.jpg"; // Import your background image
import customCursor from "../../assets/cursor2.png"; // Import your custom cursor image

class MovableImage {
  constructor(img, p5, x, y, id, onClick) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.id = id;
    this.angle = 0;
    this.radius = 50;
    this.vx = p5.random(-2, 2); // X-axis velocity
    this.vy = p5.random(-2, 2); // Y-axis velocity
    this.onClick = onClick; // Click callback
  }

  display() {
    const { p5, img, x, y } = this;
    p5.push();
    p5.image(img, x, y);
    p5.fill(255);
    p5.textAlign(p5.CENTER);
    p5.text(x + img.width / 2, y + img.height + 20);
    p5.pop();
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

    // Bounce off canvas edges
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
    canvas.style("z-index", "-1");
    
    canvas.style("left", "0");
    canvas.style("top", "0");

    try {
      const collection = await fetchCollection();

      p5.loadImage(img6, (img) => {
        setBackgroundImage(img);
      });

      const shuffledCollection = collection.sort(() => Math.random() - 0.5);

      const images = await loadImages(shuffledCollection, p5);
      
      const movableImages = shuffledCollection.map((item, index) => {
        return new MovableImage(
          images[index],
          p5,
          p5.random(p5.width - images[index].width),
          p5.random(p5.height - images[index].height),
          item.ID,
          (id) => {
            navigate(`/collection/${id}`);
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
    const isMobile = window.innerWidth <= 768;

    const loadedImages = await Promise.all(
      imageUrls.map(
        (imageUrl) =>
          new Promise((resolve) => {
            p5.loadImage(imageUrl, (img) => {
              if (isMobile) {
                img.resize(130, 0); // Resize to 130px wide on mobile
              } else {
                img.resize(260, 0); // Resize to 260px wide on desktop
              }
              resolve(img);
            });
          })
      )
    );

    return loadedImages;
  };

  const draw = (p5) => {
    p5.background(255); // Clear the background

    // Draw background image if available
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

    // Draw and move images
    for (let i = 0; i < movableImages.length; i++) {
      const movableImage = movableImages[i];
      movableImage.move();
      movableImage.display();
      if (movableImage.isMouseOver()) {
        isAnyImageHovered = true;
      }
    }

    // Check for clicks on images from topmost to bottommost
    if (p5.mouseIsPressed) {
      for (let i = movableImages.length - 1; i >= 0; i--) {
        const movableImage = movableImages[i];
        if (movableImage.isMouseOver()) {
          movableImage.onClick(movableImage.id);
          break;
        }
      }
    }

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
      <BritishGreenAnimation />
    </div>
  );
};

const BritishGreenAnimation = () => {
  const [x, setX] = useState(3);
  const [y, setY] = useState(3);
  const [dragging, setDragging] = useState(false);

  const setup = (p5, canvasParentRef) => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
  
    // Set canvas style properties
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

    for (let i = 0; i < 85; i++) {
      p5.push();
      p5.rotate(p5.sin(p5.frameCount + i) * 1200);

      // Use British Green color
      const britishGreen = {
        r: 0,
        g: 0,
        b: 0
      };

      p5.stroke(britishGreen.r, britishGreen.g, britishGreen.b);

      p5.circle(x, y, 250 - i * 3, 250 - i / 3, 250 - i);
    
      p5.pop();
    }
  };

  const mousePressed = (p5) => {
    const distance = p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY);
    if (distance < 250) {
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

export default MovableImageCanvas;
