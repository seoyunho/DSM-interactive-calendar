let express = require('express');
let router = express.Router();
let manager = require('./manager');
let fs = require('fs');
let path = require('path');

router.route('/').get(function(req,res){
    res.sendFile(path.resolve(__dirname,'../','../','./public/html/index.html'));
})

router.route('/dictionary').get(function(req,res){
    res.sendFile(path.resolve(__dirname,'../','../','./public/html/dictionary.html'));
})


router.route('/dictionary/:category').get(function (req, res) {
    let category = req.params.category;

    manager.getDictionary(category, function (result) {
        res.render('index', result);
    });
});

router.route('/dictionary/:category').post(function (req, res) {
    let category = req.params.category;
    let title = req.body.title;
    let contents = req.body.contents;

    manager.addDictionary(category, title, contents, function (result) {
        res.render('index', result);
    });
});

router.route('/dictionary/:no').put(function (req, res) {
    let no = req.params.no;
    let category = req.params.category;
    let title = req.body.title;
    let contents = req.body.contents;

    manager.updatetDictionary(no, category, title, contents, function (result) {
        res.render('index', result);
    });
});

router.route('/dictionary/:no').delete(function (req, res) {
    let no = req.params.no;

    manager.deleteDictionary(no, function (result) {
        res.render('index', result);
    });
});

router.route('/search/:searchWord').get(function (req, res) {
    let searchWord = req.params.searchWord;

    manager.search(searchWord, category, function (result) {
        res.render('index', result);
    })
});

module.exports = router;