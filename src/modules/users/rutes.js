const express = require('express');

const answer = require('../../network/answers');
const controller = require('./controller');

const router = express.Router();

router.get('/select_all', select_all);
router.get('/select_boolean_status_active', select_boolean_status_active);
router.get('/select_boolean_status_inactive', select_boolean_status_inactive);
router.get('/id/:id', select_id);
router.post('/add', add);
router.post('/update', update);
router.post('/update_boolean_status', update_boolean_status);
router.put('/delete_physically', delete_physically);

async function select_all(req, res){
    try{
        const items = await controller.select_all();
        answer.success(req, res, items, 200);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function select_boolean_status_active(req, res){
    try{
        const items = await controller.select_boolean_status_active();
        answer.success(req, res, items, 200);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function select_boolean_status_inactive(req, res){
    try{
        const items = await controller.select_boolean_status_inactive();
        answer.success(req, res, items, 200);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function select_id (req, res){
    try{
        const items = await controller.select_id(req.params.id);
        answer.success(req, res, items, 200);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function add (req, res){
    try{
        await controller.add(req.body);
        answer.success(req, res, '[add query]: success!!!', 201);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function update (req, res){
    try{
        await controller.update(req.body);
        answer.success(req, res, '[update query]: success!!!', 201);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function delete_physically (req, res){
    try{
        await controller.delete_physically(req.body);
        answer.success(req, res, '[delete_physically query]: success!!!', 200);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

async function update_boolean_status (req, res){
    try{
        await controller.update_boolean_status(req.body);
        answer.success(req, res, '[update_boolean_status query]: success!!!', 200);
    }catch(err){
        answer.error(req, res, err, 500);
    }
};

module.exports = router;