let express = require('express');
let router = express.Router();
let manager = require('./manager');
let fs = require('fs');
let path = require('path');

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

    manager.getDictionary(category, function (result) {
        res.render('index', result);
    });
});

router.route('/dictionary/:category').put(function (req, res) {
    let category = req.params.category;
    let title = req.body.title;
    let contents = req.body.contents;

    manager.getDictionary(category, title, contents, function (result) {
        res.render('index', result);
    });
});

router.router('/dictionary/:').delete(function (req, res) {
    let category = req.params.category;
    let title = req.body.title;

    manager.getDictionary(category, title, function (result) {
        res.render('index', result);
    });
});

module.exports = router;