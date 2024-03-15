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

function login(table, user_name){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE user_name = ?`,user_name, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function evaluations_per_user(id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT      e.id AS evaluation_id,     e.name AS evaluation_name,     COUNT(q.id) AS total_questions,     SUM(CASE WHEN uq.status_text = 'approved' THEN 1 ELSE 0 END) AS approved_questions FROM      users u JOIN      user_questions uq ON u.id = uq.user_id JOIN      questions q ON uq.question_id = q.id JOIN      sections s ON q.section_id = s.id JOIN      evaluations e ON s.evaluation_id = e.id WHERE      u.boolean_status = 1     AND uq.boolean_status = 1     AND q.boolean_status = 1     AND s.boolean_status = 1     AND e.boolean_status = 1     AND u.id = ? GROUP BY      e.id, e.name;`, id,(error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function q_f_per_user_per_evaluation(userid, evaluationid){
    return new Promise((resolve, reject) => {
        connection.query(`
        WITH QuestionCounts AS (
            SELECT 
                e.id AS evaluation_id,
                e.name AS evaluation_name,
                s.id AS section_id,
                s.name AS section_name,
                q.id AS question_id,
                q.question_body, 
                uq.id AS user_question_id,
                uq.status_text AS question_status_text,
                ROW_NUMBER() OVER (PARTITION BY e.id ORDER BY q.id) AS question_number
            FROM 
                user_questions uq
            INNER JOIN 
                questions q ON uq.question_id = q.id
            INNER JOIN 
                sections s ON q.section_id = s.id
            INNER JOIN
                evaluations e ON s.evaluation_id = e.id
            WHERE 
                uq.boolean_status = 1
                AND q.boolean_status = 1
                AND s.boolean_status = 1
                AND e.boolean_status = 1
                AND uq.user_id = ?
                AND e.id = ?
            ORDER BY
                s.id, q.id, question_number
            )
            SELECT 
                evaluation_id,
                evaluation_name,
                section_id,
                section_name,
                question_id,
                question_number,
                question_body,
                question_status_text,
                f.id AS file_id,
                f.file_path,
                qc.user_question_id
            FROM 
                QuestionCounts qc
            LEFT JOIN 
                files f ON qc.user_question_id = f.user_question_id
            WHERE 
                f.boolean_status = 1;
        `, [userid, evaluationid],(error, result) => {
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
    delete_physically,
    login,
    evaluations_per_user,
    q_f_per_user_per_evaluation
}