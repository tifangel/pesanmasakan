var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "pesanmasakan"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;