const Button = require('../models/button');

// Metodo Crear Boton
exports.crearBoton = async (req, res) => {
  try {
    const { text } = req.body;
    const button = await Button.create({ text });
    res.status(201).json(button);
  } catch (error) {
    console.error('Error al crear el botón:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el botón' });
  }
};

// Metodo para registrar Clicks
exports.cantidadClick = async (req, res) => {
  try {
    const { id } = req.params;
    const button = await Button.findByPk(id);
    if (!button) {
      return res.status(404).json({ error: 'Botón no encontrado' });
    }
    button.clicks++;
    await button.save();
    res.json(button);
  } catch (error) {
    console.error('Error al registrar el clic:', error);
    res.status(500).json({ error: 'Ocurrió un error al registrar el clic' });
  }
};

// Metodo para Borrar Boton
exports.borrarBoton = async (req, res) => {
  try {
    const { id } = req.params;
    const button = await Button.findByPk(id);
    if(!button){
      return res.status(404).json({error:'boton no encontrado'})
    }
    await button.destroy();
    res.json({message: "boton eliminado correctamente"});
  } catch (error) {
    console.error('error al eliminar el boton', error);
    res.status(500).json({ error: "ocurrio un error cuando se estaba eliminando el boton"})
  }
};

// Metodo para obtener todos los botones
exports.obtenerBotones = async (req, res) => {
  try {
    const buttons = await Button.findAll();
    res.json(buttons);
  } catch (error) {
    console.error('Error al obtener los botones:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los botones' });
  }
};

// Metodo para obtener un botón específico
exports.obtenerUnBoton = async (req, res) => {
  try {
    const { id } = req.params;
    const button = await Button.findByPk(id);
    if (!button) {
      return res.status(404).json({ error: 'Botón no encontrado' });
    }
    res.json(button);
  } catch (error) {
    console.error('Error al obtener el botón:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el botón' });
  }
};