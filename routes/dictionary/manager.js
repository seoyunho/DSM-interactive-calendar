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
                    no: null,
                    title: null,
                    contents: null
                };

                a.no=rows[i].no;
                a.title = rows[i].title
                a.contents = rows[i].contents;
                result.dictionary.push(a);
            }
        }
        callback(result);
    });
};

manager.getDictionaryByNo = function (no, callback) {
    let result = {
        errer: false,
        dictionary: []
    };

    conn.query('select * from dictionary where no=?', no, function (err, rows) {
        if (err) result.errer = true;
        else if (rows.length >= 0) {
            for (let i = 0; i < rows.length; i++) {
                let a = {
                    no: null,
                    title: null,
                    contents: null
                };

                a.no=rows[i].no;
                a.title = rows[i].title
                a.contents = rows[i].contents;
                a.category=rows[i].category;
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
                            no: null,
                            title: null,
                            contents: null
                        };

                        a.no=rows[i].no;
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
        dictionary: []
    };


    conn.query('delete from dictionary where no=?', no, function (err, res) {
        if (err) result.errer = true;
        else if (res.affectedRows == 1) {
            conn.query('select * from dictionary where category=?', category, function (err, rows) {
                if (err) result.errer = true;
                else if (rows.length >= 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let a = {
                            no: null,
                            title: null,
                            contents: null
                        };
                        
                        a.no=rows[i].no;
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
                            no: null,
                            title: null,
                            contents: null
                        };
                        
                        a.no=rows[i].no;
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

manager.search = function (searchWord, callback) {
    let result = {
        errer: false,
        dictionary: []
    };

    conn.query('select * from dictionary where title like "%#?%" escape "#"', searchWord, function (err, rows) {
        if (err) result.errer = true;
        else if (rows.length >= 0) {
            for (let i = 0; i < rows.length; i++) {
                let a = {
                    no:null,
                    category: null,
                    title: null,
                    contents: null
                };

                a.no=rows[i].no;
                a.category = rows[i].category;
                a.title = rows[i].title
                a.contents = rows[i].contents;
                result.dictionary.push(a);
            }
        }
        callback(result);
    });
};

module.exports = manager;