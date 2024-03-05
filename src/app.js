const express = require('express');
const config = require('./config');
//npm i morgan
const morgan = require('morgan');
//cors
const cors = require('cors');
//import rutes
const rutes = require('./modules/rutes');

const app = express();

// Habilitar CORS para todas las solicitudes
//app.use(cors());
// Habilitar CORS para origen específico
app.use(cors({
    origin: 'http://localhost:8080',
  }));

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config
app.set('port', config.app.port);

//rutes
app.use('/api', rutes);

module.exports = app;