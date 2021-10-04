// 246 Verificando si el usuario esta autenticado para crear nuevos proyectos
// Creación de un middleware
// importar middleware a routes proyectos y agregar a router
// ir postman - obtener un token - en proyectos - header - agregar x-auth-token y el value pegar el token.
// respuesta el token en la terminal 
// Revisar si no hay token. probar agregando un get en proyectos y luego probar en el navegador
// validar el token. // token verificado, enviar token y palabra secreta
// Agregar usuario,  debido a que en el usuarioController - payload va nombre. Con esto podemos acceder al id
// En postman - send - y encuentra el proyecto pero no agrega el nombre
// Guardar nombre - proyecto controller - agregar el nombre
// Para validar
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Leer el token del header
  const token = req.header('x-auth-token');// En cada request se envia
  console.log(token);

  // Revisar si no hay token
  if ( !token) {
    return res.status(401).json( { msg: 'No hay token permiso no valido'});
  }

  // validar el token
  try {
    // token verificado, enviar token y palabra secreta
    const cifrado = jwt.verify(token, process.env.SECRETA);
    // Agregar usuario,  debido a que en el usuarioController - payload va nombre. Con esto podemos acceder al id
    req.usuario = cifrado.usuario;// una vez autenticado se tiene toda la info de ese usuario
    // Para ir al sgte Middleware
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json( { msg: 'token no valido'});
  }
}