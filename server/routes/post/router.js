let express = require('express');
let router = express.Router();
let manager = require('./manager');
let fs= require('fs');

rotuer.route('/html').get(function(req,res){
    // res.sendFile(path.resolve(__dirname,'../','../','./public/html/index.html'))
    console.log(path.resolve(__dirname,'../','../','./public/html/index.html'));
});

export default router;