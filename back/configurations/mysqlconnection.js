const mysql = require('mysql2');
const {app} = require('./expressapp');

var con = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "test"
});

con.connect((err) => {
  if (err){console.error("Mysyql initial connection error");}
  else{app.listen(5010, ()=>{console.log("Mysyql: " + 5010);});}
});

module.exports = con;