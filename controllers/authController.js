const Usuario = require('../Models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
// 242 Revisando si el usuario existe si el password es correcto o incorrecto
// Iniciar sesión verificar si existe. Comparar el password. Todo ok crear JWT
// bcryptjs método compara password compare

exports.autenticarUsuario = async ( req, res ) => {

  // Revisar si hay errores
  const errores = validationResult( req );

  if( !errores.isEmpty() ) {//Si no esta vacio
    // Mostrar los errores
    return res.status(400).json({ errores: errores.array() })
  }

  // Extraer el email y password
  const { email, password } = req.body;

  try {

    // Revisar que se un usuario registrado
    let usuario = await Usuario.findOne( { email } );//Usuario Model

    // Si no existe usuario
    if ( !usuario ) {
      return res.status(400).json( { msg: 'El usuario no existe' } );
    }

    // Revisar el password. compara password ingresado con el de la BD
    const passCorrecto =  await bcryptjs.compare(password, usuario.password);

    if ( !passCorrecto ) {
      return res.status(400).json( { msg: 'Password incorrecto' } );
    }

    // Si todo es Correcto. Crear el JWT
     // Crear y firmat el JWT
     const payload = {
      // Info que se coloca en el payload, esta la guarda JWT
      usuario: {
        id: usuario.id // viene del usuario que se esta guardando usuario
      }
    };

    // Firma el JWT
    // SECRETA sea la misma para firma, crear usuario, autenticar usuario
    jwt.sign(payload, process.env.SECRETA, {//payload, secretOrPrivateKey
      // configuración
      expiresIn: 3600000 // 5 días
    }, ( error, token ) => {//Revisar si tiene error al crear el Token
      if ( error ) throw error;//throw marque error y deja de ejecutar

      // Mensaje de confirmación    
      res.json( { token: token } );
    } );

  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error en auth Controller');
  }
}

// Obtiene que suuario esta autenticado
exports.usuarioAutenticado = async ( req, res ) => {

  try {

    const usuario = await Usuario.findById( req.usuario.id ).select('-password');
    res.json( { usuario } );

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error en usuarioAutenticado Controller');
  }
} 