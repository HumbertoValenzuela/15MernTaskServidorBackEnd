// 234 Definiendo un Modelo de Usuarios con Mongoose
// Estructura que tendrá la BD y los registros Schema
const mongoose = require('mongoose');

// definir la estructura de la BD
const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
    // MongoDB antes de hacer la insert en la BD elimina los espacios en blanco
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fechaRegistro: {
    type: Date,
    // Al generar el nuevo registro
    default: Date.now()
  }

});
// Usuario Es el nombre del Modelo
module.exports = mongoose.model('Usuario', UsuariosSchema);

