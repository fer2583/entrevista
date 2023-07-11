const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/buttonController');

// Ruta crear Boton
router.post('/buttons', buttonController.createButton);

// Ruta registrar Click en un botón
router.post('/buttons/:id/clicks', buttonController.registerClick);

// Ruta para todos los botones
router.get('/buttons', buttonController.getAllButtons);

// Ruta para un botón específico
router.get('/buttons/:id', buttonController.getButton);

// Ruta para eliminar un botón
router.delete('/buttons/:id', buttonController.deleteButton); 

module.exports = router;

