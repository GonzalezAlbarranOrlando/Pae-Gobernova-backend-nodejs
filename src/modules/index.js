const db = require('../database/mysql');
const controller = require('./controller');

module.exports = controller(db);