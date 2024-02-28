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
            console.log('Databse connection success!!!', '\n[user]:', config.mysql.user, '\n[database]:', config.mysql.database);
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
            if(error){
                return reject(error);
            }else{
                resolve(result);
            }
        })
    })
}
function select_id(table, id){}
function add(table, data){}
function delete_logically(table, id){}
function delete_physically(table, id){}

module.exports = {
    select_all,
    select_id,
    add,
    delete_logically,
    delete_physically
}