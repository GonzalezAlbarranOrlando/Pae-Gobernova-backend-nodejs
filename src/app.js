const express = require('express');
const config = require('./config');
//npm i morgan
const morgan = require('morgan');
//import rutes
const users = require('./modules/users/rutes');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config
app.set('port', config.app.port);

//rutes
app.use('/api', users);

module.exports = app;