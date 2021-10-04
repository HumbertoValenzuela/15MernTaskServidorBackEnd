// 231 Configurando Rutas de usuarios
// 232 Agregando el Controlador para crear nuevos usuarios
// usar PostMan para la prueba POST http://localhost:4000/api/usuarios mostrará en la terminal creando usuario, no en postman
// 238 Agregando validación a la API
// En el routes usuarios se agrega la validaciones usando, es decir, antes de llamar al controlador es donde se realiza validación
// npm i express-validator
// Dentro de router en un array, usando check que campo se valida y reglas aplicadas.
// En el usuarioController importar validationResult
// Antes de la desesttructuración revisar si hay errores
// req retorna si tuvo error, lo genera como arreglo
// Al realizar una prueba con postman. Eliminar el usuario email y password - enviar - resultado será los msg de errores 
// Resumen: Las reglas van el router pero el resultado se lee en el controller
// 239 Que son los JWT JSON Web Tokens. Forma de autenticar un usuario.
// Porque en ReactJS no existen las sesiones, las sesiones son del servidor. JWT permite compartir info entre distintas aplicaciones en un objeto JSON.
// Dos aplicaciones web pueden compartir datos seguros utilizando JWT, ya que verifican la autenticidad del JSON
// Utilizar JWT: para intercambio de info  y autorización
// Partes de un JWT: 1Header: Tipo JWT y algoritmo 2Payload: info de la entidad y datos adicionales(ej: nombre de usuario) 3Signature(Firma): Verifica que el mensaje no ha cambiado en su transporte.
// Entonces cuando se tiene una aplicación separada backend de frontend la mejor forma de autenticar al usuario es con JWT porque no hay sesiones de la forma tradicional



// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
// importar el controller usuario
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//Definir el Middlewer. 
// router.post('/', () =>{
  // Para no tener un router grande, es mejor crear un controlador
  // MVC Model View Controller
  // Model Parte que interactua con la BD
  // Controller se encarga de tomar los request, conectarlo y las respuesta con el Modelo
  // View la tiene ReactJS
  // console.log('creando usuario');
// });


// El EndPoint es un request de tipo POST a la URL api/usuarios
// Crear un usuario
router.post( '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // que no este vacio
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo 6 caracteres').isLength( { min: 6 } )
  ],
  usuarioController.crearUsuario
);
module.exports = router; // al importar el router se quita el error

