const mongoose = require('mongoose');
// dotenv para las variables de entorno
require('dotenv').config( { path: '.env' } );

// Conectar base de datos
const conectarDB = async () => {

  try {
    // await mongoose.connect(url, options, callback)
    await mongoose.connect(process.env.BD_MONGO, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
      //  useFindAndModify: false
    });
    // Cuando es error de usuario y contraseña no da errores
    // pero cuando la url de conexión cambia si lo hace
    console.log('DB Conectada');

  } catch (error) {
    console.log(error);
    process.exit(1);// Detener la app
  }

}
module.exports = conectarDB;