const express = require('express');

const router = express.Router();

router.get('/', function (req, res){
    res.render('vwAdmin/Admin_Selling');
})


module.exports = router;