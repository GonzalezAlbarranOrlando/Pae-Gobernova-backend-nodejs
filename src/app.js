const express = require('express');
const config = require('./config');
//import rutes
const users = require('./modules/users/rutes');

const app = express();

//config
app.set('port', config.app.port);

//rutes
app.use('/api/users', users)

module.exports = app;