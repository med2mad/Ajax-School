const mysql = require('mysql2');
const {app} = require('./expressapp');

// const con = mysql.createConnection({
//   host: "localhost", 
//   user: "root",
//   password: "",
//   database: "test"
// });

//freesqldatabase.com
const con = mysql.createConnection({
  host: "sql8.freesqldatabase.com", 
  user: "sql8692210",
  password: "3vbKb8G5nL", 
  database: "sql8692210", 
  port:3306,
});

//infinityfree
// const con = mysql.createConnection({
//   host: "sql312.infinityfree.com", 
//   user: "if0_36111463",
//   password: "lj8gsdoraWCmI0S", 
//   database: "if0_36111463_mysqltest", 
// // port:3306,
// });

con.connect((err) => {
  if (err){console.error("Mysyql initial connection error");}
  else{app.listen(5010, ()=>{
    console.log("Mysyql: " + 5010);
    
    

    // con.query("SELECT * FROM profiles", (err, rows)=>{
    //   console.log(rows)
    // })

    
    // con.query("INSERT INTO profiles (name, age, photo) VALUES ('mohamed', 35, 'whatsapp.jpg');", (err, rows)=>{
    //   console.log(rows)
    // })
    
    
  });}
});

module.exports = con;