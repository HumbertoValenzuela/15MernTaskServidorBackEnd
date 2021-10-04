const Proyecto = require('../Models/Proyecto');
const Tarea = require('../Models/Tarea');
const { validationResult } = require('express-validator');

exports.crearProyecto = async ( req, res ) => {
  // 245 Insertando Nuevos Proyectos
  // importar modelo proyecto. crear un nuevo proyecto, guardar y enviar respuesta. Al probar con postMan se guarda registro en BD
  
  try {

      // Revisar si hay errores
    const errores = validationResult( req );

    if( !errores.isEmpty() ) {//Si no esta vacio
      // Mostrar los errores
      return res.status(400).json({ errores: errores.array() })
    }
    
    // Crear un nuevo proyecto  
    const proyecto = new Proyecto( req.body ); // req.body nombre

    // Guardar el creador via JWT
    // Creador viene del Schema. esta unido a Usuario. usuario.id viene del payload de usuarioContraller
    proyecto.creador = req.usuario.id;

    // Guardar Proyecto
    proyecto.save();
    res.json(proyecto);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error proyecto controller');
  }

}

// 248 Obtener Proyectos en JSON que esta autenticado. Routes proyecto trabajar con el get, revisar que esta autenticado,
// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async ( req, res ) => {

  try {
    //console.log(req.usuario);// { id: '614f7e1be9c9afdf705625bb' }
    // Se tiene importado el modelo Proyecto, se puede usar el método para hacer una consulta a la BD
    const proyectos = await Proyecto.find( { creador: req.usuario.id} ).sort({ creado: -1 });
    res.json( { proyectos } );// se obtiene todos los proyectos

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error obtener proyecto');
  }
}

// 249 Actualizar Proyectos con PUT
// Agregar en proyectos un router
exports.actualizarProyecto = async ( req, res ) => {

  
  // Revisar si hay errores
  const errores = validationResult( req );
  
  if( !errores.isEmpty() ) {//Si no esta vacio
    // Mostrar los errores
    return res.status(400).json({ errores: errores.array() })
  }
  
  // Extraer la infor del proyecto  
  const { nombre } = req.body;
  
  // Nuevo proyecto, será un objeto vacio
  const nuevoProyecto = {};
  
  if( nombre ) {
    nuevoProyecto.nombre = nombre;
  }
  
  try {

    // 250 Revisando si un Proyecto existe o no
    // Revisar el ID
    // http://localhost:4000/api/proyectos/614fb5fe381cee0e343b9bdb
    // obtiene el id de la petición
    // console.log(req.params.id);
    let proyecto = await Proyecto.findById( req.params.id );

    // SI el proyecto existe o no
    if( !proyecto ) {
      // Mostrar los errores
      return res.status(404).json( { msg: 'Proyecto no encontrado' })
    }
    // Verificar el creador del proyecto
    // creador: ObjectId("614f7e1be9c9afdf705625bb") convertir a string
    if ( proyecto.creador.toString() !== req.usuario.id ) {
      // 401 prohibido
      return res.status(401).json( { msg: 'No autorizado' })
    }

    // Actualizar
    proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true })

    // Retornar respuesta como json
    res.json( {proyecto } );

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error actualizar proyecto');
  }
}

// Eliminar un proyecto por el id
exports.eliminarProyecto = async ( req, res) => {

  try {
    
    // Revisar el ID   
    // console.log(req.params.id);
    let proyecto = await Proyecto.findById( req.params.id );

    // SI el proyecto existe o no
    if( !proyecto ) {
      // Mostrar los errores
      return res.status(404).json( { msg: 'Proyecto no encontrado' })
    }
    // Verificar el creador del proyecto
    // creador: ObjectId("614f7e1be9c9afdf705625bb") convertir a string
    if ( proyecto.creador.toString() !== req.usuario.id ) {
      // 401 prohibido
      return res.status(401).json( { msg: 'No autorizado' })
    }

    // Eliminar el Proyecto
    await Proyecto.findOneAndRemove( { _id: req.params.id});

   

    // await Proyecto.fin
    res.json({ msg: 'Proyecto Eliminado'})

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error eliminar proyecto');
  }

}