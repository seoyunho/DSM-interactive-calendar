let mysql = require('mysql');

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hy980615",
    database: "DSM_interactive_calendar"
});

conn.connect();

module.exports = conn;  
