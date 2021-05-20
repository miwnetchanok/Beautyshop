const mysql = require("mysql");

const con = mysql.createConnection({
  host: "passbook.czg9ngd0ckjz.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "Mr797Kk98vTISZC96yxx",
  database: "noey",
});

module.exports = con;