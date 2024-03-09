
import { useRef } from 'react';
import './App.css';
import image1 from './images/sketchFlor4.png' 
import image2 from './images/sketchGarden5.png'
import image3 from './images/sketchImage6.png'



let names = [
  { name: "sketch4", concept: "draw images" }, 
  { name: "sketch5", concept: "draw shapes" },
  { name: "sketch6", concept: "draw circules"}
  ] 

function App() {

  const refImage = useRef();
  const refConcept = useRef();

const cambiarImagen = (e) => {
  if (e.target.src.includes('sketchImage')) {
    e.target.style.visibility = "hidden"
  }else {
    e.target.src = image3
  }
  e.target.parentNode.style.backgroundColor="red"
}



const changeText = (e) => {
  if (e.target.innerHTML == 'visto') {
    e.target.innerHTML = ""
  } else {
    e.target.innerHTML = "visto"
  }
}

  return (
    <div className="images">

      <div ref={refImage} className='image-container'>
        <img onClick={cambiarImagen} className='image' src={image1}/>
        <div className='nombre'> {names[0].name} </div>
  
      </div>

      <div className='image-container'>
        <img onClick={cambiarImagen} className='image' src={image2}/>
        <div className='nombre'> {names[1].name} </div>
        <div onClick={changeText} className='concept'>{names[1].concept}</div>
      </div>


    </div>
  );
}

export default App;
