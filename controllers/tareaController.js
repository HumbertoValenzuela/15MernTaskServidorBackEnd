const Tarea = require('../Models/Tarea');
// Antes de insertar una tarea, debe tener un proyecto
const Proyecto = require('../Models/Proyecto');

const { validationResult } = require('express-validator');

// crea una nueva tarea
exports.creartarea = async ( req, res ) => {
  
    // Revisar si hay errores
  const errores = validationResult( req );

  if( !errores.isEmpty() ) {//Si no esta vacio
    // Mostrar los errores
    return res.status(400).json({ errores: errores.array() })
  }
  
  
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    // Si existe proyecto
    const existeProyecto = await Proyecto.findById( proyecto );

    // Si no existe el proyecto
    if ( !existeProyecto ) {
      return res.status(404).json( { msg: 'Proyecto no encontrado'} );
    }
    
    // Revisar si el proyecto actual pertenece al usuario autenticado
    // creador: ObjectId("614f7e1be9c9afdf705625bb") convertir a string
    if ( existeProyecto.creador.toString() !== req.usuario.id ) {
      // 401 prohibido
      return res.status(401).json( { msg: 'No autorizado' })
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body); //req.body tiene el nombre de proyecto y la tarea
    // Guardar tarea
    await tarea.save();
    // Imprimir la tarea que se agrego
    res.json( { tarea } );

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error Tarea controller');
  }

}

// 255 Obtener tareas por proyecto
// get, filtrar por proyecto. Obtener tareas relacionadas a un proyecto
exports.obtenerTareas = async( req, res ) => {

  try {
       // Extraer el proyecto y comprobar si existe
      //  const { proyecto } = req.body;

      const { proyecto } = req.query;
      //  console.log( req.query );

       // Si existe proyecto
       const existeProyecto = await Proyecto.findById( proyecto );
       // Si no existe el proyecto
       if ( !existeProyecto ) {
         return res.status(404).json( { msg: 'Proyecto no encontrado'} );
       }
       
       // Revisar si el proyecto actual pertenece al usuario autenticado
       // creador: ObjectId("614f7e1be9c9afdf705625bb") convertir a string
       if ( existeProyecto.creador.toString() !== req.usuario.id ) {
         // 401 prohibido
         return res.status(401).json( { msg: 'No autorizado' })
       }

      //  Obtener las tareas por proyecto
      // const tareas = await Tarea.find( { proyecto } );
      const tareas = await Tarea.find( { proyecto } ).sort({ creado: -1});
      res.json( { tareas } );

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error Tarea controller');
  }
}

// 256 Actualizar Tareas de incompleta a completa
exports.actualizarTareas = async (req, res) => {
  
  try {
    
    // Extraer la infor del proyecto  
    const { proyecto, nombre, estado } = req.body;

    // Si la tarea Existe o no
    let tarea = await Tarea.findById( req.params.id );   
    
    if ( !tarea ) {      
      return res.status(404).json( { msg: 'No existe esa tarea' });
    }

    // Extraer proyecto, para comprobar
    const existeproyecto = await Proyecto.findById( proyecto)

    // Revisar si el proyecto actual pertenece al
    if ( existeproyecto.creador.toString() !== req.usuario.id ) {
      // 401 prohibido
      return res.status(401).json( { msg: 'No autorizado' })
    }

    // Nuevo proyecto, será un objeto vacio
    const nuevoTarea = {};
    
    // Al mandar el objeto completo quitar los if
    // if( nombre ) {
      nuevoTarea.nombre = nombre;
    // }
  
    // if( estado ) { 
      nuevoTarea.estado = estado;
    // }

    // Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id : req.params.id }, nuevoTarea, { new: true });

    res.json( {  tarea } );

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error actualizar proyecto');
  }
    
    
}

// 256 Actualizar Tareas de incompleta a completa
exports.eliminarTareas = async (req, res) => {
  
  try {
    
    // Extraer la infor del proyecto  
    // const { proyecto } = req.body;
    const { proyecto } = req.query;

    // Si la tarea Existe o no
    let tarea = await Tarea.findById( req.params.id );   
    
    if ( !tarea ) {      
      return res.status(404).json( { msg: 'No existe esa tarea' });
    }

    // Extraer proyecto
    const existeproyecto = await Proyecto.findById( proyecto)

    if ( existeproyecto.creador.toString() !== req.usuario.id ) {
      // 401 prohibido
      return res.status(401).json( { msg: 'No autorizado' })
    }
    
    // eliminar la tarea
    await Tarea.findOneAndRemove({ _id : req.params.id });
    
    res.json( {  msg: 'Tarea Eliminada ' } );

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error actualizar proyecto');
  }
    
    
}