const mysql = require('mysql2');
const {app} = require('./expressapp');

var con = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "test"
});

// var con = mysql.createConnection({
//   host: "sql312.infinityfree.com", 
//   user: "if0_36111463",
//   password: "lj8gsdoraWCmI0S", 
//   database: "if0_36111463_mysqltest", 
// // port:3306,
// });

con.connect((err) => {
  if (err){console.error("Mysyql initial connection error");}
  else{app.listen(5010, ()=>{console.log("Mysyql: " + 5010);});}
});

module.exports = con;