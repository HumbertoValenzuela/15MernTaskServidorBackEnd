// 241 Creando el Controller de Autenticación
// La parte de autenticación estará en el routing auth.js
// Crear en routes auth.js, agregarlo en el archivo principal index.js app.use('/api/auth', require('./routes/auth') );
// crear un router.post Validaciones
// Crear un controller authController.js y importar a routes auth.js

// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar Sesión
// api/auth
router.post( '/',
  // [    
  //   check('email', 'Agrega un email válido').isEmail(),
  //   check('password', 'El password debe ser mínimo 6 caracteres').isLength( { min: 6 } )
  // ],
  authController.autenticarUsuario 
);

router.get( '/',
  // localStorage token
  auth,
  authController.usuarioAutenticado
)
module.exports = router; // al importar el router se quita el error