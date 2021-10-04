// Controllers tendrá métodos relacionados a los EndPoint usuarios.js
const Usuario = require('../Models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async ( req, res) => {
  
  // 236 Revisando si el usuario Existe.
  // Extraer email y password
  // mongoose tiene métodos para consultas a la BD. findOne encuentra el email. Si existe res.status msg(express validator retorna mensajes). Reemplazar mensaje res.send a res.json({ msg: Usuario creado Correctamente})
  // Probar en postman usuario creado y luego usuario existe

  // 237 Hashear passwords en la base de datos
  // instalar nueva dependencia para hashear: npm i bcryptjs 
  // importar, luego de probar que el no existe y la instancia de usuario. Se puede hasear. generar salt: hash unico. Reescribir una parte del objeto. usuario.password = hash(string, salt)
  
  // 240 Creando un JWT: npm install jsonwebtoken. usar en el usuarioController, importar. Crear firmar el JWT
  // SECRETA sea la misma para firma, crear usuario, autenticar usuario
  //payload, secretOrPrivateKey, configuración
  //Revisar si tiene error al crear el Token
  // Info que se coloca en el payload, esta la guarda JWT
  // En mongodb eliminar el usuario creado - abrir postman - enviar peticion - se creará el usuario y entregará el JWT

  // Revisar si hay errores
  const errores = validationResult( req );

  if( !errores.isEmpty() ) {//Si no esta vacio
    // Mostrar los errores
    return res.status(400).json({ errores: errores.array() })
  }

  //Desestructuración Extraer email y password
  const { email, password} = req.body;

  // console.log(req.body); // se accede a los valores
  try {
    // Validar usuario registrado es unico
    // ObjectParameterError: Parameter "filter" to findOne() must be an object. Solución { email }
    let usuario =  await Usuario.findOne( { email } );

    if ( usuario ) {
      return res.status(400).json( { msg: 'El usuario ya Existe' } );
    }

    // 235 Insertando usuarios en la BD. Enviar la peticón
    // crea el nuevo usuario usando el body. importar el Modelo Usuario. Se crea un nuevo usuario desde el modelo. El Modelo contiene los campos nombre, email, password fecharegistro. Revisa la estructura que sea igual y nos crea un nuevo usuario, realiza el save y mensaje de log. PostMan enviar - se graba en mongo db el registro
    usuario = new Usuario( req.body );

    // Hashear y realizar salt unico al password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // guardar usuario
    await usuario.save();

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
    res.status(400).send('Hubo un error usuarioController');
  }
}

