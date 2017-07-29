let conn = require('../../DBConnection');

let manager = {}

manager.getDictionary = function (category, callback) {
    let result = {
        errer: false,
        category: null,
        dictionary: []
    };

    result.category = category;

    conn.query('select * from dictionary where category=?', category, function (err, rows) {
        if (err) result.errer = true;
        else if (rows.length >= 0) {
            for (let i = 0; i < rows.length; i++) {
                let a = {
                    title: null,
                    contents: null
                };

                a.title = rows[i].title
                a.contents = rows[i].contents;
                result.dictionary.push(a);
            }
        }
        callback(result);
    });
};

manager.addDictionary = function (category, title, contents, callback) {
    let result = {
        errer: false,
        category: null,
        dictionary: []
    };

    result.category = category;

    conn.query('insert into dictionary (category, title, contents) values(?,?,?);', [category, title, contents], function (err, res) {
        if (err) result.errer = true;
        else if (res.affectedRows == 1) {
            conn.query('select * from dictionary where category=?', category, function (err, rows) {
                if (err) result.errer = true;
                else if (rows.length >= 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let a = {
                            title: null,
                            contents: null
                        };

                        a.title = rows[i].title
                        a.contents = rows[i].contents;
                        result.dictionary.push(a);
                    }
                }
            });
        }
        callback(result);
    });
};

manager.deleteDictionary = function (no, callback) {
    let result = {
        errer: false,
        category: null,
        dictionary: []
    };

    result.category = category;

    conn.query('delete from dictionary where no=?', no, function (err, res) {
        if (err) result.errer = true;
        else if (res.affectedRows == 1) {
            conn.query('select * from dictionary where category=?', category, function (err, rows) {
                if (err) result.errer = true;
                else if (rows.length >= 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let a = {
                            title: null,
                            contents: null
                        };

                        a.title = rows[i].title
                        a.contents = rows[i].contents;
                        result.dictionary.push(a);
                    }
                }
            });
        }
        callback(result);
    });
};

manager.updateDictionary = function (no, category, title, contents, callback) {
    let result = {
        errer: false,
        category: null,
        dictionary: []
    };

    result.category = category;

    conn.query('update dictionary category=?, title=?, contents=? where no=?', [category, title, contents, no], function (err, res) {
        if (err) result.errer = true;
        else if (res.affectedRows == 1) {
            conn.query('select * from dictionary where category=?', category, function (err, rows) {
                if (err) result.errer = true;
                else if (rows.length >= 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let a = {
                            title: null,
                            contents: null
                        };

                        a.title = rows[i].title
                        a.contents = rows[i].contents;
                        result.dictionary.push(a);
                    }
                }
            });
        }
        callback(result);
    });
};

manager.search = function (searchWord,category, callback) {
    let result = {
        errer: false,
        category: null,
        dictionary: []
    };

    result.category = category;
    
    conn.query('select * from dictionary where category=? and title like "%?%" ', [category, searchWord], function (err, rows) {
        if (err) result.errer = true;
        else if (rows.length >= 0) {
            for (let i = 0; i < rows.length; i++) {
                let a = {
                    title: null,
                    contents: null
                };

                a.title = rows[i].title
                a.contents = rows[i].contents;
                result.dictionary.push(a);
            }
        }
        callback(result);
    });
};