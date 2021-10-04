const express = require('express');
const router = express.Router();
// importar el controller tarea
const tareaController = require('../controllers/tareaController');
// usuario tiene que estar autenticado
const auth = require('../middleware/auth');
// validación
const { check } =  require('express-validator');

// creat una tarea api/tareas
router.post('/',
  auth,
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
  ],
  tareaController.creartarea
);

// Obtener las tareas por proyecto
router.get('/',
  auth,
  tareaController.obtenerTareas
);


// Actualizar las tareas por proyecto
router.put('/:id',
  auth,
  tareaController.actualizarTareas
);

// Eliminar las tareas por proyecto
router.delete('/:id',
  auth,
  tareaController.eliminarTareas
);
module.exports = router;