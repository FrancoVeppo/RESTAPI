require('dotenv').config(); // LÍNEA 1
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors'); // Para la API de React
var fileUpload = require('express-fileupload'); // Para las imágenes

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminNovedadesRouter = require('./routes/admin/novedades');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tu_clave_secreta_aqui_12345',
  resave: false,
  saveUninitialized: true
}));

// Configuración de fileUpload (Cloudinary)
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// --- Función de Seguridad (Login de Admin) ---
// CAMBIO: Ahora comprueba el ROL
secured = async (req, res, next) => {
  try {
    // Revisa si existe la sesión Y si el rol es 'admin'
    if (req.session.id_usuario && req.session.rol === 'admin') {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
};

// --- Definición de Rutas ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminNovedadesRouter);

// --- API (para React) ---
// CAMBIO: Configuración avanzada de CORS para permitir cookies de sesión
app.use('/api', cors({
  origin: 'http://localhost:3001', // Tu frontend
  credentials: true // Permite cookies
}), apiRouter);

// --- Manejadores de Errores ---
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;