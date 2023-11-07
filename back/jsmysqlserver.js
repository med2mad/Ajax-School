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
   
    const body=[];
    req.on('data', p=>{body.push(p)})
    req.on('end', ()=>{
      const parsedbody = Buffer.concat(body).toString();
      const data = parsedbody.split('&');
      const name = data[0].split('=');
      const age = data[1].split('=');
      const photo = data[2].split('=');
      con.query("INSERT INTO users (name, age, photo) VALUES ('"+ name +"', '"+ age +"', '"+ photo +"')", (err, data)=>{
        console.log(data.insertId)
      })
    })
  }
  else if (req.method=='PUT'){
    
  }
  else if (req.method=='DELETE'){
    const t = req.url.split('/');
    const id = t[t.length-1];

  }
}); 

con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{server.listen(1010, 'localhost', ()=>{console.log('JsMysql '+1010);});}
});


