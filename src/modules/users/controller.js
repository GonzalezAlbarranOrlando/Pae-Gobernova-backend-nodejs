const database = require('../../database/mysql');
const TABLE = 'users';

function select_all(){
    return database.select_all(TABLE);
}

function select_boolean_status_active(){
    return database.select_boolean_status_active(TABLE);
}

function select_boolean_status_inactive(){
    return database.select_boolean_status_inactive(TABLE);
}

function select_id(id){
    return database.select_id(TABLE, id);
}

function add(body){
    return database.add(TABLE, body);
}

function update(body){
    return database.update(TABLE, body);
}

function update_boolean_status(body){
    return database.update_boolean_status(TABLE, body);
}

function delete_physically(body){
    return database.delete_physically(TABLE, body);
}

module.exports = {
    select_all,
    select_boolean_status_active,
    select_boolean_status_inactive,
    select_id,
    add,
    update,
    update_boolean_status,
    delete_physically    
}
