import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    obtenerBotones();
  }, []);

  const obtenerBotones = async () => {
    try {
      const response = await axios.get('http://localhost:3000/buttons');
      setButtons(response.data);
    } catch (error) {
      console.error('Error al obtener los botones:', error);
    }
  };
  

  const agregarBoton = async () => {
    try {
      const response = await axios.post('http://localhost:3000/buttons', { text: `Botón ${buttons.length + 1}` });
      setButtons([...buttons, response.data]);
    } catch (error) {
      console.error('Error al crear el botón:', error);
    }
  };

  const borrarBoton = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/buttons/${id}`);
      obtenerBotones();
    } catch (error) {
      console.error('Error al eliminar el botón:', error);
    }
  };

  const botonClick = async (id) => {
    try {
      await axios.post(`http://localhost:3000/buttons/${id}/clicks`);
      obtenerBotones();
    } catch (error) {
      console.error('Error al registrar el clic:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Botones</h1>
      <Button variant="contained" className='agregar' onClick={agregarBoton}>Agregar Botón</Button>
      <span>
        {buttons.map((button) => (
          <div key={button.id}>
            <Button variant="outlined" className='botones' onClick={() => botonClick(button.id)}>
              {button.text} - Clicks: {button.clicks}
            </Button>
            <Button variant="contained" color="warning"  className='botones' onClick={() => borrarBoton(button.id)}><DeleteIcon /> </Button> {/* Nuevo botón de eliminar */}
          </div>
        ))}
      </span>
    </div>
  );
  
}

export default App;