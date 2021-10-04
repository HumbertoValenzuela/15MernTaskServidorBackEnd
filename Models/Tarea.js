// 252 Creando el Modelo Tarea
const { Schema, model }  = require('mongoose');

// definir la estructura de la BD
const TareaSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
    // MongoDB antes de hacer la insert en la BD elimina los espacios en blanco
  },
  estado: {
    type: Boolean,
    default: false
  },
  // Para ordenar
  creado: {
    type: Date,
    default: Date.now()
  },
  proyecto: {
    // De esta forma cada usuario tiene su propio id, guardar como una referencia
    type: Schema.Types.ObjectId,
    // ref tiene que ser el nombre del modelo. Así sabrá a que pertenece el ObjectId
    ref: 'Proyecto'    
  }

});


// Proyecto Es el nombre del Modelo
module.exports = model('Tarea', TareaSchema);