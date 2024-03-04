const mysql = require('mysql');
const config = require('../config');

const db_config = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function mysql_connection(){
    connection = mysql.createConnection(db_config);
    connection.connect((err) => {
        if(err){
            console.log('[db err]:', err);
            setTimeout(mysql_connection, 200);
        }else{
            console.log('Databse connection success!!!', '\n[user]:', config.mysql.user, '\n[database]:', config.mysql.database, '\n');
        }
    });
    connection.on('error', err => {
        console.log('[db err]:', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            mysql_connection();
        }else{
            throw err;
        }
    });
}

mysql_connection();

function select_all(table){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function select_boolean_status_active(table){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE boolean_status = 1;`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function select_boolean_status_inactive(table){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE boolean_status = 0;`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function select_id(table, id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ?`,id, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function add(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function update(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function update_boolean_status(table, data){
    console.log('hola');
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET boolean_status = ? WHERE id = ?`, [data.boolean_status, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function delete_physically(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
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