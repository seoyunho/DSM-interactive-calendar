let mysql = require('mysql');

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hy980615",
    database: "DMS-"
});

module.exports = conn;  