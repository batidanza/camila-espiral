import { useRef } from "react";
import "./App.css";
import image0 from "./images/sketchFlor4.png";
import image1 from "./images/sketchGarden5.png";
import image2 from "./images/sketchImage6.png";


let images = [
  { image: "sketch0", concept: "flora" },
  { image: "sketch1", concept: "garden" },
  { image: "sketch2", concept: "sketchImage" },
];


function App() {
const cambio = 12.7
const refCaja = useRef()



  return (
    <div className="images">
      <button onClick={convert}>Aceptar </button>

      <div ref={refCaja} onClick={increment} className="caja">1</div>
      <div className="images-container">
        <img onClick={changeImage} className="image" src={image0} />
        <div  onClick={changeText} className="concept">{images[0].image}</div>
      </div>
      <div className="images-container">
        <img onClick={changeImage} className="image" src={image1} />
        <div  onClick={changeText} className="concept">{images[1].image}</div>
      </div>
      <div className="images-container">
        <img onClick={changeImage} className="image" src={image2} />
        <div onClick={changeText} className="concept">{images[2].image}</div>
      </div>
      <input className="input" onChange={readWrite} />
    </div>
  );
}

export default App;
