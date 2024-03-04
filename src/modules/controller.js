const db_mysql = require('../database/mysql');

function select_all(table){
    return db_mysql.select_all(table);
}

function select_boolean_status_active(table){
    return db_mysql.select_boolean_status_active(table);
}

function select_boolean_status_inactive(table){
    return db_mysql.select_boolean_status_inactive(table);
}

function select_id(table, id){
    return db_mysql.select_id(table, id);
}

function add(table, body){
    return db_mysql.add(table, body);
}

function update(table, body){
    return db_mysql.update(table, body);
}

function update_boolean_status(table, body){
    return db_mysql.update_boolean_status(table, body);
}

function delete_physically(table, body){
    return db_mysql.delete_physically(table, body);
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
