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

    async function login(table, body){        
        const answer_temp = await db_mysql.login(table, body.user_name);
        /*
        if(await bcrypt.compare(body.encrypted_password, answer_temp[0].encrypted_password)){
            return answer_temp;
        }else{
            return "wrong password";
        }
        */
        return bcrypt.compare(body.encrypted_password, answer_temp[0].encrypted_password)
            .then(result => {
                if(result){
                    return answer_temp;
                }else{
                    return "wrong password";
                }
            });
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
        login
    }       
}
