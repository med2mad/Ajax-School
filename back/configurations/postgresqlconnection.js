const {Client} = require('pg');
const client = new Client({
  host: "localhost",
  user: "postgres",
  port:5432, //not necessary
  password: "5432",
  database: "test"
})

const app = require('./expressapp');

client.connect().then((err) => {
    if (err){console.log("'PostgreSQL' initial connection error");}
    else{app.listen(5030, ()=>{console.log("PostgreSQL: " + 5030);

    // client.query("SELECT * FROM users", (err, rows)=>{
    //   console.log(rows.rows)
    // })

  });}
})

module.exports = client;