const express = require('express');
const router = express.Router();

const answer = require('../../network/answers');
const controller = require('./controller');

router.get('/', async function (req, res){
    const items = await controller.select_all()
    .then((items) => {
        answer.success(req, res, items, 200);
    });
});

module.exports = router;