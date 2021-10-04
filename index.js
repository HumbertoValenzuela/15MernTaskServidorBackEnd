// 228 Creando el Servidor de Express
// en la terminal npm run dev para iniciar el servidor de node
const express = require('express');
require('dotenv').config();
const conectarDB = require('./config/db'); //conexión mongodb
// 264 Habilitando Cors y creando usuario
const cors = require('cors');
// Instalación CORS: npm i cors Para que funcione cors eliminar de la BD los usuarios


// Crear el servidor
const app = express();

// Conectar a la Base de Datos
conectarDB();

// Habilitar CORS
app.use( cors() ); 

// 233 Enviando una petición a la API y leyendo el contenido
// express.json permite leer datos que el usuario coloca
// ¿Como leer lo que el usuario envia?
// usuarioController: req.body
// enviar header como application-json. ir postman headers - key - Content-Type - value - application/json
// Quiere decir que enviará un json. El json se envia en el body.
// portman - body - raw (Se puede escribir código json) - { "nombre": "Humberto"} - Presionar Send y se envia el json debido a que usuarioController tiene el req.body
// Habilitar express.json
app.use( express.json( { extended: true } ) );

// Puerto de la App
// const port = process.env.PORT || 4000;
// Una vez que se haga el deployment al hosting Heroku se espera que la variable de entorno se llame PORT

// Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
// auth
app.use('/api/auth', require('./routes/auth') );
// api proyectos y routes proyectos
app.use('/api/proyectos', require('./routes/proyectos') );
// api Tarea y routes tarea
app.use('/api/tareas', require('./routes/tareas') );

// Se prefiere definir el router como un archivo separado, pero acá se define la página principal. app. y despues el verbo http al que se quiere responder de la petición que el usuario realiza es get cuando se visita una url.
// Cuando se visita la página principal '/'
app.get('/', ( req, res) => {
  res.send('Hola Mundo');
})


// Arrancar la App. Agrega el PORT y el callback
app.listen(process.env.PORT, () => {
  console.log(`El servidor funcionando en puerto ${process.env.PORT}`);
});