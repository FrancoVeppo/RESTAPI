var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');
var md5 = require('md5');

/* GET (Muestra el formulario) */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout',
  });
});

/* POST (Procesa el login) */
router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    // CAMBIO: Comprobamos que el usuario exista Y que sea 'admin'
    if (data != undefined && data.rol === 'admin') {
      
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      req.session.rol = data.rol; // NUEVO: Guardamos el rol

      res.redirect('/admin/novedades');

    } else {
      // CAMBIO: Mensaje de error actualizado
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true,
        message: 'Usuario o contraseña incorrectos, o no tiene permisos de administrador.'
      });
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET (Logout) */
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;