const {Client}= require('pg');

const pool = new Client({
  host: "localhost",
  user: "postgres",
  port:5432, //not necessary
  password: "5432",
  database: "test"
})

// require('dotenv').config();
// const pool = new Client({
//   connectionString: process.env.POSTGRES_URL ,
// })

// const { Pool } = require('pg');
// const pool = new Pool({
//   user: 'default',
//   host: 'ep-broad-breeze-a4dshuit-pooler.us-east-1.aws.neon.tech?sslmode=require',
//   database: 'test',
//   password: 'CAQMU37XznxV',
//   port: 5432,
// });

// const { Pool } = require('pg')
// const pool = new Pool({
//   connectionString: "postgres://default:CAQMU37XznxV@ep-broad-breeze-a4dshuit-pooler.us-east-1.aws.neon.tech:5432/test?sslmode=require",
//   // connectionString: "postgres://test_qcuz_user:fyHIx6HJ51ZwqNvJOUQWCyVj7n0tiTz0@dpg-cnko356d3nmc73bo9pog-a.oregon-postgres.render.com/test_qcuz"
// })


const {app} = require('./expressapp');

pool.connect().then((err) => {
    if (err){console.log("'PostgreSQL' initial connection error");}
    else{app.listen(5030, ()=>{console.log("PostgreSQL: " + 5030);

    // const q = "CREATE TABLE profiles (_id SERIAL PRIMARY KEY,name VARCHAR(255),age INTEGER, photo VARCHAR(255));"
    //     pool.query(q, (err, rows)=>{
    //   console.log(rows.rows)
    // });

    

    // pool.query("SELECT * FROM profiles", (err, rows)=>{
    //   console.log(rows.rows)
    // })

    // pool.query("ALTER TABLE profiles RENAME COLUMN id TO _id", (err, rows)=>{
    //   console.log(rows.rows)
    // })
    
    // pool.query("INSERT INTO profiles (name, age, photo) VALUES ('username1', 44, 'whatsapp.jpg') RETURNING _id;", (err, rows)=>{
    //   console.log(rows.rows)
    // })

  });}
})

module.exports = pool;