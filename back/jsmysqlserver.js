console.log(require('./mod').a);




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

  if(req.method=='GET'){
    const queryparams = url.parse(req.url, true).query;
    let q ="SELECT * FROM users WHERE name LIKE '%"+ queryparams._name +"%'";
    if (queryparams._age) {q += " AND age = '"+ queryparams._age +"'";}
    q += " ORDER BY id DESC LIMIT "+ queryparams._limit;

    con.query(q, (err, rows)=>{
      res.end(JSON.stringify(rows))
    }) 
  }
  else if (req.method=='POST'){
    con.query("INSERT INTO users (name, age, photo) VALUES ('"+ req.body.name +"', '"+ req.body.age +"', '"+ req.body.photo +"')", (err, data)=>{
      res.json(data.insertId)
    })
  }
  else if (req.method=='PUT'){
    
  }
  else if (req.method=='DELETE'){
    
  }
}); 

con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{server.listen(1010, 'localhost', ()=>{console.log('JsMysql '+1010);});}
});


