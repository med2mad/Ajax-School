// Import required packages
const express = require('express');
const cors = require('cors');
const multer = require('./configurations/multer');
const mysqlCon = require('./configurations/mysql');

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(multer);

const port = process.env.mysqlPORT || process.argv[2] || 5010;
mysqlCon.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{app.listen(port, ()=>{console.log("'Mysyql' Port: " + port);});}
});
//in MVC use : const conn = await mysqlCon.createConnection({ database: test }); //OR send a function as parameter

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe} = require('./controllers/mysqlCrl');
//Get All
app.get('/',  getAll);
//Insert
app.post('/sub', subscribe);
app.post('/', add);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);