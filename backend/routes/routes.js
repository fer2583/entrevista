const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/buttonController');

// Ruta crear Boton
router.post('/buttons', buttonController.crearBoton);

// Ruta registrar Click en un botón
router.post('/buttons/:id/clicks', buttonController.cantidadClick);

// Ruta para todos los botones
router.get('/buttons', buttonController.obtenerBotones);

// Ruta para un botón específico
router.get('/buttons/:id', buttonController.obtenerUnBoton);

// Ruta para eliminar un botón
router.delete('/buttons/:id', buttonController.borrarBoton); 

module.exports = router;

