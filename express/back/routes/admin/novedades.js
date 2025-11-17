var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

// Importaciones para la subida de imágenes (Unidad 3)
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* * GET: Listar novedades (Unidad 1 + 3)
 * Muestra la lista y agrega la imagen de cloudinary
 [cite_start]* [cite: 1145-1167]
 */
router.get('/', async function (req, res, next) {
  
  var novedades = await novedadesModel.getNovedades();

  // Mapeamos para agregar la imagen de Cloudinary
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 100,
        height: 100,
        crop: 'fill' // 'fill' o 'pad'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '' // Si no hay imagen, un string vacío
      }
    }
  });

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

/* * GET: Formulario de Agregar (Unidad 1) 
 [cite_start]* [cite: 214-218]
 */
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

/* * POST: Agregar novedad (Unidad 1 + 3)
 * Guarda la novedad y sube la imagen a Cloudinary
 [cite_start]* [cite: 1112-1130]
 */
router.post('/agregar', async (req, res, next) => {
  try {
    var img_id = ''; // Por defecto, sin imagen

    // Lógica de Cloudinary (Unidad 3)
    if (req.files && Object.keys(req.files).length > 0) {
      var imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      
      // Pasamos el img_id al modelo
      await novedadesModel.insertNovedad({
        ...req.body, // spread operator para titulo, subtitulo, cuerpo
        img_id
      });
      res.redirect('/admin/novedades');

    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó la novedad'
    });
  }
});

/* * GET: Eliminar novedad (Unidad 2 + 3)
 * Elimina de la BD y de Cloudinary
 [cite_start]* [cite: 1261-1267, 2409-2411]
 */
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  // Lógica de Cloudinary (Unidad 3): Borrar la imagen
  let novedad = await novedadesModel.getNovedadById(id);
  if (novedad.img_id) {
    await (destroy(novedad.img_id));
  }

  // Lógica de BD (Unidad 2): Borrar la novedad
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades');
});

/* * GET: Formulario de Modificar (Unidad 2) 
 [cite_start]* [cite: 2450-2456]
 */
router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});

/* * POST: Modificar novedad (Unidad 2 + 3)
 * Actualiza la BD y maneja la imagen en Cloudinary
 [cite_start]* [cite: 1226-1242, 1249-1253]
 */
router.post('/modificar', async (req, res, next) => {
  try {
    let img_id = req.body.img_original; // Mantenemos la imagen vieja
    let borrar_img_vieja = false;

    // Caso 1: El usuario marcó "Eliminar imagen actual"
    if (req.body.img_delete === "1") {
      img_id = null; // Seteamos el img_id a null
      borrar_img_vieja = true;
    } 
    // Caso 2: El usuario subió una imagen nueva
    else if (req.files && Object.keys(req.files).length > 0) {
      var imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
      borrar_img_vieja = true;
    }

    // Si borramos la imagen (Caso 1) o subimos una nueva (Caso 2)
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    // Armamos el objeto para la BD
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id // Este es el img_id nuevo, null, o el original
    }

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');

  } catch (error) {
    console.log(error);
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    });
  }
});

module.exports = router;