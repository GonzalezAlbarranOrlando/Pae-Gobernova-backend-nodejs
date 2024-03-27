const bcrypt = require('bcrypt');

module.exports = function(db_injected){

    let db_mysql = db_injected;
    if(!db_mysql){
        db_mysql = require('../database/mysql');
    }

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

    async function register(table, body){
        body.encrypted_password = await bcrypt.hash(body.encrypted_password, 5);
        return db_mysql.add(table, body);
    }

    async function login(table, user_name, password){        
        const answer_temp = await db_mysql.login(table, user_name);
        if(answer_temp.length === 0){
            return 'user do not exist';
        }
        console.log('password:'+ password)
        console.log('encrypted_password:'+ answer_temp[0].encrypted_password)
        console.log('boolean:'+ await bcrypt.compare(password, answer_temp[0].encrypted_password))
        if(!await bcrypt.compare(password, answer_temp[0].encrypted_password)){
            return 'wrong password';
        }else{
            delete answer_temp[0].encrypted_password;
            delete answer_temp[0].boolean_status;
            console.log(answer_temp);
            return answer_temp;
        }
    }

    async function evaluations_per_user(id){        
        return db_mysql.evaluations_per_user(id);
    }

    async function q_f_per_user_per_evaluation(userid, evaluationid){        
        return db_mysql.q_f_per_user_per_evaluation(userid, evaluationid);
    }

    async function select_users(table){
        return await db_mysql.select_users(table);
    }

    return {
        select_all,
        select_boolean_status_active,
        select_boolean_status_inactive,
        select_id,
        add,
        update,
        update_boolean_status,
        delete_physically,
        register,
        login,
        evaluations_per_user,
        q_f_per_user_per_evaluation,
        select_users
    }       
}
