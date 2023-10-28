require('dotenv').config();
var url = require('url');
const http=require('http');

// Connect to Mysql2
const mysql = require('mysql2');
const con = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "test"
});

//API Routes (API endpoints)
//Get All
const server = http.createServer((req, res)=>{

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');


  const queryparams = url.parse(req.url, true).query;
  let q ="SELECT * FROM users WHERE name LIKE '%"+ queryparams._name +"%'";
  if (queryparams._age) {q += " AND age = '"+ queryparams._age +"'";}
  q += " ORDER BY id DESC LIMIT "+ queryparams._limit;
  con.query(q, (err, rows)=>{
    res.json(rows)
  }) 
}); 

con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{server.listen(1010, 'localhost', ()=>{console.log('JsMysql '+1010);});}
});


