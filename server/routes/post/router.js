let express = require('express');
let router = express.Router();
let manager = require('./manager');
let fs= require('fs');
let path = require('path');

router.route('/').get(function(req,res){
    res.sendFile(path.resolve(__dirname,'../','../','./public/html/index.html'));
});

module.exports=router;