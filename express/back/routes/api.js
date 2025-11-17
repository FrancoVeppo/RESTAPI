var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var usuariosModel = require('./../models/usuariosModel'); 
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer'); // <--- Ya estaba importado

/* GET /api/novedades (Existente) */
router.get('/novedades', async function (req, res, next) {
  // (Código de Novedades que ya funciona)
  let novedades = await novedadesModel.getNovedades();
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 960, height: 200, crop: 'fill'
      });
      return { ...novedad, imagen };
    } else {
      return { ...novedad, imagen: '' };
    }
  });
  res.json(novedades);
});


/* --- POST /api/contacto (ACTUALIZADO) --- */
router.post('/contacto', async (req, res) => {

  // 1. Preparamos el correo (según el PDF [cite: 2908-2911])
  const mail = {
    to: 'franconahueljoseveppo@gmail.com', // (El email de "dueño" del sitio)
    subject: 'Contacto desde la Web',
    html: `${req.body.nombre} se contactó a traves de la web y quiere más informacion a este correo: ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`
  }

  // 2. Configuramos el "transport" (el que envía)
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }); // [cite: 2912-2917]

  // 3. Enviamos el correo
  try {
    await transport.sendMail(mail); // [cite: 2918]
    
    // 4. Respondemos al frontend
    res.status(201).json({
      error: false,
      message: 'Mensaje enviado'
    }); // [cite: 2919-2922]

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Error al enviar el mensaje'
    });
  }
});


/* POST /api/login (Existente) */
router.post('/login', async (req, res, next) => {
  // (Código de Login que ya funciona)
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;
    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      req.session.rol = data.rol;
      res.json({ error: false, message: 'Login exitoso', nombre: data.usuario, rol: data.rol });
    } else {
      res.json({ error: true, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: true, message: 'Error en el servidor' });
  }
});

/* GET /api/logout (Existente) */
router.get('/logout', function(req, res, next) {
  // (Código de Logout que ya funciona)
  req.session.destroy();
  res.json({
    error: false,
    message: 'Sesión cerrada'
  });
});

module.exports = router;