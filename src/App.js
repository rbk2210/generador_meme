import './App.css';
import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [linea1, setLinea1] = useState('');
  const [linea2, setLinea2] = useState('');
  const [imagen, setImagen] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  const onChangeLinea1 = function(evento) {
    setLinea1(evento.target.value);
  };

  const onChangeLinea2 = function(evento) {
    setLinea2(evento.target.value);
  };

  const handleFileChange = function(evento) {
    const file = evento.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const img = document.getElementById('img');
    if (imgSrc) {
      img.src = imgSrc;
    }
  }, [imgSrc]);

  const onClickExportar = function(evento) {
    html2canvas(document.querySelector("#meme")).then(canvas => {
      var imgData = canvas.toDataURL("image/png");
      var link = document.createElement('a');
      link.download = `${imagen}-meme.png`;
      link.href = imgData;
      link.click();
    });
  };

  return (
    <div className="App">
      <div class="form_container">
        <form class="formulario">
          <h1 class="title">Generador de Memes</h1>
          <input type="file" name="foto" class="foto" id="foto" accept="image/*" onChange={handleFileChange} />
          <label for="foto" class="foto" id="foto_label">Seleccionar imagen</label>
        </form>
      </div>
      <br />

      <input onChange={onChangeLinea1} type='text' placeholder='linea1' /><br />
      <input onChange={onChangeLinea2} type='text' placeholder='linea2' /><br />
      <button onClick={onClickExportar}>Exportar</button>

      <div className='meme' id='meme'>
        <span>{linea1}</span> <br />
        <span>{linea2}</span>
        <div class="img_container">
          <img src="" id="img" alt="Imagen" />
        </div>
      </div>
    </div>
  );
}

export default App;