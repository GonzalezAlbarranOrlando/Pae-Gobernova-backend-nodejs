const express = require('express');
const router = express.Router();

const answer = require('../../network/answers');

router.get('/', function (req, res){
    answer.success(req, res, 'ok status at users', 200);
});

module.exports = router;