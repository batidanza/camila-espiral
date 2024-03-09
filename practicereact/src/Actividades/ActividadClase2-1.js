import "./App.css";
import image1 from "./images/sketchFlor4.png";
import image2 from "./images/sketchGarden5.png";
import { useRef } from "react";

function App() {
  const cambio = 23.16;
  const refCaja = useRef();
  function incrementar(e) {
    e.target.innerHTML = Number(e.target.innerHTML) + 1;
    if (e.target.innerHTML >= 10) {
      e.target.innerHTML = 1;
    }
    if (e.target.innerHTML >= 8) {
      e.target.style.backgroundColor = "red";
    } else {
      e.target.style.backgroundColor = "white";
    }
  }

  const convertir = () => {
    refCaja.current.innerHTML = Number(refCaja.current.innerHTML) * cambio;
  };

  const cambiar = (e) => {
    if (e.target.src.includes("Flor")) {
      e.target.src = image2;
    } else {
      e.target.src = image1;
    }
  };

  const lectura = (e) => {
    refCaja.current.innerHTML = e.target.value;
  };

  return (
    <>
      <div ref={refCaja} className="caja" onClick={incrementar}>
        {" "}
        1{" "}
      </div>
      <button onClick={convertir}> Aceptar </button>
      <div>
        {" "}
        <img onClick={cambiar} src={image1} />{" "}
      </div>
      <input onChange={lectura} className="campo" />
    </>
  );
}

export default App;
