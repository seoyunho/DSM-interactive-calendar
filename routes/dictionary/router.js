let express = require('express');
let router = express.Router();
let manager = require('./manager');
let fs = require('fs');
let path = require('path');

router.route('/').get(function (req, res) {
    res.render('index', {})
})

router.route('/dictionary').get(function (req, res) {
    res.sendFile(path.resolve(__dirname, '../', '../', './public/html/dictionary.html'));
})

router.route('/dictionary-write/:category').get(function (req, res) {
    let category = req.params.category;

    console.log("this is write");
    res.render('dictionary-write', {
        "category": category
    });
});

router.route('/dictionary-modify/:no').get(function (req, res) {
    let no = req.params.no;

    manager.getDictionaryByNo(no, function (result) {
        console.log(result)
        res.render('dictionary-modify', {
            "result": result
        });
    });
});

router.route('/dictionary/:category').get(function (req, res) {
    let category = req.params.category;

    manager.getDictionary(category, function (result) {
        console.log(result);
        res.render('dictionary-category', {
            "result": result
        });
    });
});

router.route('/dictionary/:category').post(function (req, res) {
    let category = req.params.category;
    let title = req.body.title;
    let contents = req.body.contents;

    manager.addDictionary(category, title, contents, function (result) {
        res.redirect('/dictionary/' + category);
    });
});

router.route('/dictionary/:no').put(function (req, res) {
    let no = req.params.no;
    let category = req.body.category;
    let title = req.body.title;
    let contents = req.body.contents;

    manager.updatetDictionary(no, category, title, contents, function (result) {
        res.redirect('/dictionary/' + category);
    });
});

router.route('/dictionaryDetail/:no').get(function (req, res) {
    let no = req.params.no;

    manager.getDictionaryByNo(no, function (result) {
        console.log(result)
        res.render('dictionaryDetail', {
            "result": result
        });
    });
});

router.route('/dictionary/:no').delete(function (req, res) {
    let no = req.params.no;

    manager.deleteDictionary(no, function (result) {
        console.log(result);
        res.render('index', {
            "result": result
        });
    });
});

router.route('/search').get(function (req, res) {
    let searchWord = req.params.searchWord;

    manager.search(searchWord, category, function (result) {
        res.render('index', {
            "result": result
        });
    })
});


module.exports = router;