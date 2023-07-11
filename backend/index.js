const express = require('express');
const cors = require('cors');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const configuracionDB = require('./configuracionDB');

// Configuración de la base de datos
const sequelize = new Sequelize(configuracionDB.database, configuracionDB.username, configuracionDB.password, {
  host: configuracionDB.host,
  port: configuracionDB.port,
  dialect: configuracionDB.dialect,
});

const ButtonModel = require('./models/button');
const Button = ButtonModel(sequelize, DataTypes);

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

app.use(express.json());
app.use(cors());

// Rutas
app.post('/buttons', async (req, res) => {
  try {
    const { text } = req.body;
    const button = await Button.create({ text });
    res.status(201).json(button);
  } catch (error) {
    console.error('Error al crear el botón:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el botón' });
  }
});

app.post('/buttons/:id/clicks', async (req, res) => {
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
});

app.get('/buttons', async (req, res) => {
  try {
    const buttons = await Button.findAll();
    res.json(buttons);
  } catch (error) {
    console.error('Error al obtener los botones:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los botones' });
  }
});

app.get('/buttons/:id', async (req, res) => {
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
});

app.delete('/buttons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const button = await Button.findByPk(id);
    if (!button) {
      return res.status(404).json({ error: 'Botón no encontrado' });
    }
    await button.destroy();
    res.json({ message: 'Botón eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el botón:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el botón' });
  }
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});