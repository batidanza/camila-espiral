import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { fetchMl } from "../../services/collectionAPI";
import { useNavigate } from "react-router-dom";
import Logo from "../layout/Logo";

// Importar la imagen de fondo desde tus assets
import backgroundImage from "../../assets/pop-1.png";
// Importar el archivo de audio
import backgroundAudio from "../../assets/background-audio.wav";

class MovableImage {
  constructor(img, p5, x, y, onClick) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
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
    p5.text(name, x + img.width / 2, y + img.height + 20);
    p5.pop();

    // Detectar clic en la imagen
    if (p5.mouseIsPressed && this.isMouseOver()) {
      this.onClick();
    }
  }

  isMouseOver() {
    const { p5, x, y, img } = this;
    return p5.mouseX >= x && p5.mouseX <= x + img.width && p5.mouseY >= y && p5.mouseY <= y + img.height;
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
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar y reproducir el audio en loop
    const audio = new Audio(backgroundAudio);
    audio.loop = true;
    audio.play().catch((error) => console.error("Error playing audio:", error));

    return () => {
      // Detener el audio cuando el componente se desmonta
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

    // Cargar y mostrar la imagen de fondo
    p5.background(p5.loadImage(backgroundImage));

    try {
      const collection = await fetchMl();
      const images = await loadImages(collection, p5);

      const movableImages = images.map((img, index) => {
        return new MovableImage(img, p5, p5.random(p5.width - img.width), p5.random(p5.height - img.height), () => {
          navigate("/");
        });
      });

      setMovableImages(movableImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadImages = async (collection, p5) => {
    const imageUrls = collection.map((item) => item.Image);
    
    const isMobile = window.innerWidth <= 768; // Detectar si es un dispositivo móvil
    const imgWidth = isMobile ? 100 : 180; // Ajustar el tamaño de la imagen

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
    p5.background(p5.loadImage(backgroundImage)); // Fondo de la imagen
    movableImages.forEach((movableImage) => {
      if (!isAnimationStopped) {
        movableImage.move();
      }
      movableImage.display();
    });
  };

  const handleSkipAnimation = () => {
    setIsAnimationStopped(true);
  };

  return (
    <div>
      <button
        onClick={handleSkipAnimation}
        style={{
          position: "absolute",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          padding: "10px 20px",
          fontSize: "20px",
          backgroundColor: "transparent",
          color: "#00965e",
          border: "none",
          cursor: "pointer",
          fontFamily:"IBM-Plex-Sans_Regular, sans-serif"
        }}
      >
        Skip Animation
      </button>
      {isAnimationStopped && <Logo />} {/* Renderizar Navbar cuando la animación se detiene */}
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default MovableImageCanvas;
