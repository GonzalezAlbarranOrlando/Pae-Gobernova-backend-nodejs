const database = require('../../database/mysql');
const TABLE = 'users';

function select_all(){
    return database.select_all(TABLE);
}

module.exports = {
    select_all,
}
