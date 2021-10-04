// 244 Agregando Routing y Controllers para Proyectos

const express = require('express');
const router = express.Router();
// importar el controller usuario
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } =  require('express-validator');

// El EndPoint es un request de tipo POST a la URL api/proyectos
// Crear un proyectos
router.post( '/',
auth,
[
  // 247 Validación a los Proyectos
  // leer de proyecto controller - validationResult
  check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
],
// Método que se ejecuta una vez realizado un post
proyectoController.crearProyecto
);

// Ontener todos los proyectos api/proyectos
router.get( '/',
  auth,// se esta guardando como parte del request el usuario que este autenticado.  
  proyectoController.obtenerProyectos
);

//Actualizar proyectos via ID  api/proyectos
router.put( '/:id', 
  auth, 
  [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.actualizarProyecto
);

//Eliminar un proyecto via ID  api/proyectos
router.delete( '/:id', 
  auth,  
  proyectoController.eliminarProyecto
);

module.exports = router; // al importar el router se quita el error